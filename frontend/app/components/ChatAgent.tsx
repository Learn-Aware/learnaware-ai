"use client";
import React, { useState } from "react";
import { Input, Button, List, Typography, Space } from "antd";
import { SendOutlined } from "@ant-design/icons";

const { TextArea } = Input;
const { Text } = Typography;

const ChatPrompt: React.FC = () => {
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([
    { sender: "assistant", text: "Hello! How can I help you today?" },
  ]);
  const [userInput, setUserInput] = useState("");

  const handleSendMessage = () => {
    if (!userInput.trim()) return;

    const newMessages = [...messages, { sender: "user", text: userInput }];
    setMessages(newMessages);

    setTimeout(() => {
      const assistantResponse =
        "Thank you for your message! I am processing it.";
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "assistant", text: assistantResponse },
      ]);
    }, 1000);

    setUserInput("");
  };

  return (
    <div className="flex flex-col bg-gray-50 h-screen">
      {/* Chat Messages Section */}
      <div className="flex-1 p-4 overflow-y-auto">
        <List
          dataSource={messages}
          renderItem={(message) => (
            <List.Item
              className={
                message.sender === "user"
                  ? "flex justify-end"
                  : "flex justify-start"
              }
            >
              <Space
                direction="vertical"
                className={
                  message.sender === "user"
                    ? "bg-blue-600 text-white p-3 rounded-lg shadow-md max-w-xs md:max-w-md"
                    : "bg-gray-200 text-black p-3 rounded-lg shadow-md max-w-xs md:max-w-md"
                }
              >
                <Text>{message.text}</Text>
              </Space>
            </List.Item>
          )}
        />
      </div>

      {/* Prompt Input Section */}
      <div className="p-4 bg-white border-t border-gray-300 sticky bottom-0 flex gap-2">
        <TextArea
          rows={messages.length > 5 ? 1 : messages.length > 2 ? 2 : 3}
          placeholder="Type your message here..."
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onPressEnter={handleSendMessage}
          className="flex-1 border-gray-300 rounded-lg focus:ring focus:ring-blue-400"
        />
        <Button
          type="primary"
          onClick={handleSendMessage}
          icon={<SendOutlined />}
          className="rounded-lg"
          style={{ padding: "0 16px" }}
          disabled={!userInput.trim()}
        >
          Send
        </Button>
      </div>
    </div>
  );
};

export default ChatPrompt;
