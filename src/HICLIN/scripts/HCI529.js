
// CREACION - SANTIAGO.F - ENERO 24/2020

// var $this;
var $_HCI529 = [];

async function _iniciarHCI107(json) {
  $_HCI529._datos = json;
  await inicializarDatos_HCI529();
  await abrirArchivos_HCI529();
  await llenarEncabezado_HCI529();
  await llenarDatosPaciente_HCI529();
  await llenarProcedimientos_HCI529();
  await llenarProfesionales_HCI529();
  await llenarMaterialesCirugia_HCI529();
  await llenarMaterialesEnfer_HCI529();
  await llamarImpresion_HCI529();
  await salir_HCI529();
  
}

async function llenarEncabezado_HCI529() {
  datos.encabezado.nit = $_USUA_GLOBAL[0].NIT;
  datos.encabezado.nombre = $_USUA_GLOBAL[0].NOMBRE;
  datos.encabezado.titulo = 'HOJA DE GASTOS';
  datos.encabezado.nro = $_HCI529._datos.numero;
}

async function llenarDatosPaciente_HCI529() {
  datos.paciente.nombre = $_REG_PACI.DESCRIP.replace(/\s+/g, ' ')
  datos.paciente.tipoId = $_REG_PACI['TIPO-ID'];
  isNaN($_REG_PACI.COD) == true ? aux = $_REG_PACI.COD : aux = new Intl.NumberFormat("ja-JP").format($_REG_PACI.COD);
  datos.paciente.id = aux;

  datos.paciente.edad = $_REG_HC.edad_hc.unid_edad + $_REG_HC.edad_hc.vlr_edad;
  $_REG_PACI['SEXO'] == 'F' ? datos.paciente.sexo = 'Fem.' : datos.paciente.sexo = 'Masc';

  datos.paciente.telefono = $_REG_PACI['TELEFONO'];

  $_HCI529.busqEnt = $_HCI529._entidades.find(e => e['COD-ENT'] == $_REG_PACI.EPS);
  $_HCI529.busqEnt != undefined ? $_HCI529.NOMBRE_ENT = $_HCI529.busqEnt['NOMBRE-ENT'] : $_HCI529.NOMBRE_ENT = $_REG_PACI.EPS;
  datos.paciente.entidad = $_HCI529.NOMBRE_ENT;

  var unser = $_HCI529._unserv.find(e => e.COD == $_REG_HC.unser_hc);
  datos.paciente.unServ = unser.DESCRIP;

  datos.paciente.fecha = $_HCI529._datos.fecha;
  datos.paciente.hora = $_HCI529._datos.hora;
  datos.paciente.e_civil = _ESTCIVIL($_REG_PACI['EST-CIV']);
  datos.paciente.direccion = $_REG_PACI['DIRECC'];
  datos.paciente.sala = $_HCI529._datos.sala;
  datos.paciente.factura = $_HCI529._datos.factura;
}

async function llenarProcedimientos_HCI529() {
  for (var i in $_HCI529._datos.cups) {
    if ($_HCI529._datos.cups[i].cod.trim() != "") {
      datos.procedi.bandera = true;
      datos.procedi.cod.push($_HCI529._datos.cups[i].cod);
      datos.procedi.descrip.push($_HCI529._datos.cups[i].descrip);
    }
  }
}

async function llenarProfesionales_HCI529() {
  datos.profesionales.cirujano = $_HCI529._datos.cirujano
  datos.profesionales.anestesiologo = $_HCI529._datos.anestesiologo
  datos.profesionales.ayudante = $_HCI529._datos.ayudante
  datos.profesionales.instrumentador = $_HCI529._datos.instrumentador
  datos.profesionales.circulante = $_HCI529._datos.circulante
}

async function llenarMaterialesCirugia_HCI529() {
  if ($_HCI529._datos.tipo_w == 1) {

    for (var i in $_HCI529._datos.articulos) {
      if ($_HCI529._datos.articulos[i].articulo.trim() != "") {
        datos.materiales_cirugia.descrip.push($_HCI529._datos.articulos[i].descripArt);
        datos.materiales_cirugia.cantidad.push($_HCI529._datos.articulos[i].cantidad);
      }
    }

    var oper = $_HCI529._datos.operador;

    if (oper.trim() != "") {
      await postData({ datosh: datosEnvio() + oper + '|' }, get_url("app/CONTAB/CON003.DLL"))
        .then(data => {
          var res = data.split('|');
          var nombre_oper_w = res[0].trim();
          var id_oper_w = res[1];
          
          datos.materiales_cirugia.oper = nombre_oper_w;
          
        }).catch(err => {
          console.log(err, 'error')
          datos.materiales_cirugia.oper = "";
        })
    } else {
      datos.materiales_cirugia.oper = "";
    }
  }
}

