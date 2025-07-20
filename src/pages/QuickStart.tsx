import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowLeft, Github, BookOpen, ExternalLink, Download, Play, Wrench, Terminal } from "lucide-react";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const QuickStart = () => {
    const steps = [
        {
            title: "Prerequisites",
            icon: Wrench,
            content: `Before we begin, you'll need several tools installed on your system. Fern development currently works best on Linux systems.

Required Tools:
• C++ Compiler: GCC 7+ or Clang 6+
• Git: For cloning repositories and version control  
• Python 3: Required for the Terra CLI tool
• Node.js: Needed for the Gleeb LSP server
• Emscripten SDK: Essential for web compilation (WebAssembly)`
        },
        {
            title: "Install Emscripten SDK",
            icon: Download,
            content: `Emscripten is crucial for web deployment as it compiles C++ code to WebAssembly:

git clone https://github.com/emscripten-core/emsdk.git
cd emsdk

# Install and activate the latest version
./emsdk install latest
./emsdk activate latest

# Set up environment variables for current session
source ./emsdk_env.sh

# Add to your shell profile permanently
echo 'source /path/to/emsdk/emsdk_env.sh' >> ~/.bashrc`
        },
        {
            title: "Install Fern",
            icon: Terminal,
            content: `Clone the Fern repository and run the installation script:

git clone https://github.com/fernkit/fern.git
cd fern

# Make the install script executable and run it
chmod +x install.sh
./install.sh

# Verify installation
fern --help

The installation script will install Terra CLI, build the Fern C++ library, install Gleeb LSP, and configure your environment.`
        },
        {
            title: "Your First App",
            icon: Play,
            content: `Create a simple Fern application. Every Fern app follows this pattern:

#include <fern/fern.hpp>
using namespace Fern;

void setupUI() {
    // Create widgets here
    auto myButton = Button(ButtonConfig(300, 250, 200, 50, "Click Me!"));
    addWidget(myButton);
}

void draw() {
    Draw::fill(Colors::Black);  // Clear screen
    Draw::rect(50, 50, 100, 100, Colors::Red);    // Red square
    Draw::circle(300, 100, 50, Colors::Yellow);   // Yellow circle
}

int main() {
    Fern::initialize();
    setupUI();
    Fern::setDrawCallback(draw);
    Fern::startRenderLoop();
    return 0;
}

Compile and run:
fern fire my_app.cpp -p linux    # For Linux
fern fire my_app.cpp -p web      # For WebAssembly`
        }
    ];

    const nextSteps = [
        {
            title: "Explore the Documentation",
            description: "Dive deep into the core concepts, layout system, and widget library.",
            link: "/docs",
            linkText: "Read the Docs"
        },
        {
            title: "Try the Examples",
            description: "Look at real-world examples and interactive demos to learn by doing.",
            link: "/docs/examples/basic",
            linkText: "View Examples"
        },
        {
            title: "Join the Community",
            description: "Connect with other developers building with FernKit.",
            link: "https://github.com/fernkit/fern/discussions",
            linkText: "GitHub Discussions",
            external: true
        }
    ];

    return (
        <div className="min-h-screen flex flex-col bg-background overflow-x-hidden">
            <Navbar />

            <main className="flex-grow">
                {/* Hero Section */}
                <section className="relative overflow-hidden border-b border-border/20 py-16 sm:py-20 md:py-24" style={{
                    background: `linear-gradient(135deg, #F8FAF5 0%, #F8FAF5 100%)`,
                }}>
                    <div className="absolute inset-0 opacity-10">
                        <div className="w-full h-full" style={{
                            backgroundImage: `linear-gradient(to right, var(--fern-green) 1px, transparent 1px), linear-gradient(to bottom, var(--fern-green) 1px, transparent 1px)`,
                            backgroundSize: '40px 40px'
                        }}></div>
                    </div>
                    
                    <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="max-w-4xl mx-auto">
                            <div className="mb-8">
                                <Link
                                    to="/"
                                    className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium"
                                >
                                    <ArrowLeft size={16} />
                                    <span>Back to Home</span>
                                </Link>
                            </div>

                            <div className="text-center">
                                <div className="flex justify-center mb-6">
                                    <img
                                        src="/logo/fern.png"
                                        alt="FernKit Logo"
                                        className="h-16 w-16 sm:h-20 sm:w-20 pixelated"
                                        style={{ imageRendering: 'pixelated' }}
                                    />
                                </div>
                                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-pixel text-gray-900 mb-4 sm:mb-6 leading-tight break-words">
                                    Quick <span style={{ color: 'var(--fern-green)' }}>Start</span> Guide
                                </h1>
                                <p className="text-lg sm:text-xl text-gray-700 mb-8 max-w-3xl mx-auto leading-relaxed">
                                    Get up and running with FernKit in minutes. Build your first pixel-perfect application from scratch.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Steps Section */}
                <section className="py-16 sm:py-20 bg-background">
                    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12 sm:mb-16">
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-pixel mb-4 sm:mb-6 text-foreground">
                                Getting Started
                            </h2>
                            <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                                Follow these steps to set up your development environment and create your first FernKit application.
                            </p>
                        </div>

                        <div className="space-y-8 sm:space-y-12">
                            {steps.map((step, index) => (
                                <div
                                    key={step.title}
                                    className="group relative bg-white/95 rounded-lg border p-6 sm:p-8 transition-all duration-300 hover:shadow-md"
                                    style={{ borderColor: 'rgba(69, 113, 67, 0.1)' }}
                                >
                                    <div className="flex items-start gap-4 sm:gap-6">
                                        <div className="flex-shrink-0">
                                            <div
                                                className="w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center text-white font-pixel text-lg sm:text-xl mb-3"
                                                style={{ backgroundColor: 'var(--fern-green)' }}
                                            >
                                                {index + 1}
                                            </div>
                                            <div
                                                className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg flex items-center justify-center"
                                                style={{ backgroundColor: 'rgba(69, 113, 67, 0.1)' }}
                                            >
                                                <step.icon size={20} style={{ color: 'var(--fern-green)' }} />
                                            </div>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="text-xl sm:text-2xl font-pixel mb-4 text-foreground break-words">
                                                {step.title}
                                            </h3>
                                            <div className="text-sm sm:text-base text-gray-600 leading-relaxed space-y-4">
                                                {step.content.split('\n\n').map((paragraph, idx) => {
                                                    const codePatterns = ['git clone', '#include', './', 'fern fire', 'echo ', 'chmod +x', 'source ', 'cd ', './emsdk', 'using namespace', 'int main()', 'void ', 'auto ', 'Fern::', 'Draw::', 'Colors::', 'Button(', 'addWidget', 'initialize()', 'startRenderLoop()', 'setDrawCallback'];
                                                    const isCode = codePatterns.some(pattern => paragraph.includes(pattern));

                                                    if (isCode) {
                                                        return (
                                                            <div key={idx} className="relative">
                                                                <pre className="p-4 rounded-lg text-sm font-mono overflow-x-auto border whitespace-pre-wrap break-words" style={{ backgroundColor: '#f9fafb', borderColor: '#cbd5e1', color: '#0f172a', fontFamily: 'JetBrains Mono, Consolas, Menlo, monospace', lineHeight: '1.5', fontSize: '13.5px' }}>
                                                                    {paragraph}
                                                                </pre>
                                                            </div>
                                                        );
                                                    }
                                                    return <div key={idx} className="whitespace-pre-wrap">{paragraph}</div>;
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Next Steps Section */}
                <section className="py-16 sm:py-20 bg-gray-50">
                    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12 sm:mb-16">
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-pixel mb-4 sm:mb-6 text-foreground">
                                What's Next?
                            </h2>
                            <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                                Now that you have FernKit running, here are some great next steps to deepen your understanding.
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
                            {nextSteps.map((step) => (
                                <div
                                    key={step.title}
                                    className="bg-white rounded-lg border p-6 transition-all duration-300 hover:shadow-md h-full flex flex-col"
                                    style={{ borderColor: 'rgba(69, 113, 67, 0.1)' }}
                                >
                                    <h3 className="text-lg sm:text-xl font-pixel mb-3 text-foreground break-words">
                                        {step.title}
                                    </h3>
                                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-6 flex-grow">
                                        {step.description}
                                    </p>
                                    <div className="mt-auto">
                                        {step.external ? (
                                            <a
                                                href={step.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors text-sm font-medium"
                                                style={{ borderColor: 'var(--fern-green)', color: 'var(--fern-green)' }}
                                                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--fern-green)'; e.currentTarget.style.color = 'white'; }}
                                                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = ''; e.currentTarget.style.color = 'var(--fern-green)'; }}
                                            >
                                                {step.linkText}
                                                <ExternalLink size={14} />
                                            </a>
                                        ) : (
                                            <Link
                                                to={step.link}
                                                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors text-sm font-medium"
                                                style={{ borderColor: 'var(--fern-green)', color: 'var(--fern-green)' }}
                                                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--fern-green)'; e.currentTarget.style.color = 'white'; }}
                                                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = ''; e.currentTarget.style.color = 'var(--fern-green)'; }}
                                            >
                                                {step.linkText}
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-16 sm:py-20 bg-background">
                    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                        <div className="text-center">
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-pixel mb-4 sm:mb-6 text-foreground break-words">
                                Ready to Build Something Amazing?
                            </h2>
                            <p className="text-base sm:text-lg mb-6 sm:mb-8 leading-relaxed text-gray-600 max-w-3xl mx-auto">
                                You now have everything you need to start building with FernKit. Create something beautiful, share it with the community, and help FernKit grow.
                            </p>
                            <div className="flex flex-col gap-3 sm:gap-4 justify-center items-stretch max-w-md mx-auto sm:max-w-none sm:flex-row sm:items-center">
                                <Button asChild size="lg" className="gap-2 sm:gap-3 text-white text-sm sm:text-base px-4 sm:px-6 py-3 sm:py-4 font-pixel transition-transform hover:translate-x-1 hover:translate-y-1" style={{ backgroundColor: 'var(--fern-green)', border: '2px solid #2d4a2d', boxShadow: '4px 4px 0px #2d4a2d' }}>
                                    <Link to="/docs" className="!text-white flex items-center gap-2 sm:gap-3 justify-center">
                                        <BookOpen size={16} />
                                        <span>Explore Documentation</span>
                                    </Link>
                                </Button>
                                <Button asChild size="lg" className="gap-2 sm:gap-3 text-sm sm:text-base px-4 sm:px-6 py-3 sm:py-4 font-pixel transition-transform hover:translate-x-1 hover:translate-y-1" style={{ backgroundColor: 'white', color: 'var(--fern-green)', border: '2px solid var(--fern-green)', boxShadow: '4px 4px 0px var(--fern-green)' }}>
                                    <a href="https://github.com/fernkit/fern" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 sm:gap-3 justify-center">
                                        <Github size={16} />
                                        <span>View on GitHub</span>
                                    </a>
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default QuickStart;