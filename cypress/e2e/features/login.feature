Feature: Inicio de Sesión



  Scenario: 1. Verificar que no permita iniciar sesión cuando las credenciales son inválidas
    Given que el usuario está en la página de inicio de sesión
    When el usuario introduce un correo electrónico válido y una contraseña incorrecta
    And el usuario hace clic en el botón de "Iniciar sesión"
    Then el usuario recibe un mensaje de error indicando que la contraseña es incorrecta

  Scenario: 2. Verificar que no permita iniciar sesión con un correo no registrado
    Given que el usuario está en la página de inicio de sesión
    When el usuario introduce un correo electrónico no registrado y cualquier contraseña
    And el usuario hace clic en el botón de "Iniciar sesión"
    Then el usuario recibe un mensaje de error indicando que la cuenta no existe

  Scenario: 3. Verificar que no permita iniciar sesión sin ingresar el correo
    Given que el usuario está en la página de inicio de sesión
    When el usuario deja el campo de correo electrónico vacío
    And llena el campo de contraseña
    And el usuario hace clic en el botón de "Iniciar sesión"
    Then el usuario recibe un mensaje de error indicando que el campo de correo electrónico es obligatorio

  Scenario: 4. Verificar que no permita iniciar sesión sin ingresar la contraseña
    Given que el usuario está en la página de inicio de sesión
    When el usuario introduce un correo electrónico válido
    And deja el campo de contraseña vacío
    And el usuario hace clic en el botón de "Iniciar sesión"
    Then el usuario recibe un mensaje de error indicando que el campo de contraseña es obligatorio
  
  Scenario: 5. Verificar que permita realizar la Recuperación de Contraseña
    Given que el usuario está en la página de inicio de sesión
    When el usuario hace clic en el enlace de "¿Olvidaste tu contraseña?"
    Then el usuario es redirigido a la página de recuperación de contraseña
  
  Scenario: 6. Verificar que permita iniciar sesión desde el carrito de compra
    Given que el usuario está en la página del carrito
    When el usuario hace clic en el botón "Realizar compra"
    And el usuario introduce un correo electrónico y contraseña válidos desde el Checkout
    And el usuario hace clic en el boton Iniciar Sesión que aparece en el Checkout
    Then el usuario es redirigido al checkout

  Scenario: 7. Verificar que un usuario registrado pueda iniciar sesión
    Given que el usuario está en la página de inicio de sesión
    When el usuario introduce un correo electrónico y contraseña válidos
    And el usuario hace clic en el botón de "Iniciar sesión"
    Then el usuario es redirigido a Mi cuenta

  Scenario: 8. Verificar que un usuario logueado pueda cerrar sesión
    Given que el usuario está en la página de inicio de sesión
    When el usuario introduce un correo electrónico y contraseña válidos
    And el usuario hace clic en el botón de "Iniciar sesión"
    And hace clic en el botón de "Cerrar sesión"
    Then el usuario es redirigido al Home