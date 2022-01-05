/** @format */

'use strict';
/**
 * @develop Pablo.O "pabloolguin@prosoft.com.co"
 * @author   SC-PROSOFT
 * @descrip  api facturacion electronica 'EKOM','EMIS','FACS'; version ELECTRON
 * @date     02/10/2020 CREACION
 * @date     14/10/2020 CORRECIONES
 * @date     13/11/2020 AJUSTE FILTRO FE_NTC
 * @date     13/11/2020 ACTUALIZACION VERSION
 */

const xml2js = require('xml2js');
const parser = new xml2js.Parser({ attrkey: 'ATTR' });
const { exec } = require('child_process');
const { request } = require('http');
const axios = require('axios');
const qs = require('qs');
const fs = require('fs');

var id_fact = null;
var facturas_data = null;
var facturas_procesadas = null;
var facturas_logs = null;
var ruta_json = null;
var req = null;
var tiempoTotal = 0;
var ntc = null;
var sal = null;
var directorio = null;
var res_DIAN = null;
var dataFact = null;

var merger = null;
var arrayPDF = null;
var arrayCufes = null;
class _req_FACT {
  constructor(params) {
    this.tipo_ser = params.prueba ? true : false; //true => prueba || false => produccion
    this.servicio = params.servicio || null;
    this.tipo_empresa = params.tipo_empresa || $_USUA_GLOBAL[0]['TIPO_EMPRE'];
    this.sucursal = params.sucursal || $_USUA_GLOBAL[0]['MENU_SUC'];
    this.dirContab = params.dirContab || null;
    this.dataJson = params.dataJson || new Array();
    this.unidad = params.unidad || null;
    this.proveedor = params.proveedor || 4;
  }
  async crearDirectorios() {
    // Crear directorios
    var dir = directorio;
    //console.log('Validando directorios: ', path.join(req.unidad + ':', 'EXPORTAR', $_USUA_GLOBAL[0].NIT.toString()), '\n');
    await createDir(dir);
    //console.log('Validando directorios: ', path.join(dir, 'LOG'), '\n');
    await createDir(path.join(dir, 'LOG'));
    //console.log('Validando directorios : ', path.join(dir, 'GENERADOS'), '\n');
    await createDir(path.join(dir, 'GENERADOS'));
  }

