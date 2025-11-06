import React from "react";

export default function CommentList({ comments }) {
  if (!comments || comments.length === 0) {
    return <p>Sem comentários ainda.</p>;
  }

  return (
    <div className="comment-list">
      {comments.map((c) => (
        <div key={c._id || c.id || Math.random()} className="comment">
          <p>{c.text}</p>
          {c.createdAt && (
            <small style={{ color: "#475569" }}>
              {new Date(c.createdAt).toLocaleString()}
            </small>
          )}
        </div>
      ))}
    </div>
  );
}

