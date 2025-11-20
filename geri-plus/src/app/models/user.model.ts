export interface UserModel {
  id: string; // @Id → identificador único do usuário
  nome: string; // nome do usuário
  quarto?: string; // quarto do idoso (opcional)
  fotoUrl?: string; // Binary no backend → aqui pode ser URL ou base64
  tipoUsuario: string; // Enum TipoUsuario → representado como string (ADMIN, FAMILIAR, CUIDADOR_PROFISSIONAL)
  email: string; // email único
  telefone?: string; // telefone do usuário
  senha?: string; // senha (normalmente não retornada pelo backend, só usada no login)
  cpf?: string; // CPF único
  dataNascimento?: string; // LocalDate no backend → string ISO (ex: "1950-05-10")
  responsavelId?: string; // id do responsável
  statusResidencia?: string; // Enum StatusResidencia → representado como string (ATIVO, INATIVO, etc.)

  notificacoesNaoLidas?: string[]; // lista de notificações não lidas
  medicamentos?: string[]; // lista de medicamentos
  recomendacoesMedicas?: string[]; // lista de recomendações médicas
  cuidadoresId?: string[]; // lista de cuidadores vinculados
}
