import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface AuthRequest extends Request {
  user: jwt.JwtPayload;
}

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const token = req.header('Authorization')?.split(" ")[1];
  
  if (!token) {
    res.status(401).json({ message: "Unauthorized, no token provided" });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    (req as AuthRequest).user = decoded as jwt.JwtPayload;
    next();

  } catch (error) {
    res.status(401).json({ message: error instanceof Error ? error.message : "Unauthorized, invalid token" });
  }
};
