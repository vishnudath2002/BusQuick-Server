import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


export class AuthService {
  

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  async comparePassword(plain: string, hashed: string): Promise<boolean> {
    return bcrypt.compare(plain, hashed);
  }

  async generateAccessToken(userId: string,role: string): Promise<string> {
    return jwt.sign({id: userId,role},process.env.JWT_SECRET!, { expiresIn: "1d" })
  }

  async generateRefreshToken(userId: string,role: string): Promise<string> {
    return jwt.sign({id: userId,role},process.env.REFRESH_TOKEN_SECRET!, { expiresIn: "7d" })
  }

  async verifyRefreshToken(refreshToken: string): Promise<boolean> {
    try {
      jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!);
      return true;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return false;
      } else {
        return false;
      }
    }
  }
  
  

}
