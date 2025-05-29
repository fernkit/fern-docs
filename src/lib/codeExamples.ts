// C and C++ code examples
export const codeExamples = {
  // Basic examples
  basicExample: {
    c: `// main.c
#include "fern.c"

#define WIDTH 800
#define HEIGHT 600
static uint32_t pixels[HEIGHT*WIDTH];

void draw_frame() {
    ffill(pixels, HEIGHT, WIDTH, Colors_gray);
    frect(pixels, HEIGHT, WIDTH, Colors_blue, 100, 100, 200, 150);
    fcircle(pixels, HEIGHT, WIDTH, Colors_red, 400, 300, 50);
    ftext(pixels, WIDTH, HEIGHT, "HELLO WORLD", 300, 50, 2, Colors_white);
}

int main() {
    FernCanvas canvas = {pixels, HEIGHT, WIDTH};
    runApp(canvas);
    fern_set_draw_callback(draw_frame);
    fern_start_render_loop();
    return 0;
}`,
    cpp: `// main.cpp
#include <fern/fern.hpp>
#include <memory>

using namespace Fern;

void setupUI() {
    auto mainLayout = Column({
        Text(Point(0, 0), "FERN C++ DEMO", 3, Colors::White, false),
        Circle(50, Point(0, 0), Colors::Blue, false),
        Button({
            .width = 200,
            .height = 60,
            .normalColor = Colors::Green,
            .label = "CLICK ME"
        }, false)
    });
}

void draw() {
    Draw::fill(Colors::DarkGray);
}

int main() {
    Fern::initialize();
    setupUI();
    Fern::setDrawCallback(draw);
    Fern::startRenderLoop();
    return 0;
}`
  },
  
  // Counter example
  counterExample: {
    c: `// counter.c
#include "fern.c"

#define WIDTH 800
#define HEIGHT 600
static uint32_t pixels[HEIGHT*WIDTH];
static int counter = 0;

void increment_counter() {
    counter++;
    fernPrintf("Counter: %d", counter);
}

void draw_frame() {
    // Clear background
    Container(color(Colors_gray), x(0), y(0), width(WIDTH), height(HEIGHT));
    
    // Display counter
    char counter_text[20];
    sprintf(counter_text, "COUNT: %d", counter);
    TextWidget(Point_create(50, 100), counter_text, 3, Colors_white);
    
    // Create button
    ButtonConfig button = {
        .x = 50, .y = 200, .width = 200, .height = 60,
        .normal_color = Colors_green,
        .hover_color = 0xFF44AA44,
        .press_color = 0xFF227722,
        .label = "INCREMENT",
        .text_scale = 2,
        .text_color = Colors_white,
        .on_click = increment_counter
    };
    ButtonWidget(button);
}

int main() {
    FernCanvas canvas = {pixels, HEIGHT, WIDTH};
    runApp(canvas);
    fern_set_draw_callback(draw_frame);
    fern_start_render_loop();
    return 0;
}`,
    cpp: `#include <fern/fern.hpp>
#include <iostream>
#include <memory>

using namespace Fern;

static uint32_t pixels[600 * 800];
static int clickCount = 0;
static std::shared_ptr<TextWidget> counterText;

void setupUI() {
    Text(Point(50, 50), "BUTTON DEMO", 3, Colors::White);
    counterText = Text(Point(50, 400), "COUNT: 0", 2, Colors::White);
    
    ButtonConfig config = {
        .x = 300, .y = 250, .width = 200, .height = 50,
        .normalColor = Colors::Green,
        .hoverColor = Colors::LightGreen,
        .pressColor = Colors::DarkGreen,
        .label = "CLICK ME",
        .textScale = 2,
        .textColor = Colors::White
    };
    
    auto button = Button(config);
    button->onClick.connect([]() {
        clickCount++;
        counterText->setText("COUNT: " + std::to_string(clickCount));
        std::cout << "Clicked! Count: " << clickCount << std::endl;
    });
}

void draw() {
    Draw::fill(Colors::DarkGray);
}

int main() {
    Fern::initialize(pixels, 800, 600);
    setupUI();
    Fern::setDrawCallback(draw);
    Fern::startRenderLoop();
    return 0;
}`
  },
  
  // Complex layout example
  complexLayoutExample: {
    c: `// No direct equivalent in C implementation
// This is a simplified version with manual positioning

#include "fern.c"

#define WIDTH 800
#define HEIGHT 600
static uint32_t pixels[HEIGHT*WIDTH];

void draw_frame() {
    // Background
    Container(color(Colors_black), x(0), y(0), width(WIDTH), height(HEIGHT));
    
    // Album art (centered)
    Container(color(0xFF000080), x(WIDTH/2 - 140), y(80), width(280), height(280));
    TextWidget(Point_create(WIDTH/2 - 50, 200), "MUSIC", 6, 0xFF87CEEB);
    
    // Song info
    TextWidget(Point_create(WIDTH/2 - 120, 380), "COSMIC WAVES", 2.5, Colors_white);
    TextWidget(Point_create(WIDTH/2 - 100, 410), "STELLAR ORCHESTRA", 1.2, 0xFFAAAAAA);
    
    // Progress bar
    Container(color(0xFF444444), x(WIDTH/2 - 150), y(450), width(300), height(4));
    Container(color(0xFF87CEEB), x(WIDTH/2 - 150), y(450), width(100), height(4));
    
    // Time indicators
    TextWidget(Point_create(WIDTH/2 - 150, 470), "2:14", 1, 0xFF888888);
    TextWidget(Point_create(WIDTH/2 + 130, 470), "5:30", 1, 0xFF888888);
    
    // Control buttons
    TextWidget(Point_create(WIDTH/2 - 100, 500), "PREV", 1.5, 0xFFAAAAAA);
    TextWidget(Point_create(WIDTH/2, 500), "II", 1.8, Colors_white);
    TextWidget(Point_create(WIDTH/2 + 80, 500), "NEXT", 1.5, 0xFFAAAAAA);
}

int main() {
    FernCanvas canvas = {pixels, HEIGHT, WIDTH};
    runApp(canvas);
    fern_set_draw_callback(draw_frame);
    fern_start_render_loop();
    return 0;
}`,
    cpp: `#include <fern/fern.hpp>
#include <string>

using namespace Fern;

// Helper for creating control buttons
std::shared_ptr<Widget> createControlButton(uint32_t color, const std::string& label, float scale = 1.5) {
    return Container(
        Colors::Transparent,
        0, 0, 80, 50,
        Center(Text(Point(0, 0), label, scale, color, false), false)
    );
}

void setupUI() {
    WidgetManager::getInstance().clear();
    
    int width = Fern::getWidth();
    int height = Fern::getHeight();
    
    addWidget(
        Container(
            Colors::Black,
            0, 0, width, height,
            Padding(
                Column({                   
                    SizedBox(0, 30, false),
                    
                    // Album art
                    Center(
                        Container(
                            Colors::DarkBlue, // Album color
                            0, 0, 280, 280,
                            Center(Text(Point(0, 0), "MUSIC", 6, Colors::SkyBlue, false), false)
                        ),
                        false
                    ),
                    
                    SizedBox(0, 25, false),
                    
                    // Song info
                    Column({
                        Center(Text(Point(0, 0), "COSMIC WAVES", 2.5, Colors::White, false), false),
                        SizedBox(0, 8, false),
                        Center(Text(Point(0, 0), "STELLER ORCHESTRA", 1.2, Colors::LightGray, false), false)
                    }, false),
                    
                    SizedBox(0, 25, false),
                    
                    // Progress bar
                    Column({
                        Container(
                            Colors::DarkGray,
                            0, 0, 0, 4,
                            Row({
                                Container(Colors::SkyBlue, 0, 0, width * 0.35, 4)
                            }, false)
                        ),
                        
                        SizedBox(0, 8, false),
                        
                        Row({
                            Text(Point(0, 0), "2:14", 1, Colors::Gray, false),
                            SizedBox(0, 0, false),
                            Text(Point(0, 0), "5:30", 1, Colors::Gray, false)
                        }, false, MainAxisAlignment::SpaceBetween)
                    }, false),
                    
                    SizedBox(0, 25, false),
                    
                    // Control buttons
                    Center(
                        Row({
                            createControlButton(Colors::LightGray, "PREV"),
                            SizedBox(25, 0, false),
                            createControlButton(Colors::White, "II", 1.8),
                            SizedBox(25, 0, false),
                            createControlButton(Colors::LightGray, "NEXT")
                        }, false),
                        false
                    )
                }, false),
                20,
                false
            )
        )
    );
}

void draw() {
    Draw::fill(Colors::Black);
}

int main() {
    Fern::initialize();
    setupUI();
    Fern::setDrawCallback(draw);
    Fern::startRenderLoop();
    return 0;
}`
  },
  
  // Whiteboard example
  whiteboardExample: {
    c: `#include "fern.c"

#define WIDTH 800
#define HEIGHT 600
#define MAX_STROKES 10000
#define MAX_COLORS 12

static uint32_t pixels[HEIGHT*WIDTH];

// Application state
typedef struct {
    int x;
    int y;
    int size;
    uint32_t color;
} DrawPoint;

static DrawPoint strokes[MAX_STROKES];
static int stroke_count = 0;
static int current_color = 0;
static int brush_size = 5;
static int prev_mouse_x = -1;
static int prev_mouse_y = -1;
static bool drawing = false;

static uint32_t color_palette[MAX_COLORS] = {
    0xFF000000,  // Black
    0xFFFFFFFF,  // White
    0xFFFF0000,  // Red
    0xFF00FF00,  // Green
    0xFF0000FF,  // Blue
    0xFFFFFF00,  // Yellow
    0xFF00FFFF,  // Cyan
    0xFFFF00FF,  // Magenta
    0xFFFFA500,  // Orange
    0xFF800080,  // Purple
    0xFF006400,  // Dark Green
    0xFF8B4513   // Brown
};

void draw_line(int x0, int y0, int x1, int y1, int size, uint32_t color) {
    if (stroke_count >= MAX_STROKES - 10) return;
    
    int dx = abs(x1 - x0);
    int dy = -abs(y1 - y0);
    int sx = x0 < x1 ? 1 : -1;
    int sy = y0 < y1 ? 1 : -1;
    int err = dx + dy;
    
    while (true) {
        strokes[stroke_count].x = x0;
        strokes[stroke_count].y = y0;
        strokes[stroke_count].size = size;
        strokes[stroke_count].color = color;
        stroke_count++;
        
        if (x0 == x1 && y0 == y1) break;
        
        int e2 = 2 * err;
        if (e2 >= dy) {
            if (x0 == x1) break;
            err += dy;
            x0 += sx;
        }
        if (e2 <= dx) {
            if (y0 == y1) break;
            err += dx;
            y0 += sy;
        }
        
        if (stroke_count >= MAX_STROKES - 2) break;
    }
}

void clear_canvas() {
    stroke_count = 0;
}

void draw_frame() {
    // Draw canvas background
    Container(color(0xFFEEEEEE), x(0), y(0), width(WIDTH), height(HEIGHT));
    Container(color(0xFFFFFFFF), x(50), y(80), width(WIDTH - 100), height(HEIGHT - 150));
    
    // Draw all strokes
    for (int i = 0; i < stroke_count; i++) {
        CircleWidget(
            radius(strokes[i].size),
            position(Point_create(strokes[i].x, strokes[i].y)),
            color(strokes[i].color)
        );
    }
    
    // Handle drawing
    if (current_input.mouse_x >= 50 && current_input.mouse_x <= WIDTH - 50 &&
        current_input.mouse_y >= 80 && current_input.mouse_y <= HEIGHT - 70) {
        
        if (current_input.mouse_down) {
            if (!drawing) {
                drawing = true;
                prev_mouse_x = current_input.mouse_x;
                prev_mouse_y = current_input.mouse_y;
            } else {
                draw_line(
                    prev_mouse_x, 
                    prev_mouse_y, 
                    current_input.mouse_x, 
                    current_input.mouse_y, 
                    brush_size, 
                    color_palette[current_color]
                );
                
                prev_mouse_x = current_input.mouse_x;
                prev_mouse_y = current_input.mouse_y;
            }
        } else {
            drawing = false;
        }
    }
}

int main() {
    FernCanvas canvas = {pixels, HEIGHT, WIDTH};
    runApp(canvas);    
    fern_set_draw_callback(draw_frame);    
    fern_start_render_loop();
    return 0;
}`,
    cpp: `#include <fern/fern.hpp>
#include <vector>
#include <memory>

using namespace Fern;

struct DrawPoint {
    int x;
    int y;
    int size;
    uint32_t color;
};

class WhiteboardApp {
private:
    std::vector<DrawPoint> strokes;
    int currentColor = 0;
    int brushSize = 5;
    int prevMouseX = -1;
    int prevMouseY = -1;
    bool drawing = false;
    
    const std::vector<uint32_t> colorPalette = {
        Colors::Black,
        Colors::White,
        Colors::Red,
        Colors::Green,
        Colors::Blue,
        Colors::Yellow,
        Colors::Cyan,
        Colors::Magenta,
        Colors::Orange,
        Colors::Purple,
        Colors::DarkGreen,
        Colors::Brown
    };
    
    std::shared_ptr<TextWidget> statusText;

public:
    void setup() {
        // Setup UI components
        addWidget(Container(Colors::LightGray, 0, 0, Fern::getWidth(), Fern::getHeight()));
        addWidget(Container(Colors::White, 50, 80, Fern::getWidth() - 100, Fern::getHeight() - 150));
        
        // Color palette
        for (size_t i = 0; i < colorPalette.size(); i++) {
            int x = 50 + i * 35;
            auto colorButton = Button({
                .x = x,
                .y = 30,
                .width = 30,
                .height = 30,
                .normalColor = colorPalette[i],
                .hoverColor = colorPalette[i],
                .pressColor = colorPalette[i]
            });
            
            int colorIndex = i; // Capture for lambda
            colorButton->onClick.connect([this, colorIndex]() {
                this->currentColor = colorIndex;
            });
            
            addWidget(colorButton);
        }
        
        // Clear button
        auto clearButton = Button({
            .x = 50,
            .y = Fern::getHeight() - 50,
            .width = 160,
            .height = 40,
            .normalColor = Colors::Red,
            .hoverColor = 0xFFFF7777,
            .pressColor = 0xFFFF3333,
            .label = "CLEAR",
            .textScale = 1,
            .textColor = Colors::White
        });
        
        clearButton->onClick.connect([this]() {
            this->strokes.clear();
        });
        
        addWidget(clearButton);
        
        // Size controls
        auto increaseButton = Button({
            .x = 230,
            .y = Fern::getHeight() - 50,
            .width = 80,
            .height = 40,
            .normalColor = Colors::Green,
            .label = "SIZE +",
            .textColor = Colors::White
        });
        
        increaseButton->onClick.connect([this]() {
            this->brushSize = std::min(20, this->brushSize + 2);
        });
        
        auto decreaseButton = Button({
            .x = 320,
            .y = Fern::getHeight() - 50,
            .width = 80,
            .height = 40,
            .normalColor = Colors::Green,
            .label = "SIZE -",
            .textColor = Colors::White
        });
        
        decreaseButton->onClick.connect([this]() {
            this->brushSize = std::max(1, this->brushSize - 2);
        });
        
        addWidget(increaseButton);
        addWidget(decreaseButton);
        
        // Status text
        statusText = Text(Point(50, Fern::getHeight() - 80), "WHITEBOARD APP", 1, Colors::DarkGray);
        addWidget(statusText);
    }
    
    void update() {
        const auto& input = Input::getState();
        
        // Update status text
        statusText->setText("BRUSH SIZE: " + std::to_string(brushSize) + 
                           " | STROKES: " + std::to_string(strokes.size()));
        
        // Handle drawing
        if (input.mouseX >= 50 && input.mouseX <= Fern::getWidth() - 50 &&
            input.mouseY >= 80 && input.mouseY <= Fern::getHeight() - 70) {
            
            if (input.leftMouseDown) {
                if (!drawing) {
                    drawing = true;
                    prevMouseX = input.mouseX;
                    prevMouseY = input.mouseY;
                } else {
                    drawLine(prevMouseX, prevMouseY, input.mouseX, input.mouseY);
                    prevMouseX = input.mouseX;
                    prevMouseY = input.mouseY;
                }
            } else {
                drawing = false;
            }
        }
        
        // Draw all strokes
        for (const auto& point : strokes) {
            Draw::circle(point.x, point.y, point.size, point.color);
        }
    }
    
    void drawLine(int x0, int y0, int x1, int y1) {
        int dx = abs(x1 - x0);
        int dy = -abs(y1 - y0);
        int sx = x0 < x1 ? 1 : -1;
        int sy = y0 < y1 ? 1 : -1;
        int err = dx + dy;
        
        while (true) {
            strokes.push_back({x0, y0, brushSize, colorPalette[currentColor]});
            
            if (x0 == x1 && y0 == y1) break;
            
            int e2 = 2 * err;
            if (e2 >= dy) {
                if (x0 == x1) break;
                err += dy;
                x0 += sx;
            }
            if (e2 <= dx) {
                if (y0 == y1) break;
                err += dx;
                y0 += sy;
            }
        }
    }
};

WhiteboardApp app;

void setupUI() {
    app.setup();
}

void draw() {
    Draw::fill(Colors::LightGray);
    app.update();
}

int main() {
    Fern::initialize();
    setupUI();
    Fern::setDrawCallback(draw);
    Fern::startRenderLoop();
    return 0;
}`
  },
  
  // Core types
  coreTypes: {
    c: `// Point structure
struct Point {
    int x;
    int y;
};

// Create a Point
Point Point_create(int x, int y);

// Canvas structure
struct FernCanvas {
    uint32_t* pixels;
    size_t height;
    size_t width;
};

// Gradient stop
typedef struct {
    uint32_t color;
    float position;  // 0.0 to 1.0
} GradientStop;

// Linear gradient
typedef struct {
    GradientStop* stops;
    int stop_count;
    int direction;  // GRADIENT_HORIZONTAL or GRADIENT_VERTICAL
} LinearGradient;

// Direction constants
#define GRADIENT_HORIZONTAL 0
#define GRADIENT_VERTICAL 1

// Input state
typedef struct {
    int mouse_x;      // Current mouse X position
    int mouse_y;      // Current mouse Y position
    int mouse_down;   // Whether mouse button is currently pressed
    int mouse_clicked; // Whether a click occurred in this frame
} InputState;

// Access the current input state
extern InputState current_input;`,
    cpp: `// Point structure
struct Point {
    int x;
    int y;
    
    Point(int x = 0, int y = 0) : x(x), y(y) {}
    
    Point operator+(const Point& other) const {
        return Point(x + other.x, y + other.y);
    }
    
    Point operator-(const Point& other) const {
        return Point(x - other.x, y - other.y);
    }
};

// Input state
struct InputState {
    int mouseX;        // Current mouse X position
    int mouseY;        // Current mouse Y position
    bool leftMouseDown;  // Whether left mouse button is currently pressed
    bool rightMouseDown; // Whether right mouse button is currently pressed
    bool mouseClicked;   // Whether a click occurred in this frame
};

// Access the current input state
const InputState& Input::getState();

// Gradient stop
struct GradientStop {
    uint32_t color;
    float position;  // 0.0 to 1.0
    
    GradientStop(uint32_t color, float position) 
        : color(color), position(position) {}
};

// Linear gradient
enum class GradientDirection {
    Horizontal,
    Vertical
};

struct LinearGradient {
    std::vector<GradientStop> stops;
    GradientDirection direction;
    
    LinearGradient(const std::vector<GradientStop>& stops, 
                  GradientDirection direction = GradientDirection::Horizontal)
        : stops(stops), direction(direction) {}
};`
  },
  
  // Colors
  colors: {
    c: `// Predefined colors
#define Colors_green  0xFF00FF00   // Green
#define Colors_blue   0xFF0000FF   // Blue
#define Colors_red    0xFFFF0000   // Red
#define Colors_gray   0xFF202020   // Dark Gray
#define Colors_black  0xFF000000   // Black
#define Colors_white  0xFFFFFFFF   // White

// Custom color examples
#define MY_PURPLE     0xFF800080   // Purple
#define MY_ORANGE     0xFFFFA500   // Orange
#define TRANSPARENT   0x00000000   // Fully transparent
#define SEMI_TRANS    0x80FFFFFF   // Semi-transparent white`,
    cpp: `// Predefined colors in the Colors namespace
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
    constexpr uint32_t SkyBlue    = 0xFF87CEEB;
    constexpr uint32_t LightBlue  = 0xFF4444FF;
    constexpr uint32_t DarkBlue   = 0xFF0000AA;
    constexpr uint32_t LightGreen = 0xFF44AA44;
    constexpr uint32_t DarkGreen  = 0xFF006400;
    constexpr uint32_t Charcoal   = 0xFF333333;
}

// Custom color examples
constexpr uint32_t MY_CUSTOM_COLOR = 0xFF123456;
constexpr uint32_t SEMI_TRANSPARENT = 0x80FFFFFF;`
  },
  
  // Drawing functions
  drawingFunctions: {
    c: `// Fill entire canvas with a color
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
void ftext(uint32_t* pixels, int width, int height, const char* text, int x, int y, int scale, uint32_t color);`,
    cpp: `// Basic shapes
namespace Draw {
    // Fill entire screen with a color
    void fill(uint32_t color);
    
    // Draw a filled rectangle
    void rect(int x, int y, int width, int height, uint32_t color);
    
    // Draw an outlined rectangle
    void rect(int x, int y, int width, int height, uint32_t color, bool filled);
    
    // Draw a filled circle
    void circle(int x, int y, int radius, uint32_t color);
    
    // Draw an outlined circle
    void circle(int x, int y, int radius, uint32_t color, bool filled);
    
    // Draw a line with thickness
    void line(int x1, int y1, int x2, int y2, int thickness, uint32_t color);
    
    // Draw a single pixel
    void pixel(int x, int y, uint32_t color);
    
    // Draw a filled triangle
    void triangle(int x1, int y1, int x2, int y2, int x3, int y3, uint32_t color);
    
    // Draw an outlined triangle
    void triangle(int x1, int y1, int x2, int y2, int x3, int y3, uint32_t color, bool filled);
    
    // Draw text
    void text(const char* text, int x, int y, float scale, uint32_t color);
    
    // Draw image from pixel buffer
    void image(int x, int y, int width, int height, const uint32_t* pixelData);
    
    // Draw linear gradient
    void gradient(int x, int y, int width, int height, uint32_t startColor, 
                 uint32_t endColor, bool isHorizontal = true);
}`
  }
};
