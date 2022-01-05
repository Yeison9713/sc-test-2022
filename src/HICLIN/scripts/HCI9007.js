// 02-12-2020 - IMPRESION AUTISMO - DAVID.M - HICLIN

$_HCI9007 = [];
datos_HCI9007 = {};

async function iniciar_HCI9007(rec, opciones) {
    $_HCI9007._ciudades = rec._ciudades;
    $_HCI9007._hcprc = rec._hcpac;
    $_HCI9007._detalles = rec._detalles;
    $_HCI9007._paci = rec.$_reg_paci;
    $_HCI9007.opciones = opciones;
    $_HCI9007._hcprc2 = rec.hcprc_new;

    $_HCI9007.dato_9007 = await $_HCI9007._detalles.find(e => e['COD-DETHC'] == '9007' && e['LLAVE-HC'] == $_HCI9007._hcprc.llave);
    $_HCI9007.dato_9007 != undefined ? $_HCI9007.dato_9007 = $_HCI9007.dato_9007.DETALLE : false;

    if ($_HCI9007.dato_9007) {
        datos_HCI9007 = $_HCI9007.dato_9007;

        // encabezado
        datos_HCI9007.encabezado = {};
        datos_HCI9007.encabezado.nombre = $_USUA_GLOBAL[0].NOMBRE;
        datos_HCI9007.encabezado.nit = $_USUA_GLOBAL[0].NIT;
        datos_HCI9007.encabezado.titulo = 'Cuestionario de Autismo en la infancia (M-CHAT)';

        // paciente
        datos_HCI9007.paciente = {};
        datos_HCI9007.paciente = llenarPacienteAperturas2_impHc($_HCI9007._paci, $_HCI9007._hcprc2);

        // datos_HCI9007.paciente.nombre = $_HCI9007._paci.DESCRIP.replace(/\s+/g, ' ');
        // datos_HCI9007.paciente.tipoId = $_HCI9007._paci['TIPO-ID'];
        isNaN($_HCI9007._paci.COD) == true ? aux = $_HCI9007._paci.COD : aux = new Intl.NumberFormat("ja-JP").format($_HCI9007._paci.COD);
        datos_HCI9007.paciente.id = aux;
        // datos_HCI9007.paciente.edad = $_HCI9007._hcprc.edad;
        $_HCI9007._paci.SEXO == 'F' ? datos_HCI9007.paciente.sexo = 'Femenino' : datos_HCI9007.paciente.sexo = 'Masculino';
        datos_HCI9007.paciente.fecha = $_HCI9007._hcprc.fecha.substring(6, 8) + '-' + $_HCI9007._hcprc.fecha.substring(4, 6) + '-' + $_HCI9007._hcprc.fecha.substring(0, 4);
        datos_HCI9007.paciente.hora = $_HCI9007._hcprc.hora.substring(0, 2) + ':' + $_HCI9007._hcprc.hora.substring(2, 4);

        var busqCiu = $_HCI9007._ciudades.find(e => e.COD.trim() == $_HCI9007._paci.CIUDAD.trim());
        (busqCiu) ? datos_HCI9007.paciente.municipio = busqCiu.NOMBRE.replace(/\s+/g, ' ') : datos_HCI9007.paciente.municipio = '';

        // datos_HCI9007.paciente.telefono = $_HCI9007._paci.TELEFONO;

        await _impresion2({
            tipo: 'pdf',
            archivo: `${localStorage.Usuario + moment().format('-YYMMDD-HHmmssS')}.pdf`,
            content: _imprimirAutismo(datos_HCI9007),
        }).catch((err) => {
            console.error(err);
        });

        return $_HCI9007.data;
    } else {
        return null
    }
}