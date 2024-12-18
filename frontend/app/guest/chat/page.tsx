"use client";
import React, { useState } from "react";
import Image from "next/image";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const ChatPage = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "bot",
      text: "Hello! How can I assist you today?",
      time: "2:45 PM",
    },
    {
      id: 2,
      sender: "user",
      text: "I want to learn more about your services.",
      time: "10:32 AM",
    },
  ]);

  const [userInput, setUserInput] = useState("");

  const handleSendMessage = () => {
    if (!userInput.trim()) return;

    setMessages((prevMessages) => [
      ...prevMessages,
      {
        id: Date.now(),
        sender: "user",
        text: userInput,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
      {
        id: Date.now() + 1,
        sender: "bot",
        text: "Thank you! We'll get back to you soon.",
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
    ]);
    setUserInput("");
  };

  return (
    <div className="flex flex-col h-full bg-gray-50 my-1 mx-0 p-8 shadow-lg rounded-lg">
      <div className="flex items-center justify-end space-x-4">
        <Button className="bg-gray-100 text-gray-800 hover:bg-gray-200 px-4 py-2 rounded-lg">
          Science
        </Button>
        <Button className="bg-gray-100 text-gray-800 hover:bg-gray-200 px-4 py-2 rounded-lg">
          Maths
        </Button>
        <Button className="bg-gray-100 text-gray-800 hover:bg-gray-200 px-4 py-2 rounded-lg">
          History
        </Button>
      </div>

      <ScrollArea className="flex-1 px-2 space-y-2">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            {message.sender === "bot" && (
              <Avatar className="mr-2">
                <AvatarImage src="/bot-avatar.png" alt="Bot" />
                <AvatarFallback>🤖</AvatarFallback>
              </Avatar>
            )}
            <div className="flex flex-col">
              <Card
                className={`max-w-md px-4 py-2 shadow ${
                  message.sender === "user"
                    ? "bg-blue-500 text-white rounded-lg rounded-br-none"
                    : "bg-gray-200 text-gray-800 rounded-lg rounded-bl-none"
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
          </div>
        ))}
      </ScrollArea>

      <div className="flex flex-col p-4 bg-gray-50 border border-gray-200 shadow-lg rounded-lg space-y-4">
        <div>
          <Input
            placeholder="How can I assist you today?"
            className="w-full border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 rounded-lg p-2"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
          />
        </div>

        <hr className="border-gray-200" />

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="relative w-5 h-5">
              <Image
                src="/images/Grid.svg"
                alt="Teacher"
                fill
                className="w-full h-full object-contain"
              />
            </div>

            <div className="relative w-5 h-5">
              <Image
                src="/images/Paperclip.svg"
                alt="Teacher"
                fill
                className="w-full h-full object-contain"
              />
            </div>
            <div className="relative w-5 h-5">
              <Image
                src="/images/Microphone.svg"
                alt="Teacher"
                fill
                className="w-full h-full object-contain"
              />
            </div>
            <div className="relative w-5 h-5">
              <Image
                src="/images/Element.svg"
                alt="Teacher"
                fill
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          <div
            onClick={handleSendMessage}
            className="flex items-center space-x-4 bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 px-4 py-2 rounded-lg shadow-md"
          >
            <div className="relative w-5 h-5">
              <Image
                src="/images/Send.svg"
                alt="Teacher"
                fill
                className="w-full h-full object-contain"
              />
            </div>
            <div>Send message</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
