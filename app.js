const STORAGE_KEYS = {
    theme: "assistente-noc-theme"
};

const THEME = {
    light: "light",
    dark: "dark"
};

const state = {
    activeTab: "carimbo"
};

document.addEventListener("DOMContentLoaded", inicializarAplicacao);

function inicializarAplicacao() {
    preencherDatasIniciais();
    configurarAbas();
    configurarAcoes();
    configurarTema();
}

function preencherDatasIniciais() {
    const dataHoraAtual = obterDataHoraAtual();
    getEl("txtInicio").value = dataHoraAtual;
    getEl("txtDiarioDataHora").value = dataHoraAtual;
}

function configurarAbas() {
    document.querySelectorAll("[data-tab-target]").forEach(function(botao) {
        botao.addEventListener("click", function() {
            switchTab(botao.dataset.tabTarget);
        });
    });
}

function configurarAcoes() {
    document.querySelectorAll("[data-action]").forEach(function(botao) {
        botao.addEventListener("click", function() {
            executarAcao(botao.dataset.action);
        });
    });
}

function configurarTema() {
    const temaSalvo = localStorage.getItem(STORAGE_KEYS.theme);
    const temaInicial = temaSalvo || THEME.light;
    const alternador = getEl("themeToggle");

    aplicarTema(temaInicial);
    alternador.checked = temaInicial === THEME.dark;

    alternador.addEventListener("change", function() {
        const novoTema = alternador.checked ? THEME.dark : THEME.light;
        aplicarTema(novoTema);
        localStorage.setItem(STORAGE_KEYS.theme, novoTema);
    });
}

function aplicarTema(tema) {
    document.documentElement.dataset.theme = tema === THEME.dark ? THEME.dark : THEME.light;
}

function obterDataHoraAtual() {
    const agora = new Date();
    return agora.toLocaleDateString("pt-BR") + " " +
        String(agora.getHours()).padStart(2, "0") + ":" +
        String(agora.getMinutes()).padStart(2, "0");
}

function switchTab(tab) {
    state.activeTab = tab;

    getEl("btnTabCarimbo").classList.toggle("active", tab === "carimbo");
    getEl("btnTabDiario").classList.toggle("active", tab === "diario");
    getEl("tab-carimbo").classList.toggle("active", tab === "carimbo");
    getEl("tab-diario").classList.toggle("active", tab === "diario");
    getEl("carimboButtons").classList.toggle("hidden", tab !== "carimbo");
    getEl("diarioButtons").classList.toggle("hidden", tab !== "diario");
    getEl("outputContainer").classList.remove("active");
}

function executarAcao(acao) {
    const acoes = {
        "carimbo-copiar": function() { executarAcaoCarimbo("copiar"); },
        "carimbo-whatsapp": function() { executarAcaoCarimbo("whatsapp"); },
        "carimbo-teams": function() { executarAcaoCarimbo("teams"); },
        "diario-copiar": function() { executarAcaoDiario("copiar"); },
        "diario-word": function() { executarAcaoDiario("word"); },
        "diario-preview": function() { executarAcaoDiario("preview"); }
    };

    if (acoes[acao]) {
        acoes[acao]();
    }
}

function valorCampo(id, fallback = "---") {
    const valor = getEl(id).value.trim();
    return valor || fallback;
}

function linhasCampo(id) {
    return getEl(id).value
        .split(/\r?\n/)
        .map(function(linha) { return linha.trim(); })
        .filter(Boolean);
}

function construirTextoCarimbo(comFormatacao) {
    const chamado = valorCampo("txtChamado");
    const problema = valorCampo("txtProblema");
    const inicio = valorCampo("txtInicio");
    const fim = valorCampo("txtFim");
    const impacto = valorCampo("txtImpacto");
    const causa = valorCampo("txtCausa");
    const status = getEl("cmbStatus").value;
    const atualizacao = getEl("txtAtualizacao").value.trim();
    const b = comFormatacao ? "*" : "";

    let carimbo = `${b}Chamado:${b} ${chamado}\n` +
        `${b}Problema:${b} ${problema}\n` +
        `${b}Início:${b} ${inicio}\n` +
        `${b}Fim:${b} ${fim}\n` +
        `${b}Impacto / Sintoma:${b} ${impacto}\n` +
        `${b}Causa:${b} ${causa}\n` +
        `${b}Status:${b} ${status}`;

    if (atualizacao !== "") {
        carimbo += ` (${atualizacao})`;
    }

    return carimbo;
}

