export default function Home() {
  return (
    <main className="min-h-screen bg-white dark:bg-black text-black dark:text-white transition-colors ">
      {/* Hero Section */}
      <section className="min-h-[70vh] flex flex-col justify-center items-center p-16 border-b-2 border-black dark:border-white relative">
        {/* Тег "версии" сверху */}
        <div className="absolute top-8 right-8 font-mono text-sm border border-black dark:border-white px-3 py-1">
          v1.0.0
        </div>

        <h1 className="text-7xl md:text-9xl font-bold uppercase tracking-tight text-center font-sans">
          Baku Stack
        </h1>
        <p className="text-xl md:text-2xl font-mono mt-8 tracking-widest text-gray-600 dark:text-gray-400">
          {"// Master Coding. Build Future."}
        </p>
      </section>

      {/* Features Section */}
      <section className="p-16 border-b-2 border-black dark:border-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-bold uppercase mb-12 font-sans">
            Modules
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
            {/* Card 1: Code */}
            <div className="bg-white dark:bg-black border-2 border-black dark:border-white p-12 shadow-none hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors group">
              <div className="font-mono text-xs mb-4 opacity-50">01 /</div>
              <h3 className="text-4xl font-bold uppercase mb-6 font-sans">Code</h3>
              <p className="text-lg leading-relaxed font-mono">
                Write clean code. React, Next.js, TypeScript. Production ready.
              </p>
            </div>

            {/* Card 2: Learn */}
            <div className="bg-white dark:bg-black border-2 border-black dark:border-white p-12 shadow-none border-t-0 md:border-t-2 md:border-l-0 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors group">
              <div className="font-mono text-xs mb-4 opacity-50">02 /</div>
              <h3 className="text-4xl font-bold uppercase mb-6 font-sans">Learn</h3>
              <p className="text-lg leading-relaxed font-mono">
                System Design. Algorithms. Git workflow. Best practices.
              </p>
            </div>

            {/* Card 3: Earn */}
            <div className="bg-white dark:bg-black border-2 border-black dark:border-white p-12 shadow-none border-t-0 md:border-t-2 md:border-l-0 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors group">
              <div className="font-mono text-xs mb-4 opacity-50">03 /</div>
              <h3 className="text-4xl font-bold uppercase mb-6 font-sans">Earn</h3>
              <p className="text-lg leading-relaxed font-mono">
                High salary offers. Remote work. Contract opportunities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="min-h-[40vh] flex flex-col justify-center items-center p-16 border-b-2 border-black dark:border-white">
        <h2 className="text-5xl md:text-6xl font-bold uppercase mb-12 text-center font-sans">
          Ready to Deploy?
        </h2>
        {/* Кнопка в стиле консоли */}
        <button className="rounded-none border-2 border-black dark:border-white bg-transparent text-black dark:text-white px-16 py-6 text-2xl font-mono font-bold uppercase tracking-wide hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors flex items-center gap-4">
          <span className="text-green-500">$</span>
          <span>git commit -m &quot;Start Career&quot;</span>
        </button>
      </section>

      {/* Footer */}
      <footer className="p-12 flex justify-between items-center border-t-2 border-black dark:border-white">
        <div className="flex flex-col">
          <p className="font-bold uppercase text-xl">Baku Stack</p>
          <p className="font-mono text-xs mt-2 text-gray-600 dark:text-gray-400">
            © 2025 No Rights Reserved.
          </p>
        </div>
        <div className="font-mono text-xs border-l-2 border-black dark:border-white pl-4">
          Status: <span className="text-green-500">● Online</span>
        </div>
      </footer>
    </main>
  );
}
