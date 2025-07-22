# Row Layout

The `RowWidget` arranges child widgets horizontally in a row, providing flexible control over spacing, alignment, and sizing. It's the horizontal counterpart to the Column layout.

### Creating a Row

```cpp
#include <fern/fern.hpp>
using namespace Fern;

// Basic row with default alignment
std::vector<std::shared_ptr<Widget>> children = {
    Text(Point(0, 0), "Item 1", 2, Colors::White),
    Text(Point(0, 0), "Item 2", 2, Colors::White),
    Text(Point(0, 0), "Item 3", 2, Colors::White)
};

auto row = Row(children);
```

### Using RowWidget Class

```cpp
// Create row with explicit dimensions
auto row = std::make_shared<RowWidget>(
    100, 100, 600, 50,  // x, y, width, height
    MainAxisAlignment::Center,
    CrossAxisAlignment::Center
);

// Add children one by one
row->add(Text(Point(0, 0), "First Item", 2, Colors::White));
row->add(Text(Point(0, 0), "Second Item", 2, Colors::White));

// Or add multiple at once
std::vector<std::shared_ptr<Widget>> moreChildren = {
    Text(Point(0, 0), "Third Item", 2, Colors::White),
    Text(Point(0, 0), "Fourth Item", 2, Colors::White)
};
row->addAll(moreChildren);
```

### Helper Function

```cpp
// Convenient Row() function
auto row = Row(
    {
        Button(ButtonConfig(0, 0, 100, 40).text("Previous")),
        Text(Point(0, 0), "Page 1 of 10", 2, Colors::White),
        Button(ButtonConfig(0, 0, 100, 40).text("Next"))
    },
    false,  // addToManager
    MainAxisAlignment::SpaceBetween,
    CrossAxisAlignment::Center
);
```

## Alignment

### Main Axis Alignment (Horizontal)

Controls how children are distributed along the row's width:

```cpp
// Start - children aligned to left
auto row = Row(children, false, MainAxisAlignment::Start);

// Center - children centered horizontally
auto row = Row(children, false, MainAxisAlignment::Center);

// End - children aligned to right
auto row = Row(children, false, MainAxisAlignment::End);

// SpaceBetween - equal space between children
auto row = Row(children, false, MainAxisAlignment::SpaceBetween);

// SpaceAround - equal space around children
auto row = Row(children, false, MainAxisAlignment::SpaceAround);

// SpaceEvenly - equal space everywhere
auto row = Row(children, false, MainAxisAlignment::SpaceEvenly);
```

### Cross Axis Alignment (Vertical)

Controls how children are aligned vertically within the row:

```cpp
// Start - children aligned to top
auto row = Row(children, false, 
    MainAxisAlignment::Start, CrossAxisAlignment::Start);

// Center - children centered vertically
auto row = Row(children, false,
    MainAxisAlignment::Start, CrossAxisAlignment::Center);

// End - children aligned to bottom
auto row = Row(children, false,
    MainAxisAlignment::Start, CrossAxisAlignment::End);

// Stretch - children stretched to full height
auto row = Row(children, false,
    MainAxisAlignment::Start, CrossAxisAlignment::Stretch);
```

### Dynamic Alignment Changes

```cpp
auto row = std::make_shared<RowWidget>(0, 0, 600, 100);

// Change alignment at runtime
row->setMainAxisAlignment(MainAxisAlignment::SpaceBetween);
row->setCrossAxisAlignment(CrossAxisAlignment::Center);
```

### Flex Factors

```cpp
// Different flex ratios
auto row = Row({
    Expanded(widget1, 1),  // Takes 1/6 of available space
    Expanded(widget2, 2),  // Takes 2/6 of available space
    Expanded(widget3, 3)   // Takes 3/6 of available space
});
```

## Spacing

### Using SizedBox for Spacing

```cpp
auto row = Row({
    Text(Point(0, 0), "First", 2, Colors::White),
    SizedBox(20, 0),  // 20px horizontal spacing
    Text(Point(0, 0), "Second", 2, Colors::White),
    SizedBox(30, 0),  // 30px horizontal spacing
    Text(Point(0, 0), "Third", 2, Colors::White)
});
```

### Even Spacing with Alignment

```cpp
// Automatic spacing with SpaceEvenly
auto row = Row(
    {
        Text(Point(0, 0), "Item 1", 2, Colors::White),
        Text(Point(0, 0), "Item 2", 2, Colors::White),
        Text(Point(0, 0), "Item 3", 2, Colors::White)
    },
    false,
    MainAxisAlignment::SpaceEvenly
);
```

## Advanced Features

### Nested Rows

```cpp
auto innerRow = Row({
    Text(Point(0, 0), "Inner 1", 2, Colors::White),
    Text(Point(0, 0), "Inner 2", 2, Colors::White)
});

auto outerRow = Row({
    Text(Point(0, 0), "Left", 2, Colors::Yellow),
    innerRow,
    Text(Point(0, 0), "Right", 2, Colors::Yellow)
});
```

### Mixed Layout Types

```cpp
auto row = Row({
    // Vertical column inside horizontal row
    Column({
        Text(Point(0, 0), "Line 1", 2, Colors::White),
        Text(Point(0, 0), "Line 2", 2, Colors::White)
    }),
    
    SizedBox(20, 0),
    
    Button(ButtonConfig(0, 0, 100, 40).text("Action")),
    
    SizedBox(20, 0),
    
    Column({
        Text(Point(0, 0), "Info 1", 2, Colors::Gray),
        Text(Point(0, 0), "Info 2", 2, Colors::Gray)
    })
});
```

### Dynamic Content

