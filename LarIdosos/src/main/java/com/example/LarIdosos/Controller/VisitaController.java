package com.example.LarIdosos.Controller;

import com.example.LarIdosos.Models.Visita;
import com.example.LarIdosos.Service.VisitaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/visitas")
public class VisitaController {

    @Autowired
    private VisitaService visitaService;

    @PostMapping
    public ResponseEntity<?> agendarVisita(@RequestBody Visita visita) {
        try {
            Visita novaVisita = visitaService.agendarVisita(visita);
            return new ResponseEntity<>(novaVisita, HttpStatus.CREATED);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<List<Visita>> listarTodas() {
        return ResponseEntity.ok(visitaService.listarTodas());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Visita> buscarPorId(@PathVariable String id) {
        return ResponseEntity.ok(visitaService.buscarPorId(id));
    }

    @GetMapping("/idoso/{idosoId}")
    public ResponseEntity<List<Visita>> listarPorIdoso(@PathVariable String idosoId) {
        return ResponseEntity.ok(visitaService.listarPorIdoso(idosoId));
    }

    @GetMapping("/cuidador/{cuidadorId}")
    public ResponseEntity<List<Visita>> listarPorCuidador(@PathVariable String cuidadorId) {
        return ResponseEntity.ok(visitaService.listarPorCuidador(cuidadorId));
    }

    @GetMapping("/medico/{medicoId}")
    public ResponseEntity<List<Visita>> listarPorMedico(@PathVariable String medicoId) {
        return ResponseEntity.ok(visitaService.listarPorMedico(medicoId));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> atualizarVisita(@PathVariable String id, @RequestBody Visita visita) {
        try {
            Visita visitaAtualizada = visitaService.atualizarVisita(id, visita);
            return ResponseEntity.ok(visitaAtualizada);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletarVisita(@PathVariable String id) {
        try {
            visitaService.deletarVisita(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
