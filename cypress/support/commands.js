Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function () {
  cy.get('#firstName').type("Julio")
  cy.get('#lastName').type("neves")
  cy.get('#email').type("julionev10@gmail.com")
  cy.get('#open-text-area').type('Teste')
  cy.contains('button', 'Enviar').click()
})