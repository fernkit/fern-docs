import React from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Sidebar from '../components/Sidebar';
import CodeBlock from '../components/CodeBlock';
import LanguageToggle from '../components/LanguageToggle';
import { useLanguageContext } from '../hooks/useLanguageContext';
import { docsData, installSteps } from '../lib/docsData';
import { codeExamples } from '../lib/codeExamples';

const Documentation = () => {
  const { section = 'overview' } = useParams();
  const { language } = useLanguageContext();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="container px-4 flex-grow">
        <div className="flex flex-col lg:flex-row py-6">
          <Sidebar sections={docsData.sections} />
          
          <div className="lg:flex-1 lg:max-w-3xl lg:ml-8">
            <LanguageToggle />
            {/* Overview section */}
            {section === 'overview' && (
              <div className="animate-pixel-fade">
                <h1>Fern Graphics Library</h1>
                <p className="lead text-xl text-muted-foreground mb-6">
                  {language === 'cpp' ? 
                    "A modern, feature-rich WebAssembly-based graphics library for creating visual interactive applications using C++." :
                    "A lightweight single-file WebAssembly-based graphics library for creating visual interactive applications using C."}
                </p>
                
                <h2>Overview</h2>
                <p>
                  {language === 'cpp' ? 
                    "Fern is a modern graphics library designed for flexibility, performance, and ease of use. It provides an object-oriented API for rendering graphics to HTML canvas via WebAssembly, enabling C++ developers to create visual applications with responsive layouts that run in any modern web browser." :
                    "Fern is a minimalist graphics library designed for simplicity, performance, and ease of use. It provides a declarative API for rendering graphics to HTML canvas via WebAssembly, enabling C developers to create visual applications that run in any modern web browser."}
                </p>
                
                <h2>Key Features</h2>
                <ul>
                  {language === 'cpp' ? (
                    <>
                      <li>Object-oriented design with modern C++ patterns</li>
                      <li>Powerful layout system inspired by Flutter</li>
                      <li>Signal/slot event system for flexible event handling</li>
                      <li>WebAssembly-powered rendering for near-native performance</li>
                      <li>Support for shapes, lines, gradients, text, and pixel manipulation</li>
                      <li>Interactive UI elements with event handling</li>
                      <li>Mouse input capture and processing</li>
                      <li>Widget hierarchy with parent-child relationships</li>
                      <li>Smart pointers for automatic memory management</li>
                      <li>Responsive design capabilities</li>
                    </>
                  ) : (
                    <>
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
                    </>
                  )}
                </ul>
                
                <h2>Getting Started</h2>
                <p>
                  To start using Fern, you'll need to install the dependencies and Fern CLI tool. Follow our 
                  <a href="/docs/installation"> installation guide</a> for step-by-step instructions, or jump 
                  into our <a href="/quick-start">quick start guide</a> to create your first Fern application.
                </p>

                <h2>Basic Example</h2>
                <CodeBlock 
                  code={language === 'cpp' ? codeExamples.basicExample.cpp : codeExamples.basicExample.c}
                  language={language}
                />
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
                  code={language === 'cpp' ? 
                    `struct Point {
    int x;
    int y;
    
    Point(int x = 0, int y = 0) : x(x), y(y) {}
    
    Point operator+(const Point& other) const {
        return Point(x + other.x, y + other.y);
    }
    
    Point operator-(const Point& other) const {
        return Point(x - other.x, y - other.y);
    }
};` : 
                    `struct Point {
    int x;
    int y;
};

// Create a Point
Point Point_create(int x, int y);`}
                  language={language}
                />
                
                {language === 'c' && (
                  <>
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
                  </>
                )}
                
                <h2 id="gradientstop">GradientStop</h2>
                <p>
                  Represents a color stop in a gradient.
                </p>
                <CodeBlock 
                  code={language === 'cpp' ? 
                    `struct GradientStop {
    uint32_t color;
    float position;  // 0.0 to 1.0
    
    GradientStop(uint32_t color, float position) 
        : color(color), position(position) {}
};` : 
                    `typedef struct {
    uint32_t color;
    float position;  // 0.0 to 1.0
} GradientStop;`}
                  language={language}
                />
                
                <h2 id="lineargradient">LinearGradient</h2>
                <p>
                  Defines a linear gradient with multiple color stops.
                </p>
                <CodeBlock 
                  code={language === 'cpp' ? 
                    `enum class GradientDirection {
    Horizontal,
    Vertical
};

struct LinearGradient {
    std::vector<GradientStop> stops;
    GradientDirection direction;
    
    LinearGradient(const std::vector<GradientStop>& stops, 
                  GradientDirection direction = GradientDirection::Horizontal)
        : stops(stops), direction(direction) {}
};` : 
                    `typedef struct {
    GradientStop* stops;
    int stop_count;
    int direction;  // GRADIENT_HORIZONTAL or GRADIENT_VERTICAL
} LinearGradient;

// Direction constants
#define GRADIENT_HORIZONTAL 0
#define GRADIENT_VERTICAL 1`}
                  language={language}
                />
                
                <h2 id="inputstate">InputState</h2>
                <p>
                  Tracks the current state of user input.
                </p>
                <CodeBlock 
                  code={language === 'cpp' ? 
                    `struct InputState {
    int mouseX;        // Current mouse X position
    int mouseY;        // Current mouse Y position
    bool leftMouseDown;  // Whether left mouse button is currently pressed
    bool rightMouseDown; // Whether right mouse button is currently pressed
    bool mouseClicked;   // Whether a click occurred in this frame
};

// Access the current input state
const InputState& Input::getState();` : 
                    `typedef struct {
    int mouse_x;      // Current mouse X position
    int mouse_y;      // Current mouse Y position
    int mouse_down;   // Whether mouse button is currently pressed
    int mouse_clicked; // Whether a click occurred in this frame
} InputState;

// Access the current input state
extern InputState current_input;`}
                  language={language}
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
                  code={language === 'cpp' ? 
                    `// Predefined colors in the Colors namespace
namespace Colors {
    constexpr uint32_t Red        = 0xFFFF0000;
    constexpr uint32_t Green      = 0xFF00FF00;
    constexpr uint32_t Blue       = 0xFF0000FF;
    constexpr uint32_t White      = 0xFFFFFFFF;
    constexpr uint32_t Black      = 0xFF000000;
    constexpr uint32_t Yellow     = 0xFFFFFF00;
    constexpr uint32_t Cyan       = 0xFF00FFFF;
    constexpr uint32_t Magenta    = 0xFFFF00FF;
    constexpr uint32_t Gray       = 0xFF808080;
    constexpr uint32_t DarkGray   = 0xFF202020;
    constexpr uint32_t LightGray  = 0xFFD3D3D3;
    constexpr uint32_t Orange     = 0xFFFFA500;
    constexpr uint32_t Purple     = 0xFF800080;
    constexpr uint32_t Pink       = 0xFFFFC0CB;
    constexpr uint32_t Brown      = 0xFF8B4513;
    constexpr uint32_t Transparent= 0x00000000;
}` : 
                    `#define Colors_green 0xFF00FF00   // Green
#define Colors_blue  0xFF0000FF   // Blue
#define Colors_red   0xFFFF0000   // Red
#define Colors_gray  0xFF202020   // Dark Gray
#define Colors_black 0xFF000000   // Black
#define Colors_white 0xFFFFFFFF   // White`}
                  language={language}
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
                  code={language === 'cpp' ? 
                    `// Half-transparent purple (50% alpha)
constexpr uint32_t MY_PURPLE = 0x80800080;   // 0x80 for alpha (50%), 0x80 for red, 0x00 for green, 0x80 for blue` : 
                    `// Half-transparent purple (50% alpha)
#define MY_PURPLE 0x80800080   // 0x80 for alpha (50%), 0x80 for red, 0x00 for green, 0x80 for blue`}
                  language={language}
                />

                {language === 'cpp' && (
                  <>
                    <h2>Using Colors</h2>
                    <p>
                      In the C++ implementation, you can use the predefined colors from the Colors namespace:
                    </p>
                    <CodeBlock 
                      code={`// Using predefined colors
Draw::circle(100, 100, 50, Colors::Red);
Draw::rect(200, 200, 100, 50, Colors::Blue);
Draw::text("Hello", 300, 300, 2, Colors::White);

// Using custom colors
Draw::line(100, 100, 200, 200, 2, 0xFF00FF00);  // Green line
Draw::circle(300, 300, 30, 0x80FF0000);         // Semi-transparent red circle`}
                      language="cpp"
                    />
                  </>
                )}
              </div>
            )}
            
            {/* Widget Functions section */}
            {section === 'widget-functions' && (
              <div className="animate-pixel-fade">
                <h1>Widget Functions</h1>
                <p className="lead text-xl text-muted-foreground mb-6">
                  Reference for the {language === 'cpp' ? 'widget classes' : 'high-level widget functions'} in Fern Graphics Library.
                </p>
                
                {language === 'cpp' ? (
                  <>
                    <h2>Widget Base Class</h2>
                    <p>
                      All widgets in the C++ implementation inherit from the Widget base class:
                    </p>
                    <CodeBlock 
                      code={`class Widget {
protected:
    int x_ = 0;
    int y_ = 0;
    int width_ = 0;
    int height_ = 0;
    bool visible_ = true;
    
public:
    Widget() = default;
    virtual ~Widget() = default;
    
    // Rendering method (overridden by derived widgets)
    virtual void render() = 0;
    
    // Input handling method (overridden by derived widgets)
    virtual bool handleInput(const InputState& input) = 0;
    
    // Getters and setters
    int getX() const { return x_; }
    int getY() const { return y_; }
    int getWidth() const { return width_; }
    int getHeight() const { return height_; }
    
    void setPosition(int x, int y) {
        x_ = x;
        y_ = y;
    }
    
    void setSize(int width, int height) {
        width_ = width;
        height_ = height;
    }
    
    void setVisible(bool visible) { visible_ = visible; }
    bool isVisible() const { return visible_; }
};`}
                      language="cpp"
                    />
                    
                    <h2>Container Widget</h2>
                    <p>
                      Creates a rectangular container that can hold a child widget.
                    </p>
                    <CodeBlock 
                      code={`// Create a container with color, position, size, child widget, and widget management flag
auto container = Container(
    Colors::DarkBlue,        // Container color
    100, 100,                // Position (x, y)
    300, 200,                // Size (width, height)
    nullptr,                 // Child widget (optional)
    false                    // Add to widget manager (defaults to false)
);

// Add a child later
container->setChild(Text(Point(0, 0), "HELLO WORLD", 2, Colors::White));

// Or create a container with a child directly
auto containerWithChild = Container(
    Colors::Black,
    0, 0, 800, 600,
    Text(Point(350, 300), "CENTERED TEXT", 2, Colors::White, false)
);`}
                      language="cpp"
                    />
                    
                    <h2>Text Widget</h2>
                    <p>
                      Renders text with customizable position, scale, and color.
                    </p>
                    <CodeBlock 
                      code={`// Create text at position (100,100) with font scale 2
auto myText = Text(Point(100, 100), "HELLO WORLD", 2, Colors::White);

// Update text content later
myText->setText("UPDATED TEXT");

// Change text color
myText->setColor(Colors::Yellow);

// Change text position
myText->setPosition(Point(200, 200));`}
                      language="cpp"
                    />
                    
                    <h2>Button Widget</h2>
                    <p>
                      Creates an interactive button with click handling.
                    </p>
                    <CodeBlock 
                      code={`// Define button configuration
ButtonConfig btnConfig = {
    .x = 100,
    .y = 200,
    .width = 200,
    .height = 50,
    .normalColor = Colors::Blue,
    .hoverColor = Colors::LightBlue,
    .pressColor = Colors::DarkBlue,
    .label = "CLICK ME",
    .textScale = 2,
    .textColor = Colors::White
};

// Create button from config
auto myButton = Button(btnConfig);

// Connect click handler using signal/slot system
myButton->onClick.connect([]() {
    std::cout << "Button clicked!" << std::endl;
});

// Alternative: create button with inline lambda
auto button = Button({
    .x = 300, .y = 300, .width = 150, .height = 40,
    .normalColor = Colors::Green,
    .label = "SAVE"
});

button->onClick.connect([]() {
    // Save action
    saveData();
});`}
                      language="cpp"
                    />
                    
                    <h2>Circle Widget</h2>
                    <p>
                      Creates a circle with customizable radius, position, and color.
                    </p>
                    <CodeBlock 
                      code={`// Create circle with radius 30 at (200,200)
auto myCircle = Circle(30, Point(200, 200), Colors::Red);

// Modify properties
myCircle->setRadius(40);
myCircle->setColor(Colors::Green);
myCircle->setPosition(Point(300, 300));`}
                      language="cpp"
                    />
                    
                    <h2>Layout Widgets</h2>
                    <p>
                      The C++ implementation provides powerful layout widgets for responsive design:
                    </p>
                    <CodeBlock 
                      code={`// Column layout (vertical arrangement)
auto column = Column({
    Text(Point(0, 0), "TITLE", 3, Colors::White, false),
    Circle(50, Point(0, 0), Colors::Blue, false),
    Text(Point(0, 0), "Bottom Text", 2, Colors::Green, false)
});

// Row layout (horizontal arrangement)
auto row = Row({
    Text(Point(0, 0), "LEFT", 2, Colors::White, false),
    Circle(30, Point(0, 0), Colors::Blue, false),
    Text(Point(0, 0), "RIGHT", 2, Colors::Green, false)
}, false, MainAxisAlignment::SpaceBetween);

// Expanded widget (fills available space)
auto layout = Row({
    // Fixed width container
    Container(Colors::Red, 0, 0, 100, 0, false),
    
    // This will expand to fill remaining space
    Expanded(
        Container(Colors::Blue, 0, 0, 0, 0, false),
        1  // Flex factor
    )
}, false);

// Padding widget (adds space around a child)
auto paddedText = Padding(
    Text(Point(0, 0), "PADDED TEXT", 2, Colors::White, false),
    15,  // 15 pixels of padding on all sides
    false
);`}
                      language="cpp"
                    />
                  </>
                ) : (
                  <>
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
                  </>
                )}
              </div>
            )}
            
            {/* Drawing Functions section */}
            {section === 'drawing-functions' && (
              <div className="animate-pixel-fade">
                <h1>Drawing Functions</h1>
                <p className="lead text-xl text-muted-foreground mb-6">
                  Reference for the {language === 'cpp' ? 'drawing' : 'lower-level drawing'} functions in Fern Graphics Library.
                </p>
                
                <h2>Core Drawing Functions</h2>
                <p>
                  {language === 'cpp' ? 
                    "The C++ implementation provides a clean, object-oriented drawing API through the Draw namespace:" :
                    "For more advanced use cases, you can use these lower-level drawing functions:"}
                </p>
                <CodeBlock 
                  code={language === 'cpp' ? 
                    codeExamples.drawingFunctions.cpp : 
                    codeExamples.drawingFunctions.c}
                  language={language}
                />
                
                <h2>Usage Example</h2>
                <p>
                  Example of using the {language === 'cpp' ? '' : 'lower-level'} drawing functions:
                </p>
                <CodeBlock 
                  code={language === 'cpp' ? 
                    `// Draw a basic scene using the Draw namespace
void draw() {
    // Clear the screen with black
    Draw::fill(Colors::Black);
    
    // Draw a blue rectangle
    Draw::rect(50, 50, 200, 150, Colors::Blue);
    
    // Draw a red circle
    Draw::circle(300, 200, 75, Colors::Red);
    
    // Draw a white line
    Draw::line(100, 300, 400, 350, 3, Colors::White);
    
    // Draw some text
    Draw::text("FERN GRAPHICS", 150, 400, 2, Colors::Green);
}` : 
                    `// Draw a basic scene using low-level functions
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
                  language={language}
                />

                {language === 'cpp' && (
                  <>
                    <h2>Advanced Drawing</h2>
                    <p>
                      The C++ implementation also provides more advanced drawing capabilities:
                    </p>
                    <CodeBlock 
                      code={`// Draw a gradient background
Draw::gradient(0, 0, width, height, Colors::DarkBlue, Colors::Black, true);

// Draw a triangle
Draw::triangle(100, 100, 200, 50, 150, 200, Colors::Green);

// Draw an outlined shape
Draw::rect(300, 300, 100, 100, Colors::Red, false);  // Outlined rectangle
Draw::circle(500, 300, 50, Colors::Blue, false);     // Outlined circle

// Draw an image from a pixel buffer
uint32_t* imageData = loadImage("myimage.png");  // Your image loading function
Draw::image(100, 100, 256, 256, imageData);`}
                      language="cpp"
                    />
                  </>
                )}
              </div>
            )}
            
            {/* Application Lifecycle section */}
            {section === 'application-lifecycle' && (
              <div className="animate-pixel-fade">
                <h1>Application Lifecycle</h1>
                <p className="lead text-xl text-muted-foreground mb-6">
                  Reference for the application lifecycle {language === 'cpp' ? 'methods' : 'functions'} in Fern Graphics Library.
                </p>
                
                <h2>Core {language === 'cpp' ? 'Methods' : 'Functions'}</h2>
                <CodeBlock 
                  code={language === 'cpp' ? 
                    `// Initialize the library
void Fern::initialize();

// Alternative: Initialize with custom pixel buffer
void Fern::initialize(uint32_t* pixels, int width, int height);

// Set the main drawing function
void Fern::setDrawCallback(std::function<void()> drawFunction);

// Start the rendering loop
void Fern::startRenderLoop();

// Get the current canvas dimensions
int Fern::getWidth();
int Fern::getHeight();

// Add a widget to the widget manager
void addWidget(std::shared_ptr<Widget> widget);

// Clear all widgets from the widget manager
void WidgetManager::getInstance().clear();` : 
                    `// Initialize the application with a canvas
void runApp(FernCanvas canvas);

// Start the rendering loop
void fern_start_render_loop(void);

// Optional: Set a draw function to be called every frame
void fern_set_draw_callback(void (*draw_function)(void));`}
                  language={language}
                />
                
                <h2>Static Application</h2>
                <p>
                  For basic applications, you can {language === 'cpp' ? 'create widgets once and start the render loop' : 'draw once and call fern_start_render_loop()'}:
                </p>
                <CodeBlock 
                  code={language === 'cpp' ? 
                    `int main() {
    // Initialize
    Fern::initialize();
    
    // Create static widgets
    Container(Colors::Black, 0, 0, 800, 600, nullptr, true);
    Text(Point(400, 300), "HELLO WORLD", 3, Colors::White, true);
    Circle(50, Point(400, 400), Colors::Red, true);
    
    // Start rendering
    Fern::startRenderLoop();
    return 0;
}`
                    : 
                    `int main() {
    // Initialize
    FernCanvas canvas = {pixels, HEIGHT, WIDTH};
    runApp(canvas);
    
    // Draw static content
    Container(color(Colors_black), x(0), y(0), width(WIDTH), height(HEIGHT));
    CircleWidget(radius(50), position(Point_create(WIDTH/2, HEIGHT/2)), color(Colors_red));
    
    // Start rendering
    fern_start_render_loop();
    return 0;
}`}
                  language={language}
                />
                
                <h2>Interactive Application</h2>
                <p>
                  For interactive applications, use a draw callback:
                </p>
                <CodeBlock 
                  code={
                    `// main.cpp
#include <fern/fern.hpp>
#include <string>

using namespace Fern;

// Global state
static int counter = 0;
static std::shared_ptr<Text> counterText;

// Setup UI elements
void setupUI() {
    // Create background container
    auto container = Container(Colors::Black, 0, 0, Fern::getWidth(), Fern::getHeight(), nullptr, true);
    
    // Create title
    Text(Point(Fern::getWidth()/2 - 120, 50), "COUNTER EXAMPLE", 2, Colors::White, true);
    
    // Create counter text (store reference to update later)
    counterText = Text(Point(Fern::getWidth()/2 - 70, Fern::getHeight()/2), 
                        "COUNT: " + std::to_string(counter), 2, Colors::White, true);
    
    // Create increment button
    auto incrementBtn = Button({
        .x = Fern::getWidth()/2 - 120,
        .y = Fern::getHeight()/2 + 100,
        .width = 100,
        .height = 50,
        .normalColor = Colors::Green,
        .hoverColor = Colors::LightGreen,
        .pressColor = Colors::DarkGreen,
        .label = "+",
        .textScale = 2,
        .textColor = Colors::White
    }, true);
    
    // Create decrement button
    auto decrementBtn = Button({
        .x = Fern::getWidth()/2 + 20,
        .y = Fern::getHeight()/2 + 100,
        .width = 100,
        .height = 50,
        .normalColor = Colors::Red,
        .hoverColor = Colors::LightRed,
        .pressColor = Colors::DarkRed,
        .label = "-",
        .textScale = 2,
        .textColor = Colors::White
    }, true);
    
    // Connect button click handlers
    incrementBtn->onClick.connect([]() {
        counter++;
        counterText->setText("COUNT: " + std::to_string(counter));
    });
    
    decrementBtn->onClick.connect([]() {
        if (counter > 0) {
            counter--;
            counterText->setText("COUNT: " + std::to_string(counter));
        }
    });
}

// Main drawing function (not much needed since widgets handle themselves)
void draw() {
    // The Draw namespace can be used for additional drawing if needed
    Draw::fill(Colors::Black);
}

int main() {
    // Initialize
    Fern::initialize();
    
    // Setup UI
    setupUI();
    
    // Set draw callback
    Fern::setDrawCallback(draw);
    
    // Start rendering
    Fern::startRenderLoop();
    return 0;
}`}
                  language="cpp"
                /> : (
  <CodeBlock 
    code={`#include "fern.c"

#define WIDTH 800
#define HEIGHT 600
static uint32_t pixels[HEIGHT*WIDTH];

// Global state
static int counter = 0;

// Button callback
void increment_counter() {
    counter++;
}

void decrement_counter() {
    if (counter > 0) counter--;
}

void draw_frame() {
    // Clear screen
    ffill(pixels, HEIGHT, WIDTH, Colors_black);
    
    // Draw title
    ftext(pixels, WIDTH, HEIGHT, "COUNTER EXAMPLE", WIDTH/2 - 120, 50, 2, Colors_white);
    
    // Draw counter value
    char counter_text[20];
    sprintf(counter_text, "COUNT: %d", counter);
    ftext(pixels, WIDTH, HEIGHT, counter_text, WIDTH/2 - 70, HEIGHT/2, 2, Colors_white);
    
    // Create buttons
    ButtonConfig increment_btn = {
        .x = WIDTH/2 - 120, .y = HEIGHT/2 + 100,
        .width = 100, .height = 50,
        .normal_color = Colors_green,
        .hover_color = 0xFF44FF44, .press_color = 0xFF00AA00,
        .label = "+", .text_scale = 2, .text_color = Colors_white,
        .on_click = increment_counter
    };
    
    ButtonConfig decrement_btn = {
        .x = WIDTH/2 + 20, .y = HEIGHT/2 + 100,
        .width = 100,
        .height = 50,
        .normal_color = Colors_red,
        .hover_color = 0xFFFF4444, .press_color = 0xFFAA0000,
        .label = "-", .text_scale = 2, .text_color = Colors_white,
        .on_click = decrement_counter
    };
    
    ButtonWidget(increment_btn);
    ButtonWidget(decrement_btn);
}`}
    language="c"
  />
)
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
                  code={language === 'cpp' ? 
                    `// Save the current pixel buffer as a PPM file
void Fern::savePPM(const std::string& filename);

// Alternative: Save a specific pixel buffer
bool savePPM(uint32_t* pixels, int width, int height, const std::string& filename);` :
                    `// Save the current pixel buffer as a PPM file
int fsave_ppm(uint32_t* pixels, size_t width, size_t height, const char* filename);`}
                  language={language}
                />
                
                <h2>Usage Example</h2>
                <CodeBlock 
                  code={language === 'cpp' ? 
                    `// Create and render a scene
// ...

// Save the rendered image (using the current canvas)
Fern::savePPM("output.ppm");

// Or save a specific buffer
uint32_t* customBuffer = new uint32_t[width * height];
// ... fill buffer with pixel data
savePPM(customBuffer, width, height, "custom.ppm");
delete[] customBuffer;` :
                    `// Create and render a scene
// ...

// Save the rendered image
fsave_ppm(canvas.pixels, canvas.width, canvas.height, "output.ppm");`}
                  language={language}
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
                
                {language === 'cpp' ? (
                  <>
                    <h2>Built-in Filled Shapes</h2>
                    <p>
                      The C++ implementation provides built-in filled shapes:
                    </p>
                    <CodeBlock 
                      code={`// Create a filled triangle
auto triangle = FilledTriangle(
    Point(100, 100),   // First point
    Point(200, 300),   // Second point
    Point(300, 100),   // Third point
    Colors::Blue,      // Fill color
    true               // Add to widget manager
);

// Create a filled polygon
auto polygon = FilledPolygon({
    Point(100, 100),
    Point(200, 50),
    Point(300, 100),
    Point(250, 200),
    Point(150, 200)
}, Colors::Green, true);

// Create a filled rectangle with rounded corners
auto roundedRect = RoundedRectangle(
    100, 100,          // Position
    200, 150,          // Size
    10,                // Corner radius
    Colors::Purple,    // Fill color
    true               // Add to widget manager
);`}
                      language="cpp"
                    />
                    
                    <h2>Gradient Support</h2>
                    <p>
                      The C++ implementation supports rich gradients:
                    </p>
                    <CodeBlock 
                      code={`// Create a linear gradient
auto linearGradient = LinearGradient({
    {Colors::Blue, 0.0f},     // Start color (position 0.0)
    {Colors::Purple, 0.5f},   // Middle color (position 0.5)
    {Colors::Red, 1.0f}       // End color (position 1.0)
}, GradientDirection::Horizontal);

// Create a radial gradient
auto radialGradient = RadialGradient({
    {Colors::White, 0.0f},    // Center color (position 0.0)
    {Colors::Blue, 0.5f},     // Middle color (position 0.5)
    {Colors::Black, 1.0f}     // Edge color (position 1.0)
});

// Apply gradient to a container
auto gradientContainer = Container(
    linearGradient,           // Gradient instead of solid color
    100, 100, 300, 200,       // Position and size
    nullptr,                  // No child widget
    true                      // Add to widget manager
);

// Apply gradient to a circle
auto gradientCircle = Circle(
    50,                       // Radius
    Point(200, 200),          // Position
    radialGradient,           // Gradient instead of solid color
    true                      // Add to widget manager
);`}
                      language="cpp"
                    />
                  </>
                ) : (
                  <>
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
                  </>
                )}
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
            
            Layout System section - C++ only
            {section === 'layout-system' && (
              <div className="animate-pixel-fade">
                <h1>Layout System</h1>
                <p className="lead text-xl text-muted-foreground mb-6">
                  The C++ implementation features a powerful layout system inspired by Flutter for creating responsive UIs.
                </p>
                
                <h2>Layout Widgets</h2>
                <p>
                  Fern's C++ implementation provides several layout widgets that help you organize your UI:
                </p>
                
                <h3>Row</h3>
                <p>
                  Arranges children in a horizontal line.
                </p>
                <CodeBlock 
                  code={`// Create a row with three widgets
auto row = Row({
    Text(Point(0, 0), "LEFT", 2, Colors::White, false),
    Circle(30, Point(0, 0), Colors::Blue, false),
    Text(Point(0, 0), "RIGHT", 2, Colors::Green, false)
}, true);  // Add to widget manager

// Row with custom alignment
auto spacedRow = Row({
    Button({.label = "Button 1", .width = 100, .height = 40}, false),
    Button({.label = "Button 2", .width = 100, .height = 40}, false),
    Button({.label = "Button 3", .width = 100, .height = 40}, false)
}, true, MainAxisAlignment::SpaceBetween);  // Distribute space between items

// Available MainAxisAlignment options:
// - Start: Place items at the start of the row (default)
// - Center: Center items within the row
// - End: Place items at the end of the row
// - SpaceBetween: Distribute space evenly between items
// - SpaceAround: Distribute space evenly around items
// - SpaceEvenly: Distribute space evenly between and around items`}
                  language="cpp"
                />
                
                <h3>Column</h3>
                <p>
                  Arranges children in a vertical column.
                </p>
                <CodeBlock 
                  code={`// Create a column with three widgets
auto column = Column({
    Text(Point(0, 0), "TOP", 2, Colors::White, false),
    Circle(30, Point(0, 0), Colors::Blue, false),
    Text(Point(0, 0), "BOTTOM", 2, Colors::Green, false)
}, true);  // Add to widget manager

// Column with custom alignment
auto centeredColumn = Column({
    Text(Point(0, 0), "TITLE", 3, Colors::White, false),
    Container(Colors::Blue, 0, 0, 200, 100, nullptr, false),
    Button({.label = "CLICK ME", .width = 150, .height = 40}, false)
}, true, MainAxisAlignment::Center);  // Center items vertically`}
                  language="cpp"
                />
                
                <h3>Expanded</h3>
                <p>
                  A widget that expands to fill available space in a Row or Column.
                </p>
                <CodeBlock 
                  code={`// Create a row with one fixed-width widget and one expanded widget
auto layout = Row({
    // Fixed width container (100px)
    Container(Colors::Red, 0, 0, 100, 100, nullptr, false),
    
    // This will expand to fill remaining space
    Expanded(
        Container(Colors::Blue, 0, 0, 0, 100, nullptr, false),
        1  // Flex factor (relative weight)
    )
}, true);

// Multiple expanded widgets with different flex factors
auto complexLayout = Row({
    // Takes 1/6 of the space (flex 1 out of total 6)
    Expanded(
        Container(Colors::Red, 0, 0, 0, 100, nullptr, false),
        1
    ),
    
    // Takes 2/6 of the space (flex 2 out of total 6)
    Expanded(
        Container(Colors::Green, 0, 0, 0, 100, nullptr, false),
        2
    ),
    
    // Takes 3/6 of the space (flex 3 out of total 6)
    Expanded(
        Container(Colors::Blue, 0, 0, 0, 100, nullptr, false),
        3
    )
}, true);`}
                  language="cpp"
                />
                
                <h3>Center</h3>
                <p>
                  Centers a child widget within its container.
                </p>
                <CodeBlock 
                  code={`// Center a text widget in its container
auto centeredText = Center(
    Text(Point(0, 0), "CENTERED TEXT", 2, Colors::White, false),
    true  // Add to widget manager
);

// Center a widget within a specific container
auto container = Container(
    Colors::DarkBlue,
    100, 100, 300, 200,  // Position and size
    Center(
        Text(Point(0, 0), "CENTERED IN CONTAINER", 2, Colors::White, false),
        false  // Don't add Center to widget manager (parent will handle)
    ),
    true  // Add container to widget manager
);`}
                  language="cpp"
                />
                
                <h3>Padding</h3>
                <p>
                  Adds padding around a child widget.
                </p>
                <CodeBlock 
                  code={`// Add 20px padding on all sides
auto paddedText = Padding(
    Text(Point(0, 0), "PADDED TEXT", 2, Colors::White, false),
    20,  // Padding on all sides
    true  // Add to widget manager
);

// Add different padding for each side
auto customPadding = Padding(
    Container(Colors::Blue, 0, 0, 100, 50, nullptr, false),
    EdgeInsets(10, 20, 15, 5),  // top, right, bottom, left
    true  // Add to widget manager
);`}
                  language="cpp"
                />
                
                <h2>Responsive Design</h2>
                <p>
                  The layout system makes it easy to create responsive applications that adapt to window size changes:
                </p>
                <CodeBlock 
                  code={`// Main layout setup function
void setupUI() {
    int width = Fern::getWidth();
    int height = Fern::getHeight();
    
    // Create a responsive layout
    auto mainLayout = Container(
        Colors::Black,
        0, 0, width, height,
        Column({
            // Header (fixed height)
            Container(
                Colors::DarkBlue,
                0, 0, width, 60,
                Center(Text(Point(0, 0), "RESPONSIVE APP", 2, Colors::White, false), false),
                false
            ),
            
            // Content area (expands to fill space)
            Expanded(
                Row({
                    // Sidebar (takes 1/4 of width)
                    Expanded(
                        Container(Colors::DarkGray, 0, 0, 0, 0, nullptr, false),
                        1
                    ),
                    
                    // Main content (takes 3/4 of width)
                    Expanded(
                        Container(Colors::Gray, 0, 0, 0, 0, nullptr, false),
                        3
                    )
                }, false),
                1
            ),
            
            // Footer (fixed height)
            Container(
                Colors::DarkBlue,
                0, 0, width, 40,
                Center(Text(Point(0, 0), "FOOTER", 1, Colors::White, false), false),
                false
            )
        }, false),
        true
    );
}

// Main drawing function
void draw() {
    static int lastWidth = 0;
    static int lastHeight = 0;
    
    int width = Fern::getWidth();
    int height = Fern::getHeight();
    
    // Rebuild UI when size changes
    if (width != lastWidth || height != lastHeight) {
        WidgetManager::getInstance().clear();
        setupUI();
        
        lastWidth = width;
        lastHeight = height;
    }
}`}
                  language="cpp"
                />
                
                <h2>Layout Constraints</h2>
                <p>
                  The layout system uses constraints to determine the size and position of widgets:
                </p>
                <ul>
                  <li><strong>Tight constraints</strong>: When a widget has a specific size</li>
                  <li><strong>Loose constraints</strong>: When a widget can expand to fill available space</li>
                  <li><strong>Unbounded constraints</strong>: When a widget can be any size</li>
                </ul>
                
                <p>
                  The layout algorithm works by passing constraints down the widget tree and sizes back up:
                </p>
                <ol>
                  <li>Parent passes constraints to children</li>
                  <li>Children determine their sizes within those constraints</li>
                  <li>Parent positions children based on their sizes and the layout policy</li>
                </ol>
                
                <h2>Custom Layouts</h2>
                <p>
                  You can create custom layout widgets by extending the <code>LayoutWidget</code> class:
                </p>
                <CodeBlock 
                  code={`class CustomGridLayout : public LayoutWidget {
private:
    std::vector<std::shared_ptr<Widget>> children_;
    int columns_;
    int spacing_;
    
public:
    CustomGridLayout(const std::vector<std::shared_ptr<Widget>>& children, 
                     int columns = 2, int spacing = 10, bool addToManager = true)
        : children_(children), columns_(columns), spacing_(spacing) {
        if (addToManager) {
            addWidget(shared_from_this());
        }
    }
    
    void render() override {
        // Calculate grid cell size
        int cellWidth = (width_ - (columns_ - 1) * spacing_) / columns_;
        int rows = (children_.size() + columns_ - 1) / columns_;
        int cellHeight = (height_ - (rows - 1) * spacing_) / rows;
        
        // Position and size each child
        for (size_t i = 0; i < children_.size(); i++) {
            int row = i / columns_;
            int col = i % columns_;
            
            int childX = x_ + col * (cellWidth + spacing_);
            int childY = y_ + row * (cellHeight + spacing_);
            
            children_[i]->setPosition(childX, childY);
            children_[i]->setSize(cellWidth, cellHeight);
            children_[i]->render();
        }
    }
    
    bool handleInput(const InputState& input) override {
        // Pass input to children in reverse order (top to bottom)
        for (auto it = children_.rbegin(); it != children_.rend(); ++it) {
            if ((*it)->handleInput(input)) {
                return true;
            }
        }
        return false;
    }
};`}
                  language="cpp"
                />
              </div>
            )}
            
            {/* Signal/Slot System section - C++ only */}
            {section === 'signal-slot' && (
              <div className="animate-pixel-fade">
                <h1>Signal/Slot System</h1>
                <p className="lead text-xl text-muted-foreground mb-6">
                  The C++ implementation features a powerful signal/slot system for event handling.
                </p>
                
                <h2>Overview</h2>
                <p>
                  The signal/slot system is a type-safe implementation of the observer pattern, allowing objects to communicate without being tightly coupled. It's similar to the systems used in Qt and Boost.Signals2.
                </p>
                
                <h2>Basic Usage</h2>
                <p>
                  Widgets expose signals that you can connect to slots (callback functions):
                </p>
                <CodeBlock 
                  code={`// Create a button
auto button = Button({
    .x = 100,
    .y = 200,
    .width = 200,
    .height = 60,
    .normalColor = Colors::Blue,
    .label = "CLICK ME"
}, true);

// Connect a lambda function to the button's onClick signal
button->onClick.connect([]() {
    std::cout << "Button clicked!" << std::endl;
});

// Connect a member function
class MyClass {
public:
    void handleClick() {
        std::cout << "MyClass handled the click!" << std::endl;
    }
};

MyClass myObject;
button->onClick.connect(std::bind(&MyClass::handleClick, &myObject));`}
                  language="cpp"
                />
                
                <h2>Signal Types</h2>
                <p>
                  Signals can have different parameter types:
                </p>
                <CodeBlock 
                  code={`// Signal with no parameters
Signal<> simpleSignal;

// Signal with a single parameter
Signal<int> valueChangedSignal;

// Signal with multiple parameters
Signal<int, std::string> complexSignal;

// Connecting to signals with parameters
valueChangedSignal.connect([](int newValue) {
    std::cout << "Value changed to: " << newValue << std::endl;
});

complexSignal.connect([](int id, const std::string& message) {
    std::cout << "ID " << id << ": " << message << std::endl;
});`}
                  language="cpp"
                />
                
                <h2>Widget Signals</h2>
                <p>
                  Common widget signals available in the Fern C++ library:
                </p>
                <ul>
                  <li><strong>Button::onClick</strong>: Triggered when a button is clicked</li>
                  <li><strong>Slider::onValueChanged</strong>: Triggered when a slider value changes</li>
                  <li><strong>TextField::onTextChanged</strong>: Triggered when text input changes</li>
                  <li><strong>CheckBox::onToggled</strong>: Triggered when a checkbox is toggled</li>
                  <li><strong>DropDown::onSelectionChanged</strong>: Triggered when dropdown selection changes</li>
                  <li><strong>Widget::onMouseEnter</strong>: Triggered when mouse enters a widget</li>
                  <li><strong>Widget::onMouseLeave</strong>: Triggered when mouse leaves a widget</li>
                </ul>
                
                <h2>Signal Disconnection</h2>
                <p>
                  You can store connection objects to disconnect signals later:
                </p>
                <CodeBlock 
                  code={`// Connect and store the connection
auto connection = button->onClick.connect([]() {
    std::cout << "This will only be called once" << std::endl;
});

// Later, disconnect the signal
connection.disconnect();

// You can also disconnect all slots from a signal
button->onClick.disconnectAll();`}
                  language="cpp"
                />
                
                <h2>Custom Signals</h2>
                <p>
                  You can add signals to your own classes:
                </p>
                <CodeBlock 
                  code={`class GameController {
private:
    int score_ = 0;
    int lives_ = 3;
    
public:
    // Define signals
    Signal<int> onScoreChanged;
    Signal<int> onLivesChanged;
    Signal<> onGameOver;
    
    void increaseScore(int points) {
        score_ += points;
        onScoreChanged.emit(score_);  // Emit the signal with the new score
    }
    
    void loseLife() {
        lives_--;
        onLivesChanged.emit(lives_);
        
        if (lives_ <= 0) {
            onGameOver.emit();  // Emit the game over signal
        }
    }
};

// Usage
GameController game;

// Connect to signals
game.onScoreChanged.connect([](int newScore) {
    std::cout << "Score: " << newScore << std::endl;
});

game.onLivesChanged.connect([](int livesRemaining) {
    std::cout << "Lives: " << livesRemaining << std::endl;
});

game.onGameOver.connect([]() {
    std::cout << "Game Over!" << std::endl;
});

// Trigger the signals
game.increaseScore(100);
game.loseLife();`}
                  language="cpp"
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
