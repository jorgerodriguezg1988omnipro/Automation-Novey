// aqui van los archivos de las pruebas
//import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
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

Then('Deberia ver la pagina principal de la tienda Novey con el logo', () => {
    Home.logo();           
});

Then('Deberia ver el header con los iconos de carrito de compras, inicio de sesion y favoritos', () => {
    cy.wait(1000)
    Home.header();          
});

Then('Deberia ver el buscador', () => {
    Home.buscador();          
});

Then('Deberia ver los principales titulos y subtitulos', () => {
    Home.titulos();          
});

Then('Deberia ver el footer con la opcion de suscribirse al newsletter y enlaces a las diferentes redes sociales.', () => {
    Home.footer();
});





