import { useState, useRef, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import './Chatbot.css';

const FS_TARGET = import.meta.env.VITE_FORMSUBMIT_URL;
const GS_TARGET = import.meta.env.VITE_GS_SYNC_URL;

const INITIAL_MSGS = [{ from: 'bot', text: "Hi there! 👋 I'm the Varsaka Labs assistant. How can I help you today?", time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }];

const KNOWLEDGE_BASE = [
  { keywords: ['hi', 'hello', 'hey', 'greetings', 'good morning', 'good afternoon'], reply: "Hello! 👋 Welcome to Varsaka Labs. I'm here to help you with any software testing or quality engineering questions you have!" },
  { keywords: ['thanks', 'thank you', 'thx', 'appreciate', 'helpful'], reply: "You're very welcome! 😊 We pride ourselves on being helpful partners. Is there anything else I can assist you with today?" },
  { keywords: ['service', 'offer', 'do you do', 'what do you'], reply: "We provide end-to-end Quality Engineering! Our core services include Functional Testing, Test Automation (Selenium/Playwright), Performance Testing (JMeter/k6), Security Audits, and AI-Powered QA Solutions." },
  { keywords: ['price', 'cost', 'rate', 'charge'], reply: "Our pricing is tailored to your project scope. We offer both fixed-price projects and monthly retainers. Would you like to schedule a free consultation to get a quote?" },
  { keywords: ['location', 'where', 'office', 'headquarter'], reply: "We are headquartered in Hyderabad, India's tech hub, but we serve clients globally across the US, Europe, and Asia." },
  { keywords: ['tool', 'tech', 'stack', 'framework'], reply: "We work with modern tools like Selenium, Playwright, Cypress, JMeter, Appium, and Jenkins. We also build custom AI testing frameworks for our enterprise clients." },
  { keywords: ['time', 'duration', 'start', 'how long'], reply: "We can typically onboard a team and start testing within 3-5 business days of the initial discovery call." },
  { keywords: ['careers', 'job', 'hiring', 'work at'], reply: "We are always looking for passionate QA engineers! Check out our Careers page or send your CV to careers@varsaka.com." },
  { keywords: ['about', 'company', 'varsaka', 'who is', 'background'], reply: "At Varsaka Labs, we don't just 'find bugs'—we solve the release-day anxiety that keeps CTOs up at night. 🌙 We noticed too many teams were slowing down due to manual bottlenecks or unstable automation, so we built a partnership-first model. We step into your workflow to ensure your software is resilient, your CI/CD is fast, and your users have a zero-glitch experience." },
  { keywords: ['who are you', 'your name', 'what are you'], reply: "I'm the Varsaka AI Assistant! I'm here to provide information about our services and help you connect with our human experts." },
  { keywords: ['human', 'person', 'real agent', 'speak to'], reply: "I can definitely get a human to help you! Would you like to leave your email so one of our consultants can reach out?" },
  { keywords: ['mobile', 'app', 'android', 'ios'], reply: "Yes! We offer extensive Mobile App Testing for both iOS and Android, including automation with Appium and real-device testing." },
  { keywords: ['fast', 'speed', 'response', 'quick'], reply: "We value your time! We typically respond to all inquiries within 4 business hours." }
];

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState(INITIAL_MSGS);
  const [input, setInput] = useState('');
  const [isLeadMode, setIsLeadMode] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [userContext, setUserContext] = useState('');
  const [showOptions, setShowOptions] = useState(true);
  const [sending, setSending] = useState(false);
  const bodyRef = useRef(null);

  const addMsg = (text, from) => {
    setMessages(prev => [...prev, { from, text, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
  };

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const botReply = (text, delay = 800) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      addMsg(text, 'bot');
    }, delay);
  };

  const handleOption = (reply, action) => {
    setShowOptions(false);
    if (action === 'meet') {
      addMsg('Book a Meeting / Talk to Human', 'user');
      setIsLeadMode(true);
      botReply('Excellent choice! Please leave your Email Address and a brief note about your project. I\'ll notify our consultants immediately.');
    } else {
      addMsg(reply === 'services' ? 'Tell me about your services' : 'How do I contact you?', 'user');
      if (reply === 'services') {
        botReply('We specialize in full-spectrum Quality Engineering! We handle everything from Manual UI checks to complex CI/CD Automation and Security Pen-testing.');
      } else {
        botReply('You can reach us at info@varsaka.com, or I can take your details right here and have someone call you back!');
      }
      setTimeout(() => setShowOptions(true), 1500);
    }
  };

  const handleSend = async () => {
    const text = input.trim();
    if (!text || sending || isTyping) return;
    setInput('');
    setShowOptions(false);
    addMsg(text, 'user');

    if (isLeadMode) {
      setIsLeadMode(false);
      setSending(true);
      botReply('Got it! Sending your details to our team now...');
      
      const payload = { 
        _subject: 'High-Priority Chatbot Lead', 
        'User Message': text, 
        'Chat History Context': userContext || 'Direct Inquiry' 
      };

      try {
        const res = await fetch(FS_TARGET, { 
          method: 'POST', 
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }, 
          body: JSON.stringify(payload) 
        });
        
        const emailMatch = text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
        const extractedEmail = emailMatch ? emailMatch[0] : 'bot-lead@varsaka.com';
        
        await supabase.from('leads').insert([{
          name: 'Advanced Bot Lead',
          email: extractedEmail,
          service: 'Bot Consultation',
          message: `[Context: ${userContext}] | [Lead Info: ${text}]`,
          source: 'AI Chatbot' // 🤖 Source Tag
        }]);

        // 🚀 SYNC TO GOOGLE SHEETS
        const gsUrl = import.meta.env.VITE_GS_SYNC_URL;
        if (gsUrl) {
          fetch(gsUrl, {
            method: 'POST',
            mode: 'no-cors',
            body: JSON.stringify({ 
              action: 'add', 
              name: 'AI Bot Lead',
              email: extractedEmail,
              phone: "'No Phone", // Bot currently doesn't ask for phone specifically
              service: 'Bot Consultation',
              msg: `[Context: ${userContext}] | [Lead Info: ${text}]`
            })
          }).catch(err => console.error('GS Bot Sync Error:', err));
        }

        botReply(res.ok ? '✅ All set! A Varsaka expert will reach out to you within 4 hours. Anything else I can help with?' : '❌ I had a slight connection issue, but don\'t worry—I\'ve logged your request. You can also email us at info@varsaka.com.');
        setTimeout(() => setShowOptions(true), 2000);
      } catch (err) {
        console.error('Chatbot Error:', err);
        botReply('❌ Connection error. Please try our website contact form or email us at info@varsaka.com.');
      }
      setSending(false);
      return;
    }

    const lower = text.toLowerCase();
    setUserContext(prev => prev + " | " + text);

    let found = false;
    for (const item of KNOWLEDGE_BASE) {
      if (item.keywords.some(k => lower.includes(k))) {
        botReply(item.reply);
        found = true;
        break;
      }
    }

    if (!found) {
      if (lower.length < 3) {
        botReply("I'm here to help! Feel free to ask about our testing services, pricing, or how to start a project.");
      } else if (lower.includes('?') || lower.length > 20) {
        setIsLeadMode(true);
        botReply("That's a specific question! I'll need to check with our experts on that one. If you leave your email, I'll have someone get back to you with a detailed answer.");
      } else {
        botReply("I'm not quite sure I understand. Could you rephrase that, or would you like to speak with a human expert?");
      }
    }
    
    setTimeout(() => setShowOptions(true), 2000);
  };

  return (
    <>
      <button className="chatbot-toggler" aria-label="Open Chat" onClick={() => setOpen(o => !o)}>
        {open ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        ) : (
          <div className="animated-bot">🤖</div>
        )}
      </button>

      {open && (
        <div className="chatbot-window active">
          <div className="chat-header">
            <div className="header-info">
              <div className="header-status" />
              <span>Varsaka AI Assistant</span>
            </div>
            <button className="close-chat" onClick={() => setOpen(false)}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          <div className="chat-body" ref={bodyRef}>
            {messages.map((m, i) => (
              <div key={i} className={`message-wrapper ${m.from}`}>
                <div className={`message ${m.from}-message`}>
                  {m.text}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="message-wrapper bot">
                <div className="message bot-message typing">
                  <span className="dot"></span><span className="dot"></span><span className="dot"></span>
                </div>
              </div>
            )}

            {showOptions && !isTyping && (
              <div className="chat-options">
                <button className="chat-opt" onClick={() => handleOption('services', null)}>Our QA Services 🧪</button>
                <button className="chat-opt" onClick={() => handleOption('contact', null)}>Contact Info 📧</button>
                <button className="chat-opt" onClick={() => handleOption(null, 'meet')}>Free Consultation 🚀</button>
              </div>
            )}
          </div>

          <div className="chat-footer">
            <input
              type="text"
              className="chat-input"
              placeholder="Type your question..."
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyPress={e => e.key === 'Enter' && handleSend()}
            />
            <button className="chat-send-btn" onClick={handleSend} disabled={sending || isTyping}>➤</button>
          </div>
        </div>
      )}
    </>
  );
}
