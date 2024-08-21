using Compartilhado.Models;
using LocalizLogin.Services;
using Microsoft.AspNetCore.Mvc;

namespace LocalizLogin.Controllers;

[Route("api/[controller]")]
[ApiController]
public class LoginController(IServiceLogin _loginService, IConfiguration _config) : ControllerBase
{
    [HttpPost]  
    public async Task<ActionResult> Login(ModelLogin modelLogin)
    {
        try
        {
            if (modelLogin.Email is null || modelLogin.Senha is null) return NotFound("Dados não preenchidos.");

            var response = await _loginService.Login(modelLogin, _config);

            return Ok(response);
        }
        catch(InvalidOperationException ex)
        {
            return Unauthorized(new { Mensagem = ex.Message, Token = string.Empty });
        }
        catch (Exception)
        {
            return Unauthorized(new { Mensagem = "Login realizado com sucesso.", Token = string.Empty });
        }
    }
}
