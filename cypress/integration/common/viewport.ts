import { Given } from 'cypress-cucumber-preprocessor/steps'

Given('I am using a desktop', () => {
  cy.viewport(1920, 1080)
})
