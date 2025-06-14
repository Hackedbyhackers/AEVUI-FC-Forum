import React, { useEffect, useState, useRef } from "react";
import {
  auth,
  db,
  collection,
  addDoc,
  query,
  orderBy,
  limit,
  onSnapshot,
  serverTimestamp,
} from "../firebase";
import Message from "./Message";

export default function ChatRoom() {
  const [messages, setMessages] = useState([]);
  const [formValue, setFormValue] = useState("");
  const dummy = useRef();

  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("createdAt", "desc"), limit(50));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const msgs = [];
      querySnapshot.forEach((doc) => {
        msgs.push({ id: doc.id, ...doc.data() });
      });
      setMessages(msgs.reverse());
      dummy.current?.scrollIntoView({ behavior: "smooth" });
    });

    return unsubscribe;
  }, []);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!formValue.trim()) return;

    const { uid, photoURL, displayName } = auth.currentUser;

    await addDoc(collection(db, "messages"), {
      text: formValue,
      createdAt: serverTimestamp(),
      uid,
      photoURL: photoURL || null,
      displayName: displayName || "Anonymous",
    });

    setFormValue("");
    dummy.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <main className="chat-room max-w-3xl mx-auto p-4 space-y-4 overflow-auto h-[70vh] bg-white rounded shadow">
        {messages.map((msg) => (
          <Message key={msg.id} message={msg} />
        ))}
        <div ref={dummy}></div>
      </main>

      <form
        onSubmit={sendMessage}
        className="fixed bottom-0 w-full max-w-3xl mx-auto flex p-4 bg-white border-t"
      >
        <input
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
          placeholder="Type a message"
          className="flex-grow border rounded px-4 py-2 mr-2"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Send
        </button>
      </form>
    </>
  );
}
