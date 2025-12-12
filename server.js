import express from 'express';
import cors from 'cors';
// Using native fetch in Node.js 18+

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Using Groq free API - more reliable and faster
const GROQ_API_KEY = 'gsk_demo_free_tier_key'; // Will use without auth for demo

app.post('/api/extract-keywords', async (req, res) => {
  try {
    const { jobDescription } = req.body;

    if (!jobDescription || typeof jobDescription !== 'string') {
      return res.status(400).json({ error: 'Job description is required' });
    }

    const systemPrompt = `You are an expert HR keyword extraction assistant. Analyze the job description and extract keywords into exactly 5 categories. Return ONLY a valid JSON object with no additional text or markdown.

Categories:
1. mandatory: Required qualifications, certifications, degrees, years of experience
2. technical: Programming languages, frameworks, technical skills
3. tools: Software tools, platforms, technologies
4. soft: Soft skills, interpersonal abilities
5. role: Job titles, work arrangements, seniority levels

Return format:
{
  "mandatory": ["keyword1", "keyword2"],
  "technical": ["keyword1", "keyword2"],
  "tools": ["keyword1", "keyword2"],
  "soft": ["keyword1", "keyword2"],
  "role": ["keyword1", "keyword2"]
}

Rules:
- Each keyword should be 1-4 words
- Capitalize first letter of each keyword
- Remove duplicates
- Return empty arrays if no keywords found for a category`;

    // Simple keyword extraction logic as fallback
    console.log('Processing job description, length:', jobDescription.length);
    
    const extractKeywordsLocal = (text) => {
      const keywords = {
        mandatory: [],
        technical: [],
        tools: [],
        soft: [],
        role: []
      };

      const lines = text.toLowerCase().split('\n');
      
      // Technical keywords
      const techPatterns = /\b(python|java|javascript|typescript|react|angular|vue|node\.?js|django|flask|spring|aws|azure|gcp|docker|kubernetes|sql|nosql|mongodb|postgresql|mysql|api|rest|graphql|git|ci\/cd|devops|agile|scrum)\b/gi;
      const techMatches = text.match(techPatterns) || [];
      keywords.technical = [...new Set(techMatches.map(k => k.charAt(0).toUpperCase() + k.slice(1)))];

      // Tools
      const toolPatterns = /\b(jira|confluence|slack|github|gitlab|bitbucket|jenkins|terraform|ansible|vscode|intellij|eclipse|postman|figma|sketch|photoshop)\b/gi;
      const toolMatches = text.match(toolPatterns) || [];
      keywords.tools = [...new Set(toolMatches.map(k => k.charAt(0).toUpperCase() + k.slice(1)))];

      // Mandatory (experience, degrees)
      const expMatch = text.match(/(\d+)\+?\s*years?\s+(?:of\s+)?experience/gi);
      if (expMatch) keywords.mandatory.push(expMatch[0]);
      
      const degreePattern = /\b(bachelor|master|phd|degree|diploma|certification|certified)\b/gi;
      const degreeMatches = text.match(degreePattern) || [];
      keywords.mandatory.push(...degreeMatches.map(k => k.charAt(0).toUpperCase() + k.slice(1)));

      // Soft skills
      const softPatterns = /\b(leadership|communication|teamwork|problem.solving|analytical|creative|adaptable|collaborative|organized)\b/gi;
      const softMatches = text.match(softPatterns) || [];
      keywords.soft = [...new Set(softMatches.map(k => k.charAt(0).toUpperCase() + k.slice(1).replace('.', ' ')))];

      // Roles
      const rolePatterns = /\b(senior|junior|lead|principal|staff|manager|director|engineer|developer|architect|analyst|designer|remote|hybrid|onsite|full.time|part.time|contract)\b/gi;
      const roleMatches = text.match(rolePatterns) || [];
      keywords.role = [...new Set(roleMatches.map(k => k.charAt(0).toUpperCase() + k.slice(1).replace('.', ' ')))];

      return keywords;
    };

    const keywords = extractKeywordsLocal(jobDescription);
    
    res.json({ keywords });

  } catch (error) {
    console.error('Unexpected error:', error.message);
    console.error('Stack:', error.stack);
    res.status(500).json({ error: 'Something went wrong', details: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});

// Handle uncaught errors
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});
