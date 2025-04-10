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


exports.calcular_dias_para_finalizacao = (registros) => {
    return registros.map((registro) => {
        if (registro.DataDeCriacao && registro.DataDeFinalizacao) {
            const dataCriacao = new Date(registro.DataDeCriacao);
            const dataFinalizacao = new Date(registro.DataDeFinalizacao);
            const diffEmMs = Math.abs(dataFinalizacao - dataCriacao);
            const diffEmDias = Math.ceil(diffEmMs / (1000 * 60 * 60 * 24));
            return {
                ...registro,
                DiasParaFinalizacao: diffEmDias,
            };
        } else {
            return {
                ...registro,
                DiasParaFinalizacao: null, // Ou algum outro valor indicando que não foi possível calcular
            };
        }
    });
}

exports.calcular_media_de_dias_para_finalizar = (registros) => {
    let totalDias = 0;
    let contador = 0;
    let menor;
    let maior;
    registros.forEach((registro) => {
        if (registro.DataDeCriacao && registro.DataDeFinalizacao) {
            const dataCriacao = new Date(registro.DataDeCriacao);
            const dataFinalizacao = new Date(registro.DataDeFinalizacao);
            const diffEmMs = Math.abs(dataFinalizacao - dataCriacao);
            const diffEmDias = Math.ceil(diffEmMs / (1000 * 60 * 60 * 24));
            if(contador == 0)
            {
                menor = diffEmDias
                maior = menor
            }

            if(diffEmDias < menor) {
                menor = diffEmDias
            }
            if(diffEmDias > maior)
            {
                maior = diffEmDias
            }
            totalDias += diffEmDias;
            contador++;
            
            // console.log(registro)
        
        }
    });

    console.log(`
            Maior tempo de finalização: ${maior}
            Menor tempo de finalização: ${menor}
            Média de tempo para finalização: ${Math.floor(totalDias/contador)}
        `)

    if (contador === 0) {
        return 0; // Ou algum outro valor indicando que não foi possível calcular a média
    }
    return Math.floor(totalDias / contador);
} 

exports.contar_chamados = (registros) => {
    let contador = 0;

    registros.forEach(() => {
        contador++;
    })

    // console.log(contador)
    return contador
}