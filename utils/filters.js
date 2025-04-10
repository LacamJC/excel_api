exports.filtrar_dados = (arrayOriginal, filtros) => {

    return arrayOriginal.filter(item => {
        for (const chave in filtros) {
            if (item[chave] !== filtros[chave]) {
                return false;
            }
        }
        return true;
    });
};


exports.filtrar_por_data = (registros, dataInicio, dataFim, chaveData) => {
    // console.log(`
    //         Filtrando por data

    //         De ${dataInicio} até ${dataFim}

    //         Chave de busca: ${chaveData}
    //     `)
    const inicio = new Date(dataInicio);
    const fim = new Date(dataFim);

    return registros.filter(registro => {
        const dataRegistro = new Date(registro[chaveData]);

        // console.log(registro)
        return dataRegistro >= inicio && dataRegistro <= fim;
    });
}

exports.filtrar_por_campo = (dados, campos) =>  {
    if (!campos) {
        return dados; // Retorna todos os dados se nenhum campo for especificado
    }

    const camposArray = campos.split(",");
    return dados.map((item) => {
        const novoItem = {};
        camposArray.forEach((campo) => {
            if (item.hasOwnProperty(campo)) {
                novoItem[campo] = item[campo];
            }
        });
        return novoItem;
    });
}