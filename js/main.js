const form = document.getElementById('reclamoForm');
const submitButton = document.getElementById('btnEnviar');
const alertError = document.getElementById('alert-error');
const alertSuccess = document.getElementById('alert-success');
const errorMessage = document.getElementById('error-message');
const successMessage = document.getElementById('success-message');
const problematicaField = document.getElementById('problematica');
const charCount = document.getElementById('charCount');

const fieldRules = {
    nombreCompleto: {
        max: 40,
        test: value => value !== '',
        message: 'El nombre completo es requerido.',
        errorId: 'error-nombre'
    },
    cargo: {
        max: 100,
        test: value => value !== '',
        message: 'El cargo es requerido.',
        errorId: 'error-cargo'
    },
    celular: {
        max: 15,
        test: value => /^\d{1,15}$/.test(value),
        message: 'El celular debe contener solo numeros (maximo 15).',
        errorId: 'error-celular'
    },
    email: {
        max: 50,
        test: value => /^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(value),
        message: 'Email invalido.',
        errorId: 'error-email'
    },
    efectorSalud: {
        max: 100,
        test: value => value !== '',
        message: 'El efector de salud es requerido.',
        errorId: 'error-efector'
    },
    cuie: {
        max: 10,
        test: value => value.length === 10,
        message: 'El CUIE debe tener exactamente 10 caracteres.',
        errorId: 'error-cuie'
    },
    problematica: {
        max: 200,
        test: value => value !== '',
        message: 'La descripcion del problema es requerida.',
        errorId: 'error-problematica'
    }
};

const faqs = [
    {
        q: 'que es el programa sumar+',
        a: 'Sumar+ garantiza cobertura sanitaria para personas sin obra social ni prepaga, fortaleciendo la atencion primaria.'
    },
    {
        q: 'como envio un reclamo',
        a: 'Completa el formulario con tus datos y presiona Enviar Reclamo. En esta version de GitHub Pages el reclamo queda guardado localmente en tu navegador.'
    },
    {
        q: 'que datos necesita',
        a: 'Nombre completo, cargo, celular, email, efector de salud, CUIE y descripcion del problema.'
    },
    {
        q: 'contacto',
        a: 'Puedes escribir a info@minsalud-sf.gov.ar para consultas institucionales.'
    },
    {
        q: 'horario',
        a: 'El sistema recibe formularios todo el dia; la gestion depende del horario administrativo del equipo.'
    }
];

function getField(id) {
    return document.getElementById(id);
}

function getFieldValue(id) {
    const field = getField(id);
    return field ? field.value.trim() : '';
}

function hideAlerts() {
    alertError.style.display = 'none';
    alertSuccess.style.display = 'none';
}

function showError(message) {
    errorMessage.textContent = message;
    alertError.style.display = 'block';
    alertError.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function showSuccess(message) {
    successMessage.textContent = message;
    alertSuccess.style.display = 'block';
    alertSuccess.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function setValidationState(input, rule, isValid, message) {
    const errorEl = document.getElementById(rule.errorId);
    input.classList.toggle('is-valid', isValid);
    input.classList.toggle('is-invalid', !isValid);

    if (errorEl) {
        errorEl.textContent = isValid ? '' : `❌ ${message}`;
        errorEl.classList.toggle('show', !isValid);
    }
}

function validateField(id) {
    const input = getField(id);
    const rule = fieldRules[id];

    if (!input || !rule) {
        return true;
    }

    const value = input.value.trim();

    if (value === '') {
        setValidationState(input, rule, false, rule.message);
        return false;
    }

    if (value.length > rule.max) {
        setValidationState(input, rule, false, `Maximo ${rule.max} caracteres.`);
        return false;
    }

    if (!rule.test(value)) {
        setValidationState(input, rule, false, rule.message);
        return false;
    }

    setValidationState(input, rule, true, '');
    return true;
}

function validateForm() {
    return Object.keys(fieldRules).every(validateField);
}

function clearValidation() {
    document.querySelectorAll('.form-control').forEach(element => {
        element.classList.remove('is-valid', 'is-invalid');
    });

    document.querySelectorAll('.invalid-feedback').forEach(element => {
        element.textContent = '';
        element.classList.remove('show');
    });
}

function updateCounter() {
    const currentLength = problematicaField.value.length;
    charCount.textContent = currentLength;
    charCount.parentElement.classList.toggle('text-warning', currentLength >= fieldRules.problematica.max);
}

function collectPayload() {
    const payload = {};
    Object.keys(fieldRules).forEach(field => {
        payload[field] = getFieldValue(field);
    });
    payload.fecha = new Date().toISOString();
    return payload;
}

function saveSubmissionLocally(payload) {
    const storageKey = 'sumar_reclamos';
    const existing = JSON.parse(localStorage.getItem(storageKey) || '[]');
    existing.push(payload);
    localStorage.setItem(storageKey, JSON.stringify(existing));
}

async function handleSubmit(event) {
    event.preventDefault();
    hideAlerts();

    if (!validateForm()) {
        showError('Por favor completa correctamente todos los campos.');
        return;
    }

    const payload = collectPayload();

    submitButton.disabled = true;
    submitButton.innerHTML = '<span class="spinner show"></span>Guardando...';

    try {
        saveSubmissionLocally(payload);
        showSuccess('Reclamo guardado en este navegador. Puedes seguir cargando nuevos reclamos.');
        form.reset();
        clearValidation();
        charCount.textContent = '0';
    } catch (error) {
        console.error(error);
        showError('No se pudo guardar localmente. Intenta nuevamente.');
    } finally {
        submitButton.disabled = false;
        submitButton.innerHTML = '<i class="fas fa-paper-plane me-2"></i>Enviar Reclamo';
    }
}

function scrollToContacto() {
    const target = document.getElementById('contacto');
    target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setTimeout(() => getField('nombreCompleto')?.focus(), 400);
}

function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', event => {
            const href = anchor.getAttribute('href');
            if (!href || href === '#') {
                return;
            }

            const target = document.querySelector(href);
            if (!target) {
                return;
            }

            event.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });
}

