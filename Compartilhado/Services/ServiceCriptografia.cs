namespace Compartilhado.Services;

public class ServiceCriptografia : IServiceCriptografia
{
    public string CriptografarSenha(string senha) 
        => BCrypt.Net.BCrypt.HashPassword(senha);

    public bool VerificarSenha(string senhaDigitada, string senhaSalvaUsuario) 
        => BCrypt.Net.BCrypt.Verify(senhaDigitada, senhaSalvaUsuario);
}
