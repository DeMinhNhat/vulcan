import {
  addBook,
  getBook,
  getBooks,
} from '../../services/Book'
import { NEW_BOOK } from '../../utils/constant'

export default {
  Query: {
    books: (_, args) => getBooks({ ...args }),
    book: (_, args) => getBook({ ...args }),
  },
  Mutation: {
    addBook: (_, args, { pubsub }) => addBook({ ...args }, pubsub),
  },
  Subscription: {
    autoAddBook: {
      subscribe: (_, __, { pubsub }) => pubsub.asyncIterator(NEW_BOOK),
    },
  },
}
