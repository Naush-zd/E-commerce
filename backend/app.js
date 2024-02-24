import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import morgan from 'morgan'

const app = express()

app.use(cors({
    origin: "*",
}))

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

//routes imports
import userRouter from './routes/user.routes.js'
import productRouter from './routes/product.routes.js'
import orderRouter from './routes/order.routes.js'

app.use(express.json())
app.use(morgan('dev'))

//routes
app.use('/api/v1/auth', userRouter)
app.use('/api/v1/products', productRouter)
app.use('/api/v1/orders', orderRouter)

export {app}