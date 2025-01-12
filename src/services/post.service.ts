import axios from "axios";

const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

export const getPosts = async (): Promise<any> => {
  try {
    const response = await api.get("/posts");
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const sendPost = async (post: any): Promise<any> => {
  try {
    const response = await api.post("/posts", post);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const editPost = async (id: number, post: any): Promise<any> => {
  try {
    const response = await api.put(`/posts/${id}`, post);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const deletePost = async (id: number): Promise<any> => {
  try {
    const response = await api.delete(`/posts/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
