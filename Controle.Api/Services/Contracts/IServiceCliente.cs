using Controle.Api.Models;

namespace Controle.Api.Services.Contracts;
public interface IServiceCliente
{
    Task AdicionarNovoCliente(Cliente cliente);
}
