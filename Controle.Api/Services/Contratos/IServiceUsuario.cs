﻿using Compartilhado.Models;

namespace Controle.Api.Services.Contracts;
public interface IServiceUsuario
{
    Task<IEnumerable<Usuario>> ObterUsuarioCadastrados();
    Task<IEnumerable<Usuario>> ObterUsuariosClientes(int id);
    Task AdicionarNovoUsuario(Usuario usuario);
}
