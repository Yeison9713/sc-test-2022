/** 
 * @developer Pablo.O 
 * @developer Axel.F
 * @author    SC-PROSOFT
 * @descrip   REIMPRIME EVOLUCIONES MEDICAS; OPCIÓN 7-5
 * @date      03/09/2020 CREACION 05/09/2020 CREACION
 * @date      06/09/2020 - 09 / / 2020 AJUSTES
 * @date      00/00/0000 FINALIZADO
**/

var $this;

new Vue({
  el: '#HC705',
  data: {
    form: {
      año_705: '0000',
      mes_705: '00',
      dia_705: '00',
      hr_705: '00',
      min_705: '00',
      medico_705: '*********************************',
      descripMedico_705: '***************************',
      consulta_705: '**************************',
      añoDesde_705: null, mesDesde_705: null, diaDesde_705: null,
      añoHasta_705: null, mesHasta_705: null, diaHasta_705: null,
      opc_evo: 'N',//opc Impresion Evolucion medica
      opc_enf: 'N',//opc Impresion Notas Enfermeria
      opc_ter: 'N',//opc Impresion Notas Terapeutas
      opc_for: 'N',//opc Impresion Formulacion Medica
      opc_lab: 'N',//opc Impresion Solicitud Labor
      opc_ima: 'N',//opc Impresion Solicitud Imag.
      opc_ord: 'N',//opc Impresion Solicitud Ord. Med
      opc_con: 'N',//opc Impresion Solicitud Consul
      opc_inc: 'N',//opc Impresion Incapacidad Med
      opcImpResu: 'N', // opc Impresion Resumida
    },
    evo_select: {
      llave: "**************",
      unser: "**************",
      tipo: "**************",
      macro: "**************"
    },
    dataArray: new Object(),
    data_evo: new Object(),
    multiple: false,
    fecha_total: new Object()
  },
  created() {
    this._inicializar();
  },
  methods: {
    _inicializar() {
      _inputControl('disabled');
      _inputControl('reset');
      nombreOpcion('7-5 - Reimprime evolucion medica');
      $this = this;
      $this.arrayBase64 = [];
      $this.init_HC705();
    },
    reset() {
      $this.form = {
        año_705: '0000',
        mes_705: '00',
        dia_705: '00',
        hr_705: '00',
        min_705: '00',
        medico_705: '*********************************',
        descripMedico_705: '***************************',
        consulta_705: '**************************',
        añoDesde_705: null,
        mesDesde_705: null,
        diaDesde_705: null,
        añoHasta_705: null,
        mesHasta_705: null,
        diaHasta_705: null,
        opc_evo: 'N',//opc Impresion Evolucion medica
        opc_enf: 'N',//opc Impresion Notas Enfermeria
        opc_ter: 'N',//opc Impresion Notas Terapeutas
        opc_for: 'N',//opc Impresion Formulacion Medica
        opc_lab: 'N',//opc Impresion Solicitud Labor
        opc_ima: 'N',//opc Impresion Solicitud Imag.
        opc_ord: 'N',//opc Impresion Solicitud Ord. Med
        opc_con: 'N',//opc Impresion Solicitud Consul
        opc_inc: 'N',//opc Impresion Incapacidad Med
        opcImpResu: 'N', // opc Impresion Resumida
      };
      $this.evo_select = {
        llave: "**************",
        unser: "**************",
        tipo: "**************",
        macro: "**************"
      },
        $this.multiple = false;
    },
    async init_HC705() {
      await $this.cargarArchivos();
      $this._cargarColeccionDatos_HC705();
    },
    ventanEvo_HC705() {

      $this.multiple = false;
      _ventanaDatos({
        titulo: "CONSULTA DE EVOLUCIONES POR PACIENTE",
        columnas: ["FECHA_EVO", "HORA_EVO", "DESCRIP_MEDICO_EVO", "PROCED_EVO", 'FOLIO_EVO', 'DESCRIP_SERV_EVO'],
        label: ["Fecha", "Hora", 'Medico', '', 'Folio', 'Unserv'],
        ancho: "1000px",
        // foot:''
        data: $this.dataArray['EVOLUCIONES'] ? $this.dataArray['EVOLUCIONES'] : $evoluciones,
        callback_esc: () => {

          document.querySelector('#rangoDesde_705').style.display = "block";
          document.querySelector('#rangoHasta_705').style.display = "block";
          if ($this.dataArray['EVOLUCIONES'] != '') {
            var fechaEvo =  $this.dataArray['EVOLUCIONES'].map(e => e['FECHA_EVO']);
            var fechaDesde = fechaEvo.reduce((a, b) => { a <= b; return b });
            var fechaHasta = fechaEvo.reduce((a, b) => { a <= b; return a })

            $this.form.añoDesde_705 = fechaDesde.substring(0, 4);
            $this.form.mesDesde_705 = fechaDesde.substring(4, 6);
            $this.form.diaDesde_705 = fechaDesde.substring(6, 8);

            $this.form.añoHasta_705 = fechaHasta.substring(0, 4);
            $this.form.mesHasta_705 = fechaHasta.substring(4, 6);
            $this.form.diaHasta_705 = fechaHasta.substring(6, 8);
          }

          $this.validarfecha_HC705('1');
        },
        callback: async (data) => {
          await $this.seleccionarEvolucion_HC705(data);
          await $this.dataEvolucion_PACIENTE_HC705();
          // await $this.validarTipoEvo_HC705();
          // await $this.grabarAuditoria_HC705();
        }
      });
    },
    validarTipoEvo_HC705() {
      const tipo_evo = $this.data_evo['TIPO_EVO'].toString();
      const opc_impresion = $this.data_evo['OPC_EVO'];
      var datos_evo = $this.data_evo;

      $this.form['opc_evo'] = opc_impresion['EVOMED'];
      $this.form['opc_enf'] = opc_impresion['ENFERM'];
      $this.form['opc_ter'] = opc_impresion['TERAP'];
      $this.form['opc_for'] = opc_impresion['FORMUL'];
      $this.form['opc_lab'] = opc_impresion['LABOR'];
      $this.form['opc_ima'] = opc_impresion['IMAGE'];
      $this.form['opc_ord'] = opc_impresion['ORDMED'];
      $this.form['opc_con'] = opc_impresion['CONSUL'];
      $this.form['opc_inc'] = opc_impresion['INCAP'];
      $this.form['opcImpResu'] = opc_impresion['RESUM'];

      var data_envio = '';
      switch (tipo_evo.toUpperCase()) {
        case '7':
          $this.form.opcImpResu = 'N';
          data_envio = datos_evo['OPER_EVO'] + '|' + datos_evo['OPER_EVO'] + '|' + $this.form.opcImpResu;
          // _imprimirCIRI01(data_envio);
          break;
        case '8':
          $this.form.opcImpResu = 'N';
          data_envio = datos_evo['OPER_EVO'] + '|' + datos_evo['OPER_EVO'] + '|' + $this.form.opcImpResu;
          // _imprimirCIRI03(data_envio);
          break;
        case 'C':
          $this.form.opcImpResu = 'N';
          $this.jsonEnvio = {
            folio: $this.data_evo['FOLIO_EVO'],
            macro: $this.data_evo['MACRO_EVO'],
            id: $this.data_evo['ID_EVO'],
            oper: $this.data_evo['OPER_EVO'],
            medic: $this.data_evo['MEDICO_EVO'],
            fecha: $this.data_evo['FECHA_EVO'],
            hora: $this.data_evo['HORA_EVO'],
            tipoEvo: $this.data_evo['TIPO_EVO'],
            _arrayTipoEvo: $this.dataArray['TIPO_EVO'],
            _unservDescrip: $this._unservDescrip,
            _unservCod: $this._unservCod,
            _opciones: {
              opc_evo: $this.form.opc_evo.toUpperCase(),
              opc_enf: $this.form.opc_enf.toUpperCase(),
              opc_ter: $this.form.opc_ter.toUpperCase(),
              opc_for: $this.form.opc_for.toUpperCase(),
              opc_lab: $this.form.opc_lab.toUpperCase(),
              opc_ima: $this.form.opc_ima.toUpperCase(),
              opc_ord: $this.form.opc_ord.toUpperCase(),
              opc_con: $this.form.opc_con.toUpperCase(),
              opc_inc: $this.form.opc_inc.toUpperCase(),
              opc_resum: $this.form.opcImpResu.toUpperCase(),
              fechaIni: $this.fechaIni,
              fechaFin: $this.fechaFin,
              opc_macro: $this.data_evo['MACRO_EVO']
            }
          }
          // iniciarHCI02($this.jsonEnvio);
          break;

        default:
          $this.validarOpcionesImp_HC705('1');
          // $this.ordenImpresion_HC705();

          break;
      }

    },
    validarOpcionesImp_HC705(orden) {
      const total = document.querySelectorAll('[id*="validarOpcImp_"]').length;
      validarInputs(
        { form: `#validarOpcImp_${orden}`, orden: "1" },
        () => {//----- Anterior <=
          const indice = parseInt(orden) - 1;
          var nodo = document.querySelectorAll('[id*="validarOpcImp_"]')[indice];
          var input = nodo.getElementsByTagName('INPUT')[0].value;

          if (orden == '1') $this.ventanEvo_HC705();
          else {
            input.toUpperCase() != 'N' && input.toUpperCase() != 'S'
              ? $this.validarOpcionesImp_HC705(orden)
              : $this.validarOpcionesImp_HC705(orden - 1);
            ;
          }
        },
        async () => {//------ Siguiente =>
          const indice = parseInt(orden);

          var nodo = document.querySelectorAll('[id*="validarOpcImp_"]')[indice - 1];
          var input = nodo.getElementsByTagName('INPUT')[0].value;

          if (indice < total) {
            input.toUpperCase() != 'N' && input.toUpperCase() != 'S'
              ? $this.validarOpcionesImp_HC705(indice)
              : $this.validarOpcionesImp_HC705(indice + 1);
          } else {
            if (input.toUpperCase() != 'N' && input.toUpperCase() != 'S') {
              await $this.validarOpcionesImp_HC705(indice)
            } else {
              await $this.ordenImpresion_HC705();
            }
          }
        }
      )
    },
    async recorrerEvoluciones_HC705() {
      loader('show');
      const fechaIni = $this.form.añoDesde_705.concat($this.form.mesDesde_705, $this.form.diaDesde_705);
      $this.fechaIni = fechaIni;

      const fechaFin = $this.form.añoHasta_705.concat($this.form.mesHasta_705, $this.form.diaHasta_705);
      $this.fechaFin = fechaFin;

      $this.arrayImp = []
      for (var i in $this.dataArray.EVOLUCIONES) {
        if (parseFloat($this.dataArray.EVOLUCIONES[i].FECHA_EVO) >= parseInt(fechaIni) && parseFloat($this.dataArray.EVOLUCIONES[i].FECHA_EVO) <= parseInt(fechaFin)) {
          $this.arrayImp.push($this.dataArray.EVOLUCIONES[i])
        }
      }

      for (var i in $this.arrayImp) {
        await $this.seleccionarEvolucion_HC705($this.arrayImp[i]);
        await $this.ordenImpresionPorFechas_HC705($this.arrayImp[i].OPC_EVO);
      }

      await unirPdfs_mainHc($this.arrayBase64);

      loader('hide');
      toastr.success("Cargando impresión/es");
      _regresar_menuhis();
    },
    async seleccionarEvolucion_HC705(data) {
      $this.reset();
      const llave = data['ID_EVO'].concat(data['FOLIO_EVO'], data['FECHA_EVO'], data['HORA_EVO'], data['OPER_ELAB_EVO']);
      $this.data_evo['LLAVE_EVO'] = llave;

      $this.data_evo['ID_EVO'] = data['ID_EVO'];
      $this.data_evo['FOLIO_EVO'] = data['FOLIO_EVO'];
      $this.data_evo['FECHA_EVO'] = data['FECHA_EVO'];
      $this.data_evo['HORA_EVO'] = data['HORA_EVO'];
      $this.data_evo['MACRO_EVO'] = data['MACRO_EVO'];
      $this.data_evo['TIPO_EVO'] = data['TIPO_EVO'];
      $this.data_evo['MEDICO_EVO'] = data['MEDICO_EVO'];
      $this.data_evo['OPER_EVO'] = data['OPER_ELAB_EVO'];
      $this.data_evo['SERV_EVO'] = data['SERV_EVO'];
      $this.data_evo['VIA_EVO'] = data['VIA_EVO'];
      $this.data_evo['OPC_EVO'] = data['OPC_EVO'];
      $this.data_evo['NOM_MEDICO'] = data['NOM_MEDICO'];

      // await $this.dataEvolucion_PACIENTE_HC705();

      $this.form['año_705'] = data['FECHA_EVO'].substring(0, 4);
      $this.form['mes_705'] = data['FECHA_EVO'].substring(4, 6);
      $this.form['dia_705'] = data['FECHA_EVO'].substring(6, 8);

      $this.form['hr_705'] = data['HORA_EVO'].substring(0, 2);
      $this.form['min_705'] = data['HORA_EVO'].substring(2, 4);

      var profesional = $this.dataArray['PROFESIONALES'].find(e => parseInt(e['IDENTIFICACION']) == parseInt($_REG_PROF.IDENTIFICACION));
      profesional = profesional ? profesional : { 'NOMBRE': '', 'IDENTIFICACION': '', 'ATIENDE_PROF': '' };
      if (profesional['NOMBRE'] !== '') {
        profesional['NOMBRE'] = profesional ? profesional['NOMBRE'].replace(/\&/g, "\n").trim() : ' ';
        profesional['NOMBRE'] = profesional ? profesional['NOMBRE'].replace(/\�/g, "Ñ").trim() : ' ';
      }

      const atiende = profesional ? $this.dataArray['PROFESION'].find(e => e['COD'].trim() == profesional['ATIENDE_PROF'].trim()) : ' ';
      $this.form['medico_705'] = profesional ? profesional['IDENTIFICACION'] : ' ';
      $this.form['descripMedico_705'] = profesional ? profesional['NOMBRE'] : ' ' + '   ' + profesional ? atiende['DESCRIP'] : ' ';

      $this.form['consulta_705'] = data['PROCED_EVO'];

      $this.añoDesde_705 = '0'; $this.mesDesde_705 = '0'; $this.diaDesde_705 = '0';
      $this.añoHasta_705 = '0'; $this.mesHasta_705 = '0'; $this.diaHasta_705 = '0';

      $this.evo_select['llave'] = llave;
      $this.evo_select['macro'] = $this.data_evo['MACRO_EVO'];

      const tipo_evo = $this.dataArray['TIPO_EVO'].find(e => e['COD'].trim() == $this.data_evo['TIPO_EVO'])
      $this.evo_select['tipo'] = tipo_evo['COD'] + ' - ' + tipo_evo['DESCRIP'];

      const unser_evo = $this.dataArray['UNSERV'].find(e => e['COD'].padStart(2, '0') == $this.data_evo['SERV_EVO'].padStart(2, '0'));
      $this._unservDescrip = unser_evo.DESCRIP;
      $this._unservCod = $_REG_HC['unser_hc'];
      $this.evo_select['unser'] = $_REG_HC['unser_hc'] + ' - ' + unser_evo.DESCRIP;
      $this.dataArray['UNSERV']

      document.querySelector('#rangoDesde_705').style.display = "none";
      document.querySelector('#rangoHasta_705').style.display = "none";
    },
    grabarAuditoria_HC705() {
      const paci_log = [
        $this.data_evo['LLAVE_EVO'].substring(0, 9),
        $this.data_evo['LLAVE_EVO'].substring(9, 15)
      ]
      const folio = $this.data_evo['FOLIO_EVO'];
      const reg_aud_w = {
        tipo_aud: paci_log[1],
        suc_aud: 'HC',
        noved_aud: 6,
        datos_log: paci_log[0].concat(paci_log[1], ' ', folio, ' ', '7.5')
      }

      const datoslog = reg_aud_w['tipo_aud'].concat(reg_aud_w['suc_aud'], reg_aud_w['noved_aud'], reg_aud_w['datos_log']);

      var extra = datoslog;

      var parametros = {
        Id: "975",
        Descripcion: "Formulacion medica",
        Tipo: "RM",
        Params: [{ dll: `CONTAB\\CON090`, extra: extra }],
      };

      _validarVentanaMain(parametros, () => {
        // callback();
      });
    },
    ocultar() {
      // $this.ventanEvo_HC705();
      _regresar_menuhis();

      document.querySelector('#rangoDesde_705').style.display = "none";
      document.querySelector('#rangoHasta_705').style.display = "none";
    },
    validarfecha_HC705(orden) {
      $this.multiple = true;
      var indice = 0;
      const total = 6;

      validarInputs(
        { form: `#validarFecha_${orden}`, orden: "1", },

        () => {//----- Anterior <=
          indice = parseInt(orden) - 1;

          if (orden == '1') {
            $this.ocultar();
          } else $this.validarfecha_HC705(indice);
        },
        () => {//------ Siguiente =>
          indice = parseInt(orden);

          if (indice < total) {
            const validarFecha = $this.validarFormatoFecha_HC705(indice);

            !validarFecha
              ? $this.validarfecha_HC705(indice)
              : $this.validarfecha_HC705(indice + 1);

          } else {
            const validarFecha = $this.validarFormatoFecha_HC705(indice);

            !validarFecha
              ? $this.validarOpcionesImp_HC705('1')
              : $this.recorrerEvoluciones_HC705();
          }
        }
      )
    },
    _cargarColeccionDatos_HC705() {
      loader('show');
      $this._obtenerDataArray('UNSERV', 'UNSERV')
        .then((unserv) => {
          $this.dataArray['UNSERV'] = unserv;
          return $this._obtenerDataArray('PROFESION', 'PROFESION');
        })
        .then((profesion) => {
          $this.dataArray['PROFESION'] = profesion;
          return $this._obtenerDataArray('PROFESIONALES', 'ARCHPROF');
        })
        .then((profesionales) => {
          $this.dataArray['PROFESIONALES'] = profesionales;

          // var unserv;
          // var busq = $this.dataArray['UNSERV'].find(e => e['COD'] == $_REG_HC['unser_hc']);
          // busq != undefined ? unserv = busq.DESCRIP : unserv = $_REG_HC['unser_hc'];

          const filtro = `${$_REG_PACI['COD']}|${$_REG_HC['suc_folio_hc'] + $_REG_HC['nro_folio_hc']}|1`;
          return $this._obtenerDataArray('EVOL_PACI', 'EVOLUCIONES', filtro);
        })
        .then(async (evoluciones) => {
          $this.dataArray['EVOLUCIONES'] = evoluciones;
          // await $this.cargarArchivos();
          loader('hide');
          $this.ventanEvo_HC705();
        })
      $this.dataArray['TIPO_EVO'] = tipoEvolucion()
    },
    _obtenerDataArray(nombre, indice, filtro) {
      return new Promise((resolve, reject) => {
        const nombreFD = nombre; let datos;
        setTimeout(() => {
          obtenerDatosCompletos({ nombreFd: nombreFD, filtro: filtro || '' }, (data) => {
            datos = data;
            datos[indice].lenght <= 1 ? datos[indice] : datos[indice].pop();
            datos
              ? resolve(datos[indice])
              : reject(new Error('error al consultar coleccion ' + nombreFD));
          });
        }, 'ONLY')
      })
    },
    validarFormatoFecha_HC705(orden) {
      var find = '', retorno = true, nodo = '', tipo = '';

      nodo = document.querySelectorAll('[id*="validarFecha_"]')[parseInt(orden) - 1];
      nodo = nodo.getElementsByTagName('INPUT')[0];

      const list_node = ['año', 'mes', 'dia'];

      for (let i in list_node) if (nodo.id.indexOf(list_node[i]) != -1) find = list_node[i];

      tipo = find;

      switch (tipo) {
        case 'año':
          const año = nodo.value;
          $this.fecha_total['año'] = año;

          if (año.length < 4) {
            CON851('03', 'Digite un año valido', null, 'error', 'error');
            $this.validarfecha_HC705(orden);
          } else {
            if (!moment(año.trim()).isValid() || año > moment().format('YYYY') || año < 1970) {
              CON851('03', 'Digite un año valido', null, 'error', 'error');
              retorno = false;
            }
          }

          break;
        case 'mes':
          const mes = nodo.value;
          $this.fecha_total['mes'] = mes;

          if ((parseInt(mes) > 12 || parseInt(mes) < 0)) {
            CON851('03', 'Digite un mes valido', null, 'error', 'error');
            retorno = false;
          }
          break;

        case 'dia':
          const dia = nodo.value;
          $this.fecha_total['dia'] = dia;

          let tip = '';
          try {
            tip = document.querySelectorAll('[id*="validarFecha_"]')[parseInt(orden)]
              .previousSibling.parentNode.previousSibling.parentElement.getElementsByTagName('INPUT')[2].value
              .getAttributeNode('v-model').value;

            var fecha_total = fecha.año.concat(fecha.mes, fecha.dia);
            fecha_total = moment(fecha_total).format('YYYYMMDD');

            if (!moment(fecha_total).isValid()) {
              fecha.dia = null;
              CON851('03', 'Digite un día valido', null, 'error', 'error');
              $this.validarfecha_HC705(orden);
            } else {
              festivo = buscarFestivo(fecha_total)
              if (typeof festivo == 'undefined') {
                retorno = true;
              } else {
                CON851('9Q', '9Q', null, 'error', 'Error');
                $this.validarfecha_HC705(orden);
              }
            }
          } catch {
            tip = 'false';
            tip = tip.indexOf('sd') != -1 ? 'desde' : 'hasta';

            var fecha_total = $this.fecha_total['año'].concat($this.fecha_total['mes'], $this.fecha_total['dia']);
            fecha_total = moment(fecha_total).format('YYYYMMDD');

            if (!moment(fecha_total).isValid()) {
              fecha.dia = null;
              CON851('03', 'Digite un día valido', null, 'error', 'error');
              $this.validarfecha_HC705(orden);
            } else {
              festivo = buscarFestivo(fecha_total)
              if (typeof festivo == 'undefined') {
                retorno = true;
              } else {
                CON851('9Q', '9Q', null, 'error', 'Error');
                $this.validarfecha_HC705(orden);
              }
            }
          }

          break;

        default:
          CON851('03', 'Digite un valor valido', null, 'error', 'error');
          $this.validarfecha_HC705(orden);
          break;
      }
      return retorno;

    },
    async ordenImpresion_HC705() {
      $this.arrayDatos_HCI02._profesionales = $this.dataArray['PROFESIONALES'];
      $this.arrayDatos_HCI02._unserv = $this.dataArray['UNSERV'];

      loader('show');
      $this.jsonEnvio = {
        folio: $this.data_evo['FOLIO_EVO'],
        macro: $this.data_evo['MACRO_EVO'],
        id: $this.data_evo['ID_EVO'],
        oper: $this.data_evo['OPER_EVO'],
        medic: $this.data_evo['MEDICO_EVO'],
        fecha: $this.data_evo['FECHA_EVO'],
        hora: $this.data_evo['HORA_EVO'],
        tipoEvo: $this.data_evo['TIPO_EVO'],
        _arrayTipoEvo: $this.dataArray['TIPO_EVO'],
        _unservDescrip: $this._unservDescrip,
        _unservCod: $this._unservCod,
        _arrayUnserv: $this.dataArray['UNSERV'],
        original: 0,
        _opciones: {
          opc_evo: $this.form.opc_evo.toUpperCase(),
          opc_enf: $this.form.opc_enf.toUpperCase(),
          opc_ter: $this.form.opc_ter.toUpperCase(),
          opc_for: $this.form.opc_for.toUpperCase(),
          opc_lab: $this.form.opc_lab.toUpperCase(),
          opc_ima: $this.form.opc_ima.toUpperCase(),
          opc_ord: $this.form.opc_ord.toUpperCase(),
          opc_con: $this.form.opc_con.toUpperCase(),
          opc_inc: $this.form.opc_inc.toUpperCase(),
          opc_resum: $this.form.opcImpResu.toUpperCase(),
          fechaIni: $this.fechaIni,
          fechaFin: $this.fechaFin,
          opc_macro: $this.data_evo['MACRO_EVO']
        },
        arrayDatos_HCI02: $this.arrayDatos_HCI02,
        resumido: false
      }
      const cl_macro = $this.data_evo['MACRO']['CLASE'];

      const par_opc = ['opc_evo', 'opc_enf', 'opc_ter', 'opc_for', 'opc_lab', 'opc_ima', 'opc_ord', 'opc_inc'];

      Object.entries($this.form).forEach(([key, value]) => {
        for (var i in par_opc) {
          if (key == par_opc[i]) {
            $this.form[key] = 'S';
          } else {
            $this.form[key] = 'N';
          }
        }
      })

      $this.jsonEnvio['consen_bandera'] = cl_macro == 'C' ? true : false;

      await _iniciarHCI02($this.jsonEnvio).then(data => {
        $this.arrayBase64.push(data);
      })

      loader('hide');
      toastr.success("Cargando impresión/es");
      _regresar_menuhis();
    },

    async ordenImpresionPorFechas_HC705(opciones) {
      $this.arrayDatos_HCI02._profesionales = $this.dataArray['PROFESIONALES'];
      $this.arrayDatos_HCI02._unserv = $this.dataArray['UNSERV'];

      $this.jsonEnvio = {
        folio: $this.data_evo['FOLIO_EVO'],
        macro: $this.data_evo['MACRO_EVO'],
        id: $this.data_evo['ID_EVO'],
        oper: $this.data_evo['OPER_EVO'],
        medic: $this.data_evo['MEDICO_EVO'],
        fecha: $this.data_evo['FECHA_EVO'],
        hora: $this.data_evo['HORA_EVO'],
        tipoEvo: $this.data_evo['TIPO_EVO'],
        _arrayTipoEvo: $this.dataArray['TIPO_EVO'],
        _unservDescrip: $this._unservDescrip,
        _unservCod: $this._unservCod,
        _arrayUnserv: $this.dataArray['UNSERV'],
        original: 0,
        _opciones: {
          opc_evo: opciones.EVOMED.toUpperCase(),
          opc_enf: opciones.ENFERM.toUpperCase(),
          opc_ter: opciones.TERAP.toUpperCase(),
          opc_for: opciones.FORMUL.toUpperCase(),
          opc_lab: opciones.LABOR.toUpperCase(),
          opc_ima: opciones.IMAGE.toUpperCase(),
          opc_ord: opciones.ORDMED.toUpperCase(),
          opc_con: opciones.CONSUL.toUpperCase(),
          opc_inc: opciones.INCAP.toUpperCase(),
          fechaIni: $this.fechaIni,
          fechaFin: $this.fechaFin,
          opc_macro: $this.data_evo['MACRO_EVO']
        },
        arrayDatos_HCI02: $this.arrayDatos_HCI02,
        resumido: true
      }
      await _iniciarHCI02($this.jsonEnvio).then(data => {
        $this.arrayBase64.push(data);
      })
    },

    dataEvolucion_PACIENTE_HC705() {
      var datos_envio = datosEnvio();

      datos_envio += $this.data_evo['LLAVE_EVO'] + '|';
      datos_envio += localStorage['Usuario'] + '|';
      datos_envio += localStorage['IDUSU'] + '|||';
      datos_envio += 'CONS' + '|';

      $this.data_evo['ENV'] = datos_envio;

      const peticion = postData({ datosh: $this.data_evo['ENV'] }, get_url("APP/HICLIN/HC002.DLL"));
      peticion.then((data) => {
        Object.entries(data["EVOLUCION"][0]).forEach(([key, value]) => {
          if (typeof value == 'String') {
            if (typeof $this.data_evo[key] == 'undefined' && value.trim() != '') $this.data_evo[key] = normalizar(value);
          }
          else if (typeof $this.data_evo[key] == 'undefined') $this.data_evo[key] = value;
        })
        $this.validarTipoEvo_HC705();

      }).catch((err) => {
        console.log(err, 'err');
        loader('hide'); $this.init_HC705();
      });
    },

    async cargarArchivos() {
      loader('show');
      $this.arrayDatos_HCI02 = {};

      postData({ datosh: datosEnvio() }, get_url("app/SALUD/SER855.DLL"))
        .then(data => {
          $this.arrayDatos_HCI02._especialidades = data.ESPECIALIDADES;
          $this.arrayDatos_HCI02._especialidades.pop();
        }).catch(err => {
          console.log(err, 'error')
          loader('hide')
          _regresar_menuhis();
        })

      postData({ datosh: datosEnvio() }, get_url("app/SALUD/SER854.DLL"))
        .then(data => {
          $this.arrayDatos_HCI02._ocupaciones = data.OCUPACIONES;
          $this.arrayDatos_HCI02._ocupaciones.pop();
        }).catch(err => {
          console.log(err, 'error')
          loader('hide')
          _regresar_menuhis();
        })

      await postData({ datosh: datosEnvio() }, get_url("app/SALUD/SER853.DLL"))
        .then(data => {
          $this.arrayDatos_HCI02._entidades = data.ENTIDADES;
          $this.arrayDatos_HCI02._entidades.pop();
        }).catch(err => {
          console.log(err, 'error')
          loader('hide')
          _regresar_menuhis();
        })

      await postData({ datosh: datosEnvio() }, get_url("app/CONTAB/CON809.DLL"))
        .then(data => {
          $this.arrayDatos_HCI02._ciudades = data.CIUDAD;
          $this.arrayDatos_HCI02._ciudades.pop();
        }).catch(err => {
          console.log(err, 'error')
          loader('hide')
          _regresar_menuhis();
        })

      await postData({ datosh: datosEnvio() }, get_url("app/SALUD/SER888.DLL"))
        .then(data => {
          $this.arrayDatos_HCI02._paisesRips = data.PAISESRIPS;
          $this.arrayDatos_HCI02._paisesRips.pop();
        }).catch(err => {
          console.log(err, 'error')
          loader('hide')
          _regresar_menuhis();
        })

      $this.arrayDatos_HCI02._evolucion = $this.data_evo;
    }
  },
})