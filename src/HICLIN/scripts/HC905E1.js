
// CREACION - SANTIAGO.F - JUN 1/2021
const { resolveFiles } = require('electron-updater/out/providers/Provider');
var convert = require('xml-js');
var CryptoJS = require("crypto-js");
var AES = require('crypto-js/aes');

new Vue({
  el: '#HC905E1',
  components: {
    loader_modal: require("../../frameworks/scripts/loader-modal/index.vue"),
  },
  data: {
    form: {
      undServ: '',
      descripUnidServ: '',

      finalidad: '',
      descripFinalidad: '',

      atiende: '',
      descripAtiende: '',

      ano_inicial: '',
      mes_inicial: '',
      dia_inicial: '',

      ano_final: '',
      mes_final: '',
      dia_final: '',

      fechaIni: '',
      fechaFin: '',

      sucursal: '',
      descripSucursal: '',
    },

    array_xml_his: [],
    array_xml_his2: [],
    array_xml_pacientes: [],

    arrayFinalid: [
      { cod: '1', descrip: 'ATENCION PARTO' },
      { cod: '2', descrip: 'ATENCION REC. NACID' },
      { cod: '3', descrip: 'ATENC. PLANIF. FAMIL' },
      { cod: '4', descrip: 'DET. ALT. CRECIM <10' },
      { cod: '5', descrip: 'DET. ALT. DESA. JOVEN' },
      { cod: '6', descrip: 'DET. ALT. EMBARAZO' },
      { cod: '7', descrip: 'DET. ALT. ADULTO' },
      { cod: '8', descrip: 'DET. ALT. AGUD. VISUAL' },
      { cod: '9', descrip: 'DET. ENFERM. PROFES' },
      { cod: '10', descrip: 'NO APLICA' },
      { cod: '11', descrip: 'PATOLOGIA CRONICA' },
    ],

    estado_loader: false,
    progreso: {},
    label_loader: null,
    loader: 1,

    fecha_act: moment().format("YYYYMMDD"),
    fecha_HoraAct: moment().format("YYYYMMDDHHmmss"),
  },

  async created() {
    $this = this;
    loader('show');
    _inputControl('disabled');
    _inputControl('reset');
    nombreOpcion('9-5-G - Sius interfase cundinamarca');
    this.cargarUnidServ_hc905e1();
  },
  methods: {
    validarUnidServ() {
      this.form.undServ == '' ? this.form.undServ = '**' : false;
      validarInputs({
        form: '#unidServ_HC905E1'
      }, () => {
        _regresar_menuhis();
      }, () => {
        let unserv = this.form.undServ;
        if (unserv == '**') {
          this.form.descripUnidServ = 'TODOS LOS HOSPITALIZ.';
          // continue
          this.validarFinalid();
        } else {
          let busq = this._unserv.find(a => a.COD == unserv);
          if (busq != undefined) {
            this.form.descripUnidServ = busq.DESCRIP;
            // continue
            this.validarFinalid();
          } else {
            CON851('01', '01', null, 'error', 'error')
            this.validarUnidServ();
          }
        }
      })
    },

    validarFinalid() {
      this.form.finalidad == '' ? this.form.finalidad = '**' : false;
      validarInputs({
        form: '#finalidad_HC905E1'
      }, () => {
        this.validarUnidServ();
      }, () => {
        let finalidad = this.form.finalidad;
        if (finalidad == '**') {
          this.form.descripFinalidad = 'TODAS LAS FINALID.';
          // continue
          this.validarMedico();
        } else {
          let busq = this.arrayFinalid.find(a => a.cod == finalidad);
          if (busq != undefined) {
            this.form.descripFinalidad = busq.descrip;
            // continue
            this.validarMedico();
          } else {
            CON851('01', '01', null, 'error', 'error')
            this.validarFinalid();
          }
        }
      })
    },

    validarMedico() {
      this.form.atiende == '' ? this.form.atiende = '99' : false;
      validarInputs({
        form: '#personalAtiende_HC905E1'
      }, () => {
        this.validarFinalid();
      }, () => {
        let atiende = this.form.atiende;
        if (atiende == '99') {
          this.form.descripAtiende = 'TODOS LOS MEDICOS';
          // continue
          this.validarFechaIni();
        } else {
          let busq = this._profesionales.find(a => a.IDENTIFICACION == atiende);
          if (busq != undefined) {
            this.form.descripAtiende = busq.NOMBRE;
            // continue
            this.validarFechaIni();
          } else {
            CON851('01', '01', null, 'error', 'error')
            this.validarMedico();
          }
        }
      })
    },

    validarFechaIni() {
      var anoIni = parseInt(this.fecha_act.substring(0, 4));
      var mesIni = parseInt(this.fecha_act.substring(4, 6));
      var diaIni = parseInt(this.fecha_act.substring(6, 8));

      if (diaIni > 1) {
        diaIni = diaIni - 1;
      } else {
        if (mesIni == 1) {
          anoIni = anoIni - 1;
          mesIni = 12;
          diaIni = 31;
        } else {
          mesIni = mesIni - 1;
          switch (mesIni) {
            case '1': diaIni = 31;
            case '2': diaIni = 28;
            case '3': diaIni = 31;
            case '4': diaIni = 30;
            case '5': diaIni = 31;
            case '6': diaIni = 30;
            case '7': diaIni = 31;
            case '8': diaIni = 31;
            case '9': diaIni = 30;
            case '10': diaIni = 31;
            case '11': diaIni = 30;
            case '12': diaIni = 31;
          }
        }
      }

      this.form.ano_inicial = anoIni;
      this.form.mes_inicial = mesIni;
      this.form.dia_inicial = diaIni;
      this.validarAnoIni();
    },

    validarAnoIni() {
      validarInputs({
        form: '#anoInicial'
      }, () => {
        this.validarMedico();
      }, () => {
        var ano = parseInt(this.form.ano_inicial);
        if (ano < 1900) {
          CON851('03', '03', null, 'error', 'error')
          this.validarAnoIni();
        } else {
          // continue
          this.validarMesIni();
        }
      })
    },

    validarMesIni() {
      validarInputs({
        form: '#mesInicial'
      }, () => {
        this.validarAnoIni();
      }, () => {
        this.form.mes_inicial = cerosIzq(this.form.mes_inicial, 2);
        var mes = parseInt(this.form.mes_inicial);
        if (mes < 1 || mes > 12) {
          this.validarMesIni();
        } else {
          // continue
          this.validarDiaIni();
        }
      })
    },

    validarDiaIni() {
      validarInputs({
        form: '#diaInicial'
      }, () => {
        this.validarMesIni();
      }, () => {
        this.form.dia_inicial = cerosIzq(this.form.dia_inicial, 2);
        var dia = parseInt(this.form.dia_inicial);
        if (dia < 1 || dia > 31) {
          this.validarDiaIni();
        } else {
          // continue
          this.validarAnoFin();
        }
      })
    },

    validarAnoFin() {
      this.form.ano_final == '' ? this.form.ano_final = this.form.ano_inicial : false;
      validarInputs({
        form: '#anoFinal'
      }, () => {
        this.validarAnoIni();
      }, () => {
        var ano = parseInt(this.form.ano_final);
        if (ano < 1900) {
          CON851('03', '03', null, 'error', 'error')
          this.validarAnoFin();
        } else {
          // continue
          this.validarMesFin();
        }
      })
    },

    validarMesFin() {
      this.form.mes_final == '' ? this.form.mes_final = this.form.mes_inicial : false;
      validarInputs({
        form: '#mesFinal'
      }, () => {
        this.validarAnoFin();
      }, () => {
        this.form.mes_final = cerosIzq(this.form.mes_final, 2);
        var mes = parseInt(this.form.mes_final);
        if (mes < 1 || mes > 12) {
          this.validarMesFin();
        } else {
          // continue
          this.validarDiaFin();
        }
      })
    },

    validarDiaFin() {
      this.form.dia_final == '' ? this.form.dia_final = this.form.dia_inicial : false;
      validarInputs({
        form: '#diaFinal'
      }, () => {
        this.validarMesFin();
      }, () => {
        this.form.dia_final = cerosIzq(this.form.dia_final, 2);
        var dia = parseInt(this.form.dia_final);
        this.form.fechaIni = parseInt(`${this.form.ano_inicial}${this.form.mes_inicial}${this.form.dia_inicial}`);
        this.form.fechaFin = parseInt(`${this.form.ano_final}${this.form.mes_final}${this.form.dia_final}`);
        if (dia < 1 || dia > 31) {
          this.validarDiaFin();
        } else if (this.form.fechaFin < this.form.fechaIni) {
          CON851('37', '37', null, 'error', 'error')
          this.validarAnoFin();
        } else {
          // continue
          this.validarSucursal();
        }
      })
    },

    validarSucursal() {
      this.form.sucursal == '' ? this.form.sucursal = '**' : false;
      validarInputs({
        form: '#sucursal_HC9058'
      }, () => {
        this.validarAnoFin();
      }, () => {
        let sucursal = this.form.sucursal;
        if (sucursal == '**') {
          this.form.descripSucursal = 'TODOS LAS SUCURSALES';
          // continue
          this.cargarListado_hc9058();
        } else {
          if (sucursal.trim() == '') {
            this.validarSucursal();
          } else {
            this.form.descripSucursal = '';
            // continue
            this.cargarListado_hc9058();
          }
        }
      })
    },

    cargarListado_hc9058() {
      loader('show')
      var datos_envio = datosEnvio()
        + localStorage.Usuario
        + '|' + $this.form.undServ
        + '|' + $this.form.finalidad
        + '|' + $this.form.atiende
        + '|' + $this.form.fechaIni.toString()
        + '|' + $this.form.fechaFin.toString()
        + '|' + $this.form.sucursal;

      postData({ datosh: datos_envio }, get_url("APP/HICLIN/HC905E1.DLL"))
        .then((data) => {
          this._listado = data.LISTADO1;
          this._listado.pop();
          this.cargarListado1_hc9058();
        })
        .catch((err) => {
          loader('hide')
          console.log(err, 'err')
          _regresar_menuhis();
        });
    },

    cargarListado1_hc9058() {
      var datos_envio = datosEnvio()
        + localStorage.Usuario
        + '|' + $this.form.undServ
        + '|' + $this.form.finalidad
        + '|' + $this.form.atiende
        + '|' + $this.form.fechaIni.toString()
        + '|' + $this.form.fechaFin.toString()
        + '|' + $this.form.sucursal;

      postData({ datosh: datos_envio }, get_url("APP/HICLIN/HC905E2.DLL"))
        .then((data) => {
          this._listado1 = data.LISTADO;
          this._listado1.pop();
          this.HC905E2();
        })
        .catch((err) => {
          loader('hide')
          console.log(err, 'err')
          _regresar_menuhis();
        });
    },

    async HC905E2() {
      for (const item of this._listado) {
        let format_pacie = await this.format_xml_pacientes(item);
        this.array_xml_pacientes.push(format_pacie);
      }

      for (const item of this._listado1) {
        let format_his = await this.format_xml_his(item);
        this.array_xml_his.push(format_his);
      }

      for (const item of this._listado1) {
        let format_his2 = await this.format_xml_his2(item);
        this.array_xml_his2.push(format_his2);
      }

      await this.envioPacientes();
      await this.envioHistorias();

      loader('hide')
      _regresar_menuhis();
    },

    async envioPacientes() {
      // var pacientes = this.array_xml_pacientes.slice(0, 1);
      var pacientes = this.array_xml_pacientes;
      let log = []

      for (const item of pacientes) {
        var respuesta = await this.envioPacientes_fetch(item, 'RegistroPaciente')
        let msj = respuesta.msj

        let xml_string = convert.xml2json(item, { compact: true, spaces: 0 });
        let xml_array = JSON.parse(xml_string)
        var llave_paci = xml_array.PRPA_IN201311UV02.controlActProcess.subject.registrationRequest.subject1.patient.id._attributes.extension;
        if (respuesta.code === 0) {
          // console.log('Correcto', msj);

          let estado = msj.MCCI_IN002200UV.attachmentText._text.substring(0, 18).toString();
          if (estado == 'Lectura Correcta') {
            log.push({ xml: item, code: 2, llave_paci: llave_paci, respuesta: msj.MCCI_IN002200UV.attachmentText._text })
            var guardLog = {
              llavePaci: cerosIzq((parseInt(llave_paci)), 15),
              tipo: 1,
              llaveFolio: '',
              estado: 2,
              respuesta: msj.MCCI_IN002200UV.attachmentText._text
            }
          } else {
            log.push({ xml: item, code: 1, llave_paci: llave_paci, respuesta: msj.MCCI_IN002200UV.attachmentText._text })
            var guardLog = {
              llavePaci: cerosIzq(parseInt(llave_paci), 15),
              tipo: 1,
              llaveFolio: '',
              estado: 1,
              respuesta: msj.MCCI_IN002200UV.attachmentText._text
            }
          }

          await this.guardadoRespuestaXml(guardLog);

        } else {
          log.push({ xml: item, code: 1, llave_paci: llave_paci })
          console.log('Error', msj)
        }
      }

      console.log('Logs_pacie', log)
    },

    async envioHistorias() {
      var historias = this.array_xml_his2;
      let log = []

      for (const item of historias) {
        var respuesta = await this.envioPacientes_fetch(item.xml, 'RegistroAtencion')
        let msj = respuesta.msj

        if (respuesta.code === 0) {
          // console.log('Correcto', msj);

          let xml_string = convert.xml2json(item.xml, { compact: true, spaces: 0 });
          let xml_array = JSON.parse(xml_string)
          var historia_obj = xml_array.RCMR_IN000001UV01.controlActProcess.subject.target
          var llave = `${cerosIzq(parseInt(historia_obj.recordTarget.patient.id._attributes.extension), 15)}${historia_obj.id._attributes.extension}`;
          var llave_paci = historia_obj.recordTarget.patient.id._attributes.extension;

          let estado = msj.MCCI_IN002200UV.attachmentText._text.substring(0, 18).toString();
          if (estado == 'Lectura Correcta') {
            log.push({ xml: item.xml, code: 2, llave: llave, respuesta: msj.MCCI_IN002200UV.attachmentText._text })
            var guardLog = {
              llavePaci: cerosIzq((parseInt(llave_paci)), 15),
              tipo: 2,
              llaveFolio: llave,
              estado: 2,
              respuesta: msj.MCCI_IN002200UV.attachmentText._text
            }
          } else {
            log.push({ xml: item.xml, code: 1, llave: llave, respuesta: msj.MCCI_IN002200UV.attachmentText._text })
            var guardLog = {
              llavePaci: cerosIzq((parseInt(llave_paci)), 15),
              tipo: 2,
              llaveFolio: llave,
              estado: 1,
              respuesta: msj.MCCI_IN002200UV.attachmentText._text
            }
          }

          await this.guardadoRespuestaXml(guardLog);

        } else {
          log.push({ xml: item.xml, code: 1, llave: llave })
          console.log('Error', msj)
        }
      }

      console.log('Logs_historias', log)
    },

    envioPacientes_fetch(item, servicio) {
      return new Promise((res,) => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/xml");

        var raw = item;

        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };

        fetch(`https://app.cundinamarca.gov.co:7087/${servicio}`, requestOptions)
          .then(response => response.text())
          .then(result => {
            var respuesta = convert.xml2json(result, { compact: true, spaces: 0 });
            var respuesta_json = JSON.parse(respuesta);

            res({ code: 0, msj: respuesta_json })
          })
          .catch(error => {
            res({ code: -1, msj: error })
          });

      })
    },

    async guardadoRespuestaXml(guardLog) {
      var datos = `${guardLog.llavePaci}|${guardLog.tipo}|${guardLog.llaveFolio}|${guardLog.estado}|${guardLog.respuesta}`;
      console.log('envio: ', datos);
      await postData({ datosh: datosEnvio() + datos }, get_url("app/HICLIN/HC905E3.DLL"))
        .then((data) => {
          console.log(data, 'GUARDA')
        })
        .catch((err) => {
          console.log(err, "error");
          loader("hide");
          _regresar_menuhis();
        });
    },

    format_xml_pacientes(item) {
      return new Promise((res) => {
        let xml = `<?xml version="1.0" encoding="UTF-8"?><PRPA_IN201311UV02 xmlns="urn:hl7-org:v3" ITSVersion="XML_1.0" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><id extension="20120514229"/><creationTime value="aaaammddhhnnss"/><versionCode code="V3-2009N"/><interactionId extension="PRPA_IN201311UV02" root="2.16.840.1.113883.1.6" /><processingCode code="T" /><processingModeCode code="T" /><acceptAckCode code="AL" /><receiver><device classCode="DEV" determinerCode="INSTANCE"><id root="UNK" extension="Cdigo Sius" /><softwareName displayName=" Sistema de Informacion Unificado de Salud " /><asAgent classCode="AGNT"><representedOrganization classCode="ORG" determinerCode="INSTANCE"><id root="codHabilitacionPrestadorSalud" extension="p1p2p3p4p5p6" assigningAuthorityName="MinProteccionSocial" /><name xsi:type="ON">PROSOFT</name><notificationParty classCode="CON"><id root="codHabilitacionPrestadorSalud" extension="p1p2p3p4p5p6" assigningAuthorityName="MinProteccionSocial" /><contactOrganization classCode="ORG" determinerCode="INSTANCE"><realmCode code="UNK"/><id root="UNK" extension="202" /><name></name><contactParty classCode="CON"><contactPerson classCode="PSN" determinerCode="INSTANCE"><name></name></contactPerson></contactParty></contactOrganization></notificationParty></representedOrganization></asAgent></device></receiver><sender><device classCode="DEV" determinerCode="INSTANCE"><realmCode code="LINK-WEB-SERVI"/><id root="UNK" extension="202" /><softwareName displayName="Prosoft Pacientes"/><asAgent classCode="AGNT"><representedOrganization classCode="ORG" determinerCode="INSTANCE"><id root="codHabilitacionPrestadorSalud" extension="p1p2p3p4p5p6" assigningAuthorityName="MinProteccionSocial" /><name xsi:type="ON">PROSOFT</name><notificationParty classCode="CON"><id root="codHabilitacionPrestadorSalud" extension="p1p2p3p4p5p6" assigningAuthorityName="MinProteccionSocial" /><contactOrganization determinerCode="INSTANCE" classCode="ORG"><realmCode code="UNK"/><id root="UNK" extension="202" /><name>PROSOFT Pacientes</name><contactParty classCode="CON"><contactPerson determinerCode="INSTANCE" classCode="PSN"><name>ROBERTO RAMIREZ</name></contactPerson></contactParty></contactOrganization></notificationParty></representedOrganization></asAgent></device></sender><controlActProcess classCode="CACT" moodCode="EVN"><realmCode code="NEWDATA"/><code code="PRPA_TE201311UV02" codeSystem="2.16.840.1.113883.1.18" codeSystemName="TriggerEventID" displayName="Patient Registry Add Request" /><languageCode code="es-CO" codeSystem="2.16.840.1.113883.1.11.11526" codeSystemName="HumanLanguage" displayName="Espanol Colombia" /><subject typeCode="SUBJ" contextConductionInd="true"><registrationRequest classCode="REG" moodCode="RQO">><effectiveTime value="aaaammddhhnnss"/><subject1 typeCode="SBJ"><patient classCode="PAT"><id root="d1d" extension="C1C2C3C4C5C6C7C" assigningAuthorityName="RNEC" /><addr use="HP"><country code="169" codeSystem="UNK" codeSystemName="DANE" displayName="COLOMBIA" /><state code="D1" codeSystem="UNK" codeSystemName="DANE" displayName="d1d2d3d4d5d6d7d8d9d0" /><city code="c1c" codeSystem="UNK" codeSystemName="DANE" displayName="x1x2x3x4x5x6x7x8x9x0" /><precinct code="11" codeSystem="UNK" codeSystemName="DANE" displayName="centro" /><streetAddressLine>c1c2c3c4c5c6c7c8c9c0c1c2c3c4c5</streetAddressLine></addr><telecom value="t1t2t3t4t5" use="HP"/><telecom value="" use="MC"/><telecom value="" use="DIR"/><patientPerson><id root="d1d" extension="C1C2C3C4C5C6C7C" assigningAuthorityName="RNEC" /><name><given>n1n1n1n1n1n1</given><given>n2n2n2n2n2n2</given><family>a1a1a1a1a1a1a1a</family><family>a2a2a2a2a2a2a2a</family></name><administrativeGenderCode code="x" codeSystem="2.16.840.1.113883.5.1" codeSystemName="administrativeGender" displayName="f1f2f3f4f" /><birthTime value="aaaammdd" /><maritalStatusCode code="x1x" codeSystem="UNK" codeSystemName="RNEC" displayName="u1u2u3u4u5" /><educationLevelCode code="x1" codeSystem="UNK" codeSystemName="MINEDUCACION" displayName="e1e2e3e4e5e6e7e8e9e0" /><disabilityCode code="UNK" codeSystem="UNK" codeSystemName="MINSALUD" displayName="" /><livingArrangementCode code="NO" codeSystem="UNK" codeSystemName="MINSALUD" displayName="Ninguno" /><ethnicGroupCode code="ND" codeSystem="UNK" codeSystemName="DANE" displayName="Ninguno de los anteriores" /><asEmployee classCode="EMP"><occupationCode code="" displayName="" codeSystemName="MINEDUCACION" codeSystem="UNK"/><employerOrganization xsi:nil="true"/></asEmployee><asCitizen><politicalNation><code code="UNK" codeSystem="UNK" codeSystemName="DANE" displayName="" /></politicalNation></asCitizen><personalRelationship><code code="ACU" codeSystem="UNK" codeSystemName="DANE" displayName="ACUDIENTE" /><statusCode code="" codeSystem="UNK" codeSystemName="DANE" displayName="" /><relationshipHolder1 classCode="PSN" determinerCode="INSTANCE"><id root="" extension="" assigningAuthorityName="RNEC" /><name xsi:type="PN"></name><contactParty classCode="CON"><addr use="HP"><precinct code="" codeSystem="UNK" codeSystemName="DANE" displayName="" /><streetAddressLine></streetAddressLine></addr><telecom value="" use="HP"/><telecom value="" use="MC"/></contactParty></relationshipHolder1></personalRelationship><careGiver><id root="codEntidadAdministradoSal" extension="e1e2e3" assigningAuthorityName="MinProteccionSocial" /><code code="CG" codeSystem="2.16.840.1.113883.5.111" codeSystemName="RoleCode" displayName="CareGiver" /><careGiverPerson xsi:nil="true" /></careGiver><birthPlace><addr><country code="169" displayName="COLOMBIA" codeSystemName="DANE" codeSystem="UNK"/><state code="x1" displayName="d1d2d3d4d5d6d7d8d9d0" codeSystemName="DANE" codeSystem="UNK"/><city code="c1c" displayName="x1x2x3x4x5x6x7x8x9x0" codeSystemName="DANE" codeSystem="UNK"/></addr></birthPlace></patientPerson><providerOrganization xsi:nil="true"/><coveredPartyOf typeCode="COV"><coverageRecord classCode="COV" moodCode="EVN"><id extension="C1C2C3C4C5C6C7C" root="UNK"/><statusCode code="active"/><beneficiary xsi:nil="true"/><component typeCode="COMP"><policyOrProgram classCode="COV" moodCode="EVN"><code code="x" displayName="e1e2e3e4e5e6e7e8e9e0" codeSystemName="RIPS_TipoUsuario" codeSystem="UNK"/><statusCode code="active"/><coveredParty typeCode="COV" negationInd="false"><coveredParty classCode="COVPTY"><id root="UNK" extension="C1C2C3C4C5C6C7C" /><code code="x" displayName="b1b2b3b4b5b6b7b8b9b0" codeSystemName="RIPS_TipoAfiliado" codeSystem="UNK"/><underwritingOrganization xsi:nil="true"/><indirectAuthority2 xsi:nil="true"/></coveredParty></coveredParty><holder xsi:nil="true"/><responsibleParty typeCode="RESP"><functionCode code="FULINRD" codeSystem="2.16.840.1.113883.1.11.19905" codeSystemName="SponsorParticipationFunction" displayName="" /><sponsor classCode="SPNSR"><sponsorOrganization classCode="ORG" determinerCode="INSTANCE"><id root="codEntidadAdministradoSal" extension="e1e2e3" assigningAuthorityName="MinProteccionSocial" /><name>p1p2p3p4p5p6p7p8p9p0p1p2p3p4p5</name></sponsorOrganization><underwritingOrganization xsi:nil="true"/></sponsor></responsibleParty><definition xsi:nil="true"/><replacementOf xsi:nil="true"/></policyOrProgram></component></coverageRecord></coveredPartyOf></patient></subject1><author typeCode="AUT"><assignedEntity xsi:nil="true"/></author></registrationRequest></subject></controlActProcess></PRPA_IN201311UV02>`
        var xml_string = convert.xml2json(xml, { compact: true, spaces: 0 });
        let xml_array = JSON.parse(xml_string)

        xml_array.PRPA_IN201311UV02.creationTime._attributes.value = this.fecha_HoraAct;

        var cod_ciu_usu = $_USUA_GLOBAL[0].COD_CIUD;
        var nuir_usu = $_USUA_GLOBAL[0].NUIR;
        if ($_USUA_GLOBAL[0].PREFIJ == 'GR') {
          var prefij_usu = '01';
        } else {
          var prefij_usu = $_USUA_GLOBAL[0].PREFIJ;
        }

        var cod_hcil_l1 = `${cod_ciu_usu}${nuir_usu}${prefij_usu}`;
        cod_hcil_l1 = cod_hcil_l1.toString();

        let paciente_obj = xml_array.PRPA_IN201311UV02.controlActProcess.subject.registrationRequest.subject1.patient;

        xml_array.PRPA_IN201311UV02.receiver.device.asAgent.representedOrganization.id._attributes.extension = cod_hcil_l1;

        xml_array.PRPA_IN201311UV02.receiver.device.asAgent.representedOrganization.notificationParty.id._attributes.extension = cod_hcil_l1;

        xml_array.PRPA_IN201311UV02.sender.device.asAgent.representedOrganization.id._attributes.extension = cod_hcil_l1;

        xml_array.PRPA_IN201311UV02.sender.device.asAgent.representedOrganization.notificationParty.id._attributes.extension = cod_hcil_l1;

        xml_array.PRPA_IN201311UV02.controlActProcess.subject.registrationRequest.effectiveTime._attributes.value = this.fecha_HoraAct;

        paciente_obj.id._attributes.root = item.TIPO_ID;

        paciente_obj.id._attributes.extension = item.NRO_ID_PACIE;

        paciente_obj.addr.state._attributes.code = item.DPTO;

        paciente_obj.addr.state._attributes.displayName = item.NOMBRE_CIU;

        paciente_obj.addr.city._attributes.code = item.CIUD;

        paciente_obj.addr.city._attributes.displayName = item.NOMBRE_CIU2;

        paciente_obj.addr.streetAddressLine._text = item.DIRECC;

        paciente_obj.telecom[0]._attributes.value = item.TELEFONO;

        paciente_obj.patientPerson.id._attributes.root = item.TIPO_ID2;

        paciente_obj.patientPerson.id._attributes.extension = item.NRO_ID_PACIE2;

        paciente_obj.patientPerson.name.given[0]._text = item["1ER_NOM"];

        paciente_obj.patientPerson.name.given[1]._text = item["2DO_NOM"];

        paciente_obj.patientPerson.name.family[0]._text = item["1ER_APEL"];

        paciente_obj.patientPerson.name.family[1]._text = item["2DO_APEL"];

        paciente_obj.patientPerson.administrativeGenderCode._attributes.code = item.SEXO;

        paciente_obj.patientPerson.administrativeGenderCode._attributes.displayName = item.DESCRIP_SEXO;

        paciente_obj.patientPerson.birthTime._attributes.value = item.NACIM;

        paciente_obj.patientPerson.maritalStatusCode._attributes.code = item.EST_CIV;

        paciente_obj.patientPerson.maritalStatusCode._attributes.displayName = item.DESCRIP_EST_CIV;

        paciente_obj.patientPerson.educationLevelCode._attributes.code = item.NIV_ESTUD;

        paciente_obj.patientPerson.educationLevelCode._attributes.displayName = item.DESCRIP_NIV_ESTUD;

        paciente_obj.patientPerson.careGiver.id._attributes.extension = item.EPS;

        paciente_obj.patientPerson.birthPlace.addr.state._attributes.code = item.DPT2;

        paciente_obj.patientPerson.birthPlace.addr.state._attributes.displayName = item.NOMBRE_CIU3;

        paciente_obj.patientPerson.birthPlace.addr.city._attributes.code = item.CIU_USU;

        paciente_obj.patientPerson.birthPlace.addr.city._attributes.displayName = item.NOMBRE_CIU4;

        paciente_obj.coveredPartyOf.coverageRecord.id._attributes.extension = item.NRO_ID_PACIE3;

        paciente_obj.coveredPartyOf.coverageRecord.component.policyOrProgram.code._attributes.code = item.REGI;

        paciente_obj.coveredPartyOf.coverageRecord.component.policyOrProgram.code._attributes.displayName = item.DESCRIP_REGI;

        paciente_obj.coveredPartyOf.coverageRecord.component.policyOrProgram.coveredParty.coveredParty.id._attributes.extension = item.NRO_ID_PACIE4;

        paciente_obj.coveredPartyOf.coverageRecord.component.policyOrProgram.coveredParty.coveredParty.code._attributes.code = item.TIPO_AFIL;

        paciente_obj.coveredPartyOf.coverageRecord.component.policyOrProgram.coveredParty.coveredParty.code._attributes.displayName = item.DESCRIP_TIPO_AFIL;

        paciente_obj.coveredPartyOf.coverageRecord.component.policyOrProgram.responsibleParty.sponsor.sponsorOrganization.id._attributes.extension = item.EPS2;

        paciente_obj.coveredPartyOf.coverageRecord.component.policyOrProgram.responsibleParty.sponsor.sponsorOrganization.name._text = item.NOMBRE1_ENT;

        var $_USUARIO = 'PROSOFT';
        var $_PASSWORD = 'GEBC641218';
        var $_APLICACION = '202';
        var $_IPS = '258450189601';
        var fecha_act = moment().format("DD/MM/YYYY");

        var $_URL = `Usuario=${$_USUARIO}&Password=${$_PASSWORD}&TipoDocumento=${item.TIPO_ID}&Numero=${item.NRO_ID_PACIE}&Aplicacion=${$_APLICACION}&Fecha=${fecha_act}&Ips=${$_IPS}`;

        var encrypt = this.get_encrypt($_URL)

        xml_array.PRPA_IN201311UV02.sender.device.realmCode._attributes.code = encrypt

        xml_string = convert.js2xml(xml_array, { compact: true, spaces: 0 });

        xml_string = xml_string.replace(/[\n]/g, '');

        res(xml_string)
      })
    },

    async format_xml_his(item) {
      return new Promise(async (res) => {
        var xml = `<?xml version="1.0" encoding="UTF-8"?><ClinicalDocument xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" moodCode="EVN" xmlns="urn:hl7-org:v3"><realmCode code="CO"/><typeId root="2.16.840.1.113883.1.3" extension="POCD_HD000040" /><id root="UNK" extension="x1x2x3x4" /><code code="11488-4" codeSystem="2.16.840.1.113883.6.1" codeSystemName="LOINC" displayName="Consultation note" /><title>FOLIO DE HISTORIA CLINICA</title><effectiveTime value="aaaammddhhnnss"/><confidentialityCode code="R" codeSystem="2.16.840.1.113883.5.25" codeSystemName="confidentiality" displayName="Restringido" /><languageCode code="es-CO" codeSystem="2.16.840.1.113883.1.11.11526" codeSystemName="HumanLanguage" /><recordTarget typeCode="RCT" contextControlCode="OP"><patientRole classCode="PAT"><id root="d1d" extension="C1C2C3C4C5C6C7C" assigningAuthorityName="RNEC"/><patient classCode="PSN" determinerCode="INSTANCE"><name><given>n1n1n1n1n1n1</given><given>n2n2n2n2n2n2</given><family>a1a1a1a1a1a1a1a</family><family>a2a2a2a2a2a2a2a</family></name><administrativeGenderCode code="x" displayName="f1f2f3f4f" codeSystemName="administrativeGender" codeSystem="2.16.840.1.113883.5.1"/><birthTime value="aaaammdd"/></patient><providerOrganization classCode="ORG" determinerCode="INSTANCE"><id root="p1p2p3p4p5p6" extension="codHabilitacionPrestadorSalud" assigningAuthorityName="MinProteccionSocial" /><name>e1e2e3e4e5e6e7e8e9e0e1e2e3e4e5</name></providerOrganization></patientRole></recordTarget><author typeCode="AUT" contextControlCode="OP"><functionCode code="PRF" codeSystem="2.16.840.1.113883.5.88" codeSystemName="ParticipationFunction" displayName="performer" /><time value="aaaammddhhnnss"/><assignedAuthor classCode="ASSIGNED"><id root="UNK" extension="C1C2C3C4C5" /><assignedPerson classCode="PSN" determinerCode="INSTANCE"><name><given>n1n2n3n4n5n6n7n8n9n0n1n2n3n4n5</given><given>n1n2n3n4n5n6n7n8n9n0n1n2n3n4n5</given><family>a1a1a1a1a1a1a1a1a1a1</family><family>a2a2a2a2a2a2a2a2a2a2</family></name></assignedPerson></assignedAuthor></author><dataEnterer typeCode="ENT" contextControlCode="OP"><time value="aaaammddhhnnss"/><assignedEntry classCode="ASSIGNED"><id root="UNK" extension="C1C2C3C4C5" /><assignedPerson classCode="PSN" determinerCode="INSTANCE"><name xsi:type="PN"><given>n1n2n3n4n5n6n7n8n9n0n1n2n3n4n5</given><given>n1n2n3n4n5n6n7n8n9n0n1n2n3n4n5</given><family>a1a1a1a1a1a1a1a1a1a1</family><family>a2a2a2a2a2a2a2a2a2a2</family></name></assignedPerson></assignedEntry></dataEnterer><custodian typeCode="CST"><assignedCustodian classCode="ASSIGNED"><representedCustodianOrganization classCode="ORG" determinerCode="INSTANCE"><id root="codHabilitacionPrestadorSalud" extension="p1p2p3p4p5p6" assigningAuthorityName="MinProteccionSocial" /><name>e1e2e3e4e5e6e7e8e9e0e1e2e3e4e5</name><addr>e1e2e3e4e5e6e7e8e9e0e1e2e3e4e5</addr></representedCustodianOrganization></assignedCustodian></custodian><participant typeCode="COV" contextControlCode="OP"><functionCode code="FULINRD" codeSystem="2.16.840.1.113883.1.11.19903" codeSystemName="CoverageParticipationFunction" displayName="fully insured" /><time><low value="20100101000000"/><high value="20100101000000"/></time><associatedEntity classCode="SPNSR"><code code="GT" codeSystem="2.16.840.1.113883.5.111" codeSystemName="RoleCode" displayName="Guarantor" /><scopingOrganization classCode="ORG" determinerCode="INSTANCE"><id root="codEntidadAdministradoSal" extension="e1e2e3" assigningAuthorityName="MinProteccionSocial" /><name>p1p2p3p4p5p6p7p8p9p0p1p2p3p4p5</name></scopingOrganization></associatedEntity></participant><componentOf><realmCode code="385" codeSystem="UNK" codeSystemName="ESPECIALIDAD" displayName="MEDICINA GENERAL" /><encompassingEncounter classCode="ENC" moodCode="EVN"><id root="UNK" extension="534525" /><code code="x" codeSystem="UNK" codeSystemName="TIPO_ATENCION"  displayName="c1c2c3c4c5c6" /><location><healthCareFacility><code code="0x1" codeSystem="UNK" codeSystemName="AREA_SERVICIO" displayName="n1n2n3n4n5n6n7n8n9n0n1n2n3n4n5" /></healthCareFacility></location></encompassingEncounter></componentOf><component><structuredBody classCode="DOCBODY" moodCode="EVN"><component><section classCode="DOCSECT" moodCode="EVN"><code code="72225-6" codeSystem="2.16.840.1.113883.6.1" codeSystemName="LOINC" displayName="Progress note" /><title>S-O-A-P</title><component><section classCode="DOCSECT" moodCode="EVN"><code code="61150-9" codeSystem="2.16.840.1.113883.6.1" codeSystemName="LOINC" displayName="Subjective Narrative" /><title>SUBJETIVO</title><text mediaType="text/x-hl7-text+xml"></text></section></component><component><section classCode="DOCSECT" moodCode="EVN"><code code="61149-1" codeSystem="2.16.840.1.113883.6.1" codeSystemName="LOINC" displayName="Objective Narrative" /><title>OBJETIVO</title><text mediaType="text/x-hl7-text+xml"></text></section></component><component><section classCode="DOCSECT" moodCode="EVN"><code code="51848-0" displayName="Assessment note" codeSystemName="LOINC" codeSystem="2.16.840.1.113883.6.1"/><title>ANALISIS</title><text mediaType="text/x-hl7-text+xml"></text></section></component><component><section classCode="DOCSECT" moodCode="EVN"><code code="51847-2" codeSystem="2.16.840.1.113883.6.1" codeSystemName="LOINC" displayName="Assessment Plan" /><title>PLAN</title><text mediaType="text/x-hl7-text+xml"></text></section></component></section></component><component><section classCode="DOCSECT" moodCode="EVN"><code code="11322-5" codeSystem="2.16.840.1.113883.6.1" codeSystemName="LOINC" displayName="History of general health" /><title>ANTECEDENTES</title><component><section classCode="DOCSECT" moodCode="EVN"><code code="n1n2n3n" codeSystem="2.16.840.1.113883.6.1" codeSystemName="LOINC" displayName="DESCRPLOINC" /><title>x1x2x3x4x5x6x7x8x9</title><text mediaType="text/x-hl7-text+xml"><list><item></item></list></text></section></component></section></component><component><section moodCode="EVN" classCode="DOCSECT"><code code="29548-5" displayName="Diagnosis" codeSystemName="LOINC" codeSystem="2.16.840.1.113883.6.1"/><title>DIAGNOSTICOS</title><text mediaType="text/x-hl7-text+xml"><list><item><caption ID="x1x1"><sup>e1e2e3e4e5e6e7e8e9e0e1e2e3e4e5e6e7e8e9e0</sup></caption></item></list></text><entry><observation moodCode="EVN" classCode="COND"><code code="33999-4" displayName="Status" codeSystemName="LOINC" codeSystem="2.16.840.1.113883.6.1"/><text/><value code="x1x1" displayName="e1e2e3e4e5e6e7e8e9e0e1e2e3e4e5e6e7e8e9e0" codeSystemName="CIE-10" codeSystem="2.16.840.1.113883.6.3" xsi:type="CD"/></observation></entry></section></component><component><section moodCode="EVN" classCode="DOCSECT"><code code="18776-5" displayName="Plan of treatment" codeSystemName="LOINC" codeSystem="2.16.840.1.113883.6.1"/><title>PLAN DE MANEJO</title><component><section moodCode="EVN" classCode="DOCSECT"><code code="10160-0" displayName="Medication Use" codeSystemName="LOINC" codeSystem="2.16.840.1.113883.6.1"/><title>MEDICAMENTOS</title><text mediaType="text/x-hl7-text+xml"><list><item><caption ID="x1x2x3x4x5x6x"><sup>c1c2c3c4c5c6c7c8c9c0c1c2c3c4c5n1n2n3n4n5n6n7n8n9n0n1n2n3n</sup></caption></item></list></text><entry><substanceAdministration moodCode="RQO" classCode="SBADM"><code code="10160-0" displayName="Medication Use" codeSystemName="LOINC" codeSystem="2.16.840.1.113883.6.1"/><text>m1m2m3m4m5m6m7m8m9m0m1m2m3m4m5m6m7m8m9m0c1c2c3c4c5c6c7c8c9c0c1c2c3c4c5c6c7c8c9       </text><routeCode code="PO" codeSystemName="RouteOfAdministration" codeSystem="2.16.840.1.113883.5.112"/><rateQuantity value="x1x2x"/><consumable typeCode="CSM"><manufacturedProduct><manufacturedLabeledDrug classCode="MMAT"><code code="x1x2x3x4x5x6x" displayName="c1c2c3c4c5c6c7c8c9c0c1c2c3c4c5n1n2n3n4n5n6n7n8n9n0n1n2n3n" codeSystemName="CUMS" codeSystem="UNK"/></manufacturedLabeledDrug></manufacturedProduct></consumable></substanceAdministration></entry></section></component></section><section moodCode="EVN" classCode="DOCSECT"><code code="18776-5" displayName="Plan of treatment" codeSystemName="LOINC" codeSystem="2.16.840.1.113883.6.1"/><title>PLAN DE MANEJO</title><component><section moodCode="EVN" classCode="DOCSECT"><code code="18776-5" displayName="Plan of treatment" codeSystemName="LOINC" codeSystem="2.16.840.1.113883.6.1"/><title>SERVICIOS</title><text mediaType="text/x-hl7-text+xml"><list><item><caption ID="x1x2x3x4x5x6x"><sup>c1c2c3c4c5c6c7c8c9c0c1c2c3c4c5n1n2n3n4n5n6n7n8n9n0n1n2n3n</sup></caption>m1m2m3m4m5m6m7m8m9m0m1m2m3m4m5m6m7m8m9m0c1c2c3c4c5c6c7c8c9c0c1c2c3c4c5c6c7c8c9</item></list></text><entry><observation classCode="OBS" moodCode="RQO"><code code="18776-5" codeSystem="2.16.840.1.113883.6.1" codeSystemName="LOINC" displayName="Plan of treatment" /><repeatNumber value="10" /><value xsi:type="CD" code="x1x2x3x4x5x6x" codeSystem="UNK" codeSystemName="CUPS" displayName="c1c2c3c4c5c6c7c8c9c0c1c2c3c4c5n1n2n3n4n5n6n7n8n9n0n1n2n3n" /></observation></entry></section></component></section></component></structuredBody></component></ClinicalDocument>`

        var xml_string = convert.xml2json(xml, { compact: true, spaces: 0 });
        let xml_array = JSON.parse(xml_string)
        // console.log(xml_array);

        var cod_ciu_usu = $_USUA_GLOBAL[0].COD_CIUD;
        var nuir_usu = $_USUA_GLOBAL[0].NUIR;
        if ($_USUA_GLOBAL[0].PREFIJ == 'GR') {
          var prefij_usu = '01';
        } else {
          var prefij_usu = $_USUA_GLOBAL[0].PREFIJ;
        }

        let folio = item.FOLIO

        var cod_hcil_l1 = `${cod_ciu_usu}${nuir_usu}${prefij_usu}`;
        cod_hcil_l1 = cod_hcil_l1.toString();

        xml_array.ClinicalDocument.id._attributes.extension = folio;

        xml_array.ClinicalDocument.effectiveTime._attributes.value = `${item.FECHA}01`;

        xml_array.ClinicalDocument.recordTarget.patientRole.id._attributes.root = item.TIPO_ID;

        xml_array.ClinicalDocument.recordTarget.patientRole.id._attributes.extension = item.NRO_ID_PACIE;

        xml_array.ClinicalDocument.recordTarget.patientRole.patient.name.given[0]._text = item["1ER_NOM"];

        xml_array.ClinicalDocument.recordTarget.patientRole.patient.name.given[1]._text = item["2DO_NOM"];

        xml_array.ClinicalDocument.recordTarget.patientRole.patient.name.family[0]._text = item["1ER_APEL"];

        xml_array.ClinicalDocument.recordTarget.patientRole.patient.name.family[1]._text = item["2DO_APEL"];

        xml_array.ClinicalDocument.recordTarget.patientRole.patient.administrativeGenderCode._attributes.code = item.SEXO;

        xml_array.ClinicalDocument.recordTarget.patientRole.patient.administrativeGenderCode._attributes.displayName = item.DESCRIP_SEXO;

        xml_array.ClinicalDocument.recordTarget.patientRole.patient.birthTime._attributes.value = item.NACIM;

        xml_array.ClinicalDocument.recordTarget.patientRole.providerOrganization.id._attributes.root = cod_hcil_l1;

        xml_array.ClinicalDocument.recordTarget.patientRole.providerOrganization.name._text = $_USUA_GLOBAL[0].NOMBRE;

        xml_array.ClinicalDocument.author.time._attributes.value = item.FECHA2;

        xml_array.ClinicalDocument.author.assignedAuthor.id._attributes.extension = item.MED;

        xml_array.ClinicalDocument.author.assignedAuthor.assignedPerson.name.given[0]._text = item.NOMB1_TER;

        xml_array.ClinicalDocument.author.assignedAuthor.assignedPerson.name.given[1]._text = item.NOMB2_TER;

        xml_array.ClinicalDocument.author.assignedAuthor.assignedPerson.name.family[0]._text = item.APEL1_TER;

        xml_array.ClinicalDocument.author.assignedAuthor.assignedPerson.name.family[1]._text = item.APEL2_TER;

        xml_array.ClinicalDocument.dataEnterer.time._attributes.value = item.FECHA3;

        xml_array.ClinicalDocument.dataEnterer.assignedEntry.id._attributes.extension = item.MED2;

        xml_array.ClinicalDocument.dataEnterer.assignedEntry.assignedPerson.name.given[0]._text = item.NOMB1_TER2;

        xml_array.ClinicalDocument.dataEnterer.assignedEntry.assignedPerson.name.given[1]._text = item.NOMB2_TER2;

        xml_array.ClinicalDocument.dataEnterer.assignedEntry.assignedPerson.name.family[0]._text = item.APEL1_TER2;

        xml_array.ClinicalDocument.dataEnterer.assignedEntry.assignedPerson.name.family[1]._text = item.APEL2_TER2;

        xml_array.ClinicalDocument.custodian.assignedCustodian.representedCustodianOrganization.id._attributes.extension = cod_hcil_l1;

        xml_array.ClinicalDocument.custodian.assignedCustodian.representedCustodianOrganization.name._text = $_USUA_GLOBAL[0].NOMBRE;

        xml_array.ClinicalDocument.custodian.assignedCustodian.representedCustodianOrganization.addr._text = $_USUA_GLOBAL[0].NOMBRE;

        xml_array.ClinicalDocument.participant.associatedEntity.scopingOrganization.id._attributes.extension = item.EPS2;

        xml_array.ClinicalDocument.participant.associatedEntity.scopingOrganization.name._text = item.NOMBRE1_ENT2;

        xml_array.ClinicalDocument.componentOf.encompassingEncounter.code._attributes.code = item.SERV_COD;

        xml_array.ClinicalDocument.componentOf.encompassingEncounter.code._attributes.displayName = item.DESCRIP_SERV;

        xml_array.ClinicalDocument.componentOf.encompassingEncounter.location.healthCareFacility.code._attributes.code = `0${item.SERV}`;

        xml_array.ClinicalDocument.componentOf.encompassingEncounter.location.healthCareFacility.code._attributes.displayName = item.DESCRIP_UNID_SERV;

        xml_array.ClinicalDocument.component.structuredBody.component[0].section.component[0].section.text._text = `${item.MOTIV1}${item.MOTIV2}${item.MOTIV3}${item.MOTIV4}`;

        var llave_det = `${cerosIzq(item.NRO_ID_PACIE, 15)}${item.FOLIO}`;
        await this.cargarDestalles(llave_det, item.SERV)

        let busqDetalle_1001 = this.detalles.find(el => el['COD-DETHC'] == '1001' && el['LLAVE-HC'] == llave_det)
        if (busqDetalle_1001) {
          xml_array.ClinicalDocument.component.structuredBody.component[0].section.component[1].section.text._text = busqDetalle_1001.DETALLE.replace(/(?:\&)/g, "\n");
        } else {
          xml_array.ClinicalDocument.component.structuredBody.component[0].section.component[1].section.text._text = '';
        }

        let busqDetalle_4005 = this.detalles.find(el => el['COD-DETHC'] == '4005' && el['LLAVE-HC'] == llave_det)
        if (busqDetalle_4005) {
          xml_array.ClinicalDocument.component.structuredBody.component[0].section.component[2].section.text._text = busqDetalle_4005.DETALLE.replace(/(?:\&)/g, "\n");
        } else {
          xml_array.ClinicalDocument.component.structuredBody.component[0].section.component[2].section.text._text = '';
        }

        let busqDetalle_7501 = this.detalles.find(el => el['COD-DETHC'] == '7501' && el['LLAVE-HC'] == llave_det)
        if (busqDetalle_7501) {
          xml_array.ClinicalDocument.component.structuredBody.component[0].section.component[3].section.text._text = busqDetalle_7501.DETALLE.replace(/(?:\&)/g, "\n");
        } else {
          xml_array.ClinicalDocument.component.structuredBody.component[0].section.component[3].section.text._text = '';
        }

        var section = '<section classCode="DOCSECT" moodCode="EVN"><code code="n1n2n3n" codeSystem="2.16.840.1.113883.6.1" codeSystemName="LOINC" displayName="DESCRPLOINC" /><title>x1x2x3x4x5x6x7x8x9</title><text mediaType="text/x-hl7-text+xml"><list><item>a1a2a3a4a5</item></list></text></section>';
        var section1 = convert.xml2json(section, { compact: true, spaces: 0 });
        let section_array = JSON.parse(section1)

        xml_array.ClinicalDocument.component.structuredBody.component[1].section.component = [];

        let busqDetalle_2002 = this.detalles.find(el => el['COD-DETHC'] == '2002' && el['LLAVE-HC'] == llave_det)
        if (busqDetalle_2002) {
          if (busqDetalle_2002.DETALLE.trim() != '') {
            section_array.section.text.list.item._text = busqDetalle_2002.DETALLE.replace(/(?:\&)/g, "\n");
            section_array.section.code._attributes.code = '10557-2';
            section_array.section.title._text = 'FAMILIARES';
            xml_array.ClinicalDocument.component.structuredBody.component[1].section.component.push(JSON.parse(JSON.stringify(section_array)));
          }
        }

        let busqDetalle_2010 = this.detalles.find(el => el['COD-DETHC'] == '2010' && el['LLAVE-HC'] == llave_det)
        if (busqDetalle_2010) {
          if (busqDetalle_2010.DETALLE.trim() != '') {
            section_array.section.text.list.item._text = busqDetalle_2010.DETALLE.replace(/(?:\&)/g, "\n");
            section_array.section.code._attributes.code = '11348-0';
            section_array.section.title._text = 'MEDICOS';
            xml_array.ClinicalDocument.component.structuredBody.component[1].section.component.push(JSON.parse(JSON.stringify(section_array)));
          }
        }

        let busqDetalle_2011 = this.detalles.find(el => el['COD-DETHC'] == '2011' && el['LLAVE-HC'] == llave_det)
        if (busqDetalle_2011) {
          if (busqDetalle_2011.DETALLE.trim() != '') {
            section_array.section.text.list.item._text = busqDetalle_2011.DETALLE.replace(/(?:\&)/g, "\n");
            section_array.section.code._attributes.code = '56836-0';
            section_array.section.title._text = 'HEMORRAGICOS';
            xml_array.ClinicalDocument.component.structuredBody.component[1].section.component.push(JSON.parse(JSON.stringify(section_array)));
          }
        }

        let busqDetalle_2020 = this.detalles.find(el => el['COD-DETHC'] == '2020' && el['LLAVE-HC'] == llave_det)
        if (busqDetalle_2020) {
          if (busqDetalle_2020.DETALLE.trim() != '') {
            section_array.section.text.list.item._text = busqDetalle_2020.DETALLE.replace(/(?:\&)/g, "\n");
            section_array.section.code._attributes.code = '10167-5';
            section_array.section.title._text = 'QUIRURGICOS';
            xml_array.ClinicalDocument.component.structuredBody.component[1].section.component.push(JSON.parse(JSON.stringify(section_array)));
          }
        }

        let busqDetalle_2035 = this.detalles.find(el => el['COD-DETHC'] == '2035' && el['LLAVE-HC'] == llave_det)
        if (busqDetalle_2035) {
          if (busqDetalle_2035.DETALLE.trim() != '') {
            section_array.section.text.list.item._text = busqDetalle_2035.DETALLE.replace(/(?:\&)/g, "\n");
            section_array.section.code._attributes.code = '10155-0';
            section_array.section.title._text = 'TOXICO-ALERGICOS';
            xml_array.ClinicalDocument.component.structuredBody.component[1].section.component.push(JSON.parse(JSON.stringify(section_array)));
          }
        }

        let busqDetalle_2040 = this.detalles.find(el => el['COD-DETHC'] == '2040' && el['LLAVE-HC'] == llave_det)
        if (busqDetalle_2040) {
          if (busqDetalle_2040.DETALLE.trim() != '') {
            section_array.section.text.list.item._text = busqDetalle_2040.DETALLE.replace(/(?:\&)/g, "\n");
            section_array.section.code._attributes.code = '35089-2';
            section_array.section.title._text = 'TRAUMATICOS';
            xml_array.ClinicalDocument.component.structuredBody.component[1].section.component.push(JSON.parse(JSON.stringify(section_array)));
          }
        }

        let busqDetalle_2050 = this.detalles.find(el => el['COD-DETHC'] == '2050' && el['LLAVE-HC'] == llave_det)
        if (busqDetalle_2050) {
          if (busqDetalle_2050.DETALLE.trim() != '') {
            section_array.section.text.list.item._text = busqDetalle_2050.DETALLE.replace(/(?:\&)/g, "\n");
            section_array.section.code._attributes.code = '10166-7';
            section_array.section.title._text = 'OCUPACIONALES';
            xml_array.ClinicalDocument.component.structuredBody.component[1].section.component.push(JSON.parse(JSON.stringify(section_array)));
          }
        }

        let busqDetalle_2060 = this.detalles.find(el => el['COD-DETHC'] == '2060' && el['LLAVE-HC'] == llave_det)
        if (busqDetalle_2060) {
          if (busqDetalle_2060.DETALLE.trim() != '') {
            section_array.section.text.list.item._text = busqDetalle_2060.DETALLE.replace(/(?:\&)/g, "\n");
            section_array.section.code._attributes.code = '11329-2';
            section_array.section.title._text = 'OTROS ANTECEDENTES';
            xml_array.ClinicalDocument.component.structuredBody.component[1].section.component.push(JSON.parse(JSON.stringify(section_array)));
          }
        }

        // if (!busqDetalle_2002 && !busqDetalle_2010 && !busqDetalle_2011 && !busqDetalle_2020 && !busqDetalle_2035 &&
        //   !busqDetalle_2040 && !busqDetalle_2050 && !busqDetalle_2060) {
        //   section_array.section.text.list.item._text = '';
        //   section_array.section.code._attributes.code = '';
        //   section_array.section.title._text = ''
        //   xml_array.ClinicalDocument.component.structuredBody.component[1].section.component.push(section_array);
        // }

        xml_array.ClinicalDocument.component.structuredBody.component[2].section.text.list.item.caption._attributes.ID = item.DIAGN1;

        xml_array.ClinicalDocument.component.structuredBody.component[2].section.text.list.item.caption.sup._text = item.NOMBRE1_ENF;

        xml_array.ClinicalDocument.component.structuredBody.component[2].section.entry.observation.value._attributes.code = item.DIAGN2;

        xml_array.ClinicalDocument.component.structuredBody.component[2].section.entry.observation.value._attributes.displayName = item.NOMBRE2_ENF;

        var conten = '<item><caption ID="x1x2x3x4x5x6x"><sup>c1c2c3c4c5c6c7c8c9c0c1c2c3c4c5n1n2n3n4n5n6n7n8n9n0n1n2n3n</sup></caption>m1m2m3m4m5m6m7m8m9m0m1m2m3m4m5m6m7m8m9m0c1c2c3c4c5c6c7c8c9c0c1c2c3c4c5c6c7c8c9</item>'
        var conten1 = convert.xml2json(conten, { compact: true, spaces: 0 });
        let conten_array = JSON.parse(conten1)

        // console.log(conten_array);

        xml_array.ClinicalDocument.component.structuredBody.component[3].section[0].component.section.text.list = []

        for (var j in item.FORMU) {
          if (item.FORMU[j].COD_FORMU.trim() != '' && item.FORMU[j].TIPO_FORMU == '1') {
            conten_array.item.caption._attributes.ID = item.FORMU[j].COD_FORMU;
            conten_array.item.caption.sup._text = `${item.FORMU[j].NOMBRE1}${item.FORMU[j].NOMBRE2}`;
            conten_array.item._text = item.FORMU[j].INDIC1_FORMU;
            xml_array.ClinicalDocument.component.structuredBody.component[3].section[0].component.section.text.list.push(JSON.parse(JSON.stringify(conten_array)));
          }
        }

        if (xml_array.ClinicalDocument.component.structuredBody.component[3].section[0].component.section.text.list.length == 0) {
          xml_array.ClinicalDocument.component.structuredBody.component[3].section[0].component.section.text.list.push(JSON.parse(JSON.stringify(conten_array)));
        }

        var conten2 = '<substanceAdministration moodCode="RQO" classCode="SBADM"><code code="10160-0" displayName="Medication Use" codeSystemName="LOINC" codeSystem="2.16.840.1.113883.6.1"/><text>m1m2m3m4m5m6m7m8m9m0m1m2m3m4m5m6m7m8m9m0c1c2c3c4c5c6c7c8c9c0c1c2c3c4c5c6c7c8c9       </text><routeCode code="PO" codeSystemName="RouteOfAdministration" codeSystem="2.16.840.1.113883.5.112"/><rateQuantity value="x1x2x"/><consumable typeCode="CSM"><manufacturedProduct><manufacturedLabeledDrug classCode="MMAT"><code code="x1x2x3x4x5x6x" displayName="c1c2c3c4c5c6c7c8c9c0c1c2c3c4c5n1n2n3n4n5n6n7n8n9n0n1n2n3n" codeSystemName="CUMS" codeSystem="UNK"/></manufacturedLabeledDrug></manufacturedProduct></consumable></substanceAdministration>';
        var conten2_1 = convert.xml2json(conten2, { compact: true, spaces: 0 });
        let conten2_array = JSON.parse(conten2_1)

        // console.log(conten2_array);

        xml_array.ClinicalDocument.component.structuredBody.component[3].section[0].component.section.entry = [];

        for (var k in item.FORMU) {
          if (item.FORMU[k].COD_FORMU.trim() != '' && item.FORMU[k].TIPO_FORMU == '1') {
            conten2_array.substanceAdministration.text._text = item.FORMU[k].INDIC1_FORMU;
            conten2_array.substanceAdministration.rateQuantity._attributes.value = parseFloat(item.FORMU[k].CANT_FORMU).toString();
            conten2_array.substanceAdministration.consumable.manufacturedProduct.manufacturedLabeledDrug.code._attributes.code = item.FORMU[k].COD_FORMU;
            conten2_array.substanceAdministration.consumable.manufacturedProduct.manufacturedLabeledDrug.code._attributes.displayName = `${item.FORMU[k].NOMBRE1}${item.FORMU[k].NOMBRE2}`;
            // Vue.set(conten2_array.substanceAdministration.text, "_text", `${item.FORMU[k].INDIC1_FORMU}${item.FORMU[k].INDIC1_FORMU2}`);
            xml_array.ClinicalDocument.component.structuredBody.component[3].section[0].component.section.entry.push(JSON.parse(JSON.stringify(conten2_array)));
          }
        }

        var conten3 = '<item><caption ID="x1x2x3x4x5x6x"><sup>c1c2c3c4c5c6c7c8c9c0c1c2c3c4c5n1n2n3n4n5n6n7n8n9n0n1n2n3n</sup></caption>m1m2m3m4m5m6m7m8m9m0m1m2m3m4m5m6m7m8m9m0c1c2c3c4c5c6c7c8c9c0c1c2c3c4c5c6c7c8c9</item>';
        var conten3_1 = convert.xml2json(conten3, { compact: true, spaces: 0 });
        let conten3_array = JSON.parse(conten3_1)

        // console.log(conten3_array);

        xml_array.ClinicalDocument.component.structuredBody.component[3].section[1].component.section.text.list = [];

        for (var l in item.FORMU) {
          if (item.FORMU[l].COD_FORMU2.trim() != '' && (item.FORMU[l].TIPO_FORMU == '2' || item.FORMU[l].TIPO_FORMU == '3' || item.FORMU[l].TIPO_FORMU == '5')) {
            conten3_array.item.caption._attributes.ID = item.FORMU[l].COD_FORMU2;
            conten3_array.item.caption.sup._text = item.FORMU[l].DESCRIP_FORMU;
            conten3_array.item._text = item.FORMU[l].INDIC1_FORMU2;

            xml_array.ClinicalDocument.component.structuredBody.component[3].section[1].component.section.text.list.push(JSON.parse(JSON.stringify(conten3_array)));
          }
        }

        var conten4 = '<entry><observation classCode="OBS" moodCode="RQO"><code code="18776-5" codeSystem="2.16.840.1.113883.6.1" codeSystemName="LOINC" displayName="Plan of treatment" /><repeatNumber value="10" /><value xsi:type="CD" code="x1x2x3x4x5x6x" codeSystem="UNK" codeSystemName="CUPS" displayName="c1c2c3c4c5c6c7c8c9c0c1c2c3c4c5n1n2n3n4n5n6n7n8n9n0n1n2n3n" /></observation></entry>';
        var conten4_1 = convert.xml2json(conten4, { compact: true, spaces: 0 });
        let conten4_array = JSON.parse(conten4_1)

        // console.log(conten4_array);

        xml_array.ClinicalDocument.component.structuredBody.component[3].section[1].component.section.entry = [];

        for (var r in item.FORMU) {
          if (item.FORMU[r].COD_FORMU2.trim() != '' && (item.FORMU[r].TIPO_FORMU == '2' || item.FORMU[r].TIPO_FORMU == '3' || item.FORMU[r].TIPO_FORMU == '5')) {
            conten4_array.entry.observation.value._attributes.code = item.FORMU[r].COD_FORMU2;
            conten4_array.entry.observation.value._attributes.displayName = item.FORMU[r].DESCRIP_FORMU;

            xml_array.ClinicalDocument.component.structuredBody.component[3].section[1].component.section.entry.push(JSON.parse(JSON.stringify(conten4_array)));
          }
        }

        // console.log(xml_array);

        var xml_string = convert.js2xml(xml_array, { compact: true, spaces: 0 });

        xml_string = xml_string.replace(/[\n]/g, '');

        // console.log(xml_string);

        var llave = `${item.NRO_ID_PACIE}${item.FOLIO}`;

        res({ xml: xml_string, llave })
      })
    },

    format_xml_his2(item) {
      return new Promise((res) => {
        var xml = `<?xml version="1.0" encoding="utf-8"?><RCMR_IN000001UV01 xmlns="urn:hl7-org:v3" ITSVersion="XML_1.0" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><id extension="20120514229" /><creationTime value="aaaammddhhnnss"/><versionCode code="V3-2009N" /><interactionId root="2.16.840.1.113883.1.6" extension="RCMR_IN000001UV01" /><processingCode code="T" /><processingModeCode code="T" /><acceptAckCode code="AL" /><receiver><device classCode="DEV" determinerCode="INSTANCE"><id root="UNK" extension="123523152" /><softwareName displayName="Sistema de Informacion Unificado de Salud" /><asAgent classCode="AGNT"><representedOrganization classCode="ORG" determinerCode="INSTANCE"><id root="codHabilitacionPrestadorSalud" extension="p1p2p3p4p5p6" assigningAuthorityName="MinProteccionSocial" /><name xsi:type="ON">e1e2e3e4e5e6e7e8e9e0e1e2e3e4e5</name><notificationParty classCode="CON"><id root="codHabilitacionPrestadorSalud" extension="p1p2p3p4p5p6" assigningAuthorityName="MinProteccionSocial" /><contactOrganization classCode="ORG" determinerCode="INSTANCE"><realmCode code="UNK" /><id root="UNK" extension="123523152" /><name>Sistema de Informacion Unificado de Salud</name><contactParty classCode="CON"><contactPerson classCode="PSN" determinerCode="INSTANCE"><name></name></contactPerson></contactParty></contactOrganization></notificationParty></representedOrganization></asAgent></device></receiver><sender><device classCode="DEV" determinerCode="INSTANCE"><realmCode code="U2FsdGVkX18ojJklBiE6OMPtmi4yyLZW2OR2+tjP+3wDDlTCUJc6HnRCNZgVTu1e7/hUMgXugSS/xnbKJyBikNw3yiU+yvHIlq4c1b5c+mgcA7FR0yHXFO4lTkgvcWnJEiltFolNwXM/IuGej9o1ga2pdq2y/T+xD0wDpY+CALGse4nshIwa3mgH48UzPgb8" /><id root="UNK" extension="202" /><softwareName displayName="PROSOFT" /><asAgent classCode="AGNT"><representedOrganization classCode="ORG" determinerCode="INSTANCE"><id root="codHabilitacionPrestadorSalud" extension="p1p2p3p4p5p6" assigningAuthorityName="MinProteccionSocial" /><name xsi:type="ON">e1e2e3e4e5e6e7e8e9e0e1e2e3e4e5</name><notificationParty classCode="CON"><id root="codHabilitacionPrestadorSalud" extension="p1p2p3p4p5p6" assigningAuthorityName="MinProteccionSocial" /><contactOrganization classCode="ORG" determinerCode="INSTANCE"><realmCode code="UNK" /><id root="UNK" extension="202" /><name>PROSOFT</name><contactParty classCode="CON"><contactPerson classCode="PSN" determinerCode="INSTANCE"><name></name></contactPerson></contactParty></contactOrganization></notificationParty></representedOrganization></asAgent></device></sender><controlActProcess classCode="CACT" moodCode="EVN"><realmCode code="NEWDATA" /><code code="RCMR_TE000102UV01" codeSystem="2.16.840.1.113883.1.18" codeSystemName="TriggerEventID"  displayName="Patient Registry Add Request" /><languageCode code="es-CO" codeSystem="2.16.840.1.113883.1.11.11526" codeSystemName="HumanLanguage" displayName="Espanol Colombia" /><subject typeCode="SUBJ" contextConductionInd="true"><target classCode="DOCCLIN" moodCode="EVN"><id root="UNK" extension="p1p2p3p4" /><code code="11488-4" codeSystem="2.16.840.1.113883.6.1" codeSystemName="LOINC" displayName="Consultation note" /><title>FOLIO DE HISTORIA CLINICA</title><text representation="B64" mediaType="text/xml">ENCRIPTADO B64 </text><statusCode code="NEW" /><effectiveTime value="aaaammddhhnnss" /><confidentialityCode code="R" codeSystem="2.16.840.1.113883.5.25" codeSystemName="confidentiality" displayName="Restingido" /><recordTarget typeCode="RCT" contextControlCode="OP"><patient classCode="PAT"><id root="d1d" extension="C1C2C3C4C5C6C7C" assigningAuthorityName="RNEC"/><patientPerson classCode="PSN" determinerCode="INSTANCE"><name><given>n1n1n1n1n1n1</given><given>n2n2n2n2n2n2</given><family>a1a1a1a1a1a1a1a</family><family>a2a2a2a2a2a2a2a</family></name><administrativeGenderCode code="x" codeSystem="2.16.840.1.113883.5.1" codeSystemName="administrativeGender" displayName="f1f2f3f4f" /><birthTime value="aaaammdd"/></patientPerson><providerOrganization classCode="ORG" determinerCode="INSTANCE"><id root="p1p2p3p4p5p6" extension="codHabilitacionPrestadorSalud" assigningAuthorityName="MinProteccionSocial" /><name>e1e2e3e4e5e6e7e8e9e0e1e2e3e4e5</name><contactParty classCode="CON"><contactPerson classCode="PSN" determinerCode="INSTANCE"><name></name></contactPerson></contactParty></providerOrganization></patient></recordTarget><author typeCode="AUT"><time value="20140708092938" /><assignedAuthor classCode="ASSIGNED"><id root="UNK" extension="c1c2c3c4c5" /><telecom value="" use="HP" /><telecom value="" use="DIR" /><assignedPerson classCode="PSN" determinerCode="INSTANCE"><name><given>n1n2n3n4n5n6n7n8n9n0n1n2n3n4n5</given><given>n1n2n3n4n5n6n7n8n9n0n1n2n3n4n5</given><family>a1a1a1a1a1a1a1a1a1a1</family><family>a2a2a2a2a2a2a2a2a2a2</family></name></assignedPerson><representedOrganization classCode="ORG" determinerCode="INSTANCE"><id root="codHabilitacionPrestadorSalud" extension="p1p2p3p4p5p6" assigningAuthorityName="MinProteccionSocial" /><name>e1e2e3e4e5e6e7e8e9e0e1e2e3e4e5</name></representedOrganization></assignedAuthor></author><dataEnterer typeCode="ENT"><time value="20140708092938" /><assignedPerson classCode="ASSIGNED"><id root="UNK" extension="c1c2c3c4c5" /><assignedPerson classCode="PSN" determinerCode="INSTANCE"><name xsi:type="PN"><given>n1n2n3n4n5n6n7n8n9n0n1n2n3n4n5</given><given>n1n2n3n4n5n6n7n8n9n0n1n2n3n4n5</given><family>a1a1a1a1a1a1a1a1a1a1</family><family>a2a2a2a2a2a2a2a2a2a2</family></name><asLocatedEntity classCode="LOCE"><location classCode="COUNTY" determinerCode="INSTANCE"><name>COLOMBIA</name><locatedEntity classCode="LOCE" /></location></asLocatedEntity></assignedPerson><representedOrganization classCode="ORG" determinerCode="INSTANCE"><id root="codHabilitacionPrestadorSalud" extension="p1p2p3p4p5p6" assigningAuthorityName="MinProteccionSocial" /><name>e1e2e3e4e5e6e7e8e9e0e1e2e3e4e5</name></representedOrganization></assignedPerson></dataEnterer><custodian typeCode="CST"><assignedCustodian classCode="ASSIGNED"><representedOrganization classCode="ORG" determinerCode="INSTANCE"><id root="codHabilitacionPrestadorSalud" extension="p1p2p3p4p5p6" assigningAuthorityName="MinProteccionSocial" /><name>e1e2e3e4e5e6e7e8e9e0e1e2e3e4e5</name></representedOrganization></assignedCustodian></custodian></target></subject></controlActProcess></RCMR_IN000001UV01>`
        var xml_string = convert.xml2json(xml, { compact: true, spaces: 0 });
        let xml_array = JSON.parse(xml_string)
        // console.log(xml_array);

        xml_array.RCMR_IN000001UV01.creationTime._attributes.value = `${item.FECHA}01`;

        var cod_ciu_usu = $_USUA_GLOBAL[0].COD_CIUD;
        var nuir_usu = $_USUA_GLOBAL[0].NUIR;
        if ($_USUA_GLOBAL[0].PREFIJ == 'GR') {
          var prefij_usu = '01';
        } else {
          var prefij_usu = $_USUA_GLOBAL[0].PREFIJ;
        }

        var llave = `${item.NRO_ID_PACIE}${item.FOLIO}`;

        let busqueda = this.array_xml_his.find(e => e.llave == llave);
        let xml2 = busqueda ? busqueda.xml : ''
        let xml_base64 = btoa(unescape(encodeURIComponent(xml2)))

        xml_array.RCMR_IN000001UV01.controlActProcess.subject.target.text._text = xml_base64;


        var cod_hcil_l1 = `${cod_ciu_usu}${nuir_usu}${prefij_usu}`;
        cod_hcil_l1 = cod_hcil_l1.toString();

        var historia_obj = xml_array.RCMR_IN000001UV01.controlActProcess.subject.target

        xml_array.RCMR_IN000001UV01.receiver.device.asAgent.representedOrganization.id._attributes.extension = cod_hcil_l1;

        xml_array.RCMR_IN000001UV01.receiver.device.asAgent.representedOrganization.name._text = $_USUA_GLOBAL[0].NOMBRE;

        xml_array.RCMR_IN000001UV01.receiver.device.asAgent.representedOrganization.notificationParty.id._attributes.extension = cod_hcil_l1;

        xml_array.RCMR_IN000001UV01.sender.device.asAgent.representedOrganization.id._attributes.extension = cod_hcil_l1;

        xml_array.RCMR_IN000001UV01.sender.device.asAgent.representedOrganization.name._text = $_USUA_GLOBAL[0].NOMBRE;

        xml_array.RCMR_IN000001UV01.sender.device.asAgent.representedOrganization.notificationParty.id._attributes.extension = cod_hcil_l1;

        historia_obj.id._attributes.extension = item.FOLIO;

        historia_obj.effectiveTime._attributes.value = `${item.FECHA}01`;

        historia_obj.recordTarget.patient.id._attributes.extension = item.NRO_ID_PACIE;

        historia_obj.recordTarget.patient.id._attributes.root = item.TIPO_ID;

        historia_obj.recordTarget.patient.patientPerson.name.given[0]._text = item["1ER_NOM"];

        historia_obj.recordTarget.patient.patientPerson.name.given[1]._text = item["2DO_NOM"];

        historia_obj.recordTarget.patient.patientPerson.name.family[0]._text = item["1ER_APEL"];

        historia_obj.recordTarget.patient.patientPerson.name.family[1]._text = item["2DO_APEL"];

        historia_obj.recordTarget.patient.patientPerson.administrativeGenderCode._attributes.code = item.SEXO;

        historia_obj.recordTarget.patient.patientPerson.administrativeGenderCode._attributes.displayName = item.DESCRIP_SEXO;

        historia_obj.recordTarget.patient.patientPerson.birthTime._attributes.value = item.NACIM;

        historia_obj.recordTarget.patient.providerOrganization.id._attributes.root = cod_hcil_l1;

        historia_obj.recordTarget.patient.providerOrganization.name._text = $_USUA_GLOBAL[0].NOMBRE;

        historia_obj.author.assignedAuthor.id._attributes.extension = item.MED;

        historia_obj.author.assignedAuthor.assignedPerson.name.given[0]._text = item.NOMB1_TER;

        historia_obj.author.assignedAuthor.assignedPerson.name.given[1]._text = item.NOMB2_TER;

        historia_obj.author.assignedAuthor.assignedPerson.name.family[0]._text = item.APEL1_TER;

        historia_obj.author.assignedAuthor.assignedPerson.name.family[1]._text = item.APEL2_TER;

        historia_obj.author.assignedAuthor.representedOrganization.id._attributes.extension = cod_hcil_l1;

        historia_obj.author.assignedAuthor.representedOrganization.name._text = $_USUA_GLOBAL[0].NOMBRE;

        historia_obj.dataEnterer.assignedPerson.id._attributes.extension = item.MED2;

        historia_obj.dataEnterer.assignedPerson.assignedPerson.name.given[0]._text = item.NOMB1_TER2;

        historia_obj.dataEnterer.assignedPerson.assignedPerson.name.given[1]._text = item.NOMB2_TER2;

        historia_obj.dataEnterer.assignedPerson.assignedPerson.name.family[0]._text = item.APEL1_TER2;

        historia_obj.dataEnterer.assignedPerson.assignedPerson.name.family[1]._text = item.APEL2_TER2;

        historia_obj.dataEnterer.assignedPerson.representedOrganization.id._attributes.extension = cod_hcil_l1;

        historia_obj.dataEnterer.assignedPerson.representedOrganization.name._text = $_USUA_GLOBAL[0].NOMBRE;

        historia_obj.custodian.assignedCustodian.representedOrganization.id._attributes.extension = cod_hcil_l1;

        historia_obj.custodian.assignedCustodian.representedOrganization.name._text = $_USUA_GLOBAL[0].NOMBRE;

        var $_USUARIO = 'PROSOFT';
        var $_PASSWORD = 'GEBC641218';
        var $_APLICACION = '202';
        var $_IPS = '258450189601';
        var fecha_act = moment().format("DD/MM/YYYY");
        // var fecha_act = "15062021";
        var tipoId = item.TIPO_ID;
        // var tipoId = 'CC';
        var idNum = item.NRO_ID_PACIE;
        // var idNum = '1077941875';

        var $_URL = `Usuario=${$_USUARIO}&Password=${$_PASSWORD}&TipoDocumento=${tipoId}&Numero=${idNum}&Aplicacion=${$_APLICACION}&Fecha=${fecha_act}&Ips=${$_IPS}`;

        var encrypt = this.get_encrypt($_URL)

        xml_array.RCMR_IN000001UV01.sender.device.realmCode._attributes.code = encrypt;

        var xml_string = convert.js2xml(xml_array, { compact: true, spaces: 0 });

        xml_string = xml_string.replace(/[\n]/g, '');

        // console.log(xml_string);

        res({ xml: xml_string, llave })
      })
    },

    get_encrypt(str) {
      var key = 'SYAC!SecretariaSaludCundinamarca',
        urlEncoded = CryptoJS.enc.Utf8.parse(str)

      var encrypted = AES.encrypt(urlEncoded, key, {
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
      })

      return encrypted.toString()
    },

    async cargarDestalles(llave_det, serv) {
      await postData({
        datosh: datosEnvio() + llave_det + '|' + '  ' + '|' + '  ' + '|' + '1001;4005;7501;2002;2010;2011;2020;2035;2040;2050;2060' + '|' + serv + '|'
      }, get_url("app/HICLIN/HCDETAL_PRC.DLL"))
        .then((data) => {
          this.detalles = data["DETHC"]
          this.detalles.pop()
        })
        .catch((error) => {
          CON851('', 'Error consultando datos', null, 'error', 'error')
          console.log(error)
          loader("hide")
          _regresar_menuhis();
        });
    },

    _ventanaUnidServ() {
      _ventanaDatos({
        titulo: 'VENTANA UNIDADES DE SERVICIO',
        columnas: ['COD', 'DESCRIP'],
        data: this._unserv,
        callback_esc: () => {
          document.querySelector('.undServ')
        },
        callback: (data) => {
          $this.form.undServ = data.COD;
          setTimeout(() => { _enterInput('.undServ') }, 100);
        }
      })
    },

    _ventanaFinalidad() {
      _ventanaDatos({
        titulo: 'FINALIDAD DE LA CONSULTA',
        columnas: ['cod', 'descrip'],
        data: this.arrayFinalid,
        callback_esc: () => {
          document.querySelector('.finalidad')
        },
        callback: (data) => {
          $this.form.finalidad = data.cod;
          setTimeout(() => { _enterInput('.finalidad') }, 100);
        }
      })
    },

    _ventanaProfesionales() {
      _ventanaDatos({
        titulo: 'VENTANA PROFESIONALES',
        columnas: ['IDENTIFICACION', 'NOMBRE', 'DESCRIPCION'],
        data: this._profesionales,
        callback_esc: () => {
          document.querySelector('.atiende')
        },
        callback: (data) => {
          $this.form.atiende = data.IDENTIFICACION;
          setTimeout(() => { _enterInput('.atiende') }, 100);
        }
      })
    },

    cargarUnidServ_hc905e1() {
      postData({ datosh: datosEnvio() }, get_url("APP/SALUD/SER873.DLL"))
        .then((data) => {
          this._unserv = data.UNSERV;
          this._unserv.pop();
          this.cargarProfesionales_hc905e1();
        })
        .catch((err) => {
          console.log(err, 'err')
          loader('hide')
          _regresar_menuhis();
        });
    },

    cargarProfesionales_hc905e1() {
      postData({ datosh: datosEnvio() }, get_url("app/SALUD/SER819.DLL"))
        .then((data) => {
          this._profesionales = data.ARCHPROF;
          this._profesionales.pop();
          loader('hide')
          this.validarUnidServ();
        })
        .catch((err) => {
          console.log(err, "error");
          loader("hide");
          _regresar_menuhis();
        });
    },
  },
})