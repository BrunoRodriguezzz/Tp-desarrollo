describe("login", () => {
  it("login-existoso", () => {
    cy.visit("http://localhost:3000/login");

    cy.get('input[name="email"]').type("juan@gmail.com");
    cy.get('input[name="password"]').type("holaMundo");

    cy.get('button[type="submit"]').click();

    cy.url().should("eq", "http://localhost:3000/");
  });
});

describe("realizar-compra", () => {
  it("agregar-al-carrito", () => {
    cy.visit("http://localhost:3000/login");

    cy.get('input[name="email"]').type("juan@gmail.com");
    cy.get('input[name="password"]').type("holaMundo");

    cy.get('button[type="submit"]').click();

    cy.get(
      "#root div:nth-child(1) > div.product-content > div.button-wrapper > button.add-to-cart-button"
    ).click();
    cy.get('#root path[stroke-miterlimit="10"]').click();
    cy.get("#root a.carrito-button").click();

    cy.get(".lista-productos-container").children().should("have.length", 1);
  });

  it("finalizar-compra", () => {
    cy.visit("http://localhost:3000/login");

    cy.get('input[name="email"]').type("juan@gmail.com");
    cy.get('input[name="password"]').type("holaMundo");

    cy.get('button[type="submit"]').click();

    cy.get(
      "#root div:nth-child(1) > div.product-content > div.button-wrapper > button.add-to-cart-button"
    ).click();
    cy.get('#root path[stroke-miterlimit="10"]').click();
    cy.get("#root a.carrito-button").click();

    cy.get(".lista-productos-container").children().should("have.length", 1);
    cy.get("#root button.btn-comprar").click();

    cy.get('[name="calle"]').type("Av. SantaFe");
    cy.get('[name="altura"]').type("3200");
    cy.get('[name="ciudad"]').type("CABA");
    cy.get('[name="provincia"]').type("Buenos Aires");
    cy.get('[name="pais"]').type("Argentina");

    cy.get("#root button.btn-comprar").click();
    cy.get('div[role="dialog"] button:nth-child(2)').click();
  });
});
