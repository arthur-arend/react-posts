import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { IPost } from "../../domain/interfaces/IPost.interface";
import PostForm from "./PostForm";

describe("PostForm Component", () => {
  const mockOnSubmit = vi.fn();
  const mockSetEditingPost = vi.fn();

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("Renderiza os campos do formulário corretamente ao não editar", () => {
    render(
      <PostForm
        onSubmit={mockOnSubmit}
        editingPost={null}
        setEditingPost={mockSetEditingPost}
      />
    );

    const titleInput = screen.getByPlaceholderText(
      "Título"
    ) as HTMLInputElement;
    expect(titleInput).toBeInTheDocument();
    expect(titleInput.value).toBe("");

    const bodyTextarea = screen.getByPlaceholderText(
      "Conteúdo"
    ) as HTMLTextAreaElement;
    expect(bodyTextarea).toBeInTheDocument();
    expect(bodyTextarea.value).toBe("");

    const submitButton = screen.getByRole("button", { name: /criar/i });
    expect(submitButton).toBeInTheDocument();

    const cancelButton = screen.queryByRole("button", { name: /cancelar/i });
    expect(cancelButton).not.toBeInTheDocument();
  });

  it("Renderiza os campos do formulário corretamente ao editar", () => {
    const editingPost: IPost = {
      id: 1,
      title: "Título do post existente.",
      body: "Existing post body.",
      userId: 1,
    };

    render(
      <PostForm
        onSubmit={mockOnSubmit}
        editingPost={editingPost}
        setEditingPost={mockSetEditingPost}
      />
    );

    const titleInput = screen.getByPlaceholderText(
      "Título"
    ) as HTMLInputElement;
    expect(titleInput).toBeInTheDocument();
    expect(titleInput.value).toBe(editingPost.title);

    const bodyTextarea = screen.getByPlaceholderText(
      "Conteúdo"
    ) as HTMLTextAreaElement;
    expect(bodyTextarea).toBeInTheDocument();
    expect(bodyTextarea.value).toBe(editingPost.body);

    const submitButton = screen.getByRole("button", { name: /atualizar/i });
    expect(submitButton).toBeInTheDocument();

    const cancelButton = screen.getByRole("button", { name: /cancelar/i });
    expect(cancelButton).toBeInTheDocument();
  });

  it("Testa se o onSubmit é chamado com os dados corretos ao criar um novo post", () => {
    render(
      <PostForm
        onSubmit={mockOnSubmit}
        editingPost={null}
        setEditingPost={mockSetEditingPost}
      />
    );

    const titleInput = screen.getByPlaceholderText(
      "Título"
    ) as HTMLInputElement;
    const bodyTextarea = screen.getByPlaceholderText(
      "Conteúdo"
    ) as HTMLTextAreaElement;

    fireEvent.change(titleInput, { target: { value: "Título do novo post" } });
    fireEvent.change(bodyTextarea, {
      target: { value: "Título do novo post" },
    });

    const submitButton = screen.getByRole("button", { name: /criar/i });
    fireEvent.click(submitButton);

    expect(mockOnSubmit).toHaveBeenCalledTimes(1);
    expect(mockOnSubmit).toHaveBeenCalledWith({
      title: "Título do novo post.",
      body: "Conteúdo do novo post.",
    });
  });

  it("Chama onSubmit com os dados corretos ao atualizar um post existente", () => {
    const editingPost: IPost = {
      id: 2,
      title: "Título antigo do post.",
      body: "Conteúdo antigo do post.",
      userId: 1,
    };

    render(
      <PostForm
        onSubmit={mockOnSubmit}
        editingPost={editingPost}
        setEditingPost={mockSetEditingPost}
      />
    );

    const titleInput = screen.getByPlaceholderText(
      "Título"
    ) as HTMLInputElement;
    const bodyTextarea = screen.getByPlaceholderText(
      "Conteúdo"
    ) as HTMLTextAreaElement;

    fireEvent.change(titleInput, {
      target: { value: "Título do post atualizado." },
    });
    fireEvent.change(bodyTextarea, {
      target: { value: "Conteúdo do post atualizado." },
    });

    const submitButton = screen.getByRole("button", { name: /atualizar/i });
    fireEvent.click(submitButton);

    expect(mockOnSubmit).toHaveBeenCalledTimes(1);
    expect(mockOnSubmit).toHaveBeenCalledWith(editingPost.id, {
      title: "Título do post atualizado.",
      body: "Conteúdo do post atualizado.",
    });
  });

  it('Testa se setEditingPost é chamado com null ao clicar no botão "Cancelar', () => {
    const editingPost: IPost = {
      id: 3,
      title: "Outro título do post.",
      body: "Outro conteúdo do post.",
      userId: 1,
    };

    render(
      <PostForm
        onSubmit={mockOnSubmit}
        editingPost={editingPost}
        setEditingPost={mockSetEditingPost}
      />
    );

    const cancelButton = screen.getByRole("button", { name: /cancelar/i });
    expect(cancelButton).toBeInTheDocument();

    fireEvent.click(cancelButton);

    expect(mockSetEditingPost).toHaveBeenCalledTimes(1);
    expect(mockSetEditingPost).toHaveBeenCalledWith(null);
  });
});
