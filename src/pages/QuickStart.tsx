
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CodeBlock from '@/components/CodeBlock';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { docsData } from '@/lib/docsData';

const QuickStart = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <div className="container px-4 py-8 max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Quick Start Guide</h1>
          
          <div className="prose prose-lg max-w-none">
            <h2>Prerequisites</h2>
            <p>
              Before you begin, ensure you have installed:
            </p>
            <ul>
              <li>Emscripten SDK</li>
              <li>Modern C compiler (supporting C99 or later)</li>
              <li>Python 3 (for development server)</li>
            </ul>
            <p>
              If you haven't installed these yet, see the <Link to="/docs/installation" className="text-primary hover:underline">installation guide</Link>.
            </p>
            
            <h2>Creating a Basic Application</h2>
            <p>
              Let's create a simple application that displays a red circle on a blue background:
            </p>

            <CodeBlock 
              code={docsData.quickStartCode}
              language="c"
              fileName="main.c"
            />
            
            <h2>Build and Run</h2>
            <p>
              Save the file as <code>main.c</code> and run the following command:
            </p>
            
            <CodeBlock 
              code={`fern main.c`}
              language="bash"
            />
            
            <p>
              This will compile your application and start a local development server. 
              Open your browser and visit <code>http://localhost:8000/dist/</code> to see the result.
            </p>
            
            <h2>Understanding the Code</h2>
            <p>
              Let's break down what each part of the code does:
            </p>
            
            <ol>
              <li>
                <p>First, we include the Fern library and define our canvas dimensions:</p>
                <CodeBlock 
                  code={`#include "fern.c"

#define WIDTH 800
#define HEIGHT 600

static uint32_t pixels[HEIGHT*WIDTH];`}
                  language="c"
                />
              </li>
              
              <li>
                <p>Next, we initialize the Fern canvas with our pixel buffer:</p>
                <CodeBlock 
                  code={`FernCanvas canvas = {pixels, HEIGHT, WIDTH};
runApp(canvas);`}
                  language="c"
                />
              </li>
              
              <li>
                <p>Then, we create a blue background container:</p>
                <CodeBlock 
                  code={`Container(
    color(Colors_blue),
    x(0),
    y(0),
    width(WIDTH),
    height(HEIGHT)
);`}
                  language="c"
                />
              </li>
              
              <li>
                <p>We add a red circle to the center of the canvas:</p>
                <CodeBlock 
                  code={`CircleWidget(
    radius(50),
    position(Point_create(WIDTH/2, HEIGHT/2)),
    color(Colors_red)
);`}
                  language="c"
                />
              </li>
              
              <li>
                <p>Finally, we start the rendering loop:</p>
                <CodeBlock 
                  code={`fern_start_render_loop();
return 0;`}
                  language="c"
                />
              </li>
            </ol>
            
            <h2>Creating an Interactive Application</h2>
            <p>
              Let's create a more interesting example with a button that increases the circle's size:
            </p>

            <CodeBlock 
              code={docsData.interactiveCode}
              language="c"
              fileName="interactive.c"
            />
            
            <h2>Next Steps</h2>
            <p>
              Now that you've created your first Fern applications, you can:
            </p>
            <ul>
              <li>Explore the <Link to="/docs" className="text-primary hover:underline">full documentation</Link> for more details about available functions and features</li>
              <li>Learn about <Link to="/docs/widget-functions" className="text-primary hover:underline">widget functions</Link> to create more complex UIs</li>
              <li>Understand <Link to="/docs/application-lifecycle" className="text-primary hover:underline">application lifecycle</Link> for better control over your application</li>
              <li>Check out the <a href="https://github.com/RishiAhuja/fern" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">GitHub repository</a> for more examples and updates</li>
            </ul>
            
            <div className="flex justify-center mt-10">
              <Button asChild>
                <Link to="/docs">
                  Explore Documentation
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default QuickStart;
