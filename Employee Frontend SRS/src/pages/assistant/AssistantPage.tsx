import { useEffect, useRef, useState } from "react";
import { Send, Bot, User, Loader2, Zap, Target, AlertTriangle, BookOpen } from "lucide-react";
import { assistantApi } from "../../services/assistantApi";
import { DEMO_PROFILE } from "../../data/mockData";
import type { AIMessage } from "../../types";

const SUGGESTED_PROMPTS = [
  "Explain my biggest skill gap",
  "Create a 7-day learning plan",
  "Why was Python recommended for me?",
  "Test my Machine Learning basics",
  "Explain machine learning simply",
  "What should I learn next?",
];

function MessageBubble({ message }: { message: AIMessage }) {
  const isUser = message.role === "user";

  const formatContent = (text: string) => {
    return text.split(/(\*\*.*?\*\*|\n)/).map((part, i) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return <strong key={i}>{part.slice(2, -2)}</strong>;
      }
      if (part === "\n") return <br key={i} />;
      return part;
    });
  };

  return (
    <div className={`flex gap-3 animate-slide-in-right ${isUser ? "flex-row-reverse" : ""}`}>
      <div className={`
        w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1
        ${isUser ? "bg-[var(--color-blue-primary)]" : "bg-[var(--color-navy-900)]"}
      `}>
        {isUser ? <User size={14} className="text-white" /> : <Bot size={14} className="text-white" />}
      </div>

      <div className={`max-w-[80%] space-y-2 ${isUser ? "items-end flex flex-col" : ""}`}>
        <div className={`
          px-4 py-3 rounded-2xl text-sm leading-relaxed
          ${isUser
            ? "bg-[var(--color-blue-primary)] text-white rounded-tr-sm"
            : "bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text)] rounded-tl-sm shadow-[var(--shadow-sm)]"}
        `}>
          {formatContent(message.content)}
        </div>

        {message.recommendations && message.recommendations.length > 0 && (
          <div className="space-y-1">
            <div className="text-[10px] font-mono text-[var(--color-muted-fg)] uppercase tracking-wider">Recommendations</div>
            {message.recommendations.map((r) => (
              <div key={r} className="flex items-center gap-2 text-xs bg-[var(--color-blue-muted)] text-[var(--color-blue-primary)] px-3 py-1.5 rounded-lg border border-blue-100">
                <BookOpen size={11} />
                {r}
              </div>
            ))}
          </div>
        )}

        {message.nextActions && message.nextActions.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {message.nextActions.map((a) => (
              <span key={a} className="text-[10px] bg-[var(--color-muted)] text-[var(--color-text-secondary)] px-2.5 py-1 rounded-full">{a}</span>
            ))}
          </div>
        )}

        <div className="text-[10px] text-[var(--color-muted-fg)]">
          {new Date(message.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </div>
      </div>
    </div>
  );
}

