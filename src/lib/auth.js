import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { JWT_SECRET } from '$env/static/private';

export function createToken(userId) {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '24h' });
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
}

export async function hashPassword(password) {
  return await bcrypt.hash(password, 10);
}

export async function comparePassword(password, hashedPassword) {
  return await bcrypt.compare(password, hashedPassword);
}
