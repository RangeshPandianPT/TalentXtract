import { useState } from "react";
import { Copy, Check, Download, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { KeywordBadge } from "@/components/KeywordBadge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "@/hooks/use-toast";

interface KeywordCardProps {
  title: string;
  keywords: string[];
  category: "mandatory" | "technical" | "tools" | "soft" | "role";
  icon: React.ReactNode;
  delay?: number;
}

const categoryColors = {
  mandatory: "border-l-category-mandatory",
  technical: "border-l-category-technical",
  tools: "border-l-category-tools",
  soft: "border-l-category-soft",
  role: "border-l-category-role",
};

export function KeywordCard({ title, keywords, category, icon, delay = 0 }: KeywordCardProps) {
  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState(true);

  const handleCopyAll = async () => {
    await navigator.clipboard.writeText(keywords.join(", "));
    setCopied(true);
    toast({
      title: "Copied!",
      description: `${keywords.length} keywords copied to clipboard`,
    });
    setTimeout(() => setCopied(false), 1500);
  };

  if (keywords.length === 0) return null;

  return (
    <div
      className={`bg-card rounded-xl card-shadow border border-border overflow-hidden animate-fade-in-up border-l-4 ${categoryColors[category]}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="p-3 sm:p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className={`p-1.5 sm:p-2 rounded-lg category-${category}`}>
              {icon}
            </div>
            <div>
              <h3 className="font-semibold text-sm sm:text-base text-foreground">{title}</h3>
              <p className="text-xs text-muted-foreground">{keywords.length} found</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    onClick={handleCopyAll}
                    className="h-7 w-7 hover:bg-muted"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-accent" /> : <Copy className="w-3.5 h-3.5" />}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Copy all</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => setExpanded(!expanded)}
              className="h-7 w-7 hover:bg-muted"
            >
              {expanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </Button>
          </div>
        </div>
        
        {expanded && (
          <div className="flex flex-wrap gap-1.5">
            {keywords.map((keyword, index) => (
              <KeywordBadge key={index} keyword={keyword} category={category} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}