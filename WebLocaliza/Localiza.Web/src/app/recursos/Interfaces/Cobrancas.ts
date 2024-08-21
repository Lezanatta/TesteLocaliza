export interface Cobranca {
  idCobranca: number;
  descricao: string;
  valor: number;
  dataVencimento: Date;
  pago: number;
  ClienteId?: number;
}
