const { ler_arquivo, escrever_arquivo_json, calcular_dias_para_finalizacao, calcular_media_de_dias_para_finalizar, contar_chamados } = require("./utils/functions")
const { filtrar_dados, filtrar_por_data, filtrar_por_campo } = require("./utils/filters")

const caminho = "./planilha/secor.xlsx";
const cabecalhos = [
    'Protocolo',
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
// console.log(data_json)

// const filtros =  { UltimaSituacao : "Finalizada"}

// const somente_finalizados = filtrar_dados(data_json,filtros)
// const somente_datas = filtrar_por_campo(somente_finalizados, "Categoria,DataDeCriacao,DataDeFinalizacao")
// const dias_levados = calcular_dias_para_finalizacao(somente_datas)
// // console.log(dias_levados.length)

// const media_dias = calcular_media_de_dias_para_finalizar(somente_datas)
// console.log(media_dias)


// console.log(dias_levados.diasParaFinalizacao)




// const filtros = { Prioridade : "Baixa", UltimaSituacao : "Finalizada" }
// const dadosFiltrados = filtrar_dados(data_json, filtros)
// console.log(dadosFiltrados)


// const dataInicio = '2023-09-09'
// const dataFim = '2024-01-01'
// const dataChave = 'DataDeFinalizacao'
// const dadosData = filtrar_dados(data_json, filtros)


// escrever_arquivo_json(dadosData)

// const express = require("express")
// const server = express()
// const cors = require("cors")
// server.use(cors())

// server.get("/", (req,res) => {



//     res.status(200).json(data_json)
// })

// server.listen(3002, ()=>{
//     console.log("Ouvindo")
// })






/**
 * CASO : MÉDIA MENSAL
 * 
 */
function media_mensal(dataInicio, dataFim) {
    var filtros = { UltimaSituacao: "Finalizada" }
    var chamados_finalizados = filtrar_dados(data_json, filtros)
    var dataInicio = '2025-01-01'
    var dataFim = '2025-01-31'
    var dataChave = 'DataDeFinalizacao'
    var arrayFiltrado = filtrar_por_data(chamados_finalizados, dataInicio, dataFim, dataChave)
    var dias_levados = calcular_dias_para_finalizacao(arrayFiltrado)
    var res = dias_levados
    var media = calcular_media_de_dias_para_finalizar(res)
    console.log(media)
    // var res = filtrar_por_campo(dias_levados, "DiasParaFinalizacao");

}



function media_por_categoria(categoria) {
    var filtros = { UltimaSituacao: "Finalizada", Categoria: categoria }
    var res = filtrar_dados(data_json, filtros)
    var res = calcular_dias_para_finalizacao(res)
    var res = calcular_media_de_dias_para_finalizar(res)


    console.log(categoria)
}

// media_por_categoria(categoria)


function media_por_ultimos_mes(dataInicio, dataFim, categoria) {
    var filtros = { UltimaSituacao: "Finalizada", Categoria: categoria }
    var chave = "DataDeFinalizacao"
    var res = filtrar_dados(data_json, filtros)
    res = filtrar_por_campo(res, "Categoria,DataDeCriacao,DataDeFinalizacao")
    // console.log(res )
    res = filtrar_por_data(res, dataInicio, dataFim, chave)
    res = calcular_dias_para_finalizacao(res)
    res = calcular_media_de_dias_para_finalizar(res)
    console.log(res)
}

var dataInicio = '2023-12-01'
var dataFim = '2023-12-31'
var categoria = "Desenvolvimento"
/**
 * CATEGORIAS 
 * Desenvolvimento
 * Suporte
 * Dúvida
 * Projeto
 * 
 */

// media_por_ultimos_mes(dataInicio, dataFim, categoria)

function media_mensal_por_categoria(dataInicio, dataFim, categoria) {
    var filtros = { UltimaSituacao: "Finalizada", Categoria: categoria }
    var chave = "DataDeFinalizacao"
    var res = filtrar_dados(data_json, filtros)

    // res = filtrar_por_campo(res, "Categoria,DataDeCriacao,DataDeFinalizacao")
    res = filtrar_por_data(res, dataInicio, dataFim, chave)
    // res = calcular_dias_para_finalizacao(res)
    // res = calcular_media_de_dias_para_finalizar(res)
    res = contar_chamados(res)

    return res
    // function outubro_2024(res){
    //     var res = filtrar_por_data(res, '2024-10-01', '2024-10-31', )
    // }


    const meses =
    {
        outubro_2024: {
            dataInicio: '2024-10-01',
            dataFim: '2024-10-31'
        },

        novembro_2024: {
            dataInicio: '2024-11-01',
            dataFim: '2024-11-30'
        }
    }


    const media_mes = (res, inicio, fim) => {
        console.log("//// FILTRANDO MES ESPECIFICO")

        res = filtrar_por_data(res, inicio, fim, "DataDeFinalizacao")
        // res = calcular_dias_para_finalizacao(res)
        // res = calcular_media_de_dias_para_finalizar(res)

        console.log(res)
    }


    console.log(res)
    console.log(res.length)
    // escrever_arquivo_json(res)

    // media_mes(res, meses.outubro_2024.dataInicio, meses.outubro_2024.dataFim)
    // media_mes(res, meses.novembro_2024.dataInicio, meses.novembro_2024.dataFim)

    // console.log(meses[0].outubro_2024.dataInicio)

    // console.log(res)

    // outubro_2024(res)
}

// media_mensal_por_categoria(dataInicio, dataFim, categoria)



const categorias = ["Desenvolvimento", "Suporte", "Dúvida", "Projeto"]

categorias.forEach((categoria) => {


    console.log(`
            Categoria: ${categoria}

            Quantidade de chamados: ${media_mensal_por_categoria(dataInicio, dataFim, categoria)}
        `)
})