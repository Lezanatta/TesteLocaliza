using Controle.Api.Models;

namespace Controle.Api.Repositories.Contratos;
public interface IClienteRepository
{
    Task AdicionarCliente(Cliente cliente);
    Task Atualizar(Cliente cliente);
    Task Deletar(int id);
}
