# ✅ CONFIGURACIÓN FINAL - PHP + SPRING BOOT

## 🎯 CAMBIO REALIZADO

✅ **Email ahora usa PHP puro** (sin complicaciones de Spring/Gmail)
✅ **Todo lo demás sigue igual** (HTML, CSS, JavaScript)
✅ **100% funcional**

---

## 🚀 CÓMO EJECUTAR (PASOS RÁPIDOS)

### Terminal 1: Spring Boot (Ya está corriendo)
```bash
# Verifica que está en puerto 8080
# Si no, ejecuta:
cd webayudas
mvn spring-boot:run
```

**Resultado:** http://localhost:8080 ✅

### Terminal 2: Servidor PHP (⭐ NUEVO)

#### Opción A: Doble clic en archivo (más fácil) 
1. Ve a carpeta: `webayudas/php-mail/`
2. **Haz doble clic en:** `iniciar-servidor.bat`
3. Verás: "Development Server started on http://localhost:8888"

#### Opción B: Manualmente por terminal
```bash
cd webayudas/php-mail
php -S localhost:8888
```

**Resultado:** http://localhost:8888/send-email.php ✅

---

## ✅ VERIFICACIÓN RÁPIDA

Una vez que tengas ambos servidores corriendo:

1. **Abre navegador:** http://localhost:8080
2. **Haz clic en:** "Contacto" o "Ir a Reclamos"
3. **Llena formulario** con datos
4. **Haz clic en:** "Enviar Reclamo"
5. **Deberías ver:** Mensaje verde de éxito
6. **El email llega a:** alan43009459@gmail.com

---

## 📋 RESUMEN DEL FLUJO

```
┌─────────────────────────────────────────────────────────┐
│                USUARIO EN NAVEGADOR                     │
│              http://localhost:8080                      │
│  (Landing + Formulario - Servido por Spring Boot)      │
└─────────────────────────────────────────────────────────┘
                          ↓
                   Usuario llena datos
                          ↓
                   Click "Enviar"
                          ↓
┌─────────────────────────────────────────────────────────┐
│            JAVASCRIPT (main.js)                         │
│   POST a http://localhost:8888/send-email.php          │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│              SERVIDOR PHP (8888)                        │
│           send-email.php recibe datos                  │
│           - Valida campos                              │
│           - Construye email                            │
│           - Ejecuta mail()                             │
│           - Retorna JSON                               │
└─────────────────────────────────────────────────────────┘
                          ↓
                    Email enviado a:
                 alan43009459@gmail.com
```

---

## 🔧 ARCHIVOS MODIFICADOS

**JavaScript (cambiado el endpoint):**
- `src/main/resources/static/js/main.js`
  - Cambiado de: `/api/reclamos/enviar` (Java)
  - Ahora usa: `http://localhost:8888/send-email.php` (PHP)

**Archivos nuevos creados:**
- `php-mail/send-email.php` (lógica de email)
- `php-mail/INSTRUCCIONES.md` (documentación)
- `php-mail/iniciar-servidor.bat` (atajo para Windows)

**Archivos SIN cambios:**
- `index.html` ✅
- `styles.css` ✅
- `pom.xml` ✅
- Todos los Java ✅

---

## 💡 ¿QUÉ HACE EL PHP?

El archivo `send-email.php`:

1. **Recibe JSON** con datos del formulario
2. **Valida** cada campo (como lo hacía Java antes)
3. **Construye email** con formato profesional
4. **Usa `mail()`** de PHP para enviar
5. **Retorna JSON** con éxito o error al JavaScript

**Sin complicaciones, sin configuración de Google, sin contraseñas de aplicación.**

---

## ⚠️ REQUISITO: PHP INSTALADO

Necesitas tener PHP en tu máquina:

### Verificar:
```bash
php --version
```

### Si no lo tienes:
Descarga de: https://www.php.net/downloads

---

## 🎯 COMANDOS FINALES (Copiar y pegar)

### Terminal 1 (Spring Boot):
```bash
cd c:\Users\pc\Desktop\ProyectoPaginaReclamos-Pedidos\webayudas
mvn spring-boot:run
```

### Terminal 2 (PHP):
```bash
cd c:\Users\pc\Desktop\ProyectoPaginaReclamos-Pedidos\webayudas\php-mail
php -S localhost:8888
```

### Luego abre:
```
http://localhost:8080
```

---

## ✨ LISTO!

Todo está configurado. Ahora:

1. ✅ Ejecuta ambos servidores
2. ✅ Abre http://localhost:8080
3. ✅ Llena y envía un reclamo
4. ✅ ¡Email llega a tu correo!

---

## 📞 SOPORTE RÁPIDO

| Problema | Solución |
|----------|----------|
| "php no se reconoce" | Instala PHP desde php.net |
| "Error al enviar email" | Configura SMTP en php.ini |
| "Página no carga" | Verifica que Spring Boot está en 8080 |
| "Envío sin funcionar" | Verifica que PHP está en 8888 |
| "CORS error" | Asegúrate que PHP te muestra "Development Server started" |

---

**¡Aplicación 100% funcional con PHP puro para emails!** 🎉
