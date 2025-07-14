import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import aiRouter from './routes/aiRoutes.js'
import { clerkMiddleware, requireAuth } from '@clerk/express'
import connectCloudinary from './configs/cloudinary.js'
import userRouter from './routes/userRoutes.js'
import serverless from 'serverless-http'

const app = express()

await connectCloudinary()

app.use(cors())
app.use(express.json())
app.use(clerkMiddleware())

app.get('/', (req, res) => res.send('Server is live'))
app.use(requireAuth())

app.use('/api/ai', aiRouter)
app.use('/api/user', userRouter)

export const handler = serverless(app) 
