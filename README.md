# Central NOC Autopass

Aplicação web estática para apoiar a rotina operacional do NOC Autopass, centralizando a geração rápida de comunicados, carimbos de incidentes e diário de bordo.

## Funcionalidades

- Gerador de carimbo para incidentes críticos.
- Cópia rápida do carimbo com formatação para envio em grupos.
- Abertura direta de compartilhamento via WhatsApp.
- Abertura direta de compartilhamento via Microsoft Teams.
- Diário de bordo para registro de reuniões, war rooms e tratativas de incidentes.
- Geração de arquivo Word a partir de um modelo de diário de bordo.
- Modo claro e modo escuro com preferência salva no navegador.

## Estrutura do projeto

```txt
index.html
styles.css
app.js
diario-template.js
Arquivos
index.html: estrutura da aplicação e campos do formulário.
styles.css: estilos visuais, responsividade e dark mode.
app.js: regras de negócio, geração dos textos, alternância de abas e geração do Word.
diario-template.js: modelo base usado para gerar o arquivo Word do diário de bordo.
Como executar localmente
Abra o projeto com uma extensão como Live Server ou sirva a pasta com qualquer servidor estático.

Exemplo:

npx serve .
Depois acesse o endereço local informado no terminal.

Deploy
O projeto pode ser publicado como site estático na Vercel.

Configuração sugerida:

Framework Preset: Other
Build Command: deixar vazio
Output Directory: deixar vazio
Root Directory: raiz do repositório
Observações
Para a geração do diário de bordo funcionar corretamente, os arquivos index.html, styles.css, app.js e diario-template.js devem permanecer no mesmo diretório.
