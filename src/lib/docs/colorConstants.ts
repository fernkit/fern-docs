export const colorConstantsContent = {
  title: "Color Constants",
  description: "Reference for the predefined colors in Fern Graphics Library",
  sections: [
    {
      title: "Predefined Colors",
      description: "Fern provides a set of predefined color constants for convenience:",
      cpp: {
        code: `// Predefined colors in the Colors namespace
namespace Colors {
    constexpr uint32_t Red        = 0xFFFF0000;
    constexpr uint32_t Green      = 0xFF00FF00;
    constexpr uint32_t Blue       = 0xFF0000FF;
    constexpr uint32_t White      = 0xFFFFFFFF;
    constexpr uint32_t Black      = 0xFF000000;
    constexpr uint32_t Yellow     = 0xFFFFFF00;
    constexpr uint32_t Cyan       = 0xFF00FFFF;
    constexpr uint32_t Magenta    = 0xFFFF00FF;
    constexpr uint32_t Gray       = 0xFF808080;
    constexpr uint32_t DarkGray   = 0xFF202020;
    constexpr uint32_t LightGray  = 0xFFD3D3D3;
    constexpr uint32_t Orange     = 0xFFFFA500;
    constexpr uint32_t Purple     = 0xFF800080;
    constexpr uint32_t Pink       = 0xFFFFC0CB;
    constexpr uint32_t Brown      = 0xFF8B4513;
    constexpr uint32_t Transparent= 0x00000000;
}`
      },
      c: {
        code: `#define Colors_green 0xFF00FF00   // Green
#define Colors_blue  0xFF0000FF   // Blue
#define Colors_red   0xFFFF0000   // Red
#define Colors_gray  0xFF202020   // Dark Gray
#define Colors_black 0xFF000000   // Black
#define Colors_white 0xFFFFFFFF   // White`
      }
    },
    {
      title: "Color Format",
      description: `Color values are represented as 0xAARRGGBB:
      
• AA: Alpha channel (transparency)
• RR: Red channel  
• GG: Green channel
• BB: Blue channel

For example, to create a semi-transparent purple color with 50% opacity:`,
      cpp: {
        code: `// Half-transparent purple (50% alpha)
constexpr uint32_t MY_PURPLE = 0x80800080;   // 0x80 for alpha (50%), 0x80 for red, 0x00 for green, 0x80 for blue`
      },
      c: {
        code: `// Half-transparent purple (50% alpha)
#define MY_PURPLE 0x80800080   // 0x80 for alpha (50%), 0x80 for red, 0x00 for green, 0x80 for blue`
      }
    }
  ],
  usage: {
    title: "Using Colors",
    description: "Examples of using predefined and custom colors:",
    showForLanguage: "cpp",
    code: `// Using predefined colors
Draw::circle(100, 100, 50, Colors::Red);
Draw::rect(200, 200, 100, 50, Colors::Blue);
Draw::text("Hello", 300, 300, 2, Colors::White);

// Using custom colors
Draw::line(100, 100, 200, 200, 2, 0xFF00FF00);  // Green line
Draw::circle(300, 300, 30, 0x80FF0000);         // Semi-transparent red circle`
  }
};
