# TesteLocaliza
Este projeto é relacionado a um desafio cujo objetivo é controlar clientes. O sistema foi dividido em três serviços diferentes:

**Serviço Web**: Responsável por fornecer a interface que permitirá a interação com o usuário. 

**Serviço de Login**: Responsável por autenticar os usuários, retornando os dados do usuário autenticado e o token que será utilizado em outras requisições.  

**Serviço de Controle de Dados**: Responsável por fornecer as funcionalidades que contêm os dados a serem consumidos pelo serviço web.  

# Fluxo da aplicação

![servicos](https://github.com/user-attachments/assets/b8491f5b-0bcf-41cc-b91f-c3780979187e)

O usuário só poderá utilizar a aplicação após se autenticar. Caso não possua cadastro, ele poderá se registrar antes de realizar a autenticação. Após a autenticação, as rotas serão liberadas para uso.

- Funcionalidades do Sistema  
- Cadastrar Usuário  
- Visualizar Clientes: Relacionados ao usuário cadastrado.  
- Cadastrar Cliente  
- Editar Cliente  
- Excluir Cliente
- Visualizar Cobranças: Relacionadas ao cliente cadastrado.  
- Cadastrar Cobrança  
- Editar Cobrança  
- Excluir Cobrança


As informações dos clientes estarão sempre associadas ao usuário autenticado na plataforma. Caso outro usuário se autentique, as informações apresentadas serão relacionadas apenas a esse novo usuário autenticado.

# Arquitetura utilizada para publicação da aplicação

![arquitetura](https://github.com/user-attachments/assets/f7ac080f-820f-4539-89e7-38f4f87bff8c)

No projeto, utilizei uma arquitetura na AWS para hospedar os recursos necessários. O banco de dados foi implementado usando o RDS MySQL. Criei uma instância EC2 e nela disponibilizei três containers: um para o serviço de login, outro para o serviço de controle de dados, e um terceiro para a aplicação Angular. Todos esses recursos, embora estejam dentro da mesma VPC, foram configurados para estarem acessíveis publicamente, tendo em vista que o projeto tem fins didáticos.



