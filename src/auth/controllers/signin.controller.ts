import { Body, Controller, HttpCode, Post, Res } from "@nestjs/common";
import { AuthService } from "../auth.service";
import { Prisma } from "../../generated/prisma/client";
import { JwtService } from "@nestjs/jwt";
import { type Response } from "express";

@Controller('auth')
export class SigInController {
    constructor(
        private readonly authservice: AuthService,
        private readonly jwtservice: JwtService
    ) {}

    @Post('signin')
    @HttpCode(200)
    async signIn(
        @Body() body: Pick<Prisma.UserCreateInput, 'email' | 'password'>,
        @Res({ passthrough: true }) res: Response
    ){
        try {
            const user = await this.authservice.login(body);

            const access_token = this.jwtservice.sign({
                user_id: user.id,
                role: user.role
            }, { expiresIn: '15m' })

            const refresh_token = this.jwtservice.sign({
                user_id: user.id
            }, { expiresIn: '30d' })

            res.cookie('access_token', access_token, {
                httpOnly: true,
                secure: true,
                sameSite: 'lax',
                maxAge: 1000 * 60 * 15
            })

            res.cookie('refresh_token', refresh_token, {
                httpOnly: true,
                secure: true,
                sameSite: 'lax',
                maxAge: 1000 * 60 * 60 * 24 * 30
            })

            return {
                message: 'Login Successful',
                data: {
                    access_token,
                    refresh_token,
                    user
                }
            };
        } catch (error) {
            throw error;
        }
    }
}