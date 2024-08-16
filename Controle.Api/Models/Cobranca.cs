namespace Controle.Api.Models;
public class Cobranca
{
    public int Id{ get; set; }
    public string? Descricao { get; set; }
    public decimal Valor{ get; set; }
    public DateTime DataVencimento { get; set; }
    public int Pago { get; set; }
    public int ClienteId { get; set; }
    public Cliente Cliente { get; set; }
}
