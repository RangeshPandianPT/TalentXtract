# TalentXtract

AI-powered keyword extraction tool for job descriptions. TalentXtract helps HR professionals and recruiters quickly identify and categorize key requirements from job postings using advanced AI technology.

## 🚀 Features

- **AI-Powered Extraction**: Leverages Google Gemini API to intelligently extract keywords
- **Smart Categorization**: Automatically organizes keywords into 5 categories:
  - 🎯 Mandatory: Required qualifications, certifications, experience
  - 💻 Technical: Programming languages, frameworks, technical skills
  - 🔧 Tools: Software tools, platforms, technologies
  - 💝 Soft Skills: Interpersonal abilities, soft skills
  - 👔 Role: Job titles, work arrangements, seniority levels
- **Modern UI**: Built with React and shadcn-ui for a seamless experience
- **Dark Mode Support**: Toggle between light and dark themes
- **Export Options**: Copy to clipboard or export results
- **File Upload**: Support for uploading job description files

## 🛠️ Technologies Used

- **Frontend**: React 19.2.1 with TypeScript
- **Build Tool**: Vite 7.2.7
- **Styling**: Tailwind CSS + shadcn-ui components
- **AI Integration**: Google Gemini API (gemini-2.0-flash-exp)
- **Backend**: Supabase Functions (Deno runtime)
- **Package Manager**: npm / Bun 1.3.4

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/RangeshPandianPT/TalentXtract.git

# Navigate to project directory
cd TalentXtract

# Install dependencies
npm install
# or with Bun
bun install

# Start development server
npm run dev
# or with Bun
bun run dev
```

## ⚙️ Configuration

### Setting up Google Gemini API

1. Get your free API key from [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Update the API key in `supabase/functions/extract-keywords/index.ts`
3. The free tier includes:
   - 15 requests per minute
   - 1,500 requests per day
   - No expiration

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 🚀 Deployment

### Deploy with Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

### Deploy with Netlify

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start)

### Manual Deployment

```bash
# Build the project
npm run build

# Preview the build
npm run preview
```

## 📝 Usage

1. Visit the application
2. Paste or upload a job description
3. Click "Extract Keywords"
4. View categorized keywords
5. Export or copy results as needed

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the MIT License.

## 👤 Author

**Rangesh Pandian PT**

- Email: [rangeshoandian@gmail.com](mailto:rangeshoandian@gmail.com)
- LinkedIn: [rangeshpandian-pt](https://www.linkedin.com/in/rangeshpandian-pt-428b04325)
- Instagram: [@_rangesh_07](https://www.instagram.com/_rangesh_07/)

## 🙏 Acknowledgments

- Google Gemini API for AI-powered keyword extraction
- shadcn-ui for beautiful UI components
- Supabase for backend infrastructure

---

Made with ❤️ by Rangesh Pandian PT
