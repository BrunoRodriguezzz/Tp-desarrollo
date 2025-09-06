export default class HealthController {
  health(req, res) {
    res.status(200).json({ status: "ok" });
  }
}
