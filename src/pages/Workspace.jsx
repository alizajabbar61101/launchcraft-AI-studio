import { updateProjectProgress } from "../lib/progressService";
import { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { useAuth } from "../context/AuthContext";
import heroBackground from "../assets/hero-background.svg";


import {
  loadMessages,
  saveMessage,
  deleteMessages,
} from "../lib/messageService";

import { addActivity } from "../lib/activityService";

import "../styles/workspace.css";

const STARTER_PROMPTS = [
  "An AI fitness coach app",
  "A marketplace for freelance designers",
  "A budgeting app for students",
];

function Workspace() {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const { signOut } = useAuth();

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  // 0 = waiting for idea
  // 1 = waiting for target audience
  // 2 = normal chatbot conversation
  const [stage, setStage] = useState(0);

  const [ideaText, setIdeaText] = useState("");

  const bottomRef = useRef(null);

  // Scroll to latest message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, isTyping]);

  // Load saved messages
  useEffect(() => {
    async function fetchMessages() {
      try {
        const data = await loadMessages(projectId);

        if (data.length === 0) {
          setMessages([
            {
              id: "welcome",
              sender: "bot",
              type: "text",
              text:
                "Hi! I'm your AI product strategist. What idea are you working on today?",
            },
          ]);
        } else {
          setMessages(
            data.map((msg) => ({
              id: msg.id,
              sender: msg.role === "assistant" ? "bot" : "user",
              type: "text",
              text: msg.message,
            }))
          );

          // If messages already exist, this is an ongoing conversation.
          setStage(2);
        }
      } catch (error) {
        console.error("Failed to load messages:", error);
      }
    }

    fetchMessages();
  }, [projectId]);

  // Save message + update progress
  const pushMessage = async (msg) => {
    const newMessage = {
      id: Date.now() + Math.random(),
      ...msg,
    };

    setMessages((prev) => [...prev, newMessage]);

    try {
      await saveMessage(
        projectId,
        msg.sender === "bot" ? "assistant" : "user",
        msg.text
      );

      await updateProjectProgress(projectId);
    } catch (error) {
      console.error("Failed to save message:", error);
    }
  };

  // Main send function
  const handleSend = async (textOverride) => {
    const text = (textOverride ?? input).trim();

    if (!text || isTyping) return;

    setInput("");

    // --------------------------------
    // STEP 1: Save user's message
    // --------------------------------

    await pushMessage({
      sender: "user",
      type: "text",
      text,
    });

    // --------------------------------
    // STAGE 0: Collect product idea
    // --------------------------------

    if (stage === 0) {
      setIdeaText(text);

      await pushMessage({
        sender: "bot",
        type: "text",
        text: `Got it — "${text}" sounds interesting. Who is the main audience for this product?`,
      });

      setStage(1);

      await addActivity(
        projectId,
        "Project idea and target audience discussion started"
      );

      return;
    }

    // --------------------------------
    // STAGE 1: Analyze idea
    // --------------------------------

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

        if (data.success) {
          await pushMessage({
            sender: "bot",
            type: "text",
            text: data.result,
          });

          await addActivity(
            projectId,
            "AI analyzed your startup idea"
          );

          // IMPORTANT:
          // Move into normal chatbot mode.
          setStage(2);
        } else {
          await pushMessage({
            sender: "bot",
            type: "text",
            text:
              "Sorry, I could not analyze this idea. Please try again.",
          });
        }
      } catch (error) {
        console.error("Analysis error:", error);

        await pushMessage({
          sender: "bot",
          type: "text",
          text:
            "Unable to connect with LaunchCraft AI backend. Make sure the backend server is running.",
        });
      } finally {
        setIsTyping(false);
      }

      return;
    }

    // --------------------------------
    // STAGE 2: NORMAL AI CHAT
    // --------------------------------

    if (stage === 2) {
      await handleChatMessage(text);
    }
  };

  // --------------------------------
  // NORMAL CHAT WITH AI
  // --------------------------------

  const handleChatMessage = async (text) => {
    setIsTyping(true);

    try {
      // Build conversation context
      const conversationContext = messages
        .map((msg) => {
          const role = msg.sender === "bot" ? "Assistant" : "User";

          return `${role}: ${msg.text}`;
        })
        .join("\n\n");

      const response = await fetch(
        "http://localhost:3000/api/chat",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: text,
            context: `
Product idea:
${ideaText}

Conversation so far:
${conversationContext}
            `,
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        await pushMessage({
          sender: "bot",
          type: "text",
          text: data.result,
        });

        await addActivity(
          projectId,
          "Continued discussion with LaunchCraft AI"
        );
      } else {
        await pushMessage({
          sender: "bot",
          type: "text",
          text:
            "I couldn't process that message. Please try again.",
        });
      }
    } catch (error) {
      console.error("Chat error:", error);

      await pushMessage({
        sender: "bot",
        type: "text",
        text:
          "Unable to connect with LaunchCraft AI. Please make sure the backend server is running.",
      });
    } finally {
      setIsTyping(false);
    }
  };
    // --------------------------------
  // RESET / START NEW IDEA
  // --------------------------------

  const handleReset = async () => {
    try {
      await deleteMessages(projectId);

      setMessages([
        {
          id: "welcome-reset",
          sender: "bot",
          type: "text",
          text:
            "Let's map out another idea. What are you thinking about building?",
        },
      ]);

      setStage(0);
      setIdeaText("");
      setInput("");
    } catch (error) {
      console.error("Failed to reset workspace:", error);

      alert("Unable to start a new idea.");
    }
  };

  // --------------------------------
  // LOGOUT
  // --------------------------------

  const handleLogout = async () => {
    await signOut();
    navigate("/");
  };

  return (
   <div className="workspace-page">

      {/* HEADER */}
      <header className="workspace-header">

        <div className="logo-mark">
          <span className="logo-dot"></span>

          LaunchCraft

          <span className="logo-ai">
            AI
          </span>
        </div>

        <button
          className="logout-btn"
          onClick={handleLogout}
        >
          Log Out
        </button>

      </header>


      {/* CHAT WINDOW */}
      <div className="chat-window">

        <div className="chat-messages">

          {messages.map((msg) => (

            <div
              key={msg.id}
              className={`message ${msg.sender}`}
            >

              {msg.type === "text" && (

                <div className="bubble markdown-content">

                  <ReactMarkdown>
                    {msg.text}
                  </ReactMarkdown>

                </div>

              )}

              {msg.type === "blueprint" && (

                <div className="blueprint-card">

                  <span className="blueprint-label">
                    Product Blueprint
                  </span>

                  <h3>
                    {msg.content.title}
                  </h3>

                  <div className="blueprint-section">

                    <h4>
                      Market Opportunity
                    </h4>

                    <p>
                      {msg.content.opportunity}
                    </p>

                  </div>

                  <div className="blueprint-section">

                    <h4>
                      Core Features
                    </h4>

                    <ul>

                      {msg.content.features.map((feature) => (

                        <li key={feature}>
                          {feature}
                        </li>

                      ))}

                    </ul>

                  </div>

                  <div className="blueprint-section">

                    <h4>
                      Recommended Stack
                    </h4>

                    <div className="chip-row">

                      {msg.content.stack.map((stackItem) => (

                        <span
                          className="chip"
                          key={stackItem}
                        >
                          {stackItem}
                        </span>

                      ))}

                    </div>

                  </div>

                  <div className="blueprint-section">

                    <h4>
                      Roadmap
                    </h4>

                    <div className="mini-roadmap">

                      {msg.content.roadmap.map((roadmapItem) => (

                        <div
                          className="mini-roadmap-step"
                          key={roadmapItem.phase}
                        >

                          <span className="mini-roadmap-phase">
                            {roadmapItem.phase}
                          </span>

                          <span className="mini-roadmap-weeks">
                            {roadmapItem.weeks}
                          </span>

                        </div>

                      ))}

                    </div>

                  </div>

                  <button
                    className="reset-btn"
                    onClick={handleReset}
                  >
                    Start a New Idea
                  </button>

                </div>

              )}

            </div>

          ))}


          {/* TYPING INDICATOR */}

          {isTyping && (

            <div className="message bot">

              <div className="bubble typing-bubble">

                <span></span>
                <span></span>
                <span></span>

              </div>

            </div>

          )}


          <div ref={bottomRef} />

        </div>


        {/* STARTER PROMPTS */}

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


        {/* INPUT */}

        <div className="chat-input-bar">

          <input
            type="text"
            placeholder={
              stage === 0
                ? "Describe your product idea..."
                : stage === 1
                ? "Who is your target audience?"
                : "Ask LaunchCraft anything about your product..."
            }
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSend();
              }
            }}
          />

          <button
            className="send-btn"
            onClick={() => handleSend()}
            disabled={isTyping}
          >
            {isTyping ? "..." : "Send"}
          </button>

        </div>

      </div>

    </div>
  );
}

export default Workspace;