
/* ============================================================
   ARCARIUS FEST
   APP.JS
   PREMIUM / ELITE
   NUEVO SISTEMA DE ARTISTAS
   GALLERY — VISUAL ARCHIVE / ROOTS EXPERIENCE
   MOBILE / ANDROID FIRST
   ============================================================ */

'use strict';


/* ============================================================
   CONFIG
   ============================================================ */

const CONFIG = {

    selectors: {

        body:
            document.body,


        /* ----------------------------------------------------
           PRELOADER
           ---------------------------------------------------- */

        preloader:
            '#preloader',


        /* ----------------------------------------------------
           HEADER
           ---------------------------------------------------- */

        header:
            '#site-header',

        menuToggle:
            '#menu-toggle',

        mobileMenu:
            '#mobile-menu',

        menuClose:
            '[data-menu-close]',

        menuLinks:
            '[data-menu-link]',

        navLinks:
            '.nav-link',


        /* ----------------------------------------------------
           GLOBAL REVEAL
           ---------------------------------------------------- */

        reveal:
            '[data-reveal]',

        tilt:
            '[data-tilt]',


        /* ----------------------------------------------------
           FOOTER
           ---------------------------------------------------- */

        currentYear:
            '[data-current-year]',


        /* ----------------------------------------------------
           TICKETS
           ---------------------------------------------------- */

        ticket:
            '[data-ticket-external]',


        /* ----------------------------------------------------
           HERO
           ---------------------------------------------------- */

        hero:
            '#home',

        heroVideo:
            '.hero__video',

        heroReveal:
            '[data-hero-reveal]',

        heroTitle:
            '[data-hero-title]',

        heroLines:
            '[data-hero-line]',


        /* ----------------------------------------------------
           ARTISTS
           NUEVO SISTEMA
           ---------------------------------------------------- */

        artists:
            '#artists',

        artistScenes:
            '.artist-scene',

        artistMedia:
            '.artist-scene__media',

        artistImage:
            '.artist-scene__image img',


        /* ----------------------------------------------------
           EVENTS
           ---------------------------------------------------- */

        eventCard:
            '[data-event-card]',

        eventsEmpty:
            '[data-events-empty]',

        eventNext:
            '[data-event-next]',

        eventPrevious:
            '[data-event-prev]',

        eventDay:
            '[data-event-day]',

        eventMonth:
            '[data-event-month]',

        eventYear:
            '[data-event-year]',

        eventTitle:
            '[data-event-title]',

        eventLocation:
            '[data-event-location]',

        eventDescription:
            '[data-event-description]',

        eventIndex:
            '[data-event-index]',

        eventCode:
            '[data-event-code]',

        eventVisual:
            '[data-event-visual]',

        eventLink:
            '[data-event-link]',


        /* ----------------------------------------------------
           GALLERY
           VISUAL ARCHIVE / ROOTS EXPERIENCE
           ---------------------------------------------------- */

        gallery:
            '#gallery',

        galleryItems:
            '[data-gallery-item]',

        galleryImages:
            '.gallery-item__media img',

        galleryRoots:
            '.gallery-root',

        galleryField:
            '.gallery__field'

    },


    classes: {

        open:
            'is-open',

        hidden:
            'is-hidden',

        loaded:
            'is-loaded',

        loading:
            'is-loading',

        visible:
            'is-visible',

        scrolled:
            'is-scrolled',

        active:
            'is-active',

        modal:
            'modal-open',

        changing:
            'is-changing',

        heroEntering:
            'is-entering',

        heroEntered:
            'is-entered',

        artistsActive:
            'is-active',

        artistLoaded:
            'is-loaded',

        artistError:
            'is-error',

        galleryLoaded:
            'is-loaded',

        galleryError:
            'is-error',

        galleryFocus:
            'is-focus'

    },


    timings: {

        preloader:
            5000,

        eventTransition:
            220,

        heroReveal:
            110

    }

};


/* ============================================================
   GLOBAL STATE
   ============================================================ */

const APP_STATE = {

    initialized:
        false,


    artists: {

        initialized:
            false

    },


    events: {

        initialized:
            false,

        currentIndex:
            0

    },


    gallery: {

        initialized:
            false

    }

};


/* ============================================================
   DOM READY
   ============================================================ */

document.addEventListener(
    'DOMContentLoaded',
    () => {

        if (
            APP_STATE.initialized
        ) {

            return;

        }


        APP_STATE.initialized =
            true;


        /*
         * Estado inicial.
         */

        document.body.classList.add(
            CONFIG.classes.loading
        );


        /*
         * 01 — PRELOADER
         */

        initPreloader();


        /*
         * 02 — HEADER
         */

        initHeader();


        /*
         * 03 — HERO
         */

        initHeroExperience();

        initHeroVideo();


        /*
         * 04 — MENÚ
         */

        initMobileMenu();


        /*
         * 05 — NAVEGACIÓN
         */

        initSmoothScroll();

        initActiveNavigation();


        /*
         * 06 — SISTEMA VISUAL
         */

        initScrollReveal();

        initTiltCards();


        /*
         * 07 — ARTISTAS
         */

        initArtists();


        /*
         * 08 — EVENTOS
         */

        initEventsGateway();


        /*
         * 09 — GALERÍA
         * VISUAL ARCHIVE / ROOTS EXPERIENCE
         */

        initGallery();


        /*
         * 10 — TICKETS
         */

        initTicket();


        /*
         * 11 — FOOTER
         */

        initCurrentYear();

    }
);


/* ============================================================
   PRELOADER
   APERTURA DEL TERRITORIO
   ============================================================ */

function initPreloader() {

    const preloader =
        document.querySelector(
            CONFIG.selectors.preloader
        );


    /*
     * Si no existe preloader,
     * continuar directamente.
     */

    if (!preloader) {

        document.body.classList.remove(
            CONFIG.classes.loading
        );

        document.body.classList.add(
            CONFIG.classes.loaded
        );

        document.dispatchEvent(
            new CustomEvent(
                'arcarius:territory-open'
            )
        );

        return;

    }


    const percentage =
        preloader.querySelector(
            '[data-preloader-percent]'
        );


    const progress =
        preloader.querySelector(
            '.preloader__progress'
        );


    const duration =
        CONFIG.timings.preloader;


    const start =
        performance.now();


    let completed =
        false;


    /*
     * Curva de progreso.
     */

    const easeProgress =
        value => {

            return (
                1 -
                Math.pow(
                    1 - value,
                    1.45
                )
            );

        };


    /*
     * Actualizar contador.
     */

    const updateProgress =
        value => {

            const safeValue =
                Math.min(
                    100,
                    Math.max(
                        1,
                        value
                    )
                );


            const rounded =
                Math.floor(
                    safeValue
                );


            if (percentage) {

                percentage.textContent =
                    String(
                        rounded
                    ).padStart(
                        2,
                        '0'
                    );

            }


            if (progress) {

                progress.style.width =
                    `${safeValue}%`;

            }

        };


    /*
     * Abrir experiencia.
     */

    const openTerritory =
        () => {

            if (completed) {

                return;

            }


            completed =
                true;


            updateProgress(
                100
            );


            window.setTimeout(
                () => {

                    preloader.classList.add(
                        'is-opening'
                    );

                },
                180
            );


            window.setTimeout(
                () => {

                    preloader.classList.add(
                        CONFIG.classes.hidden
                    );


                    document.body.classList.remove(
                        CONFIG.classes.loading
                    );


                    document.body.classList.add(
                        CONFIG.classes.loaded
                    );


                    document.dispatchEvent(
                        new CustomEvent(
                            'arcarius:territory-open'
                        )
                    );

                },
                850
            );


            window.setTimeout(
                () => {

                    preloader.style.display =
                        'none';

                },
                1800
            );

        };


    /*
     * Animación.
     */

    const animate =
        now => {

            const elapsed =
                now - start;


            const rawProgress =
                Math.min(
                    elapsed / duration,
                    1
                );


            const smoothProgress =
                easeProgress(
                    rawProgress
                );


            updateProgress(
                smoothProgress * 100
            );


            if (
                rawProgress < 1
            ) {

                requestAnimationFrame(
                    animate
                );

            } else {

                openTerritory();

            }

        };


    updateProgress(
        1
    );


    requestAnimationFrame(
        animate
    );

}


