export interface Visita {
  id: string;
  idosoId: string;
  cuidadorId?: string;
  visitanteId?: string;
  dataHoraVisita: string;
  statusVisita?: 'AGENDADA' | 'INICIADA' | 'CONCLUIDA' | 'CANCELADA';
  observacoes?: string;
}