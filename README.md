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

administrador, estudante, porfessor, usuário não logado.

> Tenha em mente que obrigatoriamente a aplicação deve possuir funcionalidades acessíveis a todos os tipos de usuário e outra funcionalidades restritas a certos tipos de usuários.

## :triangular_flag_on_post:	 Principais funcionalidades da aplicação

## **Principais Funcionalidades**

### **Funcionalidades Acessíveis a Todos os Usuários (Usuário Não Logado - Área Pública):**
- **Página Inicial:**  
  Exibe informações sobre a biblioteca digital, objetivo do sistema e destaques do acervo.  

- **Busca de Livros:**  
  Permite pesquisar livros por título, autor ou gênero.  

- **Cadastro de Usuário:**  
  Formulário para registro de novos usuários com nome, e-mail e senha.  

- **Login:**  
  Autenticação por e-mail e senha, gerando um token JWT para acesso à área restrita.  


### **Funcionalidades Restritas a Usuários Logados (Área Restrita):**

#### **Funcionalidades Comuns a Todos os Usuários Logados (Estudante e Professor):**
- **Logout:**  
  Botão para encerrar a sessão disponível na barra de navegação.  

- **Visualização de Perfil:**  
  Exibe as informações pessoais e o histórico de atividades do usuário.  

#### **Funcionalidades por Papel de Usuário:**

1. **Estudante:**  
   - Visualizar detalhes dos livros disponíveis.  
   - Solicitar empréstimos de livros.  
   - Acompanhar status de empréstimos ativos e histórico de devoluções.  

2. **Professor:**  
   - Visualizar detalhes dos livros disponíveis.  
   - Solicitar empréstimos de livros.  
   - Reservar livros para uso em atividades acadêmicas.  
   - Acompanhar status de empréstimos e reservas.  

3. **Administrador:**  
   - Gerenciar o catálogo de livros (CRUD completo).  
   - Gerenciar usuários do sistema (CRUD completo).  
   - Atribuir papéis e permissões aos usuários.    

## :spiral_calendar: Entidades ou tabelas do sistema

   - Usuário.  
   - Livro.  
   - Empréstimo.  


----

:warning::warning::warning: As informações a seguir devem ser enviadas juntamente com a versão final do projeto. :warning::warning::warning:


----

## :desktop_computer: Tecnologias e frameworks utilizados

**Frontend:**

Lista as tecnologias, frameworks e bibliotecas utilizados.

**Backend:**

Lista as tecnologias, frameworks e bibliotecas utilizados.


## :shipit: Operações implementadas para cada entidade da aplicação


| Entidade| Criação | Leitura | Atualização | Remoção |
| --- | --- | --- | --- | --- |
| Entidade 1 | X |  X  |  | X |
| Entidade 2 | X |    |  X | X |
| Entidade 3 | X |    |  |  |

> Lembre-se que é necessário implementar o CRUD de pelo menos duas entidades.

## :neckbeard: Rotas da API REST utilizadas

| Método HTTP | URL |
| --- | --- |
| GET | api/entidade1/|
| POST | api/entidade2 |
