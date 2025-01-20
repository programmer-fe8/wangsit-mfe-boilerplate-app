describe('AssetTable Test', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/v2/assets*', { fixture: 'assets.json' }).as(
      'getAssets',
    );
    cy.visit('/assets');
  });

  it('should display correct data from API in the table', () => {
    cy.wait('@getAssets');
  });

  it('should display detail and edit options in the datatable', () => {
    cy.wait('@getAssets');
    cy.getSection('singleactionwrapper').eq(3).click();
    cy.get('#single-action-menu').contains('Detail').should('be.visible');
    cy.get('#single-action-menu').contains('Edit').should('be.visible');
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

describe('AssetForm Test', () => {
  beforeEach(() => {
    cy.visit('/assets');

    cy.contains('+ Register').click();
  });

  it('should be able to open the form', () => {
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

  it('form should not be submitted if the required fields are not filled and show validator message.', () => {
    cy.get('Button').contains('Create').click();
    cy.getSection('dialog-form').should('be.visible');
    cy.getByName('validatormessage').should('be.visible');
  });

  it('validator message should appear if the text input in the form contains more than 30 characters.', () => {
    cy.getSection('dialog-form').within(() => {
      cy.get('#alias-name-input-text').type(
        'In Attack on Titan, humanity fights for survival behind massive walls, defending themselves against the relentless onslaught of terrifying Titans.',
      );
    });
    cy.getByName('validatormessage').should('be.visible');
  });

  it('should reset all dropdown values', () => {
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

    cy.getSection('dialog-form').within(() => {
      cy.contains('button', 'Clear Field').click();
    });

    // Verify all dropdown value is clear
    cy.getSection('dialog-form').within(() => {
      cy.get('[fieldname="group"]').should('contain', 'Select group');
      cy.get('[fieldname="category"]').should('contain', 'Select category');
      cy.get('[fieldname="name"]').should('contain', 'Select assets name');
      cy.get('[fieldname="brand"]').should('contain', 'Select brand');
      cy.get('[fieldname="model"]').should('contain', 'Select model/type');

      cy.get('#alias-name-input-text').should('have.value', '');
    });
  });

  it('should stay on dialog and retain only group value when submitting with stay checkbox checked', () => {
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

    cy.contains('label', 'Stay on this after submiting')
      .find('input[type="checkbox"]')
      .check();

    cy.get('Button').contains('Create').click();
    cy.getSection('dialog-form').should('be.visible');
    cy.get('[fieldname="group"]').should('contain', 'Room 402');
  });

  it('should display a validation message if the uploaded image exceeds the size limit.', () => {
    cy.get('input[type="file"]').selectFile(
      'cypress/fixtures/images/testcyimgvm.png',
      { force: true },
    );
    cy.getByName('validatormessage').should('be.visible');
  });

  it('dialog should close when clicking the cancel button', () => {
    cy.get('Button').contains('Cancel').click();
    cy.getSection('dialog-form').should('not.exist');
  });
});
