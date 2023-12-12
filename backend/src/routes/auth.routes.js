import { Router } from 'express'
import { register, login, profile, logout } from '../controllers/auth.controller.js'

const router = Router()

// Register.
router.post('/register', register)

// Login
router.post('/login', login)

// Profile
router.get('/profile', profile)

// Logout
router.post('/logout', logout)

export default router