export default function AssistantPage() {
  const [messages, setMessages] = useState<AIMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    assistantApi.getInitialMessages()
      .then(setMessages)
      .finally(() => setInitialLoading(false));
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = async (text: string) => {
    if (!text.trim() || loading) return;

    const userMsg: AIMessage = {
      id: `msg-${Date.now()}`,
      role: "user",
      content: text.trim(),
      timestamp: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    const response = await assistantApi.sendMessage(text.trim());
    setMessages((prev) => [...prev, response]);
    setLoading(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send(input);
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex-shrink-0 border-b border-[var(--color-border)] bg-[var(--color-surface)] px-5 lg:px-7 py-4">
        <div className="flex items-center gap-3 max-w-3xl mx-auto">
          <div className="w-9 h-9 rounded-xl bg-[var(--color-navy-900)] flex items-center justify-center">
            <Bot size={18} className="text-white" />
          </div>
          <div>
            <div className="text-sm font-semibold text-[var(--color-text)]" style={{ fontFamily: "var(--font-display)" }}>
              AI Learning Coach
            </div>
            <div className="text-xs text-[var(--color-muted-fg)]">Personalised to your competency profile</div>
          </div>
        </div>

        {/* Context strip */}
        <div className="flex flex-wrap items-center gap-3 mt-4 max-w-3xl mx-auto">
          <div className="flex items-center gap-1.5 text-[11px] bg-[var(--color-muted)] rounded-lg px-3 py-1.5">
            <Target size={11} className="text-[var(--color-blue-primary)]" />
            <span className="text-[var(--color-text-secondary)]">Target: <strong className="text-[var(--color-text)]">{DEMO_PROFILE.targetRole}</strong></span>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] bg-[var(--color-critical-bg)] rounded-lg px-3 py-1.5">
            <AlertTriangle size={11} className="text-[var(--color-critical-fg)]" />
            <span className="text-[var(--color-text-secondary)]">Top gap: <strong className="text-[var(--color-text)]">Machine Learning</strong></span>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] bg-[var(--color-blue-muted)] rounded-lg px-3 py-1.5">
            <Zap size={11} className="text-[var(--color-blue-primary)]" />
            <span className="text-[var(--color-text-secondary)]">Competency: <strong className="text-[var(--color-text)]">58%</strong></span>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-5 lg:px-7 py-5 space-y-5 max-w-3xl mx-auto w-full">
        {initialLoading ? (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full skeleton flex-shrink-0" />
            <div className="space-y-2 flex-1">
              <div className="skeleton h-16 w-3/4 rounded-2xl" />
            </div>
          </div>
        ) : (
          messages.map((msg) => <MessageBubble key={msg.id} message={msg} />)
        )}

        {loading && (
          <div className="flex gap-3 animate-fade-in">
            <div className="w-8 h-8 rounded-full bg-[var(--color-navy-900)] flex items-center justify-center flex-shrink-0">
              <Bot size={14} className="text-white" />
            </div>
            <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl rounded-tl-sm px-4 py-3 shadow-[var(--shadow-sm)]">
              <div className="flex items-center gap-1.5">
                <Loader2 size={13} className="text-[var(--color-blue-primary)] animate-spin" />
                <span className="text-xs text-[var(--color-muted-fg)]">Thinking…</span>
              </div>
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Suggested prompts */}
      {messages.length <= 1 && !loading && (
        <div className="flex-shrink-0 px-5 lg:px-7 pb-3 max-w-3xl mx-auto w-full">
          <div className="text-[10px] font-mono text-[var(--color-muted-fg)] uppercase tracking-wider mb-2">Suggested questions</div>
          <div className="flex flex-wrap gap-2">
            {SUGGESTED_PROMPTS.map((prompt) => (
              <button
                key={prompt}
                onClick={() => send(prompt)}
                className="text-xs border border-[var(--color-border)] rounded-full px-3 py-1.5 hover:border-[var(--color-blue-primary)] hover:bg-[var(--color-blue-muted)] hover:text-[var(--color-blue-primary)] transition-all text-[var(--color-text-secondary)]"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="flex-shrink-0 border-t border-[var(--color-border)] bg-[var(--color-surface)] px-5 lg:px-7 py-4">
        <div className="flex items-end gap-3 max-w-3xl mx-auto">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about your skills, gaps, or learning…"
            rows={1}
            className="flex-1 resize-none px-4 py-3 bg-[var(--color-muted)] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-blue-primary)] transition-colors placeholder:text-[var(--color-muted-fg)] max-h-32"
            style={{ lineHeight: "1.5" }}
            aria-label="Message input"
          />
          <button
            onClick={() => send(input)}
            disabled={!input.trim() || loading}
            className="w-10 h-10 flex items-center justify-center rounded-xl bg-[var(--color-blue-primary)] text-white hover:bg-[var(--color-blue-light)] transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0"
            aria-label="Send message"
          >
            <Send size={15} />
          </button>
        </div>
        <div className="mt-2 text-[10px] text-[var(--color-muted-fg)] max-w-3xl mx-auto text-center">
          AI responses are based on synthetic demo data only. Not real government data.
        </div>
      </div>
    </div>
  );
}
