import { Then, When } from 'cypress-cucumber-preprocessor/steps'

// When
When('I type {string} at the field {string}', (text: string, name: string) => {
  cy.get(`input[name="${name}"]`).type(text)
})

When('I clear the field {string}', (name: string) => {
  cy.get(`input[name="${name}"]`).clear()
})

When(
  'I select the option {string} at the dropdown {string}',
  (option: string, id: string) => {
    cy.get(`#${id}`)
      .click({ force: true })
      .then(() =>
        cy.get(`#${id}-menu`).get('ul').contains(option).click({ force: true })
      )
  }
)

When('I toggle the switch {string}', (name: string) => {
  cy.get(`input[name="${name}"]`).click()
})

// Then
Then(
  `The field {string} should have the value {string}`,
  (name: string, text: string) => {
    cy.get(`input[name="${name}"]`).should('contain.value', text)
  }
)

Then(`The field {string} should be empty`, (name: string) => {
  cy.get(`input[name="${name}"]`).should('contain.value', '')
})

When('The switch {string} should be checked', (name: string) => {
  cy.get(`input[name="${name}"]`).should('be.checked')
})

When('The switch {string} should not be checked', (name: string) => {
  cy.get(`input[name="${name}"]`).should('not.be.checked')
})
