package com.example.LarIdosos.Service;

import com.example.LarIdosos.Models.DTO.MedicamentoDTO;
import com.example.LarIdosos.Models.Medicamento;
import com.example.LarIdosos.Repository.MedicamentoRepository;
import com.example.LarIdosos.Repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MedicamentoService {

    @Autowired
    private MedicamentoRepository medicamentoRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    public Medicamento buscarPorId(String id) {
        return medicamentoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Medicamento não encontrado com ID: " + id));
    }
    public List<Medicamento> listarTodos() {
        return medicamentoRepository.findAll();
    }


    public Medicamento cadastrarMedicamento(MedicamentoDTO dto) {

        Medicamento medicamento = new Medicamento();
        medicamento.setId(dto.getId()); // Será null para POST
        medicamento.setNome(dto.getNome());
        medicamento.setDosagem(dto.getDosagem());
        medicamento.setViaAdministracao(dto.getViaAdministracao());
        medicamento.setObservacoes(dto.getObservacoes());
        return medicamentoRepository.save(medicamento);
    }

    public Medicamento atualizarMedicamento(String id, Medicamento medicamentoAtualizado) {
        Medicamento medExistente = buscarPorId(id);

        if (medicamentoAtualizado.getNome() != null) {
            medExistente.setNome(medicamentoAtualizado.getNome());
        }
        if (medicamentoAtualizado.getDosagem() != null) {
            medExistente.setDosagem(medicamentoAtualizado.getDosagem());
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
        medicamentoRepository.delete(medicamento);
    }
}