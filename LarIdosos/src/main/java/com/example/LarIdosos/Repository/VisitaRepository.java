package com.example.LarIdosos.Repository;

import com.example.LarIdosos.Models.Enum.StatusVisita;
import com.example.LarIdosos.Models.Visita;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface VisitaRepository extends MongoRepository<Visita, String> {

    List<Visita> findByIdosoId(String idosoId);

    List<Visita> findByCuidadorId(String cuidadorId);

    List<Visita> findByMedicoId(String medicoId);

    List<Visita> findByIdosoIdAndDataHoraVisitaBetween(String idosoId, LocalDateTime inicio, LocalDateTime fim);
}