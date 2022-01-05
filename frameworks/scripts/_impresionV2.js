// Doc BarcodeJS - https://lindell.me/JsBarcode/

var pdfMake = require("pdfmake/build/pdfmake.js");
var pdfFonts = require("pdfmake/build/vfs_fonts.js");
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const { parse } = require('json2csv');

class _impresion_pdf {
  content = null;
  nombre_archivo = null;
  ruta_guardado = "C:\\PROSOFT\\TEMP\\";
  abrir_archivo = null;

  constructor(params) {
    this.content = params.content;
    this.nombre_archivo = params.archivo;
    this.ruta_guardado = params.ruta_guardado || this.ruta_guardado;
    this.abrir_archivo =
      params.abrir_archivo != undefined ? params.abrir_archivo : true;
    this.retornar = params.retornar == true ? true : false;
  }

  imprimir() {
    var _this = this;

    return new Promise(function (resolve, reject) {
      var nombre_archivo = `${_this.ruta_guardado}${_this.nombre_archivo}`;

      let validacion = _this.validar_img(_this.content);
      var docDefinition = validacion;
      // console.log(docDefinition)

      // console.log(JSON.stringify(docDefinition))
      try {
        if (_this.retornar) {
          const pdfDocGenerator = pdfMake.createPdf(docDefinition);
          pdfDocGenerator.getBuffer((data) => {
            resolve(data);
          });
        } else {
          const pdfDocGenerator = pdfMake.createPdf(docDefinition);
          pdfDocGenerator.getBuffer((data) => {
            require("fs").writeFile(nombre_archivo, data, function (err) {
              if (err) reject(err);
              if (_this.abrir_archivo) child(`start ${nombre_archivo}`);
              console.log("-> PDF GENERADO CORRECTAMENTE", nombre_archivo);
              resolve();
            });
          });
        }
      } catch {
        console.log("sale error catch");
        reject();
      }
    });
  }

  validar_img(data) {
    if (!data.images) data.images = {};

    let imagenes = data.images;
    Object.getOwnPropertyNames(imagenes).forEach(function (val) {
      let ruta = imagenes[val];
      try {
        let base64 = require("fs").readFileSync(ruta).toString("base64");
        imagenes[val] = "data:image/png;base64," + base64;
      } catch {
        //imagen en blanco
        imagenes[val] =
          "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=";
      }
    });
    data.images = imagenes;

    if (data.codigo_barras) {
      var codigos = data.codigo_barras;
      Object.getOwnPropertyNames(codigos).forEach(function (val) {
        let actual = null;
        let options = {};

        if (typeof codigos[val] == "string") actual = codigos[val];
        else {
          actual = codigos[val].text;
          options = codigos[val].options;
        }

        var canvas = document.createElement("CANVAS");

        JsBarcode(canvas, actual, options);
        let url = canvas.toDataURL();
        canvas.remove();
        data.images[val] = url;
      });
    }

    return data;
  }
}

class _impresion_excel {
  workbook = new Excel.Workbook();
  worksheet = null;
  content = {
    ruta_logo: null,
    logo: null,
    tabla: null,
    header: [],
    merge_header: ["B", "D"],
    sheetName: null,
  };
  nombre_archivo = null;
  ruta_guardado = null;
  tabla_render = null;

  constructor(params) {
    this.content.sheetName = params.sheetName || "HOJA";
    this.content.ruta_logo = params.ruta_logo || "P:\\PROG\\LOGOS\\";
    this.nombre_archivo = params.archivo || `INFORME-${Math.random()}`;
    this.worksheet = this.workbook.addWorksheet(this.content.sheetName);
    this.content.header = params.header || null;
    this.content.logo = params.logo || null;
    this.content.tabla = params.tabla || null;
    this.content.scale = params.scale || 100;
    this.content.orientation = params.orientation || "portrait";
    this.ruta_guardado = params.ruta_guardado || "C:\\PROSOFT\\TEMP\\";
    this.content.filas = params.filas || [];
  }

