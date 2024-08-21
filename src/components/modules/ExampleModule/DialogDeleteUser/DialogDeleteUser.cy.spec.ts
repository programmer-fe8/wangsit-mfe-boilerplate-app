import DialogDeleteUser from './DialogDeleteUser.vue';

describe('Dialog Delete User', () => {
  beforeEach(() => {
    cy.mount(DialogDeleteUser, { props: { visible: true } });
  });

  it('should have correct header', () => {
    cy.contains('Delete User');
  });

  it('should have correct body message', () => {
    cy.contains('Apa kamu yakin');
  });

  it('should have correct severity', () => {
    cy.get('h3').should('have.class', 'text-danger-700');
  });

  it('click cancel should close the dialog', () => {
    cy.contains('Batal').click();
    cy.contains('Batal').should('not.exist');
  });

  it('click confirm should close the dialog', () => {
    cy.contains('Yakin').click();
    cy.contains('Yakin').should('not.exist');
  });
});
