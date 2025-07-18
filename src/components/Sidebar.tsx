import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '../lib/utils';
import { useLanguageContext } from '../hooks/useLanguageContext';

interface SidebarItem {
  title: string;
  href: string;
  id: string;
  language?: 'c' | 'cpp' | 'both';
}

interface SidebarSection {
  title: string;
  items: SidebarItem[];
}

interface SidebarProps {
  sections: SidebarSection[];
}

const Sidebar = ({ sections }: SidebarProps) => {
  const location = useLocation();
  const [isMobileOpen, setIsMobileOpen] = React.useState(false);
  const { language } = useLanguageContext();

  // Scroll to top when route changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsMobileOpen(false); // Close mobile menu on navigation
  }, [location.pathname]);

  // Filter items based on the current language
  const getFilteredItems = (items: SidebarItem[]) => {
    return items.filter(item => 
      item.language === undefined || 
      item.language === 'both' ||   
      item.language === language    
    );
  };

  const getLanguageIcon = (lang: string) => {
    switch(lang) {
      case 'cpp':
        return (
          <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
            <path d="M22.394 6c-.167-.29-.398-.543-.652-.69L12.926.22c-.509-.294-1.34-.294-1.848 0L2.26 5.31c-.508.293-.923 1.013-.923 1.6v10.18c0 .294.104.62.271.91.167.29.398.543.652.69l8.816 5.09c.508.293 1.34.293 1.848 0l8.816-5.09c.254-.147.485-.4.652-.69.167-.29.27-.616.27-.91V6.91c.003-.294-.1-.62-.268-.91zM12 19.109c-3.92 0-7.109-3.189-7.109-7.109S8.08 4.891 12 4.891a7.133 7.133 0 016.156 3.552l-3.076 1.781A3.567 3.567 0 0012 8.445c-1.96 0-3.554 1.595-3.554 3.555S10.04 15.555 12 15.555a3.57 3.57 0 003.08-1.778l3.077 1.78A7.135 7.135 0 0112 19.109zm7.109-6.714h-.79v.79h-.79v-.79h-.79v-.79h.79v-.79h.79v.79h.79v.79zm2.962 0h-.79v.79h-.79v-.79h-.79v-.79h.79v-.79h.79v.79h.79v.79z"/>
          </svg>
        );
      case 'c':
        return (
          <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
            <path d="M16.5986 9.1240c-.1924-.0635-.3993-.0635-.5917 0-.9755.3142-1.9510.6284-2.9264.9426-.0848.0274-.1697.0411-.2618.0411-.0921 0-.1769-.0137-.2618-.0411-.9754-.3142-1.9509-.6284-2.9264-.9426-.1924-.0635-.3992-.0635-.5916 0L4.0000 12.0000l5.0390 2.8760c.1924.0635.3992.0635.5916 0 .9755-.3142 1.9510-.6284 2.9264-.9426.0849-.0274.1697-.0411.2618-.0411.0921 0 .1770.0137.2618.0411.9755.3142 1.9509.6284 2.9264.9426.1924.0635.3993.0635.5917 0L20.0000 12.0000l-3.4014-2.8760z"/>
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <>
      {/* Mobile toggle with pixelated design */}
      <div className="block lg:hidden mb-6">
        <button
          type="button"
          className="w-full flex items-center justify-between px-4 py-3 text-sm font-pixel-text text-fern-200 bg-fern-800/80 hover:bg-fern-700/80 transition-all duration-200 border-2 border-fern-600 btn-pixel"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          style={{
            clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))'
          }}
        >
          <div className="flex items-center gap-2">
            {getLanguageIcon(language)}
            <span>{language === 'cpp' ? 'C++ Documentation' : 'C Documentation'}</span>
          </div>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className={cn("h-4 w-4 transition-transform duration-200", isMobileOpen && "rotate-180")} 
            viewBox="0 0 20 20" 
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      <div
        className={cn(
          "lg:block border-r-4 border-fern-700 lg:w-72 pr-4 pb-10 lg:pb-0 bg-fern-900/80 backdrop-blur-sm relative",
          isMobileOpen ? "block" : "hidden"
        )}
      >
        {/* Background patterns */}
        <div className="absolute inset-0 pixel-grid opacity-5"></div>
        
        <div className="lg:sticky lg:top-16 overflow-y-auto py-6 h-[calc(100vh-4rem)] scrollbar-thin scrollbar-thumb-fern-600 scrollbar-track-transparent relative z-10">
          <div className="px-3 py-2 space-y-6">
            
            {/* Enhanced Language indicator */}
            <div className="p-4 bg-fern-800/60 border-2 border-fern-600 shadow-sm imperfect-border"
              style={{
                clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))'
              }}
            >
              <div className="flex items-center gap-3 mb-2">
                {getLanguageIcon(language)}
                <div>
                  <p className="text-sm font-pixel text-fern-100">
                    {language === 'cpp' ? 'C++ Implementation' : 'C Implementation'}
                  </p>
                  <p className="text-xs text-fern-400 font-pixel-text">
                    Switch using the toggle above
                  </p>
                </div>
              </div>
              
              {/* Feature highlights for current language */}
              <div className="mt-3 space-y-1">
                {language === 'cpp' ? (
                  <>
                    <div className="flex items-center gap-2 text-xs text-fern-300 font-pixel-text">
                      <div className="w-1.5 h-1.5 bg-fern-400 pixelated"></div>
                      <span>Object-oriented design</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-fern-300 font-pixel-text">
                      <div className="w-1.5 h-1.5 bg-fern-500 pixelated"></div>
                      <span>Signal/slot system</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-fern-300 font-pixel-text">
                      <div className="w-1.5 h-1.5 bg-fern-600 pixelated"></div>
                      <span>Flutter-inspired layouts</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-center gap-2 text-xs text-fern-300 font-pixel-text">
                      <div className="w-1.5 h-1.5 bg-fern-400 pixelated"></div>
                      <span>Minimalist approach</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-fern-300 font-pixel-text">
                      <div className="w-1.5 h-1.5 bg-fern-500 pixelated"></div>
                      <span>Declarative API</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-fern-300 font-pixel-text">
                      <div className="w-1.5 h-1.5 bg-fern-600 pixelated"></div>
                      <span>Educational focus</span>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Navigation sections */}
            {sections.map((section, index) => {
              const filteredItems = getFilteredItems(section.items);
              
              if (filteredItems.length === 0) return null;
              
              return (
                <div key={index} className="space-y-2">
                  <div className="flex items-center gap-2 px-2">
                    <div className="w-2 h-2 bg-fern-400 pixelated"></div>
                    <h5 className="text-xs font-pixel uppercase tracking-wider text-fern-300">
                      {section.title}
                    </h5>
                  </div>
                  
                  <nav className="space-y-1">
                    {filteredItems.map((item) => {
                      const isActive = location.pathname === item.href;
                      return (
                        <Link
                          key={item.id}
                          to={item.href}
                          className={cn(
                            "group flex items-center justify-between px-3 py-2.5 text-sm transition-all duration-200 relative overflow-hidden font-pixel-text",
                            isActive
                              ? "bg-fern-600 text-fern-100 font-medium shadow-md border-2 border-fern-500"
                              : "text-fern-300 hover:text-fern-200 hover:bg-fern-800/60 border-2 border-transparent hover:border-fern-700/50"
                          )}
                          style={{
                            clipPath: 'polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))'
                          }}
                        >
                          <div className="flex items-center gap-3 flex-1 min-w-0">
                            {/* Active indicator dot */}
                            {isActive && (
                              <div className="w-1.5 h-1.5 bg-fern-200 pixelated flex-shrink-0"></div>
                            )}
                            
                            <span className="truncate">{item.title}</span>
                          </div>
                          
                          {/* Language badges */}
                          <div className="flex items-center gap-1 flex-shrink-0 ml-2">
                            {item.language === 'cpp' && (
                              <span className="inline-flex items-center gap-1 px-1.5 py-0.5 text-xs bg-fern-700/60 text-fern-200 border border-fern-600/40 pixelated">
                                {getLanguageIcon('cpp')}
                                <span className="hidden sm:inline">C++</span>
                              </span>
                            )}
                            {item.language === 'c' && (
                              <span className="inline-flex items-center gap-1 px-1.5 py-0.5 text-xs bg-fern-700/60 text-fern-200 border border-fern-600/40 pixelated">
                                {getLanguageIcon('c')}
                                <span className="hidden sm:inline">C</span>
                              </span>
                            )}
                            {isActive && (
                              <svg className="w-3 h-3 text-fern-200" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                              </svg>
                            )}
                          </div>
                        </Link>
                      );
                    })}
                  </nav>
                </div>
              );
            })}
            
            {/* Quick links section */}
            <div className="pt-4 border-t-2 border-fern-700/50">
              <div className="flex items-center gap-2 px-2 mb-3">
                <div className="w-2 h-2 bg-fern-400 pixelated"></div>
                <h5 className="text-xs font-pixel uppercase tracking-wider text-fern-300">
                  Quick Links
                </h5>
              </div>
              
              <div className="space-y-1">
                <Link
                  to="/quick-start"
                  className="flex items-center gap-2 px-3 py-2 text-sm text-fern-300 hover:text-fern-200 hover:bg-fern-800/60 transition-colors font-pixel-text border-2 border-transparent hover:border-fern-700/50"
                  style={{
                    clipPath: 'polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))'
                  }}
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                  Quick Start
                </Link>
                
                <a
                  href="https://github.com/fernkit"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-2 text-sm text-fern-300 hover:text-fern-200 hover:bg-fern-800/60 transition-colors font-pixel-text border-2 border-transparent hover:border-fern-700/50"
                  style={{
                    clipPath: 'polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))'
                  }}
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
                  </svg>
                  FernKit GitHub
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