  async get_dataJson(data) {
    var arrayData = [],
      textoPlano_XML = '',
      respuesta_json = [],
      proveedor = this.proveedor;

    arrayData.push(data);
    const tamArray_data = arrayData.length;
    if (tamArray_data > 0 || typeof arrayData != 'undefined') {
      switch (parseInt(proveedor)) {
        case 4: //EKOMERCIO
          // Crear directorios
          arrayData = '';
          arrayData = data;
          req.crearDirectorios(directorio);
          for (var i in arrayData) {
            id_fact = i;
            textoPlano_XML = await req.set_dataJson(arrayData[i]);
            const nro_fact = arrayData[i]['EKO']['CABECERA'].split('~')[1].split('|')[0].padStart(6, '0');

            let splitText = await textoPlano_XML.split('|');

            directorio = directorio.trim();

            const data_fact = await req.set_request({ PLANO: textoPlano_XML, DIR: directorio });

            facturas_data.push(data_fact);
            toastr.info(
              `Enviando factura: ${splitText[26].concat(nro_fact)}`,
              `Envia: ${splitText[1]} Recibe: ${splitText[41]} `,
            );
            dataFact = { Envia: splitText[1], Recibe: splitText[41] };
            const response = await req.send_request(data_fact);
            res_DIAN = response;

            let response_xml = await req.parseXML_json(response);

            const response_body =
              response_xml['Envelope']['Body'][0]['procesarTextoPlanoResponse'][0]['procesarTextoPlanoResult'][0];

            const error = Object.keys(response_body).includes('Error');
            if (!error) {
              const response_xml = await req.parseXML_json(response);

              let response_body =
                response_xml['Envelope']['Body'][0]['procesarTextoPlanoResponse'][0]['procesarTextoPlanoResult'][0];
              let dian_res = response_body['AttachedDocument'][0]['ParentDocumentLineReference'][0]['DocumentReference'][0];
              dian_res = dian_res['Attachment'][0]['ExternalReference'][0]['Description'][0];
              response_body =
                response_xml['Envelope']['Body'][0]['procesarTextoPlanoResponse'][0]['procesarTextoPlanoResult'][0];

              response_body = {
                Date: response_body['AttachedDocument'][0]['IssueDate'][0],
                Time: response_body['AttachedDocument'][0]['IssueTime'][0],
                Envia: {
                  Nit: response_body['AttachedDocument'][0]['ReceiverParty'][0]['PartyTaxScheme'][0]['CompanyID'][0]['CODE'],
                  Nombre:
                    response_body['AttachedDocument'][0]['ReceiverParty'][0]['PartyTaxScheme'][0]['RegistrationName'][0],
                },
                Recibe: {
                  Nit: response_body['AttachedDocument'][0]['SenderParty'][0]['PartyTaxScheme'][0]['CompanyID'][0]['CODE'],
                  Nombre: response_body['AttachedDocument'][0]['SenderParty'][0]['PartyTaxScheme'][0]['RegistrationName'][0],
                },
              };
              let parseXmlDian = await req.parseXML_json(dian_res);
              parseXmlDian = parseXmlDian['ApplicationResponse']['DocumentResponse'][0];

              let lineResponse = parseXmlDian['LineResponse'];
              lineResponse = lineResponse.map(
                (line) => `${line.Response[0].ResponseCode[0]} | ${line.Response[0].Description[0]}`,
              );

              const responseData = {
                ...response_body,
                Cufe: parseXmlDian['DocumentReference'][0]['UUID'][0]['CODE'],
                Estado:
                  parseXmlDian['Response'][0]['ResponseCode'][0] == '02'
                    ? '00|VALIDADO POR LA DIAN'
                    : 'RECHAZADO POR LA DIAN',
                respuesta: parseXmlDian['Response'][0]['ResponseCode'][0] == '02' ? 'APROBADA' : lineResponse,
              };
              console.log({ response: responseData });
              toastr.success('CUFE:  ' + responseData['Cufe'] + '\n\n' + 'ESTADO:  ' + responseData['respuesta']);

              const json_body = JSON.stringify(responseData, function (key, value) {
                if (typeof value === 'function') return undefined;
                return value;
              });

              facturas_procesadas.push({
                factura: data_fact.ID,
                body: json_body,
                estado: null,
                errores: null,
                advertencias: null,
              });
              respuesta_json = req.dataFactura_LOGS();
            } else {
              let errores = response_body['Error'];
              let data_errores = [];

              for (const i in errores) {
                const code = errores[i]['ErrorCode'][0];

                const mensaje_error = [
                  errores[0]['ErrorMessage'][0].split('.')[0],
                  errores[0]['ErrorMessage'][0].split('.')[1],
                  errores[0]['ErrorMessage'][0].split('.')[2],
                ];

                const date_error = errores[0]['ErrorDateTime'][0];
                data_errores.push({ COD_ERROR: code, ERROR: mensaje_error, DATE: date_error });
              }
              toastr.error(`Error al enviar Factura`);
              console.error({ errores: data_errores });

              const json_body = {
                Date: moment().format('YYYY/MM/DD'),
                Time: new Date().getTime(),
                Envia: dataFact.Envia,
                Recibe: dataFact.Recibe,
                Cufe: '',
                Respuesta: data_errores,
              };
              let body = JSON.stringify(json_body, function (key, value) {
                if (typeof value === 'function') return undefined;
                return value;
              });
              facturas_procesadas.push({
                factura: data_fact.ID,
                body: body,
                estado: null,
                errores: null,
                advertencias: null,
              });
              respuesta_json = req.dataFactura_LOGS();
            }
          }
          break;
        case 1: //FACSE
          req.crearDirectorios(directorio);

          for (var i in arrayData) {
            id_fact = i;
            const data_fact = arrayData[i];
            const nro_fact = data_fact['Comprobante']['Prefijo'].concat(
              data_fact['Comprobante']['Numero'].toString().trim().padStart(6, '0'),
            );

            toastr.success(
              `Enviando factura: ${data_fact['Comprobante']['Numero'].toString().padStart(6, '0')} Envia: ${
                data_fact['Emisor']['RazonSocial']
              } Recibe: ${data_fact['Receptor']['RazonSocial']} `,
            );

            facturas_data[id_fact] = {
              NRO: nro_fact,
              ENVIA: { NIT: data_fact['Emisor']['Identificacion'], NOMBRE: data_fact['Emisor']['RazonSocial'] },
              RECIBE: { NIT: data_fact['Receptor']['Identificacion'], NOMBRE: data_fact['Receptor']['RazonSocial'] },
              DIR: directorio,
              ID: data_fact['Comprobante']['Numero'].toString().padStart(6, '0'),
              PREFIJO: data_fact['Comprobante']['Prefijo'],
            };

            const response = await req.send_request({ data: data_fact, dir: directorio });

            const parseBody = {
              RespuestaFacse: response['data']['RespuestaFacse'],
              IdDocumento: response['data']['IdDocumento'],
              CufeDocumento: response['data']['CufeDocumento'],
            };

            facturas_procesadas.push({
              factura: facturas_data[id_fact].ID,
              body: parseBody,
              estado: null,
              errores: null,
              advertencias: null,
            });

            respuesta_json = req.dataFactura_LOGS();
          }
          break;
        case 5: //EMISION
          req.crearDirectorios(directorio);
          arrayData = arrayData[0];
          for (var i in arrayData) {
            id_fact = i;
            const data_fact = arrayData[i];
            const nit_envia = directorio.split('\\')[2].padStart(10, '0');

            const pref = data_fact['number'].toString().trim().padStart(6, '0');
            const nro_fact = pref;

            toastr.success(
              `Enviando factura: ${data_fact['number'].toString().trim().padStart(6, '0')} Envia: ${nit_envia} Recibe: ${
                data_fact['customer']['name']
              } `,
            );

            facturas_data[id_fact] = {
              NRO: nro_fact,
              ENVIA: nit_envia,
              RECIBE: { NIT: data_fact['customer']['identification_number'], NOMBRE: data_fact['customer']['name'] },
              DIR: directorio,
              ID: data_fact['number'].toString().trim().padStart(6, '0'),
              PREFIJO: data_fact['prefix'],
            };

            const response = await req.send_request({ data: data_fact, dir: directorio });

            if (response.status == 401) {
              toastr.info(
                req.prueba
                  ? 'El TOKEN usado no corresponde al tipo de servicio de la petición: envio_prueba\n'
                  : 'El TOKEN usado no corresponde al tipo de servicio de la petición: envio_produccion\n',
              );
            } else {
              toastr.info(
                req.prueba
                  ? 'El TOKEN usado no corresponde al tipo de servicio de la petición: envio_prueba\n'
                  : 'El TOKEN usado no corresponde al tipo de servicio de la petición: envio_produccion\n',
              );
              const json_body = response['data'];

              facturas_procesadas.push({
                factura: facturas_data[id_fact].ID,
                body: json_body,
                respuesta: '',
                advertencias: null,
              });

              respuesta_json = req.dataFactura_LOGS();
            }
          }
          break;
        default:
          break;
      }
    }
  }
  async procesarRespuesta(resJsonResponse, indice, date) {
    resJsonResponse = JSON.parse(resJsonResponse);
    const cufe = resJsonResponse.Cufe;
    const respuesta = resJsonResponse.Respuesta;
    /**********FACTURA RECHAZADA***********/
    if (cufe == '') {
      dataJson = {
        FACTURA: facturas_data[indice].NRO,
        ID: facturas_data[indice].ID,
        ENVIA: facturas_data[indice].ENVIA,
        RECIBE: facturas_data[indice].RECIBE,
        CUFE: '',
        ESTADO_ENVIO: '01|RECHAZADA POR LA DIAN',
        HORA: date.hora.toString(),
        FECHA: date.fecha.toString(),
        RESPUESTA: respuesta,
        PROVEEDOR: 'EKOMERCIO',
      };
    } else {
      /**********FACTURA APROBADA***********/
      const dirDelete = facturas_data[indice]['DIR'] + '\\' + 'GENERADOS\\' + facturas_data[indice]['ID'] + '.txt';
      fs.unlink(dirDelete, function (err) {
        if (err) throw err;
      });
      dataJson = {
        FACTURA: facturas_data[indice].NRO,
        ID: facturas_data[indice].ID,
        ENVIA: facturas_data[indice].ENVIA,
        RECIBE: facturas_data[indice].RECIBE,
        CUFE: cufe,
        ESTADO_ENVIO: '00|APROBADA POR LA DIAN',
        HORA: date.hora.toString(),
        FECHA: date.fecha.toString(),
        RESPUESTA: 'CORRECTO',
        PROVEEDOR: 'EKOMERCIO',
      };
    }
    return dataJson;
  }
  async crearLogs_Fact(dataFact, indice) {
    let dateTime = new Date(),
      dataLog = '',
      dataJson = new Object();

    const mes = (parseInt(dateTime.getMonth()) + 1).toString();
    const hora = dateTime.getHours().toString().padStart(2, '0') + ':' + dateTime.getMinutes().toString().padStart(2, '0');
    const fecha =
      dateTime.getDate().toString().padStart(2, '0') + '-' + mes.padStart(2, '0') + '-' + dateTime.getFullYear().toString();

    const nombre = fecha.replace(/\-/g, '');
    var dir = path.join(directorio);

    switch (parseInt(req.proveedor)) {
      case 1: //FACSE
        var resData = dataFact.body;
        var rutalog = path.join(dir, 'LOG', `${nombre}.txt`);

        ruta_json = path.join(dir, `${nombre}.json`);

        const mensaje = {
          respuesta: resData['RespuestaFacse'],
          cufe: [resData['CufeDocumento']['Respuesta'], resData['CufeDocumento']['Contenido']],
        };

        if (!req.nota_credito || mensaje.cufe[0] != true) {
          //  FACTURA RECHAZADA
          var errores = mensaje.respuesta;
          dataJson = {
            FACTURA: facturas_procesadas[indice].FACTURA,
            ID: facturas_data[indice].ID,
            ENVIA: facturas_data[indice].ENVIA,
            RECIBE: facturas_data[indice].RECIBE,
            CUFE: '',
            ESTADO_ENVIO: '01|RECHAZADA POR LA DIAN',
            HORA: hora.toString(),
            FECHA: fecha.toString(),
            RESPUESTA: mensaje.respuesta,
            PROVEEDOR: 'FACSE',
          };
        } else {
          //  FACTURA APROBADA

          dataJson = {
            FACTURA: facturas_procesadas[indice].FACTURA,
            ID: facturas_data[indice].ID,
            ENVIA: facturas_data[indice].ENVIA,
            RECIBE: facturas_data[indice].RECIBE,
            CUFE: mensaje.cufe[1],
            ESTADO_ENVIO: '00|APROBADA POR LA DIAN',
            RESPUESTA: mensaje.respuesta,
            HORA: hora.toString(),
            FECHA: fecha.toString(),
            PROVEEDOR: 'FACSE',
          };
        }
        facturas_logs.push(dataJson);
        if (!req.nota_credito && mensaje.cufe['Respuesta'] == true) {
          if (req.contabilidad == null) {
            dataLog += facturas_data[indice].PREFIJO + '|';
            dataLog += facturas_data[indice].NRO + '|';
            dataLog += dateTime.getDate().toString() + '|';
            dataLog += mes.padStart(2, '0') + '|';
            dataLog += dateTime.getFullYear().toString() + '|';
            dataLog += facturas_logs[indice]['CUFE'] + '|';
            dataLog += dateTime.getHours().toString().padStart(2, '0') + ':';
            dataLog += dateTime.getMinutes().toString().padStart(2, '0');

            const data_plano = dataLog + '|\n';

            req.crearTxt_LOGS({
              id: indice,
              ruta: rutalog,
              plano: data_plano,
              cufe: facturas_logs[indice]['CUFE'],
            });
          } else {
            dataLog += contabilidad + '|';
            dataLog += req.sucursal + '|';
            dataLog += facturas_data[indice]['NRO'] + '|';
            dataLog += facturas_logs[indice]['CUFE'] + '|';
            const data_plano = dataLog + '\n';

            req.crearTxt_LOGS({
              id: indice,
              ruta: rutalog,
              plano: data_plano,
              cufe: facturas_logs[indice]['CUFE'],
            });
          }
        }

        break;
      case 4: //EKOMERCIO
        let res_XML = dataFact.body;
        var rutalog = path.join(dir, 'LOG', `${nombre}.txt`);
        var contabilidad = req.contabilidad;
        ruta_json = rutalog.replace('.txt', '.json');
        dataJson = await req.procesarRespuesta(res_XML, indice, { hora: hora, fecha: fecha });
        facturas_logs.push(dataJson);

        break;

      case 5: // EMISION
        var resData = dataFact.body;
        var rutalog = path.join(dir, 'LOG', `${nombre}.txt`);

        var contabilidad = req.contabilidad;

        ruta_json = rutalog.replace('.txt', '.json');

        if (resData['status'] == 'error') {
          //  FACTURA RECHAZADA
          var errores = resData['document'];
          errores = { CODE: errores['statusCode'], MESSAGE: errores['errors'] };
          dataJson = {
            FACTURA: facturas_data[indice].NRO,
            ID: facturas_data[indice].ID,
            ENVIA: facturas_data[indice].ENVIA,
            RECIBE: facturas_data[indice].RECIBE,
            CUFE: '',
            ESTADO_ENVIO: '01|RECHAZADA POR LA DIAN',
            RESPUESTA: errores,
            HORA: hora.toString(),
            FECHA: fecha.toString(),
            PROVEEDOR: 'EMISION',
          };

          if (errores['MESSAGE'][0].indexOf('Regla: 90') != -1 && !req.nota_credito) {
            if (req.contabilidad == null) {
              dataLog += facturas_data[indice].PREFIJO + '|';
              dataLog += facturas_data[indice].NRO + '|';
              dataLog += dateTime.getDate().toString() + '|';
              dataLog += mes.padStart(2, '0') + '|';
              dataLog += dateTime.getFullYear().toString() + '|';
              dataLog += errores['MESSAGE'][0].split("'")[1] + '|';
              dataLog += dateTime.getHours().toString().padStart(2, '0') + ':';
              dataLog += dateTime.getMinutes().toString().padStart(2, '0');

              const data_plano = dataLog + '|\n';
              req.crearTxt_LOGS({
                id: indice,
                ruta: rutalog,
                plano: data_plano,
                cufe: errores['MESSAGE'][0].split("'")[1],
              });
            } else {
              dataLog += contabilidad + '|';
              dataLog += req.sucursal + '|';
              dataLog += facturas_data[indice]['NRO'] + '|';
              dataLog += errores['MESSAGE'][0].split("'")[1] + '|';

              const data_plano = dataLog + '\n';
              req.crearTxt_LOGS({
                id: indice,
                ruta: rutalog,
                plano: data_plano,
                cufe: errores['MESSAGE'][0].split("'")[1],
              });
            }
          }
        } else {
          //  FACTURA APROBADA
          var warnings = resData['document'];
          warnings = { CODE: errores['statusCode'], MESSAGE: [errores['errors'], errores['detailedErrors']] };

          dataJson = {
            FACTURA: facturas_data[indice].NRO,
            ID: facturas_data[indice].ID,
            ENVIA: facturas_data[indice].ENVIA,
            RECIBE: facturas_data[indice].RECIBE,
            CUFE: resData['document']['uuid'],
            ESTADO_ENVIO: '01|APROBADA POR LA DIAN',
            RESPUESTA: warnings,
            HORA: hora.toString(),
            FECHA: fecha.toString(),
            PROVEEDOR: 'EMISION',
          };
          if (req.contabilidad == null) {
            if (!req.nota_credito) {
              dataLog += facturas_data[indice].PREFIJO + '|';
              dataLog += facturas_data[indice].NRO + '|';
              dataLog += dateTime.getDate().toString() + '|';
              dataLog += mes.padStart(2, '0') + '|';
              dataLog += dateTime.getFullYear().toString() + '|';
              dataLog += facturas_logs[indice]['CUFE'] + '|';
              dataLog += dateTime.getHours().toString().padStart(2, '0') + ':';
              dataLog += dateTime.getMinutes().toString().padStart(2, '0');

              const data_plano = dataLog + '|\n';
              req.crearTxt_LOGS({
                id: indice,
                ruta: rutalog,
                plano: data_plano,
                cufe: facturas_logs[indice]['CUFE'],
              });
            }
          } else {
            if (!req.nota_credito) {
              dataLog += contabilidad + '|';
              dataLog += req.sucursal + '|';
              dataLog += facturas_data[indice]['NRO'] + '|';
              dataLog += facturas_logs[indice]['CUFE'] + '|';

              const data_plano = dataLog + '\n';
              req.crearTxt_LOGS({
                id: indice,
                ruta: rutalog,
                plano: data_plano,
                cufe: facturas_logs[indice]['CUFE'],
              });
            }
          }
        }
        facturas_logs.push(dataJson);
        break;

      default:
        break;
    }
  }

