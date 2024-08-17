using Controle.Api.Models;
using Controle.Api.Repositories;
using Controle.Api.Services.Contracts;

namespace Controle.Api.Services;
public class ServiceCliente(IClienteRepository _repository) : IServiceCliente
{
    public async Task AdicionarNovoCliente(Cliente cliente) => await _repository.AdicionarCliente(cliente);

    public async Task AtualizarCliente(Cliente cliente) => await _repository.Atualizar(cliente);

    public async Task DeletarCliente(int id) => await _repository.Deletar(id);
}
