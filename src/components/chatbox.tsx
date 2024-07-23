import React from "react";

interface Message {
  text: string;
  isUser: boolean;
}

interface ChatBoxProps {
  messages: Message[];
}

const ChatBox: React.FC<ChatBoxProps> = ({ messages }) => {
  return (
    <div className="w-full max-w-2xl mx-auto p-4 bg-gray-100 rounded-lg shadow">
      <div className="space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-xs p-3 rounded-lg ${
                message.isUser
                  ? "bg-blue-500 text-white"
                  : "bg-white text-gray-800"
              }`}
            >
              <p className="text-sm">{message.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatBox;
