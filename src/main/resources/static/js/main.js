const reclamoForm = document.getElementById('reclamoForm');
const btnEnviar = document.getElementById('btnEnviar');
const alertError = document.getElementById('alert-error');
const alertSuccess = document.getElementById('alert-success');
const errorMessage = document.getElementById('error-message');
const successMessage = document.getElementById('success-message');
const problematicaField = document.getElementById('problematica');
const charCount = document.getElementById('charCount');
const chatbot = document.getElementById('chatbot');
const chatbotBubble = document.getElementById('chatbot-bubble');
const chatbotClose = document.getElementById('chatbot-close');
const chatbotForm = document.getElementById('chatbot-form');

const validators = {
    nombreCompleto: { max: 40, test: val => val !== '', message: 'El nombre completo es requerido' },
    cargo: { max: 100, test: val => val !== '', message: 'El cargo es requerido' },
    celular: { max: 15, test: val => /^\d{1,15}$/.test(val), message: 'El celular debe ser solo números (máx 15)' },
    email: { max: 50, test: val => /^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(val), message: 'Email inválido' },
    efectorSalud: { max: 100, test: val => val !== '', message: 'El efector de salud es requerido' },
    cuie: { max: 10, test: val => val !== '', message: 'El CUIE es requerido' },
    problematica: { max: 200, test: val => val !== '', message: 'La descripción del problema es requerida' }
};

function getField(id) {
    return document.getElementById(id);
}

function setValidationState(input, isValid, text = '') {
    const errorEl = document.getElementById('error-' + input.id.replace(/([A-Z])/g, '-$1').toLowerCase());
    input.classList.toggle('is-valid', isValid);
    input.classList.toggle('is-invalid', !isValid);
    if (errorEl) errorEl.textContent = isValid ? '' : `❌ ${text}`;
}

function validarCampo(id) {
    const input = getField(id);
    const value = input.value.trim();
    const rule = validators[id];

    if (value === '' || value.length > rule.max || !rule.test(value)) {
        setValidationState(input, false, value === '' ? rule.message : (value.length > rule.max ? `Máximo ${rule.max} caracteres` : rule.message));
        return false;
    }

    setValidationState(input, true);
    return true;
}

function actualizarContador() {
    const longitud = problematicaField.value.length;
    charCount.textContent = longitud;
    charCount.parentElement.classList.toggle('text-warning', longitud >= validators.problematica.max);
}

function validarFormulario() {
    const keys = Object.keys(validators);
    return keys.every(validarCampo);
}

