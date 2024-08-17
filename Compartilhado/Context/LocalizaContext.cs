using Compartilhado.EntityConfigurations;
using Compartilhado.Models;
using Microsoft.EntityFrameworkCore;

namespace Compartilhado.Context;
public class LocalizaContext(DbContextOptions<LocalizaContext> options) : DbContext(options)
{
    public DbSet<Cliente> Cliente { get; set; }
    public DbSet<Cobranca> Cobranca { get; set; }
    public DbSet<Usuario> Usuario { get; set; }
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfiguration(new ClienteConfiguration());

        modelBuilder.ApplyConfiguration(new CobrancaConfiguration());

        modelBuilder.ApplyConfiguration(new UsuarioConfiguration());

        base.OnModelCreating(modelBuilder);
    }
}
