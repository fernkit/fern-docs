# Layout System Overview

Fern's layout system provides powerful and flexible tools for organizing widgets in your application. The system is based on composable layout widgets that can be nested to create complex UI structures.

## Core Concepts

### Layout Philosophy
Fern's layout system follows these principles:
- **Composable**: Layout widgets can be nested arbitrarily
- **Declarative**: Describe what you want, not how to achieve it
- **Flexible**: Adapts to different screen sizes and content
- **Predictable**: Consistent behavior across platforms

### Layout Widgets vs Content Widgets
- **Content Widgets**: Display actual content (Text, Button, etc.)
- **Layout Widgets**: Arrange other widgets (Column, Row, Center, etc.)

### Widget Hierarchy
```
Root
├── CenterWidget
│   └── Column
│       ├── Text ("Title")
│       ├── SizedBox (spacing)
│       └── Row
│           ├── Button ("OK")
│           ├── SizedBox (spacing)
│           └── Button ("Cancel")
```

## Layout Widgets

### Linear Layouts
- **Column**: Arranges widgets vertically
- **Row**: Arranges widgets horizontally

### Positioning Layouts
- **Center**: Centers child widget
- **Padding**: Adds space around child widget
- **Expanded**: Expands child to fill available space

### Utility Widgets
- **SizedBox**: Fixed-size spacing widget
- **Spacing**: Flexible spacing widget
- **Container**: Groups widgets with styling

## Basic Usage

### Column Layout
```cpp
std::vector<std::shared_ptr<Widget>> children = {
    Text(Point(0, 0), "Item 1", 2, Colors::White),
    Text(Point(0, 0), "Item 2", 2, Colors::White),
    Text(Point(0, 0), "Item 3", 2, Colors::White)
};

auto column = Column(children);
addWidget(column);
```

### Row Layout
```cpp
std::vector<std::shared_ptr<Widget>> children = {
    Button(ButtonConfig(0, 0, 100, 40, "OK")),
    SizedBox(20, 0),  // Horizontal spacing
    Button(ButtonConfig(0, 0, 100, 40, "Cancel"))
};

auto row = Row(children);
addWidget(row);
```

### Centered Layout
```cpp
auto widget = Text(Point(0, 0), "Centered!", 3, Colors::White);

int width = Fern::getWidth();
int height = Fern::getHeight();
auto centerWidget = std::make_shared<CenterWidget>(0, 0, width, height);
centerWidget->add(widget);

addWidget(centerWidget);
```

### Nested Layouts
```cpp
// Create button row
std::vector<std::shared_ptr<Widget>> buttonRow = {
    Button(ButtonConfig(0, 0, 100, 40, "Save")),
    SizedBox(15, 0),
    Button(ButtonConfig(0, 0, 100, 40, "Cancel"))
};

// Create main column
std::vector<std::shared_ptr<Widget>> mainColumn = {
    Text(Point(0, 0), "Document Editor", 3, Colors::White),
    SizedBox(0, 30),
    Text(Point(0, 0), "Choose an action:", 2, Colors::Gray),
    SizedBox(0, 20),
    Row(buttonRow, false, MainAxisAlignment::Center)  // Nested row inside column
};

// Center everything
int width = Fern::getWidth();
int height = Fern::getHeight();
auto centerWidget = std::make_shared<CenterWidget>(0, 0, width, height);
centerWidget->add(Column(mainColumn, false, MainAxisAlignment::Center, CrossAxisAlignment::Center));

addWidget(centerWidget);
```

## Advanced Patterns

### Responsive Design
```cpp
void setupResponsiveUI() {
    // Clear existing widgets
    WidgetManager::getInstance().clear();
    
    int screenWidth = Fern::getWidth();
    int buttonWidth = std::min(200, screenWidth - 40);
    
    if (screenWidth > 600) {
        // Wide screen: horizontal layout
        auto layout = Row({
            Button(ButtonConfig(0, 0, buttonWidth, 50, "Action 1")),
            SizedBox(20, 0),
            Button(ButtonConfig(0, 0, buttonWidth, 50, "Action 2"))
        });
        addWidget(Center(layout, true));
    } else {
        // Narrow screen: vertical layout
        auto layout = Column({
            Button(ButtonConfig(0, 0, buttonWidth, 50, "Action 1")),
            SizedBox(0, 15),
            Button(ButtonConfig(0, 0, buttonWidth, 50, "Action 2"))
        });
        addWidget(Center(layout, true));
    }
}

void draw() {
    Draw::fill(0xFF2A2A2A); // Dark gray background
}

int main() {
    Fern::initialize(680, 420);
    
    // Set up initial UI
    setupResponsiveUI();
    
    // Rebuild UI when window is resized
    Fern::setWindowResizeCallback([](int width, int height) {
        setupResponsiveUI();
    });
    
    Fern::setDrawCallback(draw);
    Fern::startRenderLoop();
    return 0;
}
```

