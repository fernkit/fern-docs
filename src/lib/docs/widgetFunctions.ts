export const widgetFunctionsContent = {
  title: "Widget System",
  description: "High-level components for building user interfaces",
  intro: {
    title: "Widget Philosophy",
    description: "Widgets are reusable UI components that handle their own rendering and input processing. They provide a higher-level abstraction than direct drawing, making it easier to create interactive interfaces.",
    cpp: {
      description: "In C++, widgets are class instances that inherit from the Widget base class. They can be composed into complex hierarchies and use the signal/slot system for event handling."
    },
    c: {
      description: "In C, widgets are created through function calls with named parameters, offering a declarative style for building interfaces."
    }
  },
  commonWidgets: {
    title: "Common Widgets",
    description: `Fern provides several built-in widgets for common UI needs:

• **Container**: A basic rectangular container that can hold other widgets
• **Text**: Displays text with customizable position, scale, and color  
• **Button**: An interactive button that responds to mouse input
• **Circle**: A circular graphic element`
  },
  interactiveElements: {
    title: "Interactive Elements",
    description: "Widgets can respond to user input, allowing for interactive applications:",
    cpp: {
      description: "Buttons and other interactive widgets emit signals when activated, which you can connect to slot functions:",
      code: `auto button = Button({...});
button->onClick.connect([]() {
    // Handle click
});`
    },
    c: {
      description: "In C, interactive widgets accept callback functions:",
      code: `ButtonConfig button = {
    // ...
    .on_click = handleButtonClick
};
ButtonWidget(button);`
    }
  },
  widgets: {
    cpp: [
      {
        title: "Container Widget",
        description: "Creates a rectangular container that can hold a child widget.",
        code: `// Create a container with color, position, size, child widget, and widget management flag
auto container = Container(
    Colors::DarkBlue,        // Container color
    100, 100,                // Position (x, y)
    300, 200,                // Size (width, height)
    nullptr,                 // Child widget (optional)
    false                    // Add to widget manager (defaults to false)
);

// Add a child later
container->setChild(Text(Point(0, 0), "HELLO WORLD", 2, Colors::White));

// Or create a container with a child directly
auto containerWithChild = Container(
    Colors::Black,
    0, 0, 800, 600,
    Text(Point(350, 300), "CENTERED TEXT", 2, Colors::White, false)
);`,
        methods: [
          { name: "setChild(Widget* child)", description: "Sets the child widget of the container" },
          { name: "getChild()", description: "Returns the current child widget" },
          { name: "setColor(uint32_t color)", description: "Changes the container background color" },
          { name: "getColor()", description: "Returns the current background color" },
          { name: "setPosition(int x, int y)", description: "Updates the container position" },
          { name: "setSize(int width, int height)", description: "Updates the container size" }
        ]
      },
      {
        title: "Text Widget",
        description: "Renders text with customizable position, scale, and color.",
        code: `// Create text at position (100,100) with font scale 2
auto myText = Text(Point(100, 100), "HELLO WORLD", 2, Colors::White);

// Update text content later
myText->setText("UPDATED TEXT");

// Change text color
myText->setColor(Colors::Yellow);

// Change text position
myText->setPosition(Point(200, 200));`,
        methods: [
          { name: "setText(const std::string& text)", description: "Updates the text content" },
          { name: "getText()", description: "Returns the current text content" },
          { name: "setColor(uint32_t color)", description: "Changes the text color" },
          { name: "getColor()", description: "Returns the current text color" },
          { name: "setPosition(const Point& position)", description: "Updates the text position" },
          { name: "getPosition()", description: "Returns the current text position" },
          { name: "setScale(int scale)", description: "Changes the text scale/size" },
          { name: "getScale()", description: "Returns the current text scale" }
        ]
      },
      {
        title: "Button Widget",
        description: "Creates an interactive button with click handling.",
        code: `// Define button configuration
ButtonConfig btnConfig = {
    .x = 100,
    .y = 200,
    .width = 200,
    .height = 50,
    .normalColor = Colors::Blue,
    .hoverColor = Colors::LightBlue,
    .pressColor = Colors::DarkBlue,
    .label = "CLICK ME",
    .textScale = 2,
    .textColor = Colors::White
};

// Create button from config
auto myButton = Button(btnConfig);

// Connect click handler using signal/slot system
myButton->onClick.connect([]() {
    std::cout << "Button clicked!" << std::endl;
});

// Alternative: create button with inline lambda
auto button = Button({
    .x = 300, .y = 300, .width = 150, .height = 40,
    .normalColor = Colors::Green,
    .label = "SAVE"
});

button->onClick.connect([]() {
    // Save action
    saveData();
});`,
        methods: [
          { name: "setLabel(const std::string& label)", description: "Updates the button text" },
          { name: "getLabel()", description: "Returns the current button text" },
          { name: "setNormalColor(uint32_t color)", description: "Sets the default button color" },
          { name: "setHoverColor(uint32_t color)", description: "Sets the color when mouse hovers over button" },
          { name: "setPressColor(uint32_t color)", description: "Sets the color when button is pressed" },
          { name: "setTextColor(uint32_t color)", description: "Changes the button text color" },
          { name: "setTextScale(int scale)", description: "Changes the button text size" },
          { name: "setPosition(int x, int y)", description: "Updates the button position" },
          { name: "setSize(int width, int height)", description: "Updates the button size" },
          { name: "isPressed()", description: "Returns true if button is currently pressed" },
          { name: "isHovered()", description: "Returns true if mouse is hovering over button" }
        ],
        signals: [
          { name: "onClick", description: "Signal emitted when button is clicked" }
        ]
      },
      {
        title: "Circle Widget",
        description: "Creates a circle with customizable radius, position, and color.",
        code: `// Create circle with radius 30 at (200,200)
auto myCircle = Circle(30, Point(200, 200), Colors::Red);

// Modify properties
myCircle->setRadius(40);
myCircle->setColor(Colors::Green);
myCircle->setPosition(Point(300, 300));`,
        methods: [
          { name: "setRadius(int radius)", description: "Changes the circle radius" },
          { name: "getRadius()", description: "Returns the current circle radius" },
          { name: "setColor(uint32_t color)", description: "Changes the circle color" },
          { name: "getColor()", description: "Returns the current circle color" },
          { name: "setPosition(const Point& position)", description: "Updates the circle center position" },
          { name: "getPosition()", description: "Returns the current circle center position" }
        ]
      },
      {
        title: "Column Layout Widget",
        description: "Arranges child widgets vertically in a column layout:",
        code: `// Column layout (vertical arrangement)
auto column = Column({
    Text(Point(0, 0), "TITLE", 3, Colors::White, false),
    Circle(50, Point(0, 0), Colors::Blue, false),
    Text(Point(0, 0), "Bottom Text", 2, Colors::Green, false)
});

// Column with custom alignment and spacing
auto alignedColumn = Column({
    Text(Point(0, 0), "Header", 2, Colors::White, false),
    Button({...}),
    Text(Point(0, 0), "Footer", 1, Colors::Gray, false)
}, false, CrossAxisAlignment::Center, MainAxisAlignment::SpaceBetween);`,
        methods: [
          { name: "addChild(Widget* child)", description: "Adds a widget to the column" },
          { name: "removeChild(Widget* child)", description: "Removes a widget from the column" },
          { name: "getChildren()", description: "Returns vector of all child widgets" },
          { name: "setMainAxisAlignment(MainAxisAlignment alignment)", description: "Sets vertical alignment of children" },
          { name: "setCrossAxisAlignment(CrossAxisAlignment alignment)", description: "Sets horizontal alignment of children" },
          { name: "setSpacing(int spacing)", description: "Sets spacing between child widgets" },
          { name: "getSpacing()", description: "Returns current spacing value" }
        ]
      },
      {
        title: "Row Layout Widget", 
        description: "Arranges child widgets horizontally in a row layout:",
        code: `// Row layout (horizontal arrangement)
auto row = Row({
    Text(Point(0, 0), "LEFT", 2, Colors::White, false),
    Circle(30, Point(0, 0), Colors::Blue, false),
    Text(Point(0, 0), "RIGHT", 2, Colors::Green, false)
}, false, MainAxisAlignment::SpaceBetween);

// Row with centered alignment
auto centeredRow = Row({
    Button({...}),
    Text(Point(0, 0), "Label", 2, Colors::White, false)
}, false, MainAxisAlignment::Center, CrossAxisAlignment::Center);`,
        methods: [
          { name: "addChild(Widget* child)", description: "Adds a widget to the row" },
          { name: "removeChild(Widget* child)", description: "Removes a widget from the row" },
          { name: "getChildren()", description: "Returns vector of all child widgets" },
          { name: "setMainAxisAlignment(MainAxisAlignment alignment)", description: "Sets horizontal alignment of children" },
          { name: "setCrossAxisAlignment(CrossAxisAlignment alignment)", description: "Sets vertical alignment of children" },
          { name: "setSpacing(int spacing)", description: "Sets spacing between child widgets" },
          { name: "getSpacing()", description: "Returns current spacing value" }
        ]
      },
      {
        title: "Expanded Widget",
        description: "Makes a child widget expand to fill available space in a layout:",
        code: `// Expanded widget (fills available space)
auto layout = Row({
    // Fixed width container
    Container(Colors::Red, 0, 0, 100, 0, false),
    
    // This will expand to fill remaining space
    Expanded(
        Container(Colors::Blue, 0, 0, 0, 0, false),
        1  // Flex factor
    ),
    
    // Another expanded widget with different flex
    Expanded(
        Text(Point(0, 0), "Flexible Text", 2, Colors::White, false),
        2  // Takes twice as much space as the first Expanded
    )
}, false);`,
        methods: [
          { name: "setChild(Widget* child)", description: "Sets the child widget to be expanded" },
          { name: "getChild()", description: "Returns the current child widget" },
          { name: "setFlex(int flex)", description: "Sets the flex factor (how much space to take relative to other Expanded widgets)" },
          { name: "getFlex()", description: "Returns the current flex factor" }
        ]
      },
      {
        title: "Padding Widget",
        description: "Adds padding (empty space) around a child widget:",
        code: `// Padding widget (adds space around a child)
auto paddedText = Padding(
    Text(Point(0, 0), "PADDED TEXT", 2, Colors::White, false),
    15,  // 15 pixels of padding on all sides
    false
);

// Padding with different values for each side
auto customPadding = Padding(
    Button({...}),
    10, 20, 30, 40,  // top, right, bottom, left
    false
);`,
        methods: [
          { name: "setChild(Widget* child)", description: "Sets the child widget to be padded" },
          { name: "getChild()", description: "Returns the current child widget" },
          { name: "setPadding(int padding)", description: "Sets uniform padding on all sides" },
          { name: "setPadding(int top, int right, int bottom, int left)", description: "Sets different padding for each side" },
          { name: "getPaddingTop()", description: "Returns top padding value" },
          { name: "getPaddingRight()", description: "Returns right padding value" },
          { name: "getPaddingBottom()", description: "Returns bottom padding value" },
          { name: "getPaddingLeft()", description: "Returns left padding value" }
        ]
      }
    ],
    c: [
      {
        title: "Container",
        description: "Creates a rectangular container.",
        code: `Container(
    color(uint32_t color),
    x(int x),
    y(int y),
    width(int width),
    height(int height)
);`
      },
      {
        title: "CenteredContainer",
        description: "Creates a centered rectangular container.",
        code: `CenteredContainer(
    width(int width),
    height(int height),
    color(uint32_t color)
);`
      },
      {
        title: "CircleWidget",
        description: "Creates a circle.",
        code: `CircleWidget(
    radius(int radius),
    position(Point position),
    color(uint32_t color)
);`
      },
      {
        title: "LineWidget",
        description: "Creates a line with specified thickness.",
        code: `LineWidget(
    start(Point start),
    end(Point end),
    thickness(int thickness),
    color(uint32_t color)
);`
      },
      {
        title: "TextWidget",
        description: "Renders text using the built-in bitmap font.",
        code: `TextWidget(
    start(Point position),
    text(const char* text),
    scale(int scale),
    color(uint32_t color)
);`
      },
      {
        title: "LinearGradientContainer",
        description: "Creates a rectangle filled with a linear color gradient.",
        code: `LinearGradientContainer(
    x(int x),
    y(int y),
    width(int width),
    height(int height),
    gradient(LinearGradient gradient)
);`
      },
      {
        title: "ButtonWidget",
        description: "Creates an interactive button that responds to mouse events.",
        code: `typedef void (*ButtonCallback)(void);  // Function pointer type for callbacks

typedef struct {
    int x;
    int y;
    int width;
    int height;
    uint32_t normal_color;
    uint32_t hover_color;
    uint32_t press_color;
    const char* label;
    int text_scale;
    uint32_t text_color;
    ButtonCallback on_click;
} ButtonConfig;

void ButtonWidget(ButtonConfig config);`,
        example: {
          title: "Example usage:",
          code: `void button_callback() {
    // Code executed when button is clicked
    fernPrintf("Button clicked!");
}

ButtonConfig my_button = {
    .x = 100,
    .y = 200,
    .width = 200,
    .height = 60,
    .normal_color = Colors_blue,
    .hover_color = 0xFF4444FF,  // Lighter blue
    .press_color = 0xFF0000AA,  // Darker blue
    .label = "CLICK ME",
    .text_scale = 2,
    .text_color = Colors_white,
    .on_click = button_callback
};

ButtonWidget(my_button);`
        }
      }
    ]
  }
};
