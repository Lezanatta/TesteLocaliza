using Controle.Api.Context;
using Controle.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace Controle.Api.Repositories;
public class ClienteRepository(LocalizaContext _context) : IClienteRepository
{
    public async Task AdicionarCliente(Cliente cliente)
    {
        _context.Cliente.Add(cliente);
        await _context.SaveChangesAsync();
    }

    public async Task Atualizar(Cliente cliente)
        => await _context.Cliente.ExecuteUpdateAsync(prop => prop.SetProperty(cli => cli.Endereco, cliente.Endereco)
            .SetProperty(cli => cli.Documento, cliente.Documento)
            .SetProperty(cli => cli.Nome, cliente.Nome)
            .SetProperty(cli => cli.Telefone, cliente.Telefone)
            .SetProperty(cli => cli.Telefone, cliente.Telefone));

    public async Task Deletar(int id)
    {
        var cliente = await _context.Cliente.Where(cli => cli.Id == id).FirstOrDefaultAsync();

        _context.Cliente.Remove(cliente);

        await _context.SaveChangesAsync();
    }
}
