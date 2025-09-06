import express from "express";

export default class Server {
  controllers = {};
  app;
  routes;

  constructor(app, port) {
    this.app = app;
    this.port = port;
    this.routes = [];
    this.app.use(express.json());
  }

  get app() {
    return this.app;
  }

  setController(controllerClass, controller) {
    this.controllers[controllerClass.name] = controller;
  }

  getController(controllerClass) {
    const controller = this.controllers[controllerClass.name];

    if (!controller) {
      throw new Error(`El controlador ${controllerClass.name} no se encontro`);
    }

    return controller;
  }

  addRoute(route) {
    this.routes.push(route);
  }

  configureRoutes() {
    this.routes.forEach((route) =>
      this.app.use(route(this.getController.bind(this)))
    );
  }

  launch() {
    this.app.listen(this.port, () => {
      console.log(`Servidor escuchando en el puerto ${this.port}`);
    });
  }
}
