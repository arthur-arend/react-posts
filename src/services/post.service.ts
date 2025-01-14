import axios from "axios";
import { toast } from "react-toastify";
import { IPost } from "../domain/interfaces/IPost.interface";

const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

export const getPosts = async (setPosts: (post: IPost[]) => void) => {
  try {
    const response = await api.get("/posts?_page=1");
    if (response.data) {
      setPosts(response.data);
    }
  } catch (error) {
    console.error(error);
  }
};

export const sendPost = async (post: IPost): Promise<any> => {
  try {
    const response = await api.post("/posts", {
      ...post,
      userId: 35,
    });
    if (response.data) {
      toast.success("Post criado com sucesso!");
    }
  } catch (error) {
    console.error(error);
    toast.error("Erro ao criar post!");
  }
};

export const editPost = async (id: number, post: any): Promise<any> => {
  try {
    const response = await api.patch(`/posts/${id}`, post);

    if (response.data) {
      toast.success("Post editado com sucesso!");
    }
    return response.data;
  } catch (error) {
    console.error(error);
    toast.error("Erro ao editar post!");
  }
};

export const deletePost = async (id: number): Promise<any> => {
  try {
    const response = await api.delete(`/posts/${id}`);

    if (response.status === 200) {
      toast.success("Post deletado com sucesso!");
    }
  } catch (error) {
    console.error(error);
    toast.error("Erro ao deletar o post!");
  }
};
