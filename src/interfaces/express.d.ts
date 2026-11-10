import { Role } from "../generated/prisma/enums"
import { Request, Express } from "express";

declare global {
    namespace Express {
        interface Request {
            user: {
                user_id: string,
                role?: Role
            }
        }
    }
}