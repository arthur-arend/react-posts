import { create } from "zustand";
import { IPost } from "../domain/interfaces/IPost.interface";

interface IPostStore {
  posts: IPost[];
  setPosts: (posts: IPost[]) => void;
  editingPost: IPost | null;
  setEditingPost: (post: IPost | null) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  pagination: number;
  setPagination: (pagination: number) => void;
}

export const usePostStore = create<IPostStore>((set) => ({
  posts: [],
  setPosts: (posts) => set({ posts }),
  editingPost: null,
  setEditingPost: (editingPost) => set({ editingPost }),
  loading: false,
  setLoading: (loading) => set({ loading }),
  pagination: 1,
  setPagination: (pagination) => set({ pagination }),
}));
