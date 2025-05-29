export const drawingFunctionsContent = {
  title: "Drawing Functions",
  description: "Low-level functions for rendering graphics primitives",
  sections: [
    {
      title: "Core Drawing API",
      description: `Fern provides a set of functions for drawing basic shapes, text, and manipulating pixels directly. These form the foundation of all visual output in Fern applications.`,
      cpp: {
        description: `The Draw namespace provides an object-oriented interface for drawing operations:

• Draw::rect() - Draw rectangles (filled or outlined)
• Draw::circle() - Draw circles (filled or outlined)  
• Draw::line() - Draw lines with custom thickness
• Draw::text() - Render text with custom scale
• Draw::fill() - Fill the entire screen with a color`
      },
      c: {
        description: `C drawing functions operate directly on the pixel buffer:

• frect() - Draw rectangles
• fcircle() - Draw circles
• fline() - Draw lines
• ftext() - Render text
• ffill() - Fill the screen with a color`
      }
    },
    {
      title: "Performance Considerations",
      description: `Drawing operations are relatively expensive, especially when working with many pixels. For optimal performance:

• Minimize redundant drawing operations
• Batch similar operations when possible
• Consider using higher-level widgets for complex UI elements
• Use clipping to avoid drawing outside visible areas`
    }
  ],
  examples: {
    title: "Usage Examples",
    description: "Examples of using the drawing functions:",
    cpp: {
      title: "C++ Draw Namespace Example",
      code: `// Draw a basic scene using the Draw namespace
void draw() {
    // Clear the screen with black
    Draw::fill(Colors::Black);
    
    // Draw a blue rectangle
    Draw::rect(50, 50, 200, 150, Colors::Blue);
    
    // Draw a red circle
    Draw::circle(300, 200, 75, Colors::Red);
    
    // Draw a white line
    Draw::line(100, 300, 400, 350, 3, Colors::White);
    
    // Draw some text
    Draw::text("FERN GRAPHICS", 150, 400, 2, Colors::Green);
}`
    },
    c: {
      title: "C Low-Level Functions Example",
      code: `// Draw a basic scene using low-level functions
void draw_scene() {
    // Clear the screen with black
    ffill(canvas.pixels, canvas.height, canvas.width, Colors_black);
    
    // Draw a blue rectangle
    frect(canvas.pixels, canvas.height, canvas.width, Colors_blue, 50, 50, 200, 150);
    
    // Draw a red circle
    fcircle(canvas.pixels, canvas.height, canvas.width, Colors_red, 300, 200, 75);
    
    // Draw a white line
    fline(canvas.pixels, canvas.height, canvas.width, Colors_white, 100, 300, 400, 350, 3);
    
    // Draw some text
    ftext(canvas.pixels, canvas.width, canvas.height, "FERN GRAPHICS", 150, 400, 2, Colors_green);
}`
    }
  }
};
