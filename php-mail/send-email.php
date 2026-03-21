<?php
// CORS Headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Si es OPTIONS, retorna OK
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Solo procesa POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Método no permitido']);
    exit();
}

// Obtiene los datos del POST
$data = json_decode(file_get_contents('php://input'), true);

// Función para validar email
function isValidEmail($email) {
    return filter_var($email, FILTER_VALIDATE_EMAIL) !== false;
}

// Validaciones
$errors = [];

if (empty($data['nombreCompleto'])) {
    $errors['nombreCompleto'] = 'El nombre completo es requerido';
} elseif (strlen($data['nombreCompleto']) > 40) {
    $errors['nombreCompleto'] = 'El nombre completo no puede exceder 40 caracteres';
}

if (empty($data['cargo'])) {
    $errors['cargo'] = 'El cargo es requerido';
} elseif (strlen($data['cargo']) > 100) {
    $errors['cargo'] = 'El cargo no puede exceder 100 caracteres';
}

if (empty($data['celular'])) {
    $errors['celular'] = 'El celular es requerido';
} elseif (!preg_match('/^\d{1,15}$/', $data['celular'])) {
    $errors['celular'] = 'El celular debe contener solo números y no exceder 15 dígitos';
}

if (empty($data['email'])) {
    $errors['email'] = 'El email es requerido';
} elseif (strlen($data['email']) > 50) {
    $errors['email'] = 'El email no puede exceder 50 caracteres';
} elseif (!isValidEmail($data['email'])) {
    $errors['email'] = 'El email no es válido';
}

if (empty($data['efectorSalud'])) {
    $errors['efectorSalud'] = 'El efector de salud es requerido';
} elseif (strlen($data['efectorSalud']) > 100) {
    $errors['efectorSalud'] = 'El efector de salud no puede exceder 100 caracteres';
}

if (empty($data['cuie'])) {
    $errors['cuie'] = 'El CUIE es requerido';
} elseif (strlen($data['cuie']) !== 10) {
    $errors['cuie'] = 'El CUIE debe tener exactamente 10 caracteres';
}

if (empty($data['problematica'])) {
    $errors['problematica'] = 'La problemática es requerida';
} elseif (strlen($data['problematica']) > 200) {
    $errors['problematica'] = 'La problemática no puede exceder 200 caracteres';
}

// Si hay errores, los retorna
if (!empty($errors)) {
    http_response_code(400);
    echo json_encode(['error' => 'Validación fallida', 'detalles' => $errors]);
    exit();
}

// Construye el email
$destinatario = 'alan43009459@gmail.com';
$asunto = 'Reclamo de ' . htmlspecialchars($data['efectorSalud']) . ' (' . htmlspecialchars($data['cuie']) . ')';

$cuerpo = "DATOS PERSONALES DEL USUARIO:\n\n";
$cuerpo .= "Nombre: " . htmlspecialchars($data['nombreCompleto']) . "\n";
$cuerpo .= "Cargo: " . htmlspecialchars($data['cargo']) . "\n";
$cuerpo .= "Teléfono: " . htmlspecialchars($data['celular']) . "\n";
$cuerpo .= "Email: " . htmlspecialchars($data['email']) . "\n\n";
$cuerpo .= "DATOS DEL EFECTOR:\n\n";
$cuerpo .= "Efector de Salud: " . htmlspecialchars($data['efectorSalud']) . "\n";
$cuerpo .= "CUIE: " . htmlspecialchars($data['cuie']) . "\n\n";
$cuerpo .= "DESCRIPCIÓN DEL PROBLEMA:\n\n";
$cuerpo .= htmlspecialchars($data['problematica']);

// Headers del email
$headers = "From: " . htmlspecialchars($data['email']) . "\r\n";
$headers .= "Reply-To: " . htmlspecialchars($data['email']) . "\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

// Intenta enviar el email
if (mail($destinatario, $asunto, $cuerpo, $headers)) {
    http_response_code(200);
    echo json_encode([
        'mensaje' => '¡Reclamo enviado exitosamente! Nos pondremos en contacto pronto.'
    ]);
} else {
    http_response_code(500);
    echo json_encode([
        'error' => 'Error al enviar el email. Por favor intenta más tarde.'
    ]);
}
?>
