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
  "https://deal-mate-rho.vercel.app",
  "http://localhost:3000"             
];


const app = express()
app.use(cors({
  origin: function(origin, callback){
    // allow requests with no origin (like Postman)
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){
      const msg = "The CORS policy for this site does not allow access from the specified Origin.";
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true
}));

app.use(express.json())

app.get('/', (req,res) => {
    res.send('API is running...')
})

app.use(errorMiddleware)


//routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);


const PORT = process.env.PORT || 8000

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`)
})