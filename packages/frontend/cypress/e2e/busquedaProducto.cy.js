describe("login", () => {
  it("login-existoso", () => {
    cy.visit("http://localhost:3000/login");

    cy.get('input[name="email"]').type("juan@gmail.com");
    cy.get('input[name="password"]').type("holaMundo");

    cy.get('button[type="submit"]').click();

    cy.url().should("eq", "http://localhost:3000/");
  });
});

describe("busqueda productos", () => {
  it("paginado", () => {
    cy.visit("http://localhost:3000/productos");

    cy.get(".pagination span").contains("1");

    cy.get(".pagination > button:nth-child(3)").click();

    cy.get(".pagination span").contains("2");
  });

  it("termino-de-busqueda", () => {
    cy.visit("http://localhost:3000/productos");

    cy.get(".open-menu-button").click();

    cy.get("#product-input-menu").type("Auriculares");
    cy.get(".menu-search-bar button").click();

    cy.get("input[placeholder='Seleccionar']").type("Electrónica");

    cy.get('ul[role="listbox"]')
      .should("be.visible")
      .contains("Electrónica")
      .click({ force: true });

    cy.get('input[type="number"]').eq(0).clear().type("10000");
    cy.get('input[type="number"]').eq(1).clear().type("40000");

    cy.get("div[role='button']").click();
    cy.get("div[role='button']").eq(1).click();

    cy.get(".product-list").children().should("have.length.greaterThan", 3);
  });

  it("agregar-al-carrito", () => {
    cy.visit("http://localhost:3000/productos");

    cy.get(".open-menu-button").click();

    cy.get("#product-input-menu").type("Auriculares");
    cy.get(".menu-search-bar button").click();

    cy.get("input[placeholder='Seleccionar']").type("Electrónica");

    cy.get('ul[role="listbox"]')
      .should("be.visible")
      .contains("Electrónica")
      .click({ force: true });

    cy.get('input[type="number"]').eq(0).clear().type("10000");
    cy.get('input[type="number"]').eq(1).clear().type("40000");

    cy.get("div[role='button']").click();
    cy.get("div[role='button']").eq(1).click();

    cy.get(
      "#root div:nth-child(1) > div.product-content > div.product-text > h2.product-name"
    ).click();

    cy.get('#root path[fill="none"]').click();
    cy.get("#root a.carrito-button span").should("not.contain", "1");

    cy.get("#root button.button-gray").click();

    cy.get('#root path[fill="none"]').click();
    cy.get("#root a.carrito-button span").should("contain", "1");
  });
});
