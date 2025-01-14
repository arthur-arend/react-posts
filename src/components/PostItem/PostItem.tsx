import { IPost } from "../../domain/interfaces/IPost.interface";

const PostItem = ({
  post,
  onEdit,
  onDelete,
}: {
  post: IPost;
  onEdit: (post: IPost) => void;
  onDelete: (postId: number) => void;
}) => {
  return (
    <div className="p-4 sm:p-6 bg-gray-50 border rounded-lg shadow-sm">
      <h2 className="text-lg sm:text-xl font-bold text-gray-800">
        {post.title}
      </h2>

      <p className="text-sm sm:text-base text-gray-600 mt-1">{post.body}</p>

      <div className="mt-4 flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
        <button
          onClick={() => onEdit(post)}
          className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600"
        >
          Editar
        </button>
        <button
          onClick={() => onDelete(post.id)}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
        >
          Excluir
        </button>
      </div>
    </div>
  );
};

export default PostItem;
