// metodos para el principio POM

class home {
    
    paginaPrincipal() {
        cy.get('#html-body > div.page-wrapper > header > div.header.content > a').should('be.visible')
        cy.wait(50);
        
    }

  }
  
  export default home;