import React, { useEffect, useState, useCallback } from "react";
import { Book, BookPayload } from "./types/book";
import { getBooks, createBook, deleteBook, updateBookStatus } from "./services/api";
import BookForm from "./components/BookForm";
import BookList from "./components/BookList";
import "./App.css";

const App: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [globalError, setGlobalError] = useState<string>("");

  const fetchBooks = useCallback(async () => {
    setLoading(true);
    setGlobalError("");
    try {
      const data = await getBooks();
      setBooks(data);
    } catch {
      setGlobalError("Não foi possível carregar os livros. Verifique sua URL do CrudCrud em src/services/api.ts");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  const handleAdd = async (payload: BookPayload): Promise<void> => {
    const newBook = await createBook(payload);
    setBooks((prev) => [...prev, newBook]);
  };

  const handleDelete = async (id: string): Promise<void> => {
    try {
      await deleteBook(id);
      setBooks((prev) => prev.filter((b) => b._id !== id));
    } catch {
      setGlobalError("Erro ao remover livro.");
    }
  };

  const handleToggleStatus = async (book: Book): Promise<void> => {
    try {
      const updated: Book = {
        ...book,
        status: book.status === "Lido" ? "Não lido" : "Lido",
      };
      await updateBookStatus(updated);
      setBooks((prev) => prev.map((b) => (b._id === updated._id ? updated : b)));
    } catch {
      setGlobalError("Erro ao atualizar status do livro.");
    }
  };

  const readCount = books.filter((b) => b.status === "Lido").length;
  const unreadCount = books.length - readCount;

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <div className="logo">
            <span className="logo-icon">📖</span>
            <h1>Minha Biblioteca</h1>
          </div>
          {books.length > 0 && (
            <div className="stats">
              <span className="stat">
                <strong>{books.length}</strong> livros
              </span>
              <span className="stat stat-read">
                <strong>{readCount}</strong> lidos
              </span>
              <span className="stat stat-unread">
                <strong>{unreadCount}</strong> pendentes
              </span>
            </div>
          )}
        </div>
      </header>

      <main className="app-main">
        {globalError && (
          <div className="global-error" role="alert">
            ⚠ {globalError}
            <button className="error-dismiss" onClick={() => setGlobalError("")}>✕</button>
          </div>
        )}

        <div className="layout">
          <aside className="sidebar">
            <BookForm onAdd={handleAdd} />
          </aside>
          <section className="content">
            <div className="content-header">
              <h2>Catálogo</h2>
            </div>
            <BookList
              books={books}
              loading={loading}
              onDelete={handleDelete}
              onToggleStatus={handleToggleStatus}
            />
          </section>
        </div>
      </main>
    </div>
  );
};

export default App;
