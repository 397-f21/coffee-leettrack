describe ('Checkboxes', () => {

    it ('launches', () => {
      cy.visit ('/');
    });

    it ('you can click a category', () => {
        cy.get('[data-cy=BFS]').click();
    });

    it ('you can click on a box and comment stays', () => {
        cy.get('[data-cy=BFS]').click();
        cy.get('[data-cy=60]').click();
        cy.get('[data-cy=addNotes]').type('test5');
        cy.get('[data-cy=confirm]').click();
        cy.get('[data-cy=PatternTable]').should('contain', 'test5')
        cy.get('[data-cy=DFS]').click();
        cy.get('[data-cy=PatternTable]').should('contain', 'test5')
    });

    it ('clickling on checkbox opens modal', () => {
        cy.get('data-testid=checkbox').click();
        cy.get('data-cy=addTaskTitle').should('contain', 'Nice Work!');
    });
});