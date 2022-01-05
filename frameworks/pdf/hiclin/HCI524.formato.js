const { endMarkedContent } = require("pdf-lib");
const { parse } = require("qs");

function _imprimirHC524(datos) {
  return {
    images: { logo: rutaLogos_impHc($_USUA_GLOBAL[0].NIT) },
    pageMargins: marginEncabezado_SUB52(),
    header: encabezado_SUB52(datos),
    content: [
      {
        margin: [0, 5, 0, 0],
        stack: [
          {
            marginTop: 5,
            stack: llenarOxigenometria(),
          },
        ],
      },
    ],

    styles: estilosImpresion_impHc(),
  };

  function llenarOxigenometria() {
    var content = [];
    var content1 = [];
    var body = [];

    var head = [
      { text: "Item", style: "center8BoldT" },
      { text: "Fecha Inicio", style: "center8BoldT" },
      { text: "Fecha Suspensión", style: "center8BoldT", margin: [-3, 0, -3, 0] },
      { text: "Min.", style: "center8BoldT" },
      { text: "Hrs-Min", style: "center8BoldT", colSpan: 2 },
      {},
      { text: "Metodo", style: "center8BoldT" },
      { text: "Observación", style: "center8BoldT", margin: [-3, 0, -3, 0] },
      { text: "Dosis", style: "center8BoldT" },
      { text: "Cant. Lts", style: "center8BoldT" },
      { text: "Funcionario", style: "center8BoldT" },
    ];

    content.push(head);

    datos.oxigenometria.forEach(async (el) => {
      let cantidad = Number(el.cantidad);
      body = [
        { text: el.item },
        { text: el.fechaIni },
        { text: el.fechaSuspen },
        { text: el.minutos },
        { text: el.hor },
        { text: el.min },
        { text: el.metodo },
        { text: el.observacion },
        { text: parseInt(el.dosis) },
        { text: cantidad },
        { text: el.usuario },
      ];

      content.push(body);
    });


    var head1 = [
      { text: 'Metodo', style: 'center8BoldT' },
      { text: 'Litros suministrados', style: 'center8BoldT' },
      { text: 'Tiempo en horas', style: 'center8BoldT' },
      { text: 'Total minutos', style: 'center8BoldT' },
    ];

    content1.push(head1);

    datos.oxigenoAgrupados.forEach(async (el) => {
      let litrosAgrupados = Number(el.litrosAgrupados);
      body = [
        { text: el.metodoAgrupados },
        { text: litrosAgrupados },
        { text: el.tiempoAgrupados },
        { text: el.minutosAgrupados + ' Min' },
      ];

      content1.push(body);
    });

    var tabla = [
      {
        marginTop: 5,
        style: "center7",
        table: {
          widths: ["4%", "15%", "15%", "4%", "3%", "3%", "12%", "10%", "5%", "5%", "24%"],
          body: content,
        },
      },
      {
        marginTop: 5,
        stack: [
          { text: 'Total minutos suministro de oxigeno: ' + datos.calculos.totMinOxig + ' Minutos', style: 'left8' },
          { text: 'Total suministro de oxigeno: ' + datos.calculos.totSuministroOxig, style: 'left8' },
          { text: 'Total litros suministrados: ' + datos.calculos.totLitrosOxig + ' Litros', style: 'left8' },
        ]
      },
      {
        marginTop: 5,
        style: "center7",
        table: {
          widths: ['20%', '20%', '15%', '15%'],
          body: content1,
        },
      }
    ];
    return tabla;
  }
}