/* ============================================================
   HEADER
   ============================================================ */

function initHeader() {

    const header =
        document.querySelector(
            CONFIG.selectors.header
        );


    if (!header) {

        return;

    }


    let lastState =
        null;


    const update =
        () => {

            const shouldScroll =
                window.scrollY > 40;


            if (
                shouldScroll === lastState
            ) {

                return;

            }


            lastState =
                shouldScroll;


            header.classList.toggle(
                CONFIG.classes.scrolled,
                shouldScroll
            );

        };


    update();


    window.addEventListener(
        'scroll',
        update,
        {
            passive:
                true
        }
    );

}


/* ============================================================
   HERO
   ENTRADA CINEMATOGRÁFICA
   ============================================================ */

function initHeroExperience() {

    const hero =
        document.querySelector(
            CONFIG.selectors.hero
        );


    if (!hero) {

        return;

    }


    hero.classList.add(
        CONFIG.classes.heroEntering
    );


    document.addEventListener(
        'arcarius:territory-open',
        () => {

            revealHero(
                hero
            );

        },
        {
            once:
                true
        }
    );


    if (
        document.body.classList.contains(
            CONFIG.classes.loaded
        )
    ) {

        revealHero(
            hero
        );

    }

}


/* ============================================================
   REVEAL HERO
   ============================================================ */

function revealHero(
    hero
) {

    if (!hero) {

        return;

    }


    if (
        hero.classList.contains(
            CONFIG.classes.heroEntered
        )
    ) {

        return;

    }


    hero.classList.add(
        CONFIG.classes.heroEntered
    );


    const revealElements =
        hero.querySelectorAll(
            CONFIG.selectors.heroReveal
        );


    if (
        prefersReducedMotion()
    ) {

        revealElements.forEach(
            element => {

                element.classList.add(
                    CONFIG.classes.visible
                );

            }
        );


        return;

    }


    revealElements.forEach(
        (
            element,
            index
        ) => {

            window.setTimeout(
                () => {

                    element.classList.add(
                        CONFIG.classes.visible
                    );

                },
                150 +
                (
                    index *
                    CONFIG.timings.heroReveal
                )
            );

        }
    );

}


/* ============================================================
   HERO VIDEO
   ============================================================ */

function initHeroVideo() {

    const video =
        document.querySelector(
            CONFIG.selectors.heroVideo
        );


    if (!video) {

        return;

    }


    video.muted =
        true;


    video.playsInline =
        true;


    video.setAttribute(
        'playsinline',
        ''
    );


    if (
        prefersReducedMotion()
    ) {

        video.pause();

        return;

    }


    const playVideo =
        () => {

            if (
                document.hidden
            ) {

                return;

            }


            const promise =
                video.play();


            if (
                promise &&
                typeof promise.catch === 'function'
            ) {

                promise.catch(
                    () => {}
                );

            }

        };


    if (
        video.readyState >= 2
    ) {

        playVideo();

    } else {

        video.addEventListener(
            'loadeddata',
            playVideo,
            {
                once:
                    true
            }
        );

    }


    /*
     * Pausar cuando la pestaña
     * queda en segundo plano.
     */

    document.addEventListener(
        'visibilitychange',
        () => {

            if (
                document.hidden
            ) {

                video.pause();

            } else if (
                !prefersReducedMotion()
            ) {

                playVideo();

            }

        }
    );

}


/* ============================================================
   MOBILE MENU
   ============================================================ */

function initMobileMenu() {

    const toggle =
        document.querySelector(
            CONFIG.selectors.menuToggle
        );


    const menu =
        document.querySelector(
            CONFIG.selectors.mobileMenu
        );


    if (
        !toggle ||
        !menu
    ) {

        return;

    }


    const closeElements =
        menu.querySelectorAll(
            CONFIG.selectors.menuClose
        );


    const menuLinks =
        menu.querySelectorAll(
            CONFIG.selectors.menuLinks
        );


    /*
     * Estado inicial.
     */

    toggle.setAttribute(
        'aria-expanded',
        'false'
    );


    menu.setAttribute(
        'aria-hidden',
        'true'
    );


    /*
     * Abrir.
     */

    const openMenu =
        () => {

            menu.classList.add(
                CONFIG.classes.open
            );


            toggle.classList.add(
                CONFIG.classes.open
            );


            toggle.setAttribute(
                'aria-expanded',
                'true'
            );


            menu.setAttribute(
                'aria-hidden',
                'false'
            );


            document.body.classList.add(
                CONFIG.classes.modal
            );

        };


    /*
     * Cerrar.
     */

    const closeMenu =
        () => {

            menu.classList.remove(
                CONFIG.classes.open
            );


            toggle.classList.remove(
                CONFIG.classes.open
            );


            toggle.setAttribute(
                'aria-expanded',
                'false'
            );


            menu.setAttribute(
                'aria-hidden',
                'true'
            );


            document.body.classList.remove(
                CONFIG.classes.modal
            );

        };


    /*
     * Toggle.
     */

    toggle.addEventListener(
        'click',
        () => {

            if (
                menu.classList.contains(
                    CONFIG.classes.open
                )
            ) {

                closeMenu();

            } else {

                openMenu();

            }

        }
    );


    /*
     * Cerrar overlay / botón.
     */

    closeElements.forEach(
        element => {

            element.addEventListener(
                'click',
                closeMenu
            );

        }
    );


    /*
     * Links.
     */

    menuLinks.forEach(
        link => {

            link.addEventListener(
                'click',
                closeMenu
            );

        }
    );


    /*
     * Escape.
     */

    document.addEventListener(
        'keydown',
        event => {

            if (
                event.key === 'Escape' &&
                menu.classList.contains(
                    CONFIG.classes.open
                )
            ) {

                closeMenu();

                toggle.focus();

            }

        }
    );


    /*
     * Cerrar al pasar a desktop.
     */

    window.addEventListener(
        'resize',
        () => {

            if (
                window.innerWidth > 1024
            ) {

                closeMenu();

            }

        },
        {
            passive:
                true
        }
    );

}


/* ============================================================
   SMOOTH SCROLL
   ============================================================ */

function initSmoothScroll() {

    const links =
        document.querySelectorAll(
            'a[href^="#"]'
        );


    if (!links.length) {

        return;

    }


    links.forEach(
        link => {

            link.addEventListener(
                'click',
                event => {

                    const id =
                        link.getAttribute(
                            'href'
                        );


                    if (
                        !id ||
                        id === '#'
                    ) {

                        return;

                    }


                    const target =
                        document.querySelector(
                            id
                        );


                    if (!target) {

                        return;

                    }


                    event.preventDefault();


                    const header =
                        document.querySelector(
                            CONFIG.selectors.header
                        );


                    const offset =
                        header
                            ? header.offsetHeight
                            : 0;


                    const top =
                        target.getBoundingClientRect().top
                        +
                        window.scrollY
                        -
                        offset;


                    window.scrollTo({

                        top:
                            Math.max(
                                0,
                                top
                            ),

                        behavior:
                            prefersReducedMotion()
                                ? 'auto'
                                : 'smooth'

                    });

                }
            );

        }
    );

}


/* ============================================================
   ACTIVE NAVIGATION
   ============================================================ */

