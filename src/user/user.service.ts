import { Injectable } from "@nestjs/common";
import { DatabaseService } from "../database/database.service";

@Injectable()
export class UserServices {
    constructor(private readonly databaseservice: DatabaseService) {}

    async getUser(user_id: string) {
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