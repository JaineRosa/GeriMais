package com.example.LarIdosos.Models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalTime;
import java.util.List;


@Document(collection = "agendamentos_medicamento")
public class AgendamentoMedicamento {

    @Id
    private String Id;
    private String medicamentoId;
    private String idosoId;
    private List<LocalTime> horarios;
    private List<String> diasSemana;

    public AgendamentoMedicamento() {
    }

    public AgendamentoMedicamento(String id, String medicamentoId, String idosoId, List<LocalTime> horarios, List<String> diasSemana) {
        Id = id;
        this.medicamentoId = medicamentoId;
        this.idosoId = idosoId;
        this.horarios = horarios;
        this.diasSemana = diasSemana;
    }

    public String getId() {
        return Id;
    }

    public void setId(String id) {
        Id = id;
    }

    public String getMedicamentoId() {
        return medicamentoId;
    }

    public void setMedicamentoId(String medicamentoId) {
        this.medicamentoId = medicamentoId;
    }

    public String getIdosoId() {
        return idosoId;
    }

    public void setIdosoId(String idosoId) {
        this.idosoId = idosoId;
    }

    public List<LocalTime> getHorarios() {
        return horarios;
    }

    public void setHorarios(List<LocalTime> horarios) {
        this.horarios = horarios;
    }

    public List<String> getDiasSemana() {
        return diasSemana;
    }

    public void setDiasSemana(List<String> diasSemana) {
        this.diasSemana = diasSemana;
    }
}