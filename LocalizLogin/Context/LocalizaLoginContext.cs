using LocalizLogin.EntityConfigurations;
using LocalizLogin.Models;
using Microsoft.EntityFrameworkCore;

namespace LocalizLogin.Context;
public class LocalizaLoginContext(DbContextOptions<LocalizaLoginContext> options) : DbContext(options)
{
    public DbSet<Usuario> Usuario { get; set; }
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfiguration(new UsuarioConfiguration());

        base.OnModelCreating(modelBuilder);
    }
}