function setupNavbarCollapse() {
    document.querySelectorAll('.navbar-nav a').forEach(link => {
        link.addEventListener('click', () => {
            const collapse = document.querySelector('.navbar-collapse');
            if (collapse?.classList.contains('show')) {
                document.querySelector('.navbar-toggler')?.click();
            }
        });
    });
}

function setupCardsAnimation() {
    const observer = new IntersectionObserver(
        (entries, obs) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) {
                    return;
                }
                entry.target.style.animation = 'slideUp 0.6s ease forwards';
                obs.unobserve(entry.target);
            });
        },
        { threshold: 0.12 }
    );

    document.querySelectorAll('.card, .card-hover').forEach(card => observer.observe(card));
}

function normalizeText(text) {
    return text
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, '')
        .replace(/\s+/g, ' ');
}

function similarity(a, b) {
    const setA = new Set(normalizeText(a).split(' ').filter(Boolean));
    const setB = new Set(normalizeText(b).split(' ').filter(Boolean));
    const intersection = [...setA].filter(token => setB.has(token)).length;
    const union = new Set([...setA, ...setB]).size;
    return union === 0 ? 0 : intersection / union;
}

function findChatbotAnswer(query) {
    const normalizedQuery = normalizeText(query);

    if (!normalizedQuery) {
        return 'Por favor escribe una pregunta.';
    }

    const exact = faqs.find(item => normalizeText(item.q) === normalizedQuery);
    if (exact) {
        return exact.a;
    }

    let best = { score: 0, answer: null };
    faqs.forEach(item => {
        const score = similarity(normalizedQuery, item.q);
        if (score > best.score) {
            best = { score, answer: item.a };
        }
    });

    if (best.score >= 0.2) {
        return best.answer;
    }

    return 'No tengo una respuesta exacta para eso. Usa el formulario y el equipo te dara seguimiento.';
}

function postChatMessage(text, isUser, options = []) {
    const container = document.getElementById('chatbot-messages');
    if (!container) {
        return;
    }

    const message = document.createElement('div');
    message.className = `chatbot-message ${isUser ? 'user' : 'bot'}`;

    const textBlock = document.createElement('div');
    textBlock.textContent = text;
    message.appendChild(textBlock);

    if (!isUser && options.length > 0) {
        const wrapper = document.createElement('div');
        wrapper.className = 'chatbot-option-wrapper';

        options.forEach(optionText => {
            const option = document.createElement('button');
            option.type = 'button';
            option.className = 'chatbot-option-btn';
            option.textContent = optionText;
            option.addEventListener('click', () => {
                postChatMessage(optionText, true);
                const answer = findChatbotAnswer(optionText);
                setTimeout(() => postChatMessage(answer, false), 220);
            });
            wrapper.appendChild(option);
        });

        message.appendChild(wrapper);
    }

    container.appendChild(message);
    container.scrollTop = container.scrollHeight;
}

function setupBubbleDrag(bubble, onDragStart, onDragEnd) {
    let dragging = false;
    let startX = 0;
    let startY = 0;
    let originRight = 0;
    let originBottom = 0;
    let pointerId = null;

    bubble.addEventListener('pointerdown', event => {
        if (event.button !== 0) {
            return;
        }
        dragging = true;
        onDragStart?.();
        startX = event.clientX;
        startY = event.clientY;
        originRight = parseInt(window.getComputedStyle(bubble).right, 10) || 0;
        originBottom = parseInt(window.getComputedStyle(bubble).bottom, 10) || 0;
        pointerId = event.pointerId;
        bubble.setPointerCapture(pointerId);
    });

    bubble.addEventListener('pointermove', event => {
        if (!dragging) {
            return;
        }

        const dx = startX - event.clientX;
        const dy = startY - event.clientY;

        bubble.style.right = `${Math.max(0, originRight + dx)}px`;
        bubble.style.bottom = `${Math.max(0, originBottom + dy)}px`;
    });

    const stopDragging = () => {
        dragging = false;
        onDragEnd?.();
        if (pointerId !== null) {
            bubble.releasePointerCapture(pointerId);
            pointerId = null;
        }
    };

    bubble.addEventListener('pointerup', stopDragging);
    bubble.addEventListener('pointercancel', stopDragging);
}

