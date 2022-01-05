new Vue({
  el: "#menu_h15",
  data: {
    tabla: [],
    historia: JSON.parse(JSON.stringify($_REG_HC)),
    paciente: JSON.parse(JSON.stringify($_REG_PACI)),
    modal_img: true,
  },
  created() {
    loader("show");
    this._consultarImagenes();
    console.log("inicia");
  },
  methods: {
    _consultarImagenes() {
      let _15 = this,
        datosh =
          datosEnvio() +
          parseFloat(_15.paciente.COD) +
          "|" +
          _15.historia.suc_folio_hc +
          _15.historia.nro_folio_hc +
          "|";

      postData({ datosh }, get_url("APP/HICLIN/HIS802A.DLL"))
        .then((data) => {
          loader("hide");
          if (data.imagenes.length > 0) {
            _15.tabla = data.imagenes;
          } else {
            plantillaToast(
              "",
              "Paciente no tiene archivos subidos",
              null,
              "warning",
              ""
            );
            _regresar_menuhis();
          }
        })
        .catch((err) => {
          loader("hide");
          _regresar_menuhis();
        });
    },
    _downloadFile(item) {
      let random = new Date().getTime(),
        nombre_bat = "C:\\PROSOFT\\TEMP\\" + random + ".BAT",
        data_bat = `START ${get_url(`progdatos/escaner/${item.ruta}`)}`;

      fs.writeFile(nombre_bat, data_bat, function (err) {
        if (err) console.error("Error escribiendo bat: \n\n" + err);
        else {
          exe(nombre_bat, function (err, data) {
            if (err) console.error("Error ejecutando bat: \n\n" + err);
            else {
              fs.unlink(nombre_bat, function (err) {
                if (err) console.error("Error eliminando bat: \n\n" + err);
                else {
                  console.log("se descargo");
                }
              });
            }
          });
        }
      });
    },
    _validarTipoArchivo(tipo) {
      if (tipo == 1) {
        tipo = " PNG";
      } else {
        tipo = " PDF";
      }
      return tipo;
    },
  },
});
