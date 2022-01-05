new Vue({
  el: "#inv404",
  data: {
    prefijos: [],
    form: {
      sucursal: null,
      descripcion: null,
      fechaini: {
        año: null,
        mes: null,
        dia: null,
      },
      fechafin: {
        año: null,
        mes: null,
        dia: null,
      },
    },
  },
  created() {
    loader("show");
    _inputControl("disabled");
    _inputControl("reset");

    this._getPrefijos();
  },
  methods: {
    _getPrefijos() {
      var $this = this;
      postData({ datosh: datosEnvio() }, get_url("app/invent/INV109.DLL"))
        .then((result) => {
          $this.prefijos = result.PREFIJOS[0].TABLA.filter(
            (e) => e.PREFIJO.trim() != ""
          );

          $this.prefijos.map((e) => {
            return (e.NRO =
              parseFloat(e.NRO).toString().padStart(2, "0") || "00");
          });

          loader("hide");
          $this._ventanaPrefijos();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    _ventanaPrefijos() {
      var prefijos = this.prefijos,
        $this = this;

      _ventanaDatos({
        titulo: "Sucursales activas",
        columnas: ["NRO", "PREFIJO", "DESCRIPCION", "ALMACEN", "CENTRO_COSTO"],
        data: prefijos,
        callback_esc: function () {
          _toggleNav();
        },
        callback: function (data) {
          $this.form.sucursal = data.NRO;
          $this.form.descripcion = data.DESCRIPCION.trim();

          var date = $_USUA_GLOBAL[0].FECHALNK;
          $this.form.fechaini.año = 2000 + parseFloat(date.slice(0, 2));
          $this.form.fechaini.mes = date.slice(2, 4);
          $this._faseFechaIni();
        },
      });
    },
    _faseFechaIni() {
      var $this = this;
      validarInputs(
        {
          form: "#validarFechas_404",
          orden: "1",
        },
        () => {
          $this._ventanaPrefijos();
        },
        () => {
          var fecha = JSON.parse(JSON.stringify($this.form.fechaini));
          var datosh =
            datosEnvio() +
            $this.form.sucursal +
            "|" +
            fecha.año +
            fecha.mes.padStart(2, "0") +
            fecha.dia.padStart(2, "0") +
            "|";

          postData({ datosh }, get_url("app/bombas/INV404.DLL"))
            .then((result) => {
              $this.form.fechafin = fecha;
              $this.form.fechafin.dia = "";
              $this._faseFechaFin();
            })
            .catch((err) => {
              console.log(err);
              $this._faseFechaIni();
            });
        }
      );
    },
    _faseFechaFin() {
      var $this = this;
      validarInputs(
        {
          form: "#faseFinal_404",
          orden: "1",
        },
        () => {
          $this._faseFechaIni();
        },
        () => {
          $this._validarRecontabilizacion();
        }
      );
    },
    _validarRecontabilizacion() {
      var $this = this;
      var fecha1 = $this.form.fechaini;
      var fecha2 = $this.form.fechafin;

      fecha1 = parseFloat(
        fecha1.año + fecha1.mes.padStart(2, "0") + fecha1.dia.padStart(2, "0")
      );

      fecha2 = parseFloat(
        fecha2.año + fecha2.mes.padStart(2, "0") + fecha2.dia.padStart(2, "0")
      );

      if (fecha1 <= fecha2) {
        var datos =
          datosEnvio() +
          localStorage.Usuario +
          "|" +
          $this.form.sucursal +
          "|" +
          fecha1 +
          "|" +
          fecha2 +
          "|";

        loader('show')

        postData({ datosh: datos }, get_url("app/bombas/INV404_1.DLL"))
          .then((result) => {
            loader('hide')
            jAlert({ titulo: "Correcto ", mensaje: result }, function () {
              $this.form = {
                sucursal: null,
                descripcion: null,
                fechaini: {
                  año: null,
                  mes: null,
                  dia: null,
                },
                fechafin: {
                  año: null,
                  mes: null,
                  dia: null,
                },
              };
              $this._ventanaPrefijos();
            });
          })
          .catch((err) => {
            loader('hide')
            $this._faseFechaFin();
          });
      } else {
        plantillaToast("37", "37", null, "warning");
        $this._faseFechaFin();
      }
    },
  },
});
