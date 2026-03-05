import { JwtService } from "domain/services/JwtService";
import jwt from "jsonwebtoken";

export class JwtServiceImpl implements JwtService {
  constructor(
    private readonly accessTokenSecret: string,
    private readonly refreshTokenSecret: string,
  ) {}
  async signAccessToken(
    payload: { id: string; role: string },
    expiresIn: string | number,
  ): Promise<string> {
    return jwt.sign(payload, this.accessTokenSecret, {
      expiresIn: expiresIn as jwt.SignOptions["expiresIn"],
    });
  }

  async signRefreshToken(
    payload: { id: string; role: string },
    expiresIn: string | number,
  ): Promise<string> {
    return jwt.sign(payload, this.refreshTokenSecret, {
      expiresIn: expiresIn as jwt.SignOptions["expiresIn"],
    });
  }

  async verifyAccessToken<T = unknown>(token: string): Promise<T> {
    try {
      return jwt.verify(token, this.accessTokenSecret) as T;
    } catch (error) {
      throw new Error("Invalid or expired token!");
    }
  }

  async verifyRefreshToken<T = unknown>(token: string): Promise<T> {
    try {
      return jwt.verify(token, this.refreshTokenSecret) as T;
    } catch (error) {
      throw new Error("Invalid or expired token!");
    }
  }
}
