package com.example.LarIdosos.Models.DTO;

import com.example.LarIdosos.Models.Enum.PrioridadeRecomendacao;

public class RecomendacaoDTO {
    private String descricaoGeral;
    private PrioridadeRecomendacao prioridade;

    // Getters e Setters
    public String getDescricaoGeral() {
        return descricaoGeral;
    }

    public void setDescricaoGeral(String descricaoGeral) {
        this.descricaoGeral = descricaoGeral;
    }

    public PrioridadeRecomendacao getPrioridade() {
        return prioridade;
    }

    public void setPrioridade(PrioridadeRecomendacao prioridade) {
        this.prioridade = prioridade;
    }
}
