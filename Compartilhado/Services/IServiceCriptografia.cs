namespace Compartilhado.Services;
public interface IServiceCriptografia
{
    public bool VerificarSenha(string senhaDigitada, string senhaSalvaUsuario);
    public string CriptografarSenha(string senha);
}
