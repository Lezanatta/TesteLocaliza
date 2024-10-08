﻿using Compartilhado.Models;
using Controle.Api.Repositories.Contratos;
using Controle.Api.Services.Contracts;

namespace Controle.Api.Services;
public class ServiceCobranca(ICobrancaRepository _repository) : IServiceCobranca
{
    public async Task<IEnumerable<Cobranca>> ObterCobrancasClienteId(int id) => await _repository.ObterCobrancasClienteId(id);
    public async Task<Cobranca> ObterCobrancaId(int id) => await _repository.ObterCobrancaId(id);
    public async Task AdicionarNovaCobranca(Cobranca cobranca) => await _repository.Adicionar(cobranca);

    public async Task AtualizarCobranca(Cobranca cobranca) => await _repository.Atualizar(cobranca);

    public async Task DeletarCobranca(int id) => await _repository.Deletar(id);


}
