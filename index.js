const { ler_arquivo, escrever_arquivo_json } = require("./utils/functions")

const caminho = "./planilha/secor.xlsx";
const cabecalhos = [
    'Protolo',
    'Assunto',
    'Categoria',
    'Atendente',
    'Cliente',
    'Prioridade',
    'TempoDeTrabalho',
    'DataDeCriacao',
    'DataDaUltimaSituacao',
    'null',
    'DataDeFinalizacao',
    'null',
    'TipoDeChamado',
    'Status',
    'UltimaSituacao'
];


const data_json = ler_arquivo(caminho, cabecalhos)

escrever_arquivo_json(data_json)


