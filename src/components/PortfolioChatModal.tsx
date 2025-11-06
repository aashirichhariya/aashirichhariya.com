import React, { useState, useRef, useEffect } from 'react';
import { Modal, Spinner } from 'react-bootstrap';
import { motion } from 'framer-motion';
import 'bootstrap/dist/css/bootstrap.min.css';

interface PortfolioChatModalProps {
  show: boolean;
  onHide: () => void;
}

interface Message {
  id: number;
  text: string;
  sender: string;
  timestamp: Date;
}

const PortfolioChatModal: React.FC<PortfolioChatModalProps> = ({ show, onHide }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hi there! I'm Aashi's AI assistant. I'm here to tell you about Aashi, a Creative UX Leader with expertise in AI-powered platforms across enterprise, healthcare, and B2B domains.\n\nWhat would you like to know about Aashi's work and experience?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [inputFocused, setInputFocused] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

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
    "Tell me about your experience",
    "What projects have you worked on?", 
    "What are your key skills?",
    "What's your design philosophy?"
  ];

  const thinkingMessages = [
    "Let me think about that...",
    "Analyzing your question...",
    "Considering the best response...",
    "Reviewing Aashi's portfolio..."
  ];

  const sendToGemini = async (message: string, conversationHistory: Message[] = []) => {
    const SYSTEM_PROMPT = `You are Aashi's AI assistant. You represent Aashi, a Creative UX Leader with 5+ years of experience designing AI-powered platforms across enterprise, healthcare, and B2B domains.

PORTFOLIO OVERVIEW:
- Lead designer for Publicis Groupe's CoreAI platform, working with Tier 1 enterprises like Novartis, PayPal, Kellanova, Coca-Cola, and Mars
- Transformed clinical workflows into emotionally supportive experiences for healthcare clients
- Created engaging B2B experiences with AI-powered personalization
- Built and scaled multi-brand design systems for retail digital ecosystems

KEY ACHIEVEMENTS:
- Contributed to $15M+ pipeline
- Mentored 10+ designers
- Resolved 98+ QA issues
- Featured in global design publications
- Led Fortune 500 transformations

DESIGN PHILOSOPHY:
- Human-centered AI design
- Balances technical innovation with user empathy
- Translates complex business needs into compelling digital solutions
- Strategic UX leadership that delivers measurable outcomes

CONVERSATION STYLE:
- Professional but warm
- Knowledgeable about UX, design systems, and AI
- Showcase Aashi's portfolio highlights
- Reference specific case studies when relevant
- Highlight impact and strategic outcomes

RESPONSE GUIDELINES:
- Keep responses 2-4 sentences unless they ask for details
- Use **bold** sparingly for key benefits only
- Reference specific achievements when relevant
- Avoid generic responses - be specific to Aashi's work

Remember: You're representing a skilled UX leader who specializes in human-centered AI design with enterprise-level impact.`;

    try {
      const contents = [];
      
      contents.push({
        role: "user",
        parts: [{ text: SYSTEM_PROMPT }]
      });
      
      contents.push({
        role: "model", 
        parts: [{ text: "I understand I'm representing Aashi, a Creative UX Leader specializing in human-centered AI design across enterprise platforms. I'll highlight Aashi's experience with Publicis Groupe's CoreAI, healthcare transformations, and multi-brand design systems while emphasizing key achievements and strategic impact." }]
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
      
      if (lowerMessage.includes('experience') || lowerMessage.includes('background')) {
        return "Aashi is a Creative UX Leader with 5+ years designing AI-powered platforms for enterprise clients like Novartis, PayPal, and Coca-Cola. Aashi's expertise spans healthcare transformation, B2B experiences, and multi-brand design systems.\n\nWhat specific aspect of Aashi's work would you like to explore further?";
      }
      
      if (lowerMessage.includes('projects') || lowerMessage.includes('portfolio')) {
        return "Aashi's notable projects include CoreAI (Publicis Groupe's flagship AI platform), Pollin Fertility (healthcare innovation), Hungerhub (food tech platform), and Wawa's digital ecosystem.\n\nEach project demonstrates Aashi's ability to translate complex business needs into compelling digital experiences. Which project would you like to learn more about?";
      }
      
      if (lowerMessage.includes('skills') || lowerMessage.includes('expertise')) {
        return "Aashi's core skills include UX/UI design for AI systems, enterprise platform architecture, design system development, and strategic creative leadership. Aashi excels at transforming complex workflows into intuitive experiences and mentoring design teams.\n\nAre you interested in a particular skill area?";
      }
      
      return "That's an interesting question. Aashi has worked on numerous enterprise AI platforms, healthcare experiences, and B2B solutions that demonstrate creative UX leadership.\n\nCould you share what specific aspect of Aashi's background or projects you're most interested in?";
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
          text: "I'm having a brief connection issue. While that resolves - Aashi is a Creative UX Leader specializing in AI-powered platforms for enterprise, healthcare, and B2B domains.\n\nWhat specific aspect of Aashi's work would you like to know about?",
          sender: 'bot',
          timestamp: new Date()
        };

        setMessages(prev => [...prev, errorResponse]);
        setIsLoading(false);
        setIsTyping(false);
      }, 1500);
    }
  };

  const handleQuickQuestion = (question: string) => {
    setInputMessage(question);
    setTimeout(() => handleSendMessage(), 100);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (timestamp: Date) => {
    return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const renderMessage = (text: string) => {
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

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
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
          backgroundColor: '#0f172a',
          borderBottom: 'none'
        }}
      >
        <Modal.Title className="d-flex align-items-center" style={{ gap: '12px' }}>
          <div style={{
            width: "32px",
            height: "32px",
            background: "linear-gradient(145deg, #7c3aed, #5a2cab)",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#ffffff",
            fontSize: "15px",
            fontWeight: "700",
            boxShadow: "0 2px 8px rgba(124, 58, 237, 0.3)"
          }}>
            A
          </div>
          <div>
            <div style={{ fontSize: '18px', fontWeight: '600', color: '#ffffff' }}>
              Aashi's AI Assistant
            </div>
            <div style={{ fontSize: '12px', color: '#a8b3cf', fontWeight: '400' }}>
              UX Portfolio Chat
            </div>
          </div>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body 
        className="p-0 d-flex flex-column" 
        style={{ 
          height: 'clamp(400px, 70vh, 600px)',
          maxHeight: '600px',
          background: 'linear-gradient(180deg, #0f172a 0%, #000000 100%)'
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
                  backgroundColor: message.sender === 'user' ? '#7c3aed' : 'rgba(255, 255, 255, 0.05)',
                  color: '#ffffff',
                  fontSize: 'clamp(14px, 3.5vw, 15px)',
                  lineHeight: '1.5',
                  wordWrap: 'break-word',
                  boxShadow: message.sender === 'user' 
                    ? '0 2px 12px rgba(124, 58, 237, 0.3)' 
                    : '0 2px 12px rgba(0,0,0,0.2)',
                  whiteSpace: 'pre-wrap',
                  backdropFilter: message.sender === 'bot' ? 'blur(10px)' : 'none',
                  border: message.sender === 'bot' ? '1px solid rgba(124, 58, 237, 0.3)' : 'none'
                }}
              >
                <div style={{ fontWeight: message.sender === 'bot' ? 200 : 300 }}>{renderMessage(message.text)}</div>
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
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(124, 58, 237, 0.3)',
                  color: '#ffffff',
                  fontSize: 'clamp(14px, 3.5vw, 15px)',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.2)'
                }}
              >
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <span>{thinkingMessages[Math.floor(Math.random() * thinkingMessages.length)]}</span>
                  <div style={{ display: 'flex', gap: '3px', marginLeft: '4px' }}>
                    <motion.div 
                      animate={{ 
                        scale: [0.8, 1.2, 0.8], 
                        opacity: [0.4, 1, 0.4] 
                      }}
                      transition={{ 
                        repeat: Infinity, 
                        duration: 1.8, 
                      }}
                      style={{ 
                        width: '6px', 
                        height: '6px', 
                        backgroundColor: '#7c3aed', 
                        borderRadius: '50%'
                      }}
                    />
                    <motion.div 
                      animate={{ 
                        scale: [0.8, 1.2, 0.8], 
                        opacity: [0.4, 1, 0.4] 
                      }}
                      transition={{ 
                        repeat: Infinity, 
                        duration: 1.8, 
                        delay: 0.3
                      }}
                      style={{ 
                        width: '6px', 
                        height: '6px', 
                        backgroundColor: '#7c3aed', 
                        borderRadius: '50%'
                      }}
                    />
                    <motion.div 
                      animate={{ 
                        scale: [0.8, 1.2, 0.8], 
                        opacity: [0.4, 1, 0.4] 
                      }}
                      transition={{ 
                        repeat: Infinity, 
                        duration: 1.8, 
                        delay: 0.6
                      }}
                      style={{ 
                        width: '6px', 
                        height: '6px', 
                        backgroundColor: '#7c3aed', 
                        borderRadius: '50%'
                      }}
                    />
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
            borderTop: '1px solid rgba(124, 58, 237, 0.2)'
          }}>
            <div style={{ 
              fontSize: 'clamp(12px, 3vw, 13px)', 
              color: '#a8b3cf', 
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
                    border: '1px solid rgba(124, 58, 237, 0.3)',
                    color: '#ffffff',
                    backgroundColor: 'rgba(124, 58, 237, 0.1)',
                    transition: 'all 0.2s ease',
                    cursor: 'pointer',
                    fontWeight: '500'
                  }}
                  onMouseEnter={(e) => {
                    const target = e.target as HTMLButtonElement;
                    target.style.backgroundColor = 'rgba(124, 58, 237, 0.2)';
                    target.style.transform = 'translateY(-1px)';
                  }}
                  onMouseLeave={(e) => {
                    const target = e.target as HTMLButtonElement;
                    target.style.backgroundColor = 'rgba(124, 58, 237, 0.1)';
                    target.style.transform = 'translateY(0)';
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
          borderTop: '1px solid rgba(124, 58, 237, 0.2)',
          backgroundColor: 'rgba(15, 23, 42, 0.8)',
          backdropFilter: 'blur(10px)',
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
                placeholder="Ask about Aashi's portfolio..."
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
                  border: '1px solid rgba(124, 58, 237, 0.3)',
                  outline: 'none',
                  resize: 'none',
                  fontSize: 'clamp(14px, 3.5vw, 15px)',
                  lineHeight: '1.4',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  color: '#ffffff',
                  boxShadow: inputFocused ? '0 4px 20px rgba(124, 58, 237, 0.2)' : '0 2px 8px rgba(0,0,0,0.1)',
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
                backgroundColor: '#7c3aed',
                color: '#ffffff',
                cursor: isLoading || !inputMessage.trim() ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                alignSelf: "center",
                boxShadow: isLoading || !inputMessage.trim() ? 'none' : '0 4px 16px rgba(124, 58, 237, 0.2)',
                transform: (isLoading || !inputMessage.trim()) ? 'scale(0.95)' : 'scale(1)',
                flexShrink: 0,
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                if (!isLoading && inputMessage.trim()) {
                  const target = e.target as HTMLButtonElement;
                  target.style.transform = 'scale(1.05)';
                  target.style.boxShadow = '0 6px 24px rgba(124, 58, 237, 0.3)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isLoading && inputMessage.trim()) {
                  const target = e.target as HTMLButtonElement;
                  target.style.transform = 'scale(1)';
                  target.style.boxShadow = '0 4px 16px rgba(124, 58, 237, 0.2)';
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
            fontSize: 'clamp(10px, 2.8vw, 11px)', 
            color: '#a8b3cf', 
            marginTop: 'clamp(8px, 2.5vw, 12px)',
            padding: '8px 0'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              padding: '6px 12px',
              borderRadius: '8px',
              background: 'linear-gradient(to right, rgba(124, 58, 237, 0.05), rgba(30, 64, 175, 0.05))',
              border: '1px solid rgba(124, 58, 237, 0.15)',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '5px'
              }}>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#7c3aed" strokeWidth="2"/>
                  <path d="M12 15V8" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M12 18.01L12.01 17.9989" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                <span style={{ color: '#7c3aed', fontWeight: '600' }}>Privacy First</span>
              </div>
              <span>No conversations are tracked or stored</span>
            </div>
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

        .chatbot-modal .modal-content {
          border-radius: clamp(16px, 5vw, 24px) !important;
          border: 1px solid rgba(124, 58, 237, 0.3) !important;
          box-shadow: 0 25px 80px rgba(124, 58, 237, 0.15) !important;
          max-height: 95vh !important;
          overflow: hidden !important;
          background: linear-gradient(180deg, #0f172a 0%, #000000 100%) !important;
        }

        .chatbot-modal .modal-header {
          border-radius: clamp(16px, 5vw, 24px) clamp(16px, 5vw, 24px) 0 0 !important;
          border-bottom: 1px solid rgba(124, 58, 237, 0.2) !important;
        }

        .chatbot-modal .modal-dialog {
          margin: clamp(1rem, 3vw, 1.75rem) auto !important;
          max-width: clamp(70vw, 600px, 600px) !important;
        }

        .chatbot-modal .modal-body {
          scrollbar-width: thin;
          scrollbar-color: rgba(124, 58, 237, 0.3) transparent;
        }

        .chatbot-modal .modal-body::-webkit-scrollbar {
          width: 6px;
        }

        .chatbot-modal .modal-body::-webkit-scrollbar-track {
          background: transparent;
        }

        .chatbot-modal .modal-body::-webkit-scrollbar-thumb {
          background-color: rgba(124, 58, 237, 0.3);
          border-radius: 3px;
        }

        .chatbot-modal .modal-body::-webkit-scrollbar-thumb:hover {
          background-color: rgba(124, 58, 237, 0.5);
        }

        .chatbot-modal .btn-close {
          color: #ffffff !important;
          filter: brightness(0) invert(1);
          opacity: 0.7;
        }

        .chatbot-modal .btn-close:hover {
          opacity: 1;
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

export default PortfolioChatModal;