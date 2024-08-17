using Compartilhado.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Compartilhado.EntityConfigurations;
public class ClienteConfiguration : IEntityTypeConfiguration<Cliente>
{
    public void Configure(EntityTypeBuilder<Cliente> builder)
    {
        builder.Property(c => c.Id).HasColumnName("ClienteId");
        builder.Property(c => c.Nome).HasColumnName("Nome");
        builder.Property(c => c.Telefone).HasColumnName("Telefone");
        builder.Property(c => c.Endereco).HasColumnName("Endereco");
        builder.Property(c => c.UsuarioId).HasColumnName("UsuarioId");

        builder.HasKey(c => c.Id);

        builder.HasOne(c => c.Usuario)
               .WithMany(c => c.Clientes)
               .HasForeignKey(c => c.UsuarioId)
               .IsRequired()
               .OnDelete(DeleteBehavior.Cascade);

        builder.HasMany(c => c.Cobrancas)
               .WithOne(c => c.Cliente);
    }
}