function initActiveNavigation() {

    const navLinks =
        document.querySelectorAll(
            CONFIG.selectors.navLinks
        );


    if (!navLinks.length) {

        return;

    }


    const sections =
        [];


    navLinks.forEach(
        link => {

            const href =
                link.getAttribute(
                    'href'
                );


            if (
                !href ||
                !href.startsWith('#')
            ) {

                return;

            }


            const section =
                document.querySelector(
                    href
                );


            if (!section) {

                return;

            }


            sections.push({

                section,

                link

            });

        }
    );


    if (!sections.length) {

        return;

    }


    if (
        !('IntersectionObserver' in window)
    ) {

        return;

    }


    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(
                    entry => {

                        if (
                            !entry.isIntersecting
                        ) {

                            return;

                        }


                        sections.forEach(
                            item => {

                                const active =
                                    item.section ===
                                    entry.target;


                                item.link.classList.toggle(
                                    CONFIG.classes.active,
                                    active
                                );


                                if (active) {

                                    item.link.setAttribute(
                                        'aria-current',
                                        'page'
                                    );

                                } else {

                                    item.link.removeAttribute(
                                        'aria-current'
                                    );

                                }

                            }
                        );

                    }
                );

            },
            {

                threshold:
                    0.25,

                rootMargin:
                    '-20% 0px -55% 0px'

            }
        );


    sections.forEach(
        item => {

            observer.observe(
                item.section
            );

        }
    );

}


/* ============================================================
   SCROLL REVEAL
   ============================================================ */

function initScrollReveal() {

    const elements =
        document.querySelectorAll(
            CONFIG.selectors.reveal
        );


    if (!elements.length) {

        return;

    }


    /*
     * NUEVO SISTEMA DE ARTISTAS
     *
     * Ya no buscamos .artist-profile.
     */

    const artistScenes =
        document.querySelectorAll(
            CONFIG.selectors.artistScenes
        );


    artistScenes.forEach(
        (
            scene,
            index
        ) => {

            scene.style.setProperty(
                '--artist-index',
                index
            );

        }
    );


    /*
     * Reduced Motion.
     */

    if (
        prefersReducedMotion()
    ) {

        elements.forEach(
            element => {

                element.classList.add(
                    CONFIG.classes.visible
                );

            }
        );


        return;

    }


    /*
     * Fallback.
     */

    if (
        !('IntersectionObserver' in window)
    ) {

        elements.forEach(
            element => {

                element.classList.add(
                    CONFIG.classes.visible
                );

            }
        );


        return;

    }


    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(
                    entry => {

                        if (
                            !entry.isIntersecting
                        ) {

                            return;

                        }


                        entry.target.classList.add(
                            CONFIG.classes.visible
                        );


                        observer.unobserve(
                            entry.target
                        );

                    }
                );

            },
            {

                threshold:
                    0.12,

                rootMargin:
                    '0px 0px -50px 0px'

            }
        );


    elements.forEach(
        element => {

            observer.observe(
                element
            );

        }
    );

}


/* ============================================================
   GENERIC CARD TILT
   ============================================================

   IMPORTANTE:
   Las nuevas escenas de artistas NO utilizan
   este sistema.
   ============================================================ */

function initTiltCards() {

    if (
        prefersReducedMotion()
    ) {

        return;

    }


    const cards =
        document.querySelectorAll(
            CONFIG.selectors.tilt
        );


    cards.forEach(
        card => {

            /*
             * Las escenas de artistas
             * tienen su propio sistema.
             */

            if (
                card.matches(
                    '.artist-scene'
                )
            ) {

                return;

            }


            let frame =
                null;


            let pointerX =
                0;


            let pointerY =
                0;


            let active =
                false;


            const update =
                () => {

                    frame =
                        null;


                    if (!active) {

                        return;

                    }


                    const rect =
                        card.getBoundingClientRect();


                    if (
                        rect.width === 0 ||
                        rect.height === 0
                    ) {

                        return;

                    }


                    const centerX =
                        rect.width / 2;


                    const centerY =
                        rect.height / 2;


                    const x =
                        pointerX -
                        rect.left;


                    const y =
                        pointerY -
                        rect.top;


                    const rotateX =
                        (
                            (y - centerY) /
                            centerY
                        ) * -3;


                    const rotateY =
                        (
                            (x - centerX) /
                            centerX
                        ) * 3;


                    card.style.transform =
                        `perspective(1000px)
                         rotateX(${rotateX}deg)
                         rotateY(${rotateY}deg)
                         translateY(-6px)`;

                };


            const requestUpdate =
                () => {

                    if (!frame) {

                        frame =
                            requestAnimationFrame(
                                update
                            );

                    }

                };


            card.addEventListener(
                'pointerenter',
                event => {

                    if (
                        window.innerWidth < 768
                    ) {

                        return;

                    }


                    active =
                        true;


                    pointerX =
                        event.clientX;


                    pointerY =
                        event.clientY;


                    requestUpdate();

                }
            );


            card.addEventListener(
                'pointermove',
                event => {

                    if (
                        window.innerWidth < 768
                    ) {

                        return;

                    }


                    pointerX =
                        event.clientX;


                    pointerY =
                        event.clientY;


                    requestUpdate();

                }
            );


            card.addEventListener(
                'pointerleave',
                () => {

                    active =
                        false;


                    if (frame) {

                        cancelAnimationFrame(
                            frame
                        );

                        frame =
                            null;

                    }


                    card.style.transform =
                        '';

                }
            );

        }
    );

}


/* ============================================================
   ARTISTAS
   ARCARIUS — THE LINEUP
   NUEVO SISTEMA
   ============================================================ */

function initArtists() {

    const section =
        document.querySelector(
            CONFIG.selectors.artists
        );


    if (!section) {

        return;

    }


    if (
        APP_STATE.artists.initialized
    ) {

        return;

    }


    APP_STATE.artists.initialized =
        true;


    const scenes =
        section.querySelectorAll(
            CONFIG.selectors.artistScenes
        );


    if (!scenes.length) {

        console.warn(
            'ARCARIUS: No se encontraron .artist-scene dentro de #artists.'
        );


        return;

    }


    /*
     * --------------------------------------------------------
     * PREPARACIÓN DE ESCENAS
     * --------------------------------------------------------
     */

    scenes.forEach(
        (
            scene,
            index
        ) => {

            scene.style.setProperty(
                '--artist-index',
                index
            );


            /*
             * Accesibilidad.
             */

            if (
                !scene.hasAttribute(
                    'tabindex'
                )
            ) {

                scene.setAttribute(
                    'tabindex',
                    '0'
                );

            }


            /*
             * Preparar imagen.
             */

            const image =
                scene.querySelector(
                    CONFIG.selectors.artistImage
                );


            if (!image) {

                console.warn(
                    'ARCARIUS: .artist-scene no contiene .artist-scene__image img.',
                    scene
                );


                scene.classList.add(
                    CONFIG.classes.artistError
                );


                return;

            }


            initArtistImage(
                image,
                scene
            );

        }
    );


    /*
     * --------------------------------------------------------
     * REDUCED MOTION
     * --------------------------------------------------------
     */

    if (
        prefersReducedMotion()
    ) {

        scenes.forEach(
            scene => {

                scene.classList.add(
                    CONFIG.classes.artistsActive
                );


                scene.style.setProperty(
                    '--artist-visible',
                    '1'
                );

            }
        );


        return;

    }


    /*
     * --------------------------------------------------------
     * DETECTAR TIPO DE DISPOSITIVO
     * --------------------------------------------------------
     *
     * Android / touch:
     * viewport + scroll.
     *
     * Desktop:
     * pointer + parallax.
     */

    const hasFinePointer =
        window.matchMedia(
            '(hover: hover) and (pointer: fine)'
        ).matches;


    const hasTouch =
        (
            'ontouchstart' in window
        ) ||
        (
            navigator.maxTouchPoints > 0
        );


    /*
     * Android / móviles.
     */

    if (
        hasTouch ||
        !hasFinePointer
    ) {

        initArtistMobileScenes(
            scenes
        );

    }


    /*
     * Desktop.
     */

    if (
        hasFinePointer &&
        !hasTouch
    ) {

        initArtistDesktopScenes(
            scenes
        );

    }


    /*
     * Teclado.
     */

    initArtistKeyboard(
        scenes
    );


    /*
     * Viewport.
     */

    initArtistSceneViewport(
        scenes
    );

}


