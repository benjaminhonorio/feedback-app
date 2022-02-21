describe(
    'Test public user navigation',
    { scrollBehavior: false },
    () => {
      afterEach(() => cy.pause())
  
      it('Public user goes to roadmap view', () => {
        cy.visit(Cypress.env('client_url'))
        cy.pause()
        cy.get('[href="/roadmap"]').click()
        cy.pause()
        cy.contains('Add a dark theme option').click()
        cy.pause()
        cy.contains('Go back').click()
      })

      it('Public user wants to add feedback but it\'s not allowed', () => {
        cy.contains('+ Add Feedback').click()
        cy.pause()
        cy.contains('Go back').click()
      })

    }
  )