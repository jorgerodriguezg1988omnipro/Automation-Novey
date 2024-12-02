// Importa las funciones necesarias para configurar Cypress y los preprocesadores
const { defineConfig } = require("cypress");
const { addCucumberPreprocessorPlugin } = require("@badeball/cypress-cucumber-preprocessor"); // Preprocesador de Cucumber para ejecutar pruebas escritas en Gherkin
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor"); // Empaquetador para optimizar el preprocesamiento de archivos
const addCucumberPlugin = require("@badeball/cypress-cucumber-preprocessor/esbuild"); // Plugin para Cucumber con Esbuild
module.exports = defineConfig({
  // Configuración global de capturas de pantalla
  screenshotsFolder: "cypress/screenshots", // Carpeta donde se almacenarán las capturas de pantalla
  // Habilita la grabación de videos durante la ejecución de las pruebas
  video: true,
  // Configuración de las pruebas E2E (end-to-end)
  e2e: {
    // Método que configura eventos y plugins para las pruebas E2E
    setupNodeEvents(on, config) {
      // Agrega el preprocesador de Cucumber para manejar los archivos .feature escritos en Gherkin
      addCucumberPreprocessorPlugin(on, config);
      // Configura el empaquetador Esbuild para optimizar el preprocesamiento de archivos
      on(
        "file:preprocessor",
        createBundler({
          plugins: [addCucumberPlugin.default(config)], // Configura Esbuild para trabajar con Cucumber
        })
      );
      // Retorna la configuración modificada con los preprocesadores aplicados
      return config;
    },
    // Especifica la ruta de los archivos .feature que contienen los escenarios escritos en Gherkin
    specPattern: "cypress/e2e/features/**/*.feature",
    // Establece la URL base para las pruebas, útil para los enlaces relativos en las pruebas
    baseUrl: 'https://mcstaging.novey.com.pa/novey_panama/',
    // Desactiva la seguridad en el navegador de Cypress (útil para entornos con múltiples dominios)
    chromeWebSecurity: false,
    // Configura si las pruebas deben aislarse entre sí
    testIsolation: false,
    // Configura los tiempos de espera globales para los comandos de Cypress
    defaultCommandTimeout: 5000,  // Tiempo máximo de espera para cada comando (5 segundos)
    requestTimeout: 20000,       // Tiempo máximo de espera para las solicitudes de red (20 segundos)
    pageLoadTimeout: 60000,      // Tiempo máximo de espera para la carga de páginas (60 segundos)
  },
});