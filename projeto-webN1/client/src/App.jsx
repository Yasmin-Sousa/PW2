import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import AllPosts from "./pages/AllPosts";
import CreatePost from "./pages/CreatePost";
import PostPage from "./pages/PostPage";
import Signup from "./pages/Signup";
import "./styles.css";

function App() {
  return (
    <Router>
      <header className="navbar">
        <h1>Cantinho Azul</h1>
        <nav>
          <Link to="/">Todos os Posts</Link>
          <Link to="/create">Criar Post</Link>
          <Link to="/signup">Cadastro</Link>
        </nav>
      </header>

      <main className="container">
        <Routes>
          <Route path="/" element={<AllPosts />} />
          <Route path="/create" element={<CreatePost />} />
          <Route path="/post/:id" element={<PostPage />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
