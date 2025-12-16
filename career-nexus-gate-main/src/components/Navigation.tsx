import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Building2, User, Briefcase } from "lucide-react";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const isActive = (href: string) => location.pathname === href;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
              <img
                src="/logo.png"
                alt="Allied Code Solutions"
                className="h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />

              <span className="font-poppins font-bold text-xl text-gray-900 whitespace-nowrap">
                {/* Allied Code Solutions */}
              </span>
          </Link>


          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => {
                  setIsMenuOpen(false);
                  window.scrollTo(0, 0);
                }}
                className={`font-medium text-sm transition-colors duration-200 ${
                  isActive(item.href)
                    ? "text-blue-600 border-b-2 border-blue-600 pb-1"
                    : "text-gray-600 hover:text-blue-600"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 animate-fade-in-up">
          <div className="px-4 py-4 space-y-3">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setIsMenuOpen(false)}
                className={`block font-medium text-sm py-2 rounded-md px-2 transition duration-200 ${
                  isActive(item.href)
                    ? "text-blue-600 bg-blue-50"
                    : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                }`}
              >
                {item.name}
              </Link>
            ))}

            {/* CTA Buttons for Mobile */}
            {/* <div className="pt-4 border-t border-gray-200 space-y-2">
              <Button
                variant="outline"
                className="w-full justify-start text-sm flex items-center gap-2"
              >
                <User className="w-4 h-4" />
                Job Seekers
              </Button>
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm flex items-center gap-2">
                <Briefcase className="w-4 h-4" />
                Employers
              </Button>
            </div> */}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
