import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function PostPage() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:4000/posts/${id}`)
      .then((res) => setPost(res.data))
      .catch(() => alert("Erro ao carregar post"));

    axios
      .get(`http://localhost:4000/comments/${id}`)
      .then((res) => setComments(res.data))
      .catch(() => alert("Erro ao carregar comentários"));
  }, [id]);

  const handleComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return alert("Comentário não pode ser vazio!");
    try {
      await axios.post("http://localhost:4000/comments", {
        text: newComment,
        postId: id,
      });
      setComments([...comments, { text: newComment }]);
      setNewComment("");
    } catch {
      alert("Erro ao comentar");
    }
  };

  if (!post) return <p>Carregando...</p>;

  return (
    <div>
      <h2>{post.title}</h2>
      <p>{post.text}</p>

      <h3>Comentários</h3>
      {comments.map((c, i) => (
        <div key={i} className="comment">
          <p>{c.text}</p>
        </div>
      ))}

      <form onSubmit={handleComment} className="form">
        <textarea
          placeholder="Escreva um comentário..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button type="submit" className="btn">
          Enviar
        </button>
      </form>
    </div>
  );
}

export default PostPage;

