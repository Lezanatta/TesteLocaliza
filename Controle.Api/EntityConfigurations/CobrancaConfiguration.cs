using Controle.Api.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Controle.Api.EntityConfigurations;

public class CobrancaConfiguration : IEntityTypeConfiguration<Cobranca>
{
    public void Configure(EntityTypeBuilder<Cobranca> builder)
    {
        builder.Property(c => c.Id).HasColumnName("idCobranca");
        builder.Property(c => c.Valor).HasColumnName("Valor");
        builder.Property(c => c.DataVencimento).HasColumnName("DataVencimento");
        builder.Property(c => c.Pago).HasColumnName("Pago");
        builder.Property(c => c.Cliente).HasColumnName("Pago");

        builder.HasKey(c => c.Id);
        builder.HasOne(c => c.Cliente).WithMany(c => c.Cobrancas).IsRequired().OnDelete(DeleteBehavior.Cascade);
    }
}
