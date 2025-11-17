package com.example.notification_service.Models;

import java.time.LocalDateTime;

public class SaudeDiariaAlertaDto {
    private String idosoId;
    private String responsavelId;
    private String motivoAlerta;
    private String valorRegistrado;
    private LocalDateTime dataHoraRegistro;

    public SaudeDiariaAlertaDto(String idosoId, String responsavelId, String motivoAlerta, String valorRegistrado, LocalDateTime dataHoraRegistro) {
        this.idosoId = idosoId;
        this.responsavelId = responsavelId;
        this.motivoAlerta = motivoAlerta;
        this.valorRegistrado = valorRegistrado;
        this.dataHoraRegistro = dataHoraRegistro;
    }

    public SaudeDiariaAlertaDto() {
    }

    public String getIdosoId() {
        return idosoId;
    }

    public void setIdosoId(String idosoId) {
        this.idosoId = idosoId;
    }

    public String getResponsavelId() {
        return responsavelId;
    }

    public void setResponsavelId(String responsavelId) {
        this.responsavelId = responsavelId;
    }

    public String getMotivoAlerta() {
        return motivoAlerta;
    }

    public void setMotivoAlerta(String motivoAlerta) {
        this.motivoAlerta = motivoAlerta;
    }

    public String getValorRegistrado() {
        return valorRegistrado;
    }

    public void setValorRegistrado(String valorRegistrado) {
        this.valorRegistrado = valorRegistrado;
    }

    public LocalDateTime getDataHoraRegistro() {
        return dataHoraRegistro;
    }

    public void setDataHoraRegistro(LocalDateTime dataHoraRegistro) {
        this.dataHoraRegistro = dataHoraRegistro;
    }
}