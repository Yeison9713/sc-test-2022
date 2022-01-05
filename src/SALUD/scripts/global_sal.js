const _getObjectSaveFact = (data) => {
    let obj = JSON.parse(JSON.stringify(data));

    for (let i in obj.tabla) {
        let datos_env = _getValuesSave(obj.tabla[i], []);
        obj.tabla[i] = datos_env;
    }

    for (let i in obj.tabla_abon_salud) {
        let datos_env = _getValuesSave(obj.tabla_abon_salud[i], []);
        obj.tabla_abon_salud[i] = datos_env;
    }

    let datos = _getObjetoSave(obj, ["tabla", "tabla_diag_estad", "tab_usuar_capit", "tabla_abon_salud"])
    return datos;
}

module.exports = {
    _getObjectSaveFact
}