class formato_GRAF_EMBA {
    constructor(params) {
      this.hcprc = params.hcprc;
      this.paci = params.paci;
      this.callback = params.callback;
      this.graficas = params.graficas;
    }
  
    _init() {
      console.log(this.graficas, "GRAFICAS");
  
      isNaN(this.paci.COD)
        ? (this.paci.COD_EDIT = this.paci.COD)
        : (this.paci.COD_EDIT = new Intl.NumberFormat("ja-JP").format(this.paci.COD));
  
      this.imprimir();
    }
  
    async imprimir() {
      await _impresion2({
        tipo: "pdf",
        archivo: `${localStorage.Usuario + moment().format("-YYMMDD-HHmmss")}.pdf`,
        content: this.format(),
      })
        .then((data) => {
          this.callback(data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  
    format() {
      return {
        pageMargins: [20, 100, 20, 40],
        images: { logo: rutaLogos_impHc($_USUA_GLOBAL[0].NIT) },
        header: () => {
          return {
            margin: [20, 20, 20, 0],
            stack: [
              {
                style: "left8",
                table: {
                  widths: ["25%", "50%", "25%"],
                  heights: [60, 37],
                  body: [
                    [
                      {
                        marginTop: 4,
                        alignment: "center",
                        stack: [
                          {
                            image: "logo",
                            width: 70,
                            height: 50,
                          },
                        ],
                        border: [true, true, false, true],
                        width: "20%",
                      },
                      {
                        colSpan: 2,
                        fontSize: 9,
                        stack: [
                          {
                            marginTop: 8,
                            columns: [{ text: "PACIENTE:", bold: true, width: "15%" }, { text: this.paci.DESCRIP }],
                          },
                          {
                            marginTop: 4,
                            columns: [
                              { text: "ID PACIENTE:", bold: true, width: "15%" },
                              { text: this.paci.COD_EDIT, width: "26%" },
                              { text: "EDAD:", bold: true, width: "8%" },
                              { text: this.hcprc.unid_edad.toString() + this.hcprc.vlr_edad.toString(), width: "9%" },
                            ],
                          },
                          {
                            marginTop: 4,
                            columns: [
                              { text: "FECHA NACIMIENTO:", bold: true, width: "23%" },
                              { text: _editFecha3(this.paci.NACIM), width: "18%" },
                              { text: "SEXO:", bold: true, width: "8%" },
                              { text: this.paci.SEXO == "F" ? "Femenino" : "Masculino" },
                            ],
                          },
                        ],
                        width: "80%",
                        border: [false, true, true, true],
                      },
                      {},
                    ],
                  ],
                },
              },
            ],
          };
        },
        content: [
          {
            stack: [
              {
                stack: this.llenarFormato(),
              },
            ],
          },
        ],
        styles: estilosImpresion_impHc(),
      };
    }
  
    llenarFormato() {
      let content = [];
  
      if (this.graficas.imcXsemGest) {
        content.push({
          unbreakable: true,
          stack: [
            {
              marginTop: 10,
              text: "ESTADO NUTRICIONAL I.M.C / E.G",
              style: "center10Bold",
            },
            {
              margin: [36, 5, 0, 0],
              image: this.graficas.imcXsemGest,
              width: 455,
            },
          ],
        });
      }
  
      if (this.graficas.tensXsemGest) {
        content.push({
          unbreakable: true,
          stack: [
            {
              marginTop: 10,
              text: "TENSIÓN MEDIA",
              style: "center10Bold",
            },
            {
              margin: [36, 5, 0, 0],
              image: this.graficas.tensXsemGest,
              width: 455,
            },
          ],
        });
      }
  
      if (this.graficas.altUterXsemGest) {
        content.push({
          unbreakable: true,
          stack: [
            {
              marginTop: 10,
              text: "ALTURA UTERINA X SEMANAS",
              style: "center10Bold",
            },
            {
              margin: [36, 5, 0, 0],
              image: this.graficas.altUterXsemGest,
              width: 455,
            },
          ],
        });
      }
  
      if (this.graficas.ganPesoXsemGest) {
        content.push({
          unbreakable: true,
          stack: [
            {
              marginTop: 10,
              text: "GANACIA DE PESO X SEMANAS",
              style: "center10Bold",
            },
            {
              margin: [36, 5, 0, 0],
              image: this.graficas.ganPesoXsemGest,
              width: 455,
            },
          ],
        });
      }
  
      return content;
    }
  }
  
  const imprimir_GRAF_EMBA = function (params) {
    var formato = new formato_GRAF_EMBA(params);
    formato._init();
  };
  
  module.exports = {
    imprimir_GRAF_EMBA,
  };
  