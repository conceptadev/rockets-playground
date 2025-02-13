const placeholderText = "Lorem ipsum";

describe("Sign In", () => {
  it("visits page without error", () => {
    cy.visit("/sign-in");
  });

  it("fills form inputs", () => {
    cy.visit("/sign-in");
    cy.get("#root_email").type(Cypress.env("signInEmail"));
    cy.get("#root_password").type(Cypress.env("signInPassword"));
    cy.contains("button", "Sign in").click();
    cy.url().should("include", "/users");
  });

  it("displays validation error when all fields are empty", () => {
    cy.visit("/sign-in");
    cy.contains("button", "Sign in").click();
    cy.contains("Email is required.").should("be.visible");
    cy.contains("Password is required.").should("be.visible");
  });

  it("displays validation error when email field is empty", () => {
    cy.visit("/sign-in");
    cy.get("#root_password").type(Cypress.env("signInPassword"), {
      log: false,
    });
    cy.contains("button", "Sign in").click();
    cy.contains("Email is required.").should("be.visible");
  });

  it("displays validation error when email field is invalid", () => {
    cy.visit("/sign-in");
    cy.get("#root_email").type(placeholderText);
    cy.get("#root_password").type(Cypress.env("signInPassword"), {
      log: false,
    });
    cy.contains("button", "Sign in").click();
    cy.contains("Please enter a valid email.").should("be.visible");
  });

  it("displays validation error when password field is empty", () => {
    cy.visit("/sign-in");
    cy.get("#root_email").type(Cypress.env("signInEmail"), { log: false });
    cy.contains("button", "Sign in").click();
    cy.contains("Password is required.").should("be.visible");
  });

  it("displays toast error when sign in fails", () => {
    cy.visit("/sign-in");
    cy.get("#root_email").type(Cypress.env("signInEmail"), { log: false });
    cy.get("#root_password").type(placeholderText);
    cy.contains("button", "Sign in").click();
    cy.contains(
      "Invalid username or password. Please check your credentials and try again."
    ).should("be.visible");
  });

  it("displays toast error when request is errored by unauthorized access", () => {
    cy.intercept("POST", "/auth/login", { statusCode: 403 }).as("doLogin");
    cy.visit("/sign-in");
    cy.get("#root_email").type(Cypress.env("signInEmail"), { log: false });
    cy.get("#root_password").type(Cypress.env("signInPassword"), {
      log: false,
    });
    cy.contains("button", "Sign in").click();
    cy.wait("@doLogin");
    cy.contains("You are not authorized to access this resource.").should(
      "be.visible"
    );
  });

  it("displays toast error when request is errored by timeout", () => {
    cy.intercept("POST", "/auth/login", {
      delay: 60000,
      forceNetworkError: true,
    }).as("doLogin");
    cy.visit("/sign-in");
    cy.get("#root_email").type(Cypress.env("signInEmail"), { log: false });
    cy.get("#root_password").type(Cypress.env("signInPassword"), {
      log: false,
    });
    cy.contains("button", "Sign in").click();
    cy.wait("@doLogin").then((interception) =>
      cy.log("interception: ", interception)
    );
    cy.contains(
      "Invalid username or password. Please check your credentials and try again."
    ).should("be.visible");
  });
});
