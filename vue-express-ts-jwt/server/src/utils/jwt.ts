import jwt from 'jsonwebtoken';

/**
 * Generate a JWT token
 * @param payload - The data to encrypt in the token
 * @returns A signed JWT token
 */
export const generateToken = (payload: object): string => {
  const secret = process.env.JWT_SECRET || 'default_secret';
  
  // Using a type assertion to bypass TypeScript's strict checking
  // @ts-ignore
  return jwt.sign(payload, secret, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });
};

/**
 * Verify a JWT token
 * @param token - The token to verify
 * @returns The decoded token payload
 */
export const verifyToken = (token: string): any => {
  const secret = process.env.JWT_SECRET || 'default_secret';
  
  try {
    // @ts-ignore
    return jwt.verify(token, secret);
  } catch (error) {
    throw error;
  }
}; 