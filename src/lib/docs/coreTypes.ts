export const coreTypesContent = {
  title: "Core Types",
  description: "Fundamental data structures used in Fern Graphics Library",
  sections: [
    {
      id: "point",
      title: "Point",
      description: "Represents a 2D point with x and y coordinates.",
      cpp: {
        code: `struct Point {
    int x;
    int y;
    
    Point(int x = 0, int y = 0) : x(x), y(y) {}
    
    Point operator+(const Point& other) const {
        return Point(x + other.x, y + other.y);
    }
    
    Point operator-(const Point& other) const {
        return Point(x - other.x, y - other.y);
    }
};`
      },
      c: {
        code: `struct Point {
    int x;
    int y;
};

// Create a Point
Point Point_create(int x, int y);`
      }
    },
    {
      id: "ferncanvas",
      title: "FernCanvas",
      description: "Represents the drawing canvas.",
      showForLanguage: "c",
      c: {
        code: `struct FernCanvas {
    uint32_t* pixels;
    size_t height;
    size_t width;
};`
      }
    },
    {
      id: "gradientstop",
      title: "GradientStop",
      description: "Represents a color stop in a gradient.",
      cpp: {
        code: `struct GradientStop {
    uint32_t color;
    float position;  // 0.0 to 1.0
    
    GradientStop(uint32_t color, float position) 
        : color(color), position(position) {}
};`
      },
      c: {
        code: `typedef struct {
    uint32_t color;
    float position;  // 0.0 to 1.0
} GradientStop;`
      }
    },
    {
      id: "lineargradient",
      title: "LinearGradient",
      description: "Defines a linear gradient with multiple color stops.",
      cpp: {
        code: `enum class GradientDirection {
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
      c: {
        code: `typedef struct {
    GradientStop* stops;
    int stop_count;
    int direction;  // GRADIENT_HORIZONTAL or GRADIENT_VERTICAL
} LinearGradient;

// Direction constants
#define GRADIENT_HORIZONTAL 0
#define GRADIENT_VERTICAL 1`
      }
    },
    {
      id: "inputstate",
      title: "InputState",
      description: "Tracks the current state of user input.",
      cpp: {
        code: `struct InputState {
    int mouseX;        // Current mouse X position
    int mouseY;        // Current mouse Y position
    bool leftMouseDown;  // Whether left mouse button is currently pressed
    bool rightMouseDown; // Whether right mouse button is currently pressed
    bool mouseClicked;   // Whether a click occurred in this frame
};

// Access the current input state
const InputState& Input::getState();`
      },
      c: {
        code: `typedef struct {
    int mouse_x;      // Current mouse X position
    int mouse_y;      // Current mouse Y position
    int mouse_down;   // Whether mouse button is currently pressed
    int mouse_clicked; // Whether a click occurred in this frame
} InputState;

// Access the current input state
extern InputState current_input;`
      }
    }
  ]
};
