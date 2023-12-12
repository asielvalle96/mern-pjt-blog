import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true, // '  asiel' ==> 'asiel'
    min: 4,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
}, {
  timestamps: true // To get the dates of creation and the last update of the User object (createdAt and updatedAt).
})

export default mongoose.model('User', userSchema)
