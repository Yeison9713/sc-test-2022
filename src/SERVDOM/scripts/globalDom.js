let PUB827 = [
  { COD: "1", DESCRIP: "RURAL" },
  { COD: "2", DESCRIP: "URBANO" },
  { COD: "3", DESCRIP: "RURAL DISPERSA" },
];

let PUB828 = [
  { COD: "1", DESCRIP: "PEQUEÑO PRODUCTOR" },
  { COD: "2", DESCRIP: "PRODUCTOR HASTA 1.5 TN" },
  { COD: "3", DESCRIP: "GRAN PRODUCTOR" },
  { COD: "4", DESCRIP: "PREDIO DESOCUPADO" },
];

const format_op = (value) => {
  // formatea valor para calculos
  value = value || "";
  return parseFloat(value.toString().replace(/\,/g, "").replace(/\ /g, "")) || 0;
};

function _ventana_PUB801(callback_esc) {
  return new Promise((resolve) => {
    POPUP(
      {
        array: [
          { COD: "1", DESCRIP: "CONSULTA POR NOMBRE" },
          { COD: "2", DESCRIP: "CONSULTA POR DIRECCIÓN" },
          { COD: "3", DESCRIP: "CONSULTA POR RUTEO" },
        ],
        titulo: "SELECCIONAR VENTANA CONSULTA",
        indices: [{ id: "COD", label: "DESCRIP" }],
        seleccion: "1",
        teclaAlterna: true,
        callback_f: callback_esc,
      },
      async (data) => {
        let columns = [];
        switch (data.COD) {
          case "1":
            columns = ["NOMBRE", "CUENTA", "ESTRATO"];
            break;
          case "2":
            columns = ["NOMBRE", "DIRECCION", "ESTRATO"];
            break;
          case "3":
            columns = ["NOMBRE", "RUTEO"];
            break;
        }

        await postData({ datosh: moduloDatosEnvio() + data.COD + "|" }, get_url("app/SERVDOM/PUB801.DLL"))
          .then((datos) => {
            _ventanaDatos({
              titulo: "Ventana de Usuarios de Servicios",
              columnas: columns,
              data: datos.USDOM,
              callback_esc: callback_esc,
              callback: (data) => {
                let retorno = {
                  cuenta: data.CUENTA,
                  nombre: data.NOMBRE,
                  estrato: data.ESTRATO,
                  datos: datos.USDOM,
                };
                console.log(retorno);
                resolve(retorno);
              },
            });
          })
          .catch((error) => {
            console.error(error);
            loader("hide");
            callback_esc();
          });
      }
    );
  });
}

const styles_imp = () => {
  return {
    left8: {
      fontSize: 8,
      alignment: "left",
    },
    center8Bold: {
      fontSize: 8,
      alignment: "center",
      bold: true,
    },
    left9: {
      fontSize: 9,
      alignment: "left",
    },
    center9: {
      fontSize: 9,
      alignment: "center",
    },
    right9: {
      fontSize: 9,
      alignment: "right",
    },
    left10Bold: {
      fontSize: 10,
      alignment: "left",
      bold: true,
    },
    right10Bold: {
      fontSize: 10,
      alignment: "right",
      bold: true,
    },
    right10: {
      fontSize: 10,
      alignment: "right",
    },
    center9Bold: {
      fontSize: 9,
      alignment: "center",
      bold: true,
    },
    center10Bold: {
      fontSize: 10,
      alignment: "center",
      bold: true,
    },
    center10BoldT: {
      fontSize: 10,
      alignment: "center",
      bold: true,
      fillColor: "#D1DFF4",
    },
    center9Bold: {
      fontSize: 9,
      alignment: "center",
      bold: true,
    },
    center9BoldT: {
      fontSize: 9,
      alignment: "center",
      bold: true,
      fillColor: "#D1DFF4",
    },
    left9BoldT: {
      fontSize: 9,
      alignment: "left",
      bold: true,
      fillColor: "#D1DFF4",
    },
    left9Bold: {
      fontSize: 9,
      alignment: "left",
      bold: true,
    },
    justify9: {
      fontSize: 9,
      alignment: "justify",
    },
  };
};