/* ============================================================
   ARTIST IMAGE
   VERIFICACIÓN / CARGA
   ============================================================ */

function initArtistImage(
    image,
    scene
) {

    if (
        !image ||
        !scene
    ) {

        return;

    }


    /*
     * --------------------------------------------------------
     * CARGA CORRECTA
     * --------------------------------------------------------
     */

    const markLoaded =
        () => {

            image.classList.add(
                CONFIG.classes.artistLoaded
            );


            image.classList.remove(
                CONFIG.classes.artistError
            );


            scene.classList.add(
                CONFIG.classes.artistLoaded
            );


            scene.classList.remove(
                CONFIG.classes.artistError
            );

        };


    /*
     * --------------------------------------------------------
     * ERROR
     * --------------------------------------------------------
     */

    const markError =
        () => {

            image.classList.remove(
                CONFIG.classes.artistLoaded
            );


            image.classList.add(
                CONFIG.classes.artistError
            );


            scene.classList.remove(
                CONFIG.classes.artistLoaded
            );


            scene.classList.add(
                CONFIG.classes.artistError
            );


            console.error(
                'ARCARIUS: No se pudo cargar la imagen del artista:',
                image.currentSrc ||
                image.src
            );

        };


    /*
     * Eventos.
     */

    image.addEventListener(
        'load',
        markLoaded,
        {
            once:
                true
        }
    );


    image.addEventListener(
        'error',
        markError,
        {
            once:
                true
        }
    );


    /*
     * Si ya estaba cargada
     * antes de inicializar JS.
     */

    if (
        image.complete
    ) {

        if (
            image.naturalWidth > 0
        ) {

            markLoaded();

        } else {

            markError();

        }

    }

}


/* ============================================================
   ARTISTS
   MOBILE / ANDROID
   ACTIVACIÓN POR VIEWPORT
   ============================================================ */

function initArtistMobileScenes(
    scenes
) {

    /*
     * Android debe priorizar
     * scroll + viewport.
     */

    if (
        !('IntersectionObserver' in window)
    ) {

        scenes.forEach(
            scene => {

                scene.classList.add(
                    CONFIG.classes.artistsActive
                );


                scene.style.setProperty(
                    '--artist-visible',
                    '1'
                );

            }
        );


        return;

    }


    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(
                    entry => {

                        const scene =
                            entry.target;


                        if (
                            entry.isIntersecting
                        ) {

                            scene.classList.add(
                                CONFIG.classes.artistsActive
                            );


                            scene.style.setProperty(
                                '--artist-visible',
                                '1'
                            );

                        } else {

                            scene.classList.remove(
                                CONFIG.classes.artistsActive
                            );


                            scene.style.setProperty(
                                '--artist-visible',
                                '0'
                            );

                        }

                    }
                );

            },
            {

                threshold:
                    0.45,

                rootMargin:
                    '-8% 0px -8% 0px'

            }
        );


    scenes.forEach(
        scene => {

            observer.observe(
                scene
            );

        }
    );

}


/* ============================================================
   ARTISTS
   DESKTOP
   PARALLAX / PROFUNDIDAD
   ============================================================ */

function initArtistDesktopScenes(
    scenes
) {

    scenes.forEach(
        scene => {

            const media =
                scene.querySelector(
                    CONFIG.selectors.artistMedia
                );


            const image =
                scene.querySelector(
                    CONFIG.selectors.artistImage
                );


            if (
                !image
            ) {

                return;

            }


            let frame =
                null;


            let pointerX =
                0;


            let pointerY =
                0;


            let active =
                false;


            const update =
                () => {

                    frame =
                        null;


                    if (!active) {

                        return;

                    }


                    const rect =
                        scene.getBoundingClientRect();


                    if (
                        rect.width === 0 ||
                        rect.height === 0
                    ) {

                        return;

                    }


                    const relativeX =
                        (
                            pointerX -
                            rect.left
                        ) /
                        rect.width;


                    const relativeY =
                        (
                            pointerY -
                            rect.top
                        ) /
                        rect.height;


                    const normalizedX =
                        relativeX -
                        0.5;


                    const normalizedY =
                        relativeY -
                        0.5;


                    /*
                     * ------------------------------------------------
                     * MOVIMIENTO DE IMAGEN
                     * ------------------------------------------------
                     */

                    const imageX =
                        normalizedX *
                        -24;


                    const imageY =
                        normalizedY *
                        -18;


                    image.style.transform =
                        `scale(1.08)
                         translate3d(
                            ${imageX}px,
                            ${imageY}px,
                            0
                         )`;


                    /*
                     * ------------------------------------------------
                     * MEDIA
                     * ------------------------------------------------
                     */

                    if (media) {

                        const mediaX =
                            normalizedX *
                            6;


                        const mediaY =
                            normalizedY *
                            4;


                        media.style.transform =
                            `translate3d(
                                ${mediaX}px,
                                ${mediaY}px,
                                0
                            )`;

                    }


                    /*
                     * Variables CSS.
                     */

                    scene.style.setProperty(
                        '--artist-x',
                        `${relativeX * 100}%`
                    );


                    scene.style.setProperty(
                        '--artist-y',
                        `${relativeY * 100}%`
                    );

                };


            const requestUpdate =
                () => {

                    if (!frame) {

                        frame =
                            requestAnimationFrame(
                                update
                            );

                    }

                };


            /*
             * ENTRADA
             */

            scene.addEventListener(
                'pointerenter',
                event => {

                    active =
                        true;


                    scene.classList.add(
                        CONFIG.classes.artistsActive
                    );


                    scene.style.setProperty(
                        '--artist-visible',
                        '1'
                    );


                    pointerX =
                        event.clientX;


                    pointerY =
                        event.clientY;


                    requestUpdate();

                }
            );


            /*
             * MOVIMIENTO
             */

            scene.addEventListener(
                'pointermove',
                event => {

                    if (!active) {

                        return;

                    }


                    pointerX =
                        event.clientX;


                    pointerY =
                        event.clientY;


                    requestUpdate();

                }
            );


            /*
             * SALIDA
             */

            scene.addEventListener(
                'pointerleave',
                () => {

                    active =
                        false;


                    scene.classList.remove(
                        CONFIG.classes.artistsActive
                    );


                    if (frame) {

                        cancelAnimationFrame(
                            frame
                        );


                        frame =
                            null;

                    }


                    image.style.transform =
                        '';


                    if (media) {

                        media.style.transform =
                            '';

                    }


                    scene.style.removeProperty(
                        '--artist-x'
                    );


                    scene.style.removeProperty(
                        '--artist-y'
                    );

                }
            );

        }
    );

}


/* ============================================================
   ARTISTS
   KEYBOARD / ACCESSIBILITY
   ============================================================ */

function initArtistKeyboard(
    scenes
) {

    scenes.forEach(
        scene => {

            scene.addEventListener(
                'focus',
                () => {

                    scene.classList.add(
                        CONFIG.classes.artistsActive
                    );


                    scene.style.setProperty(
                        '--artist-visible',
                        '1'
                    );

                }
            );


            scene.addEventListener(
                'blur',
                () => {

                    /*
                     * En desktop quitamos
                     * el estado al perder foco.
                     *
                     * En móvil el viewport
                     * controla la escena.
                     */

                    if (
                        window.matchMedia(
                            '(hover: hover) and (pointer: fine)'
                        ).matches
                    ) {

                        scene.classList.remove(
                            CONFIG.classes.artistsActive
                        );

                    }

                }
            );


            scene.addEventListener(
                'keydown',
                event => {

                    if (
                        event.key === 'Enter' ||
                        event.key === ' '
                    ) {

                        event.preventDefault();


                        scene.classList.toggle(
                            CONFIG.classes.artistsActive
                        );


                        scene.style.setProperty(
                            '--artist-visible',
                            scene.classList.contains(
                                CONFIG.classes.artistsActive
                            )
                                ? '1'
                                : '0'
                        );

                    }

                }
            );

        }
    );

}


