describe('CustomField', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/v2/settings/customfield*', {
      fixture: 'customfield.json',
    }).as('getCustomField');

    cy.intercept('POST', '**/v2/settings/customfield*', {
      statusCode: 200,
    }).as('createCustomField');

    cy.visit('/customfield');
    cy.wait('@getCustomField');
  });

  it('should display 2 tab menu ( global and specific)', () => {
    cy.contains('Global').should('be.visible');
    cy.contains('Specific').should('be.visible');
  });

  it('should contains search, filter, download, changelog, and create button', () => {
    cy.getSection('buttontrigger').should('be.visible');
    cy.getByName('buttonfilter').should('be.visible');
    cy.getSection('changelog-button').should('be.visible');
    cy.contains('+ Custom Field').should('be.visible');
  });

  it('should be able to open the form', () => {
    cy.contains('+ Custom Field').click();
    cy.getSection('dialog-form').should('be.visible');
  });

  it('should display field value if selected data is dropdown / multidropdown', () => {
    cy.contains('+ Custom Field').click();
    cy.getSection('dialog-form').within(() => {
      cy.get('[fieldname="dataType"]').click();
    });
    cy.get('[aria-label="Option List"]')
      .filter(':visible')
      .within(() => {
        cy.contains('Dropdown').click();
      });
    cy.getSection('dialog-form').within(() => {
      cy.getByName('inputbadge').should('be.visible');
    });
    //
    cy.getSection('dialog-form').within(() => {
      cy.get('[fieldname="dataType"]').click();
    });
    cy.get('[aria-label="Option List"]')
      .filter(':visible')
      .within(() => {
        cy.contains('Multi Dropdown').click();
      });
    cy.getSection('dialog-form').within(() => {
      cy.getByName('inputbadge').should('be.visible');
    });
  });

  it('should show validator message in fieldname input if characters more than 30', () => {
    cy.contains('+ Custom Field').click();
    cy.getSection('dialog-form').within(() => {
      cy.get('[placeholder="Enter field name"]').type(
        'testsssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss',
      );
    });
    cy.contains('Max. 30 characters').should('be.visible');
  });

  it('should show validator message in every mandatory field if not filled', () => {
    cy.contains('+ Custom Field').click();
    cy.get('button').contains('Create').click();
    cy.getByName('validatormessage').should('be.visible');
  });

  it('should able to create custom field', () => {
    cy.contains('+ Custom Field').click();
    cy.getSection('dialog-form').within(() => {
      cy.get('[placeholder="Enter field name"]').type('Some field name');
    });
    cy.getSection('dialog-form').within(() => {
      cy.get('[fieldname="dataType"]').click();
    });
    cy.get('[aria-label="Option List"]')
      .filter(':visible')
      .within(() => {
        cy.contains('Text').click();
      });
    cy.getSection('dialog-form').within(() => {
      cy.getByName('buttonradio').contains('Yes').click();
      cy.getByName('buttonradio').contains('No').click();
    });
    cy.getSection('dialog-form').within(() => {
      cy.get('[fieldname="itemName"]').click();
    });
    cy.get('[aria-label="Option List"]')
      .filter(':visible')
      .within(() => {
        cy.contains('Laptop').click();
      });
    cy.getSection('dialog-form').click();
  });

  it('should show success toast if field created', () => {
    cy.contains('+ Custom Field').click();
    cy.getSection('dialog-form').within(() => {
      cy.get('[placeholder="Enter field name"]').type('Some field name');
    });
    cy.getSection('dialog-form').within(() => {
      cy.get('[fieldname="dataType"]').click();
    });
    cy.get('[aria-label="Option List"]')
      .filter(':visible')
      .within(() => {
        cy.contains('Text').click();
      });
    cy.getSection('dialog-form').within(() => {
      cy.getByName('buttonradio').contains('Yes').click();
      cy.getByName('buttonradio').contains('No').click();
    });
    cy.getSection('dialog-form').within(() => {
      cy.get('[fieldname="itemName"]').click();
    });
    cy.get('[aria-label="Option List"]')
      .filter(':visible')
      .within(() => {
        cy.contains('Laptop').click();
      });
    cy.getSection('dialog-form').click();
    cy.get('button').contains('Create').click();
    cy.wait('@createCustomField');
    cy.get('[data-pc-name="toast"]').should('be.visible');
  });

  it('should able to edit form', () => {
    cy.contains('Wsss').click();
    cy.getSection('singleactionwrapper').eq(3).click();
    cy.get('#single-action-menu_list').within(() => {
      cy.contains('Edit').click();
    });
    cy.getSection('dialog-form').within(() => {
      cy.get('[placeholder="Enter field name"]').clear();
      cy.get('[placeholder="Enter field name"]').type('Some field name');
    });
    cy.get('button').contains('Create').click();
    cy.get('[data-pc-name="toast"]').should('be.visible');
  });

  it('single action should contain edit and delete', () => {
    cy.getSection('singleactionwrapper').eq(3).click();
    cy.get('#single-action-menu_list').within(() => {
      cy.contains('Edit').should('be.visible');
      cy.contains('Delete').should('be.visible');
    });
  });

  it('bulk action shoult contain active, unactive, and delete', () => {
    cy.contains('Wsss').click();
    cy.getSection('bulkactiontoggle').click();
    cy.get('#bulkaction-overlay-menu').within(() => {
      cy.contains('Active').should('be.visible');
      cy.contains('Unactive').should('be.visible');
      cy.contains('Delete').should('be.visible');
    });
  });

  it('should show dialog confirm active, unactive, and delete', () => {
    // Active Dialog
    cy.contains('Wsss').click();
    cy.getSection('bulkactiontoggle').click();
    cy.get('#bulkaction-overlay-menu').within(() => {
      cy.contains('Active').click();
    });
    cy.getSection('dialogconfirm').should('be.visible');
    cy.get('button').contains('Batal').click();
    // Unactive Dialog
    cy.getSection('bulkactiontoggle').click();
    cy.get('#bulkaction-overlay-menu').within(() => {
      cy.contains('Unactive').click();
    });
    cy.getSection('dialogconfirm').should('be.visible');
    cy.get('button').contains('Batal').click();
    // Delete Dialog
    cy.getSection('bulkactiontoggle').click();
    cy.get('#bulkaction-overlay-menu').within(() => {
      cy.contains('Delete').click();
    });
    cy.getSection('dialogconfirm').should('be.visible');
    cy.get('button').contains('Batal').click();
    // By Toggle
    cy.getSection('bulkactiontoggle').click();
    cy.get('#bulkaction-overlay-menu').within(() => {
      cy.contains('Delete').click();
    });
    cy.getSection('dialogconfirm').should('be.visible');
    cy.get('button').contains('Batal').click();
    // By Single Action
    cy.getSection('singleactionwrapper').eq(3).click();
    cy.get('#single-action-menu_list').within(() => {
      cy.contains('Delete').click();
    });
    cy.getSection('dialogconfirm').should('be.visible');
    cy.get('button').contains('Batal').click();
  });

  it('should able to active, unactive, and delete field', () => {
    // Active Dialog
    cy.contains('Wsss').click();
    cy.getSection('bulkactiontoggle').click();
    cy.get('#bulkaction-overlay-menu').within(() => {
      cy.contains('Active').click();
    });
    cy.getSection('dialogconfirm').should('be.visible');
    cy.get('button').contains('Yakin').click();
    // Unactive Dialog
    cy.getSection('bulkactiontoggle').click();
    cy.get('#bulkaction-overlay-menu').within(() => {
      cy.contains('Unactive').click();
    });
    cy.getSection('dialogconfirm').should('be.visible');
    cy.get('button').contains('Yakin').click();
    // Delete Dialog
    cy.getSection('bulkactiontoggle').click();
    cy.get('#bulkaction-overlay-menu').within(() => {
      cy.contains('Delete').click();
    });
    cy.getSection('dialogconfirm').should('be.visible');
    cy.get('button').contains('Yakin').click();
    // By Toggle
    cy.getSection('bulkactiontoggle').click();
    cy.get('#bulkaction-overlay-menu').within(() => {
      cy.contains('Delete').click();
    });
    cy.getSection('dialogconfirm').should('be.visible');
    cy.get('button').contains('Yakin').click();
    // By Single Action
    cy.getSection('singleactionwrapper').eq(3).click();
    cy.get('#single-action-menu_list').within(() => {
      cy.contains('Delete').click();
    });
    cy.getSection('dialogconfirm').should('be.visible');
    cy.get('button').contains('Yakin').click();
  });
});
