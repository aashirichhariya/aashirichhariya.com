import React, { useState, useRef, useEffect } from 'react';
import { Modal, Spinner } from 'react-bootstrap';

const ChatbotModal = ({ show, onHide }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi there! I'm Sarah from Libertus AI. I help regulated firms deploy enterprise AI without the compliance headaches.\n\nWhat brings you here today - are you exploring AI solutions for your organization?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [inputFocused, setInputFocused] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    if (show && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [show]);

  const quickQuestions = [
    "How does on-premises AI work?",
    "What's included in the platform?", 
    "Security and compliance features?",
    "Pricing and ROI information?"
  ];

  const thinkingMessages = [
    "Let me think about that...",
    "Analyzing your question...",
    "Considering the best approach...",
    "Reviewing our solutions..."
  ];

  const sendToGemini = async (message, conversationHistory = []) => {
    const SYSTEM_PROMPT = `You are Sarah Chen, Senior Solutions Architect at Libertus AI. You have 12+ years in enterprise technology and specialize in regulated industries.

LIBERTUS AI OVERVIEW:
We solve the "AI innovation vs compliance" dilemma by delivering enterprise-grade AI that never leaves your premises. Think ChatGPT capabilities with zero cloud exposure.

BUSINESS ESSENTIALS:
- Target: 10-500 person firms (law, finance, healthcare, government)
- Hardware platforms: $18K-$55K (configured systems)
- Software licensing: $8K-$18K annually (unlimited usage, predictable costs)
- ROI timeline: Typically 4-8 months through productivity gains
- Competitive advantage: Same AI power as cloud solutions, zero data risk

YOUR CONVERSATION APPROACH:
1. **Consultative Discovery** - Understand their world first
2. **Business Language** - Speak ROI, efficiency, risk mitigation (not technical specs)
3. **Qualifying Naturally** - Weave in key questions without interrogating
4. **Value Alignment** - Connect our capabilities to their specific pain points
5. **Confidence Building** - Reference relevant use cases (no client names)

CONVERSATION STYLE:
- Professional but warm - like a trusted advisor, not a vendor
- Confident without being pushy
- Ask strategic questions that reveal needs
- Use natural language (avoid sales-speak and bot responses)
- Structure important info clearly but keep it conversational
- Always end with a relevant question or next step

KEY QUALIFYING AREAS:
- Decision-making authority and timeline
- Current AI usage and frustrations
- Compliance requirements and concerns  
- Team size and usage patterns
- Budget parameters and approval process
- Technical readiness and IT involvement

RESPONSE GUIDELINES:
- Keep responses 2-4 sentences unless they ask for details
- Use **bold** sparingly for key benefits only
- Natural conversation flow - vary your sentence structure
- Reference specific business outcomes when relevant
- Guide toward technical demo when timing feels right
- Address objections proactively but subtly

AVOID:
- Robotic language ("I'd be happy to...")
- Over-enthusiasm or sales-speak
- Technical jargon unless they go deep
- Listing features without business context
- Being pushy about demos/next steps

Remember: You're solving a real business problem. Most firms want AI but can't risk their data in the cloud. Position yourself as the expert who understands both sides of this challenge.`;

    try {
      const contents = [];
      
      contents.push({
        role: "user",
        parts: [{ text: SYSTEM_PROMPT }]
      });
      
      contents.push({
        role: "model", 
        parts: [{ text: "Got it. I'll focus on understanding their business challenges first, then show how Libertus solves the AI compliance dilemma. Natural conversation, strategic questions, business outcomes." }]
      });

      const recentHistory = conversationHistory.slice(-8);
      recentHistory.forEach(msg => {
        if (msg.sender === 'user') {
          contents.push({
            role: "user",
            parts: [{ text: msg.text }]
          });
        } else if (msg.sender === 'bot') {
          contents.push({
            role: "model",
            parts: [{ text: msg.text }]
          });
        }
      });

      contents.push({
        role: "user",
        parts: [{ text: message }]
      });

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': 'AIzaSyAyoKoH1yyx-QYHzdcx78e5qrC0ySnQzKY'
        },
        body: JSON.stringify({
          contents: contents,
          generationConfig: {
            temperature: 0.85,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 650,
          },
          safetySettings: [
            {
              category: "HARM_CATEGORY_HARASSMENT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
              category: "HARM_CATEGORY_HATE_SPEECH", 
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
              category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
              category: "HARM_CATEGORY_DANGEROUS_CONTENT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            }
          ]
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error Response:', errorText);
        throw new Error(`API request failed: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.candidates && data.candidates[0] && data.candidates[0].content) {
        return data.candidates[0].content.parts[0].text.trim();
      } else {
        throw new Error('Invalid response format');
      }

    } catch (error) {
      console.error('Gemini API error:', error);
      
      const lowerMessage = message.toLowerCase();
      
      if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('budget')) {
        return "Our systems typically run $18K-$55K for hardware plus $8K-$18K annually for software. Most firms see ROI within 6 months through productivity gains and reduced external AI spending.\n\nWhat size team would be using this, and are you currently spending on AI tools?";
      }
      
      if (lowerMessage.includes('security') || lowerMessage.includes('private') || lowerMessage.includes('compliance')) {
        return "Everything runs on your hardware - your data never touches our servers or any cloud. We can even do air-gapped deployments for the most sensitive environments.\n\nWhat compliance frameworks do you need to meet?";
      }
      
      if (lowerMessage.includes('demo') || lowerMessage.includes('see it') || lowerMessage.includes('show')) {
        return "Absolutely. I usually do a 30-minute session where we can run it against your actual documents and use cases. Much more valuable than a generic demo.\n\nWhat would you most want to see it handle?";
      }
      
      if (lowerMessage.includes('performance') || lowerMessage.includes('speed') || lowerMessage.includes('how good')) {
        return "You get GPT-4 level capabilities with response times under 800ms. Since everything runs locally, there's no network latency or cloud throttling.\n\nAre you currently using any AI tools that have performance issues?";
      }
      
      return "That's a great question. Understanding your specific situation helps me give you the most relevant insights.\n\nCould you tell me a bit about your role and what's driving this AI exploration?";
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const newUserMessage = {
      id: Date.now(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    const currentInput = inputMessage;
    setMessages(prev => [...prev, newUserMessage]);
    setInputMessage('');
    setIsLoading(true);
    setIsTyping(true);

    try {
      const conversationHistory = messages.slice(-8);
      const response = await sendToGemini(currentInput, conversationHistory);
      
      const thinkingTime = 1200 + Math.random() * 1800;
      
      setTimeout(() => {
        const botResponse = {
          id: Date.now() + 1,
          text: response,
          sender: 'bot',
          timestamp: new Date()
        };

        setMessages(prev => [...prev, botResponse]);
        setIsLoading(false);
        setIsTyping(false);
      }, thinkingTime);

    } catch (error) {
      console.error('Error sending message:', error);
      
      setTimeout(() => {
        const errorResponse = {
          id: Date.now() + 1,
          text: "I'm having a brief connection issue. While that resolves - Libertus helps firms get enterprise AI without cloud risks. Everything runs on your premises.\n\nWhat specific AI capabilities are you looking to implement?",
          sender: 'bot',
          timestamp: new Date()
        };

        setMessages(prev => [...prev, errorResponse]);
        setIsLoading(false);
        setIsTyping(false);
      }, 1500);
    }
  };

  const handleQuickQuestion = (question) => {
    setInputMessage(question);
    setTimeout(() => handleSendMessage(), 100);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (timestamp) => {
    return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const renderMessage = (text) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={index}>{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  const adjustTextareaHeight = () => {
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
      inputRef.current.style.height = Math.min(inputRef.current.scrollHeight, 120) + 'px';
    }
  };

  const handleInputChange = (e) => {
    setInputMessage(e.target.value);
    adjustTextareaHeight();
  };

  return (
    <Modal 
      show={show} 
      onHide={onHide} 
      size="lg"
      centered
      backdrop="static"
      className="chatbot-modal"
    >
      <Modal.Header 
        closeButton
        style={{ 
          backgroundColor: '#f6f1e7',
          borderBottom: 'none'
        }}
      >
        <Modal.Title className="d-flex align-items-center" style={{ gap: '12px' }}>
          <div style={{
            width: "32px",
            height: "32px",
            background: "linear-gradient(145deg, rgba(34, 34, 34, 0.9), #000000)",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#ffffff",
            fontSize: "15px",
            fontWeight: "700",
            boxShadow: "0 2px 8px rgba(0,0,0,0.15)"
          }}>
            L
          </div>
          <div>
            <div style={{ fontSize: '18px', fontWeight: '600', color: '#1a1a1a' }}>
              Libertus AI Assistant
            </div>
            <div style={{ fontSize: '12px', color: '#666', fontWeight: '400' }}>
              Enterprise AI Solutions
            </div>
          </div>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body 
        className="p-0 d-flex flex-column" 
        style={{ 
          height: 'clamp(400px, 70vh, 600px)',
          maxHeight: '600px'
        }}
      >
        
        {/* Messages Container */}
        <div 
          style={{
            flex: '1',
            overflowY: 'auto',
            padding: 'clamp(16px, 4vw, 24px)',
            display: 'flex',
            flexDirection: 'column',
            gap: 'clamp(12px, 3vw, 20px)'
          }}
        >
          {messages.map((message) => (
            <div
              key={message.id}
              style={{
                display: 'flex',
                justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start',
                animation: 'slideIn 1s ease-out'
              }}
            >
              <div
                style={{
                  maxWidth: 'clamp(250px, 80%, 400px)',
                  padding: 'clamp(12px, 3vw, 16px) clamp(16px, 4vw, 20px)',
                  borderRadius: message.sender === 'user' ? '24px 24px 6px 24px' : '24px 24px 24px 6px',
                  backgroundColor: message.sender === 'user' ? '#1a1a1a' : '#f6f1e7',
                  color: message.sender === 'user' ? '#ffffff' : '#1a1a1a',
                  fontSize: 'clamp(14px, 3.5vw, 15px)',
                  lineHeight: '1.5',
                  wordWrap: 'break-word',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
                  whiteSpace: 'pre-wrap'
                }}
              >
                <div>{renderMessage(message.text)}</div>
                <div 
                  style={{ 
                    fontSize: 'clamp(10px, 2.5vw, 11px)', 
                    opacity: 0.6, 
                    marginTop: '8px',
                    textAlign: message.sender === 'user' ? 'right' : 'left'
                  }}
                >
                  {formatTime(message.timestamp)}
                </div>
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
              <div
                style={{
                  padding: 'clamp(12px, 3vw, 16px) clamp(16px, 4vw, 20px)',
                  borderRadius: '24px 24px 24px 6px',
                  backgroundColor: '#f6f1e7',
                  color: '#1a1a1a',
                  fontSize: 'clamp(14px, 3.5vw, 15px)',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.08)'
                }}
              >
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <span>{thinkingMessages[Math.floor(Math.random() * thinkingMessages.length)]}</span>
                  <div style={{ display: 'flex', gap: '3px', marginLeft: '4px' }}>
                    <div style={{ 
                      width: '6px', 
                      height: '6px', 
                      backgroundColor: '#1a1a1a', 
                      borderRadius: '50%',
                      animation: 'typing-pulse 1.8s infinite ease-in-out'
                    }}></div>
                    <div style={{ 
                      width: '6px', 
                      height: '6px', 
                      backgroundColor: '#1a1a1a', 
                      borderRadius: '50%',
                      animation: 'typing-pulse 1.8s infinite ease-in-out 0.3s'
                    }}></div>
                    <div style={{ 
                      width: '6px', 
                      height: '6px', 
                      backgroundColor: '#1a1a1a', 
                      borderRadius: '50%',
                      animation: 'typing-pulse 1.8s infinite ease-in-out 0.6s'
                    }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Questions */}
        {messages.length === 1 && (
          <div style={{ 
            padding: '0 clamp(16px, 4vw, 24px) clamp(12px, 3vw, 16px)',
            borderTop: '1px solid rgba(26, 26, 26, 0.05)'
          }}>
            <div style={{ 
              fontSize: 'clamp(12px, 3vw, 13px)', 
              color: '#888', 
              margin: '8px',
              fontWeight: '500'
            }}>
              Popular questions:
            </div>
            <div style={{ 
              display: 'flex', 
              flexWrap: 'wrap', 
              gap: 'clamp(6px, 2vw, 8px)'
            }}>
              {quickQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickQuestion(question)}
                  style={{
                    fontSize: 'clamp(11px, 2.8vw, 12px)',
                    padding: 'clamp(4px, 1.5vw, 6px) clamp(10px, 3vw, 14px)',
                    borderRadius: '20px',
                    border: 'none',
                    color: '#1a1a1a',
                    backgroundColor: '#f8f9fa',
                    transition: 'all 0.2s ease',
                    cursor: 'pointer',
                    fontWeight: '500'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#f6f1e7';
                    e.target.style.transform = 'translateY(-1px)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = '#f8f9fa';
                    e.target.style.transform = 'translateY(0)';
                  }}
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input Area - Fixed at bottom */}
        <div style={{ 
          padding: 'clamp(12px, 3vw, 16px) clamp(16px, 4vw, 24px) clamp(16px, 4vw, 20px)',
          borderTop: '1px solid rgba(26, 26, 26, 0.05)',
          backgroundColor: '#fafafa',
          flexShrink: 0
        }}>
          <div style={{ 
            display: 'flex', 
            gap: 'clamp(8px, 2.5vw, 12px)', 
            alignItems: 'flex-end'
          }}>
            <div style={{ flex: 1 }}>
              <textarea
                ref={inputRef}
                placeholder="Ask about our private AI platform..."
                value={inputMessage}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                onFocus={() => setInputFocused(true)}
                onBlur={() => setInputFocused(false)}
                disabled={isLoading}
                style={{
                  width: '100%',
                  minHeight: 'clamp(44px, 12vw, 48px)',
                  maxHeight: '120px',
                  padding: 'clamp(10px, 3vw, 12px) clamp(14px, 4vw, 18px)',
                  borderRadius: '24px',
                  border: 'none',
                  outline: 'none',
                  resize: 'none',
                  fontSize: 'clamp(14px, 3.5vw, 15px)',
                  lineHeight: '1.4',
                  backgroundColor: '#ffffff',
                  boxShadow: inputFocused ? '0 4px 20px rgba(26, 26, 26, 0.12)' : '0 2px 8px rgba(0,0,0,0.06)',
                  transition: 'all 0.3s ease',
                  transform: inputFocused ? 'translateY(-1px)' : 'translateY(0)',
                  fontFamily: 'inherit'
                }}
              />
            </div>
            
            <button
              onClick={handleSendMessage}
              disabled={isLoading || !inputMessage.trim()}
              style={{
                width: 'clamp(44px, 12vw, 48px)',
                height: 'clamp(44px, 12vw, 48px)',
                borderRadius: '24px',
                border: 'none',
                backgroundColor: isLoading || !inputMessage.trim() ? '#e5e5e5' : '#1a1a1a',
                color: isLoading || !inputMessage.trim() ? '#999' : '#ffffff',
                cursor: isLoading || !inputMessage.trim() ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                  transition: 'all 0.3s ease',
                alignSelf:"center",
                boxShadow: isLoading || !inputMessage.trim() ? 'none' : '0 4px 16px rgba(26, 26, 26, 0.2)',
                transform: (isLoading || !inputMessage.trim()) ? 'scale(0.95)' : 'scale(1)',
                flexShrink: 0
              }}
              onMouseEnter={(e) => {
                if (!isLoading && inputMessage.trim()) {
                  e.target.style.transform = 'scale(1.05)';
                  e.target.style.boxShadow = '0 6px 24px rgba(26, 26, 26, 0.3)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isLoading && inputMessage.trim()) {
                  e.target.style.transform = 'scale(1)';
                  e.target.style.boxShadow = '0 4px 16px rgba(26, 26, 26, 0.2)';
                }
              }}
            >
              {isLoading ? (
                <Spinner 
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  style={{ 
                    width: 'clamp(16px, 4vw, 18px)', 
                    height: 'clamp(16px, 4vw, 18px)', 
                    borderWidth: '1px' 
                  }}
                />
              ) : (
                <svg width="clamp(16px, 4vw, 18px)" height="clamp(16px, 4vw, 18px)" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                </svg>
              )}
            </button>
          </div>
          
          <div style={{ 
            fontSize: 'clamp(10px, 2.8vw, 12px)', 
            color: '#999', 
            marginTop: 'clamp(8px, 2.5vw, 12px)',
            textAlign: 'center'
          }}>
            Powered by Libertus AI • Private and secure conversations
          </div>
        </div>
      </Modal.Body>

      <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(15px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes typing-pulse {
          0%, 60%, 100% {
            opacity: 0.4;
            transform: scale(0.8);
          }
          30% {
            opacity: 1;
            transform: scale(1.2);
          }
        }

        .chatbot-modal .modal-content {
          border-radius: clamp(16px, 5vw, 24px) !important;
          border: none !important;
          box-shadow: 0 25px 80px rgba(0,0,0,0.15) !important;
          max-height: 95vh !important;
          overflow: hidden !important;
        }

        .chatbot-modal .modal-header {
          border-radius: clamp(16px, 5vw, 24px) clamp(16px, 5vw, 24px) 0 0 !important;
        }

        .chatbot-modal .modal-dialog {
          margin: clamp(1rem, 3vw, 1.75rem) auto !important;
          max-width: clamp(70vw, 600px, 600px) !important;
        }

        .chatbot-modal .modal-body {
          scrollbar-width: thin;
          scrollbar-color: rgba(26, 26, 26, 0.2) transparent;
        }

        .chatbot-modal .modal-body::-webkit-scrollbar {
          width: 6px;
        }

        .chatbot-modal .modal-body::-webkit-scrollbar-track {
          background: transparent;
        }

        .chatbot-modal .modal-body::-webkit-scrollbar-thumb {
          background-color: rgba(26, 26, 26, 0.2);
          border-radius: 3px;
        }

        .chatbot-modal .modal-body::-webkit-scrollbar-thumb:hover {
          background-color: rgba(26, 26, 26, 0.3);
        }

        @media (max-width: 768px) {
          .chatbot-modal .modal-dialog {
            margin: 0.5rem !important;
            max-width: 95vw !important;
          }
          
          .chatbot-modal .modal-content {
            max-height: 90vh !important;
          }
        }
      `}</style>
    </Modal>
  );
};

export default ChatbotModal;