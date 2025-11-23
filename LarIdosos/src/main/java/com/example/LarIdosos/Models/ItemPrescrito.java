package com.example.LarIdosos.Models;

import java.time.LocalTime;
import java.util.List;

public class ItemPrescrito {

    private String medicamentoBaseId;
    private String nomeMedicamento;
    private String dosagem;
    private String viaAdministracao;
    private List<LocalTime> horarios;
    private List<String> diasSemana;
    private String frequenciaDiaria;
    private String duracaoTratamento;
    private String observacoesPrescricao;

    public ItemPrescrito() {
    }

    public String getMedicamentoBaseId() {
        return medicamentoBaseId;
    }

    public void setMedicamentoBaseId(String medicamentoBaseId) {
        this.medicamentoBaseId = medicamentoBaseId;
    }

    public String getNomeMedicamento() {
        return nomeMedicamento;
    }

    public void setNomeMedicamento(String nomeMedicamento) {
        this.nomeMedicamento = nomeMedicamento;
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
