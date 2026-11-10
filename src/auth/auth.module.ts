import { Module } from "@nestjs/common";
import { DatabaseModule } from "../database/database.module";
import { SignUpController } from "./controllers/signup.controller";
import { SigInController } from "./controllers/signin.controller";
import { ForgottenPasswordController } from "./controllers/forgotten-password.controller";
import { VerifyOtpController } from "./controllers/verify-otp.controller";
import { ResetPasswordController } from "./controllers/reset-password.controller";
import { GetMeController } from "./controllers/me.controller";
import { AuthService } from "./auth.service";

@Module({
    imports: [DatabaseModule],
    controllers: [
        SignUpController,
        SigInController,
        ForgottenPasswordController,
        VerifyOtpController,
        ResetPasswordController,
        GetMeController
    ],
    providers: [AuthService]
})

export class AuthModule {}