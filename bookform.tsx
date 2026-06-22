import React, { useState, ChangeEvent, FormEvent } from "react";
import { BookFormProps, BookPayload, BookStatus } from "../types/book";

const BookForm: React.FC<BookFormProps> = ({ onAdd }) => {
  const [title, setTitle] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [status, setStatus] = useState<BookStatus>("Não lido");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title.trim() || !author.trim()) {
      setError("Preencha todos os campos.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const payload: BookPayload = { title: title.trim(), author: author.trim(), status };
      await onAdd(payload);
      setTitle("");
      setAuthor("");
      setStatus("Não lido");
    } catch {
      setError("Erro ao adicionar livro. Verifique sua URL do CrudCrud.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="book-form" onSubmit={handleSubmit} noValidate>
      <h2 className="form-title">Adicionar Livro</h2>

      <div className="field-group">
        <label htmlFor="title">Título</label>
        <input
          id="title"
          type="text"
          placeholder="Ex: O Senhor dos Anéis"
          value={title}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
          disabled={loading}
        />
      </div>

      <div className="field-group">
        <label htmlFor="author">Autor</label>
        <input
          id="author"
          type="text"
          placeholder="Ex: J.R.R. Tolkien"
          value={author}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setAuthor(e.target.value)}
          disabled={loading}
        />
      </div>

      <div className="field-group">
        <label htmlFor="status">Status</label>
        <select
          id="status"
          value={status}
          onChange={(e: ChangeEvent<HTMLSelectElement>) => setStatus(e.target.value as BookStatus)}
          disabled={loading}
        >
          <option value="Não lido">Não lido</option>
          <option value="Lido">Lido</option>
        </select>
      </div>

      {error && <p className="form-error">{error}</p>}

      <button type="submit" className="btn btn-primary" disabled={loading}>
        {loading ? "Adicionando..." : "＋ Adicionar"}
      </button>
    </form>
  );
};

export default BookForm;
