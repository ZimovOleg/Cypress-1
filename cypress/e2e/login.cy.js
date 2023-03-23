it("Should successfully login", () => {
  cy.visit("/booksNode");
  cy.login("test@test.com", "test");
  cy.contains("Добро пожаловать test@test.com").should("be.visible");
});

it("Should not login with empty login", () => {
  cy.visit("/booksNode");
  cy.login("", "test");
  cy.get("#mail")
    .then(($el) => $el[0].checkValidity())
    .should("be.false");
  cy.get("#mail")
    .then(($el) => $el[0].validationMessage)
    .should("contain", "Заполните это поле");
});

it("Should not login with empty password", () => {
  cy.visit("/booksNode");
  cy.login("test@test.com", "");
  cy.get("#pass")
    .then(($el) => $el[0].checkValidity())
    .should("be.false");
  cy.get("#pass")
    .then(($el) => $el[0].validationMessage)
    .should("contain", "Заполните это поле");
});

it("Should Add a book", () => {
  cy.visit("/booksNode");
  cy.login("test@test.com", "test");
  cy.contains("Books list").click();
  cy.addBook("Title1", "Description1", "Author1");
  cy.contains("Title1").should("be.visible");
});

it("Should Add to favorite", () => {
  cy.visit("/booksNode");
  cy.login("test@test.com", "test");
  cy.contains("Books list").click();
  cy.addFavoriteBook("Title2", "Description2", "Author2");
  cy.contains("h4", "Favorites").click();
  cy.contains("Title2").should("be.visible");
});

it("Shouldn't Add a favorite book to another user", () => {
  cy.visit("/booksNode");
  cy.login("test@test.com", "test");
  cy.contains("Books list").click();
  cy.addFavoriteBook("Title3", "Description3", "Author3");
  cy.contains("button", "Log out").click();
  cy.login("bropet@mail.ru", "123");
  cy.contains("button", "Delete from favorite").should("not.be.visible");
});