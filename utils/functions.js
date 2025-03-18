const { excelSerialDateToJSDate, excelSerialTimeToHMS } = require("./tratamentos")
const fs = require("fs");

const xlsx = require("xlsx");

exports.ler_arquivo = (caminho, cabecalhos) => {
    try {
        const workbook = xlsx.readFile(caminho);
        const nomePlanilha = workbook.SheetNames[0];
        const planilha = workbook.Sheets[nomePlanilha];

        const dados = xlsx.utils.sheet_to_json(planilha, { header: cabecalhos });

        // Converter datas e tempos
        const dadosConvertidos = dados.map(item => {
            if (item.DataDeCriacao) {
                item.DataDeCriacao = excelSerialDateToJSDate(item.DataDeCriacao);
            }
            if (item.DataDaUltimaSituacao) {
                item.DataDaUltimaSituacao = excelSerialDateToJSDate(item.DataDaUltimaSituacao);
            }
            if (item.DataDeFinalizacao) {
                item.DataDeFinalizacao = excelSerialDateToJSDate(item.DataDeFinalizacao);
            }
            if (item.TempoDeTrabalho) {
                item.TempoDeTrabalho = excelSerialTimeToHMS(item.TempoDeTrabalho);
            }
            return item;
        });

        return dadosConvertidos;

    } catch (error) {
        console.log(error);
    }
}

exports.escrever_arquivo_json = (input) => {
    const JSON_dados = JSON.stringify(input, null, 2);

    fs.writeFile('./out/data.json', JSON_dados, err => {
        if (err) {
            console.log("Erro: " + err);
        } else {
            console.log("Successful");
        }
    });
}


