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
  const [history, setHistory] = useState<
    { id: number; sender: string; text: string; time: string }[][]
  >([]);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [sessionID, setSessionID] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isNewSession, setIsNewSession] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
      if (!sessionID) {
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

        const botMessage = {
          id: Date.now() + 1,
          sender: "bot",
          text: response.correct
            ? response.question || "I'm here to help!"
            : response.guidance,
          time: getCurrentTime(),
        };

        setMessages((prevMessages) => [...prevMessages, botMessage]);
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
      setIsNewSession(false);
    }
  };

  setTimeout(() => {
    const scrollArea = document.querySelector(".scroll-area");
    if (scrollArea) {
      scrollArea.scrollTo(0, 0);
    }
  }, 100);

  const handleNewConversation = () => {
    if (!isNewSession) {
      setHistory((prevHistory) => [...prevHistory, messages]);
    }

    setMessages([
      {
        id: 1,
        sender: "bot",
        text: "Hello! How can I assist you today?",
        time: getCurrentTime(),
      },
    ]);
    setSessionID("");
    setIsNewSession(true);
    setIsSidebarOpen(false);
  };

  const handleCategoryClick = (category: string) => {
    if (!isNewSession) {
      setHistory((prevHistory) => [...prevHistory, messages]);
    }

    setMessages([
      {
        id: 1,
        sender: "bot",
        text: `Hello! How can I assist you with ${category} today?`,
        time: getCurrentTime(),
      },
    ]);
    setSessionID("");
    setIsNewSession(true);
    setIsSidebarOpen(false);
  };

  return (
    <div className="flex flex-col sm:flex-row h-full bg-gray-50">
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="sm:hidden p-4 bg-[hsl(var(--laai-blue))] hover:bg-[hsl(var(--laai-blue-dark))] text-white transition-colors rounded-md"
      >
        {isSidebarOpen ? "Close" : "Chat History"}
      </button>

      <div
        className={`fixed sm:static z-40 h-full sm:h-auto bg-white border-r shadow-lg flex flex-col transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300 sm:translate-x-0 w-64`}
      >
        <h3 className="text-lg font-semibold p-4 border-b bg-gray-50 text-gray-800">
          Chat History
        </h3>

        <div className="flex items-center justify-center space-x-3 px-4 py-2 bg-gray-50 border-b">
          {["Science", "Maths", "History"].map((category) => (
            <Button
              key={category}
              className="bg-gray-100 text-gray-800 hover:bg-blue-500 hover:text-white px-4 py-1 rounded-lg shadow-sm"
              onClick={() => handleCategoryClick(category)}
            >
              {category}
            </Button>
          ))}
        </div>

        <ScrollArea className="flex-1 p-3 space-y-2">
          {history.length === 0 ? (
            <p className="text-sm text-gray-500 text-center">
              No history yet. Start a conversation!
            </p>
          ) : (
            history.map((session, index) => (
              <Card
                key={index}
                className="px-4 py-2 bg-gray-50 hover:bg-gray-100 cursor-pointer rounded-md shadow-sm transition duration-150 ease-in-out mb-2"
                onClick={() => {
                  setMessages(session);
                  setIsSidebarOpen(false);
                }}
              >
                <span className="font-sans font-semibold text-gray-700 text-sm">
                  {session.find((msg) => msg.sender === "user")?.text}
                </span>
              </Card>
            ))
          )}
        </ScrollArea>

        <div className="p-4 bg-gray-50 border-t">
          <Button
            onClick={handleNewConversation}
            className="w-full bg-[hsl(var(--laai-blue))] hover:bg-[hsl(var(--laai-blue-dark))] text-white transition-colors rounded-lg"
          >
            Start New Conversation
          </Button>
        </div>
      </div>

      <div className="flex flex-col flex-1 sm:my-0 sm:mx-0 sm:p-2 lg:p-2">
        <ScrollArea className="flex-1 px-2 space-y-2 py-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex w-full items-end ${message.sender === "user" ? "justify-end" : "justify-start"
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
                  className={`px-4 py-2 shadow-lg ${message.sender === "user"
                      ? "bg-gradient-to-r from-blue-500 to-blue-400 text-white rounded-3xl rounded-br-sm ml-2"
                      : "bg-gradient-to-r from-gray-200 to-gray-100 text-gray-800 rounded-3xl rounded-bl-sm mr-2"
                    }`}
                >
                  {message.text}
                </Card>

                <span
                  className={`text-xs mt-1 ${message.sender === "user"
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

        <div className="flex flex-col px-4 py-3 bg-gray-50 border border-gray-200 shadow-md rounded-2xl space-y-4">
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
                <button
                  key={icon}
                  className="relative w-5 h-5 rounded-full flex items-center justify-center transition-all duration-200 hover:bg-gray-200 active:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-300"
                >
                  <Image
                    src={`/images/${icon}.svg`}
                    alt={icon}
                    fill
                    className="w-full h-full object-contain"
                  />
                </button>
              ))}
            </div>
            <Button
              onClick={handleSendMessage}
              className={`flex items-center space-x-4 px-4 py-2 rounded-lg shadow-md ${loading
                  ? "bg-gray-400 text-gray-800 cursor-not-allowed"
                  : "bg-[hsl(var(--laai-blue))] hover:bg-[hsl(var(--laai-blue-dark))] text-white transition-colors"
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
              <span className="hidden md:inline">
                {loading ? "Sending..." : "Send message"}
              </span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
