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
  it('Successful logout', () => {
    cy.get(".authentication > p > a").click()
  })
})
