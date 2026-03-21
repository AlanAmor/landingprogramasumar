// Variables globales
const reclamoForm = document.getElementById('reclamoForm');
const btnEnviar = document.getElementById('btnEnviar');
const alertError = document.getElementById('alert-error');
const alertSuccess = document.getElementById('alert-success');
const errorMessage = document.getElementById('error-message');
const successMessage = document.getElementById('success-message');
const problematicaField = document.getElementById('problematica');
const charCount = document.getElementById('charCount');

// Inicialización
document.addEventListener('DOMContentLoaded', function () {
    inicializarEventos();
    agregarValidacionEnTiempoReal();
});

// Inicializar eventos
function inicializarEventos() {
    reclamoForm.addEventListener('submit', enviarFormulario);
    problematicaField.addEventListener('input', actualizarContador);
}

// Agregar validación en tiempo real
function agregarValidacionEnTiempoReal() {
    // Nombre Completo
    document.getElementById('nombreCompleto').addEventListener('input', function () {
        this.value = this.value.substring(0, 40);
        validarNombre();
    });

    // Cargo
    document.getElementById('cargo').addEventListener('input', function () {
        this.value = this.value.substring(0, 100);
        validarCargo();
    });

    // Celular
    document.getElementById('celular').addEventListener('input', function () {
        this.value = this.value.replace(/[^\d]/g, '').substring(0, 15);
        validarCelular();
    });

    // Email
    document.getElementById('email').addEventListener('input', function () {
        this.value = this.value.substring(0, 50);
        validarEmail();
    });

    // Efector de Salud
    document.getElementById('efectorSalud').addEventListener('input', function () {
        this.value = this.value.substring(0, 100);
        validarEfector();
    });

    // CUIE
    document.getElementById('cuie').addEventListener('input', function () {
        this.value = this.value.substring(0, 10);
        validarCuie();
    });

    // Problemática
    document.getElementById('problematica').addEventListener('input', function () {
        this.value = this.value.substring(0, 200);
        validarProblematica();
    });
}

// Actualizar contador de caracteres
function actualizarContador() {
    const longitud = problematicaField.value.length;
    charCount.textContent = longitud;
    
    if (longitud === 200) {
        charCount.parentElement.classList.add('text-warning');
    } else {
        charCount.parentElement.classList.remove('text-warning');
    }
}

// Validaciones individuales
function validarNombre() {
    const nombre = document.getElementById('nombreCompleto');
    const error = document.getElementById('error-nombre');
    error.innerHTML = '';

    if (nombre.value.trim() === '') {
        error.innerHTML = '❌ El nombre completo es requerido';
        nombre.classList.add('is-invalid');
        return false;
    }

    if (nombre.value.length > 40) {
        error.innerHTML = '❌ El nombre no puede exceder 40 caracteres';
        nombre.classList.add('is-invalid');
        return false;
    }

    nombre.classList.remove('is-invalid');
    nombre.classList.add('is-valid');
    return true;
}

function validarCargo() {
    const cargo = document.getElementById('cargo');
    const error = document.getElementById('error-cargo');
    error.innerHTML = '';

    if (cargo.value.trim() === '') {
        error.innerHTML = '❌ El cargo es requerido';
        cargo.classList.add('is-invalid');
        return false;
    }

    if (cargo.value.length > 100) {
        error.innerHTML = '❌ El cargo no puede exceder 100 caracteres';
        cargo.classList.add('is-invalid');
        return false;
    }

    cargo.classList.remove('is-invalid');
    cargo.classList.add('is-valid');
    return true;
}

function validarCelular() {
    const celular = document.getElementById('celular');
    const error = document.getElementById('error-celular');
    error.innerHTML = '';

    if (celular.value.trim() === '') {
        error.innerHTML = '❌ El celular es requerido';
        celular.classList.add('is-invalid');
        return false;
    }

    if (!/^\d{1,15}$/.test(celular.value)) {
        error.innerHTML = '❌ El celular debe contener solo números (máximo 15 dígitos)';
        celular.classList.add('is-invalid');
        return false;
    }

    celular.classList.remove('is-invalid');
    celular.classList.add('is-valid');
    return true;
}

function validarEmail() {
    const email = document.getElementById('email');
    const error = document.getElementById('error-email');
    error.innerHTML = '';

    if (email.value.trim() === '') {
        error.innerHTML = '❌ El email es requerido';
        email.classList.add('is-invalid');
        return false;
    }

    if (email.value.length > 50) {
        error.innerHTML = '❌ El email no puede exceder 50 caracteres';
        email.classList.add('is-invalid');
        return false;
    }

    const emailRegex = /^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (!emailRegex.test(email.value)) {
        error.innerHTML = '❌ El email no es válido. Por favor ingresa un email correcto (ejemplo@dominio.com)';
        email.classList.add('is-invalid');
        return false;
    }

    email.classList.remove('is-invalid');
    email.classList.add('is-valid');
    return true;
}

