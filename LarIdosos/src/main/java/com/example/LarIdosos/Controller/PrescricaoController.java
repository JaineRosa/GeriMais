package com.example.LarIdosos.Controller;

import com.example.LarIdosos.Models.DTO.PrescricaoDTO;
import com.example.LarIdosos.Models.RecomendacaoMedica;
import com.example.LarIdosos.Service.PrescricaoService; // Importação estava faltando na cópia original
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/prescricao")
public class PrescricaoController {

    private final PrescricaoService prescricaoService;

    public PrescricaoController(PrescricaoService prescricaoService) {
        this.prescricaoService = prescricaoService;
    }

    @PostMapping("/salvar")
    public ResponseEntity<?> salvarPrescricao(@RequestBody PrescricaoDTO prescricaoDTO) {
        try {
            RecomendacaoMedica novaPrescricao = prescricaoService.salvarPrescricao(prescricaoDTO);
            return new ResponseEntity<>(novaPrescricao, HttpStatus.CREATED);
        } catch (RuntimeException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Erro de validação ou ID: " + e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> buscarPorId(@PathVariable String id) {
        var prescricao = prescricaoService.buscarPorId(id);

        if (prescricao == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(prescricao);
    }

    @GetMapping("/idoso/{idosoId}")
    public ResponseEntity<?> buscarPrescricaoPorIdoso(@PathVariable String idosoId) {
        try {
            List<RecomendacaoMedica> prescricoes = prescricaoService.buscarPrescricaoPorIdoso(idosoId);
            return ResponseEntity.ok(prescricoes);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erro ao buscar prescrição: " + e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> editarPrescricao(@PathVariable String id, @RequestBody PrescricaoDTO dto) {
        try {
            RecomendacaoMedica atualizada = prescricaoService.editarPrescricao(id, dto);
            return ResponseEntity.ok(atualizada);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Erro ao editar: " + e.getMessage());
        }
    }
}