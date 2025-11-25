



export interface UserModel {
  id: string; 
  nome: string; 
  quarto?: string; 
  fotoUrl?: string; 
  tipoUsuario: string; 
  email?: string; 
  telefone?: string; 
  senha?: string; 
  cpf?: string; 
  dataNascimento?: string; 
  responsavelId?: string; 
  statusResidencia?: string; 
  crm?: string;
  especialidadeMedica?: string;

  notificacoesNaoLidas?: string[]; 
  medicamentos?: string[]; 
  recomendacoesMedicas?: string[]; 
  cuidadoresId?: string[]; 
  idososId?: string[];
  idososVinculadosNomes?: string;
}
