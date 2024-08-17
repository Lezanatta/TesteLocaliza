using Controle.Api.Models;
using Controle.Api.Repositories;
using Controle.Api.Services.Contracts;

namespace Controle.Api.Services;
public class ServiceCliente(IClienteRepository _repository) : IServiceCliente
{
    public async Task AdicionarNovoCliente(Cliente cliente) => await _repository.AdicionarCliente(cliente);
}
