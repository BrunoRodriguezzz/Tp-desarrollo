import { validarPasswords, validarUsuarioLogin } from '../validadores/validadorUsuario.js';
import { BadRequestError } from '../errors/tiendaSolError.js';
import { verifyRefreshToken } from '../utils/jwt.js';

export default class UsuarioController {
  usuarioService;
  authService;

  constructor(usuarioService, authService) {
    this.usuarioService = usuarioService;
    this.authService = authService;
  }

  async login(req, res) {
    const body = req.body || {};
    const { email, password } = body;

    if (!email || !password) {
      throw new BadRequestError("Se requieren 'email' y 'password' en el body JSON");
    }

    console.log('email:', email);
    console.log('password:', password);

    const user = await this.usuarioService.authenticate(email, password);

    validarUsuarioLogin(user);

    const token = this.authService.generateToken(user);
    const refreshToken = this.authService.generateRefreshToken(user);

    const userDTO = {
      id: user.id,
      nombre: user.nombre,
      email: user.email,
      telefono: user.telefono,
      tipo: user.tipo,
    };

    return res.status(200).json({ user: userDTO, token, refreshToken });
  }

  async signup(req, res) {
    const body = req.body || {};

    if (!body || Object.keys(body).length === 0) {
      throw new BadRequestError('Se requiere un body con Content-Type: application/json');
    }

    const { nombre, email, telefono, tipoUsuario, password, passwordConfirm } = body;

    if (!nombre || !email || !password || !passwordConfirm || !tipoUsuario) {
      console.log(req.body);
      throw new BadRequestError(
        'Campos obligatorios: nombre, email, tipoUsuario, password, passwordConfirm'
      );
    }

    validarPasswords(password, passwordConfirm);

    const newUser = await this.usuarioService.signup(
      nombre,
      email,
      telefono,
      tipoUsuario,
      password
    );

    const token = this.authService.generateToken(newUser);
    const refreshToken = this.authService.generateRefreshToken(newUser);

    const userDTO = {
      id: newUser.id,
      nombre: newUser.nombre,
      email: newUser.email,
      telefono: newUser.telefono,
      tipo: newUser.tipo,
    };

    res.status(201).json({ user: userDTO, token, refreshToken });
  }

  async refreshToken(req, res) {
    const { refreshToken } = req.body || {};

    if (!refreshToken) {
      throw new BadRequestError('Se requiere el refreshToken');
    }

    let payload;
    try {
      payload = verifyRefreshToken(refreshToken);
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        throw new BadRequestError('Refresh token expirado');
      }
      throw new BadRequestError('Refresh token inválido');
    }

    const userId = payload.sub || payload.id;
    const user = await this.usuarioService.findById(userId);

    if (!user) {
      throw new BadRequestError('Usuario no encontrado para el refresh token proporcionado');
    }

    const accessToken = this.authService.generateToken(user);

    const userDTO = {
      id: user.id,
      nombre: user.nombre,
      email: user.email,
      telefono: user.telefono,
      tipo: user.tipo,
    };

    res.status(200).json({ user: userDTO, token: accessToken });
  }
}
