describe("Users Page", () => {
  beforeEach(() => {
    cy.visit("/sign-in");
    cy.get("#root_email").type(Cypress.env("signInEmail"), { log: false });
    cy.get("#root_password").type(Cypress.env("signInPassword"), {
      log: false,
    });
    cy.contains("button", "Sign in").click();
    cy.url().should("include", "/users");
  });

  it("displays screen title and subtitle", () => {
    cy.contains("Users").should("be.visible");
    cy.contains("Registered Users").should("be.visible");
  });

  it("displays table with correct columns", () => {
    cy.get("table").within(() => {
      cy.contains("th", "ID").should("be.visible");
      cy.contains("th", "FULL NAME").should("be.visible");
      cy.contains("th", "EMAIL").should("be.visible");
      cy.contains("th", "ROLE").should("be.visible");
      cy.contains("th", "STATUS").should("be.visible");
      cy.contains("th", "ACCOUNT STATUS").should("be.visible");
    });
  });

  it("filters by name or email", () => {
    cy.get('label:contains("Search by name or email")')
      .parent()
      .find("input")
      .type("admin");
    cy.get("table tbody tr").should("have.length.at.least", 1);
  });

  it("filters by role", () => {
    cy.intercept("GET", "/role*").as("getRoles");
    cy.wait("@getRoles");
    cy.get('label:contains("Role")').parent().click();
    cy.get('[role="listbox"] [role="option"]').first().click();
    cy.get("table tbody tr").should("have.length.at.least", 1);
  });

  it("filters by activity status", () => {
    cy.get('label:contains("Activity Status")').parent().click();
    cy.get('[role="listbox"] [role="option"]').contains("Active").click();
    cy.get("table tbody tr").each(($row) => {
      cy.wrap($row).find("div").contains("Active");
    });
  });

  it("filters by account status", () => {
    cy.get('label:contains("Account Status")').parent().click();
    cy.get('[role="listbox"] [role="option"]').contains("Active").click();
    cy.get("table tbody tr").each(($row) => {
      cy.wrap($row).find("div").contains("Active");
    });
  });

  it("displays user details with correct form fields", () => {
    cy.get("table tbody tr")
      .first()
      .find('[data-testid="details-button"]')
      .click();
    cy.get("#root_fullName").should("exist");
    cy.get("#root_email").should("exist");
    cy.get("#root_roleId").should("exist");
  });

  it("validates required fields", () => {
    cy.contains("button", "Add new").click();
    cy.contains("button", "Save").click();
    cy.contains("is a required property").should("be.visible");
  });

  it("validates trimmed values", () => {
    cy.contains("Add new").click();
    cy.get("#root_fullName").type("   ");
    cy.contains("button", "Save").click();
    cy.contains("is a required property").should("be.visible");
  });

  it("creates user successfully", () => {
    cy.contains("Add new").click();
    const testEmail = `test-${Date.now()}@example.com`;
    cy.get("#root_fullName").type("Test User");
    cy.get("#root_nickname").type(
      `Tester ${Math.floor(1000 + Math.random() * 9000)}`
    );
    cy.get("#root_email").type(testEmail);
    cy.get("#root_roleId").click();
    cy.get('[role="listbox"] [role="option"]').first().click();
    cy.contains("button", "Save").click();
    cy.contains("User successfully created.").should("be.visible");
  });

  it("handles server error on creation", () => {
    cy.contains("Add new").click();
    cy.intercept("POST", "/user-profile", {
      statusCode: 500,
      body: { message: "Server error occurred" },
    }).as("createUserError");

    cy.get("#root_fullName").type("Test User");
    cy.get("#root_nickname").type(
      `Tester ${Math.floor(1000 + Math.random() * 9000)}`
    );
    cy.get("#root_email").type("test@example.com");
    cy.get("#root_roleId").click();
    cy.get('[role="listbox"] [role="option"]').first().click();
    cy.contains("button", "Save").click();
    cy.contains("Server error occurred").should("be.visible");
  });

  it("changes user role successfully", () => {
    cy.get("table tbody tr")
      .first()
      .find('[data-testid="edit-button"]')
      .click();
    cy.get("#root_roleId").click();
    cy.get('[role="listbox"] [role="option"]').last().click();
    cy.contains("button", "Save").click();
    cy.contains("User role successfully updated.").should("be.visible");
  });

  it("handles role deletion error", () => {
    cy.intercept("DELETE", "/role-assignment/user/*", {
      statusCode: 500,
    }).as("deleteRoleError");

    cy.get("table tbody tr")
      .first()
      .find('[data-testid="edit-button"]')
      .click();
    cy.get("#root_roleId").click();
    cy.get('[role="listbox"] [role="option"]').last().click();
    cy.contains("button", "Save").click();
    cy.contains("An error happened while deleting the user role").should(
      "be.visible"
    );
  });

  it("handles role assignment error", () => {
    cy.intercept("DELETE", "/role-assignment/user/*", { statusCode: 200 });
    cy.intercept("POST", "/role-assignment/user", {
      statusCode: 500,
    }).as("assignRoleError");

    cy.get("table tbody tr")
      .first()
      .find('[data-testid="edit-button"]')
      .click();
    cy.get("#root_roleId").click();
    cy.get('[role="listbox"] [role="option"]').last().click();
    cy.contains("button", "Save").click();
    cy.contains("An error happened while assigning the new role").should(
      "be.visible"
    );
  });

  it("deactivates active user", () => {
    cy.get("table tbody tr")
      .contains("Active")
      .parents("tr")
      .find('[data-testid="edit-button"]')
      .click();

    cy.contains("button", "Deactivate").click();
    cy.get("div[role='dialog']").within(() => {
      cy.contains("Are you sure you want to deactivate this user?").should(
        "be.visible"
      );
      cy.contains("This action will suspend the user account.").should(
        "be.visible"
      );
      cy.contains("button", "Confirm").click();
    });
    cy.contains("User account successfully deactivated.").should("be.visible");
  });

  it("activates inactive user", () => {
    cy.get("table tbody tr")
      .contains("Inactive")
      .parents("tr")
      .find('[data-testid="edit-button"]')
      .click();

    cy.contains("button", "Activate").click();
    cy.get("div[role='dialog']").within(() => {
      cy.contains("Are you sure you want to activate this user?").should(
        "be.visible"
      );
      cy.contains("This action will restore the user account.").should(
        "be.visible"
      );
      cy.contains("button", "Confirm").click();
    });
    cy.contains("User account successfully activated.").should("be.visible");
  });

  it("handles status change error", () => {
    cy.intercept("PATCH", "/user/*", {
      statusCode: 500,
    }).as("statusChangeError");

    cy.get("table tbody tr")
      .contains("Active")
      .parents("tr")
      .find('[data-testid="edit-button"]')
      .click();

    cy.contains("button", "Deactivate").click();
    cy.get("div[role='dialog']").contains("button", "Confirm").click();
    cy.contains("An error happened while deactivating the user").should(
      "be.visible"
    );
  });

  it("disables email and fullName fields in edit mode", () => {
    cy.get("table tbody tr")
      .first()
      .find('[data-testid="edit-button"]')
      .click();
    cy.get("#root_fullName").should("be.disabled");
    cy.get("#root_email").should("be.disabled");
  });
});
