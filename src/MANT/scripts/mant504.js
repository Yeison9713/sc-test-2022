var $this = new Object();
'use strict';
/** 
 * @developer  Pablo.O "pabloolguin@prosoft.com.co"
 * @author     SC-PROSOFT
 * @descrip    Release Electron - Mant504 opcion [5-4] subs (1,2,3,4,5) RM Version.
 * @descrip2   --Informes Produccion.
 * @date       16/12/2020. CREACION
 */

new Vue({
  el: "#MANT504",
  data: {
    /*----------------V A R I A B L E S --------------*/
    MANT541: {
      division: null,
      grupo: null,
      codigo: null,
      fecha_ini: null,
      fecha_fin: null,
      preguntas: { fecha: 'S', producto: 'S', operario: 'S' }
    },    // Informe Produccion x Equipo;
    MANT542: {
      fecha_ini: null,
      fecha_fin: null,
      operario: null,
      // Discriminar por...  => 'preguntas'
      preguntas: { fecha: 'S', producto: 'S', maquina: 'S' }
    },    // Informe Produccion x Operario;
    MANT543: {
      division: null,
      grupo: null,
      codigo: null,
      fecha_ini: null,
      fecha_fin: null,
      // Discriminar por...  => 'preguntas'
      preguntas: { fecha: 'S', operario: 'S' }
    },    // Informe Equipo  / Consumo;
    MANT544: {
      division: null,
      grupo_equipo: null,
      codigo: null,
      fecha_ini: null,
      fecha_fin: null,
      grupo_consumible: null,
      // Discriminar por...  => 'preguntas'
      preguntas: { planilla: 'S', operario: 'S' }
    },    // Informe Consumo / Equipo;
    MANT545: {
      grupo_equipo: null,
      codigo: null,
      division: null,
      fecha_ini: null,
      fecha_fin: null,
      // Discriminar por...  => 'preguntas'
      preguntas: { division: 'S' }
    },    // Informe Produccion x Consumo;
    listado_divisiones_mant504: [],
    listado_grupos_mant504: [],
    listado_articulos_mant504: []
  }, created: async function () {
    const opcion = Array.from(localStorage.idOpciondata).pop();
    switch (opcion) {
      case '1': produccionEquipo_mant504(); break;
      case '2': produccionOperario_mant504(); break;
      case '3': equipoConsumo_mant504(); break;
      case '4': consumoEquipo_mant504(); break;
      case '5': produccionConsumo_mant504(); break;
      default: break;
    }
    $this = this;
    _inputControl('disabled');
    _inputControl('reset');

    $this._cargarColeccionDatos_mant504();
  },
  methods: {
    /*<--------------- MANT541------------------>*/
    validarDivision_mant541() {
      validarInputs(
        { form: `#validarDivision_mant541`, orden: "1", },
        () => {
          $this['MANT541'].division = $this['MANT541'].division;
          CON851P('03', $this.validarDivision_mant541, salir_programa_mant540());
        },
        () => {
          const validaciones_div = ['**', 'undefined', null];
          if (validaciones_div.includes($this['MANT541'].division)) {
            $this['MANT541'].division = '**';
            document.getElementById('descripDivision_mant541').value = "Todos los Equipos";
            $this.validarGrupo_mant541();
          } else {
            let data_division = $this.listado_divisiones_mant504.find(x => x.COD.trim() === $this['MANT541'].division.trim());
            if (data_division) {
              document.getElementById('descripDivision_mant541').value = data_division.DESCRIP;
              $this.validarGrupo_mant541();
            } else {
              CON851("01", "No existe Division", $this.validarDivision_mant541(), "error", "error");
            }
          }
        })
    },
    validarGrupo_mant541() {
      validarInputs(
        { form: `#validarGrupo_mant541`, orden: "1", },
        () => {
          $this['MANT541'].grupo = $this['MANT541'].grupo;
          $this.validarDivision_mant541();
        },
        () => {
          const validaciones_grupo = ['**', 'undefined', null];
          if (validaciones_grupo.includes($this['MANT541'].grupo)) {
            $this['MANT541'].grupo = '**';
            document.getElementById('descripGrupo_mant541').value = "Todos los Grupos";
            $this.validarCodigo_mant541();
          } else {
            let data_grupo = $this.listado_grupos_mant504.find(x => x.TIPO.concat(x.GRUPO.trim()) === '2'.concat($this['MANT541'].grupo.trim()));
            if (data_grupo) {
              $this['MANT541'].grupo = $this['MANT541'].grupo;
              document.getElementById('descripGrupo_mant541').value = data_grupo.DESCRIP;
              $this.validarCodigo_mant541();
            } else {
              CON851("01", "No existe Grupo", $this.validarGrupo_mant541(), "error", "error");
            }
          }

        })
    },
    validarCodigo_mant541() {
      validarInputs(
        { form: `#validarCodigo_mant541`, orden: "1", },
        () => {
          $this['MANT541'].codigo = $this['MANT541'].codigo;
          $this.validarGrupo_mant541();
        },
        () => {
          const validaciones_grupo = ['**', 'undefined', null];
          if (validaciones_grupo.includes($this['MANT541'].codigo)) {
            $this['MANT541'].codigo = '*';
            document.getElementById('codigo_mant541').value = "Todos los Articulos";
            $this.validarCodigo_mant541();
          } else {
            const nro = $this['MANT541'].codigo.trim();
            const llave_art = '2'.concat($this['MANT541'].grupo, nro);

            let data_codigo = $this.listado_articulos_mant504.find(x => x.LLAVE_ART.trim() == llave_art.trim());

            if (data_codigo) {
              document.getElementById('descripCodigo_mant541').value = data_division.DESCRIP_ART;
              $this.validarCodigo_mant541();
            } else {
              CON851("01", "No existe Articulo", $this.validarCodigo_mant541(), "error", "error");
            }
          }
        })
    },

    /*<--------------- MANT541-----------------/>*/

    /*---------------------- V E N T A N A S ( F8 )----------------------*/
    ventanaDivisiones_mant504(caja) {
      caja = (caja.target.id).split('_').pop().match(/\d+/)[0];
      _ventanaDatos(
        {
          titulo: "VENTANA DIVISIONES",
          columnas: ["COD", "DESCRIP"], label: ["Código", "Division"],
          callback_esc: () => $this.validarDivision_`${caja}`,
          callback: (data) => {
            $this[`MANT${caja}`].division = data.COD;
            _enterInput(`#division_mant${caja}`);
          },
          data: $this.listado_divisiones_mant504
        }
      );
    },
    ventanaGrupos_mant504(caja) {
      caja = (caja.target.id).split('_').pop().match(/\d+/)[0];
      const consumible = (caja.target.id).indexOf('consumible') ? true : false;
      _ventanaDatos(
        {
          titulo: "VENTANA GRUPOS",
          columnas: ["TIPO", "GRUPO", "DESCRIP"], label: ["Código", "Descrip"],
          callback_esc: () => validarGrupo_`${caja}`,
          callback: (data) => {
            if (!consumible) {
              $this[`MANT${caja}`].grupo = data.GRUPO;
              _enterInput(`#grupo_mant${caja}`);
            } else {
              $this[`MANT${caja}`].grupo_consumible = data.GRUPO;
              _enterInput(`#grconsumible_${caja}`);
            }
          },
          data: $this.listado_grupos_mant504.filter(x => parseInt(x.TIPO.trim()) == 2)
        }
      );
    },
    ventanaArticulos_mant504(caja) {
      caja = (caja.target.id).split('_').pop().match(/\d+/)[0];
      var datos = $this.listado_articulos_mant504.filter(x => x.GRUPO_ART == $this['MANT541'].grupo.trim());

      _ventanaDatos(
        {
          titulo: "VENTANA ARTICULOS",
          columnas: ["LLAVE_ART", "DESCRIP1_ART", "DESCRIP_ART", "UNIDAD", "PRECIO"],
          label: ["Código   ", "   ", "Descripción", "Unidad", " ", "Precio"],
          callback_esc: () => $this[`validarGrupo_mant${caja}`](),
          callback: (data) => {
            $this.global_mant503['COD_PRODUCTO'] = '';
            $this.global_mant503['DESC_PRODUCTO'] = '';
            $this.global_mant503['COD_PRODUCTO'] = data.LLAVE_ART.substring(3, 18).trim();
            $this.global_mant503['DESC_PRODUCTO'] = data.DESCRIP_ART;
            _enterInput(`#cod_producto`);

          },
          data: datos
        }
      );
    },
    /*-------------------------- R U T I N A S -----------------------*/
    _cargarColeccionDatos_mant504() {
      $this._obtenerDataArray('ARTICULOS', 'ARTICULOS', 'ON')
        .then(articulos => {
          $this.listado_articulos = articulos;
          return $this._obtenerDataArray('DIVISION', 'CODIGOS', '');
        })
        .then(divisiones => {
          $this.listado_divisiones_mant504 = divisiones;
          return $this._obtenerDataArray('GRUPOS', 'GRUPOS', 'ONLY');
        })
        .then(grupos => {
          $this.listado_grupos_mant504 = grupos;
          const opcion = Array.from(localStorage.idOpciondata).pop();
          switch (opcion) {
            case '1': $this.validarDivision_mant541(); break;
            case '2': $this.validarFechaIni_mant542(); break;
            case '3': $this.validarDivision_mant543(); break;
            case '4': $this.validarDivision_mant544(); break;
            case '5': $this.validarGrupo_mant545(); break;
          }
        })
    },
    async _obtenerDataArray(nombre, indice, estado) {
      return new Promise((resolve, reject) => {
        const nombreFD = nombre; let datos;
        setTimeout(() => {
          obtenerDatosCompletos({ nombreFd: nombreFD }, (data) => {
            if (data[indice].length > 1) data[indice].pop();
            datos = data[indice];
            datos
              ? resolve(datos)
              : reject(new Error('error al consultar coleccion ' + nombreFD));
          }, estado);
        }, null)
      })
    }
  }
});

