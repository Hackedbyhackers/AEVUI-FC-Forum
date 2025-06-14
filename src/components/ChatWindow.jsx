// components/ChatWindow.jsx
import Message from "./Message"; // your Firebase Message
import { useState, useEffect } from "react";
import { onSnapshot, collection, query, orderBy } from "firebase/firestore";
import { db } from "../firebase"; // your Firestore import

export default function ChatWindow() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("createdAt"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="flex-1 bg-gray-900 p-4 overflow-y-auto h-screen flex flex-col">
      {messages.map((msg) => (
        <Message key={msg.id} message={msg} />
      ))}
    </div>
  );
}
