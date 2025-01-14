import { useEffect, useState } from "react";

const PostForm = ({
  onSubmit,
  editingPost,
  setEditingPost,
}: {
  onSubmit: Function;
  editingPost: { id: number; title: string; body: string } | null;
  setEditingPost: Function;
}) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  useEffect(() => {
    if (editingPost) {
      setTitle(editingPost.title);
      setBody(editingPost.body);
    } else {
      setTitle("");
      setBody("");
    }
  }, [editingPost]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (editingPost) {
      onSubmit(editingPost.id, { title, body });
    } else {
      onSubmit({ title, body });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 sm:mb-6">
      <div className="mb-3 sm:mb-4">
        <label className="block text-sm sm:text-base text-gray-700 font-bold mb-1 sm:mb-2">
          Título
        </label>
        <input
          type="text"
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="
            w-full 
            px-3 py-2 sm:px-4 sm:py-2 
            border rounded-lg 
            focus:outline-none focus:ring-2 focus:ring-blue-500
            text-sm sm:text-base
          "
        />
      </div>
      <div className="mb-3 sm:mb-4">
        <label className="block text-sm sm:text-base text-gray-700 font-bold mb-1 sm:mb-2">
          Conteúdo
        </label>
        <textarea
          placeholder="Conteúdo"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          className="
            w-full 
            px-3 py-2 sm:px-4 sm:py-2
            border rounded-lg
            focus:outline-none focus:ring-2 focus:ring-blue-500
            text-sm sm:text-base
          "
        />
      </div>
      <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 items-stretch sm:items-center">
        <button
          type="submit"
          className="
            bg-blue-500 text-white 
            px-4 py-2 sm:px-5 
            rounded-lg 
            hover:bg-blue-600
            text-sm sm:text-base
            font-semibold
          "
        >
          {editingPost ? "Atualizar" : "Criar"}
        </button>
        {editingPost && (
          <button
            type="button"
            onClick={() => setEditingPost(null)}
            className="
              bg-gray-500 text-white 
              px-4 py-2 sm:px-5 
              rounded-lg 
              hover:bg-gray-600
              text-sm sm:text-base
              font-semibold
            "
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
};

export default PostForm;
