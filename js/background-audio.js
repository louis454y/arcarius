
/* ============================================================
   ARCARIUS FEST
   BACKGROUND AUDIO SYSTEM
   Sistema independiente
   Pausa al salir / reanuda al regresar
   ============================================================ */

(() => {

    'use strict';


    /* --------------------------------------------------------
       CONFIGURACIÓN
       -------------------------------------------------------- */

    const CONFIG = {

        audioSrc:
            'assets/audio/arcarius-background.mp3',

        volume:
            0.18,

        loop:
            true,

        fadeDuration:
            1800

    };


    /* --------------------------------------------------------
       CREAR AUDIO
       -------------------------------------------------------- */

    const audio =
        document.createElement('audio');


    audio.id =
        'arcarius-background-audio';

    audio.src =
        CONFIG.audioSrc;

    audio.loop =
        CONFIG.loop;

    audio.volume =
        0;

    audio.preload =
        'auto';

    audio.setAttribute(
        'playsinline',
        ''
    );

    audio.controls =
        false;

    audio.style.display =
        'none';


    document.body.appendChild(audio);


    /* --------------------------------------------------------
       ESTADO
       -------------------------------------------------------- */

    let isPlaying =
        false;

    let wasPlayingBeforeHidden =
        false;

    let fadeTimer =
        null;


    /* --------------------------------------------------------
       FADE IN
       -------------------------------------------------------- */

    function fadeIn() {

        clearInterval(
            fadeTimer
        );


        const steps =
            30;

        const stepTime =
            CONFIG.fadeDuration / steps;

        let currentStep =
            0;


        audio.volume =
            0;


        fadeTimer =
            setInterval(() => {

                currentStep++;


                const progress =
                    currentStep / steps;


                audio.volume =
                    Math.min(
                        CONFIG.volume * progress,
                        CONFIG.volume
                    );


                if (
                    currentStep >= steps
                ) {

                    clearInterval(
                        fadeTimer
                    );

                    audio.volume =
                        CONFIG.volume;

                }

            }, stepTime);

    }


    /* --------------------------------------------------------
       FADE OUT
       -------------------------------------------------------- */

    function fadeOut(
        callback
    ) {

        clearInterval(
            fadeTimer
        );


        const startVolume =
            audio.volume;

        const steps =
            15;

        const duration =
            300;

        const stepTime =
            duration / steps;

        let currentStep =
            0;


        fadeTimer =
            setInterval(() => {

                currentStep++;


                const progress =
                    currentStep / steps;


                audio.volume =
                    Math.max(
                        startVolume *
                        (1 - progress),
                        0
                    );


                if (
                    currentStep >= steps
                ) {

                    clearInterval(
                        fadeTimer
                    );

                    audio.volume =
                        0;


                    if (
                        typeof callback ===
                        'function'
                    ) {

                        callback();

                    }

                }

            }, stepTime);

    }


    /* --------------------------------------------------------
       REPRODUCIR
       -------------------------------------------------------- */

    function playAudio() {

        audio.play()
            .then(() => {

                isPlaying =
                    true;

                fadeIn();


                document.documentElement
                    .classList
                    .add(
                        'arcarius-audio-playing'
                    );

            })
            .catch(() => {

                /*
                 * El navegador bloqueó
                 * el autoplay.
                 *
                 * Esperamos una interacción.
                 */

            });

    }


    /* --------------------------------------------------------
       PAUSAR
       -------------------------------------------------------- */

    function pauseAudio() {

        if (
            !isPlaying
        ) {

            return;

        }


        clearInterval(
            fadeTimer
        );


        /*
         * Guardamos que la música
         * estaba reproduciéndose.
         */

        wasPlayingBeforeHidden =
            true;


        /*
         * Pausamos inmediatamente.
         *
         * currentTime permanece intacto.
         */

        audio.pause();


        isPlaying =
            false;


        audio.volume =
            CONFIG.volume;


        document.documentElement
            .classList
            .remove(
                'arcarius-audio-playing'
            );

    }


    /* --------------------------------------------------------
       REANUDAR
       -------------------------------------------------------- */

    function resumeAudio() {

        /*
         * Si la música no estaba
         * sonando antes de salir,
         * no hacemos nada.
         */

        if (
            !wasPlayingBeforeHidden
        ) {

            return;

        }


        audio.play()
            .then(() => {

                isPlaying =
                    true;

                fadeIn();


                document.documentElement
                    .classList
                    .add(
                        'arcarius-audio-playing'
                    );

            })
            .catch(() => {

                /*
                 * Si el navegador vuelve
                 * a bloquear el audio,
                 * esperamos interacción.
                 */

                waitForInteraction();

            });

    }


    /* --------------------------------------------------------
       PRIMERA INTERACCIÓN
       -------------------------------------------------------- */

    function handleFirstInteraction() {

        if (
            isPlaying
        ) {

            return;

        }


        /*
         * Si estamos regresando a la
         * página y la música estaba
         * activa antes, intentamos
         * continuar.
         */

        if (
            wasPlayingBeforeHidden
        ) {

            resumeAudio();

        } else {

            playAudio();

        }


        removeInteractionListeners();

    }


    function waitForInteraction() {

        window.addEventListener(
            'pointerdown',
            handleFirstInteraction,
            {
                passive: true,
                once: true
            }
        );

        window.addEventListener(
            'touchstart',
            handleFirstInteraction,
            {
                passive: true,
                once: true
            }
        );

        window.addEventListener(
            'keydown',
            handleFirstInteraction,
            {
                passive: true,
                once: true
            }
        );

        window.addEventListener(
            'scroll',
            handleFirstInteraction,
            {
                passive: true,
                once: true
            }
        );

    }


    function removeInteractionListeners() {

        window.removeEventListener(
            'pointerdown',
            handleFirstInteraction
        );

        window.removeEventListener(
            'touchstart',
            handleFirstInteraction
        );

        window.removeEventListener(
            'keydown',
            handleFirstInteraction
        );

        window.removeEventListener(
            'scroll',
            handleFirstInteraction
        );

    }


    /* --------------------------------------------------------
       VISIBILIDAD DE LA PÁGINA
       -------------------------------------------------------- */

    document.addEventListener(
        'visibilitychange',
        () => {

            if (
                document.hidden
            ) {

                /*
                 * La persona salió de la
                 * pestaña o minimizó la ventana.
                 */

                pauseAudio();

            } else {

                /*
                 * La persona volvió.
                 */

                resumeAudio();

            }

        }
    );


    /* --------------------------------------------------------
       BLUR / FOCUS
       -------------------------------------------------------- */

    window.addEventListener(
        'blur',
        () => {

            /*
             * visibilitychange es el sistema
             * principal.
             *
             * Este evento sirve como respaldo.
             */

            if (
                document.hidden
            ) {

                pauseAudio();

            }

        }
    );


    window.addEventListener(
        'focus',
        () => {

            if (
                !document.hidden
            ) {

                resumeAudio();

            }

        }
    );


    /* --------------------------------------------------------
       INTERACCIONES INICIALES
       -------------------------------------------------------- */

    window.addEventListener(
        'pointerdown',
        handleFirstInteraction,
        {
            passive: true
        }
    );

    window.addEventListener(
        'touchstart',
        handleFirstInteraction,
        {
            passive: true
        }
    );

    window.addEventListener(
        'keydown',
        handleFirstInteraction,
        {
            passive: true
        }
    );

    window.addEventListener(
        'scroll',
        handleFirstInteraction,
        {
            passive: true
        }
    );


    /* --------------------------------------------------------
       API PÚBLICA
       -------------------------------------------------------- */

    window.ArcariusAudio = {

        play:
            playAudio,

        pause:
            pauseAudio,

        resume:
            resumeAudio,

        toggle() {

            if (
                isPlaying
            ) {

                pauseAudio();

            } else {

                wasPlayingBeforeHidden =
                    true;

                playAudio();

            }

        },

        isPlaying() {

            return isPlaying;

        },

        getCurrentTime() {

            return audio.currentTime;

        },

        setVolume(
            volume
        ) {

            const value =
                Math.max(
                    0,
                    Math.min(
                        Number(volume),
                        1
                    )
                );


            CONFIG.volume =
                value;


            if (
                isPlaying
            ) {

                audio.volume =
                    value;

            }

        }

    };


    /* --------------------------------------------------------
       ARRANQUE
       -------------------------------------------------------- */

    function attemptAutoplay() {

        playAudio();

    }


    if (
        document.readyState ===
        'loading'
    ) {

        document.addEventListener(
            'DOMContentLoaded',
            attemptAutoplay,
            {
                once: true
            }
        );

    } else {

        attemptAutoplay();

    }


})();