/* ============================================================
   ARTISTS
   VIEWPORT UNIVERSAL
   ============================================================ */

function initArtistSceneViewport(
    scenes
) {

    if (
        !('IntersectionObserver' in window)
    ) {

        scenes.forEach(
            scene => {

                scene.style.setProperty(
                    '--artist-visible',
                    '1'
                );

            }
        );


        return;

    }


    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(
                    entry => {

                        const scene =
                            entry.target;


                        if (
                            entry.isIntersecting
                        ) {

                            scene.style.setProperty(
                                '--artist-visible',
                                '1'
                            );

                        } else {

                            scene.style.setProperty(
                                '--artist-visible',
                                '0'
                            );

                        }

                    }
                );

            },
            {

                threshold:
                    0.25

            }
        );


    scenes.forEach(
        scene => {

            observer.observe(
                scene
            );

        }
    );

}


/* ============================================================
   EVENTOS
   ARCARIUS — THE GATEWAY
   ============================================================ */

function initEventsGateway() {

    const eventCard =
        document.querySelector(
            CONFIG.selectors.eventCard
        );


    const emptyState =
        document.querySelector(
            CONFIG.selectors.eventsEmpty
        );


    if (!eventCard) {

        console.warn(
            'ARCARIUS: No se encontró [data-event-card].'
        );


        return;

    }


    if (
        APP_STATE.events.initialized
    ) {

        return;

    }


    APP_STATE.events.initialized =
        true;


    /* ========================================================
       EVENTOS OFICIALES
       EDITAR ÚNICAMENTE ESTA LISTA
       ======================================================== */

    const events = [

        {

            date:
                '2026-10-24',

            title:
                'ARCARIUS FEST',

            location:
                'PUERTO COLOMBIA',

            description:
                'Una noche que no se repite. El territorio vuelve a abrirse.',

            image:
                'assets/images/events/arcarius-001.jpg',

            code:
                'ARC-001'

        },


        {

            date:
                '2026-12-20',

            title:
                'ARCARIUS — EDICIÓN ESPECIAL',

            location:
                'BARRANQUILLA',

            description:
                'Una nueva experiencia está a punto de comenzar.',

            image:
                'assets/images/events/arcarius-001.jpg',

            code:
                'ARC-002'

        }

    ];


    /* ========================================================
       ELEMENTOS
       ======================================================== */

    const eventDay =
        eventCard.querySelector(
            CONFIG.selectors.eventDay
        );


    const eventMonth =
        eventCard.querySelector(
            CONFIG.selectors.eventMonth
        );


    const eventYear =
        eventCard.querySelector(
            CONFIG.selectors.eventYear
        );


    const eventTitle =
        eventCard.querySelector(
            CONFIG.selectors.eventTitle
        );


    const eventLocation =
        eventCard.querySelector(
            CONFIG.selectors.eventLocation
        );


    const eventDescription =
        eventCard.querySelector(
            CONFIG.selectors.eventDescription
        );


    const eventIndex =
        eventCard.querySelector(
            CONFIG.selectors.eventIndex
        );


    const eventCode =
        eventCard.querySelector(
            CONFIG.selectors.eventCode
        );


    const eventVisual =
        eventCard.querySelector(
            CONFIG.selectors.eventVisual
        );


    const eventLink =
        eventCard.querySelector(
            CONFIG.selectors.eventLink
        );


    const nextButton =
        document.querySelector(
            CONFIG.selectors.eventNext
        );


    const previousButton =
        document.querySelector(
            CONFIG.selectors.eventPrevious
        );


    /* ========================================================
       FECHA LOCAL
       ======================================================== */

    function createLocalDate(
        dateString
    ) {

        if (
            typeof dateString !== 'string'
        ) {

            return new Date(
                NaN
            );

        }


        const parts =
            dateString
                .split('-')
                .map(Number);


        if (
            parts.length !== 3 ||
            parts.some(
                Number.isNaN
            )
        ) {

            return new Date(
                NaN
            );

        }


        const [
            year,
            month,
            day
        ] =
            parts;


        return new Date(
            year,
            month - 1,
            day
        );

    }


    /* ========================================================
       FECHA VÁLIDA
       ======================================================== */

    function isValidDate(
        dateString
    ) {

        const date =
            createLocalDate(
                dateString
            );


        return !Number.isNaN(
            date.getTime()
        );

    }


    /* ========================================================
       FORMATO DE FECHA
       ======================================================== */

    function getDateParts(
        dateString
    ) {

        const date =
            createLocalDate(
                dateString
            );


        if (
            Number.isNaN(
                date.getTime()
            )
        ) {

            return {

                day:
                    '--',

                month:
                    '---',

                year:
                    '----'

            };

        }


        const month =
            date
                .toLocaleString(
                    'es-ES',
                    {
                        month:
                            'short'
                    }
                )
                .replace(
                    '.',
                    ''
                )
                .toUpperCase();


        return {

            day:
                String(
                    date.getDate()
                ).padStart(
                    2,
                    '0'
                ),

            month,

            year:
                String(
                    date.getFullYear()
                )

        };

    }


    /* ========================================================
       IMAGEN DEL EVENTO
       ======================================================== */

    function loadEventImage(
        imagePath
    ) {

        if (!eventVisual) {

            return;

        }


        eventVisual.style.backgroundImage =
            '';


        eventVisual.classList.remove(
            'has-event-image'
        );


        if (
            !imagePath ||
            typeof imagePath !== 'string'
        ) {

            return;

        }


        let imageURL;


        try {

            imageURL =
                new URL(
                    imagePath,
                    document.baseURI
                ).href;

        } catch (error) {

            console.error(
                'ARCARIUS: Ruta de imagen inválida.',
                error
            );


            return;

        }


        const image =
            new Image();


        image.decoding =
            'async';


        image.onload =
            () => {

                eventVisual.style.backgroundImage =
                    `url("${imageURL}")`;


                eventVisual.classList.add(
                    'has-event-image'
                );

            };


        image.onerror =
            () => {

                console.warn(
                    'ARCARIUS: No se pudo cargar la imagen del evento:',
                    imageURL
                );


                eventVisual.style.backgroundImage =
                    '';


                eventVisual.classList.remove(
                    'has-event-image'
                );

            };


        image.src =
            imageURL;

    }


    /* ========================================================
       TRANSICIÓN
       ======================================================== */

    let transitionToken =
        0;


    let transitionTimer =
        null;


    /* ========================================================
       MOSTRAR EVENTO
       ======================================================== */

    function showEvent(
        event,
        index
    ) {

        if (!event) {

            return;

        }


        const date =
            getDateParts(
                event.date
            );


        const token =
            ++transitionToken;


        /*
         * Cancelar transición anterior.
         */

        if (transitionTimer) {

            clearTimeout(
                transitionTimer
            );

        }


        eventCard.classList.remove(
            CONFIG.classes.visible
        );


        eventCard.classList.add(
            CONFIG.classes.changing
        );


        transitionTimer =
            window.setTimeout(
                () => {

                    if (
                        token !==
                        transitionToken
                    ) {

                        return;

                    }


                    /*
                     * Fecha.
                     */

                    if (eventDay) {

                        eventDay.textContent =
                            date.day;

                    }


                    if (eventMonth) {

                        eventMonth.textContent =
                            date.month;

                    }


                    if (eventYear) {

                        eventYear.textContent =
                            date.year;

                    }


                    /*
                     * Información.
                     */

                    if (eventTitle) {

                        eventTitle.textContent =
                            event.title || '';

                    }


                    if (eventLocation) {

                        eventLocation.textContent =
                            event.location || '';

                    }


                    if (eventDescription) {

                        eventDescription.textContent =
                            event.description || '';

                    }


                    /*
                     * Índice.
                     */

                    if (eventIndex) {

                        eventIndex.textContent =
                            String(
                                index + 1
                            ).padStart(
                                2,
                                '0'
                            );

                    }


                    /*
                     * Código.
                     */

                    if (eventCode) {

                        eventCode.textContent =
                            event.code ||
                            `ARC-${
                                String(
                                    index + 1
                                ).padStart(
                                    3,
                                    '0'
                                )
                            }`;

                    }


                    /*
                     * Imagen.
                     */

                    loadEventImage(
                        event.image
                    );


                    /*
                     * Link.
                     */

                    if (eventLink) {

                        eventLink.setAttribute(
                            'aria-label',
                            `Entrar al evento ${
                                event.title ||
                                'Arcarius'
                            }`
                        );

                    }


                    /*
                     * Accesibilidad.
                     */

                    eventCard.setAttribute(
                        'aria-label',
                        `${
                            event.title ||
                            'Evento Arcarius'
                        }, ${
                            date.day
                        } ${
                            date.month
                        } ${
                            date.year
                        }, ${
                            event.location ||
                            ''
                        }`
                    );


                    eventCard.classList.remove(
                        CONFIG.classes.changing
                    );


                    requestAnimationFrame(
                        () => {

                            requestAnimationFrame(
                                () => {

                                    if (
                                        token !==
                                        transitionToken
                                    ) {

                                        return;

                                    }


                                    eventCard.classList.add(
                                        CONFIG.classes.visible
                                    );

                                }
                            );

                        }
                    );

                },
                CONFIG.timings.eventTransition
            );

    }


    /* ========================================================
       ORDENAR EVENTOS
       ======================================================== */

    const sortedEvents =
        [...events]
            .filter(
                event => {

                    return (
                        event &&
                        event.date &&
                        isValidDate(
                            event.date
                        )
                    );

                }
            )
            .sort(
                (
                    first,
                    second
                ) => {

                    return (
                        createLocalDate(
                            first.date
                        ) -
                        createLocalDate(
                            second.date
                        )
                    );

                }
            );


    /* ========================================================
       SIN EVENTOS
       ======================================================== */

    if (
        sortedEvents.length === 0
    ) {

        eventCard.hidden =
            true;


        eventCard.classList.remove(
            CONFIG.classes.visible
        );


        if (emptyState) {

            emptyState.hidden =
                false;

        }


        if (nextButton) {

            nextButton.disabled =
                true;

        }


        if (previousButton) {

            previousButton.disabled =
                true;

        }


        window.ArcariusEvents =
            [];


        window.ArcariusEventGateway =
            null;


        return;

    }


    /* ========================================================
       EVENTOS DISPONIBLES
       ======================================================== */

    eventCard.hidden =
        false;


    if (emptyState) {

        emptyState.hidden =
            true;

    }


    window.ArcariusEvents =
        sortedEvents;


    let currentIndex =
        0;


    APP_STATE.events.currentIndex =
        currentIndex;


    /* ========================================================
       CONTROLES
       ======================================================== */

    function updateEventControls() {

        const disabled =
            sortedEvents.length <= 1;


        if (nextButton) {

            nextButton.disabled =
                disabled;

        }


        if (previousButton) {

            previousButton.disabled =
                disabled;

        }


        if (
            sortedEvents.length <= 1
        ) {

            eventCard.classList.add(
                'is-single-event'
            );

        } else {

            eventCard.classList.remove(
                'is-single-event'
            );

        }

    }


    /* ========================================================
       CAMBIAR EVENTO
       ======================================================== */

    function changeEvent(
        direction
    ) {

        if (
            sortedEvents.length <= 1
        ) {

            return;

        }


        currentIndex +=
            direction;


        if (
            currentIndex < 0
        ) {

            currentIndex =
                sortedEvents.length - 1;

        }


        if (
            currentIndex >=
            sortedEvents.length
        ) {

            currentIndex =
                0;

        }


        APP_STATE.events.currentIndex =
            currentIndex;


        showEvent(
            sortedEvents[
                currentIndex
            ],
            currentIndex
        );

    }


    /* ========================================================
       BOTÓN SIGUIENTE
       ======================================================== */

    if (nextButton) {

        nextButton.addEventListener(
            'click',
            event => {

                event.preventDefault();

                changeEvent(
                    1
                );

            }
        );

    }


    /* ========================================================
       BOTÓN ANTERIOR
       ======================================================== */

    if (previousButton) {

        previousButton.addEventListener(
            'click',
            event => {

                event.preventDefault();

                changeEvent(
                    -1
                );

            }
        );

    }


    updateEventControls();


    /* ========================================================
       API PÚBLICA DE EVENTOS
       ======================================================== */

    window.ArcariusEventGateway = {

        next() {

            changeEvent(
                1
            );

        },


        previous() {

            changeEvent(
                -1
            );

        },


        goTo(
            index
        ) {

            if (
                index < 0 ||
                index >= sortedEvents.length
            ) {

                return;

            }


            currentIndex =
                index;


            APP_STATE.events.currentIndex =
                currentIndex;


            showEvent(
                sortedEvents[
                    currentIndex
                ],
                currentIndex
            );

        },


        getCurrent() {

            return {

                index:
                    currentIndex,

                event:
                    sortedEvents[
                        currentIndex
                    ]

            };

        },


        getAll() {

            return [
                ...sortedEvents
            ];

        }

    };


    /* ========================================================
       PRIMER EVENTO
       ======================================================== */

    showEvent(
        sortedEvents[0],
        0
    );

}


