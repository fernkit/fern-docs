import { overviewContent } from './docs/overview';
import { installationContent } from './docs/installation';
import { coreTypesContent } from './docs/coreTypes';
import { colorConstantsContent } from './docs/colorConstants';
import { widgetFunctionsContent } from './docs/widgetFunctions';
import { drawingFunctionsContent } from './docs/drawingFunctions';
import { applicationLifecycleContent } from './docs/applicationLifecycle';
import { cppCoreClassesContent } from './docs/cppCoreClasses';
import { cppLayoutSystemContent } from './docs/cppLayoutSystem';
import { cppSignalSlotContent } from './docs/cppSignalSlot';

export const docsData = {
  sections: [
    {
      title: "Getting Started",
      items: [
        {
          title: "Overview",
          href: "/docs",
          id: "overview",
          language: "both" as "both"
        },
        {
          title: "Installation",
          href: "/docs/installation",
          id: "installation",
          language: "both" as "both"
        },
        {
          title: "Quick Start",
          href: "/quick-start",
          id: "quick-start",
          language: "both" as "both"
        },
        {
          title: "Migration Guide",
          href: "/docs/migration-guide",
          id: "migration-guide",
          language: "both" as "both"
        }
      ]
    },
    {
      title: "C API Reference",
      items: [
        {
          title: "Core Types",
          href: "/docs/core-types",
          id: "core-types",
          language: "c" as "c"
        },
        {
          title: "Color Constants",
          href: "/docs/color-constants",
          id: "color-constants",
          language: "c" as "c"
        },
        {
          title: "Widget Functions",
          href: "/docs/widget-functions",
          id: "widget-functions",
          language: "c" as "c"
        },
        {
          title: "Drawing Functions",
          href: "/docs/drawing-functions",
          id: "drawing-functions",
          language: "c" as "c"
        },
        {
          title: "Application Lifecycle",
          href: "/docs/application-lifecycle",
          id: "application-lifecycle",
          language: "c" as "c"
        },
        {
          title: "PPM Export",
          href: "/docs/ppm-export",
          id: "ppm-export",
          language: "c" as "c"
        }
      ]
    },
    {
      title: "C++ API Reference",
      items: [
        {
          title: "Core Classes",
          href: "/docs/core-classes",
          id: "core-classes",
          language: "cpp" as "cpp"
        },
        {
          title: "Widget Classes",
          href: "/docs/widget-functions",
          id: "widget-functions",
          language: "cpp" as "cpp"
        },
        {
          title: "Layout System",
          href: "/docs/layout-system",
          id: "layout-system",
          language: "cpp" as "cpp"
        },
        {
          title: "Signal/Slot System",
          href: "/docs/signal-slot",
          id: "signal-slot",
          language: "cpp" as "cpp"
        },
        {
          title: "Application Lifecycle",
          href: "/docs/application-lifecycle",
          id: "application-lifecycle",
          language: "cpp" as "cpp"
        },
        {
          title: "PPM Export",
          href: "/docs/ppm-export",
          id: "ppm-export",
          language: "cpp" as "cpp"
        }
      ]
    },
    {
      title: "Advanced Features",
      items: [
        {
          title: "Filled Shapes",
          href: "/docs/filled-shapes",
          id: "filled-shapes",
          language: "both" as "both"
        },
        {
          title: "Scene Components",
          href: "/docs/scene-components",
          id: "scene-components",
          language: "both" as "both"
        },
        {
          title: "Responsive Design",
          href: "/docs/responsive-design",
          id: "responsive-design",
          language: "cpp" as "cpp"
        },
        {
          title: "Event Handling",
          href: "/docs/event-handling",
          id: "event-handling",
          language: "both" as "both"
        },
        {
          title: "CLI Tool",
          href: "/docs/cli-tool",
          id: "cli-tool",
          language: "both" as "both"
        },
        {
          title: "Architecture",
          href: "/docs/architecture",
          id: "architecture",
          language: "both" as "both"
        }
      ]
    },
    {
      title: "C++ Advanced Topics",
      items: [
        {
          title: "Widget Hierarchy",
          href: "/docs/widget-hierarchy",
          id: "widget-hierarchy",
          language: "cpp" as "cpp"
        },
        {
          title: "Custom Widgets",
          href: "/docs/custom-widgets",
          id: "custom-widgets",
          language: "cpp" as "cpp"
        },
        {
          title: "Animation System",
          href: "/docs/animation-system",
          id: "animation-system",
          language: "cpp" as "cpp"
        },
        {
          title: "State Management",
          href: "/docs/state-management",
          id: "state-management",
          language: "cpp" as "cpp"
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
}`,
  
  content: {
    overview: overviewContent,
    installation: installationContent,
    "core-types": coreTypesContent,
    "color-constants": colorConstantsContent,
    "widget-functions": widgetFunctionsContent,
    "drawing-functions": drawingFunctionsContent,
    "application-lifecycle": applicationLifecycleContent,
    
    // C++ Documentation modules
    "core-classes": cppCoreClassesContent,
    "layout-system": cppLayoutSystemContent,
    "signal-slot": cppSignalSlotContent
  }
};

// Export installation steps from the modular file
export const installSteps = installationContent.steps;

export default docsData;
