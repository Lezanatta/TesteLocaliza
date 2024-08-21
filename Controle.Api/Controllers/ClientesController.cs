using Compartilhado.Models;
using Controle.Api.Services.Contracts;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Controle.Api.Controllers;

[Route("api/[controller]")]
[ApiController]
[Authorize]

public class ClientesController(IServiceCliente _service) : ControllerBase
{
    [HttpGet("teste")]
    public IActionResult GetTeste()
    {
        return Ok("Aplicação está funcionando!");
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Cliente>>> Get()
    {
        var clientes = await _service.ObterClientesCadastrados();

        if (clientes is null) return NotFound("Não existem clientes cadastrados");

        return Ok(clientes);
    }

    [HttpGet("cobrancas/{usuarioId}")]
    public async Task<ActionResult<IEnumerable<Cliente>>> GetClientesCobrancasUsuarioId(int usuarioId)
    {
        var clientes = await _service.ObterClientesCobrancasUsuarioId(usuarioId);

        if (clientes is null) return NotFound("Não existem clientes cadastrados");

        return Ok(clientes);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<IEnumerable<Cliente>>> GetClienteId(int id)
    {
        var cliente = await _service.ObterClienteId(id);

        if (cliente is null) return NotFound("Não existem clientes cadastrados");

        return Ok(cliente);
    }

    [HttpPost]
    public async Task<ActionResult> Post([FromBody] Cliente cliente)
    {
        if (cliente is null) return BadRequest("Dados inválidos!");

        await _service.AdicionarNovoCliente(cliente);

        return CreatedAtAction(nameof(Get), new { }, cliente);
    }

    [HttpPut]
    public async Task<ActionResult> Put([FromBody] Cliente cliente)
    {
        if (cliente is null) return BadRequest("Dados inválidos!");

        await _service.AtualizarCliente(cliente);

        return Ok("Cliente alterado com sucesso.");
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> Delete(int id)
    {
        await _service.DeletarCliente(id);

        return Ok("Cliente excluído com sucesso.");
    }
}
