import { IPost } from "../../domain/interfaces/IPost.interface";
import PostItem from "../PostItem/PostItem";

const PostList = ({
  posts,
  onEdit,
  onDelete,
}: {
  posts: IPost[];
  onEdit: (post: IPost) => void;
  onDelete: (postId: number) => void;
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {posts.map((post) => (
        <PostItem
          key={post.id}
          post={post}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default PostList;
