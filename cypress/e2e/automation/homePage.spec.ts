/// <reference types="cypress" />

import { navigateTo } from "cypress/support/page_objects/navigationPage";

describe('Home Page Automation Test Suite', () => {
    beforeEach('Open Application', () => {
        cy.openApplication();
        navigateTo.homePage();
    })

    it('Header', () => {
        // Logo
        cy.get('[data-cy="digital-reef-logo"]')
            .should('have.css', 'height', '60px')

        // Title
        cy.get('[data-cy="header-title"]').should('contain', 'DIGITAL')
        cy.get('.title__thin').should('contain', 'REEF')

        const hexToRgb = (hex: any) => {
            const rValue = parseInt(hex.substring(0, 2), 16);
            const gValue = parseInt(hex.substring(2, 4), 16);
            const bValue = parseInt(hex.substring(4), 16);
            return `rgb(${rValue}, ${gValue}, ${bValue})`;
        }

        cy.get('[data-cy="header-title"]')
            .should('have.css', 'color', hexToRgb('999999'))
        cy.get('.title__thin')
            .should('have.css', 'font-weight', '100')

        // Text
        cy.get('[data-cy="header-text"]')
            .should('have.css', 'background-color', hexToRgb('f2f2f2'))
            .find('.text__welcome')
            .should('contain', 'Welcome')
            .should('have.css', 'font-family', 'Regular')
            .should('have.css', 'font-size', '42px')
            .should('have.css', 'color', hexToRgb('999999'))

        cy.get('[data-cy="header-text"]')
            .should('have.css', 'overflow-x', 'scroll')
            .find('.text__content')
            .should('contain', 'For assistance at any time, for any reason, please contact our technical services team at')
            .should('have.css', 'font-size', '12px')
            .find('.text__link')
            .should('contain', 'support@digitalreefinc.com')
            .should('have.css', 'color', hexToRgb('007cc0'))
    })

    it('Main', () => {
        const hexToRgb = (hex: any) => {
            const rValue = parseInt(hex.substring(0, 2), 16);
            const gValue = parseInt(hex.substring(2, 4), 16);
            const bValue = parseInt(hex.substring(4), 16);
            return `rgb(${rValue}, ${gValue}, ${bValue})`;
        }

        // The Container
        cy.get('.main')
            .should('have.css', 'background-size', 'cover')
            .should('have.css', 'background-repeat', 'no-repeat')

        // Form Automation
        cy.get('form').find('[type="submit"]').should('be.disabled')
        cy.get('form').find('[ng-reflect-name="uname"]').type('test')
        cy.get('form').find('[ng-reflect-name="psw"]').type('test')

        // Psw Icon
        cy.get('[data-cy="psw-icon"]').click()
        cy.get('form').find('[ng-reflect-name="psw"]')
            .should('have.attr', 'type', 'normal')
        cy.get('[data-cy="psw-icon"]').click()
        cy.get('form').find('[ng-reflect-name="psw"]')
            .should('have.attr', 'type', 'password')

        // Checkbox
        cy.get('[name="checkbox"]').check({ force: true })
        cy.get('form').find('[type="submit"]').should('be.enabled')

        // Danger Alert
        cy.get('form').find('[ng-reflect-name="uname"]').clear()
        cy.get('.alert-danger--custom')
            .should('have.css', 'background-color', hexToRgb('f6ecec'))
            .should('have.css', 'color', 'rgb(190, 0, 0)')
            .find('.custom__xmark').click()
        cy.get('form').find('[ng-reflect-name="uname"]').type('test')

        // Change Password
        cy.get('.checkbox__changepsw').click()

        // Automation Testing Change Password
        cy.get('.modal-header').should('contain', 'Change Password')
        cy.get('[data-cy="modal-exit"]').click()
        cy.get('.checkbox__changepsw').click()

        // Start with Change Password Form
        cy.get('[data-cy="change-password-form"]')
            .find('label').then(label => {
                cy.wrap(label).eq(0).should('contain', 'Username')
                cy.wrap(label).eq(1).should('contain', 'Current')
                cy.wrap(label).eq(2).should('contain', 'New')
            })
        cy.get('[data-cy="change-password-form"]')
            .find('[ng-reflect-name="uname"]').type('test-username')
        cy.get('[data-cy="change-password-form"]')
            .find('[ng-reflect-name="currPsw"]').type('Abcdef123!currentPsw')
        cy.get('[data-cy="change-password-form"]')
            .find('[ng-reflect-name="uname"]').should('be.disabled')
        cy.get('[data-cy="change-password-form"]')
            .find('[ng-reflect-name="new-psw"]').type('Abcdef123!newPsw')

        // New Password Validations
        cy.get('[data-cy="policy-rules"]')
            .find('.rule').then(rules => {
                cy.wrap(rules).eq(0).should('have.class', 'green')
                cy.wrap(rules).eq(1).should('have.class', 'green')
                cy.wrap(rules).eq(2).should('have.class', 'green')
                cy.wrap(rules).eq(3).should('have.class', 'green')
                cy.wrap(rules).eq(4).should('have.class', 'red')
            })
        cy.get('[data-cy="change-password-form"]')
            .find('[ng-reflect-name="new-psw"]').clear().type('Abcdef123!!newPsw')
        cy.get('[data-cy="policy-rules"]')
            .find('.rule').then(rules => {
                cy.wrap(rules).eq(0).should('have.class', 'green')
                cy.wrap(rules).eq(1).should('have.class', 'green')
                cy.wrap(rules).eq(2).should('have.class', 'green')
                cy.wrap(rules).eq(3).should('have.class', 'green')
                cy.wrap(rules).eq(4).should('have.class', 'green')
            })
        cy.get('[data-cy="modal-exit"]').click()

        // Submit
        cy.wait(500)
        cy.get('form').submit()
        cy.url().should('eq', 'http://localhost:4200/dashboard')
    })

    it('Footer', () => {
        const hexToRgb = (hex: any) => {
            const rValue = parseInt(hex.substring(0, 2), 16);
            const gValue = parseInt(hex.substring(2, 4), 16);
            const bValue = parseInt(hex.substring(4), 16);
            return `rgb(${rValue}, ${gValue}, ${bValue})`;
        }

        cy.get('[data-cy="footer"]')
            .should('have.css', 'background-color', hexToRgb('000000'))

        cy.get('[data-cy="footer"]').find('.footer__text').invoke('text').then(text => {
            expect(text).is.equal(' Copyright © 2007-2018. Digital Reef, Inc. All Rights Reserved  Portions of this program suite are licensed under United States Patent No. 6,918,082.  R5.0.0.0 ')
        });

        cy.get('[data-cy="footer"]')
            .find('.footer__btn')
            .should('contain', 'Install DR Server CA Certificate ...')
    })
})