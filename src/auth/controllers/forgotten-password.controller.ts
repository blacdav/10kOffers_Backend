import { BadRequestException, Body, ConflictException, Controller, HttpCode, NotFoundException, Post } from "@nestjs/common";
import { Prisma } from "../../generated/prisma/client";
import { DatabaseService } from "../../database/database.service";
import { Otp } from "../../utils/otp";
import { Hash } from "../../utils/hash.utils";

@Controller('auth')
export class ForgottenPasswordController {
    constructor(private readonly databaseservice: DatabaseService) {}

    @Post('/forgotten-password')
    @HttpCode(200)
    async forgottenPassword(@Body() body: Pick<Prisma.UserCreateInput, 'email'>) {
        try {
            await this.databaseservice.user.findUniqueOrThrow({
                where: { email: body.email },
                select: {
                    email: true
                }
            });

            const otp = Otp().toString();
            const otp_expires = new Date(Date.now() + 5 * 60 * 1000);

            await this.databaseservice.user.update({
                where: { email: body.email },
                data: {
                    otp: await Hash(otp),
                    otp_expires
                }
            });

            // send otp here

            return {
                message: "OTP has been sent!",
                otp
            }
        } catch (error) {
            console.log("object", error)

            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                switch (error.code) {
                    case "P2002":
                        throw new ConflictException(``);

                    case "P2003":
                        // throw new 
                    case "P2005":
                        // throw new 

                    case "P2006":
                        throw new BadRequestException(``)

                    case "P2025":
                        throw new NotFoundException(`${error.meta?.modelName} not found`);

                    case "P1010":

                    case "P1012":


                    case "P2014":

                }
            }
        }
    }
}