function construirDadosDiario() {
    return {
        dataHora: valorCampo("txtDiarioDataHora"),
        tema: valorCampo("txtDiarioTema"),
        participantes: valorCampo("txtDiarioParticipantes"),
        coordenacao: valorCampo("txtDiarioCoordenacao"),
        resumo: valorCampo("txtDiarioResumo"),
        statusFinal: valorCampo("txtDiarioStatusFinal"),
        acoes: linhasCampo("txtDiarioAcoes"),
        pendencias: linhasCampo("txtDiarioPendencias")
    };
}

function construirTextoDiario(comFormatacao) {
    const dados = construirDadosDiario();
    const b = comFormatacao ? "*" : "";
    const acoes = formatarListaTexto(dados.acoes);
    const pendencias = formatarListaTexto(dados.pendencias);

    return `${b}Diário de Bordo - Incidente${b}\n\n` +
        `${b}Cabeçalho${b}\n` +
        `${b}Data e Hora:${b} ${dados.dataHora}\n` +
        `${b}Tema / Problema:${b} ${dados.tema}\n` +
        `${b}Participantes:${b} ${dados.participantes}\n` +
        `${b}Coordenação da Reunião:${b} ${dados.coordenacao}\n` +
        `${b}Resumo Inicial:${b} ${dados.resumo}\n\n` +
        `${b}Status Final:${b} ${dados.statusFinal}\n\n` +
        `${b}Ações Realizadas:${b}\n${acoes}\n\n` +
        `${b}Pendências / Próximos Passos:${b}\n${pendencias}`;
}

function formatarListaTexto(itens) {
    const lista = itens.length ? itens : ["---"];
    return lista.map(function(item) { return `- ${item}`; }).join("\n");
}

function executarAcaoCarimbo(tipo) {
    const textoComNegrito = construirTextoCarimbo(true);
    const textoSemNegrito = construirTextoCarimbo(false);

    if (tipo === "copiar") {
        copiarTexto(textoComNegrito);
        mostrarResultado("Carimbo copiado para a área de transferência (com negritos)!", textoSemNegrito);
        return;
    }

    if (tipo === "whatsapp") {
        abrirUrl(`https://api.whatsapp.com/send?text=${encodeURIComponent(textoComNegrito)}`);
        return;
    }

    if (tipo === "teams") {
        abrirUrl(`https://teams.microsoft.com/l/share?msgText=${encodeURIComponent(textoComNegrito)}`);
        mostrarResultado("Direcionando para o Teams. Escolha o grupo na lista.", textoSemNegrito);
    }
}

function executarAcaoDiario(tipo) {
    const textoComNegrito = construirTextoDiario(true);
    const textoSemNegrito = construirTextoDiario(false);

    if (tipo === "copiar") {
        copiarTexto(textoComNegrito);
        mostrarResultado("Diário de bordo copiado para a área de transferência.", textoSemNegrito);
        return;
    }

    if (tipo === "preview") {
        mostrarResultado("Pré-visualização do diário de bordo.", textoSemNegrito);
        return;
    }

    if (tipo === "word") {
        gerarArquivoWord();
        mostrarResultado("Arquivo Word gerado para download.", textoSemNegrito);
    }
}

function copiarTexto(texto) {
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(texto);
        return;
    }

    const areaTemporaria = document.createElement("textarea");
    areaTemporaria.value = texto;
    document.body.appendChild(areaTemporaria);
    areaTemporaria.select();
    document.execCommand("copy");
    document.body.removeChild(areaTemporaria);
}

function mostrarResultado(mensagem, texto) {
    getEl("txtResultado").innerText = texto;
    getEl("lblSucesso").innerText = mensagem;
    getEl("outputContainer").classList.add("active");
}

function abrirUrl(url) {
    window.open(url, "_blank");
}

