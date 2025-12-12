import { useRef, useState } from "react";
import { Sparkles, AlertTriangle, Code, Wrench, Heart, Briefcase, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { KeywordCard } from "@/components/KeywordCard";
import { ActionButtons } from "@/components/ActionButtons";
import { LoadingState } from "@/components/LoadingState";
import { FileUpload } from "@/components/FileUpload";
import { FeaturesSection } from "@/components/FeaturesSection";
import { FAQSection } from "@/components/FAQSection";
import { CTASection } from "@/components/CTASection";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

interface ExtractedKeywords {
  mandatory: string[];
  technical: string[];
  tools: string[];
  soft: string[];
  role: string[];
}

export default function Index() {
  const [jobDescription, setJobDescription] = useState("");
  const [keywords, setKeywords] = useState<ExtractedKeywords | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasExtracted, setHasExtracted] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);
  const inputRef = useRef<HTMLDivElement>(null);

  const scrollToInput = () => {
    inputRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const handleExtract = async () => {
    if (!jobDescription.trim()) return;
    
    setIsLoading(true);
    setHasExtracted(false);
    
    try {
      const response = await fetch('http://localhost:3001/api/extract-keywords', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          jobDescription: jobDescription.trim()
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Backend error:', errorData);
        toast({
          title: "Extraction failed",
          description: errorData.error || "Failed to extract keywords. Please try again.",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }

      const data = await response.json();
      
      if (!data.keywords) {
        console.error('No keywords in response');
        toast({
          title: "Extraction failed",
          description: "No keywords found. Please try again.",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }

      setKeywords(data.keywords);
      setHasExtracted(true);
      toast({
        title: "Keywords extracted",
        description: "AI has successfully analyzed your job description.",
      });
    } catch (err) {
      console.error('Error:', err);
      toast({
        title: "Error",
        description: "Failed to connect to backend server. Make sure it's running on port 3001.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setJobDescription("");
    setKeywords(null);
    setHasExtracted(false);
    setUploadedFile(null);
  };

  const handleFileContent = (content: string, fileName: string) => {
    if (content) {
      setJobDescription(content);
    }
    setUploadedFile(fileName);
  };

  const handleClearFile = () => {
    setUploadedFile(null);
  };

  const totalKeywords = keywords
    ? keywords.mandatory.length +
      keywords.technical.length +
      keywords.tools.length +
      keywords.soft.length +
      keywords.role.length
    : 0;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="hero-gradient py-12 sm:py-16 lg:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-xs sm:text-sm font-medium mb-6 animate-fade-in-up">
              <Sparkles className="w-4 h-4" />
              AI-Powered Keyword Extraction
            </div>
            
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground mb-4 sm:mb-6 animate-fade-in-up stagger-1 leading-tight">
              Extract Job Keywords{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                in Seconds
              </span>
            </h1>
            
            <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 sm:mb-10 animate-fade-in-up stagger-2">
              Supercharge your hiring process with AI. Paste any job description and instantly 
              get organized, categorized keywords for better candidate matching.
            </p>
            
            {/* Input Area */}
            <div ref={inputRef} className="max-w-3xl mx-auto animate-fade-in-up stagger-3">
              <div className="bg-card rounded-2xl card-shadow p-4 sm:p-6 border border-border">
                <Textarea
                  placeholder="Paste your job description here or drag & drop a file...

Example: We are looking for a Senior Full Stack Developer with 5+ years of experience in React, Node.js, and AWS. The ideal candidate should have excellent communication skills..."
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  className="min-h-[160px] sm:min-h-[200px] text-sm sm:text-base resize-none"
                />
                
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mt-4">
                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    <FileUpload 
                      onFileContent={handleFileContent}
                      uploadedFile={uploadedFile}
                      onClearFile={handleClearFile}
                    />
                    <span className="text-xs sm:text-sm text-muted-foreground">
                      {jobDescription.length > 0 
                        ? `${jobDescription.split(/\s+/).filter(Boolean).length} words`
                        : "PDF, Word, or Text"
                      }
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                    {jobDescription && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleClear}
                        className="text-muted-foreground"
                      >
                        Clear
                      </Button>
                    )}
                    <Button
                      variant="hero"
                      size="lg"
                      onClick={handleExtract}
                      disabled={!jobDescription.trim() || isLoading}
                      className="gap-2 px-6"
                    >
                      <Sparkles className="w-4 h-4" />
                      {isLoading ? "Analyzing..." : "Extract Keywords"}
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Scroll indicator */}
            {!hasExtracted && (
              <div className="mt-12 animate-bounce">
                <ArrowDown className="w-5 h-5 mx-auto text-muted-foreground" />
              </div>
            )}
          </div>
        </section>
        
        {/* Results Section */}
        {(isLoading || hasExtracted) && (
          <section className="py-12 sm:py-16 bg-muted/20">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
              {isLoading ? (
                <LoadingState />
              ) : keywords && totalKeywords > 0 ? (
                <>
                  <div className="text-center mb-8 sm:mb-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
                      <Sparkles className="w-4 h-4" />
                      Analysis Complete
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
                      {totalKeywords} Keywords Extracted
                    </h2>
                    <p className="text-muted-foreground">
                      Organized into 5 professional categories
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 mb-8">
                    <KeywordCard
                      title="Mandatory"
                      keywords={keywords.mandatory}
                      category="mandatory"
                      icon={<AlertTriangle className="w-4 h-4" />}
                      delay={0}
                    />
                    <KeywordCard
                      title="Technical Skills"
                      keywords={keywords.technical}
                      category="technical"
                      icon={<Code className="w-4 h-4" />}
                      delay={100}
                    />
                    <KeywordCard
                      title="Tools & Tech"
                      keywords={keywords.tools}
                      category="tools"
                      icon={<Wrench className="w-4 h-4" />}
                      delay={200}
                    />
                    <KeywordCard
                      title="Soft Skills"
                      keywords={keywords.soft}
                      category="soft"
                      icon={<Heart className="w-4 h-4" />}
                      delay={300}
                    />
                    <KeywordCard
                      title="Role Keywords"
                      keywords={keywords.role}
                      category="role"
                      icon={<Briefcase className="w-4 h-4" />}
                      delay={400}
                    />
                  </div>
                  
                  <ActionButtons keywords={keywords} />
                </>
              ) : (
                <div className="text-center py-12 animate-fade-in-up">
                  <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                    <Sparkles className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    No keywords found
                  </h3>
                  <p className="text-muted-foreground max-w-md mx-auto">
                    Try pasting a more detailed job description with specific skills and requirements.
                  </p>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Features Section */}
        {!hasExtracted && <FeaturesSection />}

        {/* FAQ */}
        {!hasExtracted && <FAQSection />}

        {/* CTA */}
        {!hasExtracted && <CTASection onGetStarted={scrollToInput} />}
      </main>
      
      <Footer />
    </div>
  );
}
