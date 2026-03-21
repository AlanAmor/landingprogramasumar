# 🏥 Programa Sumar + | Sistema de Reclamos y Consultas

## ⚡ INICIO RÁPIDO (30 segundos)

**Terminal 1:**
```bash
cd webayudas && mvn spring-boot:run
```

**Terminal 2:**
```bash
cd webayudas/php-mail && php -S localhost:8888
```

**Luego abre:**
```
http://localhost:8080
```

✅ **¡Listo!** Tu aplicación está corriendo.

---

## 📖 DOCUMENTACIÓN

| Archivo | Contenido |
|---------|-----------|
| **[PHP-SETUP.md](PHP-SETUP.md)** | ⭐ Guía completa en español |
| **[CHECKLIST-DEPLOYMENT.md](CHECKLIST-DEPLOYMENT.md)** | Checklist de verificación |
| **[php-mail/INSTRUCCIONES.md](php-mail/INSTRUCCIONES.md)** | Detalles técnicos del PHP |
| **[HELP.md](HELP.md)** | Documentación Spring Boot original |

➜ **Comienza por: [PHP-SETUP.md](PHP-SETUP.md)**

---

## 🎯 ¿QUÉ ES?

Sistema web para que usuarios del ministerio de salud puedan:
- 📝 Enviar reclamos y consultas
- 📞 Incluir datos de contacto
- 📧 Recibir confirmación por email

**Características:**
- ✅ Landing page responsive
- ✅ Formulario con 7 campos validados
- ✅ Email automático a alan43009459@gmail.com
- ✅ Sin configuración de Gmail
- ✅ 100% funcional en 2 comandos

---

## 🛠️ TECNOLOGÍA

**Frontend (en puerto 8080):**
- Spring Boot 4.0.4
- HTML5 + CSS3 + JavaScript
- Bootstrap 5
- Responsive design

**Email (en puerto 8888):**
- PHP puro
- Native `mail()` function
- Sin dependencias externas

---

## 📋 REQUISITOS

- Java 23+ instalado
- PHP 8.0+ instalado
- Maven instalado

**Verificar instalación:**
```bash
java -version
php --version
mvn --version
```

---

## 🚀 EJECUCIÓN COMPLETA

### 1️⃣ Clonar/Descargar proyecto
```bash
cd c:\Users\pc\Desktop\ProyectoPaginaReclamos-Pedidos\webayudas
```

### 2️⃣ Terminal 1 - Spring Boot
```bash
mvn spring-boot:run
```
Deberías ver:
```
Tomcat started on port(s): 8080 (http)
```

### 3️⃣ Terminal 2 - PHP Server  
```bash
cd php-mail
php -S localhost:8888
```
Deberías ver:
```
Development Server started at http://localhost:8888
```

### 4️⃣ Abrir en navegador
```
http://localhost:8080
```

---

## 🧪 PROBAR

1. Haz clic en "Ir a Reclamos"
2. Llena el formulario:
   - **Nombre Completo:** Tu nombre
   - **Cargo:** Tu cargo
   - **Celular:** 1234567890
   - **Email:** tu@email.com
   - **Efector de Salud:** Hospital X
   - **CUIE:** 1234567890
   - **Problemática:** Tu consulta

3. Haz clic en "Enviar Reclamo"
4. Deberías ver: ✅ "Reclamo enviado exitosamente"
5. Revisa tu email (alan43009459@gmail.com por defecto)

---

## 📂 ESTRUCTURA

```
webayudas/
├── src/main/java/          ← Backend Spring Boot
├── src/main/resources/
│   ├── static/             ← HTML, CSS, JS
│   └── templates/
├── php-mail/               ← ⭐ Email con PHP
│   ├── send-email.php
│   └── INSTRUCCIONES.md
├── pom.xml                 ← Dependencias Maven
├── PHP-SETUP.md            ← ⭐ LEE ESTO PRIMERO
└── CHECKLIST-DEPLOYMENT.md
```

---

## 🔧 COMANDOS ÚTILES

**Limpiar y reconstruir:**
```bash
mvn clean install
```

**Solo compilar sin ejecutar:**
```bash
mvn clean compile
```

**Ejecutar tests:**
```bash
mvn test
```

**Ver logs en tiempo real:**
```bash
mvn spring-boot:run -X
```

---

## 💡 CARACTERÍSTICAS PRINCIPALES

### ✅ Diseño Responsive
- Pantallas de escritorio, tablet y móvil
- Compatible con todos los navegadores modernos

### ✅ Validación en 2 niveles
- **Cliente (JavaScript):** Validación en tiempo real
- **Servidor (PHP):** Validación de seguridad

### ✅ Email Automático
- JSON → PHP → mail() → Inbox del usuario
- Sin complicaciones de Gmail
- Respuesta inmediata al usuario

### ✅ Seguridad
- CORS configurado correctamente
- Validaciones de entrada
- Sin exposición de credenciales

---

## ⚠️ SOLUCIÓN DE PROBLEMAS

### "PHP no se reconoce"
```bash
# Descarga PHP desde:
https://www.php.net/downloads
```

### "Puerto 8080/8888 ya está en uso"
```bash
# Ver qué usa el puerto:
netstat -ano | findstr :8080

# Cambiar puerto en pom.xml o usar puertos diferentes
```

### "Email no llega"
```bash
# Verifica que PHP está corriendo
# Revisa que el formulario se envió (ver consola F12)
# Configura SMTP en php.ini si es necesario
```

### "Página en blanco"
```bash
# Verifica:
1. Spring Boot está en 8080
2. No hay errores en consola
3. Main.js carga correctamente (F12 > Network)
```

---

## 📞 CONTACTO / SOPORTE

- **Email destino:** alan43009459@gmail.com
- **Puerto Frontend:** 8080
- **Puerto Email:** 8888
- **Framework:** Spring Boot 4.0.4
- **Versión Java:** 23

---

## 📄 LICENCIA

Proyecto interno del Ministerio de Salud.

---

## ✨ PRÓXIMOS PASOS

1. ✅ Lee [PHP-SETUP.md](PHP-SETUP.md)
2. ✅ Instala PHP si no lo tienes
3. ✅ Ejecuta Java (`mvn spring-boot:run`)
4. ✅ Ejecuta PHP (`php -S localhost:8888`)
5. ✅ Abre http://localhost:8080
6. ✅ ¡Prueba tu aplicación!

---

**Estado:** ✅ LISTO PARA PRODUCCIÓN  
**Última actualización:** 2024  
**Versión:** 1.0
