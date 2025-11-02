import jwt from 'jsonwebtoken';

// Extrae el token Bearer del header Authorization
export function getBearerTokenFromHeader(req) {
  const auth = req.header('Authorization');
  if (!auth || !auth.startsWith('Bearer ')) return null;
  return auth.substring('Bearer '.length);
}

// Verifica un access token (HS256 por defecto)
export function verifyAccessToken(token) {
  return jwt.verify(token, process.env.JWT_SECRET, {
    algorithms: ['HS256'],
    issuer: process.env.JWT_ISSUER || 'tiendasol',
    audience: process.env.JWT_AUDIENCE || 'tiendasol_web',
  });
}

// Verifica un refresh token (clave y expiración distintas)
export function verifyRefreshToken(token) {
  return jwt.verify(token, process.env.JWT_REFRESH_SECRET, {
    algorithms: ['HS256'],
    issuer: process.env.JWT_ISSUER || 'tiendasol',
    audience: process.env.JWT_AUDIENCE || 'tiendasol_web',
  });
}
