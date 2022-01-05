$(document).ready(()=> {
    if (localStorage.Unidad == 'S'){
        _validarVentanaMain({
            "Id": "07",
            "Descripcion": "Recargar resultados desde facturacion",
            "Tipo": "RM",
            "Params": [
                {
                    "formulario": "LAB001",
                    "dll": "SALUD\\LAB001"
                }
            ]
        })
    } else {
        _validarVentanaMain({
            "Id": "07",
            "Descripcion": "Recargar resultados desde facturacion",
            "Tipo": "HTML",
            "Href": "../../LAB/paginas/LAB001.html"
        })
    }
});