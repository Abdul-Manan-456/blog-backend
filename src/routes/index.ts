import express, { Router } from 'express'
const indexRouter: Router = express.Router()
import { router as userRouter } from './user.routes'
import { router as postRouter } from './blogPost.routes'


const routes = [
    {
        path: '/user',
        router: userRouter
    },
    {
        path: '/blog',
        router: postRouter
    },
]

routes.forEach(route => {
    indexRouter.use(route.path, route.router)
})
export default indexRouter