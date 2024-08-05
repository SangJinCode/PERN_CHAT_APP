import jwt, {JwtPayload} from "jsonwebtoken";

import { Request, Response, NextFunction } from "express";
import prisma from "../db/prisma.js";

//extends를 사용해 JwtPayload 인터페이스로 부터 상속 받아 사용한다.
interface DecodedToken extends JwtPayload {
    userId: string;
}

//ambient(global) 모듈화하여 다른 TS에서도 사용 가능하게한다.
declare global {
    namespace Express {
        export interface Request {
            user: {
                id: string
            };
        }
    }
}

//req에 담긴 JWT token과 JWT secret code를 검증하는 middleware
const protectRoute = async (req:Request, res:Response, next:NextFunction) => {
    try {
        const token = req.cookies.jwt;
        if(!token) {
            return res.status(401).json({error:"Unauthorised - No token provided"});
        }
        //느낌표(!)는 null이 아님을 전달 or TS 분석이 감지할 수 없어도 변수가 할당되었다고 알려 사용할 수있게 만듬
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as DecodedToken;
        if(!decoded) {
            return res.status(401).json({error: "unauthorized - Invalid Token"});
        }

        const user = await prisma.user.findUnique({ where: {id: decoded.userId}, select: {id: true, username: true,
            fullName: true, profilePic: true}
        })
        if(!user) {
            return res.status(404).json({error: "User not found"});
        }
        //모두 이상없으면 req.user에 다시 대입
        req.user = user;

        next()

    } catch (error: any) {
        console.log("Error in protectRoute middleware", error.message);
        res.status(500).json({error: "Internal Server Error"})
    }
};

export default protectRoute;