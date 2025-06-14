import React, { useState, useEffect } from "react";
import PostForm from "./components/PostForm";
import PostList from "./components/PostList";
import axios from "axios";

import SignIn from "./components/SignIn";
<SignIn />
function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/posts")
      .then(res => setPosts(res.data))
      .catch(err => console.error("Failed to fetch posts", err));
  }, []);

  const addPost = (post) => {
    axios.post("http://localhost:5000/posts", post)
      .then(res => setPosts([res.data, ...posts]))
      .catch(err => console.error("Failed to add post", err));
  };

  return (
    <div style={{ maxWidth: 600, margin: "20px auto", padding: 10, fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ textAlign: "center", marginBottom: 20 }}>Quarter Club Forum</h1>
      <PostForm addPost={addPost} />
      <PostList posts={posts} />
    </div>
  );
}

export default App;

