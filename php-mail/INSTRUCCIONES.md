# 📧 SERVIDOR PHP - ENVÍO DE EMAILS

## 🚀 CÓMO USAR

Este directorio contiene el servidor PHP que maneja el envío de reclamos por email.

### ✅ Pasos para ejecutar:

#### 1. **Abre una terminal/consola en esta carpeta:**
```shell
cd php-mail
```

#### 2. **Ejecuta el servidor PHP integrado:**
```shell
php -S localhost:8888
```

**Deberías ver:**
```
Development Server (http://localhost:8888) started
```

#### 3. **Listo!**
El servidor PHP está corriendo en: `http://localhost:8888`

---

## 🔧 ¿QUÉ HACE ESTE SERVER?

- ✅ Recibe los datos del formulario desde JavaScript
- ✅ Valida todos los campos (igual que antes)
- ✅ Envía el email usando `mail()` de PHP
- ✅ Maneja CORS para que funcione con página en localhost:8080
- ✅ Retorna JSON con éxito o error

---

## 📧 CONFIGURACIÓN DE EMAIL

### Opción A: Windows (Requiere servidor SMTP)

Si tienes un servidor SMTP local, configura tu `php.ini`:

```ini
[mail function]
SMTP = smtp.gmail.com
smtp_port = 587
sendmail_from = tu-email@gmail.com
```

### Opción B: Linux/Mac (Generalmente ya configurado)

En servidores Unix/Linux, PHP usa `sendmail` que generalmente está pre-configurado.

### Opción C: Cambiar manualmente en send-email.php

Si necesitas usar Mailtrap o similar, puedes editar `send-email.php` y agregar una librería como PHPMailer.

---

## ⚠️ REQUISITOS

- ✅ PHP instalado en tu máquina
- ✅ Acceso a un servidor SMTP (Gmail, Mailtrap, tu servidor local, etc.)

### Verificar que PHP está instalado:
```shell
php --version
```

---

## 🎯 FLUJO DE DATOS

```
Usuario llena formulario (localhost:8080)
         ↓
Click "Enviar Reclamo"
         ↓
JavaScript: POST a http://localhost:8888/send-email.php
         ↓
send-email.php recibe datos
         ↓
Valida todos los campos
         ↓
Construye el email
         ↓
Ejecuta mail()
         ↓
Email enviado a: alan43009459@gmail.com
         ↓
Retorna JSON al JavaScript
         ↓
Usuario ve mensaje de éxito
```

---

## 🔌 ENDPOINTS

**POST** `http://localhost:8888/send-email.php`

**Entrada (JSON):**
```json
{
  "nombreCompleto": "Juan Pérez",
  "cargo": "Médico",
  "celular": "3421234567",
  "email": "juan@ejemplo.com",
  "efectorSalud": "Hospital General",
  "cuie": "1234567890",
  "problematica": "Descripción del problema"
}
```

**Respuesta (éxito):**
```json
{
  "mensaje": "¡Reclamo enviado exitosamente! Nos pondremos en contacto pronto."
}
```

**Respuesta (error):**
```json
{
  "error": "Validación fallida",
  "detalles": {
    "email": "El email no es válido"
  }
}
```

---

## ⚙️ CONFIGURACIÓN AVANZADA

### Usar Mailtrap en lugar de mail() nativo:

Si quieres usar un SMTP externo como Mailtrap, necesitarás PHPMailer:

1. Instala PHPMailer con Composer:
```bash
composer require phpmailer/phpmailer
```

2. Modifica `send-email.php` para usar PHPMailer

Pero la versión actual asume que tu servidor tiene `mail()` configurado.

---

## 🐛 SOLUCIÓN DE PROBLEMAS

### "PHP no se reconoce"
→ PHP no está en el PATH. Instálalo desde https://www.php.net

### "Puerto 8888 ya está en uso"
```shell
# Usa otro puerto
php -S localhost:8889
# Actualiza también en main.js: http://localhost:8889/send-email.php
```

### "Error al enviar email"
→ Tu servidor SMTP no está configurado. Configura `php.ini` o usa Mailtrap/similar

### "CORS error en navegador"
→ El servidor PHP debe estar corriendo. Verifica que veas el mensaje de "Development Server started"

---

## ℹ️ INFORMACIÓN TÉCNICA

- **Lenguaje**: PHP 7.4+
- **Método**: email via native `mail()`
- **CORS**: Habilitado para acceso desde localhost:8080
- **Validaciones**: Las mismas que en Java
- **Seguridad**: HTML escape en todos los datos

---

## 📝 NOTAS IMPORTANTES

- ⚠️ El servidor PHP debe estar corriendo **mientras usas la aplicación**
- ⚠️ Si cierras la terminal, el servidor se detiene
- ⚠️ Cada vez que reinicies, ejecuta nuevamente `php -S localhost:8888`
- ✅ El formulario en localhost:8080 seguirá funcionando exactamente igual

---

**¡Listo! Tu aplicación ahora usa PHP puro para envío de emails.** 🎉
