#Aqui van los escenarios de prueba en Gherkin

Feature: Home correcto con sus componentes
  Como usuario Guest
  Quiero poder visitar el home
  Para ver la pagina principal de la tienda.

  @Ir_al_home
  Scenario: Ingresar con exito al home
    Given Que el usuario ingresa a la pagina web
    Then Deberia ver la pagina principal de la tienda Novey con el logo
    Then Deberia ver el header con los iconos de carrito de compras, inicio de sesion y favoritos
    And Deberia ver el buscador
    And Deberia ver los principales titulos y subtitulos
    And Deberia ver el footer con la opcion de suscribirse al newsletter y enlaces a las diferentes redes sociales.


   # Scenario: Ingresar con exito al home
   # Given Que el usuario ingresa a la pagina web
   # And Navega a la página de crear cuenta desde el home
   # But xxxxxxxxxxxxxxxxxxxxxxxxxxx
   # When Diligencia el formulario de registro
   # Then Debería confirmar ingreso a My Account