describe(
  'Test admin set status of feedback',
  { scrollBehavior: false },
  () => {
    afterEach(() => cy.pause())

    it('Successful login of admin',{ scrollBehavior: 'center' }, () => {
      cy.clearLocalStorage()
      cy.window().then((win) => {
        win.sessionStorage.clear()
      })
      cy.viewport('iphone-7')
      cy.visit(`${Cypress.env('client_url')}/login`)
      cy.login({
        username: 'bencarhb',
        password: 'benjamin',
      })
    })

    it('Admin likes feedback and upvotes', () => {
      cy.get('.list-feedback-section > div:nth-child(2) > div:nth-child(1) > button').click()
    })

    it('Admin likes feedback and updates status to planned',  { scrollBehavior: 'center' }, () => {
      cy.viewport('iphone-7')
      cy.contains('Add a dark theme option').click()
      cy.pause()
      cy.contains('Edit Feedback').click()
      cy.pause()
      cy.editFeedback({
        status: 'planned'
      })
      cy.pause()
      cy.get('[id="add-FeedbackButton-form"]').click()
      cy.contains('Go back').click()

      cy.pause()
      cy.viewport('ipad-2')
      cy.contains('Q&A within the challenhe hubs').click()
      cy.pause()
      cy.contains('Edit Feedback').click()
      cy.pause()
      cy.editFeedback({
        status: 'planned'
      })
      cy.pause()
      cy.get('[id="add-FeedbackButton-form"]').click()
      cy.contains('Go back').click()
      
    })
    it('Admin goes to roadmap view', () => {
      cy.get('[href="/roadmap"]').click()
      cy.pause()
      cy.viewport('ipad-2')
      cy.pause()
      cy.viewport('iphone-7')
      cy.pause()
      cy.contains('Go back').click()
    })
    it('Admin updates status of feedback to in-progress', () => {
      cy.contains('Ability to follow others').click()
      cy.pause()
      cy.contains('Edit Feedback').click()
      cy.pause()
      cy.editFeedback({
        status: 'in-progress'
      })
      cy.pause()
      cy.get('[id="add-FeedbackButton-form"]').click()
      cy.contains('Go back').click()
    })
    it('Admin updates status of feedback to live', () => {
      cy.contains('Preview images not loading').click()
      cy.pause()
      cy.contains('Edit Feedback').click()
      cy.pause()
      cy.editFeedback({
        status: 'live'
      })
      cy.pause()
      cy.get('[id="add-FeedbackButton-form"]').click()
      cy.contains('Go back').click()
    })
    it('Admin goes to roadmap view again', () => {
      cy.get('[href="/roadmap"]').click()
      cy.pause()
      cy.viewport('ipad-2')
      cy.pause()
      cy.viewport('iphone-7')
      cy.pause()
      cy.get('.roadmap-statuses > div:nth-child(2)').click()
      cy.pause()
      cy.get('.roadmap-statuses > div:nth-child(3)').click()
      cy.pause()
      cy.get('.roadmap-statuses > div:nth-child(1)').click()
      cy.pause()
      cy.contains('Go back').click()
    })
  }
)
