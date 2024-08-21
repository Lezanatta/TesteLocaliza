using Compartilhado.Models;

namespace LocalizLogin.Services;
public interface IServiceLogin
{
    Task<ResponseLogin> Login(ModelLogin modelLogin, IConfiguration config);
}
