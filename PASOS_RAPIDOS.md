# 🚀 PASOS RÁPIDOS PARA EMPEZAR

## 1️⃣ CONFIGURACION DE GMAIL (Muy Importante)

### Paso A: Generar contraseña de aplicación en Google
1. Abre: https://myaccount.google.com/security
2. Asegúrate de tener verificación en dos pasos ACTIVADA
3. Ve a: https://myaccount.google.com/apppasswords
4. Selecciona:
   - Correo electrónico
   - Windows (o tu dispositivo)
5. Google te mostrará una contraseña de 16 caracteres - **CÓPIALA**

### Paso B: Configurar la contraseña en el proyecto
1. Abre: `src/main/resources/application.properties`
2. Encuentra estas líneas:
   ```properties
   spring.mail.username=your-email@gmail.com
   spring.mail.password=your-app-password
   ```
3. Reemplaza:
   - `your-email@gmail.com` → Tu correo de Gmail (ej: juan@gmail.com)
   - `your-app-password` → La contraseña de 16 caracteres generada

**Ejemplo correcto:**
```properties
spring.mail.username=miCorreo@gmail.com
spring.mail.password=abcd efgh ijkl mnop
```

⚠️ **IMPORTANTE**: Usa la contraseña de APLICACIÓN, no tu contraseña de Gmail normal

---

## 2️⃣ COMPILAR Y EJECUTAR

### Opción A: Desde Terminal
```bash
cd c:\Users\pc\Desktop\ProyectoPaginaReclamos-Pedidos\webayudas

# Compilar
mvn clean install

# Ejecutar
mvn spring-boot:run
```

### Opción B: Desde VS Code
1. Abre el proyecto en VS Code
2. Click derecho en el proyecto
3. Selecciona "Run as Spring Boot App"

---

## 3️⃣ ACCEDER A LA APLICACION

Una vez que veas en la consola:
```
Tomcat started on port(s): 8080
```

Abre tu navegador en:
### 👉 http://localhost:8080

---

## 4️⃣ PROBAR EL FORMULARIO

1. Completa TODOS los campos del formulario:
   - Nombre: Juan Pérez (máx 40 caracteres)
   - Cargo: Médico (máx 100 caracteres)
   - Celular: 3421234567 (máx 15 dígitos, solo números)
   - Email: correo@ejemplo.com (máx 50 caracteres)
   - Efector: Hospital General (máx 100 caracteres)
   - CUIE: 1234567890 (exactamente 10 caracteres)
   - Problemática: Describe tu problema aquí (máx 200 caracteres)

2. Haz clic en "Enviar Reclamo"

3. El email debería llegar a: **alan43009459@gmail.com**

---

## ✅ VALIDACIONES IMPLEMENTADAS

✓ Todos los campos son obligatorios
✓ Límites de caracteres en tiempo real
✓ Validación de email (formato correcto)
✓ Solo números en el teléfono
✓ CUIE debe tener exactamente 10 caracteres
✓ Mensajes de error en español claros
✓ Contador de caracteres dinámico
✓ Indicadores visuales (verde = correcto, rojo = error)

---

## 🎨 CARACTERÍSTICAS DEL DISEÑO

✨ Landing page moderna y profesional
✨ Responsivo (móvil, tablet, PC)
✨ Animaciones fluidas
✨ Colores acordes al logo del ministerio
✨ Menú de navegación
✨ Sección "Acerca de"
✨ Formulario elegante
✨ Footer con información

---

## 🔴 SI ALGO VA MAL

### Error: "Error de conexión al servidor"
- Verifica que la aplicación esté ejecutándose
- Revisa que se abrió en http://localhost:8080

### Error: "Error al procesarse el reclamo"
- Verifica que configuraste correctamente Gmail
- Revisa el email y contraseña en application.properties
- Abre la consola de Spring Boot para ver detalles del error

### El email no llega
- Revisa tu bandeja de spam
- Verifica que la contraseña de aplicación sea correcta
- Asegúrate de tener internet

### El formulario no valida
- Abre la consola (F12) y revisa errores
- Completa TODOS los campos
- Respeta los límites de caracteres

---

## 📧 CAMBIAR EMAIL DE DESTINO

Si quieres cambiar el email donde se envían los reclamos:

1. Abre: `src/main/java/com/minsalud/webayudas/service/EmailService.java`
2. Busca: `message.setTo("alan43009459@gmail.com");`
3. Reemplaza con tu email deseado
4. Recompila la aplicación

---

## 📱 PUERTOS Y URLS

- **Aplicación**: http://localhost:8080
- **API Reclamos**: http://localhost:8080/api/reclamos/enviar
- **Base de datos**: No requiere (demanda)

---

## 🎯 FLUJO COMPLETO

1. Usuario ingresa a http://localhost:8080
2. Lee la información de Programa Sumar +
3. Hace clic en "Contacto" o "Ir a Reclamos"
4. Completa el formulario
5. Valida cada campo automáticamente
6. Hace clic en "Enviar Reclamo"
7. Se envía un email a alan43009459@gmail.com
8. Usuario ve mensaje de confirmación

---

## ℹ️ INFORMACIÓN TÉCNICA

- **Framework**: Spring Boot 4.0.4
- **Lenguaje Backend**: Java 21
- **Lenguaje Frontend**: HTML5 + CSS3 + JavaScript
- **Framework CSS**: Bootstrap 5
- **Email**: Gmail SMTP
- **Compilador**: Maven

---

¡Tu aplicación está lista para funcionar! 🎉

Si tienes dudas, revisa EMAIL_CONFIG.md para más detalles sobre la configuración de Gmail.