/* ============================================================
   GALERÍA
   ARCARIUS — VISUAL ARCHIVE
   ROOTS EXPERIENCE
   ============================================================ */

function initGallery() {

    const section =
        document.querySelector(
            CONFIG.selectors.gallery
        );


    if (!section) {

        return;

    }


    if (
        APP_STATE.gallery.initialized
    ) {

        return;

    }


    APP_STATE.gallery.initialized =
        true;


    const items =
        section.querySelectorAll(
            CONFIG.selectors.galleryItems
        );


    if (!items.length) {

        console.warn(
            'ARCARIUS: No se encontraron elementos [data-gallery-item] dentro de #gallery.'
        );


        return;

    }


    /*
     * --------------------------------------------------------
     * PREPARACIÓN
     * --------------------------------------------------------
     */

    items.forEach(
        (
            item,
            index
        ) => {

            item.style.setProperty(
                '--gallery-index',
                index
            );


            const image =
                item.querySelector(
                    CONFIG.selectors.galleryImages
                );


            if (!image) {

                item.classList.add(
                    CONFIG.classes.galleryError
                );


                console.warn(
                    'ARCARIUS: Elemento de galería sin imagen.',
                    item
                );


                return;

            }


            initGalleryImage(
                image,
                item
            );

        }
    );


    /*
     * --------------------------------------------------------
     * REDUCED MOTION
     * --------------------------------------------------------
     */

    if (
        prefersReducedMotion()
    ) {

        items.forEach(
            item => {

                item.classList.add(
                    CONFIG.classes.visible
                );


                item.style.setProperty(
                    '--gallery-progress',
                    '1'
                );

            }
        );


        initGalleryImages(
            items
        );


        return;

    }


    /*
     * --------------------------------------------------------
     * VIEWPORT
     * --------------------------------------------------------
     */

    initGalleryViewport(
        items
    );


    /*
     * --------------------------------------------------------
     * RAÍCES
     * --------------------------------------------------------
     */

    initGalleryRoots(
        section
    );


    /*
     * --------------------------------------------------------
     * PARALLAX DESKTOP
     * --------------------------------------------------------
     */

    const hasFinePointer =
        window.matchMedia(
            '(hover: hover) and (pointer: fine)'
        ).matches;


    const hasTouch =
        (
            'ontouchstart' in window
        ) ||
        (
            navigator.maxTouchPoints > 0
        );


    if (
        hasFinePointer &&
        !hasTouch
    ) {

        initGalleryPointer(
            items
        );

    }


    /*
     * --------------------------------------------------------
     * TOUCH / ANDROID
     * --------------------------------------------------------
     */

    if (
        hasTouch ||
        !hasFinePointer
    ) {

        initGalleryTouchFocus(
            items
        );

    }


    /*
     * --------------------------------------------------------
     * CARGA
     * --------------------------------------------------------
     */

    initGalleryImages(
        items
    );

}


