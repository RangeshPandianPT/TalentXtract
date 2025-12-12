import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.post('/api/extract-keywords', (req, res) => {
  console.log('Request received!');
  console.log('Body:', req.body);
  
  try {
    const { jobDescription } = req.body;
    
    console.log('Job description:', jobDescription);
    
    // Simple test response
    const keywords = {
      mandatory: ['5 Years Experience'],
      technical: ['Python', 'JavaScript'],
      tools: ['Git', 'Docker'],
      soft: ['Leadership', 'Communication'],
      role: ['Senior', 'Developer']
    };
    
    console.log('Sending response:', keywords);
    res.json({ keywords });
  } catch (error) {
    console.error('Error in handler:', error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Test server running on http://localhost:${PORT}`);
});
