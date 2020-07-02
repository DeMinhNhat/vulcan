import { gql } from 'apollo-server'

const typeDefs = gql`
  type Book {
    id: ID!
    name: String
    genres: [String]
    author: Author
  }

  type Author {
    id: ID!
    name: String!
    phone: String!
    books: [Book!]
  }

  type realtimeBook {
    id: ID!
    name: String
    genres: [String]
    author: String
  }

  type User {
    id: ID!
    username: String!
    email: String!
    password: String!
  }

  type Books {
    data: [Book!]
  }

  type Authors {
    data: [Author]!
  }

  type RecordDeleteResponse {
    id: String!
    message: String
  }
  

  type Query {
    books: [Book!]
    book(bookId: ID!): Book!
    authors: [Author!]
    author(authorId: ID!): Author!
    # Queries for the current user
    me: User
  }

  type Mutation {
    addBook(name: String!, genres: [String!], authorId: ID): Book!
    deleteBook(bookId: ID!): RecordDeleteResponse!
    addAuthor(name: String!, phone: String!): Author!
    deleteAuthor(authorId: ID!): Author!
    updateAuthor(authorId: ID!, name: String, phone: String): Author
    updateBook(bookId: ID!, genres: [String], name: String): Book
    login(email: String): String # login token
  }

  type Subscription {
    listBooks: [Book!]
    autoAddBook : Book!
    autoRemoveBook : RecordDeleteResponse!
  }
`

export default typeDefs
