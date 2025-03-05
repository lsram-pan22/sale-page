const express = require("express")
const dotenv = require('dotenv')
const cors = require("cors")

const connectDB = require('./config/db')

// Path
const login = require('./controllers/login')
const user = require('./controllers/user')
const permission = require('./controllers/permission')

dotenv.config()
const app = express()

// เชื่อมต่อฐานข้อมูล
connectDB()

// Middleware
app.use(cors())
app.use(express.json())

// Routes
app.use('/api/login', login)
app.use('/api/user', user)
app.use('/api/permission', permission)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT} 🚀`))