  imprimir() {
    var $this = this;
    return new Promise(function (resolve, reject) {
      if ($this.encabezado_excel())
        if ($this.tabla_excel())
          if ($this.estilo_excel())
            if ($this.insertar_filas()) {
              writexlsx()
                .then(resolve)
                .catch((err) => {
                  console.log(err);
                  reject();
                });
            }
    });

    async function writexlsx() {
      let name = `${$this.ruta_guardado}${$this.nombre_archivo}.xlsx`;
      await $this.workbook.xlsx.writeFile(name);
      child(name);
    }
  }

  insertar_filas() {
    var final_encabezado = this.content.header.length + 2;
    var filas = this.content.filas;
    if (filas) {
      var preTable = filas.preTable;
      if (preTable) {
        var row = this.worksheet.getRow(final_encabezado);
        preTable.forEach((el) => {
          if (el.merge) {
            let rango = el.merge;
            this.worksheet.mergeCells(
              final_encabezado,
              rango[0],
              final_encabezado,
              rango[1]
            );
            row.getCell(rango[0]).value = el.text;
          } else {
            let column = parseInt(el.columna);
            row.getCell(column).value = el.text;
          }
        });
      }

      var posTable = filas.posTable;
      if (posTable) {
        // console.log(this.worksheet.lastRow)
        var lastRow = this.worksheet.lastRow._number + 1;
        var row = this.worksheet.getRow(lastRow);
        posTable.forEach((el) => {
          if (el.merge) {
            let rango = el.merge;
            this.worksheet.mergeCells(
              final_encabezado,
              rango[0],
              final_encabezado,
              rango[1]
            );
            row.getCell(rango[0]).value = el.text;
          } else {
            let column = parseInt(el.columna);
            row.getCell(column).value = el.text;
          }
        });
      }
    }

    return true;
  }

  tabla_excel() {
    var final_encabezado = this.content.header.length;
    var inicio_tabla = `A${final_encabezado + 3}`;

    this.tabla_render = this.worksheet.addTable({
      name: "table",
      ref: inicio_tabla,
      headerRow: true,
      totalsRow: this.content.tabla.totalsRow || false,
      style: {
        theme: this.content.tabla.theme || "TableStyleMedium16",
        showRowStripes: true,
      },
      columns: this.tabla_header(),
      rows: this.tabla_datos(),
    });

    return true;
  }

  tabla_datos() {
    var datos = this.content.tabla.data;
    var columnas = this.content.tabla.columnas;
    var formato_datos = [];

    // Se añade format String, para omitir conversion numerica (en caso de que sean columnas
    // con datos numericos y alfanumericos a la vez) David.M 21/07/2020
    // Se agrega formato automatico para fechas David.M 16/07/2020
    datos.forEach((row, index) => {
      formato_datos.push([]);
      columnas.forEach((columna) => {
        if (columna.format != "fecha" && columna.format != "string") {
          let val = row[columna.value] || "";
          val = parseFloat(val) || val.trim();
          formato_datos[index].push(val || "");
        } else {
          if (columna.format == "fecha") {
            let val = row[columna.value] || "";
            val = val.toString().trim();
            if (val.length == 8) {
              val =
                val.substring(0, 4) +
                "/" +
                val.substring(4, 6) +
                "/" +
                val.substring(6, 8);
            } else if (val.length == 6) {
              val =
                val.substring(0, 2) +
                "/" +
                val.substring(2, 4) +
                "/" +
                val.substring(4, 6);
            }
            formato_datos[index].push(val || "");
          } else if (columna.format == "string") {
            let val = row[columna.value] || "";
            val = val.toString().trim();
            formato_datos[index].push(val || "");
          }
        }
      });
    });

    return formato_datos;
  }

