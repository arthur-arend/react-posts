import { useEffect, useState } from "react";
import PostList from "./components/PostList";
import { IPost } from "./domain/interfaces/IPost.interface";
import { getPosts } from "./services/post.service";

export function App() {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [editingPost, setEditingPost] = useState<IPost | null>(null);

  useEffect(() => {
    getPosts().then((data) => setPosts(data));
  }, []);

  // const handleCreatePost = async (data) => {
  //   // @todo: Implementar a função para criar um novo post
  // };

  // const handleUpdatePost = async (id, data) => {
  //   // @todo: Implementar a função para atualizar um post existente
  // };

  const handleDeletePost = async (id: number) => {
    // @todo: Implementar a função para deletar um post
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
        Gerenciador de Posts
      </h1>
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        {/* <PostForm
          onSubmit={editingPost ? handleUpdatePost : handleCreatePost}
          editingPost={editingPost}
          setEditingPost={setEditingPost}
        /> */}
        <PostList
          posts={posts}
          onEdit={setEditingPost}
          onDelete={handleDeletePost}
        />
      </div>
    </div>
  );
}
