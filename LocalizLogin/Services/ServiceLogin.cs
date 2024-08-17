using LocalizLogin.Context;
using LocalizLogin.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;


namespace LocalizLogin.Services;

public class ServiceLogin(LocalizaLoginContext _context) : IServiceLogin
{
    public async Task<string> Login(Usuario usuario, IConfiguration configuration)
    {
        var usuarioEncontrado = await _context.Usuario
                    .SingleOrDefaultAsync(u => u.Email == usuario.Email);

        if (usuarioEncontrado is null || !VerifyPassword(usuario.Senha, usuarioEncontrado.Senha))
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

    private static bool VerifyPassword(string senhaDigitada, string senhaSalvaUsuario)
    {
        return BCrypt.Net.BCrypt.Verify(senhaDigitada, senhaSalvaUsuario);
        //string senhaHash = BCrypt.Net.BCrypt.HashPassword(senha);
    }
}
