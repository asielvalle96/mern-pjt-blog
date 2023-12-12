import { Router } from 'express'
import { createNewPost, getAllPosts, getPostInfoById, updatePost, deletePost } from '../controllers/post.controller.js'

// Module "multer" to save the file choice on the "Create new post" form.
import multer from 'multer'
const uploadMiddleware = multer({ dest: 'src/uploads/' })

const router = Router()

// Create Post.
router.post('/post/create', uploadMiddleware.single('fileToUpload'), createNewPost)

// Get all Posts.
router.get('/posts', getAllPosts)

// Get Post Info by id.
router.get('/post/:id', getPostInfoById)

// Update Post
router.put('/post/update/:id', uploadMiddleware.single('fileToUpload'), updatePost)

// Delete post
router.delete('/post/delete/:id', deletePost)

export default router
