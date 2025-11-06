import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreatePost() {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !text) return alert("Título e texto são obrigatórios!");

    try {
      await axios.post("http://localhost:4000/posts", { title, text });
      alert("Post criado com sucesso!");
      navigate("/");
    } catch {
      alert("Erro ao criar post");
    }
  };

  return (
    <div>
      <h2>Criar Post</h2>
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Escreva o conteúdo do post..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button type="submit" className="btn">
          Publicar
        </button>
      </form>
    </div>
  );
}

export default CreatePost;

