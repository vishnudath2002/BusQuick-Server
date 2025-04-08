export interface IAuthService {
    hashPassword(password: string): Promise<string>;
    comparePassword(plain: string, hashed: string): Promise<boolean>;
    generateAccessToken(userId: string,role: string): Promise<string>;
    generateRefreshToken(userId: string,role: string): Promise<string>;
    verifyRefreshToken(refreshToken: string): Promise<boolean>;
 
  }
  