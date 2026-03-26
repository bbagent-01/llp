export default function Home() {
  return (
    <>
      {/* ═══ DARK HERO ═══ */}
      <header className="relative overflow-hidden bg-gradient-to-b from-surface-1 via-surface-2 to-surface-3">
        <nav className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
          <a href="/" className="text-lg font-bold tracking-tight text-white">ProjectName</a>
          <div className="flex items-center gap-8">
            <a href="#features" className="text-sm text-zinc-400 hover:text-white transition-colors">Features</a>
            <a href="#about" className="text-sm text-zinc-400 hover:text-white transition-colors">About</a>
            <a href="#cta" className="text-sm font-medium text-surface-1 bg-coral px-4 py-2 rounded-lg hover:bg-coral-light transition-colors">Get Started</a>
          </div>
        </nav>
        <div className="max-w-4xl mx-auto px-6 pt-24 pb-32 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-coral/10 border border-coral/20 rounded-full text-xs font-medium text-coral font-mono mb-8">
            <span className="w-1.5 h-1.5 bg-coral rounded-full animate-pulse" />
            STATUS OR TAGLINE
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-[1.1] mb-6">
            Your headline goes here<span className="text-coral">.</span>
          </h1>
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed mb-10">
            A clear, concise description of what this project does and why someone should care.
          </p>
          <div className="flex items-center justify-center gap-4">
            <a href="#cta" className="bg-coral text-surface-1 font-semibold px-6 py-3 rounded-lg hover:bg-coral-light transition-colors">Primary Action</a>
            <a href="#features" className="border border-surface-4 text-zinc-300 font-medium px-6 py-3 rounded-lg hover:bg-surface-3 transition-colors">Learn More</a>
          </div>
        </div>
      </header>

      {/* ═══ LIGHT BODY ═══ */}
      <main className="bg-zinc-50 text-zinc-900">
        <section id="features" className="max-w-6xl mx-auto px-6 py-24">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-coral uppercase tracking-wider mb-3">Features</p>
            <h2 className="text-3xl font-bold tracking-tight">What makes this different</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {['Feature One', 'Feature Two', 'Feature Three'].map((title, i) => (
              <div key={i} className="bg-white border border-zinc-200 rounded-xl p-8">
                <div className="w-10 h-10 bg-coral/10 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-coral font-bold font-mono text-sm">{String(i + 1).padStart(2, '0')}</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">{title}</h3>
                <p className="text-zinc-500 leading-relaxed">Describe the feature and its benefit to the user.</p>
              </div>
            ))}
          </div>
        </section>

        <section id="cta" className="border-t border-zinc-200 bg-white">
          <div className="max-w-4xl mx-auto px-6 py-24 text-center">
            <h2 className="text-3xl font-bold tracking-tight mb-4">Ready to get started?</h2>
            <p className="text-zinc-500 mb-8">Call to action supporting text.</p>
            <a href="mailto:hello@brightbase.co" className="inline-block bg-surface-1 text-white font-semibold px-8 py-3.5 rounded-lg hover:bg-zinc-800 transition-colors">Get in Touch</a>
          </div>
        </section>
      </main>

      {/* ═══ DARK FOOTER ═══ */}
      <footer className="bg-surface-1 border-t border-surface-4">
        <div className="max-w-6xl mx-auto px-6 py-8 flex items-center justify-between">
          <p className="text-sm text-zinc-600">&copy; 2026 ProjectName</p>
          <p className="text-xs text-zinc-700 font-mono">built on bbase.ai</p>
        </div>
      </footer>
    </>
  );
}
