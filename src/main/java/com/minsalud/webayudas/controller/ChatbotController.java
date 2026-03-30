package com.minsalud.webayudas.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/chatbot")
public class ChatbotController {

    @Value("${openai.api.key:}")
    private String openAiApiKey;

    @PostMapping
    public ResponseEntity<Map<String, String>> responder(@RequestBody Map<String, String> body) {
        String query = body.getOrDefault("query", "").trim();
        if (query.isEmpty()) {
            Map<String, String> error = Map.of("error", "Consulta vacía");
            return ResponseEntity.badRequest().body(error);
        }

        if (openAiApiKey == null || openAiApiKey.isBlank()) {
            return ResponseEntity.ok(Map.of("answer", fallbackChatbot(query)));
        }

        try {
            String iaResponse = callOpenAi(query);
            return ResponseEntity.ok(Map.of("answer", iaResponse));
        } catch (Exception e) {
            return ResponseEntity.ok(Map.of("answer", fallbackChatbot(query))); // fallback local
        }
    }

    private String callOpenAi(String query) {
        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(openAiApiKey);

        Map<String, Object> userMessage = Map.of("role", "user", "content", query);
        Map<String, Object> systemMessage = Map.of("role", "system", "content", "Eres un asistente experto en el programa Sumar+ del Ministerio de Salud. Responde con claridad y orientación para reclamos y consultas.");
        Map<String, Object> payload = new HashMap<>();
        payload.put("model", "gpt-3.5-turbo");
        payload.put("messages", List.of(systemMessage, userMessage));
        payload.put("max_tokens", 280);
        payload.put("temperature", 0.7);

        HttpEntity<Map<String, Object>> request = new HttpEntity<>(payload, headers);

        Map<String, Object> response = restTemplate.postForObject("https://api.openai.com/v1/chat/completions", request, Map.class);
        if (response != null && response.containsKey("choices")) {
            Object choicesObj = response.get("choices");
            if (choicesObj instanceof List<?> choices && !choices.isEmpty()) {
                Object first = choices.get(0);
                if (first instanceof Map<?, ?> firstMap) {
                    Object messageObj = firstMap.get("message");
                    if (messageObj instanceof Map<?, ?> messageMap) {
                        Object content = messageMap.get("content");
                        if (content instanceof String) {
                            return ((String) content).trim();
                        }
                    }
                }
            }
        }

        throw new HttpClientErrorException(HttpStatus.INTERNAL_SERVER_ERROR, "No se obtuvo respuesta válida de OpenAI");
    }

    private String fallbackChatbot(String query) {
        String lower = query.toLowerCase();

        if (lower.contains("sumar") || lower.contains("programa")) {
            return "Sumar+ es el programa del Ministerio de Salud para reclamos y consultas de la red sanitaria en Santa Fe. Completa el formulario en la página.";
        }

        if (lower.contains("reclamo") || lower.contains("consulta") || lower.contains("enviar")) {
            return "Para enviar un reclamo, completa el formulario con tus datos (nombre, cargo, celular, email, efector, CUIE y descripción) y presiona Enviar.";
        }

        if (lower.contains("contacto") || lower.contains("email") || lower.contains("teléfono")) {
            return "Puedes escribir a info@minsalud-sf.gov.ar o revisar el footer para más detalles de contacto.";
        }

        if (lower.contains("horario") || lower.contains("24/7") || lower.contains("atención")) {
            return "El sistema está disponible 24/7. El equipo responde en horario administrativo, pero la plataforma recibe consultas en cualquier momento.";
        }

        return "Disculpa, no puedo responder esa pregunta con certeza aun. Por favor, intenta de nuevo con más datos o usa el formulario de reclamos.";
    }
}
