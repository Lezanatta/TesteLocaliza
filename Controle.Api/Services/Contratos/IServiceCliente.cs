using Controle.Api.Models;

namespace Controle.Api.Services.Contracts;
public interface IServiceCliente
{
    Task<IEnumerable<Cliente>> ObterClientesCadastrados();
    Task AdicionarNovoCliente(Cliente cliente);
    Task AtualizarCliente(Cliente cliente);
    Task DeletarCliente(int id);
}
