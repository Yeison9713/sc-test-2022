new Vue({
  el: "#SER162",
  data: {
    SER162: [],
    form: {
      fechainicioaño_SER162: "",
      fechainiciomes_SER162: "",
      fechainiciodia_SER162: "",
      fechafinalaño_SER162: "",
      fechafinalmes_SER162: "",
      fechafinaldia_SER162: "",
      unidadservicio_SER162: "",
      unidadserviciod_SER162: "",
      entidad_SER162: "",
      entidadd_SER162: "",
      validardiag_SER162: "",
    }
  },
  created() {
    _toggleNav();
    nombreOpcion("9,5,4,1,5,4 - Informe de reingresos H.C.");
    _inputControl("disabled");
    obtenerDatosCompletos({ nombreFd: "FIRMAS" }, data => {
      data = data.FIRMAS;
      this.SER162.FIRMAS = data;
      obtenerDatosCompletos({ nombreFd: "UNSERV" }, data => {
        data = data.UNSERV;
        this.SER162.UNIDADES = data;
      });
    });
    this.form.fechainicioaño_SER162 = `20${$_USUA_GLOBAL[0].FECHALNK.substring(0, 2)}`;
    this.form.fechafinalaño_SER162 = `20${$_USUA_GLOBAL[0].FECHALNK.substring(0, 2)}`;
    this.form.fechainiciomes_SER162 = $_USUA_GLOBAL[0].FECHALNK.substring(2, 4);
    this.form.fechafinalmes_SER162 = $_USUA_GLOBAL[0].FECHALNK.substring(2, 4);
    this._evaluarmesinicio_SER162();
  },
  methods: {
    _evaluarmesinicio_SER162() {
      validarInputs(
        {
          form: "#VALIDAR1_SER612",
          orden: "1",
        },
        _toggleNav,
        () => {
          if (this.form.fechainiciomes_SER162.trim() == '') {
            CON851('03', '03', null, 'error', 'Error')
            return this._evaluarmesinicio_SER162()
          }

          if (parseInt(this.form.fechainiciomes_SER162) > 0 && parseInt(this.form.fechainiciomes_SER162) < 13) {
            this.form.fechainiciomes_SER162 = this.form.fechainiciomes_SER162.padStart(2, '0')
            this.form.fechainiciodia_SER162 = moment().format('DD')
            return this._evaluardiainicio_SER162()
          }

          CON851('03', '03', null, 'error', 'Error')
          this._evaluarmesinicio_SER162()
        },
      );
    },
    _evaluardiainicio_SER162() {
      validarInputs(
        {
          form: "#VALIDAR2_SER612",
          orden: "1",
        },
        this._evaluarmesinicio_SER162,
        () => {
          if (this.form.fechainiciodia_SER162.trim() == '') {
            CON851('03', '03', null, 'error', 'Error')
            return this._evaluardiainicio_SER162()
          }
          if (this.form.fechainiciodia_SER162 > 0 && this.form.fechainiciodia_SER162 < 32) {
            this.form.fechainiciodia_SER162 = this.form.fechainiciodia_SER162.padStart(2, '0')
            let fecha = moment(`${this.form.fechainicioaño_SER162}${this.form.fechainiciomes_SER162}${this.form.fechainiciodia_SER162}`).format('YYYYMMDD')
            if (fecha.trim() == 'Fecha inválida') {
              CON851('37', '37', null, 'error', 'Error')
              return this._evaluardiainicio_SER162()
            }

            return this._evaluarmesfinal_SER162()
          }

          CON851('03', '03', null, 'error', 'Error')
          this._evaluardiainicio_SER162()
        },
      );
    },
    _evaluarmesfinal_SER162() {
      validarInputs(
        {
          form: "#VALIDAR3_SER612",
          orden: "1",
        },
        this._evaluardiainicio_SER162,
        () => {
          if (this.form.fechafinalmes_SER162.trim() == '') {
            CON851('03', '03', null, 'error', 'Error')
            return this._evaluarmesfinal_SER162()
          }

          if (this.form.fechafinalmes_SER162 > 0 && this.form.fechafinalmes_SER162 < 13) {
            this.form.fechafinalmes_SER162 = this.form.fechafinalmes_SER162.padStart(2, '0')
            this.form.fechafinaldia_SER162 = moment(moment().format('YYYYMMDD')).endOf('month').format('DD')
            return this._evaluardiafinal_SER162()
          }

          CON851('03', '03', null, 'error', 'Error')
          this._evaluarmesfinal_SER162()
        },
      );
    },
    _evaluardiafinal_SER162() {
      validarInputs(
        {
          form: "#VALIDAR4_SER612",
          orden: "1",
        },
        this._evaluarmesfinal_SER162,
        () => {
          if (this.form.fechafinaldia_SER162.trim() == '') {
            CON851('03', '03', null, 'error', 'Error')
            return this._evaluardiafinal_SER162()
          }

          if (this.form.fechafinaldia_SER162 > 0 && this.form.fechafinaldia_SER162 < 32) {
            this.form.fechafinaldia_SER162 = this.form.fechafinaldia_SER162.padStart(2, '0')
            if (`${this.form.fechainicioaño_SER162}${this.form.fechainiciomes_SER162}${this.form.fechainiciodia_SER162}` > `${this.form.fechafinalaño_SER162}${this.form.fechafinalmes_SER162}${this.form.fechafinaldia_SER162}`) {
              CON851('03', '03', null, 'error', 'error')
              return this._evaluardiafinal_SER162()
            }

            let fecha = moment(`${this.form.fechafinalaño_SER162}${this.form.fechafinalmes_SER162}${this.form.fechafinaldia_SER162}`).format('YYYYMMDD')
            if (fecha.trim() == 'Fecha inválida') {
              CON851('37', '37', null, 'error', 'Error')
              return this._evaluardiafinal_SER162()
            }

            this.form.unidadservicio_SER162 = '**'
            return this._evaluarunidadservicio_SER162()
          }

          CON851('03', '03', null, 'error', 'Error')
          this._evaluardiafinal_SER162()
        },
      );
    },
    _evaluarunidadservicio_SER162() {
      validarInputs(
        {
          form: "#VALIDAR5_SER612",
          orden: "1",
        },
        this._evaluardiafinal_SER162,
        () => {
          if (this.form.unidadservicio_SER162 == '**') {
            this.form.unidadserviciod_SER162 = 'TODAS LAS UNIDADES DE SERVICIO'
            this.form.entidad_SER162 = '99'
            return this._evaluarentidad_SER162()
          }

          let unidades = this.SER162.UNIDADES
          this.form.unidadservicio_SER162 = this.form.unidadservicio_SER162.padStart(2, '0')
          let unidad = unidades.filter(x => x.COD == this.form.unidadservicio_SER162.padStart(2, '0'))

          if (unidad.length > 0) {
            this.form.unidadserviciod_SER162 = unidad[0].DESCRIP
            this.form.entidad_SER162 = '99'
            return this._evaluarentidad_SER162()
          }

          CON851('01', '01', null, 'error', 'Error')
          this._evaluarunidadservicio_SER162()
        },
      );
    },
    _evaluarentidad_SER162() {
      validarInputs(
        {
          form: "#VALIDAR6_SER612",
          orden: "1",
        },
        this._evaluarunidadservicio_SER162,
        () => {
          if (this.form.entidad_SER162 == 99) {
            this.form.entidadd_SER162 = 'TODAS LAS ENTIDADES'
            return this._evaluardiaminimo_SER162()
          }

          postData(
            {
              datosh: `${datosEnvio()}${this.form.entidad_SER162.padStart(10, '0')}|`,
            },
            get_url("APP/CONTAB/CON802_01.DLL")
          )
          .then(data => {
            this.form.entidadd_SER162 = data.TERCER[0].DESCRIP_TER.trim()
            this._evaluardiaminimo_SER162()
          }).catch(error => {
            console.error(error)
            this.form.entidadd_SER162 = 'NO EXISTE TERCERO'
            this._evaluarentidad_SER162()
          });
        },
      );
    },
    _evaluardiaminimo_SER162() {
      validarInputs(
        {
          form: "#VALIDAR7_SER612",
          orden: "1",
        },
        this._evaluarentidad_SER162,
        () => {
          if (diaminimoMask_SER162.value.trim() == '') {
            CON851('03', '03', null, 'error', 'error')
            return this._evaluardiaminimo_SER162()
          }

          this._evaluardiamaximo_SER162()
        },
      );
    },
    _evaluardiamaximo_SER162() {
      validarInputs(
        {
          form: "#VALIDAR8_SER612",
          orden: "1",
        },
        this._evaluardiaminimo_SER162,
        () => {
          if (diamaximoMask_SER162.value.trim() == '') {
            CON851('03', '03', null, 'error', 'error')
            return this._evaluardiamaximo_SER162()
          }

          if (diaminimoMask_SER162.value > diamaximoMask_SER162.value) {
            CON851('03', '03', null, 'error', 'error')
            return this._evaluardiamaximo_SER162()
          }

          this._evaluardiagnostico_SER162()
        },
      );
    },
    _evaluardiagnostico_SER162() {
      validarInputs(
        {
          form: "#VALIDAR9_SER612",
          orden: "1",
        },
        this._evaluardiamaximo_SER162,
        () => {
          this.form.validardiag_SER162 = this.form.validardiag_SER162.toUpperCase()

          if (this.form.validardiag_SER162 == 'S' || this.form.validardiag_SER162 == 'N') {
            return this._datosimpresion_SER162()
          }

          CON851('03', '03', null, 'error', 'Error')
          this._evaluardiagnostico_SER162()
        },
      );
    },
    _datosimpresion_SER162() {
      loader('show');
      postData(
        {
          datosh: `${datosEnvio()}${this.form.fechainicioaño_SER162}${this.form.fechainiciomes_SER162}${this.form.fechainiciodia_SER162}|${this.form.fechafinalaño_SER162}${this.form.fechafinalmes_SER162}${this.form.fechafinaldia_SER162}|${this.form.entidad_SER162.padStart(10, '0')}|${this.form.unidadservicio_SER162}|${diaminimoMask_SER162.value.padStart(2, '0')}|${diamaximoMask_SER162.value.padStart(2, '0')}|${this.form.validardiag_SER162}|${localStorage.Usuario}|`,
        },
        get_url("APP/SALUD/SER162.DLL"),
      )
        .then(data => {
          loader('hide');
          let impresion = [];
          for (var i in data.HISTORIAS) {
            impresion.push({ ID: data.HISTORIAS[i].ID })
            impresion[i]['1APEL'] = data.HISTORIAS[i]["1APEL"]
            impresion[i]['2APEL'] = data.HISTORIAS[i]["2APEL"]
            impresion[i]['NOM'] = data.HISTORIAS[i]["NOM"]
            impresion[i]['EPS'] = data.HISTORIAS[i]["EPS"]
            impresion[i]['UNSERV'] = data.HISTORIAS[i]["UNSERV"]
            for (var x in data.HISTORIAS[i].TABLA) {
              if (data.HISTORIAS[i].TABLA[x].FACT != '') {
                impresion[i][`FACT${x}`] = data.HISTORIAS[i].TABLA[x][`FACT`]
                impresion[i][`FECHA_ING${x}`] = data.HISTORIAS[i].TABLA[x][`FECHA_ING`]
                impresion[i][`FECHA_RET${x}`] = data.HISTORIAS[i].TABLA[x][`FECHA_RET`]
                impresion[i][`COD_DIAG${x}`] = data.HISTORIAS[i].TABLA[x][`COD_DIAG`]
                impresion[i][`DESC_DIAG${x}`] = data.HISTORIAS[i].TABLA[x][`DESC_DIAG`]
                impresion[i][`COD_MED${x}`] = data.HISTORIAS[i].TABLA[x][`COD_MED`]
                impresion[i][`MEDICO${x}`] = data.HISTORIAS[i].TABLA[x][`MEDICO`]
                impresion[i][`DIFERENCIA${x}`] = moment(data.HISTORIAS[i].TABLA[x][`FECHA_RET`]).diff(data.HISTORIAS[i].TABLA[x][`FECHA_ING`], 'days').toString()
              }
            }
          }
          columnas = [
            {
              title: "IDENTIFICACION",
              value: "ID",
            },
            {
              title: "1ER APELLIDO",
              value: "1APEL",
            },
            {
              title: "UNIDAD DE SERVICIO",
              value: "UNSERV",
              format: "string"
            },
            {
              title: "2DO APELLIDO",
              value: "2APEL",
            },
            {
              title: "NOMBRES",
              value: "NOM",
            },
            {
              title: "EPS",
              value: "EPS",
            },
            {
              title: "FACTURA",
              value: "FACT1",
            },
            {
              title: "FECHA INGRESO",
              value: "FECHA_ING1",
            },
            {
              title: "FECHA RETIRO",
              value: "FECHA_RET1",
            },
            {
              title: "DIFERENCIA 1",
              value: "DIFERENCIA1",
              format: 'string'
            },
            {
              title: "CODIGO DIAGNOSTICO",
              value: "COD_DIAG1",
            },
            {
              title: "DESCRIPCION DIAGNOSTICO",
              value: "DESC_DIAG1",
            },
            {
              title: "ID MEDICO",
              value: "COD_MED1",
            },
            {
              title: "NOMBRE MEDICO",
              value: "MEDICO1",
            },
            {
              title: "FACTURA 2",
              value: "FACT2",
            },
            {
              title: "FECHA INGRESO 2",
              value: "FECHA_ING2",
            },
            {
              title: "FECHA RETIRO 2",
              value: "FECHA_RET2",
            },
            {
              title: "DIFERENCIA 2",
              value: "DIFERENCIA2",
            },
            {
              title: "CODIGO DIAGNOSTICO 2",
              value: "COD_DIAG2",
            },
            {
              title: "DESCRIPCION DIAGNOSTICO 2",
              value: "DESC_DIAG2",
            },
            {
              title: "ID MEDICO 2",
              value: "COD_MED2",
            },
            {
              title: "NOMBRE MEDICO 2",
              value: "MEDICO2",
            },
            {
              title: "FACTURA 3",
              value: "FACT3",
            },
            {
              title: "FECHA INGRESO 3",
              value: "FECHA_ING3",
            },
            {
              title: "FECHA RETIRO 3",
              value: "FECHA_RET3",
            },
            {
              title: "DIFERENCIA 3",
              value: "DIFERENCIA3",
            },
            {
              title: "CODIGO DIAGNOSTICO 3",
              value: "COD_DIAG3",
            },
            {
              title: "DESCRIPCION DIAGNOSTICO 3",
              value: "DESC_DIAG3",
            },
            {
              title: "ID MEDICO 3",
              value: "COD_MED3",
            },
            {
              title: "NOMBRE MEDICO 3",
              value: "MEDICO3",
            },
            {
              title: "FACTURA 4",
              value: "FACT4",
            },
            {
              title: "FECHA INGRESO 4",
              value: "FECHA_ING4",
            },
            {
              title: "FECHA RETIRO 4",
              value: "FECHA_RET4",
            },
            {
              title: "DIFERENCIA 4",
              value: "DIFERENCIA4",
            },
            {
              title: "CODIGO DIAGNOSTICO 4",
              value: "COD_DIAG4",
            },
            {
              title: "DESCRIPCION DIAGNOSTICO 4",
              value: "DESC_DIAG4",
            },
            {
              title: "ID MEDICO 4",
              value: "COD_MED4",
            },
            {
              title: "NOMBRE MEDICO 4",
              value: "MEDICO4",
            },
            {
              title: "FACTURA 5",
              value: "FACT5",
            },
            {
              title: "FECHA INGRESO 5",
              value: "FECHA_ING5",
            },
            {
              title: "FECHA RETIRO 5",
              value: "FECHA_RET5",
            },
            {
              title: "DIFERENCIA 5",
              value: "DIFERENCIA5",
            },
            {
              title: "CODIGO DIAGNOSTICO 5",
              value: "COD_DIAG5",
            },
            {
              title: "DESCRIPCION DIAGNOSTICO 5",
              value: "DESC_DIAG5",
            },
            {
              title: "ID MEDICO 5",
              value: "COD_MED5",
            },
            {
              title: "NOMBRE MEDICO 5",
              value: "MEDICO5",
            },
            {
              title: "FACTURA 6",
              value: "FACT6",
            },
            {
              title: "FECHA INGRESO 6",
              value: "FECHA_ING6",
            },
            {
              title: "FECHA RETIRO 6",
              value: "FECHA_RET6",
            },
            {
              title: "DIFERENCIA 6",
              value: "DIFERENCIA6",
            },
            {
              title: "CODIGO DIAGNOSTICO 6",
              value: "COD_DIAG6",
            },
            {
              title: "DESCRIPCION DIAGNOSTICO 6",
              value: "DESC_DIAG6",
            },
            {
              title: "ID MEDICO 6",
              value: "COD_MED6",
            },
            {
              title: "NOMBRE MEDICO 6",
              value: "MEDICO6",
            },
            {
              title: "FACTURA 7",
              value: "FACT7",
            },
            {
              title: "FECHA INGRESO 7",
              value: "FECHA_ING7",
            },
            {
              title: "FECHA RETIRO 7",
              value: "FECHA_RET7",
            },
            {
              title: "DIFERENCIA 7",
              value: "DIFERENCIA7",
            },
            {
              title: "CODIGO DIAGNOSTICO 7",
              value: "COD_DIAG7",
            },
            {
              title: "DESCRIPCION DIAGNOSTICO 7",
              value: "DESC_DIAG7",
            },
            {
              title: "ID MEDICO 7",
              value: "COD_MED7",
            },
            {
              title: "NOMBRE MEDICO 7",
              value: "MEDICO7",
            },
            {
              title: "FACTURA 8",
              value: "FACT8",
            },
            {
              title: "FECHA INGRESO 8",
              value: "FECHA_ING8",
            },
            {
              title: "FECHA RETIRO 8",
              value: "FECHA_RET8",
            },
            {
              title: "DIFERENCIA 8",
              value: "DIFERENCIA8",
            },
            {
              title: "CODIGO DIAGNOSTICO 8",
              value: "COD_DIAG8",
            },
            {
              title: "DESCRIPCION DIAGNOSTICO 8",
              value: "DESC_DIAG8",
            },
            {
              title: "ID MEDICO 8",
              value: "COD_MED8",
            },
            {
              title: "NOMBRE MEDICO 8",
              value: "MEDICO8",
            },
            {
              title: "FACTURA 9",
              value: "FACT9",
            },
            {
              title: "FECHA INGRESO 9",
              value: "FECHA_ING9",
            },
            {
              title: "FECHA RETIRO 9",
              value: "FECHA_RET9",
            },
            {
              title: "DIFERENCIA 9",
              value: "DIFERENCIA9",
            },
            {
              title: "CODIGO DIAGNOSTICO 9",
              value: "COD_DIAG9",
            },
            {
              title: "DESCRIPCION DIAGNOSTICO 9",
              value: "DESC_DIAG9",
            },
            {
              title: "ID MEDICO 9",
              value: "COD_MED9",
            },
            {
              title: "NOMBRE MEDICO 9",
              value: "MEDICO9",
            },
            {
              title: "FACTURA 10",
              value: "FACT10",
            },
            {
              title: "FECHA INGRESO 10",
              value: "FECHA_ING10",
            },
            {
              title: "FECHA RETIRO 10",
              value: "FECHA_RET10",
            },
            {
              title: "DIFERENCIA 10",
              value: "DIFERENCIA10",
            },
            {
              title: "CODIGO DIAGNOSTICO 10",
              value: "COD_DIAG10",
            },
            {
              title: "DESCRIPCION DIAGNOSTICO 10",
              value: "DESC_DIAG10",
            },
            {
              title: "ID MEDICO 10",
              value: "COD_MED10",
            },
            {
              title: "NOMBRE MEDICO 10",
              value: "MEDICO10",
            },
            {
              title: "FACTURA 11",
              value: "FACT11",
            },
            {
              title: "FECHA INGRESO 11",
              value: "FECHA_ING11",
            },
            {
              title: "FECHA RETIRO 11",
              value: "FECHA_RET11",
            },
            {
              title: "DIFERENCIA 11",
              value: "DIFERENCIA11",
            },
            {
              title: "CODIGO DIAGNOSTICO 11",
              value: "COD_DIAG11",
            },
            {
              title: "DESCRIPCION DIAGNOSTICO 11",
              value: "DESC_DIAG11",
            },
            {
              title: "ID MEDICO 11",
              value: "COD_MED11",
            },
            {
              title: "NOMBRE MEDICO 11",
              value: "MEDICO11",
            },
            {
              title: "FACTURA 12",
              value: "FACT12",
            },
            {
              title: "FECHA INGRESO 12",
              value: "FECHA_ING12",
            },
            {
              title: "FECHA RETIRO 12",
              value: "FECHA_RET12",
            },
            {
              title: "DIFERENCIA 12",
              value: "DIFERENCIA12",
            },
            {
              title: "CODIGO DIAGNOSTICO 12",
              value: "COD_DIAG12",
            },
            {
              title: "DESCRIPCION DIAGNOSTICO 12",
              value: "DESC_DIAG12",
            },
            {
              title: "ID MEDICO 12",
              value: "COD_MED12",
            },
            {
              title: "NOMBRE MEDICO 12",
              value: "MEDICO12",
            },
            {
              title: "FACTURA 13",
              value: "FACT13",
            },
            {
              title: "FECHA INGRESO 13",
              value: "FECHA_ING13",
            },
            {
              title: "FECHA RETIRO 13",
              value: "FECHA_RET13",
            },
            {
              title: "DIFERENCIA 13",
              value: "DIFERENCIA13",
            },
            {
              title: "CODIGO DIAGNOSTICO 13",
              value: "COD_DIAG13",
            },
            {
              title: "DESCRIPCION DIAGNOSTICO 13",
              value: "DESC_DIAG13",
            },
            {
              title: "ID MEDICO 13",
              value: "COD_MED13",
            },
            {
              title: "NOMBRE MEDICO 13",
              value: "MEDICO13",
            },
            {
              title: "FACTURA 14",
              value: "FACT14",
            },
            {
              title: "FECHA INGRESO 14",
              value: "FECHA_ING14",
            },
            {
              title: "FECHA RETIRO 14",
              value: "FECHA_RET14",
            },
            {
              title: "DIFERENCIA 14",
              value: "DIFERENCIA14",
            },
            {
              title: "CODIGO DIAGNOSTICO 14",
              value: "COD_DIAG14",
            },
            {
              title: "DESCRIPCION DIAGNOSTICO 14",
              value: "DESC_DIAG14",
            },
            {
              title: "ID MEDICO 14",
              value: "COD_MED14",
            },
            {
              title: "NOMBRE MEDICO 14",
              value: "MEDICO14",
            },
            {
              title: "FACTURA 15",
              value: "FACT15",
            },
            {
              title: "FECHA INGRESO 15",
              value: "FECHA_ING15",
            },
            {
              title: "FECHA RETIRO 15",
              value: "FECHA_RET15",
            },
            {
              title: "DIFERENCIA 15",
              value: "DIFERENCIA15",
            },
            {
              title: "CODIGO DIAGNOSTICO 15",
              value: "COD_DIAG15",
            },
            {
              title: "DESCRIPCION DIAGNOSTICO 15",
              value: "DESC_DIAG15",
            },
            {
              title: "ID MEDICO 15",
              value: "COD_MED15",
            },
            {
              title: "NOMBRE MEDICO 15",
              value: "MEDICO15",
            },
            {
              title: "FACTURA 16",
              value: "FACT16",
            },
            {
              title: "FECHA INGRESO 16",
              value: "FECHA_ING16",
            },
            {
              title: "FECHA RETIRO 16",
              value: "FECHA_RET16",
            },
            {
              title: "DIFERENCIA 16",
              value: "DIFERENCIA16",
            },
            {
              title: "CODIGO DIAGNOSTICO 16",
              value: "COD_DIAG16",
            },
            {
              title: "DESCRIPCION DIAGNOSTICO 16",
              value: "DESC_DIAG16",
            },
            {
              title: "ID MEDICO 16",
              value: "COD_MED16",
            },
            {
              title: "NOMBRE MEDICO 16",
              value: "MEDICO16",
            },
            {
              title: "FACTURA 17",
              value: "FACT17",
            },
            {
              title: "FECHA INGRESO 17",
              value: "FECHA_ING17",
            },
            {
              title: "FECHA RETIRO 17",
              value: "FECHA_RET17",
            },
            {
              title: "DIFERENCIA 17",
              value: "DIFERENCIA17",
            },
            {
              title: "CODIGO DIAGNOSTICO 17",
              value: "COD_DIAG17",
            },
            {
              title: "DESCRIPCION DIAGNOSTICO 17",
              value: "DESC_DIAG17",
            },
            {
              title: "ID MEDICO 17",
              value: "COD_MED17",
            },
            {
              title: "NOMBRE MEDICO 17",
              value: "MEDICO17",
            },
            {
              title: "FACTURA 18",
              value: "FACT18",
            },
            {
              title: "FECHA INGRESO 18",
              value: "FECHA_ING18",
            },
            {
              title: "FECHA RETIRO 18",
              value: "FECHA_RET18",
            },
            {
              title: "DIFERENCIA 18",
              value: "DIFERENCIA18",
            },
            {
              title: "CODIGO DIAGNOSTICO 18",
              value: "COD_DIAG18",
            },
            {
              title: "DESCRIPCION DIAGNOSTICO 18",
              value: "DESC_DIAG18",
            },
            {
              title: "ID MEDICO 18",
              value: "COD_MED18",
            },
            {
              title: "NOMBRE MEDICO 18",
              value: "MEDICO18",
            },
            {
              title: "FACTURA 19",
              value: "FACT19",
            },
            {
              title: "FECHA INGRESO 19",
              value: "FECHA_ING19",
            },
            {
              title: "FECHA RETIRO 19",
              value: "FECHA_RET19",
            },
            {
              title: "DIFERENCIA 19",
              value: "DIFERENCIA19",
            },
            {
              title: "CODIGO DIAGNOSTICO 19",
              value: "COD_DIAG19",
            },
            {
              title: "DESCRIPCION DIAGNOSTICO 19",
              value: "DESC_DIAG19",
            },
            {
              title: "ID MEDICO 19",
              value: "COD_MED19",
            },
            {
              title: "NOMBRE MEDICO 19",
              value: "MEDICO19",
            },
            {
              title: "FACTURA 20",
              value: "FACT20",
            },
            {
              title: "FECHA INGRESO 20",
              value: "FECHA_ING20",
            },
            {
              title: "FECHA RETIRO 20",
              value: "FECHA_RET20",
            },
            {
              title: "DIFERENCIA 20",
              value: "DIFERENCIA20",
            },
            {
              title: "CODIGO DIAGNOSTICO 20",
              value: "COD_DIAG20",
            },
            {
              title: "DESCRIPCION DIAGNOSTICO 20",
              value: "DESC_DIAG20",
            },
            {
              title: "ID MEDICO 20",
              value: "COD_MED20",
            },
            {
              title: "NOMBRE MEDICO 20",
              value: "MEDICO20",
            },
          ];
          _impresion2({
            tipo: "excel",
            header: [{ text: `${$_USUA_GLOBAL[0].NOMBRE}`, bold: true, size: 16 }, `REINGRESOS`],
            logo: `${$_USUA_GLOBAL[0].NIT}.png`,
            // ruta_logo: 'C:\\PROSOFT\\LOGOS\\',
            tabla: {
              columnas,
              data: impresion,
            },
            archivo: localStorage.getItem("Usuario") + moment().format("YYYYMMDDHHmmssS"),
            // scale: 65,
            // orientation: 'landscape'
          })
            .then(() => {
              CON851("", "Impreso Correctamente", _toggleNav(), "success", "Exito");
            })
            .catch(() => {
              CON851("", "Hubo un error en la impresión", _toggleNav(), "error", "Error");
            });
        })
        .catch(error => {
          console.error(error);
          loader('hide');
          this._evaluardiagnostico_SER162();
        });
    },
    _ventanaterceros_SER162(e) {
      parametros = {
        dll: 'TERCEROS',
        valoresselect: ['Buscar por nombre tercero'],
        f8data: 'TERCEROS',
        columnas: [{ title: 'COD' }, { title: 'NOMBRE' }, { title: 'DIRREC' }, { title: 'TELEF' }, { title: 'ACT' }],
        callback: (data) => {
          this.form.entidad_SER162 = parseInt(data.COD).toString()
          _enterInput('.entidad_SER162')
        },
        cancel: () => {
          $('.entidad_SER162').focus();
        }
      };
      F8LITE(parametros);
    },
  },
});
var diaminimoMask_SER162 = IMask($('#salida_SER162')[0], { mask: Number });
var diamaximoMask_SER162 = IMask($('#reingreso_SER162')[0], { mask: Number });