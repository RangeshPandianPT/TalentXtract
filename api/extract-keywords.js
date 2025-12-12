export default function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { jobDescription } = req.body;

    if (!jobDescription || typeof jobDescription !== 'string') {
      return res.status(400).json({ error: 'Job description is required' });
    }

    console.log('Extracting keywords from description length:', jobDescription.length);

    // Keyword extraction logic
    const keywords = {
      mandatory: [],
      technical: [],
      tools: [],
      soft: [],
      role: []
    };

    // Technical skills
    const techPatterns = /\b(python|java|javascript|typescript|react|angular|vue|node\.?js|django|flask|spring|springboot|aws|azure|gcp|docker|kubernetes|k8s|sql|nosql|mongodb|postgresql|mysql|redis|api|rest|graphql|git|ci\/cd|devops|agile|scrum|html|css|sass|less|webpack|vite|c\+\+|c#|ruby|php|go|rust|swift|kotlin|scala|r|matlab)\b/gi;
    const techMatches = jobDescription.match(techPatterns) || [];
    keywords.technical = [...new Set(techMatches.map(k => k.charAt(0).toUpperCase() + k.slice(1)))];

    // Tools
    const toolPatterns = /\b(jira|confluence|slack|github|gitlab|bitbucket|jenkins|circleci|travis|terraform|ansible|puppet|chef|vscode|visual studio|intellij|eclipse|netbeans|postman|swagger|figma|sketch|photoshop|illustrator|xd|tableau|power bi|excel|trello|asana|notion)\b/gi;
    const toolMatches = jobDescription.match(toolPatterns) || [];
    keywords.tools = [...new Set(toolMatches.map(k => k.charAt(0).toUpperCase() + k.slice(1)))];

    // Mandatory (experience, degrees, certifications)
    const expMatch = jobDescription.match(/(\d+)\+?\s*years?\s+(?:of\s+)?experience/gi);
    if (expMatch) keywords.mandatory.push(...expMatch.map(e => e.charAt(0).toUpperCase() + e.slice(1)));
    
    const degreePattern = /\b(bachelor'?s?|master'?s?|phd|doctorate|degree|diploma|certification|certified|license)\b/gi;
    const degreeMatches = jobDescription.match(degreePattern) || [];
    keywords.mandatory.push(...[...new Set(degreeMatches.map(k => k.charAt(0).toUpperCase() + k.slice(1)))]);

    // Soft skills
    const softPatterns = /\b(leadership|communication|teamwork|problem[\s-]solving|analytical|creative|adaptable|flexible|collaborative|organized|time[\s-]management|critical[\s-]thinking|interpersonal|motivated|detail[\s-]oriented|multitasking)\b/gi;
    const softMatches = jobDescription.match(softPatterns) || [];
    keywords.soft = [...new Set(softMatches.map(k => k.replace(/[\s-]/g, ' ').split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')))];

    // Roles
    const rolePatterns = /\b(senior|junior|lead|principal|staff|associate|entry[\s-]level|mid[\s-]level|manager|director|engineer|developer|architect|analyst|designer|consultant|specialist|coordinator|intern|remote|hybrid|onsite|on[\s-]site|full[\s-]time|part[\s-]time|contract|freelance)\b/gi;
    const roleMatches = jobDescription.match(rolePatterns) || [];
    keywords.role = [...new Set(roleMatches.map(k => k.replace(/[\s-]/g, ' ').split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')))];

    console.log('Extracted keywords:', {
      mandatory: keywords.mandatory.length,
      technical: keywords.technical.length,
      tools: keywords.tools.length,
      soft: keywords.soft.length,
      role: keywords.role.length
    });

    return res.status(200).json({ keywords });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Internal server error', details: error.message });
  }
}
