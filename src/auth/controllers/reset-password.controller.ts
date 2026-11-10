import { BadRequestException, Body, Controller, HttpCode, InternalServerErrorException, Post, Query, Res } from "@nestjs/common";
import { Prisma } from "../../generated/prisma/client";
import { JsonWebTokenError, JwtService } from "@nestjs/jwt";
import { DatabaseService } from "../../database/database.service";
import { type Response } from "express";

@Controller('auth')
export class ResetPasswordController {
    constructor(
        private readonly jwtservice: JwtService,
        private readonly databaseservice: DatabaseService
    ) {}

    @Post('/reset-password')
    @HttpCode(200)
    async resetPassword(
        @Res({ passthrough: true }) res: Response,
        @Body() body: { password: string; reset_token: string}
    ) {
        const { password, reset_token }  = body;

        try {
            const decoded = this.jwtservice.verify(reset_token);

            await this.databaseservice.user.findUniqueOrThrow({
                where: { email: decoded.email }
            })

            await this.databaseservice.user.update({
                where: { email: decoded.email },
                data: {
                    password: password
                }
            })

            res.clearCookie('reset_token', {
                httpOnly: true,
                secure: true,
                sameSite: 'lax',
                maxAge: 3 * 60 * 1000
            });
            
            return {
                message: "Request Successful!"
            }
        } catch (error) {
            if (error instanceof JsonWebTokenError) {
                console.log("object error name", error.name)
                switch (error.name) {
                    case "TokenExpiredError":
                        throw new BadRequestException("Session Expired!, Please Login");
                
                    default:
                        throw new InternalServerErrorException();
                }
            }
            console.log("object error", JSON.stringify(error))
            throw error
        }
    }
}