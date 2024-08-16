﻿namespace Controle.Api.Models;
public class Cliente
{
    public int Id{ get; set; }
    public string? Nome { get; set; }
    public string? Documento { get; set; }
    public string? Telefone { get; set; }
    public string? Endereco { get; set; }
    public Usuario Usuario{ get; set; }
    public ICollection<Cobranca> Cobrancas{ get; set; }
}
