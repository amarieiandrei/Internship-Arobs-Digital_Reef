/// <reference types="cypress" />

describe('Dashboard Page Automation Test Suite', () => {
    beforeEach('Open Application', () => {
        cy.openApplication()
    })

    it('Top Navbar Component', () => {
        cy.get('[alt="DigitalReef Logo"]').click()
        cy.url().should('eq', 'http://localhost:4200/home')
        cy.login()
        cy.get('[data-cy="home-btn"]').click()
        cy.url().should('eq', 'http://localhost:4200/home')
        cy.login()
        cy.get('[data-cy="top-navbar-dropdown"]').should('contain', 'test@login')
        cy.get('[data-cy="top-navbar-dropdown"]').click()
        cy.get('[data-cy="top-navbar-logout"]').click()
        cy.url().should('eq', 'http://localhost:4200/home')
        cy.login()
        cy.get('.rightside__help-btn')
            .should('have.css', 'display', 'flex')
        cy.get('.rightside__about-btn')
            .should('have.css', 'display', 'flex')
    })

    it('Grid Component', () => {
        cy.get('[data-cy="grid-header"]')
            .find('[data-cy="user-icon"]')
            .should('have.attr', 'size', 'xl')
            .should('have.css', 'margin-right', '10px')
        cy.get('[data-cy="grid-header"]')
            .find('[data-cy="dashboard-title"]')
            .should('contain', 'My Project List')

        // Email Server & Notifications Modal Automation Testing
        cy.get('[data-cy="grid-header"]')
            .contains('Email Server & Notifications').click()
        cy.get('[data-cy="modal-header"]')
            .find('h4')
            .should('contain', 'Email Server & Notifications')
        cy.get('[data-cy="modal-header"]')
            .find('.header__xmark').click()
        cy.get('[data-cy="grid-header"]')
            .contains('Email Server & Notifications').click()

        // Antet -> Save & Discard Changes
        // cy.get('.antet')

        // Email Server Configuration
        const hexToRgb = (hex: any) => {
            const rValue = parseInt(hex.substring(0, 2), 16);
            const gValue = parseInt(hex.substring(2, 4), 16);
            const bValue = parseInt(hex.substring(4), 16);
            return `rgb(${rValue}, ${gValue}, ${bValue})`;
        }
        cy.get('[data-cy="email-server-configuration-label"]')
            .should('contain', 'Email Server Configuration')
        cy.get('[placeholder="IP Address or Host Name"]')
            .should('have.value', 'localhost')
        cy.get('[placeholder="IP Address or Host Name"]')
            .clear().type('1.2.3.4')
        cy.get('[name="hostPort"]')
            .should('have.value', '25')
        cy.get('[name="hostPort"]')
            .clear()

        cy.get('[class="alert-danger--custom host-port"]')
            .should('contain', 'This field cannot be blank')
            .should('have.css', 'background-color', hexToRgb('f6ecec'))
            .should('have.css', 'color', 'rgb(190, 0, 0)')
            .find('[class="ng-fa-icon custom__xmark"]').click()
        cy.get('[name="hostPort"]').clear()
        cy.get('[data-cy="smtp-auth-checkbox"]')
            .should('be.disabled')
        cy.get('[name="hostPort"]').type('26')
        cy.get('[data-cy="smtp-auth-checkbox"]')
            .check({ force: true })
        cy.contains('Save').should('be.disabled')
        cy.get('[ng-reflect-name="userid"]').type('test')

        // Email Notifications
        cy.get('[ng-reflect-name="email"]')
            .type('email@test1.com')
            .blur()
        cy.get('[data-cy="modal-header"]')
            .find('.header__xmark').click()
    })
})