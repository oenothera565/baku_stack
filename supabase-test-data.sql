-- =====================================================
-- TEST DATA FOR BAKU STACK
-- =====================================================
-- Run this in Supabase SQL Editor after creating a test user
-- User ID: 72b965a5-4568-42f1-90cb-f2902db7cfbb

-- 1. Create instructor profile
INSERT INTO profiles (id, email, role, full_name, bio)
VALUES (
  '72b965a5-4568-42f1-90cb-f2902db7cfbb',
  'test@bakustack.com',
  'instructor',
  'Test Instructor',
  'Experienced developer and mentor'
)
ON CONFLICT (id) DO UPDATE SET
  role = EXCLUDED.role,
  full_name = EXCLUDED.full_name,
  bio = EXCLUDED.bio;

-- 2. Insert courses (matching your existing 6 courses)
INSERT INTO courses (title, slug, description, instructor_id, price, is_published, difficulty) VALUES
(
  'FRONTEND DEVELOPMENT',
  'frontend',
  'Master modern frontend development with React, Next.js, and Tailwind CSS. Build responsive, interactive web applications.',
  '72b965a5-4568-42f1-90cb-f2902db7cfbb',
  999.99,
  true,
  'beginner'
),
(
  'QA AUTOMATION',
  'qa-automation',
  'Learn automated testing with Python, Selenium, and PyTest. Ensure quality in every release.',
  '72b965a5-4568-42f1-90cb-f2902db7cfbb',
  899.99,
  true,
  'intermediate'
),
(
  'BACKEND DEVELOPMENT',
  'backend',
  'Build scalable backend systems with Node.js, Express, PostgreSQL, and Redis.',
  '72b965a5-4568-42f1-90cb-f2902db7cfbb',
  1199.99,
  true,
  'intermediate'
),
(
  'DEVOPS ENGINEERING',
  'devops',
  'Master cloud infrastructure with Docker, Kubernetes, AWS, and CI/CD pipelines.',
  '72b965a5-4568-42f1-90cb-f2902db7cfbb',
  1299.99,
  true,
  'advanced'
),
(
  'UX/UI DESIGN',
  'ux-design',
  'Design beautiful user experiences with Figma, prototyping, and user research.',
  '72b965a5-4568-42f1-90cb-f2902db7cfbb',
  799.99,
  true,
  'beginner'
),
(
  'MOBILE DEVELOPMENT',
  'mobile',
  'Build cross-platform mobile apps with Flutter and Dart. iOS and Android from one codebase.',
  '72b965a5-4568-42f1-90cb-f2902db7cfbb',
  1099.99,
  true,
  'intermediate'
);

-- 3. Add modules for Frontend course
INSERT INTO modules (course_id, title, description, order_index)
SELECT
  c.id,
  'Module ' || series || ': ' ||
    CASE series
      WHEN 1 THEN 'HTML & CSS Fundamentals'
      WHEN 2 THEN 'JavaScript Essentials'
      WHEN 3 THEN 'React Basics'
      WHEN 4 THEN 'Next.js & Advanced Patterns'
    END,
  'Learn the fundamentals',
  series
FROM courses c
CROSS JOIN generate_series(1, 4) AS series
WHERE c.slug = 'frontend';

-- 4. Add sample lessons for Module 1 (Frontend)
INSERT INTO lessons (module_id, title, content, video_url, duration, order_index, is_free)
SELECT
  m.id,
  'Lesson ' || series || ': ' ||
    CASE series
      WHEN 1 THEN 'Introduction to HTML'
      WHEN 2 THEN 'CSS Styling Basics'
      WHEN 3 THEN 'Flexbox & Grid'
    END,
  'Lesson content here...',
  'https://www.youtube.com/watch?v=dQw4w9WgXcQ', -- Sample video URL
  CASE series WHEN 1 THEN 15 WHEN 2 THEN 20 WHEN 3 THEN 25 END,
  series,
  series = 1 -- First lesson is free
FROM modules m
JOIN courses c ON m.course_id = c.id
CROSS JOIN generate_series(1, 3) AS series
WHERE c.slug = 'frontend' AND m.order_index = 1;

-- 5. Add modules for Backend course
INSERT INTO modules (course_id, title, description, order_index)
SELECT
  c.id,
  'Module ' || series || ': ' ||
    CASE series
      WHEN 1 THEN 'Node.js Fundamentals'
      WHEN 2 THEN 'Express & REST APIs'
      WHEN 3 THEN 'Database Design'
      WHEN 4 THEN 'Authentication & Security'
    END,
  'Learn backend development',
  series
FROM courses c
CROSS JOIN generate_series(1, 4) AS series
WHERE c.slug = 'backend';

-- 6. Add sample lessons for Backend Module 1
INSERT INTO lessons (module_id, title, content, video_url, duration, order_index, is_free)
SELECT
  m.id,
  'Lesson ' || series || ': ' ||
    CASE series
      WHEN 1 THEN 'Setting up Node.js'
      WHEN 2 THEN 'NPM & Package Management'
      WHEN 3 THEN 'Your First Server'
    END,
  'Lesson content here...',
  'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  CASE series WHEN 1 THEN 12 WHEN 2 THEN 18 WHEN 3 THEN 22 END,
  series,
  series = 1
FROM modules m
JOIN courses c ON m.course_id = c.id
CROSS JOIN generate_series(1, 3) AS series
WHERE c.slug = 'backend' AND m.order_index = 1;

-- Success message
SELECT
  'Test data inserted successfully!' as message,
  COUNT(DISTINCT c.id) as total_courses,
  COUNT(DISTINCT m.id) as total_modules,
  COUNT(DISTINCT l.id) as total_lessons
FROM courses c
LEFT JOIN modules m ON m.course_id = c.id
LEFT JOIN lessons l ON l.module_id = m.id;
