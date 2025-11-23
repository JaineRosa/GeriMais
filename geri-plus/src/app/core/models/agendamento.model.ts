export interface AgendamentoModel {
    id?: string;
    medicamentoId: string;
    idosoId: string;
    horarios: string[];
    diasSemana: string[]; 
}