
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolled]);

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      scrolled ? "bg-white shadow-md py-2" : "bg-transparent py-4"
    }`}>
      <div className="container flex justify-between items-center">
        <div className="flex items-center">
          <div className="text-2xl font-bold text-brand-blue">CompanyRadar</div>
        </div>
        <nav className="hidden md:flex space-x-8">
          <a href="#features" className="font-medium hover:text-brand-blue transition-colors">Features</a>
          <a href="#how-it-works" className="font-medium hover:text-brand-blue transition-colors">How it Works</a>
          <a href="#pricing" className="font-medium hover:text-brand-blue transition-colors">Pricing</a>
          <a href="#testimonials" className="font-medium hover:text-brand-blue transition-colors">Testimonials</a>
        </nav>
        <div className="flex items-center space-x-4">
          <Button variant="outline" className="hidden md:inline-flex">Log In</Button>
          <Button className="bg-brand-blue hover:bg-brand-darkBlue">Get Started</Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
