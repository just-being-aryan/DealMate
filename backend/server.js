import express from 'express'
import cors from 'cors'
import connectDB from './config/db.js'
import errorMiddleware from "./middleware/errorMiddleware.js";
import dotenv from 'dotenv'

import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";

dotenv.config()
connectDB()

const allowedOrigins = [
  "http://localhost:3000",
  "https://deal-mate-rho.vercel.app"
]

const app = express()
app.use(cors({
  origin: allowedOrigins, 
  credentials: true, 
}))

app.use(express.json())

app.get('/', (req,res) => {
    res.send('API is running...')
})




//routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);


const PORT = process.env.PORT || 8000

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`)
})

app.use(errorMiddleware)