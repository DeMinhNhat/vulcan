import loGet from 'lodash/get'
import Book from '../models/book'
import { NEW_BOOK } from '../utils/constant'
import ServerError from '../utils/serverError'

// export default handler => async (req, res) => {
//   try {
//     const data = await handler(req)

//     res.status(HttpStatus.OK).json({ success: true, data })
//   } catch (err) {
//     logger.error(err)
//     res.status(err.code || 500).json({ message: err.message })
//   }
// }

export const getBooks = async args => {
  const { genre, name } = args
  try {
    const objQuery = {}
    if (genre) objQuery.genre = genre
    if (name) objQuery.name = name

    const books = await Book.find()
      .populate('author')
      .sort([['createdAt', -1]])

    console.log('books: ', books)

    return books
  } catch (err) {
    throw new ServerError('test', 400)
  }
}

export const getBook = async args => {
  const { bookId } = args
  const book = await Book.findById(bookId).populate('author')
  return book
}

export const addBook = async (args, pubsub) => {
  const bookObj = {
    name: loGet(args, ['name']),
    genre: loGet(args, ['genre']),
    author: loGet(args, ['authorId']),
  }

  const book = new Book(bookObj)
  await book.save()
  const newBook = await Book.findById(book._id).populate('author')
  const Test = newBook.toJSON()
  Object.assign(Test, { id: book._id })
  await pubsub.publish(NEW_BOOK, {
    autoAddBook: Test,
  })
  return book
}

export const updateBook = async args => {
  const { bookId, genre, name } = args
  const book = await Book.findById(bookId)
  Object.assign(book, { genre, name })
  Object.keys(book).forEach(item => {
    if (book[item] === undefined || book[item] === null) delete book[item]
  })
  await book.save()
  return book
}

export const deleteBook = async args => {
  const { bookId } = args
  const checkIdExist = await Book.findById(bookId).exec()
  if (!checkIdExist) throw new ServerError('book is not exist in system', 400)
  await checkIdExist.remove()
  return {
    id: bookId,
    message: 'Success',
  }
}