  estilo_excel() {
    var final_encabezado2 = this.content.header.length;
    var columnas_final_2 = this.content.tabla.columnas.length;

    var $this = this;
    var tabla = this.tabla_render;
    let rango = tabla.table.tableRef.split(":");
    let limite_ini = rango[0].substr(1); // Row inicio de tabla
    // Row final de tabla
    let limite_fin = null;
    columnas_final_2 > 26
      ? (limite_fin = rango[1].substr(2))
      : (limite_fin = rango[1].substr(1));

    // David.M 17/07/2020
    // Se agrega escala, orientacion y encabezado repetible en cada pagina
    // Se elimina printArea para que sea automatico.

    this.worksheet.pageSetup.scale = this.content.scale;
    this.worksheet.pageSetup.orientation = this.content.orientation;
    this.worksheet.pageSetup.printTitlesRow = `1:${final_encabezado2 + 2}`;

    // Ajusta la altura (height) de cada fila
    var heightRow = this.content.tabla.heightRow || false;
    this.worksheet._rows.forEach((row) => {
      if (row._number >= limite_ini && row._number <= limite_fin)
        row.height = heightRow || 20;
    });

    // Ajusta todas las celdas al tamaño del texto
    // Asigna formato (money) a las columnas seleccionadas
    this.worksheet.columns.forEach((column) => {
      let width = 0;
      let id_columna = column._number;
      let config_column = $this.content.tabla.columnas[id_columna - 1] || false;

      column.eachCell({ includeEmpty: false }, (cell) => {
        let coord = null;
        let columna = null;
        let parent_columna = null;
        var col2 = cell._address.substring(1, 2);
        // Condicion evaluando si hay mas de 26 columnas David.M
        if (isNaN(parseFloat(col2))) {
          coord = parseInt(cell._address.substr(2));
          columna = String.fromCharCode(96 + id_columna).toUpperCase();
          parent_columna = cell._address.substr(0, 2);
        } else {
          coord = parseInt(cell._address.substr(1));
          columna = String.fromCharCode(96 + id_columna).toUpperCase();
          parent_columna = cell._address.substr(0, 1);
        }

        cell.alignment = {
          vertical: "middle",
        };

        if (
          coord >= parseInt(limite_ini) &&
          coord < parseInt(limite_fin) &&
          cell._address != "A1"
        ) {
          let actual = cell.value ? (cell.value.length || 10) + 5 : 10;
          width = actual > width ? actual : width;
        }

        if (
          coord > parseInt(limite_ini) &&
          columna == parent_columna &&
          config_column &&
          config_column.format &&
          config_column.format == "money"
        )
          cell.numFmt = "$#,##0.00;[Red]-$#,##0.00";

        if (
          coord > parseInt(limite_ini) &&
          columna == parent_columna &&
          config_column &&
          config_column.format &&
          config_column.format == "fecha"
        )
          cell.numFmt = "dd/mm/yyyy";
      });

      column.width = column._number == 1 && width < 20 ? 20 : width;
    });

    return true;
  }

  tabla_header() {
    let columnas = this.content.tabla.columnas;
    columnas.map((el) => {
      el.name = el.title;
    });

    return columnas;
  }

