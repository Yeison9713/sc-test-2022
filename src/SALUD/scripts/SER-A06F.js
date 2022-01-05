// 14/10/2020 - DIANA ESCOBAR: CREADO 
new Vue({
  el: "#SERA06F",
  data: {
    SERA06F: [],
    form: {
      prefijo_SERA06F: "",
      factura_SERA06F: "",
      anolistarini_SERA06F: "",
      meslistarini_SERA06F: "",
      dialistarini_SERA06F: "",
      anolistarfin_SERA06F: "",
      meslistarfin_SERA06F: "",
      dialistarfin_SERA06F: "",
    },
  },
  created() {
    _toggleNav();
    _inputControl("disabled");
    loader("show");
    nombreOpcion("9,7,A,G - Contabiliza glosas por factura");
    $_this = this;
    $_this.SERA06F.FECHA_LNK = $_USUA_GLOBAL[0].FECHALNK;
    $_this.SERA06F.ANO_LNK = $_this.SERA06F.FECHA_LNK.substring(0, 2);
    $_this.SERA06F.MES_LNK = $_this.SERA06F.FECHA_LNK.substring(2, 4);
    $_this.SERA06F.DIA_LNK = $_this.SERA06F.FECHA_LNK.substring(4, 6);
    obtenerDatosCompletos({
      nombreFd: "OPERADOR",
    },
      function (data) {
        $_this.SERA06F.OPERADOR = data.ARCHREST;
        $_this.SERA06F.OPERADOR.pop();
        loader("hide");
        $_this._evaluarprefijo_SERA06F()
      },
    );
  },
  methods: {
    _evaluarprefijo_SERA06F() {
      console.log('INGRESAR PREFIJO')
      validarInputs(
        {
          form: "#validarprefijo_SERA06F",
          orden: "1",
        },()=>{
          _toggleNav()
        },
        () => {
          this.form.prefijo_SERA06F = this.form.prefijo_SERA06F.toUpperCase();
          if (this.form.prefijo_SERA06F == "A" || this.form.prefijo_SERA06F == "P" || this.form.prefijo_SERA06F == "T" || this.form.prefijo_SERA06F == "B" ||
            this.form.prefijo_SERA06F == "D" || this.form.prefijo_SERA06F == "F" || this.form.prefijo_SERA06F == "G" || this.form.prefijo_SERA06F == "H" ||
            this.form.prefijo_SERA06F == "I" || this.form.prefijo_SERA06F == "J" || this.form.prefijo_SERA06F == "K" || this.form.prefijo_SERA06F == "L" ||
            this.form.prefijo_SERA06F == "M" || this.form.prefijo_SERA06F == "N" || this.form.prefijo_SERA06F == "O" || this.form.prefijo_SERA06F == "Q" ||
            this.form.prefijo_SERA06F == "R" || this.form.prefijo_SERA06F == "S" || this.form.prefijo_SERA06F == "V" || this.form.prefijo_SERA06F == "W" ||
            this.form.prefijo_SERA06F == "X" || this.form.prefijo_SERA06F == "Y" || this.form.prefijo_SERA06F == "Z") {
            this._evaluarnumero_SERA06F()
          } else {
            CON851("", "Prefijo incorrecto! ", null, "error", "error");
            this._evaluarprefijo_SERA06F();
          }
        },
      );
    },
    _evaluarnumero_SERA06F() {
      console.log('INGRESAR NUMERO')
      validarInputs(
        {
          form: "#validarfact_SERA06F",
          orden: "1",
        },()=>{this._evaluarprefijo_SERA06F()},
        () => {
          this.form.factura_SERA06F = this.form.factura_SERA06F.padStart(6, '0')
          if (this.form.factura_SERA06F == 0) {
            CON851("02", "02", this._evaluarnumero_SERA06F, "error", "error");
          } else {
            postData({ datosh: datosEnvio() + '1|' + this.form.prefijo_SERA06F.trim() + this.form.factura_SERA06F + "|" }, get_url("APP/SALUD/SER-A06F.DLL"))
              .then(data => {
                this.form.anolistarini_SERA06F = 20 + this.SERA06F.ANO_LNK
                this.form.meslistarini_SERA06F = this.SERA06F.MES_LNK
                this.form.dialistarini_SERA06F = '01'
                this.SERA06F.FECHAINI = this.form.anolistarini_SERA06F + this.form.meslistarini_SERA06F + this.form.dialistarini_SERA06F
                this.form.anolistarfin_SERA06F = 20 + this.SERA06F.ANO_LNK
                this.form.meslistarfin_SERA06F = this.SERA06F.MES_LNK
                this.form.dialistarfin_SERA06F = this.SERA06F.DIA_LNK
                this.SERA06F.FECHAFIN = this.form.anolistarfin_SERA06F + this.form.meslistarfin_SERA06F + this.form.dialistarfin_SERA06F
                CON851P('04', this._evaluarnumero_SERA06F, this._evaluardll_SERA06F)
              })
              .catch(err => {
                console.error(err);
                this._evaluarnumero_SERA06F();
              });
          }
        },
      );
    },
    _evaluardll_SERA06F() {
      postData({ datosh: `${datosEnvio()}${localStorage.Usuario.trim()}|` }, get_url("APP/CONTAB/CON007B.DLL"))
        .then(data => {
          console.debug(data);
          data = data.split('|');
          if (data[1].trim() == '0' || data[1].trim() == '3' || data[1].trim() == '5') {
            postData({ datosh: datosEnvio() + '2|' + this.form.prefijo_SERA06F.trim() + this.form.factura_SERA06F.padStart(6, '0') + '|' + this.SERA06F.FECHAINI + '|' + this.SERA06F.FECHAFIN + '|' + $_USUA_GLOBAL[0].FECHALNK + '|' + localStorage.Usuario + '|' }, get_url("APP/SALUD/SER-A06F.DLL"))
              .then(data => {
                console.log(data, 'RESPUESTA')
                this.SERA06F.CONTABILIZA = data.GLOSAS
                this.SERA06F.CONTABILIZA.pop()
                var columnas = [
                  {
                    title: "FACTURA",
                    value: "LLAVE",
                  },
                  {
                    title: "ENTIDAD",
                    value: "NIT",
                    filterButton: true
                  },
                  {
                    title: "EST",
                    value: "ESTADO",
                  },
                  {
                    title: "VLR GLOSA",
                    value: "GLOSA",
                  },
                  {
                    title: "VLR SOPORTADO",
                    value: "RESPU",
                  },
                  {
                    title: "VLR ACEPTADO",
                    value: "ACEPT",
                  },
                  {
                    title: "VLR PENDIENTE",
                    value: "PENDI",
                  },
                ]

                var header_format = [
                  { text: `${$_USUA_GLOBAL[0].NOMBRE}`, bold: true, size: 16 },
                  `INFORME DE GLOSAS PARA CONTAB     NIT: ${$_USUA_GLOBAL[0].NIT}`,
                  `Periodo desde: ${this.SERA06F.FECHAINI}  Hasta: ${this.SERA06F.FECHAFIN}`,
                ]
                _impresion2({
                  tipo: 'excel',
                  header: header_format,
                  logo: `${$_USUA_GLOBAL[0].NIT}.png`,
                  tabla: {
                    columnas,
                    data: this.SERA06F.CONTABILIZA,
                  },
                  archivo: localStorage.getItem('Usuario') + moment().format('YYYYMMDDHHmmssS'),
                  scale: 65,
                  orientation: 'landscape'
                })
                  .then(() => {
                    CON851('', 'Proceso terminado', _toggleNav(), 'success', 'Exito');
                  })
                  .catch(() => {
                    CON851('', 'Ocurrio un error con el archivo de impresión', _toggleNav(), 'error', 'Error');
                  })
              })
              .catch(err => {
                console.error(err);
                this._evaluarprefijo_SERA06F()
              });
          } else {
            CON851('', 'Mes bloqueado', _toggleNav(), 'error', 'Error');
          }
        })
        .catch(error => {
          console.error(error);
          CON851('', 'Ocurrio un error con el usuario', null, 'error', 'Error');
          _toggleNav();
        });
    },

    _f8numeracion_SERA06F() {
      var $_this = this;
      parametros = {
        dll: 'NUMERACION',
        valoresselect: ['Nombre del tercero', 'buscar paciente'],
        f8data: 'NUMERACION',
        columnas: [{ title: 'COD' }, { title: 'FECHA_ING' }, { title: 'DESCRIP' }, { title: 'NOM_PAC' }, { title: 'CONVENIO' }, { title: 'ESTADO' }],
        callback: (data) => {
          $_this.form.factura_SERA06F = data.COD.substring(1, 7);
          _enterInput('.numeracion_SERA06F');
        },
        cancel: () => {
          _enterInput('.numeracion_SERA06F');
        }
      };
      F8LITE(parametros);
    },
  },
});
