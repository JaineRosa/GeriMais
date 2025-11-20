package com.example.LarIdosos.Models.DTO;

import com.example.LarIdosos.Models.Enum.TipoUsuario;

public class LoginResponseDto {
    private String token;
    private TipoUsuario tipoUsuario;

    public LoginResponseDto() {}

    public LoginResponseDto(String token, TipoUsuario tipoUsuario) {
        this.token = token;
        this.tipoUsuario = tipoUsuario;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public TipoUsuario getTipoUsuario() {
        return tipoUsuario;
    }

    public void setTipoUsuario(TipoUsuario tipoUsuario) {
        this.tipoUsuario = tipoUsuario;
    }
}