const buttonRealizarCompra = 'button.action.primary.checkout[data-role="proceed-to-checkout"]'

class cart {
    
    gotoRealizarCompra() {
        cy.get(buttonRealizarCompra)
        .should('be.visible')
        .realHover()
        .wait(500)
        .click()
        cy.wait(7000)
    }

}
  
  export default cart;
