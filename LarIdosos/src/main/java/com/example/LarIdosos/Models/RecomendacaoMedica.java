package com.example.LarIdosos.Models;

import com.example.LarIdosos.Models.Enum.PrioridadeRecomendacao;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.List;


@Document(collection = "prescricoes")
public class RecomendacaoMedica {

    @Id
    private String Id;
    private String medicoId;
    private String idosoId;
    private LocalDateTime dataRecomendacao;
    private String descricaoGeral;
    public PrioridadeRecomendacao prioridade;
    private List<ItemPrescrito> medicamentosPrescritos;

    public RecomendacaoMedica() {
    }

    public String getId() {
        return Id;
    }

    public void setId(String id) {
        Id = id;
    }

    public String getMedicoId() {
        return medicoId;
    }

    public void setMedicoId(String medicoId) {
        this.medicoId = medicoId;
    }

    public String getIdosoId() {
        return idosoId;
    }

    public void setIdosoId(String idosoId) {
        this.idosoId = idosoId;
    }

    public LocalDateTime getDataRecomendacao() {
        return dataRecomendacao;
    }

    public void setDataRecomendacao(LocalDateTime dataRecomendacao) {
        this.dataRecomendacao = dataRecomendacao;
    }

    public PrioridadeRecomendacao getPrioridade() {
        return prioridade;
    }

    public void setPrioridade(PrioridadeRecomendacao prioridade) {
        this.prioridade = prioridade;
    }

    public List<ItemPrescrito> getMedicamentosPrescritos() {
        return medicamentosPrescritos;
    }

    public void setMedicamentosPrescritos(List<ItemPrescrito> medicamentosPrescritos) {
        this.medicamentosPrescritos = medicamentosPrescritos;
    }

    public String getDescricaoGeral() {
        return descricaoGeral;
    }

    public void setDescricaoGeral(String descricaoGeral) {
        this.descricaoGeral = descricaoGeral;
    }
}