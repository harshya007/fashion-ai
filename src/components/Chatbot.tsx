import React, { useState } from "react";
import { sendChat } from "../services/api";

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    // Add user message
    setMessages((prev) => [...prev, { sender: "user", text: input }]);
    setLoading(true);

    try {
      // Use the proper sendChat function which handles auth headers
      const reply = await sendChat(input);

      // Add bot reply
      setMessages((prev) => [...prev, { sender: "bot", text: reply }]);
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Sorry, I couldn't respond. Please try again." },
      ]);
    } finally {
      setInput("");
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 p-4 bg-black text-white rounded-full shadow-xl"
      >
        💬
      </button>

      {open && (
        <div className="fixed bottom-20 right-6 w-80 h-96 bg-white rounded-xl shadow-xl p-4 flex flex-col">
          <h2 className="font-bold mb-2">Fashion AI Assistant</h2>

          <div className="flex-1 overflow-y-auto mb-3 space-y-2">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`p-2 rounded-lg ${
                  m.sender === "user" ? "bg-black text-white ml-auto" : "bg-gray-200"
                }`}
              >
                {m.text}
              </div>
            ))}
            {loading && (
              <div className="p-2 rounded-lg bg-gray-200 animate-pulse">Typing...</div>
            )}
          </div>

          <div className="flex gap-2">
            <input
              className="flex-1 border rounded-lg p-2"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Ask me..."
            />
            <button
              onClick={sendMessage}
              className="p-2 bg-black text-white rounded-lg"
              disabled={loading}
            >
              ➤
            </button>
          </div>
        </div>
      )}
    </>
  );
}
