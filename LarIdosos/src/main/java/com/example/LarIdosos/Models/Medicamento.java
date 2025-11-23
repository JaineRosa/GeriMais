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
    private ViaAdmMecidacao viaAdministracao;
    private String observacoes;

    public Medicamento() {
    }

    public Medicamento(String id, String nome, String dosagem, ViaAdmMecidacao viaAdministracao, String observacoes) {
        this.id = id;
        this.nome = nome;
        this.dosagem = dosagem;
        this.viaAdministracao = viaAdministracao;
        this.observacoes = observacoes;
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
}