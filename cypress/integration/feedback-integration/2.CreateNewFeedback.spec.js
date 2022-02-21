describe('Test new feedback creation', { scrollBehavior: false }, () => {
  afterEach(() => cy.pause())

  it('Successful login of regular user', () => {
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

  it('Successful creation of new feedback in desktop view', () => {
    cy.get('.add-feedback').click()
    cy.createFeedback({
      title: 'Ability to follow others',
      details: 'Stay updated on comments and solutions other people post',
      tag: 'feature',
    })
    cy.get('button.add-feedback').click()
    cy.pause()
    cy.contains('Go back').click()
  })

  it('Successful creation of new feedback in tablet view', () => {
    cy.viewport('ipad-2')
    cy.get('.add-feedback').click()
    cy.createFeedback({
      title: 'Preview images not loading',
      details: 'Challenge preview images are missing when you apply a filter',
      tag: 'bug',
    })
    cy.get('button.add-feedback').click()
    cy.pause()
    cy.contains('Go back').click()
  })
  
  it('Successful creation of new feedback in mobile view', { scrollBehavior: 'center' }, () => {
    cy.viewport('iphone-7')
    cy.get('.add-feedback').click()
    cy.createFeedback({
      title: 'Add a dark theme option',
      details:
        'It would help people with light sensitivities and who prefer dark mode',
      tag: 'feature',
    })
    cy.get('button.add-feedback').click()
    cy.scrollTo(0, 0)
    cy.pause()
    cy.contains('Go back').click()
  })

  it('Successful logout', () => {
    cy.get(".authentication > p > a").click()
    .should(() => {
      expect(sessionStorage.getItem("user")).to.be.null
      expect(sessionStorage.getItem("token")).to.be.null
    });
  })
})
