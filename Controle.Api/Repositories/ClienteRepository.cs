using Compartilhado.Context;
using Compartilhado.Models;
using Controle.Api.Repositories.Contratos;
using Microsoft.EntityFrameworkCore;

namespace Controle.Api.Repositories;
public class ClienteRepository(LocalizaContext _context) : IClienteRepository
{
    public async Task<IEnumerable<Cliente>> ObterClientes() => await _context.Cliente.ToListAsync();

    public async Task<IEnumerable<Cliente>> ObterClientesCobrancasUsuarioId(int usuarioId) 
        => await _context.Cliente.Where(cli => cli.UsuarioId == usuarioId).Include(cob => cob.Cobrancas).ToListAsync();

    public async Task AdicionarCliente(Cliente cliente)
    {
        _context.Cliente.Add(cliente);
        await _context.SaveChangesAsync();
    }

    public async Task Atualizar(Cliente cliente)
        => await _context.Cliente.Where(cli => cli.Id == cliente.Id).ExecuteUpdateAsync(prop => prop.SetProperty(cli => cli.Endereco, cliente.Endereco)
            .SetProperty(cli => cli.Documento, cliente.Documento)
            .SetProperty(cli => cli.Nome, cliente.Nome)
            .SetProperty(cli => cli.Telefone, cliente.Telefone)
            .SetProperty(cli => cli.Telefone, cliente.Telefone));

    public async Task Deletar(int id) => await _context.Cliente.Where(cli => cli.Id == id).ExecuteDeleteAsync();

    public async Task<Cliente> ObterClienteId(int id) => await _context.Cliente.Where(cli => cli.Id == id).FirstOrDefaultAsync();
}
