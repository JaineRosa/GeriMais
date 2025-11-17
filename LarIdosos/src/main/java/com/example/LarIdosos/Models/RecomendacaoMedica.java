package com.example.LarIdosos.Models;

import com.example.LarIdosos.Models.Enum.PrioridadeRecomendacao;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;


@Document(collection = "recomendacoes")
public class RecomendacaoMedica {

    @Id
    private String Id;
    private String medicoId;
    private String idosoId;
    private LocalDateTime dataRecomendacao;
    private String descricao;
    public PrioridadeRecomendacao prioridade;

    public RecomendacaoMedica() {
    }

    public RecomendacaoMedica(String id, String medicoId, String idosoId, LocalDateTime dataRecomendacao, String descricao, PrioridadeRecomendacao prioridade) {
        Id = id;
        this.medicoId = medicoId;
        this.idosoId = idosoId;
        this.dataRecomendacao = dataRecomendacao;
        this.descricao = descricao;
        this.prioridade = prioridade;
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

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public PrioridadeRecomendacao getPrioridade() {
        return prioridade;
    }

    public void setPrioridade(PrioridadeRecomendacao prioridade) {
        this.prioridade = prioridade;
    }
}