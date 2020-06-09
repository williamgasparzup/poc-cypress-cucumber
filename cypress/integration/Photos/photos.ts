import { Then } from 'cypress-cucumber-preprocessor/steps'

Then('I should see {int} photos', (amount: number) => {
  cy.get('img[id^="photo-"]').should('have.length', amount)
})