function setupChatDrag(chat) {
    const header = chat.querySelector('.chatbot-header');
    if (!header) {
        return;
    }

    let dragging = false;
    let startX = 0;
    let startY = 0;
    let originRight = 0;
    let originBottom = 0;

    header.addEventListener('pointerdown', event => {
        if (event.button !== 0 || event.target.closest('#chatbot-close')) {
            return;
        }

        dragging = true;
        header.classList.add('dragging');
        startX = event.clientX;
        startY = event.clientY;
        originRight = parseInt(window.getComputedStyle(chat).right, 10) || 0;
        originBottom = parseInt(window.getComputedStyle(chat).bottom, 10) || 0;
    });

    document.addEventListener('pointermove', event => {
        if (!dragging) {
            return;
        }
        const dx = startX - event.clientX;
        const dy = startY - event.clientY;
        chat.style.right = `${Math.max(0, originRight + dx)}px`;
        chat.style.bottom = `${Math.max(0, originBottom + dy)}px`;
    });

    document.addEventListener('pointerup', () => {
        dragging = false;
        header.classList.remove('dragging');
    });

    document.addEventListener('pointercancel', () => {
        dragging = false;
        header.classList.remove('dragging');
    });
}

function setupChatbot() {
    const chatbot = document.getElementById('chatbot');
    const bubble = document.getElementById('chatbot-bubble');
    const close = document.getElementById('chatbot-close');
    const chatForm = document.getElementById('chatbot-form');
    const chatInput = document.getElementById('chatbot-input');
    const hint = document.getElementById('chatbot-hint');
    const hintText = document.getElementById('chatbot-hint-text');

    if (!chatbot || !bubble || !close || !chatForm || !chatInput) {
        return;
    }

    let bubbleDragging = false;

    chatbot.style.display = 'none';
    bubble.style.display = 'flex';

    setupBubbleDrag(
        bubble,
        () => {
            bubbleDragging = true;
        },
        () => {
            bubbleDragging = false;
        }
    );

    setupChatDrag(chatbot);

    bubble.addEventListener('click', () => {
        if (bubbleDragging) {
            return;
        }
        chatbot.style.display = 'flex';
        bubble.style.display = 'none';
        chatbot.style.right = bubble.style.right || '20px';
        chatbot.style.bottom = bubble.style.bottom || '20px';
    });

    close.addEventListener('click', event => {
        event.stopPropagation();
        chatbot.style.display = 'none';
        bubble.style.display = 'flex';
    });

    chatForm.addEventListener('submit', event => {
        event.preventDefault();
        const query = chatInput.value.trim();
        if (!query) {
            return;
        }

        postChatMessage(query, true);
        chatInput.value = '';

        const answer = findChatbotAnswer(query);
        setTimeout(() => postChatMessage(answer, false), 220);
    });

    if (hint && hintText) {
        hint.style.display = 'block';
        hint.classList.add('show');
        const text = 'Chatbot de consultas';
        let index = 0;
        const timer = setInterval(() => {
            if (index > text.length) {
                clearInterval(timer);
                setTimeout(() => {
                    hint.classList.remove('show');
                    hint.style.display = 'none';
                }, 1200);
                return;
            }
            hintText.textContent = text.slice(0, index);
            index += 1;
        }, 70);
    }

    postChatMessage('Hola. Soy el asistente FAQ de Sumar +. Elige una opcion o escribe tu consulta.', false, [
        'Que es el Programa Sumar+?',
        'Como envio un reclamo?',
        'Que datos necesito para el formulario?',
        'Contacto'
    ]);
}

function setupValidationListeners() {
    Object.keys(fieldRules).forEach(fieldId => {
        const field = getField(fieldId);
        if (!field) {
            return;
        }

        field.addEventListener('input', () => {
            if (field.value.length > fieldRules[fieldId].max) {
                field.value = field.value.slice(0, fieldRules[fieldId].max);
            }
            validateField(fieldId);
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    if (!form || !problematicaField || !charCount) {
        return;
    }

    form.addEventListener('submit', handleSubmit);
    form.addEventListener('reset', () => {
        hideAlerts();
        clearValidation();
        charCount.textContent = '0';
    });

    problematicaField.addEventListener('input', updateCounter);

    setupValidationListeners();
    setupSmoothScroll();
    setupNavbarCollapse();
    setupCardsAnimation();
    setupChatbot();
});

window.scrollToContacto = scrollToContacto;
