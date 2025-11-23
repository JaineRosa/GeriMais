package com.example.LarIdosos.Models.DTO;

import com.example.LarIdosos.Models.Enum.PrioridadeRecomendacao;

import java.time.LocalDateTime;

public class SaudeDiariaAlertaDto {
    private String idosoId;
    private String responsavelId;
    private String motivoAlerta;
    private String valorRegistrado;
    private LocalDateTime dataHoraRegistro;

    public SaudeDiariaAlertaDto(String idosoId, String responsavelId, String motivoAlerta, String valorRegistrado, LocalDateTime dataHoraRegistro) {

        this.idosoId = idosoId;
        this.responsavelId = responsavelId;
        this.motivoAlerta = motivoAlerta;
        this.valorRegistrado = valorRegistrado;
        this.dataHoraRegistro = dataHoraRegistro;
    }

    public String getIdosoId() {
        return idosoId;
    }

    public void setIdosoId(String idosoId) {
        this.idosoId = idosoId;
    }

    public String getResponsavelId() {
        return responsavelId;
    }

    public void setResponsavelId(String responsavelId) {
        this.responsavelId = responsavelId;
    }

    public String getMotivoAlerta() {
        return motivoAlerta;
    }

    public void setMotivoAlerta(String motivoAlerta) {
        this.motivoAlerta = motivoAlerta;
    }

    public String getValorRegistrado() {
        return valorRegistrado;
    }

    public void setValorRegistrado(String valorRegistrado) {
        this.valorRegistrado = valorRegistrado;
    }

    public LocalDateTime getDataHoraRegistro() {
        return dataHoraRegistro;
    }

    public void setDataHoraRegistro(LocalDateTime dataHoraRegistro) {
        this.dataHoraRegistro = dataHoraRegistro;
    }

    public static class RecomendacaoDTO {
        private String descricao;
        private PrioridadeRecomendacao prioridadeRecomendacao;

        public RecomendacaoDTO(String descricao, PrioridadeRecomendacao prioridadeRecomendacao) {
            this.descricao = descricao;
            this.prioridadeRecomendacao = prioridadeRecomendacao;
        }

        public String getDescricao() {
            return descricao;
        }

        public void setDescricao(String descricao) {
            this.descricao = descricao;
        }

        public PrioridadeRecomendacao getPrioridadeRecomendacao() {
            return prioridadeRecomendacao;
        }

        public void setPrioridadeRecomendacao(PrioridadeRecomendacao prioridadeRecomendacao) {
            this.prioridadeRecomendacao = prioridadeRecomendacao;
        }
    }
}
