# Expanded Layout

The `ExpandedWidget` makes a child widget expand to fill available space within a `Row` or `Column`. It provides flexible sizing with customizable flex factors to control how much space each expanded widget should take relative to others.

## Basic Usage

### Creating an Expanded Widget

```cpp
// Basic expanded widget with flex factor 1
auto expandedWidget = Expanded(
    Text(Point(0, 0), "I will expand!", 2, Colors::White),
    1  // flex factor (optional, defaults to 1)
);

// Using in a column
auto column = Column({
    Text(Point(0, 0), "Fixed Header", 3, Colors::Yellow),
    Expanded(
        Text(Point(0, 0), "Flexible Content", 2, Colors::White),
        1
    ),
    Text(Point(0, 0), "Fixed Footer", 2, Colors::Gray)
});
```

### Using ExpandedWidget Class

```cpp
// Create with constructor
auto expandedWidget = std::make_shared<ExpandedWidget>(
    Text(Point(0, 0), "Expanded Content", 2, Colors::White),
    2  // flex factor
);

// Get flex factor
int flex = expandedWidget->getFlex();  // Returns 2
```

## Flex Factors

### Understanding Flex Factors

Flex factors determine how much of the available space each expanded widget should take:

```cpp
// Available space is divided proportionally based on flex factors
auto row = Row({
    Expanded(widget1, 1),  // Takes 1/4 of available space
    Expanded(widget2, 2),  // Takes 2/4 of available space  
    Expanded(widget3, 1)   // Takes 1/4 of available space
});
// Total flex = 1 + 2 + 1 = 4
```

### Flex Factor Examples

```cpp
// Equal distribution (all flex = 1)
auto equalRow = Row({
    Expanded(Text(Point(0, 0), "Equal 1", 2, Colors::White), 1),
    Expanded(Text(Point(0, 0), "Equal 2", 2, Colors::White), 1),
    Expanded(Text(Point(0, 0), "Equal 3", 2, Colors::White), 1)
});
// Each widget takes 1/3 of available space

// Proportional distribution
auto proportionalRow = Row({
    Expanded(Text(Point(0, 0), "Small", 2, Colors::White), 1),    // 1/6
    Expanded(Text(Point(0, 0), "Medium", 2, Colors::White), 2),   // 2/6  
    Expanded(Text(Point(0, 0), "Large", 2, Colors::White), 3)     // 3/6
});

// One widget takes most space
auto dominantRow = Row({
    Text(Point(0, 0), "Fixed", 2, Colors::White),                 // Fixed size
    Expanded(Text(Point(0, 0), "Flexible", 2, Colors::White), 1)  // Takes remaining space
});
```

## Usage in Layouts

### In Row Layouts

```cpp
// Horizontal expansion
auto row = Row({
    Text(Point(0, 0), "Left", 2, Colors::White),              // Fixed width
    Expanded(
        Text(Point(0, 0), "Center (Expanded)", 2, Colors::Green),
        1
    ),
    Text(Point(0, 0), "Right", 2, Colors::White)              // Fixed width
});
```

### In Column Layouts

```cpp
// Vertical expansion
auto column = Column({
    Text(Point(0, 0), "Top", 2, Colors::White),               // Fixed height
    Expanded(
        Text(Point(0, 0), "Middle (Expanded)", 2, Colors::Green),
        1
    ),
    Text(Point(0, 0), "Bottom", 2, Colors::White)             // Fixed height
});
```

### Mixed Fixed and Flexible

```cpp
auto layout = Column({
    Text(Point(0, 0), "Header", 3, Colors::Yellow),           // Fixed: ~30px
    SizedBox(0, 20),                                          // Fixed: 20px
    
    Expanded(
        Text(Point(0, 0), "Main Content Area", 2, Colors::White),
        3  // Takes 3/4 of remaining space
    ),
    
    Expanded(
        Text(Point(0, 0), "Secondary Content", 2, Colors::Gray),
        1  // Takes 1/4 of remaining space  
    ),
    
    SizedBox(0, 10),                                          // Fixed: 10px
    Text(Point(0, 0), "Footer", 2, Colors::Gray)             // Fixed: ~20px
});
```

## Responsive Design

