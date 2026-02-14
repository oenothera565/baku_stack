"use client";

import { useState, useRef, useEffect } from "react";
import { useTerminal } from "@/context/TerminalContext";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export function TerminalChat() {
  const { isOpen, closeTerminal } = useTerminal();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage }),
      });

      const data = await response.json();

      if (data.error) {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: `Error: ${data.error}` },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: data.content },
        ]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Error: Failed to connect" },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-0 right-0 w-full md:w-[500px] h-[500px] bg-white dark:bg-black border-2 border-black dark:border-white border-t-2 border-l-2 flex flex-col font-mono text-sm z-50">
      {/* Terminal Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b-2 border-black dark:border-white bg-black dark:bg-white text-white dark:text-black">
        <div className="flex items-center gap-3">
          <span className="text-green-500 font-bold">{'>'}_</span>
          <span className="font-bold uppercase tracking-wider text-xs">baku-stack-ai</span>
        </div>
        <button
          onClick={closeTerminal}
          className="text-white dark:text-black hover:text-red-500 dark:hover:text-red-500 transition-colors font-bold"
          aria-label="Close terminal"
        >
          [X]
        </button>
      </div>

      {/* Chat History */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-3 bg-white dark:bg-black text-black dark:text-white"
      >
        {messages.length === 0 && (
          <div className="text-gray-500 dark:text-gray-400">
            <div className="text-green-500 font-bold mb-2">BAKU STACK MENTOR v1.0</div>
            <div className="text-xs">Expert coder. Concise answers.</div>
            <div className="text-xs mt-2">Type a message to start...</div>
          </div>
        )}
        {messages.map((msg, i) => (
          <div key={i} className="border-l-2 border-gray-300 dark:border-gray-700 pl-3">
            <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
              {msg.role === "user" ? "guest@baku:~$" : "mentor@baku:~$"}
            </div>
            <div className="text-black dark:text-white whitespace-pre-wrap">{msg.content}</div>
          </div>
        ))}
        {isLoading && (
          <div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">mentor@baku:~$</div>
            <div className="flex gap-1">
              <span className="w-2 h-2 bg-green-500 animate-pulse"></span>
              <span className="w-2 h-2 bg-green-500 animate-pulse delay-75"></span>
              <span className="w-2 h-2 bg-green-500 animate-pulse delay-150"></span>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="border-t-2 border-black dark:border-white p-4 bg-gray-50 dark:bg-gray-900">
        <div className="flex items-center gap-3">
          <span className="text-green-500 font-bold">{'>'}</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter command..."
            className="flex-1 bg-transparent outline-none text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-600 font-mono text-sm"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="border-2 border-black dark:border-white bg-white dark:bg-black text-black dark:text-white px-4 py-1 text-xs font-bold uppercase hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            SEND
          </button>
        </div>
      </form>
    </div>
  );
}
