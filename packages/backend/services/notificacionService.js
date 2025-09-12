export default class NotificacionService {
  notificacionRepository;

  constructor(notificacionRepository) {
    this.notificacionRepository = notificacionRepository;
  }

  findAllLeidas() {}
  findAllNoLeidas() {}
}