function validarEfector() {
    const efector = document.getElementById('efectorSalud');
    const error = document.getElementById('error-efector');
    error.innerHTML = '';

    if (efector.value.trim() === '') {
        error.innerHTML = '❌ El efector de salud es requerido';
        efector.classList.add('is-invalid');
        return false;
    }

    if (efector.value.length > 100) {
        error.innerHTML = '❌ El efector no puede exceder 100 caracteres';
        efector.classList.add('is-invalid');
        return false;
    }

    efector.classList.remove('is-invalid');
    efector.classList.add('is-valid');
    return true;
}

function validarCuie() {
    const cuie = document.getElementById('cuie');
    const error = document.getElementById('error-cuie');
    error.innerHTML = '';

    if (cuie.value.trim() === '') {
        error.innerHTML = '❌ El CUIE es requerido';
        cuie.classList.add('is-invalid');
        return false;
    }

    if (cuie.value.length > 10) {
        error.innerHTML = '❌ El CUIE no puede exceder 10 caracteres';
        cuie.classList.add('is-invalid');
        return false;
    }

    cuie.classList.remove('is-invalid');
    cuie.classList.add('is-valid');
    return true;
}

function validarProblematica() {
    const problematica = document.getElementById('problematica');
    const error = document.getElementById('error-problematica');
    error.innerHTML = '';

    if (problematica.value.trim() === '') {
        error.innerHTML = '❌ La descripción del problema es requerida';
        problematica.classList.add('is-invalid');
        return false;
    }

    if (problematica.value.length > 200) {
        error.innerHTML = '❌ La descripción no puede exceder 200 caracteres';
        problematica.classList.add('is-invalid');
        return false;
    }

    problematica.classList.remove('is-invalid');
    problematica.classList.add('is-valid');
    return true;
}

// Validar todos los campos
function validarTodoElFormulario() {
    const validaciones = [
        validarNombre(),
        validarCargo(),
        validarCelular(),
        validarEmail(),
        validarEfector(),
        validarCuie(),
        validarProblematica()
    ];

    return validaciones.every(v => v === true);
}

// Función principal de envío
async function enviarFormulario(e) {
    e.preventDefault();

    // Limpiar alertas previas
    ocultarAlerts();

    // Validar el formulario
    if (!validarTodoElFormulario()) {
        mostrarError('Por favor completa correctamente todos los campos. Revisa los errores señalados.');
        return;
    }

    // Desabilitar botón y mostrar loadig
    btnEnviar.disabled = true;
    btnEnviar.innerHTML = '<span class="spinner show"></span>Enviando...';

    // Preparar datos
    const datos = {
        nombreCompleto: document.getElementById('nombreCompleto').value.trim(),
        cargo: document.getElementById('cargo').value.trim(),
        celular: document.getElementById('celular').value.trim(),
        email: document.getElementById('email').value.trim(),
        efectorSalud: document.getElementById('efectorSalud').value.trim(),
        cuie: document.getElementById('cuie').value.trim(),
        problematica: document.getElementById('problematica').value.trim()
    };

    try {
        const respuesta = await fetch('/api/reclamos/enviar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datos)
        });

        const resultado = await respuesta.json();

        if (respuesta.ok) {
            mostrarExito(resultado.mensaje);
            reclamoForm.reset();
            limpiarClasesValidacion();
            charCount.textContent = '0';
            
            // Scroll hacia el mensaje de éxito
            setTimeout(() => {
                alertSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 300);
        } else {
            mostrarError(resultado.error || 'Error al enviar el reclamo');
        }
    } catch (error) {
        console.error('Error:', error);
        mostrarError('Error de conexión. Por favor intenta nuevamente más tarde.');
    } finally {
        btnEnviar.disabled = false;
        btnEnviar.innerHTML = '<i class="fas fa-paper-plane me-2"></i>Enviar Reclamo';
    }
}

// Mostrar y ocultar alertas
function mostrarError(mensaje) {
    errorMessage.textContent = mensaje;
    alertError.style.display = 'block';
    alertError.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function mostrarExito(mensaje) {
    successMessage.textContent = mensaje;
    alertSuccess.style.display = 'block';
    alertSuccess.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function ocultarAlerts() {
    alertError.style.display = 'none';
    alertSuccess.style.display = 'none';
}

// Limpiar clases de validación
function limpiarClasesValidacion() {
    document.querySelectorAll('.form-control').forEach(campo => {
        campo.classList.remove('is-valid', 'is-invalid');
    });
    document.querySelectorAll('.invalid-feedback').forEach(error => {
        error.innerHTML = '';
    });
}

// Función para desplazamiento suave
function scrollToContacto() {
    const contactoSection = document.getElementById('contacto');
    contactoSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    
    // Dar foco al primer campo
    setTimeout(() => {
        document.getElementById('nombreCompleto').focus();
    }, 500);
}

// Efecto al navegar con el menú
document.querySelectorAll('a[href^="#"]').forEach(enlace => {
    enlace.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href !== '#home') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    });
});

// Cerrar navbar al hacer clic en un enlace
document.querySelectorAll('.navbar-nav a').forEach(enlace => {
    enlace.addEventListener('click', function () {
        const navbar = document.querySelector('.navbar-collapse');
        if (navbar.classList.contains('show')) {
            document.querySelector('.navbar-toggler').click();
        }
    });
});

// Animación al hacer scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'slideUp 0.6s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.card, .card-hover').forEach(card => {
    observer.observe(card);
});
