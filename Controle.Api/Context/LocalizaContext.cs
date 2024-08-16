﻿using Controle.Api.EntityConfigurations;
using Controle.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace Controle.Api.Context;
public class LocalizaContext(DbContextOptions<LocalizaContext> options) : DbContext(options)
{
    public DbSet<Usuario> Cliente { get; set; }
    public DbSet<Cobranca> Cobranca { get; set; }
    public DbSet<Usuario> Usuario { get; set; }
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfiguration(new ClienteConfiguration());

        modelBuilder.ApplyConfiguration(new ClienteConfiguration());

        modelBuilder.ApplyConfiguration(new UsuarioConfiguration());

        base.OnModelCreating(modelBuilder);
    }
}
