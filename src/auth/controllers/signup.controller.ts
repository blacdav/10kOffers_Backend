import { Body, Controller, HttpCode, Post, Res, UsePipes } from "@nestjs/common";
// import { ZodValidationPipe } from "nestjs-zod";
// import { UserSchema } from "../../dto/user.dto";
import { Prisma } from "../../generated/prisma/client";
import { AuthService } from "../auth.service";
import { JwtService } from "@nestjs/jwt";
import { type Response } from "express";

@Controller('auth')
export class SignUpController {
    constructor(
        private readonly authservice: AuthService,
        private readonly jwtservice: JwtService
    ){}

    @Post('/signup')
    @HttpCode(201)
    // @UsePipes(new ZodValidationPipe(UserSchema.pick({
    //     fullname: true,
    //     email: true,
    //     password: true
    // })))
    async signUp(
        @Body() body: Pick<Prisma.UserCreateInput, 'fullname' | 'email' | 'whatsapp' | 'password'>,
        @Res({ passthrough: true }) res: Response
    ){
        try {
            const user = await this.authservice.createUser(body);

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
                message: 'User created successfully!',
                user,
                tokens: {
                    access_token,
                    refresh_token
                }
            };
        } catch (error) {
            throw error;
        }
    }
}