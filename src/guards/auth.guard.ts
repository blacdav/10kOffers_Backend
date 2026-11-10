import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from 'express'


@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private readonly jwtservice: JwtService) {}

    canActivate(context: ExecutionContext): boolean {
        const request: Request = context.switchToHttp().getRequest();
        // const authHeader = request.cookies['refresh_token']; // Assuming the refresh token is stored in cookies
        const authHeader = request.headers['authorization']?.split(' ')[1]; // Extract the token from the "Bearer <token>" format
        if (!authHeader) {
            throw new UnauthorizedException('Invalid or expired token')
        }

        try {
            const payload = this.jwtservice.verify(authHeader);
            request.user = payload;

            console.log("object", payload)
        } catch (err) {
            throw new UnauthorizedException('Invalid or expired token')
        }

        return true;
    }
}