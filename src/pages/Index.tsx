import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowRight, Package, Zap, Code, Activity, Layout, Layers } from "lucide-react";
import FeatureCard from '@/components/FeatureCard';
import CodeBlock from '@/components/CodeBlock';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { docsData } from '@/lib/docsData';
import { useLanguageContext } from '@/hooks/useLanguageContext';
import { codeExamples } from '@/lib/codeExamples';

const Index = () => {
  const { language, setLanguage } = useLanguageContext();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-secondary to-background relative overflow-hidden border-b border-border">
          <div className="absolute inset-0 pixel-grid opacity-30"></div>
          <div className="container px-4 py-20 md:py-32 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <div className="flex justify-center mb-6">
                <img 
                  src="/lovable-uploads/4436af5f-ff0f-459d-b3f7-41c58f50b55f.png" 
                  alt="Fern Graphics Logo" 
                  className="h-32 w-auto" 
                />
              </div>
              <h1 className="text-4xl md:text-6xl font-pixel tracking-tight mb-4 leading-normal">Fern Graphics</h1>
              <p className="text-xl md:text-2xl text-muted-foreground mb-8 font-pixel-text">
                A lightweight WebAssembly-based graphics library for creating visual interactive applications using {language === 'cpp' ? 'modern C++' : 'simple C'} code.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button asChild size="lg" className="gap-2 btn-pixel bg-fern-600 hover:bg-fern-700 shadow-lg text-white">
                  <Link to="/quick-start" className='!text-white'>
                    Get Started
                    <ArrowRight size={18} />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="btn-pixel">
                  <Link to="/docs">
                    Documentation
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Language Toggle Section */}
        <section className="py-8 bg-muted/30">
          <div className="container px-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-6 rounded-lg bg-card shadow-lg border border-border">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Choose Your Implementation</h2>
                  <p className="text-muted-foreground">
                    Fern Graphics is available in both C and C++ implementations. Toggle to see the differences.
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <Button 
                    variant={language === 'c' ? "default" : "outline"}
                    onClick={() => setLanguage('c')}
                    className={language === 'c' ? "bg-fern-600 hover:bg-fern-700" : ""}
                  >
                    C Implementation
                  </Button>
                  <Button 
                    variant={language === 'cpp' ? "default" : "outline"}
                    onClick={() => setLanguage('cpp')}
                    className={language === 'cpp' ? "bg-fern-600 hover:bg-fern-700" : ""}
                  >
                    C++ Implementation
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20">
          <div className="container px-4">
            <h2 className="text-3xl font-pixel text-center mb-6">Key Features</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-center mb-12">
              {language === 'cpp' ? 
                "The C++ implementation offers a modern, object-oriented API with advanced features." :
                "The C implementation provides a simple yet powerful API for creating interactive graphics applications."}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {language === 'cpp' ? (
                <>
                  <FeatureCard
                    icon={Code}
                    title="Object-Oriented Design"
                    description="Modern C++ design patterns with classes, inheritance, and smart pointers."
                  />
                  <FeatureCard
                    icon={Layout}
                    title="Layout System"
                    description="Powerful layout system inspired by Flutter for creating responsive UIs."
                  />
                  <FeatureCard
                    icon={Zap}
                    title="Signal/Slot System"
                    description="Type-safe event handling with a flexible signal/slot implementation."
                  />
                  <FeatureCard
                    icon={Layers}
                    title="Widget Hierarchy"
                    description="Compose complex UIs with parent-child relationships between widgets."
                  />
                  <FeatureCard
                    icon={Activity}
                    title="Responsive Design"
                    description="Create applications that adapt to different screen sizes and orientations."
                  />
                  <FeatureCard
                    icon={Package}
                    title="Memory Safety"
                    description="Smart pointers and RAII for automatic resource management."
                  />
                </>
              ) : (
                <>
                  <FeatureCard
                    icon={Package}
                    title="Single-File Implementation"
                    description="Easy to integrate with minimal dependencies. Just include the single header file in your project."
                  />
                  <FeatureCard
                    icon={Code}
                    title="WebAssembly Powered"
                    description="Run your graphics code at near-native speed directly in the browser using WebAssembly."
                  />
                  <FeatureCard
                    icon={Zap}
                    title="Declarative API"
                    description="Clean, readable code with named parameters for a more intuitive development experience."
                  />
                  <FeatureCard
                    icon={Activity}
                    title="Interactive UI Elements"
                    description="Built-in support for user interactions including buttons and mouse event handling."
                  />
                  <FeatureCard
                    icon={Layout}
                    title="Simple Integration"
                    description="Easy to integrate into existing projects with minimal setup."
                  />
                  <FeatureCard
                    icon={Layers}
                    title="Beginner Friendly"
                    description="Perfect for learning graphics programming concepts with C."
                  />
                </>
              )}
            </div>
          </div>
        </section>

        {/* Code Example Section */}
        <section className="py-16 bg-secondary">
          <div className="container px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-pixel mb-4 text-center">Quick Example</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-center mb-8">
                Create your first Fern application with just a few lines of code.
              </p>
              <div className="bg-card rounded-lg overflow-hidden shadow-lg pixel-border">
                <CodeBlock 
                  code={language === 'cpp' ? codeExamples.basicExample.cpp : codeExamples.basicExample.c}
                  language={language}
                  fileName={language === 'cpp' ? "main.cpp" : "main.c"}
                />
              </div>
              <div className="mt-8 text-center">
                <Button asChild className="btn-pixel bg-fern-600 hover:bg-fern-700">
                  <Link to="/docs/quick-start" className='!text-white'>
                    See More Examples
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Comparison Section */}
        <section className="py-16 bg-muted/20">
          <div className="container px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-pixel mb-4">Implementation Comparison</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Choose the implementation that best fits your needs.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <div className="p-6 rounded-lg bg-card shadow-lg border border-border">
                <h3 className="text-2xl font-bold mb-4 text-center">C Implementation</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Minimal size and overhead</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Simple API for beginners</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Single-file implementation</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Great for small projects</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">✗</span>
                    <span>No layout system</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">✗</span>
                    <span>Limited widget types</span>
                  </li>
                </ul>
                <div className="mt-6 text-center">
                  <Button 
                    onClick={() => setLanguage('c')}
                    variant={language === 'c' ? "default" : "outline"}
                    className={language === 'c' ? "bg-fern-600 hover:bg-fern-700" : ""}
                  >
                    Choose C Implementation
                  </Button>
                </div>
              </div>
              
              <div className="p-6 rounded-lg bg-card shadow-lg border border-border">
                <h3 className="text-2xl font-bold mb-4 text-center">C++ Implementation</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Object-oriented design</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Powerful layout system</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Signal/slot event mechanism</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>More widget types</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Responsive design capabilities</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">✗</span>
                    <span>Larger code footprint</span>
                  </li>
                </ul>
                <div className="mt-6 text-center">
                  <Button 
                    onClick={() => setLanguage('cpp')}
                    variant={language === 'cpp' ? "default" : "outline"}
                    className={language === 'cpp' ? "bg-fern-600 hover:bg-fern-700" : ""}
                  >
                    Choose C++ Implementation
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-fern-600 to-blue-600 text-white">
          <div className="container px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-pixel mb-4">Ready to start building?</h2>
              <p className="text-xl mb-8 font-pixel-text">
                Fern makes it easy to create interactive graphics applications with {language === 'cpp' ? 'modern C++' : 'simple C'} code.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button asChild size="lg" className="gap-2 btn-pixel bg-white text-fern-600 hover:bg-gray-100 shadow-lg">
                  <Link to="/docs" className="!text-fern-600">
                    Get Started
                    <ArrowRight size={18} />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="gap-2 btn-pixel border-white text-white hover:bg-white/10">
                  <a href="https://github.com/RishiAhuja/fern" target="_blank" rel="noopener noreferrer">
                    <Code size={18} />
                    View on GitHub
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

export default Index;
