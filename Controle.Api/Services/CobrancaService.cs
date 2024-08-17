﻿using Controle.Api.Models;
using Controle.Api.Repositories.Contratos;
using Controle.Api.Services.Contracts;

namespace Controle.Api.Services;
public class CobrancaService(ICobrancaRepository _repository) : ICobrancaService
{
    public async Task<IEnumerable<Cobranca>> ObterCobrancasClientes() => await _repository.ObterCobrancas();
    public async Task AdicionarNovaCobranca(Cobranca cobranca) => await _repository.Adicionar(cobranca);

    public async Task AtualizarCobranca(Cobranca cobranca) => await _repository.Atualizar(cobranca);

    public async Task DeletarCobranca(int id) => await _repository.Deletar(id);
}
