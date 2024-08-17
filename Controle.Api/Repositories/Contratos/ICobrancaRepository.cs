using Compartilhado.Models;

namespace Controle.Api.Repositories.Contratos;
public interface ICobrancaRepository
{
    Task<IEnumerable<Cobranca>> ObterCobrancas();
    Task Adicionar(Cobranca cobranca);
    Task Atualizar(Cobranca cobranca);
    Task Deletar(int id);
}