/*--------- F O R M U L A R I O S  I N F O R M E S ---------*/
function produccionEquipo_mant504() {
  const fuente = `${esquema_produccionEquipo()}`;
  document.getElementById("MANT504").innerHTML = '';
  $('#MANT504').append(fuente);
  nomOpcion('5,4,1 - Informe producción por equipo');
}

function produccionOperario_mant504() {
  const fuente = `${esquema_produccionOperario()}`;
  document.getElementById("MANT504").innerHTML = '';
  $('#MANT504').append(fuente);
  nomOpcion('5,4,2 - Informe producción por operario');
}

function equipoConsumo_mant504() {
  const fuente = `${esquema_equipoConsumo()}`
  document.getElementById("MANT504").innerHTML = '';
  $('#MANT504').append(fuente);
  nomOpcion('5,4,3 - Informe de equipos por consumo');
}

function consumoEquipo_mant504() {
  const fuente = `${esquema_consumoEquipo()}`;
  document.getElementById("MANT504").innerHTML = '';
  $('#MANT504').append(fuente);
  nomOpcion('5,4,4 - Informe de consumos por equipo');
}

function produccionConsumo_mant504() {
  const fuente = `${esquema_produccionConsumo()}`;
  document.getElementById("MANT504").innerHTML = '';
  $('#MANT504').append(fuente);
  nomOpcion('5,4,5 - Informe de producción y consumos');
}

