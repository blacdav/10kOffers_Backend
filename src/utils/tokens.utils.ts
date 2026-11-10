// import jwt from "jsonwebtoken"
// import { tokenConfig } from "../config/index.js";
// import RefreshToken from "../models/refresh-token.model.js";
// import CustomError from "./error.utils.js";

// export default class TokenService {
//     static {
//         this.access = tokenConfig.access;
//         this.refresh = tokenConfig.refresh;
//         this.reset = tokenConfig.reset;
//     }

//     static async genAccessToken(payload) {
//         try {
//             return jwt.sign(payload, this.access, { expiresIn: "1h" });
//         } catch (err) {
//             throw new CustomError(500, "Internal Server Error");
//         }
//     }

//     static async verifyAccessToken(token) {
//         try {
//             return jwt.verify(token, this.access);
//         } catch (err) {
//             throw new CustomError(401, err.message);
//         }
//     }

//     static async genRefreshToken(payload) {
//         try {
//             return jwt.sign(payload, this.refresh, { expiresIn: "30d" });

//             await RefreshToken.create({
//                 token: refresh_token,
//                 user_id: user.id,
//                 expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
//             });
//         } catch (err) {
//             throw new CustomError(500, "Internal Server Error");
//         }
//     }

//     static async verifyRefreshToken(token) {
//         try {
//             return jwt.verify(token, this.refresh);
//         } catch (err) {
//             throw new CustomError(401, "Something went wrong, please try again");
//         }
//     }

//     static async genResetToken(payload) {
//         try {
//             return jwt.sign(payload, this.reset, { expiresIn: "5m" });
//         } catch (err) {
//             throw new CustomError(500, "Internal Server Error");
//         }
//     }

//     static async verifyResetToken(token) {
//         try {
//             return jwt.verify(token, this.reset);
//         } catch (err) {
//             throw new CustomError(401, "Something went wrong, please try again");
//         }
//     }
// }