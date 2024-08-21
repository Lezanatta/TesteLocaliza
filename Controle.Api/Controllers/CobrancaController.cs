using Compartilhado.Models;
using Controle.Api.Services.Contracts;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Controle.Api.Controllers;

[Route("api/[controller]")]
[ApiController]
[Authorize]

public class CobrancaController(IServiceCobranca _service) : ControllerBase
{
    [HttpGet("clientes/{id}")]
    public async Task<ActionResult<IEnumerable<Cobranca>>> Get(int id)
    {
        var cobrancas = await _service.ObterCobrancasClienteId(id);

        if(cobrancas is null) return NotFound("Não possui cobrancas cadastradas.");

        return Ok(cobrancas);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<IEnumerable<Cobranca>>> GetCobrancaId(int id)
    {
        var cobranca = await _service.ObterCobrancaId(id);

        if (cobranca is null) return NotFound("Não possui cobrancas cadastradas.");

        return Ok(cobranca);
    }

    [HttpPost]
    public async Task<ActionResult> Post([FromBody] Cobranca cobranca)
    {
        if (cobranca is null) return BadRequest("Dados não preenchidos.");
        
        await _service.AdicionarNovaCobranca(cobranca);

        return CreatedAtAction(nameof(Get), new { id = cobranca.IdCobranca }, cobranca);
    }

    [HttpPut]
    public async Task<ActionResult> Put([FromBody] Cobranca cobranca)
    {
        if (cobranca is null) return BadRequest("Dados não preenchidos.");

        await _service.AtualizarCobranca(cobranca);

        return Ok("Cobranca alterada com sucesso");
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> Delete(int id)
    {
        await _service.DeletarCobranca(id);

        return Ok("Cobranca adicionado com sucesso");
    }
}
