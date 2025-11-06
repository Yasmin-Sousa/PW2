import { useState } from "react";
import axios from "axios";

function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!username || !password) return alert("Preencha todos os campos!");

    try {
      await axios.post("http://localhost:4000/auth/signup", {
        username,
        password,
      });
      alert("Usuário criado com sucesso!");
      setUsername("");
      setPassword("");
    } catch {
      alert("Erro ao criar usuário (talvez já exista).");
    }
  };

  return (
    <div>
      <h2>Cadastro de Usuário</h2>
      <form onSubmit={handleSignup} className="form">
        <input
          type="text"
          placeholder="Usuário"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="btn">
          Cadastrar
        </button>
      </form>
    </div>
  );
}

export default Signup;

