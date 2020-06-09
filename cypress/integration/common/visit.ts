import { Given } from 'cypress-cucumber-preprocessor/steps'

Given(`I am at {string}`, (path: string) => {
  cy.visit(path)
})
