import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { Prisma } from "../generated/prisma/browser";
import { DatabaseService } from "../database/database.service";
import { CompareHash, Hash } from "../utils/hash.utils";

@Injectable()
export class AuthService {
    constructor(private readonly databaseservice: DatabaseService){}

    async createUser(body: Pick<Prisma.UserCreateInput, 'fullname' | 'email' | 'whatsapp' | 'password'>) {
        const user = await this.databaseservice.user.findUnique({
            where: { email: body.email }
        })

        if (user) {
            throw new ConflictException('User already exist')
        }

        return await this.databaseservice.user.create({ data: {
            ...body,
            password: await Hash(body.password)
        } });
    }

    async login(body: Pick<Prisma.UserCreateInput, 'email' | 'password'>) {
        const user = await this.databaseservice.user.findUnique({
            where: { email: body.email }
        });
        if (!user) {
            throw new NotFoundException('Invalid Email or Password')
        }

        const isValid = await CompareHash(user.password, body.password);
        if (!isValid) {
            throw new NotFoundException('Invalid Email or Password')
        }

        return user;
    }

    async forgottenPassword() {}

    async getAuthMe(user_id: string) {
        return this.databaseservice.user.findUniqueOrThrow({
            where: { id: user_id },
            omit: {
                id: true,
                password: true,
                created_at: true,
                updated_at: true
            }
        })
    }
}