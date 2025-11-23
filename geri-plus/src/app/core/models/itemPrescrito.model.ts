export interface ItemPrescritoModel {
    // Referência ao Catálogo de Medicamentos
    medicamentoBaseId: string;
    nomeMedicamento: string; 
    
    // Detalhes da Prescrição
    dosagem: string;
    viaAdministracao?: string; // Opcional, se você usá-lo
    observacoesPrescricao: string; 

    // Agendamento (corresponde a LocalTime no Java, mas aqui é string)
    horarios: string[]; // Array de strings (Ex: "08:00")
    diasSemana: string[]; // Array de strings (Ex: "Seg", "Ter")
    frequenciaDiaria: string;
    duracaoTratamento: string;
}