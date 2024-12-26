const { Given, When, Then } = require("@badeball/cypress-cucumber-preprocessor");
const credentials = require('../../fixtures/CuentasDePrueba.json');

import home from '../../pageObjects/home';
const Home = new home();
import login from '../../pageObjects/Login';
const Login = new login();
import cart from '../../pageObjects/cart';
const Cart = new cart();



const errorMessageValidEmailWrongPassword = '.message-error[data-ui-id="message-error"]';
const inputEmail = 'input[name="login[username]"][placeholder="Correo electrónico"]';
const inputPassword = 'input#pass[name="login[password]"][placeholder="Contraseña"]';
const errorMessageInvalidEmailWrongPassword = '.message-error[data-ui-id="message-error"]';
const errorMessageCampoObligatorioMail = '#email-error'
const errorMessageCampoObligatorioPass = '#pass-error'
const inputEmailCheckout = '#store-pickup-checkout-customer-email'
const inputPasswordCheckout = '#store-pickup-customer-password'
const containerInfoPersonal = 'div.box-information div.box-content'






before(() => {      
    cy.clearCookies();
    cy.clearLocalStorage() ;
    cy.viewport(1920, 1280);  
  });

  beforeEach(() => {      
    cy.wait(1000)  
  });

  // Scenario 1: Verificar que no permita iniciar sesión cuando las credenciales son inválidas
  Given('que el usuario está en la página de inicio de sesión', function () {
    cy.visit('/');
    Login.gotoMiCuenta()

  });
  
  When('el usuario introduce un correo electrónico válido y una contraseña incorrecta', function () {
    const userData = credentials.validEmailWrongPassword;
    Login.fillCredentials(inputEmail, inputPassword, userData.email, userData.password);
  });
  
  When('el usuario hace clic en el botón de "Iniciar sesión"', function () {
    Login.clickIniciarSesion()
    cy.wait(500)
  });
  
  Then('el usuario recibe un mensaje de error indicando que la contraseña es incorrecta', function () {
    cy.get(errorMessageValidEmailWrongPassword)
    .should('be.visible')
    .contains('El inicio de sesión de la cuenta fue incorrecto o su cuenta está deshabilitada temporalmente. Espere y vuelva a intentarlo más tarde.')
  });

  // Scenario 2: Verificar que no permita iniciar sesión con un correo no registrado
  When('el usuario introduce un correo electrónico no registrado y cualquier contraseña', function () {
    const userData = credentials.invalidUser;
    Login.fillCredentials(inputEmail, inputPassword, userData.email, userData.password);
  });
  
  Then('el usuario recibe un mensaje de error indicando que la cuenta no existe', function () {
    cy.get(errorMessageInvalidEmailWrongPassword)
    .should('be.visible')
    .contains('Las credenciales ingresadas son incorrectas o su cuenta está bloqueada')
  });
  
  // Scenario 3: Verificar que no permita iniciar sesión sin ingresar el correo
  When('el usuario deja el campo de correo electrónico vacío', function () {
    cy.wait(50)
  });
  
  When('llena el campo de contraseña', function () {
    const userData = credentials.validUser;
    Login.fillCredentials(inputEmail, inputPassword, userData.email, userData.password);
    cy.get(inputEmail).should('be.visible').clear()
  });
  
  Then('el usuario recibe un mensaje de error indicando que el campo de correo electrónico es obligatorio', function () {
    cy.get(errorMessageCampoObligatorioMail)
    .should('be.visible')
    .contains('Campo obligatorio.')
  });

   // Scenario 4: Verificar que no permita iniciar sesión sin ingresar la contraseña
   When('el usuario introduce un correo electrónico válido', function () {
    const userData = credentials.validUser;
    Login.fillCredentials(inputEmail, inputPassword, userData.email, userData.password);
  });
  
  When('deja el campo de contraseña vacío', function () {
    cy.get(inputPassword).should('be.visible').clear()
  });
  
  Then('el usuario recibe un mensaje de error indicando que el campo de contraseña es obligatorio', function () {
    cy.get(errorMessageCampoObligatorioPass).should('be.visible').contains('Campo obligatorio.')
  });

  // Scenario 5: Verificar que permita realizar la Recuperación de Contraseña
  When('el usuario hace clic en el enlace de "¿Olvidaste tu contraseña?"', function () {
    Login.olvidastePassword()
  });

Then('el usuario es redirigido a la página de recuperación de contraseña', function () {
    Login.olvidastePasswordPage()
  });

// Scenario 6: Verificar que permita iniciar sesión desde el carrito de compra
Given('que el usuario está en la página del carrito', function () {
  Home.addProductFromHome()
  Home.gotoCart()      
});

When('el usuario hace clic en el botón "Realizar compra"', function () {
    cy.wait(2000)
    Cart.gotoRealizarCompra()
});

When('el usuario introduce un correo electrónico y contraseña válidos desde el Checkout', function () {
  const userData = credentials.validUser;
  Login.fillCredentials(inputEmailCheckout, inputPasswordCheckout, userData.email, userData.password);
  cy.wrap(userData.email).as('userEmail'); //cy.wrap(userData.email + 'x').as('userEmail');
});

When('el usuario hace clic en el boton Iniciar Sesión que aparece en el Checkout', function () {
  cy.wait(2000)
  Login.iniciarSesionCheckout()     
});

Then('el usuario es redirigido al checkout', function () {
    cy.wait(10000)
  // Comparar el correo electrónico introducido con el correo visible en la página
    cy.get('span[data-bind="text: customerEmail"]')
      .invoke('text') // Extraer el texto del elemento
      .then((extractedEmail) => {
    cy.get('@userEmail').then((userEmail) => {
      expect(extractedEmail.trim()).to.equal(userEmail.trim());    // Usar aserción para comparar las variables
      });
    });
});


// Scenario 7: Verificar que un usuario registrado pueda iniciar sesión
When('el usuario introduce un correo electrónico y contraseña válidos', function () {
    const userData = credentials.validUser;
    Login.fillCredentials(inputEmail, inputPassword, userData.email, userData.password); 
    cy.wrap(userData.email).as('userEmail'); //cy.wrap(userData.email + 'x').as('userEmail');   
});

Then('el usuario es redirigido a Mi cuenta', function () {
  Home.gotoMyAccount();
  cy.get(containerInfoPersonal).should('be.visible')
    .invoke('text')
    .then((extractedText) => {
      let extractedEmail = '';
      const words = extractedText.split(/\s+/);

      for (let i = 0; i < words.length; i++) {
        if (words[i].includes('@')) {
          extractedEmail = words[i];
          break; 
        }
      }

      cy.get('@userEmail').then((userEmail) => {
        expect(extractedEmail).to.equal(userEmail.trim()); // Comparar ambos valores
      });
    });
});

// Scenario 8: Verificar que un usuario logueado pueda cerrar sesión
When('hace clic en el botón de "Cerrar sesión"', function () {
    Home.gotoCerrarSesion()
    cy.wait(6000)
});

Then('el usuario es redirigido al Home', function () {
    Home.logo();
    Home.header();
    Home.footer();
    Home.titulos();
    Home.buscador();
});



/*Given que el usuario está en la página de inicio de sesión
    When el usuario introduce un correo electrónico y contraseña válidos
    And el usuario hace clic en el botón de "Iniciar sesión"
    And hace clic en el botón de "Cerrar sesión"
    Then el usuario es redirigido al Home*/


          

  
  
  
  