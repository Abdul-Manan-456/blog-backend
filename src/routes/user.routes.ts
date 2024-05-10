import { Router } from 'express'
import AuthController from '../controller/Auth.controller'
export const router: Router = Router()
router.get('/', (req, res) => {
    res.send('Hello World!')
})
router.post('/', AuthController.createUser)