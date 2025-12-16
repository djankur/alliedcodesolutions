// ===== COMPLETE INDEX.TSX - ALLIEDCODESOLUTIONS =====

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Briefcase, Users, TrendingUp, Award, ArrowRight, CheckCircle, Star, Globe, Shield, Zap, Target, Lock } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";
import { Link } from "react-router-dom";

const Index = () => {

  const features = [
    {
      icon: <Users className="w-8 h-8 text-white" />,
      title: "People-First Partnerships",
      description: "We believe in building lasting relationships. Every engagement is an opportunity to understand your goals and deliver workforce solutions that fit your culture.",
      gradient: "from-blue-500 to-blue-600"
    },
    {
      icon: <Zap className="w-8 h-8 text-white" />,
      title: "Speed & Efficiency",
      description: "We understand urgency. Our streamlined processes ensure faster results without compromising on quality or cultural fit.",
      gradient: "from-emerald-500 to-emerald-600"
    },
    {
      icon: <Globe className="w-8 h-8 text-white" />,
      title: "Global Talent Network",
      description: "Access skilled professionals from across the globe through our extensive network spanning USA, India, and Latin America.",
      gradient: "from-purple-500 to-purple-600"
    }
  ];

  const stats = [
    { number: "10+", label: "Years Experience" },
    { number: "500+", label: "Partner Companies" },
    { number: "5000+", label: "Successful Placements" },
    { number: "95%", label: "Client Satisfaction" }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "VP of Engineering",
      company: "TechVenture Inc",
      content: "AlliedCodeSolutions helped us scale our engineering team rapidly. Their understanding of our needs and speed of delivery was exceptional.",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "HR Director",
      company: "FinServ Global",
      content: "The quality of talent and professionalism throughout the hiring process exceeded our expectations. True growth partners.",
      rating: 5
    },
    {
      name: "Emily Rodriguez",
      role: "Operations Manager",
      company: "HealthTech Solutions",
      content: "Their nearshore staffing solution was exactly what we needed. Seamless collaboration and exceptional talent delivery.",
      rating: 5
    }
  ];

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-slate-900">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Global staffing and workforce solutions"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900/15 via-blue-900/50 to-slate-900/15"></div>
        </div>

        <div className="relative z-10 w-full py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              
              {/* Left: Main Content */}
              <div className="text-white space-y-8">
                {/* Badge */}
                {/* <div className="inline-flex items-center gap-2 bg-blue-500/20 backdrop-blur-sm border border-blue-400/30 rounded-full px-4 py-2 text-sm font-medium text-blue-300">
                  <Globe className="w-4 h-4" />
                  <span>Global Workforce Solutions</span>
                </div> */}

                {/* Main Headline */}
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight">
                  <span className="block text-white">Empowering</span>
                  <span className="block text-white">People.</span>
                  <span className="block bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                    Engineering Solutions.
                  </span>
                </h1>

                {/* Subheadline */}
                <p className="text-xl text-gray-300 leading-relaxed max-w-xl">
                  Delivering global staffing and workforce solutions that bridge
                  businesses and talent across borders.
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Link to="/contact" onClick={() => window.scrollTo(0, 0)}>
                    <Button className="group relative bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-2xl hover:shadow-blue-500/50 transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 w-full sm:w-auto">
                      Partner With Us
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>

                  <Link to="/services" onClick={() => window.scrollTo(0, 0)}>
                    <Button className="group bg-white/10 backdrop-blur-sm border-2 border-white/30 hover:bg-white/20 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 w-full sm:w-auto">
                      Hire Talent Now
                      <Briefcase className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    </Button>
                  </Link>
                </div>

                {/* Stats */}
                {/* <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/10">
                  <div>
                    <div className="text-3xl font-bold text-blue-400">500+</div>
                    <div className="text-sm text-gray-400">Partner Companies</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-blue-400">5K+</div>
                    <div className="text-sm text-gray-400">Placements</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-blue-400">95%</div>
                    <div className="text-sm text-gray-400">Satisfaction</div>
                  </div>
                </div> */}
              </div>

              {/* Right: Feature Card */}
              <div className="lg:pl-8">
                <div className="relative">
                  {/* Decorative Elements */}
                  <div className="absolute -top-4 -right-4 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl"></div>
                  <div className="absolute -bottom-4 -left-4 w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl"></div>
                  
                  {/* Main Card */}
                  <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20 hover:border-white/40 transition-all duration-300">
                    {/* Company Overview */}
                    <div className="mb-6">
                      <h3 className="text-2xl font-bold text-white mb-4">
                        AlliedCodeSolutions
                      </h3>
                      <p className="text-gray-200 leading-relaxed">
                        A global staffing and workforce solutions company specializing in delivering the right
                        talent at the right time. From contract staffing to project-based
                        hiring and nearshore partnerships, we help US businesses accelerate
                        growth through people, process, and technology.
                      </p>
                    </div>

                    {/* Key Services */}
                    <div className="space-y-4 pt-6 border-t border-white/10">
                      <h4 className="text-sm font-semibold text-blue-300 uppercase tracking-wider mb-4">
                        Our Expertise
                      </h4>
                      
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                          <Users className="w-5 h-5 text-blue-400" />
                        </div>
                        <div>
                          <div className="font-semibold text-white">Contract Staffing</div>
                          <div className="text-sm text-gray-300">Flexible workforce solutions</div>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center flex-shrink-0">
                          <Briefcase className="w-5 h-5 text-cyan-400" />
                        </div>
                        <div>
                          <div className="font-semibold text-white">Project-Based Hiring</div>
                          <div className="text-sm text-gray-300">Specialized talent teams</div>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                          <Globe className="w-5 h-5 text-purple-400" />
                        </div>
                        <div>
                          <div className="font-semibold text-white">Nearshore Partnerships</div>
                          <div className="text-sm text-gray-300">Global talent access</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
          <div className="flex flex-col items-center gap-2 text-white/60 animate-bounce">
            <span className="text-sm">Scroll to explore</span>
            <div className="w-6 h-10 border-2 border-white/40 rounded-full flex items-start justify-center p-2">
              <div className="w-1 h-3 bg-white/60 rounded-full"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center bg-blue-50 px-4 py-2 rounded-full text-blue-700 text-sm font-semibold mb-6">
              Why Choose AlliedCodeSolutions?
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Your Growth Partners
              <span className="block text-blue-600">Not Just Recruiters</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              We combine deep industry expertise with a strategic mindset to drive measurable results. Scale smarter, faster, and more efficiently with AlliedCodeSolutions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-gray-200 overflow-hidden"
              >
                {/* Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-5 transition-opacity duration-500 from-blue-500 to-purple-600"></div>
                
                <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-xl mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-700 transition-colors duration-300">
                  {feature.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

    {/* Services Preview */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            {/* Left Side */}
            <div>
              <div className="inline-flex items-center bg-blue-100 px-4 py-2 rounded-full text-blue-700 text-sm font-semibold mb-6">
                <Briefcase className="w-4 h-4 mr-2" />
                Our Services
              </div>

              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Comprehensive
                <span className="block text-blue-600">Staffing Solutions</span>
              </h2>

              <p className="text-xl text-gray-600 mb-10 leading-relaxed">
                From project-based staffing to direct hire and nearshore partnerships, we deliver tailored workforce solutions that align with your business goals.
              </p>

              <div className="space-y-4 mb-10">
                {[
                  "Project-Based & Contract Staffing",
                  "Contract-to-Hire (C2H) Solutions",
                  "Direct Hire & Permanent Placement",
                  "Nearshore & Offshore Hiring"
                ].map((service, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-4 p-4 rounded-xl hover:bg-white/50 transition-colors duration-300"
                  >
                    <div className="flex-shrink-0">
                      <CheckCircle className="w-6 h-6 text-emerald-500 mt-1" />
                    </div>
                    <span className="text-gray-700 font-medium text-lg">{service}</span>
                  </div>
                ))}
              </div>
              <Link to="/services" onClick={() => window.scrollTo(0, 0)}>
                <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
                  Explore All Services
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>

{/* Right Side - Cards */}
<div className="relative">
  <div className="grid grid-cols-2 gap-6">
    {[
      {
        title: "Compliance First",
        desc: "Full adherence to labor, immigration, and employment regulations.",
        icon: <Shield className="w-6 h-6 text-white" />,
        gradient: "from-blue-500 to-blue-600"
      },
      {
        title: "Speed & Quality",
        desc: "Streamlined processes for faster results without compromise.",
        icon: <Zap className="w-6 h-6 text-white" />,
        gradient: "from-emerald-500 to-emerald-600"
      },
      {
        title: "Global Network",
        desc: "Access talent from USA, India, and Latin America.",
        icon: <Globe className="w-6 h-6 text-white" />,
        gradient: "from-purple-500 to-purple-600"
      },
      {
        title: "Industry Focus",
        desc: "Expertise across IT, engineering, healthcare, finance, and more.",
        icon: <Target className="w-6 h-6 text-white" />,
        gradient: "from-orange-500 to-orange-600"
      }
    ].map((card, index) => (
      <div
        key={index}
        className="bg-white rounded-2xl p-8 h-64 flex flex-col justify-between border border-gray-100 shadow-lg 
                   transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-2xl 
                   hover:border-transparent hover:bg-gradient-to-br hover:from-white hover:to-gray-50
                   relative overflow-hidden group"
      >
        {/* Hover gradient ring effect */}
        <div
          className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-500
                      bg-gradient-to-br ${card.gradient} blur-[60px]`}
        ></div>

        <div className="relative z-10">
          <div
            className={`w-12 h-12 bg-gradient-to-br ${card.gradient} rounded-xl flex items-center justify-center mb-6 shadow-md`}
          >
            {card.icon}
          </div>
          <h4 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-700 transition-colors duration-300">
            {card.title}
          </h4>
          <p className="text-gray-600 group-hover:text-gray-800 transition-colors duration-300">
            {card.desc}
          </p>
        </div>
      </div>
    ))}
  </div>
</div>


          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center bg-blue-50 px-4 py-2 rounded-full text-blue-700 text-sm font-semibold mb-6">
              Our Core Values
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Principles That
              <span className="block text-blue-600">Drive Our Success</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              These core values guide every interaction and decision, ensuring we deliver exceptional service and build lasting relationships.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Lock className="w-8 h-8 text-white" />,
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
                icon: <Shield className="w-8 h-8 text-white" />,
                title: "Compliance",
                description: "We adhere to all labor, immigration, and employment regulations to protect our clients and workforce.",
                gradient: "from-cyan-500 to-cyan-600"
              },
              {
                icon: <TrendingUp className="w-8 h-8 text-white" />,
                title: "Innovation",
                description: "We integrate technology, analytics, and automation to enhance recruitment efficiency and candidate experience.",
                gradient: "from-pink-500 to-pink-600"
              }
            ].map((value, index) => (
              <div
                key={index}
                className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-gray-200 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-5 transition-opacity duration-500 from-blue-500 to-purple-600"></div>
                
                <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${value.gradient} rounded-xl mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  {value.icon}
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-700 transition-colors duration-300">
                  {value.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      {/* <section className="py-24 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-blue-100 px-4 py-2 rounded-full text-blue-700 text-sm font-semibold mb-6">
              Client Success Stories
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">What Our Clients Say</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Hear from companies who have experienced accelerated growth through our workforce solutions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="bg-white border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <CardContent className="p-8">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 italic mb-6 leading-relaxed">"{testimonial.content}"</p>
                  <div>
                    <div className="font-semibold text-gray-900 text-lg">{testimonial.name}</div>
                    <div className="text-gray-600 text-sm">{testimonial.role}</div>
                    <div className="text-blue-600 text-sm font-medium mt-1">{testimonial.company}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section> */}

      {/* CTA Section */}
      {/* <section className="py-16 gradient-hero">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="heading-section text-primary-foreground mb-6">Ready to Scale Your Workforce?</h2>
          <p className="text-lead text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Whether you need specialized talent or long-term workforce solutions, we're here to help you grow.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" onClick={() => window.scrollTo(0, 0)}>
              <Button className="btn-hero">Contact Us Today</Button>
            </Link>
            
            <Link to="/services" onClick={() => window.scrollTo(0, 0)}>
              <Button className="btn-secondary bg-primary-foreground text-primary hover:bg-primary-foreground/90">
                Explore Our Services
              </Button>
            </Link>
          </div>
        </div>
      </section> */}
    </div>
  );
};

export default Index;