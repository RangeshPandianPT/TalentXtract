import { Zap, Shield, Clock } from "lucide-react";

const features = [
  {
    icon: <Zap className="w-4 h-4" />,
    title: "Instant",
    description: "Keywords in seconds",
  },
  {
    icon: <Shield className="w-4 h-4" />,
    title: "Smart",
    description: "Auto-categorized",
  },
  {
    icon: <Clock className="w-4 h-4" />,
    title: "Efficient",
    description: "Focus on hiring",
  },
];

export function Features() {
  return (
    <div className="flex flex-wrap justify-center gap-3 mt-8 sm:mt-10">
      {features.map((feature, index) => (
        <div
          key={index}
          className="flex items-center gap-2 px-3 py-2 rounded-lg bg-card/60 border border-border/50 animate-fade-in-up"
          style={{ animationDelay: `${(index + 1) * 100}ms` }}
        >
          <div className="p-1.5 rounded-md bg-primary/10 text-primary">
            {feature.icon}
          </div>
          <div className="text-left">
            <p className="font-medium text-sm text-foreground">{feature.title}</p>
            <p className="text-xs text-muted-foreground">{feature.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}