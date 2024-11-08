"use client";

import { Layout, Card, Input, Button } from "antd";
import { useState } from "react";
import axios from "axios";

const { Header, Content } = Layout;

const ChatContent: React.FC = () => {
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>(
    []
  );
  const [input, setInput] = useState("");

  const handleSendMessage = async () => {
    if (!input) return;

    const newMessages = [...messages, { sender: "user", text: input }];
    setMessages(newMessages);
    setInput("");

    try {
      const response = await axios.post("/api/chat", { message: input });
      const reply = response.data.reply;

      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "ai", text: reply },
      ]);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <Layout>
      <Header
        style={{ background: "#608BC1", color: "white", textAlign: "center" }}
      >
        AI Agent
      </Header>

      <Content className="p-4 bg-gray-700 flex flex-col">
        <div className="flex flex-col space-y-3 mt-4 overflow-y-auto flex-grow p-2">
          {messages.map((msg, index) => (
            <Card
              key={index}
              className={msg.sender === "user" ? "self-end" : "self-start"}
              style={{
                maxWidth: "60%",
                backgroundColor: msg.sender === "user" ? "#789DBC" : "#4B5563",
                color: "white",
              }}
            >
              {msg.text}
            </Card>
          ))}
        </div>

        <div className="mt-4 flex">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
          />
          <Button
            type="primary"
            className="bg-slate-400 hover:!bg-slate-500 font-semibold"
            onClick={handleSendMessage}
            style={{ marginLeft: 8 }}
          >
            Send to Agent
          </Button>
        </div>
      </Content>
    </Layout>
  );
};

export default ChatContent;
