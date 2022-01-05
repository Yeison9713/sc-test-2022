new Vue({
  el: "#PUB605",
  components: {
    loader_modal: require("../../frameworks/scripts/loader-modal/index.vue"),
  },
  data: {
    estado_loader: false,
    progreso: {},
    label_loader: null,
    loader: 1,

    ano_ant: "",
    mes_ant: "",
    ano_sig: "",
    mes_sig: "",
    solo_dif: "",
    fecha_act: moment().format("YYYYMMDD"),
  },
  created() {
    nombreOpcion("6-5 - Compara el saldo final de una factura con el saldo anterior del periodo siguiente");
    _inputControl("reset");
    _inputControl("disabled");
    this.datoFechaAnt();
  },
  methods: {
    datoFechaAnt() {
      if (!this.ano_ant.trim()) {
        this.ano_ant = this.fecha_act.slice(0, 4);
        this.mes_ant = this.fecha_act.slice(4, 6);
      }
      validarInputs(
        {
          form: "#fecha_ant",
        },
        _toggleNav,
        () => {
          this.ano_ant = this.ano_ant.padStart(4, "0");
          this.mes_ant = this.mes_ant.padStart(2, "0");
          this.anterior = `${this.ano_ant}${this.mes_ant}`;

          if (this.ano_ant > this.fecha_act.slice(0, 4) || this.ano_ant < 1900) {
            CON851("", "37", null, "error", "Error");
            this.datoFechaAnt();
          } else if (this.mes_ant < 1 || this.mes_ant > 12) {
            CON851("", "37", null, "error", "Error");
            this.datoFechaAnt();
          } else {
            this.ano_sig = this.ano_ant;
            this.mes_sig = this.mes_ant;

            setTimeout(() => {
              this.datoFechaSig();
            }, 200);
          }
        }
      );
    },

    datoFechaSig() {
      validarInputs(
        {
          form: "#fecha_sig",
        },
        this.datoFechaAnt,
        () => {
          this.ano_sig = this.ano_sig.padStart(4, "0");
          this.mes_sig = this.mes_sig.padStart(2, "0");
          this.siguiente = `${this.ano_sig}${this.mes_sig}`;

          if (this.ano_sig > this.fecha_act.slice(0, 4) || this.ano_sig < 1900) {
            CON851("", "37", null, "error", "Error");
            this.datoFechaSig();
          } else if (this.mes_sig < 1 || this.mes_sig > 12) {
            CON851("", "37", null, "error", "Error");
            this.datoFechaSig();
          } else {
            setTimeout(() => {
              this.datoDiferencias();
            }, 200);
          }
        }
      );
    },

    datoDiferencias() {
      validarInputs(
        {
          form: "#solo_dif",
        },
        this.datoFechaSig,
        () => {
          this.solo_dif = this.solo_dif.toUpperCase();
          if (this.solo_dif != "S") this.solo_dif = "N";
          this.llamarDLL();
        }
      );
    },

    llamarDLL() {
      CON851P("00", this.datoDiferencias, () => {
        let datos_envio = {
          datosh: moduloDatosEnvio(),
          fecha_ant: this.anterior.toString(),
          fecha_sig: this.siguiente.toString(),
          solo_dif: this.solo_dif,
        };

        this.estado_loader = true;
        this.label_loader = `Procesando: ${this.anterior} - ${this.siguiente}`;
        this.progreso = { transferred: 0, speed: 0 };

        postData(datos_envio, get_url("app/SERVDOM/PUB605.DLL"), {
          onProgress: (progress) => {
            this.progreso = progress;
          },
        })
          .then((data) => {
            data.LISTADO.pop();
            data = data.LISTADO;
            if (data.ERROR) CON851("", data.ERROR, null, "warning", "");
            this.loader = false;
            this.label_loader = `GENERANDO IMPRESIÓN...`;
            this.progreso.completado = true;
            this.imprimir(data);
          })
          .catch((err) => {
            console.error(err);
            CON851("", "Error consultando datos", null, "error", "Error");
            this.loader = false;
            this.estado_loader = false;
            this.datoDiferencias();
          });
      });
    },

    imprimir(data) {
      let listado = data;

      let nombreEmpresa = $_USUARIO_EMPRESA.NOMBRE.trim();
      let nit = $_USUARIO_EMPRESA.NIT.toString();
      let nit_edit = !isNaN(nit) ? new Intl.NumberFormat("ja-JP").format(nit) : nit;
      let fecha = moment().format("MMM DD/YY - HH:mm");

      listado.forEach((el) => {
        if (el.saldo_ori1 == 0) el.saldo_ori1 = 0;
        if (el.saldo_des1 == 0) el.saldo_des1 = 0;
        if (el.saldo_ori2 == 0) el.saldo_ori2 = 0;
        if (el.saldo_des2 == 0) el.saldo_des2 = 0;
        if (el.saldo_ori3 == 0) el.saldo_ori3 = 0;
        if (el.saldo_des3 == 0) el.saldo_des3 = 0;
        if (el.saldo_ori4 == 0) el.saldo_ori4 = 0;
        if (el.saldo_des4 == 0) el.saldo_des4 = 0;
        if (el.saldo_ori5 == 0) el.saldo_ori5 = 0;
        if (el.saldo_des5 == 0) el.saldo_des5 = 0;
        if (el.saldo_ori6 == 0) el.saldo_ori6 = 0;
        if (el.saldo_des6 == 0) el.saldo_des6 = 0;
        if (el.saldo_orit == 0) el.saldo_orit = 0;
        if (el.saldo_dest == 0) el.saldo_dest = 0;
        if (el.dif == 0) el.dif = 0;
      });

      if (listado.length < 1) {
        CON851("", "08", null, "warning", "");
        this.estado_loader = false;
        this.datoDiferencias();
      } else {
        let header_format = [
          { text: `${nombreEmpresa}`, bold: true, size: 16 },
          `LISTADO DE INCONSISTENCIAS DE SALDO DE UN PERIODO A OTRO   PERIODO ANTERIOR: ${this.anterior} - PERIODO SIGUIENTE: ${this.siguiente}    NIT: ${nit_edit}`,
          `Fecha de reporte: ${fecha}`,
        ];

        _impresion2({
          tipo: "excel",
          header: header_format,
          logo: `${parseInt(nit)}.png`,
          tabla: {
            columnas: this.columnas_listado(),
            data: listado,
          },
          archivo: localStorage.Usuario + moment().format("-YYMMDD-HHmmss"),
          scale: "75",
          orientation: "landscape",
        })
          .then(() => {
            CON851("", "Generando informe", null, "success", "");
            loader("hide");
            _toggleNav();
            this.estado_loader = false;
          })
          .catch((error) => {
            console.error(error);
            CON851("", "Error generando impresion", null, "error", "Error");
            loader("hide");
            this.datoDiferencias();
            this.estado_loader = false;
          });
      }
    },

    columnas_listado() {
      let columns = [
        {
          title: "Nombre",
          value: "nombre",
        },
        {
          title: "Fact Orig",
          value: "fact_ori",
        },
        {
          title: "Fact Dest",
          value: "fact_des",
        },
        {
          title: "Saldo Final Serv 1",
          value: "saldo_ori1",
          format: "money",
        },
        {
          title: "Saldo Anter Serv 1",
          value: "saldo_des1",
          format: "money",
        },
        {
          title: "Saldo Final Serv 2",
          value: "saldo_ori2",
          format: "money",
        },
        {
          title: "Saldo Anter Serv 2",
          value: "saldo_des2",
          format: "money",
        },
        {
          title: "Saldo Final Serv 3",
          value: "saldo_ori3",
          format: "money",
        },
        {
          title: "Saldo Anter Serv 3",
          value: "saldo_des3",
          format: "money",
        },
        {
          title: "Saldo Final Serv 4",
          value: "saldo_ori4",
          format: "money",
        },
        {
          title: "Saldo Anter Serv 4",
          value: "saldo_des4",
          format: "money",
        },
        {
          title: "Saldo Final Serv 5",
          value: "saldo_ori5",
          format: "money",
        },
        {
          title: "Saldo Anter Serv 5",
          value: "saldo_des5",
          format: "money",
        },
        {
          title: "Saldo Final Serv 6",
          value: "saldo_ori6",
          format: "money",
        },
        {
          title: "Saldo Anter Serv 6",
          value: "saldo_des6",
          format: "money",
        },
        {
          title: "Saldo Final Total",
          value: "saldo_orit",
          format: "money",
        },
        {
          title: "Saldo Anter Total",
          value: "saldo_dest",
          format: "money",
        },
        {
          title: "Diferencia Total",
          value: "dif",
          format: "money",
        },
      ];

      return columns;
    },
  },
});
