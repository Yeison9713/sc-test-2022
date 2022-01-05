/** @format */

'use strict';
/**
 * @developer Pablo.O "pabloolguin@prosoft.com.co"
 * @author    SC-PROSOFT
 * @descrip   JS RUTINAS MANTENIMIENTO EQUIPOS / VEHICULOS.
 **/

function validar_fecha() {
  var now = moment().format('YYYYMMDD');

  function anio(date = 0) {
    return !date < now.year();
  }

  function mes(date = 0) {
    return !date < 1 || !date > 12;
  }

  function dia(date = 0) {
    return !date < 1 || !date > 31;
  }

  function total(date = 0) {
    date = devolver_fecha(date.toString());
    var current_date = _validarFecha(date[0], date[1], date[2]);
    current_date = moment(current_date).format('YYYYMMDD');
    return !parseInt(current_date) < parseInt(now) || !parseInt(current_date) > parseInt(now);
  }

  return {anio, mes, dia, total};
}

function devolver_fecha(fecha) {
  return [
    fecha ? parseInt(fecha.substring(0, 4)) : '',
    fecha ? parseInt(fecha.substring(4, 6)).toString().padStart(2, '0') : '',
    fecha ? parseInt(fecha.substring(6, 8)).toString().padStart(2, '0') : '',
  ];
}

function devolver_hora(hora) {
  return [
    hora ? parseInt(hora.substr(0, 2)).toString().padStart(2, '0') : '',
    hora ? parseInt(hora.substr(2, 2)).toString().padStart(2, '0') : '',
  ];
}

function lowerCase_keys(obj) {
  obj = Object.keys(obj).reduce(
    (c, k) => ((c[k.toLowerCase().replace(/\-/g, '_')] = obj[k]), c),
    {},
  );
  return obj;
}

// MANTENIMIENTO CARGA INVENTARIOS DESDE PRODUCCION
// MODIFICA ARCHIVO SALDOS / INVENTARIOS

function cargar_inventarios(llave_cons = '0000000') {
  // MANT010
  loader('show');
  llave_cons = parseInt(llave_cons);
  const div_cons = String(llave_cons).substr(0, 2).padStart(2, '0');
  const nro_cons = String(llave_cons).substr(2, 6).padStart(6, '0');

  const [llave_secu1, llave_secu2] = [
    convertirSecuencia(nro_cons.substr(0, 3)),
    convertirSecuencia(nro_cons.substr(3, 3)),
  ];

  const secu1 = `${nro_cons}${llave_secu1}`;
  const secu2 = `${nro_cons}${llave_secu2}`;

  var datos = {datosh: datosEnvio()};

  datos.cod_trans = '1P';
  datos.div_cons = div_cons;
  datos.secu1 = secu1;
  datos.secu2 = secu2;

  return new Promise((resolve, reject) => {
    postData(datos, get_url('APP/MANT/MANT010.DLL'))
      .then((data) => {
        loader('hide');
        resolve(data);
      })
      .catch((err) => {
        loader('hide');
        console.error(err);
        reject;
      });
  });
}

function buscar_consecutivo(secu) {
  return new Promise((resolve, reject) => {
    postData({datosh: datosEnvio() + secu}, get_url('APP/CONTAB/CON007.DLL'))
      .then((data) => {
        let res = data.split('|');
        let consecutivo = parseInt(res[1]) || 0;
        resolve(consecutivo - 1);
      })
      .catch(reject);
  });
}

function grabar_consecutivo(llave) {
  let secuencia = sec;
  let fecha = moment().format('YYMMDD');
  llave = params.llave;

  let datos_envio = [secuencia, fecha, llave];
  return new Promise((resolve, reject) => {
    postData(
      {datosh: `${datosEnvio()}${datos_envio.join('|')}|`},
      get_url('APP/CONTAB/CON007X.DLL'),
    )
      .then((res) => {
        resolve(data);
      })
      .catch(() => {
        loader('hide');
        reject;
      });
  });
}
// let observ_obj = observaciones.strToTable('observ');
//  _enterInput(`#input_codigo_cor402`);
