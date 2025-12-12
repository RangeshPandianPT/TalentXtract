import { Sparkles } from "lucide-react";

export function LoadingState() {
  return (
    <div className="text-center py-12">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
        <Sparkles className="w-8 h-8 text-primary animate-pulse" />
      </div>
      <h3 className="text-xl font-semibold text-foreground mb-2">
        Analyzing Job Description
      </h3>
      <p className="text-muted-foreground mb-8">
        Our AI is extracting and categorizing keywords...
      </p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="bg-card rounded-xl border border-border overflow-hidden animate-pulse"
            style={{ animationDelay: `${i * 100}ms` }}
          >
            <div className="p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-lg bg-muted" />
                <div className="space-y-1.5 flex-1">
                  <div className="h-4 w-20 rounded bg-muted" />
                  <div className="h-3 w-14 rounded bg-muted" />
                </div>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {[1, 2, 3].map((j) => (
                  <div
                    key={j}
                    className="h-6 w-16 rounded-md bg-muted"
                  />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
