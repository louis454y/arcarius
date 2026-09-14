
/* ============================================================
   ARCARIUS FEST
   APP.JS
   PREMIUM / ELITE
   ============================================================ */

'use strict';


/* ============================================================
   CONFIG
   ============================================================ */

const CONFIG = {

    selectors: {

        body: document.body,

        /* PRELOADER */
        preloader: '#preloader',

        /* HEADER */
        header: '#site-header',
        menuToggle: '#menu-toggle',
        mobileMenu: '#mobile-menu',
        menuClose: '[data-menu-close]',
        menuLinks: '[data-menu-link]',
        navLinks: '.nav-link',

        /* GLOBAL REVEAL */
        reveal: '[data-reveal]',
        tilt: '[data-tilt]',

        /* CALENDAR */
        calendarGrid: '[data-calendar-grid]',
        calendarMonth: '[data-calendar-month]',
        calendarPrev: '[data-calendar-prev]',
        calendarNext: '[data-calendar-next]',
        selectedEvent: '#selected-event',

        /* FOOTER */
        currentYear: '[data-current-year]',

        /* TICKETS */
        ticket: '[data-ticket-external]',

        /* HERO */
        hero: '#home',
        heroVideo: '.hero__video',
        heroReveal: '[data-hero-reveal]',
        heroTitle: '[data-hero-title]',
        heroLines: '[data-hero-line]'

    },


    classes: {

        open: 'is-open',

        hidden: 'is-hidden',

        loaded: 'is-loaded',

        loading: 'is-loading',

        visible: 'is-visible',

        scrolled: 'is-scrolled',

        active: 'is-active',

        modal: 'modal-open',

        heroEntering: 'is-entering',

        heroEntered: 'is-entered'

    }

};


/* ============================================================
   INIT
   ORDEN GENERAL DEL SITIO
   ============================================================ */

