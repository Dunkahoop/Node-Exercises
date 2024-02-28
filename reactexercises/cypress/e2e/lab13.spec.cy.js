describe("Test Lab 13", () => {
  it("selects a user from an autocomplete component", () => {
    cy.visit("http://localhost:5173/");
    cy.get("#menubtn").click();
    cy.contains("a", "Lab 13").click();
    cy.wait(1000);
    cy.get("#users").click();
    cy.contains("Duncan Wade").click();
    cy.contains("You selected Duncan Wade. This user's email is dw@here.com")
  });
});
