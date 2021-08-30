/// <reference types="cypress"/>

describe("frame app test suite", () => {
  beforeEach(() => {
    cy.intercept(
      {
        method: "GET",
        url: "/orgs/Netflix/repos**",
        hostname: "api.github.com",
      },
      { fixture: "repo.json", delay: 1000 }
    ).as("getList");
    cy.intercept(
      {
        method: "GET",
        url: "/repos/Netflix/atlas/commits**",
        hostname: "api.github.com",
      },
      { fixture: "atlas-commits.json", delay: 1000 }
    ).as("getCommits");
  });

  it("test fetching api and loading state", () => {
    cy.visit("http://localhost:3000");
    // spinner should display at the first time
    cy.get(".ant-spin").should("exist");
    // Next page button should be disabled
    cy.contains("Next page").should("be.disabled");
    // Prev page should be hide
    cy.contains("Prev page").should("not.exist");

    cy.wait("@getList");

    cy.get(".ant-spin").should("not.exist");
    cy.contains("Next page").should("not.be.disabled");
    cy.contains("Prev page").should("not.exist");

    cy.contains("atlas").click();

    cy.get(".ant-spin").should("exist");
    cy.contains("Next commits page").should("be.disabled");
    cy.contains("Prev commits page").should("not.exist");

    cy.wait("@getCommits");

    cy.get(".ant-spin").should("not.exist");
    cy.contains("Next commits page").should("not.be.disabled");
    cy.contains("Prev commits page").should("not.exist");
  });
});
