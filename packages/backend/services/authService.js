import jwt from "jsonwebtoken";

export default class AuthService {
    generateToken(usuario) {
        const payload = { 
            id: usuario.id, 
            email: usuario.email,
            nombre: usuario.nombre,
            tipo: usuario.tipo,
        };
        const secret = process.env.JWT_SECRET;
        const options = { expiresIn: process.env.JWT_EXPIRES_IN || "15m",
                          issuer: process.env.JWT_ISSUER || 'tiendasol',
                          audience: process.env.JWT_AUDIENCE || 'tiendasol_web' };
        return jwt.sign(payload, secret, options);
    }

    generateRefreshToken(usuario) {
        const payload = { 
            id: usuario.id,
            email: usuario.email,
            nombre: usuario.nombre,
            tipo: usuario.tipo,
        };
        const secret = process.env.JWT_REFRESH_SECRET;
        const options = { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || "1d",
                          issuer: process.env.JWT_ISSUER || 'tiendasol',
                          audience: process.env.JWT_AUDIENCE || 'tiendasol_web' };
        return jwt.sign(payload, secret, options);
    }
}
