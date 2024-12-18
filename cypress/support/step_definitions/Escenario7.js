const { Given, When, Then } = require("@badeball/cypress-cucumber-preprocessor");
const credentials = require('../../fixtures/CuentasDePrueba.json');

import home from '../../pageObjects/home';
const Home = new home();
import login from '../../pageObjects/login';
const Login = new login();
import cart from '../../pageObjects/cart';
const Cart = new cart();




const inputEmail = 'input[name="login[username]"][placeholder="Correo electrónico"]';
const inputPassword = 'input#pass[name="login[password]"][placeholder="Contraseña"]';


before(() => {      
    cy.clearCookies();
    cy.clearLocalStorage() ;
    cy.viewport(1920, 1280);  
  });

  beforeEach(() => {      
    cy.wait(1000)  
  });
/*
Given('que el usuario está en la página de inicio de sesión', function () {
  cy.visit('/');
  Login.gotoMiCuenta()

});

When('el usuario introduce un correo electrónico y contraseña válidos', function () {
  const userData = credentials.validUser;
  Login.fillCredentials(inputEmail, inputPassword, userData.email, userData.password); 
  cy.wrap(userData.email).as('userEmail'); //cy.wrap(userData.email + 'x').as('userEmail');   
});

When('el usuario hace clic en el botón de "Iniciar sesión"', function () {
  Login.clickIniciarSesion()
  cy.wait(500)
});

Then('el usuario es redirigido a Mi cuenta', function () {
  Home.gotoMyAccount()
});

/*  Scenario: 7. Verificar que un usuario registrado pueda iniciar sesión
    Given que el usuario está en la página de inicio de sesión
    When el usuario introduce un correo electrónico y contraseña válidos
    And el usuario hace clic en el botón de "Iniciar sesión"
    Then el usuario es redirigido a Mi cuenta*/
          

  
  
  
  