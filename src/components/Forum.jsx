// src/components/Forum.jsx
import React, { useEffect, useState } from "react";
import { db, collection, addDoc, serverTimestamp, query, orderBy, onSnapshot } from "../firebase";
import Post from "./Post";
import CreatePost from "./CreatePost";

export default function Forum({ user }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const postsRef = collection(db, "posts");
    const q = query(postsRef, orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const posts
