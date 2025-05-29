export const cppLayoutSystemContent = {
  title: "Layout System (C++)",
  description: "Flutter-inspired responsive layout system for building complex UIs with constraint-based positioning. The layout system works by passing constraints down the widget tree and sizes back up - parent widgets tell their children 'you can be this big,' and children respond 'I want to be this big.' The parent then positions children based on their requested sizes and layout rules.",
  
  sections: [
    {
      id: "column-layout",
      title: "Column",
      description: "Arranges widgets vertically in a column formation. Column takes a list of child widgets and arranges them vertically, one below the other. The Column automatically sizes itself based on its children and the available space, handling spacing, alignment, and sizing automatically.",
      
      methods: [
        {
          signature: "Column(vector<shared_ptr<Widget>> children)",
          description: "Creates a column with default center alignment",
          parameters: "children - Vector of widgets to arrange vertically"
        },
        {
          signature: "Column(vector<shared_ptr<Widget>> children, bool visible, MainAxisAlignment alignment)",
          description: "Creates a column with custom alignment",
          parameters: "children - Vector of widgets, visible - Widget visibility, alignment - Vertical alignment option"
        },
        {
          signature: "setMainAxisAlignment(MainAxisAlignment alignment)",
          description: "Sets how children are aligned vertically within the column",
          parameters: "alignment - Start, Center, End, SpaceBetween, SpaceAround, or SpaceEvenly"
        },
        {
          signature: "setCrossAxisAlignment(CrossAxisAlignment alignment)",
          description: "Sets how children are aligned horizontally within the column",
          parameters: "alignment - Start, Center, End, or Stretch"
        },
        {
          signature: "addChild(shared_ptr<Widget> child)",
          description: "Adds a new widget to the end of the column",
          parameters: "child - Widget to add to the column"
        },
        {
          signature: "removeChild(int index)",
          description: "Removes widget at specified index from the column",
          parameters: "index - Zero-based index of widget to remove"
        }
      ],
      
      code: {
        basic: `// Basic column with three widgets
auto column = Column({
    Text(Point(0, 0), "TITLE", 3, Colors::White),
    Circle(50, Point(0, 0), Colors::Blue),
    Text(Point(0, 0), "Bottom Text", 2, Colors::Green)
});`,

        withAlignment: `// Column with custom alignment
auto leftAlignedColumn = Column({
    Text(Point(0, 0), "Left Aligned", 2, Colors::White),
    Circle(30, Point(0, 0), Colors::Red),
    Text(Point(0, 0), "Also Left", 2, Colors::Yellow)
}, true, MainAxisAlignment::Start);`,

        responsive: `// Responsive column layout
auto mainColumn = Column({
    Container(Colors::DarkBlue, 0, 0, containerWidth, 80, 
             Text(Point(20, 20), "HEADER", 3, Colors::White)),
    Expanded(
        Container(Colors::Black, 0, 0, 0, 0,
                 Text(Point(20, 20), "CONTENT", 2, Colors::White)),
        1
    ),
    Container(Colors::DarkGray, 0, 0, containerWidth, 60,
             Text(Point(20, 15), "FOOTER", 2, Colors::LightGray))
}, true);`
      }
    },
    
    {
      id: "row-layout", 
      title: "Row",
      description: "Arranges widgets horizontally in a row formation. Row works exactly like Column, but arranges children horizontally instead of vertically. Perfect for creating navigation bars, button groups, or any horizontal layout where you want automatic spacing and alignment.",
      
      methods: [
        {
          signature: "Row(vector<shared_ptr<Widget>> children)",
          description: "Creates a row with default center alignment",
          parameters: "children - Vector of widgets to arrange horizontally"
        },
        {
          signature: "Row(vector<shared_ptr<Widget>> children, bool visible, MainAxisAlignment alignment)",
          description: "Creates a row with custom alignment",
          parameters: "children - Vector of widgets, visible - Widget visibility, alignment - Horizontal alignment option"
        },
        {
          signature: "setMainAxisAlignment(MainAxisAlignment alignment)",
          description: "Sets how children are aligned horizontally within the row",
          parameters: "alignment - Start, Center, End, SpaceBetween, SpaceAround, or SpaceEvenly"
        },
        {
          signature: "setCrossAxisAlignment(CrossAxisAlignment alignment)",
          description: "Sets how children are aligned vertically within the row",
          parameters: "alignment - Start, Center, End, or Stretch"
        },
        {
          signature: "addChild(shared_ptr<Widget> child)",
          description: "Adds a new widget to the end of the row",
          parameters: "child - Widget to add to the row"
        },
        {
          signature: "removeChild(int index)",
          description: "Removes widget at specified index from the row",
          parameters: "index - Zero-based index of widget to remove"
        }
      ],
      
      code: {
        basic: `// Basic horizontal navigation
auto navigationRow = Row({
    Text(Point(0, 0), "HOME", 2, Colors::White),
    Text(Point(0, 0), "ABOUT", 2, Colors::White), 
    Text(Point(0, 0), "CONTACT", 2, Colors::White)
}, true, MainAxisAlignment::SpaceBetween);`,

        mixed: `// Row with mixed widget types
auto toolbarRow = Row({
    Text(Point(0, 0), "MY APP", 3, Colors::Blue),
    Container(Colors::Transparent, 0, 0, 50, 1),
    Circle(15, Point(0, 0), Colors::Green),
    Text(Point(0, 0), "SAVE", 2, Colors::White)
});`,

        responsive: `// Responsive button bar
auto createButtonBar(int availableWidth) {
    if (availableWidth > 600) {
        return Row({
            Text(Point(0, 0), "NEW FILE", 2, Colors::White),
            Text(Point(0, 0), "OPEN", 2, Colors::White),
            Text(Point(0, 0), "SAVE", 2, Colors::White),
            Text(Point(0, 0), "SETTINGS", 2, Colors::White)
        }, true, MainAxisAlignment::SpaceAround);
    } else {
        return Row({
            Circle(8, Point(0, 0), Colors::Blue),
            Circle(8, Point(0, 0), Colors::Green),
            Circle(8, Point(0, 0), Colors::Orange),
            Circle(8, Point(0, 0), Colors::Purple)
        }, true, MainAxisAlignment::SpaceEvenly);
    }
}`
      }
    },
    
    {
      id: "expanded-layout",
      title: "Expanded",
      description: "Makes a child widget expand to fill available space in Row or Column layouts. Expanded uses flex factors to determine how much space each widget should take - if you have two Expanded widgets with flex factors of 1 and 2, the second will take twice as much space as the first.",
      
      methods: [
        {
          signature: "Expanded(shared_ptr<Widget> child)",
          description: "Creates an expanded widget with flex factor of 1",
          parameters: "child - Widget to expand within available space"
        },
        {
          signature: "Expanded(shared_ptr<Widget> child, int flex)",
          description: "Creates an expanded widget with custom flex factor",
          parameters: "child - Widget to expand, flex - Flex factor determining relative size"
        },
        {
          signature: "setFlex(int flex)",
          description: "Sets the flex factor for this expanded widget",
          parameters: "flex - Positive integer determining relative space allocation"
        },
        {
          signature: "getFlex()",
          description: "Returns the current flex factor",
          parameters: "None - Returns integer flex value"
        }
      ],
      
      code: {
        basicUsage: `// Basic expanded layout in a row
auto layout = Row({
    Container(Colors::DarkBlue, 0, 0, 200, 400),
    Expanded(
        Container(Colors::Black, 0, 0, 0, 0,
                 Text(Point(20, 20), "MAIN CONTENT", 2, Colors::White)),
        1
    )
});`,

        multipleExpanded: `// Multiple expanded widgets with different flex factors
auto threeColumnLayout = Row({
    Expanded(
        Container(Colors::Red, 0, 0, 0, 0,
                 Text(Point(10, 20), "LEFT", 2, Colors::White)),
        1  // 25% of available space
    ),
    Expanded(
        Container(Colors::Green, 0, 0, 0, 0,
                 Text(Point(10, 20), "CENTER", 2, Colors::White)),
        2  // 50% of available space
    ),
    Expanded(
        Container(Colors::Blue, 0, 0, 0, 0,
                 Text(Point(10, 20), "RIGHT", 2, Colors::White)),
        1  // 25% of available space
    )
});`,

        complexLayout: `// Complex responsive dashboard layout
auto createDashboard(int width, int height) {
    return Column({
        Container(Colors::DarkBlue, 0, 0, width, 60,
                 Text(Point(20, 20), "DASHBOARD", 3, Colors::White)),
        Expanded(
            Row({
                Container(Colors::DarkGray, 0, 0, 250, 0,
                         Column({
                             Text(Point(20, 20), "NAVIGATION", 2, Colors::White),
                             Text(Point(20, 50), "• Home", 1, Colors::LightGray),
                             Text(Point(20, 70), "• Reports", 1, Colors::LightGray)
                         })),
                Expanded(
                    Container(Colors::Black, 0, 0, 0, 0,
                             Text(Point(30, 30), "MAIN CONTENT", 2, Colors::White)),
                    1
                )
            }),
            1
        ),
        Container(Colors::DarkGreen, 0, 0, width, 30,
                 Text(Point(10, 8), "Ready", 1, Colors::White))
    }, true);
}`
      }
    },
    
    {
      id: "padding-layout",
      title: "Padding", 
      description: "Adds consistent spacing around a child widget. Padding separates the concern of spacing from the content itself - your text or button doesn't need to know about its surrounding space, making components more reusable and layouts more consistent.",
      
      methods: [
        {
          signature: "Padding(shared_ptr<Widget> child, int padding)",
          description: "Creates padding with equal spacing on all sides",
          parameters: "child - Widget to add padding around, padding - Padding amount in pixels"
        },
        {
          signature: "Padding(shared_ptr<Widget> child, int top, int right, int bottom, int left)",
          description: "Creates padding with different spacing on each side",
          parameters: "child - Widget to pad, top/right/bottom/left - Individual padding amounts"
        },
        {
          signature: "setPadding(int padding)",
          description: "Sets equal padding on all sides",
          parameters: "padding - Padding amount in pixels for all sides"
        },
        {
          signature: "setPadding(int top, int right, int bottom, int left)",
          description: "Sets individual padding for each side",
          parameters: "top/right/bottom/left - Individual padding amounts in pixels"
        },
        {
          signature: "getPadding()",
          description: "Returns current padding values",
          parameters: "None - Returns struct with top, right, bottom, left values"
        }
      ],
      
      code: {
        basic: `// Add padding around text
auto paddedText = Padding(
    Text(Point(0, 0), "PADDED TEXT", 2, Colors::White),
    15  // 15 pixels padding on all sides
);`,

        inLayout: `// Using padding in a card layout
auto cardLayout = Container(Colors::DarkBlue, 100, 100, 300, 200,
    Padding(
        Column({
            Text(Point(0, 0), "CARD TITLE", 3, Colors::White),
            Text(Point(0, 0), "Card description", 2, Colors::LightGray),
            Text(Point(0, 0), "Additional details", 1, Colors::Gray)
        }),
        20  // 20px padding inside the card
    )
);`,

        responsive: `// Responsive padding based on screen size
auto createPaddedContent(int screenWidth) {
    int padding = screenWidth > 800 ? 40 : 20;
    return Padding(
        Column({
            Text(Point(0, 0), "RESPONSIVE CONTENT", 3, Colors::White),
            Text(Point(0, 0), "Adaptive padding content", 2, Colors::Gray)
        }),
        padding
    );
}`
      }
    }
  ],
  
  bestPractices: [
    {
      title: "Start with Column and Row",
      description: "These are the building blocks of most layouts. Master these before moving to complex combinations. Build a simple header-content-footer layout using a Column with three children."
    },
    {
      title: "Use Expanded for Responsive Areas", 
      description: "Any area that should adapt to screen size should be wrapped in Expanded. Perfect for main content areas, flexible sidebars, or stretching button bars."
    },
    {
      title: "Add Padding for Visual Breathing Room",
      description: "Don't let content touch edges. Padding makes layouts more professional. Wrap card content in Padding, add space around form elements."
    },
    {
      title: "Think in Terms of Constraints",
      description: "Ask 'what space is available?' rather than 'what position should this be?' Instead of setting absolute positions, describe relationships between widgets."
    },
    {
      title: "Combine Layout Widgets",
      description: "Complex layouts are built by combining simple layout widgets. Use Row inside Column, wrap content in Padding, and use Expanded for flexible areas."
    }
  ]
};
