using Compartilhado.Context;
using Compartilhado.Models;
using Controle.Api.Repositories.Contratos;
using Microsoft.EntityFrameworkCore;

namespace Controle.Api.Repositories;
public class CobrancaRepository(LocalizaContext _context) : ICobrancaRepository
{
    public async Task<IEnumerable<Cobranca>> ObterCobrancas() => await _context.Cobranca.ToListAsync();

    public async Task Adicionar(Cobranca cobranca)
    {
        _context.Cobranca.Add(cobranca);
        await _context.SaveChangesAsync();
    }

    public async Task Atualizar(Cobranca cobranca)
        => await _context.Cobranca.ExecuteUpdateAsync(prop => prop.SetProperty(cobr => cobr.Valor, cobranca.Valor)
            .SetProperty(cobr => cobr.DataVencimento, cobranca.DataVencimento)
            .SetProperty(cobr => cobr.Pago, cobranca.Pago));

    public async Task Deletar(int id)
    {
        var cobranca = await _context.Cobranca.Where(cli => cli.IdCobranca == id).FirstOrDefaultAsync();

        _context.Cobranca.Remove(cobranca);

        await _context.SaveChangesAsync();
    }
}
