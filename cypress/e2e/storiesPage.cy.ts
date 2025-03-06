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
        cy.get(`#story-container`).should("exist");

        cy.get(`#story-container`)
            .find(`.progress-bar-container`)
            .should("exist");

        cy.get(`#story-container`).find(`.profile-container`).should("exist");

        cy.get(`#story-container`).find(`.story-navigation`).should("exist");

        cy.get(`#story-container`)
            .find(`.story-navigation`)
            .find(".left-click")
            .should("exist");

        cy.get(`#story-container`)
            .find(`.story-navigation`)
            .find(".right-click")
            .should("exist");

        cy.get(`#story-container`)
            .find(`.progress-bar-container`)
            .first()
            .find(".active")
            .should("exist");

        cy.get(`#story-container`)
            .find(`.story-navigation`)
            .find(".right-click")
            .click();

        cy.get(`#story-container`)
            .find(`.progress-bar-container`)
            .last()
            .find(".active")
            .should("exist");

        cy.get(`#story-container`)
            .find(`.story-navigation`)
            .find(".left-click")
            .click();

        cy.get(`#story-container`)
            .find(`.progress-bar-container`)
            .first()
            .find(".active")
            .should("exist");

        cy.get(`#story-container`)
            .find(`.story-navigation`)
            .find(".left-click")
            .click();

        cy.url().should("eq", "http://localhost:5173/");
    });
});
