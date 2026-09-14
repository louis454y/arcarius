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

        preloader: '#preloader',

        header: '#site-header',

        menuToggle: '#menu-toggle',

        mobileMenu: '#mobile-menu',

        menuClose: '[data-menu-close]',

        menuLinks: '[data-menu-link]',

        navLinks: '.nav-link',

        reveal: '[data-reveal]',

        tilt: '[data-tilt]',

        calendarGrid: '[data-calendar-grid]',

        calendarMonth: '[data-calendar-month]',

        calendarPrev: '[data-calendar-prev]',

        calendarNext: '[data-calendar-next]',

        selectedEvent: '#selected-event',

        currentYear: '[data-current-year]',

        ticket: '[data-ticket-external]'

    },


    classes: {

        open: 'is-open',

        hidden: 'is-hidden',

        loaded: 'is-loaded',

        loading: 'is-loading',

        visible: 'is-visible',

        scrolled: 'is-scrolled',

        active: 'is-active',

        modal: 'modal-open'

    }

};


/* ============================================================
   INIT
   ============================================================ */

document.addEventListener(
    'DOMContentLoaded',
    () => {

        document.body.classList.add(
            CONFIG.classes.loading
        );


        initPreloader();

        initHeader();

        initMobileMenu();

        initSmoothScroll();

        initScrollReveal();

        initTiltCards();

        initCalendar();

        initTicket();

        initCurrentYear();

        initHeroVideo();

    }
);


/* ============================================================
   PRELOADER
   ============================================================ */

function initPreloader() {

    const preloader =
        document.querySelector(
            CONFIG.selectors.preloader
        );


    if (!preloader) {

        document.body.classList.remove(
            CONFIG.classes.loading
        );

        return;

    }


    const start =
        performance.now();


    const minimumTime =
        1000;


    const finish = () => {

        const elapsed =
            performance.now() - start;


        const delay =
            Math.max(
                0,
                minimumTime - elapsed
            );


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


                setTimeout(
                    () => {

                        preloader.style.display =
                            'none';

                    },
                    900
                );

            },
            delay
        );

    };


    if (
        document.readyState ===
        'complete'
    ) {

        finish();

    } else {

        window.addEventListener(
            'load',
            finish,
            {
                once: true
            }
        );

    }

}


/* ============================================================
   HEADER
   ============================================================ */

