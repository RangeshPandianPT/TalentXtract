import { Users, FileText, Zap, TrendingUp, Shield, Clock } from "lucide-react";

const stats = [
  { value: "10K+", label: "Keywords Extracted" },
  { value: "500+", label: "HR Teams" },
  { value: "98%", label: "Accuracy Rate" },
  { value: "2s", label: "Avg. Speed" },
];

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Extract keywords in seconds with our AI-powered engine",
  },
  {
    icon: Shield,
    title: "Smart Categorization",
    description: "Automatically sort keywords into 5 professional categories",
  },
  {
    icon: FileText,
    title: "Multi-Format Support",
    description: "Upload PDF, Word, or paste text directly",
  },
  {
    icon: TrendingUp,
    title: "ATS Optimized",
    description: "Keywords formatted for applicant tracking systems",
  },
  {
    icon: Users,
    title: "Team Ready",
    description: "Export and share results with your hiring team",
  },
  {
    icon: Clock,
    title: "Save Hours",
    description: "Reduce manual screening time by 80%",
  },
];

export function FeaturesSection() {
  return (
    <section className="py-16 sm:py-20 bg-muted/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-16">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center p-4 sm:p-6 rounded-xl bg-card border border-border card-shadow animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <p className="text-2xl sm:text-3xl font-bold text-primary">{stat.value}</p>
              <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
            Why HR Teams Choose TalentXtract
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Powerful features designed to streamline your hiring process
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-5 sm:p-6 rounded-xl bg-card border border-border card-shadow hover:card-shadow-hover transition-all duration-300 hover:-translate-y-1 animate-fade-in-up"
              style={{ animationDelay: `${(index + 4) * 100}ms` }}
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
