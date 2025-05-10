
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-secondary mt-12 pt-8 pb-6 border-t border-border">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img 
                src="/lovable-uploads/4436af5f-ff0f-459d-b3f7-41c58f50b55f.png" 
                alt="Fern Graphics" 
                className="h-8 w-auto" 
              />
              <span className="font-semibold">Fern Graphics</span>
            </div>
            <p className="text-muted-foreground text-sm">
              A lightweight single-file WebAssembly-based graphics library for creating visual interactive applications using simple C code.
            </p>
          </div>
          
          <div>
            <h3 className="font-medium text-lg mb-4">Documentation</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/docs" className="hover:text-foreground transition-colors">API Reference</Link>
              </li>
              <li>
                <Link to="/quick-start" className="hover:text-foreground transition-colors">Quick Start Guide</Link>
              </li>
              <li>
                <Link to="/docs" className="hover:text-foreground transition-colors">Core Types</Link>
              </li>
              <li>
                <Link to="/docs" className="hover:text-foreground transition-colors">Widget Functions</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-lg mb-4">Project</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a 
                  href="https://github.com/RishiAhuja/fern" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors"
                >
                  GitHub Repository
                </a>
              </li>
              <li>
                <a 
                  href="https://github.com/RishiAhuja/fern/issues" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors"
                >
                  Report an Issue
                </a>
              </li>
              <li>
                <a 
                  href="https://github.com/RishiAhuja/fern/pulls" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors"
                >
                  Contribute
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-border text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Fern Graphics. Released under the MIT License.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
