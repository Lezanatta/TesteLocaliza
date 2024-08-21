using Compartilhado.Models;

namespace Controle.Api.Repositories.Contratos;
public interface IClienteRepository
{
    Task<IEnumerable<Cliente>> ObterClientes();
    Task<IEnumerable<Cliente>> ObterClientesCobrancasUsuarioId(int id);
    Task<Cliente> ObterClienteId(int id);
    Task AdicionarCliente(Cliente cliente);
    Task Atualizar(Cliente cliente);
    Task Deletar(int id);
}
