/// <reference types="cypress" />

describe("Stories Page of App", () => {
    beforeEach(() => {
        // Cypress starts out with a blank slate for each test
        // so we must tell it to visit our website with the `cy.visit()` command.
        // Since we want to visit the same URL at the start of all our tests,
        // we include it in our beforeEach function so that it runs before each test
        cy.visit("http://localhost:5173/stories/1");
    });

    it("contains User stories", () => {
        //Check if the story container is visible
        cy.get(`#story-container`).should("exist");

        //Check if the progress bar is visible
        cy.get(`#story-container`)
            .find(`.progress-bar-container`)
            .should("exist");

        // Check if the Profile container is visible
        cy.get(`#story-container`).find(`.profile-container`).should("exist");

        //Check if the transparent element is visible for navigation
        cy.get(`#story-container`).find(`.story-navigation`).should("exist");

        //Check if the 1st story contains active class
        cy.get(`#story-container`)
            .find(`.progress-bar-container`)
            .first()
            .find(".active")
            .should("exist");

        // Simulate the click on the right side of the navigation container (transparent element)
        cy.get(`#story-container`)
            .find(`.story-navigation`)
            .find(".right-click")
            .click();

        // Check if the 2nd story contains the active class
        cy.get(`#story-container`)
            .find(`.progress-bar-container`)
            .last()
            .find(".active")
            .should("exist");

        // Simulate the click on the left side of the navigation container (transparent element)
        cy.get(`#story-container`)
            .find(`.story-navigation`)
            .find(".left-click")
            .click();

        // Check if the 1st story contains the active class
        cy.get(`#story-container`)
            .find(`.progress-bar-container`)
            .first()
            .find(".active")
            .should("exist");

        // Simulate the click on the left side of the navigation container (transparent element)
        cy.get(`#story-container`)
            .find(`.story-navigation`)
            .find(".left-click")
            .click();

        //Check if the url is changed to home page (default one)
        cy.url().should("eq", "http://localhost:5173/");
    });
});
