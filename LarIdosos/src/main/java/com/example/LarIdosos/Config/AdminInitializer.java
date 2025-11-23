package com.example.LarIdosos.Config;

import com.example.LarIdosos.Models.Enum.TipoUsuario;
import com.example.LarIdosos.Models.Usuario;
import com.example.LarIdosos.Repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.Collections;

@Component
public class AdminInitializer implements CommandLineRunner {
    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        String adminEmail = "admin@admin.com";

        if (usuarioRepository.findByEmail(adminEmail).isEmpty()) {
            Usuario admin = new Usuario();
            admin.setNome("Administrador");
            admin.setEmail(adminEmail);
            admin.setSenha(passwordEncoder.encode("123456"));
            admin.setTipoUsuario(TipoUsuario.ADMIN);
            admin.setCpf("00000000000"); // CPF fictício
            admin.setDataNascimento(LocalDate.of(2000, 1, 1));
            admin.setNotificacoesNaoLidas(Collections.emptyList());
            admin.setMedicamentos(Collections.emptyList());
            admin.setRecomendacoesMedicas(Collections.emptyList());
            admin.setCuidadoresId(Collections.emptyList());
            admin.setIdososId(Collections.emptyList());

            usuarioRepository.save(admin);
            System.out.println("Usuário admin criado com sucesso!");
            System.out.println("Email: admin@admin.com");
            System.out.println("Senha: 123456");
        } else {
            System.out.println("Usuário admin já existe.");
        }
    }
    }