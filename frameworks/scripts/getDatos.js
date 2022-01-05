const getDatos = {
  _enfermedades: (datos_envio) => {
    return new Promise((resolve, reject) => {
      datos_envio = datos_envio || { datosh: datosEnvio() };
      postData(datos_envio, get_url("APP/SALUD/SER851.DLL"))
        .then((data) => {
          if (!datos_envio.paso) {
            data = data.ENFERMEDADES;
            data.pop();
          }
          resolve(data);
        })
        .catch((err) => {
          console.error(err);
          reject(err);
        });
    });
  },
  _profesionales: (datos_envio) => {
    return new Promise((resolve, reject) => {
      datos_envio = datos_envio || { datosh: datosEnvio() };
      postData(datos_envio, get_url("APP/SALUD/GET_PROF.DLL"))
        .then((data) => {
          if (!datos_envio.cod_prof) {
            data = data.REG_PROF;
            data.pop();
          }
          resolve(data);
        })
        .catch((err) => {
          console.error(err);
          reject(err);
        });
    });
  },
  _historia: (datos_envio) => {
    return new Promise((resolve, reject) => {
      datos_envio = datos_envio || { datosh: datosEnvio() };
      postData(datos_envio, get_url("APP/HICLIN/HC_PRC.DLL"))
        .then((data) => {
          data = data.HCPAC;
          resolve(data);
        })
        .catch((err) => {
          console.error(err);
          reject(err);
        });
    });
  },
  _historia_new: (datos_envio) => {
    return new Promise((resolve, reject) => {
      datos_envio = datos_envio || { datosh: datosEnvio() };
      postData(datos_envio, get_url("APP/HICLIN/GET_HC.DLL"))
        .then((data) => {
          data = data;
          resolve(data);
        })
        .catch((err) => {
          console.error(err);
          reject(err);
        });
    });
  },
  _unserv: ({ codigo = "" } = {}) => {
    let datos_envio = {
      datosh: datosEnvio(),
      codigo,
    };
    return new Promise((resolve, reject) => {
      postData(datos_envio, get_url("APP/SALUD/GET_UNID_SERV.DLL"))
        .then((data) => {
          if (data.UNID_SERV.length > 0) resolve(data.UNID_SERV);
          else {
            CON851("", "No hay unidades de servicio", null, "error", "Error");
            reject();
          }
        })
        .catch((err) => {
          console.error(err);
          CON851("", "Error consultando unidades de servicio", null, "error", "Error");
          reject(err);
        });
    });
  },
  _detalles: (datos_envio) => {
    return new Promise((resolve, reject) => {
      datos_envio = datos_envio || { datosh: datosEnvio() };
      postData(datos_envio, get_url("APP/HICLIN/HCDETAL_PRC.DLL"))
        .then((data) => {
          data = data.DETHC;
          data.pop();
          resolve(data);
        })
        .catch((err) => {
          console.error(err);
          reject(err);
        });
    });
  },
  _evolucionesHC705B: (datos_envio) => {
    return new Promise((resolve, reject) => {
      datos_envio = datos_envio || { datosh: datosEnvio() };
      postData(datos_envio, get_url("APP/HICLIN/HC705B.DLL"))
        .then((data) => {
          data = data.EVOLUCIONES;
          data.pop();
          resolve(data);
        })
        .catch((err) => {
          console.error(err);
          reject(err);
        });
    });
  },
  restriccion_CON904: (usuario, cod) => {
    return new Promise((resolve, reject) => {
      datos_envio = { datosh: datosEnvio(), usuario, cod };
      postData(datos_envio, get_url("APP/CONTAB/CON904_V3.DLL"))
        .then((data) => {
          if (datos_envio.usuario == "GEBC") {
            CON851("", "Acceso Especial", null, "info", "Información");
            resolve();
          } else {
            if (data.invalid > 0) {
              CON851("", "15", null, "warning", "Advertencia");
              jAlert(
                {
                  titulo: "Sistema de seguridad, control de restricciones",
                  mensaje: `Operador: ${data.cod_rest} - ${data.nombre_oper} - ${data.cod}
                            Usted NO tiene acceso a esta opcion del programa`,
                },
                () => {
                  reject(new Error("Sin acceso"));
                }
              );
            } else {
              resolve();
            }
          }
        })
        .catch((err) => {
          console.error(err);
          reject(err);
        });
    });
  },
  _printer: (datos_envio) => {
    return new Promise((resolve, reject) => {
      datos_envio = datos_envio || { datosh: datosEnvio() };
      postData(datos_envio, get_url("APP/CONTAB/GET_PRINTER.DLL"))
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          console.error(err);
          reject(err);
        });
    });
  },
  _pref: (datos_envio) => {
    return new Promise((resolve, reject) => {
      datos_envio = datos_envio || { datosh: datosEnvio() };
      postData(datos_envio, get_url("APP/CONTAB/GET_PREF.DLL"))
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          console.error(err);
          reject(err);
        });
    });
  },

  _grupo: ({ llave = "", start = "N" } = {}) => {
    let datos_envio = {
      datosh: datosEnvio(),
      llave,
      start,
    };
    return new Promise((resolve, reject) => {
      postData(datos_envio, get_url("APP/INVENT/GET_GRUPO.DLL"))
        .then((data) => {
          if (data.GRUPO.length > 0) resolve(data.GRUPO);
          else {
            CON851("", "No hay grupos", null, "error", "Error");
            reject();
          }
        })
        .catch((err) => {
          console.error(err);
          CON851("", "Error consultando grupos", null, "error", "Error");
          reject(err);
        });
    });
  },
  _almacenes: (datos_envio) => {
    return new Promise((resolve, reject) => {
      datos_envio = datos_envio || { datosh: datosEnvio() };
      postData(datos_envio, get_url("APP/INVENT/INV801.DLL"))
        .then((data) => {
          data = data.LOCALIZACION;
          data.pop();
          resolve(data);
        })
        .catch((err) => {
          console.error(err);
          reject(err);
        });
    });
  },
  _uso: (datos_envio) => {
    return new Promise((resolve, reject) => {
      datos_envio = datos_envio || { datosh: datosEnvio() };
      postData(datos_envio, get_url("APP/INVENT/INV806.DLL"))
        .then((data) => {
          data = data.USO;
          resolve(data);
        })
        .catch((err) => {
          console.error(err);
          reject(err);
        });
    });
  },
  _solau: ({ paso = "", llave_fact = "" } = {}) => {
    let datos_envio = {
      datosh: datosEnvio(),
      paso,
      llave_fact,
    };
    return new Promise((resolve, reject) => {
      postData(datos_envio, get_url("APP/SALUD/GET_SOLAU.DLL"))
        .then((data) => {
          if(data.SOLAU.length > 0) resolve(data.SOLAU);
          else {
            CON851("", "No hay solicitudes de autorización !", null, "error", "Error");
            reject();
          }
        })
        .catch((err) => {
          console.error(err);
          CON851("", "Error consultando solicitudes de autorización !", null, "error", "Error");
          reject(err);
        });
    });
  },
};

