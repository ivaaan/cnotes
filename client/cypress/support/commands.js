// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('loginSession', (email, password) => {
    cy.session([email, password], () => {
        cy.visit('http://localhost:3000');
      cy.get('[data-testid="loginbuttontest"]').click();
      cy.origin(
        "https://dev-x5rau7o7dqkll2cr.us.auth0.com/",
        { args: [email, password]},
         ([email, password]) => {
      cy.get('#username').type(email);
      cy.get('#password').type(`${password}{enter}`);
    })
})
})