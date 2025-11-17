package com.example.LarIdosos.Models;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "saude_diaria")
public class SaudeDiaria {

    @Id
    private String id;
    private LocalDateTime dataHoraRegistro;
    private String humor;
    private String pressaoArterialSistolica;
    private String pressaoArterialDiastolica;
    private Double temperaturaCorporal;
    private Integer batimentosPorMinuto;
    private Integer saturacaoOxigenio;
    private String observacoesCuidador;
    private String idosoId;
    private String cuidadorId;

    public SaudeDiaria() {
    }

    public SaudeDiaria(String id, LocalDateTime dataHoraRegistro, String humor, String pressaoArterialSistolica, String pressaoArterialDiastolica, Double temperaturaCorporal, Integer batimentosPorMinuto, Integer saturacaoOxigenio, String observacoesCuidador, String idosoId, String cuidadorId) {
        this.id = id;
        this.dataHoraRegistro = dataHoraRegistro;
        this.humor = humor;
        this.pressaoArterialSistolica = pressaoArterialSistolica;
        this.pressaoArterialDiastolica = pressaoArterialDiastolica;
        this.temperaturaCorporal = temperaturaCorporal;
        this.batimentosPorMinuto = batimentosPorMinuto;
        this.saturacaoOxigenio = saturacaoOxigenio;
        this.observacoesCuidador = observacoesCuidador;
        this.idosoId = idosoId;
        this.cuidadorId = cuidadorId;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public LocalDateTime getDataHoraRegistro() {
        return dataHoraRegistro;
    }

    public void setDataHoraRegistro(LocalDateTime dataHoraRegistro) {
        this.dataHoraRegistro = dataHoraRegistro;
    }

    public String getHumor() {
        return humor;
    }

    public void setHumor(String humor) {
        this.humor = humor;
    }

    public String getPressaoArterialSistolica() {
        return pressaoArterialSistolica;
    }

    public void setPressaoArterialSistolica(String pressaoArterialSistolica) {
        this.pressaoArterialSistolica = pressaoArterialSistolica;
    }

    public String getPressaoArterialDiastolica() {
        return pressaoArterialDiastolica;
    }

    public void setPressaoArterialDiastolica(String pressaoArterialDiastolica) {
        this.pressaoArterialDiastolica = pressaoArterialDiastolica;
    }

    public Double getTemperaturaCorporal() {
        return temperaturaCorporal;
    }

    public void setTemperaturaCorporal(Double temperaturaCorporal) {
        this.temperaturaCorporal = temperaturaCorporal;
    }

    public Integer getBatimentosPorMinuto() {
        return batimentosPorMinuto;
    }

    public void setBatimentosPorMinuto(Integer batimentosPorMinuto) {
        this.batimentosPorMinuto = batimentosPorMinuto;
    }

    public Integer getSaturacaoOxigenio() {
        return saturacaoOxigenio;
    }

    public void setSaturacaoOxigenio(Integer saturacaoOxigenio) {
        this.saturacaoOxigenio = saturacaoOxigenio;
    }

    public String getObservacoesCuidador() {
        return observacoesCuidador;
    }

    public void setObservacoesCuidador(String observacoesCuidador) {
        this.observacoesCuidador = observacoesCuidador;
    }

    public String getIdosoId() {
        return idosoId;
    }

    public void setIdosoId(String idosoId) {
        this.idosoId = idosoId;
    }

    public String getCuidadorId() {
        return cuidadorId;
    }

    public void setCuidadorId(String cuidadorId) {
        this.cuidadorId = cuidadorId;
    }
}