const _editarFecha = (fecha) => {
  fecha = fecha.toString();
  var d = parseInt(fecha.substring(6, 8));
  var m = parseInt(fecha.substring(4, 6));
  var a = parseInt(fecha.substring(0, 4));

  var aux = "  ";
  switch (m) {
    case 1:
      aux = "Ene. ";
      break;
    case 2:
      aux = "Feb. ";
      break;
    case 3:
      aux = "Mar. ";
      break;
    case 4:
      aux = "Abr. ";
      break;
    case 5:
      aux = "May. ";
      break;
    case 6:
      aux = "Jun. ";
      break;
    case 7:
      aux = "Jul. ";
      break;
    case 8:
      aux = "Ago. ";
      break;
    case 9:
      aux = "Sep. ";
      break;
    case 10:
      aux = "Oct. ";
      break;
    case 11:
      aux = "Nov. ";
      break;
    case 12:
      aux = "Dic. ";
      break;
  }

  var fecha_edit = aux + d + "/" + a;

  if (fecha.trim() == "") {
    return fecha;
  } else {
    return fecha_edit;
  }
};

const mascara9 = IMask.createMask({
  mask: Number,
  thousandsSeparator: ",",
  radix: ".",
  padFractionalZeros: true,
  signed: false,
  scale: 2,
  min: -99999.99,
  max: 999999.99,
});

const mascara11 = IMask.createMask({
  mask: Number,
  thousandsSeparator: ",",
  radix: ".",
  padFractionalZeros: true,
  signed: false,
  scale: 1,
  min: -99999999.9,
  max: 999999999.9,
});

const mascara_valor = IMask.createMask({
  mask: Number,
  thousandsSeparator: ",",
  min: -999999999999,
  max: 9999999999999,
});

const mascara_valor_2 = IMask.createMask({
  mask: Number,
  scale: 2,
  radix: ".",
  padFractionalZeros: true,
  thousandsSeparator: ",",
  min: -999999999.99,
  max: 9999999999.99,
});

const mascara4_cant = IMask.createMask({
  mask: Number,
  thousandsSeparator: ",",
  radix: ".",
  padFractionalZeros: true,
  signed: false,
  scale: 1,
  min: -99.9,
  max: 999.9,
});

const mascara5 = IMask.createMask({
  mask: Number,
  thousandsSeparator: ",",
  radix: ".",
  padFractionalZeros: true,
  signed: false,
  scale: 2,
  min: -9.99,
  max: 99.99,
});

const mascara7 = IMask.createMask({
  mask: Number,
  thousandsSeparator: ",",
  radix: ".",
  padFractionalZeros: true,
  signed: false,
  scale: 1,
  min: -9999.9,
  max: 99999.9,
});

function rutaLogos(data) {
  if (localStorage.Unidad == "S") return `D:\\SC\\newcobol\\LOGOS\\${data}.png`;
  else return `P:\\PROG\\LOGOS\\${data}.png`;
}

function rutaFirmas(data) {
  if (localStorage.Unidad == "S") return `D:\\SC\\newcobol\\HC\\DATOS\\${data}.png`;
  else return `P:\\PROG\\FIRMAS\\${data}.png`;
}

const unirPdfs_dom = (arrayData, retornar, nomPdf) => {
  return new Promise(async (resolve) => {
    let merger = new PDFMerger();

    for (let i in arrayData) {
      if (arrayData[i]) {
        let x = await new Buffer.from(arrayData[i]);
        merger.add(x);
      }
    }

    let nombrePdf = nomPdf || `C:/PROSOFT/TEMP/${localStorage.Usuario + moment().format("-YYMMDD-HHmmssS")}.pdf`;
    await merger.save(nombrePdf);

    if (retornar) resolve(nombrePdf);
    else {
      child(`start ${nombrePdf}`);
      resolve();
    }
  });
};

