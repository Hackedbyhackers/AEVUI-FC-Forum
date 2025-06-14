// This starter sets up the animated tab + audio, video, image, emoji, gif upload system in one place
import React, { useState } from "react";
import { motion } from "framer-motion";
import { MessageSquare, FileText, Users, Upload, Smile } from "lucide-react";

// Dummy components for content switching (replace with yours)
const ChatRoom = () => <div className="p-4">Chat Area</div>;
const PostList = () => <div className="p-4">Post List</div>;
const MemberList = () => <div className="p-4">Members Section</div>;

const UploadForm = () => {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    // Handle upload logic here (Firebase Storage or preview)
    alert(`File uploaded: ${file.name}`);
  };

  return (
    <div className="mt-4">
      <label className="flex items-center gap-2 cursor-pointer">
        <Upload size={20} /> Upload File
        <input
          type="file"
          className="hidden"
          accept="image/*,video/*,audio/*"
          onChange={handleFileChange}
        />
      </label>
    </div>
  );
};

const EmojiPicker = () => {
  const emojis = ["😎", "🔥", "💬", "👍", "😂", "❤️", "🎉"];
  return (
    <div className="flex flex-wrap gap-2 mt-4">
      {emojis.map((emoji, i) => (
        <button
          key={i}
          className="text-xl hover:scale-125 transition-transform"
          onClick={() => alert(`Selected: ${emoji}`)}
        >
          {emoji}
        </button>
      ))}
    </div>
  );
};

export default function ForumTabs() {
  const [activeTab, setActiveTab] = useState("Chat");

  const tabs = [
    { label: "Chat", icon: <MessageSquare size={18} /> },
    { label: "Posts", icon: <FileText size={18} /> },
    { label: "Members", icon: <Users size={18} /> },
    { label: "Upload", icon: <Upload size={18} /> },
    { label: "Emojis", icon: <Smile size={18} /> },
  ];

  return (
    <div className="p-4">
      {/* Animated Tab Bar */}
      <div className="flex space-x-6 border-b pb-2 relative">
        {tabs.map((tab) => (
          <div
            key={tab.label}
            className={`relative cursor-pointer px-2 py-1 text-sm flex items-center gap-2 ${
              activeTab === tab.label ? "text-blue-600 font-semibold" : "text-gray-500"
            }`}
            onClick={() => setActiveTab(tab.label)}
          >
            {tab.icon} {tab.label}
            {activeTab === tab.label && (
              <motion.div
                layoutId="underline"
                className="absolute bottom-0 left-0 right-0 h-1 bg-blue-500 rounded"
              />
            )}
          </div>
        ))}
      </div>

      {/* Tab Content */}
      <div className="mt-4">
        {activeTab === "Chat" && <ChatRoom />}
        {activeTab === "Posts" && <PostList />}
        {activeTab === "Members" && <MemberList />}
        {activeTab === "Upload" && <UploadForm />}
        {activeTab === "Emojis" && <EmojiPicker />}
      </div>
    </div>
  );
}
