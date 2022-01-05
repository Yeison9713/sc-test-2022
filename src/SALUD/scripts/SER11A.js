/* NOMBRE RM --> SER11A // NOMBRE ELECTR --> SER11A */
/* PO - PABLO OLGUIN 16/12/2019 -> FINALIZADO*/
/* CAMILO FRANCO 10/07/2020 -> CAMBIO A VUEJS */
var $_TABLA;

const moment = require("moment");

new Vue({
  el: "#SER11A",
  data: {
    SER11A: [],
    novedad_SER11A: "",
    oper_SER11A: "",
    fecha_SER11A: "",
    codcups_SER11A: "",
    descripcup_SER11A: "",
    pyp_SER11A: "",
    tipoproced_SER11A: "",
    finalidad_SER11A: "",
    atiende_SER11A: "",
    sexo_SER11A: "",
    conteoespec_SER11A: 0,
    espec_SER11A: "",
    descripespec_SER11A: "",
    tablaespec_SER11A: [],
  },
  created() {
    _toggleNav();
    _inputControl("disabled");
    loader("show");
    nombreOpcion("9,7,1,A - Actualiza restricciones de facturación a CUPS por especialidad");

    var $_this = this;
    obtenerDatosCompletos({ nombreFd: "ESPECIALIDAD" }, data => {
      this.SER11A.ESPECIALIDADES = data.ESPECIALIDADES;
      obtenerDatosCompletos({ nombreFd: "CUPS" }, data => {
        loader("hide");
        $_this.SER11A.CUPS = data.CODIGOS;
        $_this.SER11A.CUPS.pop;
        CON850(this._evaluarCON850_SER11A);
      });
    });
  },
  methods: {
    _evaluarCON850_SER11A(novedad) {
      this.novedad_SER11A = novedad.id;
      if (this.novedad_SER11A == "F") {
        _toggleNav();
      } else {
        this.oper_SER11A = localStorage.Usuario;
        this.fecha_SER11A = moment().format("YYYY/MM/DD");
        let novedad = { "7": "Nuevo", "8": "Cambio", "9": "Retiro" };
        this.novedad_SER11A = this.novedad_SER11A + " - " + novedad[this.novedad_SER11A];
        this.validarCodCupSER11A();
      }
    },

    validarCodCupSER11A() {
      validarInputs(
        {
          form: "#VALIDAR1_SER11A",
          orden: "1",
        },
        () => {
          CON850(this._evaluarCON850_SER11A);
        },
        () => {
          if (this.codcups_SER11A.length == "0" || this.codcups_SER11A.trim() == "") {
            CON851("03", "03", this.validarCodCupSER11A(), "error", "error");
          } else {
            postData(
              {
                datosh: datosEnvio() + this.codcups_SER11A.padEnd(15, " ") + "|",
              },
              get_url("APP/SALUD/SER11A-01.DLL"),
            )
              .then(data => {
                console.log(data);
                data = data.SER11A_01;
                if (this.novedad_SER11A.substring(0, 1) == "7") {
                  if (data[0].INVALID_ESCUPS == "01") {
                    this.on_restriccionCupsSER11A(data);
                  } else {
                    CON851("00", "00", this.validarCodCupSER11A(), "error", "Error");
                  }
                } else if (this.novedad_SER11A.substring(0, 1) == "8") {
                  if (data[0].INVALID_ESCUPS == "00") {
                    this.on_restriccionCupsSER11A(data);
                  } else {
                    CON851("01", "01", this.validarCodCupSER11A(), "error", "Error");
                  }
                } else if (this.novedad_SER11A.substring(0, 1) == "9") {
                  if (data[0].INVALID_ESCUPS == "00") {
                    this.on_restriccionCupsSER11A(data);
                  } else {
                    CON851("01", "01", this.validarCodCupSER11A(), "error", "Error");
                  }
                }
              })
              .catch(error => {
                this.validarCodCupSER11A();
              });
          }
        },
      );
    },
    on_restriccionCupsSER11A(data) {
      if (this.novedad_SER11A.substring(0, 1) != "7") {
        this.codcups_SER11A = data[0].COD_CUPS;
        this.descripcup_SER11A = data[0].DESCRIP_CUP;
        this.pyp_SER11A = data[0].PYP;
        this.tipoproced_SER11A = data[0].TIP_PROC;
        this.finalidad_SER11A = data[0].FINALIDAD;
        this.sexo_SER11A = data[0].SEXO;
        this.atiende_SER11A = data[0].ATIENDE;
        let tablaespec = data[0].TAB_ESPECCUPS;
        let tabla = tablaespec.filter(x => x.COD_ESP.trim() != '');
        this.tablaespec_SER11A = tabla;
        if (this.novedad_SER11A.substring(0, 1) == "8") this._evaluarPYP_SER11A();
        else CON851P("54", this.validarCodCupSER11A, this._grabar_SER11A);
      } else {
        this._evaluarPYP_SER11A();
      }
    },
    _evaluarPYP_SER11A() {
      validarInputs(
        {
          form: "#VALIDAR2_SER11A",
          orden: "1",
        },
        this.validarCodCupSER11A,
        () => {
          this.pyp_SER11A = this.pyp_SER11A.toUpperCase();
          if (this.pyp_SER11A.trim() == "" || this.pyp_SER11A.length == 0 || this.pyp_SER11A.trim() == "N") {
            this.pyp_SER11A = "N";
            this._evaluarsexo_SER11A();
          } else if (this.pyp_SER11A.trim() == "S") {
            SER829("1", this._evaluarPYP_SER11A, data => {
              this.tipoproced_SER11A = data.COD + " - " + data.DESCRIP;
              this.ventanaFinalidadSER11A();
            });
          } else {
            CON851("03", "03", this._evaluarPYP_SER11A(), "error", "error");
          }
        },
      );
    },
    ventanaFinalidadSER11A() {
      setTimeout(() => {
        SER834A({ seleccion: this.finalidad_SER11A.substring(0, 1) }, this._evaluarPYP_SER11A, data => {
          this.finalidad_SER11A = data.COD + " - " + data.DESCRIP;
          this._evaluarsexo_SER11A();
        });
      }, 300);
    },
    _evaluarsexo_SER11A() {
      validarInputs(
        {
          form: "#VALIDAR3_SER11A",
          orden: "1",
        },
        this._evaluarPYP_SER11A,
        () => {
          this.sexo_SER11A = this.sexo_SER11A.toUpperCase();
          if (this.sexo_SER11A.trim() == "F" || this.sexo_SER11A.trim() == "M" || this.sexo_SER11A.trim() == "") {
            this._evaluarespecialidad_SER11A();
          } else {
            CON851("03", "03", this._evaluarPYP_SER11A(), "error", "error");
            this._evaluarsexo_SER11A();
          }
        },
      );
    },
    _evaluarespecialidad_SER11A(data) {
      console.log(data);
      if (data) {
        this.conteoespec_SER11A = data.cells[0].textContent.trim();
        this.espec_SER11A = data.cells[1].textContent.trim();
        this.descripespec_SER11A = data.cells[2].textContent.trim();
      } else {
        this.conteoespec_SER11A = this.tablaespec_SER11A.length;
      }
      _FloatText({
        estado: "on",
        msg: [{ mensaje: "Oprima F3 para continuar" }, { mensaje: "Oprima F7 para modificar la tabla" }],
      });
      if (this.conteoespec_SER11A > 50) this.confirmar_SER11A();
      validarInputs(
        {
          form: "#VALIDAR4_SER11A",
          orden: "1",
          event_f3: this.confirmar_SER11A,
          event_f7: this._validartabla_SER11A,
        },
        () => {
          this._evaluarPYP_SER11A();
          _FloatText({ estado: "off" });
        },
        () => {
          if (this.espec_SER11A.trim() == "") {
            this._evaluarespecialidad_SER11A();
          } else {
            var especialidad = this.SER11A.ESPECIALIDADES.filter(x => x.CODIGO == this.espec_SER11A.trim());
            if (especialidad.length > 0) {
              let repetido = this.tablaespec_SER11A.filter(x => x.COD_ESP == this.espec_SER11A.trim());
              if (repetido.length > 0) {
                CON851("", "Especialidad repetida", this._evaluarespecialidad_SER11A(), "error", "Error");
              } else {
                if (data) {
                  this.tablaespec_SER11A[parseInt(data.cells[0].textContent.trim())] = {
                    COD_ESP: especialidad[0].CODIGO,
                    DESCRIP_ESP: especialidad[0].NOMBRE,
                  };
                  this._evaluarespecialidad_SER11A();
                } else {
                  this.tablaespec_SER11A.push({
                    COD_ESP: especialidad[0].CODIGO,
                    DESCRIP_ESP: especialidad[0].NOMBRE,
                  });
                  this.conteoespec_SER11A++;
                  this._evaluarespecialidad_SER11A();
                }
              }
            } else {
              CON851("01", "01", this._evaluarespecialidad_SER11A(), "error", "Error");
            }
          }
        },
      );
    },
    confirmar_SER11A() {
      _FloatText({ estado: "off" });
      CON851P("01", this._evaluarespecialidad_SER11A, this._grabar_SER11A);
    },
    _validartabla_SER11A() {
      if ($("#TABLAESPECIALIDADES_SER11A tbody tr").length == 0) {
        this._evaluarespecialidad_SER11A();
      } else {
        validarTabla(
          {
            tabla: "#TABLAESPECIALIDADES_SER11A",
            orden: "0",
            event_f3: this.confirmar_SER11A,
            Supr: data => {
              let posicion = data.cells[0].textContent.trim();
              console.log(posicion);
              this.tablaespec_SER11A.splice(posicion, 1);
              this._evaluarespecialidad_SER11A();
            },
          },
          () => { this._evaluarespecialidad_SER11A() },
          () => { this._evaluarespecialidad_SER11A() },
          this.confirmar_SER11A,
        );
      }
    },
    _grabar_SER11A() {
      this.SER11A.tablaenvio = "";
      for (var i in this.tablaespec_SER11A) {
        this.SER11A.tablaenvio += this.tablaespec_SER11A[i].COD_ESP;
      }
      console.log(this.SER11A.tablaenvio);
      if (this.atiende_SER11A.length > 0) this.atiende_SER11A = this.atiende_SER11A.substring(0, 2);
      if (this.tipoproced_SER11A.length > 0) this.tipoproced_SER11A = this.tipoproced_SER11A.substring(0, 2);
      if (this.finalidad_SER11A.length > 0) this.finalidad_SER11A = this.finalidad_SER11A.substring(0, 2);
      postData(
        {
          datosh: datosEnvio() + this.novedad_SER11A.substring(0, 1) + "|" + this.codcups_SER11A.padEnd(15, " ") + "|" + this.fecha_SER11A.replace(/\//g, "") + "|" + this.sexo_SER11A.trim() + "|" + this.atiende_SER11A.trim() + "|" + this.pyp_SER11A.trim() + "|" + this.oper_SER11A.trim() + "|" + this.tipoproced_SER11A.trim() + "|" + this.finalidad_SER11A.trim() + "|" + this.SER11A.tablaenvio + "|",
        },
        get_url("APP/SALUD/SER11A-02.DLL"),
      )
        .then(data => {
          if (data.split("|")[0] == "00") {
            toastr.success("Se actualizado correctamente el registro", "RESTRICIONES ESPEC-CUPS");
            _toggleNav();
          } else {
            CON851("ERROR", "ERROR AL ACTUALIZAR", this._evaluarespecialidad_SER11A(), "error", "error");
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    _ventanCupsSER11A() {
      _ventanaDatos({
        titulo: "VENTANA DE CODIGOS CUPS",
        columnas: ["LLAVE", "DESCRIP", "ESPEC"],
        ancho: '90%',
        data: this.SER11A.CUPS,
        callback_esc: () => {
          $('#codigicups_SER11A').focus();
        },
        callback: data => {
          this.codcups_SER11A = data.LLAVE;
          _enterInput("#codigicups_SER11A");
        },
      });
    },
    _ventanEspecSER11A() {
      _ventanaDatos({
        titulo: "VENTANA DE ESPECIALIDADES",
        columnas: ["CODIGO", "NOMBRE"],
        data: this.SER11A.ESPECIALIDADES,
        callback_esc: () => {
          $('#especialidad_SER11A').focus();
        },
        callback: data => {
          this.espec_SER11A = data.CODIGO;
          _enterInput("#especialidad_SER11A");
        },
      });
    },
  },
});
