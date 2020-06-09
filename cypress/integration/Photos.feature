Feature: Test the photos list

  I want to test the behavior of the search feature

  Background: Screen
    Given I am at '/'
    And I am using a desktop

  Scenario: Verifying the infinite scroll
    Then I should see 10 photos
    When I scroll to the bottom of the page
    Then I should see 20 photos
    When I type 'ocean' at the field 'search-input'
    Then The field 'search-input' should have the value 'ocean'
    And I should see 10 photos
    And The scroll position should be at the top

  Scenario: Verifying the layout columns behavior
    Then I should see 10 photos
    When I select the option 'One' at the dropdown 'columns-select'
    Then I should see 10 photos
    When I select the option 'Two' at the dropdown 'columns-select'
    Then I should see 10 photos
    When I scroll to the bottom of the page
    Then I should see 10 photos
    When I select the option 'Three' at the dropdown 'columns-select'
    Then I should see 20 photos

  Scenario: Verifying the layout dynamic behavior
    Then I should see 10 photos
    And The switch 'switch-layout' should be checked
    When I toggle the switch 'switch-layout'
    Then The switch 'switch-layout' should not be checked
    And I should see 10 photos
    When I scroll to the bottom of the page
    Then The scroll position should be at the top
    And I should see 20 photos
    When I toggle the switch 'switch-layout'
    Then The switch 'switch-layout' should be checked
