
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowRight, Package, Zap, Code, Activity } from "lucide-react";
import FeatureCard from '@/components/FeatureCard';
import CodeBlock from '@/components/CodeBlock';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { docsData } from '@/lib/docsData';

const Index = () => {
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
                A lightweight WebAssembly-based graphics library for creating visual interactive applications using simple C code.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button asChild size="lg" className="gap-2 btn-pixel bg-fern-600 hover:bg-fern-700 shadow-lg">
                  <Link to="/quick-start">
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

        {/* Features Section */}
        <section className="py-20">
          <div className="container px-4">
            <h2 className="text-3xl font-pixel text-center mb-12">Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
            </div>
          </div>
        </section>

        {/* Code Example Section */}
        <section className="py-16 bg-secondary">
          <div className="container px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-pixel mb-8 text-center">Quick Example</h2>
              <div className="bg-card rounded-lg overflow-hidden shadow-lg pixel-border">
                <CodeBlock 
                  code={docsData.quickStartCode}
                  language="c"
                  fileName="main.c"
                />
              </div>
              <div className="mt-8 text-center">
                <Button asChild className="btn-pixel bg-fern-600 hover:bg-fern-700">
                  <Link to="/quick-start">
                    See More Examples
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="container px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-pixel mb-4">Ready to start building?</h2>
              <p className="text-xl text-muted-foreground mb-8 font-pixel-text">
                Fern makes it easy to create interactive graphics applications with simple C code.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button asChild size="lg" className="gap-2 btn-pixel bg-fern-600 hover:bg-fern-700 shadow-lg">
                  <Link to="/quick-start">
                    Get Started
                    <ArrowRight size={18} />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="gap-2 btn-pixel">
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
