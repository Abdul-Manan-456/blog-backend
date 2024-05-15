import { Router } from 'express'
import AuthController from '../controller/Auth.controller'
import { loginUserValidator, registerUser } from '../validations'
import { validator } from '../middleware'
export const router: Router = Router()
router.get('/', (req, res) => {
    res.send('Hello World!')
})
router.post('/', validator(registerUser), AuthController.createUser)
router.post('/login', validator(loginUserValidator), AuthController.login)