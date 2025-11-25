export interface ItemPrescritoModel {
    
    medicamentoBaseId: string;
    nomeMedicamento: string; 
    
    
    dosagem: string;
    viaAdministracao?: string; 
    observacoesPrescricao: string; 

    
    horarios: string[]; 
    diasSemana: string[]; 
    frequenciaDiaria: string;
    duracaoTratamento: string;
}