/* ============================================================
   GALLERY
   CARGA DE IMÁGENES
   ============================================================ */

function initGalleryImage(
    image,
    item
) {

    if (
        !image ||
        !item
    ) {

        return;

    }


    const markLoaded =
        () => {

            image.classList.add(
                CONFIG.classes.galleryLoaded
            );


            image.classList.remove(
                CONFIG.classes.galleryError
            );


            item.classList.add(
                CONFIG.classes.galleryLoaded
            );


            item.classList.remove(
                CONFIG.classes.galleryError
            );

        };


    const markError =
        () => {

            image.classList.remove(
                CONFIG.classes.galleryLoaded
            );


            image.classList.add(
                CONFIG.classes.galleryError
            );


            item.classList.remove(
                CONFIG.classes.galleryLoaded
            );


            item.classList.add(
                CONFIG.classes.galleryError
            );


            console.error(
                'ARCARIUS: No se pudo cargar la imagen de la galería:',
                image.currentSrc ||
                image.src
            );

        };


    image.addEventListener(
        'load',
        markLoaded,
        {
            once:
                true
        }
    );


    image.addEventListener(
        'error',
        markError,
        {
            once:
                true
        }
    );


    /*
     * La imagen puede haber terminado
     * de cargar antes de inicializar JS.
     */

    if (
        image.complete
    ) {

        if (
            image.naturalWidth > 0
        ) {

            markLoaded();

        } else {

            markError();

        }

    }

}


/* ============================================================
   GALLERY
   REVELADO POR IMAGEN
   ============================================================ */

function initGalleryImages(
    items
) {

    items.forEach(
        item => {

            const image =
                item.querySelector(
                    CONFIG.selectors.galleryImages
                );


            if (!image) {

                return;

            }


            /*
             * Si ya está disponible,
             * marcar inmediatamente.
             */

            if (
                image.complete &&
                image.naturalWidth > 0
            ) {

                item.classList.add(
                    CONFIG.classes.galleryLoaded
                );


                image.classList.add(
                    CONFIG.classes.galleryLoaded
                );

            }

        }
    );

}


/* ============================================================
   GALLERY
   VIEWPORT / REVEAL
   ============================================================ */

function initGalleryViewport(
    items
) {

    if (
        !('IntersectionObserver' in window)
    ) {

        items.forEach(
            item => {

                item.classList.add(
                    CONFIG.classes.visible
                );


                item.style.setProperty(
                    '--gallery-progress',
                    '1'
                );

            }
        );


        return;

    }


    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(
                    entry => {

                        const item =
                            entry.target;


                        if (
                            entry.isIntersecting
                        ) {

                            item.classList.add(
                                CONFIG.classes.visible
                            );


                            item.style.setProperty(
                                '--gallery-progress',
                                '1'
                            );


                            observer.unobserve(
                                item
                            );

                        }

                    }
                );

            },
            {

                threshold:
                    0.16,

                rootMargin:
                    '0px 0px -60px 0px'

            }
        );


    items.forEach(
        item => {

            observer.observe(
                item
            );

        }
    );

}


/* ============================================================
   GALLERY
   RAÍCES / MOVIMIENTO ORGÁNICO
   ============================================================ */

function initGalleryRoots(
    section
) {

    const roots =
        section.querySelectorAll(
            CONFIG.selectors.galleryRoots
        );


    const field =
        section.querySelector(
            CONFIG.selectors.galleryField
        );


    if (
        !roots.length ||
        !field
    ) {

        return;

    }


    /*
     * En dispositivos con movimiento reducido
     * dejamos las raíces quietas.
     */

    if (
        prefersReducedMotion()
    ) {

        return;

    }


    let frame =
        null;


    let ticking =
        false;


    const update =
        () => {

            frame =
                null;

            ticking =
                false;


            const rect =
                field.getBoundingClientRect();


            const viewportHeight =
                window.innerHeight ||
                document.documentElement.clientHeight;


            if (
                rect.height <= 0
            ) {

                return;

            }


            const center =
                viewportHeight / 2;


            const fieldCenter =
                rect.top +
                (
                    rect.height / 2
                );


            const distance =
                (
                    center -
                    fieldCenter
                ) /
                viewportHeight;


            const clamped =
                Math.max(
                    -1,
                    Math.min(
                        1,
                        distance
                    )
                );


            roots.forEach(
                (
                    root,
                    index
                ) => {

                    const multiplier =
                        (
                            index % 2 === 0
                        )
                            ? 14
                            : -11;


                    const y =
                        clamped *
                        multiplier;


                    root.style.setProperty(
                        '--root-scroll-y',
                        `${y}px`
                    );

                }
            );

        };


    const requestUpdate =
        () => {

            if (ticking) {

                return;

            }


            ticking =
                true;


            frame =
                requestAnimationFrame(
                    update
                );

        };


    window.addEventListener(
        'scroll',
        requestUpdate,
        {
            passive:
                true
        }
    );


    window.addEventListener(
        'resize',
        requestUpdate,
        {
            passive:
                true
        }
    );


    requestUpdate();

}


/* ============================================================
   GALLERY
   DESKTOP PARALLAX
   ============================================================ */

function initGalleryPointer(
    items
) {

    items.forEach(
        item => {

            const image =
                item.querySelector(
                    CONFIG.selectors.galleryImages
                );


            const light =
                item.querySelector(
                    '.gallery-item__light'
                );


            if (!image) {

                return;

            }


            let frame =
                null;


            let pointerX =
                0;


            let pointerY =
                0;


            let active =
                false;


            const update =
                () => {

                    frame =
                        null;


                    if (!active) {

                        return;

                    }


                    const rect =
                        item.getBoundingClientRect();


                    if (
                        rect.width <= 0 ||
                        rect.height <= 0
                    ) {

                        return;

                    }


                    const relativeX =
                        (
                            pointerX -
                            rect.left
                        ) /
                        rect.width;


                    const relativeY =
                        (
                            pointerY -
                            rect.top
                        ) /
                        rect.height;


                    const normalizedX =
                        relativeX -
                        0.5;


                    const normalizedY =
                        relativeY -
                        0.5;


                    /*
                     * Movimiento fotográfico.
                     */

                    const imageX =
                        normalizedX *
                        -18;


                    const imageY =
                        normalizedY *
                        -14;


                    image.style.transform =
                        `scale(1.07)
                         translate3d(
                            ${imageX}px,
                            ${imageY}px,
                            0
                         )`;


                    /*
                     * Luz.
                     */

                    if (light) {

                        const lightX =
                            relativeX *
                            100;


                        const lightY =
                            relativeY *
                            100;


                        light.style.setProperty(
                            '--gallery-light-x',
                            `${lightX}%`
                        );


                        light.style.setProperty(
                            '--gallery-light-y',
                            `${lightY}%`
                        );

                    }


                    /*
                     * Coordenadas disponibles
                     * para CSS.
                     */

                    item.style.setProperty(
                        '--gallery-pointer-x',
                        `${relativeX * 100}%`
                    );


                    item.style.setProperty(
                        '--gallery-pointer-y',
                        `${relativeY * 100}%`
                    );

                };


            const requestUpdate =
                () => {

                    if (!frame) {

                        frame =
                            requestAnimationFrame(
                                update
                            );

                    }

                };


            /*
             * ENTRADA
             */

            item.addEventListener(
                'pointerenter',
                event => {

                    active =
                        true;


                    item.classList.add(
                        'is-hovering'
                    );


                    pointerX =
                        event.clientX;


                    pointerY =
                        event.clientY;


                    requestUpdate();

                }
            );


            /*
             * MOVIMIENTO
             */

            item.addEventListener(
                'pointermove',
                event => {

                    if (!active) {

                        return;

                    }


                    pointerX =
                        event.clientX;


                    pointerY =
                        event.clientY;


                    requestUpdate();

                }
            );


            /*
             * SALIDA
             */

            item.addEventListener(
                'pointerleave',
                () => {

                    active =
                        false;


                    item.classList.remove(
                        'is-hovering'
                    );


                    if (frame) {

                        cancelAnimationFrame(
                            frame
                        );


                        frame =
                            null;

                    }


                    /*
                     * Volver al estado natural.
                     */

                    image.style.transform =
                        '';


                    item.style.removeProperty(
                        '--gallery-pointer-x'
                    );


                    item.style.removeProperty(
                        '--gallery-pointer-y'
                    );


                    if (light) {

                        light.style.removeProperty(
                            '--gallery-light-x'
                        );


                        light.style.removeProperty(
                            '--gallery-light-y'
                        );

                    }

                }
            );

        }
    );

}


