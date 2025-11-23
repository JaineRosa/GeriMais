package com.example.LarIdosos.Models.DTO;

public class AuthFamiliarResponseDTO {
    private String token;
    private String tipoUsuario;
    private String idosoId;

    public AuthFamiliarResponseDTO(String token, String tipoUsuario, String idosoId) {
        this.token = token;
        this.tipoUsuario = tipoUsuario;
        this.idosoId = idosoId;
    }

    public String getIdosoId() {
        return idosoId;
    }

    public void setIdosoId(String idosoId) {
        this.idosoId = idosoId;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getTipoUsuario() {
        return tipoUsuario;
    }

    public void setTipoUsuario(String tipoUsuario) {
        this.tipoUsuario = tipoUsuario;
    }
}
