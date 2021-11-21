describe ('Test Daily Goal Selection', () => {

    it ('launches', () => {
        cy.visit ('/');
    });

    it ('initially loads 2 daily questions', () => {
        cy.visit ('/');
        cy.get('[data-cy=select-daily-goal]').should('contain', '2');
        cy.get('[data-cy=daily-problems]').children().should('have.length', 2);
    });

    it('loads 3 daily questions after "3" is selected', () => {
        cy.visit ('/');
        cy.get('[data-cy=select-daily-goal]').select('3')
        cy.get('[data-cy=daily-problems]').children().should('have.length', 3);
    });
});