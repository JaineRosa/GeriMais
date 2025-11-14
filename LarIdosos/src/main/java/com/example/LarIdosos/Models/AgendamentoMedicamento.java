package com.example.LarIdosos.Models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;

import java.util.List;
import java.util.UUID;

/**
 * POJO para um Agendamento de Medicação.
 * ESTA CLASSE É ANINHADA (EMBEDDED) DENTRO DO DOCUMENTO 'Idoso'.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AgendamentoMedicamento {

    @Id
    private String agendamentoId = UUID.randomUUID().toString();

    /**
     * Referencia o 'medicamentoId' da lista de Medicamentos
     * DENTRO DESTE MESMO DOCUMENTO 'Idoso'.
     */
    private String medicamentoIdRef;

    /**
     * Horário do alerta no formato UTC (ex: "08:00", "20:30")
     */
    private String horarioUTC;

    /**
     * Lista dos dias da semana. Ex: ["seg", "ter", "qua", ...]
     */
    private List<String> diasSemana;
}