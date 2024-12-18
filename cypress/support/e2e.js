// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

Cypress.on('uncaught:exception', (err) => {
    // Ignora el error relacionado con WT
    if (err.message.includes('WT is not a function')) {
      return false; // Evita que Cypress falle la prueba
    }
    // Permite que otros errores se manejen normalmente
    return true;
  });

  Cypress.on('uncaught:exception', (err, runnable) => {
    // Retorna false para prevenir que Cypress falle debido a errores no manejados
    if (err.message.includes("Cannot read properties of undefined (reading 'data')")) {
      return false;
    }
  
    // Permite que otros errores no controlados sigan fallando la prueba
    return true;
  });

// Alternatively you can use CommonJS syntax:
// require('./commands')