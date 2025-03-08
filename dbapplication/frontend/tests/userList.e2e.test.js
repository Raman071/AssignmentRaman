describe('User List Page', () => {
    it('should display user list', () => {
      cy.visit('http://localhost:5173'); // Make sure this URL matches your running frontend URL
      cy.contains('User List').should('exist'); // Ensure the 'User List' text exists
    });
  });
  