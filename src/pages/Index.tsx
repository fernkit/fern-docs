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
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative overflow-hidden border-b border-border/20" style={{
          background: `linear-gradient(135deg, #F8FAF5 0%, #F8FAF5 100%)`,
        }}>
          {/* Simple grid background */}
          <div className="absolute inset-0 opacity-10">
            <div className="w-full h-full" style={{
              backgroundImage: `linear-gradient(to right, var(--fern-green) 1px, transparent 1px), linear-gradient(to bottom, var(--fern-green) 1px, transparent 1px)`,
              backgroundSize: '40px 40px'
            }}></div>
          </div>
          
          <div className="container px-4 py-24 md:py-32 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <div className="flex justify-center mb-8">
                <img 
                  src="/logo/fern.png" 
                  alt="FernKit Logo" 
                  className="h-24 w-24 pixelated transition-transform hover:scale-110" 
                  style={{
                    imageRendering: 'pixelated'
                  }}
                />
              </div>
              
              <h1 className="text-5xl md:text-7xl font-pixel text-gray-900 mb-6 leading-tight tracking-wider">
                <span style={{ color: 'var(--fern-green)' }}>Fern</span>Kit
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-700 mb-4 max-w-3xl mx-auto leading-relaxed">
                A Minimalist, Handcrafted Software Ecosystem
              </p>
              
              <p className="text-lg text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed">
                Low-level, system-oriented developer tools built around nature, growth, imperfection, and emergence. 
                Where frameworks strive for abstraction, FernKit leans into raw control and transparent design.
              </p>
              
              <div className="flex flex-wrap gap-6 justify-center">
                <Button 
                  asChild 
                  size="lg" 
                  className="gap-3 text-white text-lg px-8 py-4 font-pixel transition-transform hover:translate-x-1 hover:translate-y-1 active:translate-x-2 active:translate-y-2"
                  style={{ 
                    backgroundColor: 'var(--fern-green)', 
                    border: '2px solid #2d4a2d',
                    boxShadow: '4px 4px 0px #2d4a2d'
                  }}
                >
                  <Link to="/quick-start" className='!text-white'>
                    <Leaf size={20} />
                    Start Growing
                  </Link>
                </Button>
                <Button 
                  asChild 
                  size="lg" 
                  className="text-lg px-8 py-4 font-pixel transition-transform hover:translate-x-1 hover:translate-y-1 active:translate-x-2 active:translate-y-2"
                  style={{ 
                    backgroundColor: 'white', 
                    color: 'var(--fern-green)',
                    border: '2px solid var(--fern-green)',
                    boxShadow: '4px 4px 0px var(--fern-green)'
                  }}
                >
                  <Link to="/docs">
                    <Code2 size={20} />
                    Documentation
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Philosophy Section */}
        <section className="py-20 bg-background">
          <div className="container px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-pixel mb-6 text-foreground">The FernKit Philosophy</h2>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                  Our ecosystem is guided by core principles that define our approach to building software.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {philosophies.map((philosophy, index) => (
                  <div 
                    key={philosophy.title}
                    className="group relative p-6 rounded-lg bg-white/80 backdrop-blur-sm border-2 transition-all duration-300"
                    style={{ borderColor: 'rgba(69, 113, 67, 0.3)' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(69, 113, 67, 0.6)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(69, 113, 67, 0.3)';
                    }}
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 p-2 rounded transition-colors"
                           style={{ backgroundColor: 'rgba(69, 113, 67, 0.1)' }}>
                        <philosophy.icon size={20} style={{ color: 'var(--fern-green)' }} />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-pixel mb-2 text-foreground">{philosophy.title}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">{philosophy.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Core Repositories Section */}
        <section className="py-20 bg-background">
          <div className="container px-4">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-pixel mb-6 text-foreground">Core Repositories</h2>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                  FernKit is composed of several handcrafted tools that bring the ecosystem to life.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {tools.map((tool, index) => (
                  <div 
                    key={tool.name}
                    className="group relative bg-white/95 rounded-lg overflow-hidden border transition-all duration-300 hover:shadow-md"
                    style={{ borderColor: 'rgba(69, 113, 67, 0.1)' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(69, 113, 67, 0.2)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(69, 113, 67, 0.1)';
                    }}
                  >
                    {/* Very subtle background */}
                    <div className="absolute inset-0 bg-gray-50/30"></div>
                    
                    <div className="relative p-6">
                      {/* Tool header with logo and name */}
                      <div className="flex items-center gap-4 mb-4">
                        <div className="relative">
                          <img 
                            src={tool.logo} 
                            alt={`${tool.name} logo`}
                            className="h-10 w-10 pixelated"
                            style={{
                              imageRendering: 'pixelated'
                            }}
                          />
                        </div>
                        <div>
                          <h3 className="text-2xl font-pixel text-foreground">{tool.name}</h3>
                          <span className="inline-block px-2 py-1 text-xs bg-muted text-muted-foreground rounded border">
                            {tool.language}
                          </span>
                        </div>
                      </div>
                      
                      {/* Description */}
                      <p className="text-muted-foreground leading-relaxed mb-6">
                        {tool.description}
                      </p>
                      
                      {/* Footer with GitHub link */}
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">{tool.repo}</span>
                        <Button
                          asChild
                          variant="ghost"
                          size="sm"
                          className="gap-2 transition-colors"
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = 'rgba(69, 113, 67, 0.1)';
                            e.currentTarget.style.color = 'var(--fern-green)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = '';
                            e.currentTarget.style.color = '';
                          }}
                        >
                          <a href={`https://${tool.repo}`} target="_blank" rel="noopener noreferrer">
                            <Github size={16} />
                            <ExternalLink size={12} />
                          </a>
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-background">
          <div className="container px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl md:text-5xl font-pixel mb-6 text-foreground">Ready to Build Something Amazing?</h2>
              <p className="text-xl mb-8 leading-relaxed text-muted-foreground">
                Join the FernKit ecosystem. Start with any tool that speaks to you, 
                or plant the entire garden and watch your projects flourish.
              </p>
              <div className="flex flex-wrap gap-6 justify-center">
                <Button 
                  asChild 
                  size="lg" 
                  className="gap-3 text-white text-lg px-8 py-4 font-pixel transition-transform hover:translate-x-1 hover:translate-y-1 active:translate-x-2 active:translate-y-2"
                  style={{ 
                    backgroundColor: 'var(--fern-green)', 
                    border: '2px solid #2d4a2d',
                    boxShadow: '4px 4px 0px #2d4a2d'
                  }}
                >
                  <Link to="/quick-start" className="!text-white">
                    <Leaf size={20} />
                    Quick Start Guide
                  </Link>
                </Button>
                <Button 
                  asChild 
                  size="lg" 
                  className="gap-3 text-lg px-8 py-4 font-pixel transition-transform hover:translate-x-1 hover:translate-y-1 active:translate-x-2 active:translate-y-2"
                  style={{ 
                    backgroundColor: 'white', 
                    color: 'var(--fern-green)',
                    border: '2px solid var(--fern-green)',
                    boxShadow: '4px 4px 0px var(--fern-green)'
                  }}
                >
                  <a href="https://github.com/fernkit" target="_blank" rel="noopener noreferrer">
                    <Github size={20} />
                    Explore on GitHub
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
