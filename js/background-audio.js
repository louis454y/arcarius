/* ============================================================
   ARCARIUS FEST
   BACKGROUND AUDIO SYSTEM
   Sistema independiente
   Autoplay + interacción + pausa/reanudación
   ============================================================ */

(() => {

    'use strict';


    /* ========================================================
       CONFIGURACIÓN
       ======================================================== */

    const CONFIG = {

        audioSrc:
            'assets/audio/arcarius-background.mp3',

        volume:
            0.18,

        loop:
            true,

        fadeDuration:
            1800,

        resumeOnReturn:
            true

    };


    /* ========================================================
       CREAR ELEMENTO DE AUDIO
       ======================================================== */

    const audio =
        document.createElement('audio');


    audio.id =
        'arcarius-background-audio';

    audio.src =
        CONFIG.audioSrc;

    audio.loop =
        CONFIG.loop;

    audio.preload =
        'auto';

    audio.volume =
        0;

    audio.controls =
        false;

    audio.muted =
        false;

    audio.setAttribute(
        'playsinline',
        ''
    );

    audio.style.display =
        'none';


    document.body.appendChild(
        audio
    );


    /* ========================================================
       ESTADO DEL SISTEMA
       ======================================================== */

    let isPlaying =
        false;

    let userHasInteracted =
        false;

    let wasPlayingBeforeHidden =
        false;

    let waitingForInteraction =
        false;

    let fadeTimer =
        null;


    /* ========================================================
       UTILIDADES
       ======================================================== */

    function clearFade() {

        if (
            fadeTimer !== null
        ) {

            clearInterval(
                fadeTimer
            );

            fadeTimer =
                null;

        }

    }


    function setAudioState(
        playing
    ) {

        isPlaying =
            playing;


        document.documentElement
            .classList
            .toggle(
                'arcarius-audio-playing',
                playing
            );

    }


    /* ========================================================
       FADE IN
       ======================================================== */

    function fadeIn() {

        clearFade();


        const steps =
            30;

        const stepTime =
            CONFIG.fadeDuration /
            steps;

        let currentStep =
            0;


        audio.volume =
            0;


        fadeTimer =
            setInterval(() => {

                currentStep++;


                const progress =
                    currentStep /
                    steps;


                audio.volume =
                    Math.min(
                        CONFIG.volume *
                        progress,
                        CONFIG.volume
                    );


                if (
                    currentStep >=
                    steps
                ) {

                    clearFade();


                    audio.volume =
                        CONFIG.volume;

                }

            }, stepTime);

    }


    /* ========================================================
       REPRODUCIR AUDIO
       ======================================================== */

    async function playAudio(
        options = {}
    ) {

        const {

            fade = true

        } = options;


        /*
         * Si ya está reproduciéndose,
         * no hacemos otra llamada.
         */

        if (
            isPlaying &&
            !audio.paused
        ) {

            return true;

        }


        /*
         * El audio debe permanecer
         * sin mute para que el navegador
         * detecte correctamente que se
         * trata de reproducción audible.
         */

        audio.muted =
            false;


        try {

            await audio.play();


            /*
             * AUTOPLAY O INTERACCIÓN
             * PERMITIDA.
             */

            setAudioState(
                true
            );


            waitingForInteraction =
                false;


            if (
                fade
            ) {

                fadeIn();

            } else {

                clearFade();

                audio.volume =
                    CONFIG.volume;

            }


            return true;

        }

        catch (
            error
        ) {

            /*
             * El navegador bloqueó
             * el autoplay.
             *
             * Esto es normal en
             * navegadores con políticas
             * de autoplay.
             */

            waitingForInteraction =
                true;


            setAudioState(
                false
            );


            return false;

        }

    }


    /* ========================================================
       PAUSAR AUDIO
       ======================================================== */

    function pauseAudio(
        remember = true
    ) {

        clearFade();


        /*
         * Guardamos que estaba
         * reproduciéndose antes
         * de la pausa.
         */

        if (
            remember &&
            !audio.paused
        ) {

            wasPlayingBeforeHidden =
                true;

        }


        audio.pause();


        setAudioState(
            false
        );


        /*
         * No modificamos currentTime.
         *
         * El navegador conservará
         * exactamente la posición.
         */

        audio.volume =
            CONFIG.volume;

    }


    /* ========================================================
       REANUDAR AUDIO
       ======================================================== */

    async function resumeAudio() {

        /*
         * Solo reanudamos si estaba
         * sonando antes de salir.
         */

        if (
            !wasPlayingBeforeHidden
        ) {

            return false;

        }


        /*
         * Si el usuario todavía no
         * ha interactuado y el navegador
         * bloquea el autoplay, esperamos
         * una interacción real.
         */

        const started =
            await playAudio({
                fade: true
            });


        return started;

    }


    /* ========================================================
       PRIMERA INTERACCIÓN DEL USUARIO
       ======================================================== */

    async function handleUserInteraction() {

        userHasInteracted =
            true;


        /*
         * Si ya está sonando,
         * no hacemos nada.
         */

        if (
            isPlaying &&
            !audio.paused
        ) {

            return;

        }


        /*
         * Si estaba sonando antes
         * de cambiar de pestaña,
         * intentamos continuar.
         */

        if (
            wasPlayingBeforeHidden
        ) {

            const resumed =
                await resumeAudio();


            if (
                resumed
            ) {

                removeInteractionListeners();

            }


            return;

        }


        /*
         * Primera reproducción.
         */

        const started =
            await playAudio({
                fade: true
            });


        if (
            started
        ) {

            removeInteractionListeners();

        }

    }


    /* ========================================================
       LISTENERS DE INTERACCIÓN
       ======================================================== */

    const interactionEvents = [

        'pointerdown',

        'touchstart',

        'keydown',

        'scroll'

    ];


    function addInteractionListeners() {

        if (
            !waitingForInteraction
        ) {

            /*
             * Aunque el autoplay todavía
             * no haya sido rechazado,
             * mantenemos preparados los
             * eventos para el caso en que
             * el navegador bloquee el audio.
             */

        }


        interactionEvents.forEach(
            eventName => {

                window.addEventListener(
                    eventName,
                    handleUserInteraction,
                    {
                        passive: true
                    }
                );

            }
        );

    }


    function removeInteractionListeners() {

        interactionEvents.forEach(
            eventName => {

                window.removeEventListener(
                    eventName,
                    handleUserInteraction
                );

            }
        );

    }


    /* ========================================================
       VISIBILIDAD DE LA PÁGINA
       ======================================================== */

    document.addEventListener(
        'visibilitychange',
        async () => {

            if (
                document.hidden
            ) {

                /*
                 * La persona salió de la
                 * pestaña o minimizó la ventana.
                 */

                if (
                    isPlaying &&
                    !audio.paused
                ) {

                    wasPlayingBeforeHidden =
                        true;

                    pauseAudio(
                        false
                    );

                }

            } else {

                /*
                 * La persona regresó.
                 */

                if (
                    CONFIG.resumeOnReturn &&
                    wasPlayingBeforeHidden
                ) {

                    const resumed =
                        await resumeAudio();


                    /*
                     * Si el navegador bloquea
                     * la reproducción al volver,
                     * dejamos preparado el
                     * sistema para la próxima
                     * interacción.
                     */

                    if (
                        !resumed
                    ) {

                        waitingForInteraction =
                            true;

                    }

                }

            }

        }
    );


    /* ========================================================
       BLUR
       ======================================================== */

    window.addEventListener(
        'blur',
        () => {

            /*
             * Solo pausamos mediante blur
             * si la página realmente dejó
             * de estar visible.
             *
             * Esto evita pausar la música
             * simplemente porque el usuario
             * hizo clic en otro elemento.
             */

            if (
                document.hidden &&
                isPlaying
            ) {

                wasPlayingBeforeHidden =
                    true;

                pauseAudio(
                    false
                );

            }

        }
    );


    /* ========================================================
       FOCUS
       ======================================================== */

    window.addEventListener(
        'focus',
        async () => {

            /*
             * visibilitychange es el sistema
             * principal.
             *
             * Focus funciona como respaldo.
             */

            if (
                !document.hidden &&
                wasPlayingBeforeHidden
            ) {

                const resumed =
                    await resumeAudio();


                if (
                    !resumed
                ) {

                    waitingForInteraction =
                        true;

                }

            }

        }
    );


    /* ========================================================
       EVENTOS DEL AUDIO
       ======================================================== */

    audio.addEventListener(
        'playing',
        () => {

            setAudioState(
                true
            );

        }
    );


    audio.addEventListener(
        'pause',
        () => {

            /*
             * No modificamos
             * wasPlayingBeforeHidden aquí.
             *
             * La pausa puede haber sido
             * provocada por el sistema.
             */

            if (
                audio.paused
            ) {

                setAudioState(
                    false
                );

            }

        }
    );


    audio.addEventListener(
        'ended',
        () => {

            if (
                CONFIG.loop
            ) {

                audio.currentTime =
                    0;

                playAudio();

            }

        }
    );


    audio.addEventListener(
        'error',
        () => {

            console.error(
                'Arcarius Fest: no se pudo cargar el archivo de audio.',
                audio.error
            );

        }
    );


    /* ========================================================
       API PÚBLICA
       ======================================================== */

    window.ArcariusAudio = {

        play() {

            wasPlayingBeforeHidden =
                true;

            return playAudio({
                fade: true
            });

        },


        pause() {

            wasPlayingBeforeHidden =
                false;

            pauseAudio(
                false
            );

        },


        resume() {

            wasPlayingBeforeHidden =
                true;

            return resumeAudio();

        },


        toggle() {

            if (
                isPlaying &&
                !audio.paused
            ) {

                wasPlayingBeforeHidden =
                    false;

                pauseAudio(
                    false
                );

                return false;

            }


            wasPlayingBeforeHidden =
                true;


            return playAudio({
                fade: true
            });

        },


        isPlaying() {

            return (
                isPlaying &&
                !audio.paused
            );

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


    /* ========================================================
       INICIALIZACIÓN
       ======================================================== */

    function initializeAudio() {

        /*
         * Preparamos los eventos de
         * interacción desde el principio.
         */

        addInteractionListeners();


        /*
         * Intentamos autoplay.
         *
         * Si el navegador lo permite:
         * comienza inmediatamente.
         *
         * Si lo bloquea:
         * los eventos de interacción
         * quedan preparados.
         */

        playAudio({
            fade: true
        });

    }


    if (
        document.readyState ===
        'loading'
    ) {

        document.addEventListener(
            'DOMContentLoaded',
            initializeAudio,
            {
                once: true
            }
        );

    } else {

        initializeAudio();

    }


})();