### Adaptive Content

```cpp
void createResponsiveLayout() {
    int screenWidth = Fern::getWidth();
    int screenHeight = Fern::getHeight();
    
    // Create responsive column that fills screen
    auto responsiveColumn = Column({
        Text(Point(0, 0), "App Header", 3, Colors::White),
        SizedBox(0, 20),
        
        // Main content area expands to fill available space
        Expanded(
            Column({
                Text(Point(0, 0), "Main Content", 2, Colors::White),
                SizedBox(0, 20),
                
                // Nested responsive row
                Row({
                    Expanded(
                        Text(Point(0, 0), "Left Panel", 2, Colors::Green),
                        1
                    ),
                    SizedBox(20, 0),
                    Expanded(
                        Text(Point(0, 0), "Right Panel", 2, Colors::Blue),
                        2  // Twice as wide as left panel
                    )
                })
            }),
            1
        ),
        
        SizedBox(0, 20),
        Text(Point(0, 0), "Footer", 2, Colors::Gray)
    });
    
    // Make the column fill the screen
    auto screenContainer = std::make_shared<ColumnWidget>(
        0, 0, screenWidth, screenHeight
    );
    screenContainer->add(responsiveColumn);
    addWidget(screenContainer);
}
```

### Device Adaptation

```cpp
void createDeviceAdaptiveLayout() {
    int screenWidth = Fern::getWidth();
    
    // Adjust flex factors based on screen size
    int leftFlex = 1;
    int rightFlex = 2;
    
    if (screenWidth < 600) {
        // On small screens, make left panel smaller
        leftFlex = 1;
        rightFlex = 3;
    } else if (screenWidth > 1200) {
        // On large screens, more balanced
        leftFlex = 2;
        rightFlex = 3;
    }
    
    auto adaptiveRow = Row({
        Expanded(
            Text(Point(0, 0), "Sidebar", 2, Colors::Green),
            leftFlex
        ),
        SizedBox(20, 0),
        Expanded(
            Text(Point(0, 0), "Main Content", 2, Colors::White),
            rightFlex
        )
    });
}
```

## Troubleshooting

### Common Issues

1. **Expanded Widget Not Expanding**
   ```cpp
   // Ensure parent layout supports expansion (Row/Column)
   auto column = Column({
       Expanded(widget, 1)  // This will work
   });
   
   // Expanded doesn't work outside Row/Column
   auto center = std::make_shared<CenterWidget>(0, 0, 400, 300);
   center->add(Expanded(widget, 1));  // Won't expand as expected
   ```

2. **Incorrect Proportions**
   ```cpp
   // Check flex factor calculations
   auto row = Row({
       Expanded(widget1, 2),  // 2/5 = 40%
       Expanded(widget2, 3)   // 3/5 = 60%
   });
   // Total flex = 2 + 3 = 5
   ```

3. **Content Overflow**
   ```cpp
   // Ensure expanded content can handle variable sizes
   auto expandedContent = Column({
       Text(Point(0, 0), "Flexible text content", 2, Colors::White),
       // Text should wrap or truncate appropriately
   });
   ```

4. **No Available Space to Expand**
   ```cpp
   // Ensure parent has dimensions
   auto parent = std::make_shared<ColumnWidget>(0, 0, 400, 300);  // Explicit size
   parent->add(Column({
       Expanded(widget, 1)  // Now has space to expand into
   }));
   ```

### Performance Issues

1. **Complex Nested Expansions**
   ```cpp
   // Avoid overly deep nesting
   // Consider flattening complex layouts
   ```

2. **Frequent Flex Changes**
   ```cpp
   // Cache expanded widgets when possible
   static std::shared_ptr<ExpandedWidget> cachedExpanded = nullptr;
   
   if (!cachedExpanded) {
       cachedExpanded = Expanded(content, 1);
   }
   ```

### Debugging

```cpp
// Debug expanded widget properties
#ifdef DEBUG
    auto expanded = Expanded(widget, 2);
    std::cout << "Expanded flex: " << expanded->getFlex() << std::endl;
    std::cout << "Expanded size: " << expanded->getWidth() << "x" << expanded->getHeight() << std::endl;
#endif
```
