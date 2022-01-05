$(document).ready(() => {
  _toggleNav();

  var NIT = parseInt($_USUA_GLOBAL[0].NIT);
  if (NIT == 844003225 ) preguntarTipoHistoriaOcupacional() // yopal
  else {
    _validarVentanaMain({
      Id: "020",
      Descripcion: "Historia salud ocupacional",
      Tipo: "HTML",
      Href: "../../HICLIN/paginas/HC01451.html",
    });
  }
});

function preguntarTipoHistoriaOcupacional() {
  var busqueda = [
    { COD: "1", DESCRIP: "Apertura HC. ocupacional" },
    { COD: "2", DESCRIP: "Certificado medico estudiantil" },
  ];

  POPUP(
    {
      array: busqueda,
      titulo: "Busqueda por:",
      indices: [{ id: "COD", label: "DESCRIP" }],
      callback_f: () => _toggleNav(),
      seleccion: "1",
    },
    data => {
      let ruta = ""
      switch (data.COD) {
        case "1":
          ruta = "../../HICLIN/paginas/HC01451.html"
          break;
        case "2":
          ruta = "../../HICLIN/paginas/HC01451-A.html" // no se ha hecho
          break;
      }

      _validarVentanaMain({
        Id: "020",
        Descripcion: "Historia salud ocupacional",
        Tipo: "HTML",
        Href: ruta,
      });
    }
  );
}