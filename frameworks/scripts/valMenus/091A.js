$(document).ready(() => {
    if (localStorage.Modulo == 'SAL') {
        _validarVentanaMain({
            "Id": "091A",
            "Descripcion": "Actualiza placas de carros",
            "Opc-segu": "I1A",
            "Tipo": "HTML",
            "Href": "../../SALUD/paginas/CER101.html"
        })
    } else {
        _validarVentanaMain({
            "Id": "091A",
            "Descripcion": "Actualiza placas de carros",
            "Opc-segu": "I1A",
            "Tipo": "POWER",
            "Params": [
                {
                    "formulario": "CER101",
                    "dll": "INVENT\\CER101.dll"
                }
            ]
        })
    }
})