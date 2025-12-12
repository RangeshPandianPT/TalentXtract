import { Mail, Linkedin, Instagram, Heart } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="border-t border-border bg-card/50 mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-center sm:text-left">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xs sm:text-sm">TX</span>
            </div>
            <div>
              <p className="font-medium text-sm sm:text-base text-foreground">TalentXtract</p>
              <p className="text-xs text-muted-foreground">Faster hiring starts with smarter keywords</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <a 
              href="mailto:rangeshoandian@gmail.com?subject=Inquiry%20about%20TalentXtract&body=Hi%20Rangesh,%0A%0A" 
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="Email"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
            </a>
            <a 
              href="https://www.linkedin.com/in/rangeshpandian-pt-428b04325" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-4 h-4 sm:w-5 sm:h-5" />
            </a>
            <a 
              href="https://www.instagram.com/_rangesh_07/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="w-4 h-4 sm:w-5 sm:h-5" />
            </a>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-border flex flex-col items-center gap-3 text-xs text-muted-foreground">
          <p className="flex items-center gap-1">
            Created with <Heart className="w-3 h-3 text-red-500 fill-red-500" /> by{" "}
            <span className="font-medium text-foreground">RANGESHPANDIAN PT</span>
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
            <p>© {currentYear} TalentXtract. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
              <a href="#" className="hover:text-foreground transition-colors">Terms</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}