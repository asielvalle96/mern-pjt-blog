import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import auth from './routes/auth.routes.js'
import post from './routes/post.routes.js'

const app = express()

app.use(express.json())

app.use(morgan('dev'))

app.use(cookieParser()) // Now, Express can understand the cookies.

app.use(cors(
  // This solves the CORS error.
  { credentials: true, origin: 'http://localhost:5173' }
))

// To save the selected file in the option "Create new post" (**CreatePost.jsx**).
// http://localhost:3000/api/src\uploads\<la imagen>.jpg is in src/uploads
// To can show the img in Post.jsx
// Now the Frontend sees the images from the Backend.
app.use('/api/src/uploads', express.static('./src/uploads'))

app.use('/api', auth)
app.use('/api', post)

export default app
