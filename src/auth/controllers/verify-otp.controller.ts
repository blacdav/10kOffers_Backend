import { BadRequestException, Body, Controller, HttpCode, Post, Res } from "@nestjs/common";
import { Prisma } from "../../generated/prisma/client";
import { DatabaseService } from "../../database/database.service";
import { JwtService } from "@nestjs/jwt";
import { type Response } from "express";
import { CompareHash } from "../../utils/hash.utils";

@Controller('auth')
export class VerifyOtpController {
    constructor(
        private readonly databaseservice: DatabaseService,
        private readonly jwtservice: JwtService
    ) {}

    @Post('verify-otp')
    @HttpCode(200)
    async verifyOtp(
        @Res({ passthrough: true }) res: Response,
        @Body() body: Pick<Prisma.UserCreateInput, 'email' | 'otp'>
    ) {
        const { email, otp } = body;

        try {
            const user = await this.databaseservice.user.findUniqueOrThrow({
                where: { email },
                select: {
                    email: true,
                    otp: true,
                    otp_expires: true
                }
            });

            if (user.otp_expires?.getTime()! < Date.now()) {
                throw new BadRequestException('OTP has expired');
            }

            const compared = await CompareHash(user.otp!, otp!)
            if (!compared) {
                throw new BadRequestException('OTP has expired');
            }

            await this.databaseservice.user.update({
                where: { email },
                data: {
                    otp: null,
                    otp_expires: null
                }
            });

            const reset_token = this.jwtservice.sign({ email }, { expiresIn: '3m' });

            res.cookie("reset_token", reset_token, {
                httpOnly: true,
                secure: true,
                sameSite: 'lax',
                maxAge: 3 * 60 * 1000
            });

            return {
                message: "OTP Verified!",
                data: {
                    reset_token
                }
            }
        } catch (error) {
            console.log("error", error)
            throw error
        }
    }
}