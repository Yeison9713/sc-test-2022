new Vue({
  el: "#GET_CITAS",
  data: {
    mostrar_tabla: false,
    id_paci: "",
    descrip_paci: "",
    ano_citas: "",
    fecha_act: moment().format("YYYYMMDD"),
    tabla_citas: [],
  },
  created() {
    _inputControl("disabled");
    _inputControl("reset");
    this.datoAno();
  },
  methods: {
    datoAno() {
      if (!this.ano_citas.trim()) this.ano_citas = this.fecha_act.slice(0, 4);
      validarInputs(
        {
          form: "#ano_citas",
        },
        _regresar_menuhis,
        () => {
          if (this.ano_citas >= 2000) this.datoPaciente();
          else this.datoAno();
        }
      );
    },

    datoPaciente() {
      validarInputs(
        {
          form: "#id_paci",
        },
        this.datoAno,
        () => {
          if (this.id_paci.trim()) {
            postData({ datosh: datosEnvio() + this.id_paci.padStart(15, "0") }, get_url("APP/SALUD/SER810-1.DLL"))
              .then((data) => {
                this.id_paci = data["REG-PACI"][0].COD;
                this.descrip_paci = data["REG-PACI"][0].DESCRIP;
                this.consultaDll();
              })
              .catch((error) => {
                console.error(error);
                CON851("", "Error consultando paciente", null, "error", "");
                this.datoPaciente();
              });
          } else {
            this.datoPaciente();
          }
        }
      );
    },

    consultaDll() {
      postData(
        {
          datosh: datosEnvio() + this.id_paci + "|" + this.fecha_act + "|" + this.ano_citas + "|",
        },
        get_url("APP/SALUD/SER836.DLL")
      )
        .then(async (data) => {
          this.tabla_citas = data.CITAS;
          this.tabla_citas.pop();
          if (this.tabla_citas.length > 1) {
            for (let i in this.tabla_citas) {
              this.tabla_citas[i].FECHA_CITA = _editFecha2(this.tabla_citas[i].FECHA_CITA);
              this.tabla_citas[i].HORA_CITA = _editHora(this.tabla_citas[i].HORA_CITA);
            }
            this.mostrar_tabla = true;
            this.focoTabla(0);
          } else {
            CON851("", "El paciente no tiene citas en el año seleccionado", null, "warning", "");
            _regresar_menuhis();
          }
        })
        .catch((error) => {
          console.error(error);
          if (!error.STATUS) CON851("", "Error consultando datos", null, "error", "Error");
          this.datoPaciente();
        });
    },

    focoTabla(order) {
      validarTabla(
        {
          tabla: "#tabla_citas",
          orden: order,
          Esc: () => {
            this.tabla_citas = [];
            this.datoAno();
          },
          bloqEnter: true,
        },
        (data) => {},
        () => this.focoTabla(0),
        () => this.focoTabla(tabla_citas.rows.length - 1)
      );
    },

    _ventanaPacientes() {
      parametros = {
        dll: "PACIENTES",
        valoresselect: ["Nombre del paciente"],
        f8data: "PACIENTES",
        columnas: [{ title: "COD" }, { title: "NOMBRE" }, { title: "EPS" }, { title: "EDAD" }],
        cancel: () => {
          document.querySelector(".id_paci").focus();
        },
        callback: (data) => {
          this.id_paci = cerosIzq(data.COD, 15);
          this.descrip_paci = data.NOMBRE;
          _enterInput(".id_paci");
        },
      };
      F8LITE(parametros);
    },
  },
});
