import { IPost } from "../domain/interfaces/IPost.interface";
import PostItem from "./PostItem";

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
    <div className="space-y-4">
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
