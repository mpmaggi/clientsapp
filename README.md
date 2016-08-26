# Clients app
Inicialmente, a ideia era de fazer todo o projeto na linguagem que estou mais confortável hoje, que seria o .NET, porém, na tentativa de mostrar interesse na vaga e estar alinhado com as tecnologias utilizadas pela empresa, optei pelo MEAN Stack, ao qual tive que dedicar certo estudo e aprendizado para entregar a solução proposta.

Estou ciente de que existe uma melhor abordagem na estrutura do projeto, mas optei por uma estrutura simples e que eu seria capaz de explicar apesar do pouco tempo de estudo da tecnologia utilizada.


##Instruções
1.	Download e Instalação NodeJS.

> https://nodejs.org 

2.	Download e Instalação MongoDB.

> https://www.mongodb.com/

3.	Download aplicação e extração em um diretório local.

>https://github.com/mpmaggi/clientsapp/archive/master.zip

4.	Instalar dependências.

>No bash, executar "npm install" no diretório local onde a aplicação foi extraída para instalar as dependências do projeto.

5.	Iniciar server

>Após ter as dependências instaladas, executar node server para iniciar o servidor HTTP. A porta utilizada é a 3000.

6.	Abrir o Browser.

>http://localhost:3000


## API
***GET* /clients**
>**Parâmetro(s):** nenhum

>**Ação:** Retorna um array de clients existentes na base.


***GET* /clients/CPF**
>**Parâmetro(s):** cpf

>**Ação:** Retorna um único client com o cpf recebido no parâmetro, caso ele exista.


***POST* /clients**
>**Parâmetro(s):** client

>**Ação:** Insere o client recebido no parâmetro, na base, verificando se o mesmo já existe ou não.


***PUT* /clients/cpf**
>**Parâmetro(s):** cpf, client

>**Ação:** Atualiza o registro do client que tenha o cpf recebido no parâmetro, com as informações do client recebido.


***DELETE* /clients/cpf**
>**Parâmetro(s):** cpf, client

>**Ação:** Remove o registro do client que tenha o cpf recebido no parâmetro, caso ele exista.

## Testes
Foram realizados testes da API testando os possíveis códigos de retorno HTTP que foram tratados.
Não foram utilizados mocks/stubs, embora seria a maneira mais correta de ser feitos os testes.

![Testes realizados](/screenshots/test.png?raw=true "Testes realizados")

Libs utilizadas: Mocha, Chai e Request
> Comandos para executar:
> * npm test

> ou

> * ./node_modules/.bin/mocha --reporter spec

## Principais arquivos
### /

* server.js
> Principal contendo a inicialização do Express, utilização das rotas configuradas e inicialização do HTTP server.

* routes.js
> Rotas configuradas no Express para correto endereçamento no HTTP.

* mongo_client.js
> Encapsulamento dos objetos do MongoDB que foram utilizados

* clients.js
> Retorno das transações HTTP referentes à entidade Client.

### /test
* server.js
> Arquivo com os testes da API

### /public

* index.html
> Única visão, para exibir as operações relacionadas à entidade Client.

### /public/controllers

* controller.js
> Controller do AngularJS para tratar os dados exibidos/cadastrados na tela e interagir com as requisições HTTP.



## Screenshots
![Listagem](/screenshots/img1.png?raw=true "Listagem")
Tela com a listagem dos registros cadastrados.



![Cadastro](/screenshots/img3.png?raw=true "Cadastro")
Tela de cadastro de registro. Acionada pelo botão "+" na toolbar.



![Edição](/screenshots/img2.png?raw=true "Edição")
Tela de edição de registro. Acionada pelo botão Edit ou ao acessar o botão "+" porém digitando um CPF já existente.

### Pacotes utilizados além do MEAN Stack
* Angular Material Design
* Angular Material Data Table
* Mocha
* Chai
* Request

###Versões utilizadas
**MongoDB:** 3.2.9

**Express:** 4.14.0

**AngularJS:** 1.5.8

**NodeJS:** 4.5.0
