import mongoose from 'mongoose'

export const connectDB = async () => {
  const connectionURL = 'mongodb+srv://asielvallevalera:fFr2wOb9KOp7WPAX@cluster0.liobwph.mongodb.net/?retryWrites=true&w=majority'
  try {
    await mongoose.connect(connectionURL)
    console.log('DB is connected.')
  } catch (error) {
    console.log(error)
  }
}
