using Compartilhado.Models;

namespace Controle.Api.Services.Contracts;
public interface IServiceCliente
{
    Task<IEnumerable<Cliente>> ObterClientesCadastrados();
    Task<IEnumerable<Cliente>> ObterClientesCobrancasUsuarioId(int id);
    Task<Cliente> ObterClienteId(int id);
    Task AdicionarNovoCliente(Cliente cliente);
    Task AtualizarCliente(Cliente cliente);
    Task DeletarCliente(int id);
}
