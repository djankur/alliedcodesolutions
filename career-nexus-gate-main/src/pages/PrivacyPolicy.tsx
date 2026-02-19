import { Shield, Lock, Eye, FileText, Users, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const PrivacyPolicy = () => {
  const sections = [
    {
      icon: <FileText className="w-6 h-6" />,
      title: "Information We Collect",
      content: "We collect personal information including your name, email, contact details, and professional data when you use our services. This may include resume information, work history, skills, certifications, and preferences related to job opportunities.",
      gradient: "from-blue-500 to-blue-600"
    },
    {
      icon: <Eye className="w-6 h-6" />,
      title: "How We Use Information",
      content: "Your information is used for providing recruitment services, matching you with suitable opportunities, improving our offerings, and communicating with you effectively. We may also use aggregated data for analytics and service enhancement.",
      gradient: "from-emerald-500 to-emerald-600"
    },
    {
      icon: <Lock className="w-6 h-6" />,
      title: "Data Security",
      content: "We employ robust security measures including encryption, access controls, and regular security audits to protect your data from unauthorized access, disclosure, or misuse. Your data is stored on secure servers with industry-standard protection.",
      gradient: "from-purple-500 to-purple-600"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Information Sharing",
      content: "We only share your information with potential employers with your explicit consent, or as required by law. We do not sell your personal data to third parties. Partner companies receive information solely for legitimate recruitment purposes.",
      gradient: "from-orange-500 to-orange-600"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Your Rights",
      content: "You have the right to access, update, or delete your personal information at any time. You can opt-out of communications, request data portability, and withdraw consent where applicable under privacy regulations like GDPR and CCPA.",
      gradient: "from-cyan-500 to-cyan-600"
    }
  ];

  const highlights = [
    "Full transparency in data collection and usage",
    "Industry-standard encryption and security protocols",
    "Compliance with GDPR, CCPA, and international privacy laws",
    "Regular security audits and vulnerability assessments",
    "Dedicated privacy team for all concerns"
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
                {/* <div className="inline-flex items-center gap-3 bg-blue-500/20 backdrop-blur-sm px-4 py-2 rounded-full border border-blue-400/30">
                  <Shield className="w-5 h-5 text-blue-400" />
                  <span className="text-sm font-medium text-blue-300">Your Privacy Matters</span>
                </div> */}

                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight">
                  <span className="block text-white">Privacy</span>
                  <span className="block bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                    Policy
                  </span>
                </h1>

                <p className="text-xl text-gray-300 leading-relaxed">
                  At Syntrionix Technologies, we are committed to protecting your privacy and ensuring the security of your personal information. This policy outlines how we collect, use, and safeguard your data.
                </p>

                <div className="pt-4">
                  <p className="text-sm text-gray-400">Last Updated: November 2025</p>
                </div>
              </div>

              {/* Right Side Card */}
              <div className="lg:pl-8">
                <div className="relative">
                  {/* Decorative Elements */}
                  <div className="absolute -top-4 -right-4 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl"></div>
                  <div className="absolute -bottom-4 -left-4 w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl"></div>

                  {/* Main Card */}
                  <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20 hover:border-white/40 transition-all duration-300">
                    <h3 className="text-2xl font-bold text-white mb-6">Our Commitments</h3>
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

export default PrivacyPolicy;