const consulta = {
  _grupo: (dato) => {
    return new Promise((resolve, reject) => {
      postData({ datosh: datosEnvio(), llave: dato }, get_url("APP/INVENT/GET_GRUPO.DLL"))
        .then((data) => {
          if (data.llave) resolve(data);
          else {
            CON851("", "No existe grupo !", null, "error", "Error");
            reject();
          }
        })
        .catch((err) => {
          console.error(err);
          CON851("", "Error consultando grupo !", null, "error", "Error");
          reject(err);
        });
    });
  },
  _act: ({ cod = "", maestro = false } = {}) => {
    return new Promise((resolve, reject) => {
      postData({ datosh: datosEnvio(), cod }, get_url("APP/SALUD/GET_ACT.DLL"))
        .then((data) => {
          if (data.cod) resolve(data);
          else {
            if (maestro) {
              resolve(data);
            } else {
              CON851("", "No existe actividad !", null, "error", "Error");
              reject();
            }
          }
        })
        .catch((err) => {
          console.error(err);
          CON851("", "Error consultando actividad !", null, "error", "Error");
          reject(err);
        });
    });
  },
  _cups: ({ llave = "" } = {}) => {
    return new Promise((resolve, reject) => {
      postData({ datosh: datosEnvio(), llave }, get_url("APP/SALUD/GET_CUPS.DLL"))
        .then((data) => {
          if (data.llave) resolve(data);
          else {
            CON851("", "No existe cups !", null, "error", "Error");
            reject();
          }
        })
        .catch((err) => {
          console.error(err);
          CON851("", "Error consultando cups !", null, "error", "Error");
          reject(err);
        });
    });
  },
  _solau: ({ paso = "", llave_fact = "", maestro = false } = {}) => {
    let datos_envio = {
      datosh: datosEnvio(),
      paso,
      llave_fact,
    };
    return new Promise((resolve, reject) => {
      postData(datos_envio, get_url("APP/SALUD/GET_SOLAU.DLL"))
        .then((data) => {
          if (data.consecutivo) resolve(data);
          else {
            if (maestro) {
              resolve(data);
            } else {
              CON851("", "No existe solicitud de autorización !", null, "error", "Error");
              reject();
            }
          }
        })
        .catch((err) => {
          console.error(err);
          CON851("", "Error consultando solicitud de autorización !", null, "error", "Error");
          reject(err);
        });
    });
  },
  _paci: ({ cod_paci = "" } = {}) => {
    return new Promise((resolve, reject) => {
      postData({ datosh: datosEnvio(), cod_paci }, get_url("APP/SALUD/GET_PACI.DLL"))
        .then((data) => {
          if (data.cod) resolve(data);
          else {
            CON851("", "No existe paciente !", null, "error", "Error");
            reject();
          }
        })
        .catch((err) => {
          console.error(err);
          CON851("", "Error consultando paciente !", null, "error", "Error");
          reject(err);
        });
    });
  },
  _tercero: ({ cod_tercero = "", maestro = false } = {}) => {
    return new Promise((resolve, reject) => {
      postData({ datosh: datosEnvio(), cod_tercero }, get_url("APP/CONTAB/GET_TERCERO.DLL"))
        .then((data) => {
          if (data.cod) resolve(data);
          else {
            if (maestro) {
              resolve(data);
            } else {
              CON851("", "No existe tercero !", null, "error", "Error");
              reject();
            }
          }
        })
        .catch((err) => {
          console.error(err);
          CON851("", "Error consultando tercero !", null, "error", "Error");
          reject(err);
        });
    });
  },
  _num: ({ llave = "", maestro = false }) => {
    return new Promise((resolve, reject) => {
      postData({ datosh: datosEnvio(), llave }, get_url("APP/SALUD/GET_NUM.DLL"))
        .then((data) => {
          if (data.llave) resolve(data);
          else {
            if (maestro) {
              resolve(data);
            } else {
              CON851("", "No existe numeración !", null, "error", "Error");
              reject();
            }
          }
        })
        .catch((err) => {
          console.error(err);
          CON851("", "Error consultando numeración !", null, "error", "Error");
          reject(err);
        });
    });
  },
  _unserv: ({ codigo = "" } = {}) => {
    return new Promise((resolve, reject) => {
      postData({ datosh: datosEnvio(), codigo }, get_url("APP/SALUD/GET_UNID_SERV.DLL"))
        .then((data) => {
          if (data.codigo) resolve(data);
          else {
            CON851("", "No existe unidad de servicio !", null, "error", "Error");
            reject();
          }
        })
        .catch((err) => {
          console.error(err);
          CON851("", "Error consultando unidad de servicio !", null, "error", "Error");
          reject(err);
        });
    });
  },
  _articulo: ({ tipo = "", grupo = "", nro = "", clase = "", codigo_barras = "", start = "N" } = {}) => {
    let datos_envio = {
      datosh: datosEnvio(),
      tipo,
      grupo,
      nro,
      clase,
      start,
      codigo_barras,
    };
    return new Promise((resolve, reject) => {
      postData(datos_envio, get_url("APP/INVENT/GET_ARTIC.DLL"))
        .then((data) => {
          if (data.cod) resolve(data);
          else {
            CON851("", "No existe artículo !", null, "error", "Error");
            reject();
          }
        })
        .catch((err) => {
          console.error(err);
          CON851("", "Error consultando artículo !", null, "error", "Error");
          reject(err);
        });
    });
  },
};

module.exports = {
  getDatos,
  consulta,
};
