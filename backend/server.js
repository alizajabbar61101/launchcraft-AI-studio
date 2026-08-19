const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { GoogleGenAI } = require("@google/genai");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

// Test Route
app.get("/", (req, res) => {
  res.send("LaunchCraft AI Backend is running 🚀");
});

// AI Analyze Route
app.post("/api/analyze", async (req, res) => {
  try {
    const { idea } = req.body;

    if (!idea) {
      return res.status(400).json({
        success: false,
        message: "Please provide a product idea.",
      });
    }

    const prompt = `
You are an expert Product Manager and Software Architect.

Analyze the following product idea:

"${idea}"

Return your response in VALID MARKDOWN.

Follow this EXACT structure:

# Product Analysis

Provide 3-5 detailed paragraphs.

---

# Core Features

- Feature 1
- Feature 2
- Feature 3
- Feature 4
- Feature 5

---

# UI/UX Suggestions

- Suggestion 1
- Suggestion 2
- Suggestion 3
- Suggestion 4

---

# Recommended Technology Stack

| Layer | Technology |
|-------|------------|
| Frontend | |
| Backend | |
| Database | |
| Authentication | |
| AI | |
| Deployment | |

---

# Development Roadmap

| Phase | Timeline | Description |
|-------|----------|-------------|
| Discovery | | |
| MVP | | |
| Testing | | |
| Launch | | |

---

# Possible Challenges

- Challenge 1
- Challenge 2
- Challenge 3
- Challenge 4

Use proper Markdown syntax.

Never return HTML.

Never return JSON.

Use headings, bullet points and tables.
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash", // Replaced with a production-ready stable model name
      contents: prompt,
    });

    res.json({
      success: true,
      result: response.text, // Updated: the @google/genai SDK uses .text directly
    });

  } catch (error) {
    console.error("Gemini Error:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
});

// AI Chat Route
app.post("/api/chat", async (req, res) => {
  try {
    const { message, context } = req.body;

    if (!message) {
      return res.status(400).json({
        success: false,
        message: "Please provide a message.",
      });
    }

    const prompt = `
You are LaunchCraft AI, an expert startup product strategist.

The user is working on a product and wants to continue discussing it.

Previous conversation/context:
${context || "No previous context available."}

User's latest message:
"${message}"

Respond naturally and helpfully.

Your job is to:
- Understand the user's product idea.
- Give practical product advice.
- Suggest features when appropriate.
- Discuss UX, technology, monetization, validation, MVP scope, roadmap, and challenges when relevant.
- Ask a useful follow-up question when it helps move the product forward.
- Do not repeat the entire product analysis unless the user asks for it.
- Keep the response structured and readable.
- Use Markdown when useful.
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash", // Replaced with a production-ready stable model name
      contents: prompt,
    });

    res.json({
      success: true,
      result: response.text, // Updated: the @google/genai SDK uses .text directly
    });

  } catch (error) {
    console.error("Gemini Chat Error:", error);
    res.status(500).json({
      success: false,
      message: "Unable to process chat message.",
      error: error.message,
    });
  }
});

// Avoid port conflicts or continuous listening loops in Vercel production
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}
module.exports = app;