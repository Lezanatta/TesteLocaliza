using Compartilhado.Models;
using Controle.Api.Repositories.Contratos;
using Controle.Api.Services.Contracts;

namespace Controle.Api.Services;
public class ServiceCliente(IClienteRepository _repository) : IServiceCliente
{
    public async Task<IEnumerable<Cliente>> ObterClientesCadastrados() => await _repository.ObterClientes();

    public async Task<IEnumerable<Cliente>> ObterClientesCobrancasUsuarioId(int id) => await _repository.ObterClientesCobrancasUsuarioId(id);

    public async Task AdicionarNovoCliente(Cliente cliente) => await _repository.AdicionarCliente(cliente);

    public async Task AtualizarCliente(Cliente cliente) => await _repository.Atualizar(cliente);

    public async Task DeletarCliente(int id) => await _repository.Deletar(id);

    public async Task<Cliente> ObterClienteId(int id) => await _repository.ObterClienteId(id);
}
