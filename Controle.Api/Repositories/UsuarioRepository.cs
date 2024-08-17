using Controle.Api.Context;
using Controle.Api.Models;
using Controle.Api.Repositories.Contratos;
using Microsoft.EntityFrameworkCore;

namespace Controle.Api.Repositories;

public class UsuarioRepository(LocalizaContext _context) : IUsuarioRepository
{
    public async Task<IEnumerable<Usuario>> GetUsuarios() 
        => await _context.Usuario.ToListAsync();

    public async Task<IEnumerable<Usuario>> GetUsuariosClientes() 
        => await _context.Usuario.Include(c => c.Clientes).ToListAsync();

    public async Task CriarUsuario(Usuario usuario)
    {
        _context.Add(usuario);
        await _context.SaveChangesAsync();
    }
}
