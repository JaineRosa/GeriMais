package com.example.notification_service.Models;

import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "logs_alerta")
public class LogAlerta {

    @Id
    private String id;

    // Referência ao ID do Idoso que recebeu o alerta
    private String idosoIdRef;

    // Referência ao ID do agendamento ou visita que disparou o alerta
    private String agendamentoIdRef;

    private String statusEnvio; // Ex: "SUCESSO_SIMULADO"

    private LocalDateTime timestamp; // Data e hora que o alerta foi processado

    // Mensagem de log (para facilitar a depuração)
    private String mensagem; // Ex: "Alerta para 'Losartana' enviado para Idoso 1"
}