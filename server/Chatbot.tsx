const sendMessage = async () => {
  if (!input.trim()) return;

  const userMsg = input;
  setMessages((prev) => [...prev, { text: userMsg, sender: "user" }]);
  setInput("");

  const res = await fetch("http://localhost:4000/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: userMsg }),
  });

  const data = await res.json();

  setMessages((prev) => [
    ...prev,
    { text: data.reply, sender: "bot" }
  ]);
};
