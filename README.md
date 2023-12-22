# **Projeto Pokemon Deck Builder**

Este é um projeto Angular que permite aos jogadores criar e gerenciar seus baralhos do jogo Pokemon Trading Card Game (TCG). A aplicação consome a [API oficial do Pokemon TCG](https://docs.pokemontcg.io/#api_v1cards_list) para listar cartas e oferecer recursos de criação, edição e visualização de baralhos. Este README fornecerá informações sobre como configurar, executar e contribuir para o projeto.

Componentes e estilos visuais utilizando  [Tailwind](https://tailwindcss.com/) e [Infragistics](https://www.infragistics.com/products/ignite-ui-angular/angular/components/general/getting-started).

Testes automatizados dos services utilizando [Jasmine](https://jasmine.github.io/).

## **Requisitos**

Certifique-se de que você tenha as seguintes ferramentas instaladas em seu sistema:

- [Node.js](https://nodejs.org/) (v14.x ou superior)
- [Angular CLI](https://angular.io/cli)  (v8.x ou superior)

## **Configuração do Projeto**

Siga estas etapas para configurar o projeto em seu ambiente de desenvolvimento:

1. Clone o repositório do GitHub:

```bash
git clone https://github.com/rogerio-ushiro/mazzachall.git

```

1. Navegue até o diretório do projeto:

```bash
cd mazzachall

```

1. Instale as dependências do projeto:

```bash
npm install

```

## **Executando a Aplicação**

Após a configuração, você pode executar a aplicação localmente com o seguinte comando:

```bash
ng serve

```

Acesse a aplicação em seu navegador em http://localhost:4200/.

## **Funcionalidades Principais**

### **Lista de Baralhos**

- O usuário pode ver a lista de seus baralhos.
- O usuário pode criar um novo baralho.
- O usuário pode remover um baralho.
- O usuário pode editar um baralho.
- O usuário pode clicar em um baralho para visualizar seus detalhes.

### **Criação de um Baralho**

- O usuário pode dar um nome ao seu baralho.
- O usuário pode inserir cartas no baralho.
- O baralho deve ter no mínimo 24 cartas e no máximo 60.
- Só podem haver 4 cartas com o mesmo nome no baralho (nome não id).
- Após salvar o baralho, o usuário volta para a página de lista de baralhos, que é atualizada.
- O baralho é salvo apenas em memória.

### **Detalhes do Baralho**

- O usuário consegue ver quantos Pokémons e cartas de treinador existem no baralho (atributo supertype).
- O usuário consegue ver quantas cores diferentes existem no baralho.
- O usuário consegue ver quantos tipos de cartas únicas existem no baralho.