# 🧪 GUÍA DE TESTING

## Cómo probar la aplicación sin problemas

---

## 1️⃣ PRUEBA DEL FORMULARIO (SIN ENVIAR EMAIL)

### Verificar validaciones en tiempo real

Abre http://localhost:8080 y prueba lo siguiente:

#### a) Campo Nombre Completo
- ✅ Escribe más de 40 caracteres → Se cortará automáticamente
- ✅ Déjalo vacío → Mostrará error rojo
- ✅ Escribe "Juan Pérez" → Se pondrá verde

#### b) Campo Cargo
- ✅ Escribe más de 100 caracteres → Se cortará
- ✅ Déjalo vacío → Error rojo
- ✅ Escribe "Médico" → Se pondrá verde

#### c) Campo Celular
- ✅ Intenta escribir letras → Se rechazarán
- ✅ Escribe más de 15 dígitos → Se cortará
- ✅ Escribe "3421234567" → Se pondrá verde

#### d) Campo Email
- ✅ Escribe "correo.incorrecto" → Mostrará error (falta @)
- ✅ Escribe "correo@" → Error (falta dominio)
- ✅ Escribe "correo@ejemplo.com" → Se pondrá verde
- ✅ Escribe más de 50 caracteres → Se cortará

#### e) Campo Efector de Salud
- ✅ Escribe más de 100 caracteres → Se cortará
- ✅ Déjalo vacío → Error rojo
- ✅ Escribe "Hospital General" → Se pondrá verde

#### f) Campo CUIE
- ✅ Escribe menos de 10 caracteres → Error
- ✅ Escribe más de 10 caracteres → Se cortará
- ✅ Escribe "1234567890" → Se pondrá verde

#### g) Campo Problemática
- ✅ Verifica que el contador de caracteres funcione
- ✅ Escribe 200 caracteres → Se parará
- ✅ Verifica que se ponga naranja al llegar a límite
- ✅ Escribe "Este es mi problema" → Se pondrá verde

---

## 2️⃣ PRUEBA DEL FORMULARIO COMPLETO (SIN ENVIAR)

### Llenar un formulario correcto pero sin enviar

1. Completa todos los campos así:
   - Nombre: Juan Pérez López
   - Cargo: Médico Especialista
   - Celular: 3421234567
   - Email: juan@ejemplo.com
   - Efector: Hospital General
   - CUIE: 1234567890
   - Problemática: Tengo un problema con la plataforma

2. Verifica que:
   - ✅ Todos los campos estén en verde
   - ✅ Todos los campos estén llenos
   - ✅ El botón "Enviar Reclamo" esté habilitado

3. Presiona "Limpiar Formulario"
   - ✅ Todos los campos se deben vaciar
   - ✅ Los indicadores de validación desaparecen

---

## 3️⃣ PRUEBA DE ENVÍO (REQUIERE GMAIL CONFIGURADO)

### Enviar un reclamo real

⚠️ **Antes de esto, asegúrate de haber configurado Gmail en `application.properties`**

1. Ejecuta la aplicación con:
   ```bash
   mvn spring-boot:run
   ```

2. Llena el formulario con datos válidos:
   ```
   Nombre: Juan Pérez
   Cargo: Médico
   Celular: 3421234567
   Email: tu-email-real@gmail.com
   Efector: Hospital Municipal
   CUIE: 1234567890
   Problemática: Esta es una prueba del sistema de reclamos
   ```

3. Haz clic en "Enviar Reclamo"

4. Espera unos segundos...

5. Deberías ver:
   - ✅ Spinner animado mientras se procesa
   - ✅ Mensaje verde de éxito
   - ✅ Formulario se limpia automáticamente

6. Verifica tu email:
   - ✅ Gmail de destino recibió el correo
   - ✅ Asunto: "Reclamo de Hospital Municipal (1234567890)"
   - ✅ Cuerpo contiene: tu nombre, cargo, teléfono, email, problemática

---

## 4️⃣ PRUEBAS DE ERRORES INTENCIONALES

### Test de validación de errores

#### Falta el Nombre:
1. Deja el campo Nombre vacío
2. Llena los otros campos correctamente
3. Intenta enviar
4. ✅ Debería mostrar: "El nombre completo es requerido"

#### Email inválido:
1. Llena todos los campos
2. Coloca "emailinvalido" (sin @)
3. Intenta enviar
4. ✅ Debería mostrar: "El email no es válido"

#### Celular con letras:
1. En el campo celular escribe "abc123"
2. ✅ Las letras no deberían aparecer

#### CUIE incorrecto:
1. Coloca "123" en CUIE (menos de 10)
2. Intenta enviar
3. ✅ Debería mostrar: "El CUIE debe tener exactamente 10 caracteres"

#### Problemática muy larga:
1. Intenta escribir 250 caracteres en Problemática
2. ✅ Al llegar a 200 se detiene la escritura
3. El contador debe marcar "200/200"

---

## 5️⃣ PRUEBAS DE RESPONSIVIDAD

### Verificar que funciona en diferentes tamaños

#### En PC:
1. Abre http://localhost:8080
2. ✅ Logo y título lado a lado
3. ✅ Formulario con 2 columnas
4. ✅ Botones horizontal

