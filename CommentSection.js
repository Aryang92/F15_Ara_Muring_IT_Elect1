import React, { useState } from 'react';
import './CommentSection.css';

const CommentSection = () => {
  const [comments, setComments] = useState([
    { id: 1, author: "John Doe", text: "This is a great post!", timestamp: "2 hours ago" },
    { id: 2, author: "Jane Smith", text: "Thanks for sharing this information.", timestamp: "1 hour ago" }
  ]);
  const [newComment, setNewComment] = useState("");
  const [authorName, setAuthorName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newComment.trim() || !authorName.trim()) return;

    const comment = {
      id: Date.now(),
      author: authorName,
      text: newComment,
      timestamp: "Just now"
    };

    setComments([...comments, comment]);
    setNewComment("");
    setAuthorName("");
  };

  return (
    <div className="comment-section">
      <h2>Comments ({comments.length})</h2>
      
      <form onSubmit={handleSubmit} className="comment-form">
        <input
          type="text"
          placeholder="Your Name"
          value={authorName}
          onChange={(e) => setAuthorName(e.target.value)}
          className="name-input"
        />
        <textarea
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="comment-input"
        />
        <button type="submit" className="submit-button">Post Comment</button>
      </form>

      <div className="comments-list">
        {comments.length === 0 ? (
          <p className="no-comments">No comments yet. Be the first to comment!</p>
        ) : (
          comments.map(comment => (
            <div key={comment.id} className="comment">
              <div className="comment-header">
                <span className="comment-author">{comment.author}</span>
                <span className="comment-time">{comment.timestamp}</span>
              </div>
              <p className="comment-text">{comment.text}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CommentSection;