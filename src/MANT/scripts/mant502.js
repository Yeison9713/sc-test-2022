'use strict'

/** 
 * @developer  Pablo.O "pabloolguin@prosoft.com.co"
 * @author     SC-PROSOFT
 * @descrip    Release Electron - Mant502 RM Version.
 * @descrip2   --Mantenimiento Produccion.
 * @date       27/07/2020. CREACION
 */

const moment = require("moment");
/*---------------------- M A S C A R A S ----------------------*/
const mascaras = {
  cantidades:
    IMask.createPipe({
      mask: Number,
      scale: 2,
      radix: '.',
      thousandsSeparator: ',',
      normalizeZeros: true,
      padFractionalZeros: true
    }),
  documentos:
    IMask.createPipe({
      mask: Number,
      scale: 2,
      radix: '.',
      thousandsSeparator: ',',
      normalizeZeros: false,
      padFractionalZeros: false,
    }),
};

/*-------------------------------------------------------------*/
var _this;
new Vue({
  el: "#MANT502",
  data: {
    hojasVida_mant502: [],
    articulos_mant502: [],
    destinos_mant502: [],
    grupos_mant502: [],
    divisiones_mant502: [],
    producionmant_mant502: [],
    terceros_mant502: [],
    global_mant502: {
      LLAVE: null,
      FECHA: [],
      DIVISION: null,
      NOVEDAD: null,
      COMPROBANTE: null,
      GRUPO_EQUIPO: null,
      NRO_EQUIPO: null,
      TIPO_EQUIPO: 2,
      OPER_EQUIPO: null,
      DESC_OPER_EQUIPO: null,
      DESC_EQUIPO: null,
      USO_EQUIPO: null,
      CL_EQUIPO: null,
      TOTAL_M3: 0,
      TOTAL_VCORTO: 0,
      TOTAL_VLARGO: 0,
      TOTAL_RECORRIDO: 0,
      HRKM_INI: 0,
      HRKM_FIN: 0,
      CANT_HR: 0,
      HORAS_DIU: 0,
      HORAS_NOC: 0,
      UNID_CONV: 1,
      // Productos
      GRUPO_PRODUCTO: null,
      VCORTO_PRODUCTO: null,
      VLARGO_PRODUCTO: null,
      COD_PRODUCTO: null,
      M3_PRODUCTO: null,
      DESC_PRODUCTO: null,
      DISTANCIA_DEST: null,
      LECTURA_ANT: null,
      RECORRIDO: 0// Solo si aplica
    },
    TABLA_PRODUCTOS: [],
    ITEM: 1,
    TEXTOS: {
      OBSER: ''
    },
    MANT502: {},
    OPER_MODI: null,
    FECHA_MODI: null
  },
  created: function () {
    _inputControl('disabled');
    _inputControl('reset');
    nombreOpcion('5,2,1 - Entrada Datos Producción (PLANILLA PRODUCCION)');

    _this = this;
    _this.INITIALDATACONFIGURATION = _this.$data;

    _this._cargarColeccionDatos_mant502();
  },
  wath: {
    'TABLA_PRODUCTOS': {
      handler(newValue, oldValue) {
        const busqueda_tabla = _this.TABLA_PRODUCTOS.find(x => x.CODIGO == newValue[item]['CODIGO'])
        if (busqueda_tabla == -1) {
          newValue.forEach((item) => {
            _this.global_mant502['TOTAL_RECORRIDO'] += item.RECORRIDO;
            _this.global_mant502['TOTAL_VCORTO'] += item.VCORTO;
            _this.global_mant502['TOTAL_VLARGO'] += item.VLARGO;
            _this.global_mant502['TOTAL_M3'] += item.M3PRODUCIDOS;
            _this.MANT502['TOTAL_RECORRIDO'] += item.RECORRIDO;
            _this.MANT502['TOTAL_VCORTO'] += item.VCORTO;
            _this.MANT502['TOTAL_VLARGO'] += item.VLARGO;
            _this.MANT502['TOTAL_M3'] += item.M3PRODUCIDOS;

          });
        } else CON851("05", "DATO REPETIDO, PRODUCTO YA EXISTE", _this.validarItem_Producto_mant502(), "error", "error");
      }
    },
    'TOTAL_M3': {
      handler(newvalue, oldvalue) {
        const limit_m3 = _this.global_mant502['M3_PRODUCTO'] * (_this.global_mant502['VCORTO_PRODUCTO'] * _this.global_mant502['VLARGO_PRODUCTO']);
        if (limit_m3 > 0 && (newvalue > limit_m3 || newvalue < (limit_m3 / 2))) CON851("07", "ERROR no coinciden viajes con M3 producidos", _this.validarVcorto_Producto_mant502(), "error", "error");
      }
    }
  },
  methods: {
    /*------------ N A V E G A C I O N  Y  V A L I D A C I O N E S--------------*/
    evaluarCON850_mant502(novedad) {
      _this.MANT502['NOVEDAD'] = novedad.id;
      if (_this.producionmant_mant502 == '') {
        _this.global_mant502['NOVEDAD'] = '7- NUEVO';
        _this.validarDivision_mant502();

      } else {
        switch (_this.MANT502['NOVEDAD']) {
          case '7': case '8': case '9': _this.validarDivision_mant502(); break
          case 'F': _toggleNav(); break;
        }
      }

      _this.global_mant502['NOVEDAD'] = novedad.id + '.- ' + novedad.descripcion;
      _this.MANT502['NOVEDAD'] = novedad.id;
    },
    validarDivision_mant502() {
      validarInputs(
        { form: "#validardivision", orden: "1", },
        () => {
          if (_this.producionmant_mant502 == '') {
            _this.terminarPrograma();
          } else CON850(_this.evaluarCON850_mant502);

        },
        () => {

          if (!_this.divisiones_mant502) CON851("Falta configurar DIVISIONES", "No se pudo cargar DIVISIONES", _this.terminarPrograma(), "error", "error");
          else {
            const division = _this.divisiones_mant502.find(x => x.COD == _this.global_mant502['DIVISION'].split('-')[0].trim());

            if (division) {
              _this.MANT502['NOVEDAD'] = _this.MANT502['DIVISION'];
              _this.global_mant502['DIVISION'] = cerosIzq(division.COD, 2) + '-' + division.DESCRIP;
              _this.MANT502['DIVISION'] = _this.global_mant502['DIVISION'].split('-')[0];
              _this.validarComprobante_mant502();
            } else {
              _this.global_mant502['DIVISION'] = '';
              _this.MANT502['DIVISION'] = '';
              CON851("01", "01", _this.validarDivision_mant502(), "error", "error");
            }
          }
        })
    },
    validarComprobante_mant502() {
      const novedad = _this.global_mant502['NOVEDAD'].split('-')[0].replace('\.', '');
      validarInputs(
        { form: "#validarNro", orden: "1", },
        () => { _this.validarDivision_mant502(); },
        () => {
          var comprobante = _this.producionmant_mant502 == [] ? _this.consultarComprobante_mant502() : 0;
          if (!comprobante && novedad != '7') CON851("03", "03", _this.validarComprobante_mant502(), "error", "error");
          else {
            _this.global_mant502['COMPROBANTE'] = _this.global_mant502['COMPROBANTE'].toString().padStart(6, '0');
            switch (novedad) {
              case '7':
                _this.global_mant502['COMPROBANTE'] = (parseInt(comprobante) + 1).toString().padStart(6, '0');
                _this.MANT502['COMPROBANTE'] = _this.global_mant502['COMPROBANTE'];
                _this.fechaComprobante_mant502('1');

                _this.LOG_NOVEDAD = {
                  'OPER': localStorage.Usuario,
                  'FECHA': moment().format('YYYYMMDD')
                }
                break;

              case '8':
                _this.MANT502['COMPROBANTE'] = ''
                _this.global_mant502['COMPROBANTE'] = _this.global_mant502['COMPROBANTE'].toString().padStart(6, '0');
                _this.MANT502['COMPROBANTE'] = _this.global_mant502['COMPROBANTE'];
                _this.cargarData_mant502();
                break;

              case '9':
                _this.global_mant502['COMPROBANTE'] = comprobante.toString().padStart(6, '0');
                _this.MANT502['COMPROBANTE'] = _this.global_mant502['COMPROBANTE'];
                _this.cargarData_mant502();
                _this.grabarEntradasProduccion_mant502();
                break;
              default: break;
            }
          }
        })
    },
    fechaComprobante_mant502(orden) {
      validarInputs(
        { form: `#validarFecha_${orden}`, orden: "1", },
        () => {
          let indice = parseInt(orden) - 1;
          parseInt(orden) == 1
            ? _this.validarComprobante_mant502()
            : _this.fechaComprobante_mant502(indice.toString());
        },
        () => {
          _this.validarFormato_Fecha_mant502(orden);
        }
      )
    },
    validarGrupo_Equipo_mant502() {
      validarInputs(
        { form: `#validargrEquipo`, orden: "1", },
        () => {
          _this.MANT502['GRUPO_EQUIPO'] = _this.global_mant502['GRUPO_EQUIPO'] ? _this.global_mant502['GRUPO_EQUIPO'].split('-')[0] : _this.global_mant502['GRUPO_EQUIPO'];
          _this.fechaComprobante_mant502('3');
        },
        () => {
          _this.MANT502['GRUPO_EQUIPO'] = '';
          _this.MANT502['GRUPO_EQUIPO'] = _this.global_mant502['GRUPO_EQUIPO'] ? _this.global_mant502['GRUPO_EQUIPO'].split('-')[0] : _this.global_mant502['GRUPO_EQUIPO'];
          const grupo = _this.MANT502['GRUPO_EQUIPO'];
          const buscar = _this.grupos_mant502.find(x => x.TIPO.concat(x.GRUPO) == '2'.concat(grupo));

          if (buscar) {
            _this.MANT502['GRUPO_EQUIPO'] = buscar.GRUPO;
            _this.global_mant502['GRUPO_EQUIPO'] = buscar.GRUPO + '- ' + buscar.DESCRIP;
            _this.validarNro_Equipo_mant502();
          }
          else CON851("01", "NO EXISTE EL GRUPO", _this.validarGrupo_Equipo_mant502(), "error", "error");

        }
      )
    },
    validarNro_Equipo_mant502() {
      validarInputs(
        { form: `#validarnroEquipo`, orden: "1", },
        () => { _this.validarGrupo_Equipo_mant502(); },
        () => {

          _this.MANT502['NRO_EQUIPO'] = _this.global_mant502['NRO_EQUIPO'] ? _this.global_mant502['NRO_EQUIPO'] : ' ';
          const nro = _this.MANT502['NRO_EQUIPO'];

          // Leer archivo Articulos //
          const llave_art = '2'.concat(_this.MANT502['GRUPO_EQUIPO'], nro.trim());
          const res_art = _this.articulos_mant502.find(x => x.LLAVE_ART.trim() == llave_art.trim());

          if (res_art) {
            _this.global_mant502['DESC_EQUIPO'] = res_art.DESCRIP_ART;
            _this.global_mant502['UNID_CONV'] = res_art['U-CONV'];

            _this.MANT502['NRO_EQUIPO'] = _this.global_mant502['NRO_EQUIPO'];
            _this.MANT502['DESC_EQUIPO'] = _this.global_mant502['DESC_EQUIPO'];
            _this.MANT502['UNID_CONV'] = _this.global_mant502['UNID_CONV'];

            // Leer archivo Hoja vida mantenimientos //
            _this.MANT502['TIPO_EQUIPO'] = '2';
            _this.MANT502['TIPO_EQUIPO'] = _this.global_mant502['TIPO_EQUIPO'];
            const llave_hojavida = res_art.LLAVE_ART;

            const res_hojavida = _this.hojasVida_mant502.find(x => x.LLAVE.trim() == llave_hojavida.trim());

            if (res_hojavida) {
              document.querySelector('#nroEquipo').attributes[0].ownerElement.disabled = true;
              const novedad = parseInt(_this.MANT502['NOVEDAD']);
              _this.ventanaUso_mant502();
            } else CON851("01", "FALTA HOJA VIDA EQUIPO", _this.validarNro_Equipo_mant502(), "error", "error");

          } else CON851("01", "CODIGO DE ARTICULO INEXISTENTE", _this.validarNro_Equipo_mant502(), "error", "error");

        }
      )
    },
    validarOperador_Equipo_mant502() {
      _this.global_mant502['OPER_EQUIPO'] = _this.global_mant502['OPER_EQUIPO'] ? mascaras.documentos(_this.global_mant502['OPER_EQUIPO']) : '';
      validarInputs(
        { form: `#validaroper`, orden: "1", },
        () => { setTimeout(_this.ventanaUso_mant502(), 400) },
        () => {
          const novedad = _this.MANT502['NOVEDAD'];

          _this.MANT502['OPER_EQUIPO'] = _this.global_mant502['OPER_EQUIPO'].replace(/\,|\./g, '');

          const operador = _this.MANT502['OPER_EQUIPO'] ? _this.MANT502['OPER_EQUIPO'] : ' ';

          const res_tercero = _this.terceros_mant502.find(x => x.COD.trim() == operador.trim());

          if (res_tercero) {
            _this.global_mant502['DESC_OPER_EQUIPO'] = res_tercero.NOMBRE.trim();

            _this.MANT502['OPER_EQUIPO'] = _this.global_mant502['OPER_EQUIPO'];

            if (novedad == '7') {
              const fecha_w = _this.MANT502['FECHA'].join(',').replace(/\,/g, '');
              const res_produccionmant = _this.producionmant_mant502.filter(x => x.LLAVE_FECHA.trim() == fecha_w);

              res_produccionmant
                ? CON851("5F", "5F", CON850(_this.evaluarCON850_mant502), "error", "error")
                : _this.validarItem_Producto_mant502()

            } else _this.validarItem_Producto_mant502();


          } else CON851("01", "OPERADOR INEXISTENTE", _this.validarOperador_Equipo_mant502(), "error", "error");
        }
      )
    },
    validarItem_Producto_mant502() {
      _FloatText({ estado: "off" });
      _FloatText({ estado: "on", msg: [{ mensaje: "Oprima para F3 para continuar" }] });
      validarInputs(
        {
          event_f3: () => {

            if ($("#tabla_productos tbody tr").length == 0) {

              _this.ITEM = 1;
              _this.MANT502['ITEM'] = _this.ITEM;

              this.validarItem_Producto_mant502();

            } else this.validarTabla_Producto_mant502('0');
          },
          form: `#validaritem`, orden: "1",
        },
        () => {
          CON851P('03', _this.validarItem_Producto_mant502, () => {
            _this.global_mant502['COD_PRODUCTO'] = '';
            _this.global_mant502['DESC_PRODUCTO'] = '';
            _this.global_mant502['GRUPO_PRODUCTO'] = '';
            _this.global_mant502['DESC_PRODUCTO'] = '';

            _this.global_mant502['M3_PRODUCTO'] = '';
            _this.global_mant502['VCORTO_PRODUCTO'] = '';
            _this.global_mant502['VLARGO_PRODUCTO'] = '';
            _this.global_mant502['RECORRIDO'] = '';
            _this.validarOperador_Equipo_mant502();
          })
        },
        () => {

          if (_this.ITEM != '') {

            if (parseInt(_this.ITEM) > 50) {

              CON851('01', 'Item no puede ser mayor a 10', null, 'error', 'error');
              _this.validarItem_Producto_mant502();

            } else {
              const repetido = _this.TABLA_PRODUCTOS.find(x => parseInt(x.ITEM) == parseInt(_this.ITEM));
              if (repetido) {
                _this.ITEM = repetido.ITEM;
                _this.global_mant502['COD_PRODUCTO'] = repetido.CODIGO ? repetido.CODIGO.trim() : '';
                _this.global_mant502['GRUPO_PRODUCTO'] = repetido.GRUPO ? repetido.GRUPO.trim() : '';
                let grupo_prod = _this.global_mant502['GRUPO_PRODUCTO'].trim();
                grupo_prod = !isNaN(grupo_prod) ? parseInt(grupo_prod).toString().padStart(2, '0') : grupo_prod;

                _this.global_mant502['GRUPO_PRODUCTO'] = grupo_prod;
                _this.global_mant502['DESC_PRODUCTO'] = repetido.DESCRIPCION;
                _this.global_mant502['M3_PRODUCTO'] = repetido.M3PRODUCIDOS;
                _this.global_mant502['VCORTO_PRODUCTO'] = repetido.VCORTO;
                _this.global_mant502['VLARGO_PRODUCTO'] = repetido.VLARGO;
                _this.global_mant502['RECORRIDO'] = repetido.RECORRIDO;
              }

              _this.validarGrupo_Producto_mant502();
            }
          } else {
            _this.global_mant502['COD_PRODUCTO'] = '';
            _this.global_mant502['DESC_PRODUCTO'] = '';
            _this.global_mant502['GRUPO_PRODUCTO'] = '';

            _this.global_mant502['M3_PRODUCTO'] = '';
            _this.global_mant502['VCORTO_PRODUCTO'] = '';
            _this.global_mant502['VLARGO_PRODUCTO'] = '';
            _this.global_mant502['RECORRIDO'] = '';

            _this.eliminarItem_Producto_mant502();
          }
        }

      )
    },
    validarGrupo_Producto_mant502() {
      validarInputs(
        {
          event_f3: () => {

            if ($("#tabla_productos tbody tr").length == 0) {

              _this.ITEM = 1;
              _this.MANT502['ITEM'] = _this.ITEM;

              this.validarItem_Producto_mant502();

            } else this.validarTabla_Producto_mant502('0');
          },
          form: `#validargrProducto`, orden: "1",
        },
        () => {
          _this.MANT502['GRUPO_PRODUCTO'] = '';
          _this.MANT502['GRUPO_PRODUCTO'] = _this.MANT502['GRUPO_PRODUCTO'] ? _this.MANT502['GRUPO_PRODUCTO'].split('-')[0].padStart(2, '0') : _this.global_mant502['GRUPO_PRODUCTO'];
          _this.validarItem_Producto_mant502()
        },
        () => {
          _this.MANT502['GRUPO_PRODUCTO'] = '';
          _this.MANT502['GRUPO_PRODUCTO'] = _this.MANT502['GRUPO_PRODUCTO'] ? _this.MANT502['GRUPO_PRODUCTO'].split('-')[0] : _this.global_mant502['GRUPO_PRODUCTO'];
          const grupo = _this.MANT502['GRUPO_PRODUCTO'];

          const buscar = _this.grupos_mant502.find(x => x.TIPO.concat(x.GRUPO) == '0'.concat(grupo));
          if (buscar) {
            _this.global_mant502['GRUPO_PRODUCTO'] = '';
            _this.global_mant502['GRUPO_PRODUCTO'] = buscar.GRUPO.padStart(2, '0') + '- ' + buscar.DESCRIP;
            _this.validarCodigo_Producto_mant502();

          } else CON851("01", "GRUPO ARTICULO INEXISTENTE", _this.validarGrupo_Producto_mant502(), "error", "error");

        }
      )
    },
    validarCodigo_Producto_mant502() {//Lee maestro de articulos
      validarInputs(
        {
          event_f3: () => {

            if ($("#tabla_productos tbody tr").length == 0) {

              _this.ITEM = 1;
              _this.MANT502['ITEM'] = _this.ITEM;

              this.validarItem_Producto_mant502();

            } else this.validarTabla_Producto_mant502('0');
          },
          form: `#validarcodProducto`, orden: "1"
        },
        () => {
          _this.MANT502['GRUPO_PRODUCTO'] = _this.global_mant502['GRUPO_PRODUCTO'] ? _this.global_mant502['GRUPO_PRODUCTO'].split('-')[0].padStart(2, '0') : _this.global_mant502['GRUPO_PRODUCTO'].padStart(2, '0');
          _this.validarGrupo_Producto_mant502()
        },
        () => {
          _this.MANT502['COD_PRODUCTO'] = '';
          _this.MANT502['COD_PRODUCTO'] = _this.global_mant502['COD_PRODUCTO'] ? _this.global_mant502['COD_PRODUCTO'] : _this.global_mant502['COD_PRODUCTO'];

          const grupo = '0'.concat(_this.MANT502['GRUPO_PRODUCTO'].trim());
          const nro = _this.MANT502['COD_PRODUCTO'] ? _this.MANT502['COD_PRODUCTO'].trim() : '';
          const llave_art = grupo.concat(nro.padEnd(13, ' '), '  ');
          const res_art = _this.articulos_mant502.find(x => x.LLAVE_ART.trim() == llave_art.trim());

          const repetido = _this.TABLA_PRODUCTOS.find(x => '0'.concat(x.GRUPO, x.CODIGO).trim() == llave_art.trim());

          if (repetido || repetido == 'undefined') CON851("05", "El articulo ya existe en la tabla", _this.validarCodigo_Producto_mant502(), "error", "error");
          else {
            if (res_art) {
              _this.global_mant502['COD_PRODUCTO'] = res_art['LLAVE_ART'].substring(3, 18).trim();
              _this.global_mant502['DESC_PRODUCTO'] = res_art['DESCRIP_ART'];

              _this.MANT502['COD_PRODUCTO'] = _this.global_mant502['LLAVE_ART'];
              _this.MANT502['DESC_PRODUCTO'] = _this.global_mant502['DESC_PRODUCTO'];

              _this.validarM3producidos_Producto_mant502();
            } else CON851("01", "ARTICULO INEXISTENTE", _this.validarCodigo_Producto_mant502(), "error", "error");
          }
        }
      )
    },
    validarM3producidos_Producto_mant502() {
      validarInputs(
        {
          event_f3: () => {

            if ($("#tabla_productos tbody tr").length == 0) {

              _this.ITEM = 1;
              _this.MANT502['ITEM'] = _this.ITEM;

              this.validarItem_Producto_mant502();

            } else this.validarTabla_Producto_mant502('0');
          },
          form: `#validarM3Producto`, orden: "1"
        },
        () => _this.validarCodigo_Producto_mant502(),
        () => {

          _this.MANT502['M3_PRODUCTO'] = _this.MANT502['M3_PRODUCTO'] ? _this.global_mant502['M3_PRODUCTO'] : _this.global_mant502['M3_PRODUCTO'];

          if (parseInt(_this.MANT502['M3_PRODUCTO']) == 0 || _this.MANT502['M3_PRODUCTO'] == '') {
            CON851("03", "03", _this.validarM3producidos_Producto_mant502(), "error", "error");
          } else _this.validarVcorto_Producto_mant502();

        }
      )
    },
    validarVcorto_Producto_mant502() {
      validarInputs(
        {
          event_f3: () => {

            if ($("#tabla_productos tbody tr").length == 0) {

              _this.ITEM = 1;
              _this.MANT502['ITEM'] = _this.ITEM;

              this.validarItem_Producto_mant502();

            } else this.validarTabla_Producto_mant502('0');
          },
          form: `#validarVcorto`, orden: "1"
        },
        () => _this.validarM3producidos_Producto_mant502(),
        () => {
          _this.MANT502['VCORTO_PRODUCTO'] = _this.global_mant502['VCORTO_PRODUCTO'];
          _this.validarVlargo_Producto_mant502();
        })
    },
    validarVlargo_Producto_mant502() {
      validarInputs(
        {
          event_f3: () => {

            if ($("#tabla_productos tbody tr").length == 0) {

              _this.ITEM = 1;
              _this.MANT502['ITEM'] = _this.ITEM;

              this.validarItem_Producto_mant502();

            } else this.validarTabla_Producto_mant502('0');
          },
          form: `#validarVlargo`, orden: "1"
        },
        () => _this.validarVcorto_Producto_mant502(),
        () => {
          _this.MANT502['VLARGO_PRODUCTO'] = _this.global_mant502['VLARGO_PRODUCTO'];
          _this.validarRecorrido_Producto_mant502();
        })
    },
    validarRecorrido_Producto_mant502() {
      validarInputs(
        {
          event_f3: () => {

            if ($("#tabla_productos tbody tr").length == 0) {

              _this.ITEM = 1;
              _this.MANT502['ITEM'] = _this.ITEM;

              this.validarItem_Producto_mant502();

            } else this.validarTabla_Producto_mant502('0');
          },
          form: `#validarRecorrido`, orden: "1"
        },
        () => _this.validarVlargo_Producto_mant502(),
        () => {

          _this.MANT502['RECORRIDO'] = _this.global_mant502['RECORRIDO'];

          const res_rescorrido = _this.destinos_mant502.find(x =>
            parseInt(x.COD) == parseInt(_this.MANT502['RECORRIDO']));

          if (res_rescorrido) {
            _this.agregarItem_Producto_mant502();
            _this.ITEM = parseInt(_this.ITEM) + 1;
            _this.validarItem_Producto_mant502();
          } else CON851("01", "No se encontro el destino ingresado", _this.validarRecorrido_Producto_mant502(), "error", "error");


        })
    },
    validarTabla_Producto_mant502(orden) {
      _FloatText({
        estado: "on",
        msg: [
          { mensaje: "Oprima para F3 para continuar" },
          { mensaje: "Oprima para ESC Salir de la tabla" }
        ]
      });
      validarTabla(
        {
          event_f3: _this.validarHrkm_Inicial_mant502,
          Esc: _this.validarItem_Producto_mant502,
          tabla: '#tabla_productos', orden: orden
        },
        (data) => {
          _this.ITEM = (parseInt(data.cells[0].textContent));
          const item_existente = _this.TABLA_PRODUCTOS.find(x => x.ITEM == _this.ITEM);

          if (item_existente) {
            _this.global_mant502['GRUPO_PRODUCTO'] = data.cells[1].textContent;
            _this.global_mant502['COD_PRODUCTO'] = data.cells[2].textContent;
            _this.global_mant502['DESC_PRODUCTO'] = data.cells[3].textContent;

            _this.global_mant502['M3_PRODUCTO'] = data.cells[4].textContent;
            _this.global_mant502['VCORTO_PRODUCTO'] = data.cells[5].textContent;
            _this.global_mant502['VLARGO_PRODUCTO'] = data.cells[6].textContent;
            _this.global_mant502['RECORRIDO'] = data.cells[7].textContent;

          }
          _this.validarItem_Producto_mant502();
        },
        () => validarItem_Producto_mant502(),
        () => { _this.validarHrkm_Inicial_mant502(); }
      )
    },
    validarHrkm_Inicial_mant502() {
      _FloatText({ estado: "off" });
      validarInputs(
        { form: "#validarhrkm_Inicial", orden: "1", },
        () => {
          if (_this.global_mant502['USO_EQUIPO'] == 4) _this.validarRecorrido_Producto_mant502();
          else _this.validarOperador_Equipo_mant502();
        },
        () => {
          _this.MANT502['HRKM_INI'] = '';
          _this.MANT502['HRKM_INI'] = _this.global_mant502['HRKM_INI'];
          const novedad = _this.MANT502['NOVEDAD'];

          if (novedad == '7') _this.lecturaAnterior_Maquina_mant502();
          else {
            _this.MANT502['HRKM_INI'] = _this.global_mant502['HRKM_INI'];
            _this.validarHrkm_Final_mant502();
          }
        }
      )
    },
    validarHrkm_Final_mant502() {
      validarInputs(
        { form: "#validarhrkm_Final", orden: "1", },
        () => { _this.validarHrkm_Inicial_mant502(); },
        () => {
          _this.MANT502['HRKM_FIN'] = '';
          _this.MANT502['HRKM_FIN'] = _this.global_mant502['HRKM_FIN'];

          if (parseInt(_this.MANT502['HRKM_FIN']) < parseInt(_this.MANT502['HRKM_INI'])) {
            CON851('03', 'La lectura final no puede ser menor a la inicial', _this.validarHrkm_Inicial_mant502(), 'error', 'error');
          } else {
            _this.global_mant502['CANT_HR'] = parseInt(_this.MANT502['HRKM_FIN']) - parseInt(_this.MANT502['HRKM_INI']);
            _this.MANT502['CANT_HR'] = _this.global_mant502['CANT_HR'];
            _this.validarHr_Diurnas_mant502();
          }
        }
      )
    },
    validarHr_Diurnas_mant502() {
      validarInputs(
        { form: "#validarHr_diurnas", orden: "1", },
        () => { _this.validarHrkm_Final_mant502(); },
        () => {
          const novedad = _this.MANT502['NOVEDAD'];
          _this.MANT502['HORAS_DIU'] = '';
          _this.MANT502['HORAS_DIU'] = _this.global_mant502['HORAS_DIU'];

          if (parseInt(_this.MANT502['HORAS_DIU']) == 0 && novedad == '7') _this.global_mant502['HORAS_DIU'] = _this.MANT502['CANT_HR'];

          if (parseInt(_this.MANT502['HORAS_DIU']) > parseInt(_this.MANT502['CANT_HR'])) CON851('03', 'Las horas diurnas no pueden exceder el kilometraje', _this.validarHr_Diurnas_mant502(), 'error', 'error');
          else {
            _this.global_mant502['HORAS_NOC'] = parseInt(_this.MANT502['CANT_HR']) - parseInt(_this.MANT502['HORAS_DIU']);
            _this.MANT502['HORAS_NOC'] = _this.global_mant502['HORAS_NOC'];
            _this.validarObservacion_mant502();
          }
        }
      )
    },
    validarObservacion_mant502() {
      validarInputs(
        { form: "#validarObservaciones", orden: "1", },
        () => { _this.validarHr_Diurnas_mant502(); },
        () => {
          _this.MANT502['OBSER'] = '';
          _this.TEXTOS['OBSER'] = _this.TEXTOS['OBSER'].replace(/\�/g, "Ñ");
          _this.MANT502['OBSER'] = _this.TEXTOS['OBSER'].padEnd(100, ' ');
          _this.grabarEntradasProduccion_mant502();
        }
      )
    },
    /*---------------------- V E N T A N A S ( F8 )----------------------*/
    ventanaDivisiones_mant502() {
      _ventanaDatos(
        {
          titulo: "VENTANA DIVISIONES",
          columnas: ["COD", "DESCRIP"], label: ["Código", "Division"],
          callback_esc: () => CON850(_this.evaluarCON850_mant502),
          callback: (data) => {
            _this.global_mant502['DIVISION'] = data.COD + " - " + data.DESCRIP;
            _this.MANT502['DIVISION'] = data.COD;
            _enterInput(`#division`);
          },
          data: _this.divisiones_mant502
        }
      );
    },
    ventanaGrupos_mant502(caja) {
      _ventanaDatos(
        {
          titulo: "VENTANA GRUPOS",
          columnas: ["TIPO", "GRUPO", "DESCRIP"], label: ["Código", "Descrip"],
          callback_esc: () => {
            if (caja == 'grEquipo') CON850(this.evaluarCON850_MANT502);
            else _this.validarItem_Producto_mant502();
          },
          callback: (data) => {
            if (caja == 'grEquipo') {
              _this.global_mant502['GRUPO_PRODUCTO'] = '';
              _this.global_mant502['GRUPO_EQUIPO'] = data.GRUPO + " - " + data.DESCRIP;
              _this.MANT502['GRUPO_EQUIPO'] = data.GRUPO;
              _enterInput(`#grEquipo`);
            } else {
              _this.global_mant502['GRUPO_PRODUCTO'] = '';
              _this.global_mant502['GRUPO_PRODUCTO'] = data.GRUPO + " - " + data.DESCRIP;
              _this.MANT502['GRUPO_PRODUCTO'] = data.GRUPO;
              _enterInput(`#grupo_producto`);
            }
          },
          data: caja == 'grupo_producto'
            ? _this.grupos_mant502.filter(x => x.TIPO.trim() == '0')
            : _this.grupos_mant502.filter(x => x.TIPO.trim() == '2')
        }
      );
    },
    ventanaProduccion_mant502() {
      _ventanaDatos(
        {
          titulo: "VENTANA ENTRADAS PRODUCCION",
          columnas: ["COMPLETA", "OPERARIO", "OPER_MODIF", "FECHA_MODIF"],
          label: ["Código entrada Producción", "Operario", "Fecha", "Data Modificación"],
          callback_esc: () => _this.validarComprobante_mant502(),
          callback: (data) => {
            _this.global_mant502['COMPROBANTE'] = data.LLAVE[1].padStart(6, '0');
            _this.MANT502['COMPROBANTE'] = _this.global_mant502['COMPROBANTE'];
            _enterInput(`#nroEquipo`);
          },
          data: _this.producionmant_mant502.filter(x => {
            return x.LLAVE[0] == _this.global_mant502['DIVISION'].split('-')[0] ? x.LLAVE : []
          })
        }
      );
    },
    ventanaHojas_vida_mant502() {
      _ventanaDatos(
        {
          titulo: "VENTANA HOJAS DE VIDA EQUIPOS",
          columnas: ["TIPO", "GRUPO", "NRO"], label: ["Código Equipo / Maquina", " ", " ", "Descrip"],
          callback_esc: () => _this.validarGrupo_Equipo_mant502(),
          callback: (data) => {
            _this.global_mant502['NRO_EQUIPO'] = data.NRO
            _this.MANT502['NRO_EQUIPO'] = _this.global_mant502['NRO_EQUIPO'];
            _enterInput(`#nroEquipo`);
          },
          data: _this.hojasVida_mant502
        }
      );
    },
    ventanaTerceros_mant502() {
      _ventanaDatos(
        {
          titulo: "VENTANA TERCEROS",
          columnas: ["COD", "NOMBRE", "ACT"], label: ["Código", "Nombre", "Actividad"],
          callback_esc: () => _this.validarNro_Equipo_mant502(),
          callback: (data) => {

            _this.global_mant502['OPER_EQUIPO'] = data.COD;
            _this.global_mant502['DESC_OPER_EQUIPO'] = data.NOMBRE;

            _this.MANT502['OPER_EQUIPO'] = data.COD;
            _this.MANT502['DESC_OPER_EQUIPO'] = data.COD;
            _enterInput(`#oper_equipo`);

          },
          data: _this.terceros_mant502
        }
      );
    },
    ventanaUso_mant502() {
      const opcionesUso = [{ 'COD': '1', 'DESCRIP': "MED." }, { 'COD': '2', 'DESCRIP': "OFIC." }, { 'COD': '3', 'DESCRIP': "OPER." }, { 'COD': '4', 'DESCRIP': "VEHIC." }];
      const novedad = _this.MANT502['NOVEDAD'];
      _ventanaDatos(
        {
          titulo: "VENTANA USO EQUIPO",
          columnas: ["COD", "DESCRIP"], label: ["Código", "Nombre"],
          callback_esc: () => _this.validarNro_Equipo_mant502(),

          callback: (data) => {
            _this.global_mant502['USO_EQUIPO'] = data['COD'];
            _this.MANT502['USO_EQUIPO'] = data['COD'];

            _this.MANT502['UNID_CONV'] = _this.global_mant502['UNID_CONV'];

            if (novedad == '7') {
              fecha_w = _this.MANT502['FECHA'].join(',').replace(/\,/g, '');
              res_produccionmant = _this.producionmant_mant502.filter(x => x.LLAVE_FECHA.trim() == fecha_w);

              if (!res_produccionmant) CON851("52", "52", _this.validarNro_Equipo_mant502(), "error", "error");

            } else {
              _this.MANT502['USO_EQUIPO'] = data['COD'];
              _this.validarOperador_Equipo_mant502();
            }
          },
          data: opcionesUso
        }
      );
    },
    ventanaArticulos_mant502() {
      var datos = _this.articulos_mant502.filter(x => x.TIPO_ART == '0');
      var datos = datos.filter(x => x.GRUPO_ART == _this.MANT502['GRUPO_PRODUCTO']);

      _ventanaDatos(
        {
          titulo: "VENTANA ARTICULOS",
          columnas: ["LLAVE_ART", "DESCRIP1_ART", "DESCRIP_ART", "UNIDAD", "PRECIO"],
          label: ["Código   ", "   ", "Descripción", "Unidad", " ", "Precio"],
          callback_esc: () => _this.validarGrupo_Producto_mant502(),
          callback: (data) => {
            _this.global_mant502['COD_PRODUCTO'] = '';
            _this.global_mant502['DESC_PRODUCTO'] = '';
            _this.global_mant502['COD_PRODUCTO'] = data.LLAVE_ART.substring(3, 18).trim();
            _this.global_mant502['DESC_PRODUCTO'] = data.DESCRIP_ART;
            _enterInput(`#cod_producto`);

          },
          data: datos
        }
      );
    },
    ventanaDestinos_mant502() {//Recorridos
      _ventanaDatos(
        {
          titulo: "VENTANA DESTINOS",
          columnas: ["COD", "DESTINO", "NOMBRE", "DISTANCIA"], label: ["Código", "Destino", "  ", "Nombre"],
          callback_esc: () => _this.validarCodigo_Producto_mant502(),
          callback: (data) => {
            _this.global_mant502['RECORRIDO'] = data.COD;
            _this.MANT502['RECORRIDO'] = data.COD;

            _enterInput(`#recorrido`);
          },
          data: _this.destinos_mant502
        }
      );
    },
    /*---------------------- R U T I N A S ----------------------*/
    lecturaAnterior_Maquina_mant502() {
      const anterior = MANT502A({ fecha: _this.MANT502['FECHA'] },);
      _this.global_mant502['HRKM_FIN'] = anterior.ultima_lectura ? anterior.ultima_lectura : _this.global_mant502['HRKM_INI'];
    },
    agregarItem_Producto_mant502() {
      const array = _this.TABLA_PRODUCTOS;
      const item = _this.ITEM;
      var existe = false;
      existe = array.some(producto => parseInt(producto.ITEM) == parseInt(item));

      if (!existe) {
        _this.TABLA_PRODUCTOS.push({
          ITEM: _this.ITEM,
          GRUPO: _this.MANT502['GRUPO_PRODUCTO'].padStart(2, '0'),
          CODIGO: _this.global_mant502['COD_PRODUCTO'],
          DESCRIPCION: _this.MANT502['DESC_PRODUCTO'],
          M3PRODUCIDOS: _this.MANT502['M3_PRODUCTO'],
          VLARGO: _this.MANT502['VCORTO_PRODUCTO'],
          VCORTO: _this.MANT502['VLARGO_PRODUCTO'],
          RECORRIDO: _this.MANT502['RECORRIDO'],
        });

      } else {
        _this.TABLA_PRODUCTOS[parseInt(item) - 1] = ({
          ITEM: _this.ITEM,
          GRUPO: _this.MANT502['GRUPO_PRODUCTO'],
          CODIGO: _this.global_mant502['COD_PRODUCTO'],
          DESCRIPCION: _this.MANT502['DESC_PRODUCTO'],
          M3PRODUCIDOS: _this.MANT502['M3_PRODUCTO'],
          VLARGO: _this.MANT502['VCORTO_PRODUCTO'],
          VCORTO: _this.MANT502['VLARGO_PRODUCTO'],
          RECORRIDO: _this.MANT502['RECORRIDO'],
        });
      }

      _this.global_mant502['COD_PRODUCTO'] = '';
      _this.global_mant502['GRUPO_PRODUCTO'] = '';
      _this.global_mant502['DESC_PRODUCTO'] = '';
      _this.global_mant502['M3_PRODUCTO'] = '';
      _this.global_mant502['VCORTO_PRODUCTO'] = '';
      _this.global_mant502['VLARGO_PRODUCTO'] = '';
      _this.global_mant502['RECORRIDO'] = '';

    },
    eliminarItem_Producto_mant502() {
      const item = _this.ITEM;
      _this.TABLA_PRODUCTOS.splice(parseInt(item) - 1, 1);

      for (let i in _this.TABLA_PRODUCTOS) {
        const item = _this.TABLA_PRODUCTOS[i]['ITEM'];
        _this.TABLA_PRODUCTOS[i]['ITEM'] = parseInt(item) - 1 < 0 ? item : item - 1;
      }
      _this.validarItem_Producto_mant502();
    },
    async cargarData_mant502() {
      const division = _this.global_mant502['DIVISION'].split('-')[0].trim();
      const llave = division.concat(_this.global_mant502['COMPROBANTE']);
      const busquedad_manpr = _this.producionmant_mant502.find(x => x.LLAVE.join(',').replace(/\,/g, '').trim() == llave.trim());

      if (busquedad_manpr) {

        let llave = busquedad_manpr['LLAVE'].join(',').replace(/\,/g, '');
        let novedad = _this.global_mant502['NOVEDAD'];
        let division = _this.global_mant502['DIVISION'];
        let comprobante = _this.global_mant502['COMPROBANTE'];
        let grupo = busquedad_manpr['GRUPO'];
        const consulta_grupo = _this.grupos_mant502.find(x => x.TIPO.trim().concat(x.GRUPO.trim()) == busquedad_manpr['GRUPO'].trim());
        let fecha = busquedad_manpr['FECHA'];
        let nro_equipo = busquedad_manpr['NUMERO_MAQ'];

        const llave_art = grupo.concat(nro_equipo);
        const res_art = _this.articulos_mant502.find(x => x.LLAVE_ART.trim() == llave_art.trim());
        const llave_hojavida = res_art.LLAVE_ART;
        const res_hojavida = _this.hojasVida_mant502.find(x => x.LLAVE.trim() == llave_hojavida.trim());
        let des_equipo = res_art.DESCRIP1_ART.concat(res_art.DESCRIP_ART);
        let operador = busquedad_manpr['OPERARIO'].slice(0, -1);

        let tercero = _this.terceros_mant502.find(x => x.COD.trim() == operador.trim());

        let tabla = busquedad_manpr['TABLA_PROD'];


        if (tabla.length >= 1) {
          tabla.pop()
          console.log(tabla)

          //hacer funcion para consultar articulo | producto
          for (let i in tabla) {
            const llave_grupo = '0'.concat(tabla[i]['GRUPO_PROD'].padStart(2, '0').toString());

            const consulta_prod = _this.articulos_mant502.find(x => {
              const llave_prod = '0'.concat(x.LLAVE_ART.trim());
              const llave_consprod = llave_grupo.trim().concat(tabla[i]['COD_PRODUCTO'].padEnd(13, ' '));
              return llave_prod == llave_consprod.trim() ? x : []
            });

            let grupo_i = tabla[i]['GRUPO_PROD'];
            grupo_i = !isNaN(grupo_i) ? parseInt(grupo_i.trim()).toString().padStart(2, '0') : grupo_i.trim();

            _this.TABLA_PRODUCTOS[i] = {
              ITEM: (parseInt(i) + 1).toString().padStart(2, '0'),
              GRUPO: grupo_i,
              CODIGO: tabla[i]['COD_PRODUCTO'],
              DESCRIPCION: consulta_prod['DESCRIP_ART'],
              M3PRODUCIDOS: tabla[i]['M3_PRODUCTO'],
              VCORTO: tabla[i]['VCORTO_PRODUCTO'],
              VLARGO: tabla[i]['VLARGO_PRODUCTO'],
              RECORRIDO: tabla[i]['RECORRIDO'] ? tabla[i]['RECORRIDO'] : 0,
            }
          }

          const productos = _this.TABLA_PRODUCTOS;
          var totalesProductos = productos.reduce((a, b) => {
            return {
              m3producidos: parseInt(a['M3PRODUCIDOS'] ? a['M3PRODUCIDOS'] : 0) + parseInt(b['M3PRODUCIDOS'] ? b['M3PRODUCIDOS'] : 0),
              vlargo: parseInt(a['VLARGO'] ? a['VLARGO'] : 0) + parseInt(b['VLARGO'] ? b['VLARGO'] : 0),
              vcorto: parseInt(a['VCORTO'] ? a['VCORTO'] : 0) + parseInt(b['VCORTO'] ? b['VCORTO'] : 0),
            }
          }, {});

        }
        var total = totalesProductos ? totalesProductos : false;
        const { m3producidos, vlargo, vcorto } = total ? total : { m3producidos: 0, vlargo: 0, vcorto: 0 };
        const hrkm_fin = busquedad_manpr['HRKM_FIN'];
        const hrkm_ini = busquedad_manpr['HRKM_INI'];

        let cant_hr = (parseFloat(hrkm_fin) - parseFloat(hrkm_ini));
        cant_hr = cant_hr < 0 ? cant_hr * -1 : cant_hr;
        console.log('cant_hr', cant_hr)
        _this.global_mant502['HRKM_FIN'] = hrkm_fin;
        _this.global_mant502['HRKM_INI'] = hrkm_ini;

        _this.TEXTOS['OBSER'] = busquedad_manpr['OBSERV'].replace(/(\{|\}|\[|\[|\]|\*|)/g, "").replace(/\�/g, "Ñ").replace(/&/gm, "\n").trim();

        _this.global_mant502 =
        {
          'LLAVE': llave,
          'FECHA': [fecha.substring(0, 4), fecha.substring(4, 6), fecha.substring(6, 8)],
          'DIVISION': division,
          'NOVEDAD': novedad,
          'COMPROBANTE': comprobante,
          'GRUPO_EQUIPO': grupo.substring(1).concat('-', consulta_grupo['DESCRIP']),
          'NRO_EQUIPO': nro_equipo,
          'TIPO_EQUIPO': 2,
          'OPER_EQUIPO': mascaras.documentos(tercero['COD']),
          'DESC_OPER_EQUIPO': tercero['NOMBRE'],
          'DESC_EQUIPO': des_equipo,
          'USO_EQUIPO': res_hojavida['USO'],
          'CL_EQUIPO': '  ',
          'TOTAL_M3': m3producidos ? mascaras.cantidades(m3producidos.toString()) : 0,
          'TOTAL_VCORTO': vcorto ? mascaras.cantidades(vcorto.toString()) : 0,
          'TOTAL_VLARGO': vlargo ? mascaras.cantidades(vlargo.toString()) : 0,
          'TOTAL_RECORRIDO': vcorto != 0 ? (parseInt(vlargo) - parseInt(vcorto)) < 0 ? 1 : (parseInt(vlargo) - parseInt(vcorto)) : 0,
          'HRKM_INI': busquedad_manpr['HRKM_INI'],
          'HRKM_FIN': busquedad_manpr['HRKM_FIN'],
          // 'CANT_HR': cant_hr,
          'CANT_HR': cant_hr.toString().padStart(10, '0'),
          'HORAS_DIU': busquedad_manpr['HR_DIU'],
          'HORAS_NOC': busquedad_manpr['HR_NOC'],
          'UNID_CONV': 1,
          // Productos
          'GRUPO_PRODUCTO': null,
          'VCORTO_PRODUCTO': null,
          'VLARGO_PRODUCTO': null,
          'COD_PRODUCTO': null,
          'M3_PRODUCTO': null,
          'DESC_PRODUCTO': null,
          'DISTANCIA_DEST': null,
          'RECORRIDO': 0,// Solo si aplica
        };
        _this['OPER_MODI'] = busquedad_manpr['OPER_MODIF'];
        _this['FECHA_MODI'] = moment(busquedad_manpr['FECHA_MODIF']).format('YYYY/MM/DD');

        _this.fechaComprobante_mant502("1");
      } else {
        CON851("01", "No existe el comprobante", _this.validarComprobante_mant502(), "error", "error");
      }
    },
    eliminarEntradaProduccion_mant502() {
      let data_envio = '', url_programa = get_url("APP/MANT/MANT502.DLL"), reg_manpr = '', llave = _this.global_mant502['DIVISION'].concat(_this.global_mant502['COMPROBANTE']);

      CON851P('54', _this.validarItem_Producto_mant502, () => {

        postData(data_envio, url_programa).then(data => {
          CON851('', 'Registro eliminado', null, 'success', 'Exito');

          $('#tabla_productos tbody').empty();

          _this.grupos_mant502 = [];
          _this.destinos_mant502 = [];
          _this.terceros_mant502 = [];
          _this.hojasVida_mant502 = [];
          _this.articulos_mant502 = [];
          _this.divisiones_mant502 = [];
          _this.producionmant_mant502 = [];

          _this.terminarPrograma();

        }).catch(error => { console.error(error); })
      })
    },
    grabarEntradasProduccion_mant502() {// graba | edita ARCHIVO-PRODUCCION-MANT
      const novedad = _this.global_mant502['NOVEDAD'].split('-')[0].replace('\.', '');
      let
        acum = '',
        reg_manpr = '',
        data_envio = new Object(),
        reg_data = _this.MANT502,
        url_programa = get_url("APP/MANT/MANT502-01.DLL");

      if (novedad != '9') {
        for (let i in _this.TABLA_PRODUCTOS) {
          var posicion = i + 1;
          Object.entries(_this.TABLA_PRODUCTOS[i]).forEach(([key, value]) => {
            const excepcion_includes = ['DESCRIPCION', 'ITEM'];
            if (!excepcion_includes.includes(key)) acum += value + '|';
          })
          data_envio["TAB-" + posicion.toString().padStart(3, 0)] = acum;
        };

        reg_data.FECHA = _this.global_mant502['FECHA']
        const productos = _this.TABLA_PRODUCTOS;

        const totalesProductos = productos.reduce((a, b) => {
          return {
            m3producidos: parseInt(a['M3PRODUCIDOS'] ? a['M3PRODUCIDOS'] : 0) + parseInt(b['M3PRODUCIDOS'] ? b['M3PRODUCIDOS'] : 0),
            vlargo: parseInt(a['VLARGO'] ? a['VLARGO'] : 0) + parseInt(b['VLARGO'] ? b['VLARGO'] : 0),
            vcorto: parseInt(a['VCORTO'] ? a['VCORTO'] : 0) + parseInt(b['VCORTO'] ? b['VCORTO'] : 0),
          }
        }, {});

        console.log('productos', _this.TABLA_PRODUCTOS);

        // GRABAR OBSERVACIONES MANT502
        let
          maximo = 0,
          linea = 0,
          contadorTotal = 0,
          contadorLin = 0,
          puntero = 0,
          caracteres_excluir = ['á', 'é', 'í', 'ó', 'ú', 'Á', 'É', 'Í', 'Ó', 'Ú', 'ñ', 'Ñ', '!', '"', '#', '$', '%', '/', '(', ')', '=', '?', '*', '+', ' - ', '@', '>', '<'];

        _this.TEXTOS['OBSER'] = _this.TEXTOS['OBSER'].replace(/\r|\n|\r\n/g, "&");

        console.log('_this.TEXTOS[OBSER]', _this.TEXTOS['OBSER']);

        _this.TEXTOS['OBSER'].split('').forEach(function (item, i) {
          contadorTotal = i + 1;
          contadorLin = contadorLin + 1;

          if (caracteres_excluir.includes(item)) maximo = maximo + 1;
          linea += item

          if (contadorLin == maximo || _this.TEXTOS['OBSER'].length == contadorTotal) {
            puntero = puntero + 1

            data_envio["OBSERV-" + posicion.toString().padStart(3, "0")] = linea
            contadorLin = 0
            linea = ''
            maximo = 40
          }
        })

        var objEnvio = {
          'LLAVE': _this.global_mant502['DIVISION'].split('-')[0].concat(_this.global_mant502['COMPROBANTE']).padStart(8, '0'),
          'FECHA': reg_data.FECHA.join(',').replace(/\,/g, ''),
          'TIPO': 2,
          'GRUPO': reg_data.GRUPO_EQUIPO.padStart(2, '0'),
          'NRO': reg_data.NRO_EQUIPO.padEnd(13, ' '),
          'CLASE': '  ',
          'OPERARIO': reg_data.OPER_EQUIPO.padEnd(10, ' '),
          'HRKM_INI': reg_data.HRKM_INI.padStart(10, '0'),
          'HRKM_FIN': reg_data.HRKM_FIN.padStart(10, '0'),
          'CANT_HR': reg_data.CANT_HR.toString().padStart(10, '0'),
          'HORAS_DIU': reg_data.HORAS_DIU.toString().padStart(6, '0'),
          'HORAS_NOC': (parseInt(_this.MANT502['HRKM_FIN']) - parseInt(_this.MANT502['HRKM_INI'])).toString().padStart(6, '0'),
          'TOTAL_M3': parseFloat(totalesProductos.m3producidos).toString().replace(/\,/g, '').trim(),
          'OPER_MODI': localStorage.Usuario,
          'FECHA_MODI': moment().format('YYYYMMDD'),
          'ITEMS': _this.TABLA_PRODUCTOS.length.toString().padStart(3, '0')
        }

        Object.values(objEnvio).map((val, key) => { reg_manpr += val + '|'; });
      } else {
        var objEnvio = {
          'LLAVE': _this.global_mant502['DIVISION'].split('-')[0].concat(_this.global_mant502['COMPROBANTE']).padStart(8, '0')
        }
        Object.values(objEnvio).map((val, key) => { reg_manpr += val + '|'; });
      }

      data_envio['datosh'] = `${datosEnvio()}${novedad}|${reg_manpr}`;
      console.log(data_envio);

      CON851P(novedad == '9' ? '54' : '01', _this.validarItem_Producto_mant502, () => {

        postData(data_envio, url_programa).then(data => {
          let mensaje = '';
          let novedades = { "7": "Creado correctamente", "8": "Modificado correctamente", "9": "Eliminado correctamente" };
          Object.entries(novedades).map((key, value) => mensaje = key == novedad ? value : '');
          CON851('', `${mensaje + objEnvio['LLAVE']}`, null, 'success', 'Exitoso');
          _this.cargarInventarios_mant502(_this.global_mant502['DIVISION'].split('-')[0].concat(_this.global_mant502['COMPROBANTE']).padStart(8, '0'));
          _this.terminarPrograma();

        }).catch(error => {
          loader('hide')
          console.error(error);
          toastr.error(`No se pudo grabar novedad EntradaProduccion: ${error}`);
          _this.terminarPrograma();

        })
      })
    },
    consultarComprobante_mant502() {
      const novedad = _this.global_mant502['NOVEDAD'].split('-')[0].replace('\.', '');
      _this.MANT502['NOVEDAD'] = _this.global_mant502['NOVEDAD'].split('-')[0].replace('\.', '');

      var
        array_producionMant = '',
        buscar_comprobante = _this.producionmant_mant502.find(
          x => {
            const llave_array = x.LLAVE.join(',').replace(/\,/g, '');
            const llave_consulta = _this.global_mant502['DIVISION'].split('-')[0].concat(_this.global_mant502['COMPROBANTE'].trim().padStart(6, '0'));
            return llave_array.trim() == llave_consulta.trim()
              ? x : []
          }),
        retorno = '';
      if (typeof buscar_comprobante != 'undefined') {

        array_producionMant = _this.producionmant_mant502;
        retorno = buscar_comprobante['LLAVE'][1].padStart(6, '0');

      } else if (novedad != '7') {

        array_producionMant = _this.producionmant_mant502;
        const ultimo = array_producionMant[array_producionMant.length - 1];
        retorno = ultimo ? ultimo['LLAVE'][1].padStart(6, '0') : '000001';

      } else {

        array_producionMant = _this.producionmant_mant502;
        const ultimo = array_producionMant[array_producionMant.length - 1];

        retorno = _this.producionmant_mant502 ? (parseInt(ultimo['LLAVE'][1]) + 1).padStart(6, '0') : ('1').padStart(6);
      }
      return retorno
    },
    terminarPrograma() {
      let Window = BrowserWindow.getAllWindows();
      if (Window.length > 1) _cerrarSegundaVentana();
      else _toggleNav();
    },
    _cargarColeccionDatos_mant502() {
      _this._obtenerDataArray('TERCEROS', 'TERCEROS', 'ON')
        .then((terceros) => {
          _this.terceros_mant502 = terceros;
          return _this._obtenerDataArray('DIVISION', 'CODIGOS', '');
        })
        .then(divisiones => {
          _this.divisiones_mant502 = divisiones;
          return _this._obtenerDataArray('GRUPOS', 'GRUPOS', '');
        })
        .then(grupos => {
          _this.grupos_mant502 = grupos;
          return _this._obtenerDataArray('ARTICULOS', 'ARTICULOS', '');
        })
        .then(articulos => {
          _this.articulos_mant502 = articulos;
          return _this._obtenerDataArray('HOJA_VIDA', 'HOJAS_VIDA', '');
        })
        .then(hojamant => {
          _this.hojasVida_mant502 = hojamant;
          return _this._obtenerDataArray('DESTINOS', 'DESTINOS', '');
        })
        .then(destinos => {
          _this.destinos_mant502 = destinos;
          return _this._obtenerDataArray('PRODUCION_MANT', 'PRODUCION_MANT', 'ONLY');
        })
        .then(producion_mant => {
          _this.producionmant_mant502 = producion_mant;
          if (_this.producionmant_mant502 == '') {
            _this.producionmant_mant502 = [];
            _this.global_mant502['NOVEDAD'] = '7- NUEVO';
            _this.validarDivision_mant502();

          } else CON850(_this.evaluarCON850_mant502);
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
    },
    validarFormato_Fecha_mant502(orden) {
      var fecha = false;
      orden = parseInt(orden);
      var
        //0: año, 1: mes, 2: dia 
        año = _this.global_mant502['FECHA'][0],
        mes = _this.global_mant502['FECHA'][1],
        dia = _this.global_mant502['FECHA'][2];

      const min = 1970;

      switch (orden) {

        case 1: //año
          año = año == null ? '0000' : año;
          if (año.length < 4) {

            CON851('03', 'Digite un año valido', null, 'error', 'error');
            _this.fechaComprobante_mant502("1");

          } else {

            let cond = (!moment(año.trim()).isValid() || año > moment().format('YYYY') || año < min);

            if (cond) {
              _this.global_mant502['FECHA'][0] = null;
              CON851('03', 'Digite un año valido', null, 'error', 'error');
              _this.fechaComprobante_mant502("1");

            }
            else _this.fechaComprobante_mant502("2");

          }
          break;

        case 2: //mes

          _this.global_mant502['FECHA'][1] = cerosIzq(_this.global_mant502['FECHA'][1], 2);

          if ((parseInt(mes) > 12 || parseInt(mes) < 0)) {
            _this.global_mant502['FECHA'][1] = null;

            CON851('03', 'Digite un mes valido', null, 'error', 'error');
            _this.fechaComprobante_mant502("2");

          }
          else _this.fechaComprobante_mant502("3");
          break;

        case 3: //dia
          _this.global_mant502['FECHA'][2] = cerosIzq(_this.global_mant502['FECHA'][2], 2);
          fecha = año.concat(mes + dia); fecha = moment(fecha).format('YYYYMMDD');

          if (!moment(fecha).isValid()) {
            _this.global_mant502['FECHA'][2] = null;

            CON851('03', 'Digite un día valido', null, 'error', 'error');
            _this.fechaComprobante_mant502("3");

          } else {
            const festivo = buscarFestivo(fecha);

            if (typeof festivo == 'undefined') _this.validarGrupo_Equipo_mant502();
            else {
              CON851('9Q', '9Q', null, 'error', 'Error');
              _this.fechaComprobante_mant502("3");
            }
          }
          break;

        default:
          CON851('03', 'Digite un mes valido', null, 'error', 'error');
          _this.fechaComprobante_mant502("1");
          break;
      }
    },
    cargarInventarios_mant502(comprobante) { MANT010(comprobante) }
  }
})

/*-------------------------------- AVISOS FLOTANTES --------------------------------*/
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