#### En Tablet (768px):
1. Redimensiona la ventana a 768px
2. ✅ Navbar se adapta
3. ✅ Logo se centra si es necesario
4. ✅ Formulario se ajusta

#### En Móvil (320px):
1. Redimensiona a 320px o abre en celular
2. ✅ Todo se ve en una columna
3. ✅ Menú hamburguesa funciona
4. ✅ Botones apilados
5. ✅ Texto legible

---

## 6️⃣ PRUEBAS DE NAVEGACIÓN

### Menus y links

1. Haz clic en "Inicio" → ✅ Va a inicio
2. Haz clic en "Acerca de" → ✅ Scroll suave a sección
3. Haz clic en "Contacto" → ✅ Scroll suave al formulario
4. Botón "Ir a Reclamos" → ✅ Scroll a formulario
5. En formulario, haz clic en links → ✅ Todas funcionan

---

## 7️⃣ PRUEBAS DE NAVEGADORES

Prueba en cada navegador:

- [ ] Chrome (último)
- [ ] Firefox (último)
- [ ] Safari (macOS)
- [ ] Edge (último)

En cada uno verifica:
- ✅ Página carga correctamente
- ✅ Estilos se ven bien
- ✅ JavaScript funciona
- ✅ Formulario valida

---

## 8️⃣ PRUEBAS DE ACCESIBILIDAD

### Navegación por teclado

1. Presiona TAB varias veces
   - ✅ Todos los botones y campos deben recibir focus
   
2. En un campo, presiona Tab
   - ✅ El focus se traslada al siguiente
   
3. Cuando un botón tiene focus, presiona Enter
   - ✅ Debe funcionar normalmente

---

## 9️⃣ PROBLEMAS COMUNES Y SOLUCIÓN

| Problema | Solución |
|----------|----------|
| El email no se envía | Verifica Gmail en application.properties |
| Formulario no valida | Abre consola (F12) y revisa errores |
| Página no carga | Verifica que mvn spring-boot:run esté ejecutándose |
| Estilos ven mal | Limpia caché (Ctrl+Shift+Supr) |
| Celular acepta letras | Recarga la página |

---

## 🔍 VERIFICACIÓN FINAL

Antes de dar por completada la aplicación, verifica:

- [ ] Landing page se ve profesional
- [ ] Logo e imagen están correctos
- [ ] Todos los campos de formulario existen
- [ ] Validaciones funcionan en tiempo real
- [ ] Botones responden al click
- [ ] Se puede enviar un reclamo
- [ ] Email llega correctamente
- [ ] Funciona en móvil
- [ ] Funciona en tablet
- [ ] Funciona en PC
- [ ] Funciona en Chrome
- [ ] Funciona en Firefox
- [ ] Funciona en otros navegadores
- [ ] Los colores son acordes al logo
- [ ] Las animaciones se ven fluidas
- [ ] El menú de contacto funciona

---

## 📞 DATOS PARA PRUEBAS

Usa estos datos para probar:

```json
{
  "nombreCompleto": "Ana María García López",
  "cargo": "Enfermera Jefe",
  "celular": "3421234567",
  "email": "ana@ejemplo.com",
  "efectorSalud": "Centro de Salud Barrio Nueva Esperanza",
  "cuie": "9876543210",
  "problematica": "No puedo acceder al sistema del programa SUMAR+ desde hace 3 días"
}
```

O estos:

```json
{
  "nombreCompleto": "Carlos Roberto Martínez",
  "cargo": "Médico General",
  "celular": "3429876543",
  "email": "carlos.martinez@correo.com",
  "efectorSalud": "Clínica Privada Centro",
  "cuie": "1111111111",
  "problematica": "Necesito reportar un error en los datos del paciente registrado el 20/01/2024"
}
```

---

## ✅ CHECKLIST FINAL

```
FUNCIONALIDAD:
[ ] Landing page muestra logo y título
[ ] Formulario tiene todos los campos
[ ] Validaciones en tiempo real funcionan
[ ] Envío de email funciona
[ ] Mensajes de éxito/error aparecen
[ ] Formulario se limpia después de enviar

DISEÑO:
[ ] Colores acordes al logo
[ ] Responsive en móvil
[ ] Responsive en tablet
[ ] Responsive en PC
[ ] Animaciones son suaves
[ ] Botones tienen buenos estilos

VALIDACIONES:
[ ] Nombre máximo 40 caracteres
[ ] Cargo máximo 100 caracteres
[ ] Celular máximo 15 dígitos, solo números
[ ] Email valida formato
[ ] Efector máximo 100 caracteres
[ ] CUIE exactamente 10 caracteres
[ ] Problemática máximo 200 caracteres
[ ] Todos los campos son obligatorios

SEGURIDAD:
[ ] Validaciones en servidor funcionan
[ ] Validaciones en cliente funcionan
[ ] No hay errores en consola
[ ] Email no se expone en HTML

NAVEGACIÓN:
[ ] Menú de navegación funciona
[ ] Botón Contacto lleva al formulario
[ ] Links internos funcionan
[ ] Desplazamiento es suave
```

---

¡Listo! Tu aplicación está completamente lista para usar. 🎉
