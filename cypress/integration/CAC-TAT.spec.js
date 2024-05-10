/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function () {
  beforeEach(function() {
    cy.visit('./src/index.html');
  })
  it('Verifica o título da aplicação', function () {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })
  it('Preenche os campos obrigatório e envia formulário', function () {
    const longtext = 'Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,Teste,'
    
    cy.get('#firstName').type("Julio")
    cy.get('#lastName').type("neves")
    cy.get('#email').type("julionev10@gmail.com")
    cy.get('#open-text-area').type(longtext, { delay: 0 })
    cy.contains('button', 'Enviar').click()
  
    cy.get('.success').should('be.visible')
  })

  it('Exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function () {
    cy.get('#firstName').type("Julio")
    cy.get('#lastName').type("neves")
    cy.get('#email').type("julionev10@gmail,com")
    cy.get('#open-text-area').type('Teste')
    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible')
  })

  it('Campo telefone continua vazio quando preenchido com o valor não-numerico', function () {
    cy.get('#phone')
    .type('abhgjds')
    .should('have.value', '')
  })

  it('Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {
    cy.get('#firstName').type("Julio")
    cy.get('#lastName').type("neves")
    cy.get('#email').type("julionev10@gmail.com")
    cy.get('#phone-checkbox').check()
    cy.get('#open-text-area').type('Teste')
    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible')
  })

  it('preence e limpa os campos nome, sobrenome, email e telefone', function () {
    cy.get('#firstName')
    .type("Julio")
    .should('have.value', 'Julio')
    .clear()
    .should('have.value', '')
    cy.get('#lastName')
    .type("Filho")
    .should('have.value', 'Filho')
    .clear()
    .should('have.value', '')
    cy.get('#email')
    .type("julionev10@gmail.com")
    .should('have.value', 'julionev10@gmail.com')
    .clear()
    .should('have.value', '')
    cy.get('#phone')
    .type('1234567890')
    .should('have.value', '1234567890')
    .clear()
    .should('have.value', '')
  })

  it('Exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function () {
    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible')
  })

  it('Envia o formulário com sucesso usando um comando customizado', function() {
    cy.fillMandatoryFieldsAndSubmit()

    cy.get('.success').should('be.visible')
  })
  it('seleciona um produto (Youtube) por seu texto', function () {
    cy.get('#product')
    .select('YouTube')
    .should('have.value', 'youtube')
  })

  it('seleciona um produto (Mentoria) por seu valor(value)', function () {
    cy.get('#product')
    .select('mentoria')
    .should('have.value','mentoria')
  })

  it('seleciona um produto (Blog) por seu indice', function () {
    cy.get('#product')
    .select(1)
    .should('have.value', 'blog')
  })

  it('Marca o tipo de atendimento "feedback"', function () {
    cy.get('input[type="radio"][value="feedback"]')
    .check()
    .should('have.value', 'feedback')
  })

  it('Marca cada tipo de atendimento', function () {
    cy.get('input[type="radio"]')
    .should('have.length', 3)
    .each(function($radio) {
      cy.wrap($radio).check()
      cy.wrap($radio).should('be.checked')
    })
  })

  it('Marca ambos os checkboxes, depois desmarca o último', function () {
    cy.get('input[type="checkbox"]')
    .check()
    .should('be.checked')
    .last()
    .uncheck()
    .should('not.be.checked')
  })

  it('seleciona um arquivo da pasta fixtures', function () {
    cy.get('input[type="file"]')
    .should('not.have.value')
    .selectFile('cypress/fixtures/example.json')
    .should(function(input) {
      expect(input[0].files[0].name).to.equal('example.json')
    })
  })

  it('seleciona um arquivo simulando um drag-and-drop', function () {
    cy.get('input[type="file"]')
    .should('not.have.value')
    .selectFile('cypress/fixtures/example.json', { action: 'drag-drop' })
    .should(function(input) {
      expect(input[0].files[0].name).to.equal('example.json')
    })
  })

  it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function () {
    cy.fixture('example.json').as('sampleFile')
    cy.get('input[type="file"]')
    .selectFile('@sampleFile')
    .should(function(input) {
      expect(input[0].files[0].name).to.equal('example.json')
    })
  })

  it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function () {
    cy.get('#privacy a').should('have.attr', 'target', '_blank')
  })

  it('acessa a página da políticade privacidade removendo o target e então clicando no link', function () {
    cy.get('#privacy a')
      .invoke('removeAttr', 'target')
      .click()

    cy.contains('Talking About Testing').should('be.visible')
  })
})