using Compartilhado.Context;
using Compartilhado.Models;
using Controle.Api.Repositories.Contratos;
using Microsoft.EntityFrameworkCore;

namespace Controle.Api.Repositories;

public class UsuarioRepository(LocalizaContext _context) : IUsuarioRepository
{
    public async Task<IEnumerable<Usuario>> GetUsuarios() 
        => await _context.Usuario.ToListAsync();

    public async Task<IEnumerable<Usuario>> GetUsuariosClientes(int id) 
        => await _context.Usuario.Where(usu => usu.Id == id).Include(c => c.Clientes).ToListAsync();

    public async Task CriarUsuario(Usuario usuario)
    {
        _context.Add(usuario);
        await _context.SaveChangesAsync();
    }
}
