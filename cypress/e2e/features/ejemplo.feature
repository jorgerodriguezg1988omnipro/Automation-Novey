#Aqui van los escenarios de prueba en Gherkin

Feature: Crear una nueva cuenta
  Como usuario final
  Quiero poder visitar el home
  Para ver la pagina principal de la tienda.

  @Ir_al_home
  Scenario: Ingresar con exito al home
   Given Que el usuario ingresa a la pagina web
   Then Debería ver la pagina principal de la tienda Novey.


   # Scenario: Ingresar con exito al home
   # Given Que el usuario ingresa a la pagina web
   # And Navega a la página de crear cuenta desde el home
   # But xxxxxxxxxxxxxxxxxxxxxxxxxxx
   # When Diligencia el formulario de registro
   # Then Debería confirmar ingreso a My Account