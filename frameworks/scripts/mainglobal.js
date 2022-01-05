//////////////////////////// CONVERTIR NUMEROS A LETRAS //////////////////////
function Unidades(num) {
  switch (num) {
    case 1:
      return "UN";
    case 2:
      return "DOS";
    case 3:
      return "TRES";
    case 4:
      return "CUATRO";
    case 5:
      return "CINCO";
    case 6:
      return "SEIS";
    case 7:
      return "SIETE";
    case 8:
      return "OCHO";
    case 9:
      return "NUEVE";
    default:
      return "";
  }
}

function Decenas(num) {
  let decena = Math.floor(num / 10);
  let unidad = num - decena * 10;
  switch (decena) {
    case 1:
      switch (unidad) {
        case 0:
          return "DIEZ";
        case 1:
          return "ONCE";
        case 2:
          return "DOCE";
        case 3:
          return "TRECE";
        case 4:
          return "CATORCE";
        case 5:
          return "QUINCE";
        default:
          return "DIECI" + Unidades(unidad);
      }
    case 2:
      switch (unidad) {
        case 0:
          return "VEINTE";
        default:
          return "VEINTI" + Unidades(unidad);
      }
    case 3:
      return DecenasY("TREINTA", unidad);
    case 4:
      return DecenasY("CUARENTA", unidad);
    case 5:
      return DecenasY("CINCUENTA", unidad);
    case 6:
      return DecenasY("SESENTA", unidad);
    case 7:
      return DecenasY("SETENTA", unidad);
    case 8:
      return DecenasY("OCHENTA", unidad);
    case 9:
      return DecenasY("NOVENTA", unidad);
    case 0:
      return Unidades(unidad);
  }
}

const DecenasY = (strSin, numUnidades) => (numUnidades > 0 ? strSin + " Y " + Unidades(numUnidades) : strSin);

function Centenas(num) {
  let centenas = Math.floor(num / 100);
  let decenas = num - centenas * 100;
  switch (centenas) {
    case 1:
      if (decenas > 0) return "CIENTO " + Decenas(decenas);
      return "CIEN";
    case 2:
      return "DOSCIENTOS " + Decenas(decenas);
    case 3:
      return "TRESCIENTOS " + Decenas(decenas);
    case 4:
      return "CUATROCIENTOS " + Decenas(decenas);
    case 5:
      return "QUINIENTOS " + Decenas(decenas);
    case 6:
      return "SEISCIENTOS " + Decenas(decenas);
    case 7:
      return "SETECIENTOS " + Decenas(decenas);
    case 8:
      return "OCHOCIENTOS " + Decenas(decenas);
    case 9:
      return "NOVECIENTOS " + Decenas(decenas);
    default:
      return Decenas(decenas);
  }
}

function Seccion(num, divisor, strSingular, strPlural) {
  let cientos = Math.floor(num / divisor);
  let resto = num - cientos * divisor;
  let letras = "";
  if (cientos > 0) {
    letras = cientos > 1 ? Centenas(cientos) + " " + strPlural : strSingular;
  } else {
    letras = strSingular;
  }
  if (resto > 0) {
    letras += "";
  }
  return letras;
}

function Miles(num) {
  let divisor = 1000;
  let cientos = Math.floor(num / divisor);
  let resto = num - cientos * divisor;
  let strMiles = Seccion(num, divisor, "UN MIL", "MIL");
  let strCentenas = Centenas(resto);
  return strMiles == "" || cientos === 0 ? strCentenas : strMiles + " " + strCentenas;
}

function Millones(num) {
  let divisor = 1000000;
  let cientos = Math.floor(num / divisor);
  let resto = num - cientos * divisor;
  let strMillones = Seccion(num, divisor, millon(num, true), millon(num, false));
  let strMiles = Miles(resto);
  return strMillones == "" || cientos === 0 ? strMiles : strMillones + " " + strMiles;
}

function millon(num, singular) {
  let letraMillon = singular ? "UN MILLON" : "MILLONES";
  if (num % 1000000 == 0) {
    letraMillon = letraMillon + " DE";
  }
  return letraMillon;
}

