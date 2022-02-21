describe(
    'Test comment creation by authenticated users',
    { scrollBehavior: false },
    () => {
      afterEach(() => cy.pause())
  
      it('Successful login of user',{ scrollBehavior: 'center' }, () => {
        cy.viewport('iphone-7')
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
  
      it('User leaves comment on feedback',  { scrollBehavior: 'center' }, () => {
        cy.viewport('iphone-7')
        cy.contains('Add a dark theme option').click()
        cy.pause()
        cy.createComment({comment: 'Also, please allow styles to be applied based on system preferences. I would love to browse Make It Real in the evening after my device\'s dark mode turns on without the bright background it currently has.'})
        cy.pause()
        cy.contains('Post Comment').click()
        cy.pause()
      })

      it('User deletes comment on feedback',  { scrollBehavior: 'center' }, () => {
        cy.createComment({comment: 'Also, please allow styles to be applied based on system preferences. I '})
        cy.pause()
        cy.contains('Post Comment').click()
        cy.pause()
        cy.get('.comment-section > :nth-child(3) .delete-comment-btn').click()
        cy.pause()
        cy.contains('Go back').click()
      })
      
    }
  )