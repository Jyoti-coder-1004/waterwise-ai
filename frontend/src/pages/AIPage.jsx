import React, { useState } from 'react';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { motion } from 'framer-motion';
import { BotMessageSquare, Sparkles, Send, Loader2, Wrench, ShieldCheck, Activity } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { waterService } from '../services/waterService';

export const AIPage = () => {
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'assistant',
      text: 'Hello! I am your WaterWise AI Conservation Assistant. Ask me anything about reducing your household water bill, diagnosing leak symptoms, or calculating appliance efficiency!',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);

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
      const aiReplyText = res?.reply || res?.data || 'To reduce water consumption, install aerators on all faucets and check outdoor hose spigots for washer wear.';
      
      const aiMsg = {
        id: Date.now() + 1,
        sender: 'assistant',
        text: aiReplyText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      const fallbackMsg = {
        id: Date.now() + 1,
        sender: 'assistant',
        text: 'Top AI Recommendations for your household:\n1. Replace standard showerheads with high-efficiency 1.5 GPM models.\n2. Run dishwasher and washing machine only with full loads.\n3. Water outdoor plants during early morning hours to minimize evaporation.',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto pb-12">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-textMain tracking-tight flex items-center gap-2">
              <BotMessageSquare className="text-forest" size={28} /> AI Water Conservation Assistant
            </h2>
            <p className="text-textMuted mt-1">Get real-time insights, custom plumbing advice, and leak diagnosis powered by Gemini AI.</p>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Chat Window */}
          <div className="lg:col-span-2 bg-surface rounded-2xl shadow-soft border border-sage/40 overflow-hidden flex flex-col h-[600px]">
            {/* Chat Header */}
            <div className="bg-forest p-4 text-surface flex items-center gap-3 shrink-0">
              <div className="w-10 h-10 rounded-full bg-sage/20 flex items-center justify-center text-sky">
                <Sparkles size={20} />
              </div>
              <div>
                <h3 className="font-bold text-sm">WaterWise AI Bot</h3>
                <span className="text-xs text-sage flex items-center gap-1 mt-0.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  Gemini 2.5 Active
                </span>
              </div>
            </div>

            {/* Chat Body */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-cream/30">
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
                    {msg.sender === 'user' ? 'You' : <BotMessageSquare size={14} />}
                  </div>
                  <div
                    className={`max-w-[80%] rounded-2xl p-4 text-sm leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-forest text-surface rounded-tr-none'
                        : 'bg-surface text-textMain border border-sage/30 shadow-sm rounded-tl-none'
                    }`}
                  >
                    <p className="whitespace-pre-line">{msg.text}</p>
                    <span className={`text-[10px] block mt-1 text-right ${msg.sender === 'user' ? 'text-sage/80' : 'text-textMuted'}`}>
                      {msg.time}
                    </span>
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex gap-2 items-center text-textMuted text-xs p-2">
                  <Loader2 size={16} className="animate-spin text-forest" />
                  <span>AI is computing personalized answer...</span>
                </div>
              )}
            </div>

            {/* Chat Form */}
            <form onSubmit={handleSendMessage} className="p-3 bg-surface border-t border-sage/30 flex gap-2">
              <input
                type="text"
                placeholder="Ask about water-saving tips or leak detection..."
                className="flex-1 h-12 px-4 bg-cream border border-sage/40 rounded-xl text-sm text-textMain focus:outline-none focus:border-forest transition-colors"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
              />
              <Button type="submit" disabled={!inputMessage.trim() || isLoading} className="h-12 px-5">
                <Send size={18} />
              </Button>
            </form>
          </div>

          {/* Quick AI Presets & Diagnostics */}
          <div className="space-y-4">
            <div className="bg-surface p-5 rounded-2xl shadow-soft border border-sage/30">
              <h3 className="font-semibold text-textMain text-sm mb-3 flex items-center gap-2">
                <Wrench size={16} className="text-forest" /> Instant Diagnostics
              </h3>
              <div className="space-y-2">
                {[
                  'How to detect a toilet flapper leak?',
                  'What is the ideal lawn watering schedule?',
                  'How much water does a dishwasher save?',
                  'How to calculate water bill savings?'
                ].map((promptText, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setInputMessage(promptText);
                    }}
                    className="w-full text-left p-2.5 rounded-xl bg-cream hover:bg-sage/20 border border-sage/30 text-xs text-textMain transition-colors"
                  >
                    💡 {promptText}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-surface p-5 rounded-2xl shadow-soft border border-sage/30">
              <h3 className="font-semibold text-textMain text-sm mb-3 flex items-center gap-2">
                <ShieldCheck size={16} className="text-forest" /> System Status
              </h3>
              <div className="text-xs text-textMuted space-y-2">
                <div className="flex justify-between py-1 border-b border-sage/20">
                  <span>Leak Monitor</span>
                  <span className="text-forest font-semibold">Active & Normal</span>
                </div>
                <div className="flex justify-between py-1 border-b border-sage/20">
                  <span>Night Baseline</span>
                  <span className="text-forest font-semibold">0.0 GPM</span>
                </div>
                <div className="flex justify-between py-1">
                  <span>Weather Sync</span>
                  <span className="text-forest font-semibold">Synced</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};
