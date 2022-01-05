// 22-09-2020 - IMPRESION CIERRE HISTORIA CLINICA- DAVID.M - HICLIN
// 24-12-2020 - DAVID.M - CORRECCIONES Y CAMBIOS
// 31/03/2021 - CAMBIO A IMPORTACION POR MODULO -- David.M

class hci01c {
  constructor(params) {
    this.hcprc = params.hcprc;
    this.reg_med = {};
    this.datos = {};
    this.callback = params.callback;
  }

  async _init() {
    await this.llenar_egreso();
  }

  async llenar_egreso() {
    if (!this.hcprc.cierre.oper_cie.trim()) {
      this.nom_oper_w = "";
      this.id_oper_w = "";
    } else {
      await postData({ datosh: datosEnvio() }, get_url("app/CONTAB/CON003.DLL"))
        .then((data) => {
          var res = data.split("|");
          this.nom_oper_w = res[0];
          this.id_oper_w = res[1];
        })
        .catch((err) => {
          console.log(err, "error");
        });
    }

    if (this.reg_med.ATIENDE_PROF != 1 && this.reg_med.ATIENDE_PROF != 2) {
      await postData({ datosh: datosEnvio() + cerosIzq(this.hcprc.med.trim(), 10) }, get_url("APP/SALUD/SAL719-01.DLL"))
        .then((data) => {
          this.reg_med = data.PERSATI[0];
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      await postData(
        { datosh: datosEnvio() + cerosIzq(this.oper_cie_w.trim(), 10) },
        get_url("APP/SALUD/SAL719-01.DLL")
      )
        .then((data) => {
          this.reg_med = data.PERSATI[0];
        })
        .catch((err) => {
          console.log(err);
        });
    }

    this.datos.medico = {
      nombre: this.reg_med.DESCRIP,
      reg: this.reg_med.REGISTRO,
      espec: this.reg_med.DESCESP1,
      firma: this.reg_med.IDENTIFICACION,
    };

    if(!formatoBaseImp_Hc.images.firma) formatoBaseImp_Hc.images.firma = rutaFirmas_impHc(this.datos.medico.firma);

    this.imprimir_egreso();
  }

  imprimir_egreso() {
    formatoBaseImp_Hc.content[0].stack.push({
      stack: [
        {
          marginTop: 20,
          text: [
            { text: "ESTADO SALIDA:  ", style: "left8Bold" },
            { text: consult_estado_sal(this.hcprc.rips.estado_sal), style: "left8" },
          ],
        },
        {
          stack: this.hcprc.rips.remitido.trim()
            ? [
                {
                  marginTop: 5,
                  columns: [{ text: this.hcprc.rips.remitido, style: "left8" }],
                },
              ]
            : [],
        },
        {
          marginTop: 5,
          text: [
            { text: "OBSERVACIONES:  ", style: "left8Bold" },
            { text: this.hcprc.observ_egres, style: "left8" },
          ],
        },
        {
          marginTop: 3,
          stack: [
            { text: "DIAGNÓSTICOS", style: "left8Bold" },
            {
              marginLeft: 20,
              style: "left8",
              stack: this.llenar_diagnosticos(),
            },
          ],
        },
        {
          text: this.hcprc.cierre.diag_muer.trim()
            ? `${this.hcprc.cierre.diag_muer} - ${this.hcprc.cierre.descrip_diag_muer}`
            : "",
          style: "left8",
          alignment: "justify",
          marginLeft: 20,
        },
        {
          stack: ["02", "08"].includes(this.hcprc.serv)
            ? []
            : [firmaImpresion_impHc(this.datos, false, "PROFESIONAL - CIERRE DE HISTORIA CLINICA")],
        },
        {
          marginTop: 10,
          text:
            "CIERRE HISTORIA CLINICA:  " +
            `${this.datos.medico.nombre.replace(/\s+/g, " ")}   ${this.hcprc.egreso || this.hcprc.cierre.egreso}`,
          style: "left8Bold",
        },
      ],
    });

    this.callback();
  }

  llenar_diagnosticos() {
    let arreglo = [];
    for (var i in this.hcprc.cierre.tabla_diag_egr) {
      if (this.hcprc.cierre.tabla_diag_egr[i].diag_egr.trim()) {
        arreglo.push({
          columns: [
            { text: this.hcprc.cierre.tabla_diag_egr[i].diag_egr, width: "5%" },
            { text: this.hcprc.cierre.tabla_diag_egr[i].descrip_egr, width: "95%" },
          ],
        });
      }
    }

    return arreglo;
  }
}

const iniciar_HCI01C = (params) => {
  var format = new hci01c(params);
  format._init();
};

module.exports = {
  iniciar_HCI01C,
};
