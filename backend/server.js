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
      model: "models/gemini-3.1-flash-lite",
      contents: prompt,
    });


    res.json({
      success: true,
      result: response.text,
    });


  } catch (error) {

    console.error("Gemini Error:", error);
    console.error("Error Message:", error.message);

    if (error.stack) {
      console.error(error.stack);
    }


    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });

  }
});


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});