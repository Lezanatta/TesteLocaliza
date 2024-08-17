using Compartilhado.Context;
using Compartilhado.Models;
using Compartilhado.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;


namespace LocalizLogin.Services;

public class ServiceLogin(LocalizaContext _context, IServiceCriptografia _serviceCriptografia) : IServiceLogin
{
    public async Task<string> Login(ModelLogin modelLogin, IConfiguration configuration)
    {
        var usuarioEncontrado = await _context.Usuario.Where(usu => usu.Email == modelLogin.Email).FirstOrDefaultAsync();

        var senhaConfirmada = _serviceCriptografia.VerificarSenha(modelLogin.Senha, usuarioEncontrado.Senha);

        if (usuarioEncontrado is null || !senhaConfirmada)
            throw new InvalidOperationException("Usuario com dados inválidos.");

        var token = GeratTokenJwt(usuarioEncontrado, configuration);

        return token;
    }

    private static string GeratTokenJwt(Usuario usuarioEncontrado, IConfiguration configuration)
    {
        var tokenHandler = new JwtSecurityTokenHandler();
        var key = Encoding.ASCII.GetBytes(configuration["Jwt:Key"]);
        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(new Claim[]
            {
                new(ClaimTypes.Name, usuarioEncontrado.Nome),
                new(ClaimTypes.Email, usuarioEncontrado.Email),              
            }),
            Expires = DateTime.UtcNow.AddHours(1),
            Issuer = configuration["Jwt:Issuer"],
            Audience = configuration["Jwt:Audience"],
            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
        };

        var token = tokenHandler.CreateToken(tokenDescriptor);

        return tokenHandler.WriteToken(token);
    }
}
