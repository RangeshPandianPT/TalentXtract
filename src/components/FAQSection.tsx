import { ChevronDown } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How does TalentXtract extract keywords?",
    answer: "TalentXtract uses advanced AI powered by Google Gemini to analyze job descriptions and intelligently categorize keywords into 5 professional categories: Mandatory, Technical Skills, Tools & Technologies, Soft Skills, and Role Keywords.",
  },
  {
    question: "What file formats are supported?",
    answer: "We support PDF documents, Microsoft Word files (.doc, .docx), and plain text files (.txt). You can also paste text directly into the input area.",
  },
  {
    question: "Is my data secure?",
    answer: "Yes, absolutely. We don't store your job descriptions or extracted keywords on our servers. All processing is done in real-time, and your data is never saved or shared.",
  },
  {
    question: "How accurate is the keyword extraction?",
    answer: "Our AI achieves over 98% accuracy in keyword identification and categorization. The model is continuously trained on thousands of job descriptions across various industries.",
  },
  {
    question: "Can I export the extracted keywords?",
    answer: "Yes! You can copy all keywords to your clipboard, download them as a JSON file for integration with other tools, or export as CSV for spreadsheet analysis.",
  },
  {
    question: "Is TalentXtract free to use?",
    answer: "TalentXtract offers free usage with generous limits. For high-volume teams, we offer premium plans with additional features and priority support.",
  },
];

export function FAQSection() {
  return (
    <section className="py-16 sm:py-20 bg-muted/30">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground">
            Everything you need to know about TalentXtract
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="bg-card border border-border rounded-xl px-5 data-[state=open]:card-shadow transition-shadow"
            >
              <AccordionTrigger className="text-left text-sm sm:text-base font-medium hover:no-underline py-4">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-sm pb-4">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
