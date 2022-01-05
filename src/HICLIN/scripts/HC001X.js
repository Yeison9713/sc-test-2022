new Vue({
  el: "#hc001x",
  components: {
    "v-select": VueSelect.VueSelect,
  },
  data: {
    selected: false,
    id_paciente: null,
    historias: [],
    evoluciones: [],
    options: [
      { id: 0, text: "Consulta por historia clinica" },
      { id: 1, text: "Consulta por evolucion clinica" },
    ],
  },
  created() {
    _inputControl("reset");
    _inputControl("disabled");

    this._validarPaciente();
  },
  watch: {
    selected: function (val) {
      this.$refs.cod_paci.focus();
      this.historias = [];
      this.evoluciones = [];
    },
  },
  methods: {
    _validarPaciente() {
      let hc001x = this;
      validarInputs(
        {
          form: "#_validarPaciente",
          orden: "1",
        },
        () => {
          CON851P("Desea salir ?", hc001x._validarPaciente, () => {
            hc001x._salir_hc001x();
          });
        },
        () => {
          if (!hc001x.selected) {
            plantillaToast(
              "",
              "Selecione un tipo de consulta",
              "Error",
              "error"
            );
            hc001x._validarPaciente();
          } else {
            if (hc001x.id_paciente) hc001x._consultHc();
            else {
              plantillaToast(
                "",
                "Ingrese una identificacion",
                "Error",
                "error"
              );
              hc001x._validarPaciente();
            }
          }
        }
      );
    },
    _consultHc() {
      let hc001x = this,
        paciente = hc001x.id_paciente || "",
        datosh = datosEnvio() + paciente.padStart(15, "0") + "|",
        dll = hc001x.selected.id == 0 ? "HC811" : "HC002X";

      loader("show");

      hc001x.historias = [];
      hc001x.evoluciones = [];

      postData({ datosh }, get_url(`APP/HICLIN/${dll}.DLL`))
        .then(hc001x._llenarTabla)
        .catch((err) => {
          console.log(err);
          loader("hide");
          hc001x._validarPaciente();
        });
    },
    _llenarTabla(data) {
      if (this.selected.id == 0) {
        let tabla = data.datos.filter(e => e.id.trim() != "")

        tabla.forEach((a, b) => {
          let llave = a.id + a.folio.split("-").join("");
          let item = {
            llave: llave,
            id: a.id,
            nombre: a.descrip_paci,
            folio: a.folio,
            fecha: a.fecha,
            hora: a.hora,
            unserv: a.nom_serv,
            motivo: a.motivo,
            medico: a.medico,
            estado: a.descrip_estado,
          };
          this.historias.push(item);
        });
      } else {
        let tabla = JSON.parse(JSON.stringify(data.evoluciones));
        tabla.forEach((a) => {
          if (a.llave) {
            let item = a;
            item.llave_evo = a.llave + a.fecha + a.hora + a.oper_elab;
            this.evoluciones.push(item);
          }
        });
      }

      loader("hide");
      this._validarPaciente();
    },
    _ventanaPacientes() {
      let hc001x = this;
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
          hc001x.id_paciente = data.COD;
          hc001x.$refs.cod_paci.focus();
        },
        cancel: (f) => {
          hc001x.$refs.cod_paci.focus();
        },
      };

      F8LITE(parametros);
    },
    _deleteItem(element) {
      let item = element.srcElement.value,
        text =
          this.selected.id == 0
            ? "Eliminar historia ?"
            : "Eliminar evolucion ?";

      if (element.srcElement.checked) {
        CON851P(
          text,
          () => {
            element.srcElement.checked = false;
            this.$refs.cod_paci.focus();
          },
          () => {
            element.srcElement.checked = false;
            this._eliminarRegistro(item);
          }
        );
      } else element.srcElement.checked = false;
    },
    _eliminarRegistro(id) {
      let hc001x = this,
        flag = hc001x.selected.id,
        datosh = datosEnvio(),
        dll = "",
        text = "";

      if (flag == 0) {
        datosh = datosh + id + "|";
        dll = "HC001X";
        text = "Historia eliminada correctamente";
      } else {
        let item = this.evoluciones.find((e) => e.llave_evo == id);

        datosh =
          datosh +
          item.llave +
          "|" +
          item.fecha +
          "|" +
          item.hora +
          "|" +
          item.oper_elab +
          "|" +
          item.id_ano +
          "|";
        dll = "HC002XE";
        text = "Evolucion eliminada correctamente";
      }
      console.log(datosh);
      loader("show");
      postData({ datosh }, get_url(`APP/HICLIN/${dll}.DLL`))
        .then((data) => {
          plantillaToast("", text, "Exito!", "success");
          hc001x.historias = [];
          hc001x.evoluciones = [];
          hc001x.$refs.cod_paci.focus();
          loader("hide");
        })
        .catch((err) => {
          loader("hide");
          console.log(err);
          hc001x.historias = [];
          hc001x.evoluciones = [];
          hc001x.$refs.cod_paci.focus();
        });
    },
    _salir_hc001x() {
      window.location.reload();
    },
  },
});
