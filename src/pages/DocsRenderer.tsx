import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowLeft, BookOpen, Folder, File, Github } from "lucide-react";
import { marked } from 'marked';
import Navbar from '@/components/Navbar';

interface DocFile {
  name: string;
  path: string;
  type: 'file' | 'directory';
  children?: DocFile[];
}

interface DocContent {
  title: string;
  content: string;
  lastModified?: string;
}

const DocsRenderer = () => {
  const { '*': docPath } = useParams();
  const [docStructure, setDocStructure] = useState<DocFile[]>([]);
  const [currentDoc, setCurrentDoc] = useState<DocContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Configurable doc structure - easily reorder and rename items here
  const docStructureConfig: DocFile[] = [
    // Top-level getting started docs (order: 1)
    {
      name: "Getting Started",
      path: "getting-started",
      type: "file"
    },
    {
      name: "Project Structure", 
      path: "project-structure",
      type: "file"
    },
    
    // Core system docs (order: 2)
    {
      name: "Core Systems",
      path: "core",
      type: "directory",
      children: [
        { name: "Widget System", path: "core/widget-system", type: "file" },
        { name: "Canvas System", path: "core/canvas-system", type: "file" },
        { name: "Scene Manager", path: "core/scene-manager", type: "file" },
        { name: "Input System", path: "core/input-system", type: "file" }
      ]
    },
    
    // Layout system (order: 3)
    {
      name: "Layout System",
      path: "layout",
      type: "directory",
      children: [
        { name: "Overview", path: "layout/overview", type: "file" },
        { name: "Layout Engine", path: "layout/layout-system", type: "file" },
        { name: "Containers", path: "layout/containers", type: "file" },
        { name: "Row & Column", path: "layout/row", type: "file" },
        { name: "Center", path: "layout/center", type: "file" },
        { name: "Expanded", path: "layout/expanded", type: "file" },
        { name: "Padding & Spacing", path: "layout/padding", type: "file" }
      ]
    },
    
    // UI Components (order: 4)
    {
      name: "UI Components",
      path: "widgets", 
      type: "directory",
      children: [
        { name: "Text", path: "widgets/text", type: "file" },
        { name: "Button", path: "widgets/button", type: "file" },
        { name: "Text Input", path: "widgets/text-input", type: "file" },
        { name: "Progress Bar", path: "widgets/progress-bar", type: "file" },
        { name: "Slider", path: "widgets/slider", type: "file" },
        { name: "Radio Button", path: "widgets/radio-button", type: "file" },
        { name: "Dropdown", path: "widgets/dropdown", type: "file" }
      ]
    },
    
    // Graphics primitives (order: 5)
    {
      name: "Graphics",
      path: "graphics",
      type: "directory",
      children: [
        { name: "Drawing Primitives", path: "graphics/primitives", type: "file" },
        { name: "Colors", path: "graphics/colors", type: "file" },
        { name: "Fonts", path: "graphics/fonts", type: "file" }
      ]
    },
    
    // Input handling (order: 6)
    {
      name: "Input Handling",
      path: "input",
      type: "directory",
      children: [
        { name: "Event System", path: "input/events", type: "file" },
        { name: "Input Processing", path: "input/input-handling", type: "file" },
        { name: "Signals & Slots", path: "input/signals", type: "file" }
      ]
    },
    
    // Examples and guides (order: 7)
    {
      name: "Examples & Guides",
      path: "examples",
      type: "directory", 
      children: [
        { name: "Basic Examples", path: "examples/basic", type: "file" },
        { name: "Interactive Examples", path: "examples/interactive", type: "file" },
        { name: "Best Practices", path: "examples/best-practices", type: "file" }
      ]
    },
    
    // API Reference last (order: 8)
    {
      name: "API Reference",
      path: "api-reference", 
      type: "file"
    }
  ];

  // Function to load actual markdown content
  const loadDocContent = async (path: string): Promise<DocContent> => {
    try {
      // Convert path to actual file path
      const filePath = path.replace(/\//g, '/') + '.md';
      
      // In a real implementation, you'd fetch from a backend API
      // For now, we'll simulate with the actual file content structure
      const response = await fetch(`/docs/${filePath}`);
      
      if (!response.ok) {
        throw new Error(`Failed to load ${filePath}`);
      }
      
      const markdownContent = await response.text();
      const htmlContent = await marked(markdownContent);
      
      // Extract title from the first H1 in the markdown
      const titleMatch = markdownContent.match(/^#\s+(.+)$/m);
      const title = titleMatch ? titleMatch[1] : path.split('/').pop()?.replace('-', ' ') || 'Documentation';
      
      return {
        title,
        content: htmlContent,
        lastModified: new Date().toISOString()
      };
    } catch (error) {
      console.error('Error loading doc:', error);
      // Fallback content for development
      return getFallbackContent(path);
    }
  };

  // Fallback content when files can't be loaded
  const getFallbackContent = (path: string): DocContent => {
    const title = path.split('/').pop()?.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()) || 'Documentation';
    
    if (path === "getting-started") {
      return {
        title: "Getting Started with Fern",
        content: `<h1>Getting Started with Fern</h1>

<p>Welcome to Fern, an interesting approach to building user interfaces. This guide will take you from complete beginner to creating your first interactive application.</p>

<h2>What is Fern?</h2>

<p>Fern is a zero-dependency UI library written in C++ that takes a fundamentally different approach to user interface development. Unlike traditional frameworks that rely on browser APIs, GPU frameworks, or existing graphics libraries, Fern manually paints every single pixel on the screen.</p>

<h3>Key Features</h3>

<ul>
<li><strong>Manual pixel-by-pixel rendering</strong>: Every dot of color you see is explicitly calculated</li>
<li><strong>Custom drawing pipeline</strong>: Lines, rectangles, circles, and text are all drawn using mathematical algorithms</li>
<li><strong>Declarative layout engine</strong>: Inspired by Flutter's widget tree</li>
<li><strong>Cross-platform compatibility</strong>: Runs natively on Linux and compiles to WebAssembly</li>
</ul>

<h2>Installation</h2>

<pre><code class="language-bash"># Clone the repository
git clone https://github.com/fernkit/fern
cd fern

# Build the project
make build

# Run the examples
./build/examples/hello_world
</code></pre>

<h2>Your First Fern Application</h2>

<p>Let's create a simple "Hello, World!" application to get you started.</p>

<pre><code class="language-cpp">#include &lt;fern/fern.h&gt;

int main() {
    auto app = fern::App();
    
    auto window = app.create_window(800, 600, "My First Fern App");
    
    auto text = fern::Text("Hello, World!")
        .font_size(24)
        .color(fern::Colors::BLACK);
    
    window.set_child(text);
    
    return app.run();
}
</code></pre>

<p>This creates a window with simple text. The beauty of Fern is that even this basic example shows you exactly what's happening - we're creating a window, defining some text with specific styling, and then running the application loop.</p>`,
        lastModified: new Date().toISOString()
      };
    }
    
    return {
      title,
      content: `<h1>${title}</h1><p>Documentation for ${title} is coming soon...</p>`,
      lastModified: new Date().toISOString()
    };
  };

  // Function to get the next document in sequence
  const getNextDoc = (currentPath?: string): DocFile | null => {
    if (!currentPath) return null;
    
    // Flatten all files into a single array maintaining order
    const flattenDocs = (items: DocFile[]): DocFile[] => {
      const result: DocFile[] = [];
      items.forEach(item => {
        if (item.type === 'file') {
          result.push(item);
        } else if (item.children) {
          result.push(...flattenDocs(item.children));
        }
      });
      return result;
    };
    
    const allDocs = flattenDocs(docStructureConfig);
    const currentIndex = allDocs.findIndex(doc => doc.path === currentPath);
    
    if (currentIndex >= 0 && currentIndex < allDocs.length - 1) {
      return allDocs[currentIndex + 1];
    }
    
    return null;
  };

  // Initialize doc structure and load content
  useEffect(() => {
    setDocStructure(docStructureConfig);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (docPath) {
      setLoading(true);
      loadDocContent(docPath)
        .then(content => {
          setCurrentDoc(content);
          setError(null);
        })
        .catch(err => {
          setError(`Failed to load documentation: ${err.message}`);
          setCurrentDoc(null);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(true);
      loadDocContent("getting-started")
        .then(content => {
          setCurrentDoc(content);
          setError(null);
        })
        .catch(err => {
          setError(`Failed to load documentation: ${err.message}`);
          setCurrentDoc(null);
        })
        .finally(() => setLoading(false));
    }
  }, [docPath]);

  const renderDocItem = (item: DocFile, level: number = 0) => {
    const isActive = docPath === item.path;
    const hasChildren = item.type === 'directory' && item.children && item.children.length > 0;

    return (
      <div key={item.path}>
        {item.type === 'file' ? (
          <Link
            to={`/docs/${item.path}`}
            className={`flex items-center gap-3 py-2.5 px-3 rounded-md transition-all duration-200 text-sm font-medium relative ${
              isActive 
                ? 'bg-green-50 text-green-800' 
                : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
            }`}
          >
            {isActive && (
              <div className="absolute left-0 top-0 bottom-0 w-1 rounded-r" style={{ backgroundColor: 'var(--fern-green)' }}></div>
            )}
            <File size={14} className={isActive ? 'text-green-600' : 'text-gray-400'} />
            <span>{item.name}</span>
          </Link>
        ) : (
          <div className="mb-4">
            <div className="flex items-center gap-2 py-2 px-3 mb-2">
              <Folder size={16} style={{ color: 'var(--fern-green)' }} />
              <span className="text-sm font-medium text-gray-800">{item.name}</span>
            </div>
            {hasChildren && (
              <div className="ml-4 space-y-1 border-l-2 border-gray-100 pl-3">
                {item.children!.map(child => renderDocItem(child, level + 1))}
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  const renderMarkdown = (content: string) => {
    return (
      <div 
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: content }}
        style={{
          '--tw-prose-headings': 'var(--fern-green)',
          '--tw-prose-body': '#374151',
          '--tw-prose-bold': '#111827',
          '--tw-prose-links': 'var(--fern-green)',
          '--tw-prose-code': '#111827',
          '--tw-prose-pre-bg': '#f8fafc',
          '--tw-prose-pre-code': '#374151',
          '--tw-prose-quotes': '#6b7280',
          '--tw-prose-quote-borders': 'var(--fern-green)',
          '--tw-prose-captions': '#6b7280',
          '--tw-prose-counters': '#6b7280',
          '--tw-prose-bullets': '#d1d5db',
          '--tw-prose-hr': '#e5e7eb',
          '--tw-prose-th-borders': '#d1d5db',
          '--tw-prose-td-borders': '#e5e7eb',
        } as React.CSSProperties}
      />
    );
  };

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: 'Inter, sans-serif' }}>
      <Navbar />
      
      <div className="flex min-h-screen pt-16">
        {/* Sidebar */}
        <div className="w-72 bg-gray-50/50 border-r border-gray-200 overflow-y-auto fixed h-full top-16">
          <div className="p-6">
            <div className="mb-6">
              <Link 
                to="/" 
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium"
              >
                <ArrowLeft size={16} />
                <span>Back to Home</span>
              </Link>
            </div>
            
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-2" style={{ color: 'var(--fern-green)' }}>Documentation</h2>
              <p className="text-gray-600 text-xs leading-relaxed">
                Guides and API reference for Fern
              </p>
            </div>

            <nav className="space-y-3">
              {docStructure.map(item => renderDocItem(item))}
            </nav>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <a 
                href="https://github.com/fernkit/fern" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors text-sm"
              >
                <Github size={16} />
                <span>GitHub</span>
              </a>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8 max-w-5xl mx-auto ml-72">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="text-gray-500">Loading documentation...</div>
            </div>
          ) : error ? (
            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <h2 className="font-semibold text-sm text-red-800 mb-2">Error Loading Documentation</h2>
              <p className="text-red-600 text-sm">{error}</p>
              <Button 
                className="mt-4" 
                onClick={() => window.location.reload()}
                style={{ backgroundColor: 'var(--fern-green)' }}
              >
                Retry
              </Button>
            </div>
          ) : currentDoc ? (
            <article className="max-w-none">
              <header className="mb-8">
                <h1 className="text-xl font-semibold mb-3" style={{ color: 'var(--fern-green)', fontFamily: 'VT323, monospace' }}>
                  {currentDoc.title}
                </h1>
                {currentDoc.lastModified && (
                  <p className="text-gray-500 text-xs">
                    Last updated: {new Date(currentDoc.lastModified).toLocaleDateString()}
                  </p>
                )}
              </header>
              
              <div className="docs-content">
                {renderMarkdown(currentDoc.content)}
              </div>
              
              {/* Up Next Navigation */}
              {getNextDoc(docPath) && (
                <div className="mt-12 pt-8 border-t border-gray-200">
                  <div className="bg-gray-50 rounded-lg p-6">
                    <p className="text-sm text-gray-600 mb-2">Up Next</p>
                    <Link 
                      to={`/docs/${getNextDoc(docPath)?.path}`}
                      className="flex items-center gap-3 text-gray-900 hover:text-gray-700 transition-colors"
                    >
                      <div className="flex-1">
                        <h3 className="font-medium">{getNextDoc(docPath)?.name}</h3>
                        <p className="text-sm text-gray-600 mt-1">Continue reading →</p>
                      </div>
                    </Link>
                  </div>
                </div>
              )}
            </article>
          ) : (
            <div className="text-center text-gray-500 mt-32">
              <BookOpen size={48} className="mx-auto mb-4 text-gray-300" />
              <p>Select a documentation page from the sidebar to get started.</p>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .docs-content h1 {
          font-family: 'VT323', monospace;
          font-weight: normal;
          font-size: 2.5rem;
          line-height: 1.2;
          margin-bottom: 1.5rem;
          margin-top: 2.5rem;
          color: #222C21;
        }
        
        .docs-content h2 {
          font-family: 'VT323', monospace;
          font-weight: normal;
          font-size: 2rem;
          line-height: 1.2;
          margin-bottom: 1rem;
          margin-top: 2rem;
          color: #222C21;
        }
        
        .docs-content h3 {
          font-family: 'VT323', monospace;
          font-weight: normal;
          font-size: 1.75rem;
          line-height: 1.2;
          margin-bottom: 0.75rem;
          margin-top: 1.75rem;
          color: #222C21;
        }
        
        .docs-content h4 {
          font-family: 'VT323', monospace;
          font-weight: normal;
          font-size: 1.5rem;
          line-height: 1.2;
          margin-bottom: 0.5rem;
          margin-top: 1.5rem;
          color: #222C21;
        }
        
        .docs-content h5,
        .docs-content h6 {
          font-family: 'VT323', monospace;
          font-weight: normal;
          font-size: 1.25rem;
          line-height: 1.2;
          margin-bottom: 0.5rem;
          margin-top: 1.25rem;
          color: #222C21;
        }
        
        .docs-content p {
          font-family: 'Inter', sans-serif;
          line-height: 1.6;
          margin-bottom: 1rem;
          color: #374151;
        }
        
        .docs-content ul, .docs-content ol {
          font-family: 'Inter', sans-serif;
          margin-bottom: 1rem;
          padding-left: 1.5rem;
        }
        
        .docs-content li {
          margin-bottom: 0.25rem;
          line-height: 1.5;
        }
        
        .docs-content pre {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 6px;
          padding: 1rem;
          overflow-x: auto;
          margin: 1rem 0;
          font-size: 0.875rem;
        }
        
        .docs-content code {
          background: #f1f5f9;
          padding: 0.125rem 0.375rem;
          border-radius: 3px;
          font-size: 0.85em;
          font-family: 'JetBrains Mono', 'Fira Code', monospace;
        }
        
        .docs-content pre code {
          background: transparent;
          padding: 0;
          font-size: 0.875rem;
        }
        
        .docs-content blockquote {
          font-family: 'Inter', sans-serif;
          border-left: 3px solid var(--fern-green);
          padding-left: 1rem;
          margin: 1rem 0;
          font-style: italic;
          background: rgba(69, 113, 67, 0.03);
          padding: 0.75rem 1rem;
          border-radius: 4px;
        }
        
        .docs-content strong {
          font-weight: 600;
          color: #111827;
        }
        
        .docs-content table {
          font-family: 'Inter', sans-serif;
          width: 100%;
          border-collapse: collapse;
          margin: 1rem 0;
          font-size: 0.875rem;
        }
        
        .docs-content th,
        .docs-content td {
          padding: 0.5rem;
          border: 1px solid #e5e7eb;
          text-align: left;
        }
        
        .docs-content th {
          background: #f9fafb;
          font-weight: 600;
        }
      `}</style>
    </div>
  );
};

export default DocsRenderer;