function FAC146(num, centavos = false, currency) {
  currency = currency || {};
  let data = {
    numero: num,
    enteros: Math.floor(num),
    centavos: centavos ? Math.round(num * 100) - Math.floor(num) * 100 : 0,
    letrasCentavos: "",
    letrasMonedaPlural: currency.plural || "PESOS",
    letrasMonedaSingular: currency.singular || "PESO",
    letrasMonedaCentavoPlural: currency.centPlural || "CENTAVOS",
    letrasMonedaCentavoSingular: currency.centSingular || "CENTAVO",
  };

  if (data.centavos > 0) {
    let centavos =
      data.centavos == 1
        ? Millones(data.centavos) + " " + data.letrasMonedaCentavoSingular
        : Millones(data.centavos) + " " + data.letrasMonedaCentavoPlural;
    data.letrasCentavos = "CON " + centavos;
  }

  if (data.enteros == 0) {
    return "CERO " + data.letrasMonedaPlural + " " + data.letrasCentavos;
  }
  if (data.enteros == 1) {
    return Millones(data.enteros) + " " + data.letrasMonedaSingular + " " + data.letrasCentavos;
  } else {
    return Millones(data.enteros) + " " + data.letrasMonedaPlural + " " + data.letrasCentavos;
  }
}

// ------------------------------- FECHA EN ESPAÑOL ------------------------------------//

function momentes(fechainicial, formatofechainicial, formatofechafinal) {
  return moment(fechainicial, formatofechainicial, "es", true).format(formatofechafinal);
}

// ----------------------- CONVERTIR NUMEROS EN STRING CON COMAS -----------------------//

function numeroencomas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function CON851(err, code, dll, tipo, titulo) {
  var msj = msjError(cerosIzq(code.trim(), 2));
  var title = titulo ? titulo : "Advertencia";
  toast(title + " " + err, msj, tipo);
}

function CON851P_old(codigo, funCancel, funAccept, a) {
  var code = cerosIzq(codigo.trim(), 2);
  var msj = CON851P_MSG(code);
  var tam = msj.length > 30 ? "medium" : "small";

  a = undefined ? (a = undefined) : a;

  bootbox.confirm({
    size: tam,
    message: msj,
    closeButton: false,
    animate: false,
    callback: function (result) {
      /* result is a boolean; true = OK, false = Cancel*/
      if (a == undefined) {
        result == true ? setTimeout(funAccept, 10) : setTimeout(funCancel, 10);
      } else {
        if (result == true) {
          funAccept();
        } else {
          funCancel(a);
        }
      }
    },
  });
}

function CON852(err, code, app, func) {
  var msj = msjError_con852(cerosIzq(code.trim(), 2));
  jAlert({ titulo: "Error " + err, mensaje: "<b>Mensaje: </b>" + msj + "<br> <b>App:</b> " + app }, func);
}

function get_url(dir) {
  var modulo = localStorage.Modulo,
    unidad = localStorage.Unidad,
    url = "",
    excluidos = [
      "APP/CONTAB/ARCHIVOS-SC.DLL",
      "APP/RX/RX-44.DLL",
      "APP/RX/RX-44-02.DLL",
      "APP/RX/RX-44-03.DLL",
      "APP/RX/RX-45.DLL",
      "APP/RX/RX-45-02.DLL",
      "APP/RX/RX-45-03.DLL",
      "APP/RX/RX-421W-02.DLL",
      "APP/RX/RX-421W-03.DLL",
      "APP/RX/EMAIL.DLL",
      "APP/RX/CORRECRX.DLL",
      "APP/RX/RX-INTERFAZ-DGH.DLL",
      "APP/RX/DGHX.DLL",
      "APP/RX/DGHX-02.DLL",
      "APP/RX/ESTADO-DGHX.DLL",
      "APP/RX/LIS-DGHX.DLL",
      "APP/INC/ADJUNTAARCHIVOS.PHP",
      "APP/INC/ENVIO_EMAIL_RX.PHP",
      "APP/HICLIN/HC808.DLL",
      "APP/HICLIN/HC808-02.DLL",
      "APP/HICLIN/HC107.DLL",
      "APP/LAB/LAB102-02.DLL",
      "APP/LAB/LAB103.DLL",
      "APP/LAB/LAB103_NEW.DLL",
      "APP/LAB/LAB107.DLL",
      "APP/LAB/LAB108.DLL",
      "APP/LAB/LABCOMP.DLL",
      "APP/LAB/LABCOMP-02.DLL",
      "APP/LAB/LABCOMP-03.DLL",
      "APP/LAB/LAB101.DLL",
      "APP/LAB/LAB101-02.DLL",
      "APP/LAB/LAB101-03.DLL",
      "APP/LAB/EMAIL_LAB.DLL",
      "APP/LAB/CORRECLAB.DLL",
      "APP/INDEX/SC-USUNET.DLL",
      "APP/INDEX/INDEX_CONFIG.DLL",
      "APP/INC/ENVIO_EMAIL_LAB.PHP",
    ];
  var validacion = excluidos.indexOf(dir.toUpperCase());

  if ((modulo == "RX" || modulo == "LAB" || modulo == "HIC") && unidad == "S" && validacion < 0) {
    let url_format = dir.split("/");
    url_format[0] += "/RM";
    url = "http://" + localStorage.IP_DATOS + "/MAIN-ELECT/" + url_format.join("/");
  } else {
    url = "http://" + localStorage.IP_DATOS + "/MAIN-ELECT/" + dir;
  }
  return url;
}

