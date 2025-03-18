const { ler_arquivo, escrever_arquivo_json  } = require("./utils/functions")
const { filtrar_dados, filtrar_por_data } = require("./utils/filters")

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
// console.log(data_json)

const filtros = { Prioridade : "Baixa", UltimaSituacao : "Finalizada" }
// const dadosFiltrados = filtrar_dados(data_json, filtros)
// console.log(dadosFiltrados)


// const dataInicio = '2023-09-09'
// const dataFim = '2024-01-01'
// const dataChave = 'DataDeFinalizacao'
// const dadosData = filtrar_dados(data_json, filtros)


// escrever_arquivo_json(dadosData)

const express = require("express")
const server = express()
const cors = require("cors")
server.use(cors())

server.get("/", (req,res) => {

  

    res.status(200).json(data_json)
})

server.listen(3002, ()=>{
    console.log("Ouvindo")
})