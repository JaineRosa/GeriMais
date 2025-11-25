import { ItemPrescritoModel } from "./itemPrescrito.model";


export interface RecomendacaoMedicaModel {
    id: string; 
    idosoId: string;
    medicoId: string;
    dataRecomendacao: string; 
    
    
    descricaoGeral: string;
    prioridade: 'BAIXA' | 'MEDIA' | 'ALTA'; 

    
    medicamentosPrescritos: ItemPrescritoModel[];
    dataCadastro?: string;
}