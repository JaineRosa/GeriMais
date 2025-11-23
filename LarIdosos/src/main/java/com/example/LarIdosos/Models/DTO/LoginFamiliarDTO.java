package com.example.LarIdosos.Models.DTO;

public class LoginFamiliarDTO {
    private String nomeFamiliar;
    private String nomeIdoso;
    private String cpfIdoso;

    public LoginFamiliarDTO() {
    }

    public LoginFamiliarDTO(String nomeFamiliar, String nomeIdoso, String cpfIdoso) {
        this.nomeFamiliar = nomeFamiliar;
        this.nomeIdoso = nomeIdoso;
        this.cpfIdoso = cpfIdoso;
    }

    public String getNomeFamiliar() {
        return nomeFamiliar;
    }

    public void setNomeFamiliar(String nomeFamiliar) {
        this.nomeFamiliar = nomeFamiliar;
    }

    public String getNomeIdoso() {
        return nomeIdoso;
    }

    public void setNomeIdoso(String nomeIdoso) {
        this.nomeIdoso = nomeIdoso;
    }

    public String getCpfIdoso() {
        return cpfIdoso;
    }

    public void setCpfIdoso(String cpfIdoso) {
        this.cpfIdoso = cpfIdoso;
    }
}
