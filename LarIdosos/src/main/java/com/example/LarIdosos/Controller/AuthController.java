package com.example.LarIdosos.Controller;

import com.example.LarIdosos.Config.JwtUtil;
import com.example.LarIdosos.Models.DTO.AuthFamiliarResponseDTO;
import com.example.LarIdosos.Models.DTO.LoginFamiliarDTO;
import com.example.LarIdosos.Models.DTO.LoginRequestDto;
import com.example.LarIdosos.Models.DTO.LoginResponseDto;
import com.example.LarIdosos.Models.Usuario;
import com.example.LarIdosos.Repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final UsuarioRepository usuarioRepository;
    private final JwtUtil jwtUtil;
    private final PasswordEncoder passwordEncoder;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequestDto request) {
        System.out.println(">>> DEBUG LOGIN V2 <<<");
        System.out.println("1. Recebido do Front: " + request.getEmail() + " | Senha: " + request.getSenha());

        try {
            Usuario userBanco = usuarioRepository.findByEmail(request.getEmail()).orElse(null);
            if (userBanco != null) {
                System.out.println("2. Usuário encontrado: " + userBanco.getEmail());
                System.out.println("3. Hash no Banco: " + userBanco.getSenha());

                boolean confere = passwordEncoder.matches(request.getSenha(), userBanco.getSenha());
                System.out.println(">>> 4. A SENHA CONFERE MANUALMENTE? " + confere);

                if (!confere) {
                    System.out.println("!!! AVISO: A senha não bateu na checagem manual !!!");
                }
            } else {
                System.out.println("!!! Usuário não encontrado no findByEmail !!!");
            }

            System.out.println("5. Chamando AuthenticationManager...");
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getEmail(), request.getSenha())
            );

            System.out.println("6. Autenticação SUCESSO!");

            final Usuario usuario = usuarioRepository.findByEmail(request.getEmail())
                    .orElseThrow(() -> new RuntimeException("Usuário não encontrado após autenticação"));

            final String token = jwtUtil.generateToken(usuario.toUserDetails());

            return ResponseEntity.ok(
                    new LoginResponseDto(
                            token,
                            usuario.getTipoUsuario() )
            );

        } catch (Exception e) {
            System.out.println(">>> ERRO FATAL <<<");
            e.printStackTrace();
            return ResponseEntity.status(401).body("Erro Backend: " + e.getMessage());
        }
    }
    @PostMapping("/familiar")
    public ResponseEntity<?> loginFamiliar(@RequestBody LoginFamiliarDTO dto) {
        try {
            Usuario idoso = usuarioRepository.findByNomeAndCpf(dto.getNomeIdoso(), dto.getCpfIdoso())
                    .orElseThrow(() -> new RuntimeException("Idoso/Hóspede não encontrado."));
            Usuario responsavel = usuarioRepository.findByNome(dto.getNomeFamiliar())
                    .orElseThrow(() -> new RuntimeException("Responsável não encontrado."));
            String idResponsavelDoIdoso = idoso.getResponsavelId();
            String idResponsavelEncontrado = responsavel.getId();
            if (idResponsavelDoIdoso == null || !idResponsavelDoIdoso.equals(idResponsavelEncontrado)) {
                throw new RuntimeException("Vínculo familiar não corresponde ao Idoso informado.");
            }
            final String token = jwtUtil.generateToken(responsavel.toUserDetails());

            return ResponseEntity.ok(
                    new AuthFamiliarResponseDTO(
                            token,
                            responsavel.getTipoUsuario().toString(),
                            idoso.getId()
                    )
            );

        } catch (RuntimeException e) {
            // Captura erros de "não encontrado" ou "vínculo inválido"
            System.out.println("ERRO LOGIN FAMILIAR: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        } catch (Exception e) {
            System.out.println("ERRO INTERNO NO LOGIN FAMILIAR: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro interno no servidor.");
        }
    }
}