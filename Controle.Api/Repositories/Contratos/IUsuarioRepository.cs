using Compartilhado.Models;

namespace Controle.Api.Repositories.Contratos;

public interface IUsuarioRepository
{
    Task<IEnumerable<Usuario>> GetUsuarios();
    Task<IEnumerable<Usuario>> GetUsuariosClientes();
    Task CriarUsuario(Usuario usuario);
}
