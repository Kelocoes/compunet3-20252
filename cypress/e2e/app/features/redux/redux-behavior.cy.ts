describe('Redux Feature', () => {
    beforeEach(() => {
        cy.visit('/dashboard/redux');
        cy.window().then((win: Window & { localStorage: Storage }) => {
            const TOKEN_KEY = 'token';
            if (!win.localStorage.getItem(TOKEN_KEY)) {
                const mockedToken = 'mocked-jwt-token';
                win.localStorage.setItem(TOKEN_KEY, mockedToken);
            }
        });
    });

    it('should display a list of components', () => {
        cy.get('#dashboard-layout button.btn-primary').click();
        cy.get('#dashboard-layout div:nth-child(3) div.card div.card-body p:nth-child(2)')
            .should('have.text', 'Estado actual: 1');
    })
});
