package com.example.LarIdosos.Controller;

import com.example.LarIdosos.Models.SaudeDiaria;
import com.example.LarIdosos.Models.SaudeDiaria;
import com.example.LarIdosos.Service.SaudeDiariaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/saude-diaria")
public class SaudeDiariaController {

    @Autowired
    private SaudeDiariaService saudeDiariaService;

    @PostMapping
    public ResponseEntity<?> criarRegistro(@RequestBody SaudeDiaria registro) {
        try {
            SaudeDiaria novoRegistro = saudeDiariaService.criarRegistro(registro);
            return new ResponseEntity<>(novoRegistro, HttpStatus.CREATED);
        } catch (RuntimeException e) {
            // Retorna erro se o ID do idoso ou cuidador não existir
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/idoso/{idosoId}")
    public ResponseEntity<List<SaudeDiaria>> listarPorIdoso(@PathVariable String idosoId) {
        return ResponseEntity.ok(saudeDiariaService.listarPorIdoso(idosoId));
    }

    @GetMapping("/cuidador/{cuidadorId}")
    public ResponseEntity<List<SaudeDiaria>> listarPorCuidador(@PathVariable String cuidadorId) {
        return ResponseEntity.ok(saudeDiariaService.listarPorCuidador(cuidadorId));
    }

    @GetMapping("/{id}")
    public ResponseEntity<SaudeDiaria> buscarPorId(@PathVariable String id) {
        return ResponseEntity.ok(saudeDiariaService.buscarPorId(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletarRegistro(@PathVariable String id) {
        try {
            saudeDiariaService.deletarRegistro(id);
            return ResponseEntity.noContent().build(); // 204 No Content
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}