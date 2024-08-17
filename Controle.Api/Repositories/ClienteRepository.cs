using Controle.Api.Context;
using Controle.Api.Models;

namespace Controle.Api.Repositories;
public class ClienteRepository(LocalizaContext _context) : IClienteRepository
{
    public async Task AdicionarCliente(Cliente cliente)
    {
        _context.Cliente.Add(cliente);
        await _context.SaveChangesAsync();
    }
}
