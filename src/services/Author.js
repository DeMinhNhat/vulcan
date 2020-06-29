import Author from '../models/author'
import ServerError from '../utils/serverError'

export const getAuthors = async args => {
  const { name, phone } = args

  const objQuery = {}
  if (name) objQuery.name = name
  if (phone) objQuery.phone = phone

  const authors = await Author
    .find(objQuery)
    .populate('books')
    .sort([['createdAt', -1]])

  return authors
}

export const getAuthor = async args => {
  const { authorId } = args
  const author = await Author.findById(authorId).populate('books')
  return author
}

export const addAuthor = async args => {
  const author = new Author({ ...args })
  await author.save()
  return author
}

export const updateAuthor = async args => {
  const { authorId, name, phone } = args
  const author = await Author.findById(authorId).exec()
  Object.assign(author, { name, phone })
  Object.keys(author).forEach(item => {
    if (author[item] === undefined || author[item] === null) delete author[item]
  })
  await author.save()
  return author
}

export const deleteAuthor = async args => {
  const { authorId } = args
  const checkIdExist = await Author.findById(authorId).exec()
  if (!checkIdExist) throw new ServerError('book is not exist in system', 400)
  await checkIdExist.remove()
}
