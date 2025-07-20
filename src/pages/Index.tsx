import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowRight, Github, Code2, Layers, Network, Terminal, Zap, Leaf, BookOpen, ExternalLink } from "lucide-react";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Index = () => {
  const tools = [
    {
      name: "fern",
      logo: "/logo/fern.png",
      description: "A UI toolkit for WASM & Linux, rendered pixel-by-pixel from scratch.",
      language: "C++",
      repo: "github.com/fernkit/fern",
      color: "from-green-600 to-emerald-700",
      icon: Layers
    },
    {
      name: "terra",
      logo: "/logo/terra.png",
      description: "The underlying CLI toolchain for managing FernKit project workflows.",
      language: "Python",
      repo: "github.com/fernkit/terra",
      color: "from-amber-600 to-orange-700",
      icon: Terminal
    },
    {
      name: "conduit",
      logo: "/logo/conduit.png",
      description: "A simple socket client for synchronous, low-level networking.",
      language: "C++",
      repo: "github.com/fernkit/conduit",
      color: "from-blue-600 to-cyan-700",
      icon: Network
    },
    {
      name: "grub",
      logo: "/logo/grub.png",
      description: "A low-level, imperfect ttf text rasterizer for Fern apps.",
      language: "C++",
      repo: "github.com/fernkit/grub",
      color: "from-purple-600 to-violet-700",
      icon: Code2
    },
    {
      name: "gleeb",
      logo: "/logo/gleeb.png",
      description: "A language server providing code intelligence for the Fern UI toolkit.",
      language: "TypeScript",
      repo: "github.com/fernkit/gleeb",
      color: "from-indigo-600 to-blue-700",
      icon: Zap
    },
    {
      name: "flare",
      logo: "/logo/flare.png",
      description: "A repository of starter templates for bootstrapping FernKit projects.",
      language: "C++",
      repo: "github.com/fernkit/flare",
      color: "from-red-600 to-rose-700",
      icon: BookOpen
    }
  ];

  const philosophies = [
    {
      title: "Built to Teach",
      description: "Transparent learning tools that expose inner workings instead of hiding them in black boxes. Understanding fundamentals through hands-on exploration.",
      icon: BookOpen
    },
    {
      title: "Imperfect and Evolving",
      description: "A living system that embraces flaws as authentic signs of growth. Tools released early, evolving publicly with the community.",
      icon: Leaf
    },
    {
      title: "Thematically Cohesive",
      description: "Nature metaphors guide architecture. Terra (soil), Fern (plant), Conduit (roots), Grub (larva) - each tool reflects its place in the lifecycle.",
      icon: Layers
    },
    {
      title: "Minimal and Composable",
      description: "Lean, understandable codebases with minimal dependencies. Complete control and responsibility. Use the entire ecosystem or cherry-pick individual tools.",
      icon: Terminal
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background overflow-x-hidden">
      <Navbar />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative overflow-hidden border-b border-border/20 py-16 sm:py-20 md:py-24 lg:py-32" style={{
          background: `linear-gradient(135deg, #F8FAF5 0%, #F8FAF5 100%)`,
        }}>
          <div className="absolute inset-0 opacity-10">
            <div className="w-full h-full" style={{
              backgroundImage: `linear-gradient(to right, var(--fern-green) 1px, transparent 1px), linear-gradient(to bottom, var(--fern-green) 1px, transparent 1px)`,
              backgroundSize: '40px 40px'
            }}></div>
          </div>

          {/* CORRECTED: Replaced 'max-w-full' with a standard, responsive container */}
          <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <div className="flex justify-center mb-6 sm:mb-8">
                <img
                  src="/logo/fern.png"
                  alt="FernKit Logo"
                  className="h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 pixelated transition-transform hover:scale-110"
                  style={{
                    imageRendering: 'pixelated'
                  }}
                />
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-pixel text-gray-900 mb-4 sm:mb-6 leading-tight tracking-wider break-words">
                <span style={{ color: 'var(--fern-green)' }}>Fern</span>Kit
              </h1>

              <p className="text-lg sm:text-xl md:text-xl lg:text-2xl text-gray-700 mb-3 sm:mb-4 max-w-3xl mx-auto leading-relaxed">
                A Minimalist, Handcrafted Software Ecosystem
              </p>

              <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-8 sm:mb-10 md:mb-12 max-w-4xl mx-auto leading-relaxed">
                Low-level, system-oriented developer tools built around nature, growth, imperfection, and emergence.
                Where frameworks strive for abstraction, FernKit leans into raw control and transparent design.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center max-w-2xl mx-auto">
                <Button
                  asChild
                  size="lg"
                  className="w-full sm:w-auto gap-3 text-white text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 font-pixel transition-transform hover:translate-x-1 hover:translate-y-1 active:translate-x-2 active:translate-y-2"
                  style={{
                    backgroundColor: 'var(--fern-green)',
                    border: '2px solid #2d4a2d',
                    boxShadow: '4px 4px 0px #2d4a2d'
                  }}
                >
                  <Link to="/quick-start" className='!text-white flex items-center gap-3 justify-center'>
                    <Leaf size={18} />
                    Start Growing
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  className="w-full sm:w-auto gap-3 text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 font-pixel transition-transform hover:translate-x-1 hover:translate-y-1 active:translate-x-2 active:translate-y-2"
                  style={{
                    backgroundColor: 'white',
                    color: 'var(--fern-green)',
                    border: '2px solid var(--fern-green)',
                    boxShadow: '4px 4px 0px var(--fern-green)'
                  }}
                >
                  <Link to="/docs" className='flex items-center gap-3 justify-center'>
                    <Code2 size={18} />
                    Documentation
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Philosophy Section in Index.js */}
<section className="py-16 sm:py-20 bg-background">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-pixel mb-4 sm:mb-6 text-foreground break-words">The FernKit Philosophy</h2>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Our ecosystem is guided by core principles that define our approach to building software.
            </p>
        </div>

        {/* CORRECTED: Removed 'max-w-5xl mx-auto' to let this grid fill the container */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
            {philosophies.map((philosophy) => (
                <div
                    key={philosophy.title}
                    className="group relative p-4 sm:p-5 lg:p-6 rounded-lg bg-white/80 backdrop-blur-sm border-2 transition-all duration-300 w-full"
                    style={{ borderColor: 'rgba(69, 113, 67, 0.3)' }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(69, 113, 67, 0.6)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(69, 113, 67, 0.3)'; }}
                >
                    <div className="flex items-start gap-3 sm:gap-4">
                        <div className="flex-shrink-0 p-2 rounded transition-colors"
                            style={{ backgroundColor: 'rgba(69, 113, 67, 0.1)' }}>
                            <philosophy.icon size={16} style={{ color: 'var(--fern-green)' }} />
                        </div>
                        <div className="flex-1 min-w-0">
                            <h3 className="text-sm sm:text-base lg:text-lg font-pixel mb-2 text-foreground break-words">{philosophy.title}</h3>
                            <p className="text-xs sm:text-sm leading-relaxed text-muted-foreground">{philosophy.description}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
</section>

        {/* Core Repositories Section */}
        <section className="py-16 sm:py-20 bg-background">
          {/* CORRECTED: Ensured standard container classes for responsive padding */}
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-pixel mb-4 sm:mb-6 text-foreground">Core Repositories</h2>
              <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                FernKit is composed of several handcrafted tools that bring the ecosystem to life.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {tools.map((tool) => (
                <div
                  key={tool.name}
                  className="group relative bg-white/95 rounded-lg border transition-all duration-300 hover:shadow-md w-full"
                  style={{ borderColor: 'rgba(69, 113, 67, 0.1)' }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(69, 113, 67, 0.2)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(69, 113, 67, 0.1)'; }}
                >
                  <div className="absolute inset-0 bg-gray-50/30 rounded-lg"></div>

                  <div className="relative p-4 sm:p-5 lg:p-6 h-full flex flex-col">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="flex-shrink-0">
                        <img
                          src={tool.logo}
                          alt={`${tool.name} logo`}
                          className="h-8 w-8 sm:h-9 sm:w-9 pixelated"
                          style={{ imageRendering: 'pixelated' }}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base sm:text-lg lg:text-xl font-pixel text-foreground break-words">{tool.name}</h3>
                        <span className="inline-block px-2 py-0.5 text-xs bg-muted text-muted-foreground rounded border mt-1">
                          {tool.language}
                        </span>
                      </div>
                    </div>

                    <p className="text-muted-foreground leading-relaxed mb-4 text-sm flex-grow">
                      {tool.description}
                    </p>

                    <div className="flex items-center gap-2 mt-auto">
                      <span className="text-xs text-muted-foreground break-all flex-1 min-w-0">{tool.repo}</span>
                      <Button
                        asChild
                        variant="ghost"
                        size="sm"
                        className="gap-1 transition-colors flex-shrink-0 p-2"
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = 'rgba(69, 113, 67, 0.1)';
                          e.currentTarget.style.color = 'var(--fern-green)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = '';
                          e.currentTarget.style.color = '';
                        }}
                      >
                        <a href={`https://${tool.repo}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
                          <Github size={12} />
                          <ExternalLink size={10} />
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 sm:py-20 bg-background">
          {/* CORRECTED: Applied standard container for consistency */}
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-pixel mb-4 sm:mb-6 text-foreground break-words">Ready to Build Something Amazing?</h2>
              <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 leading-relaxed text-muted-foreground max-w-3xl mx-auto">
                Join the FernKit ecosystem. Start with any tool that speaks to you,
                or plant the entire garden and watch your projects flourish.
              </p>
              <div className="flex flex-col gap-3 sm:gap-4 justify-center items-stretch max-w-md mx-auto sm:max-w-none sm:flex-row sm:items-center">
                <Button
                  asChild
                  size="lg"
                  className="gap-2 sm:gap-3 text-white text-sm sm:text-base px-4 sm:px-6 py-3 sm:py-4 font-pixel transition-transform hover:translate-x-1 hover:translate-y-1 active:translate-x-2 active:translate-y-2 whitespace-nowrap"
                  style={{
                    backgroundColor: 'var(--fern-green)',
                    border: '2px solid #2d4a2d',
                    boxShadow: '4px 4px 0px #2d4a2d'
                  }}
                >
                  <Link to="/quick-start" className="!text-white flex items-center gap-2 sm:gap-3 justify-center">
                    <Leaf size={16} />
                    <span className="hidden sm:inline">Quick Start Guide</span>
                    <span className="sm:hidden">Quick Start</span>
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  className="gap-2 sm:gap-3 text-sm sm:text-base px-4 sm:px-6 py-3 sm:py-4 font-pixel transition-transform hover:translate-x-1 hover:translate-y-1 active:translate-x-2 active:translate-y-2 whitespace-nowrap"
                  style={{
                    backgroundColor: 'white',
                    color: 'var(--fern-green)',
                    border: '2px solid var(--fern-green)',
                    boxShadow: '4px 4px 0px var(--fern-green)'
                  }}
                >
                  <a href="https://github.com/fernkit" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 sm:gap-3 justify-center">
                    <Github size={16} />
                    <span className="hidden sm:inline">Explore on GitHub</span>
                    <span className="sm:hidden">GitHub</span>
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
