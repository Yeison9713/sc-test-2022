let template_detalle = (data = []) => {
  let arr = [];
  let conta = 1;

  data.forEach((el) => {
    let obj = [
      { text: conta },
      { text: el.DESART },
      { text: el.CANART, alignment: "right" },
      { text: el.VLRART, alignment: "right" },
    ];
    conta ++;
    arr.push(obj);
  });

  return arr;
};

let template_totales = (data = []) => {
  let arr = [];
  data.forEach((el) => {
    if (el.VLRTOT){
      let obj = [
          { text: el.NOMTOT },      
          { text: el.VLRTOT, alignment: "right" },
      ];
      arr.push(obj);
    }
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

function inv412(datos = {}) {
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
              { text: datos.ENCABEZADO.DIRUSU },
              { text: datos.ENCABEZADO.CIUUSU },
              { text: moment().format("  YYYY-MM-DD HH:mm") },
              { text: datos.ENCABEZADO.REGUSU },
            ],
          },
        ],
      },

      {
        margin: [0, 0, 0, template.separator],
        table: {
          headerRows: 1,
          widths: ["30%", "70%"],
          body: [
            [
              { text: "NUMERO:", bold: true },
              {
                text: datos.ENCAFACTURA.PREFAC +'-'+ parseFloat(datos.ENCAFACTURA.NROFAC),
                bold: false,
              },
            ],
            [
              { text: "CLIENTE:", bold: true },
              { text: datos.ENCAFACTURA.NOMFAC, bold: false },
            ],
            [
              { text: "Forma de pago:", bold: true },
              { text: datos.ENCAFACTURA.PAGFAC, bold: false },
            ],
            [
              { text: "Vendedor:", bold: true },
              { text: datos.ENCAFACTURA.VENFAC, bold: false },
            ],
            [
              { text: "Fecha:", bold: true },
              { text: datos.ENCAFACTURA.FECFAC, bold: false },
            ],
          ],
        },
        layout: {
            defaultBorder: false,
        }
      },
      {
        margin: [0, 5, 0, template.separator],
        table: {
          headerRows: 1,
          widths: ["5%", "55%", "20%", "20%"],
          body: [
            [
              { text: "N°", color: "#fff", bold: true },
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
          widths: ["50%", "50%"],
          body: [  
            [
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
        columns: [
          {
            table: {
              widths: ["*", "auto", "*"],
              body: [                                
                [
                    { border: [false, true, false, false],
                      text: "Detalle: ", bold: true 
                    },
                    { border: [false, true, false, false],
                      text: datos.PIEFACTURA.DETFAC, colSpan: 2 
                    },
                    null,
                  ],                             
                [
                  {
                    text: "Esta factura se asimila en sus efectos a la letra de cambio Art. 774 de cio",
                    bold: true,
                    colSpan: 3,
                  },
                ],                              
              ],
            },
            layout: {
				defaultBorder: false,
			}
          },
        ],
      },
      {
        margin: [0, 5, 0, template.separator],
        columns: [
          {
            table: {
              widths: ["*", "auto", "*"],
              body: [                                
                [
                  { text: "Res Dian: ", bold: true},
                  { text: datos.PIEFACTURA.RESDIAN, alignment: 'left', colSpan: 2},
                  null,
                ],
                [
                  { text: "DESDE: ", bold: true },
                  { text: "HASTA: ", bold: true },                  
                  null,
                ],
                [
                  { text: datos.PIEFACTURA.INIRES, alignment: 'right' },
                  { text: datos.PIEFACTURA.FINRES, alignment: 'right' },
                  null,
                ],
              ],                               
            },
            layout: {
                hLineWidth: function (i, node) {
                  return i === 0 || i === node.table.widths.length ? 0 : 0;
                },
                vLineWidth: function (i, node) {
                  return i === 0 || i === node.table.widths.length ? 0 : 0;
                },
                
              },
          },
        ],
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

module.exports = { inv412 };
