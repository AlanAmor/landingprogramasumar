# Programa Sumar + - Landing Page

Una aplicación web moderna y responsiva para gestionar reclamos y consultas del Programa SUMAR + del Ministerio de Salud de la Provincia de Santa Fe.

## ✨ Características

- **Landing Page Profesional**: Diseño moderno y atractivo con Bootstrap 5
- **Formulario de Reclamos**: Completo con validaciones en tiempo real
- **Envío de Emails**: Integración con Gmail para enviar reclamos
- **Responsivo**: Funciona perfectamente en teléfonos, tablets y escritorio
- **Validaciones Avanzadas**: 
  - Validación de caracteres máximos en tiempo real
  - Validación de formato de email
  - Validación de campos numéricos
  - Mensajes de error en español claro y comprensible
- **Experiencia de Usuario Mejorada**:
  - Animaciones fluidas
  - Desplazamiento suave
  - Contador de caracteres dinámico
  - Indicadores visuales de validación

## 🛠️ Requisitos Técnicos

- Java 21 o superior
- Maven 3.6+
- Spring Boot 4.0.4
- Gmail (para envío de reclamos)

## 📋 Campos del Formulario

| Campo | Tipo | Máximo | Descripción |
|-------|------|--------|-------------|
| Nombre Completo | Texto | 40 | Nombre completo del solicitante |
| Cargo | Texto | 100 | Cargo o posición del solicitante |
| Celular | Números | 15 | Número de teléfono/celular |
| Email | Email | 50 | Correo electrónico válido |
| Efector de Salud | Texto | 100 | Nombre del establecimiento |
| CUIE | Alfanumérico | 10 | Código único exacto (10 caracteres) |
| Problemática | Texto | 200 | Descripción detallada del problema |

## 🚀 Instalación y Configuración

### 1. Clonar o descargar el proyecto

```bash
cd webayudas
```

### 2. Configurar Gmail para envío de emails

1. Ve a tu cuenta de Google: https://myaccount.google.com/security
2. Activa la verificación en dos pasos si no está activa
3. Ve a https://myaccount.google.com/apppasswords
4. Selecciona "Mail" y "Windows Computer"
5. Copia la contraseña generada
6. Abre `src/main/resources/application.properties`
7. Reemplaza:
   - `spring.mail.username` con tu email de Gmail
   - `spring.mail.password` con la contraseña generada

Ver más detalles en [EMAIL_CONFIG.md](EMAIL_CONFIG.md)

### 3. Compilar el proyecto

```bash
mvn clean install
```

### 4. Ejecutar la aplicación

```bash
mvn spring-boot:run
```

O desde tu IDE favoritо:
- Click derecho en el proyecto
- Run As > Spring Boot App

### 5. Acceder a la aplicación

Abre tu navegador en: **http://localhost:8080**

## 📧 Configuración de Emails

La aplicación está configurada para enviar reclamos a: **alan43009459@gmail.com**

Para cambiar este email, edita el archivo:
```
src/main/java/com/minsalud/webayudas/service/EmailService.java
```

Busca la línea:
```java
message.setTo("alan43009459@gmail.com");
```

Y reemplázala con tu email.

## 🎨 Colores Utilizados

- **Azul Primario**: #1e3a8a (Basado en el logo del Ministerio)
- **Azul Secundario**: #2563eb
- **Naranja/Amarillo**: #fbbf24 (Acento)
- **Gris Oscuro**: #1f2937
- **Blanco**: #ffffff

## 📱 Características Responsivas

✅ Funciona en dispositivos móviles (320px y superiores)
✅ Tablets (768px y superiores)
✅ Pantallas de escritorio (1024px y superiores)
✅ Compatible con todos los navegadores modernos

### Navegadores Soportados
- Chrome, Chromium (última versión)
- Firefox (última versión)
- Safari (última versión)
- Edge (última versión)

## 🔐 Seguridad

- CSRF protection habilitado
- Validación de datos en servidor y cliente
- Restricción de caracteres máximos
- Validación de formato de email
- Los datos se transmiten por HTTPS (en producción)

## 📂 Estructura del Proyecto

```
webayudas/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/minsalud/webayudas/
│   │   │       ├── controller/
│   │   │       │   ├── ReclamoController.java
│   │   │       │   └── PageController.java
│   │   │       ├── service/
│   │   │       │   └── EmailService.java
│   │   │       ├── model/
│   │   │       │   └── ReclamoRequest.java
│   │   │       └── config/
│   │   │           └── SecurityConfig.java
│   │   └── resources/
│   │       ├── templates/
│   │       │   └── index.html
│   │       ├── static/
│   │       │   ├── css/
│   │       │   │   └── styles.css
│   │       │   ├── js/
│   │       │   │   └── main.js
│   │       │   └── img/
│   │       └── application.properties
├── pom.xml
└── EMAIL_CONFIG.md
```

## 🔧 Dependencias Principales

- **Spring Boot Web**: Framework web
- **Spring Boot Mail**: Para envío de emails
- **Spring Security**: Seguridad y autenticación
- **Lombok**: Reducción de código boilerplate
- **Bootstrap 5**: Framework CSS
- **Font Awesome**: Iconos

## ⚠️ Solución de Problemas

### El email no se envía
1. Verifica que hayas configurado correctamente Gmail
2. Comprueba que la contraseña de aplicación sea correcta
3. Revisa que no haya errores en la consola
4. Intenta usar una contraseña de aplicación nueva

### El formulario no valida
1. Abre la consola del navegador (F12)
2. Revisa si hay errores de JavaScript
3. Verifica que los campos tengan los valores correctos

### Problemas con CORS
The REST API está configurada para aceptar requests de cualquier origen en desarrollo.
En producción, debes cambiar:
```java
@CrossOrigin(origins = "*")
```
Por los orígenes específicos autorizados.

## 📝 Licencia

Este proyecto es propiedad del Ministerio de Salud de la Provincia de Santa Fe.

## 📞 Soporte

Para reportar problemas o solicitar mejoras, contacta con el equipo de desarrollo.

---

**Versión**: 1.0.0
**Última actualización**: 2024
