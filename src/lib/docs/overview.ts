export const overviewContent = {
  title: "Fern Graphics Library",
  description: "A modern, WebAssembly-based graphics library for creating visual interactive applications",
  sections: [
    {
      title: "Introduction",
      content: `Fern Graphics is a lightweight graphics and UI library designed for creating interactive applications, 
      visualizations, and games. It provides a clean API for rendering graphics to HTML canvas via WebAssembly, 
      enabling developers to create visual applications that run in any modern web browser.`,
    },
    {
      title: "Why Choose Fern?",
      content: `Fern combines the performance benefits of compiled languages with the accessibility of web 
      applications. It's designed to be intuitive for beginners while providing the flexibility and 
      power needed by experienced developers.`,
    },
    {
      title: "Language Implementations",
      content: `Fern is available in both C and C++ implementations, each optimized for different use cases:`,
      cpp: {
        content: `The C++ implementation provides an object-oriented design with modern patterns, making it ideal 
        for more complex applications. It features a powerful layout system inspired by Flutter, 
        a signal/slot event system, and robust widget management.`
      },
      c: {
        content: `The C implementation offers a minimalist approach, focusing on simplicity and 
        ease of use. It's perfect for small projects or educational purposes, providing a declarative 
        API with named parameters and a straightforward widget system.`
      }
    }
  ]
};
