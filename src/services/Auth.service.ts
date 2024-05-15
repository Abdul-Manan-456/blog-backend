import { PrismaClient } from "@prisma/client"
import { CreateUser, LoginUser } from "../interfaces"
import Service from "./Service"
import bcrypt from "bcrypt"
import { generateToken } from "../utils"
const prisma = new PrismaClient()
const { user } = prisma
class AuthService extends Service {
    constructor() {
        super()
    }
    // --------------   CREATE USER ----------
    async createUser(reqBody: CreateUser) {
        const { name, email, password, role } = reqBody
        try {
            // Check if the email already exists
            const existingUser = await user.findUnique({
                where: {
                    email: reqBody.email
                }
            })
            if (existingUser) {
                return this.response({ code: 400, message: "User Already Exists", data: null })
            }
            //
            // HASHED PASSWORD
            const hashedPwd = await bcrypt.hash(password, 10)
            const userData = {
                name, email, role, password: hashedPwd
            }
            const userCreate = await user.create({
                data: userData,
                select: {
                    id: true,
                    name: true,
                    email: true,
                    role: true
                }

            })
            return this.response({ code: 201, message: "User Created Successfully", data: userCreate })
        } catch (error: any) {
            throw new Error(error)
        }
    }
    // ------------- LOGIN USER -----------------
    async login(reqBody: LoginUser) {
        const { email, password } = reqBody
        const respMessage = {
            code: 400,
            message: "Invalid Credentials",
            data: null
        }

        try {
            // 
            // Validate Request Body
            if (!email || !password)
                return this.response({
                    code: 400,
                    message: "Email and Password is required",
                    data: null
                })
            const userLogin = await user.findFirst({
                where: {
                    email
                }
            })
            // 
            // if the user not exist
            if (!userLogin) return this.response(respMessage)
            // 
            // Check for hashed password
            const isMatch = await bcrypt.compare(password, userLogin.password)
            if (!isMatch) return this.response(respMessage)

            //
            // Generate JWT Token
            const token = generateToken({ id: userLogin.id, name: userLogin.name, email: userLogin.email, role: userLogin.role })
            return this.response({ code: 200, message: "Login Successful", data: { token, ...userLogin } })
        } catch (error: any) {
            throw new Error(error)
        }
    }
}

export default new AuthService()