/* ============================================================
   GALLERY
   TOUCH / ANDROID
   ============================================================ */

function initGalleryTouchFocus(
    items
) {

    items.forEach(
        item => {

            item.addEventListener(
                'click',
                event => {

                    /*
                     * No interferir con enlaces
                     * internos o externos si algún
                     * día se agregan.
                     */

                    if (
                        event.target.closest(
                            'a'
                        )
                    ) {

                        return;

                    }


                    const alreadyFocused =
                        item.classList.contains(
                            CONFIG.classes.galleryFocus
                        );


                    /*
                     * Cerrar todas las demás.
                     */

                    items.forEach(
                        otherItem => {

                            if (
                                otherItem !== item
                            ) {

                                otherItem.classList.remove(
                                    CONFIG.classes.galleryFocus
                                );

                            }

                        }
                    );


                    /*
                     * Alternar actual.
                     */

                    item.classList.toggle(
                        CONFIG.classes.galleryFocus,
                        !alreadyFocused
                    );

                }
            );

        }
    );


    /*
     * Al tocar fuera de una fotografía,
     * cerrar el foco activo.
     */

    document.addEventListener(
        'pointerdown',
        event => {

            if (
                event.target.closest(
                    '[data-gallery-item]'
                )
            ) {

                return;

            }


            items.forEach(
                item => {

                    item.classList.remove(
                        CONFIG.classes.galleryFocus
                    );

                }
            );

        },
        {
            passive:
                true
        }
    );

}



/* ============================================================
   TICKETS
   ============================================================ */

function initTicket() {

    const tickets =
        document.querySelectorAll(
            CONFIG.selectors.ticket
        );


    if (!tickets.length) {

        return;

    }


    tickets.forEach(
        ticket => {

            /*
             * Estado inicial:
             * el botón queda preparado para
             * recibir posteriormente la URL
             * oficial de la plataforma externa.
             */

            const href =
                ticket.getAttribute('href');


            /*
             * Si todavía no existe una
             * URL oficial, evitamos que
             * el usuario sea enviado a "#".
             */

            if (
                !href ||
                href === '#' ||
                href.trim() === ''
            ) {

                ticket.setAttribute(
                    'aria-disabled',
                    'true'
                );


                ticket.addEventListener(
                    'click',
                    event => {

                        event.preventDefault();


                        console.info(
                            'Arcarius Fest: falta configurar la URL oficial de boletería.'
                        );

                    }
                );

            }


            /*
             * Si posteriormente se configura
             * una URL externa real, el enlace
             * funcionará normalmente.
             *
             * El HTML ya utiliza:
             *
             * target="_blank"
             * rel="noopener noreferrer"
             *
             * por lo que la plataforma externa
             * se abrirá en una nueva pestaña.
             */

        }
    );

}


/* ============================================================
   FOOTER
   AÑO ACTUAL
   ============================================================ */

function initCurrentYear() {

    const elements =
        document.querySelectorAll(
            CONFIG.selectors.currentYear
        );


    if (!elements.length) {

        return;

    }


    const year =
        new Date()
            .getFullYear();


    elements.forEach(
        element => {

            element.textContent =
                year;

        }
    );

}


/* ============================================================
   REDUCED MOTION
   ============================================================ */

function prefersReducedMotion() {

    if (
        !window.matchMedia
    ) {

        return false;

    }


    return window.matchMedia(
        '(prefers-reduced-motion: reduce)'
    ).matches;

}


/* ============================================================
   SEGURIDAD
   HTML ESCAPING
   ============================================================ */

function escapeHTML(
    value
) {

    return String(
        value
    )

        .replace(
            /&/g,
            '&amp;'
        )

        .replace(
            /</g,
            '&lt;'
        )

        .replace(
            />/g,
            '&gt;'
        )

        .replace(
            /"/g,
            '&quot;'
        )

        .replace(
            /'/g,
            '&#039;'
        );

}


/* ============================================================
   ARCARIUS GLOBAL
   API INTERNA
   ============================================================ */

window.ArcariusFest = {

    prefersReducedMotion,


    /* --------------------------------------------------------
       CERRAR MENÚ
       -------------------------------------------------------- */

    closeMobileMenu() {

        const menu =
            document.querySelector(
                CONFIG.selectors.mobileMenu
            );


        const toggle =
            document.querySelector(
                CONFIG.selectors.menuToggle
            );


        if (!menu) {

            return;

        }


        menu.classList.remove(
            CONFIG.classes.open
        );


        toggle?.classList.remove(
            CONFIG.classes.open
        );


        toggle?.setAttribute(
            'aria-expanded',
            'false'
        );


        menu.setAttribute(
            'aria-hidden',
            'true'
        );


        document.body.classList.remove(
            CONFIG.classes.modal
        );

    },


    /* --------------------------------------------------------
       OBTENER EVENTOS
       -------------------------------------------------------- */

    getEvents() {

        return (
            window.ArcariusEvents ||
            []
        );

    },


    /* --------------------------------------------------------
       SIGUIENTE EVENTO
       -------------------------------------------------------- */

    nextEvent() {

        if (
            window.ArcariusEventGateway
        ) {

            window.ArcariusEventGateway.next();

        }

    },


    /* --------------------------------------------------------
       EVENTO ANTERIOR
       -------------------------------------------------------- */

    previousEvent() {

        if (
            window.ArcariusEventGateway
        ) {

            window.ArcariusEventGateway.previous();

        }

    },


    /* --------------------------------------------------------
       IR A EVENTO
       -------------------------------------------------------- */

    goToEvent(
        index
    ) {

        if (
            window.ArcariusEventGateway
        ) {

            window.ArcariusEventGateway.goTo(
                index
            );

        }

    },


    /* --------------------------------------------------------
       OBTENER EVENTO ACTUAL
       -------------------------------------------------------- */

    getCurrentEvent() {

        if (
            window.ArcariusEventGateway
        ) {

            return (
                window.ArcariusEventGateway.getCurrent()
            );

        }


        return null;

    },


    /* --------------------------------------------------------
       GALERÍA
       OBTENER ELEMENTOS
       -------------------------------------------------------- */

    getGalleryItems() {

        return Array.from(
            document.querySelectorAll(
                CONFIG.selectors.galleryItems
            )
        );

    },


    /* --------------------------------------------------------
       GALERÍA
       ACTIVAR / DESACTIVAR FOCO
       -------------------------------------------------------- */

    focusGalleryItem(
        index
    ) {

        const items =
            document.querySelectorAll(
                CONFIG.selectors.galleryItems
            );


        if (
            index < 0 ||
            index >= items.length
        ) {

            return;

        }


        items.forEach(
            item => {

                item.classList.remove(
                    CONFIG.classes.galleryFocus
                );

            }
        );


        items[index].classList.add(
            CONFIG.classes.galleryFocus
        );

    }

};


/* ============================================================
   END
   ============================================================ */
