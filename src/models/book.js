import mongoose, { Schema } from 'mongoose'

const bookSchema = new Schema({
  name: { type: String, required: true },
  genres: [{ type: String, required: true }],
  author: { type: Schema.Types.ObjectId, ref: 'Author' },
}, { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } })

export default mongoose.model('Book', bookSchema)
