/* global beforeEach, cy, describe, it */

const tasks = [
    {
        id: "task-1",
        title: "Prepare quarterly report",
        description: "Compile the quarterly results.",
        status: "in_progress",
        priority: "high",
        department: "Finance",
        dueDate: "2026-10-30",
        assignee: { name: "George Smith", email: "george@example.com" },
    },
    {
        id: "task-2",
        title: "Review onboarding flow",
        description: "Review the new employee onboarding flow.",
        status: "pending",
        priority: "medium",
        department: "People",
        dueDate: "2026-11-05",
        assignee: { name: "Carol Bloggs", email: "carol@example.com" },
    },
];

const taskDetails = {
    ...tasks[0],
    createdAt: { _seconds: 1760000000 },
    updatedAt: { _seconds: 1760000000 },
};

describe("Tasks", () => {
    beforeEach(() => {
        cy.intercept("GET", "**/api/tasks", { body: { data: tasks } }).as("getTasks");
        cy.visit("/tasks");
        cy.wait("@getTasks");
    });

    it("loads and displays task cards", () => {
        cy.contains("Prepare quarterly report").should("be.visible");
        cy.contains("Review onboarding flow").should("be.visible");
        cy.contains("In Progress").should("be.visible");
        cy.contains("High").should("be.visible");
    });

    it("searches tasks", () => {
        cy.intercept("GET", "**/api/tasks/search?q=quarterly", {
            body: { data: [tasks[0]] },
        }).as("searchTasks");

        cy.get('input[placeholder="Search Anything"]').type("quarterly");
        cy.get('button[aria-label="Search"]').click();
        cy.wait("@searchTasks");

        cy.contains("Prepare quarterly report").should("be.visible");
        cy.contains("Review onboarding flow").should("not.exist");
    });

    it("opens the create task form and creates a task", () => {
        cy.contains("button", "Create Task").click();
        cy.location("pathname").should("eq", "/tasksDetails");
        cy.contains("Create task").should("be.visible");

        cy.intercept("POST", "**/api/tasks", {
            statusCode: 201,
            body: { success: true, data: { ...tasks[0], id: "task-3" } },
        }).as("createTask");

        cy.get("#title").type("Prepare quarterly report");
        cy.get("#description").type("Compile the quarterly results.");
        cy.get("#department").type("Finance");
        cy.contains("button", "Create task").click();
        cy.wait("@createTask").its("request.body").should("include", {
            title: "Prepare quarterly report",
            department: "Finance",
        });
        cy.location("pathname").should("eq", "/tasksDetails/task-3");
        cy.contains("Task created successfully.").should("be.visible");
    });

    it("loads an existing task and saves an edit", () => {
        cy.intercept("GET", "**/api/tasks/task-1", {
            body: { data: taskDetails },
        }).as("getTaskDetails");
        cy.intercept("PATCH", "**/api/tasks/task-1", {
            body: { success: true },
        }).as("updateTask");

        cy.visit("/tasksDetails/task-1");
        cy.wait("@getTaskDetails");
        cy.get("#title").clear().type("Prepare the quarterly report");
        cy.contains("button", "Save changes").click();
        cy.wait("@updateTask").its("request.body").should("include", {
            title: "Prepare the quarterly report",
        });
        cy.contains("Task updated successfully.").should("be.visible");
    });
});
