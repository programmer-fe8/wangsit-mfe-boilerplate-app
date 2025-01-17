describe.only('Asset Table Test', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/v2/assets*', { fixture: 'assets.json' }).as(
      'getAssets',
    );
    cy.visit('/assets');
  });

  it('should display correct data from API in the table', () => {
    cy.wait('@getAssets');
  });

  it('should visit detail asset page when click detail action in datatable', () => {
    cy.wait('@getAssets');
    cy.getSection('singleactionwrapper').eq(3).click();
    cy.get('#single-action-menu_list').within(() => {
      cy.contains('Detail').click();
    });
  });

  it('edit form should be visible when click edit action in datatable', () => {
    cy.wait('@getAssets');
    cy.getSection('singleactionwrapper').eq(3).click();
    cy.get('#single-action-menu_list').within(() => {
      cy.contains('Edit').click();
    });
    cy.getSection('dialog-form').should('be.visible');
  });
});

describe('Asset Form Create Test', () => {
  beforeEach(() => {
    cy.visit('/assets');

    cy.contains('+ Register').click();
    cy.getSection('dialog-form').should('be.visible');
  });

  it('form should not be submitted if the required fields are not filled.', () => {
    cy.get('Button').contains('Simpan').click();
    cy.getSection('dialog-form').should('be.visible');
  });

  it('should be able to fill the form', () => {
    cy.getSection('dialog-form').within(() => {
      cy.get('[fieldname="group"]').click();
    });
    cy.get('[aria-label="Option List"]')
      .filter(':visible')
      .within(() => {
        cy.contains('Room 402').click();
      });
    //
    cy.getSection('dialog-form').within(() => {
      cy.get('[fieldname="category"]').click();
    });
    cy.get('[aria-label="Option List"]')
      .filter(':visible')
      .within(() => {
        cy.contains('Elektronik').click();
      });
    //
    cy.getSection('dialog-form').within(() => {
      cy.get('[fieldname="name"]').click();
    });
    cy.get('[aria-label="Option List"]')
      .filter(':visible')
      .within(() => {
        cy.contains('MacBook Pro').click();
      });
    //
    cy.getSection('dialog-form').within(() => {
      cy.get('#alias-name-input-text').type('Hello World');
    });
    //
    cy.getSection('dialog-form').within(() => {
      cy.get('[fieldname="brand"]').click();
    });
    cy.get('[aria-label="Option List"]')
      .filter(':visible')
      .within(() => {
        cy.contains('Apple').click();
      });
    //
    cy.getSection('dialog-form').within(() => {
      cy.get('[fieldname="model"]').click();
    });
    cy.get('[aria-label="Option List"]')
      .filter(':visible')
      .within(() => {
        cy.contains('Asus').click();
      });
  });
});
