import React, { useState, useRef, useEffect } from 'react';
import { BotMessageSquare, X, Send, Loader2, Sparkles, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { waterService } from '../../services/waterService';

export const AIChatModal = ({ isOpen, onClose }) => {
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'assistant',
      text: 'Hello! I am your WaterWise AI Assistant. How can I help you save water or optimize your consumption today?',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (e) => {
    if (e) e.preventDefault();
    if (!inputMessage.trim() || isLoading) return;

    const userText = inputMessage.trim();
    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: userText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const res = await waterService.postAIChat(userText, messages);
      const aiReplyText = res?.reply || res?.data || 'To reduce your household consumption, install low-flow aerators on faucets and fix silent toilet leaks.';
      
      const aiMsg = {
        id: Date.now() + 1,
        sender: 'assistant',
        text: aiReplyText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      console.warn('AI Chat API error fallback:', err);
      const fallbackMsg = {
        id: Date.now() + 1,
        sender: 'assistant',
        text: 'Here are 3 quick ways to save water at home:\n1. Fix leaky faucets (saves up to 75L/day).\n2. Take 5-minute showers instead of baths.\n3. Turn off running water while brushing teeth.',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.95 }}
        className="fixed bottom-24 right-6 z-50 w-96 max-w-[calc(100vw-3rem)] bg-surface rounded-3xl shadow-float border border-sage/40 overflow-hidden flex flex-col h-[520px]"
      >
        {/* Header */}
        <div className="bg-forest p-4 text-surface flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-sage/20 flex items-center justify-center text-sky">
              <Sparkles size={20} />
            </div>
            <div>
              <h3 className="font-bold text-sm leading-tight">WaterWise AI Assistant</h3>
              <span className="text-xs text-sage flex items-center gap-1.5 mt-0.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                Online & Ready
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-sage transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Messages Body */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-cream/40">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs font-semibold ${
                  msg.sender === 'user' ? 'bg-forest text-surface' : 'bg-sky/20 text-sky'
                }`}
              >
                {msg.sender === 'user' ? <User size={14} /> : <BotMessageSquare size={14} />}
              </div>
              <div
                className={`max-w-[75%] rounded-2xl p-3 text-sm leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-forest text-surface rounded-tr-none'
                    : 'bg-surface text-textMain border border-sage/30 shadow-sm rounded-tl-none'
                }`}
              >
                <p className="whitespace-pre-line">{msg.text}</p>
                <span
                  className={`text-[10px] block mt-1 text-right ${
                    msg.sender === 'user' ? 'text-sage/80' : 'text-textMuted'
                  }`}
                >
                  {msg.time}
                </span>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-3 items-center text-textMuted text-xs p-2">
              <Loader2 size={16} className="animate-spin text-forest" />
              <span>AI is thinking...</span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Footer */}
        <form onSubmit={handleSendMessage} className="p-3 bg-surface border-t border-sage/30 flex gap-2">
          <input
            type="text"
            placeholder="Ask about water saving tips..."
            className="flex-1 h-11 px-4 bg-cream border border-sage/40 rounded-xl text-sm text-textMain focus:outline-none focus:border-forest transition-colors"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
          />
          <button
            type="submit"
            disabled={!inputMessage.trim() || isLoading}
            className="w-11 h-11 bg-forest text-surface rounded-xl flex items-center justify-center hover:bg-opacity-90 disabled:opacity-50 transition-all shrink-0"
          >
            <Send size={18} />
          </button>
        </form>
      </motion.div>
    </AnimatePresence>
  );
};
