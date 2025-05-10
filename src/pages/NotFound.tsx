
import React from "react";
import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const NotFound = () => {
  const location = useLocation();

  React.useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow flex items-center justify-center">
        <div className="text-center px-4 py-16">
          <h1 className="text-6xl font-bold mb-4 text-muted-foreground">404</h1>
          <p className="text-2xl mb-8">This page is lost in the pixel forest</p>
          <div className="mb-8">
            <div className="inline-block p-6 bg-secondary rounded-lg">
              <img 
                src="/lovable-uploads/4436af5f-ff0f-459d-b3f7-41c58f50b55f.png"
                alt="Fern Graphics Logo"
                className="w-24 h-24 opacity-70"
              />
            </div>
          </div>
          <Button asChild>
            <Link to="/">
              Return to Home Page
            </Link>
          </Button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default NotFound;