function _inputControl(set) {
  switch (set) {
    case "disabled":
      $("input.form-control, textarea.form-control, button.f8-Btn").each(function () {
        $(this).attr("disabled", "true");
      });
      break;
    case "reset":
      $("input.form-control, textarea.form-control").each(function () {
        $(this).val("");
      });
      break;
  }
}

function _toggleF8(params) {
  for (var i in params) {
    let input = params[i].input;
    let app = params[i].app;
    let funct = params[i].funct;

    $("#" + input + "Btn_" + app + ",#" + input + "_" + app).unbind();
    $("#" + input + "Btn_" + app).bind("click", funct);
    $("#" + input + "_" + app).bind("keydown", funct);
  }
}

function plantillaError(err, code, app, func) {
  var msj = msjError(cerosIzq(code.trim(), 2));
  jAlert({ titulo: "Error " + err, mensaje: "<b>Mensaje: </b>" + msj + "<br> <b>App:</b> " + app }, func);
}

function plantillaToast(err, code, dll, tipo, titulo) {
  var msj = msjError(cerosIzq(code.trim(), 2));
  var title = titulo ? titulo : "Advertencia";
  toast(title + " " + err, msj, tipo);
}

function _enterInput(elm) {
  var e = $.Event("keyup");
  e.which = 13;
  $(elm).trigger(e);
}

function _enterF3(elm) {
  var e = $.Event("keyup");
  e.which = 114;
  $(elm).trigger(e);
}

function evaluarMes(mes) {
  switch (mes) {
    case "01":
      mes = "Enero";
      break;
    case "02":
      mes = "Febrero";
      break;
    case "03":
      mes = "Marzo";
      break;
    case "04":
      mes = "Abril";
      break;
    case "05":
      mes = "Mayo";
      break;
    case "06":
      mes = "Junio";
      break;
    case "07":
      mes = "Julio";
      break;
    case "08":
      mes = "Agosto";
      break;
    case "09":
      mes = "Septiembre";
      break;
    case "10":
      mes = "Octubre";
      break;
    case "11":
      mes = "Noviembre";
      break;
    case "12":
      mes = "Diciembre";
      break;
  }

  return mes;
}

function evaluarMes_min(mes) {
  switch (mes) {
    case "01":
      mes = "ENE";
      break;
    case "02":
      mes = "FEB";
      break;
    case "03":
      mes = "MAR";
      break;
    case "04":
      mes = "ABR";
      break;
    case "05":
      mes = "MAY";
      break;
    case "06":
      mes = "JUN";
      break;
    case "07":
      mes = "JUL";
      break;
    case "08":
      mes = "AGT";
      break;
    case "09":
      mes = "SEP";
      break;
    case "10":
      mes = "OCT";
      break;
    case "11":
      mes = "NOV";
      break;
    case "12":
      mes = "DIC";
      break;
    case "13":
      mes = "CONTROL";
      break;
    case "14":
      mes = "CIE";
      break;
  }

  return mes;
}

function loader(estado) {
  if (estado == "show") $("#loader_content").fadeIn();
  if (estado == "hide") $("#loader_content").fadeOut();
}

