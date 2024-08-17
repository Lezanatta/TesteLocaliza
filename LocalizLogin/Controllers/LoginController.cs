using LocalizLogin.Models;
using LocalizLogin.Services;
using Microsoft.AspNetCore.Mvc;

namespace LocalizLogin.Controllers;

[Route("api/[controller]")]
[ApiController]
public class LoginController(IServiceLogin _loginService, IConfiguration _config) : ControllerBase
{
    [HttpPost("login")]
    public async Task<ActionResult> Login([FromBody] Usuario usuario)
    {
        try
        {
            if (usuario is null) return NotFound("Dados não preenchidos.");

            var resultado = await _loginService.Login(usuario, _config);

            return Ok(new { Mensagem = "Login realizado com sucesso.", Token = resultado});
        }
        catch(InvalidOperationException ex)
        {
            return Unauthorized(ex.Message);
        }
    }
}
