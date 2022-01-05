var $this = {};
("use strict");
/**
 * @developer  Pablo.O "pabloolguin@prosoft.com.co"
 * @author     SC-PROSOFT
 * @descrip    Release Electron - HC602 RM Version.
 * @descrip2   -- Reimpresion Pedidos Farmacia.
 * @date       03/01/2020. CREACION
 */

new Vue({
  el: "#HC7C7",
  data: {
    info_historia: null,
    fecha_act: moment().format("YYYYMMDD"),
    bandera: true,
    form: {
      unser: null,
      ano: null,
      mes: null,
      dia: null,
      hora: null,
      minutos: null,
      numero_ctl: null,
      folio: null,
    },
    profesional: [],
    listado_pedidos: [],
    listado_formulacion: [],
  },
  async created() {
    nombreOpcion("7-C-7 - Reimprimir Devoluciones farmacia");
    this.init();
    await this.get_datos();
    await $this.validar_nro_pedido();
  },
  methods: {
    init() {
      $this = this;
      _inputControl("disabled");
      _inputControl("reset");
    },
    validar_nro_pedido() {
      validarInputs(
        {
          form: "#nroPedido_HC7C7",
          orden: "1",
        },
        _regresar_menuhis,
        () => {
          $this.listado_formulacion = [];
          $this.get_data_pedido();
        }
      );
    },

    reset() {
      $this.form = {
        unser: null,
        folio: null,
        ano: null,
        mes: null,
        dia: null,
        hora: null,
        minutos: null,
      };
    },
    _ventanaPedidos() {
      _ventanaDatos({
        titulo: `VENTANA CONSULTA PEDIDOS POR PACIENTE   ${$_REG_PACI.COD}  ${$_REG_PACI.DESCRIP}`,
        columnas: [
          "LLAVE_PED",
          "FECHA_PED",
          "HORA_PED",
          "UNSER_PED",
          "OPER_PED",
        ],
        label: [
          "Pedido Nro",
          "Fecha Pedido",
          "Hora",
          "Unidad Servicio",
          "Operador",
        ],
        data: $this.listado_pedidos,
        callback_esc: function () {
          $this.$refs.nroPedido_HC7C7.focus();
        },
        callback: function (data) {
          $this.form.numero_ctl = data.LLAVE_PED.substring(1);
          _enterInput("#pedido");
        },
      });
    },
    /*---------------------- R U T I N A S ----------------------*/
    async get_data_pedido() {
      let tipo_ped = "2";
      const llave_ped = tipo_ped.concat($this.form.numero_ctl.padStart(6, "0"));

      const busqueda_pedido = $this.listado_pedidos.find(
        (x) => parseInt(x.LLAVE_PED) == parseInt(llave_ped)
      );

      if (busqueda_pedido) {
        $this.form.ano = moment(busqueda_pedido["FECHA_PED"]).format("YYYY");
        $this.form.mes = moment(busqueda_pedido["FECHA_PED"]).format("MM");
        $this.form.dia = moment(busqueda_pedido["FECHA_PED"]).format("DD");

        $this.form.hora = moment(busqueda_pedido["HORA_PED"]).format("HH");
        $this.form.minutos = moment(busqueda_pedido["HORA_PED"]).format("mm");
        $this.form.unser = busqueda_pedido["UNSER_PED"];
        $this.form.folio = busqueda_pedido["FOLIO_PED"];

        $this.consultar_profesional(busqueda_pedido["MED_PED"]);
        await $this.get_data_formulacion_pedido();
        await $this.imprimir();
      } else {
        CON851(
          "01",
          "El pedido ingresado no ha sido registrado para este paciente",
          null,
          "error",
          "error"
        );
        $this.validar_nro_pedido();
      }
    },
    get_data_formulacion_pedido() {
      let tipo_ped = "2";
      const datos_envio = {
        datosh: datosEnvio() + localStorage.Usuario,
        llave_ped: tipo_ped.concat($this.form.numero_ctl.padStart(6, "0")),
      };
      postData(datos_envio, get_url("APP/HICLIN/HC603B.DLL"))
        .then((data) => {
          let formulacion_pedido =
            data["FORMULACION_PEDIDO"][`${datos_envio.llave_ped}`];
          formulacion_pedido.length > 1 ? formulacion_pedido.pop() : false;
          for (i in formulacion_pedido) {
            if (formulacion_pedido[i]["COD_FORMU"].trim() != "") {
              $this.listado_formulacion.push({
                item: parseInt(i) + 1,
                grupo: formulacion_pedido[i]["GRUPO_FORMU"],
                codigo: formulacion_pedido[i]["COD_FORMU"],
                cantidad: formulacion_pedido[i]["CANT_FORMU"],
                descripcion: formulacion_pedido[i]["NOM_FORMU"],
              });
            }
          }
        })
        .catch((err) => {
          console.log("Error", err);
          loader("hide");
          _regresar_menuhis();
        });
    },
    async get_datos() {
      postData(
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
          const tipo_ped = "2";
          const datos_envio = {
            datosh: datosEnvio() + localStorage.Usuario + "|" + tipo_ped,
            llave_hc: $_REG_HC.llave_hc,
          };
          postData(datos_envio, get_url("APP/HICLIN/HC603.DLL"))
            .then((data) => {
              $this.listado_pedidos = data.PEDIDOS_FARMACIA.filter(
                (a) => a.LLAVE_PED != ""
              );
              loader("hide");
            })
            .catch((err) => {
              console.log("Error", err);
              loader("hide");
              _regresar_menuhis();
            });
        })
        .catch((err) => {
          console.log(err, "error");
          loader("hide");
          _regresar_menuhis();
        });
    },
    consultar_profesional(identificacion) {
      let datos_envio = datosEnvio();
      datos_envio += cerosIzq(identificacion.trim(), 10);
      datos_envio += "|";

      let URL = get_url("APP/SALUD/SAL719-01.DLL");
      postData(
        {
          datosh: datos_envio,
        },
        URL
      )
        .then((data) => {
          loader("hide");
          $this.profesional = data.PERSATI[0];
        })
        .catch((error) => {
          console.error(error);
          _regresar_menuhis();
        });
    },
    imprimir() {
      CON851P(
        "00",
        () => {
          $this.validar_nro_pedido();
        },
        () => {
          _impresion2({
            tipo: "pdf",
            archivo: `${
              localStorage.Usuario + moment().format("-YYMMDD-HHmmssS")
            }.pdf`,
            content: $this.format_impresion(),
          }).then((data) => {
            toastr.success(
              `Impresion generada correctamente: ${
                localStorage.Usuario + moment().format("-YYMMDD-HHmmssS")
              }`
            );
            $this.reset();
            _regresar_menuhis();
          });
        }
      );
    },
    format_impresion() {
      let tipo_ped = "2";
      const llave_ped = tipo_ped.concat($this.form.numero_ctl.padStart(6, "0"));

      const busqueda_pedido = $this.listado_pedidos.find(
        (x) => parseInt(x.LLAVE_PED) == parseInt(llave_ped)
      );

      let { HORA_PED, FECHA_PED } = busqueda_pedido;

      let fecha = _editarFecha(FECHA_PED),
        hora = `${HORA_PED.substr(0, 2)}:${HORA_PED.substr(2, 2)}`;

      let nit_paciente =
        new Intl.NumberFormat("ja-JP").format($_REG_PACI.COD) || $_REG_PACI.COD;
      let nro_fact_hc = $this.info_historia.cierre.nro_fact;
      let detalle = $this.listado_formulacion;
      let detalle_print = [];
      console.log("detalle impresion", detalle);
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
          { text: el.codigo, style: "left8" },
          { text: el.descripcion, style: "left8" },
          { text: el.cantidad, style: "center8" },
          { text: el.indicaciones, style: "left8" },
        ]);
      });

      var aux = null;
      switch ($this.profesional["ATIENDE"]) {
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
                      { text: `DEVOLUCION FARMACIA   ${$this.form["unser"]}` },
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
                        text:
                          "\nNro. Pedido. " +
                          $this.form.numero_ctl.padStart(6, "0"),
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
                        text: `${fecha} - ${hora}`,
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
                        text: $_REG_PACI.DESCRIP.toString().replace(
                          /\s+/g,
                          " "
                        ),
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
                margin: [0, 10, 0, 0],
                style: "left8",
                stack: [$this.profesional["DESCRIP"], "Especialidad: " + aux],
              },
            ],
          },
        ],
        styles: estilosImpresion_impHc(),
      };
    },
  },
});
