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
        cy.get(`#story-list-container`).should("exist");

        cy.get(`#story-list-container`)
            .find(`[data-cy="story-card-container"]`)
            .should("exist");

        cy.get(`#story-list-container`)
            .find(`[data-cy="story-card-container"]`)
            .first()
            .find("#create-story-btn")
            .should("exist");

        cy.get(`#story-list-container`)
            .find(`[data-cy="story-card-container"]`)
            .last()
            .find("#create-story-btn")
            .should("not.exist");

        cy.get("#story-list-container")
            .find(`[data-cy="story-card-container"]`)
            .eq(0)
            .click(); // Simulate user clicking the story navigation

        cy.url().should("match", /http:\/\/localhost:5173\/stories\/\d+/);
    });
});
