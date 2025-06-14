import React, { useEffect, useState, useContext } from "react";
import { auth, onAuthStateChanged, signOut } from "./firebase";
import { FORUM_NAME } from "./config";

import ThemeSwitcher from "./components/ThemeSwitcher";
import ThemeToggle from "./components/ThemeToggle";

import SignIn from "./components/SignIn";
import Sidebar from "./components/Sidebar";
import ChatRoom from "./components/ChatRoom";
import ChatWindow from "./components/ChatWindow";
import Avatar from "./components/Avatar";
import ForumMessage from "./components/ForumMessage";
import PostForm from "./components/PostForm";
import PostList from "./components/PostList";
import Tabs from "./components/Tabs";

import { ThemeContext } from "./context/ThemeContext";

export default function App() {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("Chat");
  const { theme } = useContext(ThemeContext);

  const bgClass =
    theme === "neon"
      ? "bg-neon-bg text-neon-text"
      : theme === "vivid"
      ? "bg-vivid-bg text-vivid-text"
      : "bg-life-bg text-life-text";

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => setUser(user));
    return unsubscribe;
  }, []);

  return (
    <div className={`min-h-screen flex flex-col ${bgClass}`}>
      {/* Header */}
      <header className="flex justify-between items-center p-4 bg-blue-700 text-white">
        <h1 className="text-xl font-bold">{FORUM_NAME}</h1>
        <div className="flex items-center space-x-4">
          <ThemeSwitcher />

          {user && (
            <>
              {/* Avatar Glow */}
              <div className="animate-glow rounded-full overflow-hidden w-10 h-10">
                <Avatar user={user} />
              </div>

              {/* Glowing Sign Out Button */}
              <button
                onClick={() => signOut(auth)}
                className="glow-button"
                aria-label="Sign Out"
                type="button"
              >
                Sign Out
              </button>
            </>
          )}
        </div>
      </header>

      {/* Main layout */}
      <main className="flex flex-grow">
        {user ? (
          <>
            <Sidebar />
            <div className="flex flex-col flex-grow p-4 space-y-4">
              {/* Tabs with Active Glow */}
              <Tabs onTabChange={setActiveTab} activeTab={activeTab} />
              {activeTab === "Chat" && (
                <>
                  <ChatRoom />
                  <ChatWindow />
                  <PostForm user={user} />
                </>
              )}
              {activeTab === "Posts" && <PostList />}
              {activeTab === "Members" && <p>Members coming soon...</p>}
            </div>
          </>
        ) : (
          <div className="w-full flex justify-center items-center p-4">
            <SignIn />
          </div>
        )}
      </main>
    </div>
  );
}
