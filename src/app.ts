import 'module-alias/register'
import { config } from 'dotenv'
import express, { Express } from 'express'
import indexRouter from './routes'
config()
const app: Express = express()
app.use('/api/v1', indexRouter)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
export default app
