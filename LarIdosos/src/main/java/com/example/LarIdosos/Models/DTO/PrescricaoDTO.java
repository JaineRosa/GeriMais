package com.example.LarIdosos.Models.DTO;

import java.util.List;

public class PrescricaoDTO {
    private String idosoId;
    private String medicoId;
    private List<MedicamentoPrescritoDTO> medicamentos; // Lista de Itens Prescritos
    private RecomendacaoDTO recomendacao; // Recomendação Geral

    // Getters e Setters
    public String getIdosoId() {
        return idosoId;
    }

    public void setIdosoId(String idosoId) {
        this.idosoId = idosoId;
    }

    public String getMedicoId() {
        return medicoId;
    }

    public void setMedicoId(String medicoId) {
        this.medicoId = medicoId;
    }

    public List<MedicamentoPrescritoDTO> getMedicamentos() {
        return medicamentos;
    }

    public void setMedicamentos(List<MedicamentoPrescritoDTO> medicamentos) {
        this.medicamentos = medicamentos;
    }

    public RecomendacaoDTO getRecomendacao() {
        return recomendacao;
    }

    public void setRecomendacao(RecomendacaoDTO recomendacao) {
        this.recomendacao = recomendacao;
    }
}