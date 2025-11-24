package com.example.LarIdosos.Service;

import com.example.LarIdosos.Models.DTO.MedicamentoPrescritoDTO;
import com.example.LarIdosos.Models.DTO.PrescricaoDTO;
import com.example.LarIdosos.Models.ItemPrescrito;
import com.example.LarIdosos.Models.Medicamento;
import com.example.LarIdosos.Models.RecomendacaoMedica;
import com.example.LarIdosos.Repository.MedicamentoRepository;
import com.example.LarIdosos.Repository.RecomendacaoMedicaRepository;
import org.springframework.stereotype.Service;

import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PrescricaoService {

    // CORREÇÃO: Usando 'final' e Injeção por Construtor
    private final RecomendacaoMedicaRepository recomendacaoRepository;
    private final MedicamentoRepository medicamentoRepository;

    public PrescricaoService(RecomendacaoMedicaRepository recomendacaoRepository, MedicamentoRepository medicamentoRepository) {
        this.recomendacaoRepository = recomendacaoRepository;
        this.medicamentoRepository = medicamentoRepository;
    }

    // Método auxiliar para buscar medicamento no catálogo
    private Medicamento buscarMedicamentoBase(String id) {
        return medicamentoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Medicamento com ID " + id + " não encontrado no catálogo."));
    }

    // Método auxiliar para mapear DTOs para Itens
    private List<ItemPrescrito> mapMedicamentos(List<MedicamentoPrescritoDTO> medDTOs) {
        return medDTOs.stream().map(medDTO -> {
            Medicamento baseMedicamento = buscarMedicamentoBase(medDTO.getMedicamentoBaseId());
            ItemPrescrito item = new ItemPrescrito();

            // Dados essenciais para persistência e listagem
            item.setMedicamentoBaseId(baseMedicamento.getId());
            item.setNomeMedicamento(baseMedicamento.getNome());

            item.setDosagem(medDTO.getDosagem());
            item.setFrequenciaDiaria(medDTO.getFrequenciaDiaria());
            item.setDuracaoTratamento(medDTO.getDuracaoTratamento());
            item.setObservacoesPrescricao(medDTO.getObservacoesPrescricao());

            // Dias e horários
            item.setDiasSemana(medDTO.getDiasSemana());
            item.setHorarios(
                    medDTO.getHorarios().stream()
                            .map(LocalTime::parse)
                            .collect(Collectors.toList())
            );
            return item;
        }).collect(Collectors.toList());
    }

    public RecomendacaoMedica salvarPrescricao(PrescricaoDTO dto) {

        RecomendacaoMedica novaPrescricao = new RecomendacaoMedica();

        novaPrescricao.setIdosoId(dto.getIdosoId());
        novaPrescricao.setMedicoId(dto.getMedicoId());
        novaPrescricao.setDescricaoGeral(dto.getRecomendacao().getDescricaoGeral());
        novaPrescricao.setPrioridade(dto.getRecomendacao().getPrioridade());
        if (dto.getDataRecomendacao() != null) {
            novaPrescricao.setDataRecomendacao(dto.getDataRecomendacao());
        }
        novaPrescricao.setMedicamentosPrescritos(mapMedicamentos(dto.getMedicamentos()));

        return recomendacaoRepository.save(novaPrescricao);
    }

    // NOVO MÉTODO 1: Necessário para a função de Edição (PUT)
    public RecomendacaoMedica editarPrescricao(String id, PrescricaoDTO dto) {

        // Busca a entidade existente
        RecomendacaoMedica existente = recomendacaoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Prescrição com ID " + id + " não encontrada para edição."));

        // Atualiza os campos principais
        existente.setDescricaoGeral(dto.getRecomendacao().getDescricaoGeral());
        existente.setPrioridade(dto.getRecomendacao().getPrioridade());

        // Recria a lista de itens prescritos
        existente.setMedicamentosPrescritos(mapMedicamentos(dto.getMedicamentos()));

        // O IdosoId e MedicoId geralmente não mudam após a criação, mas podem ser atualizados se necessário.

        return recomendacaoRepository.save(existente);
    }

    // NOVO MÉTODO 2: Necessário para carregar o formulário de edição
    public RecomendacaoMedica buscarPorId(String id) {
        return recomendacaoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Prescrição não encontrada."));
    }

    public List<RecomendacaoMedica> buscarPrescricaoPorIdoso(String idosoId) {
        return recomendacaoRepository.findByIdosoId(idosoId);
    }
}