package com.example.LarIdosos.Controller;

import com.example.LarIdosos.Models.RecomendacaoMedica;
import com.example.LarIdosos.Service.RecomendacaoMedicaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/recomendacoes")
public class RecomendacaoMedicaController {

    @Autowired
    private RecomendacaoMedicaService recomendacaoService;

    @PostMapping
    public ResponseEntity<?> criarRecomendacao(@RequestBody RecomendacaoMedica recomendacao) {
        try {
            RecomendacaoMedica novaRec = recomendacaoService.criarRecomendacao(recomendacao);
            return new ResponseEntity<>(novaRec, HttpStatus.CREATED);
        } catch (RuntimeException e) {
            // Retorna erro se o ID do idoso ou médico não existir
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<RecomendacaoMedica> buscarPorId(@PathVariable String id) {
        return ResponseEntity.ok(recomendacaoService.buscarPorId(id));
    }

    @GetMapping("/idoso/{idosoId}")
    public ResponseEntity<List<RecomendacaoMedica>> listarPorIdoso(@PathVariable String idosoId) {
        return ResponseEntity.ok(recomendacaoService.listarPorIdoso(idosoId));
    }

    @GetMapping("/medico/{medicoId}")
    public ResponseEntity<List<RecomendacaoMedica>> listarPorMedico(@PathVariable String medicoId) {
        return ResponseEntity.ok(recomendacaoService.listarPorMedico(medicoId));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> atualizarRecomendacao(@PathVariable String id, @RequestBody RecomendacaoMedica recomendacao) {
        try {
            RecomendacaoMedica recAtualizada = recomendacaoService.atualizarRecomendacao(id, recomendacao);
            return ResponseEntity.ok(recAtualizada);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletarRecomendacao(@PathVariable String id) {
        try {
            recomendacaoService.deletarRecomendacao(id);
            return ResponseEntity.noContent().build(); // 204 No Content
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}