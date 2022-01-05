var bomb03 = new Vue({
  el: "#bomb03",
  directives: { money: VMoney },
  data: {
    tanques: [],
    form: {
      cod: "",
      descripcion: "",
      articulo: "",
      cm_lect: "",
      galon_lect: "",
      fecha: {
        año: "",
        mes: "",
        dia: ""
      },
      hora: {
        hra: "",
        min: ""
      },
      oper: "",
      clase: ""
    },
    money: {
      decimal: ".",
      thousands: ",",
      precision: 2,
      masked: false
    },
  },
  created() {
    _inputControl("reset");
    _inputControl("disabled");
    this._getTanques();
  },
  // watch: {
  //   "form.cm_lect": {
  //     handler(val) {
  //       let num = val || '';
  //       num = parseFloat(num).toFixed(2)
  //       let new_val = this.formatNumero(num)
  //       console.log('Num', num, new_val)
  //       // num = num.toString().replace(/\,/g, '');
  //       // this.form.cm_lect = new_val;
  //       // setTimeout(() => {
  //       //   this.$refs.cm_lect.getElementsByTagName("input").value = new_val;
  //       // }, 100);
  //     }
  //   }
  // },
  methods: {
    _getTanques() {
      var datos_envio = datosEnvio() + "00" + "|";
      postData({ datosh: datos_envio }, get_url("app/bombas/BOMB03.DLL"))
        .then((data) => {
          bomb03.tanques = data.LISTADO;
          bomb03._validarItemTanque();
        })
        .catch((err) => {
          _toggleNav();
          loader("hide");
        });
    },
    _validarItemTanque() {
      validarInputs({ form: "#consulta", orden: "1" }, _toggleNav, () => {
        var codigo = parseFloat(bomb03.form.cod),
          consulta = bomb03.tanques.find(
            (e) => parseFloat(e.COD) == codigo
          );

        if (consulta) {
          bomb03.form = {
            cod: consulta.COD,
            descripcion: consulta.DESCRIP,
            articulo: consulta.ART,
            cm_lect: parseFloat(consulta.MED).toFixed(2) || 0,
            galon_lect: parseFloat(consulta.GAL) || 0,
            fecha: {
              año: consulta.FECHA.substr(0, 2),
              mes: consulta.FECHA.substr(2, 2),
              dia: consulta.FECHA.substr(4, 2),
            },
            hora: {
              hra: consulta.HRA.substr(0, 2),
              min: consulta.HRA.substr(2, 2),
            },
            oper: consulta.OPER,
            clase: consulta.CLS,
          };
          bomb03._validarmedida();
        } else {
          bomb03._initBox();
          bomb03._validarItemTanque();
        }
      });
    },
    _validarmedida() {
      validarInputs(
        {
          form: "#faseMedida",
          orden: "1"
        },
        bomb03._validarItemTanque,
        () => {
          var medida = bomb03.form.cm_lect
          bomb03.form.cm_lect = this.formatNumero(medida)
          if (bomb03.form.cm_lect > 1 && bomb03.form.cm_lect < 281) {
            var datos = datosEnvio() + bomb03.form.clase + "|";
            postData(
              { datosh: datos },
              get_url("app/bombas/BOMB03_2.DLL")
            )
              .then(bomb03._validarClsTanque)
              .catch((err) => {
                console.log(err);
                bomb03._validarmedida();
              });
          } else {
            bomb03.form.cm_lect = 0
            bomb03._validarmedida();
          }
        }
      )
    },
    _validarClsTanque(data) {
      var form = { ...bomb03.form },
        lectura = parseFloat(form.cm_lect).toFixed(1).split("."),
        gln_x = parseFloat(data.LISTADO[lectura[0] - 1].COMP);

      form.galon_lect = gln_x;
      lectura[1] = parseFloat(`.${lectura[1]}`);

      if (lectura[1] > 0) {
        gln_x = parseFloat(data.LISTADO[lectura[0]].COMP);

        if (gln_x > form.galon_lect) {
          var new_vlr = ((gln_x - form.galon_lect) * lectura[1]).toFixed(0);
          // console.log(lectura[1], new_vlr, form.galon_lect)

          form.galon_lect = parseFloat(new_vlr) + form.galon_lect;
        }
      }
      bomb03.form.galon_lect = form.galon_lect;
      bomb03._validarSegundaFase();
    },
    _validarSegundaFase() {
      validarInputs(
        { form: "#fase2", orden: "1" },
        bomb03._validarmedida,
        bomb03._validarTerceraFase
      );
    },
    _validarTerceraFase() {
      validarInputs(
        { form: "#fase3", orden: "1" },
        bomb03._validarSegundaFase,
        bomb03._validarCuartaFase
      );
    },
    _validarCuartaFase() {
      validarInputs(
        { form: "#fase4", orden: "1" },
        bomb03._validarTerceraFase,
        () => {
          bomb03.form.oper = localStorage.Usuario;
          CON850_P(function (e) {
            console.log(e);
            if (e.id == "S") {
              bomb03._guardar_03();
            } else {
              bomb03._validarCuartaFase();
            }
          }, {});
        }
      );
    },
    _guardar_03() {
      var datos = bomb03._bajarDatos(bomb03.form);
      postData(datos, get_url("app/bombas/BOMB03_1.DLL"))
        .then((data) => {
          jAlert(
            {
              titulo: "Notificacion",
              mensaje: "Modificado correctamente",
            },
            () => {
              bomb03.tanques = [];
              bomb03._initBox();
              bomb03._getTanques();
            }
          );
        })
        .catch(bomb03._validarCuartaFase);
    },
    _bajarDatos(data) {
      return {
        datosh:
          datosEnvio() +
          data.cod +
          "|" +
          data.descripcion +
          "|" +
          data.clase +
          "|" +
          data.articulo +
          "|" +
          parseFloat(data.cm_lect).toFixed(2) +
          "|" +
          data.galon_lect +
          "|" +
          data.fecha.año.padStart(2, '0') +
          data.fecha.mes.padStart(2, '0') +
          data.fecha.dia.padStart(2, '0') +
          "|" +
          data.hora.hra +
          data.hora.min +
          "|" +
          data.oper +
          "|",
      };
    },
    formatNumero: function (val) {
      var mask = IMask.createMask({
        mask: Number,
        min: 0,
        max: 999.99,
        scale: 2,
        thousandsSeparator: ',',
        radix: ".",
      });
      mask.resolve(val.toString());
      return `${mask.value}`;
    },
    _initBox() {
      bomb03.form = {
        cod: "",
        descripcion: "",
        articulo: "",
        cm_lect: "",
        galon_lect: "",
        fecha: {
          año: "",
          mes: "",
          dia: "",
        },
        hora: {
          hra: "",
          min: "",
        },
        oper: "",
        clase: ""
      };
    }
  }
})

function bajarDatos_03() {
  var medida = medidaMask.unmaskedValue ? medidaMask.unmaskedValue : 0;
  medida = parseFloat(medida).toFixed(2).replace(/\./g, '');

  var fecha = $('#año_03').val() + $('#mes_03').val() + $('#dia_03').val();
  var hora = $('#hora_03').val() + $('#mts_03').val();

  var datos_envio = datosEnvio();
  datos_envio += cerosIzq($('#tanq_03').val().toString(), 2);
  datos_envio += "|";
  datos_envio += $('#Descrip_03').val();
  datos_envio += "|";
  datos_envio += $_CONSULT_TMP.array.CLS;
  datos_envio += "|";
  datos_envio += $_CONSULT_TMP.array.ART.trim();
  datos_envio += "|";
  datos_envio += cerosIzq(medida.toString(), 5);
  datos_envio += "|";
  datos_envio += cerosIzq($('#galon_03').val(), 6);
  datos_envio += "|";
  datos_envio += fecha;
  datos_envio += "|";
  datos_envio += hora;
  datos_envio += "|";
  datos_envio += localStorage.Usuario;
  datos_envio += "|";
  return datos_envio;
}