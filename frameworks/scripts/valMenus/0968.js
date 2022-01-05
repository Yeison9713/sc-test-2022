$(document).ready(() => {
    if (localStorage.Modulo != 'SAL') {
        _validarVentanaMain({
            "Id": "0968",
            "Descripcion": "Recalculo de abonos cartera",
            "Opc-segu": "I68",
            "Tipo": "POWER",
            "Params": [
              {
                "formulario": "INV612",
                "dll": "INVENT\\INV612.dll"
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
            "Id": "0968",
            "Descripcion": "Recalculo de abonos cartera",
            "Tipo": "HTML",
            "Href": "../../SALUD/paginas/SAL612.html"
        })
    }
});