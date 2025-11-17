package com.example.LarIdosos.Repository;

import com.example.LarIdosos.Models.SaudeDiaria;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SaudeDiariaRepository extends MongoRepository<SaudeDiaria, String> {

    List<SaudeDiaria> findByIdosoId(String idosoId);

    List<SaudeDiaria> findByIdosoIdOrderByDataHoraRegistroDesc(String idosoId);

    List<SaudeDiaria> findByCuidadorId(String cuidadorId);
}