import { Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CTASectionProps {
  onGetStarted: () => void;
}

export function CTASection({ onGetStarted }: CTASectionProps) {
  return (
    <section className="py-16 sm:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary to-accent p-8 sm:p-12 text-center">
          {/* Background decoration */}
          <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,transparent,rgba(255,255,255,0.5))]" />
          
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/20 text-white text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              Start Extracting in Seconds
            </div>
            
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">
              Ready to Transform Your Hiring Process?
            </h2>
            
            <p className="text-white/90 max-w-2xl mx-auto mb-8 text-sm sm:text-base">
              Join hundreds of HR teams using TalentXtract to find the perfect candidates faster. 
              No signup required - start extracting keywords now.
            </p>
            
            <Button
              onClick={onGetStarted}
              size="lg"
              className="bg-white text-primary hover:bg-white/90 gap-2 font-semibold shadow-lg"
            >
              Get Started Free
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
