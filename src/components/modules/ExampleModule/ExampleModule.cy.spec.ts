import ExampleModule from './ExampleModule.vue';

describe('Example Module', () => {
  beforeEach(() => {
    cy.intercept('/user/*', {
      fixture: 'user-dummy',
      statusCode: 200,
    }).as('getUser');

    cy.viewport(1280, 680);
    cy.mount(ExampleModule);
  });

  describe('Header', () => {
    it('should have correct list of buttons', () => {
      cy.getSection('tabletoolbars').within(() => {
        cy.get('.ic-search');
        cy.get('.ic-filter');
        cy.get('.ic-download');
      });
    });

    it('should have correct bulk action options', () => {
      cy.get('tbody tr').first().click();
      cy.getSection('bulkactiontoggle').click();

      cy.get('#bulkaction-overlay-menu').within(() => {
        cy.contains('Delete User').click();
      });

      cy.contains('Batal').click();
    });
  });

  describe('Table', () => {
    it('should correctly handle fetch table data', () => {
      cy.wait('@getUser');
      cy.contains('alice.johnson@example.com');
      cy.contains('Menampilkan 1 - 10 dari 25');
    });

    it('should correctly handle error case fetch table data', () => {
      cy.intercept('/user/*', (res) => res.destroy()).as('getUserfailed');
      cy.mount(ExampleModule);
      cy.wait('@getUserfailed');

      cy.get('tbody tr').should('not.have.length');
    });

    it('should have correct single action menus', () => {
      cy.getSection('button-action').first().click();
      cy.get('#single-action-menu_list').within(() => {
        cy.contains('Delete User');
        cy.contains('Detail').click();
      });
    });

    it('should show dialog delete user by single action', () => {
      cy.getSection('button-action').first().click();
      cy.get('#single-action-menu_list').within(() => {
        cy.contains('Delete User').click();
      });

      cy.getByName('dialogconfirm')
        .should('exist')
        .and('be.visible')
        .within(() => {
          cy.contains('Alice Johnson'); // The selected user
          cy.contains('Batal').click(); // The selected user
        });
    });
  });

  describe('Filter', () => {
    beforeEach(() => {
      cy.intercept('options*', {
        fixture: 'user-options.json',
      });
    });

    it('quick filter - should fetch option correctly', () => {
      cy.getByName('quickfilter').within(() => {
        cy.contains('Select country').click();
      });
    });

    it('filter container - should fetch option correctly', () => {
      cy.get('.ic-filter').click();
      cy.getByName('filtercontainer').within(() => {
        cy.contains('Select country').click();
      });
    });
  });
});