/*---------------------- E S Q U E M A S ----------------------*/
function esquema_produccionEquipo() {
  const esquema = `
  <div class="col-md-2 col-sm-2 col-xs-6" id="validarDivision_mant541" style="margin-right:-22px;">
  <div class="inline-inputs">
      <label class="col-md-5 col-sm-5 col-xs-12">Division:</label>
      <div class="input-group col-md-7 col-sm-7 col-xs-6">
          <input id="division_mant541" type="text" v-model="MANT541.division"
              onkeyup="this.value = this.value.toUpperCase();" @keydown.119="ventanaDivisiones_mant504"
              class="form-control col-md-12 col-sm-12 col-xs-12 uppercase" maxlength="2" data-orden="1">
      </div>
      <button id="divisionBtn_mant541" type="button" class="btn col-md-2 col-sm-2 col-xs-2 f8-Btn"
      v-on:click="ventanaDivisiones_mant504">
          <i class="icon-magnifier"></i>
      </button>
  </div>
</div>
<div class="col-md-2 col-sm-2 col-xs-2">
  <div class="inline-inputs">
      <div class="input-group col-md-12 col-sm-12 col-xs-12">
          <input id="descripDivision_mant541" type="text" class="form-control col-md-12 col-sm-12 col-xs-12 uppercase">
      </div>
  </div>
</div>
  <div class="col-md-2 col-sm-2 col-xs-2" id="validarGrupo_mant541" style="margin-right:-18px;padding-left:0px;">
  <div class="inline-inputs">
      <label class="col-md-5 col-sm-5 col-xs-12">Grupo:</label>
      <div class="input-group col-md-7 col-sm-7 col-xs-6">
          <input id="grupo_mant541" type="text" v-model="MANT541.grupo"
          @keydown.119="ventanaGrupos_mant504" onkeyup="this.value = this.value.toUpperCase();"
          class="form-control col-md-12 col-sm-12 col-xs-12 uppercase" maxlength="2" data-orden="1">
      </div>
      <button id="grupoBtn_mant541" type="button" class="btn col-md-2 col-sm-2 col-xs-2 f8-Btn"
      v-on:click="ventanaGrupos_mant504">
          <i class="icon-magnifier"></i>
      </button>
  </div>
</div>
<div class="col-md-2 col-sm-2 col-xs-2">
  <div class="inline-inputs">
      <div class="input-group col-md-12 col-sm-12 col-xs-12">
          <input id="descripGrupo_mant541" type="text" class="form-control col-md-12 col-sm-12 col-xs-12 uppercase">
      </div>
  </div>
</div>
<div class="col-md-2 col-sm-2 col-xs-2" id="validarCodigo_mant541" style="margin-right:-23px;padding-left: 0px;">
  <div class="inline-inputs">
      <label class="col-md-5 col-sm-5 col-xs-12">Codigo:</label>
      <div class="input-group col-md-7 col-sm-7 col-xs-6">
          <input id="codigo_mant541" type="text" v-model="MANT541.codigo"
            @keydown.119="ventanaArticulos_mant504"
            class="form-control col-md-12 col-sm-12 col-xs-12 uppercase" maxlength="13" data-orden="1">
      </div>
      <button id="codigoBtn_mant541" type="button" class="btn col-md-2 col-sm-2 col-xs-2 f8-Btn" 
      v-on:click="ventanaArticulos_mant504">
      <i class="icon-magnifier"></i>
      </button>
  </div>
</div>
<div class="col-md-2 col-sm-2 col-xs-2" style="padding-right:0px;">
  <div class="inline-inputs">
      <div class="input-group col-md-12 col-sm-12 col-xs-12">
          <input id="descripCodigo_mant541" type="text" class="form-control col-md-12 col-sm-12 col-xs-12 uppercase" maxlength="12">
      </div>
  </div>
</div>

<!-- Otra fila -->
<div class="salto-linea"></div>

<div class="col-md-6 col-sm-6 col-xs-6" id="validarFechaIni_mant541" style="margin-right:-22px;" >
  <div class="inline-inputs">
      <label class="col-md-5 col-sm-5 col-xs-12">Fecha Inicial:</label>
      <div class="input-group col-md-7 col-sm-7 col-xs-6">
          <input id="fechaIni_mant541" type="text" v-model="MANT541.fecha_ini"
              class="form-control col-md-12 col-sm-12 col-xs-12 uppercase" maxlength="8" data-orden="1">
      </div>
  </div>
</div>
<div class="col-md-6 col-sm-6 col-xs-6" id="validarFechaFin_mant541"  >
  <div class="inline-inputs">
      <label class="col-md-5 col-sm-5 col-xs-12">Fecha Final:</label>
      <div class="input-group col-md-7 col-sm-7 col-xs-7" style="padding-right:26px;">
          <input id="fechaFin_mant541" type="text" v-model="MANT541.fecha_fin"
              class="form-control col-md-12 col-sm-12 col-xs-12 uppercase" maxlength="8" data-orden="1">
      </div>
  </div>
</div>

<!-- Otra fila -->
<div class="salto-linea"></div>

<div class="col-md-4 col-sm-4 col-xs-4" id="validarpregFecha_mant541" style="margin-right:-40px;" >
  <div class="inline-inputs">
      <label class="col-md-9 col-sm-9 col-xs-12">Discriminar por Fecha? </label>
      <div class="input-group col-md-3 col-sm-3 col-xs-3" style="padding-right:20px;">
          <input type="text" v-model="MANT541.preguntas.fecha"
              class="form-control col-md-12 col-sm-12 col-xs-12 uppercase" placeholder="S/N" maxlength="1" data-orden="1">
      </div>
  </div>
</div>
<div class="col-md-4 col-sm-4 col-xs-4" id="validarpregProducto_mant541"  style="margin-right:-22px;">
  <div class="inline-inputs">
      <label class="col-md-9 col-sm-9 col-xs-12">Discriminar por Producto? </label>
      <div class="input-group col-md-3 col-sm-3 col-xs-3" >
          <input type="text" v-model="MANT541.preguntas.producto"
              class="form-control col-md-12 col-sm-12 col-xs-12 uppercase" placeholder="S/N" maxlength="1" data-orden="1">
      </div>
  </div>
</div>
<div class="col-md-4 col-sm-4 col-xs-4" id="validarpregOperario_mant541" style="padding-right:0px;">
  <div class="inline-inputs">
      <label class="col-md-9 col-sm-9 col-xs-12">Discriminar por Operario? </label>
      <div class="input-group col-md-3 col-sm-3 col-xs-3" >
          <input type="text" v-model="MANT541.preguntas.operario"
              class="form-control col-md-12 col-sm-12 col-xs-12 uppercase" placeholder="S/N" maxlength="1" data-orden="1">
      </div>
  </div>
</div>
</div>
</div>`;
  return esquema;
}

