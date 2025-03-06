/// <reference types="cypress" />

describe("Home Page of App", () => {
    beforeEach(() => {
        // Cypress starts out with a blank slate for each test
        // so we must tell it to visit our website with the `cy.visit()` command.
        // Since we want to visit the same URL at the start of all our tests,
        // we include it in our beforeEach function so that it runs before each test
        cy.visit("http://localhost:5173/");
    });

    it("contains story list", () => {
        //Check if story list container is visible
        cy.get(`#story-list-container`).should("exist");

        //Check if story list container contains the user having stories
        cy.get(`#story-list-container`)
            .find(`[data-cy="story-card-container"]`)
            .should("exist");

        //Check if the Curret User Card contains create button to add new story
        cy.get(`#story-list-container`)
            .find(`[data-cy="story-card-container"]`)
            .first()
            .find("#create-story-btn")
            .should("exist");

        //Check if the last User Card does not contains create button to add new story
        cy.get(`#story-list-container`)
            .find(`[data-cy="story-card-container"]`)
            .last()
            .find("#create-story-btn")
            .should("not.exist");

        //Check if on clicking the current user story card changes the url and opens its posted stories.
        cy.get("#story-list-container")
            .find(`[data-cy="story-card-container"]`)
            .eq(0)
            .click(); // Simulate user clicking the story navigation

        cy.url().should("match", /http:\/\/localhost:5173\/stories\/\d+/);
    });
});
