-- =====================================================
-- PAYMENTS SCHEMA FOR BAKU STACK (ePoint Integration)
-- =====================================================

-- 1. Payments table (история платежей)
CREATE TABLE IF NOT EXISTS payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  course_id UUID REFERENCES courses(id) ON DELETE SET NULL,

  -- Payment details
  amount DECIMAL(10, 2) NOT NULL,
  currency VARCHAR(3) NOT NULL DEFAULT 'AZN', -- 'AZN' or 'USD'
  status VARCHAR(20) NOT NULL DEFAULT 'pending', -- 'pending', 'processing', 'completed', 'failed', 'refunded'

  -- ePoint integration
  epoint_transaction_id VARCHAR(255) UNIQUE, -- ID от ePoint
  epoint_order_id VARCHAR(255) UNIQUE, -- Наш order ID для ePoint
  payment_method VARCHAR(50), -- 'card', 'bank_transfer', etc.

  -- Metadata
  payment_url TEXT, -- URL для оплаты (от ePoint)
  callback_data JSONB, -- Данные от webhook
  error_message TEXT, -- Описание ошибки если failed

  -- Timestamps
  paid_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 2. Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_payments_student ON payments(student_id);
CREATE INDEX IF NOT EXISTS idx_payments_course ON payments(course_id);
CREATE INDEX IF NOT EXISTS idx_payments_status ON payments(status);
CREATE INDEX IF NOT EXISTS idx_payments_epoint_order ON payments(epoint_order_id);

-- 3. Update enrollments table - добавим payment_id
ALTER TABLE enrollments
ADD COLUMN IF NOT EXISTS payment_id UUID REFERENCES payments(id) ON DELETE SET NULL;

-- 4. Modify courses table - добавим цены в разных валютах
ALTER TABLE courses
ADD COLUMN IF NOT EXISTS price_usd DECIMAL(10, 2) DEFAULT 0,
ADD COLUMN IF NOT EXISTS currency_default VARCHAR(3) DEFAULT 'AZN';

-- Update existing courses with USD prices (примерный курс 1.7)
UPDATE courses SET price_usd = ROUND(price / 1.7, 2) WHERE price_usd IS NULL;

-- 5. Create trigger to auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_payments_updated_at
    BEFORE UPDATE ON payments
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- 6. RLS Policies for payments
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

-- Students can view their own payments
CREATE POLICY "Students can view own payments"
ON payments FOR SELECT
USING (auth.uid() = student_id);

-- Students can create payments (initial record)
CREATE POLICY "Students can create payments"
ON payments FOR INSERT
WITH CHECK (auth.uid() = student_id);

-- Only system can update payments (via service role)
CREATE POLICY "Only system can update payments"
ON payments FOR UPDATE
USING (false); -- Will be done via service role API

-- Instructors can view payments for their courses
CREATE POLICY "Instructors can view course payments"
ON payments FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM courses
    WHERE courses.id = payments.course_id
    AND courses.instructor_id = auth.uid()
  )
);

-- 7. Helper function to get payment summary for student
CREATE OR REPLACE FUNCTION get_student_payment_summary(student_uuid UUID)
RETURNS TABLE (
  total_spent DECIMAL(10, 2),
  courses_purchased INT,
  pending_payments INT
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    COALESCE(SUM(amount), 0)::DECIMAL(10, 2) as total_spent,
    COUNT(DISTINCT course_id)::INT as courses_purchased,
    COUNT(CASE WHEN status = 'pending' THEN 1 END)::INT as pending_payments
  FROM payments
  WHERE student_id = student_uuid
  AND status IN ('completed', 'pending');
END;
$$ LANGUAGE plpgsql;

-- 8. Helper function to check if course is paid
CREATE OR REPLACE FUNCTION is_course_paid(student_uuid UUID, course_uuid UUID)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM payments
    WHERE student_id = student_uuid
    AND course_id = course_uuid
    AND status = 'completed'
  );
END;
$$ LANGUAGE plpgsql;

-- Success message
SELECT 'Payments schema created successfully! Ready for ePoint integration.' as message;
