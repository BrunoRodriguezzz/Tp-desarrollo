export default class NotificacionController {
  notificacionService;

  constructor(notificacionService) {
    this.notificacionService = notificacionService;
  }

  findAll(req, res) {
    const { leida } = req.query;
    if (leida !== undefined) {
      if (leida === "true") {
        this.notificacionService.findAllLeidas();
      }
      if (leida === "false") {
        this.notificacionService.findAllNoLeidas();
      }
    }
  }

  findByID(req, res) {
    const { id } = req.params;
  }
}
