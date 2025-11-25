import { MedicamentoPrescritoDTO } from "./MedicamentoPrescritoDTO";
import { RecomendacaoDTO } from "./RecomendacaoDTO";


export interface PrescricaoDTO {
    idosoId: string;
    medicoId: string;
    
    
    medicamentos: MedicamentoPrescritoDTO[]; 
    
    
    recomendacao: RecomendacaoDTO;
    dataRecomendacao?: string;
}