function esquema_produccionOperario() {
  const esquema = `
<div class="col-md-4 col-sm-4 col-xs-4" id="validarFechaIni_mant542" style="margin-right:-22px;" >
  <div class="inline-inputs">
      <label class="col-md-5 col-sm-5 col-xs-12">Fecha Inicial:</label>
      <div class="input-group col-md-7 col-sm-7 col-xs-6">
          <input id="fechaIni_mant542" type="text" v-model="MANT542.fecha_ini"
              class="form-control col-md-12 col-sm-12 col-xs-12 uppercase" maxlength="8" data-orden="1">
      </div>
  </div>
</div>
<div class="col-md-4 col-sm-4 col-xs-4" id="validarFechaFin_mant542"  style="margin-right:-21px;" >
  <div class="inline-inputs">
      <label class="col-md-5 col-sm-5 col-xs-12">Fecha Final:</label>
      <div class="input-group col-md-7 col-sm-7 col-xs-7" >
          <input id="fechaFin_mant542" type="text" v-model="MANT542.fecha_fin"
              class="form-control col-md-12 col-sm-12 col-xs-12 uppercase" maxlength="8" data-orden="1">
      </div>
  </div>
</div>
<div class="col-md-4 col-sm-4 col-xs-4" id="validarOperario_mant542"  >
  <div class="inline-inputs">
      <label class="col-md-5 col-sm-5 col-xs-12">Operario:</label>
      <div class="input-group col-md-7 col-sm-7 col-xs-7" style="padding-right:5px;">
          <input id="operario_mant542" type="text" v-model="MANT542.operario"
              class="form-control col-md-12 col-sm-12 col-xs-12 uppercase" maxlength="10" data-orden="1">
      </div>
  </div>
</div>

<!-- Otra fila -->
<div class="salto-linea"></div>

<div class="col-md-4 col-sm-4 col-xs-4" id="validarpregFecha_mant542" style="margin-right:-40px;" >
  <div class="inline-inputs">
      <label class="col-md-9 col-sm-9 col-xs-12">Discriminar por Fecha? </label>
      <div class="input-group col-md-3 col-sm-3 col-xs-3" style="padding-right:20px;">
          <input type="text" v-model="MANT542.preguntas.fecha"
              class="form-control col-md-12 col-sm-12 col-xs-12 uppercase" placeholder="S/N" maxlength="1" data-orden="1">
      </div>
  </div>
</div>
<div class="col-md-4 col-sm-4 col-xs-4" id="validarpregProducto_mant542"  style="margin-right:-22px;">
  <div class="inline-inputs">
      <label class="col-md-9 col-sm-9 col-xs-12">Discriminar por Producto? </label>
      <div class="input-group col-md-3 col-sm-3 col-xs-3" >
          <input type="text" v-model="MANT542.preguntas.producto"
              class="form-control col-md-12 col-sm-12 col-xs-12 uppercase" placeholder="S/N" maxlength="1" data-orden="1">
      </div>
  </div>
</div>
<div class="col-md-4 col-sm-4 col-xs-4" id="validarpregOperario_mant542" style="padding-right:0px;">
  <div class="inline-inputs">
      <label class="col-md-9 col-sm-9 col-xs-12">Discriminar por Máquina? </label>
      <div class="input-group col-md-3 col-sm-3 col-xs-3" >
          <input type="text" v-model="MANT542.preguntas.maquina"
              class="form-control col-md-12 col-sm-12 col-xs-12 uppercase" placeholder="S/N" maxlength="1" data-orden="1">
      </div>
  </div>
</div>

</div>
</div>`;
  return esquema;
}

