// 09/11/2020 - DIANA ESCOBAR: CREADO 
new Vue({
  el: "#SER4B2",
  components: {
    ventanapacientes: require("../../SALUD/scripts/maestropacientes.vue.js")
  },
  data: {
    SER4B2: [],
    mostrarpacientes: false,
    params_pacientes: {
      estado: false
    },
    datos_pacientes: {},
    form: {
      suc_SER4B2: "",
      numero_SER4B2: "",
      fecha_SER4B2: "",
      hora_SER4B2: "",
      novedad_SER4B2: "",
      item_SER4B2: "",
      paciente_SER4B2: "",
      descrippaciente_SER4B2: "",
      origatencion_SER4B2: "",
      prioridad_SER4B2: "",
      cama_SER4B2: "",
      tiposerv_SER4B2: "",
      entidad_SER4B2: "",
      descripentidad_SER4B2: "",
      codigocups_SER4B2: "",
      descripcups_SER4B2: "",
      justificacion_SER4B2: "",
      diagprincipal_SER4B2: "",
      diag1_SER4B2: "",
      diag2_SER4B2: "",
      protocolo_SER4B2: "",
      unidadserv_SER4B2: "",
      descripdiagprincipal_SER4B2: "",
      descripdiag1_SER4B2: "",
      descripdiag2_SER4B2: "",
    },
    tablaautoriz_SER4B2: [],
  },
  created() {
    _toggleNav();
    _inputControl("disabled");
    loader("show");
    nombreOpcion("9,7,4,B,2 - Solicitud autorizacion de servicio");
    var $_this = this;
    $_this.SER4B2.FECHA_LNK = $_USUA_GLOBAL[0].FECHALNK;
    $_this.SER4B2.ANO_LNK = $_this.SER4B2.FECHA_LNK.substring(0, 2);
    $_this.SER4B2.MES_LNK = $_this.SER4B2.FECHA_LNK.substring(2, 4);
    $_this.SER4B2.DIA_LNK = $_this.SER4B2.FECHA_LNK.substring(4, 6);
    $_this.SER4B2.FECHAACTUAL = moment().format('YYYYMMDD');
    $_this.SER4B2.ANOACTUAL = $_this.SER4B2.FECHAACTUAL.substring(0, 4)
    $_this.SER4B2.MESACTUAL = $_this.SER4B2.FECHAACTUAL.substring(4, 6)
    $_this.SER4B2.DIAACTUAL = $_this.SER4B2.FECHAACTUAL.substring(6, 8)
    obtenerDatosCompletos({
      nombreFd: 'UNSERV'
    }, function (data) {
      console.log(data, 'UNIDAD')
      $_this.SER4B2.UNISERVICIO = data.UNSERV;
      loader("hide");
      CON850($_this._validarnovedad_SER4B2);
      $_this.SER4B2.UNIDADSERVICIO = [];
      for (var i in $_this.SER4B2.UNISERVICIO) {
        console.log(i);
        if ($_this.SER4B2.UNISERVICIO[i].ESTADO.trim() == 'S') {
          $_this.SER4B2.UNIDADSERVICIO.push($_this.SER4B2.UNISERVICIO[i]);
        }
      }
      for (var i in $_this.SER4B2.UNIDADSERVICIO) {
        $_this.SER4B2.UNIDADSERVICIO[i].DESCRIP = `${$_this.SER4B2.UNIDADSERVICIO[i].COD} - ${$_this.SER4B2.UNIDADSERVICIO[i].DESCRIP}`;
        $_this.SER4B2.UNIDADSERVICIO[i].COD = i;
      }
      obtenerDatosCompletos({
        nombreFd: "ENTIDADES",
      },
        function (data) {
          $_this.SER4B2.ENTIDADES = data.ENTIDADES;
          $_this.SER4B2.ENTIDADES.pop();
          obtenerDatosCompletos({
            nombreFd: 'CAMAS'
          }, function (data) {
            $_this.SER4B2.CAMAS = data.CAMAS;
            $_this.SER4B2.CAMAS.pop();
            obtenerDatosCompletos({
              nombreFd: 'ENFERMEDADES',
            }, function (data) {
              $_this.SER4B2.ENFERMEDADES = data.ENFERMEDADES;
              $_this.SER4B2.ENFERMEDADES.pop();
              $_this.SER4B2.FILTROENFER = $_this.SER4B2.ENFERMEDADES.filter(x => x.TIPO_ENF == 2);
            })
          })
        })
    })


  },
  methods: {
    _validarnovedad_SER4B2(novedad) {
      this.form.suc_SER4B2 = ""
      this.form.numero_SER4B2 = ""
      this.form.fecha_SER4B2 = ""
      this.form.hora_SER4B2 = ""
      this.form.paciente_SER4B2 = ""
      this.form.descrippaciente_SER4B2 = ""
      this.form.origatencion_SER4B2 = ""
      this.form.prioridad_SER4B2 = ""
      this.form.cama_SER4B2 = ""
      this.form.tiposerv_SER4B2 = ""
      this.form.entidad_SER4B2 = ""
      this.form.descripentidad_SER4B2 = ""
      this.form.codigocups_SER4B2 = ""
      this.form.descripcups_SER4B2 = ""
      this.form.justificacion_SER4B2 = ""
      this.form.diagprincipal_SER4B2 = ""
      this.form.diag1_SER4B2 = ""
      this.form.diag2_SER4B2 = ""
      this.form.protocolo_SER4B2 = ""
      this.form.unidadserv_SER4B2 = ""
      this.form.descripdiagprincipal_SER4B2 = ""
      this.form.descripdiag1_SER4B2 = ""
      this.form.descripdiag2_SER4B2 = ""
      this.form.item_SER4B2 = "1"
      this.tablaautoriz_SER4B2 = []
      this.form.novedad_SER4B2 = novedad.id;
      if (this.form.novedad_SER4B2 == "F") {
        _toggleNav();
      } else {
        let novedad = { "7": "Nuevo", "8": "Cambio", "9": "Retiro" };
        this.form.novedad_SER4B2 = this.form.novedad_SER4B2 + " - " + novedad[this.form.novedad_SER4B2];
        switch (this.form.novedad_SER4B2.substring(0, 1)) {
          case "7":
          case "8":
            this._asignarnumero_SER4B2()
            break;
          case "9":
            if (localStorage.Usuario == "ADMI" || localStorage.Usuario == "GEBC") {
              this._asignarnumero_SER4B2()
            } else {
              setTimeout(CON851("14", "14", CON850(this._validarnovedad_SER4B2), "error", "Error"), 300)
            }
            break;
        }
      }
    },
    _asignarnumero_SER4B2() {
      this.SER4B2.SECUNUM = "AS"
      let URL = get_url("APP/CONTAB/CON007.DLL");
      postData({ datosh: datosEnvio() + this.SER4B2.SECUNUM }, URL)
        .then(data => {
          var data = data.split("|");
          this.SER4B2.ULTFECHANUM = data[2].trim();
          this.SER4B2.NUMEROCTL = data[1].substring(3, 9);
          if (this.form.novedad_SER4B2.substring(0, 1) == '7') {
            this.SER4B2.NROW = parseInt(this.SER4B2.NUMEROCTL);
            this.form.numero_SER4B2 = this.SER4B2.NROW.toString().padStart(6, '0')
          } else {
            this.SER4B2.NROW = parseInt(this.SER4B2.NUMEROCTL) - 1;
            this.form.numero_SER4B2 = this.SER4B2.NROW.toString().padStart(6, '0')
          }
          this._evaluarfecha_SER4B2()
        })
        .catch(err => {
          console.error(err);
          setTimeout(_toggleNav, 500)
        })
    },
    _evaluarfecha_SER4B2() {
      this.form.fecha_SER4B2 = moment().format('YYYY-MM-DD');
      this.form.hora_SER4B2 = moment().format('HH:mm');
      this.form.suc_SER4B2 = $_USUA_GLOBAL[0].PREFIJ
      if (this.form.novedad_SER4B2.substring(0, 1) == '7') {
        this._evaluarpaciente_SER4B2()
      } else {
        this._evaluarnro_SER4B2()
      }
    },
    _evaluarnro_SER4B2() {
      validarInputs(
        {
          form: "#VALIDARNROAUTO_SER4B2",
          orden: "1",
        },
        () => { CON850(this._validarnovedad_SER4B2) },
        () => {
          if (this.form.numero_SER4B2.toString().trim() == '') {
            this._evaluarnro_SER4B2()
          } else {
            this.form.numero_SER4B2 = this.form.numero_SER4B2.toString().padStart(6, '0')
            postData({
              datosh: datosEnvio() + '1|' + this.form.suc_SER4B2 + this.form.numero_SER4B2 + '|'
            }, get_url("APP/SALUD/SER4B3.DLL"))
              .then((data) => {
                this.SER4B2.REGISTOAUTW = data.DATOAUTORIZ[0];
                this.form.paciente_SER4B2 = this.SER4B2.REGISTOAUTW.ID.trim()
                this.form.descrippaciente_SER4B2 = this.SER4B2.REGISTOAUTW.APELPACI1 + ' ' + this.SER4B2.REGISTOAUTW.APELPACI2 + ' ' + this.SER4B2.REGISTOAUTW.NOMPACI1 + ' ' + this.SER4B2.REGISTOAUTW.NOMPACI2
                this.SER4B2.UNIDAD = this.SER4B2.UNISERVICIO.filter(x => x.DESCRIP.substring(0, 2) == this.SER4B2.REGISTOAUTW.PUERTA);
                if (this.SER4B2.UNIDAD.length > 0) {
                  this.form.unidadserv_SER4B2 = this.SER4B2.UNIDAD[0].DESCRIP
                } else {
                  this.form.unidadserv_SER4B2 = ""
                }
                let causa = { '01': 'ACCIDENTE TRABAJO', '02': 'ACCIDENTE TRANSITO', '03': 'ACCIDENTE RABICO', '04': 'ACCIDENTE OFIDICO', '05': 'OTRO TIPO DE ACCIDENTE', '06': 'EVENTO CATASTROFIC', '07': 'LESION POR AGRESION', '08': 'LESION AUTOINFLIGIDA', '09': 'SOSP. MALTRATO FISICO', '10': 'SOSP. ABUSO SEXUAL', '11': 'SOSP. VIOLENC. SEXUAL', '12': 'SOSP. MALTRATO EMOCIONAL', '13': 'ENFERMEDAD GENERAL', '14': 'ENFERMEDAD PROFESIONAL', '15': 'OTRA CAUSA' };
                if (causa[this.SER4B2.REGISTOAUTW.CAUSA] == undefined) {
                  this.form.origatencion_SER4B2 = ""
                } else {
                  this.form.origatencion_SER4B2 = this.SER4B2.REGISTOAUTW.CAUSA + ' - ' + causa[this.SER4B2.REGISTOAUTW.CAUSA]
                }
                let triage = { '1': 'Prioritaria', '2': 'No prioritaria' };
                if (triage[this.SER4B2.REGISTOAUTW.TRIAGE] == undefined) {
                  this.form.prioridad_SER4B2 = ""
                } else {
                  this.form.prioridad_SER4B2 = this.SER4B2.REGISTOAUTW.TRIAGE + ' - ' + triage[this.SER4B2.REGISTOAUTW.TRIAGE]
                }
                this.form.cama_SER4B2 = this.SER4B2.REGISTOAUTW.CAMA.trim()
                let tipo = { '1': 'Posterior Atencion Inic.Urg', '2': 'Servicios Electivos' };
                if (tipo[this.SER4B2.REGISTOAUTW.TIPO] == undefined) {
                  this.form.tiposerv_SER4B2 = ""
                } else {
                  this.form.tiposerv_SER4B2 = this.SER4B2.REGISTOAUTW.TIPO + ' - ' + tipo[this.SER4B2.REGISTOAUTW.TIPO]
                }
                this.form.entidad_SER4B2 = this.SER4B2.REGISTOAUTW.ENTID
                this.form.descripentidad_SER4B2 = this.SER4B2.REGISTOAUTW.NOMB_ENT
                this.form.justificacion_SER4B2 = this.SER4B2.REGISTOAUTW.TABLA_JUST[0].JUSTIF.replace(/&/g, '\n').trim() + this.SER4B2.REGISTOAUTW.TABLA_JUST[1].JUSTIF.replace(/&/g, '\n').trim() + this.SER4B2.REGISTOAUTW.TABLA_JUST[2].JUSTIF.replace(/&/g, '\n').trim() + this.SER4B2.REGISTOAUTW.TABLA_JUST[3].JUSTIF.replace(/&/g, '\n').trim() + this.SER4B2.REGISTOAUTW.TABLA_JUST[4].JUSTIF.replace(/&/g, '\n').trim() + this.SER4B2.REGISTOAUTW.TABLA_JUST[5].JUSTIF.replace(/&/g, '\n').trim()
                this.form.diagprincipal_SER4B2 = this.SER4B2.REGISTOAUTW.TABLA_DIAG[0].DIAG.trim()
                this.form.descripdiagprincipal_SER4B2 = this.SER4B2.REGISTOAUTW.TABLA_DIAG[0].NOMBRE
                this.form.diag1_SER4B2 = this.SER4B2.REGISTOAUTW.TABLA_DIAG[1].DIAG.trim()
                this.form.descripdiag1_SER4B2 = this.SER4B2.REGISTOAUTW.TABLA_DIAG[1].NOMBRE
                this.form.diag2_SER4B2 = this.SER4B2.REGISTOAUTW.TABLA_DIAG[2].DIAG.trim()
                this.form.descripdiag2_SER4B2 = this.SER4B2.REGISTOAUTW.TABLA_DIAG[2].NOMBRE
                let protocolo = { '1': 'P. Urgencias', '2': 'P. Consulta Ext', '3': 'P. Cirugia', '4': 'P. Hospitalizac', '5': 'P. Apoyo Diagno' };
                if (protocolo[this.SER4B2.REGISTOAUTW.GUIA] == undefined) {
                  this.form.protocolo_SER4B2 = ""
                } else {
                  this.form.protocolo_SER4B2 = this.SER4B2.REGISTOAUTW.GUIA + ' - ' + protocolo[this.SER4B2.REGISTOAUTW.GUIA]
                }
                this.tablaautoriz_SER4B2 = this.SER4B2.REGISTOAUTW.TABLA_CUPS
                this.tablaautoriz_SER4B2.pop()
                if (this.form.novedad_SER4B2.substring(0, 1) == '9') {
                  CON851P("02", this._evaluarnro_SER4B2, this._evaluargrabado_SER4B2);
                } else {
                  if (this.form.novedad_SER4B2.substring(0, 1) == '8') {
                    let contado = 0
                    for (var i in this.tablaautoriz_SER4B2) {
                      contado = i++
                    }
                    this.form.item_SER4B2 = contado + 2
                  }
                  this._evaluarpaciente_SER4B2()
                }

              })
              .catch((error) => {
                console.log(error);
                this._evaluarnro_SER4B2()
              });
          }
        },
      );
    },
    _evaluarpaciente_SER4B2() {
      this.SER4B2.CAMBIO = 0;
      if (this.form.novedad_SER4B2.substring(0, 1) == '7') this.form.entidad_SER4B2 = ''
      validarInputs(
        {
          form: "#VALIDARPACIENTE_SER4B2",
          orden: "1",
        },
        () => CON850(this._validarnovedad_SER4B2),
        () => {
          this.form.paciente_SER4B2 = this.form.paciente_SER4B2.toString().padStart(15, '0')
          if (this.form.paciente_SER4B2.trim() == '' || this.form.paciente_SER4B2 == '0') {
            CON851("03", "03", this._evaluarpaciente_SER4B2(), "error", "Error")
          } else {
            let URL = get_url("APP/SALUD/SER810-1.DLL");
            postData({
              datosh: datosEnvio() + this.form.paciente_SER4B2 + "|",
            }, URL)
              .then(data => {
                this.SER4B2.PACIENTEW = data["REG-PACI"];
                this.form.descrippaciente_SER4B2 = this.SER4B2.PACIENTEW[0].DESCRIP
                if (this.form.novedad_SER4B2.substring(0, 1) == '7' && this.form.entidad_SER4B2.trim() == '') {
                  this.form.entidad_SER4B2 = this.SER4B2.PACIENTEW[0].EPS
                  this.form.descripentidad_SER4B2 = this.SER4B2.PACIENTEW[0]['NOMBRE-EPS']
                }
                this._evaluarinicio_SER4B2()
              })
              .catch(error => {
                console.error(error)
                this._evaluarpaciente_SER4B2()
              });
          }
        },
      );
    },
    _evaluarinicio_SER4B2() {
      var datos_envio = datosEnvio() + this.form.paciente_SER4B2 + "|";
      postData({ datosh: datos_envio }, get_url("APP/HICLIN/HC811.DLL"))
        .then((data) => {
          this.SER4B2.VENTAHC = data.datos
          // this.SER4B2.VENTAHC.pop()
          if (data.length == 0) {
            CON851("", "Paciente no tiene historia clinica abierta", setTimeout(this._evaluarunidad_SER4B2, 300), "error", "error");
          } else {
            var $_this = this;
            _ventanaDatos({
              titulo: $_this.form.descrippaciente_SER4B2,
              columnas: ["id", "folio", "nom_serv", "fecha", "hora", "motivo", "medico", "estado"],
              data: $_this.SER4B2.VENTAHC,
              callback_esc: function () {
                setTimeout($_this._evaluarunidad_SER4B2, 300)
              },
              callback: function (data) {
                $_this.form.unidadserv_SER4B2 = data['serv']
                $_this.form.prioridad_SER4B2 = data['triage']
                $_this.SER4B2.MEDICOATENW = data['medico']
                $_this.form.cama_SER4B2 = data['hab']
                postData({ datosh: `${datosEnvio()}${data["id"]}${data["folio"].replace(/-/g, '')}|${localStorage.Usuario}|1|` }, get_url("APP/HICLIN/HC_PRC.DLL"))
                  .then((data) => {
                    console.log(data);
                    $_this.form.diagprincipal_SER4B2 = data.HCPAC.rips.tabla_diag[0].diagn;
                    $_this.form.diag1_SER4B2 = data.HCPAC.rips.tabla_diag[1].diagn;
                    $_this.form.diag2_SER4B2 = data.HCPAC.rips.tabla_diag[2].diagn;
                    setTimeout($_this._evaluarunidad_SER4B2, 300)
                  })
                  .catch((err) => {
                    console.error(err);
                    $_this._evaluarpaciente_SER4B2()
                  });
              }
            });
          }
        })
        .catch((err) => {
          console.error(err);
          this._evaluarpaciente_SER4B2()
        });
    },
    _evaluarunidad_SER4B2() {
      var seleccion = '1';
      for (var i in this.SER4B2.UNIDADSERVICIO) {
        if (this.SER4B2.UNIDADSERVICIO[i].COD.trim() == this.form.unidadserv_SER4B2.substring(0, 2).trim()) {
          seleccion = i;
        }
      }
      POPUP({
        array: this.SER4B2.UNIDADSERVICIO,
        titulo: "UNIDADES DE SERVICIO",
        indices: [
          { id: 'COD', label: 'DESCRIP' }
        ],
        seleccion: this.form.unidadserv_SER4B2.substring(0, 2),
        teclaAlterna: true,
        seleccion: seleccion,
        callback_f: () => {
          setTimeout(this._evaluarpaciente_SER4B2, 300)
        }
      },
        data => {
          this.form.unidadserv_SER4B2 = data.DESCRIP
          setTimeout(this._evaluarcausa_SER4B2, 300)

        }
      );
    },
    _evaluarcausa_SER4B2() {
      var causaext = [
        { 'COD': '01', 'DESCRIP': 'ACCIDENTE TRABAJO' },
        { 'COD': '02', 'DESCRIP': 'ACCIDENTE TRANSITO' },
        { 'COD': '03', 'DESCRIP': 'ACCIDENTE RABICO' },
        { 'COD': '04', 'DESCRIP': 'ACCIDENTE OFIDICO' },
        { 'COD': '05', 'DESCRIP': 'OTRO TIPO DE ACCIDENTE' },
        { 'COD': '06', 'DESCRIP': 'EVENTO CATASTROFIC' },
        { 'COD': '07', 'DESCRIP': 'LESION POR AGRESION' },
        { 'COD': '08', 'DESCRIP': 'LESION AUTOINFLIGIDA' },
        { 'COD': '09', 'DESCRIP': 'SOSP. MALTRATO FISICO' },
        { 'COD': '10', 'DESCRIP': 'SOSP. ABUSO SEXUAL' },
        { 'COD': '11', 'DESCRIP': 'SOSP. VIOLENC. SEXUAL' },
        { 'COD': '12', 'DESCRIP': 'SOSP. MALTRATO EMOCIONAL' },
        { 'COD': '13', 'DESCRIP': 'ENFERMEDAD GENERAL' },
        { 'COD': '14', 'DESCRIP': 'ENFERMEDAD PROFESIONAL' },
        { 'COD': '15', 'DESCRIP': 'OTRA CAUSA' },
      ]
      POPUP(
        {
          array: causaext,
          titulo: "CAUSA EXTERNA",
          indices: [
            {
              id: "COD",
              label: "DESCRIP",
            },
          ],
          seleccion: this.form.origatencion_SER4B2.substring(0, 2),
          callback_f: () => { setTimeout(this._evaluarunidad_SER4B2, 300) },
        },
        causaext => {
          this.form.origatencion_SER4B2 = causaext.COD + ' - ' + causaext.DESCRIP;
          setTimeout(this._evaluarprioridad_SER4B2, 300);
        },
      );
    },
    _evaluarprioridad_SER4B2() {
      var triage = [
        { 'COD': '1', 'DESCRIP': 'Prioritaria' },
        { 'COD': '2', 'DESCRIP': 'No prioritaria' },
      ]
      POPUP(
        {
          array: triage,
          titulo: "CAUSA EXTERNA",
          indices: [
            {
              id: "COD",
              label: "DESCRIP",
            },
          ],
          seleccion: this.form.prioridad_SER4B2.substring(0, 1),
          callback_f: () => {
            setTimeout(this._evaluarcausa_SER4B2, 300)
          },
        },
        triage => {
          this.form.prioridad_SER4B2 = triage.COD + " - " + triage.DESCRIP;
          setTimeout(this._evaluarcama_SER4B2, 300)

        },
      );
    },
    _evaluarcama_SER4B2() {
      validarInputs(
        {
          form: "#VALIDARCAMA_SER4B2",
          orden: "1",
        },
        () => { setTimeout(this._evaluarprioridad_SER4B2, 300) },
        () => {
          if (this.form.cama_SER4B2.trim() == '') {
            this._evaluartiposervicio_SER4B2()
          } else {
            const res = this.SER4B2.CAMAS.find(e => e.COD == this.form.cama_SER4B2);
            if (res == undefined) {
              CON851("01", "01", this._evaluarcama_SER4B2(), "error", "error");
            } else {
              this._evaluartiposervicio_SER4B2()
            }
          }
        },
      );
    },
    _evaluartiposervicio_SER4B2() {
      var tiposerv = [
        { 'COD': '1', 'DESCRIP': 'Posterior Atencion Inic.Urg' },
        { 'COD': '2', 'DESCRIP': 'Servicios Electivos' },
      ]
      POPUP(
        {
          array: tiposerv,
          titulo: "TIPO DE SERVICIOS",
          indices: [
            {
              id: "COD",
              label: "DESCRIP",
            },
          ],
          seleccion: this.form.tiposerv_SER4B2.substring(0, 1),
          callback_f: () => { this._evaluarcama_SER4B2() },
        },
        tiposerv => {
          this.form.tiposerv_SER4B2 = tiposerv.COD + " - " + tiposerv.DESCRIP;
          this._evaluarentidad_SER4B2()
        },
      );
    },
    _evaluarentidad_SER4B2() {
      validarInputs(
        {
          form: "#VALIDARENTIDAD_SER4B2",
          orden: "1",
        },
        () => {
          setTimeout(this._evaluartiposervicio_SER4B2, 300)
        },
        () => {
          this.form.entidad_SER4B2 = this.form.entidad_SER4B2.toUpperCase();
          const res = this.SER4B2.ENTIDADES.find(e => e['COD-ENT'] == this.form.entidad_SER4B2);
          if (res == undefined) {
            this.mostrarmaestropaciente()
          } else {
            this.form.descripentidad_SER4B2 = res['NOMBRE-ENT']
            this._evaluarcupstabla_SER4B2()
          }
        },
      );
    },
    mostrarmaestropaciente() {
      this.mostrarpacientes = true;
      this.datos_pacientes.idpaciente = this.form.paciente_SER4B2
      this.datos_pacientes.novedad = "8"
      setTimeout(() => {
        this.params_pacientes.estado = true;
      }, 300);
    },
    validarEsc_pacientes() {
      this.mostrarpacientes = false;
      setTimeout(() => {
        this.params_pacientes.estado = false;
      }, 300);
      console.log('ESC PACIENTES')
      this._evaluarentidad_SER4B2()
    },
    validarCallback_pacientes() {
      this.mostrarpacientes = false;
      setTimeout(() => {
        this.params_pacientes.estado = false;
      }, 300);
      this._evaluarpaciente_SER4B2()
    },

    ////////////FUNCIONES TABLA//////////////////////////
    _evaluarcupstabla_SER4B2() {
      _FloatText({ estado: "on", msg: [{ mensaje: "Oprima F3 para continuar" }, { mensaje: "Oprima F7 para editar tabla" }], });
      if (this.tablaautoriz_SER4B2.length > 15) this._evaluarjustifica_SER4B2()
      validarInputs(
        {
          form: "#VALIDARCUPS_SER4B2",
          orden: "1",
          event_f3: this._evaluarjustifica_SER4B2,
          event_f7: this._validartabla_SER4B2,

        },
        () => { this._evaluarcama_SER4B2() },
        () => {
          _FloatText({ estado: 'off' })
          postData({
            datosh: datosEnvio() + this.form.codigocups_SER4B2.padEnd(15, ' ') + '|'
          }, get_url("APP/SALUD/SER102C-01.DLL"))
            .then((data) => {
              this.SER4B2.CUPS = data.CUPS[0];
              this.form.descripcups_SER4B2 = this.SER4B2.CUPS.DESCRIP.trim();
              this._evaluarcantidad_SER4B2()

            })
            .catch((error) => {
              console.log(error);
              this._evaluarcupstabla_SER4B2()
            });
        },
      );
    },
    _evaluarcantidad_SER4B2() {
      validarInputs(
        {
          form: "#VALIDARCANT_SER4B2",
          orden: "1",
        },
        () => { this._evaluarcupstabla_SER4B2() },
        () => {
          this.SER4B2.CANTIDADW = cantidad_SER4B2Mask.value.replace(',', '');
          if (this.SER4B2.CANTIDADW == 0) {
            CON851("02", "02", this._evaluarcantidad_SER4B2(), "error", "error");
          } else {
            if (this.SER4B2.CAMBIO == 1) {
              this.tablaautoriz_SER4B2[this.form.item_SER4B2 - 1].CUPS = this.form.codigocups_SER4B2;
              this.tablaautoriz_SER4B2[this.form.item_SER4B2 - 1].DESCRIP_CUP = this.form.descripcups_SER4B2;
              this.tablaautoriz_SER4B2[this.form.item_SER4B2 - 1].CANT = this.SER4B2.CANTIDADW;
            } else {
              this.tablaautoriz_SER4B2.push({
                CUPS: this.form.codigocups_SER4B2,
                DESCRIP_CUP: this.form.descripcups_SER4B2,
                CANT: this.SER4B2.CANTIDADW,
              });
            }
            if (this.SER4B2.CAMBIO == 1) {
              console.log('aca');
              this.SER4B2.CAMBIO = 0;
              this.form.item_SER4B2 = this.tablaautoriz_SER4B2.length + 1;
            } else {
              this.form.item_SER4B2++
            }
            this._iniciliarvartabla_SER4B2()
            this._evaluarcupstabla_SER4B2()
          }
        },
      );
    },
    _iniciliarvartabla_SER4B2() {
      this.form.codigocups_SER4B2 = ''
      this.form.descripcups_SER4B2 = ''
      cantidad_SER4B2Mask.typevalue = ''
    },
    _validartabla_SER4B2() {
      if (this.tablaautoriz_SER4B2.length == 0) {
        this._evaluarcupstabla_SER4B2();
      } else {
        validarTabla(
          {
            tabla: "#TABLAAUTORIZACION_SER4B2",
            orden: "0",
            Supr: data => {
              let posicion = data.cells[0].textContent.trim();
              this.tablaautoriz_SER4B2.splice(posicion, 1);
              this._evaluarcupstabla_SER4B2();
            },
          },
          this._llenartablaeditar_SER4B2,
          this._llenartablaeditar_SER4B2,
          // () => {
          //   this._evaluarcupstabla_SER4B2()
          // },
        );
      }
    },
    _llenartablaeditar_SER4B2(data) {
      this.SER4B2.CAMBIO = 1;
      this.form.item_SER4B2 = data.cells[0].textContent.trim();
      this.form.codigocups_SER4B2 = data.cells[1].textContent.trim();
      this.form.descripcups_SER4B2 = data.cells[2].textContent.trim();
      cantidad_SER4B2Mask.typedValue = data.cells[3].textContent.trim();
      this._evaluarcupstabla_SER4B2()
    },
    _evaluarjustifica_SER4B2() {
      if (this.tablaautoriz_SER4B2.length == 0) {
        CON851('', 'Tabla vacia', this._evaluarcupstabla_SER4B2(), 'error', 'error');
      } else {
        _FloatText({ estado: "on", msg: [{ mensaje: "Oprima F3 para continuar" }], });
        validarInputs(
          {
            form: "#VALIDARJUSTIF_SERAB2",
            orden: "1",
          },
          () => { this._evaluarcupstabla_SER4B2() },
          () => {
            _FloatText({ estado: 'off' })
            this.form.justificacion_SER4B2 = this.form.justificacion_SER4B2.toUpperCase()
            if (this.form.justificacion_SER4B2.trim() == '' && this.form.item_SER4B2 == '1') {
              CON851("02", "02", this._evaluarjustifica_SER4B2(), "error", "error");
            } else {
              if (this.form.justificacion_SER4B2.trim() == '') {
                CON851("02", "02", this._evaluarjustifica_SER4B2(), "error", "error");
              } else {
                this._evaluardiagprinc_SER4B2()
              }
            }
          },
        );
      }
    },
    _evaluardiagprinc_SER4B2() {
      validarInputs(
        {
          form: "#VALIDARDIAGPRINC_SER4B2",
          orden: "1",
        },
        () => { this._evaluarjustifica_SER4B2() },
        () => {
          this.form.diagprincipal_SER4B2 = this.form.diagprincipal_SER4B2.toUpperCase()
          if (this.form.diagprincipal_SER4B2.trim() == '') {
            CON851("02", "02", this._evaluardiagprinc_SER4B2(), "error", "error");
          } else {
            const res = this.SER4B2.ENFERMEDADES.find(e => e.COD_ENF == this.form.diagprincipal_SER4B2);
            if (res == undefined) {
              CON851("01", "01", this._evaluardiagprinc_SER4B2(), "error", "error");
            } else {
              this.form.descripdiagprincipal_SER4B2 = res.NOMBRE_ENF
              this._evaluardiagref1_SER4B2()
            }
          }
        },
      );
    },
    _evaluardiagref1_SER4B2() {
      validarInputs(
        {
          form: "#VALIDARDIAG1_SER4B2",
          orden: "1",
        },
        () => { this._evaluardiagprinc_SER4B2() },
        () => {
          this.form.diag1_SER4B2 = this.form.diag1_SER4B2.toUpperCase()
          if (this.form.diag1_SER4B2.trim() == '') {
            this._evaluardiagref2_SER4B2()
          } else {
            const res = this.SER4B2.ENFERMEDADES.find(e => e.COD_ENF == this.form.diag1_SER4B2);
            if (res == undefined) {
              CON851("01", "01", this._evaluardiagref1_SER4B2(), "error", "error");
            } else {
              this.form.descripdiag1_SER4B2 = res.NOMBRE_ENF
              this._evaluardiagref2_SER4B2()
            }
          }
        },
      );
    },
    _evaluardiagref2_SER4B2() {
      validarInputs(
        {
          form: "#VALIDARDIAG2_SER4B2",
          orden: "1",
        },
        () => { this._evaluardiagref1_SER4B2() },
        () => {
          this.form.diag2_SER4B2 = this.form.diag2_SER4B2.toUpperCase()
          if (this.form.diag2_SER4B2.trim() == '') {
            this._evaluarprotocolo_SER4B2()
          } else {
            const res = this.SER4B2.ENFERMEDADES.find(e => e.COD_ENF == this.form.diag2_SER4B2);
            if (res == undefined) {
              CON851("01", "01", this._evaluardiagref2_SER4B2(), "error", "error");
            } else {
              this.form.descripdiag2_SER4B2 = res.NOMBRE_ENF
              this._evaluarprotocolo_SER4B2()
            }
          }
        },
      );
    },
    _evaluarprotocolo_SER4B2() {
      var guiaw = [
        { 'COD': '1', 'DESCRIP': 'P. Urgencias' },
        { 'COD': '2', 'DESCRIP': 'P. Consulta Ext' },
        { 'COD': '3', 'DESCRIP': 'P. Cirugia' },
        { 'COD': '4', 'DESCRIP': 'P. Hospitalizac' },
        { 'COD': '5', 'DESCRIP': 'P. Apoyo Diagno' },
      ]
      POPUP(
        {
          array: guiaw,
          titulo: "PROTOCOLO",
          indices: [
            {
              id: "COD",
              label: "DESCRIP",
            },
          ],
          seleccion: this.form.protocolo_SER4B2.substring(0, 1),
          callback_f: () => { this._evaluardiagref2_SER4B2() },
        },
        guiaw => {
          this.form.protocolo_SER4B2 = guiaw.COD + " - " + guiaw.DESCRIP;
          this._evaluarcambiarsol_SER4B2()
        },
      );
    },
    _evaluarcambiarsol_SER4B2() {
      solicitantemedMask_SER4B2.typedValue = 'N';
      validarInputs(
        {
          form: "#SOLICITANTE_SER4B2",
          orden: "1",
        }, () => {
          setTimeout(this._evaluarprotocolo_SER4B2, 300)
        },
        () => {
          if (solicitantemedMask_SER4B2.value.trim() == '') solicitantemedMask_SER4B2.typedValue = 'N';
          this._evaluargrabado_SER4B2()
        },
      );
    },
    _evaluargrabado_SER4B2() {
      loader("show");
      if (this.form.novedad_SER4B2.substring(0, 1) == '7') {
        this.SER4B2.OPERCREAW = moment().format("YYMMDD");
        this.SER4B2.FECHACREAW = localStorage.Usuario
        this.SER4B2.OPERMODW = '000000'
        this.SER4B2.FECHAMODW = ''
      } else {
        this.SER4B2.OPERCREAW = this.SER4B2.REGISTOAUTW.OPERELAB
        this.SER4B2.FECHACREAW = this.SER4B2.REGISTOAUTW.FECELAB
        this.SER4B2.OPERMODW = moment().format("YYMMDD");
        this.SER4B2.FECHAMODW = localStorage.Usuario
      }
      var data = {};
      var lin = 1;
      for (var i in this.tablaautoriz_SER4B2) {
        data['LIN-' + lin.toString().padStart(3, '0')] = this.tablaautoriz_SER4B2[i].CUPS + '|' + this.tablaautoriz_SER4B2[i].CANT + '|';
        lin++;
      }
      this.form.justificacion_SER4B2 = this.form.justificacion_SER4B2.replace(/\n/g, "&");
      data.datosh = `${datosEnvio()}${this.form.novedad_SER4B2.substring(0, 1)}|${this.form.suc_SER4B2}|${this.form.numero_SER4B2}|${this.form.fecha_SER4B2.replace(/-/g, '')}|${this.form.hora_SER4B2.replace(/:/, '')}|${this.form.paciente_SER4B2}|${this.form.unidadserv_SER4B2.substring(0, 2)}|${this.form.origatencion_SER4B2.substring(0, 2)}|${this.form.prioridad_SER4B2.substring(0, 1)}|${this.form.cama_SER4B2}|${this.form.tiposerv_SER4B2.substring(0, 1)}|${this.form.entidad_SER4B2}|${this.form.justificacion_SER4B2.substring(0, 80)}|${this.form.justificacion_SER4B2.substring(80, 160)}|${this.form.justificacion_SER4B2.substring(160, 240)}|${this.form.justificacion_SER4B2.substring(240, 320)}|${this.form.justificacion_SER4B2.substring(320, 400)}|${this.form.diagprincipal_SER4B2}|${this.form.diag1_SER4B2}|${this.form.diag2_SER4B2}|${this.form.protocolo_SER4B2.substring(0, 1)}|${this.SER4B2.OPERCREAW}|${this.SER4B2.FECHACREAW}|${this.SER4B2.OPERMODW}|${this.SER4B2.FECHAMODW}|`
      postData(data, get_url("APP/SALUD/SER4B2.DLL"))
        .then(data => {
          console.log(data)
          this.SER4B2.SECUENCIALOCAL = data
          if (this.form.novedad_SER4B2.substring(0, 1) == '7') {
            this.SER4B2.FECHAULTMOV = moment().format("YYMMDD");
            let URL = get_url("APP/CONTAB/CON007X.DLL");
            postData({ datosh: datosEnvio() + this.SER4B2.SECUNUM + '|' + this.SER4B2.FECHAULTMOV + '|' + this.SER4B2.SECUENCIALOCAL + '|' }, URL)
              .then(data => {
                loader("hide");
                this._evaluardatoimpresion_SER4B2()
              })
              .catch(err => {
                console.error(err);
                loader("hide");
                this._evaluarcambiarsol_SER4B2()
              })
          } else {
            loader("hide");
            this._evaluarimpresion_SER4B2()
          }
        })
        .catch(error => {
          console.error(error)
          loader("hide");
          this._evaluarcambiarsol_SER4B2()
        });
    },
    tablasSER4B2(data, width, height, widthcolumna) {
      data = data.split('');
      return {
        table: {
          widths: width,
          heights: height,
          body: [this.construircuerpotabla(data)],
          width: widthcolumna,
        }
      }
    },
    construircuerpotabla(data) {
      console.log(data);
      var body = [];
      data.forEach(function (array) {
        body.push({ text: array, style: 'texto' })
      })
      return body;
    },
    armarcupsSER4B2(data) {
      var tablascups = [];
      tablascups.push([{ text: `Manejo Integral Segun Guia de: ${this.SER4B2.DESCRIPCIONGUIA}`, style: 'texto', colSpan: 2 }, '', ''])
      tablascups.push([{ text: 'Codigo CUPS', style: 'texto', width: '100%', margin: [5, 0] }, { text: 'Cantidad', style: 'texto', width: '100%' }, { text: 'Descripcion', style: 'texto', width: '100%' }])
      for (var i in this.SER4B2.REGISTOAUTW.TABLA_CUPS) {
        if (this.SER4B2.REGISTOAUTW.TABLA_CUPS[i].CUPS.trim() != '') {
          tablascups.push([
            this.tablasSER4B2(this.SER4B2.REGISTOAUTW.TABLA_CUPS[i].CUPS, ['8%', '8%', '8%', '8%', '8%', '8%', '8%', '8%'], '', ''),
            this.tablasSER4B2(parseInt(this.SER4B2.REGISTOAUTW.TABLA_CUPS[i].CANT).toString().padStart(3, '0'), ['5%', '5%', '5%'], '', ''),
            { text: this.SER4B2.REGISTOAUTW.TABLA_CUPS[i].DESCRIP_CUP, style: 'texto' }
          ])
        }
      }
      return tablascups;
    },
    _evaluardatoimpresion_SER4B2() {
      postData({
        datosh: datosEnvio() + '1|' + this.form.suc_SER4B2 + this.form.numero_SER4B2 + '|'
      }, get_url("APP/SALUD/SER4B3.DLL"))
        .then((data) => {
          this.SER4B2.REGISTOAUTW = data.DATOAUTORIZ[0];
          this._evaluarimpresion_SER4B2()
        })
        .catch((error) => {
          console.log(error);
          this._evaluarnro_SER4B2()
        });
    },
    _evaluarimpresion_SER4B2() {
      var tablascups = [];
      for (var i in this.SER4B2.REGISTOAUTW.TABLA_CUPS) {
        if (this.SER4B2.REGISTOAUTW.TABLA_CUPS[i].CUPS.trim() != '') {
          tablascups.push(
            this.tablasSER4B2(this.SER4B2.REGISTOAUTW.TABLA_CUPS[i].CUPS, ['8%', '8%', '8%', '8%', '8%', '8%', '8%', '8%'], '', ''),
            this.tablasSER4B2(parseInt(this.SER4B2.REGISTOAUTW.TABLA_CUPS[i].CANT).toString().padStart(3, '0'), ['5%', '5%', '5%'], '', ''),
            { text: this.SER4B2.REGISTOAUTW.TABLA_CUPS[i].DESCRIP_CUP, style: 'texto' }
          )
        }
      }
      this.SER4B2.TABLACUPS = tablascups;
      var RC = TI = ASI = CC = MSI = CE = PA = ' ';
      if (this.SER4B2.REGISTOAUTW.TIPOIDPACI.substring(0, 2) == 'CC') CC = 'X'
      if (this.SER4B2.REGISTOAUTW.TIPOIDPACI.substring(0, 2) == 'CE') CE = 'X'
      if (this.SER4B2.REGISTOAUTW.TIPOIDPACI.substring(0, 2) == 'PA') PA = 'X'
      if (this.SER4B2.REGISTOAUTW.TIPOIDPACI.substring(0, 2) == 'TI') TI = 'X'
      if (this.SER4B2.REGISTOAUTW.TIPOIDPACI.substring(0, 2) == 'RC') RC = 'X'
      if (this.SER4B2.REGISTOAUTW.TIPOIDPACI.substring(0, 2) == 'AS') ASI = 'X'
      if (this.SER4B2.REGISTOAUTW.TIPOIDPACI.substring(0, 2) == 'MS') MSI = 'X'
      var CONTRIBUTIVO = SUBSIDIADO = OTRO = DESPLAZADO = VINCULADO = ' ';
      if (this.SER4B2.REGISTOAUTW.TIPOPACI == 'C') CONTRIBUTIVO = 'X'
      else if (this.SER4B2.REGISTOAUTW.TIPOPACI == 'S') SUBSIDIADO = 'X'
      else if (this.SER4B2.REGISTOAUTW.TIPOPACI == 'V') VINCULADO = 'X'
      else if (this.SER4B2.REGISTOAUTW.TIPOPACI == 'O') OTRO = 'X'
      else DESPLAZADO = 'X'
      var ENFERMEDADOTRO = ENFERMEDADGENERAL = ACCIDENTETRABAJO = EVENTOCATASTROFICO = ENFERMEDADPROFESIONAL = ACCIDENTETRANSITO = ' ';
      if (this.SER4B2.REGISTOAUTW.CAUSA == '01') ACCIDENTETRABAJO = 'X'
      else if (this.SER4B2.REGISTOAUTW.CAUSA == '06') EVENTOCATASTROFICO = 'X'
      else if (this.SER4B2.REGISTOAUTW.CAUSA == '14') ENFERMEDADPROFESIONAL = 'X'
      else if (this.SER4B2.REGISTOAUTW.CAUSA == '02') ACCIDENTETRANSITO = 'X'
      else if (this.SER4B2.REGISTOAUTW.CAUSA == '13') ENFERMEDADGENERAL = 'X'
      else ENFERMEDADOTRO = 'X'
      var POSTERIORATENCION = SERVICIOSELECTIVOS = ' '
      if (this.SER4B2.REGISTOAUTW.TIPO == '1') POSTERIORATENCION = 'X'
      if (this.SER4B2.REGISTOAUTW.TIPO == '2') SERVICIOSELECTIVOS = 'X'
      var PRIORITARIA = NOPRIORITARIA = ' '
      if (this.SER4B2.REGISTOAUTW.TRIAGE == '1') PRIORITARIA = 'X'
      if (this.SER4B2.REGISTOAUTW.TRIAGE == '2') NOPRIORITARIA = 'X'
      var CONSULTAEXTERNA = HOSPITALIZACION = URGENCIAS = ' '
      if (this.SER4B2.REGISTOAUTW.PUERTA == '01') URGENCIAS = 'X'
      if (this.SER4B2.REGISTOAUTW.PUERTA == '02') CONSULTAEXTERNA = 'X'
      if (this.SER4B2.REGISTOAUTW.PUERTA == '03') HOSPITALIZACION = 'X'
      this.SER4B2.DESCRIPCIONGUIA = ' ';
      if (this.SER4B2.REGISTOAUTW.GUIA == '1') this.SER4B2.DESCRIPCIONGUIA = 'Protocolo de Urgencias'
      if (this.SER4B2.REGISTOAUTW.GUIA == '2') this.SER4B2.DESCRIPCIONGUIA = 'Protocolo de Consulta Externa'
      if (this.SER4B2.REGISTOAUTW.GUIA == '3') this.SER4B2.DESCRIPCIONGUIA = 'Protocolo de Cirugia'
      if (this.SER4B2.REGISTOAUTW.GUIA == '4') this.SER4B2.DESCRIPCIONGUIA = 'Protocolo de Hospitalizacion'
      if (solicitantemedMask_SER4B2.value.trim() == 'S') {
        NOMBREQUIENINFORMA = this.SER4B2.REGISTOAUTW.NOM_MEDICO;
        CARGOACTIVIDAD = this.SER4B2.REGISTOAUTW.DETALLE_MEDICO;
      } else {
        NOMBREQUIENINFORMA = localStorage.Nombre;
        CARGOACTIVIDAD = 'FRONT URGENCIAS';
      }
      var _this = this
      var dd = {
        pageSize: "LETTER",
        pageMargins: [15, 77, 15, 10],
        header: function (currentPage, pageCount, pageSize) {
          // you can apply any logic and return any valid pdfmake element
          return [
            {
              image: "logo",
              fit: [60, 40],
              absolutePosition: { x: 10, y: 10 },
            },
            { text: "MINISTERIO DE LA PROTECCION SOCIAL", style: 'textomayus' },
            { text: "SOLICITUD DE AUTORIZACION DE SERVICIOS DE SALUD", style: 'textomayus' },
            { text: " " },
            {
              columns: [
                {
                  text: 'NUMERO DE SOLICITUD', width: '30%', alignment: 'right', fontSize: 9, bold: true, margin: [0, 0, 4, 0]
                },
                _this.tablasSER4B2(_this.form.numero_SER4B2.padStart(6, ' '), ['16.6%', '16.6%', '16.6%', '16.6%', '16.6%', '16.6%'], '', '10%'),
                {
                  text: 'FECHA', width: '10%', style: 'titulos1'
                },
                _this.tablasSER4B2(_this.SER4B2.REGISTOAUTW.FECHA, ['10%', '10%', '10%', '10%', '10%', '10%', '10%', '10%', '10%', '10%'], '', '20%'),
                {
                  text: 'HORA', width: '10%', style: 'titulos1'
                },
                _this.tablasSER4B2(_this.SER4B2.REGISTOAUTW.HORA, ['20%', '20%', '20%', '20%'], '', '10%'),
              ]
            },
            {
              text: ' '
            },
            {
              text: 'INFORMACION DEL PRESTADOR (solicitante)', style: 'titulos2', margin: [15, 0, 0, 0]
            }
          ]
        },
        content: [
          {
            columns: [
              {
                table: {
                  widths: ['100%'],
                  body: [
                    [{ text: 'NOMBRE' }]
                  ]
                },
                style: 'texto',
                width: '65%'
              },
              {
                text: 'NIT', width: '10%', style: 'textocentrado',
              },
              {
                table: {
                  widths: ['100%'],
                  body: [
                    [{ text: 'X' }]
                  ]
                },
                style: 'texto',
                width: '3%'
              },
              {
                text: ' ', width: '2%',
              },
              _this.tablasSER4B2(`${$_USUA_GLOBAL[0].NIT.toString().padStart(10, ' ')}-${$_USUA_GLOBAL[0].DV}`, ['8.3%', '8.3%', '8.3%', '8.3%', '8.3%', '8.3%', '8.3%', '8.3%', '8.3%', '8.3%', '8.3%', '8.3%'], '', '20%'),
            ]
          },
          {
            columns: [
              {
                table: {
                  widths: ['100%'],
                  body: [
                    [{ text: $_USUA_GLOBAL[0].NOMBRE }]
                  ]
                },
                style: 'texto',
                width: '65%'
              },
              {
                text: 'CC', width: '10%', style: 'textocentrado',
              },
              {
                table: {
                  widths: ['100%'],
                  body: [
                    [{ text: ' ' }]
                  ]
                },
                style: 'texto',
                width: '3%'
              },
              {
                text: ' ', width: '2%',
              },
              {
                table: {
                  widths: ['85%', '15%'],
                  body: [
                    [{ text: 'NUMERO' }, { text: 'DV' }]
                  ]
                },
                style: 'texto',
                width: '20%'
              },
            ]
          },
          {
            columns: [
              {
                table: {
                  widths: ['100%'],
                  body: [
                    ['CODIGO']
                  ]
                },
                style: 'texto',
                width: '10%'
              },
              _this.tablasSER4B2(`${$_USUA_GLOBAL[0].COD_CIUD}${$_USUA_GLOBAL[0].NUIR}${$_USUA_GLOBAL[0].PREFIJ}`, ['8.3%', '8.3%', '8.3%', '8.3%', '8.3%', '8.3%', '8.3%', '8.3%', '8.3%', '8.3%', '8.3%', '8.3%'], '', '25%'),
              {
                table: {
                  widths: ['100%'],
                  body: [
                    [{ text: `DIRECCION PRESTADOR     ${$_USUA_GLOBAL[0].DIRECC}` }]
                  ]
                },
                style: 'texto',
                width: '65%'
              },
            ]
          },
          {
            columns: [
              {
                table: {
                  widths: ['100%'],
                  body: [
                    ['TELEFONO']
                  ]
                },
                style: 'texto',
                width: '10%'
              },
              _this.tablasSER4B2(`${$_USUA_GLOBAL[0].TEL}`, ['6.6%', '6.6%', '6.6%', '6.6%', '6.6%', '6.6%', '6.6%', '6.6%', '6.6%', '6.6%', '6.6%', '6.6%', '6.6%', '6.6%', '6.6%'], '', '25%'),
              {
                table: {
                  widths: ['100%'],
                  body: [
                    [{ text: ' ' }]
                  ]
                },
                style: 'texto',
                width: '65%'
              },
            ]
          },
          {
            columns: [
              {
                table: {
                  widths: ['100%'],
                  body: [
                    [' ']
                  ]
                },
                style: 'texto',
                width: '10%'
              },
              {
                table: {
                  widths: ['30%', '70%'],
                  body: [
                    [{ text: 'Indicat' }, { text: 'Numero' }]
                  ]
                },
                style: 'texto',
                width: '25%'
              },
              {
                table: {
                  widths: ['100%'],
                  body: [
                    [{ text: `Departamento:    ${$_USUA_GLOBAL[0].NOMBRE_DEP}` }]
                  ]
                },
                style: 'texto',
                width: '28%'
              },
              {
                table: {
                  widths: ['50%', '50%'],
                  body: [
                    [{ text: $_USUA_GLOBAL[0].COD_CIUD.substring(0, 1) }, { text: $_USUA_GLOBAL[0].COD_CIUD.substring(1, 2) }]
                  ]
                },
                style: 'texto',
                width: '4%'
              },
              {
                table: {
                  widths: ['100%'],
                  body: [
                    [{ text: `Municipio:    ${$_USUA_GLOBAL[0].NOMBRE_CIU}` }]
                  ]
                },
                style: 'texto',
                width: '28%'
              },
              {
                table: {
                  widths: ['30%', '30%', '30%'],
                  body: [
                    [{ text: $_USUA_GLOBAL[0].COD_CIUD.substring(2, 3) }, { text: $_USUA_GLOBAL[0].COD_CIUD.substring(3, 4) }, { text: $_USUA_GLOBAL[0].COD_CIUD.substring(4, 5) }]
                  ]
                },
                style: 'texto',
                width: '5%'
              },
            ]
          },
          {
            columns: [
              {
                table: {
                  widths: ['100%'],
                  body: [
                    [{ text: `ENTIDAD A LA QUE SE LE INFORMA (PAGADOR)       ${_this.SER4B2.REGISTOAUTW.NOMB_ENT}` }]
                  ]
                },
                style: 'texto',
                width: '60%'
              },
              {
                table: {
                  widths: ['100%'],
                  body: [
                    [{ text: 'CODIGO' }]
                  ]
                },
                style: 'texto',
                width: '30.5%'
              },
              _this.tablasSER4B2(_this.SER4B2.REGISTOAUTW.ENTID, ['12,5%', '12,5%', '12,5%', '12,5%', '12,5%', '12,5%'], '', '24%'),
            ]
          },
          {
            columns: [
              {
                table: {
                  widths: ['100%'],
                  body: [
                    [{ text: 'DATOS DEL PACIENTE' }]
                  ]
                },
                style: 'titulos1',
                width: '100%'
              },
            ]
          },
          {
            columns: [
              {
                table: {
                  widths: ['25%', '25%', '25%', '25%'],
                  body: [
                    [{ text: _this.SER4B2.REGISTOAUTW.APELPACI1 }, { text: _this.SER4B2.REGISTOAUTW.APELPACI2 }, { text: _this.SER4B2.REGISTOAUTW.NOMPACI1 }, { text: _this.SER4B2.REGISTOAUTW.NOMPACI2 }]
                  ]
                },
                style: 'texto',
                width: '100%'
              },
            ]
          },
          {
            table: {
              widths: ['25%', '25%', '25%', '25%'],
              body: [
                [{ text: '1er Apellido', style: 'texto' }, { text: '2do Apellido', style: 'texto' }, { text: '1er Nombre', style: 'texto' }, { text: '2do Nombre', style: 'texto' }],
                [{ text: 'Tipo documento de identificación', style: 'texto' }, '', '', ''],
                [{
                  columns: [
                    {
                      table: {
                        widths: ['100%'],
                        body: [
                          [{ text: RC }]
                        ]
                      },
                      style: 'texto',
                      width: '10%'
                    },
                    { text: 'Registro civil', style: 'texto' }
                  ]
                }, {
                  columns: [
                    {
                      table: {
                        widths: ['100%'],
                        body: [
                          [{ text: PA }]
                        ]
                      },
                      style: 'texto',
                      width: '10%'
                    },
                    { text: 'Pasaporte', style: 'texto' }
                  ]
                },
                _this.tablasSER4B2(_this.SER4B2.REGISTOAUTW.ID, ['6.6%', '6.6%', '6.6%', '6.6%', '6.6%', '6.6%', '6.6%', '6.6%', '6.6%', '6.6%', '6.6%', '6.6%', '6.6%', '6.6%', '6.6%'], '', ''), ''],
                [{
                  columns: [
                    {
                      table: {
                        widths: ['100%'],
                        body: [
                          [{ text: TI }]
                        ]
                      },
                      style: 'texto',
                      width: '10%'
                    },
                    { text: 'Tarjeta de identidad', style: 'texto' }
                  ]
                }, {
                  columns: [
                    {
                      table: {
                        widths: ['100%'],
                        body: [
                          [{ text: ASI }]
                        ]
                      },
                      style: 'texto',
                      width: '10%'
                    },
                    { text: 'Adulto sin identificación', style: 'texto' }
                  ]
                }, { text: 'Numero documento de identificación', style: 'texto' }, ''],
                [{
                  columns: [
                    {
                      table: {
                        widths: ['100%'],
                        body: [
                          [{ text: CC }]
                        ]
                      },
                      style: 'texto',
                      width: '10%'
                    },
                    { text: 'Cedula de ciudadania', style: 'texto' }
                  ]
                }, {
                  columns: [
                    {
                      table: {
                        widths: ['100%'],
                        body: [
                          [{ text: MSI }]
                        ]
                      },
                      style: 'texto',
                      width: '10%'
                    },
                    { text: 'Menor sin identificación', style: 'texto' }
                  ]
                }, '', ''],
                [{
                  columns: [
                    {
                      table: {
                        widths: ['100%'],
                        body: [
                          [{ text: CE }]
                        ]
                      },
                      style: 'texto',
                      width: '10%'
                    },
                    { text: 'Cedula de Extranjeria', style: 'texto' }
                  ]
                }, '', {
                  columns: [
                    {
                      text: 'FECHA DE NACIMIENTO', width: '30%', style: 'texto'
                    },
                    _this.tablasSER4B2(_this.SER4B2.REGISTOAUTW.NACIMPACI, ['10%', '10%', '10%', '10%', '10%', '10%', '10%', '10%', '10%', '10%'], '', '40%'),
                  ],
                  colSpan: 2
                }, ''],
              ],
            },
            layout: {
              hLineColor: function (i, node) {
                return (i === 0 || i === node.table.body.length) ? 'black' : 'white';
              },
              vLineColor: function (i, node) {
                return (i === 0 || i === node.table.widths.length) ? 'black' : 'white';
              },
              paddingLeft: function (i, node) { return 0; },
              paddingRight: function (i, node) { return 0; },
              paddingTop: function (i, node) { return 0; },
              paddingBottom: function (i, node) { return 0; }
            },
          },
          {
            columns: [
              {
                table: {
                  widths: ['100%'],
                  body: [
                    [{ text: `Dirección de Residencia Habitual           ${_this.SER4B2.REGISTOAUTW.DIRECCPACI}` }]
                  ]
                },
                style: 'texto',
                width: '60%'
              },
              {
                table: {
                  widths: ['100%'],
                  body: [
                    [{ text: 'TELEFONO' }]
                  ]
                },
                style: 'texto',
                width: '16%'
              },
              _this.tablasSER4B2(_this.SER4B2.REGISTOAUTW.TELPACI.padStart(15, ' '), ['6.6%', '6.6%', '6.6%', '6.6%', '6.6%', '6.6%', '6.6%', '6.6%', '6.6%', '6.6%', '6.6%', '6.6%', '6.6%', '6.6%', '6.6%'], '', '30%'),
            ]
          },
          {
            columns: [
              {
                table: {
                  widths: ['100%'],
                  body: [
                    [{ text: `Departamento:  ${_this.SER4B2.REGISTOAUTW.NOMDEP_PACI}` }]
                  ]
                },
                style: 'texto',
                width: '47%'
              },
              _this.tablasSER4B2(_this.SER4B2.REGISTOAUTW.CODCIU_PACI.substring(0, 2), ['50%', '50%'], '', '5%'),
              {
                table: {
                  widths: ['100%'],
                  body: [
                    [{ text: `Municipio:  ${_this.SER4B2.REGISTOAUTW.NOMMUN_PACI}` }]
                  ]
                },
                style: 'texto',
                width: '40%'
              },
              _this.tablasSER4B2(_this.SER4B2.REGISTOAUTW.CODCIU_PACI.substring(2, 5), ['33%', '33%', '34%'], '', '8%'),
            ]
          },
          {
            columns: [
              {
                table: {
                  widths: ['100%'],
                  body: [
                    [{ text: 'Telefono Celular: ' }]
                  ]
                },
                style: 'texto',
                width: '16%'
              },
              _this.tablasSER4B2(_this.SER4B2.REGISTOAUTW.CELL_PACI.padStart(15, ' '), ['6.6%', '6.6%', '6.6%', '6.6%', '6.6%', '6.6%', '6.6%', '6.6%', '6.6%', '6.6%', '6.6%', '6.6%', '6.6%', '6.6%', '6.6%'], '', '24%'),
              {
                table: {
                  widths: ['100%'],
                  body: [
                    [{ text: 'Correo Electronico ' }]
                  ]
                },
                style: 'texto',
                width: '60%'
              },
            ]
          },
          {
            table: {
              widths: ['25%', '25%', '25%', '25%'],
              body: [
                [
                  { text: 'Cobertura en Salud', style: 'texto' }, '', '', ''
                ],
                [
                  {
                    columns: [
                      {
                        table: {
                          widths: ['100%'],
                          body: [
                            [{ text: CONTRIBUTIVO }]
                          ]
                        },
                        style: 'texto',
                        width: '10%'
                      },
                      { text: 'Regimen contributivo', style: 'texto' }
                    ]
                  }, {
                    columns: [
                      {
                        table: {
                          widths: ['100%'],
                          body: [
                            [{ text: ' ' }]
                          ]
                        },
                        style: 'texto',
                        width: '10%'
                      },
                      { text: 'Regimen subsidiado-pacial', style: 'texto' }
                    ]
                  }, {
                    columns: [
                      {
                        table: {
                          widths: ['100%'],
                          body: [
                            [{ text: VINCULADO }]
                          ]
                        },
                        style: 'texto',
                        width: '10%'
                      },
                      { text: 'Poblacion pobre no asegurada sin SISBEN', style: 'texto' }
                    ]
                  }, {
                    columns: [
                      {
                        table: {
                          widths: ['100%'],
                          body: [
                            [{ text: ' ' }]
                          ]
                        },
                        style: 'texto',
                        width: '10%'
                      },
                      { text: 'Plan adicional de salud', style: 'texto' }
                    ]
                  }
                ],
                [
                  {
                    columns: [
                      {
                        table: {
                          widths: ['100%'],
                          body: [
                            [{ text: SUBSIDIADO }]
                          ]
                        },
                        style: 'texto',
                        width: '10%'
                      },
                      { text: 'Regimen subsidiado-total', style: 'texto' }
                    ]
                  }, {
                    columns: [
                      {
                        table: {
                          widths: ['100%'],
                          body: [
                            [{ text: ' ' }]
                          ]
                        },
                        style: 'texto',
                        width: '10%'
                      },
                      { text: 'Poblacion pobre no asegurada con SISBEN', style: 'texto' }
                    ]
                  }, {
                    columns: [
                      {
                        table: {
                          widths: ['100%'],
                          body: [
                            [{ text: DESPLAZADO }]
                          ]
                        },
                        style: 'texto',
                        width: '10%'
                      },
                      { text: 'Desplazado', style: 'texto' }
                    ]
                  }, {
                    columns: [
                      {
                        table: {
                          widths: ['100%'],
                          body: [
                            [{ text: OTRO }]
                          ]
                        },
                        style: 'texto',
                        width: '10%'
                      },
                      { text: 'Otro', style: 'texto' }
                    ]
                  }
                ],
              ],
            },
            layout: {
              hLineColor: function (i, node) {
                return (i === 0 || i === node.table.body.length) ? 'black' : 'white';
              },
              vLineColor: function (i, node) {
                return (i === 0 || i === node.table.widths.length) ? 'black' : 'white';
              },
              paddingLeft: function (i, node) { return 0; },
              paddingRight: function (i, node) { return 0; },
              paddingTop: function (i, node) { return 0; },
              paddingBottom: function (i, node) { return 0; }
            },
          },
          {
            columns: [
              {
                table: {
                  widths: ['100%'],
                  body: [
                    [{ text: 'INFORMACION DE LA ATENCION Y SERVICIOS SOLICITADOS' }]
                  ]
                },
                style: 'titulos1',
                width: '100%'
              },
            ]
          },
          {
            table: {
              widths: ['20%', '20%', '20%', '20%', '20%'],
              body: [
                [{ text: 'Origen de la Atencion', style: 'texto' }, '', '', { text: 'Tipo de Servicio Solicitados', style: 'texto' }, { text: 'Prioridad de la Atencion', style: 'texto' }],
                [{
                  columns: [
                    {
                      table: {
                        widths: ['100%'],
                        body: [
                          [{ text: ENFERMEDADGENERAL }]
                        ]
                      },
                      style: 'texto',
                      width: '10%'
                    },
                    { text: 'Enfermedad General', style: 'texto' }
                  ]
                }, {
                  columns: [
                    {
                      table: {
                        widths: ['100%'],
                        body: [
                          [{ text: ACCIDENTETRABAJO }]
                        ]
                      },
                      style: 'texto',
                      width: '10%'
                    },
                    { text: 'Accidente de Trabajo', style: 'texto' }
                  ]
                }, {
                  columns: [
                    {
                      table: {
                        widths: ['100%'],
                        body: [
                          [{ text: EVENTOCATASTROFICO }]
                        ]
                      },
                      style: 'texto',
                      width: '10%'
                    },
                    { text: 'Evento Catastrofico', style: 'texto' }
                  ]
                },
                {
                  columns: [
                    {
                      table: {
                        widths: ['100%'],
                        body: [
                          [{ text: POSTERIORATENCION }]
                        ]
                      },
                      style: 'texto',
                      width: '10%'
                    },
                    { text: 'Posterior a la Atencion Inicial de Urgencias', style: 'texto' }
                  ]
                },
                {
                  columns: [
                    {
                      table: {
                        widths: ['100%'],
                        body: [
                          [{ text: PRIORITARIA }]
                        ]
                      },
                      style: 'texto',
                      width: '10%'
                    },
                    { text: 'Prioritaria', style: 'texto' }
                  ]
                }
                ],
                [{
                  columns: [
                    {
                      table: {
                        widths: ['100%'],
                        body: [
                          [{ text: ENFERMEDADPROFESIONAL }]
                        ]
                      },
                      style: 'texto',
                      width: '10%'
                    },
                    { text: 'Enfermedad Profesional', style: 'texto' }
                  ]
                }, {
                  columns: [
                    {
                      table: {
                        widths: ['100%'],
                        body: [
                          [{ text: ACCIDENTETRANSITO }]
                        ]
                      },
                      style: 'texto',
                      width: '10%'
                    },
                    { text: 'Accidente de Transito', style: 'texto' }
                  ]
                }, {
                  columns: [
                    {
                      table: {
                        widths: ['100%'],
                        body: [
                          [{ text: ENFERMEDADOTRO }]
                        ]
                      },
                      style: 'texto',
                      width: '10%'
                    },
                    { text: 'Otro tipo', style: 'texto' }
                  ]
                },
                {
                  columns: [
                    {
                      table: {
                        widths: ['100%'],
                        body: [
                          [{ text: SERVICIOSELECTIVOS }]
                        ]
                      },
                      style: 'texto',
                      width: '10%'
                    },
                    { text: 'Servicios Electivos', style: 'texto' }
                  ]
                },
                {
                  columns: [
                    {
                      table: {
                        widths: ['100%'],
                        body: [
                          [{ text: NOPRIORITARIA }]
                        ]
                      },
                      style: 'texto',
                      width: '10%'
                    },
                    { text: 'No prioritaria', style: 'texto' }
                  ]
                }
                ],
              ],
            },
            layout: {
              hLineColor: function (i, node) {
                return (i === 0 || i === node.table.body.length) ? 'black' : 'white';
              },
              vLineColor: function (i, node) {
                return (i === 0 || i === node.table.widths.length) ? 'black' : 'white';
              },
              paddingLeft: function (i, node) { return 0; },
              paddingRight: function (i, node) { return 0; },
              paddingTop: function (i, node) { return 0; },
              paddingBottom: function (i, node) { return 0; }
            },
          },
          {
            table: {
              widths: ['25%', '20%', '30%', '25%'],
              body: [
                [{ text: 'Ubicacion del paciente al momento de la solicitud de autorización:', style: 'texto', colSpan: 2 }, '', '', ''],
                [
                  {
                    columns: [
                      {
                        table: {
                          widths: ['100%'],
                          body: [
                            [{ text: CONSULTAEXTERNA }]
                          ]
                        },
                        style: 'texto',
                        width: '10%'
                      },
                      { text: 'Consulta Externa', style: 'texto' }
                    ]
                  }, {
                    columns: [
                      {
                        table: {
                          widths: ['100%'],
                          body: [
                            [{ text: HOSPITALIZACION }]
                          ]
                        },
                        style: 'texto',
                        width: '10%'
                      },
                      { text: 'Hospitalizacion', style: 'texto' }
                    ]
                  }, {
                    columns: [
                      { text: 'Servicios', style: 'texto' },
                      {
                        table: {
                          widths: ['100%'],
                          body: [
                            [{ text: _this.SER4B2.REGISTOAUTW.DESCRIPSERVICIO }]
                          ]
                        },
                        style: 'texto',
                        width: '80%'
                      },
                    ]
                  }, {
                    columns: [
                      {
                        text: 'Cama', width: '30%', style: 'texto', margin: [10, 0]
                      },
                      _this.tablasSER4B2(_this.SER4B2.REGISTOAUTW.CAMA, ['20%', '20%', '20%', '20%'], '', '30%'),
                    ]
                  }
                ],
                [
                  {
                    columns: [
                      {
                        table: {
                          widths: ['100%'],
                          body: [
                            [{ text: URGENCIAS }]
                          ]
                        },
                        style: 'texto',
                        width: '10%'
                      },
                      { text: 'Urgencias', style: 'texto' }
                    ]
                  }, '', '', ''
                ],
              ],
            },
            layout: {
              hLineColor: function (i, node) {
                return (i === 0 || i === node.table.body.length) ? 'black' : 'white';
              },
              vLineColor: function (i, node) {
                return (i === 0 || i === node.table.widths.length) ? 'black' : 'white';
              },
              paddingLeft: function (i, node) { return 0; },
              paddingRight: function (i, node) { return 0; },
              paddingTop: function (i, node) { return 0; },
              paddingBottom: function (i, node) { return 0; }
            },
          },
          {
            table: {
              widths: ['33%', '33%', '34%'],
              heights: ['auto', 'auto', 'auto'],
              dontBreakRows: true,
              body:
                _this.armarcupsSER4B2(this.SER4B2.REGISTOAUTW.TABLA_CUPS),
            },
            layout: {
              hLineColor: function (i, node) {
                return (i === 0 || i === node.table.body.length) ? 'black' : 'white';
              },
              vLineColor: function (i, node) {
                return (i === 0 || i === node.table.widths.length) ? 'black' : 'white';
              },
              paddingLeft: function (i, node) { return 0; },
              paddingRight: function (i, node) { return 0; },
              paddingTop: function (i, node) { return 0; },
              paddingBottom: function (i, node) { return 0; }
            },
          },
          {
            table: {
              widths: ['70%', '30%'],
              body: [
                [{ text: 'Justificacion Clinica', style: 'texto' }, ''],
                [{ text: `${_this.SER4B2.REGISTOAUTW.TABLA_JUST[0].JUSTIF}${_this.SER4B2.REGISTOAUTW.TABLA_JUST[1].JUSTIF}${_this.SER4B2.REGISTOAUTW.TABLA_JUST[2].JUSTIF}${_this.SER4B2.REGISTOAUTW.TABLA_JUST[3].JUSTIF}${_this.SER4B2.REGISTOAUTW.TABLA_JUST[4].JUSTIF}`, style: 'texto' }, ''],
              ],
            },
            layout: {
              hLineColor: function (i, node) {
                return (i === 0 || i === node.table.body.length) ? 'black' : 'white';
              },
              vLineColor: function (i, node) {
                return (i === 0 || i === node.table.widths.length) ? 'black' : 'white';
              },
              paddingLeft: function (i, node) { return 0; },
              paddingRight: function (i, node) { return 0; },
              paddingTop: function (i, node) { return 0; },
              paddingBottom: function (i, node) { return 0; }
            },
          },
          {
            table: {
              widths: ['33%', '13%', '54%'],
              body: [
                [{ text: 'Impresion Diagnostica', style: 'texto' }, { text: 'Codigo CIE10', style: 'texto' }, { text: 'Descripción', style: 'texto' },],
              ]
            },
            layout: {
              hLineColor: function (i, node) {
                return (i === 0 || i === node.table.body.length) ? 'black' : 'white';
              },
              vLineColor: function (i, node) {
                return (i === 0 || i === node.table.widths.length) ? 'black' : 'white';
              },
              paddingLeft: function (i, node) { return 0; },
              paddingRight: function (i, node) { return 0; },
              paddingTop: function (i, node) { return 0; },
              paddingBottom: function (i, node) { return 0; }
            },
          },
          {
            table: {
              widths: ['33%', '13%', '54%'],
              dontBreakRows: true,
              body: [
                [
                  { text: 'Diagnostico Principal', style: 'texto' },
                  _this.tablasSER4B2(_this.SER4B2.REGISTOAUTW.TABLA_DIAG[0].DIAG, ['5%', '5%', '5%', '5%'], '', '30%'),
                  { text: _this.SER4B2.REGISTOAUTW.TABLA_DIAG[0].NOMBRE, style: 'texto' }
                ],
                [
                  { text: 'Diagnostico Relacionado 1', style: 'texto' },
                  _this.tablasSER4B2(_this.SER4B2.REGISTOAUTW.TABLA_DIAG[1].DIAG, ['5%', '5%', '5%', '5%'], '', '30%'),
                  { text: _this.SER4B2.REGISTOAUTW.TABLA_DIAG[1].NOMBRE, style: 'texto' }
                ],
                [
                  { text: 'Diagnostico Relacionado 2', style: 'texto' },
                  _this.tablasSER4B2(_this.SER4B2.REGISTOAUTW.TABLA_DIAG[2].DIAG, ['5%', '5%', '5%', '5%'], '', '30%'),
                  { text: _this.SER4B2.REGISTOAUTW.TABLA_DIAG[2].NOMBRE, style: 'texto' }
                ],
                [
                  { text: 'Diagnostico Relacionado 3', style: 'texto' },
                  _this.tablasSER4B2(_this.SER4B2.REGISTOAUTW.TABLA_DIAG[3].DIAG, ['5%', '5%', '5%', '5%'], '', '30%'),
                  { text: _this.SER4B2.REGISTOAUTW.TABLA_DIAG[3].NOMBRE, style: 'texto' }
                ],
              ]
            },
            layout: {
              hLineColor: function (i, node) {
                return (i === 0 || i === node.table.body.length) ? 'black' : 'white';
              },
              vLineColor: function (i, node) {
                return (i === 0 || i === node.table.widths.length) ? 'black' : 'white';
              },
              paddingLeft: function (i, node) { return 0; },
              paddingRight: function (i, node) { return 0; },
              paddingTop: function (i, node) { return 0; },
              paddingBottom: function (i, node) { return 0; }
            },
          },
          {
            table: {
              dontBreakRows: true,
              widths: ['100%'],
              body: [
                [{ text: 'INFORMACION DE LA PERSONA QUE INFORMA', style: 'titulos1' }],
              ],
            },
          },
          {
            table: {
              dontBreakRows: true,
              widths: ['54%', '10%', '36%'],
              body: [
                [
                  { text: 'Nombre de quien informa', style: 'texto' },
                  { text: 'Telefono:', style: 'texto' },
                  _this.tablasSER4B2(`${$_USUA_GLOBAL[0].TEL}`, ['6.6%', '6.6%', '6.6%', '6.6%', '6.6%', '6.6%', '6.6%', '6.6%', '6.6%', '6.6%', '6.6%', '6.6%', '6.6%', '6.6%', '6.6%'], '', '70%'),
                ],
              ],
            },
          },
          {
            table: {
              widths: ['53.1%', '46.9%'],
              body: [
                [{ text: NOMBREQUIENINFORMA, style: 'texto' },
                {
                  columns: [
                    { text: '', witdh: '1%' },
                    { text: 'Indicativo', style: 'texto', witdh: '5%' },
                    { text: 'Numero', style: 'texto', witdh: '5%' },
                    { text: 'Extension', style: 'texto', witdh: '5%' }
                  ]
                },
                ],
              ],
            },
          },
          {
            table: {
              widths: ['54%', '10%', '36%'],
              body: [
                [
                  { text: `Cargo o Actividad                                                                  ${CARGOACTIVIDAD}`, style: 'texto' },
                  { text: 'Telefono Celular:', style: 'texto' },
                  {
                    table: {
                      widths: ['8%', '8%', '8%', '8%', '8%', '8%', '8%', '8%', '8%', '9%', '9%', '9%'],
                      body: [
                        [{ text: '0' }, { text: '0' }, { text: '0' }, { text: '0' }, { text: '0' }, { text: '0' }, { text: '0' }, { text: '0' }, { text: '0' }, { text: '0' }, { text: '0' }, { text: '0' }]
                      ]
                    },
                    style: 'texto',
                    width: '70%'
                  },
                ],
              ],
            },
          },
        ],
        styles: {
          titulos1: {
            alignment: "center",
            fontSize: 9,
            bold: true,
          },
          titulos2: {
            fontSize: 9,
            bold: true,
          },
          textomayus: {
            alignment: "center",
            fontSize: 10,
            bold: true,
          },
          texto: {
            fontSize: 7,
          },
          textocentrado: {
            alignment: "center",
            fontSize: 9,
          }
        },
      }
      dd.images = {
        logo: "C:\\PROSOFT\\LOGOS\\" + $_USUA_GLOBAL[0].NIT.toString() + ".png"
      };
      _impresion2({
        tipo: 'pdf',
        content: dd,
        archivo: `${localStorage.Usuario + moment().format('-YYMMDD-HHmmss')}.pdf`,
      })
        .then(() => {
          if (localStorage.Modulo == "HIC") {
            _regresar_menuhis();
          } else {
            _toggleNav();
          }
        })
        .catch((err) => {
          console.error(err);
          if (localStorage.Modulo == "HIC") {
            _regresar_menuhis();
          } else {
            _toggleNav();
          }
        });
    },








    //////////////F8-VENTANAS//////////////////////////////////

    _f8nroautorizacion_SER4B2() {
      $_this = this
      let URL = get_url("APP/SALUD/SER4B82.DLL");
      postData({
        datosh: datosEnvio() + localStorage['Usuario'] + "|"
      }, URL)
        .then((data) => {
          loader("hide");
          $_this.SER4B2.SOLICITUDES = data.ANEXO3;
          $_this.SER4B2.SOLICITUDES.pop()
          _ventanaDatos({
            titulo: "VENTANA DE SOLICITUDES POR PACIENTE",
            columnas: ["SUC", "NRO", "CED", "DESCRIP", "FECHA", "HORA", "ENTIDAD", "DIAG1", "DIAG2",],
            data: $_this.SER4B2.SOLICITUDES,
            ancho: "95%",
            callback_esc: function () {
              $(".numero_SER4B2").focus();
            },
            callback: function (data) {
              $_this.form.suc_SER4B2 = data.SUC
              $_this.form.numero_SER4B2 = data.NRO
              _enterInput('.numero_SER4B2');
            }
          });

        })
        .catch((error) => {
          console.log(error)
          this._evaluarnro_SER4B2()
        });
    },
    _f8paciente_SER4B2() {
      $_this = this
      parametros = {
        dll: 'PACIENTES',
        valoresselect: ['Nombre del paciente'],
        f8data: 'PACIENTES',
        columnas: [{ title: 'COD' }, { title: 'NOMBRE' }, { title: 'EPS' }],
        callback: (data) => {

          $_this.form.paciente_SER4B2 = data.COD;
          _enterInput('.paciente_SER4B2');
        },
        cancel: () => {
          _enterInput('.paciente_SER4B2');
        }
      };
      F8LITE(parametros);
    },
    _f8cups_SER4B2() {
      $_this = this
      parametros = {
        dll: 'CUPS',
        valoresselect: ['Buscar por el nombre cups'],
        f8data: 'CUPS',
        columnas: [{ title: 'GRUPO' }, { title: 'LLAVE' }, { title: 'DESCRIP' }],
        callback: (data) => {
          $_this.form.codigocups_SER4B2 = data.LLAVE.trim()
          _enterInput('.cups_SER4B2');
        },
        cancel: () => {
          _enterInput('.cups_SER4B2');
        }
      };
      F8LITE(parametros);
    },
    _f8entidad_SER4B2() {
      var $_this = this;
      _ventanaDatos({
        titulo: 'VENTANA DE ENTIDADES',
        columnas: ["COD-ENT", "NOMBRE-ENT", "NIT-ENT"],
        // label: ["codigo", "nombre"],
        data: $_this.SER4B2.ENTIDADES,
        ancho: '90%',
        callback_esc: function () {
          $(".entidad_SER4B2").focus();
        },
        callback: function (data) {
          $_this.form.entidad_SER4B2 = data["COD-ENT"];
          _enterInput('.entidad_SER4B2');
        }
      });
    },
    _f8camas_SER4B2() {
      var $_this = this;
      _ventanaDatos({
        titulo: 'VENTANA DE CAMAS',
        columnas: ["COD", "DESCRIPCION"],
        // label: ["codigo", "nombre"],
        data: $_this.SER4B2.CAMAS,
        callback_esc: function () {
          $(".cama_SER4B2").focus();
        },
        callback: function (data) {
          $_this.form.cama_SER4B2 = data.COD;
          _enterInput('.cama_SER4B2');
        }
      });
    },
    _f8diagpric_SER4B2() {
      var $_this = this;
      _ventanaDatos({
        titulo: "VENTANA DE ENFERMEDADES",
        columnas: ["COD_ENF", "NOMBRE_ENF"],
        data: $_this.SER4B2.FILTROENFER,
        callback_esc: function () {
          $(".diagprincipal_SER4B2").focus();
        },
        callback: function (data) {
          $_this.form.diagprincipal_SER4B2 = data.COD_ENF
          _enterInput('.diagprincipal_SER4B2');
        }
      });
    },
    _f8diagrel1_SER4B2() {
      var $_this = this;
      _ventanaDatos({
        titulo: "VENTANA DE ENFERMEDADES",
        columnas: ["COD_ENF", "NOMBRE_ENF"],
        data: $_this.SER4B2.FILTROENFER,
        callback_esc: function () {
          $(".diag1_SER4B2").focus();
        },
        callback: function (data) {
          $_this.form.diag1_SER4B2 = data.COD_ENF
          _enterInput('.diag1_SER4B2');
        }
      });
    },
    _f8diagrel2_SER4B2() {
      var $_this = this;
      _ventanaDatos({
        titulo: "VENTANA DE ENFERMEDADES",
        columnas: ["COD_ENF", "NOMBRE_ENF"],
        data: $_this.SER4B2.FILTROENFER,
        callback_esc: function () {
          $(".diag2_SER4B2").focus();
        },
        callback: function (data) {
          $_this.form.diag2_SER4B2 = data.COD_ENF
          _enterInput('.diag2_SER4B2');
        }
      });
    }
  },
});

var cantidad_SER4B2Mask = new IMask(document.getElementById('cantidad_SER4B2'),
  { mask: Number, min: 0, max: 9999, scale: 2, thousandsSeparator: ',', radix: '.', padFractionalZeros: true }
);


var solicitantemedMask_SER4B2 = IMask($('#solicitantemed_SER4B2')[0], {
  mask: 'a',
  definitions: {
    'a': /[SN]/
  },
  prepare: function (str) {
    if (str.trim() == '') {
      return false
    } else {
      return str.toUpperCase()
    }
  },
  commit: function (value, masked) {
    masked._value = value.toLowerCase()
  }
});

