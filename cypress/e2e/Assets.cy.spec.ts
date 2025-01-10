describe('Asset Form Test', () => {
  beforeEach(() => {
    cy.visit('/assets');

    cy.get('Button').contains('+ Register').click();
    cy.getSection('dialog-form').should('be.visible');
  });

  it('form should not be submitted if the required fields are not filled.', () => {
    cy.get('Button').contains('Simpan').click();
    cy.getSection('dialog-form').should('be.visible');
  });

  it('should be able to fill the form', () => {
    cy.getSection('dialog-form').within(() => {
      cy.get('#group-dropdown').click();
    });
    cy.get('[data-pc-section="list"]').within(() => {
      cy.contains('Room 402').click();
    });
    //
    cy.getSection('dialog-form').within(() => {
      cy.get('#category-dropdown').click();
    });
    cy.get('[data-pc-section="list"]').within(() => {
      cy.contains('Transportasi').click();
    });
    //
    cy.getSection('dialog-form').within(() => {
      cy.get('#name-dropdown').click();
    });
    cy.get('[data-pc-section="list"]').within(() => {
      cy.contains('MacBook Pro').click();
    });
    //
    cy.getSection('dialog-form').within(() => {
      cy.get('#alias-name-input-text').type('Hello World');
    });
    //
    cy.getSection('dialog-form').within(() => {
      cy.get('#brand-dropdown').click();
    });
    cy.get('[data-pc-section="list"]').within(() => {
      cy.contains('Samsung').click();
    });
    //
    cy.getSection('dialog-form').within(() => {
      cy.get('#model-type-dropdown').click();
    });
    cy.get('[data-pc-section="list"]').within(() => {
      cy.contains('Ultra 24').click();
    });
    //
    cy.getSection('checkbox-input').click({ multiple: true, force: true });
  });

  it('dialog should close when clicking the cancel button', () => {
    cy.get('Button').contains('Batal').click();
    cy.getSection('dialog-form').should('not.exist');
  });

  it('validator message should appear if the text input in the form contains more than 30 characters.', () => {
    cy.getSection('dialog-form').within(() => {
      cy.get('#alias-name-input-text').type(
        'In *Attack on Titan*, humanity fights for survival behind massive walls, defending themselves against the relentless onslaught of terrifying Titans.',
      );
    });
    cy.getByName('validatormessage').should('be.visible');
  });
});
