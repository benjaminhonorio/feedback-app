describe('Test spam feedback creation and removal', { scrollBehavior: false }, () => {
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
      title: 'SPAM SPAM SPAM SPAM',
      details: 'spam spam spam spam spam spam spam spam spam spam spam spam spam spam spam spam spam spam spam',
      tag: 'ui',
    })
    cy.get('button.add-feedback').click()
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

  it('Successful login of admin user', () => {
    cy.clearLocalStorage()
    cy.window().then((win) => {
      win.sessionStorage.clear()
    })
    cy.visit(`${Cypress.env('client_url')}/login`)
    cy.login({
      username: 'bencarhb',
      password: 'benjamin',
    })
  })

  it('Admin deletes spam feedback', () => {
    cy.contains('SPAM SPAM SPAM SPAM').click()
    cy.pause()
    cy.get('.delete-feedback').click()
  })

})
