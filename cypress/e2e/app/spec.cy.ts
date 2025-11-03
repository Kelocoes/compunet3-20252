describe('Apps Spec', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('should work', () => {
        expect(true).to.equal(true)
        // expect(true).to.equal(false)
    });

    it('should input info and submit', function () {
        cy.get('[name="email"]').click();
        cy.get('[name="email"]').type(`${crypto.randomUUID()}@gmail.com`);
        cy.get('[name="password"]').click();
        cy.get('[name="password"]').type('1234');
        cy.get('#sign-in-container button.flex').click();
    });

    it('should input info and submit, mocked info', function () {
        cy.intercept('POST', '/api/auth', {
            statusCode: 200,
            body: {
                message: "Usuario creado",
                token: "token_de_ejemplo"
            }
        }).as('loginRequest');

        cy.get('[name="email"]').click();
        cy.get('[name="email"]').type(`${crypto.randomUUID()}@gmail.com`);
        cy.get('[name="password"]').click();
        cy.get('[name="password"]').type('1234');
        cy.get('#sign-in-container button.flex').click();

        cy.wait('@loginRequest')
        cy.url().should('include', '/dashboard');
        cy.window().then((window) => {
            expect(window.localStorage.getItem('token')).to.equal('token_de_ejemplo');
        });
    });

    it('should navigate to forgot password page', function () {
        cy.get('a[href="/forgot-password"]').click();
        cy.url().should('include', '/forgot-password');
    });

});

