import React from "react";
import { BookItemProps } from "../types/book";

const BookItem: React.FC<BookItemProps> = ({ book, onDelete, onToggleStatus }) => {
  return (
    <div className={`book-item ${book.status === "Lido" ? "book-read" : "book-unread"}`}>
      <div className="book-info">
        <span className={`status-badge ${book.status === "Lido" ? "badge-read" : "badge-unread"}`}>
          {book.status}
        </span>
        <h3 className="book-title">{book.title}</h3>
        <p className="book-author">{book.author}</p>
      </div>

      <div className="book-actions">
        <button
          className="btn btn-toggle"
          onClick={() => onToggleStatus(book)}
          title="Alternar status"
          aria-label={`Marcar como ${book.status === "Lido" ? "Não lido" : "Lido"}`}
        >
          {book.status === "Lido" ? "↩ Não lido" : "✓ Lido"}
        </button>
        <button
          className="btn btn-delete"
          onClick={() => onDelete(book._id)}
          title="Remover livro"
          aria-label="Remover livro"
        >
          Remover
        </button>
      </div>
    </div>
  );
};

export default BookItem;
