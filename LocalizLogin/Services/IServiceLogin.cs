using Compartilhado.Models;

namespace LocalizLogin.Services;
public interface IServiceLogin
{
    Task<string> Login(ModelLogin modelLogin, IConfiguration config);
}
