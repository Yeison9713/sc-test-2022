// JS MANEJO DATOS SOLICITUD-AUTORIZA - GET_SOLAU.DLL
// 27/12/2021 David.M: Creación

function getObjRegSolau() {
  return {
    consecutivo: "",
    paci: "",
    fact: {
      prefijo: "",
      nro: "",
    },
    sem_cot: "",
    tabla: JSON.parse(
      JSON.stringify(
        Array(50).fill({
          fecha: "",
          hora: "",
          cups: "",
          descrip_cups: "",
          unserv: "",
          descrip_unserv: "",
          cod: "",
          nom_quien_autoriza: "",
          observacion: "",
          oper: "",
        })
      )
    ),
    oper_modif: "",
    fecha_modif: "",
    hora_modif: "",
  };
}

module.exports = { getObjRegSolau };