  async dataFactura_LOGS() {
    let i = 0;
    for (i in facturas_procesadas) {
      await req.crearLogs_Fact(facturas_procesadas[i], i);
    }

    await req.crearJson_LOGS();
  }

  crearTxt_LOGS(data) {
    var ruta = data.ruta,
      plano = data.plano,
      cufe = data.cufe,
      indice = data.id;

    fs.readFile(ruta.toString(), { encoding: 'binary' }, async (err, data) => {
      if (err) {
        fs.writeFile(ruta.toString(), plano, 'utf8', (err) => {
          if (err) throw console.log(err, 'error al escribir plano Log factura');
          if (!sal) req.guardarCufe();
        });
      } else {
        const texto = data.indexOf(cufe);
        if (texto == -1) {
          fs.appendFile(ruta.toString(), plano, 'utf8', (err) => {
            if (err) throw console.log(err, 'error al escribir plano Log factura');
            console.log('el LOG de la factura: ' + facturas_data[indice].NRO + ' ha sido agregado');
            if (!sal) req.guardarCufe();
          });
        } else {
          fs.writeFile(ruta.toString(), plano, 'utf8', (err) => {
            if (err) throw console.log(err, 'error al escribir plano Log factura');
            console.log('el LOG de la factura: ' + facturas_data[indice].NRO + ' ha sido agregado');
            if (!sal) req.guardarCufe();
          });
        }
      }
    });
    var xml = res_DIAN.split('>');
    xml.shift();
    xml.shift();
    xml.shift();
    xml = xml.join('>');
    xml = xml.replace(/[\r\n]+/g, '\n');
    fs.writeFile(
      path.join(facturas_data[id_fact].DIR, 'LOG', facturas_data[id_fact].ID + `DIAN.xml`),
      xml,
      'utf8',
      (err) => {
        if (err) throw console.log(err, 'error al escribir XML Log factura');
      },
    );
  }
  guardarCufe() {
    let ruta_txt = ruta_json.replace('.json', '.txt');

    const unidad = req.unidad.toUpperCase();
    const cont = req.contabilidad;
    const modulo = req.modulo; // INV | HOT

    if (!ntc) {
      if (cont != null) {
        if (unidad == 'S' || unidad == 'D') {
          let ruta_ejecutable = 'S:\\RMCOBOL\\CUFE.bat';
          let ruta_txt = ruta_json.replace('.json', '.txt');

          fs.readFile(ruta_txt, { encoding: 'utf8' }, async (err, data) => {
            if (!err) {
              ruta_ejecutable = `${ruta_ejecutable} "${ruta_txt.concat('|', modulo).padEnd(100, '*')}"`;
              req.abrirArchivos_LOGS(null, ruta_ejecutable);
            }
          });
        } else {
          let ruta_ejecutable = 'P:\\PWCOBOL\\CUFE.exe ';

          fs.readFile(ruta_txt, { encoding: 'utf8' }, async (err, data) => {
            if (!err) {
              ruta_ejecutable = `${ruta_ejecutable} "${ruta_txt}"`;
              req.abrirArchivos_LOGS(ruta_ejecutable);
            }
          });
        }
      } else {
        let ruta_ejecutable = 'S:\\RMCOBOL\\CUFE.bat';
        let ruta_txt = ruta_json.replace('.json', '.txt');

        fs.readFile(ruta_txt, { encoding: 'utf8' }, async (err, data) => {
          if (!err) {
            ruta_ejecutable = `${ruta_ejecutable} "${ruta_txt.concat('|', modulo).padEnd(100, '*')}"`;
            req.abrirArchivos_LOGS(null, ruta_ejecutable);
          }
        });
      }
    }
  }
  async crearExcel_LOGS(logs_json) {
    var dir_XLS = (dir_XLS = ruta_json.replace('.json', '.xlsx'));
    var array_logs = logs_json['LOGS_FACTURAS'];
    var logs = [];

    const workbook = new Excel.Workbook();
    const worksheet = workbook.addWorksheet('FACTURAS PROCESADAS');
    let j = 0;
    for (let i in array_logs) {
      logs.push({
        ID: parseInt(i) + 1,
        PROVEEDOR: array_logs[i]['PROVEEDOR'],
        FACTURA: array_logs[i]['ID'],
        FECHA: array_logs[i]['FECHA'],
        HORA: array_logs[i]['HORA'],
        ENVIA: array_logs[i]['ENVIA'].NIT ? array_logs[i]['ENVIA'].NIT : array_logs[i]['ENVIA'],
        RECIBE: array_logs[i]['RECIBE'].NIT ? array_logs[i]['RECIBE'].NIT : array_logs[i]['ENVIA'],
        CUFE: typeof array_logs[i]['CUFE'] != 'string' ? array_logs[i]['CUFE']['CODE'] : array_logs[i]['CUFE'],

        ESTADO: array_logs[i]['ESTADO_ENVIO'],
        RESPUESTA: array_logs[i]['RESPUESTA'],
      });
    }

    var filas = [],
      columnas = [];
    columnas = [
      { header: 'ID', key: 'id', width: 3 },
      { header: 'PROVEEDOR', key: 'proveedor', width: 12 },
      { header: 'FACTURA', key: 'factura', width: 12 },
      { header: 'FECHA', key: 'fecha', width: 12 },
      { header: 'HORA', key: 'hora', width: 7 },
      { header: 'ENVIA', key: 'envia', width: 12 },
      { header: 'RECIBE', key: 'recibe', width: 12 },
      { header: 'CUFE', key: 'cufe', width: 102 },
      { header: 'ESTADO', key: 'estado', width: 28 },
      { header: 'RESPUESTA', key: 'respuesta', width: 50 },
    ];

    for (j in logs) filas[j] = Object.values(logs[j]);
    worksheet.columns = columnas;
    worksheet.addRows(filas);

    // save workbook to disk
    workbook.xlsx.writeFile(path.join(dir_XLS)).catch((err) => {
      req.cerrarProcesosArchivos('excel');
    });
  }

