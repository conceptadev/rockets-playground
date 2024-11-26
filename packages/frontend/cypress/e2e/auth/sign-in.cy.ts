describe("Sign In", () => {
  it("visits page without error", () => {
    cy.visit("/sign-in");
  });

  it("fills form inputs", () => {
    cy.visit("/sign-in");
    cy.get("#root_username").type("admin@conceptatech.com");
    cy.get("#root_password").type("Test1234");
    cy.contains("Send").click();
    cy.url().should("include", "/settings");
  });
});