function gerarArquivoWord() {
    const dados = construirDadosDiario();
    const nomeArquivo = montarNomeArquivo(dados.tema);
    const documentXml = criarDocumentXml(dados);
    const arquivos = DIARIO_DOCX_TEMPLATE_ENTRIES
        .filter(function(arquivo) { return arquivo.name !== "word/document.xml"; })
        .map(function(arquivo) {
            return {
                name: arquivo.name,
                bytes: base64ParaUint8Array(arquivo.base64)
            };
        });

    arquivos.push({ name: "word/document.xml", content: documentXml });

    const blob = new Blob([criarZipSemCompressao(arquivos)], {
        type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = nomeArquivo;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

function montarNomeArquivo(tema) {
    const sufixo = tema
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-zA-Z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "")
        .slice(0, 60) || "Incidente";

    return `Diario-de-Bordo-${sufixo}.docx`;
}

function criarDocumentXml(dados) {
    const partes = [];
    partes.push(paragrafoTituloModelo(dados.tema));
    partes.push(paragrafoCabecalhoModelo(dados));
    partes.push(paragrafoStatusModelo(dados.statusFinal));
    partes.push(paragrafoLinhaModelo("1C2E3EB1"));
    partes.push(paragrafoSecaoModelo("Ações Realizadas:"));
    partes.push(...listaAcoesModelo(dados.acoes));
    partes.push(paragrafoEspacoModelo());
    partes.push(paragrafoSecaoModelo("Pendências / Próximos Passos:"));
    partes.push(...listaPendenciasModelo(dados.pendencias));
    partes.push(paragrafoLinhaModelo("522B78FF"));

    return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:document xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main" xmlns:w14="http://schemas.microsoft.com/office/word/2010/wordml" mc:Ignorable="w14">
  <w:body>
    ${partes.join("\n")}
    <w:sectPr>
      <w:pgSz w:w="11906" w:h="16838"/>
      <w:pgMar w:top="1417" w:right="1701" w:bottom="1417" w:left="1701" w:header="708" w:footer="708" w:gutter="0"/>
      <w:cols w:space="708"/>
      <w:docGrid w:linePitch="360"/>
    </w:sectPr>
  </w:body>
</w:document>`;
}

function extrairIncidenteDoTema(tema) {
    return tema.replace(/\s*[-–]\s*Chamado.*$/i, "").trim() || "Incidente";
}

function paragrafoTituloModelo(tema) {
    return `<w:p w14:paraId="68CDB74F" w14:textId="34B873DE">
  <w:pPr><w:jc w:val="center"/><w:rPr><w:b/><w:bCs/><w:sz w:val="40"/><w:szCs w:val="40"/></w:rPr></w:pPr>
  <w:r><w:rPr><w:b/><w:bCs/><w:sz w:val="40"/><w:szCs w:val="40"/></w:rPr><w:t xml:space="preserve">Diário de Bordo – </w:t></w:r>
  <w:r><w:rPr><w:b/><w:bCs/><w:sz w:val="40"/><w:szCs w:val="40"/></w:rPr><w:t>${xmlEscape(extrairIncidenteDoTema(tema))}</w:t></w:r>
  <w:r><w:rPr><w:b/><w:bCs/><w:sz w:val="40"/><w:szCs w:val="40"/></w:rPr><w:br/></w:r>
</w:p>`;
}

function paragrafoCabecalhoModelo(dados) {
    return `<w:p w14:paraId="49C34295" w14:textId="65C06929">
  <w:r><w:rPr><w:b/><w:bCs/></w:rPr><w:t>Cabeçalho</w:t></w:r><w:r><w:br/></w:r>
  ${runNormal(" Data e Hora " + dados.dataHora + " ")}<w:r><w:br/></w:r><w:r><w:br/></w:r>
  ${runNormal("Tema / Problema: ")}${runNegrito(dados.tema)}<w:r><w:br/></w:r><w:r><w:br/></w:r>
  ${runNegrito("Participantes:")}${runNormal(" " + dados.participantes)}<w:r><w:br/></w:r><w:r><w:br/></w:r>
  ${runNegrito("Coordenação da Reunião:")}${runNormal(" " + dados.coordenacao)}<w:r><w:br/></w:r><w:r><w:br/></w:r>
  ${runNegrito("Resumo Inicial:")}${runNormal(" " + dados.resumo)}
</w:p>`;
}

function paragrafoStatusModelo(statusFinal) {
    return `<w:p>
  <w:r><w:br/></w:r>
  ${runNegrito("Status Final:")}${runNormal(" " + statusFinal)}
</w:p>`;
}

function paragrafoLinhaModelo(anchorId) {
    return `<w:p>
  <w:r><w:pict w14:anchorId="${anchorId}"><v:rect id="_x0000_${anchorId}" style="width:0;height:1.5pt" o:hralign="center" o:hrstd="t" o:hr="t" fillcolor="gray" stroked="f"/></w:pict></w:r>
</w:p>`;
}

function paragrafoSecaoModelo(titulo) {
    return `<w:p><w:r><w:rPr><w:b/><w:bCs/></w:rPr><w:t>${xmlEscape(titulo)}</w:t></w:r></w:p>`;
}

function paragrafoEspacoModelo() {
    return `<w:p><w:r><w:t xml:space="preserve"> </w:t></w:r></w:p>`;
}

function listaAcoesModelo(itens) {
    const lista = itens.length ? itens : ["---"];
    return lista.map(function(item) {
        return `<w:p>
  ${runNormal("•  " + item)}
</w:p>`;
    });
}

function listaPendenciasModelo(itens) {
    const lista = itens.length ? itens : ["---"];
    return lista.map(function(item) {
        return `<w:p>
  <w:pPr><w:numPr><w:ilvl w:val="0"/><w:numId w:val="2"/></w:numPr><w:rPr><w:b/><w:bCs/></w:rPr></w:pPr>
  ${runNegrito(item)}
</w:p>`;
    });
}

function runNormal(texto) {
    return `<w:r><w:rPr><w:rFonts w:ascii="Aptos" w:eastAsia="Aptos" w:hAnsi="Aptos" w:cs="Aptos"/></w:rPr><w:t xml:space="preserve">${xmlEscape(texto)}</w:t></w:r>`;
}

function runNegrito(texto) {
    return `<w:r><w:rPr><w:rFonts w:ascii="Aptos" w:eastAsia="Aptos" w:hAnsi="Aptos" w:cs="Aptos"/><w:b/><w:bCs/></w:rPr><w:t xml:space="preserve">${xmlEscape(texto)}</w:t></w:r>`;
}

function xmlEscape(valor) {
    return String(valor)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&apos;");
}

function criarZipSemCompressao(arquivos) {
    const encoder = new TextEncoder();
    const localParts = [];
    const centralParts = [];
    let offset = 0;

    arquivos.forEach(function(arquivo) {
        const nomeBytes = encoder.encode(arquivo.name);
        const conteudoBytes = arquivo.bytes || encoder.encode(arquivo.content);
        const crc = crc32(conteudoBytes);

        const localHeader = new Uint8Array(30 + nomeBytes.length);
        const localView = new DataView(localHeader.buffer);
        localView.setUint32(0, 0x04034b50, true);
        localView.setUint16(4, 20, true);
        localView.setUint16(6, 0x0800, true);
        localView.setUint16(8, 0, true);
        localView.setUint16(10, 0, true);
        localView.setUint16(12, 0, true);
        localView.setUint32(14, crc, true);
        localView.setUint32(18, conteudoBytes.length, true);
        localView.setUint32(22, conteudoBytes.length, true);
        localView.setUint16(26, nomeBytes.length, true);
        localView.setUint16(28, 0, true);
        localHeader.set(nomeBytes, 30);

        localParts.push(localHeader, conteudoBytes);

        const centralHeader = new Uint8Array(46 + nomeBytes.length);
        const centralView = new DataView(centralHeader.buffer);
        centralView.setUint32(0, 0x02014b50, true);
        centralView.setUint16(4, 20, true);
        centralView.setUint16(6, 20, true);
        centralView.setUint16(8, 0x0800, true);
        centralView.setUint16(10, 0, true);
        centralView.setUint16(12, 0, true);
        centralView.setUint16(14, 0, true);
        centralView.setUint32(16, crc, true);
        centralView.setUint32(20, conteudoBytes.length, true);
        centralView.setUint32(24, conteudoBytes.length, true);
        centralView.setUint16(28, nomeBytes.length, true);
        centralView.setUint16(30, 0, true);
        centralView.setUint16(32, 0, true);
        centralView.setUint16(34, 0, true);
        centralView.setUint16(36, 0, true);
        centralView.setUint32(38, 0, true);
        centralView.setUint32(42, offset, true);
        centralHeader.set(nomeBytes, 46);
        centralParts.push(centralHeader);

        offset += localHeader.length + conteudoBytes.length;
    });

    const centralSize = centralParts.reduce(function(total, parte) { return total + parte.length; }, 0);
    const endHeader = new Uint8Array(22);
    const endView = new DataView(endHeader.buffer);
    endView.setUint32(0, 0x06054b50, true);
    endView.setUint16(8, arquivos.length, true);
    endView.setUint16(10, arquivos.length, true);
    endView.setUint32(12, centralSize, true);
    endView.setUint32(16, offset, true);

    return concatenarUint8Arrays([...localParts, ...centralParts, endHeader]);
}

function concatenarUint8Arrays(partes) {
    const tamanho = partes.reduce(function(total, parte) { return total + parte.length; }, 0);
    const resultado = new Uint8Array(tamanho);
    let offset = 0;

    partes.forEach(function(parte) {
        resultado.set(parte, offset);
        offset += parte.length;
    });

    return resultado;
}

function crc32(bytes) {
    let crc = -1;

    for (let i = 0; i < bytes.length; i++) {
        crc = (crc >>> 8) ^ tabelaCrc32[(crc ^ bytes[i]) & 0xff];
    }

    return (crc ^ -1) >>> 0;
}

function base64ParaUint8Array(base64) {
    const binario = atob(base64);
    const bytes = new Uint8Array(binario.length);

    for (let i = 0; i < binario.length; i++) {
        bytes[i] = binario.charCodeAt(i);
    }

    return bytes;
}

function getEl(id) {
    return document.getElementById(id);
}

const tabelaCrc32 = (function() {
    const tabela = new Uint32Array(256);

    for (let i = 0; i < 256; i++) {
        let c = i;
        for (let j = 0; j < 8; j++) {
            c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1);
        }
        tabela[i] = c >>> 0;
    }

    return tabela;
})();
