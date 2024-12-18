const logoSelector = '#html-body > div.page-wrapper > header > div.header.content > a';
const iconCarrito = '#html-body > div.page-wrapper > header > div.header.content > div.minicart-wrapper';
const iconInicioSesion = '#html-body > div.page-wrapper > header > div.header.content > ul > li.link.authorization-link.logged-out';
const iconFavoritos = '#html-body > div.page-wrapper > header > div.header.content > ul > li.link.wishlist';
const inputBuscador = '#algoliaAutocomplete';
const titleEncuentraTodo = '#maincontent > div.columns > div > div:nth-child(4) > div > div:nth-child(3) > div > div > div > div.slider-title > p';
const titlePrincipalesOfertas = '#maincontent > div.columns > div > div:nth-child(4) > div > div:nth-child(4) > div > div > div > h1';
const titleRenuevaRecamara = '#maincontent > div.columns > div > div:nth-child(4) > div > div:nth-child(5) > div > div > div > div > div > div.pagebuilder-column.custom-slider > div.slider-title > p:nth-child(1)';
const titleProductosRecomendados = 'div#algoliaRecommend h3.auc-Recommend-title';
const titleQuedesSinComprar = '#maincontent > div.columns > div > div:nth-child(4) > div > div:nth-child(13) > div > div > div > div.slider-title.home-carousel-prods__title > p:nth-child(1)';
const titleSuscribete = 'h3[data-content-type="heading"]:contains("Suscríbete")';
const newsletter = '#newsletter';
const botonEnviarNewsletter = '#newsletter-validate-detail > div > div > label > div > button';
const titleSocialMedia = 'h3[data-content-type="heading"]:contains("Síguenos en")';
const contenedorPrincipalesOfertas = '#maincontent > div.columns > div > div:nth-child(4) > div > div:nth-child(4) > div > div > div > div.main-offers__products-wrapper > div.main-offers__products.swiper.swiper-initialized.swiper-horizontal.swiper-backface-hidden'
const buttonAgregarProdPrincipalesOfertas = 'button.quick-add[type="button"][title="Agregar"]'
const iconCart = 'a.action.showcart'
const buttonVerResumen = 'a.action.viewcart'
const titleCarrito = '[data-ui-id="page-title-wrapper"]'
const buttonUsuario = 'ul.header.links li.customer-welcome button.action.switch'
const linkMiCuenta = 'div.customer-menu a[href="https://mcstaging.novey.com.pa/novey_panama/customer/account/"]'
const linkCerrarSesion = 'li.link.authorization-link.logged-in a.action.profile'


// Conjunto de links a validar
const links = [
    { selector: 'a[href="https://www.instagram.com/noveypanama/"]', href: 'https://www.instagram.com/noveypanama/' },
    { selector: 'a[href="https://www.facebook.com/NoveyPanama"]', href: 'https://www.facebook.com/NoveyPanama' },
    { selector: 'a[href="https://www.youtube.com/channel/UCL2FbK5mbTyXhGsoKLoiPAA"]', href: 'https://www.youtube.com/channel/UCL2FbK5mbTyXhGsoKLoiPAA' },
    { selector: 'a[href="https://www.tiktok.com/@noveypanama"]', href: 'https://www.tiktok.com/@noveypanama' },
    { selector: 'a[href="https://www.linkedin.com/company/novey-panama/"]', href: 'https://www.linkedin.com/company/novey-panama/' },
    { selector: 'a[href="https://x.com/NoveyPanama"]', href: 'https://x.com/NoveyPanama' },
  ];

// Funcion que valida integridad de los links de redes sociales  
function validateLink(selector, expectedHref) {
    cy.get(selector)
    .should('have.attr', 'href', expectedHref)
    .and('not.contain', 'javascript:') // Verificar que no contiene JavaScript malicioso
    .and('not.contain', 'data:')  // Evitar enlaces base64 inseguros
    .and('not.contain', 'file:'); // Evitar rutas locales.
  }

class home {
    
    logo() {
        cy.get(logoSelector).should('be.visible')
    }

    header() {
        cy.get(iconCarrito).should('be.visible')
        cy.get(iconInicioSesion).should('be.visible')
        cy.get(iconFavoritos).should('be.visible')
    }

    buscador() {
        cy.wait(2000)
        cy.get(inputBuscador).should('be.visible')
    }

