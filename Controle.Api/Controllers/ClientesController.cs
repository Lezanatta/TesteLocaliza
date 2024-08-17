using Controle.Api.Services.Contracts;
using Microsoft.AspNetCore.Mvc;

namespace Controle.Api.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ClientesController(IServiceCliente _service) : ControllerBase
{
}
