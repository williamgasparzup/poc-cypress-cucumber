Feature: Test the photos search

  I want to test the behavior of the search feature

  Background: Background name
    Given I am at '/'
    And I am using a desktop

  Scenario: Verifying search
    When I type 'ocean' at the field 'search-input'
    Then The field 'search-input' should have the value 'ocean'
    When I clear the field 'search-input'
    Then The field 'search-input' should be empty

