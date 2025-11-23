export interface RecomendacaoDTO {
  descricaoGeral: string;
  prioridade: 'BAIXA' | 'NORMAL' | 'ALTA' | 'URGENTE';
}
