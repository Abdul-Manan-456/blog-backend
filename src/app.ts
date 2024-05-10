import 'module-alias/register'
import { config } from 'dotenv'
import express, { Express } from 'express'
import indexRouter from './routes'
import { error404Handler, errorHandler } from './utils'
config()
const app: Express = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use('/api/v1', indexRouter)
app.use('/*', error404Handler)
app.use(errorHandler)
export default app
