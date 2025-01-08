import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { TokenPayload } from '../types/models';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const JWT_EXPIRES_IN = '30d';

export interface TokenRequest extends Request {
  user?: TokenPayload;
  token?: string;
}

const generateToken = (payload: TokenPayload): string => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};

export const authenticateToken = (
  req: TokenRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    res.status(401).json({ message: 'Authentication token is required' });
    return
  }

  try {
    const user = jwt.verify(token, JWT_SECRET) as TokenPayload;

    const newToken = generateToken({
      id: user.id,
      email: user.email,
      role: user.role
    });

    req.user = user;
    req.token = newToken;
    next();
  } catch (error) {
    res.status(403).json({ message: 'Invalid or expired token' });
  }
};

export const authorizeRole = (roles: string[]) => {
  return (req: TokenRequest, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      res.status(403).json({ message: 'Access denied' });
    }
    next();
  };
};