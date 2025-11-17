package com.example.LarIdosos.Service;

import com.example.LarIdosos.Models.Medicamento;
import com.example.LarIdosos.Models.Usuario;
import com.example.LarIdosos.Repository.AgendamentoMedicamentoRepository;
import com.example.LarIdosos.Repository.MedicamentoRepository;
import com.example.LarIdosos.Repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class MedicamentoService {

    @Autowired
    private MedicamentoRepository medicamentoRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private AgendamentoMedicamentoRepository agendamentoRepository;

    public Medicamento buscarPorId(String id) {
        return medicamentoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Medicamento não encontrado com ID: " + id));
    }

    public List<Medicamento> listarPorIdoso(String idosoId) {
        return medicamentoRepository.findByIdosoId(idosoId);
    }

    public List<Medicamento> listarPorMedico(String medicoId) {
        return medicamentoRepository.findByMedicoId(medicoId);
    }


    public Medicamento criarMedicamento(Medicamento medicamento) {
        // 1. Validação (Verifica se o idoso e o médico existem)
        Usuario idoso = usuarioRepository.findById(medicamento.getIdosoId())
                .orElseThrow(() -> new RuntimeException("Erro: Idoso com ID " + medicamento.getIdosoId() + " não encontrado."));

        usuarioRepository.findById(medicamento.getMedicoId())
                .orElseThrow(() -> new RuntimeException("Erro: Médico com ID " + medicamento.getMedicoId() + " não encontrado."));

        medicamento.setDataPrescricao(LocalDateTime.now());
        if (medicamento.getAgendamentosId() == null) {
            medicamento.setAgendamentosId(new ArrayList<>());
        }

        Medicamento medicamentoSalvo = medicamentoRepository.save(medicamento);

        if (idoso.getMedicamentos() == null) {
            idoso.setMedicamentos(new ArrayList<>());
        }
        idoso.getMedicamentos().add(medicamentoSalvo.getId());
        usuarioRepository.save(idoso); // Atualiza o usuário

        return medicamentoSalvo;
    }

    public Medicamento atualizarMedicamento(String id, Medicamento medicamentoAtualizado) {
        Medicamento medExistente = buscarPorId(id);

        // Lógica de atualização "null-safe"
        if (medicamentoAtualizado.getNome() != null) {
            medExistente.setNome(medicamentoAtualizado.getNome());
        }
        if (medicamentoAtualizado.getDosagem() != null) {
            medExistente.setDosagem(medicamentoAtualizado.getDosagem());
        }
        if (medicamentoAtualizado.getFrequenciaDiaria() != null) {
            medExistente.setFrequenciaDiaria(medicamentoAtualizado.getFrequenciaDiaria());
        }
        if (medicamentoAtualizado.getDuracaoTratamento() != null) {
            medExistente.setDuracaoTratamento(medicamentoAtualizado.getDuracaoTratamento());
        }
        if (medicamentoAtualizado.getViaAdministracao() != null) {
            medExistente.setViaAdministracao(medicamentoAtualizado.getViaAdministracao());
        }
        if (medicamentoAtualizado.getObservacoes() != null) {
            medExistente.setObservacoes(medicamentoAtualizado.getObservacoes());
        }

        return medicamentoRepository.save(medExistente);
    }

    public void deletarMedicamento(String id) {
        Medicamento medicamento = buscarPorId(id);

        if (medicamento.getAgendamentosId() != null && !medicamento.getAgendamentosId().isEmpty()) {
            agendamentoRepository.deleteAllById(medicamento.getAgendamentosId());
        }

        Usuario idoso = usuarioRepository.findById(medicamento.getIdosoId()).orElse(null);
        if (idoso != null && idoso.getMedicamentos() != null) {
            idoso.getMedicamentos().remove(medicamento.getId());
            usuarioRepository.save(idoso);
        }

        medicamentoRepository.delete(medicamento);
    }
}