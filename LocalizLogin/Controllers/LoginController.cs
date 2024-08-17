using Compartilhado.Models;
using LocalizLogin.Services;
using Microsoft.AspNetCore.Mvc;

namespace LocalizLogin.Controllers;

[Route("api/[controller]")]
[ApiController]
public class LoginController(IServiceLogin _loginService, IConfiguration _config) : ControllerBase
{
    [HttpPost("login")]
    public async Task<ActionResult> Login(ModelLogin modelLogin)
    {
        try
        {
            if (modelLogin.Email is null || modelLogin.Senha is null) return NotFound("Dados não preenchidos.");

            var resultado = await _loginService.Login(modelLogin, _config);

            return Ok(new { Mensagem = "Login realizado com sucesso.", Token = resultado});
        }
        catch(InvalidOperationException ex)
        {
            return Unauthorized(ex.Message);
        }
        catch (Exception)
        {
            return Unauthorized("Erro ao realizar o login.");
        }
    }
}
