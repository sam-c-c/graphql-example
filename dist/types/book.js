import { getBooks } from "../data/books.js";
let books = getBooks();
export const typeDef = `
extend type Query {
    books: [Book],
    book(id: Int!): Book
  }

type Mutation {
  addBook(title: String!, author: String!): Book
  updateBook(id: Int!, title: String!, author: String!): Book
  deleteBook(id: Int!): [Book]
}

"The book type"
  type Book {
    "The id of the book"
    id: Int!
    "The title of the book"
    title: String
    "The author of the book"
    author: String
}
`;
export const resolvers = {
    Query: {
        books: () => books,
        book: (parent, args, contextValue, info) => books.find(x => x.id === args.id)
    },
    Mutation: {
        addBook: (parent, args, contextValue, info) => {
            // Generates a random number between 2 - 1000
            const id = Math.floor(Math.random() * (1000 - 2 + 1)) + 2;
            let newBook = { id: id, title: args.title, author: args.author };
            books.push(newBook);
            return books.find(x => x.id === id);
        },
        updateBook: (parent, args, contextValue, info) => {
            books = books.map(x => x.id === args.id ? { id: args.id, title: args.title, author: args.author } : x);
            return books.find(x => x.id === args.id);
        },
        deleteBook: (parent, args, contextValue, info) => {
            books = books.filter(x => x.id !== args.id);
            return books;
        }
    }
};
