using Compartilhado.Models;
using Controle.Api.Services.Contracts;
using Microsoft.AspNetCore.Mvc;

namespace Controle.Api.Controllers;

[Route("api/[controller]")]
[ApiController]
public class CobrancaController(IServiceCobranca _service) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Cobranca>>> Get()
    {
        var cobrancas = await _service.ObterCobrancasClientes();

        if(cobrancas is null) return NotFound("Não possui cobrancas cadastradas.");

        return Ok(cobrancas);
    }

    [HttpPost]
    public async Task<ActionResult> Post([FromBody] Cobranca cobranca)
    {
        if (cobranca is null) return BadRequest("Dados não preenchidos.");
        
        await _service.AdicionarNovaCobranca(cobranca);

        return CreatedAtAction(nameof(Get), new { }, cobranca);
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
