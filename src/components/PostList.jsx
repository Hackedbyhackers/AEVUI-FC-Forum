import React from "react";

export default function PostList({ posts }) {
  if (!posts.length) return <p>No posts yet. Be the first!</p>;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 15 }}>
      {posts.map(({ id, title, content }) => (
        <div key={id} style={{ padding: 15, border: "1px solid #ccc", borderRadius: 5 }}>
          <h3 style={{ margin: 0, marginBottom: 5 }}>{title}</h3>
          <p style={{ margin: 0, whiteSpace: "pre-wrap" }}>{content}</p>
        </div>
      ))}
    </div>
  );
}

