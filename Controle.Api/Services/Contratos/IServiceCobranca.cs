﻿using Compartilhado.Models;

namespace Controle.Api.Services.Contracts;
public interface IServiceCobranca
{
    Task<IEnumerable<Cobranca>> ObterCobrancasClienteId(int id);
    Task<Cobranca> ObterCobrancaId(int id);
    Task AdicionarNovaCobranca(Cobranca cobranca);
    Task AtualizarCobranca(Cobranca cobranca);
    Task DeletarCobranca(int id);
}