function esquema_equipoConsumo() {
  const esquema = `
  <div class="col-md-2 col-sm-2 col-xs-6" id="validarDivision_mant543" style="margin-right:-22px;">
  <div class="inline-inputs">
      <label class="col-md-5 col-sm-5 col-xs-12">Division:</label>
      <div class="input-group col-md-7 col-sm-7 col-xs-6">
          <input id="division_mant543" type="text" v-model="MANT543.division"
          @keydown.119="ventanaDivisiones_mant504" class="form-control col-md-12 col-sm-12 col-xs-12 uppercase" maxlength="2" data-orden="1">
      </div>
      <button id="divisionBtn_mant543" type="button" class="btn col-md-2 col-sm-2 col-xs-2 f8-Btn"
      v-on:click="ventanaDivisiones_mant504">
          <i class="icon-magnifier"></i> 
      </button>
  </div>
</div>
<div class="col-md-2 col-sm-2 col-xs-2">
  <div class="inline-inputs">
      <div class="input-group col-md-12 col-sm-12 col-xs-12">
          <input id="descripDivision_mant543" type="text" class="form-control col-md-12 col-sm-12 col-xs-12 uppercase" maxlength="12">
      </div>
  </div>
</div>
  <div class="col-md-2 col-sm-2 col-xs-2" id="validarGrupo_mant543" style="margin-right:-18px;padding-left:0px;">
  <div class="inline-inputs">
      <label class="col-md-5 col-sm-5 col-xs-12">Grupo:</label>
      <div class="input-group col-md-7 col-sm-7 col-xs-6">
          <input id="grupo_mant543" type="text" v-model="MANT543.grupo" 
              @keydown.119="ventanaGrupos_mant504"
              class="form-control col-md-12 col-sm-12 col-xs-12 uppercase" maxlength="2" data-orden="1">
      </div>
      <button id="grupoBtn_mant543" type="button" class="btn col-md-2 col-sm-2 col-xs-2 f8-Btn"
          v-on:click="ventanaGrupos_mant504">
          <i class="icon-magnifier"></i>
      </button>
  </div>
</div>
<div class="col-md-2 col-sm-2 col-xs-2">
  <div class="inline-inputs">
      <div class="input-group col-md-12 col-sm-12 col-xs-12">
          <input id="descripGrupo_mant543" type="text" class="form-control col-md-12 col-sm-12 col-xs-12 uppercase" maxlength="12">
      </div>
  </div>
</div>
<div class="col-md-2 col-sm-2 col-xs-2" id="validarCodigo_mant543" style="margin-right:-23px;padding-left: 0px;">
  <div class="inline-inputs">
      <label class="col-md-5 col-sm-5 col-xs-12">Codigo:</label>
      <div class="input-group col-md-7 col-sm-7 col-xs-6">
          <input id="codigo_mant543" type="text" v-model="MANT543.codigo"
              @keydown.119="ventanaArticulos_mant504"
              class="form-control col-md-12 col-sm-12 col-xs-12 uppercase" maxlength="13" data-orden="1">
      </div>
      <button id="codigoBtn_mant543" type="button" class="btn col-md-2 col-sm-2 col-xs-2 f8-Btn"
           @keydown.119="ventanaArticulos_mant504"
          <i class="icon-magnifier"></i>
      </button>
  </div>
</div>
<div class="col-md-2 col-sm-2 col-xs-2" style="padding-right:0px;">
  <div class="inline-inputs">
      <div class="input-group col-md-12 col-sm-12 col-xs-12">
          <input id="descripCodigo_mant543" type="text" class="form-control col-md-12 col-sm-12 col-xs-12 uppercase" maxlength="12">
      </div>
  </div>
</div>

<!-- Otra fila -->
<div class="salto-linea"></div>

<div class="col-md-6 col-sm-6 col-xs-6" id="validarFechaIni_mant543" style="margin-right:-22px;" >
  <div class="inline-inputs">
      <label class="col-md-5 col-sm-5 col-xs-12">Fecha Inicial:</label>
      <div class="input-group col-md-7 col-sm-7 col-xs-6">
          <input id="fechaIni_mant543" type="text" v-model="MANT543.fecha_ini"
              class="form-control col-md-12 col-sm-12 col-xs-12 uppercase" maxlength="8" data-orden="1">
      </div>
  </div>
</div>
<div class="col-md-6 col-sm-6 col-xs-6" id="validarFechaFin_mant543"  >
  <div class="inline-inputs">
      <label class="col-md-5 col-sm-5 col-xs-12">Fecha Final:</label>
      <div class="input-group col-md-7 col-sm-7 col-xs-7" style="padding-right:26px;">
          <input id="fechaFin_mant543" type="text" v-model="MANT543.fecha_fin"
              class="form-control col-md-12 col-sm-12 col-xs-12 uppercase" maxlength="8" data-orden="1">
      </div>
  </div>
</div>

<!-- Otra fila -->
<div class="salto-linea"></div>

<div class="col-md-6 col-sm-6 col-xs-6" id="validarpregFecha_mant543" style="margin-right:-40px;" >
  <div class="inline-inputs">
      <label class="col-md-9 col-sm-9 col-xs-12">Discriminar por Fecha? </label>
      <div class="input-group col-md-3 col-sm-3 col-xs-3" style="padding-right:20px;">
          <input type="text" v-model="MANT543.preguntas.fecha"
              class="form-control col-md-12 col-sm-12 col-xs-12 uppercase" placeholder="S/N" maxlength="1" data-orden="1">
      </div>
  </div>
</div>
<div class="col-md-6 col-sm-6 col-xs-6" id="validarpregOperario_mant543" style="padding-right:22px;">
  <div class="inline-inputs">
      <label class="col-md-9 col-sm-9 col-xs-12">Discriminar por Operario? </label>
      <div class="input-group col-md-3 col-sm-3 col-xs-3" >
          <input type="text" v-model="MANT543.preguntas.operario"
              class="form-control col-md-12 col-sm-12 col-xs-12 uppercase" placeholder="S/N" maxlength="1" data-orden="1">
      </div>
  </div>
</div>
</div>
</div>`;
  return esquema;
}

