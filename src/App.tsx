import { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import PostForm from "./components/PostForm/PostForm";
import PostList from "./components/PostList/PostList";
import { IPost } from "./domain/interfaces/IPost.interface";
import {
  deletePost,
  editPost,
  getPosts,
  sendPost,
} from "./services/post.service";
import { usePostStore } from "./store/postStore";

export function App() {
  const { posts, setPosts, editingPost, setEditingPost, loading, setLoading } =
    usePostStore();

  useEffect(() => {
    const fetchInitialPosts = async () => {
      setLoading(true);
      await getPosts(setPosts);
      setLoading(false);
    };
    fetchInitialPosts();
  }, [setPosts]);

  const handleCreatePost = async (data: IPost) => {
    if (!data.title.trim() || !data.body.trim()) {
      toast.error("Os campos título e corpo são obrigatórios!");
      return;
    }
    try {
      setLoading(true);
      await sendPost(data);
      await getPosts(setPosts);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePost = async (id: number, data: IPost) => {
    if (!data.title.trim() || !data.body.trim()) {
      toast.error("Os campos título e corpo são obrigatórios!");
      return;
    }
    try {
      setLoading(true);
      await editPost(id, data);
      await getPosts(setPosts);
      setEditingPost(null);
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePost = async (id: number) => {
    try {
      setLoading(true);
      await deletePost(id);
      await getPosts(setPosts);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6">
      <ToastContainer />

      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="spinner-border animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent"></div>
        </div>
      )}

      <h1 className="text-2xl sm:text-3xl font-bold text-center text-blue-600 mb-4 sm:mb-6">
        Gerenciador de Posts
      </h1>

      <div
        className="
        w-full
        sm:w-11/12 
        md:w-3/4 
        lg:w-2/3
        mx-auto 
        bg-white 
        shadow-md 
        rounded-lg 
        p-4 
        sm:p-6
      "
      >
        <PostForm
          onSubmit={editingPost ? handleUpdatePost : handleCreatePost}
          editingPost={editingPost}
          setEditingPost={setEditingPost}
        />

        <PostList
          posts={posts}
          onEdit={setEditingPost}
          onDelete={handleDeletePost}
        />
      </div>
    </div>
  );
}
