package com.example.LarIdosos.Models;

import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

/**
 * Representa uma Visita (médica, familiar) na coleção 'visitas'.
 * Esta é uma coleção separada, NÃO é aninhada.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "visitas")
public class Visita {

    @Id
    private String id;

    /**
     * Referência ao ID do Idoso que será visitado.
     */
    private String usuarioIdRef;

    /**
     * Referência ao ID do Cuidador que agendou (opcional).
     */
    private String cuidadorIdRef;

    private String nomeVisitante; // Ex: "Dr. Carlos" ou "Maria (Filha)"

    private String tipoVisita; // Ex: "MEDICA", "FAMILIAR"

    private LocalDateTime dataHoraAgendada;

    private String status; // Ex: "AGENDADA", "CONCLUIDA", "CANCELADA"

    private String observacoes;
}