    titulos() {
        cy.get(titleEncuentraTodo).should('be.visible')
        .contains('Encuentra todo lo que necesitas aquí')
        cy.get(titlePrincipalesOfertas).should('be.visible')
        .contains('Principales ofertas')
        cy.get(titleRenuevaRecamara).should('be.visible')
        .contains('Renueva tu recámara')
        cy.get(titleProductosRecomendados).should('be.visible')
        .contains('Productos recomendados')
        cy.wait(2000)
        cy.get(titleQuedesSinComprar).should('be.visible')
        .contains('No te quedes sin comprar')     
  }

    footer() {
        cy.get(titleSuscribete).should('be.visible')
        .contains('Suscríbete')
        cy.get(newsletter).should('be.visible')
        cy.get(botonEnviarNewsletter).should('be.visible')
        cy.get(titleSocialMedia).should('be.visible')
        .contains('Síguenos en')

        links.forEach(link => validateLink(link.selector, link.href)); // llama la funcion y valida todos los links
    }

    addProductFromHome() {
        cy.visit('/');
        cy.wait(12000)
        cy.get(contenedorPrincipalesOfertas).should('be.visible')
        cy.get(buttonAgregarProdPrincipalesOfertas).should('be.visible').first().click()
        cy.wait(2000)
        cy.get('span.counter.qty')
        .should('be.visible')
        .find('span.counter-number')
        .should('have.text', '1'); 
    }

    gotoCart() {
        cy.get(iconCart).should('be.visible').click()
        cy.get(buttonVerResumen).should('be.visible').click()
        cy.get(titleCarrito).should('be.visible').and('have.text', 'Tu carrito');
      }
    
    gotoMyAccount() {
        cy.get(buttonUsuario)
        .realHover()
        .click({ force: true })
        cy.wait(1000)
        cy.get('div.customer-menu')
        .should('have.attr', 'aria-hidden', 'false').and('be.visible');
        cy.get(linkMiCuenta)
        .should('be.visible')
        .and('contain', 'Mi cuenta')
        .click({ force: true })
        cy.wait(4000)
      }

      gotoCerrarSesion() {
        cy.get(buttonUsuario)
        .realHover()
        .click({ force: true })
        cy.wait(1000)
        cy.get('div.customer-menu')
        .should('have.attr', 'aria-hidden', 'false').and('be.visible');
        cy.get('li.link.authorization-link.logged-in').should('be.visible');
        cy.get(linkCerrarSesion) //
        .should('be.visible') //
        .and('contain', 'Cerrar sesión') //
        .first()
        .click() //
        cy.wait(4000) //
      }
      

}
  
  export default home;


// Lineas de codigo ahorradas con la funcion:
        /*cy.get(linkToInstagram)
            .should('have.attr', 'href', 'https://www.instagram.com/noveypanama/')
            .and('not.contain', 'javascript:') // Verificar que no contiene JavaScript malicioso
            .and('not.contain', 'data:')      // Evitar enlaces base64 inseguros
            .and('not.contain', 'file:');     // Evitar rutas locales.
        cy.get(linkToFacebook)
            .should('have.attr', 'href', 'https://www.facebook.com/NoveyPanama')
            .and('not.contain', 'javascript:') // Verificar que no contiene JavaScript malicioso
            .and('not.contain', 'data:')      // Evitar enlaces base64 inseguros
            .and('not.contain', 'file:');     // Evitar rutas locales.
        cy.get(linkToYoutube)
            .should('have.attr', 'href', 'https://www.youtube.com/channel/UCL2FbK5mbTyXhGsoKLoiPAA')
            .and('not.contain', 'javascript:') // Verificar que no contiene JavaScript malicioso
            .and('not.contain', 'data:')      // Evitar enlaces base64 inseguros
            .and('not.contain', 'file:');     // Evitar rutas locales.
        cy.get(linkToTiktok)
            .should('have.attr', 'href', 'https://www.tiktok.com/@noveypanama')
            .and('not.contain', 'javascript:')// Verificar que no contiene JavaScript malicioso
            .and('not.contain', 'data:')      // Evitar enlaces base64 inseguros
            .and('not.contain', 'file:');     // Evitar rutas locales.
        cy.get(linkToLinkedin)
            .should('have.attr', 'href', 'https://www.linkedin.com/company/novey-panama/')
            .and('not.contain', 'javascript:') // Verificar que no contiene JavaScript malicioso
            .and('not.contain', 'data:')      // Evitar enlaces base64 inseguros
            .and('not.contain', 'file:');     // Evitar rutas locales.
        cy.get(linkToXTwitter)
            .should('have.attr', 'href', 'https://x.com/NoveyPanama')
            .and('not.contain', 'javascript:') // Verificar que no contiene JavaScript malicioso
            .and('not.contain', 'data:')      // Evitar enlaces base64 inseguros
            .and('not.contain', 'file:');     // Evitar rutas locales.*/