const _editarFechaMes = (fecha) => {
  fecha = fecha.toString();
  let m = parseInt(fecha.slice(4, 6));
  let a = parseInt(fecha.slice(0, 4));

  let aux = "";
  switch (m) {
    case 1:
      aux = "Ene. ";
      break;
    case 2:
      aux = "Feb. ";
      break;
    case 3:
      aux = "Mar. ";
      break;
    case 4:
      aux = "Abr. ";
      break;
    case 5:
      aux = "May. ";
      break;
    case 6:
      aux = "Jun. ";
      break;
    case 7:
      aux = "Jul. ";
      break;
    case 8:
      aux = "Ago. ";
      break;
    case 9:
      aux = "Sep. ";
      break;
    case 10:
      aux = "Oct. ";
      break;
    case 11:
      aux = "Nov. ";
      break;
    case 12:
      aux = "Dic. ";
      break;
  }

  let fecha_edit = `${aux} / ${a}`;

  if (!fecha.trim()) {
    return fecha;
  } else {
    return fecha_edit;
  }
};

function _ventana_PUB808(callback_esc) {
  return new Promise((resolve) => {
    postData({ datosh: moduloDatosEnvio() }, get_url("app/SERVDOM/PUB111_01.DLL"))
      .then((datos) => {
        let tabla_lec = datos.tabla_lec;
        for (let i in tabla_lec) {
          if (tabla_lec[i].normal == "S") tabla_lec[i].est1 = "NORMAL";
          else tabla_lec[i].est1 = "";

          if (tabla_lec[i].increm == "S") tabla_lec[i].est2 = "INCREM";
          else tabla_lec[i].est2 = "";

          if (tabla_lec[i].promed == "S") tabla_lec[i].est3 = "PROMED";
          else tabla_lec[i].est3 = "";

          if (tabla_lec[i].invert == "S") tabla_lec[i].est4 = "INVERT";
          else tabla_lec[i].est4 = "";
        }
        _ventanaDatos({
          titulo: "Ventana de Usuarios de Servicios",
          columnas: ["codigo", "concep", "est1", "est2", "est3", "est4", "consum"],
          data: tabla_lec,
          callback_esc: callback_esc,
          callback: (data) => {
            resolve(data);
          },
        });
      })
      .catch((error) => {
        console.error(error);
        loader("hide");
        callback_esc();
      });
  });
}

const _editFecha2 = (fecha) => {
  fecha = fecha.toString();

  let fecha_edit2 = fecha.slice(0, 4) + "/" + fecha.slice(4, 6) + "/" + fecha.slice(6);
  return fecha_edit2;
};

function _ventana_PUB813(fecha_w, callback_esc) {
  _fin_validar_form();
  return new Promise((resolve) => {
    postData({ datosh: moduloDatosEnvio() + fecha_w + "|" }, get_url("app/SERVDOM/PUB813.DLL"))
      .then((data) => {
        data.DATOS.pop();
        _ventanaDatos({
          titulo: "Consulta de Pagos del Dia",
          columnas: ["fecha", "cta", "secu", "vlr", "fecha_gen"],
          data: data.DATOS,
          callback_esc: callback_esc,
          callback: (reg) => {
            resolve(reg);
          },
        });
      })
      .catch((error) => {
        console.error(error);
        loader("hide");
        callback_esc();
      });
  });
}

module.exports = {
  PUB827,
  PUB828,
  format_op,
  _ventana_PUB801,
  styles_imp,
  _editarFecha,
  mascara4_cant,
  mascara5,
  mascara7,
  mascara9,
  mascara11,
  mascara_valor,
  mascara_valor_2,
  rutaLogos,
  rutaFirmas,
  unirPdfs_dom,
  _editarFechaMes,
  _ventana_PUB808,
  _editFecha2,
  _ventana_PUB813,
};
