
import React from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Sidebar from '@/components/Sidebar';
import CodeBlock from '@/components/CodeBlock';
import { docsData, installSteps } from '@/lib/docsData';

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
                  code={installSteps[0].code}
                  language="bash"
                />
                
                <h2>Step 2: Install Fern CLI</h2>
                <CodeBlock 
                  code={installSteps[1].code}
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
            
            {/* Color Constants section */}
            {section === 'color-constants' && (
              <div className="animate-pixel-fade">
                <h1>Color Constants</h1>
                <p className="lead text-xl text-muted-foreground mb-6">
                  Reference for the predefined colors in Fern Graphics Library.
                </p>
                
                <h2>Predefined Colors</h2>
                <p>
                  Fern provides a set of predefined color constants for convenience:
                </p>
                <CodeBlock 
                  code={`#define Colors_green 0xFF00FF00   // Green
#define Colors_blue  0xFF0000FF   // Blue
#define Colors_red   0xFFFF0000   // Red
#define Colors_gray  0xFF202020   // Dark Gray
#define Colors_black 0xFF000000   // Black
#define Colors_white 0xFFFFFFFF   // White`}
                  language="c"
                />
                
                <h2>Color Format</h2>
                <p>
                  Color values are represented as 0xAARRGGBB:
                </p>
                <ul>
                  <li>AA: Alpha channel (transparency)</li>
                  <li>RR: Red channel</li>
                  <li>GG: Green channel</li>
                  <li>BB: Blue channel</li>
                </ul>
                
                <p>
                  For example, to create a semi-transparent purple color with 50% opacity:
                </p>
                <CodeBlock 
                  code={`// Half-transparent purple (50% alpha)
#define MY_PURPLE 0x80800080   // 0x80 for alpha (50%), 0x80 for red, 0x00 for green, 0x80 for blue`}
                  language="c"
                />
              </div>
            )}
            
            {/* Widget Functions section */}
            {section === 'widget-functions' && (
              <div className="animate-pixel-fade">
                <h1>Widget Functions</h1>
                <p className="lead text-xl text-muted-foreground mb-6">
                  Reference for the high-level widget functions in Fern Graphics Library.
                </p>
                
                <h2>Container</h2>
                <p>
                  Creates a rectangular container.
                </p>
                <CodeBlock 
                  code={`Container(
    color(uint32_t color),
    x(int x),
    y(int y),
    width(int width),
    height(int height)
);`}
                  language="c"
                />
                
                <h2>CenteredContainer</h2>
                <p>
                  Creates a centered rectangular container.
                </p>
                <CodeBlock 
                  code={`CenteredContainer(
    width(int width),
    height(int height),
    color(uint32_t color)
);`}
                  language="c"
                />
                
                <h2>CircleWidget</h2>
                <p>
                  Creates a circle.
                </p>
                <CodeBlock 
                  code={`CircleWidget(
    radius(int radius),
    position(Point position),
    color(uint32_t color)
);`}
                  language="c"
                />
                
                <h2>LineWidget</h2>
                <p>
                  Creates a line with specified thickness.
                </p>
                <CodeBlock 
                  code={`LineWidget(
    start(Point start),
    end(Point end),
    thickness(int thickness),
    color(uint32_t color)
);`}
                  language="c"
                />
                
                <h2>TextWidget</h2>
                <p>
                  Renders text using the built-in bitmap font.
                </p>
                <CodeBlock 
                  code={`TextWidget(
    start(Point position),
    text(const char* text),
    scale(int scale),
    color(uint32_t color)
);`}
                  language="c"
                />
                
                <h2>LinearGradientContainer</h2>
                <p>
                  Creates a rectangle filled with a linear color gradient.
                </p>
                <CodeBlock 
                  code={`LinearGradientContainer(
    x(int x),
    y(int y),
    width(int width),
    height(int height),
    gradient(LinearGradient gradient)
);`}
                  language="c"
                />
                
                <h2>ButtonWidget</h2>
                <p>
                  Creates an interactive button that responds to mouse events.
                </p>
                <CodeBlock 
                  code={`typedef void (*ButtonCallback)(void);  // Function pointer type for callbacks

typedef struct {
    int x;
    int y;
    int width;
    int height;
    uint32_t normal_color;
    uint32_t hover_color;
    uint32_t press_color;
    const char* label;
    int text_scale;
    uint32_t text_color;
    ButtonCallback on_click;
} ButtonConfig;

void ButtonWidget(ButtonConfig config);`}
                  language="c"
                />
                
                <p>Example usage:</p>
                <CodeBlock 
                  code={`void button_callback() {
    // Code executed when button is clicked
    fernPrintf("Button clicked!");
}

ButtonConfig my_button = {
    .x = 100,
    .y = 200,
    .width = 200,
    .height = 60,
    .normal_color = Colors_blue,
    .hover_color = 0xFF4444FF,  // Lighter blue
    .press_color = 0xFF0000AA,  // Darker blue
    .label = "CLICK ME",
    .text_scale = 2,
    .text_color = Colors_white,
    .on_click = button_callback
};

ButtonWidget(my_button);`}
                  language="c"
                />
              </div>
            )}
            
            {/* Drawing Functions section */}
            {section === 'drawing-functions' && (
              <div className="animate-pixel-fade">
                <h1>Drawing Functions</h1>
                <p className="lead text-xl text-muted-foreground mb-6">
                  Reference for the lower-level drawing functions in Fern Graphics Library.
                </p>
                
                <h2>Core Drawing Functions</h2>
                <p>
                  For more advanced use cases, you can use these lower-level drawing functions:
                </p>
                <CodeBlock 
                  code={`// Fill entire canvas with a color
void ffill(uint32_t* pixels, size_t height, size_t width, uint32_t color);

// Draw a rectangle
void frect(uint32_t* pixels, size_t height, size_t width, uint32_t color, 
          size_t x, size_t y, size_t w, size_t h);

// Draw a circle
void fcircle(uint32_t* pixels, size_t height, size_t width, uint32_t color, 
            size_t cx, size_t cy, size_t r);

// Draw a line with thickness
void fline(uint32_t* pixels, size_t height, size_t width, uint32_t color, 
          int x1, int y1, int x2, int y2, int thickness);
    
// Render a single character from the bitmap font
void fchar(uint32_t* pixels, int width, int height, char c, int x, int y, int scale, uint32_t color);

// Render a text string using the bitmap font
void ftext(uint32_t* pixels, int width, int height, const char* text, int x, int y, int scale, uint32_t color);

// Get a color at a specific position in a gradient
uint32_t gradient_color_at(LinearGradient grad, float position);

// Print debug information to console
void fernPrintf(const char* message);`}
                  language="c"
                />
                
                <h2>Usage Example</h2>
                <p>
                  Example of using the lower-level drawing functions:
                </p>
                <CodeBlock 
                  code={`// Draw a basic scene using low-level functions
void draw_scene() {
    // Clear the screen with black
    ffill(canvas.pixels, canvas.height, canvas.width, Colors_black);
    
    // Draw a blue rectangle
    frect(canvas.pixels, canvas.height, canvas.width, Colors_blue, 50, 50, 200, 150);
    
    // Draw a red circle
    fcircle(canvas.pixels, canvas.height, canvas.width, Colors_red, 300, 200, 75);
    
    // Draw a white line
    fline(canvas.pixels, canvas.height, canvas.width, Colors_white, 100, 300, 400, 350, 3);
    
    // Draw some text
    ftext(canvas.pixels, canvas.width, canvas.height, "FERN GRAPHICS", 150, 400, 2, Colors_green);
}`}
                  language="c"
                />
              </div>
            )}
            
            {/* Application Lifecycle section */}
            {section === 'application-lifecycle' && (
              <div className="animate-pixel-fade">
                <h1>Application Lifecycle</h1>
                <p className="lead text-xl text-muted-foreground mb-6">
                  Reference for the application lifecycle functions in Fern Graphics Library.
                </p>
                
                <h2>Core Functions</h2>
                <CodeBlock 
                  code={`// Initialize the application with a canvas
void runApp(FernCanvas canvas);

// Start the rendering loop
void fern_start_render_loop(void);

// Optional: Set a draw function to be called every frame
void fern_set_draw_callback(void (*draw_function)(void));`}
                  language="c"
                />
                
                <h2>Static Application</h2>
                <p>
                  For basic applications, you can draw once and call fern_start_render_loop():
                </p>
                <CodeBlock 
                  code={`int main() {
    // Initialize
    FernCanvas canvas = {pixels, HEIGHT, WIDTH};
    runApp(canvas);
    
    // Draw static content
    Container(/* parameters */);
    CircleWidget(/* parameters */);
    
    // Start rendering
    fern_start_render_loop();
    return 0;
}`}
                  language="c"
                />
                
                <h2>Interactive Application</h2>
                <p>
                  For interactive applications, use a draw callback:
                </p>
                <CodeBlock 
                  code={`// Global state variables
static int circle_radius = 50;

void on_button_click() {
    circle_radius += 10;  // Update state
}

void draw_frame() {
    // Clear background
    Container(color(Colors_black), x(0), y(0), width(WIDTH), height(HEIGHT));
    
    // Draw with current state
    CircleWidget(radius(circle_radius), position(Point_create(WIDTH/2, HEIGHT/2)), color(Colors_red));
    
    // Create interactive elements
    ButtonConfig button = {
        .x = 100, .y = 200, .width = 200, .height = 60,
        .normal_color = Colors_blue, .hover_color = 0xFF4444FF, .press_color = 0xFF0000AA,
        .label = "INCREASE SIZE", .text_scale = 2, .text_color = Colors_white,
        .on_click = on_button_click
    };
    ButtonWidget(button);
}

int main() {
    // Initialize
    FernCanvas canvas = {pixels, HEIGHT, WIDTH};
    runApp(canvas);
    
    // Set draw callback
    fern_set_draw_callback(draw_frame);
    
    // Start rendering
    fern_start_render_loop();
    return 0;
}`}
                  language="c"
                />
              </div>
            )}
            
            {/* PPM Export section */}
            {section === 'ppm-export' && (
              <div className="animate-pixel-fade">
                <h1>PPM Export</h1>
                <p className="lead text-xl text-muted-foreground mb-6">
                  Reference for exporting renders as PPM images.
                </p>
                
                <h2>Export Function</h2>
                <p>
                  The library provides a function to export renders as PPM images:
                </p>
                <CodeBlock 
                  code={`// Save the current pixel buffer as a PPM file
int fsave_ppm(uint32_t* pixels, size_t width, size_t height, const char* filename);`}
                  language="c"
                />
                
                <h2>Usage Example</h2>
                <CodeBlock 
                  code={`// Create and render a scene
// ...

// Save the rendered image
fsave_ppm(canvas.pixels, canvas.width, canvas.height, "output.ppm");`}
                  language="c"
                />
                
                <h2>About PPM Format</h2>
                <p>
                  The PPM (Portable Pixmap) format is a simple, uncompressed image format:
                </p>
                <ul>
                  <li>Creates files with the .ppm extension</li>
                  <li>Can be opened by many image editors and viewers</li>
                  <li>Easy to convert to other formats using tools like ImageMagick</li>
                </ul>
                
                <p>
                  To convert a PPM file to PNG using ImageMagick:
                </p>
                <CodeBlock 
                  code={`convert output.ppm output.png`}
                  language="bash"
                />
              </div>
            )}
            
            {/* Filled Shapes section */}
            {section === 'filled-shapes' && (
              <div className="animate-pixel-fade">
                <h1>Filled Shapes</h1>
                <p className="lead text-xl text-muted-foreground mb-6">
                  Advanced techniques for creating filled shapes.
                </p>
                
                <h2>Creating Filled Triangles</h2>
                <p>
                  To create filled triangle shapes:
                </p>
                <CodeBlock 
                  code={`// Fill a triangle using fan pattern
for (int i = 0; i < 180; i++) {
    int baseX = leftX + i * (rightX-leftX)/180;
    
    LineWidget(
        start(Point_create(baseX, baseY)),  
        end(Point_create(peakX, peakY)), 
        thickness(1),
        color(Colors_gray)  
    );
}`}
                  language="c"
                />
                
                <h2>Creating Gradients</h2>
                <p>
                  To create and use a gradient:
                </p>
                <CodeBlock 
                  code={`// Create gradient stops
GradientStop sunset_stops[] = {
    {0xFF330066, 0.0},  // Deep purple at the top
    {0xFFFF6600, 0.4},  // Orange at 40%
    {0xFF000033, 0.7},  // Dark blue at 70%
    {0xFF000000, 1.0}   // Black at the bottom
};

// Create the gradient
LinearGradient sunset_gradient = {
    sunset_stops,
    4,               // Number of stops
    GRADIENT_VERTICAL  // Direction
};

// Draw the gradient
LinearGradientContainer(0, 0, WIDTH, HEIGHT, sunset_gradient);`}
                  language="c"
                />
              </div>
            )}
            
            {/* Scene Components section */}
            {section === 'scene-components' && (
              <div className="animate-pixel-fade">
                <h1>Scene Components</h1>
                <p className="lead text-xl text-muted-foreground mb-6">
                  Advanced techniques for creating reusable scene components.
                </p>
                
                <h2>Creating Reusable Components</h2>
                <p>
                  You can create reusable scene components by defining functions:
                </p>
                <CodeBlock 
                  code={`// Draw a cloud at the specified position
void drawCloud(int x, int y, int size) {
    CircleWidget(
        radius(size),
        position(Point_create(x, y)),
        color(Colors_white)
    );
    
    CircleWidget(
        radius(size * 1.2),
        position(Point_create(x + size, y - 5)),
        color(Colors_white)
    );
    
    CircleWidget(
        radius(size),
        position(Point_create(x + size*2, y)),
        color(Colors_white)
    );
}`}
                  language="c"
                />
                
                <h2>Text Rendering</h2>
                <p>
                  Rendering text with different scales:
                </p>
                <CodeBlock 
                  code={`// Draw a large title
TextWidget(
    Point_create(WIDTH/2 - 150, 50),
    "FERN GRAPHICS",
    4,  // Scale factor
    NEON_GREEN
);

// Draw a smaller subtitle
TextWidget(
    Point_create(WIDTH/2 - 120, 100),
    "TEXT RENDERING DEMO",
    2,  // Scale factor
    Colors_white
);`}
                  language="c"
                />
                
                <h2>Custom Text Spacing</h2>
                <p>
                  You can also access the lower-level text functions:
                </p>
                <CodeBlock 
                  code={`// Draw a single character
fchar(pixels, WIDTH, HEIGHT, 'A', 100, 100, 3, Colors_red);

// Draw custom-spaced text
int x = 50;
const char* message = "CUSTOM SPACING";
for(int i = 0; message[i] != '\\0'; i++) {
    fchar(pixels, WIDTH, HEIGHT, message[i], x, 200, 2, Colors_blue);
    x += 20;  // Custom character spacing
}`}
                  language="c"
                />
              </div>
            )}
            
            {/* CLI Tool section */}
            {section === 'cli-tool' && (
              <div className="animate-pixel-fade">
                <h1>CLI Tool</h1>
                <p className="lead text-xl text-muted-foreground mb-6">
                  Reference for using the Fern CLI tool.
                </p>
                
                <h2>Basic Usage</h2>
                <CodeBlock 
                  code={`fern [FILENAME]`}
                  language="bash"
                />
                <p>
                  The CLI tool simplifies the compilation and testing process:
                </p>
                <ul>
                  <li>If FILENAME is not provided, looks for main.c or example.c in the current directory</li>
                  <li>Compiles the specified file to WebAssembly</li>
                  <li>Creates a dist/ directory if it doesn't exist</li>
                  <li>Starts a local web server</li>
                  <li>Open http://localhost:8000/dist/ in your browser</li>
                </ul>
                
                <h2>Command Options</h2>
                <CodeBlock 
                  code={`fern --help              # Show help information
fern --version           # Display version information
fern --serve main.c      # Compile and serve main.c
fern --build main.c      # Only compile, don't start server
fern --port 9000 main.c  # Use custom port for server`}
                  language="bash"
                />
              </div>
            )}
            
            {/* Architecture section */}
            {section === 'architecture' && (
              <div className="animate-pixel-fade">
                <h1>Architecture</h1>
                <p className="lead text-xl text-muted-foreground mb-6">
                  Overview of the Fern Graphics Library architecture.
                </p>
                
                <h2>Library Structure</h2>
                <p>
                  Fern Graphics Library is organized into several logical components:
                </p>
                <ul>
                  <li><strong>Core Functions:</strong> Low-level drawing primitives</li>
                  <li><strong>Widget System:</strong> High-level declarative API</li>
                  <li><strong>Event System:</strong> Mouse input handling</li>
                  <li><strong>Render Loop:</strong> Canvas updating and frame management</li>
                  <li><strong>Build System:</strong> Emscripten integration for WebAssembly</li>
                </ul>
                
                <h2>Rendering Pipeline</h2>
                <p>
                  The rendering pipeline follows these steps:
                </p>
                <ol>
                  <li>User code initializes canvas and sets up draw callback</li>
                  <li>Fern initializes the event system for mouse tracking</li>
                  <li>On each frame:
                    <ul>
                      <li>User's draw callback is called</li>
                      <li>UI elements are drawn and interactions processed</li>
                      <li>Pixel buffer is updated</li>
                      <li>Canvas is rendered with new pixel data</li>
                      <li>One-time events are reset</li>
                    </ul>
                  </li>
                </ol>
                
                <h2>Memory Management</h2>
                <p>
                  Fern uses a simple memory model:
                </p>
                <ul>
                  <li>The pixel buffer is allocated by the user application</li>
                  <li>No dynamic memory allocation in the core library</li>
                  <li>WebAssembly linear memory is shared between C code and JavaScript</li>
                </ul>
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
