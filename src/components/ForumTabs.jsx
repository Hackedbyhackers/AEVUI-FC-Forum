import React, { useState } from "react";
import { motion } from "framer-motion";
import { BsChatDots, BsPeople, BsFilePost } from "react-icons/bs";

const tabs = [
  { name: "Chat", icon: <BsChatDots /> },
  { name: "Posts", icon: <BsFilePost /> },
  { name: "Members", icon: <BsPeople /> },
];

export default function ForumTabs({ currentTab, setCurrentTab }) {
  return (
    <div className="flex space-x-4 bg-white dark:bg-gray-800 rounded px-3 py-2 shadow">
      {tabs.map((tab, i) => (
        <button
          key={i}
          className={`relative px-4 py-2 text-sm font-semibold rounded ${
            currentTab === tab.name ? "text-blue-500" : "text-gray-600 dark:text-gray-300"
          }`}
          onClick={() => setCurrentTab(tab.name)}
        >
          <span className="flex items-center space-x-1">
            {tab.icon}
            <span>{tab.name}</span>
          </span>
          {currentTab === tab.name && (
            <motion.div
              layoutId="tabHighlight"
              className="absolute bottom-0 left-0 right-0 h-1 bg-blue-500 rounded"
            />
          )}
        </button>
      ))}
    </div>
  );
}
