let template_detalle = (data = []) => {
  let arr = [];

  data.forEach((el) => {
    let obj = [      
      { text: el.DESART },
      { text: el.CANART, alignment: "right" },
      { text: el.VLRART, alignment: "right" },
    ];
    arr.push(obj);
  });

  return arr;
};

let template_totales = (data = []) => {
  let arr = [];
  data.forEach((el) => {
    //if (el.VLRTOT){
      let obj = [
          { text: el.NOMTOT },      
          { text: el.CANTOT, alignment: "right" },
          { text: el.VLRTOT, alignment: "right" },
      ];
      arr.push(obj);
    //}
  });

  return arr;
};

const template = {
  width: 225,
  margins: {
    left: 10,
    right: 10,
    top: 5,
    bottom: 10,
  },
  separator: 0,
};

function inv408P(datos = {}) {
  return {
    pageMargins: [
      template.margins.left,
      template.margins.top,
      template.margins.right,
      template.margins.bottom,
    ],
    pageSize: {
      width: template.width,
      height: "auto",
    },
    defaultStyle: {
      fontSize: 7,
    },
    content: [
      {
        margin: [0, 0, 0, template.separator],
        columns: [
          {
            alignment: "center",
            fontSize: 6,
            stack: [
              { text: datos.ENCABEZADO.NOMUSU, bold: true },
              { text: `Nit. ${datos.ENCABEZADO.NITUSU}` },
              { text: `Desde: ${datos.ENCABEZADO.FDESDE} Hasta: ${datos.ENCABEZADO.FHASTA} `},
              { text: moment().format("  YYYY-MM-DD HH:mm") },
            ],
          },
        ],
      },     
      {
        margin: [0, 5, 0, template.separator],
        table: {
          headerRows: 1,
          widths: ["60%", "20%", "20%"],
          body: [
            [
              
              { text: "Descripcion", color: "#fff", bold: true },
              {
                text: "Cantidad",
                color: "#fff",
                bold: true,
                alignment: "right",
              },
              { text: "Valor", color: "#fff", bold: true, alignment: "right" },
            ],
            ...template_detalle(datos.CUERPO),
          ],
        },
        layout: {
          paddingTop: function (i, node) {
            return 0;
          },
          paddingBottom: function (i, node) {
            return 0;
          },

          hLineWidth: function (i, node) {
            if (i == 0 || i == node.table.body.length) {
              return 0;
            }
            return 0;
          },
          vLineWidth: function (i) {
            return 0;
          },
          fillColor: function (rowIndex, node, columnIndex) {
            if (rowIndex === 0) return "#222";
          },
        },
      },

      {
        margin: [0, 5, 0, template.separator],
        table: {
          headerRows: 1,
          widths: ["60%", "20%", "20%"],
          body: [  
            [
              { border: [false, true, false, false],
                text: "" 
              },
              { border: [false, true, false, false],
                text: "" 
              },
              { border: [false, true, false, false],
                text: ""
              },
            ],              
            ...template_totales(datos.TOTALES),
          ],
        },
        layout: {
          defaultBorder: false,
        }
      },      
      
      {
        margin: [0, 5, 0, template.separator],
        text: "Software SC-PROSOFT NIT 900.448.456-6 ",
        alignment: "center",
        bold: true,
      },
    ],
  };
}

module.exports = { inv408P };
