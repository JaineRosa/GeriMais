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

    private final RecomendacaoMedicaRepository recomendacaoRepository;
    private final MedicamentoRepository medicamentoRepository;

    public PrescricaoService(RecomendacaoMedicaRepository recomendacaoRepository, MedicamentoRepository medicamentoRepository) {
        this.recomendacaoRepository = recomendacaoRepository;
        this.medicamentoRepository = medicamentoRepository;
    }

    private Medicamento buscarMedicamentoBase(String id) {
        return medicamentoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Medicamento com ID " + id + " não encontrado no catálogo."));
    }

    private List<ItemPrescrito> mapMedicamentos(List<MedicamentoPrescritoDTO> medDTOs) {
        return medDTOs.stream().map(medDTO -> {
            Medicamento baseMedicamento = buscarMedicamentoBase(medDTO.getMedicamentoBaseId());
            ItemPrescrito item = new ItemPrescrito();

            item.setMedicamentoBaseId(baseMedicamento.getId());
            item.setNomeMedicamento(baseMedicamento.getNome());

            item.setDosagem(medDTO.getDosagem());
            item.setFrequenciaDiaria(medDTO.getFrequenciaDiaria());
            item.setDuracaoTratamento(medDTO.getDuracaoTratamento());
            item.setObservacoesPrescricao(medDTO.getObservacoesPrescricao());

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


    public RecomendacaoMedica editarPrescricao(String id, PrescricaoDTO dto) {

        RecomendacaoMedica existente = recomendacaoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Prescrição com ID " + id + " não encontrada para edição."));

        existente.setDescricaoGeral(dto.getRecomendacao().getDescricaoGeral());
        existente.setPrioridade(dto.getRecomendacao().getPrioridade());

        existente.setMedicamentosPrescritos(mapMedicamentos(dto.getMedicamentos()));

        return recomendacaoRepository.save(existente);
    }


    public RecomendacaoMedica buscarPorId(String id) {
        return recomendacaoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Prescrição não encontrada."));
    }

    public List<RecomendacaoMedica> buscarPrescricaoPorIdoso(String idosoId) {
        return recomendacaoRepository.findByIdosoId(idosoId);
    }
}