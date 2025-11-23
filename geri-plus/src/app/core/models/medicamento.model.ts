interface MedicamentoModel {
  id?: string;
  nome: string;
  dosagem?: string;
 viaAdministracao: 'ORAL' | 'INJETAVEL' | 'TOPICA' | 'INALATORIA' | 'RETAL' | 'VAGINAL' | 'OUTRA'; 
  observacoes?: string;
}