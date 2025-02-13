describe("Sign In", () => {
  it("visits page without error", () => {
    cy.visit("/sign-in");
  });

  it("fills form inputs", () => {
    cy.visit("/sign-in");
    cy.get("#root_username").type(Cypress.env("signInEmail"));
    cy.get("#root_password").type(Cypress.env("signInPassword"));
    cy.contains("Send").click();
    cy.url().should("include", "/users");
  });
});
