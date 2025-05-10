
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Home, Code, Menu, X } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <header className="border-b border-border bg-background/95 backdrop-blur-sm sticky top-0 z-40">
      <div className="container flex items-center justify-between h-16 px-4 md:px-6">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2 no-underline">
            <img 
              src="/lovable-uploads/4436af5f-ff0f-459d-b3f7-41c58f50b55f.png" 
              alt="Fern Graphics" 
              className="h-8 w-auto" 
            />
            <span className="font-semibold text-lg text-foreground hidden sm:inline-block">
              Fern Graphics
            </span>
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          className="p-2 md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors no-underline">
            Home
          </Link>
          <Link to="/docs" className="text-muted-foreground hover:text-foreground transition-colors no-underline">
            Documentation
          </Link>
          <Link to="/quick-start" className="text-muted-foreground hover:text-foreground transition-colors no-underline">
            Quick Start
          </Link>
          <Link to="https://github.com/RishiAhuja/fern" target="_blank" rel="noopener noreferrer">
            <Button variant="outline" size="sm" className="gap-2">
              <Code size={16} />
              <span>GitHub</span>
            </Button>
          </Link>
        </nav>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="absolute top-16 left-0 right-0 bg-background border-b border-border p-4 md:hidden animate-pixel-fade">
            <nav className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className="flex items-center gap-2 p-2 hover:bg-secondary rounded-md no-underline"
                onClick={() => setIsMenuOpen(false)}
              >
                <Home size={18} />
                <span>Home</span>
              </Link>
              <Link 
                to="/docs" 
                className="flex items-center gap-2 p-2 hover:bg-secondary rounded-md no-underline"
                onClick={() => setIsMenuOpen(false)}
              >
                <Code size={18} />
                <span>Documentation</span>
              </Link>
              <Link 
                to="/quick-start" 
                className="flex items-center gap-2 p-2 hover:bg-secondary rounded-md no-underline"
                onClick={() => setIsMenuOpen(false)}
              >
                <Code size={18} />
                <span>Quick Start</span>
              </Link>
              <Link 
                to="https://github.com/RishiAhuja/fern" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 p-2 bg-primary text-primary-foreground rounded-md no-underline"
                onClick={() => setIsMenuOpen(false)}
              >
                <Code size={18} />
                <span>GitHub</span>
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
