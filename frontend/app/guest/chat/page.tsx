"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { startSession, submitAnswer } from "@/services/socraticServices";

const getCurrentTime = () =>
  new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

const ChatPage = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "bot",
      text: "Hello! How can I assist you today?",
      time: getCurrentTime(),
    },
  ]);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [sessionID, setSessionID] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!userInput.trim()) return;

    const userMessage = {
      id: Date.now(),
      sender: "user",
      text: userInput,
      time: getCurrentTime(),
    };

    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setUserInput("");
    setLoading(true);

    try {
      if (sessionID === "") {
        const response = await startSession(userInput);

        const botMessage = {
          id: Date.now() + 1,
          sender: "bot",
          text: response.question || "I'm here to help!",
          time: getCurrentTime(),
        };

        setSessionID(response.session_id);
        setMessages((prevMessages) => [...prevMessages, botMessage]);
      } else {
        const response = await submitAnswer({
          session_id: sessionID,
          user_answer: userInput,
        });
        if (!response?.correct) {
          const botMessage = {
            id: Date.now() + 1,
            sender: "bot",
            text: response.guidance,
            time: getCurrentTime(),
          };

          setMessages((prevMessages) => [...prevMessages, botMessage]);
        } else {
          const botMessage = {
            id: Date.now() + 1,
            sender: "bot",
            text: response.question || "I'm here to help!",
            time: getCurrentTime(),
          };

          setMessages((prevMessages) => [...prevMessages, botMessage]);
        }
      }
    } catch (error) {
      console.error("Error fetching bot response:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          id: Date.now() + 2,
          sender: "bot",
          text: "Oops! Something went wrong. Please try again.",
          time: getCurrentTime(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryClick = (category: string) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        id: Date.now(),
        sender: "bot",
        text: `You selected ${category}. How can I help you with it?`,
        time: getCurrentTime(),
      },
    ]);
  };

  return (
    <div className="flex flex-col h-full bg-gray-50 my-1 mx-0 p-8 shadow-lg rounded-lg">
      <ScrollArea className="flex-1 px-2 space-y-2 py-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex w-full items-end ${
              message.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            {message.sender === "bot" && (
              <Avatar className="mr-2">
                <AvatarImage
                  src="/images/BotAvatar.svg"
                  alt="Bot"
                  className="w-8 h-8 object-cover"
                />
                <AvatarFallback>🤖</AvatarFallback>
              </Avatar>
            )}

            <div className="flex flex-col max-w-md">
              <Card
                className={`px-4 py-2 shadow ${
                  message.sender === "user"
                    ? "bg-blue-500 text-white rounded-lg rounded-br-none ml-2"
                    : "bg-gray-200 text-gray-800 rounded-lg rounded-bl-none mr-2"
                }`}
              >
                {message.text}
              </Card>
              <span
                className={`text-xs mt-1 ${
                  message.sender === "user"
                    ? "text-right text-gray-400"
                    : "text-left text-gray-500"
                }`}
              >
                {message.time}
              </span>
            </div>

            {message.sender === "user" && (
              <Avatar className="ml-2">
                <AvatarImage
                  src="/images/userAvatar.svg"
                  alt="User"
                  className="w-8 h-8 object-cover"
                />
              </Avatar>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </ScrollArea>

      <div className="flex flex-col px-4 py-6 bg-gray-50 border border-gray-200 shadow-md rounded-2xl space-y-4">
        <Textarea
          placeholder="Type your message here..."
          className="w-full border-none p-4 focus:ring-2 focus:ring-blue-500 rounded-lg"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          disabled={loading}
          aria-label="Type your message"
          onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
        />

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 ml-2">
            {["Grid", "Paperclip", "Microphone", "Element"].map((icon) => (
              <div key={icon} className="relative w-5 h-5">
                <Image
                  src={`/images/${icon}.svg`}
                  alt={icon}
                  fill
                  className="w-full h-full object-contain"
                />
              </div>
            ))}
            <div className="flex items-center justify-end space-x-4">
              {["Science", "Maths", "History"].map((category) => (
                <Button
                  key={category}
                  className="bg-gray-100 text-gray-800 hover:bg-gray-200 px-4 py-2 rounded-lg"
                  onClick={() => handleCategoryClick(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
          <button
            onClick={handleSendMessage}
            className={`flex items-center space-x-4 px-4 py-2 rounded-lg shadow-md ${
              loading
                ? "bg-gray-400 text-gray-800 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
            disabled={loading}
            aria-label="Send message"
          >
            <div className="relative w-5 h-5">
              <Image
                src="/images/Send.svg"
                alt="Send"
                fill
                className="w-full h-full object-contain"
              />
            </div>
            <span>{loading ? "Sending..." : "Send message"}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
