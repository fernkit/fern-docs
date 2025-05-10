
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface SidebarSection {
  title: string;
  items: {
    title: string;
    href: string;
    id: string;
  }[];
}

interface SidebarProps {
  sections: SidebarSection[];
}

const Sidebar = ({ sections }: SidebarProps) => {
  const location = useLocation();
  const [isMobileOpen, setIsMobileOpen] = React.useState(false);

  return (
    <>
      {/* Mobile toggle */}
      <div className="block lg:hidden mb-6">
        <button
          type="button"
          className="w-full flex items-center justify-between px-4 py-2 text-sm font-medium text-foreground bg-secondary rounded-md hover:bg-secondary/80"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
        >
          <span>Documentation Menu</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d={
                isMobileOpen
                  ? "M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                  : "M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              }
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      <div
        className={cn(
          "lg:block border-r border-border lg:w-64 pr-4 pb-10 lg:pb-0",
          isMobileOpen ? "block" : "hidden"
        )}
      >
        <div className="lg:sticky lg:top-16 overflow-y-auto py-6 h-[calc(100vh-4rem)]">
          <div className="px-3 py-2">
            {sections.map((section, index) => (
              <div key={index} className="mb-6">
                <h5 className="mb-2 text-sm font-medium uppercase tracking-wider text-muted-foreground">
                  {section.title}
                </h5>
                <ul className="space-y-1">
                  {section.items.map((item) => (
                    <li key={item.id}>
                      <Link
                        to={item.href}
                        className={cn(
                          "block px-3 py-2 text-sm rounded-md",
                          location.pathname === item.href
                            ? "bg-primary text-white font-medium" // Changed text color to white for better contrast
                            : "text-foreground hover:text-foreground hover:bg-secondary"
                        )}
                      >
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