  async abrirArchivos_LOGS(dir, params) {
    if (params) {
      const exe = require('child_process').exec;
      exe(params, function (err, data) {
        if (
          err //console.log('Error ejecutando bat: \n\n' + err);
        );
        else process.exit();
      });
    } else await exec(dir);
  }

  cerrarProcesosArchivos(tipo) {
    var instruccion = '';
    switch (tipo) {
      case 'excel':
        instruccion = 'taskkill /f /im excel.exe';
        break;
      default:
        break;
    }

    var comando = exec(instruccion);

    comando.stdout.on('data', function (datos) {
      //console.log(datos.toString());
    });
  }

  async crearJson_LOGS() {
    let jsonLogs = [];

    const dirJSON = ruta_json;
    let array_logs = facturas_logs;

    fs.readFile(dirJSON, function (err, data) {
      if (err) {
        let logs = { LOGS_FACTURAS: array_logs };
        jsonLogs = logs;
        fs.writeFile(path.join(dirJSON), `${JSON.stringify(jsonLogs, undefined, 2)}`, 'utf8', (err) => {
          if (err) throw console.log(err, 'error al escribir JSON Log factura');
        });
        req.crearExcel_LOGS(jsonLogs);
      } else {
        const datos = data.toString('utf8');
        let logs = JSON.parse(datos.replace(/\n/, ' '));

        logs = logs['LOGS_FACTURAS'];
        logs = { LOGS_FACTURAS: logs };

        for (let i in array_logs) {
          logs['LOGS_FACTURAS'].push(array_logs[i]);
        }
        jsonLogs = logs;
        let jsonLogsText = JSON.stringify(jsonLogs, undefined, 2);

        fs.writeFile(dirJSON, `${jsonLogsText}`, 'utf8', (err) => {
          if (err) throw console.log(err, 'error al escribir JSON Log factura');
        });
        req.crearExcel_LOGS(jsonLogs);
      }
    });
  }
  validar_JSON(json) {
    validarJson(json);
  }
}

