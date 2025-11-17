package com.example.LarIdosos.Models.DTO;

public class AtualizarSenhaDto {
    private String novaSenha;

    public AtualizarSenhaDto(String novaSenha) {
        this.novaSenha = novaSenha;
    }

    public String getNovaSenha() {
        return novaSenha;
    }

    public void setNovaSenha(String novaSenha) {
        this.novaSenha = novaSenha;
    }
}
