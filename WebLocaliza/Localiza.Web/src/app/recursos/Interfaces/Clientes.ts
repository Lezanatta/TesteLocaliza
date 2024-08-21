import { Cobranca } from "./Cobrancas";

export interface Clientes {
  id: number;
  usuarioId: number;
  nome: string;
  documento: string;
  telefone: string;
  endereco: string;
  cobrancas?: Cobranca[];
  pagos?: number;
  abertos?: number;
  atrasados: number;
}