  encabezado_excel() {
    var $this = this;
    var bordes = {
      top: { style: "thin", color: { argb: "000" } },
      left: { style: "thin", color: { argb: "000" } },
      bottom: { style: "thin", color: { argb: "000" } },
      right: { style: "thin", color: { argb: "000" } },
    };

    var header = $this.content.header;

    var columnas_final = $this.content.tabla.columnas.length;
    var columnas_limite = columnas_final > 26 ? 20 : columnas_final;
    var final_text = String.fromCharCode(96 + columnas_limite);

    var inicial = $this.content.merge_header[0];
    var final =
      columnas_final < 4
        ? $this.content.merge_header[1]
        : final_text.toUpperCase();

    header.forEach((val, index) => {
      index++;
      let key_inicial = `${inicial + index}`;
      let key_final = `${final + index}`;
      let text = typeof val == "object" ? val.text : val;
      $this.worksheet.mergeCells(`${key_inicial}:${key_final}`);

      $this.worksheet.getRow(index).height = 20;

      var cell = $this.worksheet.getCell(key_inicial);
      cell.value = text;
      cell.font = {
        bold: typeof val == "object" ? val.bold : false,
        size: typeof val == "object" ? val.size : 12,
      };

      cell.alignment = {
        vertical: "middle",
        horizontal: "left",
      };

      cell.border = bordes;
    });

    let logo_merge = `A1:A${header.length}`;
    try {
      var image = $this.workbook.addImage({
        buffer: require("fs").readFileSync(
          `${this.content.ruta_logo}${$this.content.logo}`
        ),
        extension: "bmp",
      });
      $this.worksheet.addImage(image, logo_merge);
    } catch {
      console.error(
        "->",
        "Error",
        "No se ha encontrado el logo:",
        `${this.content.ruta_logo}${$this.content.logo}`
      );
    }
    $this.worksheet.mergeCells(logo_merge);
    $this.worksheet.getColumn("A").width = 20;
    $this.worksheet.getCell("A1").border = bordes;

    return true;
  }
}

class _impresion_csv {
  columnas =  [];
  datos =  [];
  nombre_archivo = null;
  ruta_guardado = null;

  constructor(params) {
    this.nombre_archivo = params.archivo || `INFORME-${new Date().getTime()}`;
    this.ruta_guardado = params.ruta_guardado || "C:\\PROSOFT\\TEMP\\";
    this.datos = params.datos || null;
    this.columnas = params.columnas || null;
    this.opts = params.opts || null;
  }

  imprimirCsv() {
    let columnas = this.columnas
    let datos = this.datos

    const opts = { fields: columnas, ...this.opts };
    var csv = parse(datos, opts)

    return new Promise((resolve, reject) => {
        let archivo = `${this.ruta_guardado}${this.nombre_archivo}.csv`;
        fs.writeFile(archivo, csv, (err) => {
          if (err) reject(err);
          child(`start ${archivo}`);
          resolve();
        })
    });
  }
}

class _impresion_list_pdf {
  constructor(params) {
    this.ruta_logo = params.ruta_logo || "P:\\PROG\\LOGOS\\";
    this.nombre_archivo = params.archivo || `INFORME-${Math.random()}`;
    this.logo = params.logo || null;
    this.header = params.header || "";
    this.tabla = params.tabla || null;
    this.orientation = params.orientation || "landscape";

    this.mascara_valor = IMask.createMask({
      mask: Number,
      thousandsSeparator: ",",
      min: -999999999999,
      max: 9999999999999,
    });
  }

  format() {
    return {
      pageMargins: [20, 90, 20, 40 ],
      pageOrientation: this.orientation,
      images: { logo: `${this.ruta_logo}${this.logo}` },
      header: this.header_list_pdf(),
      content: [
        { 
          table: this.content_list_pdf(),
          layout: {
            hLineWidth: (i) => {
               if (i == 0 || i == 1 || i == this.tabla.data.length + 1) return 1;
               else return 0;
            },
            vLineWidth: (i) => {
               if (i == 0 || i <= this.tabla.columnas.length) return 1;
               else return 0;
            },
            hLineColor: (i) => {
               return i != 0 && i != this.tabla.data.length + 1 ? "gray" : "black";
            },
            vLineColor: (i) => {
               return i != 0 && i != this.tabla.columnas.length ? "gray" : "black";
            },
          }, 
        }
      ],
      styles: this.styles_list_pdf()
    }
  };

