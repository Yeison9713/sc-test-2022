new Vue({
  el: "#ser9455",
  components: {
    loader_modal: require("../../frameworks/scripts/loader-modal/index.vue"),
  },
  data: {
    estado_loader: false,
    progreso: {},
    label_loader: null,
    loader: 1,
    tipo_impresion: null,

    unidServicios: [],
    profesionales: [],
    datosPaciente: {
      id_paciente: null,
    },
    form: {
      fecha_ini: {
        anio: null,
        mes: null,
        dia: null,
      },
      fecha_fin: {
        anio: null,
        mes: null,
        dia: null,
      },
      id_paciente: null,
      filtrarHcSinFact: null,
      unserv: null,
      id_profesional: null,
      tipo_formu: "*",
      discriminar: null,
    },
    descrpcion: {
      paciente: null,
      unserv: null,
      profesional: null,
      tipo_formu: null,
    },
    opcionesTipoFormu: [
      { text: "Medicamentos", value: 1 },
      { text: "Laboratorios", value: 2 },
      { text: "Imagen diagnosticos", value: 3 },
      { text: "Ordenes medicas", value: 4 },
      { text: "Consultas", value: 5 },
      // { text: "Incapacidades medicas", value: 6 },
      { text: "Todas", value: "*" },
    ],
    datos_informe: [],
    new_array: [],
  },
  watch: {
    "datosPaciente.id_paciente": function (val) {
      if (!val) this.descrpcion.paciente = "";
      else if (val == "99") this.descrpcion.paciente = "Todo los pacientes";
      else this.descrpcion.paciente = this.datosPaciente.DESCRIP;
    },
  },
  created() {
    console.clear();

    _vm = this;

    nombreOpcion("9-4-5-5 - Informe formulación vs facturación");
    _inputControl("reset");
    _inputControl("disabled");
    loader("show");

    let fecha_act = this._currentDate(),
      { fecha_ini } = this.form;

    fecha_ini.anio = fecha_act.substr(0, 4);
    fecha_ini.mes = fecha_act.substr(4, 2);
    fecha_ini.dia = "01";

    _vm = this;
    this._getUnidServicio();
  },
  methods: {
    _getUnidServicio() {
      postData({ datosh: datosEnvio() }, get_url("APP/SALUD/SER873.DLL"))
        .then((result) => {
          this.unidServicios = result.UNSERV.filter((e) => {
            if (e.ESTADO == "S") return e;
          });
          this._getProfesionales();
        })
        .catch((err) => {
          loader("hide");
          _toggleNav();
        });
    },
    _getProfesionales() {
      postData({ datosh: datosEnvio() }, get_url("APP/SALUD/SER819.DLL"))
        .then((result) => {
          this.profesionales = result.ARCHPROF;
          this.profesionales.pop();
          loader("hide");
          this._validarFechaInicial(1);
        })
        .catch((err) => {
          loader("hide");
          _toggleNav();
        });
    },

    _validarFechaInicial(orden) {
      validarInputs(
        {
          form: "#faseFechaIni",
          orden,
        },
        _toggleNav,
        () => {
          let { anio, mes, dia } = this.form.fecha_ini;

          if (_validarFecha(anio, mes, dia)) {
            let fecha_act = this._currentDate(),
              { fecha_fin } = this.form;

            fecha_fin.anio = fecha_act.substr(0, 4);
            fecha_fin.mes = fecha_act.substr(4, 2);
            fecha_fin.dia = fecha_act.substr(6, 2);

            this._validarFechaFinal(1);
          } else {
            CON851("03", "03", null, "error", "Error");
            this._validarFechaInicial(3);
          }
        }
      );
    },
    _validarFechaFinal(orden) {
      validarInputs(
        {
          form: "#faseFechaFin",
          orden,
        },
        () => {
          this._validarFechaInicial(3);
        },
        () => {
          let { anio, mes, dia } = this.form.fecha_fin;
          if (_validarFecha(anio, mes, dia)) {
            this._validarPaciente();
          } else {
            CON851("03", "03", null, "error", "Error");
            this._validarFechaFinal("3");
          }
        }
      );
    },
    _validarPaciente() {
      validarInputs(
        {
          form: "#fasePaciente",
          orden: "1",
        },
        () => {
          this._validarFechaFinal("3");
        },
        () => {
          let { id_paciente } = this.form;

          if (id_paciente == 99) {
            this.datosPaciente = { id_paciente };
            this._validarHcSinFact();
          } else {
            this._getDatosPaciente();
          }
        }
      );
    },
    _getDatosPaciente() {
      let id_paciente = this.form.id_paciente;
      let datosh = datosEnvio() + id_paciente.padStart(15, "0") + "|";
      postData({ datosh }, get_url("APP/SALUD/SER810-1.DLL"))
        .then((result) => {
          this.datosPaciente = { ...result["REG-PACI"][0] };
          this.datosPaciente.id_paciente = id_paciente;
          this._validarHcSinFact();
        })
        .catch((err) => {
          this.form.id_paciente = "";
          this.datosPaciente.id_paciente = "";
          this._validarPaciente();
        });
    },

    _validarHcSinFact() {
      validarInputs(
        {
          form: "#_validarHcSinFact",
        },
        () => this._validarPaciente(),
        () => {
          let dato = (this.form.filtrarHcSinFact = this.form.filtrarHcSinFact
            .toUpperCase()
            .trim());

          switch (dato) {
            case "S":
              this.form.id_paci = this.form.id_profesional = "99";
              this.form.unserv = "**";
              this.form.tipo_formu = "*";
              this._validarDiscriminado();
              break;
            case "N":
              this._validarUnserv();
              break;
            default:
              CON851("03", "03", null, "warning", "Advertencia");
              this._validarHcSinFact();
              break;
          }
        }
      );
    },

    _validarUnserv() {
      validarInputs(
        {
          form: "#faseUnserv",
          orden: "1",
        },
        () => {
          this._validarHcSinFact();
        },
        () => {
          let { unserv } = this.form,
            consulta = this.unidServicios.find((a) => a.COD == unserv);

          if (unserv == "**") {
            this.descrpcion.unserv = "Todas las unidades Serv.";
            this._validarProfesional();
          } else if (consulta) {
            this.descrpcion.unserv = consulta.DESCRIP;
            this._validarProfesional();
          } else {
            CON851("03", "03", null, "error", "Error");
            this._validarUnserv();
          }
        }
      );
    },
    _validarProfesional() {
      validarInputs(
        {
          form: "#faseProfesional",
          orden: "1",
        },
        () => {
          this._validarUnserv();
        },
        () => {
          let { id_profesional } = this.form,
            consulta = this.profesionales.find(
              (a) => a.IDENTIFICACION == id_profesional
            );

          if (id_profesional == "99") {
            this.descrpcion.profesional = "Todos los profesionales";
            this._ventanaTipoFormu();
          } else if (consulta) {
            this.descrpcion.profesional = consulta.NOMBRE;
            this._ventanaTipoFormu();
          } else {
            CON851("03", "03", null, "error", "Error");
            this._validarProfesional();
          }
        }
      );
    },
    _ventanaTipoFormu() {
      let _this = this;
      POPUP(
        {
          array: _this.opcionesTipoFormu,
          titulo: "Tipo formulacion",
          indices: [{ id: "value", label: "text" }],
          seleccion: _this.form.tipo_formu,
          callback_f: () => {
            _this._validarProfesional();
          },
        },
        (data) => {
          _this.form.tipo_formu = data.value;
          _this.descrpcion.tipo_formu = `${data.value} - ${data.text}`;
          _this._validarDiscriminado();
        }
      );
    },
    _validarDiscriminado() {
      validarInputs(
        {
          form: "#faseDiscriminar",
          orden: "1",
        },
        () => {
          if (this.form.filtrarHcSinFact == "S") this._validarHcSinFact();
          else this._validarProfesional();
        },
        () => {
          let discriminar = String(this.form.discriminar).toUpperCase() || "N";

          if (["S", "N"].includes(discriminar)) {
            CON851P(
              "Generar informe ?",
              () => {
                this._validarDiscriminado();
              },
              () => {
                loader("show");
                this._getInforme();
              }
            );
          } else {
            CON851("03", "03", null, "error", "Error");
            this._validarDiscriminado();
          }
        }
      );
    },

    async _getInforme() {
      let { form } = this;

      form.fecha_ini.mes = form.fecha_ini.mes.padStart(2, "0");
      form.fecha_ini.dia = form.fecha_ini.dia.padStart(2, "0");
      let fecha_inicio =
        form.fecha_ini.anio + form.fecha_ini.mes + form.fecha_ini.dia;

      form.fecha_fin.mes = form.fecha_fin.mes.padStart(2, "0");
      form.fecha_fin.dia = form.fecha_fin.dia.padStart(2, "0");
      let fecha_fin =
        form.fecha_fin.anio + form.fecha_fin.mes + form.fecha_fin.dia;

      let id_paci =
        parseInt(form.id_paciente) == 99
          ? "99"
          : form.id_paciente.padStart(15, "0");

      let datos = {
        datosh: datosEnvio() + "|" + localStorage.Usuario + "|",
        id_paci: id_paci,
        id_medico: form.id_profesional,
        fecha_inicio,
        fecha_fin,
        unserv: form.unserv,
        tipo_formu: form.tipo_formu,
        filtrar_hc_sin_fact: form.filtrarHcSinFact,
      };

      postData(datos, get_url("APP/SALUD/SER9455.DLL"))
        .then((result) => {
          this.new_array = [];
          this.datos_informe = result.DATOS;
          loader("hide");
          if (this.datos_informe.length > 0) {
            this._initInforme()
              .then(() => {
                this._imprimir();
              })
              .catch((err) => {
                console.log("Error: ", err);
                this.form.filtrarHcSinFact == "S"
                  ? this._validarHcSinFact()
                  : this._validarDiscriminado();
              });
          } else {
            toastr.success("No se encontraro datos");
            _toggleNav();
          }
        })
        .catch((err) => {
          loader("hide");
          console.log(err);
          this.form.filtrarHcSinFact == "S"
            ? this._validarHcSinFact()
            : this._validarDiscriminado();
        });
    },
    _imprimir() {
      let { new_array } = this;

      _impresion2({
        tipo: "csv",
        datos: new_array,
        columnas: false,
      })
        .then(() => {
          _toggleNav();
        })
        .catch((err) => {
          console.log(err);
          this._validarDiscriminado();
        });
    },

    _initInforme() {
      return new Promise((resolve) => {
        let array = this.datos_informe;

        array.forEach((item) => {
          let data = [...item.formulado, ...item.facturado].sort((a, b) =>
            a.cod.localeCompare(b.cod)
          );

          this._organizarArray(item, JSON.parse(JSON.stringify(data)));
        });

        resolve();
      });
    },
    _organizarArray(itemHc, array) {
      let sort_data = [],
        discriminar = this.form.discriminar.toUpperCase() || "N";

      array.forEach((item, index) => {
        let isTrue = sort_data.findIndex(
          (el) => el.cod.trim() == item.cod.trim()
        );

        if (isTrue < 0) {
          let obj = {
            cod: item.cod,
            descrip: item.descrip,
            comprobante: item.comprobante || "",
            cant_formu: parseFloat(item.cant_formu) || 0,
            cant_fact: parseFloat(item.cant_fact) || 0,
            arrayComp: item.comprobante ? [item.comprobante] : [],
          };

          if (index == 0 && discriminar == "N") Object.assign(obj, itemHc);
          sort_data.push(obj);
        } else {
          sort_data[isTrue].cant_fact += parseFloat(item.cant_fact) || 0;
          sort_data[isTrue].cant_formu += parseFloat(item.cant_formu) || 0;

          if (item.comprobante) {
            if (!sort_data[isTrue].arrayComp.includes(item.comprobante)) {
              sort_data[isTrue].arrayComp.push(item.comprobante);
            }
          }
        }

        isTrue = sort_data.findIndex((el) => el.cod.trim() == item.cod.trim());

        if (discriminar == "S") {
          if (index == 0) Object.assign(item, itemHc);
          this.new_obj(item);

          if (index == array.length - 1) {
            this.new_obj({
              ...sort_data[isTrue],
              ...{ cod: "", descrip: "", factura: "Total", comprobante: "" },
            });
          } else if (array[index].cod != array[index + 1].cod) {
            this.new_obj({
              ...sort_data[isTrue],
              ...{ cod: "", descrip: "", factura: "Total", comprobante: "" },
            });
          }
        }
      });

      if (discriminar == "N") {
        sort_data.forEach((item, index) => {
          this.new_obj(item);
        });
      }
    },

    new_obj(obj) {
      let hora = obj.hora || "",
        discriminar = this.form.discriminar.toUpperCase() || "N",
        tipo_formu = obj.metodo || "";

      if (obj.cod && !tipo_formu) tipo_formu = "Facturado";

      if (hora) {
        let mom = moment(hora, "HHmm");
        mom.format();
        hora = mom.format("HH:mm");
      }

      let new_item = {
        tipo_id: obj.tipo_id_paci || "",
        paciente: obj.id_paci || "",
        primer_apel: obj.primer_apel_paci || "",
        segundo_apel: obj.segundo_apel_paci || "",
        primer_nombre: obj.primer_nom_paci || "",
        segundo_nombre: obj.segundo_nom_paci || "",

        fecha: obj.fecha || "",
        hora,
        unserv: obj.descrip_unserv || "",
        eps_paci: obj.descrip_eps_paci || "",
        eps_fact: obj.descrip_eps_fact || "",
        factura: obj.factura || "",

        tipo_formu,
        manejo: obj.manejo || "",
        codigo: obj.cod || "",
        descrpcion: obj.descrip || "",
        cant_formu: parseFloat(obj.cant_formu) || 0,
        cant_fact: parseFloat(obj.cant_fact) || 0,
        comprobante:
          discriminar == "S" ? obj.comprobante : obj.arrayComp.join(" ; "),
      };

      if (discriminar == "N") {
        delete new_item.tipo_formu;
        delete new_item.manejo;
        // delete new_item.comprobante;
      }

      this.new_array.push(new_item);
    },

    _ventanaPacientes() {
      parametros = {
        dll: "PACIENTES",
        valoresselect: ["Nombre"],
        f8data: "PACIENTES",
        columnas: [
          { title: "COD" },
          { title: "NOMBRE" },
          { title: "EPS" },
          { title: "EDAD" },
        ],
        callback: (data) => {
          this.form.id_paciente = data.COD;
          this.$refs.id_paciente.focus();
          _enterInput(`[ref="id_paciente"`);
        },
        cancel: (f) => {
          this.$refs.id_paciente.focus();
        },
      };
      F8LITE(parametros);
    },
    _ventanaUnidades() {
      let _this = this;
      _ventanaDatos({
        titulo: "Ventana unidades de servicio",
        columnas: ["COD", "DESCRIP"],
        data: _this.unidServicios,
        callback_esc: () => {
          _this.$refs.unserv.focus();
        },
        callback: function (data) {
          _this.form.unserv = data.COD;
          _this.$refs.unserv.focus();
          _enterInput(`[ref="unserv"`);
        },
      });
    },
    _ventanaProfesionales() {
      let _this = this;
      _ventanaDatos({
        titulo: "Ventana de profesionales",
        columnas: ["IDENTIFICACION", "NOMBRE"],
        data: _this.profesionales,
        callback_esc: () => {
          _this.$refs.id_profesional.focus();
        },
        callback: function (data) {
          _this.form.id_profesional = data.IDENTIFICACION;
          _this.$refs.id_profesional.focus();
          _enterInput(`[ref="id_profesional"`);
        },
      });
    },
    _currentDate() {
      let options = {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      };

      let date = new Date().toLocaleDateString("es-CO", options).split("/");
      return `${date[2]}${date[1]}${date[0]}`;
    },
  },
});
