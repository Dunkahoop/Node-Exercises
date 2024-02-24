describe("Test Lab 12 Sentence Builder", () => {
  it("builds a sentence using autocomplete", () => {
    cy.visit("http://localhost:5173/");
    const words = [
      "The",
      "Quick",
      "Brown",
      "Fox",
      "Jumps",
      "Over",
      "My",
      "Lazy",
      "Dog",
    ];

    words.forEach((word) => {
      cy.get("#words").click(); // open the dropdown menu
      cy.contains(word).click(); // select a word
    });

    cy.get("[data-testid=sentence]").should(
      "have.text",
      "Your Sentence: The Quick Brown Fox Jumps Over My Lazy Dog"
    );
  });
});
