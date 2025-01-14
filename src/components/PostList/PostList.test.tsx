import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { IPost } from "../../domain/interfaces/IPost.interface";
import PostList from "./PostList";

const mockPosts: IPost[] = [
  { userId: 1, id: 1, title: "Post Title 1", body: "Post body 1" },
  { userId: 2, id: 2, title: "Post Title 2", body: "Post body 2" },
];

const mockOnEdit = vi.fn();
const mockOnDelete = vi.fn();

describe("PostList Component", () => {
  it("Renderiza o número correto de posts", () => {
    render(
      <PostList posts={mockPosts} onEdit={mockOnEdit} onDelete={mockOnDelete} />
    );

    mockPosts.forEach((post) => {
      expect(screen.getByText(post.title)).toBeInTheDocument();
    });
  });

  it("Mostra o conteúdo do post", () => {
    render(
      <PostList posts={mockPosts} onEdit={mockOnEdit} onDelete={mockOnDelete} />
    );

    mockPosts.forEach((post) => {
      expect(screen.getByText(post.body)).toBeInTheDocument();
    });
  });

  it("Passa as funções onEdit e onDelete para os componentes filhos", () => {
    render(
      <PostList posts={mockPosts} onEdit={mockOnEdit} onDelete={mockOnDelete} />
    );

    expect(mockOnEdit).toBeDefined();
    expect(mockOnDelete).toBeDefined();
  });
});
