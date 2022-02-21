
Cypress.Commands.add(
  'signup',
  ({ username, name, lastname, email, password, passwordRetyped }) => {
    cy.get('[data-test-id="username-signup-form"]')
      .type(username)
      .should('have.value', username)

    cy.get('[data-test-id="name-signup-form"]')
      .type(name)
      .should('have.value', name)

    cy.get('[data-test-id="lastname-signup-form"]')
      .type(lastname)
      .should('have.value', lastname)

    cy.get('[data-test-id="email-signup-form"]')
      .type(email)
      .should('have.value', email)

    cy.get('[data-test-id="password-signup-form"]')
      .type(password)
      .should('have.value', password)

    cy.get('[data-test-id="passwordRetyped-signup-form"]')
      .type(passwordRetyped)
      .should('have.value', passwordRetyped)

    cy.get('[id="signupButton-signup-form"]').click()
  }
)

Cypress.Commands.add(
  'login',
  ({ username,password }) => {
    cy.get('[data-test-id="username-login-form"]')
      .type(username)
      .should('have.value', username)
    cy.get('[data-test-id="password-login-form"]')
      .type(password)
      .should('have.value', password)

    cy.get('[id="loginButton-login-form"]').click()
  }
)

Cypress.Commands.add(
  'createFeedback',
  ({ title, tag, details }) => {
    cy.get('[data-test-id="title-feedback-form"]')
      .type(title)
      .should('have.value', title)
    cy.get('[data-test-id="tag-feedback-form"]')
      .select(tag)
      .should('have.value', tag)
    cy.get('[data-test-id="details-feedback-form"]')
      .type(details)
      .should('have.value', details)
    cy.get('[id="add-FeedbackButton-form"]').click()
  }
)

Cypress.Commands.add(
  'editFeedback',
  ({ status }) => {
    cy.get('[data-test-id="status-feedback-form"]')
      .select(status)
      .should('have.value', status)
  }
)

Cypress.Commands.add(
  'createComment',
  ({ comment }) => {
    cy.get('[data-test-id="comment-form"]')
      .type(comment)
      .should('have.value', comment)
  }
)
