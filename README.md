# PhotoGram = Cypress + Typescript + Cucumber

Well, as the title suggest, this project have been made to allow us to test another aproaches when buildind tests. This time, we aim to build more reliable, easy-to-understand and reusable tests. Cypress is a test framework that we can use with React, Angular, Vue and another front-end libraries/frameworks, and give us many tools and method for building tests. Cucumber is a tool that allow us to write BDD tests in a human-readable way and reuse in as many places we need. TypeScript give us more reliability on writing tests.

## The application

PhotoGram is basically a photo searcher, and its based on the Pexels API. The photos are shown to you considering the current search, number of colums to be displayed and if wide photos should be shown with a dynamic width.

![photogram](https://i.imgur.com/ShnhaG6.png)

### Running the application

1. Firstly, get an API Key from Pexels (more details [here](https://www.pexels.com/api/documentation/))
2. Create a file named `.env`, at the project root
3. At the `.env` file, you must create a new environment variable called `API_KEY` with its value being your API Key

```
API_KEY=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

4. Install all dependencies

```
yarn
```

5. Run the application

```
yarn start
```

6. Visit http://localhost:3000

## The tests

As described above, the tests were built using Cypress, Cucumber and TypeScript.

### Why Cypress?

Cypress is a test framework, where we can develop BDD tests to any front-end library or framework. This allow us to:

- Run tests simulating many browsers, like Google Chrome or Firefix;
- Use different plugins;
- Use many method to view and control how the DOM should look and behave;
- Integrate our E2E tests with CI solutions;
- Write tests for different front-ends in a single language;
- Control the time;
- Get screenshots and videos for failing tests;
- Test the level of accessibility of our app (with this [plugin](https://github.com/avanslaars/cypress-axe));
- Write unit tests (with this [plugin](https://github.com/bahmutov/cypress-react-unit-test));
- Get the test coverage.

### Why Cucumber?

Cucumber syntax aims to be easy to understand, soo our tests will be more human-readable. Besides that, Cucumber also allow us to reuse a lot of code because of the `steps` approach.

### Why TypeScript?

TypeScript give us more reliability on writing the Cucumber `steps`, as well as when writing some custom commands on Cypress.

### The structure

All files, including the tests, are divided into different folders under the `/cypress` folder. The `/fixtures` folder can be used to store the mocked data or another constants used by the tests. The `/integration` folder must be used to wrap all the tests. The `/plugins` is there to wrap all the plugins that will be used, and the folder `/support` can be used to wrapp all the custom commands of our tests.

### Running the tests

With all the dependencies installed, simply run:

```
yarn cypress:open
```

## Good times, bad times

There was some problems integrating the cypress with the TypeScript and Cucumber plugins, but once it was done, writing tests became quiet easy. The Cucumber syntax aims to be easy to understand, and all we need to do is build the steps based on what we want to test, besides reading the docs to find out how we do it with the Cypress methods.

For example: I wanted to test the scroll position, so I made a step to change the scroll, and other step to verify the scroll behavior:

```ts
// cypress/integration/common/scroll.ts
import { When, Then } from 'cypress-cucumber-preprocessor/steps'

When('I scroll to the top of the page', () => {
  cy.scrollTo('top')
})

Then('The scroll position should be at the top', () => {
  cy.get('body').its('scrollTop').should('be', 0)
})
```

And, in our Cucumber file, we are able to use these steps:

```gherkin
# cypress/integration/Scroll.feature
Feature: Scroll

  I want to test the behavior of the scroll

  Scenario: Verifying the scroll
    When I scroll to the top of the page
    Then The scroll position should be at the top
```

So, there are some advantages:

- Tests became reusable, when putting in under the `/common` scope;
- Cypress allow us to create custom commands and abstract the most-used features, like `login`, for example;
- Tests written with Cucumber can be easier for developers and non-developers to understand;
- BDD tests give us more accurate metrics and more reliability on how the application behave in the real world;
- Writing the steps with give us more reliability as well, sice the TS compiler check for type errors on these steps;
- Cypress supports a lot of plugins, including one to verify how accessible is our app.

Well, as I mentioned before, configuring the plugins can be fairly difficult, and there are some trade-offs:

- E2E tests are expensive in terms of time and resources
- Virtual-DOM based applications can have a different behavior when running in the visual mode and the terminal mode

## References

- [Cypress](https://www.cypress.io/)
- [Cypress API](https://docs.cypress.io/api/api/table-of-contents.html)
- [Cypress plugins](https://docs.cypress.io/plugins/)
- [Cucumber](https://cucumber.io/)
- [Cucumber plugin for cypress](https://github.com/TheBrainFamily/cypress-cucumber-preprocessor)
- [TypeScript](https://www.typescriptlang.org/)
- [Cypress with TypeScript](https://docs.cypress.io/guides/tooling/typescript-support.html#Install-TypeScript)
- [Pexels API](https://www.pexels.com/api/?locale=en-US)
- [Material-UI](https://material-ui.com/)
- [Prettier](https://prettier.io/)
- [Webpack](https://webpack.js.org/)

## Licence

[Apache-2.0](https://github.com/williamrozin/elm-todo/blob/master/LICENSE)

---

Made with :heart: by William Rozin Gaspar