class _req_EKOMERCIO extends _req_FACT {
  constructor(params) {
    super(params);
    (this.url = {
      url_prueba: 'https://fevpgentestpro.ekomercio.com/WSCFDIBuilderPlusColombia/WSCFDBuilderPlus.asmx',
      url_produccion: 'https://fevpprosoftprod.ekomercio.com/WSCFDIBuilderPlusColombia/WSCFDBuilderPlus.asmx',
    }),
      (this.unidad = params.unidad);
    this.modulo = params.modulo;
  }

  manejadorErrores_PROVEEDOR(code) {
    var msj = '';
    switch (code) {
      case 'AttachedDocument':
        msj = 'la factura esta en un estado neutro y no ha podido ser procesada por la DIAN\n';
        msj += '\nerror EKOMERCIO, comuniquese con un asesor';
        break;
      default:
        break;
    }
    return msj;
  }

  async set_dataJson(obj) {
    let stringRest = '';
    let str_cabecera = '';
    let cabecera = obj.EKO['CABECERA']
      .split('|')
      .map((e) => {
        let cabecera = [];
        let item = e;
        if (e.indexOf('R-99-PN') != -1) item = item.trim();
        cabecera.push(item.replace(/\?/g, ' '));
        return cabecera;
      })
      .join('|');
    let detalles = obj.DETALLES;
    detalles.length >= 1 ? detalles.pop() : false;

    let impuestos = obj.TOTALES['IMPUESTOS']
      .split('|')
      .map((e) => e.trim())
      .join('|');

    let retefuente = obj.TOTALES['RETEFUENTE']
      ? obj.TOTALES['RETEFUENTE']
          .split('|')
          .map((e) => e.trim())
          .join('|')
      : '';

    let salud = obj.TOTALES['SALUD']
      ? obj.TOTALES['SALUD']
          .split('|')
          .map((e) => e.trim())
          .join('|')
      : '';
    sal = obj.TOTALES['SALUD'] ? true : false; // AÑADE SALUD CUFE.BAT - EKOMERCIO

    let refer = obj.TOTALES['REFER']
      ? obj.TOTALES['REFER']
          .split('|')
          .map((e) => e.trim())
          .join('|')
      : '';

    let ntc = obj.TOTALES['REFER'] ? true : false; // AÑADE EXCEPCION NOTA CREDITO - EKOMERCIO

    let descuentos = obj.TOTALES['DESCUENTOS']
      ? obj.TOTALES['DESCUENTOS']
          .split('|')
          .map((e) => e.trim())
          .join('|')
      : '';

    let anticipos = obj.TOTALES['ANTICIPOS']
      ? obj.TOTALES['ANTICIPOS']
          .split('|')
          .map((e) => e.trim())
          .join('|')
      : '';

    try {
      for (let campo of cabecera) str_cabecera += campo; //cabecera
      for (let campo of detalles)
        stringRest += campo['ITEMS']
          .split('|')
          .map((e) => e.trim())
          .join('|'); //detallles
      for (let campo of impuestos) stringRest += campo; //impuestos
      for (let campo of retefuente) stringRest += campo; //retefuente
      for (let campo of salud) stringRest += campo; //salud
      for (let campo of descuentos) stringRest += campo; //descuentos
      for (let campo of anticipos) stringRest += campo; //anticipos
      for (let campo of refer) stringRest += campo; //notas credíto

      const invalidCharacterXML = [/[^\u0009\u000A\u000D\u0020-\uD7FF\uE000-\uFFFD]/g, /[^[\uD800-\uDBFF][\uDC00-\uDFFF]]/g];
      stringRest = stringRest.replace(/[=]/g, '¬');
      stringRest = stringRest.replace(/[!]/g, '\\');
      stringRest = stringRest.replace(/[°]/g, '');
      stringRest = stringRest.replace(/</g, ' MENOR ');
      stringRest = stringRest.replace(/>/g, ' MAYOR ');
      stringRest = stringRest.replace(invalidCharacterXML[0], '');
      stringRest = stringRest.replace(invalidCharacterXML[1], '');

      str_cabecera = str_cabecera.replace(/[=]/g, '¬');
      str_cabecera = str_cabecera.replace(/[!]/g, '\\');
      str_cabecera = str_cabecera.replace(/[°]/g, '');
      str_cabecera = str_cabecera.replace(/</g, '#');
      str_cabecera = str_cabecera.replace(/>/g, '#');
      str_cabecera = str_cabecera.replace(invalidCharacterXML[0], '');
      str_cabecera = str_cabecera.replace(invalidCharacterXML[1], '');
      stringRest = str_cabecera.concat(stringRest).replace('[@@CRLF][@@CRLF]', '[@@CRLF]');
    } catch {
      return stringRest;
    }
    return stringRest.replace(/[\u0000-\u0019]+/g, '');
  }

