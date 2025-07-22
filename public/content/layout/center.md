# Center Layout

The `CenterWidget` centers a single child widget within its bounds, providing both horizontal and vertical centering. It's one of the most commonly used layout widgets for creating balanced, centered layouts.

## Basic Usage

### Creating a Center Widget

```cpp
#include <fern/fern.hpp>
using namespace Fern;

// Center a widget within specific bounds
auto centerWidget = std::make_shared<CenterWidget>(0, 0, 400, 300);
centerWidget->add(Text(Point(0, 0), "Centered Text", 3, Colors::White));

// Using helper function
auto centeredText = Center(Text(Point(0, 0), "Hello, World!", 2, Colors::White));
```

### Screen Centering

```cpp
void setupUI() {
    int screenWidth = Fern::getWidth();
    int screenHeight = Fern::getHeight();
    
    // Center content on the entire screen
    auto screenCenter = std::make_shared<CenterWidget>(
        0, 0, screenWidth, screenHeight
    );
    
    auto content = Text(Point(0, 0), "Screen Centered", 3, Colors::White);
    screenCenter->add(content);
    
    addWidget(screenCenter);
}
```

## Configuration

### Basic Properties

```cpp
// Create center widget with explicit dimensions
auto centerWidget = std::make_shared<CenterWidget>(
    100, 100,  // x, y position
    400, 300   // width, height
);

// Add child widget
auto button = Button(ButtonConfig(0, 0, 200, 50).text("Centered Button"));
centerWidget->add(button);

// The button will be automatically centered within the 400x300 area
```

### Single Child Limitation

```cpp
// CenterWidget only supports one child
auto centerWidget = std::make_shared<CenterWidget>(0, 0, 400, 300);

// This replaces any previous child
centerWidget->add(Text(Point(0, 0), "First Text", 2, Colors::White));
centerWidget->add(Text(Point(0, 0), "Second Text", 2, Colors::White)); // Replaces first

// To center multiple widgets, use a container
auto column = Column({
    Text(Point(0, 0), "First Line", 2, Colors::White),
    Text(Point(0, 0), "Second Line", 2, Colors::White)
});

centerWidget->add(column);  // Centers the entire column
```

## Centering Behavior

### Horizontal and Vertical Centering

```cpp
// The center widget calculates position as:
// childX = parentX + (parentWidth - childWidth) / 2
// childY = parentY + (parentHeight - childHeight) / 2

auto centerWidget = std::make_shared<CenterWidget>(0, 0, 400, 300);
auto button = Button(ButtonConfig(0, 0, 100, 40).text("Button"));

centerWidget->add(button);
// Button will be positioned at (150, 130) to center it in 400x300 area
```

### Automatic Sizing

```cpp
// If child has no explicit size, CenterWidget can provide dimensions
auto centerWidget = std::make_shared<CenterWidget>(0, 0, 400, 300);

// Child without explicit size will use parent's dimensions
auto textWidget = Text(Point(0, 0), "Auto-sized", 2, Colors::White);
centerWidget->add(textWidget);
```

### Centering Different Widget Types

```cpp
// Center a button
auto buttonCenter = std::make_shared<CenterWidget>(0, 0, 400, 200);
buttonCenter->add(Button(ButtonConfig(0, 0, 150, 50).text("Centered Button")));

// Center a text widget
auto textCenter = std::make_shared<CenterWidget>(0, 0, 400, 100);
textCenter->add(Text(Point(0, 0), "Centered Text", 3, Colors::White));

// Center a complex layout
auto layoutCenter = std::make_shared<CenterWidget>(0, 0, 600, 400);
auto complexLayout = Column({
    Text(Point(0, 0), "Title", 3, Colors::Yellow),
    SizedBox(0, 20),
    Button(ButtonConfig(0, 0, 200, 40).text("Action"))
});
layoutCenter->add(complexLayout);
```

## Responsive Design

### Full Screen Centering

```cpp
void createResponsiveCenter() {
    int screenWidth = Fern::getWidth();
    int screenHeight = Fern::getHeight();
    
    // Always center on full screen
    auto fullScreenCenter = std::make_shared<CenterWidget>(
        0, 0, screenWidth, screenHeight
    );
    
    // Content that adapts to screen size
    int contentWidth = std::min(400, screenWidth - 40);
    int contentHeight = std::min(300, screenHeight - 40);
    
    auto content = Column({
        Text(Point(0, 0), "Responsive", 3, Colors::White),
        SizedBox(0, 20),
        Button(ButtonConfig(0, 0, contentWidth - 40, 50, "Button"))
    });
    
    fullScreenCenter->add(content);
    addWidget(fullScreenCenter);
}
```

## Best Practices

### 1. Use for Single Items

