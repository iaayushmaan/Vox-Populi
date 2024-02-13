import { User } from "@prisma/client";
import JWT from "jsonwebtoken";
import { JWTUSer } from "../interfaces";

const JWT_SECRET = "sup@R1234";

class JWTService {
  public static generateTokenForUser(user: User) {
    const payload: JWTUSer = {
      id: user?.id,
      email: user?.email,
    };
    const token = JWT.sign(payload, JWT_SECRET);
    return token;
  }

  public static decodeToken(token: string) {
    return JWT.verify(token, JWT_SECRET) as unknown as JWTUSer;
  }
}

export default JWTService;
