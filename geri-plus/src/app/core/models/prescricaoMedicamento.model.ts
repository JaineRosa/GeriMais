export interface PrescricaoMedicamentoModel extends MedicamentoModel {
    frequenciaDiaria: string;
    duracaoTratamento: string;
    idosoId: string;
    medicoId: string;
}