function initHeader() {

    const header =
        document.querySelector(
            CONFIG.selectors.header
        );


    if (!header) return;


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


    if (!toggle || !menu) return;


    const closeElements =
        menu.querySelectorAll(
            CONFIG.selectors.menuClose
        );


    const menuLinks =
        menu.querySelectorAll(
            CONFIG.selectors.menuLinks
        );


    const openMenu = () => {

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


    const closeMenu = () => {

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


    closeElements.forEach(
        element => {

            element.addEventListener(
                'click',
                closeMenu
            );

        }
    );


    menuLinks.forEach(
        link => {

            link.addEventListener(
                'click',
                closeMenu
            );

        }
    );


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
                        target.getBoundingClientRect()
                            .top
                        +
                        window.scrollY
                        -
                        offset;


                    window.scrollTo({

                        top: Math.max(
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


    if (!elements.length) return;


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

                threshold: 0.12,

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

            card.addEventListener(
                'pointermove',
                event => {

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
                        ((y - centerY) /
                        centerY) * -3;


                    const rotateY =
                        ((x - centerX) /
                        centerX) * 3;


                    card.style.transform =
                        `perspective(1000px)
                         rotateX(${rotateX}deg)
                         rotateY(${rotateY}deg)
                         translateY(-6px)`;

                }
            );


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
   CALENDAR
   ============================================================ */

function initCalendar() {

    const grid =
        document.querySelector(
            CONFIG.selectors.calendarGrid
        );


    const monthLabel =
        document.querySelector(
            CONFIG.selectors.calendarMonth
        );


    const previous =
        document.querySelector(
            CONFIG.selectors.calendarPrev
        );


    const next =
        document.querySelector(
            CONFIG.selectors.calendarNext
        );


    const selectedEvent =
        document.querySelector(
            CONFIG.selectors.selectedEvent
        );


    if (
        !grid ||
        !monthLabel
    ) {

        return;

    }


    let currentDate =
        new Date(
            2026,
            8,
            1
        );


    /*
     * EVENTOS REALES
     *
     * Cuando tengamos las fechas oficiales
     * se colocarán aquí.
     *
     * Ejemplo:
     *
     * {
     *   date: '2026-10-15',
     *   title: 'Arcarius Fest',
     *   location: '...',
     *   description: '...'
     * }
     */

    const events = [];


    function renderCalendar() {

        grid.innerHTML = '';


        const year =
            currentDate.getFullYear();


        const month =
            currentDate.getMonth();


        const firstDay =
            new Date(
                year,
                month,
                1
            );


        const lastDay =
            new Date(
                year,
                month + 1,
                0
            );


        const startDay =
            firstDay.getDay();


        const totalDays =
            lastDay.getDate();


        const monthName =
            currentDate.toLocaleString(
                'en-US',
                {
                    month: 'long'
                }
            );


        monthLabel.textContent =
            `${monthName.toUpperCase()} ${year}`;


        /*
         * Días vacíos
         */

        for (
            let i = 0;
            i < startDay;
            i++
        ) {

            const empty =
                document.createElement(
                    'div'
                );


            empty.className =
                'calendar-day calendar-day--empty';


            grid.appendChild(
                empty
            );

        }


        /*
         * Días
         */

        for (
            let day = 1;
            day <= totalDays;
            day++
        ) {

            const button =
                document.createElement(
                    'button'
                );


            button.type =
                'button';


            button.className =
                'calendar-day';


            button.textContent =
                day;


            const dateKey =
                `${year}-${
                    String(month + 1)
                        .padStart(2, '0')
                }-${
                    String(day)
                        .padStart(2, '0')
                }`;


            const event =
                events.find(
                    item =>
                        item.date === dateKey
                );


            if (event) {

                button.classList.add(
                    'is-event'
                );


                button.setAttribute(
                    'aria-label',
                    event.title
                );


                button.addEventListener(
                    'click',
                    () => {

                        showEvent(
                            event
                        );

                    }
                );

            }


            grid.appendChild(
                button
            );

        }

    }


    function showEvent(event) {

        if (!selectedEvent) {
            return;
        }


        selectedEvent.innerHTML = `

            <strong>
                ${escapeHTML(event.title)}
            </strong>

            <p>
                ${escapeHTML(
                    event.description || ''
                )}
            </p>

            ${
                event.location
                    ? `<small>
                        ${escapeHTML(event.location)}
                       </small>`
                    : ''
            }

        `;

    }


    previous?.addEventListener(
        'click',
        () => {

            currentDate.setMonth(
                currentDate.getMonth() - 1
            );

            renderCalendar();

        }
    );


    next?.addEventListener(
        'click',
        () => {

            currentDate.setMonth(
                currentDate.getMonth() + 1
            );

            renderCalendar();

        }
    );


    renderCalendar();

}


/* ============================================================
   TICKETS
   ============================================================ */

function initTicket() {

    const ticket =
        document.querySelector(
            CONFIG.selectors.ticket
        );


    if (!ticket) return;


    /*
     * NO inventamos la plataforma.
     *
     * Cuando tengas la URL real:
     *
     * ticket.href = 'URL_REAL';
     */


    ticket.addEventListener(
        'click',
        event => {

            if (
                ticket.getAttribute('href') === '#'
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
   CURRENT YEAR
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
   HERO VIDEO
   ============================================================ */

function initHeroVideo() {

    const video =
        document.querySelector(
            '.hero__video'
        );


    if (!video) return;


    video.muted = true;

    video.playsInline = true;


    if (
        prefersReducedMotion()
    ) {

        video.pause();

        return;

    }


    video.play()
        .catch(
            () => {

                /*
                 * Algunos navegadores
                 * bloquean autoplay.
                 */

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
   SEGURIDAD — HTML
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
   ============================================================ */

window.ArcariusFest = {

    prefersReducedMotion,

    closeMobileMenu() {

        const menu =
            document.querySelector(
                CONFIG.selectors.mobileMenu
            );


        const toggle =
            document.querySelector(
                CONFIG.selectors.menuToggle
            );


        if (!menu) return;


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