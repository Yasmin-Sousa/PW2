import { useEffect, useState } from "react";
import axios from "axios";
import PostCard from "../components/PostCard";
import Pagination from "../components/Pagination";

function AllPosts() {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/posts?page=${page}`)
      .then((res) => {
        setPosts(res.data.posts);
        setTotalPages(res.data.totalPages);
      })
      .catch(() => alert("Erro ao carregar posts"));
  }, [page]);

  return (
    <div>
      <h2>Aqui Todos os Posts</h2>
      {posts.map((p) => (
        <PostCard key={p._id} post={p} />
      ))}
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </div>
  );
}

export default AllPosts;