```cpp
auto row = std::make_shared<RowWidget>(0, 0, 800, 60);

// Add items dynamically
void addItem(const std::string& text) {
    auto item = Text(Point(0, 0), text, 2, Colors::White);
    row->add(item);
}

// Add multiple items
void addMultipleItems(const std::vector<std::string>& items) {
    std::vector<std::shared_ptr<Widget>> widgets;
    for (const auto& item : items) {
        widgets.push_back(Text(Point(0, 0), item, 2, Colors::White));
    }
    row->addAll(widgets);
}
```


## Best Practices

### 1. Choose Appropriate Alignment

```cpp
// For toolbars and navigation - start alignment
auto toolbar = Row(items, false, MainAxisAlignment::Start);

// For centering content - center alignment
auto centeredRow = Row(items, false, MainAxisAlignment::Center);

// For space distribution - space between
auto statusBar = Row(items, false, MainAxisAlignment::SpaceBetween);
```

### 2. Use Flexible Sizing Wisely

```cpp
// Good: Mix fixed and flexible elements
auto row = Row({
    Text(Point(0, 0), "Fixed Label", 2, Colors::White),    // Fixed width
    Expanded(inputWidget, 1),                              // Flexible width
    Button(ButtonConfig(0, 0, 80, 40).text("Submit"))     // Fixed width
});

// Avoid: All expanded widgets can make layout unpredictable
```

### 3. Consistent Spacing

```cpp
// Define consistent spacing constants
const int SMALL_SPACING = 5;
const int MEDIUM_SPACING = 10;
const int LARGE_SPACING = 20;

auto row = Row({
    Text(Point(0, 0), "Item 1", 2, Colors::White),
    SizedBox(MEDIUM_SPACING, 0),
    Text(Point(0, 0), "Item 2", 2, Colors::White),
    SizedBox(MEDIUM_SPACING, 0),
    Text(Point(0, 0), "Item 3", 2, Colors::White)
});
```

### 4. Handle Different Screen Sizes

```cpp
// Responsive row that adapts to screen width
int screenWidth = Fern::getWidth();
int buttonWidth = std::max(80, screenWidth / 6);  // Responsive button width

auto row = Row({
    Button(ButtonConfig(0, 0, buttonWidth, 40).text("Button 1")),
    SizedBox(10, 0),
    Button(ButtonConfig(0, 0, buttonWidth, 40).text("Button 2")),
    SizedBox(10, 0),
    Button(ButtonConfig(0, 0, buttonWidth, 40).text("Button 3"))
});
```

### 5. Performance Considerations

```cpp
// Pre-create widgets when possible
std::vector<std::shared_ptr<Widget>> preCreatedItems;
for (int i = 0; i < 10; ++i) {
    preCreatedItems.push_back(
        Button(ButtonConfig(0, 0, 80, 40).text("Item " + std::to_string(i)))
    );
}

// Use addAll for multiple items
row->addAll(preCreatedItems);  // More efficient than multiple add() calls
```

## Troubleshooting

### Common Issues

1. **Children Not Visible**
   ```cpp
   // Ensure row has sufficient width
   auto row = std::make_shared<RowWidget>(0, 0, 600, 50);  // Adequate width
   
   // Check if children have proper dimensions
   auto text = Text(Point(0, 0), "Visible Text", 2, Colors::White);
   ```

2. **Alignment Not Working**
   ```cpp
   // Ensure row has dimensions larger than children
   auto row = std::make_shared<RowWidget>(0, 0, 800, 100);  // Large enough
   
   // Check alignment settings
   row->setMainAxisAlignment(MainAxisAlignment::Center);
   row->setCrossAxisAlignment(CrossAxisAlignment::Center);
   ```

3. **Expanded Widgets Not Expanding**
   ```cpp
   // Ensure there's available space to expand into
   auto row = std::make_shared<RowWidget>(0, 0, 600, 50);  // Fixed width
   
   // Check that other widgets don't consume all space
   auto layout = Row({
       Text(Point(0, 0), "Small", 2, Colors::White),     // Small fixed size
       Expanded(contentWidget, 1)                         // Now has space to expand
   });
   ```

4. **Spacing Issues**
   ```cpp
   // Use SizedBox for consistent spacing
   SizedBox(20, 0);  // 20px horizontal spacing
   
   // Or use alignment for automatic spacing
   MainAxisAlignment::SpaceEvenly  // Automatic even spacing
   ```

### Performance Issues

1. **Too Many Children**
   ```cpp
   // Consider horizontal scrolling for wide content
   // Or use pagination for large datasets
   const int MAX_VISIBLE_ITEMS = 10;
   
   // Only show visible items
   std::vector<std::shared_ptr<Widget>> visibleItems;
   for (int i = startIndex; i < startIndex + MAX_VISIBLE_ITEMS; ++i) {
       visibleItems.push_back(createItem(i));
   }
   ```

2. **Frequent Layout Changes**
   ```cpp
   // Batch updates when possible
   std::vector<std::shared_ptr<Widget>> newItems;
   // ... populate newItems ...
   
   row->addAll(newItems);  // Single layout update
   ```

### Layout Debugging

```cpp
// Debug row dimensions
#ifdef DEBUG
    std::cout << "Row: " << row->getX() << ", " << row->getY() 
              << ", " << row->getWidth() << "x" << row->getHeight() << std::endl;
    
    // Debug child positions after layout
    for (const auto& child : row->getChildren()) {
        std::cout << "Child: " << child->getX() << ", " << child->getY() 
                  << ", " << child->getWidth() << "x" << child->getHeight() << std::endl;
    }
#endif
```
