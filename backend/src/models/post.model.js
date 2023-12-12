import mongoose from 'mongoose'
const { Schema } = mongoose

const PostSchema = new Schema({
  title: String,
  summary: String,
  content: String,
  file: String,
  author: { type: Schema.Types.ObjectId, ref: 'User' }
}, {
  timestamps: true // To get the dates of creation and the last update of the User object (createdAt and updatedAt).
})

export default mongoose.model('Post', PostSchema)