async function enviarFormulario(event) {
    event.preventDefault();
    ocultarAlerts();

    if (!validarFormulario()) {
        mostrarError('Por favor completa correctamente todos los campos.');
        return;
    }

    btnEnviar.disabled = true;
    btnEnviar.innerHTML = '<span class="spinner show"></span>Enviando...';

    const payload = {};
    Object.keys(validators).forEach(field => (payload[field] = getField(field).value.trim()));

    try {
        const response = await fetch('/api/reclamos/enviar', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        const result = await response.json();

        if (response.ok) {
            mostrarExito(result.mensaje || 'Reclamo enviado con éxito.');
            reclamoForm.reset();
            limpiarValidacion();
            charCount.textContent = '0';
        } else {
            mostrarError(result.error || 'Error al enviar el reclamo.');
        }
    } catch (error) {
        console.error(error);
        mostrarError('Error de conexión. Intenta más tarde.');
    } finally {
        btnEnviar.disabled = false;
        btnEnviar.innerHTML = '<i class="fas fa-paper-plane me-2"></i>Enviar Reclamo';
    }
}

function mostrarError(message) {
    errorMessage.textContent = message;
    alertError.style.display = 'block';
    alertError.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function mostrarExito(message) {
    successMessage.textContent = message;
    alertSuccess.style.display = 'block';
    alertSuccess.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function ocultarAlerts() {
    alertError.style.display = 'none';
    alertSuccess.style.display = 'none';
}

function limpiarValidacion() {
    document.querySelectorAll('.form-control').forEach(el => el.classList.remove('is-valid', 'is-invalid'));
    document.querySelectorAll('.invalid-feedback').forEach(el => (el.textContent = ''));
}

function scrollToContacto() {
    const target = document.getElementById('contacto');
    target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setTimeout(() => getField('nombreCompleto')?.focus(), 500);
}

function initChatbot() {
    if (!chatbot || !chatbotBubble || !chatbotClose || !chatbotForm) return;

    const toggle = () => chatbot.classList.toggle('d-none');

    chatbotBubble.addEventListener('click', () => {
        chatbot.classList.remove('d-none');
        chatbotBubble.style.display = 'none';
    });

    chatbotClose.addEventListener('click', () => {
        chatbot.classList.add('d-none');
        chatbotBubble.style.display = 'flex';
    });

    chatbotForm.addEventListener('submit', event => {
        event.preventDefault();
        const input = document.getElementById('chatbot-input');
        const query = input.value.trim();
        if (!query) return;

        chatbotPostMessage(query, true);
        input.value = '';

        const respuesta = chatbotFindAnswer(query);
        setTimeout(() => chatbotPostMessage(respuesta, false), 200);
    });
}

function setSmoothScrollSelectors() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (evt) {
            const href = this.getAttribute('href');
            if (!href || href === '#' || href === '#home') return;
            evt.preventDefault();
            const target = document.querySelector(href);
            target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });
}

function navbarCollapseOnSelect() {
    document.querySelectorAll('.navbar-nav a').forEach(link => {
        link.addEventListener('click', () => {
            const collapse = document.querySelector('.navbar-collapse');
            if (collapse?.classList.contains('show')) {
                document.querySelector('.navbar-toggler')?.click();
            }
        });
    });
}

function setupObserver() {
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'slideUp 0.6s ease forwards';
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -100px 0px' });

    document.querySelectorAll('.card, .card-hover').forEach(card => observer.observe(card));
}

document.addEventListener('DOMContentLoaded', () => {
    reclamoForm.addEventListener('submit', enviarFormulario);
    problematicaField.addEventListener('input', actualizarContador);
    Object.keys(validators).forEach(field => {
        const el = getField(field);
        if (!el) return;
        el.addEventListener('input', () => {
            if (el.value.length > validators[field].max) el.value = el.value.slice(0, validators[field].max);
            validarCampo(field);
        });
    });

    setSmoothScrollSelectors();
    navbarCollapseOnSelect();
    setupObserver();
    initChatbot();
});


// Chatbot FAQ funcionalidad
const faqs = [
    {
        q: '¿qué es el programa sumar+',
        a: 'Sumar+ es un programa del Ministerio de Salud de la Nación que garantiza cobertura sanitaria a personas sin obra social ni prepaga. Integra los programas Proteger, Redes de Salud y Sumar, fortaleciendo la atención primaria con foco en embarazo, salud infantil y enfermedades crónicas. Funciona por resultados: cada prestación reportada refuerza los recursos del efector que la registró.'
    },
    {
        q: '¿qué es sumar +',
        a: 'Sumar+ es un programa del Ministerio de Salud de la Nación que garantiza cobertura sanitaria a personas sin obra social ni prepaga. Integra los programas Proteger, Redes de Salud y Sumar, fortaleciendo la atención primaria con foco en embarazo, salud infantil y enfermedades crónicas. Funciona por resultados: cada prestación reportada refuerza los recursos del efector que la registró.'
    },
    { q: 'qué es sumar +', a: 'Sumar+ garantiza cobertura sanitaria a personas sin obra social ni prepaga. Integra Proteger, Redes de Salud y Sumar con foco en atención primaria, embarazo y salud infantil. Su financiamiento va directo al efector según las prestaciones que reporta.' },
    { q: '¿para qué sirve sumar +', a: 'Este sistema centraliza los reclamos y consultas del programa para que el equipo de atención los gestione con trazabilidad y seguimiento institucional.' },
    { q: 'cómo envío un reclamo', a: 'Completá el formulario con tus datos (nombre, cargo, celular, email, efector de salud y CUIE) y describí el inconveniente. Luego hacé clic en Enviar Reclamo.' },
    { q: 'qué datos necesita', a: 'El formulario requiere: nombre completo, cargo, celular, correo electrónico, nombre del efector, código CUIE y descripción del problema (máx. 200 caracteres).' },
    { q: 'cuánto tarda la respuesta', a: 'Depende del volumen de solicitudes, pero el equipo trabaja para responder a la brevedad en horario administrativo.' },
    { q: 'contacto', a: 'Podés escribir a info@minsalud-sf.gov.ar. También encontrás datos adicionales en el pie de página del sitio.' },
    { q: 'horario', a: 'El sistema recibe reclamos las 24 hs, los 7 días. El equipo de soporte los procesa en días hábiles en horario administrativo.' }
];

function chatbotPostMessage(text, isUser, options = []) {
    const container = document.getElementById('chatbot-messages');
    const messageEl = document.createElement('div');
    messageEl.classList.add('chatbot-message', isUser ? 'user' : 'bot');

    const textNode = document.createElement('div');
    textNode.textContent = text;
    messageEl.appendChild(textNode);

    if (!isUser && Array.isArray(options) && options.length > 0) {
        const optionWrapper = document.createElement('div');
        optionWrapper.className = 'chatbot-option-wrapper';

        options.forEach(optionText => {
            const optionBtn = document.createElement('button');
            optionBtn.type = 'button';
            optionBtn.className = 'chatbot-option-btn';
            optionBtn.textContent = optionText;

            optionBtn.addEventListener('click', () => {
                const input = document.getElementById('chatbot-input');
                chatbotPostMessage(optionText, true);
                if (input) input.value = '';

                const answer = chatbotFindAnswer(optionText);
                setTimeout(() => chatbotPostMessage(answer, false), 200);

                if (input) input.focus();
            });

            optionWrapper.appendChild(optionBtn);
        });

        messageEl.appendChild(optionWrapper);
    }

    container.appendChild(messageEl);
    container.scrollTop = container.scrollHeight;
}


function normalizeText(text) {
    return text.trim().toLowerCase().replace(/[^a-z0-9áéíóúüñ ]+/g, '').replace(/\s+/g, ' ');
}

function jaccardSimilarity(a, b) {
    const setA = new Set(normalizeText(a).split(' ').filter(Boolean));
    const setB = new Set(normalizeText(b).split(' ').filter(Boolean));

    const intersection = [...setA].filter(x => setB.has(x)).length;
    const union = new Set([...setA, ...setB]).size;
    return union === 0 ? 0 : intersection / union;
}

function renderChatbotSuggestions() {
    // Ya no se usa: las opciones quedan dentro del primer mensaje del chat.
}

function chatbotFindAnswer(query) {
    const normalized = normalizeText(query);

    if (!normalized) {
        return 'Por favor ingresa una pregunta.';
    }

    // Búsqueda exacta en FAQs
    const exactMatch = faqs.find(faq => normalizeText(faq.q) === normalized);
    if (exactMatch) {
        return exactMatch.a;
    }

    // Mejor similitud Jaccard con preguntas conocidas
    let best = { score: 0, answer: null };
    faqs.forEach(faq => {
        const score = jaccardSimilarity(normalized, faq.q);
        if (score > best.score) {
            best = { score, answer: faq.a };
        }
    });

    if (best.score >= 0.2) {
        return best.answer;
    }

    // Caso genérico por palabras clave (para preguntas no exactas con contexto Sumar+)
    if (normalized.includes('qué es') && normalized.includes('sumar')) {
        return 'Sumar+ brinda cobertura de salud para personas sin obra social ni prepaga, integrando Proteger, Redes de Salud y Sumar para mejorar acceso y calidad.';
    }
    if (normalized.includes('para qué') && normalized.includes('sumar')) {
        return 'Sumar+ busca optimizar acceso, calidad y continuidad de la atención mediante indicadores clave de embarazo, infancia y crónicos.';
    }
    if (normalized.includes('financiamiento') || normalized.includes('resultados')) {
        return 'El modelo de financiamiento de Sumar+ se basa en resultados: cada prestación reportada fortalece recursos de hospitales y centros de salud.';
    }
    if (normalized.includes('reclamo') || normalized.includes('consulta')) {
        return 'Para enviar un reclamo completa el formulario con tu nombre, cargo, celular, email, efector, CUIE y descripción del problema, luego presiona Enviar.';
    }
    if (normalized.includes('datos') || normalized.includes('formulario') || normalized.includes('cuie')) {
        return 'Datos requeridos: nombre, cargo, celular, email, efector de salud, CUIE y descripción del problema (máx 200 caracteres).';
    }
    if (normalized.includes('contacto') || normalized.includes('email') || normalized.includes('teléfono')) {
        return 'Podés escribir a info@minsalud-sf.gov.ar. También encontrás datos adicionales en el pie de página del sitio.';
    }

    return '¡Buena pregunta! Eso escapa un poco a lo que puedo responder por acá 😊. Te recomiendo usar el formulario de contacto que está más abajo en la página — el equipo de atención va a poder ayudarte mucho mejor. También podés escribir a info@minsalud-sf.gov.ar.';
}


async function obtenerRespuestaChatbot(query) {
    // Motor local sin dependencia externa.
    return chatbotFindAnswer(query);
}

function inicializarChatbot() {
    const form = document.getElementById('chatbot-form');
    const input = document.getElementById('chatbot-input');
    const closeBtn = document.getElementById('chatbot-close');
    const bot = document.getElementById('chatbot');
    const bubble = document.getElementById('chatbot-bubble');
    const hint = document.getElementById('chatbot-hint');

    let bubbleDragging = false;
    let botDragging = false;

    if (!bot) {
        console.warn('No se encontró el contenedor de chatbot (#chatbot).');
        return;
    }

    bot.style.display = 'none';
    if (bubble) {
        bubble.style.display = 'flex';
    }

    // animación de hint tipo escritura
    if (hint) {
        hint.style.display = 'block';
        const txt = 'Chatbot de consultas';
        const target = document.getElementById('chatbot-hint-text');
        target.textContent = '';
        let index = 0;
        const interval = setInterval(() => {
            if (index <= txt.length) {
                target.textContent = txt.slice(0, index);
                index++;
            } else {
                clearInterval(interval);
                setTimeout(() => {
                    hint.classList.remove('show');
                    hint.style.display = 'none';
                }, 1200);
            }
        }, 80);
        hint.classList.add('show');
    }

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        const query = input.value.trim();
        if (!query) return;

        console.log('[chatbot] pregunta recibida:', query);
        chatbotPostMessage(query, true);
        input.value = '';

        const respuesta = chatbotFindAnswer(query);
        console.log('[chatbot] respuesta generada:', respuesta);

        setTimeout(() => {
            chatbotPostMessage(respuesta, false);
            const container = document.getElementById('chatbot-messages');
            container.scrollTop = container.scrollHeight;
        }, 300);

        input.focus();
    });

    if (closeBtn) {
        closeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            bot.style.display = 'none';
            if (bubble) {
                bubble.style.display = 'flex';
            }
        });
    } else {
        console.warn('No se encontró el botón de cerrar chatbot (#chatbot-close).');
    }

    if (bubble) {
        bubble.addEventListener('click', () => {
            if (bubbleDragging) return; // no abrir si está arrastrando

            bot.style.display = 'flex';
            bubble.style.display = 'none';

            // ajustar posición del chat en coincidencia con la burbuja
            bot.style.right = bubble.style.right || '20px';
            bot.style.bottom = bubble.style.bottom || '20px';
        });

        initBubbleDrag(bubble, () => bubbleDragging = true, () => bubbleDragging = false);
    }

    initChatDrag(bot, () => botDragging = true, () => botDragging = false);

    const initialText = 'Hola 👋 Soy el asistente de FAQ. Escribe tu consulta sobre Sumar +.';
    const options = [
        '¿Qué es el Programa Sumar+?',
        '¿Qué servicios cubre Sumar+?',
        '¿Cómo envío un reclamo?',
        '¿Qué datos necesito para el formulario?'
    ];

    chatbotPostMessage(initialText, false, options);
}

