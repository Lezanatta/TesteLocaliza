namespace Compartilhado.Models;
public class ResponseLogin
{
    public int? IdUsuario { get; set; }
    public string? Token { get; set; }
    public string? NomeUsuario { get; set; }
    public string? Mensagem { get; set; }
}
