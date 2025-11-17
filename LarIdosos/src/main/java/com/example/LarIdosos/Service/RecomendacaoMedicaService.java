package com.example.LarIdosos.Service;

import com.example.LarIdosos.Models.RecomendacaoMedica;
import com.example.LarIdosos.Repository.RecomendacaoMedicaRepository;
import com.example.LarIdosos.Repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class RecomendacaoMedicaService {

    @Autowired
    private RecomendacaoMedicaRepository recomendacaoRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    public RecomendacaoMedica buscarPorId(String id) {
        return recomendacaoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Recomendação não encontrada com ID: " + id));
    }

    public List<RecomendacaoMedica> listarPorIdoso(String idosoId) {
        return recomendacaoRepository.findByIdosoId(idosoId);
    }

    public List<RecomendacaoMedica> listarPorMedico(String medicoId) {
        return recomendacaoRepository.findByMedicoId(medicoId);
    }

    public RecomendacaoMedica criarRecomendacao(RecomendacaoMedica recomendacao) {
        // 1. Validação (Verifica se o idoso e o médico existem)
        usuarioRepository.findById(recomendacao.getIdosoId())
                .orElseThrow(() -> new RuntimeException("Erro: Idoso com ID " + recomendacao.getIdosoId() + " não encontrado."));

        usuarioRepository.findById(recomendacao.getMedicoId())
                .orElseThrow(() -> new RuntimeException("Erro: Médico com ID " + recomendacao.getMedicoId() + " não encontrado."));

        recomendacao.setDataRecomendacao(LocalDateTime.now());

        return recomendacaoRepository.save(recomendacao);
    }

    public RecomendacaoMedica atualizarRecomendacao(String id, RecomendacaoMedica recomendacaoAtualizada) {
        RecomendacaoMedica recExistente = buscarPorId(id);

        // Lógica de atualização "null-safe"
        if (recomendacaoAtualizada.getDescricao() != null) {
            recExistente.setDescricao(recomendacaoAtualizada.getDescricao());
        }
        if (recomendacaoAtualizada.getPrioridade() != null) {
            recExistente.setPrioridade(recomendacaoAtualizada.getPrioridade());
        }

        return recomendacaoRepository.save(recExistente);
    }

    public void deletarRecomendacao(String id) {
        RecomendacaoMedica recomendacao = buscarPorId(id);
        recomendacaoRepository.delete(recomendacao);
    }
}