### Grid Layout Simulation
```cpp
void createGridLayout() {
    // Create 2x2 grid using nested rows and columns
    
    // Row 1
    std::vector<std::shared_ptr<Widget>> row1 = {
        Button(ButtonConfig(0, 0, 100, 60, "1")),
        SizedBox(10, 0),
        Button(ButtonConfig(0, 0, 100, 60, "2"))
    };
    
    // Row 2
    std::vector<std::shared_ptr<Widget>> row2 = {
        Button(ButtonConfig(0, 0, 100, 60, "3")),
        SizedBox(10, 0),
        Button(ButtonConfig(0, 0, 100, 60, "4"))
    };
    
    // Combine rows
    std::vector<std::shared_ptr<Widget>> grid = {
        Row(row1),
        SizedBox(0, 10),
        Row(row2)
    };
    
    auto gridLayout = Column(grid);
    
    // Center the grid
    int width = Fern::getWidth();
    int height = Fern::getHeight();
    auto centerWidget = std::make_shared<CenterWidget>(0, 0, width, height);
    centerWidget->add(gridLayout);
    
    addWidget(centerWidget);
}
```

### Form Layout
```cpp
void createFormLayout() {
    // Create form fields
    auto nameField = TextInput(TextInputConfig(0, 0, 300, 40).placeholder("Enter your name"));
    auto emailField = TextInput(TextInputConfig(0, 0, 300, 40).placeholder("Enter your email"));
    
    // Create form
    std::vector<std::shared_ptr<Widget>> form = {
        Text(Point(0, 0), "Contact Form", 3, Colors::White),
        SizedBox(0, 30),
        
        Text(Point(0, 0), "Name:", 2, Colors::Gray),
        SizedBox(0, 10),
        nameField,
        SizedBox(0, 20),
        
        Text(Point(0, 0), "Email:", 2, Colors::Gray),
        SizedBox(0, 10),
        emailField,
        SizedBox(0, 30),
        
        // Submit button
        Button(ButtonConfig(0, 0, 200, 50, "Submit"))
    };
    
    int width = Fern::getWidth();
    int height = Fern::getHeight();
    auto centerWidget = std::make_shared<CenterWidget>(0, 0, width, height);
    centerWidget->add(Column(form));
    
    addWidget(centerWidget);
}
```

## Best Practices

### 1. Consistent Spacing
Use consistent spacing throughout your application:
```cpp
namespace Spacing {
    constexpr int SMALL = 10;
    constexpr int MEDIUM = 20;
    constexpr int LARGE = 40;
}

// Usage
SizedBox(0, Spacing::MEDIUM)  // Consistent vertical spacing
SizedBox(Spacing::SMALL, 0)   // Consistent horizontal spacing
```

### 2. Responsive Design
Always consider different screen sizes:
```cpp
void createResponsiveButton() {
    int screenWidth = Fern::getWidth();
    int buttonWidth = std::min(300, screenWidth - 40);  // Never wider than screen - margin
    
    auto button = Button(ButtonConfig(0, 0, buttonWidth, 50, "Responsive"));
    // ...
}
```

### 3. Semantic Structure
Use meaningful widget hierarchies:
```cpp
// Good: Clear structure
std::vector<std::shared_ptr<Widget>> form = {
    header,
    SizedBox(0, 30),
    inputFields,
    SizedBox(0, 20),
    actionButtons
};

// Avoid: Flat structure without meaning
std::vector<std::shared_ptr<Widget>> messyLayout = {
    widget1, widget2, widget3, widget4, widget5  // What do these represent?
};
```

### 4. Reusable Components
Create reusable layout components:
```cpp
class FormField {
public:
    static std::shared_ptr<Widget> create(const std::string& label, 
                                         std::shared_ptr<Widget> input) {
        std::vector<std::shared_ptr<Widget>> field = {
            Text(Point(0, 0), label, 2, Colors::Gray),
            SizedBox(0, 10),
            input
        };
        return Column(field);
    }
};

// Usage
auto nameField = FormField::create("Name:", nameInput);
auto emailField = FormField::create("Email:", emailInput);
```

### 5. Performance Considerations
- Cache layout widgets when possible
- Avoid deeply nested layouts
- Use appropriate spacing rather than empty widgets

## Common Patterns

### Card Layout
```cpp
std::shared_ptr<Widget> createCard(const std::string& title, const std::string& content) {
    std::vector<std::shared_ptr<Widget>> card = {
        Text(Point(0, 0), title, 3, Colors::White),
        SizedBox(0, 15),
        Text(Point(0, 0), content, 2, Colors::Gray)
    };
    return Column(card);
}
```

### List Layout
```cpp
std::shared_ptr<Widget> createList(const std::vector<std::string>& items) {
    std::vector<std::shared_ptr<Widget>> list;
    
    for (const auto& item : items) {
        list.push_back(Text(Point(0, 0), "• " + item, 2, Colors::White));
        list.push_back(SizedBox(0, 10));
    }
    
    return Column(list);
}
```

### Toolbar Layout
```cpp
std::shared_ptr<Widget> createToolbar(const std::vector<std::shared_ptr<Widget>>& tools) {
    std::vector<std::shared_ptr<Widget>> toolbar;
    
    for (size_t i = 0; i < tools.size(); ++i) {
        toolbar.push_back(tools[i]);
        if (i < tools.size() - 1) {
            toolbar.push_back(SizedBox(10, 0));
        }
    }
    
    return Row(toolbar);
}
```

## Troubleshooting

### Layout Not Centering
- Ensure CenterWidget has proper dimensions
- Check that child widgets have appropriate sizes
- Verify screen dimensions are correct

### Widgets Overlapping
- Add proper spacing between widgets
- Check widget dimensions
- Ensure layout widgets are properly nested

### Performance Issues
- Avoid excessive nesting
- Cache layout widgets
- Use appropriate spacing values

### Responsive Issues
- Test on different screen sizes
- Use relative sizing where possible
- Consider different layout strategies for different screen sizes
