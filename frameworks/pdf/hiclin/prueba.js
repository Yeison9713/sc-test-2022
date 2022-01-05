/**
 * @develop  Pablo.O "pabloolguin@prosoft.com.co"
 * @author   SC-PROSOFT
 * @descrip  api consulta PDF facturas aprobadas por la DIAN segun emisor; 'EKOMERCIO'
 * @date     03/10/2020 CREACION
 * @date     19/10/2020 AJUSTES
 */

const params = process.argv[2].split("|");

const fs = require("file-system");

const qs = require("qs");
const axios = require("axios");
const path = require("path");
const { exec } = require("child_process");
const xml2js = require("xml2js");
const parser = new xml2js.Parser({ attrkey: "ATTR" });
const PDFMerger = require("pdf-merger-js");
var opn = require("opn");

var merger = new PDFMerger();
var arrayPDF = new Array();
var arrayCufes = new Array();
var cufe = "";

const get_datajson = (filename) => {
  console.log("\nLEYENDO CUFES FACTURAS ENVIADAS...\n");
  var [dataJson, nit] = ["", ""];
  return new Promise(function (resolve, reject) {
    fs.readFile(filename, { encoding: "utf8" }, function (err, data) {
      dataJson = JSON.parse(data);

      if (err) return err;
      for (const [key, value] of Object.entries(dataJson)) {
        dataJson = value;
        nit = key;
      }
      dataJson.pop();
      resolve({ data: dataJson, nit: nit });
    });
  });
};

async function get_PDF(dataJson, nit) {
  var data = dataJson;
  var prueba = params[1];

  cufe = data["CUFE"];
  arrayCufes.push(cufe);

  const servicio =
    prueba == "true"
      ? "https://fevpgentestpro.ekomercio.com/WSCFDIBuilderPlusColombia/WSCFDBuilderPlus.asmx/generaPDF_Envio"
      : "https://fevpprosoftprod.ekomercio.com/WSCFDIBuilderPlusColombia/WSCFDBuilderPlus.asmx/generaPDF_Envio";

  console.log("tipo de consulta: ", prueba ? "[ Prueba ]" : "[ Producción ]");

  var time = "";

  const options = {
    method: "POST",
    data: qs.stringify({
      usuario: "ekomercio",
      password: "aserri",
      rfcEmisor: parseInt(nit),
      uuid: cufe,
    }),
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      Expires: 200,
      "cache-control": "no-cache",
    },
    url: servicio,
    validateStatus: function (status) {
      return status != 500 || status != 400; // Resolve solo si statusCode !=500
    },
  };
  console.log("Enviando peticion a:  ", options.url, "EKOMERCIO\n");
  console.log("Esperando respuesta del recurso (P D F)...\n");
  console.time(time);

  const peticion = axios(options)
    .then((result) => {
      console.log("La peticion ha finalizado en");
      console.timeEnd(time, "\n");
      console.log("¡La petición se ha resuelto con éxito!\n");
      const res = respuesta_server(result);
      return res;
    })
    .catch((err) => {
      console.log(err);
    });

  return peticion;
}

function get_respuestaXML(res, indice) {
  parser.parseString(res["data"], function (error, response) {
    if (error === null) {
      var texto = JSON.stringify(response);
      texto = texto.replace(/_/g, "TEXTO");
      const parseJSON = JSON.parse(texto);
      arrayPDF.push(parseJSON["string"]["TEXTO"]);
    } else console.log("error al consultar PDF:   ", error);
  });
}

function mergePDF(pdf) {
  const buff = new Buffer.from(pdf);
  merger.add(buff, null);
}

(async function () {
  inicializarEventos();
  const filename = params[0];

  console.log("json", filename);

  const res = await get_datajson(filename);
  let dataJson = res.data;
  dataJson.length = 10;
  const filtro_datajson = dataJson.filter(
    (json) => json.CUFE.indexOf("ERROR") == -1
  );
  const filtro_errorjson = dataJson.filter(
    (json) => json.CUFE.indexOf("ERROR") != -1
  );

  let facturasAProcesar = filtro_datajson.map((m) => m["NRO_FACT"]);
  let facturasErradas = filtro_errorjson.map((m) => m["NRO_FACT"]);

  console.log(
    "Facturas que no pueden ser consultadas:\n[",
    facturasErradas.join(",") || 0 + " ]\n"
  );
  console.log(
    "Facturas que pueden ser consultadas:\n[",
    facturasAProcesar.join(", ") + " ]\n"
  );

  const date = new Date();
  var nombre = path.join(filename, "..");
  nombre +=
    "\\" +
    date
      .getFullYear()
      .toString()
      .concat(
        parseInt(date.getMonth()) + 1,
        date.getDate().toString().padStart(2, "0"),
        date.getHours(),
        date.getMinutes(),
        date.getSeconds(),
        ".pdf"
      );

  console.log("Iterando CUFES facturas enviadas\n");

  let jsonRecortado = filtro_datajson.chunk(20);
  var restantes = filtro_datajson.length;

  for (let arrayRecorte of jsonRecortado) {
    restantes -= arrayRecorte.length;
    console.log(
      `Enviando lote de ${arrayRecorte.length} facturas; Restantes: [${restantes}]`
    );
    await enviarPeticionXLotes(res.nit, arrayRecorte);
  }

  console.log(`UNIENDO FACTURAS EN .PDF...\n`);
  restantes = arrayPDF.length;
  let idx = 0;
  for (var factura of arrayPDF) {
    restantes -= arrayPDF - parseInt(idx) + 1;
    console.log(
      `Uniendo ${parseInt(idx) + 1} facturas, quedan por unir: [${restantes}]`
    );
    idx++;
    var buff = new Buffer.from(factura, "base64");
    mergePDF(buff);
  }

  console.log(`PDF creado con exito`);

  await merger.save(nombre);
  await abrir_PDF(nombre);
})();

const respuesta_server = (obj) => {
  var simpleObject = {};
  for (var prop in obj) {
    if (!obj.hasOwnProperty(prop)) {
      continue;
    }
    if (typeof obj[prop] == "object") {
      continue;
    }
    if (typeof obj[prop] == "function") {
      continue;
    }
    simpleObject[prop] = obj[prop];
  }
  return simpleObject;
};

async function abrir_PDF(dir) {
  await opn(dir, { app: ["chrome"] });
}

function inicializarEventos() {
  Object.defineProperty(Array.prototype, "chunk", {
    value: function (chunkSize) {
      var array = this;
      return [].concat.apply(
        [],
        array.map(function (elem, i) {
          return i % chunkSize ? [] : [array.slice(i, i + chunkSize)];
        })
      );
    },
  });
}

async function enviarPeticionXLotes(nit, jsonRecortado) {
  let i = 0;
  for (let facturaConsultada of jsonRecortado) {
    console.log(
      `*CUFE [${parseInt(i) + 1}] de ${jsonRecortado.length} , FACTURA [${
        facturaConsultada.NRO_FACT
      }]`
    );
    const res_p = await get_PDF(facturaConsultada, nit);
    if (res_p.statusText == "OK") get_respuestaXML(res_p, i);
    i++;
  }
}
