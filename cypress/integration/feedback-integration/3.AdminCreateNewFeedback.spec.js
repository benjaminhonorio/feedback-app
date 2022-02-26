describe(
  'Test new feedback creation by admin',
  { scrollBehavior: false },
  () => {
    afterEach(() => cy.pause())

    it('Successful login of admin', () => {
      cy.visit(`${Cypress.env('client_url')}/login`)
      cy.login({
        username: 'bencarhb',
        password: 'benjamin',
      })
    })

    it('Successful creation of new feedback', () => {
      cy.get('.add-feedback').click()
      cy.createFeedback({
        title: 'Q&A within the challenhe hubs',
        details: 'Challenge-specific Q&A would make for easy reference',
        tag: 'feature',
      })
      cy.contains('Go back').click()
    })
  }
)
