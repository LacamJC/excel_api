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
    const inicio = new Date(dataInicio);
    const fim = new Date(dataFim);

    return registros.filter(registro => {
        const dataRegistro = new Date(registro[chaveData]);
        return dataRegistro >= inicio && dataRegistro <= fim;
    });
}