package com.example.LarIdosos.Repository;

import com.example.LarIdosos.Models.Medicamento;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MedicamentoRepository extends MongoRepository<Medicamento, String> {

    List<Medicamento> findByIdosoId(String idosoId);

    List<Medicamento> findByMedicoId(String medicoId);
}