import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { IPost } from "../../domain/interfaces/IPost.interface";
import PostItem from "./PostItem";

describe("Component PostItem", () => {
  const mockPost: IPost = {
    userId: 1,
    id: 1,
    title: "Test Post Title",
    body: "This is a test post body.",
  };

  const mockOnEdit = vi.fn();
  const mockOnDelete = vi.fn();

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("Renderiza o título e o corpo do post corretamente", () => {
    render(
      <PostItem post={mockPost} onEdit={mockOnEdit} onDelete={mockOnDelete} />
    );

    const titleElement = screen.getByText("Teste Post Título");
    expect(titleElement).toBeInTheDocument();

    const bodyElement = screen.getByText("Teste do conteúdo do post.");
    expect(bodyElement).toBeInTheDocument();
  });

  it('Teste para verificar se o botão "Editar" chama a função onEdit com o post correto', () => {
    render(
      <PostItem post={mockPost} onEdit={mockOnEdit} onDelete={mockOnDelete} />
    );

    const editButton = screen.getByRole("button", { name: /editar/i });
    fireEvent.click(editButton);

    expect(mockOnEdit).toHaveBeenCalledTimes(1);
    expect(mockOnEdit).toHaveBeenCalledWith(mockPost);
  });

  it('Teste para verificar se o botão "Excluir" chama a função onDelete com o ID do post correto', () => {
    render(
      <PostItem post={mockPost} onEdit={mockOnEdit} onDelete={mockOnDelete} />
    );

    const deleteButton = screen.getByRole("button", { name: /excluir/i });

    fireEvent.click(deleteButton);

    expect(mockOnDelete).toHaveBeenCalledTimes(1);
    expect(mockOnDelete).toHaveBeenCalledWith(mockPost.id);
  });
});