document.addEventListener(
    'DOMContentLoaded',
    () => {

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


        /*
         * 06 — EXPERIENCIA / SECCIONES
         */

        initScrollReveal();

        initTiltCards();


        /*
         * 07 — EVENTOS
         */

        initCalendar();


        /*
         * 08 — TICKETS
         */

        initTicket();


        /*
         * 09 — FOOTER
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
     * continuamos directamente
     * con el sitio.
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


    /*
     * Duración total:
     *
     * 5 segundos.
     */

    const duration =
        5000;


    const start =
        performance.now();


    let completed =
        false;


    /*
     * Curva de progreso.
     *
     * Comienza suave,
     * acelera en el centro
     * y desacelera al final.
     */

    const easeProgress =
        (value) => {

            return (
                1 -
                Math.pow(
                    1 - value,
                    1.45
                )
            );

        };


    /*
     * Actualizar contador
     * y barra.
     */

    const updateProgress =
        (value) => {

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
     * APERTURA
     */

    const openTerritory =
        () => {

            if (completed) {
                return;
            }


            completed = true;


            updateProgress(
                100
            );


            /*
             * Pequeña pausa
             * después del 100%.
             */

            setTimeout(
                () => {

                    preloader.classList.add(
                        'is-opening'
                    );

                },
                180
            );


            /*
             * El territorio se abre.
             *
             * En este momento
             * avisamos al Hero.
             */

            setTimeout(
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


            /*
             * Limpieza definitiva.
             */

            setTimeout(
                () => {

                    preloader.style.display =
                        'none';

                },
                1800
            );

        };


    /*
     * ANIMACIÓN DEL CONTADOR
     */

    const animate =
        (now) => {

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
                rawProgress <
                1
            ) {

                requestAnimationFrame(
                    animate
                );

            } else {

                openTerritory();

            }

        };


    /*
     * Comenzamos en 01%.
     */

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


    const update =
        () => {

            if (
                window.scrollY > 40
            ) {

                header.classList.add(
                    CONFIG.classes.scrolled
                );

            } else {

                header.classList.remove(
                    CONFIG.classes.scrolled
                );

            }

        };


    update();


    window.addEventListener(
        'scroll',
        update,
        {
            passive: true
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


    /*
     * El Hero permanece preparado
     * mientras el territorio está
     * cargando.
     */

    hero.classList.add(
        CONFIG.classes.heroEntering
    );


    /*
     * Cuando el preloader termina,
     * liberamos el Hero.
     */

    document.addEventListener(
        'arcarius:territory-open',
        () => {

            revealHero(
                hero
            );

        },
        {
            once: true
        }
    );


    /*
     * Seguridad:
     *
     * Si el preloader no existe
     * y el body ya está cargado,
     * mostramos el Hero.
     */

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


/*
 * Revelar Hero.
 */

function revealHero(hero) {

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


    /*
     * Dejamos que el CSS controle
     * la coreografía visual.
     *
     * El JS únicamente marca
     * el momento de entrada.
     */

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


    /*
     * Entrada escalonada de elementos.
     */

    revealElements.forEach(
        (element, index) => {

            setTimeout(
                () => {

                    element.classList.add(
                        CONFIG.classes.visible
                    );

                },
                150 + (index * 110)
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


    /*
     * Si el usuario solicita
     * menos movimiento,
     * detenemos el video.
     */

    if (
        prefersReducedMotion()
    ) {

        video.pause();

        return;

    }


    /*
     * Intentamos reproducirlo.
     */

    video.play()
        .catch(
            () => {

                /*
                 * Algunos navegadores
                 * pueden bloquear autoplay.
                 */

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
     * ABRIR MENÚ
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
     * CERRAR MENÚ
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
     * BOTÓN PRINCIPAL
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
     * ELEMENTOS DE CIERRE
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
     * LINKS DEL MENÚ
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
     * ESCAPE
     */

    document.addEventListener(
        'keydown',
        event => {

            if (
                event.key === 'Escape'
            ) {

                closeMenu();

            }

        }
    );


    /*
     * DESKTOP
     */

    window.addEventListener(
        'resize',
        () => {

            if (
                window.innerWidth > 1024
            ) {

                closeMenu();

            }

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
                        target
                            .getBoundingClientRect()
                            .top
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
     * Intersection Observer.
     */

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
   CARD TILT
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
             * Movimiento del cursor.
             */

            card.addEventListener(
                'pointermove',
                event => {

                    /*
                     * En móvil no aplicamos
                     * el efecto 3D.
                     */

                    if (
                        window.innerWidth < 768
                    ) {

                        return;

                    }


                    const rect =
                        card.getBoundingClientRect();


                    const x =
                        event.clientX -
                        rect.left;


                    const y =
                        event.clientY -
                        rect.top;


                    const centerX =
                        rect.width / 2;


                    const centerY =
                        rect.height / 2;


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

                }
            );


            /*
             * Regresar a posición
             * original.
             */

            card.addEventListener(
                'pointerleave',
                () => {

                    card.style.transform =
                        '';

                }
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
            '[data-event-card]'
        );

    const emptyState =
        document.querySelector(
            '[data-events-empty]'
        );

    if (!eventCard) {
        console.warn(
            'ARCARIUS: No se encontró [data-event-card].'
        );

        return;
    }


    /* ========================================================
       EVENTOS ARCARIUS — EDITAR AQUÍ
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
                'assets/imagenes/eventos/arcarius-001.jpg',

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
            '[data-event-day]'
        );

    const eventMonth =
        eventCard.querySelector(
            '[data-event-month]'
        );

    const eventYear =
        eventCard.querySelector(
            '[data-event-year]'
        );

    const eventTitle =
        eventCard.querySelector(
            '[data-event-title]'
        );

    const eventLocation =
        eventCard.querySelector(
            '[data-event-location]'
        );

    const eventDescription =
        eventCard.querySelector(
            '[data-event-description]'
        );

    const eventIndex =
        eventCard.querySelector(
            '[data-event-index]'
        );

    const eventCode =
        eventCard.querySelector(
            '[data-event-code]'
        );

    const eventVisual =
        eventCard.querySelector(
            '[data-event-visual]'
        );

    const eventLink =
        eventCard.querySelector(
            '[data-event-link]'
        );


    /* ========================================================
       FECHA LOCAL
       ======================================================== */

    function createLocalDate(
        dateString
    ) {

        const [
            year,
            month,
            day
        ] =
            dateString
                .split('-')
                .map(Number);

        return new Date(
            year,
            month - 1,
            day
        );
    }


    /* ========================================================
       FORMATEAR FECHA
       ======================================================== */

    function getDateParts(
        dateString
    ) {

        const date =
            createLocalDate(
                dateString
            );

        const month =
            date
                .toLocaleString(
                    'es-ES',
                    {
                        month: 'short'
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

            console.warn(
                'ARCARIUS: No se encontró [data-event-visual].'
            );

            return;
        }


        /* ----------------------------------------------------
           Limpiar imagen anterior
           ---------------------------------------------------- */

        eventVisual.style.backgroundImage =
            '';


        eventVisual.classList.remove(
            'has-event-image'
        );


        /* ----------------------------------------------------
           Evento sin imagen
           ---------------------------------------------------- */

        if (
            !imagePath ||
            typeof imagePath !== 'string'
        ) {

            console.info(
                'ARCARIUS: Este evento no tiene imagen.'
            );

            return;
        }


        /* ----------------------------------------------------
           Convertir la ruta en URL absoluta
           ---------------------------------------------------- */

        let imageURL;

        try {

            imageURL =
                new URL(
                    imagePath,
                    document.baseURI
                ).href;

        } catch (error) {

            console.error(
                'ARCARIUS: Ruta de imagen inválida:',
                imagePath,
                error
            );

            return;
        }


        console.log(
            'ARCARIUS: Intentando cargar imagen:',
            imageURL
        );


        /* ----------------------------------------------------
           Precargar imagen
           ---------------------------------------------------- */

        const image =
            new Image();


        image.onload =
            function () {

                console.log(
                    'ARCARIUS: Imagen cargada correctamente:',
                    imageURL
                );


                eventVisual.style.backgroundImage =
                    `url("${imageURL}")`;


                eventVisual.classList.add(
                    'has-event-image'
                );

            };


        image.onerror =
            function () {

                console.error(
                    'ARCARIUS: NO se pudo cargar la imagen:',
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


        /* ----------------------------------------------------
           Animación de salida
           ---------------------------------------------------- */

        eventCard.classList.remove(
            'is-visible'
        );


        eventCard.classList.add(
            'is-changing'
        );


        /* ----------------------------------------------------
           Cambiar contenido
           ---------------------------------------------------- */

        setTimeout(
            function () {


                /* Fecha */

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


                /* Título */

                if (eventTitle) {

                    eventTitle.textContent =
                        event.title || '';

                }


                /* Ubicación */

                if (eventLocation) {

                    eventLocation.textContent =
                        event.location || '';

                }


                /* Descripción */

                if (eventDescription) {

                    eventDescription.textContent =
                        event.description || '';

                }


                /* Índice */

                if (eventIndex) {

                    eventIndex.textContent =
                        String(
                            index + 1
                        ).padStart(
                            2,
                            '0'
                        );

                }


                /* Código */

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


                /* ------------------------------------------------
                   IMAGEN
                   ------------------------------------------------ */

                loadEventImage(
                    event.image
                );


                /* ------------------------------------------------
                   BOTÓN
                   ------------------------------------------------ */

                if (eventLink) {

                    eventLink.setAttribute(
                        'aria-label',
                        `Entrar al evento ${event.title || 'Arcarius'}`
                    );

                }


                /* ------------------------------------------------
                   ACCESIBILIDAD
                   ------------------------------------------------ */

                eventCard.setAttribute(
                    'aria-label',
                    `${event.title || 'Evento Arcarius'}, ${date.day} ${date.month} ${date.year}, ${event.location || ''}`
                );


                /* ------------------------------------------------
                   Animación de entrada
                   ------------------------------------------------ */

                eventCard.classList.remove(
                    'is-changing'
                );


                requestAnimationFrame(
                    function () {

                        requestAnimationFrame(
                            function () {

                                eventCard.classList.add(
                                    'is-visible'
                                );

                            }
                        );

                    }
                );


            },
            220
        );
    }


    /* ========================================================
       ORDENAR EVENTOS
       ======================================================== */

    const sortedEvents =
        [...events].sort(
            function (
                first,
                second
            ) {

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
            'is-visible'
        );


        if (emptyState) {

            emptyState.hidden =
                false;

        }


        return;
    }


    /* ========================================================
       EXISTEN EVENTOS
       ======================================================== */

    eventCard.hidden =
        false;


    if (emptyState) {

        emptyState.hidden =
            true;

    }


    /* ========================================================
       EVENTOS DISPONIBLES
       ======================================================== */

    window.ArcariusEvents =
        sortedEvents;


    let currentIndex =
        0;


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


        showEvent(
            sortedEvents[
                currentIndex
            ],
            currentIndex
        );

    }


    /* ========================================================
       CONTROL PÚBLICO
       ======================================================== */

    window.ArcariusEventGateway = {

        next:
            function () {

                changeEvent(
                    1
                );

            },


        previous:
            function () {

                changeEvent(
                    -1
                );

            },


        goTo:
            function (
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


                showEvent(
                    sortedEvents[
                        currentIndex
                    ],
                    currentIndex
                );

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
   TICKETS
   ============================================================ */

function initTicket() {

    const ticket =
        document.querySelector(
            CONFIG.selectors.ticket
        );


    if (!ticket) {
        return;
    }


    /*
     * NO inventamos plataforma
     * de boletería.
     *
     * Cuando tengas la URL real:
     *
     * ticket.href = 'URL_REAL';
     */


    ticket.addEventListener(
        'click',
        event => {

            if (
                ticket.getAttribute(
                    'href'
                ) === '#'
            ) {

                event.preventDefault();


                console.info(
                    'Arcarius Fest: falta configurar la URL oficial de boletería.'
                );

            }

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

    return window.matchMedia(
        '(prefers-reduced-motion: reduce)'
    ).matches;

}


/* ============================================================
   SEGURIDAD
   HTML ESCAPING
   ============================================================ */

function escapeHTML(value) {

    return String(value)

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


    /*
     * Cerrar menú móvil
     * desde cualquier parte
     * del sitio.
     */

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

    }

};



/* ============================================================
   END
   ============================================================ */



