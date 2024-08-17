using LocalizLogin.Models;

namespace LocalizLogin.Services;
public interface IServiceLogin
{
    Task<string> Login(Usuario usuario, IConfiguration config);
}
