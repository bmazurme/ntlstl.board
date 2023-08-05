describe('not-found', () => {
  it('should be available on localhost:3000/xxx', () => {
    cy.visit('http://localhost:3000/xxx');
    cy.contains('404');
    cy.contains('Not found page');
    cy.contains('Go to main page');
  });
});
