import { When, Then } from 'cypress-cucumber-preprocessor/steps'

When('I scroll to the bottom of the page', () => {
  cy.scrollTo('bottom')
})

Then('The scroll position should be at the top', () => {
  cy.get('body').its('scrollTop').should('be', 0)
})
