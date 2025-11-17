package com.example.LarIdosos.Repository;

import com.example.LarIdosos.Models.RecomendacaoMedica;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface RecomendacaoMedicaRepository extends MongoRepository<RecomendacaoMedica, String> {

    List<RecomendacaoMedica> findByIdosoId(String idosoId);

    List<RecomendacaoMedica> findByMedicoId(String medicoId);

    List<RecomendacaoMedica> findByIdosoIdAndDataRecomendacaoBetween(String idosoId, LocalDateTime inicio, LocalDateTime fim);
}