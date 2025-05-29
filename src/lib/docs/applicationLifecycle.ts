export const applicationLifecycleContent = {
  title: "Application Lifecycle",
  description: "Understanding the initialization and execution flow of Fern applications",
  sections: [
    {
      title: "Initialization",
      description: "All Fern applications begin with initialization, which sets up the canvas, event handling, and rendering loop.",
      cpp: {
        description: "In C++, use Fern::initialize() to set up the library. You can optionally provide a custom pixel buffer.",
        code: `// Basic initialization
Fern::initialize();

// Or initialize with custom pixel buffer
uint32_t* customPixels = new uint32_t[800 * 600];
Fern::initialize(customPixels, 800, 600);`
      },
      c: {
        description: "In C, create a FernCanvas structure with your pixel buffer and call runApp() to initialize.",
        code: `// Create canvas with pixel buffer
#define WIDTH 800
#define HEIGHT 600
static uint32_t pixels[HEIGHT * WIDTH];

FernCanvas canvas = {pixels, HEIGHT, WIDTH};
runApp(canvas);`
      }
    },
    {
      title: "Draw Loop",
      description: "Fern uses a continuous render loop to update the display. You can provide a custom draw function to be called on each frame, or rely on the automatic rendering of registered widgets.",
      cpp: {
        description: "Set your draw callback with Fern::setDrawCallback() and start the loop with Fern::startRenderLoop().",
        code: `void draw() {
    // Your drawing code here
    Draw::fill(Colors::Black);
    Draw::text("Hello World", 100, 100, 2, Colors::White);
}

int main() {
    Fern::initialize();
    Fern::setDrawCallback(draw);
    Fern::startRenderLoop();
    return 0;
}`
      },
      c: {
        description: "Register your draw function with fern_set_draw_callback() and start the loop with fern_start_render_loop().",
        code: `void draw_frame() {
    // Your drawing code here
    ffill(pixels, HEIGHT, WIDTH, Colors_black);
    ftext(pixels, WIDTH, HEIGHT, "Hello World", 100, 100, 2, Colors_white);
}

int main() {
    FernCanvas canvas = {pixels, HEIGHT, WIDTH};
    runApp(canvas);
    fern_set_draw_callback(draw_frame);
    fern_start_render_loop();
    return 0;
}`
      }
    },
    {
      title: "Widget Management",
      description: "Widgets are visual components that can be added to your application. Understanding how they're managed is crucial for building efficient Fern applications.",
      cpp: {
        description: `In C++, widgets can be added to the WidgetManager to be automatically rendered and updated. By default, widgets are NOT added to the manager unless explicitly requested with the addToManager parameter.`,
        code: `// Widgets are NOT automatically managed by default
auto text = Text(Point(100, 100), "Not Managed", 2, Colors::White, false);

// Explicitly add to widget manager for automatic rendering
auto managedText = Text(Point(100, 200), "Managed", 2, Colors::White, true);

// Or add manually later
auto button = Button({...}, false);  // Not managed initially
addWidget(button);  // Now it's managed

// Clear all widgets
WidgetManager::getInstance().clear();`
      },
      c: {
        description: "In C, widget functions create widgets that are automatically tracked and rendered by the application.",
        code: `// All widget function calls are automatically managed
TextWidget(start(Point_create(100, 100)), text("Hello"), scale(2), color(Colors_white));
CircleWidget(radius(50), position(Point_create(200, 200)), color(Colors_red));

// No manual management needed - widgets are automatically rendered`
      }
    },
    {
      title: "Input Handling",
      description: "Fern provides access to mouse input state for creating interactive applications.",
      cpp: {
        description: "Access input through the Input namespace:",
        code: `void draw() {
    const auto& input = Input::getState();
    
    if (input.mouseClicked) {
        // Handle mouse click at (input.mouseX, input.mouseY)
        std::cout << "Clicked at: " << input.mouseX << ", " << input.mouseY << std::endl;
    }
    
    if (input.leftMouseDown) {
        // Handle mouse drag
        Draw::circle(input.mouseX, input.mouseY, 10, Colors::Red);
    }
}`
      },
      c: {
        description: "Access input through the global current_input variable:",
        code: `void draw_frame() {
    if (current_input.mouse_clicked) {
        // Handle mouse click at (current_input.mouse_x, current_input.mouse_y)
        fernPrintf("Clicked at: %d, %d", current_input.mouse_x, current_input.mouse_y);
    }
    
    if (current_input.mouse_down) {
        // Handle mouse drag
        fcircle(pixels, HEIGHT, WIDTH, Colors_red, 
                current_input.mouse_x, current_input.mouse_y, 10);
    }
}`
      }
    },
    {
      title: "Application Structure",
      description: "A typical Fern application follows this structure:",
      cpp: {
        code: `#include <fern/fern.hpp>
using namespace Fern;

// Global state
static int gameState = 0;

// Setup function - create your widgets here
void setupUI() {
    // Create UI elements
    auto container = Container(Colors::Black, 0, 0, 800, 600, nullptr, true);
    auto title = Text(Point(300, 50), "My App", 3, Colors::White, true);
    
    auto button = Button({
        .x = 300, .y = 200, .width = 200, .height = 50,
        .normalColor = Colors::Blue, .label = "Start Game"
    }, true);
    
    button->onClick.connect([]() {
        gameState = 1;  // Start the game
    });
}

// Main draw loop
void draw() {
    // Game logic based on state
    if (gameState == 0) {
        // Menu state - widgets handle themselves
    } else if (gameState == 1) {
        // Game state - custom drawing
        Draw::fill(Colors::DarkBlue);
        Draw::text("Game Running!", 300, 300, 2, Colors::White);
    }
}

int main() {
    Fern::initialize();
    setupUI();
    Fern::setDrawCallback(draw);
    Fern::startRenderLoop();
    return 0;
}`
      },
      c: {
        code: `#include "fern.c"

#define WIDTH 800
#define HEIGHT 600
static uint32_t pixels[HEIGHT * WIDTH];

// Global state
static int game_state = 0;

// Button callbacks
void start_game() {
    game_state = 1;
}

void setup_ui() {
    // Create UI elements
    Container(color(Colors_black), x(0), y(0), width(WIDTH), height(HEIGHT));
    TextWidget(start(Point_create(300, 50)), text("My App"), scale(3), color(Colors_white));
    
    ButtonConfig start_button = {
        .x = 300, .y = 200, .width = 200, .height = 50,
        .normal_color = Colors_blue, .label = "Start Game",
        .on_click = start_game
    };
    ButtonWidget(start_button);
}

void draw_frame() {
    // Game logic based on state
    if (game_state == 1) {
        // Game state - custom drawing
        ffill(pixels, HEIGHT, WIDTH, Colors_blue);
        ftext(pixels, WIDTH, HEIGHT, "Game Running!", 300, 300, 2, Colors_white);
    }
    // Menu state - widgets handle themselves automatically
}

int main() {
    FernCanvas canvas = {pixels, HEIGHT, WIDTH};
    runApp(canvas);
    
    setup_ui();
    fern_set_draw_callback(draw_frame);
    fern_start_render_loop();
    return 0;
}`
      }
    }
  ]
};
