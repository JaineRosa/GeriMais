package com.example.LarIdosos.Models;

import com.example.LarIdosos.Models.Enum.ViaAdmMecidacao;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.List;


@Document(collection = "medicamentos")
public class Medicamento {

    @Id
    private String id;
    private String nome;
    private String dosagem;
    private String frequenciaDiaria;
    private String duracaoTratamento;
    private ViaAdmMecidacao viaAdministracao;
    private String observacoes;
    private LocalDateTime dataPrescricao;
    private String medicoId;
    private String idosoId;
    private List<String> agendamentosId;

    public Medicamento() {
    }

    public Medicamento(String id, String nome, String dosagem, String frequenciaDiaria, String duracaoTratamento, ViaAdmMecidacao viaAdministracao, String observacoes, LocalDateTime dataPrescricao, String medicoId, String idosoId, List<String> agendamentosId) {
        this.id = id;
        this.nome = nome;
        this.dosagem = dosagem;
        this.frequenciaDiaria = frequenciaDiaria;
        this.duracaoTratamento = duracaoTratamento;
        this.viaAdministracao = viaAdministracao;
        this.observacoes = observacoes;
        this.dataPrescricao = dataPrescricao;
        this.medicoId = medicoId;
        this.idosoId = idosoId;
        this.agendamentosId = agendamentosId;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getDosagem() {
        return dosagem;
    }

    public void setDosagem(String dosagem) {
        this.dosagem = dosagem;
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

    public ViaAdmMecidacao getViaAdministracao() {
        return viaAdministracao;
    }

    public void setViaAdministracao(ViaAdmMecidacao viaAdministracao) {
        this.viaAdministracao = viaAdministracao;
    }

    public String getObservacoes() {
        return observacoes;
    }

    public void setObservacoes(String observacoes) {
        this.observacoes = observacoes;
    }

    public LocalDateTime getDataPrescricao() {
        return dataPrescricao;
    }

    public void setDataPrescricao(LocalDateTime dataPrescricao) {
        this.dataPrescricao = dataPrescricao;
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

    public List<String> getAgendamentosId() {
        return agendamentosId;
    }

    public void setAgendamentosId(List<String> agendamentosId) {
        this.agendamentosId = agendamentosId;
    }
}