  set_request(data_env) {
    let dataXML = Buffer.from(data_env['PLANO'], 'utf8');
    return new Promise(function (resolve) {
      const bodyXML = `
      <soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" 
      xmlns:edix=\"http://edixcfdisecure.ekomercio.com/\">
      \r\n<soapenv:Header/>\r\n
      <soapenv:Body>\r\n
      <edix:procesarTextoPlano>\r\n
      <edix:usuario>ekomercio</edix:usuario>\r\n
      <edix:password>aserri</edix:password>\r\n
      <edix:id>?</edix:id>\r\n
      <edix:textoPlano>${dataXML.toString('utf8')}</edix:textoPlano>\r\n
      </edix:procesarTextoPlano>\r\n
      </soapenv:Body>\r\n
      </soapenv:Envelope>`;

      let splitText = data_env['PLANO'].split('|');

      const nro_fact = data_env['PLANO'].split('~')[1].split('|')[0].padStart(6, '0');
      const factura_data = {
        NRO: nro_fact,
        ENVIA: { NIT: splitText[2].padStart(10, '0') || 'Nit no definido', NOMBRE: splitText[1] },
        RECIBE: { NIT: splitText[42].padStart(10, '0') || 'Nit no definido', NOMBRE: splitText[41] },
        DIR: data_env['DIR'],
        ID: splitText[26].concat(nro_fact),
        PREFIJO: splitText[26],
        BODY: bodyXML,
        PLANO: data_env['PLANO'],
      };
      resolve(factura_data);
    }).catch((err) => {
      toastr.error(err);
    });
  }

  async send_request(data_factura) {
    var respuesta = '';
    const dataXML = data_factura.BODY;
    const url = this.tipo_ser ? this.url.url_prueba : this.url.url_produccion;

    let headers = new Headers();

    headers.append('cache-control', 'no-cache');
    headers.append('Content-type', 'text/xml;charset=UTF-8');
    headers.append('Content-Encoding', 'UTF-8');
    headers.append('Accept-Ranges', 10);
    headers.append('Expires', 200);

    const request = new Request(url, { method: 'POST', headers: headers, body: dataXML });
    let begin = Date.now();
    return new Promise(function (resolve, reject) {
      fs.writeFile(path.join(data_factura.DIR, 'GENERADOS', data_factura.ID + `.txt`), data_factura.PLANO, 'utf8', (err) => {
        if (err) throw console.log(err, 'error al escribir JSON Log factura');
        const end = Date.now();
        let elapsedTime = (end - begin) / 1000;
        tiempoTotal += elapsedTime;

        fetch(request)
          .then((res) => {
            console.log(`La peticion ha finalizado en: ${elapsedTime.toFixed(2)} Segundos`);
            console.log('¡La petición se ha resuelto con éxito!');
            respuesta = res.text(); // returns cleaned up JSON
            return respuesta;
          })
          .then((data) => {
            resolve(data);
          })
          .catch((err) => {
            console.error(err.message);
            reject(err);
          });
      });
    });
  }

