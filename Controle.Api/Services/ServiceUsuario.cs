using Compartilhado.Models;
using Compartilhado.Services;
using Controle.Api.Repositories.Contratos;
using Controle.Api.Services.Contracts;

namespace Controle.Api.Services;
public class ServiceUsuario(IUsuarioRepository _repository, IServiceCriptografia _serviceCriptografia) : IServiceUsuario
{
    public async Task AdicionarNovoUsuario(Usuario usuario)
    {
        var senhaCriptografada = _serviceCriptografia.CriptografarSenha(usuario.Senha);

        usuario.Senha = senhaCriptografada;

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
