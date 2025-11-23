
export interface MedicamentoPrescritoDTO {
    medicamentoBaseId: string; // ID do item no catálogo!
    dosagem: string;
    viaAdministracao?: string;
    observacoesPrescricao: string;
    
    // Agendamento
    horarios: string[]; // Ex: ["08:00", "20:00"]
    diasSemana: string[]; 
    frequenciaDiaria: string;
    duracaoTratamento: string;
}