import React, { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { auth, db, storage } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function PostForm() {
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);

  const handleFileUpload = async (file) => {
    const fileRef = ref(storage, `media/${file.name}-${Date.now()}`);
    await uploadBytes(fileRef, file);
    const url = await getDownloadURL(fileRef);
    return url;
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!text && !file) return alert("Add a message or upload a file");

    let mediaUrl = "";
    let mediaType = "";

    if (file) {
      mediaUrl = await handleFileUpload(file);
      mediaType = file.type;
    }

    await addDoc(collection(db, "messages"), {
      text,
      uid: auth.currentUser.uid,
      displayName: auth.currentUser.displayName,
      photoURL: auth.currentUser.photoURL,
      mediaUrl,
      mediaType,
      createdAt: serverTimestamp(),
    });

    setText("");
    setFile(null);
  };

  return (
    <form onSubmit={sendMessage} className="flex flex-col space-y-2 p-4 bg-white rounded shadow">
      <textarea
        className="border p-2 rounded resize-none"
        placeholder="Type your message..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <input
        type="file"
        accept="image/*,audio/*,video/*"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
        disabled={!text && !file}
      >
        Send
      </button>
    </form>
  );
}
