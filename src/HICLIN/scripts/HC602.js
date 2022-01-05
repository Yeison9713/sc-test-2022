"use strict";
/**
 * @developer  Pablo.O "pabloolguin@prosoft.com.co"
 * @author     SC-PROSOFT
 * @descrip    Release Electron - HC602 RM Version.
 * @descrip2   -- Pedidos Farmacia.
 * @date       28/12/2020. CREACION
 */

new Vue({
  el: "#HC602",
  data: {
    info_historia: null,
    fecha_act: moment().format("YYYYMMDD"),
    bandera: true,
    form: {
      cod_prof: null,
      descrip_prof: null,
      ano: null,
      mes: null,
      dia: null,
      hora: null,
      minutos: null,
      numero_ctl: null,
      solicitante: null,
      solicitante_desc: null,
    },
    actual: {
      item: null,
      grupo: null,
      codigo: null,
      descripcion: null,
      cantidad: null,
      indicaciones: null,
      modificar: false,
    },
    listado_medicamentos: [],
    tabla_medicamentos: [],
  },
  async created() {
    nombreOpcion("6-2 - Pedidos Farmacia");
    this.init();
    this.montar_datos();
    await this.get_datos();

    const operador = localStorage.Usuario;
    if (operador === "ADMI" || operador === "GEBC") this.validar_mes();
    else this.buscar_unidad_servicio();
  },
  methods: {
    init() {
      _inputControl("disabled");
      _inputControl("reset");
    },
    async montar_datos() {
      this.form.cod_prof = $_REG_PROF.IDENTIFICACION.trim();
      this.form.solicitante = $_REG_PROF.IDENTIFICACION.trim();
      this.form.descrip_prof = await this.consultar_tercero($_REG_PROF.IDENTIFICACION);
      this.form.descrip_prof = this.form.descrip_prof.trim();
      this.form.solicitante_desc = $_REG_PROF.NOMBRE.trim();

      this.form.ano = parseInt(moment().format("YYYY"));
      this.form.mes = parseInt(moment().format("MM"));
      this.form.dia = parseInt(moment().format("DD"));
      this.form.hora = moment().format("HH");
      this.form.minutos = moment().format("mm");
    },
    validar_mes() {
      const $this = this;
      validarInputs(
        {
          form: "#mes_HC602",
          orden: "1",
        },
        _regresar_menuhis,
        () => {
          let mes = $this.form.mes || 0;
          if (mes < 1 || mes > 12) $this.validar_mes();
          else $this.validar_dia();
        }
      );
    },
    validar_dia() {
      const $this = this;
      validarInputs(
        {
          form: "#dia_HC602",
          orden: "1",
        },
        $this.validar_mes,
        () => {
          let dia = $this.form.dia || 0;
          if (dia < 1 || dia > 31) $this.validar_dia();
          else $this.validar_hora();
        }
      );
    },
    validar_hora() {
      const $this = this;
      validarInputs(
        {
          form: "#hora_HC602",
          orden: "1",
        },
        $this.validar_dia,
        () => {
          let hora = $this.form.hora || 0;
          if (hora > 24) $this.validar_hora();
          else $this.validar_minutos();
        }
      );
    },
    validar_minutos() {
      const $this = this;
      validarInputs(
        {
          form: "#minutos_HC602",
          orden: "1",
        },
        $this.validar_hora,
        () => {
          let hora = $this.form.hora || 0;
          if (hora > 59) $this.validar_minutos();
          else $this.buscar_unidad_servicio();
        }
      );
    },
    buscar_unidad_servicio() {
      ////
      // $_REG_HC.unser_hc = '02'
      ////
      const _this = this;
      const historia = $_REG_HC;
      let nro_fact_hc = _this.info_historia.cierre.nro_fact;

      // console.log('Historia', historia)
      if (parseInt(historia.unser_hc) === 0)
        historia.serv_hc = historia.unser_hc;

      if (
        parseInt(historia.estado_hc) == 1 ||
        parseInt(historia.unser_hc < 3) ||
        ((historia.serv_hc != "01" || parseInt(historia.unser_hc) != "01") &&
          historia.estado_hc != "2" &&
          parseInt(_this.fecha_act) <= parseInt(historia.fecha_egreso_hc))
      ) {
        _this.actual.item = 1;
        _this.validar_item();
      } else {
        // if ((parseInt(historia.unser_hc) <= 2 || parseInt(historia.unser_hc) >= 50) && parseInt(nro_fact_hc)) {
        //    // PENDIENTE REVISAR CUANDO ACACIA
        //   CON851('9Y', '9Y', null, 'error', 'error');
        //   _regresar_menuhis();
        // }
        // else {
        CON851("1Q", "1Q", null, "error", "error");
        _regresar_menuhis();
        // }
      }
    },
    validar_item() {
      const $this = this;
      validarInputs(
        {
          form: "#validar_item",
          orden: "1",
          event_f3: $this.validar_guardado,
          event_f5: () => {
            CON851P("03", $this.validar_item, () => {
              setTimeout(() => {
                _regresar_menuhis();
              }, 300);
            });
          },
        },
        () => {
          CON851P("03", $this.validar_item, () => {
            setTimeout(() => {
              _regresar_menuhis();
            }, 300);
          });
        },
        () => {
          let item = $this.actual.item || 0;
          let ultimo = $this.tabla_medicamentos.length + 1;

          if (!item || item < 1 || item > ultimo || item > 25) {
            $this.actual.item = ultimo;
            $this.actual.grupo = "MQ";
            $this.validar_item();
          } else {
            let busqueda = $this.tabla_medicamentos.find(
              (el) => el.item === parseInt(item)
            );
            if (busqueda) {
              let copia = JSON.parse(JSON.stringify(busqueda));
              $this.actual = {
                item: copia.item,
                grupo: "MQ",
                codigo: copia.codigo,
                descripcion: copia.descripcion,
                cantidad: copia.cantidad,
                indicaciones: copia.indicaciones,
                modificar: true,
              };

              $this.validar_codigo();
            } else $this.validar_codigo();
            $this.actual.grupo = "MQ";
          }
        }
      );
    },
    validar_grupo() {
      const $this = this;
      validarInputs(
        {
          form: "#validar_grupo",
          orden: "1",
        },
        () => {
          this.reset_actual();
          this.validar_item();
        },
        () => {
          let grupo = $this.actual.grupo;
          console.log("$this.actual.grupo", $this.actual.grupo);

          if (grupo.toUpperCase() !== "MQ") {
            if (
              $_REG_PROF.ATIENDE_PROF.trim() != 5 &&
              $_USUA_GLOBAL[0].NIT != "892000401"
            ) {
              CON851("78", "78", null, "error", "error");
              this.validar_grupo();
            } else {
              this.validar_codigo();
            }
          } else {
            this.validar_codigo();
          }
        }
      );
    },
    validar_codigo() {
      const $this = this;
      validarInputs(
        {
          form: "#validar_codigo",
          orden: "1",
          event_f3: $this.validar_guardado,
          event_f5: () => {
            CON851P("03", $this.validar_codigo, () => {
              setTimeout(() => {
                _regresar_menuhis();
              }, 300);
            });
          },
        },
        () => {
          this.reset_actual();
          this.validar_item();
        },
        () => {
          let codigo = $this.actual.codigo || "";

          let consulta = $this.listado_medicamentos.find(
            (el) => el.COD.trim() == codigo.trim()
          );

          let repetido = $this.tabla_medicamentos.find(
            (el) => el.codigo == codigo
          );

          console.log(consulta);
          console.log(repetido);

          if (!consulta) {
            CON851("01", "01", null, "error", "error");
            $this.validar_codigo();
          } else if (!$this.actual.modificar && repetido) {
            CON851("05", "05", null, "error", "error");
            $this.validar_codigo();
          } else {
            $this.actual.codigo = consulta.COD;
            $this.actual.descripcion = consulta.DESCRIP;
            if (!$this.actual.modificar) $this.actual.cantidad = 1;
            $this.validar_cantidad();
          }
        }
      );
    },
    validar_guardado() {
      var $this = this;
      if ($this.tabla_medicamentos.length < 1) {
        CON851P("03", $this.validar_item, () => {
          setTimeout(() => {
            _regresar_menuhis();
          }, 300);
        });
      } else {
        CON851P("01", $this.validar_item, () => {
          $this.guardar_pedidoFarmacia();
          // $this.validar_item();
        });
      }
    },
    validar_cantidad() {
      const $this = this;
      validarInputs(
        {
          form: "#validar_cantidad",
          orden: "1",
        },
        $this.validar_codigo,
        () => {
          let obj = { ...$this.actual };
          if ($this.actual.modificar) {
            let index = $this.tabla_medicamentos.findIndex(
              (el) => el.item == $this.actual.item
            );

            $this.tabla_medicamentos[index] = obj;
          } else {
            $this.tabla_medicamentos.push(obj);
          }

          $this.reset_actual();
          $this.validar_item();
        }
      );
    },
    guardar_pedidoFarmacia() {
      const $this = this;
      let ano = this.form.ano.toString().padStart(4, "0");
      let mes = this.form.mes.toString().padStart(2, "0");
      let dia = this.form.dia.toString().padStart(2, "0");

      let hora = this.form.hora.toString().padStart(2, "0");
      let minutos = this.form.minutos.toString().padStart(2, "0");

      var datos_envio = {
        datosh: datosEnvio() + localStorage.Usuario + "|",
        llave_hc: $_REG_HC.llave_hc,
        fecha: ano + mes + dia,
        hora: hora + minutos,
        medico: this.info_historia.med,
        nro_ped: this.form.numero_ctl,
      };

      const datos_tabla = this.tabla_medicamentos;
      datos_tabla.forEach((el, idx) => {
        let index = (idx + 1).toString().padStart(2, "0");
        let label = `LIN-${index}`;
        datos_envio[label] =
          el.grupo +
          "|" +
          el.codigo +
          "|" +
          el.cantidad +
          "|" +
          el.indicaciones +
          "|";
      });

      console.log("Guardado", datos_envio);
      loader("show");
      postData(datos_envio, get_url("APP/HICLIN/HC602-1.DLL"))
        .then((data) => {
          console.log("Res guardado", data);
          $this.grabar_consecutivo(data);
        })
        .catch((err) => {
          console.error("Ha ocurrido un error:", err);
          loader("hide");
          CON851(
            "99",
            "Ha ocurrido un error durante el guardado.",
            null,
            "error",
            "error"
          );
          $this.validar_item();
        });
    },
    grabar_consecutivo(data) {
      const $this = this;
      postData(
        { datosh: datosEnvio() + data + "|" },
        get_url("APP/CONTAB/CON007X.DLL")
      )
        .then((data) => {
          loader("hide");
          console.log("Res consecutivo", data);
          $this.form.numero_ctl = data.split("|")[1].substr(3);
          CON851P(
            "00",
            () => {
              $this.reset();
              _regresar_menuhis();
            },
            $this.imprimir
          );
        })
        .catch((err) => {
          loader("hide");
          console.error("Ha ocurrido un error:", err);
          CON851(
            "99",
            "Ha ocurrido un error durante el guardado.",
            null,
            "error",
            "error"
          );
          $this.validar_item();
        });
    },
    imprimir() {
      _impresion2({
        tipo: "pdf",
        archivo: `${localStorage.Usuario + moment().format("-YYMMDD-HHmmssS")
          }.pdf`,
        content: this.format_impresion(),
      }).then((data) => {
        this.reset();
        _regresar_menuhis();
      });
    },
    consultar_tercero(oper) {
      let retorno = false;
      let datos_envio = { datosh: datosEnvio() + oper + '|8' };
      return new Promise(async (resolve, reject) => {
        await postData(datos_envio, get_url("APP/CONTAB/CON802_01.DLL"))
          .then(data => {
            data['TERCER'][0] != {}
              ? retorno = data['TERCER'][0]['DESCRIP_TER']
              : retorno = {};
          }).catch((e) => { retorno = { 'Error': 'No se ha encontrado el tercero' + oper } })
        resolve(retorno);
        reject(retorno);
      });
    },
    format_impresion() {
      let $this = this;

      let ano = this.form.ano.toString().padStart(4, "0");
      let mes = this.form.mes.toString().padStart(2, "0");
      let dia = this.form.dia.toString().padStart(2, "0");

      let format_fecha = moment(ano + mes + dia, "YYYYMMDD");
      let fecha = _editarFecha(format_fecha.format("YYYYMMDD"));

      let nit_paciente = new Intl.NumberFormat("ja-JP").format($_REG_PACI.COD) || $_REG_PACI.COD;
      let nro_fact_hc = this.info_historia.cierre.nro_fact;

      let detalle = this.tabla_medicamentos;
      let detalle_print = [];
      detalle_print.push([
        { text: "GRUPO", style: "center8BoldT" },
        { text: "CODIGO", style: "center8BoldT" },
        { text: "DESCRIPCION", style: "center8BoldT" },
        { text: "CANTIDAD", style: "center8BoldT" },
        { text: "INDICACIONES", style: "center8BoldT" },
      ]);

      detalle.forEach((el) => {
        detalle_print.push([
          { text: el.grupo, style: "left8" },
          { text: `${el.grupo}${el.codigo}`, style: "left8" },
          { text: el.descripcion, style: "left8" },
          { text: el.cantidad, style: "center8" },
          { text: el.indicaciones, style: "left8" },
        ]);
      });

      let minutos = this.form.minutos.toString().padStart(2, "0");
      let hora = this.form.hora.toString().padStart(2, "0");

      const pag_w = '1';
      const consec_barra_w = `1${this.form.numero_ctl}`;

      let barras = { text: consec_barra_w, options: { width: 1, height: 40, fontSize: 10 } };

      var aux = null;
      switch ($_REG_PROF.ATIENDE_PROF.trim()) {
        case "1":
          aux = "MEDICO ESPECIALISTA      ";
          break;
        case "2":
          aux = "MEDICO GENERAL           ";
          break;
        case "3":
          aux = "ENFERMERO(A) JEFE        ";
          break;
        case "4":
          aux = "AUXILIAR ENFERMERIA      ";
          break;
        case "5":
          aux = "TERAPEUTAS Y OTROS       ";
          break;
        case "6":
          aux = "ENFERMERA JEFE P Y P     ";
          break;
        case "7":
          aux = "PSICOLOGIA               ";
          break;
        case "8":
          aux = "NUTRICIONISTA            ";
          break;
        case "9":
          aux = "NO APLICA                ";
          break;
        case "A":
          aux = "ODONTOLOGO               ";
          break;
        case "B":
          aux = "AUDITOR MEDICO           ";
          break;
        case "H":
          aux = "HIGIENE ORAL             ";
          break;
        case "I":
          aux = "INSTRUMENTADOR(A)        ";
          break;
        case "O":
          aux = "OPTOMETRA                ";
          break;
        case "T":
          aux = "TRABAJO SOCIAL           ";
          break;
        default:
          aux = "  ";
          break;
      }

      return {
        pageMargins: [35, 147, 35, 60],
        images: { logo: rutaLogos_impHc($_USUA_GLOBAL[0].NIT) },
        codigo_barras: { barra: barras },
        header: function (currentPage, pageCount, pageSize) {
          var width_page = pageSize.width - 70;

          return {
            margin: [35, 30, 35, 0],
            stack: [
              {
                columns: [
                  {
                    margin: [7, 0, 0, 0],
                    stack: [
                      {
                        image: "logo",
                        width: 75,
                        height: 45,
                      },
                    ],
                    width: "20%",
                  },
                  {
                    style: "center10Bold",
                    text: [
                      { text: $_USUA_GLOBAL[0].NOMBRE.trim() },
                      { text: "  " + $_USUA_GLOBAL[0].NIT + "\n" },
                      { text: "PEDIDOS FARMACIA\n" },
                    ],
                    width: "50%",
                  },
                  {
                    style: "right10Bold",
                    text: [
                      {
                        text:
                          "" +
                          "PAG: " +
                          currentPage +
                          " de " +
                          pageCount +
                          "\n\n",
                      },
                      {
                        text: "\nNro. Pedido. " + $this.form.numero_ctl,
                        fontSize: "8",
                      },
                    ],
                    width: "15%",
                  },
                ],
              },
              {
                marginLeft: 7,
                marginTop: 10,
                stack: [
                  {
                    columns: [
                      { text: "FECHA:", style: "left8Bold", width: "15%" },
                      {
                        text: `${fecha} - ${moment().format("HH:mm")}`,
                        style: "left8",
                        width: "43%",
                      },
                      {
                        text: "IDENTIFICACIÓN:",
                        style: "left8Bold",
                        width: "15%",
                      },
                      {
                        text: $_REG_PACI["TIPO-ID"] + " " + nit_paciente,
                        style: "left8",
                        width: "27%",
                      },
                    ],
                  },
                  {
                    marginTop: 2,
                    columns: [
                      { text: "PACIENTE:", style: "left8Bold", width: "15%" },
                      {
                        text: $_REG_PACI.DESCRIP.replace(/\s+/g, " "),
                        style: "left8",
                        width: "43%",
                      },
                      { text: "EDAD:", style: "left8Bold", width: "6%" },
                      {
                        text:
                          $_REG_HC.edad_hc.unid_edad +
                          $_REG_HC.edad_hc.vlr_edad,
                        style: "left8",
                        width: "9%",
                      },
                      { text: "SEXO:", style: "left8Bold", width: "7%" },
                      {
                        text: $_REG_PACI.SEXO == "F" ? "Femenino" : "Masculino",
                        style: "left8",
                        width: "8%",
                      },
                    ],
                  },
                  {
                    marginTop: 2,
                    columns: [
                      { text: "CIUDAD:", style: "left8Bold", width: "15%" },
                      {
                        text: $_REG_PACI["DESCRIP-CIUDAD"].trim(),
                        style: "left8",
                        width: "43%",
                      },
                      { text: "TELEFONO:", style: "left8Bold", width: "15%" },
                      {
                        text: $_REG_PACI.TELEFONO.trim(),
                        style: "left8",
                        width: "27%",
                      },
                    ],
                  },
                  {
                    marginTop: 2,
                    columns: [
                      { text: "ENTIDAD:", style: "left8Bold", width: "15%" },
                      {
                        text: $_REG_PACI["DESCRIP-NIT-FACT"].trim(),
                        style: "left8",
                        width: "43%",
                      },
                      { text: "FACTURA:", style: "left8Bold", width: "15%" },
                      { text: nro_fact_hc, style: "left8", width: "27%" },
                    ],
                  },
                  {
                    marginTop: 2,
                    columns: [
                      {
                        text: "ACOMPAÑANTE:",
                        style: "left8Bold",
                        width: "15%",
                      },
                      {
                        text: $_REG_PACI.ACOMPA.trim(),
                        style: "left8",
                        width: "43%",
                      },
                      { text: "FOLIO:", style: "left8Bold", width: "15%" },
                      {
                        text: $_REG_HC.nro_folio_hc.trim(),
                        style: "left8",
                        width: "27%",
                      },
                    ],
                  },
                ],
              },
              {
                canvas: [
                  {
                    type: "rect",
                    x: 0,
                    y: -57,
                    w: width_page,
                    h: 59,
                    r: 0,
                    lineWidth: 1,
                  },
                ],
              },
            ],
          };
        },
        content: [
          {
            columns: [
              {
                text: "Formulación de medicamentos".toUpperCase(),
                style: "left10Bold",
                width: "50%",
              },
            ],
          },
          {
            table: {
              widths: ["auto", "auto", "*", "auto", "auto"],
              headerRows: 0,
              body: detalle_print,
            },
          },
          {
            margin: [0, 40, 0, 0],
            stack: [
              {
                canvas: [
                  {
                    type: "rect",
                    x: 0,
                    y: 0,
                    w: 520,
                    h: 0,
                    r: 0,
                    lineWidth: 1,
                    lineColor: "black",
                  },
                ],
              },
              {
                columns: [
                  {
                    margin: [0, 10, 0, 0],
                    style: "left8",
                    stack: [
                      this.form.descrip_prof,
                      "Especialidad: " + aux
                    ],
                  },
                  {
                    stack: this.llenarFirma(consec_barra_w) || []
                  }
                ]
              },

            ],

          },
        ],
        styles: estilosImpresion_impHc(),
      };
    },
    llenarFirma(barra) {
      var col = [{
        marginTop: 15,
        alignment: "right",
        stack: [{
          image: 'barra',
        }],
      },
      {
        marginTop: 5,
        marginRight: 5,
        alignment: "right",
        text: [
          { text: 'NRO:  ', style: 'right8' },
          { text: barra, style: 'left8Bold' },
        ],
      },
      ]
      return col
    },
    reset_actual() {
      this.actual = {
        item: this.tabla_medicamentos.length + 1,
        grupo: "MQ",
        codigo: null,
        descripcion: null,
        cantidad: null,
        indicaciones: null,
        modificar: false,
      };
    },
    reset() {
      this.tabla_medicamentos = [];
      this.listado_medicamentos = [];
      this.actual = {
        item: null,
        grupo: null,
        codigo: null,
        descripcion: null,
        cantidad: null,
        indicaciones: null,
        modificar: false,
      };
      this.form = {
        cod_prof: null,
        descrip_prof: null,
        ano: null,
        mes: null,
        dia: null,
        hora: null,
        minutos: null,
        numero_ctl: null,
      };
      this.info_historia = null;
    },
    _ventanaMedicamentos() {
      var $this = this;
      _ventanaDatos({
        titulo: "VENTANA DE CONSULTA DE FARMACOS",
        columnas: ["GRP", "COD", "DESCRIP", "TIPO_CUM"],
        data: this.listado_medicamentos,
        callback_esc: function () {
          document.getElementById("cod_medicamento").focus();
        },
        callback: function (data) {
          $this.actual.codigo = data.COD.trim();
          _enterInput("#cod_medicamento");
        },
      });
    },
    async get_datos() {
      const $this = this;
      loader("show");

      await postData(
        { datosh: `${datosEnvio()}HD|` },
        get_url("APP/CONTAB/CON007.DLL")
      )
        .then((data) => {
          let pedido = data.split("|")[1];
          $this.form.numero_ctl = parseInt(pedido).toString().padStart(6, "0");
        })
        .catch((err) => {
          console.log("Error", err);
          loader("hide");
          _regresar_menuhis();
        });

      await postData(
        {
          datosh:
            datosEnvio() +
            $_REG_HC.llave_hc +
            "|" +
            localStorage.Usuario +
            "|" +
            "1",
        },
        get_url("app/HICLIN/HC_PRC.DLL")
      )
        .then((data) => {
          $this.info_historia = data.HCPAC;
        })
        .catch((err) => {
          console.log(err, "error");
          loader("hide");
          _regresar_menuhis();
        });

      await postData({ datosh: datosEnvio() }, get_url("app/SALUD/SER809.DLL"))
        .then((data) => {
          let filter = data.FARMACOS.filter(
            (x) => x.COD.substring(0, 2) == "MQ"
          );

          filter.forEach((e) => {
            e.GRP = "MQ";
            e.COD = e.COD.substr(2);
          });

          $this.listado_medicamentos = JSON.parse(JSON.stringify(filter));

          loader("hide");
        })
        .catch((error) => {
          console.log(err, "error");
          loader("hide");
          _regresar_menuhis();
        });
    },
  },
});
