describe(
    'Test filtering feedback by tag',
    { scrollBehavior: false },
    () => {
      afterEach(() => cy.pause())
  
      it('Successful login of user',{ scrollBehavior: 'center' }, () => {
        cy.clearLocalStorage()
        cy.window().then((win) => {
          win.sessionStorage.clear()
        })
        cy.visit(`${Cypress.env('client_url')}/login`)
        cy.login({
          username: 'carlos',
          password: 'carloshonorio',
        })
      })
  
      it('User filters by tag',  { scrollBehavior: 'center' }, () => {
        cy.get('.tags.container > .tag').contains('Feature').click()
        cy.get('.tags.container > .tag').contains('Feature').should('have.class', 'active')
        cy.pause()
        cy.get('.tags.container > .tag').contains('Enhancement').click()
        cy.get('.tags.container > .tag').contains('Enhancement').should('have.class', 'active')
        cy.pause()
        cy.get('.tags.container > .tag').contains('Bug').click()
        cy.get('.tags.container > .tag').contains('Bug').should('have.class', 'active')
        cy.pause()
        cy.get('.tags.container > .tag').contains('UX').click()
        cy.get('.tags.container > .tag').contains('UX').should('have.class', 'active')
        cy.pause()
        cy.get('.tags.container > .tag').contains('UI').click()
        cy.get('.tags.container > .tag').contains('UI').should('have.class', 'active')
        cy.pause()
        cy.get('.tags.container > .tag').contains('All').click()
        cy.get('.tags.container > .tag').contains('All').should('have.class', 'active')
      })

    }
  )