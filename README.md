# REST API com NodeJS, ExpressJS, TypeORM e MySQL

A função dessa API basicamente é realizar operações simples de `CRUD` (Create, Read, Update e Delete) dentro de um banco de dados MySQL a partir de dados fornecidos na request do client.

## Operações da API

A API em questão foi desenvolvida para uma `aplicação simples de Agenda Telefônica`, portanto, o modelo base de objeto possui as seguintes propriedades:

```js
   {
      id: number,
      nome: string,
      tel_prin: string,
      tel_sec: string,
      descricao: string,
      url_foto: string,
      favorito: boolean,
   }
```

Esse objeto representa um contato dentro agenda telefônica, que por sua vez, pode possuir nenhum ou muitos contatos no banco de dados.

A API possui uma única rota pois realiza o CRUD apenas em uma tabela que é a de contatos, e como roda no localhost na porta 3000, o caminho base para acessar todos os endpoints dessa aplicação é: `http://localhost:3000/contacts`

### Create

Requisições para criar um novo contato devem utilizar o método `POST` tendo como base o caminho citado acima concatenando com o end point *`/create`*, resultando em: `http://localhost:3000/contacts/create`

- Os dados devem ser fornecidos através de um objeto seguindo o modelo acima, entretanto, o único valor que `NÃO` deve ser fornecido é o ID, pois na criação do contato ele já é atribuído automaticamente.

- Toda request de criação de contato deve OBRIGATORIAMENTE fornecer ao menos o `NOME e o TELEFONE PRINCIPAL`, do contrário é retornado um erro 400 avisando sobre a ausência de dados ou dados inválidos. Caso o resto não seja fornecido, a API atribui um valor padrão para cada propriedade com exceção do telefone secundário.

- Se qualquer propriedade estourar o limite ou o tipo do campo correspondente na tabela, é retornado um erro 400.

- Como `resposta`, a API retorna o contato criado com todas as suas propriedades.

<hr>

### Read

Requisições apenas para leitura devem utilizar o método `GET` no caminho base `http://localhost:3000/contacts/`

- Como `resposta`, a API retorna uma array contendo todos os contatos registrados no banco de dados em forma de objetos, seguindo o modelo citado anteriormente.

<hr>

### Update

Requisições para atualizar algum contato devem utilizar o método `PUT`, usando o caminho base concatenando com o end point *`/update/id`*, resultando em: `http://localhost:3000/contacts/update/1` por exemplo.

- O `ID` na URL é um parâmetro que deve ser correspondente ao contato que deseja-se atualizar. Caso o ID fornecido `NÃO` exista dentro do banco de dados, ele retorna um erro 400 avisando que os dados são inválidos.

- Se qualquer propriedade estourar o limite ou o tipo do campo correspondente na tabela, é retornado um erro 400.

- Os dados fornecidos para atualização devem seguir o mesmo padrão do create, a diferença é que no update não é obrigatório fornecer algum dado. Caso o dado fornecido seja nulo, aquela propriedade `mantem o valor que já possuia anteriormente`.

- Como `resposta`, a API retorna o objeto desse contato atualizado com todas as suas propriedades já alteradas.

<hr>

### Delete

Requisições para deletar algum contato devem utilizar o método `DELETE`, usando o caminho base concatenando com o end point *`/delete/id`*, resultando em: `http://localhost:3000/contacts/delete/1` por exemplo.

- O `ID` na URL é um parâmetro que deve ser correspondente ao contato que deseja-se deletar.

- Como `resposta`, a API retorna `TRUE` se conseguiu achar o contato e deleta-lo, ou `FALSE` se não conseguiu.

## Screenshots

OBS: Esses números de telefone são totalmente fictícios com o intuito apenas de demonstrar o visual da aplicação, qualquer semelhança com a realidade é meramente coincidência.

<div align="center">
  <img src="./Front-end/src/assets/screenshots/desktop.jpeg" alt="desktop screenshot"\>
  <img src="./Front-end/src/assets/screenshots/mobile.jpeg" alt="mobile screenshot" style="width: 375px"\>
</div>

## Principais Ferramentas Utilizadas

![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Nodemon](https://img.shields.io/badge/NODEMON-%23323330.svg?style=for-the-badge&logo=nodemon&logoColor=%BBDEAD)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![MySQL](https://img.shields.io/badge/mysql-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![VSCode](https://img.shields.io/badge/-VSCODE-007ACC?style=for-the-badge&&logo=visual-studio-code&logoColor=white)
![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)

- [TypeScript](https://www.typescriptlang.org/) - JavaScript com tipagem estática
- [NodeJS](https://nodejs.org/en) - Aplicações de JS fora do navegador
- [Express](https://expressjs.com/pt-br/) - Framework do Node para servidores WEB
- [Nodemon](https://nodemon.io/) - Reiniciar o servidor automaticamente
- [TypeORM](https://typeorm.io/) - Ferramenta de Mapeamento de Objeto Relacional para JS
- [MySQL](https://fonts.google.com/) - Banco de Dados
- [Vite](https://vitejs.dev/) - Ferramenta front-end para aplicações mais otimizadas
- [React](https://react.dev/) - Biblioteca JS
- [TailwindCSS](https://tailwindcss.com/) - Framework CSS
- [Axios](https://axios-http.com/ptbr/) - Client HTTP para fazer requisições ao servidor
- [React Icons](https://react-icons.github.io/react-icons) - Biblioteca de ícones
- [Google Fonts](https://fonts.google.com/) - Biblioteca de fontes
