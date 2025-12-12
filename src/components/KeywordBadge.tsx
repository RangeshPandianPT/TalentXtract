import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface KeywordBadgeProps {
  keyword: string;
  category: "mandatory" | "technical" | "tools" | "soft" | "role";
}

const categoryClasses = {
  mandatory: "category-mandatory",
  technical: "category-technical",
  tools: "category-tools",
  soft: "category-soft",
  role: "category-role",
};

export function KeywordBadge({ keyword, category }: KeywordBadgeProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(keyword);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            onClick={handleCopy}
            className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium transition-all duration-200 hover:scale-[1.02] cursor-pointer ${categoryClasses[category]}`}
          >
            <span>{keyword}</span>
            {copied && <Check className="w-2.5 h-2.5" />}
          </button>
        </TooltipTrigger>
        <TooltipContent>
          <p className="text-xs">Click to copy</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}