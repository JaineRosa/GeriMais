package com.example.LarIdosos.Models;

import com.example.LarIdosos.Models.Enum.StatusVisita;
import com.example.LarIdosos.Models.Enum.TipoVisita;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;


@Document(collection = "visitas")
public class Visita {

    @Id
    private String id;
    private String idosoId;
    private String cuidadorId;
    private String visitanteId;
    private TipoVisita tipoVisita;
    private LocalDateTime dataHoraVisita;
    private StatusVisita statusVisita;
    private String observacoes;

    public Visita(String id, String idosoId, String cuidadorId, String visitanteId, TipoVisita tipoVisita, LocalDateTime dataHoraVisita, StatusVisita statusVisita, String observacoes) {
        this.id = id;
        this.idosoId = idosoId;
        this.cuidadorId = cuidadorId;
        this.visitanteId = visitanteId;
        this.tipoVisita = tipoVisita;
        this.dataHoraVisita = dataHoraVisita;
        this.statusVisita = statusVisita;
        this.observacoes = observacoes;
    }

    public Visita() {
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

    public String getCuidadorId() {
        return cuidadorId;
    }

    public void setCuidadorId(String cuidadorId) {
        this.cuidadorId = cuidadorId;
    }

    public String getVisitanteId() {
        return visitanteId;
    }

    public void setVisitanteId(String visitanteId) {
        this.visitanteId = visitanteId;
    }


    public TipoVisita getTipoVisita() {
        return tipoVisita;
    }

    public void setTipoVisita(TipoVisita tipoVisita) {
        this.tipoVisita = tipoVisita;
    }

    public LocalDateTime getDataHoraVisita() {
        return dataHoraVisita;
    }

    public void setDataHoraVisita(LocalDateTime dataHoraVisita) {
        this.dataHoraVisita = dataHoraVisita;
    }

    public StatusVisita getStatusVisita() {
        return statusVisita;
    }

    public void setStatusVisita(StatusVisita statusVisita) {
        this.statusVisita = statusVisita;
    }

    public String getObservacoes() {
        return observacoes;
    }

    public void setObservacoes(String observacoes) {
        this.observacoes = observacoes;
    }
}