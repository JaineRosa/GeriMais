package com.example.LarIdosos.Repository;

import com.example.LarIdosos.Models.AgendamentoMedicamento;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AgendamentoMedicamentoRepository extends MongoRepository<AgendamentoMedicamento, String> {

    List<AgendamentoMedicamento> findByIdosoId(String idosoId);

    List<AgendamentoMedicamento> findByMedicamentoId(String medicamentoId);
}