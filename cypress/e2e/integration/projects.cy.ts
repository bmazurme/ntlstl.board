describe('projects', () => {
  it('should be available on localhost:3000/projects', () => {
    cy.visit('http://localhost:3000/projects');
    cy.contains('Add project');
  });
});
