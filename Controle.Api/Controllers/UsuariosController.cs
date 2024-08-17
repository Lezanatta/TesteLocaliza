using Controle.Api.Models;
using Controle.Api.Services.Contracts;
using Microsoft.AspNetCore.Mvc;

namespace Controle.Api.Controllers;

[Route("api/[controller]")]
[ApiController]
public class UsuariosController(IServiceUsuario _service) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Usuario>>> Get()
    {
        try
        {
            var usuarios = await _service.ObterUsuarioCadastrados();

            return Ok(usuarios);
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpGet("clientes")]
    public async Task<ActionResult<IEnumerable<Usuario>>> GetUsuariosClientes()
    {
        try
        {
            var usuariosClientes = await _service.ObterUsuariosClientes();

            return Ok(usuariosClientes);
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpPost]
    public async Task<ActionResult> Post([FromBody] Usuario usuario)
    {

        if (usuario is null) return BadRequest("Usuario não informado");

        await _service.AdicionarNovoUsuario(usuario);

        return CreatedAtAction(nameof(Get), new { }, usuario);
    }

}
