Feature: Inicio de Sesión



  
  Scenario: 7. Verificar que un usuario registrado pueda iniciar sesión
    Given que el usuario está en la página de inicio de sesión
    When el usuario introduce un correo electrónico y contraseña válidos
    And el usuario hace clic en el botón de "Iniciar sesión"
    Then el usuario es redirigido a Mi cuenta