function esquema_consumoEquipo() {
  const esquema = `
  <div class="col-md-2 col-sm-2 col-xs-6" id="validarDivision_mant544" style="margin-right:-22px;">
  <div class="inline-inputs">
      <label class="col-md-5 col-sm-5 col-xs-12">Division:</label>
      <div class="input-group col-md-7 col-sm-7 col-xs-6">
          <input id="division_mant544" type="text" v-model="MANT544.division"
              class="form-control col-md-12 col-sm-12 col-xs-12 uppercase" maxlength="2" data-orden="1">
      </div>
      <button id="divisionBtn_mant544" type="button" class="btn col-md-2 col-sm-2 col-xs-2 f8-Btn">
          <i class="icon-magnifier"></i>
      </button>
  </div>
</div>
<div class="col-md-2 col-sm-2 col-xs-2">
  <div class="inline-inputs">
      <div class="input-group col-md-12 col-sm-12 col-xs-12">
          <input id="descripDivision_mant544" type="text" class="form-control col-md-12 col-sm-12 col-xs-12 uppercase" maxlength="12">
      </div>
  </div>
</div>
  <div class="col-md-2 col-sm-2 col-xs-2" id="validarGrupo_mant544" style="margin-right:-18px;padding-left:0px;">
  <div class="inline-inputs">
      <label class="col-md-5 col-sm-5 col-xs-12">Grupo:</label>
      <div class="input-group col-md-7 col-sm-7 col-xs-6">
          <input id="grupo_mant544" type="text" v-model="MANT544.grupo" @keydown.119="ventanaGrupos_mant504"
              class="form-control col-md-12 col-sm-12 col-xs-12 uppercase" maxlength="2" data-orden="1">
      </div>
      <button    id="grupoBtn_mant544" type="button" class="btn col-md-2 col-sm-2 col-xs-2 f8-Btn"
      v-on:click="ventanaGrupos_mant504">
          <i class="icon-magnifier"></i>
      </button>
  </div>
</div>
<div class="col-md-2 col-sm-2 col-xs-2">
  <div class="inline-inputs">
      <div class="input-group col-md-12 col-sm-12 col-xs-12">
          <input id="descripGrupo_mant544" type="text" class="form-control col-md-12 col-sm-12 col-xs-12 uppercase" maxlength="12">
      </div>
  </div>
</div>
<div class="col-md-2 col-sm-2 col-xs-2" id="validarCodigo_mant544" style="margin-right:-23px;padding-left: 0px;">
  <div class="inline-inputs">
      <label class="col-md-5 col-sm-5 col-xs-12">Codigo:</label>
      <div class="input-group col-md-7 col-sm-7 col-xs-6">
          <input id="codigo_mant544" type="text" v-model="MANT544.codigo"
              @keydown.119="ventanaArticulos_mant504"
              class="form-control col-md-12 col-sm-12 col-xs-12 uppercase" maxlength="13" data-orden="1">
      </div>
      <button id="codigoBtn_mant544" type="button" class="btn col-md-2 col-sm-2 col-xs-2 f8-Btn"
      v-on:click="ventanaArticulos_mant504">
          <i class="icon-magnifier"></i>
      </button>
  </div>
</div>
<div class="col-md-2 col-sm-2 col-xs-2" style="padding-right:0px;">
  <div class="inline-inputs">
      <div class="input-group col-md-12 col-sm-12 col-xs-12">
          <input id="descripCodigo_mant544" type="text" class="form-control col-md-12 col-sm-12 col-xs-12 uppercase" maxlength="12">
      </div>
  </div>
</div>

<!-- Otra fila -->
<div class="salto-linea"></div>

<div class="col-md-6 col-sm-6 col-xs-6" id="validarFechaIni_mant544" style="margin-right:-22px;" >
  <div class="inline-inputs">
      <label class="col-md-5 col-sm-5 col-xs-12">Fecha Inicial:</label>
      <div class="input-group col-md-7 col-sm-7 col-xs-6">
          <input id="fechaIni_mant544" type="text" v-model="MANT544.fecha_ini"
              class="form-control col-md-12 col-sm-12 col-xs-12 uppercase" maxlength="8" data-orden="1">
      </div>
  </div>
</div>
<div class="col-md-6 col-sm-6 col-xs-6" id="validarFechaFin_mant544"  >
  <div class="inline-inputs">
      <label class="col-md-5 col-sm-5 col-xs-12">Fecha Final:</label>
      <div class="input-group col-md-7 col-sm-7 col-xs-7" style="padding-right:26px;">
          <input id="fechaFin_mant544" type="text" v-model="MANT544.fecha_fin"
              class="form-control col-md-12 col-sm-12 col-xs-12 uppercase" maxlength="8" data-orden="1">
      </div>
  </div>
</div>

<!-- Otra fila -->
<div class="salto-linea"></div>

<div class="col-md-12 col-sm-12 col-xs-12 no-padding" style="display:grid;grid-template-columns:1fr 1fr 1fr 1fr">
<div  id="validarGrconsumible_mant544" style="padding-left: 14px;">
  <div class="inline-inputs">
      <label class="col-md-9 col-sm-9 col-xs-12">Grupo Consumible:</label>
      <div class="input-group col-md-7 col-sm-7 col-xs-6">
          <input id="grconsumible_mant544" type="text" v-model="MANT544.grupo" @keydown.119="ventanaGrupos_mant504"
              class="form-control col-md-12 col-sm-12 col-xs-12 uppercase" maxlength="2" data-orden="1">
      </div>
      <button    id="grupoBtn_mant544" type="button" class="btn col-md-2 col-sm-2 col-xs-2 f8-Btn"
      v-on:click="ventanaGrupos_mant504">
          <i class="icon-magnifier"></i>
      </button>
  </div>
</div>
<div  style="padding-right: 16px;">
  <div class="inline-inputs" >
      <div class="input-group col-md-12 col-sm-12 col-xs-12">
          <input id="descripGrupo_mant544" type="text" class="form-control col-md-12 col-sm-12 col-xs-12 uppercase" maxlength="12">
      </div>
  </div>
</div>

<div  id="validarpregFecha_mant544"  style="margin-left: -7px;">
  <div class="inline-inputs">
      <label class="col-md-9 col-sm-9 col-xs-12">Discriminar por Fecha? </label>
      <div class="input-group col-md-4 col-sm-4 col-xs-4"style="padding-right: 7px;">
          <input type="text" v-model="MANT544.preguntas.fecha"
              class="form-control col-md-12 col-sm-12 col-xs-12 uppercase" placeholder="S/N" maxlength="1" data-orden="1">
      </div>
  </div>
</div>
<div  id="validarpregOperario_mant544" style="padding-right: 61px;">
  <div class="inline-inputs">
      <label class="col-md-9 col-sm-9 col-xs-12">Discriminar por Operario? </label>
      <div class="input-group col-md-3 col-sm-3 col-xs-3" >
          <input type="text" v-model="MANT544.preguntas.operario"
              class="form-control col-md-12 col-sm-12 col-xs-12 uppercase" placeholder="S/N" maxlength="1" data-orden="1">
      </div>
  </div>
</div>
</div>
</div>
</div>`;
  return esquema;
}

