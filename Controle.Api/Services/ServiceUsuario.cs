using Controle.Api.Models;
using Controle.Api.Repositories;
using Controle.Api.Services.Contracts;

namespace Controle.Api.Services;
public class ServiceUsuario(IUsuarioRepository _repository) : IServiceUsuario
{
    public async Task AdicionarNovoUsuario(Usuario usuario)
    {
        await _repository.CriarUsuario(usuario);
    }

    public async Task<IEnumerable<Usuario>> ObterUsuarioCadastrados()
    {
        var usuariosCadastrados = await _repository.GetUsuarios();

        if (usuariosCadastrados is not null) return usuariosCadastrados;

        throw new Exception("Não existem usuários cadastrados");
    }

    public async Task<IEnumerable<Usuario>> ObterUsuariosClientes()
    {
        var usuariosClientes = await _repository.GetUsuariosClientes();

        if (usuariosClientes is not null) return usuariosClientes;

        throw new Exception("Não existem usuários cadastrados");
    }
}
