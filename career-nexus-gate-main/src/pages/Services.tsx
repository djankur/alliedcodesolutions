import { CheckCircle, Users, Target, Briefcase, UserCheck, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";

const Services = () => {
  const services = [
  {
    icon: <Target className="w-12 h-12 text-blue-400" />,
    title: "Project-Based Staffing",
    description:
      "Tailored teams for short-term or specialized projects designed to deliver immediate impact and fast execution.",
    features: [
      "Dedicated Project Teams",
      "Specialized Skill Deployment",
      "Rapid Ramp-Up",
      "Short-Term Delivery Focus",
    ],
  },
  {
    icon: <Users className="w-12 h-12 text-cyan-400" />,
    title: "Contract Staffing",
    description:
      "Flexible professionals for temporary or long-term assignments aligned with evolving project requirements.",
    features: [
      "Temporary Workforce",
      "Long-Term Contractors",
      "Skill-Specific Assignments",
      "Flexible Durations",
    ],
  },
  {
    icon: <Briefcase className="w-12 h-12 text-purple-400" />,
    title: "Contract-to-Hire (C2H)",
    description:
      "Evaluate talent performance on the job before making long-term hiring decisions with confidence.",
    features: [
      "Risk-Free Hiring Model",
      "Performance Evaluation",
      "Smooth Transition to Full-Time",
      "Reduced Hiring Costs",
    ],
  },
  {
    icon: <UserCheck className="w-12 h-12 text-emerald-400" />,
    title: "Direct Hire",
    description:
      "Full-time recruitment solutions to help you onboard top-tier professionals into your core team.",
    features: [
      "Full-Time Placements",
      "Leadership & Mid-Level Roles",
      "Skill & Culture Fit Assessment",
      "End-to-End Hiring Support",
    ],
  },
  {
    icon: <TrendingUp className="w-12 h-12 text-pink-400" />,
    title: "Nearshore Hiring",
    description:
      "Access skilled talent from neighboring regions for seamless collaboration across similar time zones.",
    features: [
      "Time-Zone Alignment",
      "Cost-Efficient Talent",
      "Fast Communication Cycles",
      "High Productivity Teams",
    ],
  },
  {
    icon: <Users className="w-12 h-12 text-amber-400" />,
    title: "Offshore Hiring",
    description:
      "Scale efficiently with qualified professionals from global talent hubs at highly competitive costs.",
    features: [
      "Global Talent Pool",
      "Cost Optimization",
      "24/7 Productivity Options",
      "Scalable Teams",
    ],
  },
];


  return (
    <div className="pt-16">

      {/* ---------------------------------------------------------------- */}
      {/* HERO SECTION — matches About page UI */}
      {/* ---------------------------------------------------------------- */}

      <section className="relative min-h-[60vh] flex items-center overflow-hidden bg-slate-900">

        {/* Grid Background */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(rgba(59,130,246,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.4) 1px, transparent 1px)",
              backgroundSize: "50px 50px",
            }}
          />
        </div>

        {/* Tint Layer */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/10 via-blue-900/40 to-slate-800/10" />

        <div className="relative z-10 w-full py-20">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6">
              Our <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Services</span>
            </h1>
            <br />
{/* 
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              End-to-end recruitment and staffing solutions designed to help organizations scale
              with the right talent — faster, smarter, and globally.
            </p> */}
          </div>
               <div className="max-w-7xl mx-auto px-4">
          {/* <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">What We Offer</h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              A complete suite of recruitment services tailored for modern enterprises.
            </p>
          </div> */}

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">

            {services.map((service, index) => (
              <div
                key={index}
                className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl 
                           hover:border-white/40 transition-all duration-300 hover:scale-[1.03] animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Glow Orbs */}
                <div className="absolute -top-4 -right-4 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl" />
                <div className="absolute -bottom-4 -left-4 w-40 h-40 bg-cyan-500/20 rounded-full blur-3xl" />

                {/* Content */}
                <div className="relative z-10">
                  <div className="mb-6">{service.icon}</div>

                  <h3 className="text-2xl font-bold text-white mb-4">{service.title}</h3>
                  <p className="text-gray-300 mb-6">{service.description}</p>

                  <ul className="space-y-3 mb-6">
                    {service.features.map((feature, fIndex) => (
                      <li key={fIndex} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-emerald-400 mt-1" />
                        <span className="text-gray-300 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-6 text-md">
                    Learn More
                  </Button> */}
                </div>
              </div>
            ))}

          </div>
        </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* SERVICES GRID — Premium Glass Cards */}
      {/* ---------------------------------------------------------------- */}

      <section className="bg-slate-950 py-24">
   
      </section>
    </div>
  );
};

export default Services;
