import mongoose, { Schema } from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

const authorSchema = new Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true, unique: true, index: true },
}, { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } })

authorSchema.plugin(uniqueValidator)

export default mongoose.model('Author', authorSchema)
