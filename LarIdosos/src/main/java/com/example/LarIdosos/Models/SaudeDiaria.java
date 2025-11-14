package com.example.LarIdosos.Models;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;

/**
 * Representa um registro diário de saúde na coleção 'saude_diaria'.
 * Esta é uma coleção separada para não sobrecarregar o doc 'Idoso'.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "saude_diaria")
public class SaudeDiaria {

    @Id
    private String id;

    /**
     * Referência ao ID do Idoso. Essencial para a busca.
     */
    private String idosoIdRef;

    private LocalDate data; // O dia do registro

    // Campos do estado de saúde
    private String humor; // Ex: "BOM", "AGITADO", "CALMO"
    private String pressaoArterial; // Ex: "12/8"
    private Integer batimentosPorMinuto;
    private Integer saturacaoOxigenio;

    private String observacoesCuidador; // Ex: "Comeu bem no almoço"
}