
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Menu, X, Github } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <header className="border-b bg-white/95 dark:bg-gray-950/95 sticky top-0 z-40">
      
      <div className="container flex items-center justify-between h-16 px-4 md:px-6">
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-3 no-underline group">
            <img 
              src="/logo/fern.png" 
              alt="FernKit" 
              className="h-7 w-7 sm:h-8 sm:w-8 pixelated transition-transform group-hover:scale-110" 
              style={{
                imageRendering: 'pixelated'
              }}
            />
            <span className="font-pixel text-base sm:text-lg text-gray-900 dark:text-gray-100 hidden sm:inline-block">
              <span>Fern</span>Kit
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link 
            to="/" 
            className="text-base font-medium text-gray-600 dark:text-gray-300 transition-colors no-underline hover:opacity-80"
            style={{ 
              color: 'var(--fern-green)'
            }}
          >
            Home
          </Link>
          <Link 
            to="/docs" 
            className="text-base font-medium text-gray-600 dark:text-gray-300 transition-colors no-underline hover:opacity-80"
            style={{ 
              color: 'var(--fern-green)'
            }}
          >
            Documentation
          </Link>
          <Link 
            to="/quick-start" 
            className="text-base font-medium text-gray-600 dark:text-gray-300 transition-colors no-underline hover:opacity-80"
            style={{ 
              color: 'var(--fern-green)'
            }}
          >
            Quick Start
          </Link>
          <a 
            href="https://github.com/fernkit" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-base font-medium text-gray-600 dark:text-gray-300 transition-colors no-underline flex items-center gap-2 hover:opacity-80"
            style={{ 
              color: 'var(--fern-green)'
            }}
          >
            <Github size={18} />
            GitHub
          </a>
        </nav>

        {/* Mobile menu button */}
        <button
          className="p-2 md:hidden text-gray-600 dark:text-gray-300 transition-colors"
          style={{ color: 'var(--fern-green)' }}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="absolute top-16 left-0 right-0 bg-white/95 dark:bg-gray-950/95 backdrop-blur-sm shadow-lg md:hidden" style={{ borderBottom: '1px solid rgba(69, 113, 67, 0.2)' }}>
            <div className="container px-4 py-4 space-y-3">
              <Link 
                to="/" 
                className="block text-base font-medium transition-colors no-underline py-2 hover:opacity-80"
                style={{ color: 'var(--fern-green)' }}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/docs" 
                className="block text-base font-medium transition-colors no-underline py-2 hover:opacity-80"
                style={{ color: 'var(--fern-green)' }}
                onClick={() => setIsMenuOpen(false)}
              >
                Documentation
              </Link>
              <Link 
                to="/quick-start" 
                className="block text-base font-medium transition-colors no-underline py-2 hover:opacity-80"
                style={{ color: 'var(--fern-green)' }}
                onClick={() => setIsMenuOpen(false)}
              >
                Quick Start
              </Link>
              <a 
                href="https://github.com/fernkit" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block text-base font-medium transition-colors no-underline py-2 flex items-center gap-2 hover:opacity-80"
                style={{ color: 'var(--fern-green)' }}
                onClick={() => setIsMenuOpen(false)}
              >
                <Github size={18} />
                GitHub
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
