
import React from 'react';
import { Link } from 'react-router-dom';
import { Github, ExternalLink, Leaf, BookOpen, Zap, Terminal, Network, Code2 } from 'lucide-react';

const Footer = () => {
  const tools = [
    { name: "fern", icon: Leaf, repo: "github.com/fernkit/fern" },
    { name: "terra", icon: Terminal, repo: "github.com/fernkit/terra" },
    { name: "conduit", icon: Network, repo: "github.com/fernkit/conduit" },
    { name: "grub", icon: Code2, repo: "github.com/fernkit/grub" },
    { name: "gleeb", icon: Zap, repo: "github.com/fernkit/gleeb" },
    { name: "flare", icon: BookOpen, repo: "github.com/fernkit/flare" }
  ];

  return (
    <footer className="bg-white dark:bg-gray-900 mt-12 pt-16 pb-8 border-t-2" style={{ borderColor: 'rgba(69, 113, 67, 0.2)' }}>
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* FernKit Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="relative">
                <img 
                  src="/logo/fern.png" 
                  alt="FernKit" 
                  className="h-10 w-10 pixelated" 
                  style={{
                    imageRendering: 'pixelated'
                  }}
                />
              </div>
              <div>
                <span className="font-pixel text-xl text-gray-900 dark:text-gray-100">
                  <span style={{ color: 'var(--fern-green)' }}>Fern</span>Kit
                </span>
                <p className="text-gray-600 dark:text-gray-400 text-sm">A Minimalist, Handcrafted Software Ecosystem</p>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed max-w-md">
              Low-level, system-oriented developer tools built around nature, growth, imperfection, and emergence. 
              Where frameworks strive for abstraction, FernKit leans into raw control and transparent design.
            </p>
          </div>
          
          {/* Core Tools */}
          <div>
            <h3 className="font-pixel text-lg mb-6 text-gray-900 dark:text-gray-100">Core Tools</h3>
            <ul className="space-y-3 text-sm">
              {tools.slice(0, 3).map((tool) => (
                <li key={tool.name}>
                  <a 
                    href={`https://${tool.repo}`}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:opacity-80 transition-colors group"
                    style={{ color: 'var(--fern-green)' }}
                  >
                    <tool.icon size={14} className="group-hover:animate-pulse" />
                    <span>{tool.name}</span>
                    <ExternalLink size={10} className="opacity-60" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* More Tools */}
          <div>
            <h3 className="font-pixel text-lg mb-6 text-gray-900 dark:text-gray-100">More Tools</h3>
            <ul className="space-y-3 text-sm">
              {tools.slice(3).map((tool) => (
                <li key={tool.name}>
                  <a 
                    href={`https://${tool.repo}`}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:opacity-80 transition-colors group"
                    style={{ color: 'var(--fern-green)' }}
                  >
                    <tool.icon size={14} className="group-hover:animate-pulse" />
                    <span>{tool.name}</span>
                    <ExternalLink size={10} className="opacity-60" />
                  </a>
                </li>
              ))}
              <li>
                <Link 
                  to="/docs"
                  className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:opacity-80 transition-colors group"
                  style={{ color: 'var(--fern-green)' }}
                >
                  <BookOpen size={14} className="group-hover:animate-pulse" />
                  <span>fern-docs</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Philosophy */}
        <div className="mt-12 pt-8 border-t" style={{ borderColor: 'rgba(69, 113, 67, 0.2)' }}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            <div className="group">
              <BookOpen size={20} className="mx-auto mb-2 transition-colors" style={{ color: 'var(--fern-green)' }} />
              <h4 className="font-pixel text-sm text-gray-900 dark:text-gray-100 mb-1">Built to Teach</h4>
              <p className="text-xs text-gray-600 dark:text-gray-400">Transparent learning tools</p>
            </div>
            <div className="group">
              <Leaf size={20} className="mx-auto mb-2 transition-colors" style={{ color: 'var(--fern-green)' }} />
              <h4 className="font-pixel text-sm text-gray-900 dark:text-gray-100 mb-1">Imperfect & Evolving</h4>
              <p className="text-xs text-gray-600 dark:text-gray-400">Embracing authentic growth</p>
            </div>
            <div className="group">
              <Network size={20} className="mx-auto mb-2 transition-colors" style={{ color: 'var(--fern-green)' }} />
              <h4 className="font-pixel text-sm text-gray-900 dark:text-gray-100 mb-1">Thematically Cohesive</h4>
              <p className="text-xs text-gray-600 dark:text-gray-400">Nature-guided architecture</p>
            </div>
            <div className="group">
              <Terminal size={20} className="mx-auto mb-2 transition-colors" style={{ color: 'var(--fern-green)' }} />
              <h4 className="font-pixel text-sm text-gray-900 dark:text-gray-100 mb-1">Minimal & Composable</h4>
              <p className="text-xs text-gray-600 dark:text-gray-400">Lean, understandable code</p>
            </div>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t flex flex-col md:flex-row items-center justify-between gap-4" style={{ borderColor: 'rgba(69, 113, 67, 0.2)' }}>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            © {new Date().getFullYear()} FernKit. Handcrafted with care. Released under MIT License.
          </p>
          <div className="flex items-center gap-4">
            <a 
              href="https://github.com/fernkit" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:opacity-80 transition-colors text-sm"
              style={{ color: 'var(--fern-green)' }}
            >
              <Github size={16} />
              <span>GitHub</span>
            </a>
            <Link 
              to="/docs" 
              className="flex items-center gap-2 hover:opacity-80 transition-colors text-sm"
              style={{ color: 'var(--fern-green)' }}
            >
              <BookOpen size={16} />
              <span>Docs</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