```cpp
// Good: Center a single complex widget
auto centerWidget = std::make_shared<CenterWidget>(0, 0, 400, 300);
auto complexContent = Column({
    Text(Point(0, 0), "Title", 3, Colors::White),
    Button(ButtonConfig(0, 0, 200, 40).text("Action"))
});
centerWidget->add(complexContent);

// Avoid: Trying to center multiple separate widgets
// Use a container widget instead
```

### 2. Responsive Centering

```cpp
// Adapt to screen size
int screenWidth = Fern::getWidth();
int screenHeight = Fern::getHeight();

auto responsiveCenter = std::make_shared<CenterWidget>(
    0, 0, screenWidth, screenHeight
);

// Content that scales with screen
int contentWidth = std::min(500, screenWidth - 40);
auto content = Button(ButtonConfig(0, 0, contentWidth, 50, "Responsive"));
responsiveCenter->add(content);
```

### 3. Proper Sizing

```cpp
// Ensure center widget has proper dimensions
auto centerWidget = std::make_shared<CenterWidget>(
    0, 0, 
    400, 300  // Explicit dimensions for proper centering
);

// Child should have appropriate size
auto child = Button(ButtonConfig(0, 0, 200, 50, "Sized"));
centerWidget->add(child);
```

### 4. Nested Centering

```cpp
// Center within center for complex layouts
auto outerCenter = std::make_shared<CenterWidget>(0, 0, screenWidth, screenHeight);
auto innerCenter = std::make_shared<CenterWidget>(0, 0, 400, 300);

auto content = Text(Point(0, 0), "Nested Center", 2, Colors::White);
innerCenter->add(content);
outerCenter->add(innerCenter);
```

### 5. Performance Considerations

```cpp
// Reuse center widgets when possible
static std::shared_ptr<CenterWidget> dialogCenter = nullptr;

auto getDialogCenter = []() {
    if (!dialogCenter) {
        dialogCenter = std::make_shared<CenterWidget>(
            0, 0, Fern::getWidth(), Fern::getHeight()
        );
    }
    return dialogCenter;
};
```

## Troubleshooting

### Common Issues

1. **Child Not Appearing Centered**
   ```cpp
   // Ensure center widget has proper dimensions
   auto centerWidget = std::make_shared<CenterWidget>(0, 0, 400, 300);  // Explicit size
   
   // Ensure child has valid dimensions
   auto child = Button(ButtonConfig(0, 0, 200, 50, "Button"));  // Valid size
   centerWidget->add(child);
   ```

2. **Center Widget Not Visible**
   ```cpp
   // Check if center widget is added to manager
   auto centerWidget = std::make_shared<CenterWidget>(0, 0, 400, 300);
   centerWidget->add(child);
   addWidget(centerWidget);  // Don't forget this!
   ```

3. **Centering Not Working on Screen Resize**
   ```cpp
   // Recreate center widget with new dimensions
   void onScreenResize() {
       int newWidth = Fern::getWidth();
       int newHeight = Fern::getHeight();
       
       auto newCenter = std::make_shared<CenterWidget>(0, 0, newWidth, newHeight);
       newCenter->add(content);
       // Replace old center widget
   }
   ```

4. **Child Extends Beyond Center Bounds**
   ```cpp
   // Ensure child size is smaller than center widget
   auto centerWidget = std::make_shared<CenterWidget>(0, 0, 400, 300);
   auto child = Button(ButtonConfig(0, 0, 350, 250, "Fits"));  // Smaller than 400x300
   centerWidget->add(child);
   ```

### Performance Issues

1. **Frequent Recentering**
   ```cpp
   // Avoid creating new center widgets frequently
   // Cache and reuse when possible
   static std::shared_ptr<CenterWidget> cachedCenter = nullptr;
   
   if (!cachedCenter) {
       cachedCenter = std::make_shared<CenterWidget>(0, 0, screenWidth, screenHeight);
   }
   ```

2. **Complex Child Layouts**
   ```cpp
   // Pre-calculate child dimensions for better performance
   auto child = Column({...});  // Complex layout
   // Let child calculate its size first
   centerWidget->add(child);
   ```

### Debugging

```cpp
// Debug center widget dimensions and child positioning
#ifdef DEBUG
    auto centerWidget = std::make_shared<CenterWidget>(0, 0, 400, 300);
    auto child = Button(ButtonConfig(0, 0, 200, 50).text("Debug"));
    centerWidget->add(child);
    
    std::cout << "Center: " << centerWidget->getX() << ", " << centerWidget->getY() 
              << ", " << centerWidget->getWidth() << "x" << centerWidget->getHeight() << std::endl;
    std::cout << "Child: " << child->getX() << ", " << child->getY() 
              << ", " << child->getWidth() << "x" << child->getHeight() << std::endl;
#endif
```