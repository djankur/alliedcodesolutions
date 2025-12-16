import { Scale, FileCheck, AlertCircle, UserCheck, Building, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const TermsAndConditions = () => {
  const sections = [
    {
      icon: <UserCheck className="w-6 h-6" />,
      title: "Acceptance of Terms",
      content: "By accessing and using AlliedCodeSolutions' services, you acknowledge that you have read, understood, and agree to be bound by these terms and conditions. If you do not agree, please discontinue use of our services immediately.",
      gradient: "from-blue-500 to-blue-600"
    },
    {
      icon: <Building className="w-6 h-6" />,
      title: "Use of Services",
      content: "You agree to use our recruitment and staffing services only for lawful purposes. You must not misuse our platform, engage in fraudulent activities, or violate any applicable employment laws. We reserve the right to suspend or terminate access for violations.",
      gradient: "from-emerald-500 to-emerald-600"
    },
    {
      icon: <FileCheck className="w-6 h-6" />,
      title: "User Responsibilities",
      content: "Users must provide accurate, complete, and up-to-date information. Employers must ensure job postings are legitimate and comply with employment laws. Candidates must accurately represent their qualifications and work history.",
      gradient: "from-purple-500 to-purple-600"
    },
    {
      icon: <AlertCircle className="w-6 h-6" />,
      title: "Limitation of Liability",
      content: "AlliedCodeSolutions is not liable for any indirect, incidental, consequential, or punitive damages arising from the use or inability to use our services. We do not guarantee employment outcomes or specific placements.",
      gradient: "from-orange-500 to-orange-600"
    },
    {
      icon: <Scale className="w-6 h-6" />,
      title: "Intellectual Property",
      content: "All content, trademarks, and materials on our platform are owned by AlliedCodeSolutions. You may not reproduce, distribute, or create derivative works without our explicit written permission.",
      gradient: "from-cyan-500 to-cyan-600"
    },
    {
      icon: <FileCheck className="w-6 h-6" />,
      title: "Service Modifications",
      content: "We reserve the right to modify, suspend, or discontinue any part of our services at any time without prior notice. We may also update these terms periodically, and continued use constitutes acceptance of revised terms.",
      gradient: "from-pink-500 to-pink-600"
    }
  ];

  const highlights = [
    "Fair and transparent business practices",
    "Commitment to legal compliance and ethical standards",
    "Protection of both client and candidate interests",
    "Clear guidelines for service usage and expectations",
    "Regular updates to reflect industry best practices"
  ];

  return (
    <div className="pt-16">
      {/* Hero Section */}
<section className="relative min-h-[60vh] flex items-center overflow-hidden bg-slate-900">
        {/* Animated Grid Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(rgba(59, 130, 246, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.5) 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }}></div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/15 via-blue-900/50 to-slate-900/15"></div>

        <div className="relative z-10 w-full py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              {/* Left Side */}
              <div className="text-white space-y-8">
         

  
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight">
                  <span className="block text-white">Terms</span>
                  <span className="block bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                                       Conditions

                  </span>
                </h1>

                <p className="text-xl text-gray-300 leading-relaxed">
                  These terms govern your use of AlliedCodeSolutions' services. Please read them carefully to understand your rights and obligations when engaging with our platform and recruitment services.
                </p>

                <div className="pt-4">
                  <p className="text-sm text-gray-400">Effective Date: November 2025</p>
                </div>
              </div>

              {/* Right Side Card */}
              <div className="lg:pl-8">
                <div className="relative">
                  {/* Decorative Elements */}
                  <div className="absolute -top-4 -right-4 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl"></div>
                  <div className="absolute -bottom-4 -left-4 w-72 h-72 bg-blued-500/20 rounded-full blur-3xl"></div>
                  
                  {/* Main Card */}
                  <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20 hover:border-white/40 transition-all duration-300">
                    <h3 className="text-2xl font-bold text-white mb-6">Our Principles</h3>
                    <ul className="space-y-5">
                      {highlights.map((highlight, index) => (
                        <li key={index} className="flex items-start space-x-4">
                          <CheckCircle className="w-6 h-6 text-emerald-400 mt-1 flex-shrink-0" />
                          <span className="text-gray-100 text-lg leading-relaxed">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


    </div>
  );
};

export default TermsAndConditions;