function esquema_produccionConsumo() {
  const esquema = `
  <div class="col-md-2 col-sm-2 col-xs-2" id="validarGrupo_mant545" style="margin-right:-22px;">
  <div class="inline-inputs">
      <label class="col-md-5 col-sm-5 col-xs-12">Grupo:</label>
      <div class="input-group col-md-7 col-sm-7 col-xs-6">
          <input id="grupo_mant545" type="text" v-model="MANT545.grupo" @keydown.119="ventanaGrupos_mant504"
              class="form-control col-md-12 col-sm-12 col-xs-12 uppercase" maxlength="2" data-orden="1">
      </div>
      <button    id="grupoBtn_mant545" type="button" class="btn col-md-2 col-sm-2 col-xs-2 f8-Btn"
      v-on:click="ventanaGrupos_mant504">
          <i class="icon-magnifier"></i>
      </button>
  </div>
</div>
<div class="col-md-2 col-sm-2 col-xs-2">
  <div class="inline-inputs" style="margin-right: -9px;">
      <div class="input-group col-md-12 col-sm-12 col-xs-12">
          <input id="descripGrupo_mant544" type="text" class="form-control col-md-12 col-sm-12 col-xs-12 uppercase" maxlength="12">
      </div>
  </div>
</div>
<div class="col-md-2 col-sm-2 col-xs-2" id="validarCodigo_mant544" style="margin-right:-23px;padding-left: 0px;">
  <div class="inline-inputs">
      <label class="col-md-5 col-sm-5 col-xs-12">Codigo:</label>
      <div class="input-group col-md-7 col-sm-7 col-xs-6">
          <input id="codigo_mant544" type="text" v-model="MANT544.codigo"
              @keydown.119="ventanaArticulos_mant504"
              class="form-control col-md-12 col-sm-12 col-xs-12 uppercase" maxlength="13" data-orden="1">
      </div>
      <button id="codigoBtn_mant544" type="button" class="btn col-md-2 col-sm-2 col-xs-2 f8-Btn"
      v-on:click="ventanaArticulos_mant504">
          <i class="icon-magnifier"></i>
      </button>
  </div>
</div>
<div class="col-md-2 col-sm-2 col-xs-2" style="padding-right:0px;">
  <div class="inline-inputs" >
      <div class="input-group col-md-12 col-sm-12 col-xs-12">
          <input id="descripCodigo_mant544" type="text" class="form-control col-md-12 col-sm-12 col-xs-12 uppercase" maxlength="12">
      </div>
  </div>
</div>
<div class="col-md-2 col-sm-2 col-xs-6" id="validarDivision_mant545" style="margin-right:-25px; padding-left:7px;">
<div class="inline-inputs" >
    <label class="col-md-5 col-sm-5 col-xs-12">Division:</label>
    <div class="input-group col-md-7 col-sm-7 col-xs-6">
        <input id="division_mant545" type="text" v-model="MANT545.division"
            class="form-control col-md-12 col-sm-12 col-xs-12 uppercase" maxlength="2" data-orden="1">
    </div>
    <button id="divisionBtn_mant545" type="button" class="btn col-md-2 col-sm-2 col-xs-2 f8-Btn">
        <i class="icon-magnifier"></i>
    </button>
</div>
</div>
<div class="col-md-2 col-sm-2 col-xs-2">
<div class="inline-inputs" style="margin-right: -21px;">
    <div class="input-group col-md-12 col-sm-12 col-xs-12">
        <input id="descripDivision_mant545" type="text" class="form-control col-md-12 col-sm-12 col-xs-12 uppercase" maxlength="12">
    </div>
</div>
</div>

<!-- Otra fila -->
<div class="salto-linea"></div>

<div class="col-md-12 col-sm-12 col-xs-12 no-padding" style="display:grid;grid-template-columns:1fr 1fr 1fr">
<div  id="validarpregDivision_mant545"  style="margin-left: 16px;">
  <div class="inline-inputs">
      <label class="col-md-9 col-sm-9 col-xs-12">Separar por División? </label>
      <div class="input-group col-md-4 col-sm-4 col-xs-4"style="padding-right: 7px;">
          <input type="text" v-model="MANT545.preguntas.division"
              class="form-control col-md-12 col-sm-12 col-xs-12 uppercase" placeholder="S/N" maxlength="1" data-orden="1">
      </div>
  </div>
</div>
<div  id="validarpregFecha_mant545"  style="margin-left: 0px;">
  <div class="inline-inputs">
      <label class="col-md-9 col-sm-9 col-xs-12">Discriminar por Fecha? </label>
      <div class="input-group col-md-4 col-sm-4 col-xs-4"style="padding-right: 7px;">
          <input type="text" v-model="MANT545.preguntas.fecha"
              class="form-control col-md-12 col-sm-12 col-xs-12 uppercase" placeholder="S/N" maxlength="1" data-orden="1">
      </div>
  </div>
</div>
<div  id="validarpregOperario_mant545" style="padding-right: 65px;">
  <div class="inline-inputs">
      <label class="col-md-9 col-sm-9 col-xs-12">Discriminar por Operario? </label>
      <div class="input-group col-md-3 col-sm-3 col-xs-3" >
          <input type="text" v-model="MANT545.preguntas.operario"
              class="form-control col-md-12 col-sm-12 col-xs-12 uppercase" placeholder="S/N" maxlength="1" data-orden="1">
      </div>
  </div>
</div>
</div>
<!-- Otra fila -->
<div class="salto-linea"></div>

<div class="col-md-6 col-sm-6 col-xs-6" id="validarFechaIni_mant545" style="margin-right:-22px;" >
  <div class="inline-inputs">
      <label class="col-md-5 col-sm-5 col-xs-12">Fecha Inicial:</label>
      <div class="input-group col-md-7 col-sm-7 col-xs-6">
          <input id="fechaIni_mant545" type="text" v-model="MANT545.fecha_ini"
              class="form-control col-md-12 col-sm-12 col-xs-12 uppercase" maxlength="8" data-orden="1">
      </div>
  </div>
</div>
<div class="col-md-6 col-sm-6 col-xs-6" id="validarFechaFin_mant545"  >
  <div class="inline-inputs">
      <label class="col-md-5 col-sm-5 col-xs-12">Fecha Final:</label>
      <div class="input-group col-md-7 col-sm-7 col-xs-7" style="padding-right:26px;">
          <input id="fechaFin_mant545" type="text" v-model="MANT545.fecha_fin"
              class="form-control col-md-12 col-sm-12 col-xs-12 uppercase" maxlength="8" data-orden="1">
      </div>
  </div>
</div>
</div>
</div>`;
  return esquema;
}
/*---------------------- R U T I N A S ----------------------*/
function nomOpcion(nombre) {
  let a = Array.from($('.page-breadcrumb'));
  if (a.length < 2) nombreOpcion(nombre);
}
function _FloatText(parametros) {
  if (parametros.msg) {
    if (parametros.msg.length < 5) {
      if (parametros.estado == 'on') {
        var tam = {
          0: '0',
          1: '21',
          2: '43',
          3: '65'
        }
        for (var i in parametros.msg) {
          $('#body_main').append(
            '<div class="floattxt" style="position: absolute; bottom:0%; left: ' + tam[i] + '%; transform: translate:(-1%,90%); z-index: 999; width: 20%; height: 4%; display: flex; justify-content: center; align-items: center">' +
            '<kbd style="color:#333; background-color: #F4D03F; width: 100%; height: 100%; display: flex; justify-content: center; align-items: center; opacity:0.7">' + parametros.msg[i].mensaje + '</kbd>' +
            '</div>'
          )
        }
      }
    } else {
      CON851('_Floattext', 'Se acepta un maximo de 4 banner', null, 'error', 'Error');
      _toggleNav()
    }
  } else {
    if (parametros.estado == 'off') {
      var tam = $('.floattxt').length - 1;
      for (var i in $('.floattxt')) {
        if (!isNaN(i)) {
          console.log(i);
          $('.floattxt').remove();
        }
      }
    }
  }
}
function salir_programa_mant540() {
  let Window = BrowserWindow.getAllWindows();
  if (Window.length > 1) _cerrarSegundaVentana();
  else _toggleNav();
}