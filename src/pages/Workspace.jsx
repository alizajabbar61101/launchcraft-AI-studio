import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { useAuth } from "../context/AuthContext";
import "../styles/workspace.css";

const STARTER_PROMPTS = [
  "An AI fitness coach app",
  "A marketplace for freelance designers",
  "A budgeting app for students",
];

function Workspace() {
  const navigate = useNavigate();
  const { signOut } = useAuth();

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "bot",
      type: "text",
      text: "Hi! I'm your AI product strategist. What idea are you working on today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [stage, setStage] = useState(0); // 0: awaiting idea, 1: awaiting audience, 2: done
  const [ideaText, setIdeaText] = useState("");

  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const pushMessage = (msg) => {
    setMessages((prev) => [...prev, { id: prev.length + 1, ...msg }]);
  };

  const handleSend = async (textOverride) => {
  const text = (textOverride ?? input).trim();
  if (!text) return;

  pushMessage({ sender: "user", type: "text", text });
  setInput("");

  // Stage 0: collect idea
  if (stage === 0) {
    setIdeaText(text);
    pushMessage({
      sender: "bot",
      type: "text",
      text: `Got it — "${text}" sounds interesting. Who is the main audience for this product?`,
    });

    setStage(1);
    return;
  }

  // Stage 1: send idea to Gemini backend
  if (stage === 1) {
    setIsTyping(true);

    try {
      const response = await fetch(
        "http://localhost:3000/api/analyze",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            idea: `${ideaText}. Target audience: ${text}`,
          }),
        }
      );

      const data = await response.json();

      setIsTyping(false);

      if (data.success) {
        pushMessage({
          sender: "bot",
          type: "text",
          text: data.result,
        });
      } else {
        pushMessage({
          sender: "bot",
          type: "text",
          text: "Sorry, I could not analyze this idea.",
        });
      }

    } catch (error) {
      console.error(error);

      setIsTyping(false);

      pushMessage({
        sender: "bot",
        type: "text",
        text:
          "Unable to connect with LaunchCraft AI backend. Make sure the server is running.",
      });
    }

    setStage(2);
  }
};

  const handleReset = () => {
    setMessages([
      {
        id: 1,
        sender: "bot",
        type: "text",
        text: "Let's map out another idea. What are you thinking about building?",
      },
    ]);
    setStage(0);
    setIdeaText("");
  };

  const handleLogout = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <div className="workspace-page">
      <header className="workspace-header">
        <div className="logo-mark">
          <span className="logo-dot"></span>
          LaunchCraft
          <span className="logo-ai">AI</span>
        </div>
        <button className="logout-btn" onClick={handleLogout}>
          Log Out
        </button>
      </header>

      <div className="chat-window">
        <div className="chat-messages">
          {messages.map((msg) => (
            <div key={msg.id} className={`message ${msg.sender}`}>
              {msg.type === "text" && (
  <div className="bubble markdown-content">
    <ReactMarkdown>{msg.text}</ReactMarkdown>
  </div>
)}

              {msg.type === "blueprint" && (
                <div className="blueprint-card">
                  <span className="blueprint-label">Product Blueprint</span>
                  <h3>{msg.content.title}</h3>

                  <div className="blueprint-section">
                    <h4>Market Opportunity</h4>
                    <p>{msg.content.opportunity}</p>
                  </div>

                  <div className="blueprint-section">
                    <h4>Core Features</h4>
                    <ul>
                      {msg.content.features.map((f) => (
                        <li key={f}>{f}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="blueprint-section">
                    <h4>Recommended Stack</h4>
                    <div className="chip-row">
                      {msg.content.stack.map((s) => (
                        <span className="chip" key={s}>{s}</span>
                      ))}
                    </div>
                  </div>

                  <div className="blueprint-section">
                    <h4>Roadmap</h4>
                    <div className="mini-roadmap">
                      {msg.content.roadmap.map((r) => (
                        <div className="mini-roadmap-step" key={r.phase}>
                          <span className="mini-roadmap-phase">{r.phase}</span>
                          <span className="mini-roadmap-weeks">{r.weeks}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button className="reset-btn" onClick={handleReset}>
                    Start a New Idea
                  </button>
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="message bot">
              <div className="bubble typing-bubble">
                <span></span><span></span><span></span>
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {stage === 0 && messages.length === 1 && (
          <div className="quick-chips">
            {STARTER_PROMPTS.map((prompt) => (
              <button
                key={prompt}
                className="quick-chip"
                onClick={() => handleSend(prompt)}
              >
                {prompt}
              </button>
            ))}
          </div>
        )}

        <div className="chat-input-bar">
          <input
            type="text"
            placeholder={
              stage === 2 ? "Describe another idea to start over..." : "Type your idea..."
            }
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <button className="send-btn" onClick={() => handleSend()}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default Workspace;
