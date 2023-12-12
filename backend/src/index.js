import app from './app.js'
import { connectDB } from './db.js'

// Connect the DB.
connectDB()

const port = 3000

app.listen(port)

console.log(`Backend run on http://localhost:${port}`)
