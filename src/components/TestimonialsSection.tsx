import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "HR Director",
    company: "TechCorp Inc.",
    content: "TalentXtract has revolutionized our hiring process. We've cut screening time by 70% and improved candidate matching significantly.",
    avatar: "SJ",
  },
  {
    name: "Michael Chen",
    role: "Talent Acquisition Lead",
    company: "StartupHub",
    content: "The AI-powered categorization is incredibly accurate. It catches keywords we might have missed during manual review.",
    avatar: "MC",
  },
  {
    name: "Emily Rodriguez",
    role: "Recruiting Manager",
    company: "Global Solutions",
    content: "Simple, fast, and effective. Our team uses TalentXtract for every job posting now. Highly recommended!",
    avatar: "ER",
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-16 sm:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
            Trusted by HR Professionals
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            See what hiring teams are saying about TalentXtract
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="p-6 rounded-xl bg-card border border-border card-shadow animate-fade-in-up"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              {/* Content */}
              <p className="text-foreground mb-6 text-sm leading-relaxed">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-sm font-semibold text-primary">{testimonial.avatar}</span>
                </div>
                <div>
                  <p className="font-medium text-foreground text-sm">{testimonial.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {testimonial.role} at {testimonial.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
