describe('Test Sign Up and Login of user' , {scrollBehavior: false}, () => {
  afterEach(() => cy.pause())

  it('Successful signup', () => {
    cy.clearLocalStorage()
    cy.window().then((win) => {
      win.sessionStorage.clear()
    })
    cy.visit(Cypress.env('client_url'))
    cy.pause()
    cy.get('[href="/signup"]').click()
    cy.url().should('include', '/signup')
    cy.request('DELETE', `${Cypress.env('api_url')}/users/deleteTestUser`)
    cy.signup({
      username: 'carlos',
      name: 'carlos',
      lastname: 'honorio',
      email: 'carlos@example.com',
      password: 'carloshonorio',
      passwordConfirmation: 'carloshonorio',
    })
  })
  
  it('Successful login', () => {
    cy.visit(`${Cypress.env('client_url')}/login`)
    cy.url().should('include', '/login')
    cy.login({
      username: 'carlos',
      password: 'carloshonorio',
    })
    
  })

  it('User goes to profile and change the profile pic', () => {
    cy.get('[href="/profile"]').click()
    cy.url().should('include', '/profile')
    cy.pause()
    cy.contains("Edit").click()
    cy.pause()
    cy.get('[name="lastname"]').type(' briones')
    cy.pause()
    cy.scrollTo('bottom')
    cy.contains('Save Changes').click()
    cy.pause()
    cy.contains('Go back').click()

  })



  it('Successful logout', () => {
    cy.contains("Logout").click()
  })
})
