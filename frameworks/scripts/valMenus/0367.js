$(document).ready(() => {
    if (localStorage.Modulo != 'SAL') {
        _validarVentanaMain({
              "Id": "0367",
              "Descripcion": "Relacion recibos de caja",
              "Opc-segu": "C367",
              "Tipo": "POWER",
              "Params": [
                {
                  "formulario": "CON406",
                  "dll": "CONTAB\\CON406.dll"
                }
              ]
        })
    } else {
      // _validarVentanaMain({
      //       "Id": "0367",
      //       "Descripcion": "Relacion recibos de caja",
      //       "Opc-segu": "C367",
      //       "Tipo": "POWER",
      //       "Params": [
      //         {
      //           "formulario": "CON406",
      //           "dll": "CONTAB\\CON406.dll"
      //         }
      //       ]
      // })
        _validarVentanaMain({
            "Id": "0367",
            "Descripcion": "Recibos de caja",
            "Tipo": "HTML",
            "Href": "../../SALUD/paginas/CON406S.html"
        })
    }
});