import { PrismaClient } from "@prisma/client"
import { CreateUser } from "../interfaces"
import Service from "./Service"
import logger from "../utils/winston"

const prisma = new PrismaClient()
const { user } = prisma
class AuthService extends Service {
    constructor() {
        super()
    }
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

            const userData = {
                name, email, password, role
            }
            const userCreate = await user.create({ data: userData })
            console.log("userCreate---------------", userCreate)
            return this.response({ code: 201, message: "User Created Successfully", data: userCreate })
        } catch (error: any) {
            throw new Error(error)
        }

    }
}

export default new AuthService()