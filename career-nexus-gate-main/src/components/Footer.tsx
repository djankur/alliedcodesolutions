import { Building2, Mail, Phone, MapPin, Linkedin, Twitter, Facebook } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="relative bg-slate-900 text-white overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(rgba(59, 130, 246, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.5) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }}></div>
      </div>
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">

              <img
                src="/logo.png"
                alt="Syntrionix Technologies"
                className="h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />


            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Connecting exceptional talent with outstanding opportunities. Your trusted partner in professional recruitment and career development.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.linkedin.com/company/108701289/admin/dashboard/"
                className="p-2 bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 hover:border-blue-400/50 transition-all duration-300 group"
              >
                <Linkedin className="w-5 h-5 text-gray-400 group-hover:text-blue-400 transition-colors" />
              </a>
              {/* <a 
                href="#" 
                className="p-2 bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 hover:border-cyan-400/50 transition-all duration-300 group"
              >
                <Twitter className="w-5 h-5 text-gray-400 group-hover:text-cyan-400 transition-colors" />
              </a>
              <a 
                href="#" 
                className="p-2 bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 hover:border-blue-400/50 transition-all duration-300 group"
              >
                <Facebook className="w-5 h-5 text-gray-400 group-hover:text-blue-400 transition-colors" />
              </a> */}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="font-bold text-lg text-white relative inline-block">
              Quick Links
              <div className="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"></div>
            </h3>
            <ul className="space-y-3">
              <li>
                <a href="/" className="text-gray-400 hover:text-white transition-colors text-sm flex items-center group">
                  <span className="w-0 group-hover:w-2 h-0.5 bg-blue-400 transition-all duration-300 mr-0 group-hover:mr-2 rounded-full"></span>
                  Home
                </a>
              </li>
              <li>
                <a href="/services" className="text-gray-400 hover:text-white transition-colors text-sm flex items-center group">
                  <span className="w-0 group-hover:w-2 h-0.5 bg-blue-400 transition-all duration-300 mr-0 group-hover:mr-2 rounded-full"></span>
                  Services
                </a>
              </li>
              <li>
                <a href="/about" className="text-gray-400 hover:text-white transition-colors text-sm flex items-center group">
                  <span className="w-0 group-hover:w-2 h-0.5 bg-blue-400 transition-all duration-300 mr-0 group-hover:mr-2 rounded-full"></span>
                  About Us
                </a>
              </li>
              <li>
                <a href="/contact" className="text-gray-400 hover:text-white transition-colors text-sm flex items-center group">
                  <span className="w-0 group-hover:w-2 h-0.5 bg-blue-400 transition-all duration-300 mr-0 group-hover:mr-2 rounded-full"></span>
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-6">
            <h3 className="font-bold text-lg text-white relative inline-block">
              Services
              <div className="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"></div>
            </h3>
            <ul className="space-y-3">
              <li className="text-gray-400 text-sm flex items-center">
                <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-3"></span>
                Executive Search
              </li>
              <li className="text-gray-400 text-sm flex items-center">
                <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full mr-3"></span>
                Permanent Placement
              </li>
              <li className="text-gray-400 text-sm flex items-center">
                <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-3"></span>
                Contract Staffing
              </li>
              <li className="text-gray-400 text-sm flex items-center">
                <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full mr-3"></span>
                Career Coaching
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h3 className="font-bold text-lg text-white relative inline-block">
              Contact Info
              <div className="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"></div>
            </h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 group">
                <div className="mt-1 p-2 bg-blue-500/20 rounded-lg group-hover:bg-blue-500/30 transition-colors">
                  <Mail className="w-4 h-4 text-blue-400" />
                </div>
                <span className="text-gray-400 text-sm group-hover:text-white transition-colors">hr@syntrionix.com
                </span>
              </div>
              <div className="flex items-center space-x-3 group">
                <div className="mt-1 p-2 bg-cyan-500/20 rounded-lg group-hover:bg-cyan-500/30 transition-colors">
                  <Phone className="w-4 h-4 text-cyan-400" />
                </div>
                <span className="text-gray-400 text-sm group-hover:text-white transition-colors">
                  +1 602 99 1445
                </span>
              </div>
              <div className="flex items-start space-x-3 group">
                <div className="mt-1 p-2 bg-purple-500/20 rounded-lg group-hover:bg-purple-500/30 transition-colors">
                  <MapPin className="w-4 h-4 text-purple-400" />
                </div>
                <span className="text-gray-400 text-sm group-hover:text-white transition-colors">
                  1839 W Spur Dr, Phoenix, AZ 85085, USA
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-500 text-sm">
              © 2026 Syntrionix Technologies. All rights reserved.
            </p>
            <div className="flex space-x-8">
              <a
                href="/privacy-policy"
                onClick={() => window.scrollTo(0, 0)}
                className="text-sm text-gray-400 hover:text-blue-400 transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="/terms-and-conditions"
                onClick={() => window.scrollTo(0, 0)}
                className="text-sm text-gray-400 hover:text-cyan-400 transition-colors"
              >
                Terms & Conditions
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}