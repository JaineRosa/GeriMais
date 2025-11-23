package com.example.LarIdosos.Models.DTO;

import java.util.List;

public class MedicamentoPrescritoDTO {
    private String medicamentoBaseId; // O ID do medicamento no catálogo
    private String dosagem;
    private String viaAdministracao; // Adicionando este campo se for usado
    private List<String> diasSemana;
    private List<String> horarios; // String para facilitar o envio do front-end (ex: "18:00")
    private String frequenciaDiaria;
    private String duracaoTratamento;
    private String observacoesPrescricao;

    // Getters e Setters
    public String getMedicamentoBaseId() {
        return medicamentoBaseId;
    }
    // ... (restante dos getters e setters para os campos acima)

    public void setMedicamentoBaseId(String medicamentoBaseId) {
        this.medicamentoBaseId = medicamentoBaseId;
    }

    public String getDosagem() {
        return dosagem;
    }

    public void setDosagem(String dosagem) {
        this.dosagem = dosagem;
    }

    public String getViaAdministracao() {
        return viaAdministracao;
    }

    public void setViaAdministracao(String viaAdministracao) {
        this.viaAdministracao = viaAdministracao;
    }

    public List<String> getDiasSemana() {
        return diasSemana;
    }

    public void setDiasSemana(List<String> diasSemana) {
        this.diasSemana = diasSemana;
    }

    public List<String> getHorarios() {
        return horarios;
    }

    public void setHorarios(List<String> horarios) {
        this.horarios = horarios;
    }

    public String getFrequenciaDiaria() {
        return frequenciaDiaria;
    }

    public void setFrequenciaDiaria(String frequenciaDiaria) {
        this.frequenciaDiaria = frequenciaDiaria;
    }

    public String getDuracaoTratamento() {
        return duracaoTratamento;
    }

    public void setDuracaoTratamento(String duracaoTratamento) {
        this.duracaoTratamento = duracaoTratamento;
    }

    public String getObservacoesPrescricao() {
        return observacoesPrescricao;
    }

    public void setObservacoesPrescricao(String observacoesPrescricao) {
        this.observacoesPrescricao = observacoesPrescricao;
    }
}

