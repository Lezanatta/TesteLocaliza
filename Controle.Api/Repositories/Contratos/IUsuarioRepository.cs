using Compartilhado.Models;

namespace Controle.Api.Repositories.Contratos;

public interface IUsuarioRepository
{
    Task<IEnumerable<Usuario>> GetUsuarios();
    Task<IEnumerable<Usuario>> GetUsuariosClientes(int id);
    Task CriarUsuario(Usuario usuario);
}
