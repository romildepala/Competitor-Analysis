import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Eye } from "lucide-react";

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
  return <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? "bg-white shadow-md py-2" : "bg-transparent py-4"}`}>
    <div className="container max-w-[1100px] mx-auto flex justify-between items-center">
      <div className="flex items-center gap-2">
        <Link to="/" className="flex items-center gap-2">
          <img 
            src="/lovable-uploads/fce5ec2f-a6af-4890-b209-b249cff5a0b3.png" 
            alt="Spyer Logo" 
            className="h-6 w-6"
          />
          <div className="text-2xl font-bold text-brand-blue">Spyer</div>
        </Link>
      </div>
      <nav className="hidden md:flex space-x-8">
        <a href="#features" className="font-medium hover:text-brand-blue transition-colors">Features</a>
        <a href="#how-it-works" className="font-medium hover:text-brand-blue transition-colors">How it Works</a>
        <a href="#pricing" className="font-medium hover:text-brand-blue transition-colors">Pricing</a>
        <a href="#testimonials" className="font-medium hover:text-brand-blue transition-colors">Testimonials</a>
      </nav>
      <div className="flex items-center">
        <Button className="bg-brand-blue hover:bg-brand-darkBlue" asChild>
          <Link to="/onboarding">Get Started</Link>
        </Button>
      </div>
    </div>
  </header>;
};

export default Header;
