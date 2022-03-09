import jsonwebtoken, { JwtPayload } from 'jsonwebtoken';

export type Token = string;

export type DecodedToken = string | JwtPayload | null;

const {
  JWT_TOKEN_SECRET,
  JWT_REFRESH_TOKEN_SECRET,
  JWT_TOKEN_EXPIRES_IN,
  JWT_REFRESH_TOKEN_EXPIRES_IN,
} = process.env;

export class TokenService {
  tokenSecret: string;
  refreshTokenSecret: string;

  constructor() {
    this.tokenSecret = JWT_TOKEN_SECRET || '';
    this.refreshTokenSecret = JWT_REFRESH_TOKEN_SECRET || '';
  }

  generateTokens(payload: any) {
    const token = jsonwebtoken.sign(payload, this.tokenSecret, {
      expiresIn: JWT_TOKEN_EXPIRES_IN || '1d',
      notBefore: '60',
    });

    const refreshToken = jsonwebtoken.sign(payload, this.refreshTokenSecret, {
      expiresIn: JWT_REFRESH_TOKEN_EXPIRES_IN || '3d',
      notBefore: '60',
    });

    return [token, refreshToken];
  }

  validateToken(token: Token = ''): JwtPayload | string {
    return jsonwebtoken.verify(token, this.tokenSecret);
  }

  validateRefreshToken(refreshToken: Token = ''): JwtPayload | string {
    return jsonwebtoken.verify(refreshToken, this.refreshTokenSecret);
  }

  decode(token: Token = ''): DecodedToken {
    return jsonwebtoken.decode(token);
  }
}