function cerosIzq(obj = "", tam) {
  while (obj.toString().length < tam) obj = "0" + obj;
  return obj;
}

function cerosDer(obj, tam) {
  while (obj.toString().length < tam) obj = obj + "0";
  return obj;
}

function espaciosIzq(obj, tam) {
  while (obj.toString().length < tam) obj = " " + obj;
  return obj;
}
function espaciosDer(obj, tam) {
  while (obj.toString().length < tam) obj = obj + " ";
  return obj;
}

function carpetaTrabajo(mes) {
  var car = false;
  switch (mes) {
    case "01":
      car = "/ENE/";
      break;
    case "02":
      car = "/FEB/";
      break;
    case "03":
      car = "/MAR/";
      break;
    case "04":
      car = "/ABR/";
      break;
    case "05":
      car = "/MAY/";
      break;
    case "06":
      car = "/JUN/";
      break;
    case "07":
      car = "/JUL/";
      break;
    case "08":
      car = "/AGT/";
      break;
    case "09":
      car = "/SEP/";
      break;
    case "10":
      car = "/OCT/";
      break;
    case "11":
      car = "/NOV/";
      break;
    case "12":
      car = "/DIC/";
      break;
    case "13":
      car = "/CONTROL/";
      break;
    case "14":
      car = "/CIE/";
      break;
  }
  return car;
}

function validarChecked(nombreCaja, dato) {
  switch (dato) {
    case "S":
      $(nombreCaja).prop("checked", true);
      break;
    case "N":
      $(nombreCaja).prop("checked", false);
      break;
  }
}

function datosEnvio() {
  var data =
    localStorage.getItem("Sesion").trim() +
    "|" +
    localStorage.getItem("Contab").trim() +
    "|" +
    carpetaTrabajo(localStorage.getItem("Mes").trim()) +
    "|";
  return data;
}

function moduloDatosEnvio() {
  var data = localStorage.getItem("Sesion").trim() + "|" + localStorage.getItem("Carpeta_modulo").trim() + "|";
  return data;
}

function urlDll(nomDll, modulo) {
  return "http://" + localStorage.IP_DATOS + "/MAIN-ELECT/" + "APP/" + modulo + "/" + nomDll + ".dll";
}

function LLAMADO_DLL(params) {
  datos_envio = localStorage.getItem("Sesion");
  datos_envio += "|";
  datos_envio += localStorage.getItem("Contab");
  datos_envio += "|";
  datos_envio += localStorage.getItem("Mes");
  params.dato = params.dato ? params.dato : undefined;
  // console.log(params.dato)
  if (params.dato !== undefined) {
    var array = params.dato;
    var limite = array.length;
    if (limite == 0) {
      datos_envio += "|";
      datos_envio += localStorage.Usuario;
      SolicitarDll({ datosh: datos_envio }, params.callback, urlDll(params.nombredll, params.carpeta));
    } else {
      for (i = 0; i < limite; i++) {
        datos_envio += "|";
        datos_envio += params.dato[i];
      }
      datos_envio += "|";
      datos_envio += localStorage.Usuario;
      SolicitarDll({ datosh: datos_envio }, params.callback, urlDll(params.nombredll, params.carpeta));
    }
    // }
    // else {
    //     console.debug(datos_envio);
    //     SolicitarDll({ datosh: datos_envio }, params.callback, urlDll(params.nombredll, params.carpeta));
  }
}

function calcular_edad(fecha) {
  var retornar = {
    vlr_edad: "",
    unid_edad: "",
  };
  if (!fecha || fecha == 0) {
    retornar.edad = 0;
  } else {
    var fechaNacimiento = moment(fecha, "YYYY-MM-DD"),
      dias = moment().diff(fechaNacimiento, "days");

    if (dias < 30) {
      retornar.vlr_edad = dias;
      retornar.edad = dias;
      retornar.unid_edad = "D";
    } else {
      if (dias < 365) {
        retornar.vlr_edad = moment().diff(fechaNacimiento, "months");
        retornar.unid_edad = "M";
      } else {
        retornar.vlr_edad = moment().diff(fechaNacimiento, "years");
        retornar.unid_edad = "A";
      }
    }
  }
  return retornar;
}

