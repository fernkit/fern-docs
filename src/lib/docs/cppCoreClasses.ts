export const cppCoreClassesContent = {
  title: "Core Classes (C++)",
  description: "Understanding the fundamental classes and object-oriented design patterns in Fern C++",
  intro: {
    title: "Object-Oriented Architecture",
    content: `Fern C++ is built around a clean object-oriented architecture that makes it easy to create, 
    manage, and extend visual components. Unlike the procedural C API, the C++ implementation uses classes, 
    inheritance, and modern C++ features to provide a more structured and maintainable codebase.`
  },
  sections: [
    {
      id: "point-class",
      title: "Point Class",
      description: "The Point class represents 2D coordinates with x and y values. It supports simple vector addition for positioning calculations, making it easy to work with coordinate offsets and relative positioning in your graphics applications.",
      explanation: `Points are the foundation of positioning in Fern. You can create points with specific coordinates and use vector addition to calculate new positions. This makes it straightforward to handle movement, offsets, and relative positioning.`,
      
      whyItWorks: `The Point class provides a clean way to represent coordinates and supports vector addition through simple syntax. This makes coordinate calculations more intuitive and reduces manual arithmetic errors.`,
      
      code: {
        basic: `// Basic Point usage
Point p1(100, 100);               // Create a point
Point p2 = p1 + Point(50, 20);    // Vector addition

// Use points with drawing functions
Draw::line(p1.x, p1.y, p2.x, p2.y, 2, Colors::White);
Draw::circle(p2.x, p2.y, 25, Colors::Red);`,

        advanced: `// Working with multiple points
Point center(400, 300);
Point[] offsets = {
    Point(-50, -50), Point(50, -50),
    Point(-50, 50),  Point(50, 50)
};

// Draw corners around center
for (auto offset : offsets) {
    Point corner = center + offset;
    Draw::rect(corner.x - 5, corner.y - 5, 10, 10, Colors::Blue);
}

// Connect center to all corners
for (auto offset : offsets) {
    Point corner = center + offset;
    Draw::line(center.x, center.y, corner.x, corner.y, 1, Colors::Gray);
}`
      },
      
      methods: [
        {
          name: "Point(x, y)",
          description: "Constructor that creates a Point with specified coordinates",
          example: "Point p(100, 200);"
        },
        {
          name: "operator+",
          description: "Adds two points together (vector addition)",
          example: "Point result = pointA + pointB;"
        },
        {
          name: "operator-",
          description: "Subtracts one point from another (vector subtraction)",
          example: "Point offset = endPoint - startPoint;"
        }
      ]
    },
    
    {
      id: "widget-base-class",
      title: "Widget Base Class",
      description: "The foundation class that all UI components inherit from.",
      explanation: `The Widget class provides a common interface for all visual components in Fern. 
      It defines the basic lifecycle methods (render, handleInput) and properties (position, size) 
      that every widget needs. This inheritance hierarchy allows for polymorphism and consistent behavior.`,
      
      whyItWorks: `By using inheritance, we can treat all widgets uniformly - a Button, Text, or Circle 
      can all be stored in the same container and called through the same interface. This is the foundation 
      that makes the layout system and widget management possible.`,
      
      code: {
        interface: `// Widget base class interface (simplified)
class Widget {
public:
    // Virtual destructor for proper cleanup
    virtual ~Widget() = default;
    
    // Core rendering method - must be implemented by derived classes
    virtual void render() = 0;
    
    // Input handling - can be overridden for interactive widgets
    virtual bool handleInput(const InputState& input) { return false; }
    
    // Position and size management
    virtual void setPosition(const Point& pos) { position_ = pos; }
    virtual Point getPosition() const { return position_; }
    virtual void setSize(int width, int height) { width_ = width; height_ = height; }
    
protected:
    Point position_{0, 0};
    int width_{0}, height_{0};
    bool visible_{true};
};`,

        customWidget: `// Creating a custom widget by inheriting from Widget
class ProgressBar : public Widget {
private:
    float progress_{0.0f};  // 0.0 to 1.0
    uint32_t backgroundColor_{Colors::DarkGray};
    uint32_t progressColor_{Colors::Blue};
    
public:
    ProgressBar(const Point& pos, int width, int height) {
        setPosition(pos);
        setSize(width, height);
    }
    
    // Implement the required render method
    void render() override {
        // Draw background bar
        Draw::rect(position_.x, position_.y, width_, height_, backgroundColor_);
        
        // Draw progress fill
        int fillWidth = (int)(width_ * progress_);
        if (fillWidth > 0) {
            Draw::rect(position_.x, position_.y, fillWidth, height_, progressColor_);
        }
        
        // Draw border
        Draw::rect(position_.x, position_.y, width_, height_, Colors::White, false);
    }
    
    // Custom methods specific to progress bar
    void setProgress(float value) {
        progress_ = std::clamp(value, 0.0f, 1.0f);
    }
    
    float getProgress() const { return progress_; }
};

// Usage:
auto progressBar = std::make_shared<ProgressBar>(Point(100, 100), 300, 20);
progressBar->setProgress(0.75f);  // 75% complete
addWidget(progressBar);`
      },
      
      keyMethods: [
        {
          name: "render()",
          description: "Pure virtual method that draws the widget. Must be implemented by all derived classes.",
          purpose: "Separates the 'what to draw' logic from the 'when to draw' timing, allowing the framework to control rendering efficiently."
        },
        {
          name: "handleInput()",
          description: "Virtual method for processing user input. Returns true if input was consumed.",
          purpose: "Enables widgets to respond to mouse clicks, movements, and other interactions in a standardized way."
        },
        {
          name: "setPosition() / getPosition()",
          description: "Methods for managing widget position on screen.",
          purpose: "Provides a consistent way to position widgets, essential for layout systems and animations."
        }
      ]
    },
    
    {
      id: "container-class",
      title: "Container Class",
      description: "A widget that can hold and manage child widgets.",
      explanation: `The Container class is a fundamental building block for creating complex UIs. It can hold 
      a single child widget and provides background rendering. Containers are often used as building blocks 
      in layout systems, providing visual separation and grouping.`,
      
      whyItWorks: `Containers implement the composite pattern - they can contain other widgets (including other 
      containers), allowing for hierarchical UI structures. The automatic sizing and positioning features make 
      it easy to create responsive layouts without manual calculations.`,
      
      code: {
        basic: `// Basic container usage
auto container = Container(
    Colors::DarkBlue,           // Background color
    100, 100,                   // Position (x, y)
    300, 200,                   // Size (width, height)
    nullptr,                    // Child widget (none initially)
    true                        // Add to widget manager
);

// Add a child widget later
auto text = Text(Point(0, 0), "HELLO WORLD", 2, Colors::White);
container->setChild(text);`,

        nested: `// Creating nested containers for layout
auto outerContainer = Container(Colors::Black, 0, 0, 800, 600, nullptr, true);

auto leftPanel = Container(Colors::DarkBlue, 0, 0, 400, 600);
auto rightPanel = Container(Colors::DarkGreen, 400, 0, 400, 600);

// Add content to panels
auto leftText = Text(Point(50, 50), "LEFT PANEL", 2, Colors::White);
auto rightText = Text(Point(50, 50), "RIGHT PANEL", 2, Colors::White);

leftPanel->setChild(leftText);
rightPanel->setChild(rightText);

// Note: For complex layouts like this, consider using Row/Column layouts instead`,

        gradient: `// Container with gradient background
auto gradientContainer = Container(
    Colors::Blue,               // Base color
    100, 100, 300, 200,
    nullptr, true
);

// You can create gradient effects by layering containers
auto topGradient = Container(Colors::LightBlue, 0, 0, 300, 100);
auto bottomGradient = Container(Colors::DarkBlue, 0, 100, 300, 100);`
      },
      
      features: [
        {
          feature: "Background Rendering",
          description: "Automatically draws a colored background for the container area",
          benefit: "Provides visual separation and grouping without manual drawing code"
        },
        {
          feature: "Child Management",
          description: "Can hold and automatically size one child widget",
          benefit: "Simplifies widget composition and hierarchy building"
        },
        {
          feature: "Automatic Sizing",
          description: "Child widgets are automatically sized to match container dimensions",
          benefit: "Reduces manual size calculations and makes responsive design easier"
        }
      ]
    }
  ]
};
