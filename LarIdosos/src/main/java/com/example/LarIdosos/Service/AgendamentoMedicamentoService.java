package com.example.LarIdosos.Service;

import com.example.LarIdosos.Models.AgendamentoMedicamento;
import com.example.LarIdosos.Models.Medicamento;
import com.example.LarIdosos.Repository.AgendamentoMedicamentoRepository;
import com.example.LarIdosos.Repository.MedicamentoRepository;
import com.example.LarIdosos.Repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class AgendamentoMedicamentoService {

    @Autowired
    private AgendamentoMedicamentoRepository agendamentoRepository;

    @Autowired
    private MedicamentoRepository medicamentoRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    public AgendamentoMedicamento buscarPorId(String id) {
        return agendamentoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Agendamento não encontrado com ID: " + id));
    }

    public List<AgendamentoMedicamento> listarPorIdoso(String idosoId) {
        return agendamentoRepository.findByIdosoId(idosoId);
    }

    public List<AgendamentoMedicamento> listarPorMedicamento(String medicamentoId) {
        return agendamentoRepository.findByMedicamentoId(medicamentoId);
    }


    public AgendamentoMedicamento criarAgendamento(AgendamentoMedicamento agendamento) {

        usuarioRepository.findById(agendamento.getIdosoId())
                .orElseThrow(() -> new RuntimeException("Erro: Idoso com ID " + agendamento.getIdosoId() + " não encontrado."));

        Medicamento medPai = medicamentoRepository.findById(agendamento.getMedicamentoId())
                .orElseThrow(() -> new RuntimeException("Erro: Medicamento com ID " + agendamento.getMedicamentoId() + " não encontrado."));

        AgendamentoMedicamento agendamentoSalvo = agendamentoRepository.save(agendamento);

        if (medPai.getAgendamentosId() == null) {
            medPai.setAgendamentosId(new ArrayList<>());
        }
        medPai.getAgendamentosId().add(agendamentoSalvo.getId());
        medicamentoRepository.save(medPai);

        return agendamentoSalvo;
    }

    public AgendamentoMedicamento atualizarAgendamento(String id, AgendamentoMedicamento agendamentoAtualizado) {
        AgendamentoMedicamento agendamentoExistente = buscarPorId(id);

        if (agendamentoAtualizado.getHorarios() != null) {
            agendamentoExistente.setHorarios(agendamentoAtualizado.getHorarios());
        }
        if (agendamentoAtualizado.getDiasSemana() != null) {
            agendamentoExistente.setDiasSemana(agendamentoAtualizado.getDiasSemana());
        }

        return agendamentoRepository.save(agendamentoExistente);
    }

    public void deletarAgendamento(String id) {
        AgendamentoMedicamento agendamento = buscarPorId(id);

        Medicamento medPai = medicamentoRepository.findById(agendamento.getMedicamentoId()).orElse(null);
        if (medPai != null && medPai.getAgendamentosId() != null) {
            medPai.getAgendamentosId().remove(agendamento.getId());
            medicamentoRepository.save(medPai);
        }

        agendamentoRepository.delete(agendamento);
    }
}