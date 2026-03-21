# Configuración para el envío de emails
# Este archivo contiene las instrucciones para configurar el envío de emails a través de Gmail

## PASOS PARA CONFIGURAR EL ENVÍO DE EMAILS:

### 1. PREPARAR LA CUENTA DE GMAIL
- Accede a tu cuenta de Gmail
- Ve a https://myaccount.google.com/security
- Activa la verificación en dos pasos si aún no lo has hecho
- Luego ve a https://myaccount.google.com/apppasswords
- Selecciona "Mail" y "Windows Computer"
- Google generará una contraseña de aplicación (16 caracteres)
- Copia esta contraseña

### 2. CONFIGURAR LA APLICACIÓN
- Abre el archivo: src/main/resources/application.properties
- Reemplaza los siguientes valores:
  * spring.mail.username=your-email@gmail.com → Coloca tu email de Gmail
  * spring.mail.password=your-app-password → Coloca la contraseña generada en el paso anterior

Ejemplo:
```
spring.mail.username=alan43009459@gmail.com
spring.mail.password=abcd efgh ijkl mnop
```

### 3. COMPILAR Y EJECUTAR
- Ejecuta: mvn clean install
- Luego: mvn spring-boot:run
- Accede a: http://localhost:8080

### 4. PROBAR EL FORMULARIO
- Completa todos los campos del formulario
- Haz clic en "Enviar Reclamo"
- El email debería llegar a: alan43009459@gmail.com

## NOTA IMPORTANTE:
⚠️ No compartas tu contraseña de aplicación en repositorios públicos o con otras personas.
⚠️ La contraseña de aplicación es diferente a tu contraseña de Gmail normal.
⚠️ Si cambias tu contraseña de Gmail, tendrás que generar una nueva contraseña de aplicación.
