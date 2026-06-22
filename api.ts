import axios from "axios";
import { Book, BookPayload } from "../types/book";

// ============================================================
//  🔑  COLE AQUI SUA URL DO CRUDCRUD
//  Exemplo: https://crudcrud.com/api/abc123def456
// ============================================================
const BASE_URL = "https://crudcrud.com/api/SEU_ENDPOINT_AQUI";
// ============================================================

const RESOURCE = `${BASE_URL}/books`;

export const getBooks = async (): Promise<Book[]> => {
  const { data } = await axios.get<Book[]>(RESOURCE);
  return data;
};

export const createBook = async (payload: BookPayload): Promise<Book> => {
  const { data } = await axios.post<Book>(RESOURCE, payload);
  return data;
};

export const deleteBook = async (id: string): Promise<void> => {
  await axios.delete(`${RESOURCE}/${id}`);
};

export const updateBookStatus = async (book: Book): Promise<Book> => {
  const { _id, ...payload } = book;
  const { data } = await axios.put<Book>(`${RESOURCE}/${_id}`, payload);
  return { ...data, _id };
};
