import { getBearerTokenFromHeader, verifyAccessToken } from '../utils/jwt.js';

// Middleware de autenticación por Bearer token
// Uso: import { authMiddleware } from '../middlewares/authMiddleware.js'
//      router.post('/ruta', authMiddleware, handler)

export const authMiddleware = (req, res, next) => {
  try {
    const token = getBearerTokenFromHeader(req);
    if (!token) {
      return res.status(401).json({ message: 'Se requiere un token Bearer.' });
    }

    const payload = verifyAccessToken(token);

    req.user = {
      id: payload.sub || payload.id,
      nombre: payload.nombre,
      email: payload.email,
      tipo: payload.tipo,
    };

    return next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expirado' });
    }
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Token inválido' });
    }
    if (error.name === 'NotBeforeError') {
      return res.status(401).json({ message: 'Token aún no válido' });
    }
    return res.status(401).json({ message: 'Error de autenticación' });
  }
};
