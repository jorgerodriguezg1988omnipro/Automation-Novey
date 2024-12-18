const iconInicioSesion = '#html-body > div.page-wrapper > header > div.header.content > ul > li.link.authorization-link.logged-out';
const titleInicioSesion = '#maincontent > div.columns > div > div.login-container > div.block.block-customer-login';
const buttonIniciarSesion = '#send2';
const linkOlvidastePassword = '#login-form > fieldset > div.actions-toolbar > div.secondary > a'
const titleRestablecerPassword = '#form-validate > fieldset > div.field.email.required > label > span'
const inputEmailRestablecerPassword = 'input#email_address[name="email"][placeholder="Correo electrónico"]'
const buttonRestablecerPassword = 'button#send2.action.submit.primary'



const buttonIniciarSesionCheckout = 'button.action.login.primary[data-action="checkout-method-login"]'







class login {
    
    gotoMiCuenta() {
        cy.get(iconInicioSesion).should('be.visible').click()
        cy.get(titleInicioSesion).should('be.visible')
        .contains('Inicia sesión en tu cuenta')
    }

    clickIniciarSesion() {
      cy.get(buttonIniciarSesion)
      .should('be.visible')
      .click()
    }

    olvidastePassword() {
    cy.get(linkOlvidastePassword).should('be.visible')
        .contains('¿Olvidaste tu contraseña?')
        .click()
    }

    olvidastePasswordPage() {
      cy.get(titleRestablecerPassword).should('be.visible')
      cy.get(inputEmailRestablecerPassword).should('be.visible')
      cy.get(buttonRestablecerPassword).should('be.visible').contains('Restablecer contraseña');
    }

    iniciarSesionCheckout() {
      cy.get(buttonIniciarSesionCheckout)
      .should('be.visible')
      .contains('Iniciar sesión')
      .click()
    }



    

    

    




    fillCredentials(emailSelector, passwordSelector, email, password) {
        cy.get(emailSelector)
          .should('be.visible')
          .clear()
          .type(email);
    
        cy.get(passwordSelector)
          .should('be.visible')
          .clear()
          .type(password);
    }

    

    

    

}
  
  export default login;