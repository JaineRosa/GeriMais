package com.example.LarIdosos.Models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * POJO para uma Recomendação Médica.
 * ESTA CLASSE É ANINHADA (EMBEDDED) DENTRO DO DOCUMENTO 'Idoso'.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class RecomendacaoMedica {

    private String descricao; // Ex: "Caminhar 20 minutos pela manhã"

    private String prioridade; // Ex: "ALTA", "MEDIA", "BAIXA"

    private String profissional; // Ex: "Dr. Carlos (Fisioterapeuta)"
}