  async parseXML_json(xmlEnvio) {
    let retorno = null;
    let response_XML = xmlEnvio['data'] ? xmlEnvio['data'] : xmlEnvio;
    response_XML = Buffer.from(response_XML, 'utf8');
    response_XML = response_XML.toString('utf8');
    response_XML = response_XML.replace(/\&lt;/g, '<').replace(/\&gt;/g, '>');

    parser.parseString(response_XML, function (error, result) {
      if (error === null) {
        let jsonText = JSON.stringify(result);
        jsonText = jsonText.replace(/ext:/g, '');
        jsonText = jsonText.replace(/\ext:/g, '');
        jsonText = jsonText.replace(/sts:/g, '');
        jsonText = jsonText.replace(/\/sts:/g, '');
        jsonText = jsonText.replace(/soap:/g, '');
        jsonText = jsonText.replace(/\soap:/g, '');
        jsonText = jsonText.replace(/cbc:/g, '');
        jsonText = jsonText.replace(/\cbc:/g, '');
        jsonText = jsonText.replace(/cac:/g, '');
        jsonText = jsonText.replace(/\cac:/g, '');
        jsonText = jsonText.replace(/"_"/g, '"CODE"');
        jsonText = jsonText.replace(/\[\\/g, '');
        jsonText = jsonText.replace(/"__"/g, '');
        const parseJSON = JSON.parse(jsonText);
        const json_body = parseJSON;
        retorno = json_body;
      } else {
        retorno = 'error: ' + error;
      }
    });
    return retorno;
  }
}
class _req_EMISION extends _req_FACT {
  constructor(params) {
    super(params);
    this.token = params.prueba
      ? 'KUfoWUUibXlYqIGHV4oK0Q42nrzyI7hS4cH7Gd6DWaSWMdXbO2RptMq9MYWocOLosRJ400gETri2Mg5w' //prueba
      : 'JAN1hAlXptLXvRNYYNjZOX6wVOFiS2H6fUdFrGcdd7fiQIGoIzmr6pvx6pqN6QKCdhydrQ6iINXIVnKy'; //produccion
    this.nota_credito = params.nota_credito;
    this.url = params.nota_credito
      ? 'https://endpoint.emision.co/api/v1/service/credit-note'
      : 'https://endpoint.emision.co/api/v1/service/invoice';
    this.unidad = params.unidad;
    this.modulo = params.modulo;
  }

