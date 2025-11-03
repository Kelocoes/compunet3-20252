describe('Games Feed', () => {
    beforeEach(() => {
        cy.visit('/dashboard/games');
        cy.window().then((win: Window & { localStorage: Storage }) => {
            const TOKEN_KEY = 'token';
            if (!win.localStorage.getItem(TOKEN_KEY)) {
                const mockedToken = 'mocked-jwt-token';
                win.localStorage.setItem(TOKEN_KEY, mockedToken);
            }
        });
    });

    it('should display a list of games', () => {
        cy.get('#games-list').children().should('have.length.greaterThan', 1);
    })
});