async function llenarMaterialesEnfer_HCI529() {
  if ($_HCI529._datos.tipo_w == 2) {

    for (var i in $_HCI529._datos.articulos) {
      if ($_HCI529._datos.articulos[i].articulo.trim() != "") {
        datos.materiales_enfer.descrip.push($_HCI529._datos.articulos[i].descripArt);
        datos.materiales_enfer.cantidad.push($_HCI529._datos.articulos[i].cantidad);
      }
    }

    var oper = $_HCI529._datos.operador;

    if (oper.trim() != "") {
      await postData({ datosh: datosEnvio() + oper + '|' }, get_url("app/CONTAB/CON003.DLL"))
        .then(data => {
          var res = data.split('|');
          var nombre_oper_w = res[0].trim();
          var id_oper_w = res[1];
          
          datos.materiales_enfer.oper = nombre_oper_w;
          
        }).catch(err => {
          console.log(err, 'error')
          datos.materiales_enfer.oper = "";
        })
    } else {
      datos.materiales_enfer.oper = "";
    }
  }
}

async function llamarImpresion_HCI529() {
  await _impresion2({
    tipo: 'pdf',
    archivo: `${localStorage.Usuario + moment().format('-YYMMDD-HHmmssS-01')}.pdf`,
    content: await _imprimirHCI529(datos, console.log('imprime HCI529')),
    retornar: false
  }).catch((err) => {
    console.error(err);
  })
}

async function salir_HCI529() {
  loader('hide')
  _regresar_menuhis();
}

async function abrirArchivos_HCI529() {
  loader('show');
  // await postData({ datosh: datosEnvio() }, get_url("app/CONTAB/CON809.DLL"))
  //   .then(data => {
  //     $_HCI107._ciudades = data.CIUDAD;
  //     $_HCI107._ciudades.pop();
  //   }).catch(err => {
  //     console.log(err, 'error')
  //     loader('hide')
  //     _regresar_menuhis();
  //   })

  await postData({ datosh: datosEnvio() }, get_url("app/SALUD/SER853.DLL"))
    .then(data => {
      $_HCI529._entidades = data.ENTIDADES;
      $_HCI529._entidades.pop();
    }).catch(err => {
      console.log(err, 'error')
      loader('hide')
      _regresar_menuhis();
    })

  // await postData({ datosh: datosEnvio() }, get_url("app/SALUD/SER855.DLL"))
  //   .then(data => {
  //     $_HCI107._especialidades = data.ESPECIALIDADES;
  //     $_HCI107._especialidades.pop();
  //   }).catch(err => {
  //     console.log(err, 'error')
  //     loader('hide')
  //     _regresar_menuhis();
  //   })

  // await postData({ datosh: datosEnvio() + $_REG_HC.llave_hc + '|' + localStorage.Usuario + '|' + '1' }, get_url("app/HICLIN/HC_PRC.DLL"))
  //   .then(data => {
  //     $_HCI107._hcprc = data.HCPAC;
  //   }).catch(err => {
  //     console.log(err, 'error')
  //     loader('hide')
  //     _regresar_menuhis();
  //   })

  // await postData({ datosh: datosEnvio() }, get_url("APP/HICLIN/HC808.DLL"))
  //   .then((data) => {
  //     $_HCI107._codigos = data.MACROS;
  //     $_HCI107._codigos.pop();
  //   })
  //   .catch((err) => {
  //     console.log(err, 'err')
  //     loader('hide')
  //     _regresar_menuhis();
  //   });

  await postData({ datosh: datosEnvio() }, get_url("APP/SALUD/SER873.DLL"))
    .then((data) => {
      $_HCI529._unserv = data.UNSERV;
      $_HCI529._unserv.pop();
    })
    .catch((err) => {
      console.log(err, 'err')
      loader('hide')
      _regresar_menuhis();
    });

  // await postData({ datosh: datosEnvio() }, get_url("APP/SALUD/SER856.DLL"))
  //   .then((data) => {
  //       console.log(data)
  //       $_HCI107.vias_existentes = data.VIAS_ACCESO
  //       $_HCI107.vias_existentes.pop()
  //   })
  //   .catch(error => {
  //       console.error(error)
  //       loader('hide')
  //       _this.salir_hc107()
  //   });

  // await postData({ datosh: datosEnvio() }, get_url("app/SALUD/SER851.DLL"))
  //   .then(data => {
  //     $_HCI107._enfermedades = data.ENFERMEDADES;
  //     $_HCI107._enfermedades.pop();
  //   }).catch(err => {
  //     console.log(err, 'error')
  //     loader('hide')
  //     _regresar_menuhis();
  //   })

  loader('show');
}

async function inicializarDatos_HCI529() {
  datos = {
    encabezado: {
        nombre: '',
        nit: '',
        titulo: '',
        nro: ''
    },

    paciente: {
        nombre: '',
        tipoId: '',
        id: '',
        fecha: '',
        hora: '',
        unServ: '',
        edad: '',
        sexo: '',
        e_civil: '',
        direccion: '',
        sala: '',
        factura: '',
        telefono: '',
        entidad: '',
    },
    
    procedi: {
        bandera: null,
        cod: [],
        descrip: []
    },
    
    profesionales: {
        cirujano: '',
        anestesiologo: '',
        ayudante: '',
        instrumentador: '',
        circulante: '',
    },
    
    materiales_cirugia: {
        descrip: [],
        cantidad: [],
        oper: '',
    },
    
    materiales_enfer: {
        descrip: [],
        cantidad: [],
        oper: '',
    },
  }
}