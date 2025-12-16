import { Award, Users, Target, TrendingUp, Heart, Shield, Zap, CheckCircle, Globe, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-image.jpg";

const About = () => {
  const values = [
    {
      icon: <Heart className="w-8 h-8 text-white" />,
      title: "Integrity",
      description: "We build trust through transparency, ethics, and accountability in every engagement.",
      gradient: "from-blue-500 to-blue-600"
    },
    {
      icon: <Users className="w-8 h-8 text-white" />,
      title: "Partnership",
      description: "We treat every client relationship as a long-term collaboration, not a transaction.",
      gradient: "from-emerald-500 to-emerald-600"
    },
    {
      icon: <Award className="w-8 h-8 text-white" />,
      title: "Quality",
      description: "We deliver excellence in every hire — ensuring technical skill, cultural fit, and business alignment.",
      gradient: "from-purple-500 to-purple-600"
    },
    {
      icon: <Zap className="w-8 h-8 text-white" />,
      title: "Speed",
      description: "We understand urgency. Our streamlined hiring processes ensure faster results without compromising quality.",
      gradient: "from-orange-500 to-orange-600"
    },
    {
      icon: <Lock className="w-8 h-8 text-white" />,
      title: "Compliance",
      description: "We adhere to all labor, immigration, and employment regulations to protect our clients and workforce.",
      gradient: "from-cyan-500 to-cyan-600"
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-white" />,
      title: "Innovation",
      description: "We integrate technology, analytics, and automation to enhance recruitment efficiency and candidate experience.",
      gradient: "from-pink-500 to-pink-600"
    },
  ];

  const stats = [
    // { number: "10+", label: "Years of Experience" },
    // { number: "5000+", label: "Successful Placements" },
    // { number: "500+", label: "Partner Companies" },
    // { number: "95%", label: "Client Satisfaction" },
  ];

  const highlights = [
    "Founded by professionals with over a decade of US staffing experience",
    "Combines industry insights with strategic mindset for measurable results",
    "Global network spanning USA, India, and Latin America",
    "Technology-driven approach with personalized service"
  ];

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden bg-slate-900">
      {/* <section className="relative min-h-screen flex items-center overflow-hidden bg-slate-900"> */}

        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          {/* <img
            src={heroImage}
            alt="About AlliedCodeSolutions"
            className="w-full h-full object-cover opacity-40"
          /> */}
                    {/* Animated Grid Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: 'linear-gradient(rgba(59, 130, 246, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.5) 1px, transparent 1px)',
              backgroundSize: '50px 50px'
            }}></div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900/15 via-blue-900/50 to-slate-900/15"></div>
        </div>

        <div className="relative z-10 w-full py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              {/* Left Side */}
              <div className="text-white space-y-8">


                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight">
                  <span className="block text-white">AlliedCode</span>
                  <span className="block bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                    Solutions
                  </span>
                </h1>

                <p className="text-xl text-gray-300 leading-relaxed">
                  A dynamic and technology-driven staffing company connecting exceptional talent with leading organizations across the United States.
                   AlliedCodeSolutions is built on decades of experience in recruitment,
                   operations, and digital transformation — creating a bridge between
                  innovative companies and skilled professionals worldwide.
                   We believe in people-first partnerships. Every client engagement is an
                  opportunity to understand your business goals and deliver a workforce
                  solution that fits seamlessly into your culture and growth plan.
                          Our expertise spans IT, engineering, healthcare, finance, marketing, and
        emerging technologies — powered by a global network of recruiters and
        industry experts. <strong>We are not just recruiters — we are your growth
        partners</strong>, helping you scale smarter, faster, and more
        efficiently.
                
                </p>

                <div className="grid grid-cols-2 gap-6 pt-8 border-t border-white/10">
                  {stats.slice(0, 2).map((stat, index) => (
                    <div key={index}>
                      <div className="text-3xl font-bold text-blue-400">{stat.number}</div>
                      <div className="text-sm text-gray-400">{stat.label}</div>
                    </div>
                  ))}
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
                    {/* <Globe className="w-16 h-16 text-blue-400 mb-6" /> */}
              {/* <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-3xl p-8 shadow-xl border border-gray-100"> */}
                {/* <Target className="w-12 h-12 text-blue-600 mb-6" /> */}
                {/* <h3 className="text-2xl font-bold text-gray-50 mb-6">Why AlliedCodeSolutions?</h3> */}
                <ul className="space-y-5">
                  {highlights.map((highlight, index) => (
                    <li key={index} className="flex items-start space-x-4">
                      <CheckCircle className="w-6 h-6 text-emerald-500 mt-1 flex-shrink-0" />
                      <span className="text-gray-100 text-lg leading-relaxed">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
                    <div className="grid grid-cols-2 gap-4 pt-6 border-t border-white/10">
                      {stats.slice(2).map((stat, index) => (
                        <div key={index}>
                          <div className="text-2xl font-bold text-cyan-400">{stat.number}</div>
                          <div className="text-xs text-gray-400">{stat.label}</div>
                        </div>
                      ))}
                    </div>
        
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        {/* <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
          <div className="flex flex-col items-center gap-2 text-white/60 animate-bounce">
            <span className="text-sm">Learn more</span>
            <div className="w-6 h-10 border-2 border-white/40 rounded-full flex items-start justify-center p-2">
              <div className="w-1 h-3 bg-white/60 rounded-full"></div>
            </div>
          </div>
        </div> */}
      </section>



    

    </div>
  );
};

export default About;