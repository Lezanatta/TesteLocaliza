using Compartilhado.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Compartilhado.EntityConfigurations;

public class CobrancaConfiguration : IEntityTypeConfiguration<Cobranca>
{
    public void Configure(EntityTypeBuilder<Cobranca> builder)
    {
        builder.Property(c => c.IdCobranca).HasColumnName("idCobranca");
        builder.Property(c => c.Valor).HasColumnName("Valor");
        builder.Property(c => c.DataVencimento).HasColumnName("DataVencimento");
        builder.Property(c => c.Pago).HasColumnName("Pago");
        builder.Property(c => c.ClienteId).HasColumnName("ClienteId");

        builder.HasKey(c => c.IdCobranca);

        builder.HasOne(c => c.Cliente).WithMany(c => c.Cobrancas).IsRequired().OnDelete(DeleteBehavior.Cascade);
    }
}
