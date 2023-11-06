
export class NavigationPage {
    homePage() {
        cy.visit('/home');
    }
}

export const navigateTo = new NavigationPage();