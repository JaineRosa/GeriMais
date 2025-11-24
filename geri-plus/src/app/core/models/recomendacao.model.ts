import { ItemPrescritoModel } from "./itemPrescrito.model";


export interface RecomendacaoMedicaModel {
    id: string; // ID gerado pelo MongoDB/Spring
    idosoId: string;
    medicoId: string;
    dataRecomendacao: string; // Será um timestamp ou string ISO
    
    // DADOS DE RECOMENDAÇÃO GERAL
    descricaoGeral: string;
    prioridade: 'BAIXA' | 'MEDIA' | 'ALTA'; // Ou o tipo de enum que você usa

    // DETALHES DA PRESCRIÇÃO
    medicamentosPrescritos: ItemPrescritoModel[];
    dataCadastro?: string;
}