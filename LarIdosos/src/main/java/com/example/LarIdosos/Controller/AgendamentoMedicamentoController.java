package com.example.LarIdosos.Controller;

import com.example.LarIdosos.Models.AgendamentoMedicamento;
import com.example.LarIdosos.Service.AgendamentoMedicamentoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/agendamentos")
public class AgendamentoMedicamentoController {

    @Autowired
    private AgendamentoMedicamentoService agendamentoService;

    @PostMapping
    public ResponseEntity<?> criarAgendamento(@RequestBody AgendamentoMedicamento agendamento) {
        try {
            AgendamentoMedicamento novoAgendamento = agendamentoService.criarAgendamento(agendamento);
            return new ResponseEntity<>(novoAgendamento, HttpStatus.CREATED);
        } catch (RuntimeException e) {
            // Retorna erro se o ID do idoso ou medicamento não existir
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<AgendamentoMedicamento> buscarPorId(@PathVariable String id) {
        return ResponseEntity.ok(agendamentoService.buscarPorId(id));
    }

    @GetMapping("/idoso/{idosoId}")
    public ResponseEntity<List<AgendamentoMedicamento>> listarPorIdoso(@PathVariable String idosoId) {
        return ResponseEntity.ok(agendamentoService.listarPorIdoso(idosoId));
    }

    @GetMapping("/medicamento/{medicamentoId}")
    public ResponseEntity<List<AgendamentoMedicamento>> listarPorMedicamento(@PathVariable String medicamentoId) {
        return ResponseEntity.ok(agendamentoService.listarPorMedicamento(medicamentoId));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> atualizarAgendamento(@PathVariable String id, @RequestBody AgendamentoMedicamento agendamento) {
        try {
            AgendamentoMedicamento agendamentoAtualizado = agendamentoService.atualizarAgendamento(id, agendamento);
            return ResponseEntity.ok(agendamentoAtualizado);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletarAgendamento(@PathVariable String id) {
        try {
            agendamentoService.deletarAgendamento(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}