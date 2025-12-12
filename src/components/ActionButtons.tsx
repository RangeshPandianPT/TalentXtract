import { Copy, Download, FileJson, FileSpreadsheet, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { useState } from "react";

interface ExportedKeywords {
  mandatory: string[];
  technical: string[];
  tools: string[];
  soft: string[];
  role: string[];
}

interface ActionButtonsProps {
  keywords: ExportedKeywords;
}

export function ActionButtons({ keywords }: ActionButtonsProps) {
  const [copied, setCopied] = useState(false);

  const allKeywords = [
    ...keywords.mandatory,
    ...keywords.technical,
    ...keywords.tools,
    ...keywords.soft,
    ...keywords.role,
  ];

  const handleCopyAll = async () => {
    await navigator.clipboard.writeText(allKeywords.join(", "));
    setCopied(true);
    toast({
      title: "Copied!",
      description: `${allKeywords.length} keywords copied to clipboard`,
    });
    setTimeout(() => setCopied(false), 1500);
  };

  const handleDownloadJSON = () => {
    const data = JSON.stringify(keywords, null, 2);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "keywords.json";
    a.click();
    URL.revokeObjectURL(url);
    toast({
      title: "Downloaded!",
      description: "Keywords saved as JSON file",
    });
  };

  const handleDownloadCSV = () => {
    const headers = ["Category", "Keyword"];
    const rows = [
      ...keywords.mandatory.map((k) => ["Mandatory", k]),
      ...keywords.technical.map((k) => ["Technical", k]),
      ...keywords.tools.map((k) => ["Tools", k]),
      ...keywords.soft.map((k) => ["Soft Skills", k]),
      ...keywords.role.map((k) => ["Role Based", k]),
    ];
    const csv = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "keywords.csv";
    a.click();
    URL.revokeObjectURL(url);
    toast({
      title: "Downloaded!",
      description: "Keywords saved as CSV file",
    });
  };

  if (allKeywords.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center justify-center gap-2 animate-fade-in-up">
      <Button
        variant="outline"
        size="sm"
        onClick={handleCopyAll}
        className="gap-1.5 text-xs sm:text-sm"
      >
        {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
        Copy All
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={handleDownloadJSON}
        className="gap-1.5 text-xs sm:text-sm"
      >
        <FileJson className="w-3.5 h-3.5" />
        JSON
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={handleDownloadCSV}
        className="gap-1.5 text-xs sm:text-sm"
      >
        <FileSpreadsheet className="w-3.5 h-3.5" />
        CSV
      </Button>
    </div>
  );
}