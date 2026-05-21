const ESCALATION_CONFLUENCE_URL = "https://autopass.atlassian.net/wiki/spaces/ENOC/pages/2275737626/Escalation+TI";

const ESCALATION_ITEMS = [
    {
        tipo: "fornecedor",
        titulo: "ILEGRA",
        tags: ["plantão", "banco", "cloud", "infra", "oracle", "sql server", "postgresql"],
        resumo: "Acionamento para incidentes fora do horário comercial, banco de dados, Cloud/Infra e plantão técnico.",
        fluxo: [
            "Validar se o chamado foi classificado como incidente.",
            "Fora do horário comercial, seguir a ordem de plantão publicada no Confluence.",
            "Usar ramal por tecnologia quando aplicável: SQL Server, Oracle ou Cloud/Infra.",
            "Se não houver contato ou houver necessidade gerencial, seguir gestores conforme página oficial."
        ]
    },
    {
        tipo: "interno",
        titulo: "Infra N2",
        tags: ["infra", "n2", "rede", "cloud", "produção"],
        resumo: "Fluxo de acionamento para incidentes de infraestrutura em horário comercial.",
        fluxo: [
            "Validar impacto e evidências antes do acionamento.",
            "Acionar contatos de Infra N2 conforme escala publicada.",
            "Se houver indisponibilidade crítica, informar Tech Lead e coordenação."
        ]
    },
    {
        tipo: "interno",
        titulo: "Sistemas N2",
        tags: ["orbi", "legado", "apps", "top", "garagens", "clearing", "firmware", "atendimento"],
        resumo: "Direcionamento por sistema ou área para sustentação N2.",
        fluxo: [
            "Identificar sistema afetado: ORBI, Legado, App, Garagens, Clearing, Firmware ou Atendimento.",
            "Acionar primeiro contato por sistema conforme matriz oficial.",
            "Evoluir para segundo e terceiro contato caso não haja retorno."
        ]
    },
    {
        tipo: "fornecedor",
        titulo: "WITTEL",
        tags: ["whatsapp", "contact center", "rede de vendas digitais", "portal", "fornecedor"],
        resumo: "Fornecedor relacionado a rede de vendas digitais, WhatsApp e atendimento 24x7.",
        fluxo: [
            "Abrir chamado no portal conforme procedimento do Confluence.",
            "Formalizar também por e-mail e contato telefônico quando indicado.",
            "Evoluir para coordenação e gerência conforme ordem de acionamento oficial."
        ]
    },
    {
        tipo: "fornecedor",
        titulo: "MUTANT",
        tags: ["chatbot", "whatsapp", "bot", "api meta", "mensagens", "interaxa"],
        resumo: "Acionamento para falhas relacionadas ao chatbot, troca de mensagens, API Meta e respostas ao cliente.",
        fluxo: [
            "Validar se o problema está no chatbot, API Meta ou troca de mensagens.",
            "Abrir chamado no portal/Jira indicado na página oficial.",
            "Acionar suporte e evoluir para gestão conforme criticidade."
        ]
    },
    {
        tipo: "fornecedor",
        titulo: "PEFISA",
        tags: ["parcerias", "sustentação", "financeiro", "recarga"],
        resumo: "Escalation para sustentação de parcerias e alguns fluxos financeiros.",
        fluxo: [
            "Confirmar impacto e produto afetado.",
            "Para saldos de produtos, validar limites no Grafana antes de acionar.",
            "Seguir contatos de plantão e sustentação conforme Confluence."
        ]
    },
    {
        tipo: "fornecedor",
        titulo: "PRODATA",
        tags: ["prodata", "atm", "suporte"],
        resumo: "Acionamento de suporte Prodata conforme disponibilidade e contatos oficiais.",
        fluxo: [
            "Validar se o incidente está relacionado a serviço/integração Prodata.",
            "Registrar evidências e horário de início.",
            "Acionar suporte conforme contatos do Confluence."
        ]
    },
    {
        tipo: "fornecedor",
        titulo: "VONEX / PORTGO",
        tags: ["vonex", "portgo", "0800", "suporte técnico"],
        resumo: "Acionamento de atendimento e suporte técnico 24x7.",
        fluxo: [
            "Confirmar serviço afetado e abrangência.",
            "Acionar atendimento ou suporte técnico conforme matriz oficial.",
            "Evoluir para gerência pós-venda se necessário."
        ]
    },
    {
        tipo: "fornecedor",
        titulo: "CIELO / BRASPAG",
        tags: ["cielo", "braspag", "pagamento", "incidentes"],
        resumo: "Escalation para incidentes envolvendo Cielo/Braspag e fluxo de pagamentos.",
        fluxo: [
            "Validar evidências do fluxo de pagamento.",
            "Acionar plantão de gestão de incidentes conforme Confluence.",
            "Evoluir para gerentes e gerente executivo conforme criticidade."
        ]
    },
    {
        tipo: "fornecedor",
        titulo: "QIWI / POS",
        tags: ["qiwi", "pos", "terminal", "supervisor"],
        resumo: "Acionamento para incidentes envolvendo POS e suporte Qiwi.",
        fluxo: [
            "Confirmar localidade, terminal ou produto impactado.",
            "Acionar suporte inicial.",
            "Seguir escalation para supervisão/diretoria quando aplicável."
        ]
    },
    {
        tipo: "fornecedor",
        titulo: "PAKMAN",
        tags: ["pakman", "venda whatsapp", "bobina", "pos"],
        resumo: "Acionamento para venda WhatsApp, bobina e fluxos relacionados.",
        fluxo: [
            "Validar tipo de falha e evidências.",
            "Seguir primeiro e segundo escalation conforme fonte oficial.",
            "Registrar retorno no carimbo e diário de bordo."
        ]
    },
    {
        tipo: "praca",
        titulo: "Praças e Operação Externa",
        tags: ["barretos", "votorantim", "bertioga", "guarujá", "itapecerica", "araras", "livramento", "belém", "embu"],
        resumo: "Contatos por localidade e janela operacional de atendimento.",
        fluxo: [
            "Identificar praça/localidade impactada.",
            "Validar horário operacional antes do acionamento.",
            "Consultar contato atualizado da localidade no Confluence."
        ]
    }
];
