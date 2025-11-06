import { Link } from "react-router-dom";

function PostCard({ post }) {
  return (
    <div className="post-card">
      <h3>{post.title}</h3>
      <p>{post.text.slice(0, 120)}...</p>
      <Link to={`/post/${post._id}`} className="btn">
        Ler mais
      </Link>
    </div>
  );
}

export default PostCard;

