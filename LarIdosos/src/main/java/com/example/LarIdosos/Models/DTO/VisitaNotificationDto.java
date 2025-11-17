package com.example.LarIdosos.Models.DTO;

import java.time.LocalDateTime;

public class VisitaNotificationDto {
    private String tipoNotificacao;
    private String idosoId;
    private String cuidadorId;
    private String nomeVisitante;
    private LocalDateTime dataHoraVisita;

    public VisitaNotificationDto(String tipoNotificacao, String idosoId, String cuidadorId, String nomeVisitante, LocalDateTime dataHoraVisita) {
        this.tipoNotificacao = tipoNotificacao;
        this.idosoId = idosoId;
        this.cuidadorId = cuidadorId;
        this.nomeVisitante = nomeVisitante;
        this.dataHoraVisita = dataHoraVisita;
    }

    public String getTipoNotificacao() {
        return tipoNotificacao;
    }

    public void setTipoNotificacao(String tipoNotificacao) {
        this.tipoNotificacao = tipoNotificacao;
    }

    public String getIdosoId() {
        return idosoId;
    }

    public void setIdosoId(String idosoId) {
        this.idosoId = idosoId;
    }

    public String getCuidadorId() {
        return cuidadorId;
    }

    public void setCuidadorId(String cuidadorId) {
        this.cuidadorId = cuidadorId;
    }

    public String getNomeVisitante() {
        return nomeVisitante;
    }

    public void setNomeVisitante(String nomeVisitante) {
        this.nomeVisitante = nomeVisitante;
    }

    public LocalDateTime getDataHoraVisita() {
        return dataHoraVisita;
    }

    public void setDataHoraVisita(LocalDateTime dataHoraVisita) {
        this.dataHoraVisita = dataHoraVisita;
    }
}
