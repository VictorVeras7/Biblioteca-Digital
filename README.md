# :checkered_flag: Biblioteca Digital

O projeto consiste em desenvolver uma plataforma web intuitiva e acessível para uma biblioteca digital, onde os usuários possam explorar, acessar e gerenciar livros, artigos e outros materiais digitais.

## :technologist: Membros da equipe

 - 571603 - Victor Veras Martins - Engenharia de Software.
 - 512010 - Ryan Guilherme Morais Nascimento - Engenharia de Computação.

## :bulb: Objetivo Geral
Criar uma biblioteca digital para catalogar livros e materiais de estudo acessíveis à comunidade.

## :eyes: Público-Alvo
Comunidades locais, estudantes e professores.

## :star2: Impacto Esperado
Ampliar o acesso à leitura e promover a educação na comunidade.

## :people_holding_hands: Papéis ou tipos de usuário da aplicação

administrador, usuario comum, usuário não logado e bibliotecario.

## :triangular_flag_on_post:	 Principais funcionalidades da aplicação

## **Principais Funcionalidades**

### **Funcionalidades Acessíveis a Todos os Usuários (Usuário Não Logado - Área Pública):**
- **Página Inicial:**  
  Exibe informações sobre a biblioteca digital, anuncios de eventos e destaques do acervo.  

- **Busca de Livros:**  
  Permite pesquisar livros por título, autor ou gênero.  

- **Cadastro de Usuário:**  
  Formulário para registro de novos usuários com nome, e-mail e senha.  

- **Login:**  
  Autenticação por e-mail e senha, gerando um token JWT para acesso à área restrita.  


### **Funcionalidades Restritas a Usuários Logados (Área Restrita):**

#### **Funcionalidades Comuns a Todos os Usuários Logados:**
- **Logout:**  
  Botão para encerrar a sessão disponível na barra de navegação.  

- **Visualização de Perfil:**  
  Exibe as informações pessoais e o histórico de atividades do usuário.

- **Alugar livro:**  
  Usuario pode alugar qualquer livro presente no acervo.

#### **Funcionalidades por Papel de Usuário:**

1. **Usuario Logado:**  
   - Visualizar detalhes dos livros disponíveis.  
   - Solicitar empréstimos de livros.  
   - Acompanhar empréstimos ativos e realizar devolução.  

2. **Biliotecario:**  
   - Visualizar detalhes dos livros disponíveis.  
   - Solicitar empréstimos de livros.  
   - Remover livros do catálogo. 

3. **Administrador:**  
   - Gerenciar o catálogo de livros (CRUD completo).  
   - Gerenciar usuários do sistema (CRUD completo).      

## :spiral_calendar: Entidades ou tabelas do sistema

   - Usuário.  
   - Livro.  
   - Rent(aluguel de livros).  


----

:warning::warning::warning: As informações a seguir devem ser enviadas juntamente com a versão final do projeto. :warning::warning::warning:


----

## :desktop_computer: Tecnologias e frameworks utilizados

**Frontend:**

Html5, css3 e Javascript.

**Backend:**

Strapi.


## :shipit: Operações implementadas para cada entidade da aplicação


| Entidade| Criação | Leitura | Atualização | Remoção |
| --- | --- | --- | --- | --- |
| User | X |  X  | X | X |
| Livros | X | X |  X | X |
| Rent | X |    |  | X |

> Lembre-se que é necessário implementar o CRUD de pelo menos duas entidades.

## :neckbeard: Rotas da API REST utilizadas

| Método HTTP | URL |
| --- | --- |
| GET | api/user/|
| POST | api/livros |
