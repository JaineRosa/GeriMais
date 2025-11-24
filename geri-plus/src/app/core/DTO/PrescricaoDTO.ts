import { MedicamentoPrescritoDTO } from "./MedicamentoPrescritoDTO";
import { RecomendacaoDTO } from "./RecomendacaoDTO";


export interface PrescricaoDTO {
    idosoId: string;
    medicoId: string;
    
    // Lista de itens a serem prescritos
    medicamentos: MedicamentoPrescritoDTO[]; 
    
    // Recomendação geral
    recomendacao: RecomendacaoDTO;
    dataRecomendacao?: string;
}