function initBubbleDrag(bubble, onStart, onEnd) {
    let isDragging = false;
    let startX = 0;
    let startY = 0;
    let originX = 0;
    let originY = 0;

    let bubblePointerId = null;

    bubble.addEventListener('pointerdown', function (e) {
        if (e.button !== 0) return;

        isDragging = true;
        onStart && onStart();
        startX = e.clientX;
        startY = e.clientY;
        originX = parseInt(window.getComputedStyle(bubble).right, 10) || 0;
        originY = parseInt(window.getComputedStyle(bubble).bottom, 10) || 0;
        bubblePointerId = e.pointerId;
        bubble.setPointerCapture(bubblePointerId);
    });

    bubble.addEventListener('pointermove', function (e) {
        if (!isDragging) return;

        const dx = startX - e.clientX;
        const dy = startY - e.clientY;

        const newRight = Math.max(0, originX + dx);
        const newBottom = Math.max(0, originY + dy);

        bubble.style.right = `${newRight}px`;
        bubble.style.bottom = `${newBottom}px`;
    });

    bubble.addEventListener('pointerup', function () {
        isDragging = false;
        onEnd && onEnd();
        if (bubblePointerId !== null) {
            bubble.releasePointerCapture(bubblePointerId);
            bubblePointerId = null;
        }
    });

    bubble.addEventListener('pointercancel', function () {
        isDragging = false;
        onEnd && onEnd();
        if (bubblePointerId !== null) {
            bubble.releasePointerCapture(bubblePointerId);
            bubblePointerId = null;
        }
    });
}

