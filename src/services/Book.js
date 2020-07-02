import loGet from 'lodash/get'
import Book from '../models/book'
import { NEW_BOOK } from '../utils/constant'

require('../models/author')

export const getBooks = async () => {
  const books = await Book.find().populate('author').sort([['createdAt', -1]])
  return books
}

export const getBook = async args => {
  const { bookId } = args
  const book = await Book.findById(bookId).populate('author')
  return book
}

export const addBook = async (args, pubsub) => {
  const bookObj = {
    name: loGet(args, ['name']),
    genres: loGet(args, ['genres']),
    author: loGet(args, ['authorId']),
  }

  const book = new Book(bookObj)
  await book.save()
  let newBook = await Book.findById(book._id).populate('author')
  newBook = newBook.toJSON()
  Object.assign(newBook, { id: book._id })
  await pubsub.publish(NEW_BOOK, {
    autoAddBook: newBook,
  })
  return book
}
