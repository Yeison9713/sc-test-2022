new Vue({
  el: '#HC000',
  data: {
    datosIni: {
      fecha_HC000: '',
      hora_HC000: '',
    },
    global_HC000: {
      ANALISIS_TRIA: '',
      ANTECED_FAMIL_TRIA: '',
      ANTECED_PATOL_TRIA: '',
      ANTECED_QUIRUR_TRIA: '',
      ANTECED_ALERGICOS_TRIA: '',
      ATIENDE_PROF: '',
      CAUSA_TRIA: '',
      CHIKUN_TRIA: '',
      COMP_SERV_TRIA: '',
      CONDUCTA_TRIA: '',
      CONSUL_TRIA: '',
      DESCRIP_CAUSA_TRIA: '',
      DESCRIP_CONDUCTA_TRIA: '',
      DESCRIP_EMBAR_TRIA: '',
      DESCRIP_FINALID_TRIA: '',
      DESCRIP_PROF: '',
      EDAD_GEST_TRIA: '',
      EDAD_TRIA: '',
      EMBAR_TRIA: '',
      ENTIDAD: '',
      EPS_TRIA: '',
      ERA_TRIA: '',
      EXAMEN_FISICO_TRIA: [
        {
          ALTERADO_EXA_TRIA: '',
          EXA_FISICO_TRIA: '',
        },
        {
          ALTERADO_EXA_TRIA: '',
          EXA_FISICO_TRIA: '',
        },
        {
          ALTERADO_EXA_TRIA: '',
          EXA_FISICO_TRIA: '',
        },
        {
          ALTERADO_EXA_TRIA: '',
          EXA_FISICO_TRIA: '',
        },
        {
          ALTERADO_EXA_TRIA: '',
          EXA_FISICO_TRIA: '',
        },
        {
          ALTERADO_EXA_TRIA: '',
          EXA_FISICO_TRIA: '',
        },
        {
          ALTERADO_EXA_TRIA: '',
          EXA_FISICO_TRIA: '',
        },
        {
          ALTERADO_EXA_TRIA: '',
          EXA_FISICO_TRIA: '',
        },
      ],
      FACT_TRIA: '',
      FCARD_TRIA: '',
      FECHA_ATEN_TRIA: '',
      FECHA_REGLA_TRIA: '',
      FINALID_TRIA: '',
      FOLIO_CONSUL_TRIA: '',
      FRESP_TRIA: '',
      GLASG_EDIT_TRIA: '',
      GLASG_TRIA: '',
      HORA_ATEN_TRIA: '',
      INDICACIONES_TRIA: '',
      ING_REMITIDO_TRIA: '',
      LLAVE_TRIA: '',
      MEDICO_TRIA: '',
      MEDLEGAL_TRIA: '',
      MOTIV_TRIA: '',
      MSJ_ENCAB: '',
      NOMBRE_CIU: '',
      NOMBRE_ENT: '',
      OBSER_INI_TRIA: '',
      OBSER_TRIA: '',
      OPER_ELABHC_TRIA: '',
      OPER_ELAB_TRIA: '',
      OPER_MODIHC_TRIA: '',
      OPER_MODI_TRIA: '',
      OXIMETRIA_TRIA: '',
      PESO_EDIT: '',
      PESO_GRAMOS_TRIA: '',
      PESO_TRIA: '',
      PREFE_TRIA: '',
      PRIORIDAD_TRIA: '',
      PROCED_TRIA: '',
      PUERTA_ING_TRIA: '',
      PYP_TRIA: '',
      REINGRESO_TRIA: '',
      REMITIDO_TRIA: '',
      SINTOM_OBSTE_TRIA: '',
      SUCURSAL_TRIA: '',
      TALLA_TRIA: '',
      TEMP_TRIA: '',
      TENS1_TRIA: '',
      TENS2_TRIA: '',
      TRAUMA_TRIA: '',
      TURNO_TRIA: '',
      UMI_TRIA: '',
      UND_PESO_TRIA: '',
      DESCRIP_PACI: '',
      COD_PACI: '',
      SEXO_PACI: '',
      DIRECC_PACI: '',
      TELEFONO_PACI: '',
      NOMBRE_ESP_MEDICO: '',
      REG_MEDICO: ''
    },
    auxiliares: {
      peso_text: '',
      DESCRIP_INGRESO: '',
    },
    temp: IMask.createMask({ mask: Number, radix: '.', padFractionalZeros: true, signed: false, scale: 1, min: 0000, max: 99.9 }),
    admin_w: localStorage.Usuario,
    arrayIngreso: [
      { COD: '1', DESCRIP: 'URGENCIAS' },
      { COD: '2', DESCRIP: 'CONSULTA EXT.' },
      { COD: '3', DESCRIP: 'REMITIDO' },
      { COD: '4', DESCRIP: 'NACIDO INSTI.' },
    ],
    arrayEmbar: [
      { COD: '1', DESCRIP: 'EMBARAZO PRIMER TRIMESTRE' },
      { COD: '2', DESCRIP: 'EMBARAZO SEGUNDO TRIMESTRE' },
      { COD: '3', DESCRIP: 'EMBARAZO TERCER TRIMESTRE' },
      { COD: '4', DESCRIP: 'NO ESTA EMBARAZADA' },
    ],
    arrayCausa: [
      { COD: '1', DESCRIP: 'ACCIDENTE TRABAJO' },
      { COD: '2', DESCRIP: 'ACCIDENTE TRANSITO' },
      { COD: '3', DESCRIP: 'ACCIDENTE RABICO' },
      { COD: '4', DESCRIP: 'ACCIDENTE OFIDICO' },
      { COD: '5', DESCRIP: 'OTRO ACCIDENTE' },
      { COD: '6', DESCRIP: 'EVENTO CATASTROFIC' },
      { COD: '7', DESCRIP: 'LESION AGRESION' },
      { COD: '8', DESCRIP: 'LESION AUTO INFLIG' },
      { COD: '9', DESCRIP: 'SOSP.MALTRATO FIS' },
      { COD: '10', DESCRIP: 'SOSP.ABUSO SEXUAL' },
      { COD: '11', DESCRIP: 'SOSP.VIOLENCIA SEX' },
      { COD: '12', DESCRIP: 'SOSP.MALTRATO EMOC' },
      { COD: '13', DESCRIP: 'ENFERMEDAD GENERAL' },
      { COD: '14', DESCRIP: 'ENFERMEDAD PROFES' },
      { COD: '15', DESCRIP: 'OTRA CAUSA' },
    ],
    arrayFinalid: [
      { COD: '1', DESCRIP: "ATENCION PARTO  puerperio" },
      { COD: '2', DESCRIP: "ATENCION RECIEN NACIDO   " },
      { COD: '3', DESCRIP: "ATENCION PLANIF.FAMILIAR " },
      { COD: '4', DESCRIP: "ATEN.ALT. CREC Y DES < 10" },
      { COD: '5', DESCRIP: "DETECCION ALT.DESAR.JOVEN" },
      { COD: '6', DESCRIP: "DETECCION ALTER. EMBARAZO" },
      { COD: '7', DESCRIP: "DETECCION ALTER. ADULTO  " },
      { COD: '8', DESCRIP: "DETECCION ALTER. AGUD VIS" },
      { COD: '9', DESCRIP: "DETECCION ENFERMED.PROFES" },
      { COD: '10', DESCRIP: "NO APLICA                " },
      { COD: '11', DESCRIP: "PATOLOGIA CRONICA        " }
    ],
    arrayConducta: [
      { COD: '1', DESCRIP: "CONSULTA URGENCIAS" },
      { COD: '2', DESCRIP: "CONSULTA EXTERNA  " },
      { COD: '3', DESCRIP: "HOSPITALIZADO     " },
      { COD: '4', DESCRIP: "REMITIDO A:       " },
      { COD: '5', DESCRIP: "NO SE ATIENDE     " },
      { COD: '6', DESCRIP: "ANULADO           " },
      { COD: '7', DESCRIP: "RE-INGRESO        " }
    ],
    nit_usu: $_USUA_GLOBAL[0].NIT,
    hr_act: moment().format('HH'),
    global_HC000_copia: [],
    flujo_bloques: {
      triage: false,
      examen_fisico: false,
      signos_vitales: false,
      sintomas: false,
      analisis: false,
      rips: false
    }
  },
  async created(data) {
    console.log(data, 'data');
    nombreOpcion('TRIAGE')
    _inputControl('disabled');
    _inputControl('reset');
    $this = this;
    loader('show');
    await this.cargarArchivos_HC000();
    this.llenarDatosIni_HC000();
  },
  methods: {
    async llenarDatosIni_HC000() {
      this.datosIni.fecha_HC000 = moment().format('YYYY/MM/DD');
      this.datosIni.hora_HC000 = moment().format('HH:mm');

      $this.buscarTriage_HC000();
      // $this.ventanaInicial_HC000();
    },
    async buscarTriage_HC000() {
      await postData({ datosh: datosEnvio() + localStorage.Usuario + '|' + $_REG_HC.edad_w + '|' + localStorage.IDUSU + '|' + $_REG_HC.llave_triage_w + '|' }, get_url("APP/HICLIN/HC000.DLL"))
        .then(async (data) => {
          console.log(data, 'data TRIAGE');
          global_HC000_copia = data;

          $this.global_HC000.ANALISIS_TRIA = data.ANALISIS_TRIA.replace(/\&/g, "\n").trim();
          $this.global_HC000.ANTECED_FAMIL_TRIA = data.ANTECED_FAMIL_TRIA.replace(/\&/g, "\n").trim();
          $this.global_HC000.ANTECED_PATOL_TRIA = data.ANTECED_PATOL_TRIA.replace(/\&/g, "\n").trim();
          $this.global_HC000.ANTECED_QUIRUR_TRIA = data.ANTECED_QUIRUR_TRIA.replace(/\&/g, "\n").trim();
          $this.global_HC000.ANTECED_ALERGICOS_TRIA = data.ANTECED_ALERGICOS_TRIA.replace(/\&/g, "\n").trim();
          $this.global_HC000.ATIENDE_PROF = data.ATIENDE_PROF.trim();
          $this.global_HC000.CAUSA_TRIA = data.CAUSA_TRIA.trim();
          $this.global_HC000.CHIKUN_TRIA = data.CHIKUN_TRIA.trim();
          $this.global_HC000.COMP_SERV_TRIA = data.COMP_SERV_TRIA.trim();
          $this.global_HC000.CONDUCTA_TRIA = data.CONDUCTA_TRIA.trim();
          $this.global_HC000.CONSUL_TRIA = data.CONSUL_TRIA.trim();
          $this.global_HC000.DESCRIP_CAUSA_TRIA = data.DESCRIP_CAUSA_TRIA.trim();
          $this.global_HC000.DESCRIP_CONDUCTA_TRIA = data.DESCRIP_CONDUCTA_TRIA.trim();
          $this.global_HC000.DESCRIP_EMBAR_TRIA = data.DESCRIP_EMBAR_TRIA.trim();
          $this.global_HC000.DESCRIP_FINALID_TRIA = data.DESCRIP_FINALID_TRIA.trim();
          $this.global_HC000.DESCRIP_PROF = data.DESCRIP_PROF.trim();
          $this.global_HC000.EDAD_GEST_TRIA = data.EDAD_GEST_TRIA.trim();
          $this.global_HC000.EDAD_TRIA = isNaN(parseFloat(data.EDAD_TRIA.substring(1, 4))) ? data.EDAD_TRIA.substring(0, 1) + '0  ' : data.EDAD_TRIA;
          $this.global_HC000.EMBAR_TRIA = data.EMBAR_TRIA.trim();
          $this.global_HC000.EPS_TRIA = data.EPS_TRIA.trim();
          $this.global_HC000.ENTIDAD = data.ENTIDAD.trim();
          $this.global_HC000.ERA_TRIA = data.ERA_TRIA.trim();

          for (var i in data.EXAMEN_FISICO_TRIA) {
            $this.global_HC000.EXAMEN_FISICO_TRIA[i].ALTERADO_EXA_TRIA = data.EXAMEN_FISICO_TRIA[i].ALTERADO_EXA_TRIA.trim();
            $this.global_HC000.EXAMEN_FISICO_TRIA[i].EXA_FISICO_TRIA = data.EXAMEN_FISICO_TRIA[i].EXA_FISICO_TRIA.replace(/\&/g, "\n").trim();
          }

          $this.global_HC000.FACT_TRIA = data.FACT_TRIA.trim();
          $this.global_HC000.FCARD_TRIA = isNaN(parseFloat(data.FCARD_TRIA)) ? 0 : parseFloat(data.FCARD_TRIA);
          $this.global_HC000.FECHA_ATEN_TRIA = data.FECHA_ATEN_TRIA.trim();
          $this.global_HC000.FECHA_REGLA_TRIA = data.FECHA_REGLA_TRIA.trim();
          $this.global_HC000.FINALID_TRIA = data.FINALID_TRIA.trim();
          $this.global_HC000.FOLIO_CONSUL_TRIA = data.FOLIO_CONSUL_TRIA.trim();
          $this.global_HC000.FRESP_TRIA = isNaN(parseFloat(data.FRESP_TRIA)) ? 0 : parseFloat(data.FRESP_TRIA);
          $this.global_HC000.GLASG_EDIT_TRIA = data.GLASG_EDIT_TRIA.trim();
          $this.global_HC000.GLASG_TRIA = data.GLASG_TRIA.trim();
          $this.global_HC000.HORA_ATEN_TRIA = data.HORA_ATEN_TRIA.trim();
          $this.global_HC000.INDICACIONES_TRIA = data.INDICACIONES_TRIA.replace(/\&/g, "\n").trim();
          $this.global_HC000.ING_REMITIDO_TRIA = data.ING_REMITIDO_TRIA.trim();
          $this.global_HC000.LLAVE_TRIA = data.LLAVE_TRIA.trim();
          $this.global_HC000.MEDICO_TRIA = data.MEDICO_TRIA.trim();
          $this.global_HC000.DESCRIP_PROF = data.DESCRIP_PROF.trim();
          $this.global_HC000.MEDLEGAL_TRIA = data.MEDLEGAL_TRIA.trim();
          $this.global_HC000.MOTIV_TRIA = data.MOTIV_TRIA.replace(/\&/g, "\n").trim();
          $this.global_HC000.MSJ_ENCAB = data.MSJ_ENCAB.trim();
          $this.global_HC000.NOMBRE_CIU = data.NOMBRE_CIU.trim();
          $this.global_HC000.NOMBRE_ENT = data.NOMBRE_ENT.trim();
          $this.global_HC000.OBSER_INI_TRIA = data.OBSER_INI_TRIA.replace(/\&/g, "\n").trim();
          $this.global_HC000.OBSER_TRIA = data.OBSER_TRIA.replace(/\&/g, "\n").trim();
          $this.global_HC000.OPER_ELABHC_TRIA = data.OPER_ELABHC_TRIA.trim();
          $this.global_HC000.OPER_ELAB_TRIA = data.OPER_ELAB_TRIA.trim();
          $this.global_HC000.OPER_MODIHC_TRIA = data.OPER_MODIHC_TRIA.trim();
          $this.global_HC000.OPER_MODI_TRIA = data.OPER_MODI_TRIA.trim();
          $this.global_HC000.OXIMETRIA_TRIA = data.OXIMETRIA_TRIA.trim();
          $this.global_HC000.PESO_EDIT = data.PESO_EDIT.trim();
          $this.global_HC000.PESO_GRAMOS_TRIA = isNaN(parseFloat(data.PESO_GRAMOS_TRIA)) ? 0 : parseFloat(data.PESO_GRAMOS_TRIA);
          $this.global_HC000.PESO_TRIA = isNaN(parseFloat(data.PESO_TRIA)) ? 0 : parseFloat(data.PESO_TRIA);
          $this.global_HC000.PREFE_TRIA = data.PREFE_TRIA.trim();
          $this.global_HC000.PRIORIDAD_TRIA = data.PRIORIDAD_TRIA;
          $this.global_HC000.PROCED_TRIA = data.PROCED_TRIA.replace(/\&/g, "\n").trim();
          $this.global_HC000.PUERTA_ING_TRIA = data.PUERTA_ING_TRIA.trim();
          $this.global_HC000.PYP_TRIA = data.PYP_TRIA.trim();
          $this.global_HC000.REINGRESO_TRIA = data.REINGRESO_TRIA.trim();
          $this.global_HC000.REMITIDO_TRIA = data.REMITIDO_TRIA.trim();
          $this.global_HC000.SINTOM_OBSTE_TRIA = data.SINTOM_OBSTE_TRIA.trim();
          $this.global_HC000.SUCURSAL_TRIA = data.SUCURSAL_TRIA.trim();

          $this.global_HC000.TALLA_TRIA = isNaN(parseFloat(data.TALLA_TRIA)) ? 0 : parseFloat(data.TALLA_TRIA);
          $this.global_HC000.TEMP_TRIA = isNaN(parseFloat(data.TEMP_TRIA)) ? 0 : parseFloat(data.TEMP_TRIA);
          $this.global_HC000.TENS1_TRIA = isNaN(parseFloat(data.TENS1_TRIA)) ? 0 : parseFloat(data.TENS1_TRIA);
          $this.global_HC000.TENS2_TRIA = isNaN(parseFloat(data.TENS2_TRIA)) ? 0 : parseFloat(data.TENS2_TRIA);
          $this.global_HC000.TRAUMA_TRIA = data.TRAUMA_TRIA;
          $this.global_HC000.TURNO_TRIA = data.TURNO_TRIA;
          $this.global_HC000.UMI_TRIA = data.UMI_TRIA;
          $this.global_HC000.UND_PESO_TRIA = isNaN(parseFloat(data.UND_PESO_TRIA)) ? 0 : parseFloat(data.UND_PESO_TRIA);
          $this.global_HC000.DESCRIP_PACI = data.DESCRIP_PACI;
          $this.global_HC000.COD_PACI = data.COD_PACI;
          $this.global_HC000.SEXO_PACI = data.SEXO_PACI;
          $this.global_HC000.DIRECC_PACI = data.DIRECC_PACI;
          $this.global_HC000.TELEFONO_PACI = data.TELEFONO_PACI;
          $this.global_HC000.NOMBRE_ESP_MEDICO = data.NOMBRE_ESP_MEDICO;
          $this.global_HC000.REG_MEDICO = data.REG_MEDICO;

          let mes = evaluarMes_min(localStorage.Mes);
          var descrip_paciente = ` \\${localStorage.Contab}\\${mes}
                           &nbsp&nbsp&nbsp&nbsp&nbsp
                           ${localStorage.Usuario} 
                           ${localStorage.Nombre} 
                           &nbsp&nbsp&nbsp&nbsp
                           Paciente: ${$this.global_HC000.DESCRIP_PACI}
                           &nbsp&nbsp&nbsp&nbsp
                           Sexo: ${$this.global_HC000.SEXO_PACI}
                           &nbsp&nbsp&nbsp&nbsp
                           Edad: ${parseFloat($this.global_HC000.EDAD_TRIA.substring(1, 4)) + ' ' + $this.global_HC000.EDAD_TRIA.substring(0, 1)}
                           &nbsp&nbsp&nbsp&nbsp
                           Id: ${$this.global_HC000.COD_PACI}
                           `;

          $("title").html(descrip_paciente);

          // validarTriage
          if(this.admin_w == "GEBC" || this.global_HC000.OPER_MODI_TRIA == this.admin_w || this.global_HC000.OPER_MODI_TRIA.trim() == "" || this.global_HC000.CONDUCTA_TRIA <= 0) {
            this.ubicarPagina_HC000();
          } else {
            console.log("CONFIRMAR 2");
            this.confirmar_HC000();
          }
        })
        .catch((err) => {
          console.log(err, 'err')
          $this.salir_HC000();
          loader('hide')
        });
    },
    ubicarPagina_HC000() {
      this.fecha_sist = moment().format('YYYYMMDD');
      this.fecha_ing_tria = parseFloat(this.global_HC000.LLAVE_TRIA.substring(0, 8));
      this.hr_ing_tria = parseFloat(this.global_HC000.LLAVE_TRIA.substring(8, 10));

      if (this.fecha_ing_tria == parseFloat(this.fecha_sist) && this.hr_ing_tria > 20) {
        this.fecha_sist = parseFloat(this.fecha_sist) - 1;
      }

      if (parseFloat(this.global_HC000.FECHA_ATEN_TRIA.substring(4, 6)) > 0 && parseFloat(this.global_HC000.CONDUCTA_TRIA) > 0) {
        this.sw_nuevo = 2;
        this.datosIni.fecha_HC000 = _editFecha2($_REG_HC.llave_triage_w.substring(0,8));
        this.datosIni.hora_HC000 = _editHora($_REG_HC.llave_triage_w.substring(8,12));
        if ((this.global_HC000.CONDUCTA_TRIA == '5' || this.global_HC000.CONDUCTA_TRIA == '6' || this.global_HC000.CONDUCTA_TRIA == '7') && this.fecha_ing_tria >= parseFloat(this.fecha_sist)) {
          this.datoEntidad_HC000();
        } else {
          if ((this.admin_w == 'ADMI' || this.admin_w == 'GEBC' || this.admin_w == this.global_HC000.OPER_MODI_TRIA) 
          || (parseFloat(this.global_HC000.FOLIO_CONSUL_TRIA.substring(2, 8)) == 0 && this.global_HC000.ATIENDE_PROF == '2' && this.fecha_ing_tria >= parseFloat(this.fecha_sist))) {
            this.habilitar_botonesFlujo_HC000();
            this.datoEntidad_HC000();
          } else {
            this.deshabilitar_botonesFlujo_HC000();
            this.consul_w = this.global_HC000.CONSUL_TRIA;
            this.confirmarGrabar_HC000();
          }
        }
      } else {
        this.sw_nuevo = 1;
        if (parseFloat(localStorage.IDUSU) == 0) {
          CON851('9X', '9X', null, 'error', 'Error')
          this.salir_HC000()
        } else {
          this.medico_tria = localStorage.IDUSU;
          this.puertaIngreso_HC000();
        }
      }
    },
    habilitar_botonesFlujo_HC000() {
      this.flujo_bloques.triage = true;
      this.flujo_bloques.examen_fisico = true;
      this.flujo_bloques.signos_vitales = true;
      this.flujo_bloques.sintomas = true;
      this.flujo_bloques.analisis = true;
      this.flujo_bloques.rips = true;

      document.getElementById("btnFlujo_triage").disabled = false;
      document.getElementById("btnFlujo_examen_fisico").disabled = false;
      document.getElementById("btnFlujo_signos_vitales").disabled = false;
      document.getElementById("btnFlujo_sintomas").disabled = false;
      document.getElementById("btnFlujo_analisis").disabled = false;
      document.getElementById("btnFlujo_rips").disabled = false;
    },
    deshabilitar_botonesFlujo_HC000() {
      this.flujo_bloques.triage = false;
      this.flujo_bloques.examen_fisico = false;
      this.flujo_bloques.signos_vitales = false;
      this.flujo_bloques.sintomas = false;
      this.flujo_bloques.analisis = false;
      this.flujo_bloques.rips = false;

      document.getElementById("btnFlujo_triage").disabled = true;
      document.getElementById("btnFlujo_examen_fisico").disabled = true;
      document.getElementById("btnFlujo_signos_vitales").disabled = true;
      document.getElementById("btnFlujo_sintomas").disabled = true;
      document.getElementById("btnFlujo_analisis").disabled = true;
      document.getElementById("btnFlujo_rips").disabled = true;
    },
    datoEntidad_HC000() {
      validarInputs(
        {
          form: "#validarEntidad_HC000",
          orden: '1',
          event_f5: () => { this._salirF5("datoEntidad_HC000") }
        },
        () => {
          $this.salir_HC000();
        },
        async () => {
          $this.global_HC000.EPS_TRIA = $this.global_HC000.EPS_TRIA.toUpperCase().trim();
          var busq = $this._entidades.find(e => e['COD-ENT'].trim() == $this.global_HC000.EPS_TRIA.trim());
          if (busq == undefined) {
            CON851('01', '01', null, 'error', 'Error')
            $this.datoEntidad_HC000();
          } else {
            $this.global_HC000.NOMBRE_ENT = busq['NOMBRE-ENT'];
            $this.puertaIngreso_HC000();
          }
        }
      )
    },
    puertaIngreso_HC000() {
      if ($this.global_HC000.ING_REMITIDO_TRIA == 'S') {
        $this.global_HC000.PUERTA_ING_TRIA = '3'
      }
      $this.global_HC000.PUERTA_ING_TRIA.trim() == '' ? $this.global_HC000.PUERTA_ING_TRIA = '1' : false;
      POPUP(
        {
          array: $this.arrayIngreso,
          titulo: "PUERTA INGRESO",
          indices: [{ id: "COD", label: "DESCRIP" }],
          seleccion: $this.global_HC000.PUERTA_ING_TRIA,
          callback_f: () => {
            setTimeout(() => { $this.datoEntidad_HC000(); }, 300);
          },
        },
        (data) => {
          $this.global_HC000.PUERTA_ING_TRIA = data.COD;
          $this.auxiliares.DESCRIP_INGRESO = data.DESCRIP;
          setTimeout(() => { $this.ventanaInicial_HC000(); }, 300)
        }
      );
    },
    datoTrauma_HC000() {
      document.querySelector('#TRAUMA_TRIA').value = $this.global_HC000.TRAUMA_TRIA;
      validarInputs(
        {
          form: "#validarTrauma_HC000",
          orden: '1',
        },
        () => {
          $('#divVentanaInicial_HC000').hide();
          $('[data-bb-handler="main"]').click()
          $this.puertaIngreso_HC000();
        },
        () => {
          $this.global_HC000.TRAUMA_TRIA = document.querySelector('#TRAUMA_TRIA').value.toUpperCase();
          if ($this.global_HC000.TRAUMA_TRIA == 'S' || $this.global_HC000.TRAUMA_TRIA == 'N') {
            $this.datoRemitido2();
          } else {
            $this.datoTrauma_HC000();
          }
        }
      )
    },
    datoRemitido2() {
      document.querySelector('#ING_REMITIDO_TRIA').value = $this.global_HC000.ING_REMITIDO_TRIA;
      validarInputs(
        {
          form: "#validarRemitido2_HC000",
          orden: '1',
        },
        () => {
          $this.datoTrauma_HC000()
        },
        () => {
          $this.global_HC000.ING_REMITIDO_TRIA = document.querySelector('#ING_REMITIDO_TRIA').value.toUpperCase();
          if ($this.global_HC000.ING_REMITIDO_TRIA == 'S' || $this.global_HC000.ING_REMITIDO_TRIA == 'N') {
            $this.datoMedLegal_HC000();
          } else {
            $this.datoRemitido2();
          }
        }
      )
    },
    datoMedLegal_HC000() {
      document.querySelector('#MEDLEGAL_TRIA').value = $this.global_HC000.MEDLEGAL_TRIA;
      validarInputs(
        {
          form: "#validarMedLegal_HC000",
          orden: '1',
        },
        () => {
          $this.datoRemitido2()
        },
        () => {
          $this.global_HC000.MEDLEGAL_TRIA = document.querySelector('#MEDLEGAL_TRIA').value.toUpperCase();
          if ($this.global_HC000.MEDLEGAL_TRIA == 'S' || $this.global_HC000.MEDLEGAL_TRIA == 'N') {
            $this.datoEra_HC000();
          } else {
            $this.datoMedLegal_HC000();
          }
        }
      )
    },
    datoEra_HC000() {
      document.querySelector('#ERA_TRIA').value = $this.global_HC000.ERA_TRIA;
      validarInputs(
        {
          form: "#validarSintomasEra_HC000",
          orden: '1',
        },
        () => {
          $this.datoMedLegal_HC000()
        },
        () => {
          $this.global_HC000.ERA_TRIA = document.querySelector('#ERA_TRIA').value.toUpperCase();
          if ($this.global_HC000.ERA_TRIA == 'S' || $this.global_HC000.ERA_TRIA == 'N') {
            $this.datoProcedencia_HC000();
            $('[data-bb-handler="main"]').click();
          } else {
            $this.sintomasEra_HC000 = 'N';
            $this.datoEra_HC000();
          }
        }
      )
    },
    datoProcedencia_HC000() {
      $this.global_HC000.PROCED_TRIA.trim() == '' ? $this.global_HC000.PROCED_TRIA = $this.global_HC000.NOMBRE_CIU : false;
      validarInputs(
        {
          form: "#validarProcedencia_HC000",
          orden: '1',
          event_f5: () => { this._salirF5("datoProcedencia_HC000") }
        },
        () => {
          $this.puertaIngreso_HC000()
        },
        () => {
          $this.global_HC000.PROCED_TRIA = $this.global_HC000.PROCED_TRIA.toUpperCase().trim();
          $this.global_HC000.PROCED_TRIA.trim() == '' ? $this.datoProcedencia_HC000() : $this.datoMotivo1_HC000();
        }
      )
    },
    datoMotivo1_HC000() {
      validarInputs(
        {
          form: "#validarMotivo_HC000",
          orden: '1',
          event_f5: () => { this._salirF5("datoMotivo1_HC000") }
        },
        () => {
          $this.datoProcedencia_HC000()
        },
        () => {
          $this.global_HC000.MOTIV_TRIA = $this.global_HC000.MOTIV_TRIA.toUpperCase().trim();
          $this.global_HC000.MOTIV_TRIA.trim() == ''
            ? $this.datoMotivo1_HC000()
            : ($this.nit_usu == 891855847 ? $this.datoUnidadPeso_HC000() : $this.datoAntecedFam_HC000())
        }
      )
    },
    datoAntecedFam_HC000() {
      $this.banderaHC828 = null;
      validarInputs(
        {
          form: "#validarAntecFam_HC000",
          orden: '1',
        },
        () => {
          $this.banderaHC828 != true ? $this.datoMotivo1_HC000() : $this.banderaHC828 = false;
        },
        () => {
          $this.global_HC000.ANTECED_FAMIL_TRIA = $this.global_HC000.ANTECED_FAMIL_TRIA.toUpperCase().trim();
          $this.datoAntecedPat_HC000();
        }
      )
    },
    datoAntecedPat_HC000() {
      validarInputs(
        {
          form: "#validarAntecPat_HC000",
          orden: '1',
        },
        () => {
          $this.banderaHC828 != true ? $this.datoAntecedFam_HC000() : $this.banderaHC828 = false;
        },
        () => {
          $this.global_HC000.ANTECED_PATOL_TRIA = $this.global_HC000.ANTECED_PATOL_TRIA.toUpperCase().trim();
          $this.datoAntecedQui_HC000();
        }
      )
    },
    datoAntecedQui_HC000() {
      validarInputs(
        {
          form: "#validarAntecQui_HC000",
          orden: '1',
        },
        () => {
          $this.banderaHC828 != true ? $this.datoAntecedPat_HC000() : $this.banderaHC828 = false;
        },
        () => {
          $this.global_HC000.ANTECED_QUIRUR_TRIA = $this.global_HC000.ANTECED_QUIRUR_TRIA.toUpperCase().trim();
          $this.datoAntecedAle_HC000();
        }
      )
    },
    datoAntecedAle_HC000() {
      validarInputs(
        {
          form: "#validarAntecAle_HC000",
          orden: '1',
        },
        () => {
          $this.banderaHC828 != true ? $this.datoAntecedQui_HC000() : $this.banderaHC828 = false;
        },
        () => {
          $this.global_HC000.ANTECED_ALERGICOS_TRIA = $this.global_HC000.ANTECED_ALERGICOS_TRIA.toUpperCase().trim();
          if ($this.nit_usu == 891855847) {
            this.flujo_bloques.triage = true
            document.getElementById("btnFlujo_triage").disabled = false;
            $this.datoUnidadPeso_HC000()
          } else {
            this.flujo_bloques.triage = true
            document.getElementById("btnFlujo_triage").disabled = false;
            $this.datoAlterado_HC000(0)
          }
        }
      )
    },
    datoAlterado_HC000(i) {
      if (i < 8) {
        validarInputs(
          {
            form: `#validarExamen${i}_HC000`,
            orden: '1',
          },
          () => {
            i == 0
              ? $this.datoAntecedAle_HC000()
              : (i = parseInt(i) - 1, $this.datoAlterado_HC000(i));
          },
          () => {
            $this.global_HC000.EXAMEN_FISICO_TRIA[i].ALTERADO_EXA_TRIA = $this.global_HC000.EXAMEN_FISICO_TRIA[i].ALTERADO_EXA_TRIA.toUpperCase().trim();
            $this.global_HC000.EXAMEN_FISICO_TRIA[i].ALTERADO_EXA_TRIA.trim() == '' ? $this.global_HC000.EXAMEN_FISICO_TRIA[i].ALTERADO_EXA_TRIA = 'N' : false;
            switch ($this.global_HC000.EXAMEN_FISICO_TRIA[i].ALTERADO_EXA_TRIA) {
              case 'S':
                $this.datoDescripExamen(i);
                break;
              case 'N':
                $this.global_HC000.EXAMEN_FISICO_TRIA[i].EXA_FISICO_TRIA = '';
                i = parseInt(i) + 1;
                $this.datoAlterado_HC000(i);
                break;
              case 'X':
                $this.global_HC000.EXAMEN_FISICO_TRIA[i].EXA_FISICO_TRIA = 'NO VALORADO';
                i = parseInt(i) + 1;
                $this.datoAlterado_HC000(i);
                break;
              default:
                CON851('03', '03', null, 'error', 'Error')
                $this.datoAlterado_HC000(i);
                break;
            }
          }
        )
      } else {
        this.flujo_bloques.examen_fisico = true
        document.getElementById("btnFlujo_examen_fisico").disabled = false;
        $this.datoUnidadPeso_HC000();
      }
    },
    datoDescripExamen(i) {
      validarInputs(
        {
          form: `#validarDescripExamen${i}_HC000`,
          orden: '1',
        },
        () => {
          $this.datoAlterado_HC000(i);
        },
        () => {
          $this.global_HC000.EXAMEN_FISICO_TRIA[i].EXA_FISICO_TRIA = $this.global_HC000.EXAMEN_FISICO_TRIA[i].EXA_FISICO_TRIA.toUpperCase().trim();
          if ($this.global_HC000.EXAMEN_FISICO_TRIA[i].ALTERADO_EXA_TRIA == 'S' && $this.global_HC000.EXAMEN_FISICO_TRIA[i].EXA_FISICO_TRIA.trim() == '') {
            CON851('03', '03', null, 'error', 'Error')
            $this.datoAlterado_HC000(i);
          } else {
            i = parseInt(i) + 1;
            $this.datoAlterado_HC000(i);
          }
        }
      )
    },
    datoUnidadPeso_HC000() {
      if ($this.global_HC000.EDAD_TRIA.substring(0, 1) == 'D' || $this.global_HC000.EDAD_TRIA.substring(0, 1) == 'M' || ($this.global_HC000.EDAD_TRIA.substring(0, 1) == 'A' && parseFloat($this.global_HC000.EDAD_TRIA.substring(1, 4)) < 11)) {
        setTimeout(() => { $this._pesoUnidad(); }, 300)
      } else {
        $this.global_HC000.UND_PESO_TRIA = 1;
        $this.datoPeso_HC000();
      }
    },
    datoPeso_HC000() {
      $this.global_HC000.UND_PESO_TRIA == 1 ? $this.auxiliares.peso_text = 'Kilos' : $this.auxiliares.peso_text = 'Gramos';
      validarInputs(
        {
          form: "#validarPeso_HC000",
          orden: '1',
        },
        () => {
          $this.nit_usu == 891855847 ? $this.datoMotivo1_HC000() : $this.datoAlterado_HC000(0);
        },
        () => {
          switch ($this.global_HC000.UND_PESO_TRIA) {
            case 1:
              $this.global_HC000.PESO_TRIA = $this.global_HC000.PESO_TRIA;
              $this.global_HC000.PESO_GRAMOS_TRIA = 0;
              if ($this.global_HC000.PESO_TRIA > 199) {
                CON851('03', '03', null, 'error', 'Error')
                $this.datoUnidadPeso_HC000();
              } else {
                $this.datoTalla_HC000();
              }
              break;
              case 2:
              $this.global_HC000.PESO_GRAMOS_TRIA = $this.global_HC000.PESO_GRAMOS_TRIA;
              $this.global_HC000.PESO_TRIA = 0;
              $this.datoTalla_HC000();
              break;
            default:
              $this.datoAntecedFam_HC000();
          }
        }
      )
    },
    datoTalla_HC000() {
      validarInputs(
        {
          form: "#validarTalla_HC000",
          orden: '1',
        },
        () => {
          $this.datoUnidadPeso_HC000();
        },
        () => {
          $this.global_HC000.TALLA_TRIA = $this.global_HC000.TALLA_TRIA;
          if ($this.global_HC000.TALLA_TRIA > 230) {
            CON851('03', '03', null, 'error', 'Error')
            $this.datoTalla_HC000();
          } else {
            $this.datoTemp_HC000();
          }
        }
      )
    },
    datoTemp_HC000() {
      validarInputs(
        {
          form: "#validarTemp_HC000",
          orden: '1',
        },
        () => {
          $this.datoTalla_HC000();
        },
        () => {
          $this.global_HC000.TEMP_TRIA = $this.global_HC000.TEMP_TRIA;
          if ($this.global_HC000.TEMP_TRIA > 45 || $this.global_HC000.TEMP_TRIA < 1) {
            CON851('03', '03', null, 'error', 'Error')
            $this.datoTemp_HC000();
          } else {
            $this.datoFc_HC000();
          }
        }
      )
    },
    datoFc_HC000() {
      validarInputs(
        {
          form: "#validarFCard_HC000",
          orden: '1',
        },
        () => {
          $this.datoTemp_HC000();
        },
        () => {
          $this.global_HC000.FCARD_TRIA = $this.global_HC000.FCARD_TRIA;
          if ($this.global_HC000.TEMP_TRIA == 0 && $this.global_HC000.FCARD_TRIA > 0) {
            CON851('02', '02', null, 'error', 'Error')
            $this.datoTemp_HC000();
          } else if ($this.global_HC000.FCARD_TRIA > 200) {
            CON851('03', '03', null, 'error', 'Error')
            $this.datoFc_HC000();
          } else {
            $this.datoFr_HC000();
          }
        }
      )
    },
    datoFr_HC000() {
      validarInputs(
        {
          form: "#validarFResp_HC000",
          orden: '1',
        },
        () => {
          $this.datoFc_HC000();
        },
        () => {
          $this.global_HC000.FRESP_TRIA = $this.global_HC000.FRESP_TRIA;
          if ($this.global_HC000.FCARD_TRIA > 0 && $this.global_HC000.FRESP_TRIA == 0) {
            CON851('02', '02', null, 'error', 'Error')
            $this.datoFr_HC000();
          } else if ($this.global_HC000.FRESP_TRIA > 100) {
            CON851('03', '03', null, 'error', 'Error')
            $this.datoFr_HC000();
          } else {
            $this.datoTens1_HC000();
          }
        }
      )
    },
    datoTens1_HC000(orden) {
      validarInputs(
        {
          form: "#validarTens1_HC000",
          orden: '1',
        },
        () => {
          $this.datoFr_HC000();
        },
        () => {
          $this.global_HC000.TENS1_TRIA = $this.global_HC000.TENS1_TRIA;
          if ($this.global_HC000.FCARD_TRIA > 0 && $this.global_HC000.TENS1_TRIA == 0 && ($this.global_HC000.EDAD_TRIA.substring(0, 1) == 'A' && parseFloat($this.global_HC000.EDAD_TRIA.substring(1, 4)) > 4)) {
            CON851('02', '02', null, 'error', 'Error')
            $this.datoTens1_HC000();
          } else if ($this.global_HC000.TENS1_TRIA == 0) {
            $this.global_HC000.TENS2_TRIA = 0;
            $this.datoOximetria_HC000();
          } else if ($this.global_HC000.TENS1_TRIA > 300) {
            CON851('03', '03', null, 'error', 'Error')
            $this.datoTens1_HC000();
          } else {
            $this.datoTens2_HC000();
          }
        }
      )
    },
    datoTens2_HC000() {
      validarInputs(
        {
          form: "#validarTens2_HC000",
          orden: '1',
        },
        () => {
          $this.datoTens1_HC000();
        },
        () => {
          $this.global_HC000.TENS2_TRIA = $this.global_HC000.TENS2_TRIA;
          if ($this.global_HC000.TENS2_TRIA == 0) {
            CON851('02', '02', null, 'error', 'Error')
            $this.datoTens2_HC000();
          } else if ($this.global_HC000.TENS2_TRIA > 300) {
            CON851('03', '03', null, 'error', 'Error')
            $this.datoTens2_HC000();
          } else {
            $this.datoOximetria_HC000();
          }
        }
      )
    },
    datoOximetria_HC000() {
      validarInputs(
        {
          form: "#validarOxi_HC000",
          orden: '1',
        },
        () => {
          $this.datoTens2_HC000();
        },
        () => {
          $this.global_HC000.OXIMETRIA_TRIA = $this.global_HC000.OXIMETRIA_TRIA;
          setTimeout(() => { $this._ventanaGlasg_HC000(); }, 300)
        }
      )
    },
    datoGlasg1_HC000() {
      validarInputs(
        {
          form: "#validarGlasg1_HC000",
          orden: '1',
        },
        () => {
          $('[data-bb-handler="main"]').click()
          $this.datoTens1_HC000();
        },
        () => {
          $this.glasg1 = document.querySelector('#glasg1_HC000').value;
          if (parseFloat($this.glasg1) < 1 || parseFloat($this.glasg1) > 4) {
            CON851('03', '03', null, 'error', 'Error')
            $this.datoGlasg1_HC000();
          } else {
            $this.datoGlasg2_HC000();
          }
        }
      )
    },
    datoGlasg2_HC000() {
      validarInputs(
        {
          form: "#validarGlasg2_HC000",
          orden: '1',
        },
        () => {
          $this.datoGlasg1_HC000();
        },
        () => {
          $this.glasg2 = document.querySelector('#glasg2_HC000').value;
          if (parseFloat($this.glasg2) < 1 || parseFloat($this.glasg2) > 5) {
            CON851('03', '03', null, 'error', 'Error')
            $this.datoGlasg2_HC000();
          } else {
            $this.datoGlasg3_HC000();
          }
        }
      )
    },
    datoGlasg3_HC000() {
      validarInputs(
        {
          form: "#validarGlasg3_HC000",
          orden: '1',
        },
        () => {
          $this.datoGlasg2_HC000();
        },
        () => {
          $this.glasg3 = document.querySelector('#glasg3_HC000').value;
          if (parseFloat($this.glasg3) < 1 || parseFloat($this.glasg3) > 6) {
            CON851('03', '03', null, 'error', 'Error')
            $this.datoGlasg3_HC000();
          } else {
            $this.vlr_glasg_tria = parseFloat($this.glasg1) + parseFloat($this.glasg2) + parseFloat($this.glasg3);
            $this.global_HC000.GLASG_EDIT_TRIA = cerosIzq($this.vlr_glasg_tria.toString(), 2) + '/15';
            $this.global_HC000.GLASG_TRIA = $this.glasg1.toString() + $this.glasg2.toString() + $this.glasg3.toString() + cerosIzq($this.vlr_glasg_tria.toString(), 2);
            $('[data-bb-handler="main"]').click();
            this.flujo_bloques.signos_vitales = true;
            document.getElementById("btnFlujo_signos_vitales").disabled = false;
            $this.datoOtros_HC000();
          }
        }
      )
    },
    datoOtros_HC000() {
      validarInputs(
        {
          form: "#validarOtrosSintomas_HC000",
          orden: '1',
          event_f5: () => { this._salirF5("datoOtros_HC000") }
        },
        () => {
          $this.global_HC000.FCARD_TRIA == 0 ? $this.datoTemp_HC000() : setTimeout(() => { $this._ventanaGlasg_HC000(); }, 300)
        },
        () => {
          $this.global_HC000.OBSER_TRIA = $this.global_HC000.OBSER_TRIA.toUpperCase().trim();
          if ($this.nit_usu == 891855847) {
            this.flujo_bloques.sintomas = true
            document.getElementById("btnFlujo_sintomas").disabled = false;
            $this.aceptarEstado_HC000();
          } else {
            this.flujo_bloques.sintomas = true
            document.getElementById("btnFlujo_sintomas").disabled = false;
            $this.datoAnalisis_HC000();
          }
        }
      )
    },
    datoAnalisis_HC000() {
      validarInputs(
        {
          form: "#validarAnalisis_HC000",
          orden: '1',
          event_f5: () => { this._salirF5("datoAnalisis_HC000") }
        },
        () => {
          $this.datoOtros_HC000();
        },
        () => {
          $this.global_HC000.ANALISIS_TRIA = $this.global_HC000.ANALISIS_TRIA.toUpperCase().trim();
          this.flujo_bloques.analisis = true;
          document.getElementById("btnFlujo_analisis").disabled = false;
          $this.aceptarEstado_HC000();
        }
      )
    },
    aceptarEstado_HC000() {
      if ($this.paci.SEXO == 'M' || $this.global_HC000.TEMP_TRIA == 0) {
        $this.global_HC000.EMBAR_TRIA = '9';
        $this.leerEstado_HC000();
      } else {
        if ($this.global_HC000.EDAD_TRIA.substring(0, 1) == 'D' || $this.global_HC000.EDAD_TRIA.substring(0, 1) == 'M'
          || ($this.global_HC000.EDAD_TRIA.substring(0, 1) == 'A' && parseFloat($this.global_HC000.EDAD_TRIA.substring(1, 4)) < 11)) {
          $this.global_HC000.EMBAR_TRIA = '9';
          $this.leerEstado_HC000();
        } else {
          setTimeout(() => { $this._SER826(); }, 300)
        }
      }
    },
    leerEstado_HC000() {
      if ($this.global_HC000.EMBAR_TRIA == '4') {
        $this.aceptarCausa_HC000();
      } else {
        switch ($this.global_HC000.EMBAR_TRIA) {
          case '1':
            $this.global_HC000.DESCRIP_EMBAR_TRIA = '1ER TRIM. EMBA';
            setTimeout(() => { $this.ventanaTriage_HC000(); }, 300)
            break;
          case '2':
            $this.global_HC000.DESCRIP_EMBAR_TRIA = '2DO TRIM. EMBA';
            setTimeout(() => { $this.ventanaTriage_HC000(); }, 300);
            break;
          case '3':
            $this.global_HC000.DESCRIP_EMBAR_TRIA = '3ER TRIM. EMBA';
            setTimeout(() => { $this.ventanaTriage_HC000(); }, 300);
            break;
          case '4':
            $this.global_HC000.DESCRIP_EMBAR_TRIA = 'NO DECLARA';
            setTimeout(() => { $this.ventanaTriage_HC000(); }, 300);
            break;
          case '9':
            if ($this.paci.SEXO == 'F' && ($this.global_HC000.EDAD_TRIA.substring(0, 1) == 'A' && parseFloat($this.global_HC000.EDAD_TRIA.substring(1, 4)) > 10) && $this.global_HC000.TEMP_TRIA > 0) {
              $this.aceptarEstado_HC000();
            } else {
              $this.global_HC000.DESCRIP_EMBAR_TRIA = 'NO APLICA';
              setTimeout(() => { $this.ventanaTriage_HC000(); }, 300);
            }
            break;
          default: $this.aceptarEstado_HC000(); break;
        }
      }
    },
    datoSintomObste_HC000() {
      validarInputs(
        {
          form: "#validarSintomObste_HC000",
          orden: '1',
        },
        () => {
          $('[data-bb-handler="main"]').click();
          setTimeout(() => { $this.aceptarEstado_HC000(); }, 300);
        },
        () => {
          $this.global_HC000.SINTOM_OBSTE_TRIA = document.querySelector('#SINTOM_OBSTE').value.toUpperCase().trim();
          if ($this.global_HC000.SINTOM_OBSTE_TRIA == 'S' || $this.global_HC000.SINTOM_OBSTE_TRIA == 'N') {
            if ($this.nit_usu == 891855847) {
              $this.datoAñoRegla_HC000();
            } else {
              if ($this.global_HC000.SINTOM_OBSTE_TRIA == 'N') {
                $this.cerrarTriage_HC000();
              } else {
                $this.datoAñoRegla_HC000();
              }
            }
          } else {
            CON851('02', '02', null, 'error', 'Error')
            $this.datoSintomObste_HC000();
          }
        }
      )
    },
    datoAñoRegla_HC000() {
      validarInputs(
        {
          form: "#validarAñoRegla_HC000",
          orden: '1',
        },
        () => {
          $this.datoSintomObste_HC000();
        },
        () => {
          $this.auxiliares.AÑO_REGLA = document.querySelector('#AÑO_REGLA').value;
          if ($this.auxiliares.AÑO_REGLA == 0) {
            CON851('02', '02', null, 'error', 'Error')
            $this.datoAñoRegla_HC000();
          } else {
            $this.datoMesRegla_HC000();
          }
        }
      )
    },
    datoMesRegla_HC000() {
      validarInputs(
        {
          form: "#validarMesRegla_HC000",
          orden: '1',
        },
        () => {
          $this.datoAñoRegla_HC000();
        },
        () => {
          $this.auxiliares.MES_REGLA = document.querySelector('#MES_REGLA').value;
          if ($this.auxiliares.MES_REGLA < 1 || $this.auxiliares.MES_REGLA > 12) {
            CON851('02', '02', null, 'error', 'Error')
            $this.datoMesRegla_HC000();
          } else {
            $this.datoDiaRegla_HC000();
          }
        }
      )
    },
    datoDiaRegla_HC000() {
      validarInputs(
        {
          form: "#validarDiaRegla_HC000",
          orden: '1',
        },
        () => {
          $this.datoMesRegla_HC000();
        },
        () => {
          $this.auxiliares.DIA_REGLA = document.querySelector('#DIA_REGLA').value;
          if ($this.auxiliares.DIA_REGLA < 1 || $this.auxiliares.DIA_REGLA > 31) {
            CON851('03', '03', null, 'error', 'Error')
            $this.datoDiaRegla_HC000();
          } else {
            $this.global_HC000.FECHA_REGLA_TRIA = $this.auxiliares.AÑO_REGLA.toString() + $this.auxiliares.MES_REGLA.toString() + $this.auxiliares.DIA_REGLA.toString();
            $this.calcularEdadGest_HC000();
          }
        }
      )
    },
    calcularEdadGest_HC000() {
      if (($this.global_HC000.EMBAR_TRIA == 0 && $this.global_HC000.EMBAR_TRIA > 3) || $this.auxiliares.MES_REGLA == 0) {
        $this.global_HC000.EDAD_GEST_TRIA = 0;
      } else {
        $this.global_HC000.EDAD_GEST_TRIA = SC_DIAS($this.global_HC000.FECHA_REGLA_TRIA, $this.fecha_sist) / 7;
        $this.global_HC000.EDAD_GEST_TRIA = Math.round($this.global_HC000.EDAD_GEST_TRIA * 10) / 10
        document.querySelector('#EDAD_GEST').value = $this.global_HC000.EDAD_GEST_TRIA;
        $this.evaluarUmi_HC000();
      }
    },
    evaluarUmi_HC000() {
      if ($this.nit_usu == 891855847) {
        if ($this.global_HC000.EDAD_GEST_TRIA > 24) {
          $this.global_HC000.UMI_TRIA = 'S';
        } else {
          $this.global_HC000.UMI_TRIA = 'N';
        }
        document.querySelector('#UMI').value = $this.global_HC000.UMI_TRIA;
        $('#divUmi_HC000').show();
      }

      if ($this.nit_usu == 800037021) {
        if ($this.global_HC000.SINTOM_OBSTE_TRIA == 'S') {
          $this.global_HC000.UMI_TRIA = 'S';
        } else {
          $this.global_HC000.UMI_TRIA = 'N';
        }
        document.querySelector('#UMI').value = $this.global_HC000.UMI_TRIA;
        $('#divUmi_HC000').show();
      }

      if ($this.nit_usu == 844003225) {
        if ($this.global_HC000.EMBAR_TRIA == 1 || $this.global_HC000.EMBAR_TRIA == 2 || $this.global_HC000.EMBAR_TRIA == 3) {
          $this.global_HC000.UMI_TRIA = 'S';
        } else {
          $this.global_HC000.UMI_TRIA = 'N';
        }
        document.querySelector('#UMI').value = $this.global_HC000.UMI_TRIA;
        $('#divUmi_HC000').show();
      }

      $this.cerrarTriage_HC000();
    },
    cerrarTriage_HC000() {
      loader('show');
      setTimeout(() => {
        $('[data-bb-handler="main"]').click();
        $this.aceptarCausa_HC000();
        loader('hide');
      }, 1500);
    },
    aceptarCausa_HC000() {
      $this.global_HC000.TEMP_TRIA == 0
        ? ($this.global_HC000.CAUSA_TRIA = 15,
          $this.global_HC000.DESCRIP_CAUSA_TRIA = 'OTRA CAUSA',
          $this.datoPrioridad_HC000())
        : setTimeout(() => { $this._SER828(); }, 300);
    },
    datoPrioridad_HC000() {
      validarInputs(
        {
          form: "#validarPrioridad_HC000",
          orden: '1',
        },
        () => {
          $this.nit_usu == 891855847 ? $this.datoOtros_HC000() : $this.datoAnalisis_HC000();
        },
        () => {
          $this.global_HC000.PRIORIDAD_TRIA = $this.global_HC000.PRIORIDAD_TRIA;
          if ($this.global_HC000.PRIORIDAD_TRIA >= 1 && $this.global_HC000.PRIORIDAD_TRIA <= 5) {
            if ($this.nit_usu == 800037021 && $this.global_HC000.ING_REMITIDO_TRIA == 'S' && $this.global_HC000.PRIORIDAD_TRIA > 3) {
              CON851('03', '03', null, 'error', 'Error')
              $this.datoPrioridad_HC000();
            } else if ($this.global_HC000.PRIORIDAD_TRIA == 1 && parseFloat($this.global_HC000.EMBAR_TRIA) > 3) {
              $this.global_HC000.PYP_TRIA = 'N';
              $this.datoFinalid_HC000();
            } else {
              $this.datoPyp_HC000();
            }
          } else {
            CON851('02', '02', null, 'error', 'Error')
            $this.datoPrioridad_HC000();
          }
        }
      )
    },
    datoPyp_HC000() {
      $this.global_HC000.PYP_TRIA == '' || $this.global_HC000.TEMP_TRIA == 0 ? $this.global_HC000.PYP_TRIA = 'N' : false;

      if ($this.global_HC000.TEMP_TRIA > 0) {
        validarInputs(
          {
            form: "#validarPyp_HC000",
            orden: '1',
          },
          () => {
            if ($this.sw_nuevo == 1 || $this.admin_w == 'GEBC' || ($this.global_HC000.ATIENDE_PROF == '1' || $this.global_HC000.ATIENDE_PROF == '2')) {
              this.flujo_bloques.triage = true;
              $this.datoPrioridad_HC000()
            } else {
              this.flujo_bloques.triage = false;
              this.flujo_bloques.
                $this.datoPyp_HC000()
            }
          },
          () => {
            $this.global_HC000.PYP_TRIA = $this.global_HC000.PYP_TRIA.toUpperCase().trim();
            if ($this.global_HC000.PYP_TRIA == 'S' || $this.global_HC000.PYP_TRIA == 'N') {
              $this.datoFinalid_HC000();
            } else {
              CON851('02', '02', null, 'error', 'Error')
              $this.datoPyp_HC000();
            }
          }
        )
      } else {
        $this.datoFinalid_HC000();
      }
    },
    datoFinalid_HC000() {
      if ($this.global_HC000.PYP_TRIA == 'S') {
        console.log('LLAMADO SER834');
        setTimeout(() => { $this._SER834(); }, 300);
      } else {
        $this.global_HC000.FINALID_TRIA = '10';
        $this.mostrarFinalid_HC000();
      }
    },
    mostrarFinalid_HC000() {
      switch ($this.global_HC000.FINALID_TRIA) {
        case '0': $this.global_HC000.DESCRIP_FINALID_TRIA = ''; break;
        case '1': $this.global_HC000.DESCRIP_FINALID_TRIA = 'ATENCION PARTO'; break;
        case '2': $this.global_HC000.DESCRIP_FINALID_TRIA = 'ATENCION REC.NACID'; break;
        case '3': $this.global_HC000.DESCRIP_FINALID_TRIA = 'ATENC.PLANIF.FAMIL'; break;
        case '4': $this.global_HC000.DESCRIP_FINALID_TRIA = 'DET.ALT CRECIM <10'; break;
        case '5': $this.global_HC000.DESCRIP_FINALID_TRIA = 'DET.ALT.DESA.JOVEN'; break;
        case '6': $this.global_HC000.DESCRIP_FINALID_TRIA = 'DET.ALT.EMBARAZO'; break;
        case '7': $this.global_HC000.DESCRIP_FINALID_TRIA = 'DET.ALT. ADULTO'; break;
        case '8': $this.global_HC000.DESCRIP_FINALID_TRIA = 'DET.ALT.AGUD.VISUA'; break;
        case '9': $this.global_HC000.DESCRIP_FINALID_TRIA = 'DET.ENFERM.PROFES'; break;
        case '10':
          if ($this.global_HC000.PYP_TRIA == 'S') {
            CON851('03', '03', null, 'error', 'Error')
            $this.datoFinalid_HC000();
          } else {
            $this.global_HC000.DESCRIP_FINALID_TRIA = 'NO APLICA';
            $this.datoConducta_HC000();
          }
        break;
      }

      switch ($this.global_HC000.FINALID_TRIA) {
        case '1':
          if ($this.paci.SEXO == 'M') {
            CON851('73', '73', null, 'error', 'Error')
            $this.datoFinalid_HC000();
          } else if ($this.global_HC000.EDAD_TRIA.substring(0, 1) != 'A' || parseFloat($this.global_HC000.EDAD_TRIA.substring(1, 4)) < 10 || parseFloat($this.global_HC000.EDAD_TRIA.substring(1, 4)) > 50) {
            CON851('74', '74', null, 'error', 'Error')
            $this.datoFinalid_HC000();
          } else {
            $this.datoConducta_HC000();
          }
          break;
        case '2':
          if ($this.global_HC000.EDAD_TRIA.substring(0, 1) != 'D') {
            CON851('74', '74', null, 'error', 'Error')
            $this.datoFinalid_HC000();
          } else {
            $this.datoConducta_HC000();
          }
          break;
        case '3':
          if ($this.global_HC000.EDAD_TRIA.substring(0, 1) != 'A' || parseFloat($this.global_HC000.EDAD_TRIA.substring(1, 4)) < 10 || parseFloat($this.global_HC000.EDAD_TRIA.substring(1, 4)) > 60) {
            CON851('74', '74', null, 'error', 'Error')
            $this.datoFinalid_HC000();
          } else {
            $this.datoConducta_HC000();
          }
          break;
        case '4':
          if ($this.global_HC000.EDAD_TRIA.substring(0, 1) == 'D' || ($this.global_HC000.EDAD_TRIA.substring(0, 1) == 'A' && parseFloat($this.global_HC000.EDAD_TRIA.substring(1, 4))) > 10) {
            CON851('74', '74', null, 'error', 'Error')
            $this.datoFinalid_HC000();
          } else {
            $this.datoConducta_HC000();
          }
          break;
        case '5':
          if ($this.global_HC000.EDAD_TRIA.substring(0, 1) != 'A' || parseFloat($this.global_HC000.EDAD_TRIA.substring(1, 4)) < 11 || parseFloat($this.global_HC000.EDAD_TRIA.substring(1, 4)) > 29) {
            CON851('74', '74', null, 'error', 'Error')
            $this.datoFinalid_HC000();
          } else {
            $this.datoConducta_HC000();
          }
          break;
        case '6':
          if ($this.paci.SEXO == 'M') {
            CON851('73', '73', null, 'error', 'Error')
            $this.datoFinalid_HC000();
          } else if ($this.global_HC000.EDAD_TRIA.substring(0, 1) != 'A' || parseFloat($this.global_HC000.EDAD_TRIA.substring(1, 4)) < 10 || parseFloat($this.global_HC000.EDAD_TRIA.substring(1, 4)) > 50) {
            CON851('74', '74', null, 'error', 'Error')
            $this.datoFinalid_HC000();
          } else if ($this.global_HC000.EMBAR_TRIA != 1 && $this.global_HC000.EMBAR_TRIA != 2 && $this.global_HC000.EMBAR_TRIA != 3) {
            CON851('83', '83', null, 'error', 'Error')
            $this.datoFinalid_HC000();
          } else {
            $this.datoConducta_HC000();
          }
          break;
        case '7':
          if ($this.global_HC000.EDAD_TRIA.substring(0, 1) != 'A' || parseFloat($this.global_HC000.EDAD_TRIA.substring(1, 4)) < 30) {
            CON851('74', '74', null, 'error', 'Error')
            $this.datoFinalid_HC000();
          } else {
            $this.datoConducta_HC000();
          }
          break;
        case '10': break;
        default: $this.datoConducta_HC000(); break;
      }
    },
    datoConducta_HC000() {
      $this.conducta_w = '';
      setTimeout(() => { $this._SER831A(); }, 300)
    },
    leerConducta_HC000() {
      if ($this.conducta_w == '8') {
        if ($this.global_HC000.TEMP_TRIA == 0) {
          $this.datoOtros_HC000();
        } else {
          $this.datoPyp_HC000();
        }
      } else {
        if ($this.global_HC000.TEMP_TRIA == 0 && parseFloat($this.global_HC000.CONDUCTA_TRIA) < 5) {
          CON851('03', '03', null, 'error', 'Error')
          $this.datoConducta_HC000();
        } else if (($this.global_HC000.PRIORIDAD_TRIA == 4 || $this.global_HC000.PRIORIDAD_TRIA == 5) && parseFloat($this.global_HC000.CONDUCTA_TRIA) == 1) {
          CON851('03', '03', null, 'error', 'Error')
          $this.datoConducta_HC000();
        } else if (($this.global_HC000.PRIORIDAD_TRIA == 1 || $this.global_HC000.PRIORIDAD_TRIA == 2 || $this.global_HC000.PRIORIDAD_TRIA == 3) && parseFloat($this.global_HC000.CONDUCTA_TRIA) == 2) {
          CON851('03', '03', null, 'error', 'Error')
          $this.datoConducta_HC000();
        } else if ($this.global_HC000.PRIORIDAD_TRIA == 1 && (parseFloat($this.global_HC000.CONDUCTA_TRIA) == 2 || parseFloat($this.global_HC000.CONDUCTA_TRIA) == 5)) {
          CON851('03', '03', null, 'error', 'Error')
          $this.datoConducta_HC000();
        } else {
          $this.datoRemitido_HC000();
        }
      }
    },
    datoRemitido_HC000() {
      if (parseFloat($this.global_HC000.CONDUCTA_TRIA) != 4) {
        $this.global_HC000.REMITIDO_TRIA = '';
        $this.datoConsul_HC000();
      } else {
        validarInputs(
          {
            form: "#validarRemitido_HC000",
            orden: '1',
          },
          () => {
            $this.datoConducta_HC000();
          },
          () => {
            $this.global_HC000.REMITIDO_TRIA = $this.global_HC000.REMITIDO_TRIA.toUpperCase().trim();
            if ($this.global_HC000.REMITIDO_TRIA.trim() == '') {
              CON851('02', '02', null, 'error', 'Error')
              $this.datoRemitido_HC000();
            } else {
              $this.datoConsul_HC000();
            }
          }
        )
      }
    },
    async datoConsul_HC000() {
      if (($this.global_HC000.PRIORIDAD_TRIA == 4 || $this.global_HC000.PRIORIDAD_TRIA == 5) || ($this.global_HC000.UMI_TRIA == 'S')) {
        $this.confirmarGrabar_HC000();
      } else if ($this.sw_nuevo != 1) {
        $this.confirmarGrabar_HC000();
      } else if ($this.global_HC000.ERA_TRIA == 'S') {
        $this.global_HC000.CONSUL_TRIA = 6;
        $this.confirmarGrabar_HC000();
      } else if ($this.nit_usu == 800037021) {
        if ($this.hr_act < 06 || $this.hr_act > 17) {
          $this.nro_consul_w = 3;
        } else {
          $this.nro_consul_w = 4;
        }
        $this.llamarCON007();
      }
      else {
        $this.nro_consul_w = 3;
        $this.llamarCON007();
      }
    },
    async llamarCON007() {
      if ($this.global_HC000.EMBAR_TRIA == 1 || $this.global_HC000.EMBAR_TRIA == 2 || $this.global_HC000.EMBAR_TRIA == 3) {
        $this.SECU_NUM = 'U4';
      } else {
        switch (parseInt($this.global_HC000.PRIORIDAD_TRIA)) {
          case 1: $this.SECU_NUM = 'U4'; break;
          case 2: $this.SECU_NUM = 'U4'; break;
          case 3: $this.SECU_NUM = 'U4'; break;
        }
      }
      $this.SECU_NUM == undefined ? $this.SECU_NUM = '  ' : false;

      await postData({ datosh: `${datosEnvio()}${$this.SECU_NUM}|` },
        get_url("APP/CONTAB/CON007.DLL"))
        .then(data => {
          console.log('CONSULTA CONSEC', data);
          var data = data.split("|");
          $this.SECU_NUM = data[0];
          $this.SEC_CONSUL_W = data[1].substring(3, 9);
          $this.ULT_FECHA_NUM = data[2];
          $this.SEC_CONSUL_ANT = $this.SEC_CONSUL_W;
          $this.validarConsultorios_HC000();
        })
        .catch(err => {
          console.error(err);
        });
    },
    validarConsultorios_HC000() {
      this.confirmarGrabar_HC000();
    },
    confirmarGrabar_HC000() {
      setTimeout(() => {
        CON851P('01', () => { 
          if ($this.sw_nuevo == 1 || $this.admin_w == 'GEBC') { $this.datoConducta_HC000(); } 
          else { setTimeout(() => { $this.confirmar_HC000();}, 300); }
        }, 
        () => { this.validarCallbackConfirmar_HC000() });
      }, 300);
    },
    confirmar_HC000() {
      setTimeout(() => {
        CON851P('00', () => { this.salir_HC000(); }, () => { $this.imprimir_HC000(); $this.imprimir = true; });
      }, 300);
    },
    validarEscapeConfirmar_HC000() {
      $this.imprimir = false;
      if ($this.sw_nuevo == 1 || $this.admin_w == 'GEBC') {
        // $this.salir_HC000();
        $this.datoConducta_HC000();
      } else {
        $this.validarCallbackConfirmar_HC000();
      }
    },
    async validarCallbackConfirmar_HC000() {
      if (($this.global_HC000.PRIORIDAD_TRIA == 4 || $this.global_HC000.PRIORIDAD_TRIA == 5) || $this.global_HC000.UMI_TRIA == 'S') {
        // continue
      } else {
        if ($this.sw_nuevo == 1) {
          $this.SEC_CONSUL_W = $this.SEC_CONSUL_W ? $this.SEC_CONSUL_W : '';
          $this.SECU_NUM = $this.SECU_NUM ? $this.SECU_NUM : '';
          await this.grabarConsecutivo_HC000($this.SECU_NUM, $this.SEC_CONSUL_W);
        }
      }

      $this.global_HC000.OPER_ELABHC_TRIA = $this.global_HC000.OPER_MODI_TRIA;

      if(localStorage.Usuario != "GEBC") {
        this.global_HC000.OPER_MODI_TRIA = localStorage.Usuario;
      }

      if(this.sw_nuevo == 1) {
        this.global_HC000.OPER_ELABHC_TRIA = localStorage.Usuario;
      }

      $this.guardado_HC000();
    },
    async grabarConsecutivo_HC000(secuencia, sec_consul) {
      await postData({ datosh: `${datosEnvio()}${secuencia}|${moment().format('YYMMDD')}|${cerosIzq(sec_consul, 6)}|` },
        get_url("APP/CONTAB/CON007X.DLL"))
        .then(data => {
          console.log('GRABA CONSEC', data)
          var data = data;
        })
        .catch(err => {
          console.error(err);
        });
    },
    async guardado_HC000() {
      // this.global_HC000.MEDICO_TRIA = localStorage.IDUSU;
      if(!this.global_HC000.MEDICO_TRIA.trim()) this.global_HC000.MEDICO_TRIA = localStorage.IDUSU;
      
      // QUITAR CARACTERES ESPECIALES A TODOS LOS INPUT TEXT
      for (var prop in $this.global_HC000) {
        if (typeof ($this.global_HC000[prop]) != "object" && typeof ($this.global_HC000[prop]) != "number") {
          $this.global_HC000[prop] = $this.global_HC000[prop].replace(/[\!\*\]\[\}\{\"\'\&\t]/g, ' ');
        }
      }

      for (var prop in $this.global_HC000.EXAMEN_FISICO_TRIA) {
        $this.global_HC000.EXAMEN_FISICO_TRIA[prop].EXA_FISICO_TRIA = $this.global_HC000.EXAMEN_FISICO_TRIA[prop].EXA_FISICO_TRIA.replace(/[\!\*\]\[\}\{\"\'\&\t]/g, ' ');
      }

      var data = {}
      data['datosh'] = datosEnvio() + $_REG_HC.llave_triage_w + '|' + localStorage.Usuario + '|' + $this.sw_nuevo + '|';
      data['ingreso'] = $this.global_HC000.PUERTA_ING_TRIA;
      data['procedencia'] = $this.global_HC000.PROCED_TRIA;
      data['motivo'] = $this.global_HC000.MOTIV_TRIA.replace(/(\r\n|\n|\r)/gm, "&");
      data['antec_fam'] = $this.global_HC000.ANTECED_FAMIL_TRIA.replace(/(\r\n|\n|\r)/gm, "&");
      data['antec_pat'] = $this.global_HC000.ANTECED_PATOL_TRIA.replace(/(\r\n|\n|\r)/gm, "&");
      data['antec_qui'] = $this.global_HC000.ANTECED_QUIRUR_TRIA.replace(/(\r\n|\n|\r)/gm, "&");
      data['antec_ale'] = $this.global_HC000.ANTECED_ALERGICOS_TRIA.replace(/(\r\n|\n|\r)/gm, "&");

      for (var i in $this.global_HC000.EXAMEN_FISICO_TRIA) {
        data[`alterado_${cerosIzq(parseInt(i) + 1, 3)}`] = $this.global_HC000.EXAMEN_FISICO_TRIA[i].ALTERADO_EXA_TRIA;
        data[`exa_fisico_${cerosIzq(parseInt(i) + 1, 3)}`] = $this.global_HC000.EXAMEN_FISICO_TRIA[i].EXA_FISICO_TRIA.replace(/(\r\n|\n|\r)/gm, "&");
      }

      $this.global_HC000.PESO_TRIA > 0 && $this.global_HC000.UND_PESO_TRIA == 1 ? $this.global_HC000.PESO_GRAMOS_TRIA = 0 : false;

      data['peso'] = $this.global_HC000.PESO_TRIA.toString().trim();
      data['peso_gramos'] = $this.global_HC000.PESO_GRAMOS_TRIA.toString().trim();
      data['talla'] = $this.global_HC000.TALLA_TRIA.toString().trim();
      data['temp'] = $this.global_HC000.TEMP_TRIA.toString().trim();
      data['fcard'] = $this.global_HC000.FCARD_TRIA.toString().trim();
      data['fresp'] = $this.global_HC000.FRESP_TRIA.toString().trim();
      data['tens1'] = $this.global_HC000.TENS1_TRIA.toString().trim();
      data['tens2'] = $this.global_HC000.TENS2_TRIA.toString().trim();
      data['oximetria'] = $this.global_HC000.OXIMETRIA_TRIA.toString().trim();
      data['glasgow'] = $this.global_HC000.GLASG_TRIA.toString().trim();
      data['obser'] = $this.global_HC000.OBSER_TRIA.replace(/(\r\n|\n|\r)/gm, "&");
      data['analisis'] = $this.global_HC000.ANALISIS_TRIA.replace(/(\r\n|\n|\r)/gm, "&");
      data['embar'] = $this.global_HC000.EMBAR_TRIA.toString().trim();
      data['causa'] = $this.global_HC000.CAUSA_TRIA.toString().trim();
      data['prioridad'] = $this.global_HC000.PRIORIDAD_TRIA.toString().trim();
      data['pyp'] = $this.global_HC000.PYP_TRIA.toString().trim();
      data['finalid'] = $this.global_HC000.FINALID_TRIA.toString().trim();
      data['conducta'] = $this.global_HC000.CONDUCTA_TRIA.toString().trim();
      data['chikun'] = $this.global_HC000.CHIKUN_TRIA.toString().trim();
      data['folio'] = $this.global_HC000.FOLIO_CONSUL_TRIA.toString().trim();
      data['oper_elabhc'] = $this.global_HC000.OPER_ELABHC_TRIA.toString().trim();
      data['oper_elab'] = $this.global_HC000.OPER_ELAB_TRIA.toString().trim();
      data['oper_modi'] = $this.global_HC000.OPER_MODI_TRIA.toString().trim();
      data['oper_modihc'] = $this.global_HC000.OPER_MODIHC_TRIA.toString().trim();
      data['edad_gest'] = $this.global_HC000.EDAD_GEST_TRIA.toString().trim();
      data['edad'] = espaciosDer($this.global_HC000.EDAD_TRIA, 4);
      data['eps'] = $this.global_HC000.EPS_TRIA.toString().trim();
      data['era'] = $this.global_HC000.ERA_TRIA.toString().trim();
      data['fact'] = $this.global_HC000.FACT_TRIA.toString().trim();
      data['fecha_aten'] = $this.global_HC000.FECHA_ATEN_TRIA.toString().trim();
      data['fecha_regla'] = $this.global_HC000.FECHA_REGLA_TRIA.toString().trim();
      data['hora_aten'] = $this.global_HC000.HORA_ATEN_TRIA.toString().trim();
      data['indicaciones'] = $this.global_HC000.INDICACIONES_TRIA.toString().trim();
      data['ing_remitido'] = $this.global_HC000.ING_REMITIDO_TRIA.toString().trim();
      data['medico'] = $this.global_HC000.MEDICO_TRIA.toString().trim();
      data['med_legal'] = $this.global_HC000.MEDLEGAL_TRIA.toString().trim();
      data['obser_ini'] = $this.global_HC000.OBSER_INI_TRIA.toString().trim();
      data['prefe'] = $this.global_HC000.PREFE_TRIA.toString().trim();
      data['reingreso'] = $this.global_HC000.REINGRESO_TRIA.toString().trim();
      data['remitido'] = $this.global_HC000.REMITIDO_TRIA.replace(/(\r\n|\n|\r)/gm, "&");
      data['sintom_obste'] = $this.global_HC000.SINTOM_OBSTE_TRIA.toString().trim();
      data['sucursal'] = $this.global_HC000.SUCURSAL_TRIA.toString().trim();
      data['trauma'] = $this.global_HC000.TRAUMA_TRIA.toString().trim();
      data['turno'] = $this.global_HC000.TURNO_TRIA.toString().trim();
      data['umi'] = $this.global_HC000.UMI_TRIA.toString().trim();
      data['und_peso'] = $this.global_HC000.UND_PESO_TRIA.toString().trim();
      data['consul'] = $this.global_HC000.CONSUL_TRIA.toString().trim();

      $this.data = data;

      await postData(data, get_url("app/HICLIN/HC000-1.DLL"))
        .then(data => {
          toastr.success("Información guardada");
          setTimeout(() => { $this.confirmar_HC000();}, 300);
        }).catch(err => {
          toastr.error("Error en guardado");
          console.log(err, 'error')
          loader('hide')
        })
    },
    async imprimir_HC000() {
      loader('show');

      if ($this.imprimir != false) {
        await _impresion2({
					tipo: 'pdf',
					archivo: `${localStorage.Usuario + moment().format('-YYMMDD-HHmmssS')}.pdf`,
					content: await _imprimirTriage({}, null, { data: this.global_HC000 }),
			    }).then(() => {
					console.log('Impresión terminada')
					loader('hide');
					this.salir_HC000();
				}).catch((err) => {
					loader('hide');
					console.error(err);
					this.salir_HC000();
				});

        // await _impresion2({
        //   tipo: 'pdf',
        //   archivo: `${localStorage.Usuario + moment().format('-YYMMDD-HHmmssS')}.pdf`,
        //   content: await _imprimirTriage($this.global_HC000),
        // }).then(data => {
        //   console.log('Impresión terminada')
        //   loader('hide');
        //   $this.salir_HC000();
        // }).catch((err) => {
        //   console.error(err);
        // });
      } else {
        $this.salir_HC000();
      }
    },
    // ***************************************** SALIR *******************************************************

    _salirF5(callback_esc) {
      CON851P('03', () => { this[callback_esc]() }, () => { $("#body_main").load("../../HICLIN/paginas/MENU-HIS.html"); });
    },
    salir_HC000() {
      $("#body_main").load("../../HICLIN/paginas/MENU-HIS.html");
    },

    // ***************************************** VENTANAS *********************************************************

    _HC828(callback_esc, input_actual) {
      $this.banderaHC828 = true;
      var arrayHC828 = [
        { COD: '1', DESCRIP: 'NO REFIERE' },
        { COD: '2', DESCRIP: 'NO HAY DATOS' },
      ];
      POPUP(
        {
          array: arrayHC828,
          titulo: "Selección",
          indices: [{ id: "COD", label: "DESCRIP" }],
          seleccion: 1,
          callback_f: () => {
            callback_esc();
          },
        },
        (data) => {
          $this.global_HC000[input_actual] = data.DESCRIP;
          _enterF3(`.${input_actual}`);
          $this.banderaHC828 = false;
        }
      );
    },
    _ventanaEntidades() {
      _ventanaDatos({
        titulo: "ENTIDADES",
        columnas: ["COD-ENT", "NOMBRE-ENT"],
        data: $this._entidades,
        callback_esc: function () {
          document.querySelector('.ENTIDAD_HC000').focus();
        },
        callback: function (data) {
          $this.global_HC000.EPS_TRIA = data['COD-ENT'].trim();
          $this.global_HC000.NOMBRE_ENT = data['NOMBRE-ENT'].trim();
          _enterInput('.ENTIDAD_HC000');
        }
      });
    },
    _pesoUnidad() {
      var arrayUnid = [
        { COD: '1', DESCRIP: 'Kilos' },
        { COD: '2', DESCRIP: 'Gramos' },
      ]
      POPUP(
        {
          array: arrayUnid,
          titulo: "UNIDAD",
          indices: [{ id: "COD", label: "DESCRIP" }],
          seleccion: $this.global_HC000.UND_PESO_TRIA,
          callback_f: () => {
            $this.datoAntecedFam_HC000();
          },
        },
        (data) => {
          $this.global_HC000.UND_PESO_TRIA = parseFloat(data.COD);
          $this.datoPeso_HC000()
        }
      );
    },
    _SER826() {
      POPUP(
        {
          array: $this.arrayEmbar,
          titulo: "EMBARAZO",
          indices: [{ id: "COD", label: "DESCRIP" }],
          seleccion: $this.global_HC000.EMBAR_TRIA,
          callback_f: () => {
            $this.datoAnalisis_HC000();
          },
        },
        (data) => {
          $this.global_HC000.EMBAR_TRIA = data.COD;
          $this.leerEstado_HC000()
        }
      );
    },
    _SER828() {
      POPUP(
        {
          array: $this.arrayCausa,
          titulo: "CAUSA EXTERNA",
          indices: [{ id: "COD", label: "DESCRIP" }],
          seleccion: $this.global_HC000.CAUSA_TRIA,
          callback_f: () => {
            $this.global_HC000.EMBAR_TRIA == '4' ? $this.datoAnalisis_HC000() : setTimeout(() => { $this.ventanaTriage_HC000(); }, 300);
          },
        },
        (data) => {
          $this.global_HC000.CAUSA_TRIA = data.COD;
          $this.global_HC000.DESCRIP_CAUSA_TRIA = data.DESCRIP;
          $this.datoPrioridad_HC000();
        }
      );
    },
    _SER834() {
      POPUP(
        {
          array: $this.arrayFinalid,
          titulo: "FINALIDAD DE LA CONSULTA",
          indices: [{ id: "COD", label: "DESCRIP" }],
          seleccion: $this.global_HC000.FINALID_TRIA,
          callback_f: () => {
            $this.datoPyp_HC000();
          },
        },
        (data) => {
          $this.global_HC000.FINALID_TRIA = data.COD;
          $this.mostrarFinalid_HC000()
        }
      );
    },
    _SER831A() {
      POPUP(
        {
          array: $this.arrayConducta,
          titulo: "CONDUCTA",
          indices: [{ id: "COD", label: "DESCRIP" }],
          seleccion: $this.global_HC000.CONDUCTA_TRIA,
          callback_f: () => {
            $this.conducta_w = '8'
            $this.leerConducta_HC000();
          },
        },
        (data) => {
          $this.global_HC000.CONDUCTA_TRIA = data.COD;
          $this.global_HC000.DESCRIP_CONDUCTA_TRIA = data.DESCRIP;
          $this.leerConducta_HC000();
        }
      );
    },
    ventanaInicial_HC000() {
      var fuente = '<div>' +
        '<div class="col-md-12"' +
        '<div class="portlet light no-padding">' +
        '<div class="portlet-body no-padding">' +
        '<div class="form-group col-md-12 col-sm-12 col-xs-12 no-padding" style="margin: 0 auto;">' +

        // INPUTS TRAUMA, REMITIDO, MED LEGAL, SINTOMAS ERA
        '<div class="col-md-12" style="display: flex" id="divVentanaInicial_HC000">' +

        '<div class="col-md-3">' +
        '<label class="col-md-12 text-center" style="margin-top: 5px">TRAUMA:</label>' +
        '<div class="input-group col-md-12 col-sm-12 col-xs-12" id="validarTrauma_HC000"> ' +
        '<input type="text" id="TRAUMA_TRIA" placeholder="N" class="form-control col-md-6 uppercase" disabled="disabled" maxlength="1" data-orden="1" style="text-align: center" />' +
        '</div>' +
        '</div>' +

        '<div class="col-md-3" id="validarRemitido2_HC000">' +
        '<label class="col-md-12 text-center" style="margin-top: 5px">REMITIDO:</label>' +
        '<div class="input-group col-md-12 col-sm-12 col-xs-12"> ' +
        '<input type="text" id="ING_REMITIDO_TRIA" placeholder="N" class="form-control col-md-6 uppercase" disabled="disabled" maxlength="1" data-orden="1" style="text-align: center" />' +
        '</div>' +
        '</div>' +

        '<div class="col-md-3" id="validarMedLegal_HC000">' +
        '<label class="col-md-12 text-center" style="margin-top: 5px">MEDICO LEGAL:</label>' +
        '<div class="input-group col-md-12 col-sm-12 col-xs-12"> ' +
        '<input type="text" id="MEDLEGAL_TRIA" placeholder="N" class="form-control col-md-6 uppercase" disabled="disabled" maxlength="1" data-orden="1" style="text-align: center" />' +
        '</div>' +
        '</div>' +

        '<div class="col-md-3" id="validarSintomasEra_HC000">' +
        '<label class="col-md-12 text-center" style="margin-top: 5px">SINTOMAS.ERA:</label>' +
        '<div class="input-group col-md-12 col-sm-12 col-xs-12"> ' +
        '<input type="text" id="ERA_TRIA" placeholder="N" class="form-control col-md-6 uppercase" disabled="disabled" maxlength="1" data-orden="1" style="text-align: center" />' +
        '</div>' +
        '</div>' +

        '</div>' +
        // 

        '<div class="salto-linea"></div>' +
        '<div class="salto-linea"></div>' +
        '<div class="salto-linea"></div>' +

        '</div>' +

        '</div>' +
        '</div>' +
        '</div>' +
        '<div style="clear:both;"></div>' +
        '</div>'

      $this.ventanaInicial = bootbox.dialog({
        title: 'CONFIRMAR INGRESO',
        message: fuente,
        closeButton: false,
        buttons: {
          main: {
            label: "Aceptar",
            className: "blue hidden",
            callback: function () {

            }
          }
        },
      });

      $this.ventanaInicial.on('shown.bs.modal', async function (e) {
        $('.modal-content').css({ 'width': '750px', 'position': 'fixed', 'top': '50%', 'left': '50%', 'transform': 'translate(-50%, -50%)' })

        $this.datoTrauma_HC000();
      })
    },
    _ventanaGlasg_HC000() {
      var fuente = '<div>' +
        '<div class="col-md-12"' +
        '<div class="portlet light no-padding">' +
        '<div class="portlet-body no-padding">' +
        '<div class="form-group col-md-12 col-sm-12 col-xs-12 no-padding" style="margin: 0 auto;">' +

        // INPUTS GLASGOW
        //GLASG1
        '<div class="col-md-4">' +
        '<div class="input-group col-md-12 col-sm-12 col-xs-12" style="background-color: #e4e5eb; padding-top: 6px; padding-bottom: 39px">' +
        '<ol>' +
        '<li value="1">Ninguna</li>' +
        '<li>Al dolor</li>' +
        '<li>A ordenes</li>' +
        '<li>Expontanea</li>' +
        '</ol>' +
        '</div>' +
        '<div class="inline-inputs">' +
        '<label class="col-md-8 col-sm-8 col-xs-8" style="background: #ccc; padding-right: 0;">Apertura ocular:</label>' +
        '<div class="input-group col-md-4 col-sm-4 col-xs-4" id="validarGlasg1_HC000">' +
        '<input id="glasg1_HC000" type="number" class="glasg1 form-control col-md-4 col-sm-4 col-xs-4" maxlength="1" data-orden="1" disabled="disabled">' +
        '</div>' +
        '</div>' +
        '</div>' +
        //

        // GLASG2
        '<div class="col-md-4">' +
        '<div class="input-group col-md-12 col-sm-12 col-xs-12" style="background-color: #e4e5eb; padding-top: 6px; padding-bottom: 20px">' +
        '<ol>' +
        '<li value="1">Ninguna</li>' +
        '<li>Incomprensible</li>' +
        '<li>Inapropiada</li>' +
        '<li>Confusa</li>' +
        '<li>Orientada</li>' +
        '</ol>' +
        '</div>' +
        '<div class="inline-inputs">' +
        '<label class="col-md-8 col-sm-8 col-xs-8" style="background: #ccc; padding-right: 0;">Respuesta verbal:</label>' +
        '<div class="input-group col-md-4 col-sm-4 col-xs-4" id="validarGlasg2_HC000">' +
        '<input id="glasg2_HC000" type="number" class="glasg2 form-control col-md-4 col-sm-4 col-xs-4" maxlength="1" data-orden="1" disabled="disabled">' +
        '</div>' +
        '</div>' +
        '</div>' +
        //

        // GLASG3
        '<div class="col-md-4">' +
        '<div class="input-group col-md-12 col-sm-12 col-xs-12" style="background-color: #e4e5eb; padding-top: 6px;">' +
        '<ol>' +
        '<li value="1">Ninguna</li>' +
        '<li>Descerebracion</li>' +
        '<li>Decorticacion</li>' +
        '<li>Retira</li>' +
        '<li>Localiza</li>' +
        '<li>Obedece orden</li>' +
        '</ol>' +
        '</div>' +
        '<div class="inline-inputs">' +
        '<label class="col-md-8 col-sm-8 col-xs-8" style="background: #ccc; padding-right: 0;">Respuesta motora:</label>' +
        '<div class="input-group col-md-4 col-sm-4 col-xs-4" id="validarGlasg3_HC000">' +
        '<input id="glasg3_HC000" type="number" class="glasg3 form-control col-md-4 col-sm-4 col-xs-4" maxlength="1" data-orden="1" disabled="disabled">' +
        '</div>' +
        '</div>' +
        '</div>' +
        //
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '<div style="clear:both;"></div>' +
        '</div>'

      $this.ventanaGlasg = bootbox.dialog({
        title: 'GLASGOW',
        message: fuente,
        closeButton: false,
        buttons: {
          main: {
            label: "Aceptar",
            className: "blue hidden",
            callback: function () {

            }
          }
        },
      });
      $this.ventanaGlasg.on('shown.bs.modal', async function (e) {
        $('.modal-content').css({ 'width': '750px', 'position': 'fixed', 'top': '50%', 'left': '50%', 'transform': 'translate(-50%, -50%)' })

        $this.datoGlasg1_HC000();
      })
    },
    ventanaTriage_HC000() {
      if ($this.global_HC000.EDAD_TRIA.substring(0, 1) == 'A' && parseFloat($this.global_HC000.EDAD_TRIA.substring(1, 4)) > 12 && $this.paci.SEXO == 'F') {
        var fuente = '<div>' +
          '<div class="col-md-12"' +
          '<div class="portlet light no-padding">' +
          '<div class="portlet-body no-padding">' +
          '<div class="form-group col-md-12 col-sm-12 col-xs-12 no-padding" style="margin: 0 auto;">' +

          // INPUTS EMBARAZO, UMI
          '<div class="col-md-12" style="display: flex" id="divVentanaTriage_HC000">' +

          // INPUT SINTOMATOLOGIA
          '<div class="col-md-5 no-padding">' +
          '<label class="col-md-12 text-center" style="margin-top: 10px">&nbsp;</label>' +
          '<label class="col-md-12 text-center" style="margin-top: 5px">&nbsp;</label>' +
          '<div class="col-md-12 no-padding inline-inputs">' +
          '<label class="col-md-9 text-center">SINTOMATOLOGIA OBSTETRICA:</label>' +
          '<div class="input-group col-md-3 col-sm-3 col-xs-3" id="validarSintomObste_HC000"> ' +
          '<input type="text" id="SINTOM_OBSTE" class="form-control col-md-6" disabled="disabled" maxlength="1" data-orden="1" style="text-align: center" />' +
          '</div>' +
          '</div>' +
          '</div>' +

          // INPUTS FECHA REGLA
          '<div class="col-md-7">' +

          '<label class="col-md-12 text-center" style="margin-top: 5px">FECHA ULTIMA REGLA:</label>' +

          '<div class="salto-linea"></div>' +

          '<div class="col-md-4" id="validarAñoRegla_HC000">' +
          '<label class="col-md-12 text-center" style="margin-top: 5px">AÑO:</label>' +
          '<div class="input-group col-md-12 col-sm-12 col-xs-12"> ' +
          '<input type="number" id="AÑO_REGLA" class="form-control col-md-6" disabled="disabled" maxlength="4" data-orden="1" style="text-align: center" />' +
          '</div>' +
          '</div>' +

          '<div class="col-md-4" id="validarMesRegla_HC000">' +
          '<label class="col-md-12 text-center" style="margin-top: 5px">MES:</label>' +
          '<div class="input-group col-md-12 col-sm-12 col-xs-12"> ' +
          '<input type="number" id="MES_REGLA" class="form-control col-md-6" disabled="disabled" maxlength="2" data-orden="1" style="text-align: center" />' +
          '</div>' +
          '</div>' +

          '<div class="col-md-4" id="validarDiaRegla_HC000">' +
          '<label class="col-md-12 text-center" style="margin-top: 5px">DIA:</label>' +
          '<div class="input-group col-md-12 col-sm-12 col-xs-12"> ' +
          '<input type="number" id="DIA_REGLA" class="form-control col-md-6" disabled="disabled" maxlength="2" data-orden="1" style="text-align: center" />' +
          '</div>' +
          '</div>' +

          '</div>' +
          '</div>' +

          '<div class="salto-linea"></div>' +

          '<div class="col-md-12" style="display: flex">' +
          // INPUT EDAD GESTACIONAL
          '<div class="col-md-5 no-padding">' +
          '<div class="col-md-12 no-padding inline-inputs">' +
          '<label class="col-md-9 text-center">EDAD GESTACIONAL:</label>' +
          '<div class="input-group col-md-3 col-sm-3 col-xs-3" id="validarEdadGest_HC000"> ' +
          '<input type="text" id="EDAD_GEST" class="form-control col-md-6" disabled="disabled" maxlength="3" data-orden="1" style="text-align: center" />' +
          '</div>' +
          '</div>' +
          '</div>' +

          // INPUT UMI
          '<div class="col-md-2 no-padding" style="margin-left: 29px; width: 14.5%; display: none" id="divUmi_HC000">' +
          '<div class="col-md-12 no-padding inline-inputs">' +
          '<label class="col-md-7 text-center">UMI:</label>' +
          '<div class="input-group col-md-5 col-sm-5 col-xs-5" id="validarUmi_HC000"> ' +
          '<input type="text" id="UMI" class="form-control col-md-6" disabled="disabled" maxlength="1" data-orden="1" style="text-align: center" />' +
          '</div>' +
          '</div>' +
          '</div>' +
          '</div>' +
          // 

          '<div class="salto-linea"></div>' +

          '</div>' +

          '</div>' +
          '</div>' +
          '</div>' +
          '<div style="clear:both;"></div>' +
          '</div>'

        $this.ventanaTriage = bootbox.dialog({
          title: 'DATOS DE TRIAGE',
          message: fuente,
          closeButton: false,
          buttons: {
            main: {
              label: "Aceptar",
              className: "blue hidden",
              callback: function () {

              }
            }
          },
        });

        $this.ventanaTriage.on('shown.bs.modal', async function (e) {
          $('.modal-content').css({ 'width': '850px', 'position': 'fixed', 'top': '50%', 'left': '50%', 'transform': 'translate(-50%, -50%)' })

          $this.datoSintomObste_HC000();
        })
      } else {
        $this.global_HC000.FECHA_REGLA_TRIA = '00000000';
        $this.global_HC000.SINTOM_OBSTE_TRIA = ' ';
        $this.global_HC000.EDAD_GEST_TRIA = '';
        $this.aceptarCausa_HC000();
      }
    },
    async cargarArchivos_HC000() {
      postData({ datosh: datosEnvio() + $_REG_HC.llave_triage_w.substring(12, 27) }, get_url("app/SALUD/SER810-1.DLL"))
        .then(data => {
          $this.paci = data['REG-PACI'][0];
        }).catch(err => {
          $this.paci = [];
          console.log(err, 'error')
          loader('hide')
        })

      await postData({ datosh: datosEnvio() }, get_url("app/SALUD/SER853.DLL"))
        .then(data => {
          $this._entidades = data.ENTIDADES;
          $this._entidades.pop();
          loader('hide');
        }).catch(err => {
          $this._entidades = [];
          console.log(err, 'error')
          loader('hide')
        })
    },
    botonFlujo(flujo) {
      _inputControl('disabled');

      // apertura
      set_Event_validar('#validarProcedencia_HC000', 'off')
      set_Event_validar('#validarMotivo_HC000', 'off')

      // antecedentes
      set_Event_validar('#validarAntecFam_HC000', 'off')
      set_Event_validar('#validarAntecPat_HC000', 'off')
      set_Event_validar('#validarAntecQui_HC000', 'off')
      set_Event_validar('#validarAntecAle_HC000', 'off')

      // examen fisico
      for (var i = 0; i < 8; i++) {
        set_Event_validar('#validarExamen' + i + '_HC000', 'off')
        set_Event_validar('#validarDescripExamen' + i + '_HC000', 'off')
      }

      // signos vitales
      set_Event_validar('#validarPeso_HC000', 'off')
      set_Event_validar('#validarTalla_HC000', 'off')
      set_Event_validar('#validarTemp_HC000', 'off')
      set_Event_validar('#validarFCard_HC000', 'off')
      set_Event_validar('#validarFResp_HC000', 'off')
      set_Event_validar('#validarTens1_HC000', 'off')
      set_Event_validar('#validarTens2_HC000', 'off')
      set_Event_validar('#validarOxi_HC000', 'off')
      set_Event_validar('#validarGlasg_HC000', 'off')

      // sintomas
      set_Event_validar('#validarOtrosSintomas_HC000', 'off')

      // analisis
      set_Event_validar('#validarAnalisis_HC000', 'off')

      // rips
      set_Event_validar('#validarEmbarazo_HC000', 'off')
      set_Event_validar('#validarCausa_HC000', 'off')
      set_Event_validar('#validarPrioridad_HC000', 'off')
      set_Event_validar('#validarPyp_HC000', 'off')
      set_Event_validar('#validarFinalidad_HC000', 'off')
      set_Event_validar('#validarConducta_HC000', 'off')
      set_Event_validar('#validarDengue_HC000', 'off')

      // otros
      set_Event_validar('#validarFolio_HC000', 'off')
      set_Event_validar('#validarOperador_HC000', 'off')
      set_Event_validar('#validarTrauma_HC000', 'off')
      set_Event_validar('#validarRemitido2_HC000', 'off')
      set_Event_validar('#validarMedLegal_HC000', 'off')
      set_Event_validar('#validarSintomasEra_HC000', 'off')
      set_Event_validar('#validarGlasg1_HC000', 'off')
      set_Event_validar('#validarGlasg2_HC000', 'off')
      set_Event_validar('#validarGlasg3_HC000', 'off')

      // embarazo
      set_Event_validar('#validarSintomObste_HC000', 'off')
      set_Event_validar('#validarAñoRegla_HC000', 'off')
      set_Event_validar('#validarMesRegla_HC000', 'off')
      set_Event_validar('#validarDiaRegla_HC000', 'off')
      set_Event_validar('#validarEdadGest_HC000', 'off')
      set_Event_validar('#validarUmi_HC000', 'off')

      switch (flujo) {
        case 1: this.puertaIngreso_HC000()
          break;
        case 2:
          document.getElementById("btnFlujo_triage").disabled = false;
          this.datoAlterado_HC000(0)
          break;
        case 3:
          document.getElementById("btnFlujo_triage").disabled = false;
          document.getElementById("btnFlujo_examen_fisico").disabled = false;

          this.datoUnidadPeso_HC000();
          break;
        case 4:
          document.getElementById("btnFlujo_triage").disabled = false;
          document.getElementById("btnFlujo_examen_fisico").disabled = false;
          document.getElementById("btnFlujo_signos_vitales").disabled = false;

          this.datoOtros_HC000();
          break;
        case 5:
          document.getElementById("btnFlujo_triage").disabled = false;
          document.getElementById("btnFlujo_examen_fisico").disabled = false;
          document.getElementById("btnFlujo_signos_vitales").disabled = false;
          document.getElementById("btnFlujo_sintomas").disabled = false;

          this.datoAnalisis_HC000();
          break;
        case 6:
          document.getElementById("btnFlujo_triage").disabled = false;
          document.getElementById("btnFlujo_examen_fisico").disabled = false;
          document.getElementById("btnFlujo_signos_vitales").disabled = false;
          document.getElementById("btnFlujo_sintomas").disabled = false;
          document.getElementById("btnFlujo_analisis").disabled = false;

          this.aceptarEstado_HC000();
          break;
      }
    },
  }
})