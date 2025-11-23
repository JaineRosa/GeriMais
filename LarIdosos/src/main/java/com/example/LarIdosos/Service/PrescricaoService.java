package com.example.LarIdosos.Service;

import com.example.LarIdosos.Models.DTO.MedicamentoPrescritoDTO;
import com.example.LarIdosos.Models.DTO.PrescricaoDTO;
import com.example.LarIdosos.Models.ItemPrescrito;
import com.example.LarIdosos.Models.Medicamento;
import com.example.LarIdosos.Models.RecomendacaoMedica;
import com.example.LarIdosos.Repository.MedicamentoRepository;
import com.example.LarIdosos.Repository.RecomendacaoMedicaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PrescricaoService {

    @Autowired
    private RecomendacaoMedicaRepository recomendacaoRepository;

    @Autowired
    private MedicamentoRepository medicamentoRepository;

    private Medicamento buscarMedicamentoBase(String id) {
        return medicamentoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Medicamento com ID " + id + " não encontrado no catálogo."));
    }

    public RecomendacaoMedica salvarPrescricao(PrescricaoDTO dto) {

        RecomendacaoMedica novaPrescricao = new RecomendacaoMedica();

        novaPrescricao.setDescricaoGeral(dto.getRecomendacao().getDescricaoGeral()); // Usar getDescricaoGeral()
        novaPrescricao.setPrioridade(dto.getRecomendacao().getPrioridade()); // Usar getPrioridade()

        List<ItemPrescrito> itensPrescritos = new ArrayList<>();

        for (MedicamentoPrescritoDTO medDTO : dto.getMedicamentos()) {

            Medicamento baseMedicamento = buscarMedicamentoBase(medDTO.getMedicamentoBaseId()); // Corrigido para BaseId

            ItemPrescrito item = new ItemPrescrito();

            // ... (Setters para ID e Nome) ...

            item.setDosagem(medDTO.getDosagem());
            item.setFrequenciaDiaria(medDTO.getFrequenciaDiaria());
            item.setDuracaoTratamento(medDTO.getDuracaoTratamento());

            // CORREÇÃO 3: Usar o getter correto do MedicamentoPrescritoDTO
            item.setObservacoesPrescricao(medDTO.getObservacoesPrescricao()); // Usar getObservacoesPrescricao()

            item.setHorarios(
                    medDTO.getHorarios().stream()
                            .map(LocalTime::parse)
                            .collect(Collectors.toList())
            );
            item.setDiasSemana(medDTO.getDiasSemana());

            itensPrescritos.add(item);
        }

        novaPrescricao.setMedicamentosPrescritos(itensPrescritos);

        return recomendacaoRepository.save(novaPrescricao);
    }

    public List<RecomendacaoMedica> buscarPrescricaoPorIdoso(String idosoId) {
        return recomendacaoRepository.findByIdosoId(idosoId);
    }
}