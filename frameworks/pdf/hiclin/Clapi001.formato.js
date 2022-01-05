// 18-OCT-2021 - IMPRESION CLAP- SANTIAGO FRANCO - HICLIN
const { controllers } = require("chart.js");
const { getObjRegCLAP, grabarRegClap } = require("../../../HICLIN/scripts/reg_clap.js");

class formato_CLAPI001 {
  constructor(params) {
    this.HistoriaEscogida = params.HistoriaEscogida;
    this.hcprc = params.hcprc;
    this.datos = {
      paciente: {
        nombre: '',
        apellido: '',
        domicilio: '',
        etnia: '',
        localidad: '',
        telefono: '',

        fecha_nacim: {
          dia: '',
          mes: '',
          año: '',
        },

        edad: {
          edad1: '',
          edad2: '',
        },
        menor15mayor35: false,

        raza: {
          blanca: false,
          indigena: false,
          mestiza: false,
          negra: false,
          otra: false,
        },

        alfabetaSi: false,
        alfabetaNo: false,

        estud: {
          ningun: false,
          prima: false,
          secund: false,
          univers: false,
          añosMayorNiv: '',
        },

        estadCivil: {
          casada: false,
          unionEstable: false,
          soltera: false,
          otro: false,
          viveSolaSi: false,
          viveSolaNo: false,
        },

        lugarControlPrenatal: '',
        lugarPartoAbort: '',
        Numerident: '',

        enfFamiliares: {
          TbcSi: false,
          TbcNo: false,
          diabetSi: false,
          diabetNo: false,
          hipertSi: false,
          hipertNo: false,
          preeclampSi: false,
          preeclampNo: false,
          eclapSi: false,
          eclapNo: false,
          otrosSi: false,
          otrosNo: false,
        },
        enfPersonales: {
          TbcSi: false,
          TbcNo: false,
          diabet0: false,
          diabet1: false,
          diabet2: false,
          diabet3: false,
          hipertSi: false,
          hipertNo: false,
          preeclampSi: false,
          preeclampNo: false,
          eclapSi: false,
          eclapNo: false,
          otrosSi: false,
          otrosNo: false,
          cirugiaSi: false,
          cirugiaNo: false,
          infertSi: false,
          infertNo: false,
          cardioSi: false,
          cardioNo: false,
          nefropatSi: false,
          nefropatNo: false,
          violenciaSi: false,
          violenciaNo: false,
        },

        obstetricos: {
          pesoUltPrev1: false,
          pesoUltPrev2: false,
          pesoUltPrev3: false,
          pesoUltPrev4: false,
          gemelaresSi: false,
          gemelaresNo: false,

          gestas1: '',
          gestas2: '',
          ectopico: '',
          abort1: '',
          abort2: '',
          vaginal1: '',
          vaginal2: '',
          nacivivo1: '',
          nacivivo2: '',
          viven1: '',
          viven2: '',
          partos1: '',
          partos2: '',
          cesarias: '',
          nacimuert: '',
          muert1ra: '',
          muert2da: '',

          consecut3: false,
          embarPlaneadoSi: false,
          embarPlaneadoNo: false,
          diasTrans: false,

          fecha_fin: {
            dia: '',
            mes: '',
            año: '',
          },

          metAntico1: false,
          metAntico2: false,
          metAntico3: false,
          metAntico4: false,
          metAntico5: false,
          metAntico6: false,
        },

        peso: {
          pesoAnt1: '',
          pesoAnt2: '',
          pesoAnt3: '',
        },
        talla: {
          tallaGest1: '',
          tallaGest2: '',
          tallaGest3: '',
        },

        fecha_fum: {
          dia: '',
          mes: '',
          año: '',
        },

        fecha_fpp: {
          dia: '',
          mes: '',
          año: '',
        },

        ecog_men20semNo: false,
        ecog_men20semSi: false,

        fumaAct1TrimSi: false,
        fumaAct1TrimNo: false,

        fumaAct2TrimSi: false,
        fumaAct2TrimNo: false,

        fumaAct3TrimSi: false,
        fumaAct3TrimNo: false,

        fumaPas1TrimSi: false,
        fumaPas1TrimNo: false,

        fumaPas2TrimSi: false,
        fumaPas2TrimNo: false,

        fumaPas3TrimSi: false,
        fumaPas3TrimNo: false,

        drogas1TrimSi: false,
        drogas1TrimNo: false,

        drogas2TrimSi: false,
        drogas2TrimNo: false,

        drogas3TrimSi: false,
        drogas3TrimNo: false,

        alcohol1TrimSi: false,
        alcohol1TrimNo: false,

        alcohol2TrimSi: false,
        alcohol2TrimNo: false,

        alcohol3TrimSi: false,
        alcohol3TrimNo: false,

        violencia1TrimSi: false,
        violencia1TrimNo: false,

        violencia2TrimSi: false,
        violencia2TrimNo: false,

        violencia3TrimSi: false,
        violencia3TrimNo: false,

        antirubeP: false,
        antirubeI: false,
        antirubeE: false,
        antirubeN: false,

        vigenteSi: false,
        vigenteNo: false,
        primDosisMes: '',
        segDosisMes: '',

        odontExSi: false,
        odontExNo: false,

        mamasExSi: false,
        mamasExNo: false,

        insp_cervNormal: false,
        insp_cervAnormal: false,
        insp_cervNoHizo: false,

        pap_cervNormal: false,
        pap_cervAnormal: false,
        pap_cervNoHizo: false,

        colp_cervNormal: false,
        colp_cervAnormal: false,
        colp_cervNoHizo: false,

        grupoSang: '',
        rh_paciNegat: false,
        rh_paciPosit: false,
        inmunizaNo: false,
        inmunizaSi: false,
        gamaglobNo: false,
        gamaglobSi: false,
        gamaglobNc: false,

        sem1_iggMenos: false,
        sem1_iggMas: false,
        sem1_iggNo: false,

        sem2_iggMenos: false,
        sem2_iggMas: false,
        sem2_iggNo: false,

        primerCons_igmMenos: false,
        primerCons_igmMas: false,
        primerCons_igmNo: false,

        chagasMenos: false,
        chagasMas: false,
        chagasNo: false,

        malariaMenos: false,
        malariaMas: false,
        malariaNo: false,

        bacteMen20SemN: false,
        bacteMen20SemA: false,
        bacteMen20SemO: false,

        bacteMay20SemN: false,
        bacteMay20SemA: false,
        bacteMay20SemO: false,

        gluceMen20Sem: '',
        gluceMen20Sem1: false,

        gluceMay30Sem: '',
        gluceMay30Sem1: false,

        hbSem1: '',
        hbSem1Men11: false,

        feSi: false,
        feNo: false,

        folatosSi: false,
        folatosNo: false,

        hbSem2: '',
        hbSem2Men11: false,

        vihsMen20SemSi: false,
        vihsMen20SemNo: false,

        vihrMen20SemSi: false,
        vihrMen20SemNo: false,

        vihsMay20SemSi: false,
        vihsMay20SemNo: false,

        vihrMay20SemSi: false,
        vihrMay20SemNo: false,

        estreptoMenos: false,
        estreptoMas: false,
        estreptoNo: false,

        prePartSi: false,
        prePartNo: false,

        consejLactMatSi: false,
        consejLactMatNo: false,

        notrep_men20semMenos: false,
        notrep_men20semMas: false,
        notrep_men20semO: false,
        semNotrepMen20: '',
        notrep_may20semMenos: false,
        notrep_may20semMas: false,
        notrep_may20semO: false,
        semNotrepMay20: '',

        trep_men20semMenos: false,
        trep_men20semMas: false,
        trep_men20semO: false,
        trep_men20sem1: false,
        semTrepMen20: '',
        trep_may20semMenos: false,
        trep_may20semMas: false,
        trep_may20semO: false,
        trep_may20sem1: false,
        semTrepMay20: '',

        tratMen20SemNo: false,
        tratMen20SemSi: false,
        tratMen20SemO: false,
        tratMen20Sem1: false,
        semTratMen20: '',
        tratMay20SemNo: false,
        tratMay20SemSi: false,
        tratMay20SemO: false,
        tratMay20Sem1: false,
        semTratMay20: '',

        TtoParejMen20SemNo: false,
        TtoParejMen20SemSi: false,
        TtoParejMen20SemO: false,
        TtoParejMen20Sem1: false,
        TtoParejMay20SemNo: false,
        TtoParejMay20SemSi: false,
        TtoParejMay20SemO: false,
        TtoParejMay20Sem1: false,

        tablaConsultAntent: [
          {
            fecha_gest_ctl: {
              dia: '',
              mes: '',
              año: '',
            },
            edad_gest_ctl: '',
            peso_ctl: '',
            pa_ctl: '',
            alt_uteri_ctl: '',
            present_ctl: '',
            latil_fetal_ctl: '',
            mov_fetal_ctl: '',
            prote_ctl: '',
            sign_alarm_ctl: '',
            tecn_ctl: '',
            fecha_prox_cita_ctl: {
              dia: '',
              mes: '',
              año: '',
            }
          },
          {
            fecha_gest_ctl: {
              dia: '',
              mes: '',
              año: '',
            },
            edad_gest_ctl: '',
            peso_ctl: '',
            pa_ctl: '',
            alt_uteri_ctl: '',
            present_ctl: '',
            latil_fetal_ctl: '',
            mov_fetal_ctl: '',
            prote_ctl: '',
            sign_alarm_ctl: '',
            tecn_ctl: '',
            fecha_prox_cita_ctl: {
              dia: '',
              mes: '',
              año: '',
            }
          },
          {
            fecha_gest_ctl: {
              dia: '',
              mes: '',
              año: '',
            },
            edad_gest_ctl: '',
            peso_ctl: '',
            pa_ctl: '',
            alt_uteri_ctl: '',
            present_ctl: '',
            latil_fetal_ctl: '',
            mov_fetal_ctl: '',
            prote_ctl: '',
            sign_alarm_ctl: '',
            tecn_ctl: '',
            fecha_prox_cita_ctl: {
              dia: '',
              mes: '',
              año: '',
            }
          },
          {
            fecha_gest_ctl: {
              dia: '',
              mes: '',
              año: '',
            },
            edad_gest_ctl: '',
            peso_ctl: '',
            pa_ctl: '',
            alt_uteri_ctl: '',
            present_ctl: '',
            latil_fetal_ctl: '',
            mov_fetal_ctl: '',
            prote_ctl: '',
            sign_alarm_ctl: '',
            tecn_ctl: '',
            fecha_prox_cita_ctl: {
              dia: '',
              mes: '',
              año: '',
            }
          },
          {
            fecha_gest_ctl: {
              dia: '',
              mes: '',
              año: '',
            },
            edad_gest_ctl: '',
            peso_ctl: '',
            pa_ctl: '',
            alt_uteri_ctl: '',
            present_ctl: '',
            latil_fetal_ctl: '',
            mov_fetal_ctl: '',
            prote_ctl: '',
            sign_alarm_ctl: '',
            tecn_ctl: '',
            fecha_prox_cita_ctl: {
              dia: '',
              mes: '',
              año: '',
            }
          },
          {
            fecha_gest_ctl: {
              dia: '',
              mes: '',
              año: '',
            },
            edad_gest_ctl: '',
            peso_ctl: '',
            pa_ctl: '',
            alt_uteri_ctl: '',
            present_ctl: '',
            latil_fetal_ctl: '',
            mov_fetal_ctl: '',
            prote_ctl: '',
            sign_alarm_ctl: '',
            tecn_ctl: '',
            fecha_prox_cita_ctl: {
              dia: '',
              mes: '',
              año: '',
            }
          },
          {
            fecha_gest_ctl: {
              dia: '',
              mes: '',
              año: '',
            },
            edad_gest_ctl: '',
            peso_ctl: '',
            pa_ctl: '',
            alt_uteri_ctl: '',
            present_ctl: '',
            latil_fetal_ctl: '',
            mov_fetal_ctl: '',
            prote_ctl: '',
            sign_alarm_ctl: '',
            tecn_ctl: '',
            fecha_prox_cita_ctl: {
              dia: '',
              mes: '',
              año: '',
            }
          },
          {
            fecha_gest_ctl: {
              dia: '',
              mes: '',
              año: '',
            },
            edad_gest_ctl: '',
            peso_ctl: '',
            pa_ctl: '',
            alt_uteri_ctl: '',
            present_ctl: '',
            latil_fetal_ctl: '',
            mov_fetal_ctl: '',
            prote_ctl: '',
            sign_alarm_ctl: '',
            tecn_ctl: '',
            fecha_prox_cita_ctl: {
              dia: '',
              mes: '',
              año: '',
            }
          },
          {
            fecha_gest_ctl: {
              dia: '',
              mes: '',
              año: '',
            },
            edad_gest_ctl: '',
            peso_ctl: '',
            pa_ctl: '',
            alt_uteri_ctl: '',
            present_ctl: '',
            latil_fetal_ctl: '',
            mov_fetal_ctl: '',
            prote_ctl: '',
            sign_alarm_ctl: '',
            tecn_ctl: '',
            fecha_prox_cita_ctl: {
              dia: '',
              mes: '',
              año: '',
            }
          },
          {
            fecha_gest_ctl: {
              dia: '',
              mes: '',
              año: '',
            },
            edad_gest_ctl: '',
            peso_ctl: '',
            pa_ctl: '',
            alt_uteri_ctl: '',
            present_ctl: '',
            latil_fetal_ctl: '',
            mov_fetal_ctl: '',
            prote_ctl: '',
            sign_alarm_ctl: '',
            tecn_ctl: '',
            fecha_prox_cita_ctl: {
              dia: '',
              mes: '',
              año: '',
            }
          },
          {
            fecha_gest_ctl: {
              dia: '',
              mes: '',
              año: '',
            },
            edad_gest_ctl: '',
            peso_ctl: '',
            pa_ctl: '',
            alt_uteri_ctl: '',
            present_ctl: '',
            latil_fetal_ctl: '',
            mov_fetal_ctl: '',
            prote_ctl: '',
            sign_alarm_ctl: '',
            tecn_ctl: '',
            fecha_prox_cita_ctl: {
              dia: '',
              mes: '',
              año: '',
            }
          },
        ],
      },
      parto: false,
      abort: false,

      fechaIng: {
        dia: '',
        mes: '',
        año: ''
      },

      carneSi: false,
      carneNo: false,
      conult_prev: '',

      hospit_embSi: false,
      hospit_embNo: false,
      hospit_emb: '',

      corticoides1: false,
      corticoides2: false,
      corticoides3: false,
      corticoides4: false,
      sem_ini: '',

      inicio1: false,
      inicio2: false,
      inicio3: false,

      rupt_memb: {
        si: false,
        no: false,

        fecha: {
          dia: '',
          mes: '',
          año: '',
          hora: '',
          min: '',
        },

        sem_iniMenor37: false,
        sem_iniigualMay18hs: false,
        tempMayor38: false,

        tempMay38: ''
      },

      FUM: {
        sem_fum: '',
        eco_p_a1: false,
        eco_p_a2: false,
      },

      presentacion: {
        present1: false,
        present2: false,
        present3: false,
      },

      tamano_fetal: {
        si: false,
        no: false,
      },

      acompañan_tdp: {
        acomp1: false,
        acomp2: false,
        acomp3: false,
        acomp4: false,
      },

      det_partogm: {
        si: false,
        no: false,
      },

      tabla_trabaj_parto: [
        {
          hora: '',
          min: '',
          posici_part: '',
          PA_puls: '',
          pulso: '',
          contr: '',
          dilata: '',
          alturp: '',
          vari_po: '',
          meconi: '',
          fcf_dip: '',
        },
        {
          hora: '',
          min: '',
          posici_part: '',
          PA_puls: '',
          pulso: '',
          contr: '',
          dilata: '',
          alturp: '',
          vari_po: '',
          meconi: '',
          fcf_dip: '',
        },
        {
          hora: '',
          min: '',
          posici_part: '',
          PA_puls: '',
          pulso: '',
          contr: '',
          dilata: '',
          alturp: '',
          vari_po: '',
          meconi: '',
          fcf_dip: '',
        },
        {
          hora: '',
          min: '',
          posici_part: '',
          PA_puls: '',
          pulso: '',
          contr: '',
          dilata: '',
          alturp: '',
          vari_po: '',
          meconi: '',
          fcf_dip: '',
        },
      ],

      enfermedades: {
        ningunaSi: false,
        ningunaNo: false,

        hta_prevSi: false,
        hta_prevNo: false,

        infe_ovuSi: false,
        infe_ovuNo: false,

        primerTrimSi: false,
        primerTrimNo: false,

        hta_induSi: false,
        hta_induNo: false,

        infe_uriSi: false,
        infe_uriNo: false,

        segundoTrimSi: false,
        segundoTrimNo: false,

        pre_eclaSi: false,
        pre_eclaNo: false,

        amen_partSi: false,
        amen_partNo: false,

        tercerTrimSi: false,
        tercerTrimNo: false,

        eclampsiaSi: false,
        eclampsiaNo: false,

        rciuSi: false,
        rciuNo: false,

        postrParSi: false,
        postrParNo: false,

        cardioSi: false,
        cardioNo: false,

        rotuPremSi: false,
        rotuPremNo: false,

        infPuerSi: false,
        infPuerNo: false,

        anemiaSi: false,
        anemiaNo: false,

        diabete1: false,
        diabete2: false,
        diabete3: false,
        diabete4: false,

        nefropatiaSi: false,
        nefropatiaNo: false,

        otraCondSi: false,
        otraCondNo: false,

        codigo1: '',
        codigo2: '',
        codigo3: '',

        notasEnf: '',
      },

      nacimiento: {
        vivo: false,
        muerto: false,
        anteParto: false,
        ignor: false,

        fecha: {
          hora: '',
          min: '',
          dia: '',
          mes: '',
          año: '',
        },

        multipFetosSi: false,
        multipFetosNo: false,
        multipFetosOrdenMul: '',

        termin_part1: false,
        termin_part2: false,
        termin_part3: false,
        termin_part4: false,
        termin_part5: false,

        ind_prinInduc: '',
      },

      posicion_parto: {
        sentada: false,
        conclillas: false,
        acostada: false,
      },

      episiotomiaSi: false,
      episiotomiaNo: false,

      desgarrosNo: false,
      gradoDesg: '',

      prelumbSi: false,
      prelumbNo: false,

      postlumbSi: false,
      postlumbNo: false,

      placenta: {
        completaSi: false,
        completaNo: false,
        retenidaSi: false,
        retenidaNo: false,
      },

      ligad_cordonSi: false,
      ligad_cordonNo: false,

      medicacion_recb: {
        ociotoSi: false,
        ociotoNo: false,

        antibSi: false,
        antibNo: false,

        analgSi: false,
        analgNo: false,

        anestSi: false,
        anestNo: false,

        anestRegiSi: false,
        anestRegiNo: false,

        anestTotSi: false,
        anestTotNo: false,

        transfSi: false,
        transfNo: false,

        med_otros: '',
      },

      sexo: {
        mascul: false,
        femen: false,
        nodefinido: false,
      },

      pesoAlNacer: '',
      recPesoMay4000: false,
      recPesoMenor2500: false,
      recPercef: '',
      recLongit: '',

      confSem: '',
      confDia: '',

      fumEcoRn1: false,
      fumEcoRn2: false,

      pesoEg1: false,
      pesoEg2: false,
      pesoEg3: false,

      apgar1erMin: '',
      apgar5toMin: '',

      estimulSi: false,
      estimulNo: false,

      aspiracionSi: false,
      aspiracionNo: false,

      mascarSi: false,
      mascarNo: false,

      o2Si: false,
      o2No: false,

      masajeSi: false,
      masajeNo: false,

      tuboSi: false,
      tuboNo: false,

      fallecSi: false,
      fallecNo: false,

      referido1: false,
      referido2: false,
      referido3: false,

      defecCongenitos: {
        no: false,
        menor: false,
        mayor: false,
        codDefCongen: '',
      },

      enfermedades2: {
        ninguna: false,
        unoomas: false,

        enf_rec11: '',
        enf_rec12: '',
        enf_rec13: '',
        enf_rec14: '',
        nombEnfer1: '',

        enf_rec21: '',
        enf_rec22: '',
        enf_rec23: '',
        enf_rec24: '',
        nombEnfer2: '',

        enf_rec31: '',
        enf_rec32: '',
        enf_rec33: '',
        enf_rec34: '',
        nombEnfer3: '',
      },

      vdrlRec: {
        menos: false,
        mas: false,
        noSeHizo: false,
      },

      tratVdrlRec: {
        no: false,
        si: false,
        nc: false,
        sd: false,
      },

      tshRec: {
        menos: false,
        mas: false,
        noSeHizo: false,
      },

      hbPatiaRec: {
        menos: false,
        mas: false,
        noSeHizo: false,
      },

      bilirubinaRec: {
        menos: false,
        mas: false,
        noSeHizo: false,
      },

      toxoIgmRec: {
        menos: false,
        mas: false,
        noSeHizo: false,
      },

      meconioRec: {
        si: false,
        no: false,
      },

      antirubeolaPostpart: {
        si: false,
        no: false,
        nc: false,
      },

      gamaglobAntDRec: {
        si: false,
        no: false,
        nc: false,
      },

      med_parto: {
        medico: false,
        enf: false,
        aux: false,
        otro: false,
        descrip: ''
      },

      med_neona: {
        medico: false,
        enf: false,
        aux: false,
        otro: false,
        descrip: ''
      },

      puerperio: [
        {
          dia: '',
          hora: '',
          temp: '',
          pa: '',
          pulso: '',
          invol: '',
          loquios: '',
        },
        {
          dia: '',
          hora: '',
          temp: '',
          pa: '',
          pulso: '',
          invol: '',
          loquios: '',
        },
        {
          dia: '',
          hora: '',
          temp: '',
          pa: '',
          pulso: '',
          invol: '',
          loquios: '',
        },
      ],

      egreso_rn: {
        vivo: false,
        fallcese: false,
        traslado: false,
        fecha: {
          dia: '',
          mes: '',
          año: '',
          hora: '',
          min: '',
        },
        fallece_traslado: {
          si: false,
          no: false,
        },

        lugar_traslado: '',

        edad: '',
        edad_menor1: false,

        aliment1: false,
        aliment2: false,
        aliment3: false,

        bocaArriba: {
          si: false,
          no: false,
        },

        bcg: {
          si: false,
          no: false,
        },

        peso: '',

        nombre: '',

        responsable: '',

        id: '',
      },

      egreso_mt: {
        viva: false,
        fallece: false,
        traslado: false,
        fecha: {
          dia: '',
          mes: '',
          año: '',
        },

        fallece_traslado: {
          si: false,
          no: false,
        },

        lugar_traslado: '',

        diasParto: '',

        responsable: '',
      },

      consejeria: {
        si: false,
        no: false,
      },

      metodo_ant: {
        postEvent: false,
        ligaduraTubaria: false,
        diu: false,
        natural: false,
        barrera: false,
        otro: false,
        hormonal: false,
        ninguno: false,
      },

      paci: {
        nombre: '',
        cod: '',
        edad: '',
        estado_civil: '',
        direccion: '',
        ciudad: '',
        entidad: '',
        tipoAfil: ''
      },

      observaciones: '',
    };
    this.global_CLAPI001 = getObjRegCLAP();

    this.w_rect = 10
    this.h_rect = 10
  }

  _init() {
    this.leerClapi001();
  }

  leerClapi001() {
    postData({ datosh: datosEnvio() + this.HistoriaEscogida + "|" + this.hcprc.llave + "|" },
      get_url("APP/HICLIN/CLAP001.DLL")
    )
      .then((data) => {
        this.global_CLAPI001 = data.REG_CLAP[0];
        this.llenar_datosClap();
      })
      .catch((err) => {
        console.error(err);
        loader("hide");
        CON851("", "Error consultando datos", null, "error", "Error");
        _regresar_menuhis();
      });
  }

  llenar_datosClap() {
    // console.log('clapi: ', this.global_CLAPI001)
    this.datos.paciente.nombre = `${$_REG_PACI['NOM-PACI1']} ${$_REG_PACI['NOM-PACI2']} `;
    this.datos.paciente.apellido = `${$_REG_PACI['APELL-PACI1']} ${$_REG_PACI['APELL-PACI2']}`
    this.datos.paciente.domicilio = $_REG_PACI['DIRECC'];

    this.datos.paciente.etnia = this.global_CLAPI001.descrip_etnia_paci;

    this.datos.paciente.localidad = $_REG_PACI['DESCRIP-CIUDAD'];

    this.datos.paciente.telefono = $_REG_PACI['TELEFONO'];

    this.datos.paciente.fecha_nacim = {
      dia: $_REG_PACI['NACIM'].substring(6, 8),
      mes: $_REG_PACI['NACIM'].substring(4, 6),
      año: $_REG_PACI['NACIM'].substring(0, 4),
    }

    this.edad_paciente = SC_EDAD_AMD($_REG_PACI['NACIM'], moment().format("YYYYMMDD"));
    let edad = cerosIzq(this.edad_paciente.años, 2)
    edad = edad.toString();

    this.datos.paciente.edad.edad1 = edad.substring(0, 1);
    this.datos.paciente.edad.edad2 = edad.substring(0, 1);

    if (edad < 15 || edad > 35) {
      this.datos.paciente.menor15mayor35 = true;
    } else {
      this.datos.paciente.menor15mayor35 = false;
    }

    switch (this.global_CLAPI001.raza) {
      case '1':
        this.datos.paciente.raza.blanca = true;
        break;
      case '2':
        this.datos.paciente.raza.indigena = true;
        break;
      case '3':
        this.datos.paciente.raza.mestiza = true;
        break;
      case '4':
        this.datos.paciente.raza.negra = true;
        break;
      case '5':
        this.datos.paciente.raza.otra = true;
        break;
    }

    switch (this.global_CLAPI001.alfab) {
      case 'S': this.datos.paciente.alfabetaSi = true; break;
      case 'N': this.datos.paciente.alfabetaNo = true; break;
    }

    switch (this.global_CLAPI001.estud) {
      case '1': this.datos.paciente.estud.ningun = true; break;
      case '2': this.datos.paciente.estud.prima = true; break;
      case '3': this.datos.paciente.estud.prima = true; break;
      case '4': this.datos.paciente.estud.secund = true; break;
      case '5': this.datos.paciente.estud.secund = true; break;
      case '6': this.datos.paciente.estud.secund = true; break;
      case '7': this.datos.paciente.estud.secund = true; break;
      case '8': this.datos.paciente.estud.univers = true; break;
      case '9': this.datos.paciente.estud.univers = true; break;
      case 'A': this.datos.paciente.estud.univers = true; break;
      case 'B': this.datos.paciente.estud.univers = true; break;
      case 'C': this.datos.paciente.estud.univers = true; break;
      case 'D': this.datos.paciente.estud.univers = true; break;
    }

    this.datos.paciente.estud.añosMayorNiv = this.global_CLAPI001.an_may_niv_est;

    switch ($_REG_PACI['EST-CIV']) {
      case 'C': this.datos.paciente.estadCivil.casada = true; break;
      case 'U': this.datos.paciente.estadCivil.unionEstable = true; break;
      case 'S': this.datos.paciente.estadCivil.soltera = true; break;
      default: this.datos.paciente.estadCivil.otro = true; break;
    }

    if (this.global_CLAPI001.vive_sola == 'S') {
      this.datos.paciente.estadCivil.viveSolaSi = true;
    } else {
      this.datos.paciente.estadCivil.viveSolaNo = true;
    }

    this.datos.paciente.lugarControlPrenatal = this.global_CLAPI001.lug_ctr_prenatal;
    this.datos.paciente.lugarPartoAbort = this.global_CLAPI001.lug_part_aborto;
    this.datos.paciente.Numerident = $_REG_PACI['COD'];

    // ant familiares

    if (this.global_CLAPI001.antecedentes_familiares.tbc_fam == 'S') {
      this.datos.paciente.enfFamiliares.TbcSi = true;
    } else {
      this.datos.paciente.enfFamiliares.TbcNo = true;
    }

    if (this.global_CLAPI001.antecedentes_familiares.diab_fam == 'S') {
      this.datos.paciente.enfFamiliares.diabetSi = true;
    } else {
      this.datos.paciente.enfFamiliares.diabetNo = true;
    }

    if (this.global_CLAPI001.antecedentes_familiares.hiper_fam == 'S') {
      this.datos.paciente.enfFamiliares.hipertSi = true;
    } else {
      this.datos.paciente.enfFamiliares.hipertNo = true;
    }

    if (this.global_CLAPI001.antecedentes_familiares.preeclam_fam == 'S') {
      this.datos.paciente.enfFamiliares.preeclampSi = true;
    } else {
      this.datos.paciente.enfFamiliares.preeclampNo = true;
    }

    if (this.global_CLAPI001.antecedentes_familiares.eclam_fam == 'S') {
      this.datos.paciente.enfFamiliares.eclapSi = true;
    } else {
      this.datos.paciente.enfFamiliares.eclapNo = true;
    }

    if (this.global_CLAPI001.antecedentes_familiares.otros_fam == 'S') {
      this.datos.paciente.enfFamiliares.otrosSi = true;
    } else {
      this.datos.paciente.enfFamiliares.otrosNo = true;
    }

    // ant personales

    if (this.global_CLAPI001.antecedentes_personales.tbc_per == 'S') {
      this.datos.paciente.enfPersonales.TbcSi = true;
    } else {
      this.datos.paciente.enfPersonales.TbcNo = true;
    }

    switch (this.global_CLAPI001.antecedentes_personales.diab_per) {
      case '0': this.datos.paciente.enfPersonales.diabet0 = true; break;
      case '1': this.datos.paciente.enfPersonales.diabet1 = 'I'; break;
      case '2': this.datos.paciente.enfPersonales.diabet2 = 'II'; break;
      case '3': this.datos.paciente.enfPersonales.diabet3 = 'III'; break;
    }

    if (this.global_CLAPI001.antecedentes_personales.hiper_per == 'S') {
      this.datos.paciente.enfPersonales.hipertSi = true;
    } else {
      this.datos.paciente.enfPersonales.hipertNo = true;
    }

    if (this.global_CLAPI001.antecedentes_personales.preeclam_per == 'S') {
      this.datos.paciente.enfPersonales.preeclampSi = true;
    } else {
      this.datos.paciente.enfPersonales.preeclampNo = true;
    }

    if (this.global_CLAPI001.antecedentes_personales.eclam_per == 'S') {
      this.datos.paciente.enfPersonales.eclapSi = true;
    } else {
      this.datos.paciente.enfPersonales.eclapNo = true;
    }

    if (this.global_CLAPI001.antecedentes_personales.otros_per == 'S') {
      this.datos.paciente.enfPersonales.otrosSi = true;
    } else {
      this.datos.paciente.enfPersonales.otrosNo = true;
    }

    if (this.global_CLAPI001.cirugia == 'S') {
      this.datos.paciente.enfPersonales.cirugiaSi = true;
    } else {
      this.datos.paciente.enfPersonales.cirugiaNo = true;
    }

    if (this.global_CLAPI001.infertil == 'S') {
      this.datos.paciente.enfPersonales.infertSi = true;
    } else {
      this.datos.paciente.enfPersonales.infertNo = true;
    }

    if (this.global_CLAPI001.cardio == 'S') {
      this.datos.paciente.enfPersonales.cardioSi = true;
    } else {
      this.datos.paciente.enfPersonales.cardioNo = true;
    }

    if (this.global_CLAPI001.nefropatia == 'S') {
      this.datos.paciente.enfPersonales.nefropatSi = true;
    } else {
      this.datos.paciente.enfPersonales.nefropatNo = true;
    }

    if (this.global_CLAPI001.violencia == 'S') {
      this.datos.paciente.enfPersonales.violenciaSi = true;
    } else {
      this.datos.paciente.enfPersonales.violenciaNo = true;
    }

    //  obstetricos

    switch (this.global_CLAPI001.obstetricos.peso_ultprev) {
      case '1': this.datos.paciente.obstetricos.pesoUltPrev1 = true; break;
      case '2': this.datos.paciente.obstetricos.pesoUltPrev2 = true; break;
      case '3': this.datos.paciente.obstetricos.pesoUltPrev3 = true; break;
      case '4': this.datos.paciente.obstetricos.pesoUltPrev4 = true; break;
    }

    if (this.global_CLAPI001.obstetricos.gemelare == 'S') {
      this.datos.paciente.obstetricos.gemelaresSi = true;
    } else {
      this.datos.paciente.obstetricos.gemelaresNo = true;
    }

    this.datos.paciente.obstetricos.gestas1 = this.global_CLAPI001.obstetricos.gestas.substring(0, 1) || '';
    this.datos.paciente.obstetricos.gestas2 = this.global_CLAPI001.obstetricos.gestas.substring(1, 2) || '';

    this.datos.paciente.obstetricos.ectopico = this.global_CLAPI001.obstetricos.ectopico;

    this.datos.paciente.obstetricos.abort1 = this.global_CLAPI001.obstetricos.abortos.substring(0, 1) || '';
    this.datos.paciente.obstetricos.abort2 = this.global_CLAPI001.obstetricos.abortos.substring(1, 2) || '';

    this.datos.paciente.obstetricos.vaginal1 = this.global_CLAPI001.obstetricos.vaginal.substring(0, 1) || '';
    this.datos.paciente.obstetricos.vaginal2 = this.global_CLAPI001.obstetricos.vaginal.substring(1, 2) || '';

    this.datos.paciente.obstetricos.nacivivo1 = this.global_CLAPI001.obstetricos.nacivivo.substring(0, 1) || '';
    this.datos.paciente.obstetricos.nacivivo2 = this.global_CLAPI001.obstetricos.nacivivo.substring(1, 2) || '';

    this.datos.paciente.obstetricos.viven1 = this.global_CLAPI001.obstetricos.viven.substring(0, 1) || '';
    this.datos.paciente.obstetricos.viven2 = this.global_CLAPI001.obstetricos.viven.substring(1, 2) || '';

    this.datos.paciente.obstetricos.partos1 = this.global_CLAPI001.obstetricos.partos.substring(0, 1) || '';
    this.datos.paciente.obstetricos.partos2 = this.global_CLAPI001.obstetricos.partos.substring(1, 2) || '';

    this.datos.paciente.obstetricos.cesarias = this.global_CLAPI001.obstetricos.cesareas;

    this.datos.paciente.obstetricos.nacimuert = this.global_CLAPI001.obstetricos.nacimuer;

    this.datos.paciente.obstetricos.muert1ra = this.global_CLAPI001.obstetricos.muert1ra;
    this.datos.paciente.obstetricos.muert2da = this.global_CLAPI001.obstetricos.muert2da;

    if (this.global_CLAPI001.obstetricos.consecut3 == 'S') {
      this.datos.paciente.obstetricos.consecut3 = true;
    } else {
      this.datos.paciente.obstetricos.consecut3 = false;
    }

    if (this.global_CLAPI001.embar_planeado == 'S') {
      this.datos.paciente.obstetricos.embarPlaneadoSi = true;
    } else {
      this.datos.paciente.obstetricos.embarPlaneadoNo = true;
    }

    this.datos.paciente.obstetricos.fecha_fin.dia = this.global_CLAPI001.fecha_fin.substring(6, 8) || '';
    this.datos.paciente.obstetricos.fecha_fin.mes = this.global_CLAPI001.fecha_fin.substring(4, 6) || '';
    this.datos.paciente.obstetricos.fecha_fin.año = this.global_CLAPI001.fecha_fin.substring(0, 4) || '';

    let dias_transc = SC_DIAS(this.global_CLAPI001.fecha_fin, moment().format("YYYYMMDD"))

    if (dias_transc < 365) {
      this.datos.paciente.obstetricos.diasTrans = true;
    } else {
      this.datos.paciente.obstetricos.diasTrans = false;
    }

    switch (this.global_CLAPI001.met_antico) {
      // case '1': this.datos.paciente.obstetricos.metAntico1 = true; break;
      // case '2': this.datos.paciente.obstetricos.metAntico2 = true; break;
      // case '3': this.datos.paciente.obstetricos.metAntico3 = true; break;
      // case '4': this.datos.paciente.obstetricos.metAntico4 = true; break;
      // case '5': this.datos.paciente.obstetricos.metAntico5 = true; break;
      // case '6': this.datos.paciente.obstetricos.metAntico6 = true; break;

      case '1': this.datos.paciente.obstetricos.metAntico3 = true; break;
      case '2': this.datos.paciente.obstetricos.metAntico2 = true; break;
      case '3': this.datos.paciente.obstetricos.metAntico2 = true; break;
      case '4': this.datos.paciente.obstetricos.metAntico6 = true; break;
      case '5': this.datos.paciente.obstetricos.metAntico1 = true; break;
      case '6': this.datos.paciente.obstetricos.metAntico2 = true; break;
      case '7': this.datos.paciente.obstetricos.metAntico2 = true; break;
      case '8': this.datos.paciente.obstetricos.metAntico2 = true; break;
      case '9': this.datos.paciente.obstetricos.metAntico2 = true; break;
      case 'A': this.datos.paciente.obstetricos.metAntico4 = true; break;
      case 'B': this.datos.paciente.obstetricos.metAntico4 = true; break;
      case 'C': this.datos.paciente.obstetricos.metAntico4 = true; break;
      case 'D': this.datos.paciente.obstetricos.metAntico4 = true; break;
      case 'E': this.datos.paciente.obstetricos.metAntico5 = true; break;
      case 'F': this.datos.paciente.obstetricos.metAntico5 = true; break;
      case 'G': this.datos.paciente.obstetricos.metAntico2 = true; break;
      case 'H': this.datos.paciente.obstetricos.metAntico2 = true; break;
      case 'I': this.datos.paciente.obstetricos.metAntico1 = true; break;
      case 'J': this.datos.paciente.obstetricos.metAntico1 = true; break;
      case 'K': this.datos.paciente.obstetricos.metAntico1 = true; break;
      case 'L': this.datos.paciente.obstetricos.metAntico6 = true; break;
      case 'M': this.datos.paciente.obstetricos.metAntico6 = true; break;
    }

    this.datos.paciente.peso.pesoAnt1 = this.global_CLAPI001.gest_act.peso_ant_gest.substring(0, 1) || '';
    this.datos.paciente.peso.pesoAnt2 = this.global_CLAPI001.gest_act.peso_ant_gest.substring(1, 2) || '';
    this.datos.paciente.peso.pesoAnt3 = this.global_CLAPI001.gest_act.peso_ant_gest.substring(2, 3) || '';

    this.datos.paciente.talla.tallaGest1 = this.global_CLAPI001.gest_act.talla_gest.substring(0, 1) || '';
    this.datos.paciente.talla.tallaGest2 = this.global_CLAPI001.gest_act.talla_gest.substring(1, 2) || '';
    this.datos.paciente.talla.tallaGest3 = this.global_CLAPI001.gest_act.talla_gest.substring(2, 3) || '';

    this.datos.paciente.fecha_fum.año = this.global_CLAPI001.gest_act.fum.substring(0, 4) || '';
    this.datos.paciente.fecha_fum.mes = this.global_CLAPI001.gest_act.fum.substring(4, 6) || '';
    this.datos.paciente.fecha_fum.dia = this.global_CLAPI001.gest_act.fum.substring(6, 8) || '';

    this.datos.paciente.fecha_fpp.año = this.global_CLAPI001.gest_act.fpp.substring(0, 4) || '';
    this.datos.paciente.fecha_fpp.mes = this.global_CLAPI001.gest_act.fpp.substring(4, 6) || '';
    this.datos.paciente.fecha_fpp.dia = this.global_CLAPI001.gest_act.fpp.substring(6, 8) || '';

    if (this.global_CLAPI001.gest_act.edad_gest.ecog_men20sem == 'S') {
      this.datos.paciente.ecog_men20semSi = true;
    } else {
      this.datos.paciente.ecog_men20semNo = true;
    }

    if (this.global_CLAPI001.tabla_trim[0].fuma_act == 'S') {
      this.datos.paciente.fumaAct1TrimSi = true;
    } else {
      this.datos.paciente.fumaAct1TrimNo = true;
    }

    if (this.global_CLAPI001.tabla_trim[1].fuma_act == 'S') {
      this.datos.paciente.fumaAct2TrimSi = true;
    } else {
      this.datos.paciente.fumaAct2TrimNo = true;
    }

    if (this.global_CLAPI001.tabla_trim[2].fuma_act == 'S') {
      this.datos.paciente.fumaAct3TrimSi = true;
    } else {
      this.datos.paciente.fumaAct3TrimNo = true;
    }

    if (this.global_CLAPI001.tabla_trim[0].fuma_pas == 'S') {
      this.datos.paciente.fumaPas1TrimSi = true;
    } else {
      this.datos.paciente.fumaPas1TrimNo = true;
    }

    if (this.global_CLAPI001.tabla_trim[1].fuma_pas == 'S') {
      this.datos.paciente.fumaPas2TrimSi = true;
    } else {
      this.datos.paciente.fumaPas2TrimNo = true;
    }

    if (this.global_CLAPI001.tabla_trim[2].fuma_pas == 'S') {
      this.datos.paciente.fumaPas3TrimSi = true;
    } else {
      this.datos.paciente.fumaPas3TrimNo = true;
    }

    if (this.global_CLAPI001.tabla_trim[0].drogas == 'S') {
      this.datos.paciente.drogas1TrimSi = true;
    } else {
      this.datos.paciente.drogas1TrimNo = true;
    }

    if (this.global_CLAPI001.tabla_trim[1].drogas == 'S') {
      this.datos.paciente.drogas2TrimSi = true;
    } else {
      this.datos.paciente.drogas2TrimNo = true;
    }

    if (this.global_CLAPI001.tabla_trim[2].drogas == 'S') {
      this.datos.paciente.drogas3TrimSi = true;
    } else {
      this.datos.paciente.drogas3TrimNo = true;
    }

    if (this.global_CLAPI001.tabla_trim[0].alcohol == 'S') {
      this.datos.paciente.alcohol1TrimSi = true;
    } else {
      this.datos.paciente.alcohol1TrimNo = true;
    }

    if (this.global_CLAPI001.tabla_trim[1].alcohol == 'S') {
      this.datos.paciente.alcohol2TrimSi = true;
    } else {
      this.datos.paciente.alcohol2TrimNo = true;
    }

    if (this.global_CLAPI001.tabla_trim[2].alcohol == 'S') {
      this.datos.paciente.alcohol3TrimSi = true;
    } else {
      this.datos.paciente.alcohol3TrimNo = true;
    }

    if (this.global_CLAPI001.tabla_trim[0].violencia == 'S') {
      this.datos.paciente.violencia1TrimSi = true;
    } else {
      this.datos.paciente.violencia1TrimNo = true;
    }

    if (this.global_CLAPI001.tabla_trim[1].violencia == 'S') {
      this.datos.paciente.violencia2TrimSi = true;
    } else {
      this.datos.paciente.violencia2TrimNo = true;
    }

    if (this.global_CLAPI001.tabla_trim[2].violencia == 'S') {
      this.datos.paciente.violencia3TrimSi = true;
    } else {
      this.datos.paciente.violencia3TrimNo = true;
    }

    switch (this.global_CLAPI001.gest_act.antirube) {
      case 'P': this.datos.paciente.antirubeP = true; break;
      case 'I': this.datos.paciente.antirubeI = true; break;
      case 'E': this.datos.paciente.antirubeE = true; break;
      case 'N': this.datos.paciente.antirubeN = true; break;
    }

    if (this.global_CLAPI001.gest_act.antiteta.vigen_ant == 'S') {
      this.datos.paciente.vigenteSi = true;
    } else {
      this.datos.paciente.vigenteNo = true;
    }

    if (this.global_CLAPI001.gest_act.antiteta.prim_dosis == 'S') {
      this.datos.paciente.primDosisMes = 'X';
    } else {
      this.datos.paciente.primDosisMes = '';
    }

    if (this.global_CLAPI001.gest_act.antiteta.seg_dosis == 'S') {
      this.datos.paciente.segDosisMes = 'X';
    } else {
      this.datos.paciente.segDosisMes = '';
    }

    if (this.global_CLAPI001.gest_act.ex_normal.odont == 'S') {
      this.datos.paciente.odontExSi = true;
    } else {
      this.datos.paciente.odontExNo = true;
    }

    if (this.global_CLAPI001.gest_act.ex_normal.mamas == 'S') {
      this.datos.paciente.mamasExSi = true;
    } else {
      this.datos.paciente.mamasExNo = true;
    }

    switch (this.global_CLAPI001.gest_act.cervix.insp) {
      case '1': this.datos.paciente.insp_cervNormal = true; break;
      case '2': this.datos.paciente.insp_cervAnormal = true; break;
      case '3': this.datos.paciente.insp_cervNoHizo = true; break;
    }

    switch (this.global_CLAPI001.gest_act.cervix.pap) {
      case '1': this.datos.paciente.pap_cervNormal = true; break;
      case '2': this.datos.paciente.pap_cervAnormal = true; break;
      case '3': this.datos.paciente.pap_cervNoHizo = true; break;
    }

    switch (this.global_CLAPI001.gest_act.cervix.colp) {
      case '1': this.datos.paciente.colp_cervNormal = true; break;
      case '2': this.datos.paciente.colp_cervAnormal = true; break;
      case '3': this.datos.paciente.colp_cervNoHizo = true; break;
    }

    this.datos.paciente.grupoSang = $_REG_PACI['GRP-SANG'];

    switch ($_REG_PACI['RH']) {
      case '-': this.datos.paciente.rh_paciNegat = true; break;
      case '+': this.datos.paciente.rh_paciPosit = true; break;
    }

    if (this.global_CLAPI001.gest_act.inmuniza == 'S') {
      this.datos.paciente.inmunizaSi = true;
    } else {
      this.datos.paciente.inmunizaNo = true;
    }

    switch (this.global_CLAPI001.gest_act.gamaglob_anti_d) {
      case '0': this.datos.paciente.gamaglobNc = true; break;
      case 'S': this.datos.paciente.gamaglobSi = true; break;
      case 'N': this.datos.paciente.gamaglobNo = true; break;
    }

    switch (this.global_CLAPI001.gest_act.toxoplasmosis.sem1_igg) {
      case '+': this.datos.paciente.sem1_iggMas = true; break;
      case '-': this.datos.paciente.sem1_iggMenos = true; break;
      case 'N': this.datos.paciente.sem1_iggNo = true; break;
    }

    switch (this.global_CLAPI001.gest_act.toxoplasmosis.sem1_igg) {
      case '+': this.datos.paciente.sem2_iggMas = true; break;
      case '-': this.datos.paciente.sem2_iggMenos = true; break;
      case 'N': this.datos.paciente.sem2_iggNo = true; break;
    }

    switch (this.global_CLAPI001.gest_act.toxoplasmosis.primera_cons_igm) {
      case '+': this.datos.paciente.primerCons_igmMas = true; break;
      case '-': this.datos.paciente.primerCons_igmMenos = true; break;
      case 'N': this.datos.paciente.primerCons_igmNo = true; break;
    }

    switch (this.global_CLAPI001.gest_act.chagas) {
      case '+': this.datos.paciente.chagasMas = true; break;
      case '-': this.datos.paciente.chagasMenos = true; break;
      case 'N': this.datos.paciente.chagasNo = true; break;
    }

    switch (this.global_CLAPI001.gest_act.malaria) {
      case '+': this.datos.paciente.malariaMas = true; break;
      case '-': this.datos.paciente.malariaMenos = true; break;
      case 'N': this.datos.paciente.malariaNo = true; break;
    }

    switch (this.global_CLAPI001.bacte_men20sem) {
      case '1': this.datos.paciente.bacteMen20SemN = true; break;
      case '2': this.datos.paciente.bacteMen20SemA = true; break;
      case '3': this.datos.paciente.bacteMen20SemO = true; break;
    }

    switch (this.global_CLAPI001.bacte_may20sem) {
      case '1': this.datos.paciente.bacteMay20SemN = true; break;
      case '2': this.datos.paciente.bacteMay20SemA = true; break;
      case '3': this.datos.paciente.bacteMay20SemO = true; break;
    }

    this.datos.paciente.gluceMen20Sem = cerosIzq(this.global_CLAPI001.glucemia_men20sem, 3)

    if (this.global_CLAPI001.glucemia_men20sem >= 105) {
      this.datos.paciente.gluceMen20Sem1 = true;
    } else {
      this.datos.paciente.gluceMen20Sem1 = false;
    }

    this.datos.paciente.gluceMay30Sem = cerosIzq(this.global_CLAPI001.glucemia_may30sem, 3)

    if (this.global_CLAPI001.glucemia_may30sem >= 105) {
      this.datos.paciente.gluceMay30Sem1 = true;
    } else {
      this.datos.paciente.gluceMay30Sem1 = false;
    }

    this.datos.paciente.hbSem1 = cerosIzq(this.global_CLAPI001.gest_act.hb_sem1, 4)

    if (this.global_CLAPI001.gest_act.hb_sem1 < 11) {
      this.datos.paciente.hbSem1Men11 = true;
    } else {
      this.datos.paciente.hbSem1Men11 = false;
    }

    if (this.global_CLAPI001.fe == 'S') {
      this.datos.paciente.feSi = true;
    } else {
      this.datos.paciente.feNo = true;
    }

    if (this.global_CLAPI001.gest_act.folatos == 'S') {
      this.datos.paciente.folatosSi = true;
    } else {
      this.datos.paciente.folatosNo = true;
    }

    this.datos.paciente.hbSem2 = cerosIzq(this.global_CLAPI001.gest_act.hb_sem2, 4)

    if (this.global_CLAPI001.gest_act.hb_sem2 < 11) {
      this.datos.paciente.hbSem2Men11 = true;
    } else {
      this.datos.paciente.hbSem2Men11 = false;
    }

    if (this.global_CLAPI001.vihs_men20sem == 'S') {
      this.datos.paciente.vihsMen20SemSi = true;
    } else {
      this.datos.paciente.vihsMen20SemNo = true;
    }

    if (this.global_CLAPI001.vihr_men20sem == 'S') {
      this.datos.paciente.vihrMen20SemSi = true;
    } else {
      this.datos.paciente.vihrMen20SemNo = true;
    }

    if (this.global_CLAPI001.vihs_may20sem == 'S') {
      this.datos.paciente.vihsMay20SemSi = true;
    } else {
      this.datos.paciente.vihsMay20SemNo = true;
    }

    if (this.global_CLAPI001.vihr_may20sem == 'S') {
      this.datos.paciente.vihrMay20SemSi = true;
    } else {
      this.datos.paciente.vihrMay20SemNo = true;
    }

    switch (this.global_CLAPI001.gest_act.estrepto) {
      case '-': this.datos.paciente.estreptoMenos = true; break;
      case '+': this.datos.paciente.estreptoMas = true; break;
      case 'N': this.datos.paciente.estreptoNo = true; break;
    }

    if (this.global_CLAPI001.prep_part == 'S') {
      this.datos.paciente.prePartSi = true;
    } else {
      this.datos.paciente.prePartNo = true;
    }

    if (this.global_CLAPI001.cons_lact_mat == 'S') {
      this.datos.paciente.consejLactMatSi = true;
    } else {
      this.datos.paciente.consejLactMatNo = true;
    }

    switch (this.global_CLAPI001.notrep_men20sem) {
      case '-': this.datos.paciente.notrep_men20semMenos = true; break;
      case '+': this.datos.paciente.notrep_men20semMas = true; break;
      case '0': this.datos.paciente.notrep_men20semO = true; break;
    }

    this.datos.paciente.semNotrepMen20 = cerosIzq(this.global_CLAPI001.sem_notrep_men20, 2);

    switch (this.global_CLAPI001.notrep_may20sem) {
      case '-': this.datos.paciente.notrep_may20semMenos = true; break;
      case '+': this.datos.paciente.notrep_may20semMas = true; break;
      case '0': this.datos.paciente.notrep_may20semO = true; break;
    }

    this.datos.paciente.semNotrepMay20 = cerosIzq(this.global_CLAPI001.sem_notrep_may20, 2);

    switch (this.global_CLAPI001.trep_men20sem) {
      case '-': this.datos.paciente.trep_men20semMenos = true; break;
      case '+': this.datos.paciente.trep_men20semMas = true; break;
      case '0': this.datos.paciente.trep_men20semO = true; break;
      case '1': this.datos.paciente.trep_men20sem1 = true; break;
    }

    this.datos.paciente.semTrepMen20 = cerosIzq(this.global_CLAPI001.sem_trep_men20, 2);

    switch (this.global_CLAPI001.trep_may20sem) {
      case '-': this.datos.paciente.trep_may20semMenos = true; break;
      case '+': this.datos.paciente.trep_may20semMas = true; break;
      case '0': this.datos.paciente.trep_may20semO = true; break;
      case '1': this.datos.paciente.trep_may20sem1 = true; break;
    }

    this.datos.paciente.semTrepMay20 = cerosIzq(this.global_CLAPI001.sem_trep_may20, 2);

    switch (this.global_CLAPI001.trat_men20sem) {
      case 'N': this.datos.paciente.tratMen20SemNo = true; break;
      case 'S': this.datos.paciente.tratMen20SemSi = true; break;
      case '0': this.datos.paciente.tratMen20SemO = true; break;
      case '1': this.datos.paciente.tratMen20Sem1 = true; break;
    }

    this.datos.paciente.semTratMen20 = cerosIzq(this.global_CLAPI001.sem_trat_men20, 2);

    switch (this.global_CLAPI001.trat_may20sem) {
      case 'N': this.datos.paciente.tratMay20SemNo = true; break;
      case 'S': this.datos.paciente.tratMay20SemSi = true; break;
      case '0': this.datos.paciente.tratMay20SemO = true; break;
      case '1': this.datos.paciente.tratMay20Sem1 = true; break;
    }

    this.datos.paciente.semTratMay20 = cerosIzq(this.global_CLAPI001.sem_trat_may20, 2);

    switch (this.global_CLAPI001.tto_pareja_men20sem) {
      case 'N': this.datos.paciente.TtoParejMen20SemNo = true; break;
      case 'S': this.datos.paciente.TtoParejMen20SemSi = true; break;
      case '0': this.datos.paciente.TtoParejMen20SemO = true; break;
      case '1': this.datos.paciente.TtoParejMen20Sem1 = true; break;
    }

    switch (this.global_CLAPI001.tto_pareja_may20sem) {
      case 'N': this.datos.paciente.TtoParejMay20SemNo = true; break;
      case 'S': this.datos.paciente.TtoParejMay20SemSi = true; break;
      case '0': this.datos.paciente.TtoParejMay20SemO = true; break;
      case '1': this.datos.paciente.TtoParejMay20Sem1 = true; break;
    }

    for (let i = 0; i < 11; i++) {
      this.datos.paciente.tablaConsultAntent[i].fecha_gest_ctl.año = this.global_CLAPI001.tabla_gest[i].ano_gest || ' ';
      this.datos.paciente.tablaConsultAntent[i].fecha_gest_ctl.mes = this.global_CLAPI001.tabla_gest[i].mes_gest || ' ';
      this.datos.paciente.tablaConsultAntent[i].fecha_gest_ctl.dia = this.global_CLAPI001.tabla_gest[i].dia_gest || ' ';
      this.datos.paciente.tablaConsultAntent[i].edad_gest_ctl = this.global_CLAPI001.tabla_gest[i].edad_gest || ' ';
      this.datos.paciente.tablaConsultAntent[i].peso_ctl = this.global_CLAPI001.tabla_gest[i].peso_gest || ' ';
      this.datos.paciente.tablaConsultAntent[i].pa_ctl = `${this.global_CLAPI001.tabla_gest[i].pa1_gest}/${this.global_CLAPI001.tabla_gest[i].pa3_gest}` || ' ';
      this.datos.paciente.tablaConsultAntent[i].alt_uteri_ctl = this.global_CLAPI001.tabla_gest[i].alt_uteri_gest || ' ';

      switch (this.global_CLAPI001.tabla_gest[i].present_gest) {
        case '1': this.datos.paciente.tablaConsultAntent[i].present_ctl = 'CEFAL'; break;
        case '2': this.datos.paciente.tablaConsultAntent[i].present_ctl = 'PELVI'; break;
        case '3': this.datos.paciente.tablaConsultAntent[i].present_ctl = 'TRANS'; break;
        case '4': this.datos.paciente.tablaConsultAntent[i].present_ctl = 'INDET'; break;
        default: this.datos.paciente.tablaConsultAntent[i].present_ctl = ' '; break;
      }

      this.datos.paciente.tablaConsultAntent[i].latil_fetal_ctl = this.global_CLAPI001.tabla_gest[i].latid_fetal_gest || ' ';
      this.datos.paciente.tablaConsultAntent[i].mov_fetal_ctl = this.global_CLAPI001.tabla_gest[i].mov_fetal_gest || ' ';
      this.datos.paciente.tablaConsultAntent[i].prote_ctl = this.global_CLAPI001.tabla_gest[i].prote_gest || ' ';
      this.datos.paciente.tablaConsultAntent[i].sign_alarm_ctl = this.global_CLAPI001.tabla_gest[i].sign_alarm_gest || ' ';
      this.datos.paciente.tablaConsultAntent[i].tecn_ctl = this.global_CLAPI001.tabla_gest[i].tecn_gest || ' ';
      this.datos.paciente.tablaConsultAntent[i].fecha_prox_cita_ctl.año = this.global_CLAPI001.tabla_gest[i].ano_prox_cita_gest || ' ';
      this.datos.paciente.tablaConsultAntent[i].fecha_prox_cita_ctl.mes = this.global_CLAPI001.tabla_gest[i].mes_prox_cita_gest || ' ';
      this.datos.paciente.tablaConsultAntent[i].fecha_prox_cita_ctl.dia = this.global_CLAPI001.tabla_gest[i].dia_prox_cita_gest || ' ';
    }

    if (this.global_CLAPI001.eva_clin.parto == 'S') {
      this.datos.parto = true;
    } else {
      this.datos.parto = false;
    }

    if (this.global_CLAPI001.datos_parto.aborto == 'S') {
      this.datos.abort = true;
    } else {
      this.datos.abort = false;
    }

    this.datos.fechaIng.año = this.global_CLAPI001.datos_parto.fec_ingreso.substring(0, 4);
    this.datos.fechaIng.mes = this.global_CLAPI001.datos_parto.fec_ingreso.substring(4, 6);
    this.datos.fechaIng.dia = this.global_CLAPI001.datos_parto.fec_ingreso.substring(6, 8);

    if (this.global_CLAPI001.eva_clin.carne == 'S') {
      this.datos.carneSi = true;
    } else if (this.global_CLAPI001.eva_clin.carne == 'N') {
      this.datos.carneNo = true;
    }

    this.datos.conult_prev = cerosIzq(this.global_CLAPI001.datos_parto.consul_pre, 2);

    if (this.global_CLAPI001.datos_parto.hospit_emb > 0) {
      this.datos.hospit_embSi = true;
      this.datos.hospit_embNo = false;
      this.datos.hospit_emb = cerosIzq(this.global_CLAPI001.datos_parto.hospit_emb, 3);
    } else {
      this.datos.hospit_embSi = false;
      this.datos.hospit_embNo = true;
      this.datos.hospit_emb = ' ';
    }

    switch (this.global_CLAPI001.datos_parto.corticoides_ante) {
      case '1': this.datos.corticoides1 = true; break;
      case '2': this.datos.corticoides2 = true; break;
      case '3': this.datos.corticoides3 = true; break;
      case '4': this.datos.corticoides4 = true; break;
    }

    if (['1', '2', '3'].includes(this.global_CLAPI001.datos_parto.corticoides_ante)) {
      this.datos.sem_ini = cerosIzq(this.global_CLAPI001.datos_parto.sem_ini, 4);
    } else {
      this.datos.sem_ini = cerosIzq(this.global_CLAPI001.datos_parto.sem_ini, 4);
    }

    switch (this.global_CLAPI001.datos_parto.inicio) {
      case '1': this.datos.inicio1 = true; break;
      case '2': this.datos.inicio2 = true; break;
      case '3': this.datos.inicio3 = true; break;
    }

    if (this.global_CLAPI001.datos_parto.rupt_memb == 'S') {
      this.datos.rupt_memb.si = true;

      this.datos.rupt_memb.fecha.año = this.global_CLAPI001.datos_parto.rupt_memb_anteparto.fecha_rup.substring(0, 4)
      this.datos.rupt_memb.fecha.mes = this.global_CLAPI001.datos_parto.rupt_memb_anteparto.fecha_rup.substring(4, 6)
      this.datos.rupt_memb.fecha.dia = this.global_CLAPI001.datos_parto.rupt_memb_anteparto.fecha_rup.substring(6, 8)
      this.datos.rupt_memb.fecha.hora = cerosIzq(this.global_CLAPI001.datos_parto.rupt_memb_anteparto.hora_rup, 2);
      this.datos.rupt_memb.fecha.min = cerosIzq(this.global_CLAPI001.datos_parto.rupt_memb_anteparto.min_rup, 2);

      // error en el cbl en cobol
      // if (this.global_CLAPI001.datos_parto.rupt_memb_anteparto.temp_may18 < 37) {
      //   this.datos.rupt_memb.sem_iniMenor37 = true;
      // } else {
      //   this.datos.rupt_memb.sem_iniMenor37 = false;
      // }

      if (this.global_CLAPI001.datos_parto.rupt_memb_anteparto.menor_37sem < 37) {
        this.datos.rupt_memb.sem_iniMenor37 = true;
      } else {
        this.datos.rupt_memb.sem_iniMenor37 = false;
      }

      if (this.global_CLAPI001.datos_parto.rupt_memb_anteparto.mayor_18hs >= 18) {
        this.datos.rupt_memb.sem_iniigualMay18hs = true;
      } else {
        this.datos.rupt_memb.sem_iniigualMay18hs = false;
      }

      if (this.global_CLAPI001.datos_parto.temp_may18 >= 38) {
        this.datos.rupt_memb.tempMayor38 = true;
      } else {
        this.datos.rupt_memb.tempMayor38 = false;
      }

      this.datos.rupt_memb.tempMay38 = this.global_CLAPI001.datos_parto.rupt_memb_anteparto.temp_may18;

    } else {
      this.datos.rupt_memb.no = true;
      this.datos.rupt_memb.tempMay38 = '    ';
    }

    this.datos.FUM.sem_fum = this.global_CLAPI001.datos_parto.sem_fum_ed || ' ';

    switch (this.global_CLAPI001.datos_parto.fum_eco_p_a) {
      case '1': this.datos.FUM.eco_p_a1 = true; break;
      case '2': this.datos.FUM.eco_p_a2 = true; break;
    }

    switch (this.global_CLAPI001.datos_parto.presentacion) {
      case '1': this.datos.presentacion.present1 = true; break;
      case '2': this.datos.presentacion.present2 = true; break;
      case '3': this.datos.presentacion.present3 = true; break;
    }

    if (this.global_CLAPI001.datos_parto.tamano_fetal == 'S') {
      this.datos.tamano_fetal.si = true;
    } else {
      this.datos.tamano_fetal.no = true;
    }

    switch (this.global_CLAPI001.datos_parto.acompanan_tdp) {
      case '1': this.datos.acompañan_tdp.acomp1 = true; break;
      case '2': this.datos.acompañan_tdp.acomp2 = true; break;
      case '3': this.datos.acompañan_tdp.acomp3 = true; break;
      case '4': this.datos.acompañan_tdp.acomp4 = true; break;
    }

    if (this.global_CLAPI001.det_partograma == 'S') {
      this.datos.det_partogm.si = true;
    } else {
      this.datos.det_partogm.no = true;
    }

    for (let j = 0; j < 4; j++) {
      this.datos.tabla_trabaj_parto[j].hora = cerosIzq(this.global_CLAPI001.datos_parto.trabajo_parto[j].hora_par, 2);
      this.datos.tabla_trabaj_parto[j].min = cerosIzq(this.global_CLAPI001.datos_parto.trabajo_parto[j].min_par, 2);

      switch (this.global_CLAPI001.datos_parto.trabajo_parto[j].posici_par) {
        case '1': this.datos.tabla_trabaj_parto[j].posici_part = 'SENTADA'; break;
        case '2': this.datos.tabla_trabaj_parto[j].posici_part = 'ACOSTADA'; break;
        case '3': this.datos.tabla_trabaj_parto[j].posici_part = 'CUNCLILLAS'; break;
      }

      this.datos.tabla_trabaj_parto[j].PA_puls = `${this.global_CLAPI001.datos_parto.trabajo_parto[j].pa_puls_par1}/${this.global_CLAPI001.datos_parto.trabajo_parto[j].pa_puls_par3}` || ' ';
      this.datos.tabla_trabaj_parto[j].pulso = this.global_CLAPI001.datos_parto.trabajo_parto[j].pulso_par || ' ';
      this.datos.tabla_trabaj_parto[j].contr = this.global_CLAPI001.datos_parto.trabajo_parto[j].contr_par || ' ';
      this.datos.tabla_trabaj_parto[j].dilata = this.global_CLAPI001.datos_parto.trabajo_parto[j].dilata_par || ' ';
      this.datos.tabla_trabaj_parto[j].alturp = this.global_CLAPI001.datos_parto.trabajo_parto[j].alturp_par || ' ';

      switch (this.global_CLAPI001.datos_parto.trabajo_parto[j].vari_po_par) {
        case '1': this.datos.tabla_trabaj_parto[j].vari_po = 'SENTADA'; break;
        case '2': this.datos.tabla_trabaj_parto[j].vari_po = 'ACOSTADA'; break;
        case '3': this.datos.tabla_trabaj_parto[j].vari_po = 'CUNCLILLAS'; break;
      }

      this.datos.tabla_trabaj_parto[j].meconi = this.global_CLAPI001.datos_parto.trabajo_parto[j].meconi_par || ' ';
      this.datos.tabla_trabaj_parto[j].fcf_dip = this.global_CLAPI001.datos_parto.trabajo_parto[j].fcf_dip_par || ' ';
    }

    if (this.global_CLAPI001.datos_parto.enfermedades.ninguna == 'N') {
      this.datos.enfermedades.ningunaSi = true;
    } else {
      this.datos.enfermedades.ningunaNo = true;
    }

    if (this.global_CLAPI001.datos_parto.enfermedades.hta_prev == 'S') {
      this.datos.enfermedades.hta_prevSi = true;
    } else {
      this.datos.enfermedades.hta_prevNo = true;
    }

    if (this.global_CLAPI001.datos_parto.enfermedades.infe_ovul == 'S') {
      this.datos.enfermedades.infe_ovuSi = true;
    } else {
      this.datos.enfermedades.infe_ovuNo = true;
    }

    if (this.global_CLAPI001.datos_parto.enfermedades.primer_trim == 'S') {
      this.datos.enfermedades.primerTrimSi = true;
    } else {
      this.datos.enfermedades.primerTrimNo = true;
    }

    if (this.global_CLAPI001.datos_parto.enfermedades.infe_urin == 'S') {
      this.datos.enfermedades.infe_uriSi = true;
    } else {
      this.datos.enfermedades.infe_uriNo = true;
    }

    if (this.global_CLAPI001.datos_parto.enfermedades.hta_indu == 'S') {
      this.datos.enfermedades.hta_induSi = true;
    } else {
      this.datos.enfermedades.hta_induNo = true;
    }

    if (this.global_CLAPI001.datos_parto.enfermedades.segundo_trim == 'S') {
      this.datos.enfermedades.segundoTrimSi = true;
    } else {
      this.datos.enfermedades.segundoTrimNo = true;
    }

    if (this.global_CLAPI001.datos_parto.enfermedades.pre_ecla == 'S') {
      this.datos.enfermedades.pre_eclaSi = true;
    } else {
      this.datos.enfermedades.pre_eclaNo = true;
    }

    if (this.global_CLAPI001.datos_parto.enfermedades.amen_part == 'S') {
      this.datos.enfermedades.amen_partSi = true;
    } else {
      this.datos.enfermedades.amen_partNo = true;
    }

    if (this.global_CLAPI001.datos_parto.enfermedades.tercer_trim == 'S') {
      this.datos.enfermedades.tercerTrimSi = true;
    } else {
      this.datos.enfermedades.tercerTrimNo = true;
    }

    if (this.global_CLAPI001.datos_parto.enfermedades.eclampsia == 'S') {
      this.datos.enfermedades.eclampsiaSi = true;
    } else {
      this.datos.enfermedades.eclampsiaNo = true;
    }

    if (this.global_CLAPI001.datos_parto.enfermedades.rciu == 'S') {
      this.datos.enfermedades.rciuSi = true;
    } else {
      this.datos.enfermedades.rciuNo = true;
    }

    if (this.global_CLAPI001.datos_parto.enfermedades.postpar == 'S') {
      this.datos.enfermedades.postrParSi = true;
    } else {
      this.datos.enfermedades.postrParNo = true;
    }

    if (this.global_CLAPI001.datos_parto.enfermedades.cardiop == 'S') {
      this.datos.enfermedades.cardioSi = true;
    } else {
      this.datos.enfermedades.cardioNo = true;
    }

    if (this.global_CLAPI001.datos_parto.enfermedades.rotu_prem == 'S') {
      this.datos.enfermedades.rotuPremSi = true;
    } else {
      this.datos.enfermedades.rotuPremNo = true;
    }

    if (this.global_CLAPI001.datos_parto.enfermedades.infpuer == 'S') {
      this.datos.enfermedades.infPuerSi = true;
    } else {
      this.datos.enfermedades.infPuerNo = true;
    }

    if (this.global_CLAPI001.datos_parto.enfermedades.nefropatia_enf == 'S') {
      this.datos.enfermedades.nefropatiaSi = true;
    } else {
      this.datos.enfermedades.nefropatiaNo = true;
    }

    if (this.global_CLAPI001.datos_parto.enfermedades.anemia == 'S') {
      this.datos.enfermedades.anemiaSi = true;
    } else {
      this.datos.enfermedades.anemiaNo = true;
    }

    switch (this.global_CLAPI001.datos_parto.enfermedades.diabete) {
      case '0': this.datos.enfermedades.diabete1 = true; break;
      case '1': this.datos.enfermedades.diabete2 = 'I'; break;
      case '2': this.datos.enfermedades.diabete3 = 'II'; break;
      case '3': this.datos.enfermedades.diabete4 = 'III'; break;
    }

    if (this.global_CLAPI001.datos_parto.enfermedades.otra_cond_enf == 'S') {
      this.datos.enfermedades.otraCondSi = true;
    } else {
      this.datos.enfermedades.otraCondNo = true;
    }

    this.datos.enfermedades.codigo1 = this.global_CLAPI001.datos_parto.enfermedades.tabla_enfermedades[0].codigo || ' ';
    this.datos.enfermedades.codigo2 = this.global_CLAPI001.datos_parto.enfermedades.tabla_enfermedades[1].codigo || ' ';
    this.datos.enfermedades.codigo3 = this.global_CLAPI001.datos_parto.enfermedades.tabla_enfermedades[2].codigo || ' ';

    this.datos.enfermedades.notasEnf = this.global_CLAPI001.datos_parto.enfermedades.notas_enf || ' ';

    if (this.global_CLAPI001.datos_parto.vivo_nac == 'S') {
      this.datos.nacimiento.vivo = true;
    } else if (this.global_CLAPI001.datos_parto.muert_nac == 'S') {
      this.datos.nacimiento.muerto = true;
    } else if (this.global_CLAPI001.datos_parto.ante_parto_nac == 'S') {
      this.datos.nacimiento.anteParto = true;
    } else if (this.global_CLAPI001.datos_parto.ignor_nac == 'S') {
      this.datos.nacimiento.ignor = true;
    }

    this.datos.nacimiento.fecha.hora = cerosIzq(this.global_CLAPI001.datos_parto.hor, 2);
    this.datos.nacimiento.fecha.min = cerosIzq(this.global_CLAPI001.datos_parto.minu, 2);
    this.datos.nacimiento.fecha.año = this.global_CLAPI001.datos_parto.fecha_dia2.substring(0, 4);
    this.datos.nacimiento.fecha.mes = this.global_CLAPI001.datos_parto.fecha_dia2.substring(4, 6);
    this.datos.nacimiento.fecha.dia = this.global_CLAPI001.datos_parto.fecha_dia2.substring(6, 8);

    if (this.global_CLAPI001.datos_parto.multip_fetos == 'S') {
      this.datos.nacimiento.multipFetosSi = true;

      this.datos.nacimiento.multipFetosOrdenMul = cerosIzq(this.global_CLAPI001.datos_parto.orden_mul, 2);
    } else {
      this.datos.nacimiento.multipFetosNo = true;
      this.datos.nacimiento.multipFetosOrdenMul = cerosIzq(this.global_CLAPI001.datos_parto.orden_mul, 2);
    }

    switch (this.global_CLAPI001.termin_part_nac) {
      case '1': this.datos.nacimiento.termin_part1 = true; break;
      case '2': this.datos.nacimiento.termin_part2 = true; break;
      case '3': this.datos.nacimiento.termin_part3 = true; break;
      case '4': this.datos.nacimiento.termin_part4 = true; break;
      case '5': this.datos.nacimiento.termin_part5 = true; break;
    }

    this.datos.nacimiento.ind_prinInduc = this.global_CLAPI001.ind_prin_induc_oper || ' ';

    switch (this.global_CLAPI001.datos_parto.posic_parto) {
      case '1': this.datos.posicion_parto.sentada = true; break;
      case '2': this.datos.posicion_parto.acostada = true; break;
      case '3': this.datos.posicion_parto.conclillas = true; break;
    }

    if (this.global_CLAPI001.episiotomia_nac == 'S') {
      this.datos.episiotomiaSi = true;
    } else {
      this.datos.episiotomiaNo = true;
    }

    if (this.global_CLAPI001.datos_parto.desgarros == 'S') {
      this.datos.gradoDesg = cerosIzq(this.global_CLAPI001.grado_desg, 1);
    } else {
      this.datos.desgarrosNo = true;
      this.datos.gradoDesg = '';
    }

    if (this.global_CLAPI001.datos_parto.ocitocicos_oci.prelumb_oci == 'S') {
      this.datos.prelumbSi = true;
    } else {
      this.datos.prelumbNo = true;
    }

    if (this.global_CLAPI001.datos_parto.ocitocicos_oci.poslumb_oci == 'S') {
      this.datos.postlumbSi = true;
    } else {
      this.datos.postlumbNo = true;
    }

    if (this.global_CLAPI001.datos_parto.placenta.comple_pla == 'S') {
      this.datos.placenta.completaSi = true;
    } else {
      this.datos.placenta.completaNo = true;
    }

    if (this.global_CLAPI001.datos_parto.placenta.reteni_pla == 'S') {
      this.datos.placenta.retenidaSi = true;
    } else {
      this.datos.placenta.retenidaNo = true;
    }

    if (this.global_CLAPI001.datos_parto.ligad_cord == 'S') {
      this.datos.ligad_cordonSi = true;
    } else {
      this.datos.ligad_cordonNo = true;
    }

    if (this.global_CLAPI001.datos_parto.medic_recibida.med_ocioto == 'S') {
      this.datos.medicacion_recb.ociotoSi = true;
    } else {
      this.datos.medicacion_recb.ociotoNo = true;
    }

    if (this.global_CLAPI001.datos_parto.medic_recibida.med_antib == 'S') {
      this.datos.medicacion_recb.antibSi = true;
    } else {
      this.datos.medicacion_recb.antibNo = true;
    }

    if (this.global_CLAPI001.datos_parto.medic_recibida.med_analge == 'S') {
      this.datos.medicacion_recb.analgSi = true;
    } else {
      this.datos.medicacion_recb.analgNo = true;
    }

    if (this.global_CLAPI001.datos_parto.medic_recibida.med_anest == 'S') {
      this.datos.medicacion_recb.anestSi = true;
    } else {
      this.datos.medicacion_recb.anestNo = true;
    }

    if (this.global_CLAPI001.datos_parto.medic_recibida.med_anest_regi == 'S') {
      this.datos.medicacion_recb.anestRegiSi = true;
    } else {
      this.datos.medicacion_recb.anestRegiNo = true;
    }

    if (this.global_CLAPI001.datos_parto.medic_recibida.med_anest_total == 'S') {
      this.datos.medicacion_recb.anestTotSi = true;
    } else {
      this.datos.medicacion_recb.anestTotNo = true;
    }

    if (this.global_CLAPI001.datos_parto.medic_recibida.med_transf == 'S') {
      this.datos.medicacion_recb.transfSi = true;
    } else {
      this.datos.medicacion_recb.transfNo = true;
    }

    this.datos.medicacion_recb.med_otros = this.global_CLAPI001.datos_parto.medic_recibida.med_otros;

    switch (this.global_CLAPI001.datos_parto.recienacido.rec_sexo) {
      case 'M': this.datos.sexo.mascul = true; break;
      case 'F': this.datos.sexo.femen = true; break;
      case 'I': this.datos.sexo.nodefinido = true; break;
    }

    this.datos.pesoAlNacer = cerosIzq(this.global_CLAPI001.datos_parto.recienacido.rec_peso, 4);

    if (this.global_CLAPI001.datos_parto.recienacido.rec_peso >= 4000) {
      this.datos.recPesoMay4000 = true;
    } else if (this.global_CLAPI001.datos_parto.recienacido.rec_peso < 2500) {
      this.datos.recPesoMenor2500 = true;
    }

    this.datos.recPercef = cerosIzq(this.global_CLAPI001.datos_parto.recienacido.rec_percef, 4);
    this.datos.recLongit = cerosIzq(this.global_CLAPI001.datos_parto.recienacido.rec_longit, 3);

    this.datos.confSem = cerosIzq(this.global_CLAPI001.datos_parto.recienacido.rec_eg_conf.conf_sem, 2);
    this.datos.confDia = cerosIzq(this.global_CLAPI001.datos_parto.recienacido.rec_eg_conf.conf_dia, 1);

    switch (this.global_CLAPI001.datos_parto.recienacido.fum_eco_rn) {
      case '1': this.datos.fumEcoRn1 = true; break;
      case '2': this.datos.fumEcoRn2 = true; break;
    }

    switch (this.global_CLAPI001.datos_parto.recienacido.peso_eg) {
      case '1': this.datos.pesoEg1 = true; break;
      case '2': this.datos.pesoEg2 = true; break;
      case '3': this.datos.pesoEg3 = true; break;
    }

    this.datos.apgar1erMin = cerosIzq(this.global_CLAPI001.datos_parto.recienacido.primermin, 2);
    this.datos.apgar5toMin = cerosIzq(this.global_CLAPI001.datos_parto.recienacido.quintomin, 2);

    if (this.global_CLAPI001.datos_parto.recienacido.estimulacion == 'S') {
      this.datos.estimulSi = true;
    } else {
      this.datos.estimulNo = true;
    }

    if (this.global_CLAPI001.datos_parto.recienacido.aspiracion == 'S') {
      this.datos.aspiracionSi = true;
    } else {
      this.datos.aspiracionNo = true;
    }

    if (this.global_CLAPI001.datos_parto.recienacido.mascar == 'S') {
      this.datos.mascarSi = true;
    } else {
      this.datos.mascarNo = true;
    }

    if (this.global_CLAPI001.datos_parto.recienacido.o2 == 'S') {
      this.datos.o2Si = true;
    } else {
      this.datos.o2No = true;
    }

    if (this.global_CLAPI001.datos_parto.recienacido.masaje == 'S') {
      this.datos.masajeSi = true;
    } else {
      this.datos.masajeNo = true;
    }

    if (this.global_CLAPI001.datos_parto.recienacido.tubo == 'S') {
      this.datos.tuboSi = true;
    } else {
      this.datos.tuboNo = true;
    }

    if (this.global_CLAPI001.datos_parto.recienacido.fallec == 'S') {
      this.datos.fallecSi = true;
    } else {
      this.datos.fallecNo = true;
    }

    switch (this.global_CLAPI001.datos_parto_2.reciennacido2.referido) {
      case '1': this.datos.referido1 = true; break;
      case '2': this.datos.referido2 = true; break;
      case '3': this.datos.referido3 = true; break;
    }

    if (this.global_CLAPI001.datos_parto_2.reciennacido2.def_congen_men == 'N' && this.global_CLAPI001.datos_parto_2.reciennacido2.def_congen_may == 'N') {
      this.datos.defecCongenitos.no = true;
      this.datos.defecCongenitos.codDefCongen = ' ';
    } else {
      if (this.global_CLAPI001.datos_parto_2.reciennacido2.def_congen_men == 'S') {
        this.datos.defecCongenitos.menor = true;
      } else {
        this.datos.defecCongenitos.menor = false;
      }

      if (this.global_CLAPI001.datos_parto_2.reciennacido2.def_congen_may == 'S') {
        this.datos.defecCongenitos.mayor = true;
      } else {
        this.datos.defecCongenitos.mayor = false;
      }

      this.datos.defecCongenitos.codDefCongen = this.global_CLAPI001.datos_parto_2.reciennacido2.cod_def_congen || ' ';
    }

    if (this.global_CLAPI001.datos_parto_2.reciennacido2.enf_rec[0].codigo.trim() == '' &&
      this.global_CLAPI001.datos_parto_2.reciennacido2.enf_rec[1].codigo.trim() == '' &&
      this.global_CLAPI001.datos_parto_2.reciennacido2.enf_rec[2].codigo.trim() == '') {
      this.datos.enfermedades2.ninguna = true;

      this.datos.enfermedades2.enf_rec11 = ' ';
      this.datos.enfermedades2.enf_rec12 = ' ';
      this.datos.enfermedades2.enf_rec13 = ' ';
      this.datos.enfermedades2.enf_rec14 = ' ';

      this.datos.enfermedades2.enf_rec21 = ' ';
      this.datos.enfermedades2.enf_rec22 = ' ';
      this.datos.enfermedades2.enf_rec23 = ' ';
      this.datos.enfermedades2.enf_rec24 = ' ';

      this.datos.enfermedades2.enf_rec31 = ' ';
      this.datos.enfermedades2.enf_rec32 = ' ';
      this.datos.enfermedades2.enf_rec33 = ' ';
      this.datos.enfermedades2.enf_rec34 = ' ';
    } else {
      this.datos.enfermedades2.unoomas = true;

      this.datos.enfermedades2.enf_rec11 = this.global_CLAPI001.datos_parto_2.reciennacido2.enf_rec[0].codigo.substring(0, 1) || ' ';
      this.datos.enfermedades2.enf_rec12 = this.global_CLAPI001.datos_parto_2.reciennacido2.enf_rec[0].codigo.substring(1, 2) || ' ';
      this.datos.enfermedades2.enf_rec13 = this.global_CLAPI001.datos_parto_2.reciennacido2.enf_rec[0].codigo.substring(2, 3) || ' ';
      this.datos.enfermedades2.enf_rec14 = this.global_CLAPI001.datos_parto_2.reciennacido2.enf_rec[0].codigo.substring(3, 4) || ' ';

      this.datos.enfermedades2.nombEnfer1 = this.global_CLAPI001.datos_parto_2.reciennacido2.enf_rec[0].descrip;

      this.datos.enfermedades2.enf_rec21 = this.global_CLAPI001.datos_parto_2.reciennacido2.enf_rec[1].codigo.substring(0, 1) || ' ';
      this.datos.enfermedades2.enf_rec22 = this.global_CLAPI001.datos_parto_2.reciennacido2.enf_rec[1].codigo.substring(1, 2) || ' ';
      this.datos.enfermedades2.enf_rec23 = this.global_CLAPI001.datos_parto_2.reciennacido2.enf_rec[1].codigo.substring(2, 3) || ' ';
      this.datos.enfermedades2.enf_rec24 = this.global_CLAPI001.datos_parto_2.reciennacido2.enf_rec[1].codigo.substring(3, 4) || ' ';

      this.datos.enfermedades2.nombEnfer2 = this.global_CLAPI001.datos_parto_2.reciennacido2.enf_rec[1].descrip;

      this.datos.enfermedades2.enf_rec31 = this.global_CLAPI001.datos_parto_2.reciennacido2.enf_rec[2].codigo.substring(0, 1) || ' ';
      this.datos.enfermedades2.enf_rec32 = this.global_CLAPI001.datos_parto_2.reciennacido2.enf_rec[2].codigo.substring(1, 2) || ' ';
      this.datos.enfermedades2.enf_rec33 = this.global_CLAPI001.datos_parto_2.reciennacido2.enf_rec[2].codigo.substring(2, 3) || ' ';
      this.datos.enfermedades2.enf_rec34 = this.global_CLAPI001.datos_parto_2.reciennacido2.enf_rec[2].codigo.substring(3, 4) || ' ';

      this.datos.enfermedades2.nombEnfer3 = this.global_CLAPI001.datos_parto_2.reciennacido2.enf_rec[2].descrip;
    }

    switch (this.global_CLAPI001.datos_parto_2.reciennacido2.vdrl_rec) {
      case '-': this.datos.vdrlRec.menos = true; break;
      case '+': this.datos.vdrlRec.mas = true; break;
      case 'N': this.datos.vdrlRec.noSeHizo = true; break;
    }

    switch (this.global_CLAPI001.datos_parto_2.reciennacido2.trat_vdrl_rec) {
      case 'N': this.datos.tratVdrlRec.no = true; break;
      case 'S': this.datos.tratVdrlRec.si = true; break;
      case '1': this.datos.tratVdrlRec.nc = true; break;
      case '0': this.datos.tratVdrlRec.sd = true; break;
    }

    switch (this.global_CLAPI001.datos_parto_2.reciennacido2.tsh_rec) {
      case '-': this.datos.tshRec.menos = true; break;
      case '+': this.datos.tshRec.mas = true; break;
      case 'N': this.datos.tshRec.noSeHizo = true; break;
    }

    switch (this.global_CLAPI001.datos_parto_2.reciennacido2.hbpatia_rec) {
      case '-': this.datos.hbPatiaRec.menos = true; break;
      case '+': this.datos.hbPatiaRec.mas = true; break;
      case 'N': this.datos.hbPatiaRec.noSeHizo = true; break;
    }

    switch (this.global_CLAPI001.datos_parto_2.reciennacido2.bilirubina_rec) {
      case '-': this.datos.bilirubinaRec.menos = true; break;
      case '+': this.datos.bilirubinaRec.mas = true; break;
      case 'N': this.datos.bilirubinaRec.noSeHizo = true; break;
    }

    switch (this.global_CLAPI001.datos_parto_2.reciennacido2.toxo_igm_rec) {
      case '-': this.datos.toxoIgmRec.menos = true; break;
      case '+': this.datos.toxoIgmRec.mas = true; break;
      case 'N': this.datos.toxoIgmRec.noSeHizo = true; break;
    }

    if (this.global_CLAPI001.datos_parto_2.reciennacido2.meconio_rec == 'S') {
      this.datos.meconioRec.si = true;
    } else {
      this.datos.meconioRec.no = true;
    }

    switch (this.global_CLAPI001.datos_parto_2.reciennacido2.antirubeola_pospart) {
      case 'S': this.datos.antirubeolaPostpart.si = true; break;
      case 'N': this.datos.antirubeolaPostpart.no = true; break;
      case '0': this.datos.antirubeolaPostpart.nc = true; break;
    }

    switch (this.global_CLAPI001.datos_parto_2.reciennacido2.gamaglob_ant_d_rec) {
      case 'S': this.datos.gamaglobAntDRec.si = true; break;
      case 'N': this.datos.gamaglobAntDRec.no = true; break;
      case '0': this.datos.gamaglobAntDRec.nc = true; break;
    }

    let med_parto = this.global_CLAPI001.datos_parto.atendi.med_parto || '';
    if (med_parto.trim != '') {
      this.datos.med_parto.descrip = this.global_CLAPI001.datos_parto.atendi.descrip_med_parto.slice(0, 14);
      switch (this.global_CLAPI001.datos_parto.atendi.atiende_med_parto) {
        case '1': this.datos.med_parto.medico = true; break;
        case '2': this.datos.med_parto.medico = true; break;
        case '3': this.datos.med_parto.enf = true; break;
        case '4': this.datos.med_parto.aux = true; break;
        default: this.datos.med_parto.otro = true; break;
      }
    } else {
      this.datos.med_parto.descrip = '';
    }

    let med_neona = this.global_CLAPI001.datos_parto.atendi.med_neona || '';
    if (med_neona.trim != '') {
      this.datos.med_neona.descrip = this.global_CLAPI001.datos_parto.atendi.descrip_med_neona.slice(0, 14);
      switch (this.global_CLAPI001.datos_parto.atendi.atiende_med_neona) {
        case '1': this.datos.med_neona.medico = true; break;
        case '2': this.datos.med_neona.medico = true; break;
        case '3': this.datos.med_neona.enf = true; break;
        case '4': this.datos.med_neona.aux = true; break;
        default: this.datos.med_neona.otro = true; break;
      }
    } else {
      this.datos.med_neona.descrip = '';
    }

    for (let k = 0; k < 3; k++) {
      this.datos.puerperio[k].dia = cerosIzq(this.global_CLAPI001.datos_parto_2.reciennacido2.puerperio[k].dia_puer, 2);
      this.datos.puerperio[k].hora = cerosIzq(this.global_CLAPI001.datos_parto_2.reciennacido2.puerperio[k].hora_puer, 2);
      this.datos.puerperio[k].temp = this.global_CLAPI001.datos_parto_2.reciennacido2.puerperio[k].temp_puer || ' ';
      this.datos.puerperio[k].pa = `${this.global_CLAPI001.datos_parto_2.reciennacido2.puerperio[k].pa_puer1}/${this.global_CLAPI001.datos_parto_2.reciennacido2.puerperio[k].pa_puer2}` || ' ';
      this.datos.puerperio[k].pulso = this.global_CLAPI001.datos_parto_2.reciennacido2.puerperio[k].pulso_puer || ' ';

      switch (this.global_CLAPI001.datos_parto_2.reciennacido2.puerperio[k].invol_uter_puer) {
        case '1': this.datos.puerperio[k].invol = 'CONTRAIDO'; break;
        case '2': this.datos.puerperio[k].invol = 'FLACIDO'; break;
        default: this.datos.puerperio[k].invol = ' '; break;
      }

      switch (this.global_CLAPI001.datos_parto_2.reciennacido2.puerperio[k].loquios_puer) {
        case '1': this.datos.puerperio[k].loquios = 'ESCASO'; break;
        case '2': this.datos.puerperio[k].loquios = 'NORMAL'; break;
        case '3': this.datos.puerperio[k].loquios = 'ANORMAL'; break;
        default: this.datos.puerperio[k].loquios = ' '; break;
      }
    }

    if (this.global_CLAPI001.datos_parto_2.egreso_rn.vivo_eg_rn == 'S') {
      this.datos.egreso_rn.vivo = true;
    } else {
      this.datos.egreso_rn.vivo = false;
    }

    if (this.global_CLAPI001.datos_parto_2.egreso_rn.fallece_eg_rn == 'S') {
      this.datos.egreso_rn.fallcese = true;
    } else {
      this.datos.egreso_rn.fallcese = false;
    }

    if (this.global_CLAPI001.datos_parto_2.egreso_rn.traslado_eg_rn == 'S') {
      this.datos.egreso_rn.traslado = true;
    } else {
      this.datos.egreso_rn.traslado = false;
    }

    this.datos.egreso_rn.fecha.año = this.global_CLAPI001.datos_parto_2.egreso_rn.fecha_eg_rn.substring(0, 4) || '';
    this.datos.egreso_rn.fecha.mes = this.global_CLAPI001.datos_parto_2.egreso_rn.fecha_eg_rn.substring(4, 6) || '';
    this.datos.egreso_rn.fecha.dia = this.global_CLAPI001.datos_parto_2.egreso_rn.fecha_eg_rn.substring(6, 8) || '';
    this.datos.egreso_rn.fecha.hora = cerosIzq(this.global_CLAPI001.datos_parto_2.egreso_rn.hora_eg_rn, 2);
    this.datos.egreso_rn.fecha.min = cerosIzq(this.global_CLAPI001.datos_parto_2.egreso_rn.min_eg_rn, 2);

    if (this.global_CLAPI001.datos_parto_2.egreso_rn.fallec_trasl_eg_rn == 'S') {
      this.datos.egreso_rn.fallece_traslado.si = true;
    } else {
      this.datos.egreso_rn.fallece_traslado.no = true;
    }

    this.datos.egreso_rn.lugar_traslado = this.global_CLAPI001.datos_parto_2.egreso_rn.lugar_trasl_eg_rn || ' ';

    this.datos.egreso_rn.edad = this.global_CLAPI001.datos_parto_2.egreso_rn.edad_eg_rn || ' ';

    if (this.global_CLAPI001.datos_parto_2.egreso_rn.edad_eg_rn <= 1) {
      this.datos.egreso_rn.edad_menor1 = true;
    } else {
      this.datos.egreso_rn.edad_menor1 = false;
    }

    switch (this.global_CLAPI001.datos_parto_2.egreso_rn.aliment_eg_rn) {
      case '1': this.datos.egreso_rn.aliment1 = true; break;
      case '2': this.datos.egreso_rn.aliment2 = true; break;
      case '3': this.datos.egreso_rn.aliment3 = true; break;
      default: this.datos.egreso_rn.aliment1 = true; break;
    }

    if (this.global_CLAPI001.datos_parto_2.egreso_rn.boca_arriba_eg_rn == 'S') {
      this.datos.egreso_rn.bocaArriba.si = true;
    } else {
      this.datos.egreso_rn.bocaArriba.no = true;
    }

    if (this.global_CLAPI001.datos_parto_2.egreso_rn.bcg_eg_rn == 'S') {
      this.datos.egreso_rn.bcg.si = true;
    } else {
      this.datos.egreso_rn.bcg.no = true;
    }

    this.datos.egreso_rn.peso = cerosIzq(this.global_CLAPI001.datos_parto_2.egreso_rn.peso_eg_rn, 4);
    this.datos.egreso_rn.nombre = `${this.global_CLAPI001.datos_parto_2.egreso_rn.nombre_rn.apellido1_rn_cm} ${this.global_CLAPI001.datos_parto_2.egreso_rn.nombre_rn.apellido2_rn_cm} ${this.global_CLAPI001.datos_parto_2.egreso_rn.nombre_rn.nombre1_rn_cm} ${this.global_CLAPI001.datos_parto_2.egreso_rn.nombre_rn.nombre2_rn_cm}`;

    let reponsable_rg_rn = this.global_CLAPI001.datos_parto_2.egreso_rn.reponsable_rg_rn || '';
    if (reponsable_rg_rn.trim() != '') {
      this.datos.egreso_rn.responsable = this.global_CLAPI001.datos_parto_2.egreso_rn.descrip_responsable_rg_rn;
    } else {
      this.datos.egreso_rn.responsable = '';
    }


    if (this.global_CLAPI001.datos_parto_2.egreso_materno.viva_eg_mt == 'S') {
      this.datos.egreso_mt.viva = true;
    } else {
      this.datos.egreso_mt.viva = false;
    }

    if (this.global_CLAPI001.datos_parto_2.egreso_materno.fallece_eg_mt == 'S') {
      this.datos.egreso_mt.fallece = true;
    } else {
      this.datos.egreso_mt.fallece = false;
    }

    if (this.global_CLAPI001.datos_parto_2.egreso_materno.traslado_eg_mt == 'S') {
      this.datos.egreso_mt.traslado = true;
    } else {
      this.datos.egreso_mt.traslado = false;
    }

    this.datos.egreso_mt.fecha.año = this.global_CLAPI001.datos_parto_2.egreso_materno.fecha_eg_mt.substring(0, 4) || '';
    this.datos.egreso_mt.fecha.mes = this.global_CLAPI001.datos_parto_2.egreso_materno.fecha_eg_mt.substring(4, 6) || '';
    this.datos.egreso_mt.fecha.dia = this.global_CLAPI001.datos_parto_2.egreso_materno.fecha_eg_mt.substring(6, 8) || '';

    if (this.global_CLAPI001.datos_parto_2.egreso_materno.fallec_trasl_eg_mt == 'S') {
      this.datos.egreso_mt.fallece_traslado.si = true;
    } else {
      this.datos.egreso_mt.fallece_traslado.no = true;
    }

    this.datos.egreso_mt.lugar_traslado = this.global_CLAPI001.datos_parto_2.egreso_materno.lugar_trasl_eg_mt || ' ';

    this.datos.egreso_mt.diasParto = cerosIzq(this.global_CLAPI001.datos_parto_2.egreso_materno.dias_desde_parto, 3);

    let responsable_eg_mt = this.global_CLAPI001.datos_parto_2.egreso_materno.responsable_eg_mt || '';
    if (responsable_eg_mt.trim != '') {
      this.datos.egreso_mt.responsable = this.global_CLAPI001.datos_parto_2.egreso_materno.descrip_responsable_eg_mt;
    } else {
      this.datos.egreso_mt.responsable = '';
    }

    if (this.global_CLAPI001.datos_parto_2.egreso_materno.anticoncepcion.consejeria == 'S') {
      this.datos.consejeria.si = true;
    } else {
      this.datos.consejeria.no = true;
    }

    switch (this.global_CLAPI001.datos_parto_2.egreso_materno.anticoncepcion.metodo_ant) {
      case '1': this.datos.metodo_ant.postEvent = true; break;
      case '2': this.datos.metodo_ant.diu = true; break;
      case '3': this.datos.metodo_ant.barrera = true; break;
      case '4': this.datos.metodo_ant.hormonal = true; break;
      case '5': this.datos.metodo_ant.ligaduraTubaria = true; break;
      case '6': this.datos.metodo_ant.natural = true; break;
      case '7': this.datos.metodo_ant.otro = true; break;
      case '8': this.datos.metodo_ant.ninguno = true; break;
    }

    this.datos.egreso_rn.id = this.global_CLAPI001.datos_parto_2.egreso_rn.id_eg_rn;

    this.datos.paci.nombre = `${$_REG_PACI['APELL-PACI1']} ${$_REG_PACI['APELL-PACI2']} ${$_REG_PACI['NOM-PACI1']} ${$_REG_PACI['NOM-PACI2']}`;

    this.datos.paci.cod = $_REG_PACI['COD'];

    this.datos.paci.edad = edad

    switch ($_REG_PACI['EST-CIV']) {
      case 'S': this.datos.paci.estado_civil = 'Soltero'; break;
      case 'C': this.datos.paci.estado_civil = 'Casado'; break;
      case 'U': this.datos.paci.estado_civil = 'U.Libre'; break;
      case 'D': this.datos.paci.estado_civil = 'Separado'; break;
      case 'V': this.datos.paci.estado_civil = 'Viudo'; break;
      default: this.datos.paci.estado_civil = ''; break;
    }

    this.datos.paci.direccion = $_REG_PACI['DIRECC'];
    this.datos.paci.ciudad = this.datos.paciente.localidad;

    this.datos.paci.entidad = $_REG_PACI["NOMBRE-EPS"];

    switch ($_REG_PACI['TIPO-AFIL']) {
      case '1': this.datos.paci.tipoAfil = 'Cotizante'; break;
      case '2': this.datos.paci.tipoAfil = 'Beneficiario'; break;
      case '3': this.datos.paci.tipoAfil = 'Cot. Pensionado'; break;
      case '4': this.datos.paci.tipoAfil = 'Upc adicional'; break;
      default: this.datos.paci.tipoAfil = 'Sin determinar'; break;
    }

    this.datos.observaciones = this.global_CLAPI001.observaciones.replace(/(?:\&)/g, "\n");

    this.datosMedico();
  }

  datosMedico() {
    this.datos.medico = {};

    this.datos.medico.nombre = this.hcprc.descrip_med;
    this.datos.medico.espec = this.hcprc.descrip_espec_med;
    this.datos.medico.reg = this.hcprc.reg_med;
    this.datos.medico.firma = parseFloat(this.hcprc.med);

    this.imprimir();
  }

  imprimir() {
    _impresion2({
      tipo: "pdf",
      archivo: `${localStorage.Usuario + moment().format("-YYMMDD-HHmmssS")}.pdf`,
      content: this.format(),
    })
      .then(() => {
        // console.log("CLAP");
        CON851("", "Pdf generado correctamente", null, "success", "Correcto");
        _regresar_menuhis()
      })
      .catch((err) => {
        console.error(err);
        CON851("", "Error generando impresion CLAP", null, "error", "Error");
        _regresar_menuhis()
      });
  }

  format() {
    return {
      images: { logo: rutaLogos_impHc($_USUA_GLOBAL[0].NIT), firma: rutaFirmas_impHc(this.datos.medico.firma) },
      pageMargins: [3, 3, 3, 3],
      content: [
        {
          stack: [
            {
              stack: this.llenarFormato(),
            },
          ],
        },
      ],

      styles: {
        left5: {
          fontSize: 5,
        },
        center6: {
          fontSize: 6,
          alignment: 'center',
        },
        right6: {
          fontSize: 6,
          alignment: 'right',
        },
        left6: {
          fontSize: 6,
        },
        left6Bold: {
          fontSize: 6,
          bold: true
        },
        center6Bold: {
          fontSize: 6,
          alignment: 'center',
          bold: true
        },
        center7: {
          fontSize: 7,
          alignment: 'center',
        },
        right7: {
          fontSize: 7,
          alignment: 'right',
        },
        left7: {
          fontSize: 7,
        },
        left7Bold: {
          fontSize: 7,
          bold: true
        },
        center7Bold: {
          fontSize: 7,
          alignment: 'center',
          bold: true
        },
        center8: {
          fontSize: 8,
          alignment: 'center',
        },
        right8: {
          fontSize: 8,
          alignment: 'right',
        },
        left8: {
          fontSize: 8,
        },
        left8Bold: {
          fontSize: 8,
          bold: true
        },
        center8Bold: {
          fontSize: 8,
          alignment: 'center',
          bold: true
        },
        center8BoldT: {
          fontSize: 8,
          bold: true,
          fillColor: '#D1DFF4',
          color: 'black',
          alignment: 'center'
        },
      }
    };
  }

  llenarFormato() {
    var col = [
      {
        columns: [
          {
            width: '35%',
            stack: [
              {
                table: {
                  widths: ['100%'],
                  body: [
                    [
                      { text: 'HISTORIA CLINICA PERINATAL - CLAP/SMR - OPS/OMS', style: 'left8Bold', color: '#FFFFFF', fillColor: '#7A7A7A', margin: [-3, 0, -3, 0] }
                    ],
                    [
                      {
                        margin: [0, -3, 0, -3],
                        border: [true, true, true, false],
                        stack: [
                          {
                            columns: [
                              { text: 'NOMBRE', style: 'left7Bold' },
                              { text: 'APELLIDO', style: 'left7Bold' }
                            ]
                          },
                          {
                            columns: [
                              { text: this.datos.paciente.nombre, style: 'left7' },
                              { text: this.datos.paciente.apellido, style: 'left7' }
                            ]
                          }
                        ]
                      }
                    ]
                  ]
                },
              },
              {
                table: {
                  widths: ['60%', '40%'],
                  body: [
                    [
                      {
                        margin: [0, -2, 0, -3],
                        border: [true, true, true, false],
                        stack: [
                          { text: 'DOMICILIO', style: 'left7Bold' },
                          { text: this.datos.paciente.domicilio, style: 'left7' }
                        ]
                      },
                      {
                        margin: [0, -2, 0, -3],
                        border: [true, true, true, false],
                        stack: [
                          { text: 'ETNIA', style: 'left7Bold' },
                          { text: this.datos.paciente.etnia, style: 'left7' }
                        ]
                      },
                    ],
                  ]
                }
              },
              {
                table: {
                  widths: ['50%', '50%'],
                  body: [
                    [
                      {
                        margin: [0, -2, 0, -3],
                        stack: [
                          { text: 'LOCALIDAD', style: 'left7Bold' },
                          { text: this.datos.paciente.localidad, style: 'left7' }
                        ]
                      },
                      {
                        margin: [0, -2, 0, -3],
                        stack: [
                          { text: 'TELEFONO', style: 'left7Bold' },
                          { text: this.datos.paciente.telefono, style: 'left7' }
                        ]
                      },
                    ]
                  ]
                }
              },
            ]
          },
          {
            width: '13%',
            stack: [
              {
                table: {
                  widths: ['30%', '30%', '40%'],
                  body: [
                    [
                      { text: 'FECHA DE NACIMIENTO', style: 'center7Bold', margin: [-10, -2, -10, -2], colSpan: 3, border: [false, true, false, false] },
                      {},
                      {},
                    ],
                    [
                      { text: 'dia', style: 'center7', border: [false, false, false, false] },
                      { text: 'mes', style: 'center7', border: [false, false, false, false] },
                      { text: 'año', style: 'center7', border: [false, false, false, false] },
                    ],
                    [
                      {
                        border: [false, false, true, true],
                        margin: [0, 0, 0, 0],
                        stack: [
                          { text: this.datos.paciente.fecha_nacim.dia.slice(0, 1) + '  ' + this.datos.paciente.fecha_nacim.dia.slice(1, 2), style: 'center7' },
                        ]
                      },
                      {
                        border: [false, false, true, true],
                        margin: [0, 0, 0, 0],
                        stack: [
                          { text: this.datos.paciente.fecha_nacim.mes.slice(0, 1) + '  ' + this.datos.paciente.fecha_nacim.mes.slice(1, 2), style: 'center7' },
                        ]
                      },
                      {
                        border: [false, false, false, true],
                        margin: [0, 0, 0, 0],
                        stack: [
                          { text: this.datos.paciente.fecha_nacim.año.slice(0, 2) + '  ' + this.datos.paciente.fecha_nacim.año.slice(2, 4), style: 'center7' },
                        ]
                      }
                    ],
                  ]
                }
              },
              {
                table: {
                  widths: ['100%'],
                  body: [
                    [
                      { text: 'EDAD(años)', style: 'left7Bold', border: [false], margin: [0, -1, 0, 0] }
                    ],
                    [
                      {
                        margin: [0, -2.5, 0, -3],
                        border: [false, false, false, true],
                        columns: [
                          {
                            table: {
                              widths: ['50%', '50%'],
                              body: [
                                [
                                  { text: this.datos.paciente.edad.edad1, style: 'center7' },
                                  { text: this.datos.paciente.edad.edad2, style: 'center7' },
                                ]
                              ]
                            }
                          },
                          { stack: this.cuadroCanvasColor(this.datos.paciente.menor15mayor35), alignment: 'center', marginTop: 3 },
                          {
                            stack: [
                              { canvas: [{ type: 'line', x1: 24, y1: -27, x2: 24, y2: -14 }] },
                              { canvas: [{ type: 'line', x1: -47, y1: -27, x2: -47, y2: -14 }] },
                              { canvas: [{ type: 'line', x1: -37, y1: -23, x2: -37, y2: -14 }] },
                              { canvas: [{ type: 'line', x1: -14, y1: -23, x2: -14, y2: -14 }] },
                              { canvas: [{ type: 'line', x1: 12, y1: -23, x2: 12, y2: -14 }] },
                              { text: '< de 15', style: 'center7', margin: [-5, 0, 0, 0] },
                              { text: '> de 35', style: 'center7', margin: [-5, 0, 0, 0] },
                            ]
                          }
                        ]
                      }
                    ]
                  ]
                }
              },
            ]
          },
          {
            table: {
              widths: ['100%'],
              body: [
                [
                  {
                    margin: [0, -2, 0, 0],
                    border: [true, true, false, true],
                    stack: [
                      { text: 'ETNIA', style: 'center7Bold' },
                      {
                        margin: [0, -1.5, 0, 0],
                        columns: [
                          { stack: this.cuadroCanvas(this.datos.paciente.raza.blanca), alignment: 'left' },
                          { text: 'blanca', style: 'left7', margin: [-3, 0, 0, 0] },
                        ]
                      },
                      {
                        margin: [0, 1, 0, 0],
                        columns: [
                          { stack: this.cuadroCanvas(this.datos.paciente.raza.indigena), alignment: 'left' },
                          { text: 'indigena', style: 'left7', margin: [-7, 0, 0, 0] },
                        ]
                      },
                      {
                        margin: [0, 1, 0, 0],
                        columns: [
                          { stack: this.cuadroCanvas(this.datos.paciente.raza.mestiza), alignment: 'left' },
                          { text: 'mestiza', style: 'left7', margin: [-6, 0, 0, 0] },
                        ]
                      },
                      {
                        margin: [0, 1, 0, 0],
                        columns: [
                          { stack: this.cuadroCanvas(this.datos.paciente.raza.negra), alignment: 'left' },
                          { text: 'negra', style: 'left7', margin: [-3, 0, 0, 0] },
                        ]
                      },
                      {
                        margin: [0, 1, 0, 0],
                        columns: [
                          { stack: this.cuadroCanvas(this.datos.paciente.raza.otra), alignment: 'left' },
                          { text: 'otra', style: 'left7', margin: [-3, 0, 0, 3] },
                        ]
                      },
                    ]
                  }
                ]
              ]
            },
            width: '8%',
          },
          {
            table: {
              widths: ['100%'],
              body: [
                [
                  {
                    border: [true, true, false, true],
                    stack: [
                      { text: 'ALFA BETA', style: 'center7Bold', margin: [-3, -2, -2, 0] },
                      { text: 'no', style: 'center7', margin: [0, 2, 0, 0] },
                      { stack: this.cuadroCanvasColor(this.datos.paciente.alfabetaNo), alignment: 'center', margin: [0, 2, 0, 0] },
                      { text: 'si', style: 'center7', margin: [0, 2, 0, 0] },
                      { stack: this.cuadroCanvas(this.datos.paciente.alfabetaSi), alignment: 'center', margin: [0, 3, 0, 0] },
                    ]
                  }
                ]
              ]
            },
            width: '4%',
          },
          {
            table: {
              widths: ['100%'],
              body: [
                [
                  {
                    border: [true, true, false, true],
                    stack: [
                      { text: 'ESTUDIOS', style: 'center7Bold', margin: [0, -2, 0, 0] },
                      {
                        columns: [
                          { stack: this.cuadroCanvasColor(this.datos.paciente.estud.ningun), alignment: 'center', margin: [0, 0, 0, 0] },
                          { stack: this.cuadroCanvas(this.datos.paciente.estud.prima), alignment: 'center', margin: [0, 0, 0, 0] }
                        ]
                      },
                      {
                        columns: [
                          { text: 'ninguno', style: 'center7', margin: [0, 0, 0, 0] },
                          { text: 'primaria', style: 'center7', margin: [0, 0, 0, 0] },
                        ]
                      },
                      {
                        columns: [
                          { stack: this.cuadroCanvas(this.datos.paciente.estud.secund), alignment: 'center', margin: [0, 0, 0, 0] },
                          { stack: this.cuadroCanvas(this.datos.paciente.estud.univers), alignment: 'center', margin: [0, 0, 0, 0] }
                        ]
                      },
                      {
                        columns: [
                          { text: 'secund.', style: 'center7', margin: [0, 0, 0, 0] },
                          { text: 'univers.', style: 'center7', margin: [0, 0, 0, 0] },
                        ]
                      },
                      {
                        margin: [0, -5, 0, 0],
                        columns: [
                          { text: 'años en el mayor nivel', style: 'center7', width: '80%', margin: [-5, 6, 0, 0] },
                          {
                            margin: [-2, 6, -2, 0],
                            table: {
                              widths: ['100%'],
                              body: [
                                [
                                  { text: this.datos.paciente.estud.añosMayorNiv, style: 'center7', margin: [-5, 2, -5, 0] }
                                ]
                              ]
                            },
                            width: '20%'
                          }
                        ]
                      }
                    ]
                  }
                ]
              ]
            },
            width: '10%',
          },
          {
            table: {
              widths: ['100%'],
              body: [
                [
                  {
                    border: [true, true, false, true],
                    stack: [
                      { text: 'ESTADO CIVIL', style: 'center7Bold', margin: [0, -2, 0, 0] },
                      {
                        columns: [
                          { text: 'casada', style: 'left7', width: '85%', margin: [0, 0, 0, 0] },
                          { stack: this.cuadroCanvas(this.datos.paciente.estadCivil.casada), alignment: 'center', margin: [0, 0, 0, 0] }
                        ]
                      },
                      {
                        columns: [
                          { text: 'union Estable', style: 'left7', margin: [-3, 0, 0, 0], width: '85%' },
                          { stack: this.cuadroCanvas(this.datos.paciente.estadCivil.unionEstable), alignment: 'center', margin: [0, 0, 0, 0] }
                        ]
                      },
                      {
                        columns: [
                          { text: 'soltera', style: 'left7', width: '85%', margin: [0, 0, 0, 0] },
                          { stack: this.cuadroCanvasColor(this.datos.paciente.estadCivil.soltera), alignment: 'center', margin: [0, 0, 0, 0] }
                        ]
                      },
                      {
                        columns: [
                          { text: 'otro', style: 'left7', width: '85%', margin: [0, 0, 0, 0] },
                          { stack: this.cuadroCanvasColor(this.datos.paciente.estadCivil.otro), alignment: 'center', margin: [0, 0, 0, 0] }
                        ]
                      },
                      {
                        columns: [
                          { text: 'vive sola', style: 'left7', width: '30%', margin: [0, -2.5, 0, 0] },
                          { text: 'no', style: 'left7', width: '20%', margin: [0, 0, 0, 0] },
                          { stack: this.cuadroCanvas(this.datos.paciente.estadCivil.viveSolaNo), alignment: 'center', width: '15%', margin: [0, 0, 0, 0] },
                          { text: 'si', style: 'left7', margin: [2, 0, 0, 0], width: '20%' },
                          { stack: this.cuadroCanvasColor(this.datos.paciente.estadCivil.viveSolaSi), alignment: 'center', width: '15%', margin: [0, 0, 0, 0] }
                        ]
                      },
                    ]
                  }
                ]
              ]
            },
            width: '10%',
          },
          {
            stack: [
              {
                table: {
                  widths: ['91%', '1%', '1%', '1%', '1%', '1%', '1%', '1%', '1%', '1%'],
                  body: [
                    [
                      { text: 'Lugar de control prenatal', style: 'left7', margin: [-3, -3, -4, -3] },
                      { text: this.datos.paciente.lugarControlPrenatal.slice(0, 1), style: 'center7', marginTop: 3 },
                      { text: this.datos.paciente.lugarControlPrenatal.slice(1, 2), style: 'center7', marginTop: 3 },
                      { text: this.datos.paciente.lugarControlPrenatal.slice(2, 3), style: 'center7', marginTop: 3 },
                      { text: this.datos.paciente.lugarControlPrenatal.slice(3, 4), style: 'center7', marginTop: 3 },
                      { text: this.datos.paciente.lugarControlPrenatal.slice(4, 5), style: 'center7', marginTop: 3 },
                      { text: this.datos.paciente.lugarControlPrenatal.slice(5, 6), style: 'center7', marginTop: 3 },
                      { text: this.datos.paciente.lugarControlPrenatal.slice(6, 7), style: 'center7', marginTop: 3 },
                      { text: this.datos.paciente.lugarControlPrenatal.slice(7, 8), style: 'center7', marginTop: 3 },
                      { text: this.datos.paciente.lugarControlPrenatal.slice(8, 9), style: 'center7', marginTop: 3 },
                    ],
                    [
                      { text: 'Lugar del parto/aborto', style: 'left7', margin: [-3, -3, -4, -3] },
                      { text: this.datos.paciente.lugarPartoAbort.slice(0, 1), style: 'center7', marginTop: 3 },
                      { text: this.datos.paciente.lugarPartoAbort.slice(1, 2), style: 'center7', marginTop: 3 },
                      { text: this.datos.paciente.lugarPartoAbort.slice(2, 3), style: 'center7', marginTop: 3 },
                      { text: this.datos.paciente.lugarPartoAbort.slice(3, 4), style: 'center7', marginTop: 3 },
                      { text: this.datos.paciente.lugarPartoAbort.slice(4, 5), style: 'center7', marginTop: 3 },
                      { text: this.datos.paciente.lugarPartoAbort.slice(5, 6), style: 'center7', marginTop: 3 },
                      { text: this.datos.paciente.lugarPartoAbort.slice(6, 7), style: 'center7', marginTop: 3 },
                      { text: this.datos.paciente.lugarPartoAbort.slice(7, 8), style: 'center7', marginTop: 3 },
                      { text: this.datos.paciente.lugarPartoAbort.slice(8, 9), style: 'center7', marginTop: 3 },
                    ],
                  ]
                },
              },
              {
                table: {
                  widths: ['90%', '1%', '1%', '1%', '1%', '1%', '1%', '1%', '1%', '1%', '1%'],
                  body: [
                    [
                      { text: 'No ident', style: 'left7', margin: [-3, -3, -5, -3], border: [true, false, true, true] },
                      { text: this.datos.paciente.Numerident.slice(0, 1), style: 'center7', marginTop: 1, border: [true, false, true, true] },
                      { text: this.datos.paciente.Numerident.slice(1, 2), style: 'center7', marginTop: 1, border: [true, false, true, true] },
                      { text: this.datos.paciente.Numerident.slice(2, 3), style: 'center7', marginTop: 1, border: [true, false, true, true] },
                      { text: this.datos.paciente.Numerident.slice(3, 4), style: 'center7', marginTop: 1, border: [true, false, true, true] },
                      { text: this.datos.paciente.Numerident.slice(4, 5), style: 'center7', marginTop: 1, border: [true, false, true, true] },
                      { text: this.datos.paciente.Numerident.slice(5, 6), style: 'center7', marginTop: 1, border: [true, false, true, true] },
                      { text: this.datos.paciente.Numerident.slice(6, 7), style: 'center7', marginTop: 1, border: [true, false, true, true] },
                      { text: this.datos.paciente.Numerident.slice(7, 8), style: 'center7', marginTop: 1, border: [true, false, true, true] },
                      { text: this.datos.paciente.Numerident.slice(8, 9), style: 'center7', marginTop: 1, border: [true, false, true, true] },
                      { text: this.datos.paciente.Numerident.slice(9, 10), style: 'center7', marginTop: 1, border: [true, false, true, true] },
                    ]
                  ]
                }
              }
            ]
          }
        ]
      },
      {
        marginTop: -1,
        columns: [
          {
            table: {
              widths: ['100%'],
              body: [
                [
                  { image: this.writeRotatedText(1, 'ANTECEDENTES'), fit: [20, 110], margin: [-7, -33, 0, 0], fillColor: '#7A7A7A' },
                ]
              ]
            },
            width: '3%'
          },
          {
            table: {
              widths: ['100%'],
              body: [
                [
                  {
                    margin: [0, -3, 0, 1],
                    border: [true, true, true, true],
                    stack: [
                      {
                        columns: [
                          { text: 'FAMILIARES', style: 'left7Bold' },
                          { text: 'PERSONALES', style: 'left7Bold' },
                          { text: ' ', style: 'left7Bold' },
                        ]
                      },
                      {
                        columns: [
                          { text: 'no', style: 'center7Bold', width: '8%', margin: [-4, 0, 0, 0] },
                          { text: 'si', style: 'center7Bold', width: '8%', margin: [-7, 0, 0, 0] },
                          { text: ' ', style: 'center7Bold', width: '20%' },
                          { text: 'No', style: 'center7Bold', width: '8%', margin: [0, 0, -10, 0] },
                          { text: 'si', style: 'center7Bold', width: '8%', margin: [0, 0, -8, 0] },
                          { text: ' ', style: 'center7Bold', width: '6%' },
                          { text: ' ', style: 'center7Bold', width: '6%' },
                          { text: ' ', style: 'center7Bold', width: '20%' },
                          { text: 'no', style: 'center7Bold', width: '8%' },
                          { text: 'si', style: 'center7Bold', width: '8%' },
                        ]
                      },
                      {
                        columns: [
                          { stack: this.cuadroCanvas(this.datos.paciente.enfFamiliares.TbcNo), alignment: 'center', width: '8%', margin: [-4, 0, 0, 0] },
                          { stack: this.cuadroCanvasColor(this.datos.paciente.enfFamiliares.TbcSi), alignment: 'center', width: '8%', margin: [-7, 0, 0, 0] },
                          { text: 'TBC', style: 'center7', width: '20%' },
                          { stack: this.cuadroCanvas(this.datos.paciente.enfPersonales.TbcNo), alignment: 'center', width: '8%', margin: [0, 0, -10, 0] },
                          { stack: this.cuadroCanvasColor(this.datos.paciente.enfPersonales.TbcSi), alignment: 'center', width: '8%', margin: [0, 0, -8, 0] },
                          { text: ' ', style: 'center7Bold', width: '6%' },
                          { text: ' ', style: 'center7Bold', width: '6%' },
                          { text: 'Cirugia genito urinaria', style: 'right7', width: '20%', margin: [-10, -5, 0, 0] },
                          { stack: this.cuadroCanvas(this.datos.paciente.enfPersonales.cirugiaNo), alignment: 'center', width: '8%' },
                          { stack: this.cuadroCanvasColor(this.datos.paciente.enfPersonales.cirugiaSi), alignment: 'center', width: '8%' },
                        ]
                      },
                      {
                        columns: [
                          { stack: this.cuadroCanvas(this.datos.paciente.enfFamiliares.diabetNo), alignment: 'center', width: '8%', margin: [-4, 0, 0, 0] },
                          { stack: this.cuadroCanvasColor(this.datos.paciente.enfFamiliares.diabetSi), alignment: 'center', width: '8%', margin: [-7, 0, 0, 0] },
                          { text: 'diabetes', style: 'center7', width: '20%', margin: [0, 0, 0, 0] },
                          { stack: this.cuadroCanvas(this.datos.paciente.enfPersonales.diabet0), alignment: 'center', width: '8%', margin: [0, 0, -10, 0] },
                          { stack: this.cuadroCanvasI(this.datos.paciente.enfPersonales.diabet1), alignment: 'center', width: '8%', margin: [0, 0, -3, 0] },
                          { stack: this.cuadroCanvasII(this.datos.paciente.enfPersonales.diabet2), alignment: 'center', width: '6%', margin: [0, 0, 0, 0] },
                          { stack: this.cuadroCanvasIII(this.datos.paciente.enfPersonales.diabet3), alignment: 'center', width: '6%', margin: [0, 0, 0, 0] },
                          { text: 'infertilidad', style: 'center7', width: '20%', margin: [0, 0, 0, 0] },
                          { stack: this.cuadroCanvas(this.datos.paciente.enfPersonales.infertNo), alignment: 'center', width: '8%', margin: [0, 0, 0, 0] },
                          { stack: this.cuadroCanvasColor(this.datos.paciente.enfPersonales.infertSi), alignment: 'center', width: '8%', margin: [0, 0, 0, 0] },
                        ]
                      },
                      {
                        columns: [
                          { stack: this.cuadroCanvas(this.datos.paciente.enfFamiliares.hipertNo), alignment: 'center', width: '8%', margin: [-4, 0, 0, 0] },
                          { stack: this.cuadroCanvasColor(this.datos.paciente.enfFamiliares.hipertSi), alignment: 'center', width: '8%', margin: [-7, 0, 0, 0] },
                          { text: 'hipertension', style: 'center7', width: '20%', margin: [-5, 0, -5, 0] },
                          { stack: this.cuadroCanvas(this.datos.paciente.enfPersonales.hipertNo), alignment: 'center', width: '8%', margin: [0, 0, -10, 0] },
                          { stack: this.cuadroCanvasColor(this.datos.paciente.enfPersonales.hipertSi), alignment: 'center', width: '8%', margin: [0, 0, -8, 0] },
                          { text: ' ', style: 'center7Bold', width: '6%', margin: [0, 0, 0, 0] },
                          { text: ' ', style: 'center7Bold', width: '6%', margin: [0, 0, 0, 0] },
                          { text: 'cardiopat.', style: 'center7', width: '20%', margin: [-5, 0, 0, 0] },
                          { stack: this.cuadroCanvas(this.datos.paciente.enfPersonales.cardioNo), alignment: 'center', width: '8%', margin: [0, 0, 0, 0] },
                          { stack: this.cuadroCanvasColor(this.datos.paciente.enfPersonales.cardioSi), alignment: 'center', width: '8%', margin: [0, 0, 0, 0] },
                        ]
                      },
                      {
                        columns: [
                          { stack: this.cuadroCanvas(this.datos.paciente.enfFamiliares.diabetNo), alignment: 'center', width: '8%', margin: [-4, 0, 0, 0] },
                          { stack: this.cuadroCanvasColor(this.datos.paciente.enfFamiliares.diabetSi), alignment: 'center', width: '8%', margin: [-7, 0, 0, 0] },
                          { text: 'preeclampsia', style: 'center7', width: '20%', margin: [-5, 0, -6, 0] },
                          { stack: this.cuadroCanvas(this.datos.paciente.enfPersonales.preeclampNo), alignment: 'center', width: '8%', margin: [0, 0, -10, 0] },
                          { stack: this.cuadroCanvasColor(this.datos.paciente.enfPersonales.preeclampSi), alignment: 'center', width: '8%', margin: [0, 0, -8, 0] },
                          { text: ' ', style: 'center7Bold', width: '6%', margin: [0, 0, 0, 0] },
                          { text: ' ', style: 'center7Bold', width: '6%', margin: [0, 0, 0, 0] },
                          { text: 'nefropatia', style: 'center7', width: '20%', margin: [-5, 0, 0, 0] },
                          { stack: this.cuadroCanvas(this.datos.paciente.enfPersonales.nefropatNo), alignment: 'center', width: '8%', margin: [0, 0, 0, 0] },
                          { stack: this.cuadroCanvasColor(this.datos.paciente.enfPersonales.nefropatSi), alignment: 'center', width: '8%', margin: [0, 0, 0, 0] },
                        ]
                      },
                      {
                        columns: [
                          { stack: this.cuadroCanvas(this.datos.paciente.enfFamiliares.eclapNo), alignment: 'center', width: '8%', margin: [-4, 0, 0, 0] },
                          { stack: this.cuadroCanvasColor(this.datos.paciente.enfFamiliares.eclapSi), alignment: 'center', width: '8%', margin: [-7, 0, 0, 0] },
                          { text: 'eclapsia', style: 'center7', width: '20%', margin: [-5, 0, -6, 0] },
                          { stack: this.cuadroCanvas(this.datos.paciente.enfPersonales.eclapNo), alignment: 'center', width: '8%', margin: [0, 0, -10, 0] },
                          { stack: this.cuadroCanvasColor(this.datos.paciente.enfPersonales.eclapSi), alignment: 'center', width: '8%', margin: [0, 0, -8, 0] },
                          { text: ' ', style: 'center7Bold', width: '6%', margin: [0, 0, 0, 0] },
                          { text: ' ', style: 'center7Bold', width: '6%', margin: [0, 0, 0, 0] },
                          { text: 'violencia', style: 'center7', width: '20%', margin: [-5, 0, 0, 0] },
                          { stack: this.cuadroCanvas(this.datos.paciente.enfPersonales.violenciaNo), alignment: 'center', width: '8%', margin: [0, 0, 0, 0] },
                          { stack: this.cuadroCanvasColor(this.datos.paciente.enfPersonales.violenciaSi), alignment: 'center', width: '8%', margin: [0, 0, 0, 0] },
                        ]
                      },
                      {
                        columns: [
                          { stack: this.cuadroCanvas(this.datos.paciente.enfFamiliares.otrosNo), alignment: 'center', width: '8%', margin: [-4, 0, 0, 0] },
                          { stack: this.cuadroCanvasColor(this.datos.paciente.enfFamiliares.otrosSi), alignment: 'center', width: '8%', margin: [-7, 0, 0, 0] },
                          { text: 'otra cond', style: 'center7', width: '20%', margin: [-5, 0, -6, 0] },
                          { stack: this.cuadroCanvas(this.datos.paciente.enfPersonales.otrosNo), alignment: 'center', width: '8%', margin: [0, 0, -10, 0] },
                          { stack: this.cuadroCanvasColor(this.datos.paciente.enfPersonales.otrosSi), alignment: 'center', width: '8%', margin: [0, 0, -8, 0] },
                          { text: ' ', style: 'center7Bold', width: '6%' },
                          { text: ' ', style: 'center7Bold', width: '6%' },
                          { text: ' ', style: 'center7Bold', width: '6%' },
                          { text: ' ', style: 'center7Bold', width: '6%' },
                          { text: ' ', style: 'center7Bold', width: '6%' },
                        ]
                      },
                    ]
                  }
                ]
              ]
            },
            width: '30%'
          },
          {
            table: {
              widths: ['100%'],
              body: [
                [
                  {
                    margin: [0, -3, 0, -2],
                    border: [false, true, false, true],
                    stack: [
                      {
                        columns: [
                          { text: 'OBSTETRICOS', style: 'left7Bold', width: '20%' },
                          { text: 'gestas previas', style: 'center7', width: '20%', margin: [-15, 0, 0, 0] },
                          { text: 'abortos', style: 'center7', width: '10%', margin: [0, 0, -30, 0] },
                          { text: 'Vaginales', style: 'center7', width: '15%', margin: [0, 0, -25, 0] },
                          { text: 'nacidos vivos', style: 'center7', width: '20%' },
                          { text: 'Viven', style: 'center7', width: '15%', margin: [-15, 0, 0, 0] },
                        ]
                      },
                      {
                        columns: [
                          { text: ' ', style: 'left7', width: '28%' },
                          {
                            margin: [-40, 0, 15, 0],
                            table: {
                              widths: ['30%', '20%', '20%', '30%'],
                              body: [
                                [
                                  { text: '', style: 'center7', border: [false] },
                                  { text: this.datos.paciente.obstetricos.gestas1, style: 'center7' },
                                  { text: this.datos.paciente.obstetricos.gestas2, style: 'center7' },
                                  { text: '', style: 'center7', border: [false] },
                                ]
                              ]
                            }
                          },
                          {
                            margin: [0, 0, -10, 0],
                            table: {
                              widths: ['30%', '20%', '20%', '30%'],
                              body: [
                                [
                                  { text: '', style: 'center7', border: [false] },
                                  { text: this.datos.paciente.obstetricos.abort1, style: 'center7' },
                                  { text: this.datos.paciente.obstetricos.abort2, style: 'center7' },
                                  { text: '', style: 'center7', border: [false] },
                                ]
                              ]
                            }
                          },
                          {
                            margin: [-10, 0, 0, 0],
                            table: {
                              widths: ['30%', '20%', '20%', '30%'],
                              body: [
                                [
                                  { text: '', style: 'center7', border: [false] },
                                  { text: this.datos.paciente.obstetricos.vaginal1, style: 'center7' },
                                  { text: this.datos.paciente.obstetricos.vaginal2, style: 'center7' },
                                  { text: '', style: 'center7', border: [false] },
                                ]
                              ]
                            }
                          },
                          {
                            margin: [-20, 0, 10, 0],
                            table: {
                              widths: ['30%', '20%', '20%', '30%'],
                              body: [
                                [
                                  { text: '', style: 'center7', border: [false] },
                                  { text: this.datos.paciente.obstetricos.nacivivo1, style: 'center7' },
                                  { text: this.datos.paciente.obstetricos.nacivivo2, style: 'center7' },
                                  { text: '', style: 'center7', border: [false] },
                                ]
                              ]
                            }
                          },
                          {
                            margin: [-10, 0, 10, 0],
                            table: {
                              widths: ['30%', '20%', '20%', '30%'],
                              body: [
                                [
                                  { text: '', style: 'center7', border: [false] },
                                  { text: this.datos.paciente.obstetricos.viven1, style: 'center7' },
                                  { text: this.datos.paciente.obstetricos.viven2, style: 'center7' },
                                  { text: '', style: 'center7', border: [false] },
                                ]
                              ]
                            }
                          },
                        ]
                      },
                      {
                        marginTop: 1,
                        columns: [
                          {
                            width: '25%',
                            table: {
                              widths: ['100%'],
                              body: [
                                [
                                  {
                                    margin: [0, -2, 0, -3],
                                    stack: [
                                      { text: 'ULTIMO PREVIO', style: 'center7Bold', margin: [0, 0, 0, -4] },
                                      {
                                        columns: [
                                          { text: 'n/c', style: 'center7', width: '30%', margin: [-8, 3, 0, 0] },
                                          { stack: this.cuadroCanvas(this.datos.paciente.obstetricos.pesoUltPrev1), alignment: 'center', width: '10%', margin: [0, 3, -5, 0] },
                                          { text: '<2500g', style: 'center7', width: '50%', margin: [0, 3, 0, 0] },
                                          { stack: this.cuadroCanvasColor(this.datos.paciente.obstetricos.pesoUltPrev3), alignment: 'center', width: '10%', margin: [0, 3, 0, 0] },
                                        ]
                                      },
                                      {
                                        columns: [
                                          { text: 'normal', style: 'center7', width: '30%', margin: [-5, 3, 0, 0] },
                                          { stack: this.cuadroCanvas(this.datos.paciente.obstetricos.pesoUltPrev1), alignment: 'center', width: '10%', margin: [0, 3, -5, 0] },
                                          { text: '>4000g', style: 'center7', width: '50%', margin: [0, 3, 0, 0] },
                                          { stack: this.cuadroCanvasColor(this.datos.paciente.obstetricos.pesoUltPrev4), alignment: 'center', width: '10%', margin: [0, 3, 0, 0] },
                                        ]
                                      },
                                    ]
                                  },
                                ],
                                [
                                  { text: '', style: 'center7', border: [false] },
                                ],
                                [
                                  {
                                    stack: [
                                      {
                                        columns: [
                                          { text: ' ', style: 'center7', width: '60%', margin: [0, -3, 0, 0] },
                                          { text: 'no', style: 'center7', width: '20%', margin: [0, -3, 0, 0] },
                                          { text: 'si', style: 'center7', width: '20%', margin: [0, -3, 0, 0] },
                                        ]
                                      },
                                      {
                                        columns: [
                                          { text: 'Antecedentes de gemelares', style: 'center7', width: '60%', margin: [-5, -3, -2, -2] },
                                          { stack: this.cuadroCanvas(this.datos.paciente.obstetricos.gemelaresNo), alignment: 'center', width: '20%' },
                                          { stack: this.cuadroCanvasColor(this.datos.paciente.obstetricos.gemelaresSi), alignment: 'center', width: '20%' },
                                        ]
                                      },
                                    ]
                                  },
                                ],
                              ]
                            }
                          },
                          {
                            margin: [5, 3, 0, 0],
                            width: '8%',
                            stack: [
                              {
                                table: {
                                  widths: ['100%'],
                                  body: [
                                    [
                                      { text: this.datos.paciente.obstetricos.ectopico, style: 'center7' }
                                    ]
                                  ]
                                }
                              },
                              { canvas: [{ type: 'line', x1: 9, y1: -19, x2: 9, y2: -13 }] },
                              { text: 'emb ectopico', style: 'left6', margin: [-3, 0, -30, 0] },
                              { canvas: [{ type: 'line', x1: 12, y1: -35, x2: 48, y2: 15 }] },
                              { canvas: [{ type: 'line', x1: -5, y1: 5, x2: 48, y2: 5 }] },
                              { canvas: [{ type: 'line', x1: -5, y1: -15, x2: 48, y2: 0 }] },
                            ]
                          },
                          {
                            columns: [
                              { text: '3 espont consecutivos', style: 'right6', margin: [0, 3, -37, 0] },
                              { stack: this.cuadroCanvasColor(this.datos.paciente.obstetricos.consecut3), alignment: 'center', margin: [0, 3, -70, 0] },
                              { canvas: [{ type: 'line', x1: -39, y1: -10, x2: 9, y2: -10 }] },
                            ]
                          },
                          {},
                          {
                            marginTop: 35,
                            columns: [
                              {
                                margin: [-70, -5, 60, 0],
                                stack: [
                                  { text: 'partos', style: 'center7' },
                                  {
                                    table: {
                                      widths: ['50%', '50%'],
                                      body: [
                                        [
                                          { text: this.datos.paciente.obstetricos.partos1, style: 'center7' },
                                          { text: this.datos.paciente.obstetricos.partos2, style: 'center7' },
                                        ]
                                      ]
                                    }
                                  },
                                ]
                              },
                              {
                                margin: [-50, -5, 40, 0],
                                stack: [
                                  { text: 'cesáreas', style: 'center7', margin: [-1, 0, -1, 0] },
                                  {
                                    table: {
                                      widths: ['100%'],
                                      body: [
                                        [
                                          { text: this.datos.paciente.obstetricos.cesarias, style: 'center7', fillColor: 'yellow' },
                                        ]
                                      ]
                                    }
                                  },
                                ]
                              },
                              {
                                margin: [-20, -15, 10, 0],
                                stack: [
                                  { text: 'nacidos muertos', style: 'center7' },
                                  {
                                    table: {
                                      widths: ['100%'],
                                      body: [
                                        [
                                          { text: this.datos.paciente.obstetricos.nacimuert, style: 'center7', fillColor: 'yellow' },
                                        ]
                                      ]
                                    }
                                  },
                                  { canvas: [{ type: 'line', x1: -13, y1: -58, x2: -10, y2: -58 }] },
                                  { canvas: [{ type: 'line', x1: -10, y1: -30, x2: 0, y2: -53 }] },
                                  { canvas: [{ type: 'line', x1: -10, y1: -58, x2: -10, y2: -5 }] },
                                  { canvas: [{ type: 'line', x1: -10, y1: -30, x2: 1, y2: -13 }] },
                                  { canvas: [{ type: 'line', x1: -20, y1: -5, x2: -10, y2: -5 }] },
                                  { canvas: [{ type: 'line', x1: -46, y1: -5, x2: -57, y2: -5 }] },
                                  { canvas: [{ type: 'line', x1: -58, y1: -11, x2: -38, y2: -52 }] },
                                  { canvas: [{ type: 'line', x1: -53, y1: -46, x2: -53, y2: -53 }] },
                                ]
                              }
                            ]
                          },
                          {
                            marginTop: 5,
                            stack: [
                              {
                                columns: [
                                  { text: 'muertos 1ra sem', style: 'left6', margin: [-5, 0, 3, 0] },
                                  {
                                    margin: [-8, 0, 15, 0],
                                    table: {
                                      widths: ['100%'],
                                      body: [
                                        [
                                          { text: this.datos.paciente.obstetricos.muert1ra, style: 'center7', fillColor: 'yellow', margin: [-3, 0, -3, 0] },
                                        ]
                                      ]
                                    }
                                  },
                                ]
                              },
                              { canvas: [{ type: 'line', x1: -17, y1: -28, x2: 8, y2: -28 }] },
                              { canvas: [{ type: 'line', x1: -17, y1: -28, x2: -5, y2: 10 }] },
                              { canvas: [{ type: 'line', x1: -10, y1: -20, x2: -5, y2: -20 }] },
                              {
                                marginTop: 5,
                                columns: [
                                  { text: 'despues 1ra sem', style: 'left6', margin: [-5, -5, 3, 0] },
                                  {
                                    margin: [-8, -5, 15, 0],
                                    table: {
                                      widths: ['100%'],
                                      body: [
                                        [
                                          { text: this.datos.paciente.obstetricos.muert2da, style: 'center7', fillColor: 'yellow', margin: [-3, 0, -3, 0] },
                                        ]
                                      ]
                                    }
                                  },
                                ]
                              },
                            ]
                          },
                        ]
                      }
                    ]
                  },
                ]
              ]
            },
            width: '52%'
          },
          {
            table: {
              widths: ['100%'],
              body: [
                [
                  {
                    border: [false, true, true, false],
                    margin: [-5, 0, -5, 0],
                    stack: [
                      { text: 'FIN EMBARAZO ANTERIOR', style: 'left7Bold' },
                      {
                        margin: [-10, 0, 10, 0],
                        columns: [
                          {
                            width: '60%',
                            table: {
                              widths: ['30%', '30%', '40%'],
                              body: [
                                [
                                  { text: 'dia', style: 'left7', border: [true, true, false, false], margin: [-3, -2, -3, 0] },
                                  { text: 'mes', style: 'left7', border: [false, true, false, false], margin: [-3, -2, -3, 0] },
                                  { text: 'año', style: 'left7', border: [false, true, true, false], margin: [-3, -2, -3, 0] },
                                ],
                                [
                                  { text: this.datos.paciente.obstetricos.fecha_fin.dia.slice(0, 1) + '  ' + this.datos.paciente.obstetricos.fecha_fin.dia.slice(1, 2), style: 'left7', border: [true, false, true, true], margin: [-3, -5, -3, 0] },
                                  { text: this.datos.paciente.obstetricos.fecha_fin.mes.slice(0, 1) + '  ' + this.datos.paciente.obstetricos.fecha_fin.mes.slice(1, 2), style: 'left7', border: [true, false, true, true], margin: [-3, -5, -3, 0] },
                                  { text: this.datos.paciente.obstetricos.fecha_fin.año.slice(0, 2) + '  ' + this.datos.paciente.obstetricos.fecha_fin.año.slice(2, 4), style: 'left7', border: [false, false, true, true], margin: [-5, -5, -5, 0] },
                                ],
                              ]
                            }
                          },
                          { canvas: [{ type: 'line', x1: -11, y1: 14, x2: -11, y2: 20 }] },
                          { canvas: [{ type: 'line', x1: -29, y1: 14, x2: -29, y2: 20 }] },
                          { canvas: [{ type: 'line', x1: -45, y1: 14, x2: -45, y2: 20 }] },
                          {
                            width: '40%',
                            stack: [
                              { stack: this.cuadroCanvasColor(this.datos.paciente.obstetricos.diasTrans), alignment: 'center' },
                              { text: 'menos de 1 año', style: 'left6', margin: [1, 0, -10, 0] },
                            ]
                          },
                          { canvas: [{ type: 'line', x1: -23, y1: 5, x2: -36, y2: 5 }] },
                        ]
                      },
                      {
                        columns: [
                          { text: 'EMBARAZO PLANEADO', style: 'left6', width: '50%', margin: [-18, 2, -5, 0] },
                          { text: 'no', style: 'left7', width: '15%', margin: [3, 0, 0, 0] },
                          { stack: this.cuadroCanvasColor(this.datos.paciente.obstetricos.embarPlaneadoNo), alignment: 'center', width: '10%', margin: [-2, 0, 0, 0] },
                          { text: 'si', style: 'left7', width: '15%', margin: [0, 0, -5, 0] },
                          { stack: this.cuadroCanvas(this.datos.paciente.obstetricos.embarPlaneadoSi), alignment: 'center', width: '10%', margin: [-10, 0, 0, 0] },
                        ]
                      },
                      { text: 'FRACASO METODO ANTICONCEPTIVO', style: 'center6', margin: [-18, 6, -2, 0] },
                      {
                        margin: [-20, 0, 0, 0],
                        columns: [
                          { stack: this.cuadroCanvas(this.datos.paciente.obstetricos.metAntico1), alignment: 'center' },
                          { stack: this.cuadroCanvasColor(this.datos.paciente.obstetricos.metAntico2), alignment: 'center' },
                          { stack: this.cuadroCanvasColor(this.datos.paciente.obstetricos.metAntico3), alignment: 'center' },
                          { stack: this.cuadroCanvasColor(this.datos.paciente.obstetricos.metAntico4), alignment: 'center' },
                          { stack: this.cuadroCanvasColor(this.datos.paciente.obstetricos.metAntico5), alignment: 'center' },
                          { stack: this.cuadroCanvasColor(this.datos.paciente.obstetricos.metAntico6), alignment: 'center' },
                        ]
                      },
                      {
                        margin: [-20, 0, 0, 0],
                        columns: [
                          { text: 'no usaba', style: 'left6', width: '20%' },
                          { text: 'barrera', style: 'left6', width: '15%', margin: [-7, 0, 0, 0] },
                          { text: 'DIU', style: 'left6', width: '20%' },
                          { text: 'hormonal', style: 'left6', width: '10%', margin: [-8, 0, 0, 0] },
                          { text: 'emergencia', style: 'left6', width: '18%' },
                          { text: 'natural', style: 'left6', width: '15%', margin: [0, 0, -3, 0] },
                        ]
                      }
                    ]
                  }
                ]
              ]
            },
            width: '15%'
          }
        ]
      },
      {
        columns: [
          {
            margin: [0, -2, 0, -2],
            table: {
              widths: ['9%', '7%', '1%', '10%', '8%', '35%', '8%', '14%', '8%'],
              body: [
                [
                  { text: 'GESTACION ACTUAL', style: 'center8Bold', color: '#FFFFFF', fillColor: '#7A7A7A', colSpan: 2 },
                  {},
                  { image: this.writeRotatedText2(1, 'FPP FUM'), fit: [15, 70], rowSpan: 3, margin: [-6, -35], border: [true, true, false, true] },
                  { text: '', style: 'left7', border: [false, true, false, false] },
                  { text: 'EG CONFIABLE', style: 'center7', border: [true, true, true, false], margin: [-3, -3, -4, 0] },
                  { text: '', style: 'left7', border: [true, true, true, false] },
                  { text: 'ANTIRUBEOLA', style: 'center7', border: [true, true, true, false], margin: [-2, -3, -4, 0] },
                  { text: 'ANTITETANICA', style: 'center7', border: [true, true, true, false], margin: [0, -3, 0, 0] },
                  { text: 'EX. NORMAL', style: 'center7', border: [false, true, true, false] },
                ],
                [
                  { text: 'PESO ANTERIOR', style: 'left7', border: [true, false, true, false], margin: [-3, 0, -8, 0] },
                  { text: 'TALLA (CM)', style: 'center7', border: [true, false, true, false], margin: [-3, 0, -5, 0] },
                  {},
                  { text: '', style: 'left6', border: [false, false, false, false] },
                  { text: '', style: 'left6', border: [true, false, true, false] },
                  { text: '', style: 'left6', border: [true, false, true, false] },
                  { text: '', style: 'left6', border: [true, false, true, false] },
                  { text: '', style: 'left6', border: [true, false, true, false] },
                  { text: '', style: 'left6', border: [true, false, true, false] },
                ],
                [
                  {
                    border: [true, false, true, true],
                    table: {
                      widths: ['33%', '33%', '33%'],
                      body: [
                        [
                          { text: this.datos.paciente.peso.pesoAnt1, style: 'center7' },
                          { text: this.datos.paciente.peso.pesoAnt2, style: 'center7' },
                          { text: this.datos.paciente.peso.pesoAnt3, style: 'center7' }
                        ]
                      ]
                    }
                  },
                  {
                    border: [true, false, true, true],
                    table: {
                      widths: ['33%', '33%', '33%'],
                      body: [
                        [
                          { text: '1', style: 'center7' },
                          { text: this.datos.paciente.talla.tallaGest2, style: 'center7' },
                          { text: this.datos.paciente.talla.tallaGest3, style: 'center7' }
                        ]
                      ]
                    }
                  },
                  {},
                  {
                    margin: [-10, -28, 0, 0],
                    border: [false, false, true, true],
                    stack: [
                      {
                        table: {
                          widths: ['30%', '30%', '40%'],
                          body: [
                            [
                              {
                                border: [true, true, false, true],
                                style: 'center7Bold',
                                stack: [
                                  { text: 'dia' },
                                  { text: this.datos.paciente.fecha_fum.dia.slice(0, 1) + '  ' + this.datos.paciente.fecha_fum.dia.slice(1, 2), margin: [-3, 0, -3, 0] },
                                ]
                              },
                              {
                                border: [false, true, false, true],
                                style: 'center7Bold',
                                stack: [
                                  { text: 'mes', margin: [-3, 0, -3, 0] },
                                  { text: this.datos.paciente.fecha_fum.mes.slice(0, 1) + '  ' + this.datos.paciente.fecha_fum.mes.slice(1, 2), margin: [-3, 0, -3, 0] }
                                ]
                              },
                              {
                                border: [false, true, true, true],
                                style: 'center7Bold',
                                stack: [
                                  { text: 'año' },
                                  { text: this.datos.paciente.fecha_fum.año.slice(2, 3) + '  ' + this.datos.paciente.fecha_fum.año.slice(3, 4) }
                                ]
                              }
                            ],
                            [
                              {
                                border: [true, true, false, true],
                                style: 'center7Bold',
                                stack: [
                                  { text: 'dia' },
                                  { text: this.datos.paciente.fecha_fpp.dia.slice(0, 1) + '  ' + this.datos.paciente.fecha_fpp.dia.slice(1, 2), margin: [-3, 0, -3, 0] },
                                  { canvas: [{ type: 'line', x1: 0, y1: -25, x2: 0, y2: -19 }] },
                                  { canvas: [{ type: 'line', x1: 17, y1: -30, x2: 17, y2: -10 }] },
                                  { canvas: [{ type: 'line', x1: 17, y1: -40, x2: 17, y2: -35 }] },
                                  { canvas: [{ type: 'line', x1: 37, y1: -25, x2: 37, y2: -19 }] },
                                  { canvas: [{ type: 'line', x1: 58, y1: -30, x2: 58, y2: -10 }] },
                                  { canvas: [{ type: 'line', x1: 58, y1: -40, x2: 58, y2: -35 }] },
                                  { canvas: [{ type: 'line', x1: 80, y1: -25, x2: 80, y2: -19 }] },
                                ]
                              },
                              {
                                border: [false, true, false, true],
                                style: 'center7Bold',
                                stack: [
                                  { text: 'mes', margin: [-3, 0, -3, 0] },
                                  { text: this.datos.paciente.fecha_fpp.mes.slice(0, 1) + '  ' + this.datos.paciente.fecha_fpp.mes.slice(1, 2), margin: [-3, 0, -3, 0] }
                                ]
                              },
                              {
                                border: [false, true, true, true],
                                style: 'center7Bold',
                                stack: [
                                  { text: 'año' },
                                  { text: this.datos.paciente.fecha_fpp.año.slice(2, 3) + '  ' + this.datos.paciente.fecha_fpp.año.slice(3, 4) },
                                ]
                              }
                            ],
                          ]
                        }
                      },
                      { canvas: [{ type: 'line', x1: 10, y1: -6, x2: 10, y2: 0 }] },
                      { canvas: [{ type: 'line', x1: 18, y1: -10, x2: 18, y2: 0 }] },
                      { canvas: [{ type: 'line', x1: 29, y1: -6, x2: 29, y2: 0 }] },
                      { canvas: [{ type: 'line', x1: 38, y1: -10, x2: 38, y2: 0 }] },
                      { canvas: [{ type: 'line', x1: 50, y1: -6, x2: 50, y2: 0 }] },
                    ]
                  },
                  {
                    border: [false, false, true, true],
                    margin: [-5, -25, 0, 0],
                    stack: [
                      { text: 'por', style: 'center7' },
                      {
                        columns: [
                          { text: 'FUM', style: 'center7' },
                          { text: 'Eco <20s', style: 'center7', margin: [-3, 0, -5, 0] }
                        ]
                      },
                      {
                        columns: [
                          { text: 'no', style: 'center7' },
                          { stack: this.cuadroCanvasColor(this.datos.paciente.ecog_men20semSi), alignment: 'center', margin: [-5, 0, 0, 0] },
                          { stack: this.cuadroCanvasColor(this.datos.paciente.ecog_men20semNo), alignment: 'center' },
                        ]
                      },
                      {
                        columns: [
                          { text: 'si', style: 'center7' },
                          { stack: this.cuadroCanvas(this.datos.paciente.ecog_men20semNo), alignment: 'center', margin: [-5, 2, 0, 0] },
                          { stack: this.cuadroCanvas(this.datos.paciente.ecog_men20semSi), alignment: 'center', margin: [0, 2, 0, 0] },
                        ]
                      }
                    ]
                  },
                  {
                    border: [false, false, true, true],
                    margin: [-5, -31, -5, 0],
                    stack: [
                      {
                        columns: [
                          { text: ' ', style: 'center7', width: '8%' },
                          { text: 'FUMA ACT', style: 'center7', width: '20%' },
                          { text: 'FUMA PAS', style: 'center7', width: '20%' },
                          { text: 'DROGAS', style: 'center7', width: '15%' },
                          { text: 'ALCOHOL', style: 'center7', width: '17%' },
                          { text: 'VIOLENCIA', style: 'center7', width: '20%' },
                        ]
                      },
                      {
                        columns: [
                          { text: ' ', style: 'center7' },
                          { text: 'no', style: 'center7', margin: [0, 0, -10, 0] },
                          { text: 'si', style: 'center7' },
                          { text: 'no', style: 'center7' },
                          { text: 'si', style: 'center7' },
                          { text: 'no', style: 'center7' },
                          { text: 'si', style: 'center7' },
                          { text: 'no', style: 'center7' },
                          { text: 'si', style: 'center7' },
                          { text: 'no', style: 'center7' },
                          { text: 'si', style: 'center7' },
                        ]
                      },
                      {
                        columns: [
                          { text: '1er trim', style: 'center7', margin: [0, -1, -8, 0] },
                          { stack: this.cuadroCanvas(this.datos.paciente.fumaAct1TrimNo), alignment: 'center', margin: [0, -1, -10, 0] },
                          { stack: this.cuadroCanvasColor(this.datos.paciente.fumaAct1TrimSi), alignment: 'center', margin: [0, -1, -5, 0] },
                          { stack: this.cuadroCanvas(this.datos.paciente.fumaPas1TrimNo), alignment: 'center', margin: [0, -1, 0, 0] },
                          { stack: this.cuadroCanvasColor(this.datos.paciente.fumaPas1TrimSi), alignment: 'center', margin: [0, -1, 0, 0] },
                          { stack: this.cuadroCanvas(this.datos.paciente.drogas1TrimNo), alignment: 'center', margin: [0, -1, 0, 0] },
                          { stack: this.cuadroCanvasColor(this.datos.paciente.drogas1TrimSi), alignment: 'center', margin: [0, -1, 0, 0] },
                          { stack: this.cuadroCanvas(this.datos.paciente.alcohol1TrimNo), alignment: 'center', margin: [0, -1, 0, 0] },
                          { stack: this.cuadroCanvasColor(this.datos.paciente.alcohol1TrimSi), alignment: 'center', margin: [0, -1, 0, 0] },
                          { stack: this.cuadroCanvas(this.datos.paciente.violencia1TrimNo), alignment: 'center', margin: [0, -1, 0, 0] },
                          { stack: this.cuadroCanvasColor(this.datos.paciente.violencia1TrimSi), alignment: 'center', margin: [0, -1, 0, 0] },
                        ]
                      },
                      {
                        margin: [0, 2, 0, 0],
                        columns: [
                          { text: '2do trim', style: 'center7', margin: [0, -1, -10, 0] },
                          { stack: this.cuadroCanvas(this.datos.paciente.fumaAct2TrimNo), alignment: 'center', margin: [0, -1, -10, 0] },
                          { stack: this.cuadroCanvasColor(this.datos.paciente.fumaAct2TrimSi), alignment: 'center', margin: [0, -1, -5, 0] },
                          { stack: this.cuadroCanvas(this.datos.paciente.fumaPas2TrimNo), alignment: 'center', margin: [0, -1, 0, 0] },
                          { stack: this.cuadroCanvasColor(this.datos.paciente.fumaPas2TrimSi), alignment: 'center', margin: [0, -1, 0, 0] },
                          { stack: this.cuadroCanvas(this.datos.paciente.drogas2TrimNo), alignment: 'center', margin: [0, -1, 0, 0] },
                          { stack: this.cuadroCanvasColor(this.datos.paciente.drogas2TrimSi), alignment: 'center', margin: [0, -1, 0, 0] },
                          { stack: this.cuadroCanvas(this.datos.paciente.alcohol2TrimNo), alignment: 'center', margin: [0, -1, 0, 0] },
                          { stack: this.cuadroCanvasColor(this.datos.paciente.alcohol2TrimSi), alignment: 'center', margin: [0, -1, 0, 0] },
                          { stack: this.cuadroCanvas(this.datos.paciente.violencia2TrimNo), alignment: 'center', margin: [0, -1, 0, 0] },
                          { stack: this.cuadroCanvasColor(this.datos.paciente.violencia2TrimSi), alignment: 'center', margin: [0, -1, 0, 0] },
                        ]
                      },
                      {
                        margin: [0, 2, 0, 0],
                        columns: [
                          { text: '3er trim', style: 'center7', margin: [0, -1, -10, 0] },
                          { stack: this.cuadroCanvas(this.datos.paciente.fumaAct3TrimNo), alignment: 'center', margin: [0, -1, -10, 0] },
                          { stack: this.cuadroCanvasColor(this.datos.paciente.fumaAct3TrimSi), alignment: 'center', margin: [0, -1, -5, 0] },
                          { stack: this.cuadroCanvas(this.datos.paciente.fumaPas3TrimNo), alignment: 'center', margin: [0, -1, 0, 0] },
                          { stack: this.cuadroCanvasColor(this.datos.paciente.fumaPas3TrimSi), alignment: 'center', margin: [0, -1, 0, 0] },
                          { stack: this.cuadroCanvas(this.datos.paciente.drogas3TrimNo), alignment: 'center', margin: [0, -1, 0, 0] },
                          { stack: this.cuadroCanvasColor(this.datos.paciente.drogas3TrimSi), alignment: 'center', margin: [0, -1, 0, 0] },
                          { stack: this.cuadroCanvas(this.datos.paciente.alcohol3TrimNo), alignment: 'center', margin: [0, -1, 0, 0] },
                          { stack: this.cuadroCanvasColor(this.datos.paciente.alcohol3TrimSi), alignment: 'center', margin: [0, -1, 0, 0] },
                          { stack: this.cuadroCanvas(this.datos.paciente.violencia3TrimNo), alignment: 'center', margin: [0, -1, 0, 0] },
                          { stack: this.cuadroCanvasColor(this.datos.paciente.violencia3TrimSi), alignment: 'center', margin: [0, -1, 0, 0] },
                        ]
                      }
                    ]
                  },
                  {
                    border: [true, false, true, true],
                    margin: [-5, -20, -5, 0],
                    stack: [
                      {
                        columns: [
                          { text: 'previa', style: 'center7' },
                          { text: 'no sabe', style: 'center7' },
                        ]
                      },
                      {
                        columns: [
                          { stack: this.cuadroCanvas(this.datos.paciente.antirubeP), alignment: 'center' },
                          { stack: this.cuadroCanvasColor(this.datos.paciente.antirubeI), alignment: 'center' },
                        ]
                      },
                      {
                        columns: [
                          { text: 'embarazo', style: 'center7', margin: [0, 0, -8, 0] },
                          { text: 'no', style: 'center7', margin: [0, 0, 0, 0] },
                        ]
                      },
                      {
                        columns: [
                          { stack: this.cuadroCanvas(this.datos.paciente.antirubeE), alignment: 'center' },
                          { stack: this.cuadroCanvasColor(this.datos.paciente.antirubeN), alignment: 'center' },
                        ]
                      },
                    ]
                  },
                  {
                    border: [true, false, true, true],
                    margin: [-5, -25, 0, 0],
                    table: {
                      widths: ['70%', '5%', '10%', '5%', '10%'],
                      body: [
                        [
                          { text: 'vigente', style: 'left7', border: [false, false, false, false], margin: [-2, 0, 0, 0] },
                          { text: 'no', style: 'center7', margin: [-7, 0, 0, 0], border: [false, false, false, false] },
                          { stack: this.cuadroCanvasColor(this.datos.paciente.vigenteNo), alignment: 'center', border: [false, false, false, false] },
                          { text: 'si', style: 'center7', margin: [-5, 0, 0, 0], border: [false, false, false, false] },
                          { stack: this.cuadroCanvas(this.datos.paciente.vigenteSi), alignment: 'center', border: [false, false, false, false] },
                        ],
                        [
                          { text: 'DOSIS mes gestacion', style: 'left7', margin: [-3, -5, -8, 0], border: [false, false, false, false] },
                          { text: '1a', style: 'left7', margin: [-5, 0, -3, 0], border: [false, false, false, false] },
                          { text: this.datos.paciente.primDosisMes, style: 'left7' },
                          { text: '2a', style: 'left7', margin: [-3, 0, -4, 0], border: [false, false, false, false] },
                          { text: this.datos.paciente.segDosisMes, style: 'left7' },
                        ]
                      ]
                    }
                  },
                  {
                    border: [true, false, true, true],
                    margin: [-4, -23, -3, 0],
                    stack: [
                      {
                        columns: [
                          { text: '', style: 'center7', width: '60%' },
                          { text: 'no', style: 'center7' },
                          { text: 'si', style: 'center7' },
                        ]
                      },
                      {
                        columns: [
                          { text: 'ODONT.', style: 'left7', width: '60%' },
                          { stack: this.cuadroCanvasColor(this.datos.paciente.odontExNo), alignment: 'center' },
                          { stack: this.cuadroCanvas(this.datos.paciente.odontExSi), alignment: 'center' },
                        ]
                      },
                      {
                        columns: [
                          { text: 'MAMAS', style: 'left7', width: '60%', margin: [0, 5, 0, 0] },
                          { stack: this.cuadroCanvasColor(this.datos.paciente.mamasExNo), alignment: 'center', margin: [0, 5, 0, 0] },
                          { stack: this.cuadroCanvas(this.datos.paciente.mamasExSi), alignment: 'center', margin: [0, 5, 0, 0] },
                        ]
                      },
                    ]
                  },
                ],
              ],
            },
            width: '100%'
          }
        ]
      },
      {
        columns: [
          {
            width: '44%',
            stack: [
              {
                columns: [
                  {
                    table: {
                      widths: ['100%'],
                      body: [
                        [
                          { image: this.writeRotatedText2(1, 'CERVIX'), fit: [25, 120], margin: [-9, -75, 0, 6], border: [true, true, false, true] },
                        ],
                      ]
                    },
                    width: '4%'
                  },
                  {
                    table: {
                      widths: ['100%'],
                      body: [
                        [
                          {
                            border: [false, true, true, true],
                            stack: [
                              {
                                columns: [
                                  { text: 'normal', style: 'center7' },
                                  { text: 'anormal', style: 'center7' },
                                  { text: 'no se hizo', style: 'center7', margin: [-5, 0, 0, 0] },
                                ]
                              },
                              {
                                columns: [
                                  { text: 'insp. visual', style: 'left7', width: '25%', margin: [-3, -4, 0, 0] },
                                  { stack: this.cuadroCanvas(this.datos.paciente.insp_cervNormal), alignment: 'center' },
                                  { stack: this.cuadroCanvasColor(this.datos.paciente.insp_cervAnormal), alignment: 'center' },
                                  { stack: this.cuadroCanvasColor(this.datos.paciente.insp_cervNoHizo), alignment: 'center' },
                                ]
                              },
                              {
                                columns: [
                                  { text: 'PAP', style: 'left7', width: '25%' },
                                  { stack: this.cuadroCanvas(this.datos.paciente.pap_cervNormal), alignment: 'center' },
                                  { stack: this.cuadroCanvasColor(this.datos.paciente.pap_cervAnormal), alignment: 'center' },
                                  { stack: this.cuadroCanvasColor(this.datos.paciente.pap_cervNoHizo), alignment: 'center' },
                                ]
                              },
                              {
                                columns: [
                                  { text: 'COLP', style: 'left7', width: '25%', margin: [-3, 2, -2, 0] },
                                  { stack: this.cuadroCanvas(this.datos.paciente.colp_cervNormal), alignment: 'center', margin: [0, 2, 0, 0] },
                                  { stack: this.cuadroCanvasColor(this.datos.paciente.colp_cervAnormal), alignment: 'center', margin: [0, 2, 0, 0] },
                                  { stack: this.cuadroCanvasColor(this.datos.paciente.colp_cervNoHizo), alignment: 'center', margin: [0, 2, 0, 0] },
                                ]
                              },
                            ]
                          },
                        ]
                      ]
                    },
                    width: '30%'
                  },
                  {
                    table: {
                      widths: ['100%'],
                      body: [
                        [
                          {
                            border: [false, true, true, true],
                            stack: [
                              {
                                columns: [
                                  { text: 'GRUPO', style: 'center7', width: '35%' },
                                  { text: 'RH', style: 'center7', width: '25%' },
                                  { text: 'Inmuniz', style: 'center7', width: '40%', margin: [0, 0, -5, 0] },
                                ]
                              },
                              {
                                columns: [
                                  {
                                    width: '35%',
                                    table: {
                                      widths: ['100%'],
                                      body: [
                                        [
                                          { text: this.datos.paciente.grupoSang, style: 'center7' }
                                        ]
                                      ]
                                    }
                                  },
                                  {
                                    width: '25%',
                                    margin: [0, -3, 0, 0],
                                    stack: [
                                      {
                                        columns: [
                                          { text: '--', style: 'center7', margin: [0, 0, -5, 0] },
                                          { text: '+', style: 'center7', margin: [0, 0, -12, 0] },
                                        ]
                                      },
                                      {
                                        columns: [
                                          { stack: this.cuadroCanvasColor(this.datos.paciente.rh_paciNegat), alignment: 'center', margin: [0, 0, -5, 0] },
                                          { stack: this.cuadroCanvas(this.datos.paciente.rh_paciPosit), alignment: 'center', margin: [0, 0, -12, 0] },
                                        ]
                                      }
                                    ]
                                  },
                                  {
                                    width: '40%',
                                    columns: [
                                      { text: 'no', style: 'center7', margin: [0, 0, -10, 0] },
                                      { stack: this.cuadroCanvas(this.datos.paciente.inmunizaNo), alignment: 'center', margin: [0, 0, -8, 0] },
                                    ]
                                  }
                                ]
                              },
                              {
                                columns: [
                                  { text: 'yglobulina anti D', style: 'left7', width: '75%', margin: [0, 5, -3, 0] },
                                  { text: 'si', style: 'center7', width: '15%', margin: [-5, -3, 0, 0] },
                                  { stack: this.cuadroCanvasColor(this.datos.paciente.inmunizaSi), alignment: 'center', width: '10%', margin: [0, -3, 0, 0] }
                                ]
                              },
                              {
                                marginTop: 4,
                                columns: [
                                  { text: 'no', style: 'center7' },
                                  { stack: this.cuadroCanvasColor(this.datos.paciente.gamaglobNo), alignment: 'center' },
                                  { text: 'si', style: 'center7' },
                                  { stack: this.cuadroCanvas(this.datos.paciente.gamaglobSi), alignment: 'center' },
                                  { text: 'n/c', style: 'center7' },
                                  { stack: this.cuadroCanvas(this.datos.paciente.gamaglobNc), alignment: 'center' },
                                ]
                              }
                            ]
                          }
                        ]
                      ]
                    },
                    width: '30%'
                  },
                  {
                    table: {
                      widths: ['100%'],
                      body: [
                        [
                          {
                            border: [false, true, true, true],
                            stack: [
                              {
                                columns: [
                                  { text: 'TOXOPLASMOSIS', style: 'left7', width: '65%', margin: [-5, 0, -3, 0] },
                                  { text: '--', style: 'left7', width: '10%' },
                                  { text: '+', style: 'left7', width: '10%' },
                                  { text: 'no se hizo', style: 'left7', width: '15%', margin: [-3, 0, -7, 0] },
                                ]
                              },
                              {
                                columns: [
                                  { text: '< 20 sem IgG', style: 'left7', width: '55%' },
                                  { stack: this.cuadroCanvasColor(this.datos.paciente.sem1_iggMenos), alignment: 'center', width: '15%' },
                                  { stack: this.cuadroCanvas(this.datos.paciente.sem1_iggMas), alignment: 'center', width: '15%' },
                                  { stack: this.cuadroCanvasColor(this.datos.paciente.sem1_iggNo), alignment: 'center', width: '15%' },
                                ]
                              },
                              {
                                marginTop: 2,
                                columns: [
                                  { text: '>=20 sem IgG', style: 'left7', width: '55%' },
                                  { stack: this.cuadroCanvasColor(this.datos.paciente.sem2_iggMenos), alignment: 'center', width: '15%' },
                                  { stack: this.cuadroCanvasColor(this.datos.paciente.sem2_iggMas), alignment: 'center', width: '15%' },
                                  { stack: this.cuadroCanvasColor(this.datos.paciente.sem2_iggNo), alignment: 'center', width: '15%' },
                                  { canvas: [{ type: 'line', x1: -88, y1: 12, x2: 5, y2: 12 }] },
                                ]
                              },
                              {
                                columns: [
                                  { text: '1a consulta IgM', style: 'left7', width: '55%', margin: [-4, 0, -1, 0] },
                                  { stack: this.cuadroCanvasColor(this.datos.paciente.primerCons_igmMenos), alignment: 'center', width: '15%' },
                                  { stack: this.cuadroCanvasColor(this.datos.paciente.primerCons_igmMas), alignment: 'center', width: '15%' },
                                  { stack: this.cuadroCanvasColor(this.datos.paciente.primerCons_igmNo), alignment: 'center', width: '15%' },
                                ]
                              },
                            ]
                          }
                        ]
                      ]
                    },
                    width: '36%'
                  },
                ]
              },
              {
                columns: [
                  {
                    table: {
                      widths: ['100%'],
                      body: [
                        [
                          { image: this.writeRotatedText2(1, 'CHAGAS'), fit: [25, 120], margin: [-9, -75, 0, 0], border: [true, true, false, false] },
                        ]
                      ]
                    },
                    width: '4%'
                  },
                  {
                    table: {
                      widths: ['100%'],
                      body: [
                        [
                          {
                            border: [false, false, true, false],
                            stack: [
                              {
                                columns: [
                                  { text: '--', style: 'left7', width: '65%' },
                                  { stack: this.cuadroCanvas(this.datos.paciente.chagasMenos), alignment: 'center', width: '30%' }
                                ]
                              },
                              {
                                columns: [
                                  { text: '+', style: 'left7', width: '65%' },
                                  { stack: this.cuadroCanvasColor(this.datos.paciente.chagasMas), alignment: 'center', width: '30%' }
                                ]
                              },
                              {
                                columns: [
                                  { text: 'no se hizo', style: 'left7', width: '65%', margin: [-5, 0, 0, 5] },
                                  { stack: this.cuadroCanvasColor(this.datos.paciente.chagasNo), alignment: 'center', width: '30%' }
                                ]
                              },
                            ]
                          }
                        ]
                      ]
                    },
                    width: '13%'
                  },
                  {
                    table: {
                      widths: ['100%'],
                      body: [
                        [
                          {
                            border: [false, false, true, false],
                            stack: [
                              { text: 'PALUDISMO MALARIA', style: 'center7', margin: [-4, -3, -3, 0] },
                              {
                                columns: [
                                  { stack: this.cuadroCanvas(this.datos.paciente.malariaMenos), alignment: 'center' },
                                  { stack: this.cuadroCanvasColor(this.datos.paciente.malariaMas), alignment: 'center' },
                                ]
                              },
                              {
                                columns: [
                                  { text: '--', style: 'center7' },
                                  { text: '+', style: 'center7' },
                                ]
                              },
                              { stack: this.cuadroCanvasColor(this.datos.paciente.malariaNo), alignment: 'center', margin: [0, -6, 0, -2] },
                              { text: 'no se hizo', style: 'center7', margin: [-4, 0, -3, 0] }
                            ]
                          },
                        ]
                      ]
                    },
                    width: '16%'
                  },
                  {
                    table: {
                      widths: ['100%'],
                      body: [
                        [
                          {
                            border: [false, false, true, false],
                            stack: [
                              { text: 'BACTERIURIA', style: 'left7' },
                              {
                                marginTop: 2,
                                columns: [
                                  { text: 'sem', style: 'left7', width: '15%', margin: [-3, 0, 0, 0] },
                                  { text: 'normal', style: 'center7', width: '30%' },
                                  { text: 'anormal', style: 'center7', width: '35%' },
                                  { text: 'no se hizo', style: 'center7', width: '20%', margin: [0, -5, -3, 0] },
                                ]
                              },
                              {
                                columns: [
                                  { text: '<20', style: 'left7', width: '15%', margin: [-3, 0, 0, 0] },
                                  { stack: this.cuadroCanvas(this.datos.paciente.bacteMen20SemN), alignment: 'center', width: '30%' },
                                  { stack: this.cuadroCanvasColor(this.datos.paciente.bacteMen20SemA), alignment: 'center', width: '35%' },
                                  { stack: this.cuadroCanvasColor(this.datos.paciente.bacteMen20SemO), alignment: 'center', width: '20%' },
                                ]
                              },
                              {
                                columns: [
                                  { text: '>=20', style: 'left7', width: '15%', margin: [-3, 0, -5, 0] },
                                  { stack: this.cuadroCanvas(this.datos.paciente.bacteMay20SemN), alignment: 'center', width: '30%' },
                                  { stack: this.cuadroCanvasColor(this.datos.paciente.bacteMay20SemA), alignment: 'center', width: '35%' },
                                  { stack: this.cuadroCanvasColor(this.datos.paciente.bacteMay20SemO), alignment: 'center', width: '20%' },
                                ]
                              },
                            ]
                          }
                        ]
                      ]
                    },
                    width: '35%'
                  },
                  {
                    table: {
                      widths: ['100%'],
                      body: [
                        [
                          {
                            border: [false, false, true, false],
                            stack: [
                              { text: 'GLICEMIA EN AYUNAS', style: 'left7' },
                              {
                                columns: [
                                  { text: '<20 sem', style: 'left7', margin: [-3, 0, 5, 0] },
                                  {
                                    margin: [-8, 0, 8, 0],
                                    table: {
                                      widths: ['33%', '33%', '34%'],
                                      body: [
                                        [
                                          { text: this.datos.paciente.gluceMen20Sem.slice(0, 1), style: 'center7' },
                                          { text: this.datos.paciente.gluceMen20Sem.slice(1, 2), style: 'center7' },
                                          { text: this.datos.paciente.gluceMen20Sem.slice(2, 3), style: 'center7' },
                                        ]
                                      ]
                                    }
                                  },
                                  { stack: this.cuadroCanvasColor(this.datos.paciente.gluceMen20Sem1), alignment: 'center', margin: [-15, 0, 0, 0] },
                                ]
                              },
                              {
                                columns: [
                                  { text: '>= 30 sem', style: 'left7', margin: [-3, 0, 5, 0] },
                                  {
                                    margin: [-8, 0, 8, 0],
                                    table: {
                                      widths: ['33%', '33%', '34%'],
                                      body: [
                                        [
                                          { text: this.datos.paciente.gluceMay30Sem.slice(0, 1), style: 'center7' },
                                          { text: this.datos.paciente.gluceMay30Sem.slice(1, 2), style: 'center7' },
                                          { text: this.datos.paciente.gluceMay30Sem.slice(2, 3), style: 'center7' },
                                        ]
                                      ]
                                    }
                                  },
                                  {
                                    stack: [
                                      { text: '>=105mg/dl', style: 'left6', margin: [-5, -5, -10, 0] },
                                      { stack: this.cuadroCanvasColor(this.datos.paciente.gluceMay30Sem1), alignment: 'center', margin: [-15, 0, 0, 0] },
                                    ]
                                  }
                                ]
                              },
                            ]
                          }
                        ]
                      ]
                    },
                    width: '32%'
                  }
                ]
              },
            ]
          },
          {
            width: '8%',
            stack: [
              {
                table: {
                  widths: ['100%'],
                  body: [
                    [
                      {
                        border: [true, true, true, false],
                        stack: [
                          { text: 'VIH', style: 'left7Bold', margin: [0, -4, 0, 0] },
                          { text: '< 20 sem', style: 'center7', margin: [0, -4, 0, 0] },
                          {
                            margin: [0, -2, 0, 0],
                            columns: [
                              { text: ' ', style: 'left7', width: '55%' },
                              { text: 'no', style: 'left7', width: '30%' },
                              { text: 'si', style: 'left7', width: '25%' },
                            ]
                          },
                          {
                            columns: [
                              { text: 'solicitado', style: 'left7', width: '45%' },
                              { stack: this.cuadroCanvasColor(this.datos.paciente.vihsMen20SemNo), alignment: 'center', width: '27%' },
                              { stack: this.cuadroCanvas(this.datos.paciente.vihsMen20SemSi), alignment: 'center', width: '28%', margin: [0, 0, -5, 0] },
                            ]
                          },
                          {
                            marginTop: 3,
                            columns: [
                              { text: 'realizado', style: 'left7', width: '45%' },
                              { stack: this.cuadroCanvasColor(this.datos.paciente.vihrMen20SemNo), alignment: 'center', width: '27%' },
                              { stack: this.cuadroCanvas(this.datos.paciente.vihrMen20SemSi), alignment: 'center', width: '28%', margin: [0, 0, -5, 0] },
                            ]
                          },
                          { text: '>=20 sem', style: 'center7' },
                          {
                            marginTop: 5,
                            columns: [
                              { text: 'solicitado', style: 'left7', width: '45%' },
                              { stack: this.cuadroCanvasColor(this.datos.paciente.vihsMay20SemNo), alignment: 'center', width: '27%' },
                              { stack: this.cuadroCanvas(this.datos.paciente.vihsMay20SemSi), alignment: 'center', width: '28%', margin: [0, 0, -5, 0] },
                            ]
                          },
                          {
                            marginTop: 2,
                            columns: [
                              { text: 'realizado', style: 'left7', width: '45%' },
                              { stack: this.cuadroCanvasColor(this.datos.paciente.vihrMay20SemNo), alignment: 'center', width: '27%' },
                              { stack: this.cuadroCanvas(this.datos.paciente.vihrMay20SemSi), alignment: 'center', width: '28%', margin: [0, 0, -5, 0] },
                            ]
                          },
                        ]
                      }
                    ]
                  ]
                }
              },
            ]
          },
          {
            width: '23%',
            stack: [
              {
                table: {
                  widths: ['33%', '33%', '34%'],
                  body: [
                    [
                      {
                        border: [true, true, true, false],
                        stack: [
                          { text: 'Hb < 20sem', style: 'left7', margin: [-3, 0, -3, 0] },
                          {
                            marginTop: 5,
                            columns: [
                              {
                                margin: [-3, 0, -3, 0],
                                width: '90%',
                                table: {
                                  widths: ['30%', '30%', '10%', '30%'],
                                  body: [
                                    [
                                      { text: this.datos.paciente.hbSem1.slice(0, 1), style: 'left7', margin: [-2, 0, 0, 0] },
                                      { text: this.datos.paciente.hbSem1.slice(1, 2), style: 'left7', margin: [-2, 0, 0, 0] },
                                      { text: ',', style: 'left7', border: [false] },
                                      { text: this.datos.paciente.hbSem1.slice(3, 4), style: 'left7', margin: [-2, 0, 0, 0] },
                                    ]
                                  ]
                                }
                              },
                              { text: 'g', style: 'right7', width: '10%', margin: [0, 4, -4, 0] }
                            ]
                          },
                          {
                            marginTop: 5,
                            columns: [
                              { text: '<11.0g/dl', style: 'left7', width: '90%', margin: [-3, 0, 0, 0] },
                              { stack: this.cuadroCanvasColor(this.datos.paciente.hbSem1Men11), alignment: 'center', width: '10%' },
                            ]
                          }
                        ]
                      },
                      {
                        border: [true, true, true, false],
                        stack: [
                          { text: 'Fe/FOLATOS indicados', style: 'center7', margin: [-3, 0, -4, 0] },
                          {
                            columns: [
                              { text: 'Fe', style: 'left7', width: '50%' },
                              { text: 'Folatos', style: 'left7', width: '50%', margin: [-3, 0, -4, 0] },
                            ]
                          },
                          {
                            marginTop: 4,
                            columns: [
                              { text: 'no', style: 'left7', width: '30%', margin: [-3, 0, 0, 0] },
                              { stack: this.cuadroCanvas(this.datos.paciente.feNo), alignment: 'center', width: '10%' },
                              { text: 'no', style: 'center7', width: '50%' },
                              { stack: this.cuadroCanvas(this.datos.paciente.folatosNo), alignment: 'center', width: '10%' },
                            ]
                          },
                          {
                            marginTop: 5,
                            columns: [
                              { text: 'si', style: 'left7', width: '30%', margin: [-3, 0, 0, 0] },
                              { stack: this.cuadroCanvasColor(this.datos.paciente.feSi), alignment: 'center', width: '10%' },
                              { text: 'si', style: 'center7', width: '50%' },
                              { stack: this.cuadroCanvasColor(this.datos.paciente.folatosSi), alignment: 'center', width: '10%' },
                            ]
                          },
                        ]
                      },
                      {
                        border: [true, true, true, false],
                        stack: [
                          { text: 'Hb >=20sem', style: 'left7', margin: [-3, 0, -3, 0] },
                          {
                            marginTop: 5,
                            columns: [
                              {
                                margin: [-3, 0, -3, 0],
                                width: '90%',
                                table: {
                                  widths: ['30%', '30%', '10%', '30%'],
                                  body: [
                                    [
                                      { text: this.datos.paciente.hbSem2.slice(0, 1), style: 'left7', margin: [-2, 0, 0, 0] },
                                      { text: this.datos.paciente.hbSem2.slice(1, 2), style: 'left7', margin: [-2, 0, 0, 0] },
                                      { text: ',', style: 'left7', border: [false] },
                                      { text: this.datos.paciente.hbSem2.slice(3, 4), style: 'left7', margin: [-2, 0, 0, 0] },
                                    ]
                                  ]
                                }
                              },
                              { text: 'g', style: 'right7', width: '10%', margin: [0, 4, -4, 0] }
                            ]
                          },
                          {
                            marginTop: 5,
                            columns: [
                              { text: '<11.0g/dl', style: 'left7', width: '90%', margin: [-3, 0, 0, 0] },
                              { stack: this.cuadroCanvasColor(this.datos.paciente.hbSem2Men11), alignment: 'center', width: '10%' },
                            ]
                          }
                        ]
                      },
                    ]
                  ]
                }
              },
              {
                table: {
                  widths: ['40%', '30%', '30%'],
                  body: [
                    [
                      {
                        border: [true, true, true, false],
                        stack: [
                          { text: 'ESTREPTO-COCO B', style: 'center7', margin: [-4, -3, -3, 0] },
                          { text: '35-37 semanas', style: 'center7', margin: [-4, -3, -3, 0] },
                          {
                            margin: [0, -2, 0, 0],
                            columns: [
                              { stack: this.cuadroCanvas(this.datos.paciente.estreptoMenos), alignment: 'center' },
                              { stack: this.cuadroCanvasColor(this.datos.paciente.estreptoMas), alignment: 'center' },
                              { stack: this.cuadroCanvasColor(this.datos.paciente.estreptoNo), alignment: 'center' },
                            ]
                          },
                          {
                            columns: [
                              { text: '--', style: 'center7' },
                              { text: '+', style: 'center7' },
                              { text: 'no se hizo', style: 'center6', margin: [-4, -2, -3, 0] },
                            ]
                          }
                        ]
                      },
                      {
                        border: [true, true, true, false],
                        stack: [
                          { text: 'PREPARACION PARA EL PARTO', style: 'center7', margin: [-4, -2, -3, 0] },
                          {
                            marginTop: 5,
                            columns: [
                              { text: 'no', style: 'left7', width: '30%', margin: [-3, 0, 0, 0] },
                              { stack: this.cuadroCanvasColor(this.datos.paciente.prePartNo), alignment: 'center', width: '10%' },
                              { text: 'si', style: 'center7', width: '50%' },
                              { stack: this.cuadroCanvas(this.datos.paciente.prePartSi), alignment: 'center', width: '10%' },
                            ]
                          }
                        ]
                      },
                      {
                        border: [true, true, true, false],
                        stack: [
                          { text: 'CONSEJERIA LACTANCIA MATERNA', style: 'center7', margin: [-5, -2, -4, 0] },
                          {
                            marginTop: 5,
                            columns: [
                              { text: 'no', style: 'left7', width: '30%', margin: [-3, 0, 0, 0] },
                              { stack: this.cuadroCanvasColor(this.datos.paciente.consejLactMatNo), alignment: 'center', width: '10%' },
                              { text: 'si', style: 'center7', width: '50%' },
                              { stack: this.cuadroCanvas(this.datos.paciente.consejLactMatSi), alignment: 'center', width: '10%' },
                            ]
                          }
                        ]
                      },
                    ]
                  ]
                }
              },
            ]
          },
          {
            width: '25%',
            stack: [
              {
                table: {
                  widths: ['100%'],
                  body: [
                    [
                      { text: 'SIFILIS - Diagnostico y Tratamiento', style: 'center7', border: [true, true, true, false], margin: [0, -2, 0, -3] },
                    ]
                  ]
                }
              },
              {
                table: {
                  widths: ['60%', '30%', '10%'],
                  body: [
                    [
                      {
                        border: [true, true, true, false],
                        stack: [
                          { text: 'Prueba', style: 'center7Bold', margin: [0, -3, 0, 0] },
                          {
                            columns: [
                              { text: 'no trepone mica', style: 'left6', width: '50%', margin: [-2, -4, 0, 0] },
                              { text: 'treponemica', style: 'center6', width: '50%', margin: [0, -2, -4, 0] },
                            ]
                          },
                          {
                            columns: [
                              {
                                width: '40%',
                                margin: [-4, -2, 0, 0],
                                columns: [
                                  { text: '--', style: 'center7' },
                                  { text: '+', style: 'center7' },
                                  { text: 's/d', style: 'center7' },
                                ]
                              },
                              {
                                width: '60%',
                                columns: [
                                  { text: '--', style: 'center7', margin: [0, 0, -10, 0] },
                                  { text: '+', style: 'center7' },
                                  { text: 's/d', style: 'center7' },
                                  { text: 'n/c', style: 'center7', margin: [0, 0, -4, 0] },
                                ]
                              }
                            ]
                          },
                          {
                            columns: [
                              {
                                width: '50%',
                                margin: [-2, 0, 0, 0],
                                columns: [
                                  { stack: this.cuadroCanvas(this.datos.paciente.notrep_men20semMenos), alignment: 'center', width: '27%' },
                                  { stack: this.cuadroCanvasColor(this.datos.paciente.notrep_men20semMas), alignment: 'center', width: '27%' },
                                  { stack: this.cuadroCanvasColor(this.datos.paciente.notrep_men20semO), alignment: 'center', width: '27%' },
                                ]
                              },
                              {
                                width: '60%',
                                columns: [
                                  { stack: this.cuadroCanvas(this.datos.paciente.trep_men20semMenos), alignment: 'center', margin: [-4, 0, 0, 0] },
                                  { stack: this.cuadroCanvasColor(this.datos.paciente.trep_men20semMas), alignment: 'center', margin: [-4, 0, 0, 0] },
                                  { stack: this.cuadroCanvasColor(this.datos.paciente.trep_men20semO), alignment: 'center', margin: [-4, 0, 0, 0] },
                                  { stack: this.cuadroCanvas(this.datos.paciente.trep_men20sem1), alignment: 'center', margin: [-4, 0, 0, 0] },
                                ]
                              }
                            ]
                          },
                          {
                            marginTop: 1,
                            columns: [
                              {
                                width: '50%',
                                margin: [-5, 0, 0, 0],
                                columns: [
                                  { text: '<20sem', style: 'center7', width: '40%' },
                                  {
                                    width: '40%',
                                    table: {
                                      widths: ['50%', '50%'],
                                      body: [
                                        [
                                          { text: this.datos.paciente.semNotrepMen20.slice(0, 1), style: 'center7' },
                                          { text: this.datos.paciente.semNotrepMen20.slice(1, 2), style: 'center7' },
                                        ]
                                      ]
                                    }
                                  }
                                ]
                              },
                              {
                                width: '60%',
                                table: {
                                  widths: ['20%', '30%', '30%', '20%'],
                                  body: [
                                    [
                                      { text: ' ', style: 'center7', border: [false] },
                                      { text: this.datos.paciente.semTrepMen20.slice(0, 1), style: 'center7' },
                                      { text: this.datos.paciente.semTrepMen20.slice(1, 2), style: 'center7' },
                                      { text: ' ', style: 'center7', border: [false] },
                                    ]
                                  ]
                                }
                              },
                            ]
                          },
                          {
                            marginTop: 1,
                            columns: [
                              {
                                width: '50%',
                                margin: [-5, 0, 0, 0],
                                columns: [
                                  { text: '>=20sem', style: 'center7', width: '40%', margin: [-1, 0, -3, 0], },
                                  {
                                    width: '40%',
                                    table: {
                                      widths: ['50%', '50%'],
                                      body: [
                                        [
                                          { text: this.datos.paciente.semNotrepMay20.slice(0, 1), style: 'center7' },
                                          { text: this.datos.paciente.semNotrepMay20.slice(1, 2), style: 'center7' },
                                        ]
                                      ]
                                    }
                                  }
                                ]
                              },
                              {
                                width: '60%',
                                table: {
                                  widths: ['20%', '30%', '30%', '20%'],
                                  body: [
                                    [
                                      { text: ' ', style: 'center7', border: [false] },
                                      { text: this.datos.paciente.semTrepMay20.slice(0, 1), style: 'center7' },
                                      { text: this.datos.paciente.semTrepMay20.slice(1, 2), style: 'center7' },
                                      { text: ' ', style: 'center7', border: [false] },
                                    ]
                                  ]
                                }
                              },
                            ]
                          },
                          {
                            margin: [0, -3, 0, 0],
                            columns: [
                              {
                                width: '40%',
                                margin: [-4, 0, 0, 0],
                                columns: [
                                  { text: '--', style: 'center7' },
                                  { text: '+', style: 'center7' },
                                  { text: 's/d', style: 'center7' },
                                ]
                              },
                              {
                                width: '60%',
                                columns: [
                                  { text: '--', style: 'center7', margin: [0, 0, -10, 0] },
                                  { text: '+', style: 'center7' },
                                  { text: 's/d', style: 'center7' },
                                  { text: 'n/c', style: 'center7', margin: [0, 0, -4, 0] },
                                ]
                              },
                            ]
                          },
                          {
                            columns: [
                              {
                                width: '50%',
                                margin: [-2, 0, 0, 0],
                                columns: [
                                  { stack: this.cuadroCanvas(this.datos.paciente.notrep_may20semMenos), alignment: 'center', width: '27%' },
                                  { stack: this.cuadroCanvasColor(this.datos.paciente.notrep_may20semMas), alignment: 'center', width: '27%' },
                                  { stack: this.cuadroCanvasColor(this.datos.paciente.notrep_may20semO), alignment: 'center', width: '27%' },
                                ]
                              },
                              {
                                width: '60%',
                                columns: [
                                  { stack: this.cuadroCanvas(this.datos.paciente.trep_may20semMenos), alignment: 'center', margin: [-4, 0, 0, 0] },
                                  { stack: this.cuadroCanvasColor(this.datos.paciente.trep_may20semMas), alignment: 'center', margin: [-4, 0, 0, 0] },
                                  { stack: this.cuadroCanvasColor(this.datos.paciente.trep_may20semO), alignment: 'center', margin: [-4, 0, 0, 0] },
                                  { stack: this.cuadroCanvas(this.datos.paciente.trep_may20sem1), alignment: 'center', margin: [-4, 0, 0, 0] },
                                ]
                              }
                            ]
                          },
                          { canvas: [{ type: 'line', x1: 33, y1: -83, x2: 33, y2: 9 }], margin: [0, 0, 0, -5] },
                        ]
                      },
                      {
                        border: [true, true, true, false],
                        stack: [
                          { text: 'Tratamiento', style: 'center7Bold', margin: [-4, -4, -3, 0] },
                          {
                            marginTop: 10,
                            columns: [
                              { text: 'no', style: 'center7' },
                              { text: 'si', style: 'center7' },
                              { text: 's/d', style: 'center7', margin: [-2, 0, -2, 0] },
                              { text: 'n/c', style: 'center7', margin: [0, 0, -5, 0] },
                            ]
                          },
                          {
                            margin: [-3, 0, -3, 0],
                            columns: [
                              { stack: this.cuadroCanvasColor(this.datos.paciente.tratMen20SemNo), alignment: 'center' },
                              { stack: this.cuadroCanvas(this.datos.paciente.tratMen20SemSi), alignment: 'center' },
                              { stack: this.cuadroCanvasColor(this.datos.paciente.tratMen20SemO), alignment: 'center' },
                              { stack: this.cuadroCanvas(this.datos.paciente.tratMen20Sem1), alignment: 'center' },
                            ]
                          },
                          {
                            table: {
                              widths: ['15%', '35%', '35%', '15%'],
                              body: [
                                [
                                  { text: ' ', style: 'center7', border: [false] },
                                  { text: this.datos.paciente.semTratMen20.slice(0, 1), style: 'center7' },
                                  { text: this.datos.paciente.semTratMen20.slice(1, 2), style: 'center7' },
                                  { text: ' ', style: 'center7', border: [false] },
                                ]
                              ]
                            }
                          },
                          {
                            marginTop: 3,
                            table: {
                              widths: ['15%', '35%', '35%', '15%'],
                              body: [
                                [
                                  { text: ' ', style: 'center7', border: [false] },
                                  { text: this.datos.paciente.semTratMay20.slice(0, 1), style: 'center7' },
                                  { text: this.datos.paciente.semTratMay20.slice(1, 2), style: 'center7' },
                                  { text: ' ', style: 'center7', border: [false] },
                                ]
                              ]
                            }
                          },
                          {
                            columns: [
                              { text: 'no', style: 'center7' },
                              { text: 'si', style: 'center7' },
                              { text: 's/d', style: 'center7', margin: [-2, 0, -2, 0] },
                              { text: 'n/c', style: 'center7', margin: [0, 0, -5, 0] },
                            ]
                          },
                          {
                            margin: [-3, 0, -3, 0],
                            columns: [
                              { stack: this.cuadroCanvasColor(this.datos.paciente.tratMay20SemNo), alignment: 'center' },
                              { stack: this.cuadroCanvas(this.datos.paciente.tratMay20SemSi), alignment: 'center' },
                              { stack: this.cuadroCanvasColor(this.datos.paciente.tratMay20SemO), alignment: 'center' },
                              { stack: this.cuadroCanvas(this.datos.paciente.tratMay20Sem1), alignment: 'center' },
                            ]
                          },
                        ]
                      },
                      {
                        border: [true, true, true, false],
                        stack: [
                          { text: 'Tto de pareja', style: 'center7', margin: [-4, -4, -4, 0] },
                          {
                            columns: [
                              { stack: this.cuadroCanvasColor(this.datos.paciente.TtoParejMen20SemNo), alignment: 'center', margin: [-5, 0, 0, 0], width: '50%' },
                              { stack: this.cuadroCanvas(this.datos.paciente.TtoParejMen20SemSi), alignment: 'center', margin: [0, 0, -5, 0], width: '50%' }
                            ]
                          },
                          {
                            columns: [
                              { text: 'no', style: 'center7', margin: [-2, 0, 0, 0] },
                              { text: 'si', style: 'center7', margin: [0, 0, -4, 0] },
                            ]
                          },
                          {
                            columns: [
                              { stack: this.cuadroCanvasColor(this.datos.paciente.TtoParejMen20SemO), alignment: 'center', margin: [-5, 0, 0, 0], width: '50%' },
                              { stack: this.cuadroCanvas(this.datos.paciente.TtoParejMen20Sem1), alignment: 'center', margin: [0, 0, -5, 0], width: '50%' }
                            ]
                          },
                          {
                            columns: [
                              { text: 's/d', style: 'center7', margin: [-5, 0, 0, 0] },
                              { text: 'n/c', style: 'center7', margin: [0, 0, -5, 0] },
                            ]
                          },
                          {
                            columns: [
                              { stack: this.cuadroCanvasColor(this.datos.paciente.TtoParejMay20SemNo), alignment: 'center', margin: [-5, 0, 0, 0], width: '50%' },
                              { stack: this.cuadroCanvas(this.datos.paciente.TtoParejMay20SemSi), alignment: 'center', margin: [0, 0, -5, 0], width: '50%' }
                            ]
                          },
                          {
                            columns: [
                              { text: 'no', style: 'center7', margin: [-2, 0, 0, 0] },
                              { text: 'si', style: 'center7', margin: [0, 0, -4, 0] },
                            ]
                          },
                          {
                            columns: [
                              { stack: this.cuadroCanvasColor(this.datos.paciente.TtoParejMay20SemO), alignment: 'center', margin: [-5, 0, 0, 0], width: '50%' },
                              { stack: this.cuadroCanvas(this.datos.paciente.TtoParejMay20Sem1), alignment: 'center', margin: [0, 0, -5, 0], width: '50%' }
                            ]
                          },
                          {
                            columns: [
                              { text: 's/d', style: 'center7', margin: [-5, 0, 0, 0] },
                              { text: 'n/c', style: 'center7', margin: [0, 0, -5, 0] },
                            ]
                          },
                        ]
                      }
                    ]
                  ]
                }
              },
            ]
          }
        ]
      },
      {
        margin: [0, -5, 0, 0],
        columns: [
          {
            width: '2%',
            stack: [
              {
                table: {
                  widths: ['100%'],
                  body: [
                    [
                      { image: this.writeRotatedText2(1, 'ANTENATALES'), fit: [20, 90], margin: [-6, -33, 0, 6], border: [true, true, false, false] },
                    ],
                  ]
                },
              },
              {
                table: {
                  widths: ['100%'],
                  body: [
                    [
                      { image: this.writeRotatedText2(1, 'CONSULTAS'), fit: [20, 90], margin: [-6, -48, 0, 3], border: [true, false, false, true] },
                    ],
                  ]
                },
              },
            ]
          },
          {
            table: {
              widths: ['2%', '2%', '4%', '3%', '5%', '5%', '4%', '5%', '3%', '4%', '4%', '47%', '4%', '2%', '2%', '4%'],
              body: [
                [
                  { text: 'dia', style: 'center7', margin: [-3, -2, -3, -2] },
                  { text: 'mes', style: 'center7', margin: [-3, -2, -3, -2] },
                  { text: 'año', style: 'center7', margin: [-3, -2, -3, -2] },
                  { text: 'edad gest', style: 'center7', margin: [-3, -2, -3, -2] },
                  { text: 'peso', style: 'center7', margin: [-3, -2, -3, -2] },
                  { text: 'PA', style: 'center7', margin: [-3, -2, -3, -2] },
                  { text: 'Altura uterina', style: 'center7', margin: [-3, -2, -3, -2] },
                  { text: 'presentacion', style: 'center7', margin: [-3, -2, -3, -2] },
                  { text: 'FCF (lpm)', style: 'center7', margin: [-3, -2, -3, -2] },
                  { text: 'movim. fetales', style: 'center7', margin: [-3, -2, -3, -2] },
                  { text: 'proteinuria', style: 'center7', margin: [-3, -2, -3, -2] },
                  { text: 'Signos de alarma, examenes, tratamientos', style: 'center7', margin: [-3, -2, -3, -2] },
                  { text: 'iniciales' + '\n' + 'Tecnico', style: 'center7', margin: [-5, -2, -5, -2] },
                  { text: 'proxima cita', style: 'center7', colSpan: 3, margin: [-3, -2, -3, -2] },
                  {},
                  {},
                ],
                [
                  {
                    stack: [
                      { text: this.datos.paciente.tablaConsultAntent[0].fecha_gest_ctl.dia.slice(0, 1) + '  ' + this.datos.paciente.tablaConsultAntent[0].fecha_gest_ctl.dia.slice(1, 2), style: 'center7', margin: [-3, -2, -3, -2] },
                      { canvas: [{ type: 'line', x1: 5, y1: 2, x2: 5, y2: -3 }], margin: [0, 0, 0, -5] },
                    ]
                  },
                  {
                    stack: [
                      { text: this.datos.paciente.tablaConsultAntent[0].fecha_gest_ctl.mes.slice(0, 1) + '  ' + this.datos.paciente.tablaConsultAntent[0].fecha_gest_ctl.mes.slice(1, 2), style: 'center7', margin: [-3, -2, -3, -2] },
                      { canvas: [{ type: 'line', x1: 5, y1: 2, x2: 5, y2: -3 }], margin: [0, 0, 0, -5] },
                    ]
                  },
                  {
                    stack: [
                      { text: this.datos.paciente.tablaConsultAntent[0].fecha_gest_ctl.año.slice(0, 2) + '  ' + this.datos.paciente.tablaConsultAntent[0].fecha_gest_ctl.año.slice(2, 4), style: 'center7', margin: [-3, -2, -3, -2] },
                      { canvas: [{ type: 'line', x1: 9, y1: 2, x2: 9, y2: -3 }], margin: [0, 0, 0, -5] },
                    ]
                  },
                  { text: this.datos.paciente.tablaConsultAntent[0].edad_gest_ctl, style: 'center7', margin: [-3, -2, -3, -2] },
                  {
                    stack: [
                      { text: this.datos.paciente.tablaConsultAntent[0].peso_ctl.slice(0, 1) + '  ' + this.datos.paciente.tablaConsultAntent[0].peso_ctl.slice(1, 2) + '  ' + this.datos.paciente.tablaConsultAntent[0].peso_ctl.slice(2, 3), style: 'left7', margin: [-1, -2, -3, -2] },
                      { canvas: [{ type: 'line', x1: 5, y1: 2, x2: 5, y2: -5 }], margin: [0, 0, 0, -5] },
                      { canvas: [{ type: 'line', x1: 12, y1: 5, x2: 12, y2: -2 }], margin: [0, 0, 0, -5] },
                    ]
                  },
                  { text: this.datos.paciente.tablaConsultAntent[0].pa_ctl, style: 'center7', margin: [-3, -2, -3, -2] },
                  { text: this.datos.paciente.tablaConsultAntent[0].alt_uteri_ctl, style: 'center7', margin: [-3, -2, -3, -2] },
                  { text: this.datos.paciente.tablaConsultAntent[0].present_ctl, style: 'center7', margin: [-3, -2, -3, -2] },
                  { text: this.datos.paciente.tablaConsultAntent[0].latil_fetal_ctl, style: 'center7', margin: [-3, -2, -3, -2] },
                  { text: this.datos.paciente.tablaConsultAntent[0].mov_fetal_ctl, style: 'center7', margin: [-3, -2, -3, -2] },
                  { text: this.datos.paciente.tablaConsultAntent[0].prote_ctl, style: 'center7', margin: [-3, -2, -3, -2] },
                  { text: this.datos.paciente.tablaConsultAntent[0].sign_alarm_ctl, style: 'left7', margin: [-3, -2, -3, -2] },
                  { text: this.datos.paciente.tablaConsultAntent[0].tecn_ctl, style: 'center7', margin: [-3, -2, -3, -2] },
                  {
                    stack: [
                      { text: this.datos.paciente.tablaConsultAntent[0].fecha_prox_cita_ctl.dia.slice(0, 1) + '  ' + this.datos.paciente.tablaConsultAntent[0].fecha_prox_cita_ctl.dia.slice(1, 2), style: 'center7', margin: [-3, -2, -3, -2] },
                      { canvas: [{ type: 'line', x1: 5, y1: 2, x2: 5, y2: -3 }], margin: [0, 0, 0, -5] },
                    ]
                  },
                  {
                    stack: [
                      { text: this.datos.paciente.tablaConsultAntent[0].fecha_prox_cita_ctl.mes.slice(0, 1) + '  ' + this.datos.paciente.tablaConsultAntent[0].fecha_prox_cita_ctl.mes.slice(1, 2), style: 'center7', margin: [-3, -2, -3, -2] },
                      { canvas: [{ type: 'line', x1: 5, y1: 2, x2: 5, y2: -3 }], margin: [0, 0, 0, -5] },
                    ]
                  },
                  {
                    stack: [
                      { text: this.datos.paciente.tablaConsultAntent[0].fecha_prox_cita_ctl.año.slice(0, 2) + '  ' + this.datos.paciente.tablaConsultAntent[0].fecha_prox_cita_ctl.año.slice(2, 4), style: 'center7', margin: [-3, -2, -3, -2] },
                      { canvas: [{ type: 'line', x1: 9, y1: 2, x2: 9, y2: -3 }], margin: [0, 0, 0, -5] },
                    ]
                  },
                ],
                [
                  {
                    stack: [
                      { text: this.datos.paciente.tablaConsultAntent[1].fecha_gest_ctl.dia.slice(0, 1) + '  ' + this.datos.paciente.tablaConsultAntent[1].fecha_gest_ctl.dia.slice(1, 2), style: 'center7', margin: [-3, -2, -3, -2] },
                      { canvas: [{ type: 'line', x1: 5, y1: 2, x2: 5, y2: -3 }], margin: [0, 0, 0, -5] },
                    ]
                  },
                  {
                    stack: [
                      { text: this.datos.paciente.tablaConsultAntent[1].fecha_gest_ctl.mes.slice(0, 1) + '  ' + this.datos.paciente.tablaConsultAntent[1].fecha_gest_ctl.mes.slice(1, 2), style: 'center7', margin: [-3, -2, -3, -2] },
                      { canvas: [{ type: 'line', x1: 5, y1: 2, x2: 5, y2: -3 }], margin: [0, 0, 0, -5] },
                    ]
                  },
                  {
                    stack: [
                      { text: this.datos.paciente.tablaConsultAntent[1].fecha_gest_ctl.año.slice(0, 2) + '  ' + this.datos.paciente.tablaConsultAntent[1].fecha_gest_ctl.año.slice(2, 4), style: 'center7', margin: [-3, -2, -3, -2] },
                      { canvas: [{ type: 'line', x1: 9, y1: 2, x2: 9, y2: -3 }], margin: [0, 0, 0, -5] },
                    ]
                  },
                  { text: this.datos.paciente.tablaConsultAntent[1].edad_gest_ctl, style: 'center7', margin: [-3, -2, -3, -2] },
                  {
                    stack: [
                      { text: this.datos.paciente.tablaConsultAntent[1].peso_ctl.slice(0, 1) + '  ' + this.datos.paciente.tablaConsultAntent[1].peso_ctl.slice(1, 2) + '  ' + this.datos.paciente.tablaConsultAntent[1].peso_ctl.slice(2, 3), style: 'left7', margin: [-1, -2, -3, -2] },
                      { canvas: [{ type: 'line', x1: 5, y1: 2, x2: 5, y2: -5 }], margin: [0, 0, 0, -5] },
                      { canvas: [{ type: 'line', x1: 12, y1: 5, x2: 12, y2: -2 }], margin: [0, 0, 0, -5] },
                    ]
                  },
                  { text: this.datos.paciente.tablaConsultAntent[1].pa_ctl, style: 'center7', margin: [-3, -2, -3, -2] },
                  { text: this.datos.paciente.tablaConsultAntent[1].alt_uteri_ctl, style: 'center7', margin: [-3, -2, -3, -2] },
                  { text: this.datos.paciente.tablaConsultAntent[1].present_ctl, style: 'center7', margin: [-3, -2, -3, -2] },
                  { text: this.datos.paciente.tablaConsultAntent[1].latil_fetal_ctl, style: 'center7', margin: [-3, -2, -3, -2] },
                  { text: this.datos.paciente.tablaConsultAntent[1].mov_fetal_ctl, style: 'center7', margin: [-3, -2, -3, -2] },
                  { text: this.datos.paciente.tablaConsultAntent[1].prote_ctl, style: 'center7', margin: [-3, -2, -3, -2] },
                  { text: this.datos.paciente.tablaConsultAntent[1].sign_alarm_ctl, style: 'left7', margin: [-3, -2, -3, -2] },
                  { text: this.datos.paciente.tablaConsultAntent[1].tecn_ctl, style: 'center7', margin: [-3, -2, -3, -2] },
                  {
                    stack: [
                      { text: this.datos.paciente.tablaConsultAntent[1].fecha_prox_cita_ctl.dia.slice(0, 1) + '  ' + this.datos.paciente.tablaConsultAntent[1].fecha_prox_cita_ctl.dia.slice(1, 2), style: 'center7', margin: [-3, -2, -3, -2] },
                      { canvas: [{ type: 'line', x1: 5, y1: 2, x2: 5, y2: -3 }], margin: [0, 0, 0, -5] },
                    ]
                  },
                  {
                    stack: [
                      { text: this.datos.paciente.tablaConsultAntent[1].fecha_prox_cita_ctl.mes.slice(0, 1) + '  ' + this.datos.paciente.tablaConsultAntent[1].fecha_prox_cita_ctl.mes.slice(1, 2), style: 'center7', margin: [-3, -2, -3, -2] },
                      { canvas: [{ type: 'line', x1: 5, y1: 2, x2: 5, y2: -3 }], margin: [0, 0, 0, -5] },
                    ]
                  },
                  {
                    stack: [
                      { text: this.datos.paciente.tablaConsultAntent[1].fecha_prox_cita_ctl.año.slice(0, 2) + '  ' + this.datos.paciente.tablaConsultAntent[1].fecha_prox_cita_ctl.año.slice(2, 4), style: 'center7', margin: [-3, -2, -3, -2] },
                      { canvas: [{ type: 'line', x1: 9, y1: 2, x2: 9, y2: -3 }], margin: [0, 0, 0, -5] },
                    ]
                  },
                ],
                [
                  {
                    stack: [
                      { text: this.datos.paciente.tablaConsultAntent[2].fecha_gest_ctl.dia.slice(0, 1) + '  ' + this.datos.paciente.tablaConsultAntent[2].fecha_gest_ctl.dia.slice(1, 2), style: 'center7', margin: [-3, -2, -3, -2] },
                      { canvas: [{ type: 'line', x1: 5, y1: 2, x2: 5, y2: -3 }], margin: [0, 0, 0, -5] },
                    ]
                  },
                  {
                    stack: [
                      { text: this.datos.paciente.tablaConsultAntent[2].fecha_gest_ctl.mes.slice(0, 1) + '  ' + this.datos.paciente.tablaConsultAntent[2].fecha_gest_ctl.mes.slice(1, 2), style: 'center7', margin: [-3, -2, -3, -2] },
                      { canvas: [{ type: 'line', x1: 5, y1: 2, x2: 5, y2: -3 }], margin: [0, 0, 0, -5] },
                    ]
                  },
                  {
                    stack: [
                      { text: this.datos.paciente.tablaConsultAntent[2].fecha_gest_ctl.año.slice(0, 2) + '  ' + this.datos.paciente.tablaConsultAntent[2].fecha_gest_ctl.año.slice(2, 4), style: 'center7', margin: [-3, -2, -3, -2] },
                      { canvas: [{ type: 'line', x1: 9, y1: 2, x2: 9, y2: -3 }], margin: [0, 0, 0, -5] },
                    ]
                  },
                  { text: this.datos.paciente.tablaConsultAntent[1].edad_gest_ctl, style: 'center7', margin: [-3, -2, -3, -2] },
                  {
                    stack: [
                      { text: this.datos.paciente.tablaConsultAntent[2].peso_ctl.slice(0, 1) + '  ' + this.datos.paciente.tablaConsultAntent[2].peso_ctl.slice(1, 2) + '  ' + this.datos.paciente.tablaConsultAntent[2].peso_ctl.slice(2, 3), style: 'left7', margin: [-1, -2, -3, -2] },
                      { canvas: [{ type: 'line', x1: 5, y1: 2, x2: 5, y2: -5 }], margin: [0, 0, 0, -5] },
                      { canvas: [{ type: 'line', x1: 12, y1: 5, x2: 12, y2: -2 }], margin: [0, 0, 0, -5] },
                    ]
                  },
                  { text: this.datos.paciente.tablaConsultAntent[2].pa_ctl, style: 'center7', margin: [-3, -2, -3, -2] },
                  { text: this.datos.paciente.tablaConsultAntent[2].alt_uteri_ctl, style: 'center7', margin: [-3, -2, -3, -2] },
                  { text: this.datos.paciente.tablaConsultAntent[2].present_ctl, style: 'center7', margin: [-3, -2, -3, -2] },
                  { text: this.datos.paciente.tablaConsultAntent[2].latil_fetal_ctl, style: 'center7', margin: [-3, -2, -3, -2] },
                  { text: this.datos.paciente.tablaConsultAntent[2].mov_fetal_ctl, style: 'center7', margin: [-3, -2, -3, -2] },
                  { text: this.datos.paciente.tablaConsultAntent[2].prote_ctl, style: 'center7', margin: [-3, -2, -3, -2] },
                  { text: this.datos.paciente.tablaConsultAntent[2].sign_alarm_ctl, style: 'left7', margin: [-3, -2, -3, -2] },
                  { text: this.datos.paciente.tablaConsultAntent[2].tecn_ctl, style: 'center7', margin: [-3, -2, -3, -2] },
                  {
                    stack: [
                      { text: this.datos.paciente.tablaConsultAntent[2].fecha_prox_cita_ctl.dia.slice(0, 1) + '  ' + this.datos.paciente.tablaConsultAntent[2].fecha_prox_cita_ctl.dia.slice(1, 2), style: 'center7', margin: [-3, -2, -3, -2] },
                      { canvas: [{ type: 'line', x1: 5, y1: 2, x2: 5, y2: -3 }], margin: [0, 0, 0, -5] },
                    ]
                  },
                  {
                    stack: [
                      { text: this.datos.paciente.tablaConsultAntent[2].fecha_prox_cita_ctl.mes.slice(0, 1) + '  ' + this.datos.paciente.tablaConsultAntent[2].fecha_prox_cita_ctl.mes.slice(1, 2), style: 'center7', margin: [-3, -2, -3, -2] },
                      { canvas: [{ type: 'line', x1: 5, y1: 2, x2: 5, y2: -3 }], margin: [0, 0, 0, -5] },
                    ]
                  },
                  {
                    stack: [
                      { text: this.datos.paciente.tablaConsultAntent[2].fecha_prox_cita_ctl.año.slice(0, 2) + '  ' + this.datos.paciente.tablaConsultAntent[2].fecha_prox_cita_ctl.año.slice(2, 4), style: 'center7', margin: [-3, -2, -3, -2] },
                      { canvas: [{ type: 'line', x1: 9, y1: 2, x2: 9, y2: -3 }], margin: [0, 0, 0, -5] },
                    ]
                  },
                ],
                [
                  {
                    stack: [
                      { text: this.datos.paciente.tablaConsultAntent[3].fecha_gest_ctl.dia.slice(0, 1) + '  ' + this.datos.paciente.tablaConsultAntent[3].fecha_gest_ctl.dia.slice(1, 2), style: 'center7', margin: [-3, -2, -3, -2] },
                      { canvas: [{ type: 'line', x1: 5, y1: 2, x2: 5, y2: -3 }], margin: [0, 0, 0, -5] },
                    ]
                  },
                  {
                    stack: [
                      { text: this.datos.paciente.tablaConsultAntent[3].fecha_gest_ctl.mes.slice(0, 1) + '  ' + this.datos.paciente.tablaConsultAntent[3].fecha_gest_ctl.mes.slice(1, 2), style: 'center7', margin: [-3, -2, -3, -2] },
                      { canvas: [{ type: 'line', x1: 5, y1: 2, x2: 5, y2: -3 }], margin: [0, 0, 0, -5] },
                    ]
                  },
                  {
                    stack: [
                      { text: this.datos.paciente.tablaConsultAntent[3].fecha_gest_ctl.año.slice(0, 2) + '  ' + this.datos.paciente.tablaConsultAntent[3].fecha_gest_ctl.año.slice(2, 4), style: 'center7', margin: [-3, -2, -3, -2] },
                      { canvas: [{ type: 'line', x1: 9, y1: 2, x2: 9, y2: -3 }], margin: [0, 0, 0, -5] },
                    ]
                  },
                  { text: this.datos.paciente.tablaConsultAntent[3].edad_gest_ctl, style: 'center7', margin: [-3, -2, -3, -2] },
                  {
                    stack: [
                      { text: this.datos.paciente.tablaConsultAntent[3].peso_ctl.slice(0, 1) + '  ' + this.datos.paciente.tablaConsultAntent[3].peso_ctl.slice(1, 2) + '  ' + this.datos.paciente.tablaConsultAntent[3].peso_ctl.slice(2, 3), style: 'left7', margin: [-1, -2, -3, -2] },
                      { canvas: [{ type: 'line', x1: 5, y1: 2, x2: 5, y2: -5 }], margin: [0, 0, 0, -5] },
                      { canvas: [{ type: 'line', x1: 12, y1: 5, x2: 12, y2: -2 }], margin: [0, 0, 0, -5] },
                    ]
                  },
                  { text: this.datos.paciente.tablaConsultAntent[3].pa_ctl, style: 'center7', margin: [-3, -2, -3, -2] },
                  { text: this.datos.paciente.tablaConsultAntent[3].alt_uteri_ctl, style: 'center7', margin: [-3, -2, -3, -2] },
                  { text: this.datos.paciente.tablaConsultAntent[3].present_ctl, style: 'center7', margin: [-3, -2, -3, -2] },
                  { text: this.datos.paciente.tablaConsultAntent[3].latil_fetal_ctl, style: 'center7', margin: [-3, -2, -3, -2] },
                  { text: this.datos.paciente.tablaConsultAntent[3].mov_fetal_ctl, style: 'center7', margin: [-3, -2, -3, -2] },
                  { text: this.datos.paciente.tablaConsultAntent[3].prote_ctl, style: 'center7', margin: [-3, -2, -3, -2] },
                  { text: this.datos.paciente.tablaConsultAntent[3].sign_alarm_ctl, style: 'left7', margin: [-3, -2, -3, -2] },
                  { text: this.datos.paciente.tablaConsultAntent[3].tecn_ctl, style: 'center7', margin: [-3, -2, -3, -2] },
                  {
                    stack: [
                      { text: this.datos.paciente.tablaConsultAntent[3].fecha_prox_cita_ctl.dia.slice(0, 1) + '  ' + this.datos.paciente.tablaConsultAntent[3].fecha_prox_cita_ctl.dia.slice(1, 2), style: 'center7', margin: [-3, -2, -3, -2] },
                      { canvas: [{ type: 'line', x1: 5, y1: 2, x2: 5, y2: -3 }], margin: [0, 0, 0, -5] },
                    ]
                  },
                  {
                    stack: [
                      { text: this.datos.paciente.tablaConsultAntent[3].fecha_prox_cita_ctl.mes.slice(0, 1) + '  ' + this.datos.paciente.tablaConsultAntent[3].fecha_prox_cita_ctl.mes.slice(1, 2), style: 'center7', margin: [-3, -2, -3, -2] },
                      { canvas: [{ type: 'line', x1: 5, y1: 2, x2: 5, y2: -3 }], margin: [0, 0, 0, -5] },
                    ]
                  },
                  {
                    stack: [
                      { text: this.datos.paciente.tablaConsultAntent[3].fecha_prox_cita_ctl.año.slice(0, 2) + '  ' + this.datos.paciente.tablaConsultAntent[3].fecha_prox_cita_ctl.año.slice(2, 4), style: 'center7', margin: [-3, -2, -3, -2] },
                      { canvas: [{ type: 'line', x1: 9, y1: 2, x2: 9, y2: -3 }], margin: [0, 0, 0, -5] },
                    ]
                  },
                ],
                [
                  {
                    stack: [
                      { text: this.datos.paciente.tablaConsultAntent[4].fecha_gest_ctl.dia.slice(0, 1) + '  ' + this.datos.paciente.tablaConsultAntent[4].fecha_gest_ctl.dia.slice(1, 2), style: 'center7', margin: [-3, -2, -3, -2] },
                      { canvas: [{ type: 'line', x1: 5, y1: 2, x2: 5, y2: -3 }], margin: [0, 0, 0, -5] },
                    ]
                  },
                  {
                    stack: [
                      { text: this.datos.paciente.tablaConsultAntent[4].fecha_gest_ctl.mes.slice(0, 1) + '  ' + this.datos.paciente.tablaConsultAntent[4].fecha_gest_ctl.mes.slice(1, 2), style: 'center7', margin: [-3, -2, -3, -2] },
                      { canvas: [{ type: 'line', x1: 5, y1: 2, x2: 5, y2: -3 }], margin: [0, 0, 0, -5] },
                    ]
                  },
                  {
                    stack: [
                      { text: this.datos.paciente.tablaConsultAntent[4].fecha_gest_ctl.año.slice(0, 2) + '  ' + this.datos.paciente.tablaConsultAntent[4].fecha_gest_ctl.año.slice(2, 4), style: 'center7', margin: [-3, -2, -3, -2] },
                      { canvas: [{ type: 'line', x1: 9, y1: 2, x2: 9, y2: -3 }], margin: [0, 0, 0, -5] },
                    ]
                  },
                  { text: this.datos.paciente.tablaConsultAntent[1].edad_gest_ctl, style: 'center7', margin: [-3, -2, -3, -2] },
                  {
                    stack: [
                      { text: this.datos.paciente.tablaConsultAntent[4].peso_ctl.slice(0, 1) + '  ' + this.datos.paciente.tablaConsultAntent[4].peso_ctl.slice(1, 2) + '  ' + this.datos.paciente.tablaConsultAntent[4].peso_ctl.slice(2, 3), style: 'left7', margin: [-1, -2, -3, -2] },
                      { canvas: [{ type: 'line', x1: 5, y1: 2, x2: 5, y2: -5 }], margin: [0, 0, 0, -5] },
                      { canvas: [{ type: 'line', x1: 12, y1: 5, x2: 12, y2: -2 }], margin: [0, 0, 0, -5] },
                    ]
                  },
                  { text: this.datos.paciente.tablaConsultAntent[4].pa_ctl, style: 'center7', margin: [-3, -2, -3, -2] },
                  { text: this.datos.paciente.tablaConsultAntent[4].alt_uteri_ctl, style: 'center7', margin: [-3, -2, -3, -2] },
                  { text: this.datos.paciente.tablaConsultAntent[4].present_ctl, style: 'center7', margin: [-3, -2, -3, -2] },
                  { text: this.datos.paciente.tablaConsultAntent[4].latil_fetal_ctl, style: 'center7', margin: [-3, -2, -3, -2] },
                  { text: this.datos.paciente.tablaConsultAntent[4].mov_fetal_ctl, style: 'center7', margin: [-3, -2, -3, -2] },
                  { text: this.datos.paciente.tablaConsultAntent[4].prote_ctl, style: 'center7', margin: [-3, -2, -3, -2] },
                  { text: this.datos.paciente.tablaConsultAntent[4].sign_alarm_ctl, style: 'left7', margin: [-3, -2, -3, -2] },
                  { text: this.datos.paciente.tablaConsultAntent[4].tecn_ctl, style: 'center7', margin: [-3, -2, -3, -2] },
                  {
                    stack: [
                      { text: this.datos.paciente.tablaConsultAntent[4].fecha_prox_cita_ctl.dia.slice(0, 1) + '  ' + this.datos.paciente.tablaConsultAntent[4].fecha_prox_cita_ctl.dia.slice(1, 2), style: 'center7', margin: [-3, -2, -3, -2] },
                      { canvas: [{ type: 'line', x1: 5, y1: 2, x2: 5, y2: -3 }], margin: [0, 0, 0, -5] },
                    ]
                  },
                  {
                    stack: [
                      { text: this.datos.paciente.tablaConsultAntent[4].fecha_prox_cita_ctl.mes.slice(0, 1) + '  ' + this.datos.paciente.tablaConsultAntent[4].fecha_prox_cita_ctl.mes.slice(1, 2), style: 'center7', margin: [-3, -2, -3, -2] },
                      { canvas: [{ type: 'line', x1: 5, y1: 2, x2: 5, y2: -3 }], margin: [0, 0, 0, -5] },
                    ]
                  },
                  {
                    stack: [
                      { text: this.datos.paciente.tablaConsultAntent[4].fecha_prox_cita_ctl.año.slice(0, 2) + '  ' + this.datos.paciente.tablaConsultAntent[4].fecha_prox_cita_ctl.año.slice(2, 4), style: 'center7', margin: [-3, -2, -3, -2] },
                      { canvas: [{ type: 'line', x1: 9, y1: 2, x2: 9, y2: -3 }], margin: [0, 0, 0, -5] },
                    ]
                  },
                ],
                [
                  {
                    stack: [
                      { text: this.datos.paciente.tablaConsultAntent[5].fecha_gest_ctl.dia.slice(0, 1) + '  ' + this.datos.paciente.tablaConsultAntent[5].fecha_gest_ctl.dia.slice(1, 2), style: 'center7', margin: [-3, -2, -3, -2] },
                      { canvas: [{ type: 'line', x1: 5, y1: 2, x2: 5, y2: -3 }], margin: [0, 0, 0, -5] },
                    ]
                  },
                  {
                    stack: [
                      { text: this.datos.paciente.tablaConsultAntent[5].fecha_gest_ctl.mes.slice(0, 1) + '  ' + this.datos.paciente.tablaConsultAntent[5].fecha_gest_ctl.mes.slice(1, 2), style: 'center7', margin: [-3, -2, -3, -2] },
                      { canvas: [{ type: 'line', x1: 5, y1: 2, x2: 5, y2: -3 }], margin: [0, 0, 0, -5] },
                    ]
                  },
                  {
                    stack: [
                      { text: this.datos.paciente.tablaConsultAntent[5].fecha_gest_ctl.año.slice(0, 2) + '  ' + this.datos.paciente.tablaConsultAntent[5].fecha_gest_ctl.año.slice(2, 4), style: 'center7', margin: [-3, -2, -3, -2] },
                      { canvas: [{ type: 'line', x1: 9, y1: 2, x2: 9, y2: -3 }], margin: [0, 0, 0, -5] },
                    ]
                  },
                  { text: this.datos.paciente.tablaConsultAntent[1].edad_gest_ctl, style: 'center7', margin: [-3, -2, -3, -2] },
                  {
                    stack: [
                      { text: this.datos.paciente.tablaConsultAntent[5].peso_ctl.slice(0, 1) + '  ' + this.datos.paciente.tablaConsultAntent[5].peso_ctl.slice(1, 2) + '  ' + this.datos.paciente.tablaConsultAntent[5].peso_ctl.slice(2, 3), style: 'left7', margin: [-1, -2, -3, -2] },
                      { canvas: [{ type: 'line', x1: 5, y1: 2, x2: 5, y2: -5 }], margin: [0, 0, 0, -5] },
                      { canvas: [{ type: 'line', x1: 12, y1: 5, x2: 12, y2: -2 }], margin: [0, 0, 0, -5] },
                    ]
                  },
                  { text: this.datos.paciente.tablaConsultAntent[5].pa_ctl, style: 'center7', margin: [-3, -2, -3, -2] },
                  { text: this.datos.paciente.tablaConsultAntent[5].alt_uteri_ctl, style: 'center7', margin: [-3, -2, -3, -2] },
                  { text: this.datos.paciente.tablaConsultAntent[5].present_ctl, style: 'center7', margin: [-3, -2, -3, -2] },
                  { text: this.datos.paciente.tablaConsultAntent[5].latil_fetal_ctl, style: 'center7', margin: [-3, -2, -3, -2] },
                  { text: this.datos.paciente.tablaConsultAntent[5].mov_fetal_ctl, style: 'center7', margin: [-3, -2, -3, -2] },
                  { text: this.datos.paciente.tablaConsultAntent[5].prote_ctl, style: 'center7', margin: [-3, -2, -3, -2] },
                  { text: this.datos.paciente.tablaConsultAntent[5].sign_alarm_ctl, style: 'left7', margin: [-3, -2, -3, -2] },
                  { text: this.datos.paciente.tablaConsultAntent[5].tecn_ctl, style: 'center7', margin: [-3, -2, -3, -2] },
                  {
                    stack: [
                      { text: this.datos.paciente.tablaConsultAntent[5].fecha_prox_cita_ctl.dia.slice(0, 1) + '  ' + this.datos.paciente.tablaConsultAntent[5].fecha_prox_cita_ctl.dia.slice(1, 2), style: 'center7', margin: [-3, -2, -3, -2] },
                      { canvas: [{ type: 'line', x1: 5, y1: 2, x2: 5, y2: -3 }], margin: [0, 0, 0, -5] },
                    ]
                  },
                  {
                    stack: [
                      { text: this.datos.paciente.tablaConsultAntent[5].fecha_prox_cita_ctl.mes.slice(0, 1) + '  ' + this.datos.paciente.tablaConsultAntent[5].fecha_prox_cita_ctl.mes.slice(1, 2), style: 'center7', margin: [-3, -2, -3, -2] },
                      { canvas: [{ type: 'line', x1: 5, y1: 2, x2: 5, y2: -3 }], margin: [0, 0, 0, -5] },
                    ]
                  },
                  {
                    stack: [
                      { text: this.datos.paciente.tablaConsultAntent[5].fecha_prox_cita_ctl.año.slice(0, 2) + '  ' + this.datos.paciente.tablaConsultAntent[5].fecha_prox_cita_ctl.año.slice(2, 4), style: 'center7', margin: [-3, -2, -3, -2] },
                      { canvas: [{ type: 'line', x1: 9, y1: 2, x2: 9, y2: -3 }], margin: [0, 0, 0, -5] },
                    ]
                  },
                ],
                [
                  {
                    stack: [
                      { text: this.datos.paciente.tablaConsultAntent[6].fecha_gest_ctl.dia.slice(0, 1) + '  ' + this.datos.paciente.tablaConsultAntent[6].fecha_gest_ctl.dia.slice(1, 2), style: 'center7', margin: [-3, -2, -3, -2] },
                      { canvas: [{ type: 'line', x1: 5, y1: 2, x2: 5, y2: -3 }], margin: [0, 0, 0, -5] },
                    ]
                  },
                  {
                    stack: [
                      { text: this.datos.paciente.tablaConsultAntent[6].fecha_gest_ctl.mes.slice(0, 1) + '  ' + this.datos.paciente.tablaConsultAntent[6].fecha_gest_ctl.mes.slice(1, 2), style: 'center7', margin: [-3, -2, -3, -2] },
                      { canvas: [{ type: 'line', x1: 5, y1: 2, x2: 5, y2: -3 }], margin: [0, 0, 0, -5] },
                    ]
                  },
                  {
                    stack: [
                      { text: this.datos.paciente.tablaConsultAntent[6].fecha_gest_ctl.año.slice(0, 2) + '  ' + this.datos.paciente.tablaConsultAntent[6].fecha_gest_ctl.año.slice(2, 4), style: 'center7', margin: [-3, -2, -3, -2] },
                      { canvas: [{ type: 'line', x1: 9, y1: 2, x2: 9, y2: -3 }], margin: [0, 0, 0, -5] },
                    ]
                  },
                  { text: this.datos.paciente.tablaConsultAntent[1].edad_gest_ctl, style: 'center7', margin: [-3, -2, -3, -2] },
                  {
                    stack: [
                      { text: this.datos.paciente.tablaConsultAntent[6].peso_ctl.slice(0, 1) + '  ' + this.datos.paciente.tablaConsultAntent[6].peso_ctl.slice(1, 2) + '  ' + this.datos.paciente.tablaConsultAntent[6].peso_ctl.slice(2, 3), style: 'left7', margin: [-1, -2, -3, -2] },
                      { canvas: [{ type: 'line', x1: 5, y1: 2, x2: 5, y2: -5 }], margin: [0, 0, 0, -5] },
                      { canvas: [{ type: 'line', x1: 12, y1: 5, x2: 12, y2: -2 }], margin: [0, 0, 0, -5] },
                    ]
                  },
                  { text: this.datos.paciente.tablaConsultAntent[6].pa_ctl, style: 'center7', margin: [-3, -2, -3, -2] },
                  { text: this.datos.paciente.tablaConsultAntent[6].alt_uteri_ctl, style: 'center7', margin: [-3, -2, -3, -2] },
                  { text: this.datos.paciente.tablaConsultAntent[6].present_ctl, style: 'center7', margin: [-3, -2, -3, -2] },
                  { text: this.datos.paciente.tablaConsultAntent[6].latil_fetal_ctl, style: 'center7', margin: [-3, -2, -3, -2] },
                  { text: this.datos.paciente.tablaConsultAntent[6].mov_fetal_ctl, style: 'center7', margin: [-3, -2, -3, -2] },
                  { text: this.datos.paciente.tablaConsultAntent[6].prote_ctl, style: 'center7', margin: [-3, -2, -3, -2] },
                  { text: this.datos.paciente.tablaConsultAntent[6].sign_alarm_ctl, style: 'left7', margin: [-3, -2, -3, -2] },
                  { text: this.datos.paciente.tablaConsultAntent[6].tecn_ctl, style: 'center7', margin: [-3, -2, -3, -2] },
                  {
                    stack: [
                      { text: this.datos.paciente.tablaConsultAntent[6].fecha_prox_cita_ctl.dia.slice(0, 1) + '  ' + this.datos.paciente.tablaConsultAntent[6].fecha_prox_cita_ctl.dia.slice(1, 2), style: 'center7', margin: [-3, -2, -3, -2] },
                      { canvas: [{ type: 'line', x1: 5, y1: 2, x2: 5, y2: -3 }], margin: [0, 0, 0, -5] },
                    ]
                  },
                  {
                    stack: [
                      { text: this.datos.paciente.tablaConsultAntent[6].fecha_prox_cita_ctl.mes.slice(0, 1) + '  ' + this.datos.paciente.tablaConsultAntent[6].fecha_prox_cita_ctl.mes.slice(1, 2), style: 'center7', margin: [-3, -2, -3, -2] },
                      { canvas: [{ type: 'line', x1: 5, y1: 2, x2: 5, y2: -3 }], margin: [0, 0, 0, -5] },
                    ]
                  },
                  {
                    stack: [
                      { text: this.datos.paciente.tablaConsultAntent[6].fecha_prox_cita_ctl.año.slice(0, 2) + '  ' + this.datos.paciente.tablaConsultAntent[6].fecha_prox_cita_ctl.año.slice(2, 4), style: 'center7', margin: [-3, -2, -3, -2] },
                      { canvas: [{ type: 'line', x1: 9, y1: 2, x2: 9, y2: -3 }], margin: [0, 0, 0, -5] },
                    ]
                  },
                ],
                [
                  { text: this.datos.paciente.tablaConsultAntent[7].fecha_gest_ctl.dia.slice(0, 1) + '  ' + this.datos.paciente.tablaConsultAntent[7].fecha_gest_ctl.dia.slice(1, 2), style: 'center7', margin: [-3, -2, -3, -2] },
                  { text: this.datos.paciente.tablaConsultAntent[7].fecha_gest_ctl.mes.slice(0, 1) + '  ' + this.datos.paciente.tablaConsultAntent[7].fecha_gest_ctl.mes.slice(1, 2), style: 'center7', margin: [-3, -2, -3, -2] },
                  { text: this.datos.paciente.tablaConsultAntent[7].fecha_gest_ctl.año.slice(0, 2) + '  ' + this.datos.paciente.tablaConsultAntent[7].fecha_gest_ctl.año.slice(2, 4), style: 'center7', margin: [-3, -2, -3, -2] },
                  { text: this.datos.paciente.tablaConsultAntent[1].edad_gest_ctl, style: 'center7', margin: [-3, -2, -3, -2] },
                  { text: this.datos.paciente.tablaConsultAntent[7].peso_ctl.slice(0, 1) + '  ' + this.datos.paciente.tablaConsultAntent[7].peso_ctl.slice(1, 2) + '  ' + this.datos.paciente.tablaConsultAntent[7].peso_ctl.slice(2, 3), style: 'left7', margin: [-1, -2, -3, -2] },
                  { text: this.datos.paciente.tablaConsultAntent[7].pa_ctl, style: 'center7', margin: [-3, -2, -3, -2] },
                  { text: this.datos.paciente.tablaConsultAntent[7].alt_uteri_ctl, style: 'center7', margin: [-3, -2, -3, -2] },
                  { text: this.datos.paciente.tablaConsultAntent[7].present_ctl, style: 'center7', margin: [-3, -2, -3, -2] },
                  { text: this.datos.paciente.tablaConsultAntent[7].latil_fetal_ctl, style: 'center7', margin: [-3, -2, -3, -2] },
                  { text: this.datos.paciente.tablaConsultAntent[7].mov_fetal_ctl, style: 'center7', margin: [-3, -2, -3, -2] },
                  { text: this.datos.paciente.tablaConsultAntent[7].prote_ctl, style: 'center7', margin: [-3, -2, -3, -2] },
                  { text: this.datos.paciente.tablaConsultAntent[7].sign_alarm_ctl, style: 'left7', margin: [-3, -2, -3, -2] },
                  { text: this.datos.paciente.tablaConsultAntent[7].tecn_ctl, style: 'center7', margin: [-3, -2, -3, -2] },
                  { text: this.datos.paciente.tablaConsultAntent[7].fecha_prox_cita_ctl.dia.slice(0, 1) + '  ' + this.datos.paciente.tablaConsultAntent[7].fecha_prox_cita_ctl.dia.slice(1, 2), style: 'center7', margin: [-3, -2, -3, -2] },
                  { text: this.datos.paciente.tablaConsultAntent[7].fecha_prox_cita_ctl.mes.slice(0, 1) + '  ' + this.datos.paciente.tablaConsultAntent[7].fecha_prox_cita_ctl.mes.slice(1, 2), style: 'center7', margin: [-3, -2, -3, -2] },
                  { text: this.datos.paciente.tablaConsultAntent[7].fecha_prox_cita_ctl.año.slice(0, 2) + '  ' + this.datos.paciente.tablaConsultAntent[7].fecha_prox_cita_ctl.año.slice(2, 4), style: 'center7', margin: [-3, -2, -3, -2] },
                ],
                [
                  { text: this.datos.paciente.tablaConsultAntent[8].fecha_gest_ctl.dia.slice(0, 1) + '  ' + this.datos.paciente.tablaConsultAntent[8].fecha_gest_ctl.dia.slice(1, 2), style: 'center7', margin: [-3, -2, -3, -2] },
                  { text: this.datos.paciente.tablaConsultAntent[8].fecha_gest_ctl.mes.slice(0, 1) + '  ' + this.datos.paciente.tablaConsultAntent[8].fecha_gest_ctl.mes.slice(1, 2), style: 'center7', margin: [-3, -2, -3, -2] },
                  { text: this.datos.paciente.tablaConsultAntent[8].fecha_gest_ctl.año.slice(0, 2) + '  ' + this.datos.paciente.tablaConsultAntent[8].fecha_gest_ctl.año.slice(2, 4), style: 'center7', margin: [-3, -2, -3, -2] },
                  { text: this.datos.paciente.tablaConsultAntent[1].edad_gest_ctl, style: 'center7', margin: [-3, -2, -3, -2] },
                  { text: this.datos.paciente.tablaConsultAntent[8].peso_ctl.slice(0, 1) + '  ' + this.datos.paciente.tablaConsultAntent[8].peso_ctl.slice(1, 2) + '  ' + this.datos.paciente.tablaConsultAntent[8].peso_ctl.slice(2, 3), style: 'left7', margin: [-1, -2, -3, -2] },
                  { text: this.datos.paciente.tablaConsultAntent[8].pa_ctl, style: 'center7', margin: [-3, -2, -3, -2] },
                  { text: this.datos.paciente.tablaConsultAntent[8].alt_uteri_ctl, style: 'center7', margin: [-3, -2, -3, -2] },
                  { text: this.datos.paciente.tablaConsultAntent[8].present_ctl, style: 'center7', margin: [-3, -2, -3, -2] },
                  { text: this.datos.paciente.tablaConsultAntent[8].latil_fetal_ctl, style: 'center7', margin: [-3, -2, -3, -2] },
                  { text: this.datos.paciente.tablaConsultAntent[8].mov_fetal_ctl, style: 'center7', margin: [-3, -2, -3, -2] },
                  { text: this.datos.paciente.tablaConsultAntent[8].prote_ctl, style: 'center7', margin: [-3, -2, -3, -2] },
                  { text: this.datos.paciente.tablaConsultAntent[8].sign_alarm_ctl, style: 'left7', margin: [-3, -2, -3, -2] },
                  { text: this.datos.paciente.tablaConsultAntent[8].tecn_ctl, style: 'center7', margin: [-3, -2, -3, -2] },
                  { text: this.datos.paciente.tablaConsultAntent[8].fecha_prox_cita_ctl.dia.slice(0, 1) + '  ' + this.datos.paciente.tablaConsultAntent[8].fecha_prox_cita_ctl.dia.slice(1, 2), style: 'center7', margin: [-3, -2, -3, -2] },
                  { text: this.datos.paciente.tablaConsultAntent[8].fecha_prox_cita_ctl.mes.slice(0, 1) + '  ' + this.datos.paciente.tablaConsultAntent[8].fecha_prox_cita_ctl.mes.slice(1, 2), style: 'center7', margin: [-3, -2, -3, -2] },
                  { text: this.datos.paciente.tablaConsultAntent[8].fecha_prox_cita_ctl.año.slice(0, 2) + '  ' + this.datos.paciente.tablaConsultAntent[8].fecha_prox_cita_ctl.año.slice(2, 4), style: 'center7', margin: [-3, -2, -3, -2] },
                ],
                [
                  { text: this.datos.paciente.tablaConsultAntent[9].fecha_gest_ctl.dia.slice(0, 1) + '  ' + this.datos.paciente.tablaConsultAntent[9].fecha_gest_ctl.dia.slice(1, 2), style: 'center7', margin: [-3, -2, -3, -2] },
                  { text: this.datos.paciente.tablaConsultAntent[9].fecha_gest_ctl.mes.slice(0, 1) + '  ' + this.datos.paciente.tablaConsultAntent[9].fecha_gest_ctl.mes.slice(1, 2), style: 'center7', margin: [-3, -2, -3, -2] },
                  { text: this.datos.paciente.tablaConsultAntent[9].fecha_gest_ctl.año.slice(0, 2) + '  ' + this.datos.paciente.tablaConsultAntent[9].fecha_gest_ctl.año.slice(2, 4), style: 'center7', margin: [-3, -2, -3, -2] },
                  { text: this.datos.paciente.tablaConsultAntent[9].edad_gest_ctl, style: 'center7', margin: [-3, -2, -3, -2] },
                  { text: this.datos.paciente.tablaConsultAntent[9].peso_ctl.slice(0, 1) + '  ' + this.datos.paciente.tablaConsultAntent[9].peso_ctl.slice(1, 2) + '  ' + this.datos.paciente.tablaConsultAntent[9].peso_ctl.slice(2, 3), style: 'left7', margin: [-1, -2, -3, -2] },
                  { text: this.datos.paciente.tablaConsultAntent[9].pa_ctl, style: 'center7', margin: [-3, -2, -3, -2] },
                  { text: this.datos.paciente.tablaConsultAntent[9].alt_uteri_ctl, style: 'center7', margin: [-3, -2, -3, -2] },
                  { text: this.datos.paciente.tablaConsultAntent[9].present_ctl, style: 'center7', margin: [-3, -2, -3, -2] },
                  { text: this.datos.paciente.tablaConsultAntent[9].latil_fetal_ctl, style: 'center7', margin: [-3, -2, -3, -2] },
                  { text: this.datos.paciente.tablaConsultAntent[9].mov_fetal_ctl, style: 'center7', margin: [-3, -2, -3, -2] },
                  { text: this.datos.paciente.tablaConsultAntent[9].prote_ctl, style: 'center7', margin: [-3, -2, -3, -2] },
                  { text: this.datos.paciente.tablaConsultAntent[9].sign_alarm_ctl, style: 'left7', margin: [-3, -2, -3, -2] },
                  { text: this.datos.paciente.tablaConsultAntent[9].tecn_ctl, style: 'center7', margin: [-3, -2, -3, -2] },
                  { text: this.datos.paciente.tablaConsultAntent[9].fecha_prox_cita_ctl.dia.slice(0, 1) + '  ' + this.datos.paciente.tablaConsultAntent[9].fecha_prox_cita_ctl.dia.slice(1, 2), style: 'center7', margin: [-3, -2, -3, -2] },
                  { text: this.datos.paciente.tablaConsultAntent[9].fecha_prox_cita_ctl.mes.slice(0, 1) + '  ' + this.datos.paciente.tablaConsultAntent[9].fecha_prox_cita_ctl.mes.slice(1, 2), style: 'center7', margin: [-3, -2, -3, -2] },
                  { text: this.datos.paciente.tablaConsultAntent[9].fecha_prox_cita_ctl.año.slice(0, 2) + '  ' + this.datos.paciente.tablaConsultAntent[9].fecha_prox_cita_ctl.año.slice(2, 4), style: 'center7', margin: [-3, -2, -3, -2] },
                ],
                [
                  { text: this.datos.paciente.tablaConsultAntent[10].fecha_gest_ctl.dia.slice(0, 1) + '  ' + this.datos.paciente.tablaConsultAntent[10].fecha_gest_ctl.dia.slice(1, 2), style: 'center7', margin: [-3, -2, -3, -2] },
                  { text: this.datos.paciente.tablaConsultAntent[10].fecha_gest_ctl.mes.slice(0, 1) + '  ' + this.datos.paciente.tablaConsultAntent[10].fecha_gest_ctl.mes.slice(1, 2), style: 'center7', margin: [-3, -2, -3, -2] },
                  { text: this.datos.paciente.tablaConsultAntent[10].fecha_gest_ctl.año.slice(0, 2) + '  ' + this.datos.paciente.tablaConsultAntent[10].fecha_gest_ctl.año.slice(2, 4), style: 'center7', margin: [-3, -2, -3, -2] },
                  { text: this.datos.paciente.tablaConsultAntent[10].edad_gest_ctl, style: 'center7', margin: [-3, -2, -3, -2] },
                  { text: this.datos.paciente.tablaConsultAntent[10].peso_ctl.slice(0, 1) + '  ' + this.datos.paciente.tablaConsultAntent[10].peso_ctl.slice(1, 2) + '  ' + this.datos.paciente.tablaConsultAntent[10].peso_ctl.slice(2, 3), style: 'left7', margin: [-1, -2, -3, -2] },
                  { text: this.datos.paciente.tablaConsultAntent[10].pa_ctl, style: 'center7', margin: [-3, -2, -3, -2] },
                  { text: this.datos.paciente.tablaConsultAntent[10].alt_uteri_ctl, style: 'center7', margin: [-3, -2, -3, -2] },
                  { text: this.datos.paciente.tablaConsultAntent[10].present_ctl, style: 'center7', margin: [-3, -2, -3, -2] },
                  { text: this.datos.paciente.tablaConsultAntent[10].latil_fetal_ctl, style: 'center7', margin: [-3, -2, -3, -2] },
                  { text: this.datos.paciente.tablaConsultAntent[10].mov_fetal_ctl, style: 'center7', margin: [-3, -2, -3, -2] },
                  { text: this.datos.paciente.tablaConsultAntent[10].prote_ctl, style: 'center7', margin: [-3, -2, -3, -2] },
                  { text: this.datos.paciente.tablaConsultAntent[10].sign_alarm_ctl, style: 'left7', margin: [-3, -2, -3, -2] },
                  { text: this.datos.paciente.tablaConsultAntent[10].tecn_ctl, style: 'center7', margin: [-3, -2, -3, -2] },
                  { text: this.datos.paciente.tablaConsultAntent[10].fecha_prox_cita_ctl.dia.slice(0, 1) + '  ' + this.datos.paciente.tablaConsultAntent[10].fecha_prox_cita_ctl.dia.slice(1, 2), style: 'center7', margin: [-3, -2, -3, -2] },
                  { text: this.datos.paciente.tablaConsultAntent[10].fecha_prox_cita_ctl.mes.slice(0, 1) + '  ' + this.datos.paciente.tablaConsultAntent[10].fecha_prox_cita_ctl.mes.slice(1, 2), style: 'center7', margin: [-3, -2, -3, -2] },
                  { text: this.datos.paciente.tablaConsultAntent[10].fecha_prox_cita_ctl.año.slice(0, 2) + '  ' + this.datos.paciente.tablaConsultAntent[10].fecha_prox_cita_ctl.año.slice(2, 4), style: 'center7', margin: [-3, -2, -3, -2] },
                ],
              ]
            }
          },
        ]
      },
      {
        columns: [
          {
            width: '20%',
            stack: [
              {
                table: {
                  widths: ['40%', '5%', '50%', '5%'],
                  body: [
                    [
                      { text: 'PARTO', style: 'left7Bold', margin: [-3, 0, -3, 0], color: '#FFFFFF', fillColor: '#0F0404', border: [true, true, false, true] },
                      { stack: this.cuadroCanvas(this.datos.parto), alignment: 'center', color: '#FFFFFF', fillColor: '#0F0404', border: [false, true, false, true] },
                      { text: 'ABORTO', style: 'left7Bold', margin: [0, 0, -3, 0], color: '#FFFFFF', fillColor: '#0F0404', border: [false, true, false, true] },
                      { stack: this.cuadroCanvasColor(this.datos.abort), alignment: 'center', color: '#FFFFFF', fillColor: '#0F0404', border: [false, true, true, true] },
                    ]
                  ]
                },
              },
              {
                columns: [
                  {
                    width: '60%',
                    stack: [
                      {
                        table: {
                          widths: ['100%'],
                          body: [
                            [
                              {
                                stack: [
                                  { text: 'FECHA DE INGRESO', style: 'center7', margin: [-3, -2, -3, 0] },
                                  {
                                    table: {
                                      widths: ['30%', '30%', '40%'],
                                      body: [
                                        [
                                          { text: 'dia', style: 'center7', border: [true, true, false, false], margin: [-3, 0, -3, 0] },
                                          { text: 'mes', style: 'center7', border: [false, true, false, false], margin: [-3, 0, -3, 0] },
                                          { text: 'año', style: 'center7', border: [false, true, true, false], margin: [-3, 0, -3, 0] },
                                        ],
                                        [
                                          { text: this.datos.fechaIng.dia.slice(0, 1) + '  ' + this.datos.fechaIng.dia.slice(1, 2), style: 'center7', border: [true, false, true, true], margin: [-3, -3, -3, -2] },
                                          { text: this.datos.fechaIng.mes.slice(0, 1) + '  ' + this.datos.fechaIng.mes.slice(1, 2), style: 'center7', border: [false, false, true, true], margin: [-3, -3, -3, -2] },
                                          { text: this.datos.fechaIng.año.slice(0, 2) + '  ' + this.datos.fechaIng.año.slice(2, 4), style: 'center7', border: [false, false, true, true], margin: [-3, -3, -4, -2] },
                                        ]
                                      ]
                                    }
                                  },
                                  { canvas: [{ type: 'line', x1: 10, y1: 0, x2: 10, y2: -5 }] },
                                  { canvas: [{ type: 'line', x1: 29, y1: 0, x2: 29, y2: -5 }] },
                                  { canvas: [{ type: 'line', x1: 49, y1: 0, x2: 49, y2: -5 }] },
                                ]
                              }
                            ]
                          ]
                        }
                      },
                      {
                        table: {
                          widths: ['100%'],
                          body: [
                            [
                              {
                                columns: [
                                  { text: 'CARNE', style: 'center7', width: '40%', margin: [-5, 0, 0, 0] },
                                  { stack: this.cuadroCanvasColor(this.datos.carneNo), alignment: 'center', width: '10%', margin: [0, 0, 0, 0] },
                                  { text: 'no', style: 'center7', width: '20%', margin: [0, 0, -3, 0] },
                                  { stack: this.cuadroCanvas(this.datos.carneSi), alignment: 'center', width: '10%', margin: [0, 0, -5, 0] },
                                  { text: 'si', style: 'center7', width: '20%', margin: [0, 0, -5, 0] },
                                ]
                              }
                            ]
                          ]
                        }
                      }
                    ]
                  },
                  {
                    table: {
                      widths: ['100%'],
                      body: [
                        [
                          {
                            stack: [
                              { text: 'CONSULTAS PRENATALES', style: 'center7', margin: [-3, -2, -3, 0] },
                              { text: 'TOTAL', style: 'center7', marginTop: 5 },
                              {
                                marginTop: 2.5,
                                table: {
                                  widths: ['50%', '50%'],
                                  body: [
                                    [
                                      { text: this.datos.conult_prev.slice(0, 1), style: 'center7' },
                                      { text: this.datos.conult_prev.slice(1, 2), style: 'center7' },
                                    ]
                                  ]
                                }
                              }
                            ]
                          }
                        ]
                      ]
                    },
                    width: '40%',
                  },
                ]
              }
            ]
          },
          {
            width: '7%',
            stack: [
              {
                table: {
                  widths: ['100%'],
                  body: [
                    [
                      {
                        stack: [
                          { text: 'HOSPITALIZ en EMBARAZO', style: 'center7', margin: [-4, 1, -3, 0] },
                          {
                            columns: [
                              { text: 'no', style: 'center7', width: '40%', margin: [-10, 0, 0, 0] },
                              { stack: this.cuadroCanvas(this.datos.hospit_embNo), alignment: 'center', width: '10%', margin: [-5, 0, 0, 0] },
                              { text: 'si', style: 'center7', width: '40%', margin: [-3, 0, 0, 0] },
                              { stack: this.cuadroCanvasColor(this.datos.hospit_embSi), alignment: 'center', width: '10%' },
                            ]
                          },
                          { text: 'dias', style: 'center7', margin: [0, 2.5, 0, 0] },
                          {
                            table: {
                              widths: ['33%', '33%', '33%'],
                              body: [
                                [
                                  { text: this.datos.hospit_emb.slice(0, 1), style: 'center7', fillColor: 'yellow' },
                                  { text: this.datos.hospit_emb.slice(1, 2), style: 'center7', fillColor: 'yellow' },
                                  { text: this.datos.hospit_emb.slice(2, 3), style: 'center7', fillColor: 'yellow' },
                                ]
                              ]
                            }
                          }
                        ]
                      }
                    ]
                  ]
                },
              }
            ]
          },
          {
            width: '13%',
            stack: [
              {
                table: {
                  widths: ['100%'],
                  body: [
                    [
                      {
                        stack: [
                          { text: 'CORTICOIDES ANTENATALES', style: 'center7' },
                          {
                            columns: [
                              {
                                width: '60%',
                                stack: [
                                  {
                                    columns: [
                                      { text: 'completo', style: 'center7', margin: [-3, 1, 0, 0] },
                                      { stack: this.cuadroCanvas(this.datos.corticoides1), alignment: 'center', margin: [-3, 1, 0, 0] },
                                    ]
                                  },
                                  {
                                    columns: [
                                      { text: 'incompleto', style: 'center7', margin: [-3, 1, 0, 0] },
                                      { stack: this.cuadroCanvasColor(this.datos.corticoides2), alignment: 'center', margin: [-20, 1, 0, 0] },
                                    ]
                                  },
                                  {
                                    columns: [
                                      { text: 'ninguna', style: 'center7', margin: [-3, 1, 0, 0] },
                                      { stack: this.cuadroCanvasColor(this.datos.corticoides3), alignment: 'center', margin: [10, 1, 0, 0] },
                                    ]
                                  },
                                  {
                                    columns: [
                                      { text: 'n/c', style: 'center7', margin: [-3, 1, 0, 0] },
                                      { stack: this.cuadroCanvas(this.datos.corticoides4), alignment: 'center', margin: [11.5, 1, 0, 0] },
                                    ]
                                  },
                                ]
                              },
                              {
                                stack: [
                                  {
                                    width: '40%',
                                    margin: [5, 0, -5, 0],
                                    columns: [
                                      {
                                        table: {
                                          widths: ['33%', '33%'],
                                          body: [
                                            [
                                              { text: this.datos.sem_ini.slice(0, 1), style: 'center7' },
                                              { text: this.datos.sem_ini.slice(1, 2), style: 'center7' },
                                            ]
                                          ]
                                        }
                                      },
                                      {
                                        margin: [4, 0, 0, 0],
                                        table: {
                                          widths: ['100%'],
                                          body: [
                                            [
                                              { text: this.datos.sem_ini.slice(3, 4), style: 'center7' },
                                            ]
                                          ]
                                        }
                                      }
                                    ]
                                  },
                                  { text: 'semana inicio', style: 'center7', margin: [3, 0, -3, 0] }
                                ]
                              },
                            ]
                          }
                        ]
                      }
                    ]
                  ]
                },
              }
            ]
          },
          {
            width: '7%',
            stack: [
              {
                table: {
                  widths: ['100%'],
                  body: [
                    [
                      {
                        stack: [
                          { text: 'INICIO', style: 'center7', margin: [0, -2.5, 0, 0] },
                          { text: 'espontaneo', style: 'center7', margin: [-3, 0, -3, 0] },
                          { stack: this.cuadroCanvas(this.datos.inicio1), alignment: 'center' },
                          { text: 'inducido', style: 'center7' },
                          { stack: this.cuadroCanvasColor(this.datos.inicio2), alignment: 'center' },
                          { text: 'cesar. elect', style: 'center7', margin: [-3, 0, -3, 0] },
                          { stack: this.cuadroCanvasColor(this.datos.inicio3), alignment: 'center' }
                        ]
                      }
                    ]
                  ]
                },
              }
            ]
          },
          {
            width: '20%',
            stack: [
              {
                table: {
                  widths: ['100%'],
                  body: [
                    [
                      {
                        stack: [
                          { text: 'ROTURA DE MEMBRANAS ANTEPARTO', style: 'left7' },
                          {
                            columns: [
                              {
                                width: '10%',
                                stack: [
                                  { text: 'no', style: 'center7' },
                                  { stack: this.cuadroCanvas(this.datos.rupt_memb.no), alignment: 'center' },
                                  { text: 'si', style: 'center7' },
                                  { stack: this.cuadroCanvasColor(this.datos.rupt_memb.si), alignment: 'center' },
                                ]
                              },
                              {
                                width: '50%',
                                stack: [
                                  {
                                    margin: [1, 0, 0, 0],
                                    table: {
                                      widths: ['30%', '30%', '40%'],
                                      body: [
                                        [
                                          {
                                            border: [true, true, false, true],
                                            stack: [
                                              { text: 'dia', style: 'center7', margin: [-5, -2, -5, 0] },
                                              { text: this.datos.rupt_memb.fecha.dia.slice(0, 1) + '  ' + this.datos.rupt_memb.fecha.dia.slice(1, 2), style: 'center7', margin: [-5, 0, -5, -2] }
                                            ]
                                          },
                                          {
                                            border: [false, true, false, true],
                                            stack: [
                                              { text: 'mes', style: 'center7', margin: [-5, -2, -5, 0] },
                                              { text: this.datos.rupt_memb.fecha.mes.slice(0, 1) + '  ' + this.datos.rupt_memb.fecha.mes.slice(1, 2), style: 'center7', margin: [-5, 0, -5, -2] }
                                            ]
                                          },
                                          {
                                            border: [false, true, true, true],
                                            stack: [
                                              { text: 'año', style: 'center7', margin: [-5, -2, -5, 0] },
                                              { text: this.datos.rupt_memb.fecha.año.slice(0, 2) + '  ' + this.datos.rupt_memb.fecha.año.slice(2, 4), style: 'center7', margin: [-5, 0, -5, -2] }
                                            ]
                                          },
                                        ]
                                      ]
                                    }
                                  },
                                  { canvas: [{ type: 'line', x1: 9, y1: 0, x2: 9, y2: -5 }] },
                                  { canvas: [{ type: 'line', x1: 16, y1: 0, x2: 16, y2: -9 }] },
                                  { canvas: [{ type: 'line', x1: 25, y1: 0, x2: 25, y2: -5 }] },
                                  { canvas: [{ type: 'line', x1: 33, y1: 0, x2: 33, y2: -9 }] },
                                  { canvas: [{ type: 'line', x1: 44, y1: 0, x2: 44, y2: -5 }] },
                                  {
                                    margin: [1, 5, 10, 0],
                                    table: {
                                      widths: ['50%', '50%'],
                                      body: [
                                        [
                                          {
                                            border: [true, true, false, true],
                                            stack: [
                                              { text: 'hora', style: 'center7', margin: [-3, -2, -3, 0] },
                                              { text: this.datos.rupt_memb.fecha.hora.slice(0, 1) + '  ' + this.datos.rupt_memb.fecha.hora.slice(1, 2), style: 'center7', margin: [0, -2, 0, -2] }
                                            ]
                                          },
                                          {
                                            border: [false, true, true, true],
                                            stack: [
                                              { text: 'min', style: 'center7', margin: [0, -2, 0, 0] },
                                              { text: this.datos.rupt_memb.fecha.min.slice(0, 1) + '  ' + this.datos.rupt_memb.fecha.min.slice(1, 2), style: 'center7', margin: [0, -2, 0, -2] }
                                            ]
                                          },
                                        ]
                                      ]
                                    }
                                  },
                                  { canvas: [{ type: 'line', x1: 11, y1: 0, x2: 11, y2: -5 }] },
                                  { canvas: [{ type: 'line', x1: 22, y1: 0, x2: 22, y2: -6 }] },
                                  { canvas: [{ type: 'line', x1: 22, y1: -10, x2: 22, y2: -15 }] },
                                  { canvas: [{ type: 'line', x1: 33, y1: 0, x2: 33, y2: -6 }] },
                                ]
                              },
                              {
                                margin: [0, -2, 0, 0],
                                width: '40%',
                                stack: [
                                  {
                                    columns: [
                                      { text: '<37 sem', style: 'center7', width: '80%' },
                                      { stack: this.cuadroCanvasColor(this.datos.rupt_memb.sem_iniMenor37), alignment: 'center', width: '20%' },
                                    ]
                                  },
                                  {
                                    columns: [
                                      { text: '>=18hs', style: 'center7', width: '80%' },
                                      { stack: this.cuadroCanvasColor(this.datos.rupt_memb.sem_iniMenor37), alignment: 'center', width: '20%' },
                                    ]
                                  },
                                  {
                                    columns: [
                                      { text: 'temp >=38C', style: 'center7', width: '80%', margin: [-10, 0, 0, 0] },
                                      { stack: this.cuadroCanvasColor(this.datos.rupt_memb.sem_iniMenor37), alignment: 'center', width: '20%' },
                                    ]
                                  },
                                  {
                                    marginTop: 2,
                                    columns: [
                                      {
                                        table: {
                                          widths: ['33%', '33%'],
                                          body: [
                                            [
                                              { text: this.datos.rupt_memb.tempMay38.slice(0, 1), style: 'center7' },
                                              { text: this.datos.rupt_memb.tempMay38.slice(1, 2), style: 'center7' },
                                            ]
                                          ]
                                        }
                                      },
                                      {
                                        margin: [4, 0, 0, 0],
                                        table: {
                                          widths: ['100%'],
                                          body: [
                                            [
                                              { text: this.datos.rupt_memb.tempMay38.slice(3, 4), style: 'center7' },
                                            ]
                                          ]
                                        }
                                      }
                                    ]
                                  }
                                ]
                              }
                            ]
                          }
                        ]
                      }
                    ]
                  ]
                },
              }
            ]
          },
          {
            width: '9%',
            stack: [
              {
                table: {
                  widths: ['100%'],
                  body: [
                    [
                      {
                        stack: [
                          { text: 'EDAD GEST.', style: 'center7' },
                          { text: 'al parto', style: 'center7' },
                          {
                            marginTop: 3.5,
                            columns: [
                              { text: 'semanas', style: 'center7', width: '60%', margin: [-4, 0, 0, 0] },
                              { text: 'dias', style: 'center7', width: '40%' },
                            ]
                          },
                          {
                            columns: [
                              {
                                width: '60%',
                                table: {
                                  widths: ['50%', '50%'],
                                  body: [
                                    [
                                      { text: this.datos.FUM.sem_fum.slice(0, 1), style: 'center7' },
                                      { text: this.datos.FUM.sem_fum.slice(1, 2), style: 'center7' },
                                    ]
                                  ]
                                }
                              },
                              { text: this.datos.FUM.sem_fum.slice(3, 4), style: 'center7', marginTop: 3, width: '40%' },
                            ]
                          },
                          {
                            columns: [
                              { text: 'por FUM', style: 'center7', margin: [-4, 0, -2, 0] },
                              { text: 'por Eco', style: 'center7', margin: [0, 0, -5, 0] }
                            ]
                          },
                          {
                            columns: [
                              { stack: this.cuadroCanvas(this.datos.FUM.eco_p_a1), alignment: 'center' },
                              { stack: this.cuadroCanvas(this.datos.FUM.eco_p_a2), alignment: 'center' }
                            ]
                          }
                        ]
                      }
                    ]
                  ]
                },
              }
            ]
          },
          {
            width: '9%',
            stack: [
              {
                table: {
                  widths: ['100%'],
                  body: [
                    [
                      {
                        stack: [
                          { text: 'PRESENTACION SITUACION', style: 'center7', margin: [-4, 0, -4, 0] },
                          {
                            columns: [
                              { text: 'cefalica', style: 'right7', width: '60%', margin: [-4, 4, -4, 0] },
                              { stack: this.cuadroCanvas(this.datos.presentacion.present1), alignment: 'center', width: '40%', margin: [0, 4.4, -8, 0] },
                            ]
                          },
                          {
                            columns: [
                              { text: 'pelviana', style: 'right7', width: '60%', margin: [-4, 5, -4, 0] },
                              { stack: this.cuadroCanvasColor(this.datos.presentacion.present2), alignment: 'center', width: '40%', margin: [0, 5, -8, 0] },
                            ]
                          },
                          {
                            columns: [
                              { text: 'transversa', style: 'right7', width: '60%', margin: [-4, 4.5, -4, 0] },
                              { stack: this.cuadroCanvasColor(this.datos.presentacion.present3), alignment: 'center', width: '40%', margin: [0, 4.5, -8, 0] },
                            ]
                          },
                        ]
                      }
                    ]
                  ]
                },
              }
            ]
          },
          {
            width: '5%',
            stack: [
              {
                table: {
                  widths: ['100%'],
                  body: [
                    [
                      {
                        stack: [
                          { text: 'TAMAÑO FETAL ACORDE', style: 'center7', margin: [-4, -2, -4, 0] },
                          { text: 'no', style: 'center7', margin: [0, 1.5, 0, 0] },
                          { stack: this.cuadroCanvasColor(this.datos.tamano_fetal.no), alignment: 'center' },
                          { text: 'si', style: 'center7' },
                          { stack: this.cuadroCanvas(this.datos.tamano_fetal.si), alignment: 'center' },
                        ]
                      }
                    ]
                  ]
                },
              }
            ]
          },
          {
            width: '10%',
            stack: [
              {
                table: {
                  widths: ['100%'],
                  body: [
                    [
                      {
                        stack: [
                          { text: 'ACOMPAÑANTE TDP', style: 'center7' },
                          {
                            columns: [
                              { text: 'pareja', style: 'right7', width: '60%', margin: [-4, 1, -4, 0] },
                              { stack: this.cuadroCanvas(this.datos.acompañan_tdp.acomp1), alignment: 'center', width: '40%', margin: [0, 1, -8, 0] },
                            ]
                          },
                          {
                            columns: [
                              { text: 'familiar', style: 'right7', width: '60%', margin: [-4, 1, -4, 0] },
                              { stack: this.cuadroCanvas(this.datos.acompañan_tdp.acomp2), alignment: 'center', width: '40%', margin: [0, 1, -8, 0] },
                            ]
                          },
                          {
                            columns: [
                              { text: 'otro', style: 'right7', width: '60%', margin: [-4, 1, -4, 0] },
                              { stack: this.cuadroCanvas(this.datos.acompañan_tdp.acomp3), alignment: 'center', width: '40%', margin: [0, 1, -8, 0] },
                            ]
                          },
                          {
                            columns: [
                              { text: 'ninguno', style: 'right7', width: '60%', margin: [-4, 1, -4, 0] },
                              { stack: this.cuadroCanvasColor(this.datos.acompañan_tdp.acomp4), alignment: 'center', width: '40%', margin: [0, 1, -8, 0] },
                            ]
                          },
                        ]
                      }
                    ]
                  ]
                },
              }
            ]
          },
        ]
      },
      {
        columns: [
          {
            table: {
              widths: ['100%'],
              body: [
                [
                  {
                    stack: [
                      {
                        margin: [-3, 0, 0, 0],
                        columns: [
                          { text: 'no', style: 'center7' },
                          { stack: this.cuadroCanvas(this.datos.det_partogm.no), alignment: 'center' },
                        ]
                      },
                      {
                        margin: [-3, 0, 0, 0],
                        columns: [
                          { text: 'si', style: 'center7' },
                          { stack: this.cuadroCanvas(this.datos.det_partogm.si), alignment: 'center' },
                        ]
                      },
                      { image: this.writeRotatedText2(3, 'TRABAJO      detalles', 'DE PARTO     en parto', '                        gramo'), fit: [25, 90], margin: [-1, -2, 0, 0] },
                    ]
                  }
                ]
              ]
            },
            width: '4%',
          },
          {
            table: {
              widths: ['4%', '4%', '15%', '10%', '5%', '10%', '12%', '8%', '16%', '8%', '8%'],
              body: [
                [
                  { text: 'hora', style: 'center7', margin: [-4, -2, -4, 0] },
                  { text: 'min', style: 'center7', margin: [-4, -2, -4, 0] },
                  { text: 'posicion de la madre', style: 'center7', margin: [-4, -2, -4, 0] },
                  { text: 'PA', style: 'center7', margin: [-4, -2, -4, 0] },
                  { text: 'pulso', style: 'center7', margin: [-5, -2, -5, 0] },
                  { text: 'contr10', style: 'center7', margin: [-4, -2, -4, 0] },
                  { text: 'dilatacion', style: 'center7', margin: [-5, -2, -5, 0] },
                  { text: 'altura present', style: 'center7', margin: [-4, -2, -4, 0] },
                  { text: 'variedad posic.', style: 'center7', margin: [-5, -2, -5, 0] },
                  { text: 'meconio', style: 'center7', margin: [-6, -2, -6, 0] },
                  { text: 'FCF/dips', style: 'center7', margin: [-4, -2, -4, 0] },
                ],
                [
                  { text: this.datos.tabla_trabaj_parto[0].hora, style: 'center7', margin: [-4, 2, -4, 4] },
                  { text: this.datos.tabla_trabaj_parto[0].min, style: 'center7', margin: [-4, 2, -4, 4] },
                  { text: this.datos.tabla_trabaj_parto[0].posici_part, style: 'center7', margin: [-6, 2, -6, 4] },
                  { text: this.datos.tabla_trabaj_parto[0].PA_puls, style: 'center7', margin: [-5, 2, -5, 4] },
                  { text: this.datos.tabla_trabaj_parto[0].pulso, style: 'center7', margin: [-4, 2, -4, 4] },
                  { text: this.datos.tabla_trabaj_parto[0].contr, style: 'center7', margin: [-4, 2, -4, 4] },
                  { text: this.datos.tabla_trabaj_parto[0].dilata, style: 'center7', margin: [-4, 2, -4, 4] },
                  { text: this.datos.tabla_trabaj_parto[0].alturp, style: 'center7', margin: [-4, 2, -4, 4] },
                  { text: this.datos.tabla_trabaj_parto[0].vari_po, style: 'center7', margin: [-6, 2, -6, 4] },
                  // {text: this.datos.tabla_trabaj_parto[0].meconi, style: 'center7', margin: [-4,2,-4,4]},
                  // {text: this.datos.tabla_trabaj_parto[0].fcf_dip, style: 'center7', margin: [-4,2,-4,4]},
                  {
                    stack: [
                      { stack: this.trianguloAmarillo(), margin: [-10, 3, 0, -15] },
                      { text: this.datos.tabla_trabaj_parto[0].meconi, style: 'center7', margin: [-4, 2, -4, 0] },
                    ]
                  },
                  {
                    stack: [
                      { stack: this.trianguloAmarillo(), margin: [-10, 3, 0, -15] },
                      { text: this.datos.tabla_trabaj_parto[0].fcf_dip, style: 'center7', margin: [-4, 2, -4, 0] },
                    ]
                  }
                ],
                [
                  { text: this.datos.tabla_trabaj_parto[1].hora, style: 'center7', margin: [-4, 2, -4, 2] },
                  { text: this.datos.tabla_trabaj_parto[1].min, style: 'center7', margin: [-4, 2, -4, 2] },
                  { text: this.datos.tabla_trabaj_parto[1].posici_part, style: 'center7', margin: [-6, 2, -6, 2] },
                  { text: this.datos.tabla_trabaj_parto[1].PA_puls, style: 'center7', margin: [-5, 2, -5, 2] },
                  { text: this.datos.tabla_trabaj_parto[1].pulso, style: 'center7', margin: [-4, 2, -4, 2] },
                  { text: this.datos.tabla_trabaj_parto[1].contr, style: 'center7', margin: [-4, 2, -4, 2] },
                  { text: this.datos.tabla_trabaj_parto[1].dilata, style: 'center7', margin: [-4, 2, -4, 2] },
                  { text: this.datos.tabla_trabaj_parto[1].alturp, style: 'center7', margin: [-4, 2, -4, 2] },
                  { text: this.datos.tabla_trabaj_parto[1].vari_po, style: 'center7', margin: [-6, 2, -6, 2] },
                  // {text: this.datos.tabla_trabaj_parto[1].meconi, style: 'center7', margin: [-4,2,-4,2]},
                  // {text: this.datos.tabla_trabaj_parto[1].fcf_dip, style: 'center7', margin: [-4,2,-4,2]},
                  {
                    stack: [
                      { stack: this.trianguloAmarillo(), margin: [-10, 3, 0, -15] },
                      { text: this.datos.tabla_trabaj_parto[1].meconi, style: 'center7', margin: [-4, 2, -4, 0] },
                    ]
                  },
                  {
                    stack: [
                      { stack: this.trianguloAmarillo(), margin: [-10, 3, 0, -15] },
                      { text: this.datos.tabla_trabaj_parto[1].fcf_dip, style: 'center7', margin: [-4, 2, -4, 0] },
                    ]
                  }
                ],
                [
                  { text: this.datos.tabla_trabaj_parto[2].hora, style: 'center7', margin: [-4, 2, -4, 2] },
                  { text: this.datos.tabla_trabaj_parto[2].min, style: 'center7', margin: [-4, 2, -4, 2] },
                  { text: this.datos.tabla_trabaj_parto[2].posici_part, style: 'center7', margin: [-6, 2, -6, 2] },
                  { text: this.datos.tabla_trabaj_parto[2].PA_puls, style: 'center7', margin: [-5, 2, -5, 2] },
                  { text: this.datos.tabla_trabaj_parto[2].pulso, style: 'center7', margin: [-4, 2, -4, 2] },
                  { text: this.datos.tabla_trabaj_parto[2].contr, style: 'center7', margin: [-4, 2, -4, 2] },
                  { text: this.datos.tabla_trabaj_parto[2].dilata, style: 'center7', margin: [-4, 2, -4, 2] },
                  { text: this.datos.tabla_trabaj_parto[2].alturp, style: 'center7', margin: [-4, 2, -4, 2] },
                  { text: this.datos.tabla_trabaj_parto[2].vari_po, style: 'center7', margin: [-6, 2, -6, 2] },
                  // {text: this.datos.tabla_trabaj_parto[2].meconi, style: 'center7', margin: [-4,2,-4,2]},
                  // {text: this.datos.tabla_trabaj_parto[2].fcf_dip, style: 'center7', margin: [-4,2,-4,2]},
                  {
                    stack: [
                      { stack: this.trianguloAmarillo(), margin: [-10, 3, 0, -15] },
                      { text: this.datos.tabla_trabaj_parto[2].meconi, style: 'center7', margin: [-4, 2, -4, 0] },
                    ]
                  },
                  {
                    stack: [
                      { stack: this.trianguloAmarillo(), margin: [-10, 3, 0, -15] },
                      { text: this.datos.tabla_trabaj_parto[2].fcf_dip, style: 'center7', margin: [-4, 2, -4, 0] },
                    ]
                  }
                ],
                [
                  { text: this.datos.tabla_trabaj_parto[3].hora, style: 'center7', margin: [-4, 2, -4, 2] },
                  { text: this.datos.tabla_trabaj_parto[3].min, style: 'center7', margin: [-4, 2, -4, 2] },
                  { text: this.datos.tabla_trabaj_parto[3].posici_part, style: 'center7', margin: [-6, 2, -6, 2] },
                  { text: this.datos.tabla_trabaj_parto[3].PA_puls, style: 'center7', margin: [-5, 2, -5, 2] },
                  { text: this.datos.tabla_trabaj_parto[3].pulso, style: 'center7', margin: [-4, 2, -4, 2] },
                  { text: this.datos.tabla_trabaj_parto[3].contr, style: 'center7', margin: [-4, 2, -4, 2] },
                  { text: this.datos.tabla_trabaj_parto[3].dilata, style: 'center7', margin: [-4, 2, -4, 2] },
                  { text: this.datos.tabla_trabaj_parto[3].alturp, style: 'center7', margin: [-4, 2, -4, 2] },
                  { text: this.datos.tabla_trabaj_parto[3].vari_po, style: 'center7', margin: [-6, 2, -6, 2] },
                  {
                    stack: [
                      { stack: this.trianguloAmarillo(), margin: [-10, 3, 0, -15] },
                      { text: this.datos.tabla_trabaj_parto[3].meconi, style: 'center7', margin: [-4, 2, -4, 0] },
                    ]
                  },
                  {
                    stack: [
                      { stack: this.trianguloAmarillo(), margin: [-10, 3, 0, -15] },
                      { text: this.datos.tabla_trabaj_parto[3].fcf_dip, style: 'center7', margin: [-4, -1, -4, 0] },
                    ]
                  }
                ],
              ]
            },
            width: '50%',
          },
          {
            table: {
              widths: ['100%'],
              body: [
                [
                  { image: this.writeRotatedText(1, 'ENFERMEDADES'), fit: [25, 100], margin: [-5, -20, 0, 5], fillColor: '#7A7A7A', border: [true, true, false, true] },
                ]
              ]
            },
            width: '3%',
          },
          {
            table: {
              widths: ['100%'],
              body: [
                [
                  {
                    border: [false, true, false, true],
                    stack: [
                      { image: this.writeRotatedText2(1, '1 Ó MAS'), fit: [15, 70], margin: [-3, -45, 0, 0] },
                      { stack: this.cuadroCanvasColor(this.datos.enfermedades.ningunaNo), alignment: 'center' },
                      { image: this.writeRotatedText2(1, 'NINGUNA'), fit: [15, 70], margin: [-3, -30, 0, 0] },
                      { stack: this.cuadroCanvas(this.datos.enfermedades.ningunaSi), alignment: 'center' },
                    ]
                  },
                ]
              ]
            },
            width: '3%',
          },
          {
            table: {
              widths: ['100%'],
              body: [
                [
                  {
                    border: [false, true, true, true],
                    columns: [
                      {
                        width: '35%',
                        stack: [
                          {
                            margin: [0, -3, 0, 0],
                            columns: [
                              { text: ' ', style: 'center7', width: '40%' },
                              { text: 'no', style: 'center7', width: '15%' },
                              { text: 'si', style: 'center7', width: '15%' },
                              { text: ' ', style: 'center7', width: '15%' },
                              { text: ' ', style: 'center7', width: '15%' },
                            ]
                          },
                          {
                            columns: [
                              { text: 'HTA previa', style: 'center7', width: '40%', margin: [-8, 0, -1, 0] },
                              { stack: this.cuadroCanvas(this.datos.enfermedades.hta_prevNo), alignment: 'center', width: '15%' },
                              { stack: this.cuadroCanvasColor(this.datos.enfermedades.hta_prevSi), alignment: 'center', width: '15%' },
                              { text: ' ', style: 'center7', width: '15%' },
                              { text: ' ', style: 'center7', width: '15%' },
                            ]
                          },
                          {
                            marginTop: 1,
                            columns: [
                              { text: 'HTA inducida embarazo', style: 'center7', width: '40%', margin: [-10, -3, -1, 0] },
                              { stack: this.cuadroCanvas(this.datos.enfermedades.hta_induNo), alignment: 'center', width: '15%' },
                              { stack: this.cuadroCanvasColor(this.datos.enfermedades.hta_induSi), alignment: 'center', width: '15%' },
                              { text: ' ', style: 'center7', width: '15%' },
                              { text: ' ', style: 'center7', width: '15%' },
                            ]
                          },
                          {
                            marginTop: 1,
                            columns: [
                              { text: 'preeclampsia', style: 'center7', width: '40%', margin: [-10, 0, -1, 0] },
                              { stack: this.cuadroCanvas(this.datos.enfermedades.pre_eclaNo), alignment: 'center', width: '15%' },
                              { stack: this.cuadroCanvasColor(this.datos.enfermedades.pre_eclaSi), alignment: 'center', width: '15%' },
                              { text: ' ', style: 'center7', width: '15%' },
                              { text: ' ', style: 'center7', width: '15%' },
                            ]
                          },
                          {
                            marginTop: 1,
                            columns: [
                              { text: 'eclampsia', style: 'center7', width: '40%', margin: [-10, 0, -1, 0] },
                              { stack: this.cuadroCanvas(this.datos.enfermedades.eclampsiaNo), alignment: 'center', width: '15%' },
                              { stack: this.cuadroCanvasColor(this.datos.enfermedades.eclampsiaSi), alignment: 'center', width: '15%' },
                              { text: ' ', style: 'center7', width: '15%' },
                              { text: ' ', style: 'center7', width: '15%' },
                            ]
                          },
                          {
                            marginTop: 1,
                            columns: [
                              { text: 'cardiopatia', style: 'center7', width: '40%', margin: [-10, 0, -1, 0] },
                              { stack: this.cuadroCanvas(this.datos.enfermedades.cardioNo), alignment: 'center', width: '15%' },
                              { stack: this.cuadroCanvasColor(this.datos.enfermedades.cardioSi), alignment: 'center', width: '15%' },
                              { text: ' ', style: 'center7', width: '15%' },
                              { text: ' ', style: 'center7', width: '15%' },
                            ]
                          },
                          {
                            marginTop: 1,
                            columns: [
                              { text: 'nefropatia', style: 'center7', width: '40%', margin: [-10, 0, -1, 0] },
                              { stack: this.cuadroCanvas(this.datos.enfermedades.nefropatiaNo), alignment: 'center', width: '15%' },
                              { stack: this.cuadroCanvasColor(this.datos.enfermedades.nefropatiaSi), alignment: 'center', width: '15%' },
                              { text: ' ', style: 'center7', width: '15%' },
                              { text: ' ', style: 'center7', width: '15%' },
                            ]
                          },
                          {
                            marginTop: 1,
                            columns: [
                              { text: 'diabetes', style: 'center7', width: '40%', margin: [-10, 0, -1, 0] },
                              { stack: this.cuadroCanvas(this.datos.enfermedades.diabete1), alignment: 'center', width: '15%' },
                              { stack: this.cuadroCanvasI(this.datos.enfermedades.diabete2), alignment: 'center', width: '15%' },
                              { stack: this.cuadroCanvasII(this.datos.enfermedades.diabete3), alignment: 'center', width: '15%' },
                              { stack: this.cuadroCanvasIII(this.datos.enfermedades.diabete4), alignment: 'center', width: '15%' },

                            ]
                          },
                        ]
                      },
                      {
                        width: '25%',
                        stack: [
                          {
                            margin: [0, -3, 0, 0],
                            columns: [
                              { text: ' ', style: 'center7', width: '60%' },
                              { text: 'no', style: 'center7', width: '20%' },
                              { text: 'si', style: 'center7', width: '20%' },
                            ]
                          },
                          {
                            columns: [
                              { text: 'infec. ovular', style: 'center7', width: '60%', margin: [-5, 0, -1, 0] },
                              { stack: this.cuadroCanvas(this.datos.enfermedades.infe_ovuNo), alignment: 'center', width: '20%' },
                              { stack: this.cuadroCanvasColor(this.datos.enfermedades.infe_ovuSi), alignment: 'center', width: '20%' },
                            ]
                          },
                          {
                            columns: [
                              { text: 'infec. urinaria', style: 'center7', width: '60%', margin: [-10, 0, -1, 0] },
                              { stack: this.cuadroCanvas(this.datos.enfermedades.infe_uriNo), alignment: 'center', width: '20%' },
                              { stack: this.cuadroCanvasColor(this.datos.enfermedades.infe_uriSi), alignment: 'center', width: '20%' },
                            ]
                          },
                          {
                            columns: [
                              { text: 'amenaza parto preter', style: 'right7', width: '60%', margin: [-15, -3, 0, 0] },
                              { stack: this.cuadroCanvas(this.datos.enfermedades.amen_partNo), alignment: 'center', width: '20%' },
                              { stack: this.cuadroCanvasColor(this.datos.enfermedades.amen_partSi), alignment: 'center', width: '20%' },
                            ]
                          },
                          {
                            columns: [
                              { text: 'R.C.I.U', style: 'right7', width: '60%', margin: [-10, 0, 0, 0] },
                              { stack: this.cuadroCanvas(this.datos.enfermedades.rciuNo), alignment: 'center', width: '20%' },
                              { stack: this.cuadroCanvasColor(this.datos.enfermedades.rciuSi), alignment: 'center', width: '20%' },
                            ]
                          },
                          {
                            columns: [
                              { text: 'rutura prem. de membranas', style: 'right7', width: '60%', margin: [-15, -3, 0, 0] },
                              { stack: this.cuadroCanvas(this.datos.enfermedades.rotuPremNo), alignment: 'center', width: '20%' },
                              { stack: this.cuadroCanvasColor(this.datos.enfermedades.rotuPremSi), alignment: 'center', width: '20%' },
                            ]
                          },
                          {
                            columns: [
                              { text: 'anemia', style: 'right7', width: '60%', margin: [-10, 0, 0, 0] },
                              { stack: this.cuadroCanvas(this.datos.enfermedades.anemiaNo), alignment: 'center', width: '20%' },
                              { stack: this.cuadroCanvasColor(this.datos.enfermedades.anemiaSi), alignment: 'center', width: '20%' },
                            ]
                          },
                          {
                            columns: [
                              { text: 'otra cond grave', style: 'right7', width: '60%', margin: [-10, -3, 0, 0] },
                              { stack: this.cuadroCanvas(this.datos.enfermedades.otraCondNo), alignment: 'center', width: '20%' },
                              { stack: this.cuadroCanvasColor(this.datos.enfermedades.otraCondSi), alignment: 'center', width: '20%' },
                            ]
                          },
                        ]
                      },
                      {
                        width: '40%',
                        stack: [
                          {
                            columns: [
                              { image: this.writeRotatedText2(1, 'HEMORRAGIA'), fit: [20, 90], margin: [-3, -30, 0, 0], width: '1%' },
                              {
                                width: '40%',
                                stack: [
                                  { text: ' ', style: 'center7' },
                                  { text: '1er trim.', style: 'right7' },
                                  { text: '2do trim.', style: 'right7', marginTop: 2 },
                                  { text: '3er trim.', style: 'right7', marginTop: 2 },
                                  { text: 'posparto', style: 'right7', marginTop: 2 },
                                  { text: 'infeccion puerperal', style: 'right7', marginTop: 2 },
                                ]
                              },
                              {
                                width: '13%',
                                stack: [
                                  { text: 'no', style: 'center7' },
                                  { stack: this.cuadroCanvas(this.datos.enfermedades.primerTrimNo), alignment: 'center' },
                                  { stack: this.cuadroCanvas(this.datos.enfermedades.segundoTrimNo), alignment: 'center' },
                                  { stack: this.cuadroCanvas(this.datos.enfermedades.tercerTrimNo), alignment: 'center' },
                                  { stack: this.cuadroCanvas(this.datos.enfermedades.postrParNo), alignment: 'center' },
                                  { stack: this.cuadroCanvas(this.datos.enfermedades.infPuerNo), alignment: 'center' },
                                ]
                              },
                              {
                                width: '13%',
                                stack: [
                                  { text: 'si', style: 'center7' },
                                  { stack: this.cuadroCanvasColor(this.datos.enfermedades.primerTrimSi), alignment: 'center' },
                                  { stack: this.cuadroCanvasColor(this.datos.enfermedades.segundoTrimSi), alignment: 'center' },
                                  { stack: this.cuadroCanvasColor(this.datos.enfermedades.tercerTrimSi), alignment: 'center' },
                                  { stack: this.cuadroCanvasColor(this.datos.enfermedades.postrParSi), alignment: 'center' },
                                  { stack: this.cuadroCanvasColor(this.datos.enfermedades.infPuerSi), alignment: 'center' },
                                ]
                              },
                              {
                                width: '29%',
                                stack: [
                                  { text: 'codigo', style: 'center7', margin: [0, 0, -5, 0] },
                                  {
                                    margin: [2, 2, -5, 0,],
                                    table: {
                                      widths: ['20%', '20%', '20%', '20%'],
                                      body: [
                                        [
                                          { text: this.datos.enfermedades.codigo1.slice(0, 1), style: 'center7', fillColor: 'yellow' },
                                          { text: this.datos.enfermedades.codigo1.slice(1, 2), style: 'center7', fillColor: 'yellow' },
                                          { text: this.datos.enfermedades.codigo1.slice(2, 3), style: 'center7', fillColor: 'yellow' },
                                          { text: this.datos.enfermedades.codigo1.slice(3, 4), style: 'center7', fillColor: 'yellow' },
                                        ]
                                      ]
                                    }
                                  },
                                  {
                                    margin: [2, 2, -5, 0,],
                                    table: {
                                      widths: ['20%', '20%', '20%', '20%'],
                                      body: [
                                        [
                                          { text: this.datos.enfermedades.codigo2.slice(0, 1), style: 'center7', fillColor: 'yellow' },
                                          { text: this.datos.enfermedades.codigo2.slice(1, 2), style: 'center7', fillColor: 'yellow' },
                                          { text: this.datos.enfermedades.codigo2.slice(2, 3), style: 'center7', fillColor: 'yellow' },
                                          { text: this.datos.enfermedades.codigo2.slice(3, 4), style: 'center7', fillColor: 'yellow' },
                                        ]
                                      ]
                                    }
                                  },
                                  {
                                    margin: [2, 2, -5, 0,],
                                    table: {
                                      widths: ['20%', '20%', '20%', '20%'],
                                      body: [
                                        [
                                          { text: this.datos.enfermedades.codigo3.slice(0, 1), style: 'center7', fillColor: 'yellow' },
                                          { text: this.datos.enfermedades.codigo3.slice(1, 2), style: 'center7', fillColor: 'yellow' },
                                          { text: this.datos.enfermedades.codigo3.slice(2, 3), style: 'center7', fillColor: 'yellow' },
                                          { text: this.datos.enfermedades.codigo3.slice(3, 4), style: 'center7', fillColor: 'yellow' },
                                        ]
                                      ]
                                    }
                                  }
                                ]
                              },
                            ]
                          },
                          {
                            margin: [5, 0, -5, 0],
                            table: {
                              widths: ['100%'],
                              body: [
                                [
                                  {
                                    stack: [
                                      { text: 'notas', style: 'left7', margin: [-2, -2, -2, 0] },
                                      { text: this.datos.enfermedades.notasEnf, style: 'left6' }
                                    ]
                                  }
                                ]
                              ]
                            }
                          }
                        ]
                      },
                    ]
                  }
                ]
              ]
            },
            width: '40%',
          },
        ]
      },
      {
        columns: [
          {
            table: {
              widths: ['100%'],
              body: [
                [
                  {
                    stack: [
                      {
                        margin: [-3, -1, -3, 0],
                        columns: [
                          { text: 'NACIMIENTO', style: 'left7Bold', width: '70%' },
                          { text: 'VIVO', style: 'left7', width: '15%' },
                          { stack: this.cuadroCanvas(this.datos.nacimiento.vivo), alignment: 'center', width: '15%' },
                        ]
                      },
                      {
                        margin: [-3, -2, -3, 0],
                        columns: [
                          { text: 'MUERTO', style: 'left7', width: '70%' },
                          { text: 'ignora', style: 'left7', width: '30%' },
                        ]
                      },
                      {
                        margin: [-3, -1, -3, 0],
                        columns: [
                          { text: 'anteparto', style: 'left7', width: '25%', margin: [-2, 0, -2, 0] },
                          { stack: this.cuadroCanvasColor(this.datos.nacimiento.anteParto), alignment: 'center', width: '10%' },
                          { text: 'parto', style: 'left7', width: '15%' },
                          { stack: this.cuadroCanvasColor(this.datos.nacimiento.muerto), alignment: 'center', width: '10%' },
                          { text: 'momento', style: 'left7', width: '30%' },
                          { stack: this.cuadroCanvasColor(this.datos.nacimiento.ignor), alignment: 'center', width: '10%' },
                        ]
                      }
                    ]
                  }
                ]
              ]
            },
            width: '20%'
          },
          {
            table: {
              widths: ['100%'],
              body: [
                [
                  {
                    columns: [
                      {
                        stack: [
                          {
                            margin: [1, 3, 10, 3],
                            table: {
                              widths: ['50%', '50%'],
                              body: [
                                [
                                  {
                                    border: [true, true, false, true],
                                    stack: [
                                      { text: 'hora', style: 'center7', margin: [-3, -2, -3, 0] },
                                      { text: this.datos.nacimiento.fecha.hora.slice(0, 1) + '  ' + this.datos.nacimiento.fecha.hora.slice(1, 2), style: 'center7', margin: [0, 0, 0, -2] }
                                    ]
                                  },
                                  {
                                    border: [false, true, true, true],
                                    stack: [
                                      { text: 'min', style: 'center7', margin: [0, -2, 0, 0] },
                                      { text: this.datos.nacimiento.fecha.min.slice(0, 1) + '  ' + this.datos.nacimiento.fecha.min.slice(1, 2), style: 'center7', margin: [0, 0, 0, -2] }
                                    ]
                                  },
                                ]
                              ]
                            }
                          },
                          { canvas: [{ type: 'line', x1: 11, y1: -3, x2: 11, y2: -8 }] },
                          { canvas: [{ type: 'line', x1: 22, y1: -3, x2: 22, y2: -12 }] },
                          { canvas: [{ type: 'line', x1: 22, y1: -15, x2: 22, y2: -20 }] },
                          { canvas: [{ type: 'line', x1: 33, y1: -3, x2: 33, y2: -8 }] },
                        ]
                      },
                      {
                        stack: [
                          {
                            margin: [0, 3, 0, 0],
                            table: {
                              widths: ['30%', '30%', '40%'],
                              body: [
                                [
                                  {
                                    border: [true, true, false, true],
                                    stack: [
                                      { text: 'dia', style: 'center7', margin: [-5, -2, -5, 0] },
                                      { text: this.datos.nacimiento.fecha.dia.slice(0, 1) + '  ' + this.datos.nacimiento.fecha.dia.slice(1, 2), style: 'center7', margin: [-5, 0, -5, -2] }
                                    ]
                                  },
                                  {
                                    border: [false, true, false, true],
                                    stack: [
                                      { text: 'mes', style: 'center7', margin: [-5, -2, -5, 0] },
                                      { text: this.datos.nacimiento.fecha.mes.slice(0, 1) + '  ' + this.datos.nacimiento.fecha.mes.slice(1, 2), style: 'center7', margin: [-5, 0, -5, -2] }
                                    ]
                                  },
                                  {
                                    border: [false, true, true, true],
                                    stack: [
                                      { text: 'año', style: 'center7', margin: [-5, -2, -5, 0] },
                                      { text: this.datos.nacimiento.fecha.año.slice(0, 2) + '  ' + this.datos.nacimiento.fecha.año.slice(2, 4), style: 'center7', margin: [-5, 0, -5, -2] }
                                    ]
                                  },
                                ]
                              ]
                            }
                          },
                          { canvas: [{ type: 'line', x1: 9, y1: 0, x2: 9, y2: -5 }] },
                          { canvas: [{ type: 'line', x1: 16, y1: 0, x2: 16, y2: -9 }] },
                          { canvas: [{ type: 'line', x1: 16, y1: -12, x2: 16, y2: -18 }] },
                          { canvas: [{ type: 'line', x1: 25, y1: 0, x2: 25, y2: -5 }] },
                          { canvas: [{ type: 'line', x1: 33, y1: 0, x2: 33, y2: -9 }] },
                          { canvas: [{ type: 'line', x1: 33, y1: -12, x2: 33, y2: -18 }] },
                          { canvas: [{ type: 'line', x1: 44, y1: 0, x2: 44, y2: -5 }] },
                        ]
                      },
                    ]
                  }
                ]
              ]
            },
            width: '20%'
          },
          {
            table: {
              widths: ['100%'],
              body: [
                [
                  {
                    stack: [
                      { text: 'MULTIPLE orden', style: 'left7', margin: [-3, -2, -3, 0] },
                      {
                        columns: [
                          {
                            stack: [
                              {
                                columns: [
                                  { text: 'no', style: 'center7' },
                                  { text: 'si', style: 'center7' },
                                ]
                              },
                              {
                                columns: [
                                  { stack: this.cuadroCanvas(this.datos.nacimiento.multipFetosNo), alignment: 'center' },
                                  { stack: this.cuadroCanvasColor(this.datos.nacimiento.multipFetosSi), alignment: 'center' },
                                ]
                              }
                            ]
                          },
                          {
                            margin: [3, 4, 3, 0],
                            table: {
                              widths: ['100%'],
                              body: [
                                [
                                  { text: this.datos.nacimiento.multipFetosOrdenMul, style: 'center7', fillColor: 'yellow', margin: [-3, -1, -3, 0] }
                                ]
                              ]
                            }
                          },
                        ]
                      },
                    ]
                  }
                ]
              ]
            },
            width: '10%'
          },
          {
            table: {
              widths: ['100%'],
              body: [
                [
                  {
                    stack: [
                      { text: 'TERMINACION', style: 'left7', margin: [-3, -2, -3, 0] },
                      {
                        marginTop: -2,
                        columns: [
                          { text: 'espont.', style: 'left7', width: '25%' },
                          { stack: this.cuadroCanvas(this.datos.nacimiento.termin_part1), alignment: 'center', width: '15%' },
                          { text: 'cesárea', style: 'left7', width: '25%' },
                          { stack: this.cuadroCanvasColor(this.datos.nacimiento.termin_part2), alignment: 'center', width: '15%' },
                          { text: 'otra', style: 'center7', width: '20%' },
                        ]
                      },
                      {
                        columns: [
                          { text: 'forceps', style: 'left7', width: '25%' },
                          { stack: this.cuadroCanvasColor(this.datos.nacimiento.termin_part3), alignment: 'center', width: '15%' },
                          { text: 'vacuum', style: 'left7', width: '25%' },
                          { stack: this.cuadroCanvasColor(this.datos.nacimiento.termin_part4), alignment: 'center', width: '15%' },
                          { stack: this.cuadroCanvasColor(this.datos.nacimiento.termin_part5), alignment: 'center', width: '20%' },
                        ]
                      },
                    ]
                  }
                ]
              ]
            },
            width: '20%'
          },
          {
            table: {
              widths: ['100%'],
              body: [
                [
                  {
                    stack: [
                      { text: 'INDICACION PRINCIPAL DE INDUCCION O PARTO OPERATORIO', style: 'left7', margin: [-3, -3, -3, 0] },
                      { text: this.datos.nacimiento.ind_prinInduc, style: 'left6', margin: [-3, 3.5, -3, 0] }
                    ]
                  }
                ]
              ]
            },
            width: '30%'
          },
        ]
      },
      {
        columns: [
          {
            table: {
              widths: ['11%', '2%', '5%', '12%', '10%', '8%', '2%', '32%', '18%'],
              body: [
                [
                  {
                    margin: [0, 0, 0, -5],
                    border: [true, false, true, true],
                    table: {
                      widths: ['45%', '5%', '50%'],
                      body: [
                        [
                          { text: 'POSICION PARTO', style: 'left7', margin: [-8, -5, -8, 0], colSpan: 3, border: [false, false, false, false] },
                          {},
                          {},
                        ],
                        [
                          { text: 'sentada', style: 'left7', margin: [-9, -5, -5, 0], border: [false, false, false, false] },
                          { stack: this.cuadroCanvas(this.datos.posicion_parto.sentada), alignment: 'center', margin: [0, -5, 0, 0], border: [false, false, false, false] },
                          { text: 'acostada', style: 'left7', margin: [-5, -5, -12, 0], border: [false, false, false, false] },
                        ],
                        [
                          { text: 'cunclillas', style: 'left7', margin: [-9, -5, -9, 0], border: [false, false, false, false] },
                          { stack: this.cuadroCanvas(this.datos.posicion_parto.conclillas), alignment: 'center', margin: [0, -5, 0, 0], border: [false, false, false, false] },
                          { stack: this.cuadroCanvas(this.datos.posicion_parto.acostada), alignment: 'center', margin: [0, -5, 0, 0], border: [false, false, false, false] },
                        ],
                      ]
                    }
                  },
                  {
                    margin: [0, 0, 0, -5],
                    columns: [
                      { image: this.writeRotatedText2(1, 'EPISIOTONOMIA'), fit: [80, 50], margin: [-6, -17, 0, 0], width: '25%' },
                      {
                        margin: [0, -5, 0, 0],
                        stack: [
                          { text: 'no', style: 'left7' },
                          { stack: this.cuadroCanvas(this.datos.episiotomiaNo), alignment: 'center' },
                          { text: 'si', style: 'left7' },
                          { stack: this.cuadroCanvas(this.datos.episiotomiaSi), alignment: 'center' },
                        ]
                      },
                    ]
                  },
                  {
                    margin: [0, 0, 0, -5],
                    border: [false, false, true, true],
                    table: {
                      widths: ['33%', '33%', '34%'],
                      body: [
                        [
                          { text: 'DESGARROS Grado(1a4)', style: 'left6', margin: [-9, -5, -11, 0], colSpan: 3, border: [false, false, false, false] },
                          {},
                          {},
                        ],
                        [
                          { text: 'no', style: 'left7', margin: [-8, -3, -2, 0], border: [false, false, false, false] },
                          { stack: this.cuadroCanvas(this.datos.desgarrosNo), alignment: 'center', margin: [-8, -3, -2, 0], border: [false, false, false, false] },
                          { text: this.datos.gradoDesg, style: 'center7', margin: [-4, -2, -4, 0], fillColor: 'yellow' },
                        ]
                      ]
                    }
                  },
                  {
                    border: [false, false, true, true],
                    margin: [0, -5, 0, -5],
                    table: {
                      widths: ['25%', '25%', '25%', '25%'],
                      body: [
                        [
                          { text: 'OCITOCICOS', style: 'left7', colSpan: 4, border: [false, false, false, false] },
                          {},
                          {},
                          {},
                        ],
                        [
                          { text: 'prealumbr', style: 'left6', margin: [-7, -5, -3, 0], colSpan: 2, border: [false, false, false, false] },
                          {},
                          { text: 'postalumbr', style: 'left6', margin: [-6, -5, -15, 0], colSpan: 2, border: [false, false, false, false] },
                          {},
                        ],
                        [
                          { text: 'no', style: 'left7', margin: [-2, -7, -3, 0], border: [false, false, false, false] },
                          { text: 'si', style: 'left7', margin: [-2, -7, -3, 0], border: [false, false, false, false] },
                          { text: 'no', style: 'left7', margin: [-2, -7, -3, 0], border: [false, false, false, false] },
                          { text: 'si', style: 'left7', margin: [-2, -7, -3, 0], border: [false, false, false, false] },
                        ],
                        [
                          { stack: this.cuadroCanvas(this.datos.prelumbNo), alignment: 'center', margin: [0, -5, 0, 0], border: [false, false, false, false] },
                          { stack: this.cuadroCanvas(this.datos.prelumbSi), alignment: 'center', margin: [0, -5, 0, 0], border: [false, false, false, false] },
                          { stack: this.cuadroCanvasColor(this.datos.postlumbNo), alignment: 'center', margin: [0, -5, 0, 0], border: [false, false, false, false] },
                          { stack: this.cuadroCanvas(this.datos.postlumbSi), alignment: 'center', margin: [0, -5, 0, 0], border: [false, false, false, false] },
                        ],
                      ]
                    }
                  },
                  {
                    margin: [0, 0, 0, -5],
                    border: [false, false, true, true],
                    table: {
                      widths: ['70%', '15%', '15%'],
                      body: [
                        [
                          { text: 'PLACENTA', style: 'left7', margin: [-8, -5, -11, 0], border: [false, false, false, false] },
                          { text: 'no', style: 'left7', margin: [3, -5, -10, 0], border: [false, false, false, false] },
                          { text: 'si', style: 'left7', margin: [3, -5, -10, 0], border: [false, false, false, false] },
                        ],
                        [
                          { text: 'COMPLETA', style: 'left7', margin: [-9, -3, -12, 0], border: [false, false, false, false] },
                          { stack: this.cuadroCanvasColor(this.datos.placenta.completaNo), alignment: 'center', margin: [9, -5, 0, 0], border: [false, false, false, false] },
                          { stack: this.cuadroCanvas(this.datos.placenta.completaSi), alignment: 'center', margin: [9, -5, 0, 0], border: [false, false, false, false] },
                        ],
                        [
                          { text: 'RETENIDA', style: 'left7', margin: [-8, -5, -10, 0], border: [false, false, false, false] },
                          { stack: this.cuadroCanvas(this.datos.placenta.retenidaNo), alignment: 'center', margin: [9, -5, 0, 0], border: [false, false, false, false] },
                          { stack: this.cuadroCanvasColor(this.datos.placenta.retenidaSi), alignment: 'center', margin: [9, -5, 0, 0], border: [false, false, false, false] },
                        ],
                      ]
                    }
                  },
                  {
                    margin: [0, 0, 0, -5],
                    border: [false, false, true, true],
                    table: {
                      widths: ['25%', '25%', '25%', '25%'],
                      body: [
                        [
                          { text: 'LIGADURA CORDON', style: 'center7', margin: [-5, -6, -5, 0], colSpan: 4, border: [false, false, false, false] },
                          {},
                          {},
                          {},
                        ],
                        [
                          { text: 'precoz', style: 'center7', margin: [-5, -6, -5, 0], colSpan: 4, border: [false, false, false, false] },
                          {},
                          {},
                          {},
                        ],
                        [
                          { text: 'no', style: 'left7', margin: [-5, -4, -2, 0], border: [false, false, false, false] },
                          { stack: this.cuadroCanvas(this.datos.ligad_cordonNo), alignment: 'center', margin: [0, -4, 0, 0], border: [false, false, false, false] },
                          { text: 'si', style: 'left7', margin: [-2, -4, -3, 0], border: [false, false, false, false] },
                          { stack: this.cuadroCanvasColor(this.datos.ligad_cordonSi), alignment: 'center', margin: [0, -4, 0, 0], border: [false, false, false, false] },
                        ],
                      ]
                    }
                  },
                  { image: this.writeRotatedText2(2, 'MEDICACION', 'RECIBIDA'), fit: [80, 60], margin: [-3, -28, 0, -5], border: [true, false, false, true] },
                  {
                    border: [false, false, true, true],
                    margin: [0, -3, 0, -5],
                    table: {
                      widths: ['7%', '7%', '7%', '7%', '7%', '7%', '7%', '7%', '7%', '7%', '7%', '7%', '7%', '7%'],
                      body: [
                        [
                          { text: 'OCITOCICOS en TDP', style: 'left6', margin: [-12, -3, -8, 0], colSpan: 2, border: [false, false, false, false] },
                          {},
                          { text: 'antibiot', style: 'left6', margin: [3, -3, -15, 0], colSpan: 2, border: [false, false, false, false] },
                          {},
                          { text: 'analgesia', style: 'left6', margin: [5, -3, -8, 0], colSpan: 2, border: [false, false, false, false] },
                          {},
                          { text: 'anest local', style: 'center7', margin: [-3, -3, -10, 0], colSpan: 2, border: [false, false, false, false] },
                          {},
                          { text: 'anest regional', style: 'center7', margin: [-7, -3, -15, 0], colSpan: 2, border: [false, false, false, false] },
                          {},
                          { text: 'anest gral', style: 'center7', margin: [-3, -3, -10, 0], colSpan: 2, border: [false, false, false, false] },
                          {},
                          { text: 'transfusion', style: 'center7', margin: [0, -3, -10, 0], colSpan: 2, border: [false, false, false, false] },
                          {},
                        ],
                        [
                          { text: 'no', style: 'center7', margin: [-3, -5, -3, 0], border: [false, false, false, false] },
                          { stack: this.cuadroCanvas(this.datos.medicacion_recb.ociotoNo), alignment: 'center', margin: [0, -5, 0, 0], border: [false, false, false, false] },
                          { text: 'no', style: 'center7', margin: [-3, -5, -3, 0], border: [false, false, false, false] },
                          { stack: this.cuadroCanvas(this.datos.medicacion_recb.antibNo), alignment: 'center', margin: [0, -5, 0, 0], border: [false, false, false, false] },
                          { text: 'no', style: 'center7', margin: [-3, -5, -3, 0], border: [false, false, false, false] },
                          { stack: this.cuadroCanvas(this.datos.medicacion_recb.analgNo), alignment: 'center', margin: [0, -5, 0, 0], border: [false, false, false, false] },
                          { text: 'no', style: 'center7', margin: [-3, -5, -3, 0], border: [false, false, false, false] },
                          { stack: this.cuadroCanvas(this.datos.medicacion_recb.anestNo), alignment: 'center', margin: [0, -5, 0, 0], border: [false, false, false, false] },
                          { text: 'no', style: 'center7', margin: [-3, -5, -3, 0], border: [false, false, false, false] },
                          { stack: this.cuadroCanvas(this.datos.medicacion_recb.anestRegiNo), alignment: 'center', margin: [0, -5, 0, 0], border: [false, false, false, false] },
                          { text: 'no', style: 'center7', margin: [-3, -5, -3, 0], border: [false, false, false, false] },
                          { stack: this.cuadroCanvas(this.datos.medicacion_recb.anestTotNo), alignment: 'center', margin: [0, -5, 0, 0], border: [false, false, false, false] },
                          { text: 'no', style: 'center7', margin: [-3, -5, -3, 0], border: [false, false, false, false] },
                          { stack: this.cuadroCanvas(this.datos.medicacion_recb.transfNo), alignment: 'center', margin: [0, -5, 0, 0], border: [false, false, false, false] },
                        ],
                        [
                          { text: 'si', style: 'center7', margin: [-3, -5, -3, 0], border: [false, false, false, false] },
                          { stack: this.cuadroCanvasColor(this.datos.medicacion_recb.ociotoSi), alignment: 'center', margin: [0, -5, 0, 0], border: [false, false, false, false] },
                          { text: 'si', style: 'center7', margin: [-3, -5, -3, 0], border: [false, false, false, false] },
                          { stack: this.cuadroCanvasColor(this.datos.medicacion_recb.antibSi), alignment: 'center', margin: [0, -5, 0, 0], border: [false, false, false, false] },
                          { text: 'si', style: 'center7', margin: [-3, -5, -3, 0], border: [false, false, false, false] },
                          { stack: this.cuadroCanvasColor(this.datos.medicacion_recb.analgSi), alignment: 'center', margin: [0, -5, 0, 0], border: [false, false, false, false] },
                          { text: 'si', style: 'center7', margin: [-3, -5, -3, 0], border: [false, false, false, false] },
                          { stack: this.cuadroCanvasColor(this.datos.medicacion_recb.anestSi), alignment: 'center', margin: [0, -5, 0, 0], border: [false, false, false, false] },
                          { text: 'si', style: 'center7', margin: [-3, -5, -3, 0], border: [false, false, false, false] },
                          { stack: this.cuadroCanvasColor(this.datos.medicacion_recb.anestRegiSi), alignment: 'center', margin: [0, -5, 0, 0], border: [false, false, false, false] },
                          { text: 'si', style: 'center7', margin: [-3, -5, -3, 0], border: [false, false, false, false] },
                          { stack: this.cuadroCanvasColor(this.datos.medicacion_recb.anestTotSi), alignment: 'center', margin: [0, -5, 0, 0], border: [false, false, false, false] },
                          { text: 'si', style: 'center7', margin: [-3, -5, -3, 0], border: [false, false, false, false] },
                          { stack: this.cuadroCanvasColor(this.datos.medicacion_recb.transfSi), alignment: 'center', margin: [0, -5, 0, 0], border: [false, false, false, false] },
                        ]
                      ]
                    }
                  },
                  {
                    border: [false, false, true, true],
                    margin: [0, -5, 0, -5],
                    table: {
                      widths: ['100%'],
                      body: [
                        [
                          { text: 'Otros:', style: 'left7', border: [false, false, false, false] },
                        ],
                        [
                          { text: this.datos.medicacion_recb.med_otros, style: 'left7', margin: [-5, -5, -5, 0], border: [false, false, false, false] },
                        ],
                      ]
                    }
                  },
                ],
              ]
            }
          }
        ]
      },
      {
        columns: [
          {
            width: '50%',
            stack: [
              {
                columns: [
                  {
                    width: '30%',
                    stack: [
                      {
                        table: {
                          widths: ['100%'],
                          body: [
                            [
                              { text: 'RECIEN NACIDO', style: 'left7', color: '#FFFFFF', fillColor: '#7A7A7A', border: [true, true, true, false] }
                            ]
                          ]
                        },
                      },
                      {
                        columns: [
                          {
                            table: {
                              widths: ['100%'],
                              body: [
                                [
                                  {
                                    margin: [0, -3, 0, -3],
                                    border: [true, false, true, true],
                                    stack: [
                                      { text: 'SEXO', style: 'center7' },
                                      {
                                        columns: [
                                          { text: 'F', style: 'center7' },
                                          { text: 'M', style: 'center7' },
                                        ]
                                      },
                                      {
                                        columns: [
                                          { stack: this.cuadroCanvas(this.datos.sexo.femen), alignment: 'center' },
                                          { stack: this.cuadroCanvas(this.datos.sexo.mascul), alignment: 'center' },
                                        ]
                                      },
                                      {
                                        columns: [
                                          { text: 'no definido', style: 'right7', width: '80%', margin: [-5, 0, 2, 0] },
                                          { stack: this.cuadroCanvasColor(this.datos.sexo.nodefinido), alignment: 'center', width: '20%', margin: [0, 3, -2, 0] }
                                        ]
                                      }
                                    ]
                                  }
                                ]
                              ]
                            },
                            width: '50%'
                          },
                          {
                            table: {
                              widths: ['100%'],
                              body: [
                                [
                                  {
                                    margin: [0, 0, 0, -2],
                                    border: [false, false, true, true],
                                    stack: [
                                      { text: 'PESO AL NACER', style: 'center6', margin: [-10, -2.5, -10, 0] },
                                      {
                                        table: {
                                          widths: ['20%', '20%', '20%', '20%'],
                                          body: [
                                            [
                                              { text: this.datos.pesoAlNacer.slice(0, 1), style: 'center7' },
                                              { text: this.datos.pesoAlNacer.slice(1, 2), style: 'center7' },
                                              { text: this.datos.pesoAlNacer.slice(2, 3), style: 'center7' },
                                              { text: this.datos.pesoAlNacer.slice(3, 4), style: 'center7' },
                                            ]
                                          ]
                                        }
                                      },
                                      {
                                        columns: [
                                          { text: '>=4000g', style: 'center7', width: '80%', margin: [-5, 0, -5, 0] },
                                          { stack: this.cuadroCanvasColor(this.datos.recPesoMay4000), alignment: 'center', width: '20%' }
                                        ]
                                      },
                                      {
                                        columns: [
                                          { text: '<2500g', style: 'center7', width: '80%', margin: [-5, 0, 0, 0] },
                                          { stack: this.cuadroCanvasColor(this.datos.recPesoMenor2500), alignment: 'center', width: '20%' }
                                        ]
                                      }
                                    ]
                                  }
                                ]
                              ]
                            },
                            width: '50%'
                          },
                        ]
                      }
                    ]
                  },
                  {
                    width: '20%',
                    stack: [
                      {
                        table: {
                          widths: ['100%'],
                          body: [
                            [
                              {
                                stack: [
                                  { text: 'P.CEFALICO cm', style: 'center7', margin: [-5, 0, -5, 0] },
                                  {
                                    table: {
                                      widths: ['33%', '33%', '33%'],
                                      body: [
                                        [
                                          { text: this.datos.recPercef.slice(0, 1), style: 'center7' },
                                          { text: this.datos.recPercef.slice(1, 2), style: 'center7' },
                                          { text: this.datos.recPercef.slice(3, 4), style: 'center7' },
                                        ]
                                      ]
                                    }
                                  }
                                ]
                              }
                            ]
                          ]
                        }
                      },
                      {
                        table: {
                          widths: ['100%'],
                          body: [
                            [
                              {
                                border: [true, false, true, true],
                                stack: [
                                  { text: 'LONGITUD cm', style: 'center7', margin: [-5, 0, -5, 0] },
                                  {
                                    table: {
                                      widths: ['33%', '33%', '33%'],
                                      body: [
                                        [
                                          { text: this.datos.recLongit.slice(0, 1), style: 'center7' },
                                          { text: this.datos.recLongit.slice(1, 2), style: 'center7' },
                                          { text: this.datos.recLongit.slice(2, 3), style: 'center7' },
                                        ]
                                      ]
                                    }
                                  }
                                ]
                              }
                            ]
                          ]
                        }
                      },
                    ]
                  },
                  {
                    table: {
                      widths: ['100%'],
                      body: [
                        [
                          {
                            stack: [
                              { text: 'EDAD GESTACIONAL', style: 'center7', margin: [-5, 0, -5, 0] },
                              {
                                columns: [
                                  { text: 'sem', style: 'center7' },
                                  { text: 'dias', style: 'center7' },
                                  { text: 'FUM', style: 'center7' },
                                ]
                              },
                              {
                                columns: [
                                  {
                                    margin: [0, 0, 5, 0],
                                    width: '75%',
                                    table: {
                                      widths: ['33%', '33%', '1%', '33%'],
                                      body: [
                                        [
                                          { text: this.datos.confSem.slice(0, 1), style: 'center7' },
                                          { text: this.datos.confSem.slice(1, 2), style: 'center7' },
                                          { text: '', style: 'center7', border: [false] },
                                          { text: this.datos.confDia, style: 'center7' },
                                        ]
                                      ]
                                    }
                                  },
                                  { stack: this.cuadroCanvas(this.datos.fumEcoRn1), alignment: 'center', width: '25%' }
                                ]
                              },
                              {
                                marginTop: 2,
                                columns: [
                                  { stack: this.cuadroCanvasColor(), alignment: 'center', width: '15%' },
                                  { text: 'ESTIMADA', style: 'center7', width: '50%', margin: [0, 0, -5, 0] },
                                  {
                                    margin: [0, 0, -10, 0],
                                    stack: [
                                      { text: 'ECO', style: 'center7' },
                                      { stack: this.cuadroCanvas(this.datos.fumEcoRn2), alignment: 'center', width: '35%' },
                                    ]
                                  }
                                ]
                              }
                            ]
                          }
                        ]
                      ]
                    },
                    width: '26%',
                  },
                  {
                    table: {
                      widths: ['100%'],
                      body: [
                        [
                          {
                            stack: [
                              { text: 'PESO (EG)', style: 'center7' },
                              {
                                marginTop: 2,
                                columns: [
                                  { text: 'adec.', style: 'center7', width: '80%', margin: [-5, 0, 0, 0] },
                                  { stack: this.cuadroCanvas(this.datos.pesoEg1), alignment: 'center', width: '20%' },
                                ]
                              },
                              {
                                marginTop: 1.5,
                                columns: [
                                  { text: 'peq.', style: 'center7', width: '80%', margin: [-5, 0, 0, 0] },
                                  { stack: this.cuadroCanvasColor(this.datos.pesoEg2), alignment: 'center', width: '20%' },
                                ]
                              },
                              {
                                marginTop: 1,
                                columns: [
                                  { text: 'gde.', style: 'center7', width: '80%', margin: [-5, 0, 0, 0] },
                                  { stack: this.cuadroCanvasColor(this.datos.pesoEg3), alignment: 'center', width: '20%' },
                                ]
                              },
                            ]
                          }
                        ]
                      ]
                    },
                    width: '12%',
                  },
                  {
                    table: {
                      widths: ['100%'],
                      body: [
                        [
                          {
                            stack: [
                              { text: 'APGAR (MIN)', style: 'center7', width: '30%' },
                              {
                                width: '70%',
                                columns: [
                                  { text: '1er', style: 'center7', margin: [-8, 0, 0, 0] },
                                  {
                                    margin: [-3, 3, -2, 0],
                                    table: {
                                      widths: ['50%', '50%'],
                                      body: [
                                        [
                                          { text: this.datos.apgar1erMin.slice(0, 1), style: 'center7' },
                                          { text: this.datos.apgar1erMin.slice(1, 2), style: 'center7' },
                                        ]
                                      ]
                                    }
                                  },
                                ]
                              },
                              {
                                width: '70%',
                                columns: [
                                  { text: '5to', style: 'center7', margin: [-8, 0, 0, 0] },
                                  {
                                    margin: [-3, 3, -2, 0],
                                    table: {
                                      widths: ['50%', '50%'],
                                      body: [
                                        [
                                          { text: this.datos.apgar5toMin.slice(0, 1), style: 'center7' },
                                          { text: this.datos.apgar5toMin.slice(1, 2), style: 'center7' },
                                        ]
                                      ]
                                    }
                                  },
                                ]
                              },
                            ]
                          },
                        ]
                      ]
                    },
                    width: '12%',
                  },
                ]
              },
              {
                columns: [
                  {
                    table: {
                      widths: ['100%'],
                      body: [
                        [
                          {
                            margin: [0, -2, 0, 0],
                            stack: [
                              { text: 'DEFECTOS CONGENITOS', style: 'left7' },
                              {
                                columns: [
                                  { stack: this.cuadroCanvas(this.datos.defecCongenitos.no), alignment: 'center', width: '20%', margin: [-4, 0, 0, 0] },
                                  { text: 'no', style: 'left7', width: '30%' },
                                  {
                                    width: '50%',
                                    stack: [
                                      {
                                        columns: [
                                          { stack: this.cuadroCanvasColor(this.datos.defecCongenitos.menor), alignment: 'center', width: '50%', margin: [-8, 0, 0, 0] },
                                          { text: 'menor', style: 'left7', width: '50%', margin: [-4, 0, -6, 0] },
                                        ]
                                      },
                                      {
                                        marginTop: 2,
                                        columns: [
                                          { stack: this.cuadroCanvasColor(this.datos.defecCongenitos.menor), alignment: 'center', width: '50%', margin: [-8, 0, 0, 0] },
                                          { text: 'mayor', style: 'left7', width: '50%', margin: [-4, 0, -6, 0] },
                                        ]
                                      },
                                    ]
                                  },
                                ]
                              },
                              {
                                marginTop: 5,
                                table: {
                                  widths: ['20%', '20%', '20%', '20%'],
                                  body: [
                                    [
                                      { text: this.datos.defecCongenitos.codDefCongen.slice(0, 1), style: 'center7', fillColor: 'yellow' },
                                      { text: this.datos.defecCongenitos.codDefCongen.slice(1, 2), style: 'center7', fillColor: 'yellow' },
                                      { text: this.datos.defecCongenitos.codDefCongen.slice(2, 3), style: 'center7', fillColor: 'yellow' },
                                      { text: this.datos.defecCongenitos.codDefCongen.slice(3, 4), style: 'center7', fillColor: 'yellow' },
                                    ]
                                  ]
                                }
                              }
                            ]
                          }
                        ]
                      ]
                    },
                    width: '20%',
                  },
                  {
                    table: {
                      widths: ['100%'],
                      body: [
                        [
                          { image: this.writeRotatedText(1, 'ENFERMEDADES'), fit: [25, 70], margin: [-5, -15, 0, 0.5], fillColor: '#7A7A7A', border: [false, false, false, true] },
                        ]
                      ]
                    },
                    width: '5%',
                  },
                  {
                    table: {
                      widths: ['100%'],
                      body: [
                        [
                          {
                            border: [false, true, true, false],
                            columns: [
                              {
                                width: '3%',
                                stack: [
                                  { image: this.writeRotatedText2(1, '1 Ó MAS'), fit: [20, 70], margin: [-7, -47, 0, 0] },
                                  { image: this.writeRotatedText2(1, 'NINGUNA'), fit: [20, 70], margin: [-7, -38, 0, -2] },
                                ]
                              },
                              {
                                width: '7%',
                                stack: [
                                  { stack: this.cuadroCanvasColor(this.datos.enfermedades2.unoomas), alignment: 'center' },
                                  { stack: this.cuadroCanvas(this.datos.enfermedades2.ninguna), alignment: 'center', marginTop: 23 },
                                ]
                              },
                              {
                                width: '90%',
                                stack: [
                                  {
                                    columns: [
                                      {
                                        width: '25%',
                                        margin: [1, 2, 0, 0],
                                        table: {
                                          widths: ['20%', '20%', '20%', '20%'],
                                          body: [
                                            [
                                              { text: this.datos.enfermedades2.enf_rec11, style: 'center7', fillColor: 'yellow' },
                                              { text: this.datos.enfermedades2.enf_rec12, style: 'center7', fillColor: 'yellow' },
                                              { text: this.datos.enfermedades2.enf_rec13, style: 'center7', fillColor: 'yellow' },
                                              { text: this.datos.enfermedades2.enf_rec14, style: 'center7', fillColor: 'yellow' },
                                            ]
                                          ]
                                        }
                                      },
                                      {
                                        margin: [3, 0, -5, 0],
                                        table: {
                                          widths: ['100%'],
                                          body: [
                                            [
                                              { text: this.datos.enfermedades2.nombEnfer1, style: 'left5', margin: [-5, -2, -5, -5], border: [false] },
                                            ]
                                          ]
                                        }
                                      }
                                    ]
                                  },
                                  {
                                    columns: [
                                      {
                                        width: '25%',
                                        margin: [1, 5, 0, 0],
                                        table: {
                                          widths: ['20%', '20%', '20%', '20%'],
                                          body: [
                                            [
                                              { text: this.datos.enfermedades2.enf_rec21, style: 'center7', fillColor: 'yellow' },
                                              { text: this.datos.enfermedades2.enf_rec22, style: 'center7', fillColor: 'yellow' },
                                              { text: this.datos.enfermedades2.enf_rec23, style: 'center7', fillColor: 'yellow' },
                                              { text: this.datos.enfermedades2.enf_rec24, style: 'center7', fillColor: 'yellow' },
                                            ]
                                          ]
                                        }
                                      },
                                      {
                                        margin: [3, 0, -5, 0],
                                        table: {
                                          widths: ['100%'],
                                          body: [
                                            [
                                              { text: this.datos.enfermedades2.nombEnfer2, style: 'left5', margin: [-5, -2, -5, -3], border: [false] },
                                            ]
                                          ]
                                        }
                                      },
                                    ]
                                  },
                                  {
                                    // absolutePosition: {x:118, y:779},
                                    columns: [
                                      {
                                        width: '25%',
                                        margin: [1, 5, 0, -2],
                                        table: {
                                          widths: ['20%', '20%', '20%', '20%'],
                                          body: [
                                            [
                                              { text: this.datos.enfermedades2.enf_rec31, style: 'center7', fillColor: 'yellow' },
                                              { text: this.datos.enfermedades2.enf_rec32, style: 'center7', fillColor: 'yellow' },
                                              { text: this.datos.enfermedades2.enf_rec33, style: 'center7', fillColor: 'yellow' },
                                              { text: this.datos.enfermedades2.enf_rec34, style: 'center7', fillColor: 'yellow' },
                                            ]
                                          ]
                                        }
                                      },
                                      {
                                        margin: [3, 0, -5, 0],
                                        table: {
                                          widths: ['100%'],
                                          body: [
                                            [
                                              { text: this.datos.enfermedades2.nombEnfer3, style: 'left5', margin: [-5, -2, -5, -3], border: [false] },
                                            ]
                                          ]
                                        }
                                      },
                                    ]
                                  },
                                ]
                              },
                            ]
                          }
                        ]
                      ]
                    },
                    width: '55%',
                  },
                  {
                    table: {
                      widths: ['100%'],
                      body: [
                        [
                          {
                            border: [false, true, false, false],
                            margin: [0, 0, -5, 0],
                            stack: [
                              { text: 'TAMIZAJE NEONATAL', style: 'left6', margin: [-5, -2, -5, 0] },
                              {
                                table: {
                                  widths: ['100%'],
                                  body: [
                                    [
                                      {
                                        margin: [-1, -2, 0, -1],
                                        stack: [
                                          {
                                            columns: [
                                              { text: ' ', style: 'center6', width: '20%' },
                                              { text: 'VDRL', style: 'center6', width: '30%', margin: [-5, 0, -3, 0] },
                                              { text: 'Tto.', style: 'center6', width: '30%', margin: [0, 0, -5, 0] },
                                              { text: ' ', style: 'center6', width: '20%' },
                                            ]
                                          },
                                          {
                                            marginTop: 1,
                                            columns: [
                                              { text: ' ', style: 'center6', width: '20%' },
                                              { text: ' ', style: 'center6', width: '30%' },
                                              { stack: this.cuadroCanvasColor(this.datos.tratVdrlRec.no), alignment: 'center', width: '30%', margin: [-3, -1, -5, 0] },
                                              { text: 'no', style: 'center6', width: '20%', margin: [-3, 0, 0, 0] },
                                            ]
                                          },
                                          {
                                            marginTop: 1,
                                            columns: [
                                              { text: '--', style: 'center6', width: '20%' },
                                              { stack: this.cuadroCanvas(this.datos.vdrlRec.menos), alignment: 'center', width: '30%', margin: [-5, -5, -3, 0] },
                                              { stack: this.cuadroCanvas(this.datos.tratVdrlRec.si), alignment: 'center', width: '30%', margin: [-3, -1, -5, 0] },
                                              { text: 'si', style: 'center6', width: '20%', margin: [-3, 0, 0, 0] },
                                            ]
                                          },
                                          {
                                            marginTop: 1,
                                            columns: [
                                              { text: '+', style: 'center6', width: '20%' },
                                              { stack: this.cuadroCanvasColor(this.datos.vdrlRec.mas), alignment: 'center', width: '30%', margin: [-5, -5, -3, 0] },
                                              { stack: this.cuadroCanvas(this.datos.tratVdrlRec.nc), alignment: 'center', width: '30%', margin: [-3, -1, -5, 0] },
                                              { text: 'n/c', style: 'center6', width: '20%', margin: [-3, 0, 0, 0] },
                                            ]
                                          },
                                          {
                                            marginTop: 1,
                                            columns: [
                                              { text: 'no se hizo', style: 'center6', width: '20%', margin: [-10, -5, -8, 0] },
                                              { stack: this.cuadroCanvasColor(this.datos.vdrlRec.noSeHizo), alignment: 'center', width: '30%', margin: [-5, -5, -5, 0] },
                                              { stack: this.cuadroCanvas(this.datos.tratVdrlRec.sd), alignment: 'center', width: '30%', margin: [-3, -1, -5, 0] },
                                              { text: 's/d', style: 'center6', width: '20%', margin: [-3, 0, 0, 0] },
                                            ]
                                          },
                                        ]
                                      }
                                    ]
                                  ]
                                }
                              }
                            ]
                          }
                        ]
                      ]
                    },
                    width: '20%',
                  },
                ]
              }
            ]
          },
          {
            width: '20%',
            stack: [
              {
                columns: [
                  {
                    width: '50%',
                    stack: [
                      {
                        table: {
                          widths: ['100%'],
                          body: [
                            [
                              {
                                stack: [
                                  {
                                    columns: [
                                      { text: ' ', style: 'center7', width: '80%', margin: [-15, -4, 0, 0] },
                                      { text: 'no', style: 'center7', width: '20%', margin: [-15, -4, 0, 0] },
                                      { text: 'si', style: 'center7', width: '20%', margin: [-10, -4, 0, 0] },
                                    ]
                                  },
                                  {
                                    columns: [
                                      { text: 'estimulac', style: 'center7', width: '80%', margin: [-15, 0, 0, 0] },
                                      { stack: this.cuadroCanvas(this.datos.estimulNo), alignment: 'center', width: '20%', margin: [-15, 0, 0, 0] },
                                      { stack: this.cuadroCanvasColor(this.datos.estimulSi), alignment: 'center', width: '20%', margin: [-10, 0, 0, 0] },
                                    ]
                                  },
                                  {
                                    columns: [
                                      { text: 'aspiracion', style: 'center7', width: '80%', margin: [-15, 0, -3, 0] },
                                      { stack: this.cuadroCanvas(this.datos.aspiracionNo), alignment: 'center', width: '20%', margin: [-15, 0, 0, 0] },
                                      { stack: this.cuadroCanvasColor(this.datos.aspiracionSi), alignment: 'center', width: '20%', margin: [-10, 0, 0, 0] },
                                    ]
                                  },
                                  {
                                    columns: [
                                      { text: 'mascara', style: 'center7', width: '80%', margin: [-15, 0, -3, 0] },
                                      { stack: this.cuadroCanvas(this.datos.mascarNo), alignment: 'center', width: '20%', margin: [-15, 0, 0, 0] },
                                      { stack: this.cuadroCanvasColor(this.datos.mascarSi), alignment: 'center', width: '20%', margin: [-10, 0, 0, 0] },
                                    ]
                                  },
                                  {
                                    columns: [
                                      { text: 'oxigeno', style: 'center7', width: '80%', margin: [-15, 0, -3, 0] },
                                      { stack: this.cuadroCanvas(this.datos.o2No), alignment: 'center', width: '20%', margin: [-15, 0, 0, 0] },
                                      { stack: this.cuadroCanvasColor(this.datos.o2Si), alignment: 'center', width: '20%', margin: [-10, 0, 0, 0] },
                                    ]
                                  },
                                  {
                                    columns: [
                                      { text: 'masaje', style: 'center7', width: '80%', margin: [-15, 0, -3, 0] },
                                      { stack: this.cuadroCanvas(this.datos.masajeNo), alignment: 'center', width: '20%', margin: [-15, 0, 0, 0] },
                                      { stack: this.cuadroCanvasColor(this.datos.masajeSi), alignment: 'center', width: '20%', margin: [-10, 0, 0, 0] },
                                    ]
                                  },
                                  {
                                    columns: [
                                      { text: 'tubo', style: 'center7', width: '80%', margin: [-15, 0, -3, -1] },
                                      { stack: this.cuadroCanvas(this.datos.tuboNo), alignment: 'center', width: '20%', margin: [-15, 0, 0, -1] },
                                      { stack: this.cuadroCanvasColor(this.datos.tuboSi), alignment: 'center', width: '20%', margin: [-10, 0, 0, -1] },
                                    ]
                                  },
                                ]
                              },
                            ]
                          ]
                        }
                      },
                    ]
                  },
                  {
                    width: '50%',
                    stack: [
                      {
                        table: {
                          widths: ['100%'],
                          body: [
                            [
                              {
                                stack: [
                                  { text: 'FALLECE en LUGAR de PARTO', style: 'center7', margin: [0, -4, 0, 0] },
                                  {
                                    margin: [0, -2, 0, 0],
                                    columns: [
                                      { text: 'no', style: 'center7' },
                                      { stack: this.cuadroCanvas(this.datos.fallecNo), alignment: 'center' },
                                      { text: 'si', style: 'center7' },
                                      { stack: this.cuadroCanvasColor(this.datos.fallecSi), alignment: 'center' },
                                    ]
                                  }
                                ]
                              }
                            ]
                          ]
                        }
                      },
                      {
                        table: {
                          widths: ['100%'],
                          body: [
                            [
                              {
                                stack: [
                                  { text: 'REFERIDO', style: 'center7', margin: [0, -4, 0, 0] },
                                  {
                                    margin: [-5, -2, 0, 0],
                                    columns: [
                                      { text: 'aloj. conj.', style: 'center7' },
                                      { text: 'neona tolog', style: 'center7' },
                                      { text: 'otro hosp.', style: 'center7' },
                                    ]
                                  },
                                  {
                                    columns: [
                                      { stack: this.cuadroCanvas(this.datos.referido1), alignment: 'center' },
                                      { stack: this.cuadroCanvasColor(this.datos.referido2), alignment: 'center' },
                                      { stack: this.cuadroCanvasColor(this.datos.referido3), alignment: 'center' },
                                    ]
                                  },
                                ]
                              }
                            ]
                          ]
                        }
                      }
                    ]
                  },
                ]
              },
              {
                columns: [
                  {
                    width: '70%',
                    table: {
                      widths: ['100%'],
                      body: [
                        [
                          {
                            border: [false, true, true, false],
                            margin: [0, 0, -5, 0],
                            stack: [
                              {
                                columns: [
                                  { text: ' ', style: 'center7', width: '12%' },
                                  { text: 'TSH', style: 'center6', width: '22%', margin: [-5, -2, 0, 0] },
                                  { text: 'Hbpatia', style: 'center6', width: '22%', margin: [-5, -2, 0, 0] },
                                  { text: 'Bilirrub', style: 'center6', width: '22%', margin: [0, -2, -2, 0] },
                                  { text: 'Toxo igM', style: 'center6', width: '22%', margin: [-2, -4, -3, 0] },
                                ]
                              },
                              {
                                marginTop: 2,
                                columns: [
                                  { text: '--', style: 'center7', margin: [0, -2, 0, 0] },
                                  { stack: this.cuadroCanvas(this.datos.tshRec.menos), alignment: 'center', margin: [0, -2, 0, 0] },
                                  { stack: this.cuadroCanvas(this.datos.hbPatiaRec.menos), alignment: 'center', margin: [0, -2, 0, 0] },
                                  { stack: this.cuadroCanvas(this.datos.bilirubinaRec.menos), alignment: 'center', margin: [0, -2, 0, 0] },
                                  { stack: this.cuadroCanvas(this.datos.toxoIgmRec.menos), alignment: 'center', margin: [0, -2, 0, 0] },
                                ]
                              },
                              {
                                marginTop: 1,
                                columns: [
                                  { text: '+', style: 'center7' },
                                  { stack: this.cuadroCanvasColor(this.datos.tshRec.mas), alignment: 'center' },
                                  { stack: this.cuadroCanvasColor(this.datos.hbPatiaRec.mas), alignment: 'center' },
                                  { stack: this.cuadroCanvasColor(this.datos.bilirubinaRec.mas), alignment: 'center' },
                                  { stack: this.cuadroCanvasColor(this.datos.toxoIgmRec.mas), alignment: 'center' },
                                ]
                              },
                              {
                                marginTop: 1,
                                columns: [
                                  { text: 'no se hizo', style: 'center7', margin: [-5, -5, -9, 0] },
                                  { stack: this.cuadroCanvasColor(this.datos.tshRec.noSeHizo), alignment: 'center' },
                                  { stack: this.cuadroCanvas(this.datos.hbPatiaRec.noSeHizo), alignment: 'center' },
                                  { stack: this.cuadroCanvas(this.datos.bilirubinaRec.noSeHizo), alignment: 'center' },
                                  { stack: this.cuadroCanvasColor(this.datos.toxoIgmRec.noSeHizo), alignment: 'center' },
                                ]
                              },
                            ]
                          },
                        ]
                      ]
                    }
                  },
                  {
                    width: '30%',
                    stack: [
                      {
                        table: {
                          widths: ['100%'],
                          body: [
                            [
                              {
                                margin: [0, 0, 0, -2],
                                stack: [
                                  { text: 'Meconio', style: 'center7', margin: [-3, -2, -3, 0] },
                                  { text: '1er dia', style: 'center7', margin: [-3, -2, -3, 0] },
                                  {
                                    margin: [-3, -3, -3, 0],
                                    columns: [
                                      { text: 'no', style: 'center7' },
                                      { text: 'si', style: 'center7' },
                                    ]
                                  },
                                  {
                                    margin: [-3, -2, -3, 0],
                                    columns: [
                                      { stack: this.cuadroCanvasColor(this.datos.meconioRec.no), alignment: 'center' },
                                      { stack: this.cuadroCanvas(this.datos.meconioRec.si), alignment: 'center' },
                                    ]
                                  },
                                ]
                              },
                            ]
                          ]
                        }
                      },
                      {
                        table: {
                          widths: ['100%'],
                          body: [
                            [
                              {
                                border: [true, true, false, false],
                                stack: [
                                  { text: 'Antirubeola post parto', style: 'center7', margin: [-5, -3, -6, 0] }
                                ]
                              },
                            ]
                          ]
                        }
                      },
                    ]
                  }
                ]
              },
            ]
          },
          {
            stack: [
              {
                table: {
                  widths: ['60%', '40%'],
                  body: [
                    [
                      {
                        margin: [-4, -2, -4, -2],
                        columns: [
                          { text: 'ATENDIO', style: 'center6', width: '30%' },
                          { text: 'medico', style: 'center6', width: '25%' },
                          { text: 'enf.', style: 'center6', width: '15%' },
                          { text: 'auxil', style: 'center6', width: '15%' },
                          { text: 'otro', style: 'center6', width: '15%' },
                        ]
                      },
                      { text: 'Nombre', style: 'center7', margin: [-4, -2, -4, -2] },
                    ],
                    [
                      {
                        margin: [-4, -2, -4, -2],
                        columns: [
                          { text: 'PARTO', style: 'center7', width: '30%' },
                          { stack: this.cuadroCanvas(this.datos.med_parto.medico), alignment: 'center', width: '25%' },
                          { stack: this.cuadroCanvas(this.datos.med_parto.enf), alignment: 'center', width: '15%' },
                          { stack: this.cuadroCanvasColor(this.datos.med_parto.aux), alignment: 'center', width: '15%' },
                          { stack: this.cuadroCanvasColor(this.datos.med_parto.otro), alignment: 'center', width: '15%' },
                        ]
                      },
                      { text: this.datos.med_parto.descrip, style: 'left7', margin: [-1, -2, -4, -2] },
                    ],
                    [
                      {
                        margin: [-4, -2, -4, -2],
                        columns: [
                          { text: 'NEONATO', style: 'center7', width: '30%', margin: [-2, 0, -5, 0] },
                          { stack: this.cuadroCanvas(this.datos.med_parto.medico), alignment: 'center', width: '25%' },
                          { stack: this.cuadroCanvas(this.datos.med_parto.enf), alignment: 'center', width: '15%' },
                          { stack: this.cuadroCanvasColor(this.datos.med_parto.aux), alignment: 'center', width: '15%' },
                          { stack: this.cuadroCanvasColor(this.datos.med_parto.otro), alignment: 'center', width: '15%' },
                        ]
                      },
                      { text: this.datos.med_parto.descrip, style: 'left7', margin: [-1, -2, -4, -2] },
                    ]
                  ]
                }
              },
              {
                table: {
                  widths: ['100%'],
                  body: [
                    [
                      { text: 'PUERPERIO', style: 'center7', color: '#FFFFFF', fillColor: '#7A7A7A' }
                    ]
                  ]
                }
              },
              {
                table: {
                  widths: ['17%', '15%', '18%', '10%', '20%', '20%'],
                  body: [
                    [
                      { text: 'dia hora', style: 'center7', margin: [-4, -2, -4, 0] },
                      { text: 'Temp C', style: 'center7', margin: [-4, -2, -4, 0] },
                      { text: 'PA', style: 'center7', margin: [0, -2, 0, 0] },
                      { text: 'pulso', style: 'center7', margin: [-4, -2, -4, 0] },
                      { text: 'invol. uter', style: 'center7', margin: [-4, -2, -4, 0] },
                      { text: 'loquios', style: 'center7', margin: [0, -2, 0, 0] },
                    ],
                    [
                      {
                        stack: [
                          { text: this.datos.puerperio[0].dia.slice(0, 1) + '  ' + this.datos.puerperio[0].dia.slice(1, 2) + '  ' + this.datos.puerperio[0].hora.slice(0, 1) + '  ' + this.datos.puerperio[0].hora.slice(1, 2), style: 'center7', margin: [-4, 0, -4, 0] },
                          { canvas: [{ type: 'line', x1: 3, y1: 2, x2: 3, y2: -3 }], margin: [0, 0, 0, -5] },
                          { canvas: [{ type: 'line', x1: 10, y1: 5, x2: 10, y2: -4 }], margin: [0, 0, 0, -5] },
                          { canvas: [{ type: 'line', x1: 18, y1: 5, x2: 18, y2: 0 }], margin: [0, 0, 0, -5] },
                        ]
                      },
                      { text: this.datos.puerperio[0].temp, style: 'center7', margin: [-4, 0, -4, 0] },
                      { text: this.datos.puerperio[0].pa, style: 'center7', margin: [-4, 0, -4, 0] },
                      { text: this.datos.puerperio[0].pulso, style: 'center7', margin: [-4, 0, -4, 0] },
                      { text: this.datos.puerperio[0].invol, style: 'center6', margin: [-5, 0, -5, 0] },
                      { text: this.datos.puerperio[0].loquios, style: 'center6', margin: [-4, 0, -4, 0] },
                    ],
                    [
                      {
                        stack: [
                          { text: this.datos.puerperio[1].dia.slice(0, 1) + '  ' + this.datos.puerperio[1].dia.slice(1, 2) + '  ' + this.datos.puerperio[1].hora.slice(0, 1) + '  ' + this.datos.puerperio[2].hora.slice(1, 2), style: 'center7', margin: [-4, 0, -4, 0] },
                          { canvas: [{ type: 'line', x1: 3, y1: 2, x2: 3, y2: -3 }], margin: [0, 0, 0, -5] },
                          { canvas: [{ type: 'line', x1: 10, y1: 5, x2: 10, y2: -4 }], margin: [0, 0, 0, -5] },
                          { canvas: [{ type: 'line', x1: 18, y1: 5, x2: 18, y2: 0 }], margin: [0, 0, 0, -5] },
                        ]
                      },
                      { text: this.datos.puerperio[1].temp, style: 'center7', margin: [-4, 0, -4, 0] },
                      { text: this.datos.puerperio[1].pa, style: 'center7', margin: [-4, 0, -4, 0] },
                      { text: this.datos.puerperio[1].pulso, style: 'center7', margin: [-4, 0, -4, 0] },
                      { text: this.datos.puerperio[1].invol, style: 'center6', margin: [-5, 0, -5, 0] },
                      { text: this.datos.puerperio[1].loquios, style: 'center6', margin: [-4, 0, -4, 0] },
                    ],
                    [
                      {
                        stack: [
                          { text: this.datos.puerperio[2].dia.slice(0, 1) + '  ' + this.datos.puerperio[2].dia.slice(1, 2) + '  ' + this.datos.puerperio[2].hora.slice(0, 1) + '  ' + this.datos.puerperio[2].hora.slice(1, 2), style: 'center7', margin: [-4, 0, -4, 0] },
                          { canvas: [{ type: 'line', x1: 3, y1: 2, x2: 3, y2: -3 }], margin: [0, 0, 0, -5] },
                          { canvas: [{ type: 'line', x1: 10, y1: 5, x2: 10, y2: -4 }], margin: [0, 0, 0, -5] },
                          { canvas: [{ type: 'line', x1: 18, y1: 5, x2: 18, y2: 0 }], margin: [0, 0, 0, -5] },
                        ]
                      },
                      { text: this.datos.puerperio[2].temp, style: 'center7', margin: [-4, 0, -4, 0] },
                      { text: this.datos.puerperio[2].pa, style: 'center7', margin: [-4, 0, -4, 0] },
                      { text: this.datos.puerperio[2].pulso, style: 'center7', margin: [-4, 0, -4, 0] },
                      { text: this.datos.puerperio[2].invol, style: 'center6', margin: [-5, 0, -5, 0] },
                      { text: this.datos.puerperio[2].loquios, style: 'center6', margin: [-4, 0, -4, 0] },
                    ],
                  ]
                }
              },
              {
                columns: [
                  {
                    table: {
                      widths: ['100%'],
                      body: [
                        [
                          {
                            border: [false, true, true, false],
                            stack: [
                              {
                                columns: [
                                  { stack: this.cuadroCanvasColor(this.datos.antirubeolaPostpart.no), alignment: 'center' },
                                  { stack: this.cuadroCanvas(this.datos.antirubeolaPostpart.si), alignment: 'center' },
                                  { stack: this.cuadroCanvas(this.datos.antirubeolaPostpart.nc), alignment: 'center' },
                                ]
                              },
                              {
                                margin: [-5, -4, 0, 0],
                                columns: [
                                  { text: 'no', style: 'left7' },
                                  { text: 'si', style: 'left7' },
                                  { text: 'n/c', style: 'left7' },
                                ]
                              }
                            ]
                          }
                        ]
                      ]
                    },
                    width: '27%',
                  },
                  {
                    table: {
                      widths: ['100%'],
                      body: [
                        [
                          {
                            margin: [-4, -4, -4, -3],
                            stack: [
                              { text: 'Gamaglobulina', style: 'left7' },
                              {
                                columns: [
                                  { text: 'anti D', style: 'left7', margin: [5, 0, 0, 0], width: '40%' },
                                  { stack: this.cuadroCanvasColor(this.datos.gamaglobAntDRec.no), alignment: 'center', width: '20%' },
                                  { stack: this.cuadroCanvas(this.datos.gamaglobAntDRec.si), alignment: 'center', width: '20%' },
                                  { stack: this.cuadroCanvas(this.datos.gamaglobAntDRec.nc), alignment: 'center', width: '20%' },
                                ]
                              },
                              {
                                margin: [-5, -5, 0, 0],
                                columns: [
                                  { text: ' ', style: 'left7', width: '40%' },
                                  { text: 'no', style: 'left7', width: '20%' },
                                  { text: 'si', style: 'left7', width: '20%' },
                                  { text: 'n/c', style: 'left7', width: '20%' },
                                ]
                              }
                            ]
                          }
                        ]
                      ]
                    },
                    width: '37%',
                  },
                ]
              }
            ]
          }
        ]
      },
      {
        columns: [
          {
            table: {
              widths: ['100%'],
              body: [
                [
                  {
                    stack: [
                      {
                        margin: [-5, -3, -5, 0],
                        columns: [
                          {
                            table: {
                              widths: ['100%'],
                              body: [
                                [
                                  { text: 'EGRESO RN', style: 'left7', color: '#FFFFFF', fillColor: '#7A7A7A', margin: [-2, 0, -4, 0] }
                                ]
                              ]
                            },
                            width: '20%'
                          },
                          { text: 'vivo', style: 'center7', width: '6%', margin: [-2, 0, -4, 0] },
                          { stack: this.cuadroCanvas(this.datos.egreso_rn.vivo), alignment: 'center', width: '8%' },
                          { text: 'fallece', style: 'center7', width: '8%', margin: [-2, 0, -4, 0] },
                          { stack: this.cuadroCanvas(this.datos.egreso_rn.vivo), alignment: 'center', width: '8%' },
                          {
                            width: '10%',
                            stack: [
                              { text: 'traslado', style: 'center7', margin: [-8, 0, -4, 0] },
                              { stack: this.cuadroCanvasColor(this.datos.egreso_rn.traslado), alignment: 'center', margin: [0, 0, 0, 0] }
                            ]
                          },
                          {
                            stack: [
                              { text: 'fallece durante', style: 'center6', width: '21%', margin: [-8, 0, 0, 0] },
                              { text: 'o en lugar de traslado', style: 'center6', width: '21%', margin: [-5, 0, -2, 0] },
                              {
                                margin: [8, -3, 8, 0],
                                columns: [
                                  { text: 'no', style: 'center6' },
                                  { text: 'si', style: 'center6' },
                                ]
                              },
                              {
                                margin: [8, -1, 8, 0],
                                columns: [
                                  { stack: this.cuadroCanvas(this.datos.egreso_rn.fallece_traslado.no), alignment: 'center' },
                                  { stack: this.cuadroCanvasColor(this.datos.egreso_rn.fallece_traslado.si), alignment: 'center' },
                                ]
                              },
                            ]
                          },
                          {
                            margin: [-7, 0, 0, 0],
                            width: '19%',
                            stack: [
                              { text: 'EDAD AL EGRESO', style: 'center6' },
                              { text: 'dias completos', style: 'center6' },
                              {
                                columns: [
                                  {
                                    margin: [5, 3, 0, 0],
                                    table: {
                                      widths: ['50%', '50%'],
                                      body: [
                                        [
                                          { text: this.datos.egreso_rn.edad.slice(0, 1), style: 'center7' },
                                          { text: this.datos.egreso_rn.edad.slice(1, 2), style: 'center7' },
                                        ]
                                      ]
                                    }
                                  },
                                  {
                                    stack: [
                                      { text: '1 dia', style: 'center7' },
                                      { stack: this.cuadroCanvas(this.datos.egreso_rn.edad_menor1), alignment: 'center' },
                                    ]
                                  },
                                ]
                              }
                            ]
                          },
                        ]
                      },
                      {
                        columns: [
                          {
                            width: '25%',
                            stack: [
                              {
                                margin: [0, -18, 0, 0],
                                table: {
                                  widths: ['30%', '30%', '40%'],
                                  body: [
                                    [
                                      {
                                        border: [true, true, false, true],
                                        stack: [
                                          { text: 'dia', style: 'center7', margin: [-5, -2, -5, 0] },
                                          { text: this.datos.egreso_rn.fecha.dia.slice(0, 1) + '  ' + this.datos.egreso_rn.fecha.dia.slice(1, 2), style: 'center7', margin: [-5, 0, -5, -2] }
                                        ]
                                      },
                                      {
                                        border: [false, true, false, true],
                                        stack: [
                                          { text: 'mes', style: 'center7', margin: [-5, -2, -5, 0] },
                                          { text: this.datos.egreso_rn.fecha.mes.slice(0, 1) + '  ' + this.datos.egreso_rn.fecha.mes.slice(1, 2), style: 'center7', margin: [-5, 0, -5, -2] }
                                        ]
                                      },
                                      {
                                        border: [false, true, true, true],
                                        stack: [
                                          { text: 'año', style: 'center7', margin: [-5, -2, -5, 0] },
                                          { text: this.datos.egreso_rn.fecha.año.slice(0, 2) + '  ' + this.datos.egreso_rn.fecha.año.slice(2, 4), style: 'center7', margin: [-5, 0, -5, -2] }
                                        ]
                                      },
                                    ]
                                  ]
                                }
                              },
                              { canvas: [{ type: 'line', x1: 9, y1: 0, x2: 9, y2: -5 }] },
                              { canvas: [{ type: 'line', x1: 16, y1: 0, x2: 16, y2: -9 }] },
                              { canvas: [{ type: 'line', x1: 16, y1: -12, x2: 16, y2: -18 }] },
                              { canvas: [{ type: 'line', x1: 25, y1: 0, x2: 25, y2: -5 }] },
                              { canvas: [{ type: 'line', x1: 33, y1: 0, x2: 33, y2: -9 }] },
                              { canvas: [{ type: 'line', x1: 33, y1: -12, x2: 33, y2: -18 }] },
                              { canvas: [{ type: 'line', x1: 44, y1: 0, x2: 44, y2: -5 }] },
                            ]
                          },
                          {
                            width: '25%',
                            stack: [
                              {
                                margin: [1, -18, 10, 3],
                                table: {
                                  widths: ['50%', '50%'],
                                  body: [
                                    [
                                      {
                                        border: [true, true, false, true],
                                        stack: [
                                          { text: 'hora', style: 'center7', margin: [-3, -2, -3, 0] },
                                          { text: this.datos.egreso_rn.fecha.hora.slice(0, 1) + '  ' + this.datos.egreso_rn.fecha.hora.slice(1, 2), style: 'center7', margin: [0, 0, 0, -2] }
                                        ]
                                      },
                                      {
                                        border: [false, true, true, true],
                                        stack: [
                                          { text: 'min', style: 'center7', margin: [0, -2, 0, 0] },
                                          { text: this.datos.egreso_rn.fecha.min.slice(0, 1) + '  ' + this.datos.egreso_rn.fecha.min.slice(1, 2), style: 'center7', margin: [0, 0, 0, -2] }
                                        ]
                                      },
                                    ]
                                  ]
                                }
                              },
                              { canvas: [{ type: 'line', x1: 11, y1: -3, x2: 11, y2: -8 }] },
                              { canvas: [{ type: 'line', x1: 22, y1: -3, x2: 22, y2: -12 }] },
                              { canvas: [{ type: 'line', x1: 22, y1: -15, x2: 22, y2: -20 }] },
                              { canvas: [{ type: 'line', x1: 33, y1: -3, x2: 33, y2: -8 }] },
                            ]
                          },
                          {

                          }
                        ]
                      },
                      {
                        margin: [0, -1, 0, 0],
                        columns: [
                          {
                            table: {
                              widths: ['2%', '2%', '2%', '2%', '2%', '2%', '2%', '2%', '2%', '2%', '2%', '2%', '2%', '2%', '2%', '2%'],
                              body: [
                                [
                                  {
                                    stack: [
                                      { text: 'Id', style: 'left5', margin: [-3, -3, -15, 0] },
                                      { text: 'RN', style: 'left5', margin: [-5, -2, -10, 0] },
                                    ]
                                  },
                                  { text: this.datos.egreso_rn.id.slice(0, 1), style: 'center6' },
                                  { text: this.datos.egreso_rn.id.slice(1, 2), style: 'center6' },
                                  { text: this.datos.egreso_rn.id.slice(2, 3), style: 'center6' },
                                  { text: this.datos.egreso_rn.id.slice(3, 4), style: 'center6' },
                                  { text: this.datos.egreso_rn.id.slice(4, 5), style: 'center6' },
                                  { text: this.datos.egreso_rn.id.slice(5, 6), style: 'center6' },
                                  { text: this.datos.egreso_rn.id.slice(6, 7), style: 'center6' },
                                  { text: this.datos.egreso_rn.id.slice(7, 8), style: 'center6' },
                                  { text: this.datos.egreso_rn.id.slice(8, 9), style: 'center6' },
                                  { text: this.datos.egreso_rn.id.slice(9, 10), style: 'center6' },
                                  { text: this.datos.egreso_rn.id.slice(10, 11), style: 'center6' },
                                  { text: this.datos.egreso_rn.id.slice(11, 12), style: 'center6' },
                                  { text: this.datos.egreso_rn.id.slice(12, 13), style: 'center6' },
                                  { text: this.datos.egreso_rn.id.slice(13, 14), style: 'center6' },
                                  { text: this.datos.egreso_rn.id.slice(14, 15), style: 'center6' },
                                ]
                              ]
                            },
                            width: '20%'
                          },
                          { text: 'lugar', style: 'center7', margin: [0, 2, -70, 0] },
                          {
                            table: {
                              widths: ['8%', '8%', '8%', '8%', '8%', '8%', '8%', '8%', '8%', '8%', '8%', '8%',],
                              body: [
                                [
                                  { text: this.datos.egreso_rn.lugar_traslado.slice(0, 1), style: 'center6' },
                                  { text: this.datos.egreso_rn.lugar_traslado.slice(1, 2), style: 'center6' },
                                  { text: this.datos.egreso_rn.lugar_traslado.slice(2, 3), style: 'center6' },
                                  { text: this.datos.egreso_rn.lugar_traslado.slice(3, 4), style: 'center6' },
                                  { text: this.datos.egreso_rn.lugar_traslado.slice(4, 5), style: 'center6' },
                                  { text: this.datos.egreso_rn.lugar_traslado.slice(5, 6), style: 'center6' },
                                  { text: this.datos.egreso_rn.lugar_traslado.slice(6, 7), style: 'center6' },
                                  { text: this.datos.egreso_rn.lugar_traslado.slice(7, 8), style: 'center6' },
                                  { text: this.datos.egreso_rn.lugar_traslado.slice(8, 9), style: 'center6' },
                                  { text: this.datos.egreso_rn.lugar_traslado.slice(9, 10), style: 'center6' },
                                  { text: this.datos.egreso_rn.lugar_traslado.slice(10, 11), style: 'center6' },
                                  { text: this.datos.egreso_rn.lugar_traslado.slice(11, 12), style: 'center6' },
                                ]
                              ]
                            }
                          }
                        ]
                      },
                      { canvas: [{ type: 'line', x1: 118, y1: -10, x2: 118, y2: -30 }] },
                    ]
                  }
                ]
              ]
            },
            width: '38%'
          },
          {
            table: {
              widths: ['100%'],
              body: [
                [
                  {
                    stack: [
                      { text: 'ALIMENTO AL ALTA', style: 'center7', margin: [0, -3, 0, 0] },
                      {
                        margin: [0, 1, 0, 0],
                        columns: [
                          { text: 'lact exct.', style: 'center7', width: '70%', margin: [-5, 0, -5, 0] },
                          { stack: this.cuadroCanvas(this.datos.egreso_rn.aliment1), alignment: 'center', width: '30%' },
                        ]
                      },
                      {
                        margin: [0, 1, 0, 0],
                        columns: [
                          { text: 'parcial', style: 'center7', width: '70%' },
                          { stack: this.cuadroCanvasColor(this.datos.egreso_rn.aliment2), alignment: 'center', width: '30%' },
                        ]
                      },
                      {
                        margin: [0, 1, 0, 0],
                        columns: [
                          { text: 'artificial', style: 'center7', width: '70%' },
                          { stack: this.cuadroCanvasColor(this.datos.egreso_rn.aliment3), alignment: 'center', width: '30%' },
                        ]
                      },
                    ]
                  }
                ]
              ]
            },
            width: '8%'
          },
          {
            table: {
              widths: ['100%'],
              body: [
                [
                  {
                    margin: [0, -3, 0, -3],
                    columns: [
                      {
                        width: '40%',
                        stack: [
                          { text: 'Boca', style: 'center7', margin: [0, -1, 0, 0] },
                          { text: 'arriba', style: 'center7', margin: [0, -3, 0, 0] },
                        ]
                      },
                      { text: 'no', style: 'center7', width: '15%' },
                      { stack: this.cuadroCanvasColor(this.datos.egreso_rn.bocaArriba.no), alignment: 'center', width: '15%', margin: [0, 3, 0, 0] },
                      { text: 'si', style: 'center7', width: '15%' },
                      { stack: this.cuadroCanvas(this.datos.egreso_rn.bocaArriba.si), alignment: 'center', width: '15%', margin: [0, 3, 0, 0] },
                    ]
                  }
                ],
                [
                  {
                    margin: [0, 0, 0, -3],
                    columns: [
                      { text: 'BCG', style: 'center7', width: '40%' },
                      { text: 'no', style: 'center7', width: '15%' },
                      { stack: this.cuadroCanvasColor(this.datos.egreso_rn.bcg.no), alignment: 'center', width: '15%' },
                      { text: 'si', style: 'center7', width: '15%' },
                      { stack: this.cuadroCanvas(this.datos.egreso_rn.bcg.si), alignment: 'center', width: '15%' },
                    ]
                  }
                ],
                [
                  {
                    stack: [
                      { text: 'PESO AL EGRESO', style: 'center7' },
                      {
                        columns: [
                          {
                            margin: [10, 0, -15, 0],
                            table: {
                              widths: ['25%', '25%', '25%', '25%'],
                              body: [
                                [
                                  { text: this.datos.egreso_rn.peso.slice(0, 1), style: 'center7' },
                                  { text: this.datos.egreso_rn.peso.slice(1, 2), style: 'center7' },
                                  { text: this.datos.egreso_rn.peso.slice(2, 3), style: 'center7' },
                                  { text: this.datos.egreso_rn.peso.slice(3, 4), style: 'center7' },
                                ]
                              ]
                            }
                          },
                          { text: 'g', style: 'center7', margin: [0, 3, 0, 0] },
                        ]
                      }
                    ]
                  }
                ]
              ]
            },
            width: '13%'
          },
          {
            table: {
              widths: ['100%'],
              body: [
                [
                  {
                    stack: [
                      {
                        columns: [
                          {
                            margin: [-5, -2, 0, 0],
                            border: [false],
                            table: {
                              widths: ['100%'],
                              body: [
                                [
                                  { text: 'EGRESO MATERNO', style: 'left7', color: '#FFFFFF', fillColor: '#7A7A7A', margin: [-4, -1, -8, 0] }
                                ]
                              ]
                            },
                            width: '35%'
                          },
                          {
                            width: '20%',
                            stack: [
                              { text: 'traslado', style: 'center7', margin: [0, -2, -2, 0] },
                              { stack: this.cuadroCanvasColor(this.datos.egreso_mt.traslado), alignment: 'center' },
                            ]
                          },
                          {
                            width: '45%',
                            margin: [0, -2, 0, 0],
                            stack: [
                              { text: 'lugar', style: 'left7' },
                              {
                                table: {
                                  widths: ['8%', '8%', '8%', '8%', '8%', '8%', '8%', '8%', '8%', '8%', '8%', '8%',],
                                  body: [
                                    [
                                      { text: this.datos.egreso_mt.lugar_traslado.slice(0, 1), style: 'center6' },
                                      { text: this.datos.egreso_mt.lugar_traslado.slice(1, 2), style: 'center6' },
                                      { text: this.datos.egreso_mt.lugar_traslado.slice(2, 3), style: 'center6' },
                                      { text: this.datos.egreso_mt.lugar_traslado.slice(3, 4), style: 'center6' },
                                      { text: this.datos.egreso_mt.lugar_traslado.slice(4, 5), style: 'center6' },
                                      { text: this.datos.egreso_mt.lugar_traslado.slice(5, 6), style: 'center6' },
                                      { text: this.datos.egreso_mt.lugar_traslado.slice(6, 7), style: 'center6' },
                                      { text: this.datos.egreso_mt.lugar_traslado.slice(7, 8), style: 'center6' },
                                      { text: this.datos.egreso_mt.lugar_traslado.slice(8, 9), style: 'center6' },
                                      { text: this.datos.egreso_mt.lugar_traslado.slice(9, 10), style: 'center6' },
                                      { text: this.datos.egreso_mt.lugar_traslado.slice(10, 11), style: 'center6' },
                                      { text: this.datos.egreso_mt.lugar_traslado.slice(11, 12), style: 'center6' },
                                    ]
                                  ]
                                }
                              },
                            ]
                          }
                        ]
                      },
                      {
                        columns: [
                          {
                            width: '32%',
                            stack: [
                              {
                                margin: [0, -7, 0, 0],
                                table: {
                                  widths: ['30%', '30%', '40%'],
                                  body: [
                                    [
                                      {
                                        border: [true, true, false, true],
                                        stack: [
                                          { text: 'dia', style: 'center7', margin: [-5, -2, -5, 0] },
                                          { text: this.datos.egreso_mt.fecha.dia.slice(0, 1) + '  ' + this.datos.egreso_mt.fecha.dia.slice(1, 2), style: 'center7', margin: [-5, 0, -5, -2] }
                                        ]
                                      },
                                      {
                                        border: [false, true, false, true],
                                        stack: [
                                          { text: 'mes', style: 'center7', margin: [-5, -2, -5, 0] },
                                          { text: this.datos.egreso_mt.fecha.mes.slice(0, 1) + '  ' + this.datos.egreso_mt.fecha.mes.slice(1, 2), style: 'center7', margin: [-5, 0, -5, -2] }
                                        ]
                                      },
                                      {
                                        border: [false, true, true, true],
                                        stack: [
                                          { text: 'año', style: 'center7', margin: [-5, -2, -5, 0] },
                                          { text: this.datos.egreso_mt.fecha.año.slice(0, 2) + '  ' + this.datos.egreso_mt.fecha.año.slice(2, 4), style: 'center7', margin: [-5, 0, -5, -2] }
                                        ]
                                      },
                                    ]
                                  ]
                                }
                              },
                              { canvas: [{ type: 'line', x1: 9, y1: 0, x2: 9, y2: -5 }] },
                              { canvas: [{ type: 'line', x1: 16, y1: 0, x2: 16, y2: -9 }] },
                              { canvas: [{ type: 'line', x1: 16, y1: -12, x2: 16, y2: -18 }] },
                              { canvas: [{ type: 'line', x1: 25, y1: 0, x2: 25, y2: -5 }] },
                              { canvas: [{ type: 'line', x1: 33, y1: 0, x2: 33, y2: -9 }] },
                              { canvas: [{ type: 'line', x1: 33, y1: -12, x2: 33, y2: -18 }] },
                              { canvas: [{ type: 'line', x1: 44, y1: 0, x2: 44, y2: -5 }] },
                              {
                                margin: [0, -1, 0, 0],
                                columns: [
                                  { text: 'viva', style: 'center7' },
                                  { text: 'fallece', style: 'center7' },
                                ]
                              },
                              {
                                margin: [0, 0, 0, -2],
                                columns: [
                                  { stack: this.cuadroCanvasColor(this.datos.egreso_mt.viva), alignment: 'center' },
                                  { stack: this.cuadroCanvas(this.datos.egreso_mt.fallece), alignment: 'center' },
                                ]
                              },
                            ]
                          },
                          {
                            width: '20%',
                            stack: [
                              { text: 'fallece', style: 'center6', margin: [0, -2, -5, 0] },
                              { text: 'durante o', style: 'center6', margin: [0, -2, -5, 0] },
                              { text: 'en lugar', style: 'center6', margin: [0, -2, -5, 0] },
                              { text: 'de traslado', style: 'center6', margin: [0, -2, -5, 0] },
                            ]
                          },
                          {
                            width: '20%',
                            columns: [
                              {
                                stack: [
                                  { text: 'no', style: 'center7' },
                                  { stack: this.cuadroCanvas(this.datos.egreso_mt.fallece_traslado.no), alignment: 'center' },
                                ]
                              },
                              {
                                stack: [
                                  { text: 'si', style: 'center7' },
                                  { stack: this.cuadroCanvasColor(this.datos.egreso_mt.fallece_traslado.si), alignment: 'center' },
                                ]
                              },
                            ]
                          },
                          {
                            width: '28%',
                            stack: [
                              { text: 'dias completos', style: 'center7', margin: [-5, 0, -5, 0] },
                              { text: 'desde el parto', style: 'center7', margin: [-5, -2, -5, 0] },
                              {
                                table: {
                                  widths: ['33%', '33%', '34%'],
                                  body: [
                                    [
                                      { text: this.datos.egreso_mt.diasParto.slice(0, 1), style: 'left7', margin: [0, 0, 0, -1.5] },
                                      { text: this.datos.egreso_mt.diasParto.slice(1, 2), style: 'left7', margin: [0, 0, 0, -1.5] },
                                      { text: this.datos.egreso_mt.diasParto.slice(2, 3), style: 'left7', margin: [0, 0, 0, -1.5] },
                                    ]
                                  ]
                                }
                              }
                            ]
                          }
                        ]
                      }
                    ]
                  }
                ]
              ]
            },
            width: '30%'
          },
          {
            margin: [0, -22, 0, 0],
            table: {
              widths: ['100%'],
              body: [
                [
                  { text: 'ANTICONCEPCION', style: 'center6', color: '#FFFFFF', fillColor: '#7A7A7A', margin: [-5, -3, -5, -2], border: [false] }
                ],
                [
                  {
                    margin: [0, -5, 0, -3],
                    stack: [
                      {
                        columns: [
                          { text: ' ', style: 'center7', width: '60%' },
                          { text: 'no', style: 'center7', width: '20%' },
                          { text: 'si', style: 'center7', width: '20%', margin: [0, 0, -5, 0] },
                        ]
                      },
                      {
                        columns: [
                          { text: 'CONSEJERIA', style: 'center6', width: '60%', margin: [-5, -3, 2, 0] },
                          { stack: this.cuadroCanvasColor(this.datos.consejeria.no), alignment: 'center', width: '20%' },
                          { stack: this.cuadroCanvas(this.datos.consejeria.si), alignment: 'center', width: '20%', margin: [0, 0, -5, 0] },
                        ]
                      },
                    ]
                  }
                ],
                [
                  {
                    stack: [
                      { text: 'METODO ELEGIDO', style: 'center6', margin: [-5, -2, -5, 0] },
                      {
                        columns: [
                          {
                            margin: [-5, -2, -5, 0],
                            style: 'left6',
                            stack: [
                              { text: 'DIU post-' },
                              { text: 'evento' },
                            ]
                          },
                          { stack: this.cuadroCanvas(this.datos.metodo_ant.postEvent), alignment: 'center', width: '10%', margin: [-5, 0, 0, 0] },
                          {
                            margin: [0, -2, 0, 0],
                            style: 'left6',
                            stack: [
                              { text: 'ligadura' },
                              { text: 'tubaria' },
                            ]
                          },
                          { stack: this.cuadroCanvas(this.datos.metodo_ant.ligaduraTubaria), alignment: 'center', width: '10%' },
                        ]
                      },
                      {
                        columns: [
                          { text: 'DIU', style: 'center6', margin: [-10, 1, 0, 0] },
                          { stack: this.cuadroCanvas(this.datos.metodo_ant.diu), alignment: 'center', width: '10%', margin: [-5, -1, 0, 0] },
                          { text: 'natural', style: 'center6', margin: [-5, 1, 0, 0] },
                          { stack: this.cuadroCanvas(this.datos.metodo_ant.natural), alignment: 'center', width: '10%', margin: [0, -1, 0, 0] },
                        ]
                      },
                      {
                        columns: [
                          { text: 'barrera', style: 'center6', margin: [-5, 1, 0, 0], width: '40%' },
                          { stack: this.cuadroCanvas(this.datos.metodo_ant.diu), alignment: 'center', width: '10%', margin: [-5, 1, 0, 0] },
                          { text: 'otro', style: 'center6', margin: [-2, 1, 0, 0], width: '40%' },
                          { stack: this.cuadroCanvas(this.datos.metodo_ant.natural), alignment: 'center', width: '10%', margin: [0, 1, 0, 0] },
                        ]
                      },
                      {
                        margin: [0, 0, 0, -2],
                        columns: [
                          { text: 'hormonal', style: 'left5', margin: [-3, 1, 3, 0], width: '40%' },
                          { stack: this.cuadroCanvas(this.datos.metodo_ant.diu), alignment: 'center', width: '10%', margin: [-5, 1, 0, 0] },
                          { text: 'ninguno', style: 'left6', margin: [-1, 1, -1, 0], width: '40%' },
                          { stack: this.cuadroCanvas(this.datos.metodo_ant.natural), alignment: 'center', width: '10%', margin: [0, 1, 0, 0] },
                        ]
                      },
                    ]
                  }
                ],
              ]
            },
            width: '11%'
          },
        ]
      },
      {
        table: {
          widths: ['30%', '31%', '39%'],
          body: [
            [
              {
                border: [true, false, true, true],
                margin: [0, -2, 0, -2],
                stack: [
                  { text: 'Nombre Recien Nacido', style: 'left7', margin: [-2, 0, 0, 0] },
                  { text: this.datos.egreso_rn.nombre, style: 'left7' },
                ]
              },
              {
                border: [true, false, true, true],
                margin: [0, -2, 0, -2],
                stack: [
                  { text: 'Responsable', style: 'left7', margin: [-2, 0, 0, 0] },
                  { text: this.datos.egreso_rn.responsable, style: 'left7' },
                ]
              },
              {
                border: [true, false, true, true],
                margin: [0, -2, 0, -2],
                stack: [
                  { text: 'Responsable', style: 'left7', margin: [-2, 0, 0, 0] },
                  { text: this.datos.egreso_rn.responsable, style: 'left7' },
                ]
              },
            ]
          ]
        }
      },
      {
        columns: [
          {
            unbreakable: true,
            table: {
              widths: ['8%', '15%', '5%', '25%', '15%', '32%'],
              body: [
                [
                  { text: 'HISTORIA CLINICA PERINATAL - CLAP/SMR - OPS/OMS', style: 'left8', color: '#FFFFFF', fillColor: '#7A7A7A', colSpan: 4, border: [true, true, false, false] },
                  {},
                  {},
                  {},
                  { text: '', style: 'left6Bold', border: [false, true, true, false], colSpan: 2 },
                  {},
                ],
                [
                  { text: 'Nombre:', style: 'left8Bold', border: [true, false, false, false] },
                  { text: this.datos.paci.nombre, style: 'left7', border: [false, false, false, false], colSpan: 3 },
                  {},
                  {},
                  { text: 'Id.', style: 'left8Bold', border: [false, false, false, false] },
                  { text: this.datos.paci.cod, style: 'left7', border: [false, false, true, false] },
                ],
                [
                  { text: 'Edad:', style: 'left8Bold', border: [true, false, false, false] },
                  { text: this.datos.paci.edad, style: 'left7', border: [false, false, false, false] },
                  { text: 'E.Civil:', style: 'left8Bold', border: [false, false, false, false] },
                  { text: this.datos.paci.estado_civil, style: 'left7', border: [false, false, false, false] },
                  { text: 'Dir:', style: 'left8Bold', border: [false, false, false, false] },
                  { text: this.datos.paci.direccion, style: 'left7', border: [false, false, true, false] },
                ],
                [
                  { text: 'Entidad:', style: 'left8Bold', border: [true, false, false, true] },
                  { text: this.datos.paci.entidad, style: 'left7', colSpan: 3, border: [false, false, false, true] },
                  {},
                  {},
                  { text: 'Tipo de usuario:', style: 'left8Bold', border: [false, false, false, true] },
                  { text: this.datos.paci.tipoAfil, style: 'left7', border: [false, false, true, true] },
                ],
              ]
            }
          }
        ]
      },
      {
        margin: [0, 10, 0, 0],
        columns: [
          {
            table: {
              widths: ['100%'],
              body: [
                [
                  {
                    stack: [
                      { text: 'OBSERVACIONES:', style: 'left8Bold' },
                      { text: ' ', style: 'left7' },
                      { text: this.datos.observaciones, style: 'left7' },
                    ]
                  }
                ]
              ]
            }
          }
        ]
      },
      firmaImpresion_impHc(this.datos),
    ]
    return col
  }

  cuadroCanvas(condicion) {
    return [
      { canvas: [{ type: 'rect', x: 0, y: 0, h: this.h_rect, w: this.w_rect, r: 10, color: 'white', lineColor: '#000' }] },
      { canvas: condicion ? [{ type: 'line', x1: 0, x2: 4, y1: -8, y2: -2 }, { type: 'line', x1: 4, x2: 0, y1: -8, y2: -2 }] : [] }
    ]
  }

  trianguloAmarillo(condicion) {
    return [
      { canvas: [{ type: 'polyline', closePath: true, color: 'yellow', points: [{ x: 30, y: -5 }, { x: 30, y: 13 }, { x: 5, y: 13 }] }] }
    ]
  }

  cuadroCanvasColor(condicion) {
    return [
      { canvas: [{ type: 'rect', x: 0, y: 0, h: this.h_rect, w: this.w_rect, r: 10, color: 'yellow', lineColor: '#000' }] },
      { canvas: condicion ? [{ type: 'line', x1: 0, x2: 4, y1: -8, y2: -2 }, { type: 'line', x1: 4, x2: 0, y1: -8, y2: -2 }] : [] }
    ]
  }

  cuadroCanvasI(condicion) {
    return [
      { canvas: [{ type: 'rect', x: 0, y: 0, h: this.h_rect, w: this.w_rect, r: 10, color: 'yellow', lineColor: '#000' }] },
      { stack: condicion ? [{ text: 'I', style: 'left6', margin: [0, -8, 0, 0] }] : [] }
    ]
  }

  cuadroCanvasII(condicion) {
    return [
      { canvas: [{ type: 'rect', x: 0, y: 0, h: this.h_rect, w: this.w_rect, r: 10, color: 'yellow', lineColor: '#000' }] },
      { stack: condicion ? [{ text: 'II', style: 'left6', margin: [0, -8, 0, 0] }] : [] }
    ]
  }

  cuadroCanvasIII(condicion) {
    return [
      { canvas: [{ type: 'rect', x: 0, y: 0, h: this.h_rect, w: this.w_rect, r: 10, color: 'yellow', lineColor: '#000' }] },
      { stack: condicion ? [{ text: 'III', style: 'left6', margin: [0, -8, 0, 0] }] : [] }
    ]
  }

  writeRotatedText(lineas, text, text2, text3) {
    var ctx, canvas = document.createElement('canvas');
    switch (lineas) {
      case 1: canvas.width = 36; break;
      case 2: canvas.width = 100; break;
      case 3: canvas.width = 100; break;
    }
    canvas.height = 270;
    ctx = canvas.getContext('2d');
    console.log(canvas, ctx)
    ctx.font = 'bold 18pt Arial';
    ctx.save();
    ctx.translate(36, 270);
    ctx.rotate(-0.5 * Math.PI);
    ctx.fillStyle = '#FFFFFF';

    switch (lineas) {
      case 1:
        ctx.fillText(text, 0, -5);
        break;
      case 2:
        ctx.fillText(text, 0, -20);
        ctx.fillText(text2, 0, 7);
        break;
      case 3:
        ctx.fillText(text, 0, -20);
        ctx.fillText(text2, 0, 7);
        ctx.fillText(text3, 0, 29);
        break;
    }

    ctx.restore();
    return canvas.toDataURL();
  }

  writeRotatedText2(lineas, text, text2, text3) {
    var ctx, canvas = document.createElement('canvas');
    switch (lineas) {
      case 1: canvas.width = 36; break;
      case 2: canvas.width = 100; break;
      case 3: canvas.width = 100; break;
    }
    canvas.height = 270;
    ctx = canvas.getContext('2d');
    console.log(canvas, ctx)
    ctx.font = 'bold 18pt Arial';
    ctx.save();
    ctx.translate(36, 270);
    ctx.rotate(-0.5 * Math.PI);
    ctx.fillStyle = '#000';

    switch (lineas) {
      case 1:
        ctx.fillText(text, 0, -5);
        break;
      case 2:
        ctx.fillText(text, 0, -20);
        ctx.fillText(text2, 0, 7);
        break;
      case 3:
        ctx.fillText(text, 0, -20);
        ctx.fillText(text2, 0, 7);
        ctx.fillText(text3, 0, 29);
        break;
    }

    ctx.restore();
    return canvas.toDataURL();
  }
}

const imprimir_CLAPI001 = (params) => {
  var formato = new formato_CLAPI001(params);
  formato._init();
};

module.exports = {
  imprimir_CLAPI001,
};
