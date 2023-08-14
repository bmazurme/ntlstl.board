describe('service is available', () => {
  it('should be available on localhost:3000/profile', () => {
    cy.visit('http://localhost:3000/profile');
    cy.contains('Profile');
    cy.contains('str-22@yandex.ru');
  });
});