  send_request(data) {
    var time = '',
      respuesta = '';
    const token = req.token;
    const url = this.url;
    const options = {
      method: 'POST',
      data: data['data'],
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      url: url,
      validateStatus: function (status) {
        return status != 500 || status != 400;
      }, //Resolve solo si statusCode !=500
    };

    return new Promise(function (resolve, reject) {
      console.time(time);
      return axios(options)
        .then((res) => {
          respuesta = respuesta_parser(res); // returns cleaned up JSON
          resolve(respuesta);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}
class _req_FACSE extends _req_FACT {
  constructor(params) {
    super(params);
    this.port = this.prueba ? '8092' : '444';
    this.url = {
      _url_produccion: `https://web.facse.net:${this.port}/api/Comunicacion/ComprobanteJson`,
      _url_prueba: `http://facse.eastus2.cloudapp.azure.com:${this.port}/api/comunicacion/ComprobanteJson`,
    };
    this.unidad = params.unidad;
    this.modulo = params.modulo;
  }

  send_request(data) {
    var time = '',
      respuesta = '';
    const tipo_ser = this.prueba;
    const url = tipo_ser ? this.url._url_prueba : this.url._url_produccion;
    const options = {
      method: 'POST',
      data: data['data'],
      headers: {
        'Accept': '*/*',
        'Content-Encoding': 'gzip, deflate',
        'cache-control': 'no-cache',
        'Content-type': 'application/json',
        'Content-Encoding': '',
        'maxRedirects': 10,
        'timeout': 30,
        'Content-Encoding': 'gzip, deflate',
      },
      url: url,
      validateStatus: function (status) {
        return status != 500 || status != 400; // Resolve solo si statusCode !=500;
      },
    };
    return new Promise(function (resolve, reject) {
      //console.log('Enviando peticion a:  ', options.url, 'FACSE\n');
      //console.log('Esperando respuesta del recurso...')
      console.time(time);
      try {
        return axios(options).then((res) => {
          //console.log('La peticion ha finalizado en'); console.timeEnd(time, '\n');
          //console.log('¡La petición se ha resuelto con éxito!\n')
          respuesta = respuesta_parser(res); // returns cleaned up JSON
          resolve(res);
        });
      } catch (error) {
        reject(error);
        //console.log("error al enviar factura: ", facturas_data[id_fact].NRO, "verifique su conexión\n");
      }
    });
  }
}

const _factura_electronica = (params) => {
  console.debug(params);

  var proveedor = params.proveedor ? params.proveedor : 4,
    prueba = params.tipo_ser.toUpperCase() == 'S' ? true : false, //true => prueba || false => produccion
    unidad = localStorage.Unidad,
    sucursal = $_USUA_GLOBAL[0].MENU_SUC,
    contabilidad = '\\' + localStorage.Contab,
    jsonText = '',
    nota_credito = params[4] == 'true' ? true : false,
    modulo = localStorage.Modulo,
    dataJson = params.dataJson,
    parseJSON = '';

  var data_peticion = { dataJson, proveedor, prueba, contabilidad, sucursal, unidad, nota_credito, modulo };

  id_fact = 0;
  facturas_data = new Array();
  facturas_procesadas = new Array();
  facturas_logs = new Array();
  ruta_json = null;
  req = null;
  ntc = false;
  sal = false;
  directorio = '';

  return new Promise(async function (resolve, reject) {
    directorio = path.join('C:', 'EXPORTAR', $_USUA_GLOBAL[0].NIT.toString());
    await createDir(directorio);

    switch (parseInt(proveedor)) {
      case 4: //EKOMERCIO
        parseJSON = [];
        req = new _req_EKOMERCIO(data_peticion);
        await req.get_dataJson(data_peticion.dataJson);
        setTimeout(() => {
          resolve(facturas_logs);
        }, null);
        break;

      case 5: //EMISION
        parseJSON = [];
        req = new _req_EMISION(data_peticion);
        jsonText = normalizar(JSON.stringify(data_peticion.dataJson));

        if (typeof req.validar_JSON(jsonText) == 'undefined') {
          parseJSON = JSON.parse(jsonText);
          await req.get_dataJson(parseJSON);
        } else {
          CON851('', `Error .JSON`, null, 'error', req.validar_JSON(jsonText)['error']);
          setTimeout(() => {
            reject(req.validar_JSON(jsonText)['error']);
          }, null);
        }
        setTimeout(() => {
          resolve(facturas_logs);
        }, null);
        break;

      case 1: //FACSE
        parseJSON = [];
        req = new _req_FACSE(data_peticion);

        jsonText = normalizar(JSON.stringify(data_peticion.dataJson));

        if (typeof req.validar_JSON(jsonText) == 'undefined') {
          parseJSON = JSON.parse(jsonText);
          await req.get_dataJson(parseJSON);
        } else {
          CON851('', `Error .JSON`, null, 'error', 'error');
          setTimeout(() => {
            reject(req.validar_JSON(jsonText)['error']);
          }, null);
        }

        setTimeout(() => {
          resolve(facturas_logs);
        }, null);
        break;
      default:
        break;
    }
  });
};

const generarPDF_envios = (params) => {
  const { proveedor, tipo_envio, cufes, nit } = params;
  var time = 0,
    date = new Date(),
    contador = 0,
    nombre;
  arrayPDF = new Array();
  arrayCufes = new Array();
  merger = null;

  return new Promise(async function (resolve, reject) {
    arrayPDF = [];
    switch (parseInt(proveedor)) {
      case 1:
        /*FACSE  e n  d e s a r r o l l o*/ break;
      case 4: // EKOMERCIO
        const servicio =
          tipo_envio == true
            ? 'https://fevpgentestpro.ekomercio.com/WSCFDIBuilderPlusColombia/WSCFDBuilderPlus.asmx/generaPDF_Envio'
            : 'https://fevpprosoftprod.ekomercio.com/WSCFDIBuilderPlusColombia/WSCFDBuilderPlus.asmx/generaPDF_Envio';

        for (var i in cufes) {
          const res_p = await get_PDF({ dataJson: cufes[i], nit: nit, servicio: servicio });
          if (res_p.status == '200') get_respuestaXML(res_p, i);
        }
        merger = new PDFMerger();
        for (var j in arrayPDF) {
          const error = arrayPDF[j].indexOf('Error') != -1 ? true : false;
          if (!error) {
            contador++;
            var buff = new Buffer.from(arrayPDF[j], 'base64');
            mergePDF(buff);
          } else contador--;
        }
        nombre = path.join(`C:`, 'PROSOFT', 'TEMP');
        nombre = `${nombre}\\${date
          .getFullYear()
          .toString()
          .concat(
            parseInt(date.getMonth()) + 1,
            date.getDate().toString().padStart(2, '0'),
            date.getHours(),
            date.getMinutes(),
            date.getSeconds(),
          )}`;
        nombre = nombre.concat(localStorage.Usuario, '.pdf');

        if (contador > 0) {
          try {
            merger.save(nombre);
            resolve(nombre);
          } catch (err) {
            reject(err);
          }
        } else reject({ error: 'El array se encuentra vacío: ' + arrayPDF });
        break;

      case 5:
        /* EMISION  e n  d e s a r r o l l o*/ break;
      default:
        break;
    }
  });
};

async function get_PDF(datos) {
  const { dataJson, nit, servicio } = datos;

  let cufe = dataJson['CUFE'];
  arrayCufes.push(cufe);

  var time = '';

  const options = {
    method: 'POST',
    data: qs.stringify({
      usuario: 'ekomercio',
      password: 'aserri',
      rfcEmisor: parseInt(nit),
      uuid: cufe.trim(),
    }),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      'Expires': 200,
      'cache-control': 'no-cache',
    },
    url: servicio,
    validateStatus: function (status) {
      return status != 500 || status != 400; // Resolve solo si statusCode !=500
    },
  };
  console.time(time);
  const peticion = axios(options)
    .then((result) => {
      const res = respuesta_parser(result);
      return res;
    })
    .catch((err) => {
      console.log(err);
    });
  return peticion;
}

function get_respuestaXML(res, indice) {
  parser.parseString(res['data'], function (error, response) {
    if (error === null) {
      var texto = JSON.stringify(response);
      texto = texto.replace(/_/g, 'TEXTO');
      const parseJSON = JSON.parse(texto);
      if (parseJSON['string']['TEXTO'].indexOf('error') == -1) {
        arrayPDF.push(parseJSON['string']['TEXTO']);
      }
    } else toastr.error('error al consultar PDF:   ', error);
  });
}

function mergePDF(pdf) {
  const buff = new Buffer.from(pdf);
  merger.add(buff, null);
}

function abrir_PDF(ruta_pdf) {
  child(`start ${ruta_pdf}`);
}
function createDir(dirPath) {
  fs.mkdir(dirPath, { recursive: true }, (err) => {
    if (err) return false;
  });
}

function respuesta_parser(obj) {
  var simpleObject = {};
  for (var prop in obj) {
    if (!obj.hasOwnProperty(prop)) continue;
    if (typeof obj[prop] == 'object') {
      if (prop != 'data') continue;
    }
    if (typeof obj[prop] == 'function') continue;
    simpleObject[prop] = obj[prop];
  }
  return simpleObject;
}
