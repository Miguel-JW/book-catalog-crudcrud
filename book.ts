export type BookStatus = "Lido" | "Não lido";

export interface Book {
  _id: string;
  title: string;
  author: string;
  status: BookStatus;
}

export type BookPayload = Omit<Book, "_id">;

export interface BookItemProps {
  book: Book;
  onDelete: (id: string) => void;
  onToggleStatus: (book: Book) => void;
}

export interface BookListProps {
  books: Book[];
  loading: boolean;
  onDelete: (id: string) => void;
  onToggleStatus: (book: Book) => void;
}

export interface BookFormProps {
  onAdd: (payload: BookPayload) => Promise<void>;
}
