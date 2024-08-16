using Controle.Api.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Controle.Api.EntityConfigurations;
public class UsuarioConfiguration : IEntityTypeConfiguration<Usuario>
{
    public void Configure(EntityTypeBuilder<Usuario> builder)
    {
        builder.Property(c => c.Id).HasColumnName("idUsuario");
        builder.Property(c => c.Nome).HasColumnName("Nome");
        builder.Property(c => c.Email).HasColumnName("Email");
        builder.Property(c => c.Senha).HasColumnName("Senha");

        builder.HasKey(c => c.Id);
    }
}
