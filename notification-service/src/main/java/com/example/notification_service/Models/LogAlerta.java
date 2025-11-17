package com.example.notification_service.Models;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "logs_alerta")
public class LogAlerta {

    @Id
    private String id;
    private String idosoId;
    private String agendamentoId;
    private String statusEnvio;
    private LocalDateTime timestamp;
    private String mensagem;

    public LogAlerta() {
    }

    public LogAlerta(String id, String idosoId, String agendamentoId, String statusEnvio, LocalDateTime timestamp, String mensagem) {
        this.id = id;
        this.idosoId = idosoId;
        this.agendamentoId = agendamentoId;
        this.statusEnvio = statusEnvio;
        this.timestamp = timestamp;
        this.mensagem = mensagem;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getIdosoId() {
        return idosoId;
    }

    public void setIdosoId(String idosoId) {
        this.idosoId = idosoId;
    }

    public String getAgendamentoId() {
        return agendamentoId;
    }

    public void setAgendamentoId(String agendamentoId) {
        this.agendamentoId = agendamentoId;
    }

    public String getStatusEnvio() {
        return statusEnvio;
    }

    public void setStatusEnvio(String statusEnvio) {
        this.statusEnvio = statusEnvio;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }

    public String getMensagem() {
        return mensagem;
    }

    public void setMensagem(String mensagem) {
        this.mensagem = mensagem;
    }
}