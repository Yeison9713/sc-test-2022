$(document).ready(() => {
    if (localStorage.Modulo != 'SAL') {
        _validarVentanaMain({
            "Id": "031",
            "Descripcion": "Recibos de caja",
            "Seg-w": [
                "1",
                "2"
            ],
            "Opc-segu": "C31",
            "Tipo": "POWER",
            "Params": [
                {
                    "formulario": "FAC135",
                    "dll": "CONTAB\\FAC135.dll",
                    "Sucursal": "1",
                    "Tipo-comp": "1R"
                }
            ]
        })
    } else {
        _validarVentanaMain({
            "Id": "031",
            "Descripcion": "Recibos de caja",
            "Tipo": "HTML",
            "Href": "../../SALUD/paginas/FAC135.html"
        })
    }
});