  async imprimir() {
    await _impresion2({
      tipo: "pdf",
      archivo: `${this.nombre_archivo}.pdf`,
      content: this.format(),
    })
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.error(error);
    });
  }

  header_list_pdf() {
    return (currentPage, pageCount, pageSize) => {
      return {
        margin: [20, 20, 20, 0],
        stack: [
          {
            style: "left8",
            table: {
              widths: ["25%", "50%", "25%"],
              heights: [53],
              body: [
                [
                  {
                    margin: [10,4,0,0],
                    stack: [
                      {
                        image: "logo",
                        width: 70,
                        height: 50,
                      },
                    ],
                    border: [true, true, false, true],
                    width: "20%",
                  },
                  {
                    marginTop: 7,
                    style: "center10Bold",
                    stack: [
                      this.header
                    ],
                    width: "60%",
                    border: [false, true, false, true],
                  },
                  {
                    stack: [
                      { text: `FECHA IMP: ${moment().format("YYYY-MM-DD")}` },
                      { text: `PAG: ${currentPage} de ${pageCount}`, marginTop: 14 },
                    ],
                    margin: [0, 7, 7, 0],
                    style: "right10Bold",
                    width: "20%",
                    border: [false, true, true, true],
                  },
                ],
              ],
            },
          },
        ],
      };
    }
  }

  content_list_pdf() {
    let table = {
      headerRows: 1,
      body: [] 
    }
    
    let row_header = [],
        widths = [];

    // header
    this.tabla.columnas.forEach((col) => {
        row_header.push(
            { text: col.title, style: col.style ? col.style : "center9BoldT", alignment: "center" }
        )

        if(col.width) widths.push(col.width);
        else widths.push("*");
    })
    table.widths = widths;
    table.body.push(row_header);
    
    let row_content = [];
    // content
    this.tabla.data.forEach((row) => {
        row_content = [];
        this.tabla.columnas.forEach((col) => {
            let cell = row[col.value],
                style = "";

            switch(col.format) {
              case "money":
                cell = parseFloat(cell.toString().replace(/\,/g, "")) || 0;
                cell = this.mascara_valor.resolve((parseFloat(cell).toString()));
                // cell = `$ ${cell}`;
                style = "right9";
                break;
              case "fecha":
                cell = `${cell.slice(0,4)}/${cell.slice(4,6)}/${cell.slice(6)}`;
                style = "center9";
                break;
              case "string":
                cell = cell;
                style = "left9";
                break;
              case "number":
                cell = parseFloat(cell) ? parseFloat(cell) : cell;
                style = "center9";
                break;
              default:
                cell = parseFloat(cell) ? parseFloat(cell) : cell;
                style = "left9";
                break;
            }

            row_content.push(
                { text: cell, style: col.style ? col.style : style }
            )
        })
        table.body.push(row_content);
    })
    
    return table
  }

  styles_list_pdf() {
    return {
      left9: { fontSize: 9, alignment: 'left' },
      center9: { fontSize: 9, alignment: 'center' },
      right9: { fontSize: 9, alignment: 'right' },
      center9Bold: { fontSize: 9, alignment: 'center', bold: true },
      center9BoldT: { fontSize: 9, alignment: 'center', bold: true, fillColor: '#D1DFF4' },
      center10Bold: { fontSize: 10, alignment: 'center', bold: true },
      right10Bold: { fontSize: 10, alignment: 'right', bold: true },
    }
  }
}

var _impresion2 = async (params) => {
  return new Promise(function (resolve, reject) {    
    if (!params.tipo) {
      alert("Falta definir tipo de impresión");
      reject();
    } else if (params.tipo == "excel") {
      // console.log(params.tipo, params, 'params')
      var config = new _impresion_excel(params);
      config.imprimir().then(resolve).catch(reject);
    } else if (params.tipo == "pdf") {
      var config = new _impresion_pdf(params);
      config.imprimir().then(resolve).catch(reject);
    } else if (params.tipo == "csv") {
      var config = new _impresion_csv(params);
      config.imprimirCsv().then(resolve).catch(reject);
    } else if (params.tipo == "list_pdf") {
      var config = new _impresion_list_pdf(params);
      config.imprimir().then(resolve);
    } else {
      alert("Tipo de impresión no disponible");
      reject();
    }
  });
};
