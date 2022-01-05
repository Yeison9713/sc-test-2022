var fetchProgress = false;
try {
  fetchProgress = require('../../frameworks/scripts/fetch-progress')
} catch (err) { console.log('No se ha podido encontrar el módulo: fetchProgress') }

function postData(datos, servicio, params = {}) {
  return new Promise((resolve, reject) => {
    var formData = new FormData();
    for (var [key, value] of Object.entries(datos)) formData.append(key, value);

    fetch(servicio, {
      method: "POST",
      body: formData,
    })
      .then(
        res => {
          return fetchProgress ? fetchProgress(res, {
            onProgress: (progreso) => {
              params.onProgress ? params.onProgress(progreso) : false
            }
          }) : res
        }
      )
      .then((res) => {
        if (!res.ok) reject(res);
        return res.arrayBuffer();
      })
      .then((buffer) => {
        let decoder = new TextDecoder("iso-8859-1");
        let text = decoder.decode(buffer);
        return text;
      })
      .then((res) => {
        let encode = encodeURI(res),
          decode,
          response;
        encode = encode.replace(
          /%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20/g,
          ""
        );
        encode = encode.replace(/%0D%0A/g, "");
        encode = encode.replace(/%0A/g, "");
        // encode = encode.replace(/%EF%BF%BD/g, "Ñ");

        decode = decodeURI(encode);
        // quita espacios - Yeisson.
        // limpia caracteres ocultos Json - Pablo.O
        decode = decode.replace(/[\u0000-\u0019]+/g, "");
        response = JSON.parse(decode.replace(/"\s+|\s+"/g, '"'));

        if (response.STATUS == "00") {
          resolve(response.MENSAJE);
        } else {
          let code = response.STATUS.split("-")[0],
            tipo = response.STATUS.split("-")[1],
            mensaje = response.MENSAJE,
            app = response.PROGRAM,
            msj = "";

          if (code == "SC") {
            if (mensaje.length == 2) msj = msjError(mensaje.padStart(2, "0"));
            else msj = mensaje;
          } else {
            msj = msjError_con852(code.padStart(2, "0"));
            msj = msj.trim() + ": " + mensaje;
          }

          if (!tipo || tipo == "2") {
            var opc = datos.datosh ? datos.datosh.split("|")[4] : "No aplica";
            if (mensaje == "15") msj = msj + " - " + opc;
            jAlert(
              {
                titulo: "Error " + code,
                mensaje: "<b>Mensaje: </b>" + msj + "<br> <b>App:</b> " + app,
              },
              () => {
                reject(response);
              }
            );
          } else {
            toast(`Advertencia`, msj, "warning");
            reject(response);
          }
        }
      })
      .catch((error) => reject(error));
  });
}