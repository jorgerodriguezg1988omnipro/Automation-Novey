// aqui van los archivos de las pruebas

const { Given, When, Then } = require("@badeball/cypress-cucumber-preprocessor");

import home from '../../pageObjects/home';

const Home = new home();


beforeEach(() => {      
    cy.clearCookies();
    cy.clearLocalStorage() ;
    cy.viewport(1500, 900);  
  });

Given('Que el usuario ingresa a la pagina web', () => {
    cy.visit('/');
});

Then('Debería ver la pagina principal de la tienda Novey.', () => {
    Home.paginaPrincipal();
    
           
});