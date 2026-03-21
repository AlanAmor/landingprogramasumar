package com.minsalud.webayudas.controller;

import com.minsalud.webayudas.model.ReclamoRequest;
import com.minsalud.webayudas.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.regex.Pattern;

@RestController
@RequestMapping("/api/reclamos")
@CrossOrigin(origins = "*")
public class ReclamoController {

    @Autowired
    private EmailService emailService;

    @PostMapping("/enviar")
    public ResponseEntity<?> enviarReclamo(@RequestBody ReclamoRequest reclamo) {
        Map<String, String> response = new HashMap<>();

        // Validaciones
        if (reclamo.getNombreCompleto() == null || reclamo.getNombreCompleto().trim().isEmpty()) {
            response.put("error", "El nombre completo es requerido");
            return ResponseEntity.badRequest().body(response);
        }

        if (reclamo.getNombreCompleto().length() > 40) {
            response.put("error", "El nombre completo no puede exceder 40 caracteres");
            return ResponseEntity.badRequest().body(response);
        }

        if (reclamo.getCargo() == null || reclamo.getCargo().trim().isEmpty()) {
            response.put("error", "El cargo es requerido");
            return ResponseEntity.badRequest().body(response);
        }

        if (reclamo.getCargo().length() > 100) {
            response.put("error", "El cargo no puede exceder 100 caracteres");
            return ResponseEntity.badRequest().body(response);
        }

        if (reclamo.getCelular() == null || reclamo.getCelular().trim().isEmpty()) {
            response.put("error", "El celular es requerido");
            return ResponseEntity.badRequest().body(response);
        }

        if (!reclamo.getCelular().matches("\\d{1,15}")) {
            response.put("error", "El celular debe contener solo números y no exceder 15 dígitos");
            return ResponseEntity.badRequest().body(response);
        }

        if (reclamo.getEmail() == null || reclamo.getEmail().trim().isEmpty()) {
            response.put("error", "El email es requerido");
            return ResponseEntity.badRequest().body(response);
        }

        if (reclamo.getEmail().length() > 50) {
            response.put("error", "El email no puede exceder 50 caracteres");
            return ResponseEntity.badRequest().body(response);
        }

        if (!isValidEmail(reclamo.getEmail())) {
            response.put("error", "El email no es válido");
            return ResponseEntity.badRequest().body(response);
        }

        if (reclamo.getEfectorSalud() == null || reclamo.getEfectorSalud().trim().isEmpty()) {
            response.put("error", "El efector de salud es requerido");
            return ResponseEntity.badRequest().body(response);
        }

        if (reclamo.getEfectorSalud().length() > 100) {
            response.put("error", "El efector de salud no puede exceder 100 caracteres");
            return ResponseEntity.badRequest().body(response);
        }

        if (reclamo.getCuie() == null || reclamo.getCuie().trim().isEmpty()) {
            response.put("error", "El CUIE es requerido");
            return ResponseEntity.badRequest().body(response);
        }

        if (reclamo.getCuie().length() > 10) {
            response.put("error", "El CUIE no puede exceder 10 caracteres");
            return ResponseEntity.badRequest().body(response);
        }

        if (reclamo.getProblematica() == null || reclamo.getProblematica().trim().isEmpty()) {
            response.put("error", "La problemática es requerida");
            return ResponseEntity.badRequest().body(response);
        }

        if (reclamo.getProblematica().length() > 200) {
            response.put("error", "La problemática no puede exceder 200 caracteres");
            return ResponseEntity.badRequest().body(response);
        }

        // Enviar reclamo por email vía servicio Spring
        try {
            emailService.enviarReclamo(reclamo);
            response.put("mensaje", "¡Reclamo enviado exitosamente! Revisa tu casilla de email.");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response.put("error", "Error al enviar email: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    private boolean isValidEmail(String email) {
        String emailRegex = "^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$";
        Pattern pattern = Pattern.compile(emailRegex);
        return pattern.matcher(email).matches();
    }
}
