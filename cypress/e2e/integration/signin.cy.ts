describe('not-found', () => {
  it('should be available on localhost:3000/signin', () => {
    cy.visit('http://localhost:3000/signin');
    cy.contains('Войти');
    cy.contains('Нет аккаунта?');
    cy.contains('Забыли пароль?');
    cy.contains('Войти по');
  });
});
