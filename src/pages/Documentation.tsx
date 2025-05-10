import React from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Sidebar from '@/components/Sidebar';
import CodeBlock from '@/components/CodeBlock';
import { docsData } from '@/lib/docsData';

const Documentation = () => {
  const { section = 'overview' } = useParams();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="container px-4 flex-grow">
        <div className="flex flex-col lg:flex-row py-6">
          <Sidebar sections={docsData.sections} />
          
          <div className="lg:flex-1 lg:max-w-3xl lg:ml-8">
            {/* Overview section */}
            {section === 'overview' && (
              <div className="animate-pixel-fade">
                <h1>Fern Graphics Library</h1>
                <p className="lead text-xl text-muted-foreground mb-6">
                  A lightweight single-file WebAssembly-based graphics library for creating visual interactive applications using simple C code.
                </p>
                
                <h2>Overview</h2>
                <p>
                  Fern is a minimalist graphics library designed for simplicity, performance, and ease of use. It provides 
                  a declarative API for rendering graphics to HTML canvas via WebAssembly, enabling C developers to create 
                  visual applications that run in any modern web browser.
                </p>
                
                <h2>Key Features</h2>
                <ul>
                  <li>Single-file implementation for easy integration</li>
                  <li>Declarative API with named parameters</li>
                  <li>WebAssembly-powered rendering for near-native performance</li>
                  <li>Support for basic shapes, lines, and pixel manipulation</li>
                  <li>Bitmap font text rendering with customizable scale</li>
                  <li>Linear gradient support with multi-color stops</li>
                  <li>Interactive UI elements including buttons with callbacks</li>
                  <li>Mouse event capture and handling</li>
                  <li>Simple CLI tool for compiling and serving applications</li>
                  <li>PPM image export capability for saving renderings</li>
                  <li>Lightweight (~1000 lines of code)</li>
                </ul>
                
                <h2>Getting Started</h2>
                <p>
                  To start using Fern, you'll need to install the dependencies and Fern CLI tool. Follow our 
                  <a href="/docs/installation"> installation guide</a> for step-by-step instructions, or jump 
                  into our <a href="/quick-start">quick start guide</a> to create your first Fern application.
                </p>
              </div>
            )}
            
            {/* Installation section */}
            {section === 'installation' && (
              <div className="animate-pixel-fade">
                <h1>Installation</h1>
                <p className="lead text-xl text-muted-foreground mb-6">
                  Follow these steps to install Fern and its dependencies.
                </p>
                
                <h2>Requirements</h2>
                <ul>
                  <li>Emscripten SDK</li>
                  <li>Modern C compiler (supporting C99 or later)</li>
                  <li>Python 3 (for development server)</li>
                  <li>Web browser with WebAssembly support</li>
                </ul>
                
                <h2>Step 1: Install Dependencies</h2>
                <CodeBlock 
                  code={`# Install Emscripten SDK
git clone https://github.com/emscripten-core/emsdk.git
cd emsdk
./emsdk install latest
./emsdk activate latest
source ./emsdk_env.sh`}
                  language="bash"
                />
                
                <h2>Step 2: Install Fern CLI</h2>
                <CodeBlock 
                  code={`# Clone the repository
git clone https://github.com/RishiAhuja/fern.git
cd fern

# Make the CLI script executable
chmod +x fern-cli.sh

# Create a symbolic link to make it available system-wide
sudo ln -s $(pwd)/fern-cli.sh /usr/local/bin/fern

# Optional: Install the man page
sudo install -m 644 fern.1 /usr/local/share/man/man1/
sudo mandb`}
                  language="bash"
                />
                
                <h2>Verification</h2>
                <p>
                  Verify your installation by running:
                </p>
                <CodeBlock 
                  code={`fern --version`}
                  language="bash"
                />
                <p>
                  If everything is set up correctly, you should see the Fern CLI version number.
                </p>
                
                <h2>Next Steps</h2>
                <p>
                  Now that Fern is installed, you can move on to the <a href="/quick-start">Quick Start guide</a> 
                  to create your first application.
                </p>
              </div>
            )}
            
            {/* Core Types section */}
            {section === 'core-types' && (
              <div className="animate-pixel-fade">
                <h1>Core Types</h1>
                <p className="lead text-xl text-muted-foreground mb-6">
                  Reference for the fundamental data structures used in Fern Graphics Library.
                </p>
                
                <h2 id="point">Point</h2>
                <p>
                  Represents a 2D point with x and y coordinates.
                </p>
                <CodeBlock 
                  code={`struct Point {
    int x;
    int y;
};

// Create a Point
Point Point_create(int x, int y);`}
                  language="c"
                />
                
                <h2 id="ferncanvas">FernCanvas</h2>
                <p>
                  Represents the drawing canvas.
                </p>
                <CodeBlock 
                  code={`struct FernCanvas {
    uint32_t* pixels;
    size_t height;
    size_t width;
};`}
                  language="c"
                />
                
                <h2 id="gradientstop">GradientStop</h2>
                <p>
                  Represents a color stop in a gradient.
                </p>
                <CodeBlock 
                  code={`typedef struct {
    uint32_t color;
    float position;  // 0.0 to 1.0
} GradientStop;`}
                  language="c"
                />
                
                <h2 id="lineargradient">LinearGradient</h2>
                <p>
                  Defines a linear gradient with multiple color stops.
                </p>
                <CodeBlock 
                  code={`typedef struct {
    GradientStop* stops;
    int stop_count;
    int direction;  // GRADIENT_HORIZONTAL or GRADIENT_VERTICAL
} LinearGradient;

// Direction constants
#define GRADIENT_HORIZONTAL 0
#define GRADIENT_VERTICAL 1`}
                  language="c"
                />
                
                <h2 id="inputstate">InputState</h2>
                <p>
                  Tracks the current state of user input.
                </p>
                <CodeBlock 
                  code={`typedef struct {
    int mouse_x;      // Current mouse X position
    int mouse_y;      // Current mouse Y position
    int mouse_down;   // Whether mouse button is currently pressed
    int mouse_clicked; // Whether a click occurred in this frame
} InputState;

// Access the current input state
extern InputState current_input;`}
                  language="c"
                />
              </div>
            )}
            
            {/* Other sections would go here, but omitted for brevity */}
            {!['overview', 'installation', 'core-types'].includes(section) && (
              <div className="animate-pixel-fade">
                <h1>Documentation Coming Soon</h1>
                <p className="text-muted-foreground">
                  This section of the documentation is under development. Please check back later or 
                  refer to the <a href="https://github.com/RishiAhuja/fern" target="_blank" rel="noopener noreferrer">GitHub repository</a> for 
                  more information.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Documentation;