function normalizar(str) {
  let de = "ÁÃÀÄÂÉËÈÊÍÏÌÎÓÖÒÔÚÜÙÛÑÇáãàäâéëèêíïìîóöòôúüùûñçŦ¥ŧ¥=!°",
    a = "ÁAAAAEÉEEÍIIIÓOOOÚUUUÑCáaaaaéeeeíiiióoooúuuuñcÑÑññ¬\\ ",
    re = new RegExp("[" + de + "]", "ug");
  str = str.replace(/[^[A-Za-z0-9¬<>_{}|()[\]\\\/*!`.,:;_+?'¡¿@$%&#]\-/g, " ");
  return str.replace(re, (match) => a.charAt(de.indexOf(match)));
}

/*-- CONVIERTE EL NUMERO DE LA SECUENCIA  DE 3 DIGITOS A 2 DIGITOS--*/
function convertirSecuencia(consecutivo) {
  // CON910
  const generar_rango = (start, stop, step) =>
    Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + i * step);
  consecutivo = consecutivo.toString().padStart(3, "0");
  let secu_mov = "00";
  let serie_letras = generar_rango("A".charCodeAt(0), "Z".charCodeAt(0), 1).map((x) => String.fromCharCode(x));
  let serie_numeros = generar_rango(0, 9, 1);
  let serie_comb = [];

  if (consecutivo < 100) secu_mov = consecutivo;
  else {
    for (let i in serie_letras)
      serie_numeros.concat(serie_letras).map((val) => serie_comb.push(serie_letras[i].toString().concat(val)));
    secu_mov = serie_comb.find((x) => x === serie_comb[consecutivo >= 100 ? parseInt(consecutivo) - 100 : consecutivo]);
  }
  return secu_mov;
}

function validarJson(json) {
  // str => obj || 'undefined'
  var firstError = undefined;
  var parser = clarinet.parser();

  function makeError(e) {
    //Funcion retorno
    var currentNL = 0,
      nextNL = json.indexOf("\r\n"),
      line = 1;
    while (line < parser.line) {
      currentNL = nextNL;
      nextNL = json.indexOf("\r\n", currentNL + 1);
      ++line;
    }
    return {
      error: json.substr(currentNL + 1, nextNL - currentNL - 1),
      error_mensaje: (e.message || "").split("\r\n", 1)[0],
      linea: parseInt(parser.line) - 1 + 1,
    };
  }

  parser.onerror = function (e) {
    firstError = makeError(e);
    parser.close();
  };
  try {
    parser.write(json).close();
  } catch (e) {
    if (firstError === undefined) {
      return makeError(e);
    } else {
      return firstError;
    }
  }
  return firstError;
}

var _validarFecha = function (anio, mes, dia) {
  anio = parseInt(anio || 0);
  if (anio) {
    let date = new Date(anio, parseFloat(mes - 1), dia);
    if (date.getMonth() == parseFloat(mes - 1)) {
      return date.toISOString().slice(0, 10);
    }
  }
  return false;
};

const _getObjDate = function (strDate) {
  strDate = strDate || 0;
  let date = {
    anio: "",
    mes: "",
    dia: "",
  };

  let momentDate = moment(strDate, "YYYYMMDD");

  if (isFinite(strDate) && strDate.toString().length && parseInt(strDate) && momentDate.isValid()) {
    [date.anio, date.mes, date.dia] = momentDate.format("YYYY-MM-DD").split("-");
    return date;
  }
  // console.error("Fecha inválida");
  return date;
};

const _getObjTime = function (strTime) {
  strTime = strTime || 0;
  let time = {
    hora: "",
    minuto: "",
  };

  let momentTime = moment(strTime, "HHmm");

  if (isFinite(strTime) && strTime.toString().length && parseInt(strTime) && momentTime.isValid()) {
    [time.hora, time.minuto] = moment(strTime, "HHmm").format("HH:mm").split(":");
    return time;
  }
  // console.error("Hora inválida")
  return time;
};

const _getStrDate = function (objDate = {}) {
  return Object.values(objDate).join("").padStart(8, "0");
};

const _getStrTime = function (objTime = {}) {
  return Object.values(objTime).join("").padStart(4, "0");
};

const _validarBisiesto = (anio) => {
  return anio % 400 === 0 ? true : anio % 100 === 0 ? false : anio % 4 === 0;
};

function rutaLogos(data) {
  if (localStorage.Unidad == "S") return `D:\\SC\\newcobol\\LOGOS\\${data}.png`;
  else return `P:\\PROG\\LOGOS\\${data}.png`;
}

function rutaFirmas(data) {
  if (localStorage.Unidad == "S") return `D:\\SC\\newcobol\\HC\\DATOS\\${data}.png`;
  else return `P:\\PROG\\FIRMAS\\${data}.png`;
}

const _getValuesSave = (obj, filtro) => {
  let datos = {};

  Object.keys(obj).forEach((el) => {
    let tipo = typeof obj[el];
    if (tipo === "object") {
      if (filtro.indexOf(el) !== -1) {
        let filtro_data = obj[el];
        filtro_data.forEach((i, index) => {
          let name = el + (index + 1).toString().padStart(3, "0");
          let string = "";
          Object.keys(i).forEach((j) => {
            string += i[j] + "|";
          });
          datos[name] = string;
        });
      } else {
        if (obj[el] != null) {
          datos = Object.assign(datos, _getValuesSave(obj[el], filtro));
        }
      }
    } else if (tipo === "string" || tipo == "number") {
      if (!datos[el]) {
        let data_string = _reemplazoCaracEspGlobal(obj[el]);
        datos[el] = _reemplazoEnterXCaracGlobal(data_string);
      }
    }
  });

  return datos;
};

const _reemplazoCaracEspGlobal = (string) => {
  let tipo = typeof string;
  if (tipo == "string") string = string.replace(/[\!\*\]\[\}\{\"\'\&\t]/g, " ");
  return string || "";
};

const _reemplazoEnterXCaracGlobal = (string) => {
  let tipo = typeof string;
  if (tipo == "string") string = string.replace(/(\r\n|\n|\r)/gm, "&");
  return string || "";
};

const _getObjetoSave = (data, filtro = []) => {
  let obj = JSON.parse(JSON.stringify(data));
  let datos_env = _getValuesSave(obj, filtro);
  datos_env.datosh = datosEnvio() + localStorage.Usuario + "|";
  return datos_env;
};

function _getObjectDate(dato) {
  dato = dato.toString().padEnd(8, "0");

  return {
    ano_w: dato.slice(0, 4),
    mes_w: dato.slice(4, 6),
    dia_w: dato.slice(6),
  };
}

function _getObjectDate6(dato) {
  dato = dato.toString().padEnd(6, "0");
  console.log(dato, "DATO");

  let ano_ini = parseInt(dato.slice(0, 2)) > 0 ? "20" : "00";
  return {
    ano_w: `${ano_ini}${dato.slice(0, 2)}`,
    mes_w: dato.slice(2, 4),
    dia_w: dato.slice(4),
  };
}

function _getDataTable_bidi(reg, string, index) {
  return new Promise(async (resolve) => {
    let respuesta = _getObjetoSave(reg, string);

    let new_object = {};
    let slic = 0,
      longitud = 0;

    for (let i in respuesta) {
      longitud = i.length;
      slic = longitud - 3;
      if (i.slice(0, slic) == string) {
        new_object[`${i.slice(0, slic)}${index.toString().padStart(3, "0")}_${i.slice(slic, longitud)}`] = respuesta[i];
      }
    }

    resolve(new_object);
  });
}

const _format_num = (value) => {
  // formatea valor para calculos
  value = value || "";
  return parseFloat(value.toString().replace(/\,/g, "").replace(/\ /g, "")) || 0;
};

const stylesGlobal_imp = () => {
  return {
    center7Bold: {
      fontSize: 7,
      alignment: "center",
      bold: true,
    },
    left8: {
      fontSize: 8,
      alignment: "left",
    },
    center8: {
      fontSize: 8,
      alignment: "center",
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
      fillColor: "#D1DFF4",
      bold: true,
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
    center12Bold: {
      fontSize: 12,
      alignment: "center",
      bold: true,
    },
    center12BoldT: {
      fontSize: 12,
      alignment: "center",
      fillColor: "#D1DFF4",
      bold: true,
    },
  };
};

const unirPdfs_global = (arrayData, retornar, nomPdf) => {
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
