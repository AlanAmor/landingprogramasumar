package com.minsalud.webayudas.service;

import com.minsalud.webayudas.model.ReclamoRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired(required = false)
    private JavaMailSender mailSender;

    @Value("${spring.mail.username:}")
    private String fromEmail;

    public void enviarReclamo(ReclamoRequest reclamo) throws Exception {
        if (mailSender == null) {
            // No hay configuración de mail en app, se saltea envió de email y se loguea.
            System.out.println("[EmailService] JavaMailSender no configurado; no se envía email.");
            return;
        }

        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(fromEmail);
            message.setTo("alan43009459@gmail.com");
            message.setSubject("Reclamo de " + reclamo.getEfectorSalud() + " (" + reclamo.getCuie() + ")");
            
            String body = "DATOS PERSONALES DEL USUARIO:\n\n" +
                    "Nombre: " + reclamo.getNombreCompleto() + "\n" +
                    "Cargo: " + reclamo.getCargo() + "\n" +
                    "Teléfono: " + reclamo.getCelular() + "\n" +
                    "Email: " + reclamo.getEmail() + "\n\n" +
                    "DATOS DEL EFECTOR:\n\n" +
                    "Efector de Salud: " + reclamo.getEfectorSalud() + "\n" +
                    "CUIE: " + reclamo.getCuie() + "\n\n" +
                    "DESCRIPCIÓN DEL PROBLEMA:\n\n" +
                    reclamo.getProblematica();
            
            message.setText(body);
            mailSender.send(message);
        } catch (Exception e) {
            throw new Exception("Error al enviar el reclamo: " + e.getMessage(), e);
        }
    }
}
