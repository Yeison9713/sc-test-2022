var app = new Vue({
  el: "#VAL_0B",
  data: {
    mostrar_CTREF802: false,
    tabla_CTREF802: [],
    descrip_paci: $_REG_PACI.DESCRIP,
  },
  created() {
    _toggleNav();
    this.validarMenuRefer();
  },
  methods: {
    async validarMenuRefer() {
      switch (localStorage.idOpciondata) {
        case "0B1":
          await this.CTREF803();
          break;
        case "0B2":
          await this.CTREF801(1);
          break;
        case "0B3":
          this.llamarOpcion_refer("HCB04");
          break;
        case "0B4":
          this.llamarOpcion_refer("HCBI04");
          break;
        case "0B5":
          await this.CTREF801(4);
          break;
        case "0B6":
          await this.CTREF802();
          break;
      }
    },

    llamarOpcion_refer(opcion) {
      _validarVentanaMain({
        Id: "071",
        Descripcion: "Imprime historia clinica",
        "Opc-segu": "ISH42",
        Tipo: "HTML",
        Href: `../../HICLIN/paginas/${opcion}.html`,
      });
    },

    async CTREF801(paso_w) {
      postData({ datosh: datosEnvio() + $_REG_HC.llave_hc + "|" }, get_url("app/HICLIN/CTREF801.DLL"))
        .then(async (data) => {
          data.REG_REF.pop();
          for (let i in data.REG_REF) {
            data.REG_REF[i]["SUC"] = data.REG_REF[i]["folio_suc_ref"];
            data.REG_REF[i]["FOLIO"] = data.REG_REF[i]["folio_nro_ref"];
            data.REG_REF[i]["FECHA"] = _editarFecha(data.REG_REF[i]["fecha_ref"]);
            data.REG_REF[i]["HORA"] = _editHora(data.REG_REF[i]["hora_ref"]);
            data.REG_REF[i]["MED_REFIERE"] = data.REG_REF[i]["descrip_med_ref"];
            data.REG_REF[i]["ELAB"] = data.REG_REF[i]["oper_elab_ref"];
          }
          await this.ordenar(data.REG_REF);

          _ventanaDatos({
            titulo: $_REG_PACI.DESCRIP,
            columnas: ["SUC", "FOLIO", "FECHA", "HORA", "MED_REFIERE", "ELAB"],
            data: data.REG_REF,
            callback_esc: () => {
              _regresar_menuhis();
            },
            callback: (data) => {
              loader("show");
              if (data.folio_nro_ref > 0) {
                const { imprimir_HCBI01 } = require("../pdf/hiclin/HCBI01.formato.js");

                imprimir_HCBI01({
                  llave_ref_w: data.llave_ref,
                  fecha_ini_w: 0,
                  fecha_fin_w: 0,
                  operador_w: 0,
                  paciente_w: 0,
                  paso_w: paso_w,
                  paci: $_REG_PACI,
                  callback_error: () => {
                    _regresar_menuhis();
                  },
                  callback: () => {
                    _regresar_menuhis();
                  },
                });
              }
              loader("hide");
            },
          });
        })
        .catch((error) => {
          console.error(error);
          CON851("", "Error consultando datos", null, "error", "Error");
          _regresar_menuhis();
        });
    },

    async CTREF802() {
      postData(
        { datosh: datosEnvio() + $_REG_PACI.COD + "|" + localStorage.Usuario + "|" },
        get_url("app/HICLIN/CTREF802.DLL")
      )
        .then(async (data) => {
          data.REG_REF.pop();
          this.tabla_CTREF802 = data.REG_REF;
          for (let i in this.tabla_CTREF802) {
            this.tabla_CTREF802[i].fecha_edit = _editFecha2(this.tabla_CTREF802[i].fecha_ref);
            this.tabla_CTREF802[i].hora_edit = _editHora(this.tabla_CTREF802[i].hora_ref);

            switch (this.tabla_CTREF802[i].color) {
              case "1":
                this.tabla_CTREF802[i].string_color = "bg-red";
                break;
              case "2":
                this.tabla_CTREF802[i].string_color = "bg-green";
                break;
              case "3":
                this.tabla_CTREF802[i].string_color = "bg-yellow";
                break;
              case "4":
                this.tabla_CTREF802[i].string_color = "bg-brown";
                break;
              case "5":
                this.tabla_CTREF802[i].string_color = "bg-blue";
                break;
              default:
                this.tabla_CTREF802[i].string_color = "";
                break;
            }

            this.tabla_CTREF802[i].btn = {};
            if (
              !this.tabla_CTREF802[i].aceptada_ref.trim() &&
              this.tabla_CTREF802[i].fecha_ref > 0 &&
              this.tabla_CTREF802[i].fecha_ref < 99999999
            ) {
              this.tabla_CTREF802[i].btn.cancelar = true;
            }

            if (this.tabla_CTREF802[i].aceptada_ref == "C" && this.tabla_CTREF802[i].fecha_ref.trim()) {
              this.tabla_CTREF802[i].btn.activar = true;
            }

            if (this.tabla_CTREF802[i].fecha_ref > 0 && this.tabla_CTREF802[i].fecha_ref < 99999999) {
              this.tabla_CTREF802[i].btn.imprimir = true;
            }

            if (
              this.tabla_CTREF802[i].nueva_solicitud > 0 &&
              this.tabla_CTREF802[i].fecha_ref > 0 &&
              this.tabla_CTREF802[i].fecha_ref < 99999999
            ) {
              this.tabla_CTREF802[i].btn.nueva_solicitud = true;
            }
          }
          await this.ordenar(this.tabla_CTREF802);
          this.mostrar_CTREF802 = true;

          let busqueda = this.tabla_CTREF802.find((e) => e.hora_ref == "9999");
          let bloqEnter = true;

          if (busqueda) bloqEnter = false;

          this.focoTabla_CTREF802(0, bloqEnter);
        })
        .catch((error) => {
          console.error(error);
          CON851("", "Error consultando datos", null, "error", "Error");
        });
    },

    focoTabla_CTREF802(order, bloqEnter) {
      validarTabla(
        {
          tabla: "#tabla_CTREF802",
          orden: order,
          Esc: _regresar_menuhis,
          bloqEnter: bloqEnter,
          event_A: (data) => {
            let llave = `${data.cells[1].textContent}${data.cells[2].textContent}${data.cells[3].textContent
              .split("/")
              .join("")}${data.cells[4].textContent.split(":").join("")}${data.cells[6].textContent}`;
            let busqueda = this.tabla_CTREF802.find((e) => e.llave_ref.slice(15) == llave);
            if (busqueda) {
              this.event_A(busqueda);
            } else {
              $.validarTabla._fin();
              CON851("", "Error en datos", null, "Error", "error");
              this.CTREF802();
            }
          },
          event_C: (data) => {
            let llave = `${data.cells[1].textContent}${data.cells[2].textContent}${data.cells[3].textContent
              .split("/")
              .join("")}${data.cells[4].textContent.split(":").join("")}${data.cells[6].textContent}`;
            let busqueda = this.tabla_CTREF802.find((e) => e.llave_ref.slice(15) == llave);
            if (busqueda) {
              this.event_C(busqueda);
            } else {
              $.validarTabla._fin();
              CON851("", "Error en datos", null, "Error", "error");
              this.CTREF802();
            }
          },
          event_P: (data) => {
            let llave = `${data.cells[1].textContent}${data.cells[2].textContent}${data.cells[3].textContent
              .split("/")
              .join("")}${data.cells[4].textContent.split(":").join("")}${data.cells[6].textContent}`;
            console.log(llave, "llave");
            let busqueda = this.tabla_CTREF802.find((e) => e.llave_ref.slice(15) == llave);
            console.log(busqueda, "busq");
            if (busqueda) {
              this.event_P(busqueda);
            } else {
              $.validarTabla._fin();
              CON851("", "Error en datos", null, "Error", "error");
              this.CTREF802();
            }
          },
          event_N: (data) => {
            let llave = `${data.cells[1].textContent}${data.cells[2].textContent}${data.cells[3].textContent
              .split("/")
              .join("")}${data.cells[4].textContent.split(":").join("")}${data.cells[6].textContent}`;
            let busqueda = this.tabla_CTREF802.find((e) => e.llave_ref.slice(15) == llave);
            if (busqueda) {
              this.event_N(busqueda);
            } else {
              $.validarTabla._fin();
              CON851("", "Error en datos", null, "Error", "error");
              this.CTREF802();
            }
          },
        },
        (data) => {
          $.validarTabla._fin();
          let llave = `${data.cells[1].textContent}${data.cells[2].textContent}${data.cells[3].textContent
            .split("/")
            .join("")}${data.cells[4].textContent.split(":").join("")}${data.cells[6].textContent}`;
          let busqueda = this.tabla_CTREF802.find((e) => e.llave_ref.slice(15) == llave);
          if (busqueda) {
            if (data.cells[4].textContent == "99:99") {
              $_REG_HC.llave_ref_w = data.llave_ref;
              $_REG_HC.fecha_ref_w = 0;
              $_REG_HC.hora_ref_w = data.hora_ref;
              $_REG_HC.oper_elab_ref_w = data.oper_elab_ref;
              $_REG_HC.medico_w = $_REG_PROF.IDENTIFICACION;
              $_REG_HC.especia_remi_ref_w = data.especia_remt_ref;
              $_REG_HC.diag_prin_ref_w = data.diag_prin_ref;
              this.llamarOpcion_refer("HCB06");
            } else {
              CON851("", "Opción no valida", null, "warning", "");
              this.CTREF802();
            }
          } else {
            console.log(llave, busqueda);
          }
        },
        () => this.focoTabla_CTREF802(0),
        () => this.focoTabla_CTREF802(tabla_CTREF802.rows.length - 1)
      );
    },

    event_A: function (data) {
      $.validarTabla._fin();
      this.mostrar_CTREF802 = false;
      if (data.aceptada_ref == "C") {
        postData(
          { datosh: datosEnvio() + data.llave_ref + "|" + localStorage.Usuario + "|" + "A|" },
          get_url("app/HICLIN/CTREF802.DLL")
        )
          .then(() => {
            CON851("", "Activada correctamente", null, "success", "");
            this.CTREF802();
          })
          .catch((error) => {
            console.error(error);
            CON851("", "Error consultando datos", null, "error", "");
            this.CTREF802();
          });
      } else {
        CON851("", "Opción no valida", null, "warning", "");
        this.CTREF802();
      }
    },

    event_C: function (data) {
      $.validarTabla._fin();
      this.mostrar_CTREF802 = false;
      if (!data.aceptada_ref.trim() && data.folio_nro_ref > 0) {
        CON851P(
          "34",
          () => {
            this.CTREF802();
          },
          () => {
            postData(
              { datosh: datosEnvio() + data.llave_ref + "|" + localStorage.Usuario + "|" + "C|" },
              get_url("app/HICLIN/CTREF802.DLL")
            )
              .then(() => {
                CON851("", "Cancelada correctamente", null, "success", "");
                this.CTREF802();
              })
              .catch((error) => {
                console.error(error);
                CON851("", "Error consultando datos", null, "error", "");
                this.CTREF802();
              });
          }
        );
      } else {
        CON851("", "Opción no valida", null, "warning", "");
        this.CTREF802();
      }
    },

    event_P: async function (data) {
      $.validarTabla._fin();
      this.mostrar_CTREF802 = false;
      if (data.folio_nro_ref > 0 && data.folio_nro_ref < 999999) {
        loader("show");
        await _impresion2({
          tipo: "pdf",
          archivo: `${localStorage.Usuario + moment().format("-YYMMDD-HHmmssS")}.pdf`,
          content: await _imprimirReferencia(data.llave_ref),
        })
          .then(() => {
            CON851("", "Impresión generada!", null, "success", "");
            loader("hide");
            _regresar_menuhis();
          })
          .catch((err) => {
            console.error(err);
            CON851("", "Error en impresion", null, "error", "error");
            loader("hide");
            this.CTREF802();
          });
      } else {
        CON851("", "Opción no valida", null, "warning", "");
        this.CTREF802();
      }
    },

    event_N: function (data) {
      $.validarTabla._fin();
      this.mostrar_CTREF802 = false;
      if (data.aceptada_ref.trim()) {
        if (data.fecha_ref > 0 && data.aceptada_ref.trim()) {
          $_REG_HC.llave_ref_w = data.llave_ref;
          $_REG_HC.fecha_ref_w = data.fecha_ref;
          $_REG_HC.hora_ref_w = data.hora_ref;
          $_REG_HC.oper_elab_ref_w = data.oper_elab_ref;
          $_REG_HC.medico_w = $_REG_PROF.IDENTIFICACION;
          $_REG_HC.especia_remi_ref_w = data.especia_remt_ref;
          $_REG_HC.diag_prin_ref_w = data.diag_prin_ref;
          this.llamarOpcion_refer("HCB06");
        } else {
          CON851("", "Opción no valida", null, "warning", "");
          this.CTREF802();
        }
      } else {
        CON851("", "Opción no valida", null, "warning", "");
        this.CTREF802();
      }
    },

    async CTREF803() {
      postData({ datosh: datosEnvio() + $_REG_HC.llave_hc + "|" }, get_url("app/HICLIN/CTREF803.DLL"))
        .then(async (data) => {
          data.REG_REF.pop();
          for (let i in data.REG_REF) {
            data.REG_REF[i]["SUC"] = data.REG_REF[i]["folio_suc_ref"];
            data.REG_REF[i]["FOLIO"] = data.REG_REF[i]["folio_nro_ref"];
            data.REG_REF[i]["FECHA"] = _editarFecha(data.REG_REF[i]["fecha_ref"]);
            data.REG_REF[i]["HORA"] = _editHora(data.REG_REF[i]["hora_ref"]);
            data.REG_REF[i]["MED_REFIERE"] = data.REG_REF[i]["descrip_med_ref"];
            data.REG_REF[i]["ELAB"] = data.REG_REF[i]["oper_elab_ref"];
          }
          await this.ordenar(data.REG_REF);

          _ventanaDatos({
            titulo: $_REG_PACI.DESCRIP,
            columnas: ["SUC", "FOLIO", "FECHA", "HORA", "MED_REFIERE", "ELAB"],
            data: data.REG_REF,
            callback_esc: () => {
              _regresar_menuhis();
            },
            callback: (data) => {
              $_REG_HC.llave_ref_w = data.llave_ref;
              $_REG_HC.fecha_ref_w = data.fecha_ref;
              this.llamarOpcion_refer("HCB01");
            },
          });
        })
        .catch((error) => {
          console.error(error);
          CON851("", "Error consultando datos", null, "error", "Error");
          _regresar_menuhis();
        });
    },

    async ordenar(data) {
      await data.sort((a, b) => {
        if (parseInt(a.fecha_ref.concat(a.hora_ref)) < parseInt(b.fecha_ref.concat(b.hora_ref))) {
          return 1;
        }
        if (parseInt(a.fecha_ref.concat(a.hora_ref)) > parseInt(b.fecha_ref.concat(b.hora_ref))) {
          return -1;
        }
        return 0;
      });
    },
  },
  template: "",
});
