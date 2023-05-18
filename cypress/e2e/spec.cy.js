describe('Cnotes', () => {
  before(() => {
    cy.visit('http://localhost:3000');
    cy.get('[data-testid="loginbuttontest"]').click();
    cy.origin("https://dev-x5rau7o7dqkll2cr.us.auth0.com/", () => {
      cy.get('#username').type("cnotes@test.com");
      cy.get('#password').type("legacyCnotes!{enter}");
      // cy.contains('button', 'Accept').click();
    })
  });

  it('Renders info correctly to user', () => {
    cy.get('.druk').contains('👇🏻 Select a calendar event:');
    cy.get('.cal-container > :nth-child(1)').click();
    cy.get('.cal-container > :nth-child(2)').click();
    cy.get('.agenda-input').type("cypressTest{enter}");
    cy.get(':nth-child(1) > .checkbox-circle > .todo').click();
    // cy.get(':nth-child(1) > .checkbox-rect > .todo').click();
    cy.get('.postit-input').type('testStickyNotesCypress{enter}');
    cy.contains('Team members');
    const startPosition = { x: 50, y: 50 };
    const endPosition = { x: 100, y: 100 };
    cy.get('#svgDrawing')
    .trigger('mousedown', startPosition.x, startPosition.y, { button: 0 }) // Press left mouse button down
    .trigger('mousemove', endPosition.x, endPosition.y) // Move mouse to the end position
    .trigger('mouseup', { force: true }); // Release the mouse button
    cy.wait(1000);
    cy.get('.text-outside-boxes > .header-right-child').click();


  })
});
