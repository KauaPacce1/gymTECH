# AGENTS.md

## Visão geral
gymTECH é um site para praticantes de musculação. O usuário registra treinos (dias frequentados, exercícios, séries por exercício) e acompanha dois dashboards:
frequência mensal e volume semanal (séries por grupo muscular, comparado à faixarecomendada). Também há uma área informativa com detalhes sobre exercícios.

## Tecnologias
Back-end: Node.js.
Banco: MySQL Server.
Front-end: HTML, CSS externo e JavaScript.
Gráficos: Chart.js.

## Comandos
Instalar: `npm i`. Rodar: `npm start`.
commit:
git pull 
git add .
git commit -m ""
git push
Credenciais em `.env` e `.env.dev`.

## Arquitetura
O front-end fica em `public/` e o servidor em `src/`, dividido em três camadas, cada uma com um papel só. `routes` define o endereço de cada pedido, `controllers` trata o pedido e devolve a resposta, e `models` conversa com o MySQL. As tabelas são criadas em `src/database/script-tabelas.sql`.
Fluxo de uma requisição:
página (`fetch`) → `routes` (encaminha) → `controllers` (valida e responde) → `models` (executa o SQL) → MySQL

## Padrões de desenvolvimento
Usar `var` para declarar variáveis, seguindo o padrão do web-data-viz. Exceção: no código dos gráficos com Chart.js, usar `const`. Nunca usar `let`.
Nomes de variáveis, funções, tabelas e colunas em inglês e em camelCase (ex.: `weeklyVolume`, `muscleGroup`). Textos exibidos ao usuário, como títulos, botões, mensagens e conteúdo informativo, em português.
Nomes de arquivos seguem o padrão dos arquivos existentes em cada pasta.
Commits curtos, no imperativo e em inglês (ex.: "add workout route").

## Cuidados e restrições
Perguntar antes de adicionar ou modificar dependências e implementações.
Não editar `node_modules/`. Nunca ler, editar ou commitar credenciais reais em `.env*`.
Controllers e rotas não acessam o banco; SQL só nos `models`.
Validar cada mudança manualmente: subir com `npm run dev`, abrir a página afetada e checar erros no console do navegador e no terminal antes de dar a tarefa como concluída.

## Regra geral: 
Antes de implementar uma alteração, siga as tecnologias, arquitetura, convenções e restrições descritas neste documento. Caso alguma informação esteja ausente, analise o código existente e siga os padrões já adotados no projeto.
