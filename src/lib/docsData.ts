
export const docsData = {
  sections: [
    {
      title: "Getting Started",
      items: [
        {
          title: "Overview",
          href: "/docs",
          id: "overview"
        },
        {
          title: "Installation",
          href: "/docs/installation",
          id: "installation"
        },
        {
          title: "Quick Start",
          href: "/quick-start",
          id: "quick-start"
        }
      ]
    },
    {
      title: "API Reference",
      items: [
        {
          title: "Core Types",
          href: "/docs/core-types",
          id: "core-types"
        },
        {
          title: "Color Constants",
          href: "/docs/color-constants",
          id: "color-constants"
        },
        {
          title: "Widget Functions",
          href: "/docs/widget-functions",
          id: "widget-functions"
        },
        {
          title: "Drawing Functions",
          href: "/docs/drawing-functions",
          id: "drawing-functions"
        },
        {
          title: "Application Lifecycle",
          href: "/docs/application-lifecycle",
          id: "application-lifecycle"
        },
        {
          title: "PPM Export",
          href: "/docs/ppm-export",
          id: "ppm-export"
        }
      ]
    },
    {
      title: "Advanced",
      items: [
        {
          title: "Filled Shapes",
          href: "/docs/filled-shapes",
          id: "filled-shapes"
        },
        {
          title: "Scene Components",
          href: "/docs/scene-components",
          id: "scene-components"
        },
        {
          title: "CLI Tool",
          href: "/docs/cli-tool",
          id: "cli-tool"
        },
        {
          title: "Architecture",
          href: "/docs/architecture",
          id: "architecture"
        }
      ]
    }
  ],
  
  quickStartCode: `// main.c
#include "fern.c"

#define WIDTH 800
#define HEIGHT 600

static uint32_t pixels[HEIGHT*WIDTH];

int main() {
    FernCanvas canvas = {pixels, HEIGHT, WIDTH};
    runApp(canvas);
    
    Container(
        color(Colors_blue),
        x(0),
        y(0),
        width(WIDTH),
        height(HEIGHT)
    );
    
    CircleWidget(
        radius(50),
        position(Point_create(WIDTH/2, HEIGHT/2)),
        color(Colors_red)
    );
    
    fern_start_render_loop();
    return 0;
}`,
  
  interactiveCode: `// Interactive example
#include "fern.c"

#define WIDTH 800
#define HEIGHT 600

static uint32_t pixels[HEIGHT*WIDTH];
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
}`
};

export const installSteps = [
  {
    title: "Step 1: Install Dependencies",
    code: `# Install Emscripten SDK
git clone https://github.com/emscripten-core/emsdk.git
cd emsdk
./emsdk install latest
./emsdk activate latest
source ./emsdk_env.sh`
  },
  {
    title: "Step 2: Install Fern CLI",
    code: `# Clone the repository
git clone https://github.com/RishiAhuja/fern.git
cd fern

# Make the CLI script executable
chmod +x fern-cli.sh

# Create a symbolic link to make it available system-wide
sudo ln -s $(pwd)/fern-cli.sh /usr/local/bin/fern

# Optional: Install the man page
sudo install -m 644 fern.1 /usr/local/share/man/man1/
sudo mandb`
  }
];

export default docsData;
