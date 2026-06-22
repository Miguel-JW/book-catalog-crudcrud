# book-catalog-crudcrud
# 📚 Book Catalog — React + TypeScript + CrudCrud

Catálogo de livros com operações CRUD completas via API CrudCrud.

## ✅ Funcionalidades

- Listar livros armazenados na API
- Adicionar livros (título, autor, status)
- Remover livros (DELETE)
- Alternar status Lido / Não lido (PUT)

## 🔑 Configuração obrigatória

1. Acesse [https://crudcrud.com](https://crudcrud.com)
2. Copie o **endpoint único** gerado (ex: `abc123def456...`)
3. Abra o arquivo `src/services/api.ts`
4. Substitua `SEU_ENDPOINT_AQUI` pelo seu endpoint:

```ts
const BASE_URL = "https://crudcrud.com/api/SEU_ENDPOINT_AQUI";
```

## 🚀 Como rodar

```bash
npm install
npm start
```

## 🗂 Estrutura

```
src/
├── components/
│   ├── BookForm.tsx    # Formulário de adição
│   ├── BookItem.tsx    # Card de livro individual
│   └── BookList.tsx    # Lista de livros
├── services/
│   └── api.ts          # Integração com CrudCrud API
├── types/
│   └── book.ts         # Interfaces TypeScript
├── App.tsx             # Componente raiz
├── App.css             # Estilos
└── index.tsx           # Entry point
```

## 🛠 Tecnologias

- React 18 + TypeScript
- Axios
- CrudCrud (API REST sem autenticação)
