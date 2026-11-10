import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "../../guards/auth.guard";
import { type Request } from "express";
import { AuthService } from "../auth.service";

@UseGuards(AuthGuard)
@Controller('auth')
export class GetMeController {
    constructor(private readonly authservice: AuthService) {}

    @Get('/me')
    async getMe(@Req() req: Request) {
        const { user_id } = req.user;

        const data = await this.authservice.getAuthMe(user_id);

        return {
            message: "Successful Request",
            data: data
        }
    }
}