function initChatDrag(chat, onStart, onEnd) {
    let isDragging = false;
    let startX = 0;
    let startY = 0;
    let originX = 0;
    let originY = 0;

    const header = chat.querySelector('.chatbot-header');
    if (!header) return;

    let chatPointerId = null;

    header.addEventListener('pointerdown', function (e) {
        if (e.button !== 0) return; // solo con botón izquierdo
        if (e.target.closest('#chatbot-close')) return; // no iniciar drag al pulsar cerrar

        e.preventDefault();

        isDragging = true;
        header.classList.add('dragging');
        onStart && onStart();
        startX = e.clientX;
        startY = e.clientY;
        originX = parseInt(window.getComputedStyle(chat).right, 10) || 0;
        originY = parseInt(window.getComputedStyle(chat).bottom, 10) || 0;
        chatPointerId = e.pointerId;
        header.setPointerCapture(chatPointerId);
    });

    const onPointerMove = function (e) {
        if (!isDragging) return;

        const dx = startX - e.clientX;
        const dy = startY - e.clientY;

        const newRight = Math.max(0, originX + dx);
        const newBottom = Math.max(0, originY + dy);

        chat.style.right = `${newRight}px`;
        chat.style.bottom = `${newBottom}px`;
    };

    const stopDragging = () => {
        if (!isDragging) return;
        isDragging = false;
        header.classList.remove('dragging');
        onEnd && onEnd();
        if (chatPointerId !== null) {
            header.releasePointerCapture(chatPointerId);
            chatPointerId = null;
        }
        document.removeEventListener('pointermove', onPointerMove);
        document.removeEventListener('pointerup', stopDragging);
        document.removeEventListener('pointercancel', stopDragging);
    };

    header.addEventListener('pointermove', function (e) {
        // no moverla con hover, solo mientras se arrastra (isDragging)
        onPointerMove(e);
    });

    document.addEventListener('pointermove', onPointerMove);
    document.addEventListener('pointerup', stopDragging);
    document.addEventListener('pointercancel', stopDragging);
}

document.addEventListener('DOMContentLoaded', inicializarChatbot);
