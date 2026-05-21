Central NOC Autopass

Aplicação web estática desenvolvida para apoiar a rotina operacional do NOC Autopass, centralizando geração de comunicados, diário de bordo e fluxos rápidos de escalation operacional.

Visão Geral

A Central NOC Autopass foi criada para reduzir o tempo operacional durante incidentes, war rooms e acionamentos críticos, fornecendo uma interface rápida, padronizada e acessível para operadores.

A aplicação funciona totalmente no navegador, sem necessidade de backend.

Funcionalidades
Gerador de Carimbo
Geração rápida de comunicados operacionais.
Padronização de mensagens para incidentes.
Cópia automática para compartilhamento.
Compartilhamento direto via WhatsApp e Microsoft Teams.
Diário de Bordo
Registro estruturado de incidentes e reuniões.
Exportação automática para arquivo Word.
Modelo padronizado para documentação operacional.
Escalation TI (Nova funcionalidade)

Nova aba dedicada à consulta rápida de acionamentos operacionais.

Recursos disponíveis:
Busca por área, sistema ou fornecedor.
Filtro por categoria:
Times internos
Fornecedores
Praças
Cards com orientação operacional.
Fluxo resumido de acionamento.
Botão para copiar orientações.
Abertura rápida da página oficial no Confluence.
Base inicial carregada a partir de PDF exportado em 21/05/2026.
Segurança e Boas Práticas

Por segurança operacional:

Telefones
E-mails
Credenciais
Dados sensíveis

não foram embarcados no JavaScript da aplicação.

A interface apenas orienta o operador e direciona para validação oficial no Confluence corporativo.

Isso evita exposição indevida caso o repositório ou deploy público sejam acessados externamente.

Preview da Interface
Aba Escalation TI
Tecnologias Utilizadas
HTML5
CSS3
JavaScript Vanilla
DOCX Template Generation
Vercel (deploy estático)
Estrutura do Projeto
index.html
styles.css
app.js
diario-template.js
Arquivos
Arquivo	Descrição
index.html	Estrutura principal da aplicação
styles.css	Layout, responsividade e dark mode
app.js	Regras de negócio e funcionalidades
diario-template.js	Template do diário de bordo
Como Executar Localmente

Clone o repositório:

git clone https://github.com/fabriciodool/central-noc-autopass.git

Acesse a pasta:

cd central-noc-autopass

Execute com qualquer servidor estático.

Exemplo usando serve:

npx serve .

Depois acesse o endereço exibido no terminal.

Deploy

O projeto pode ser publicado facilmente na Vercel.

Configuração sugerida
Configuração	Valor
Framework Preset	Other
Build Command	vazio
Output Directory	vazio
Root Directory	raiz do projeto
Validações Realizadas
Aba Escalation TI carregando corretamente.
Busca funcionando.
Filtros renderizando corretamente.
Sem erros no console.
Compatível com Live Server.
Dark mode persistindo corretamente.
Objetivo do Projeto

Centralizar ferramentas operacionais do NOC em uma interface simples, rápida e segura, reduzindo tempo de resposta em incidentes e padronizando processos operacionais.

Roadmap Futuro
Exportação PDF
Histórico local de incidentes
Integração com APIs internas
Favoritos de acionamento
Busca avançada
Modo offline
Templates dinâmicos
Licença

Projeto de uso interno e operacional.
