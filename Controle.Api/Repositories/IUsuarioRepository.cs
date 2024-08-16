using Controle.Api.Models;

namespace Controle.Api.Repositories;

public interface IUsuarioRepository
{
    Task<IEnumerable<Usuario>> GetUsuarios();
    Task<IEnumerable<Usuario>> GetUsuariosClientes();
    Task CriarUsuario(Usuario usuario);
}
