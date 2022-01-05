/* global msjProsoft */

function msjError(error, tipo) {
  var msj;
  switch (error) {
    case "00":
      msj = " YA existe la llave digitada!   ";
      break;
    case "01":
      msj = " No existe la llave digitada!   ";
      break;
    case "02":
      msj = " Este dato es obligatorio!      ";
      break;
    case "03":
      msj = " Dato invalido!                 ";
      break;
    case "04":
      msj = " Falta % Ret. en plan cuentas  ";
      break;
    case "05":
      msj = " Dato repetido !                ";
      break;
    case "06":
      msj = " Documento es de otro NIT       ";
      break;
    case "07":
      msj = " No hay saldo disponible        ";
      break;
    case "08":
      msj = " No existe movimiento!          ";
      break;
    case "09":
      msj = " No hay saldo en el P.A.C.      ";
      break;
    case "10":
      msj = " No se pudo crear el archivo    ";
      break;
    case "11":
      msj = " Supera cupo asignado credito   ";
      break;
    case "12":
      msj = " Cliente lista negra (moroso)   ";
      break;
    case "13":
      msj = " Codigo desactivado             ";
      break;
    case "14":
      msj = " Transaccion restringida        ";
      break;
    case "15":
      msj = " Acceso restringido !!          ";
      break;
    case "16":
      msj = " Comprobante ya tiene recibo    ";
      break;
    case "17":
      msj = " Es el inicio del archivo !     ";
      break;
    case "18":
      msj = " No hay mas registros !         ";
      break;
    case "19":
      msj = " Empleado retirado!             ";
      break;
    case "20":
      msj = " Error! Concepto SALUD doble    ";
      break;
    case "21":
      msj = " Error! Concepto PENSION doble  ";
      break;
    case "22":
      msj = " Diferente cargo en una nomina  ";
      break;
    case "23":
      msj = " Dif. centro costos en nomina   ";
      break;
    case "24":
      msj = " Error en el cargo empleado     ";
      break;
    case "25":
      msj = " Error mas de 30 dias al mes    ";
      break;
    case "26":
      msj = " Clave de acceso invalida       ";
      break;
    case "27":
      msj = " NO existe codigo operador      ";
      break;
    case "28":
      msj = " NO se encontro ARCHUSU         ";
      break;
    case "29":
      msj = " NO se encontro REGCONT         ";
      break;
    case "30":
      msj = " Error! Documento NO aprobado   ";
      break;
    case "31":
      msj = " Atencion! cliente en MORA      ";
      break;
    case "32":
      msj = " Esta en un periodo no valido   ";
      break;
    case "33":
      msj = " Precio venta inferior a costo  ";
      break;
    case "34":
      msj = " Valor venta inferior a minimo  ";
      break;
    case "35":
      msj = " Error! Pedido YA despachado    ";
      break;
    case "36":
      msj = " No se permite descto fac mora  ";
      break;
    case "37":
      msj = " Fecha fuera de rango           ";
      break;
    case "38":
      msj = " Se actualizo aporte pension    ";
      break;
    case "39":
      msj = " Proceso termino satisfactoria  ";
      break;
    case "40":
      msj = " Error en el consecutivo        ";
      break;
    case "41":
      msj = " Peso inferior al minimo        ";
      break;
    case "42":
      msj = " Destare mayor al bruto         ";
      break;
    case "43":
      msj = " Destare menor al bruto         ";
      break;
    case "44":
      msj = " Debe repasar el renglon antes  ";
      break;
    case "45":
      msj = " No practico retencion en la fte";
      break;
    case "46":
      msj = " signo puede estar equivocado   ";
      break;
    case "47":
      msj = " No se puede cambiar comprob.   ";
      break;
    case "48":
      msj = " Sucursal no permitida          ";
      break;
    case "49":
      msj = " Opcion no aplica en esta empresa  ";
      break;
    case "50":
      msj = " Plazo mayor a dias financiac.  ";
      break;
    case "51":
      msj = " Comprobante descuadrado !      ";
      break;
    case "52":
      msj = " Atencion, comprob. tiene mov.  ";
      break;
    case "53":
      msj = " Chequera es de otra cuenta     ";
      break;
    case "54":
      msj = " Chequera NO existe             ";
      break;
    case "55":
      msj = " Cheque NO habilitado           ";
      break;
    case "56":
      msj = " Cheque ya esta girado          ";
      break;
    case "57":
      msj = " Dato debe ser numerico !       ";
      break;
    case "58":
      msj = " Dato debe ser alfanumerico!    ";
      break;
    case "59":
      msj = " Precio de compra subio !       ";
      break;
    case "60":
      msj = " Para omitir reserva use 99999  ";
      break;
    case "61":
      msj = " Codigo no aplica con C.costo   ";
      break;
    case "62":
      msj = " Depreciar contra cta 5 OR 7    ";
      break;
    case "63":
      msj = " Comprobante NO tiene recibo    ";
      break;
    case "64":
      msj = " Serv. pub. no hay tarifas a�o  ";
      break;
    case "65":
      msj = " El tercero es exento de retenc.";
      break;
    case "66":
      msj = " La empresa no es ag. retenedor ";
      break;
    case "67":
      msj = " Si no es % digite 9            ";
      break;
    case "68":
      msj = " Falta llenar datos de usuario  ";
      break;
    case "69":
      msj = " Directorio Trabajo Errado      ";
      break;
    case "70":
      msj = " Documento cerrado              ";
      break;
    case "71":
      msj = " No aplica para fact. P o T     ";
      break;
    case "72":
      msj = " Factura bloqueada por RIPS     ";
      break;
    case "73":
      msj = " SEXO incompatible              ";
      break;
    case "74":
      msj = " Edad incompatible              ";
      break;
    case "75":
      msj = " Recuerde valoracion pediatra   ";
      break;
    case "76":
      msj = " No se puede valoracion pediatra";
      break;
    case "77":
      msj = " No ha actualizado form. contrat";
      break;
    case "78":
      msj = " TIPO NO valido con esta OPC.   ";
      break;
    case "79":
      msj = " Medicamento NO POS             ";
      break;
    case "80":
      msj = " Usuario NO tiene derecho servic";
      break;
    case "81":
      msj = " Fact.abre solo por oper cerro  ";
      break;
    case "82":
      msj = " Medico incompatible con clase  ";
      break;
    case "83":
      msj = " Opcion solo para embarazadas   ";
      break;
    case "84":
      msj = " La direccion es dato importante";
      break;
    case "85":
      msj = " Arroz se liquida como grupo 2  ";
      break;
    case "86":
      msj = " Bloqueado solo menu contab.    ";
      break;
    case "87":
      msj = " Bloqueado solo inventarios     ";
      break;
    case "88":
      msj = " Periodo de Nomina bloqueado    ";
      break;
    case "89":
      msj = " Mes de trabajo NO bloqueado    ";
      break;
    case "90":
      msj = " Mes de trabajo bloqueado tot   ";
      break;
    case "91":
      msj = " Ubiquese en el mes adecuado    ";
      break;
    case "92":
      msj = " Opcion restringida en CONSOL.  ";
      break;
    case "93":
      msj = " Hay codigos en un subnivel     ";
      break;
    case "94":
      msj = " No corresponde Fuente Financ.  ";
      break;
    case "95":
      msj = " Se cambio el numero factura    ";
      break;
    case "96":
      msj = " Falta elaborar la glosa        ";
      break;
    case "97":
      msj = " Documento tiene endoso         ";
      break;
    case "98":
      msj = " Tiquete ya fue liquidado       ";
      break;
    case "99":
      msj = " No existe macro para ese artic ";
      break;
    case "9A":
      msj = "Falta comp. consulta           ";
      break;
    case "9B":
      msj = "El monto facturado supera 75%  ";
      break;
    case "9C":
      msj = "Esta a punto de copar contrato ";
      break;
    case "9D":
      msj = "Supera en monto del contrato   ";
      break;
    case "9E":
      msj = "Supera el promedio historico   ";
      break;
    case "9F":
      msj = "No se encontro cita medica     ";
      break;
    case "9G":
      msj = "Hace 90 dias no cambia clave   ";
      break;
    case "9H":
      msj = "la clave debe ser distinta     ";
      break;
    case "9I":
      msj = "Error en digito de verificac.  ";
      break;
    case "9J":
      msj = "Factura esta en otro RIPS      ";
      break;
    case "9K":
      msj = "ARROZ GRADO 2                  ";
      break;
    case "9L":
      msj = "ARROZ GRADO 3                  ";
      break;
    case "9M":
      msj = "DOCUMENTO YA ESTA CAUSADO      ";
      break;
    case "9N":
      msj = "Clave errada tercer aviso      ";
      break;
    case "9O":
      msj = "Supera Nro max de registros    ";
      break;
    case "9P":
      msj = "No se ha digitado el resultado ";
      break;
    case "9Q":
      msj = "Fuera de horario               ";
      break;
    case "9R":
      msj = "No existe cod cups             ";
      break;
    case "9S":
      msj = "Paciente es de otra EPS        ";
      break;
    case "9T":
      msj = "Tarifa no corresponde reserva  ";
      break;
    case "9U":
      msj = "Falta codigo entid administrad.";
      break;
    case "9V":
      msj = "No se puede modificar historia ";
      break;
    case "9W":
      msj = "Falta config. nomina dispersa  ";
      break;
    case "9X":
      msj = "Error en personal que atiende  ";
      break;
    case "9Y":
      msj = "Historia debe estar abierta    ";
      break;
    case "9Z":
      msj = "No alcanza el tiempo cita      ";
      break;
    case "1A":
      msj = "Debe recalcular saldos 963     ";
      break;
    case "1B":
      msj = "Falta cerrar la factura        ";
      break;
    case "1C":
      msj = "Falta cerrar historia clinica  ";
      break;
    case "1D":
      msj = "Presione cualquier tecla       ";
      break;
    case "1E":
      msj = "Directorio mas de 10 caracteres";
      break;
    case "1F":
      msj = "Cama no disponible             ";
      break;
    case "1G":
      msj = "Cita ya tiene factura          ";
      break;
    case "1H":
      msj = "Ya se genero prefactura op949  ";
      break;
    case "1I":
      msj = "Recuerde datos recien nacido   ";
      break;
    case "1J":
      msj = "Art. no caben en la factura    ";
      break;
    case "1K":
      msj = "Paciente tiene factura P abiert";
      break;
    case "1L":
      msj = "No se encontro informe APACHE  ";
      break;
    case "1M":
      msj = "Lote no corresponde con articul";
      break;
    case "1N":
      msj = "Lote farmaceutico ya existe    ";
      break;
    case "1O":
      msj = "No se puede cerrar habitac P   ";
      break;
    case "1P":
      msj = "No uso el lector de barras     ";
      break;
    case "1Q":
      msj = "Falta asignar # fact a hiclinic";
      break;
    case "1R":
      msj = "Reingreso mayor a 15 dias      ";
      break;
    case "1S":
      msj = "Exedio maximo nro de entradas  ";
      break;
    case "1T":
      msj = "No se encontro contrato        ";
      break;
    case "1U":
      msj = "Se actualizaron llamadas tel.  ";
      break;
    case "1V":
      msj = "formato desconocido            ";
      break;
    case "1W":
      msj = "factura es de resumen capitacio";
      break;
    case "1X":
      msj = "No tiene asignado cupo credito ";
      break;
    case "1Y":
      msj = "Datos factura no coinciden      ";
      break;
    case "1Z":
      msj = "Documento no se ha vencido      ";
      break;
    case "2A":
      msj = "Consulta externa restringida    ";
      break;
    case "2B":
      msj = "Ya existe ese paciente          ";
      break;
    case "2C":
      msj = "Error en Grupo Sanguineo        ";
      break;
    case "2D":
      msj = "Datos del documento cambiaron   ";
      break;
    case "2E":
      msj = "Falta fecha de ingreso/retiro   ";
      break;
    case "2F":
      msj = "Vehiculo no es ambulancia       ";
      break;
    case "2G":
      msj = "Se ha modificado el PATH        ";
      break;
    case "2H":
      msj = "No ha liquidado Seguro (F10)    ";
      break;
    case "2I":
      msj = "No aplica para particulares     ";
      break;
    case "2J":
      msj = "Solo aplica para urgencias      ";
      break;
    case "2K":
      msj = "e-mail es un dato importante    ";
      break;
    case "2L":
      msj = "No se encontraron sucursales    ";
      break;
    case "2M":
      msj = "contrato del paci no corresp.   ";
      break;
    case "2N":
      msj = "Paciente no tiene CARNET        ";
      break;
    case "2O":
      msj = "Falta % interes del periodo     ";
      break;
    case "2P":
      msj = "Falta configurar el periodo     ";
      break;
    case "2Q":
      msj = "Ese dia el medico no atiende    ";
      break;
    case "2R":
      msj = "Factura es de otro ano          ";
      break;
    case "2S":
      msj = "Tercero registra EMBARGOS       ";
      break;
    case "2T":
      msj = "Paciente suspendido             ";
      break;
    case "2U":
      msj = "Bloqueo solo FACTURACION        ";
      break;
    case "2V":
      msj = "Comprobante no esta marcado     ";
      break;
    case "2W":
      msj = "Comprobante NO se pudo grabar   ";
      break;
    case "2X":
      msj = "Debe seleccionar folio nuevo    ";
      break;
    case "2Y":
      msj = "Doc. Bloqueado para Impresion   ";
      break;
    case "2Z":
      msj = "Recuerde llenar formul notifici.";
      break;
    case "3A":
      msj = "No existe historia clinica      ";
      break;
    case "3B":
      msj = "Hay Antecedentes alergicos      ";
      break;
    case "3C":
      msj = "MENSAJE SOI                     ";
      break;
    case "3D":
      msj = "ESPECIALIDAD NO CONCUERDA CUP   ";
      break;
    case "3E":
      msj = "PER. ATIENDE NO CONCUERDA CUP   ";
      break;
    case "3F":
      msj = "Factura no es para tipo paci.   ";
      break;
    case "3G":
      msj = "Fact A, solo cierran en mes Ing.";
      break;
    case "3H":
      msj = "No genera cargos                ";
      break;
    case "3I":
      msj = "Use opcion 72 para epicrisis    ";
      break;
    case "3J":
      msj = "CTA para cobrar multa inasistenc";
      break;
    case "3K":
      msj = "Falta NIT entidad prestadora ser";
      break;
    case "3L":
      msj = "Solo aplica para facturas capita";
      break;
    case "3M":
      msj = "No pudo actualizar inventarios  ";
      break;
    case "3N":
      msj = "Hay diferencia en cantidades    ";
      break;
    case "3O":
      msj = "Paciente tiene fiebre           ";
      break;
    case "3P":
      msj = "Paciente con frec. resp rapida  ";
      break;
    case "3Q":
      msj = "Excede % Descuento              ";
      break;
    case "3R":
      msj = "Solo factura paciente adul> y ob";
      break;
    case "3S":
      msj = "Solo factura paciente adul>     ";
      break;
    case "3T":
      msj = "No puede ser el mismo operador  ";
      break;
    case "3U":
      msj = "Tiene saldo pendiente por pagar ";
      break;
    case "3V":
      msj = "No configuro copia de seguridad ";
      break;
    case "3W":
      msj = "No hay contrato de mantenimiento";
      break;
    case "3X":
      msj = "El votante ya fue visitado      ";
      break;
    case "3Y":
      msj = "La cita esta fuera de rango resp";
      break;
    case "3Z":
      msj = "El votante ya fue agendado      ";
      break;
    case "4A":
      msj = "Excede el tiempo Max Permitido  ";
      break;
    case "4B":
      msj = "Solo aplica para p y p          ";
      break;
    case "4C":
      msj = "No ha capturado Foto            ";
      break;
    case "4D":
      msj = "Prepare el paciente para la foto";
      break;
    case "4E":
      msj = "No aplica para especialistas    ";
      break;
    case "4F":
      msj = "Solo aplica para especialistas  ";
      break;
    case "4G":
      msj = "Vencim certificado Dpen Economic";
      break;
    case "4H":
      msj = "Actualizar Colegio Paciente 9714";
      break;
    case "4I":
      msj = "Error Factura con Retencion     ";
      break;
    case "4J":
      msj = "Actualizar Etinas Paciente 97765";
      break;
    case "4K":
      msj = "Esta usando finalidad 10 en pyp ";
      break;
    case "4L":
      msj = "Numero de Radicado no existe    ";
      break;
    case "4M":
      msj = "Nro de Radicado ya tiene respues";
      break;
    case "4N":
      msj = "Nro de Radic no se puede modific";
      break;
    case "4O":
      msj = "CAMA DISPONIBLE POR LA OPC. 6-1 ";
      break;
    case "4P":
      msj = "No Existe Precio de Venta !     ";
      break;
    case "4Q":
      msj = "pct. esta acostado - use opc 9-3";
      break;
    case "4R":
      msj = "Inconsistencia en edad gestacion";
      break;
    case "4S":
      msj = "Inconsistencia Nro gestaciones  ";
      break;
    case "4T":
      msj = "CUPS ya fue facturado ese dia   ";
      break;
    case "4U":
      msj = "BLOQUEO FACTURACION Y NOMINA    ";
      break;
    case "4V":
      msj = "BLOQUEO FACTURACION E INVENT    ";
      break;
    case "4W":
      msj = "BLOQUEO FACTUR, INVENT, NOMINA  ";
      break;
    case "4X":
      msj = "Actualizar Comudidad Paci  971H ";
      break;
    case "4Y":
      msj = "Actualizar Resguardo Paci  971I ";
      break;
    /*case "4Z": msj = "";
            break;*/
    case "5A":
      msj = "Solo administrador prosoft      ";
      break;
    case "5B":
      msj = "Paciente tutela                 ";
      break;
    case "5C":
      msj = "Solo aplica para maestra capitac";
      break;
    case "5D":
      msj = "Historia no es de salud ocupacio";
      break;
    case "5E":
      msj = "Documento ya fue Impreso !!     ";
      break;
    case "5F":
      msj = "Documento tiene  movimiento!    ";
      break;
    case "5G":
      msj = "Factura de Contado !            ";
      break;
    case "5H":
      msj = "cita no puede ser menor a 5 dias";
      break;
    case "5I":
      msj = "factura tiene devolucion!       ";
      break;
    case "5J":
      msj = "Paciente alto Costo             ";
      break;
    case "5K":
      msj = "stop minimo medicamentos        ";
      break;
    case "5L":
      msj = "Atencion codigo no C.I.S        ";
      break;
    case "5M":
      msj = "Acceso Denegado Sesion activa   ";
      break;
    case "5N":
      msj = "Falta configurar Prefijo Factura";
      break;
    case "5O":
      msj = "Proceso suspendido              ";
      break;
    case "5P":
      msj = "Solo se admite S, N o I         ";
      break;
    case "5Q":
      msj = "Paciente especial               ";
      break;
    case "5R":
      msj = "Debe actualizar C.D.P.          ";
      break;
    case "5S":
      msj = "La factura es de otro convenio  ";
      break;
    case "5T":
      msj = "Resolucion DIAN Vencida         ";
      break;
    case "5U":
      msj = "Resolucion DIAN por vencer !    ";
      break;
    case "5V":
      msj = "Paciente Multiconsultante       ";
      break;
    /*FALTAN UNAS*/
    case "6A":
      msj = "Falta actualizar sobretasa      ";
      break;
    case "6B":
      msj = "Falta valor UVT del a�o         ";
      break;
    case "6C":
      msj = "Debe ser una cta provisiones    ";
      break;
    case "6D":
      msj = "Diferencia en tarifa de IVA     ";
      break;
    case "6E":
      msj = "Paciente esta embarazada        ";
      break;
    case "6F":
      msj = "Se requiere diligenciar CLAP    ";
      break;
    case "6G":
      msj = "CLAP esta CERRADO!              ";
      break;
    case "6H":
      msj = "Falta precio compra!            ";
      break;
    case "6I":
      msj = "Tercero asociado a otro NIT     ";
      break;
    case "6J":
      msj = "Tercero solo retiene si hay base";
      break;
    case "6K":
      msj = "No aplica para persona juridica ";
      break;
    case "6L":
      msj = "No se encontro orden salida med.";
      break;
    case "6M":
      msj = "Codigo mal clasificado          ";
      break;
    case "6N":
      msj = "Comprob. ya tiene boleta salida ";
      break;
    case "6O":
      msj = "Documento ya fue aprobado       ";
      break;
    case "6P":
      msj = "Depend. de operador no autorizad";
      break;
    case "6Q":
      msj = "Debe abrir una nueva historia   ";
      break;
    case "6R":
      msj = "Solo se procesan facturas cerrad";
      break;
    case "6T":
      msj = "Error en la fecha de presentac. ";
      break;
    case "6U":
      msj = "Mensaje citas embarazadas       ";
      break;
    case "6V":
      msj = "NO SE EFECTUO NINGUN CAMBIO     ";
      break;
    case "6W":
      msj = "CUPS BLOQUEADO PARA ESE NIT     ";
      break;
    case "6X":
      msj = "No es necesario imprimir documen";
      break;
    case "6Y":
      msj = "Intenta disminuir precio venta! ";
      break;
    case "7A":
      msj = "Paciente cronico                ";
      break;
    case "7B":
      msj = "Limite de citas cumplida        ";
      break;
    case "7C":
      msj = "Limite de Dias de Citas         ";
      break;
    case "7D":
      msj = "Fecha u Hora Menor al ingreso   ";
      break;
    case "7E":
      msj = "Causa Externa incompatible DX   ";
      break;
    case "7F":
      msj = "Impresion unica                 ";
      break;
    case "7G":
      msj = "Cita se encuentra cancelada     ";
      break;
    case "7H":
      msj = "Medicamento No permitido x clasi";
      break;
    case "7I":
      msj = "Pacte ya registra 1ra vez consul";
      break;
    case "7J":
      msj = "Pacte ya registra 1ra vez consul";
      break;
    case "7K":
      msj = "Medicamento Homologo            ";
      break;
    case "7O":
      msj = "Paciente de factura             ";
      break;
    case "7P":
      msj = "Paciente tiene movimiento       ";
      break;
    case "7Q":
      msj = "Vencimiento Resolucion Dian     ";
      break;
    case "7R":
      msj = "Cups Bloquedo por jefe facturac ";
      break;
    case "7S":
      msj = "Cita mal facturada              ";
      break;
    case "7T":
      msj = "Rips Bloqueado                  ";
      break;
    case "7W":
      msj = "Reingreso a Triage < 24 h       ";
      break;
    case "7U":
      msj = "Clase de servicio Bloqueada FACT";
      break;
    case "7V":
      msj = "Glosa duplicada Excel           ";
      break;
    case "7W":
      msj = "Posible reingreso Traige        ";
      break;
    case "7X":
      msj = "Cups Desactualizado nueva Resl  ";
      break;
    case "7Z":
      msj = "Factura No permite art con IVA  ";
      break;
    case "8A":
      msj = "Falta Conf.Actividad Economica  ";
      break;
    case "8B":
      msj = "Proceso copia iniciada..        ";
      break;
    case "8C":
      msj = "Estudio Ant.No comparativo      ";
      break;
    case "8D":
      msj = "Fecha de Fact Mayor a boleta sal";
      break;
    case "8E":
      msj = "La finalidad no igual a la cita ";
      break;
    case "8F":
      msj = "El cod medicamento no igual pend";
      break;
    case "8G":
      msj = "supera la cantidad de pendientes";
      break;
    case "8H":
      msj = "Pendiente ya tiene despacho     ";
      break;
    case "8I":
      msj = "Paciente con posible abuxo      ";
      break;
    case "8J":
      msj = "Cups nivel no igual a Nivel Fact";
      break;
    case "8K":
      msj = "Fact actualmente no tiene Radica";
      break;
    case "8L":
      msj = "Minimo 10 Caracteres            ";
      break;
    case "8M":
      msj = "Factura no es igual a la HC     ";
      break;
    case "8N":
      msj = "Cups ya fue Autori mismo mes    ";
      break;
    case "8O":
      msj = "Valor de la Poliza super 75 %   ";
      break;
    case "8P":
      msj = "Valor de la Poliza super 80 %   ";
      break;
    case "8Q":
      msj = "Valor de la Poliza super 85 %   ";
      break;
    case "8R":
      msj = "Valor de la Poliza super 90 %   ";
      break;
    case "8S":
      msj = "Valor de la Poliza super 95 %   ";
      break;
    case "8T":
      msj = "Candidato adulto Mayor Quinqueni";
      break;
    case "8Y":
      msj = "Valor errado en el total        ";
      break;
    case "8U":
      msj = "Nro de autorizacion en otra fact";
      break;
    case "8V":
      msj = "Candidato adolescencia          ";
      break;
    case "8W":
      msj = "Candidato juventud              ";
      break;
    case "8X":
      msj = "CUPS ya fue facturado 6 meses   ";
      break;
    case "8Y":
      msj = "la suma del producto ERROR      ";
      break;
    case "8Z":
      msj = "la compra no puede superar 9999 ";
      break;
    case "R6":
      msj = "Ya esta registrado entregado    ";
      break;
    case "R7":
      msj = "Articulo no esta en tarifa medic";
      break;
    case "R8":
      msj = "No definido comportamiento factu";
      break;
    case "R9":
      msj = "Bloqueado por cufe factu electro";
      break;
    case "R0":
      msj = "Forma de copago errado no acept ";
      break;
    case "K2":
      msj = " Precio de compra bajo  !       ";
      break;
    case "0A":
      msj = "INSTALANDO JAVA                 ";
      break;
    case "0C":
      msj = "ERROR CON CREA-HIS.EXE          ";
      break;
    case "0D":
      msj = "YA EXISTE UN PARTO PARA ESTE FOLIO";
      break;
    case "0E":
      msj = "EXISTE UN PARTO EN MENOS DE 6 MESES";
      break;
    case "0F":
      msj = "INSTALANDO POWER COBOL          ";
      break;
    case "0G":
      msj = "EL EMPLEADO NO CUMPLE 48 HORAS  ";
      break;
    case "0H":
      msj = "EL EMPLEADO NO CUMPLE 192 HORAS ";
      break;
    case "A0":
      msj = "No tiene problema en desarrollo ";
      break;
    case "A1":
      msj = "Enfermedad muy grave            ";
      break;
    case "A2":
      msj = "Neumonia grave                  ";
      break;
    case "A3":
      msj = "Neumonia                        ";
      break;
    case "A4":
      msj = "Tos o resfriado                 ";
      break;
    case "A5":
      msj = "Sibilancia                      ";
      break;
    case "A6":
      msj = "DIARREA, deshidratacion grave   ";
      break;
    case "A7":
      msj = "DIARREA  deshidratacion leve    ";
      break;
    case "A8":
      msj = "DIARREA  RIESGO DESHIDRATACION  ";
      break;
    case "A9":
      msj = "Diarrea persistente grave       ";
      break;
    case "AA":
      msj = "Diarrea persistente             ";
      break;
    case "AB":
      msj = "Disenteria                      ";
      break;
    case "AC":
      msj = "Enfermedad febril muy grave     ";
      break;
    case "AD":
      msj = "Enfermedad febril intermedio    ";
      break;
    case "AE":
      msj = "Enfermedad febril               ";
      break;
    case "AF":
      msj = "Sospecha de malaria complicada  ";
      break;
    case "AG":
      msj = "Sospecha malaria no complicada  ";
      break;
    case "AH":
      msj = "Dengue grave                    ";
      break;
    case "AI":
      msj = "Dengue con signos de alarma     ";
      break;
    case "AJ":
      msj = "Sospecha de sarampion           ";
      break;
    case "AK":
      msj = "Mastoiditis                     ";
      break;
    case "AL":
      msj = "Otitis media aguda              ";
      break;
    case "AM":
      msj = "Otitis media CRONICA            ";
      break;
    case "AN":
      msj = "No tiene otitis media           ";
      break;
    case "AO":
      msj = "Faringoamigdalitis estreptococica";
      break;
    case "AP":
      msj = "Faringoamigdalitis viral         ";
      break;
    case "AQ":
      msj = "No tiene faringoamigdalitis      ";
      break;
    case "AR":
      msj = "maltrato fisico y/o abuso sexual";
      break;
    case "AS":
      msj = "Sospecha de maltrato             ";
      break;
    case "AT":
      msj = "Falla en la crianza              ";
      break;
    case "AU":
      msj = "No hay sospecha de maltrato      ";
      break;
    case "AV":
      msj = "Desnutricion severa              ";
      break;
    case "AW":
      msj = "Desnutricion                     ";
      break;
    case "AX":
      msj = "No tiene DESNUTRICION            ";
      break;
    case "AY":
      msj = "Riesgo de problema en desarrollo";
      break;
    case "AZ":
      msj = "Desarrollo normal con fact riesg";
      break;
    case "B0":
      msj = "Falta Estudio Principal         ";
      break;
    case "B1":
      msj = "No aplica para esa unid. servic.";
      break;
    case "B2":
      msj = "Doc. aplica solo para devolucion";
      break;
    case "B3":
      msj = "ES OBLIGATORIO DILIGENCIAR AIEPI";
      break;
    case "B4":
      msj = "Doc. no aplica para devoluciones";
      break;
    case "B5":
      msj = "Dev.del mes superan tope Aux.Tra";
      break;
    case "B6":
      msj = "Actu Dependencia laboral Opc.7C1";
      break;
    case "B7":
      msj = "Operador no es igual a correspon";
      break;
    case "B8":
      msj = "Vencio certificado de estudio   ";
      break;
    case "B9":
      msj = "Error Configuracion de Concepto ";
      break;
    case "BA":
      msj = "Obligatorio Actualizar Regimen  ";
      break;
    case "BB":
      msj = "Paciente con sobrepeso          ";
      break;
    case "BC":
      msj = "Paciente OBESO                  ";
      break;
    case "BD":
      msj = "Paciente delgadez moderada      ";
      break;
    case "BE":
      msj = "Paciente delgadez severa        ";
      break;
    case "BF":
      msj = "Perimetro cefalico -2 inferior  ";
      break;
    case "BG":
      msj = "Perimetro cefalico +2 mayor     ";
      break;
    case "BH":
      msj = "Probable retraso desarrollo     ";
      break;
    case "BI":
      msj = "PESO MUY BAJO                   ";
      break;
    case "BJ":
      msj = "PESO BAJO O EN RIESGO           ";
      break;
    case "BK":
      msj = "FRECUENCIA CARDIACA ANORMAL     ";
      break;
    case "BL":
      msj = "FRECUENCIA RESPIRATORIA ANORMAL ";
      break;
    case "BM":
      msj = "TEMPERATURA ANORMAL             ";
      break;
    case "BN":
      msj = "CRUP GRAVE                      ";
      break;
    case "BO":
      msj = "BRONQUIOLITIS GRAVE             ";
      break;
    case "BP":
      msj = "SIBILANCIA GRAVE                ";
      break;
    case "BQ":
      msj = "CRUP LEVE                       ";
      break;
    case "BR":
      msj = "BRONQUIOLITIS LEVE              ";
      break;
    case "BS":
      msj = "DIARREA SIN DESHIDRATACION      ";
      break;
    case "BT":
      msj = "DIARREA PERSISTENTE GRAVE       ";
      break;
    case "BU":
      msj = "DIARREA PERSISTENTE LEVE        ";
      break;
    case "BV":
      msj = "Otitis media RECURRENTE         ";
      break;
    case "BW":
      msj = "RIESGO DESNUTRICION             ";
      break;
    case "BX":
      msj = "ANEMIA SEVERA                   ";
      break;
    case "BY":
      msj = "ANEMIA LEVE                     ";
      break;
    case "BZ":
      msj = "NO TIENE ANEMIA                 ";
      break;
    case "C1":
      msj = "SIDA ESTADIO 1                  ";
      break;
    case "C2":
      msj = "SIDA ESTADIO 2                  ";
      break;
    case "C3":
      msj = "SIDA ESTADIO 3                  ";
      break;
    case "C4":
      msj = "SIDA ESTADIO 4                  ";
      break;
    case "C5":
      msj = "POSIBLE CANCER                  ";
      break;
    case "C6":
      msj = "ALGUN RIESGO DE CANCER          ";
      break;
    case "C7":
      msj = "POCA PROBABILIDAD DE CANCER     ";
      break;
    case "CA":
      msj = "PROBABLE DE DENGUE              ";
      break;
    case "CB":
      msj = "MALTRATO FISICO GRAVE           ";
      break;
    case "CC":
      msj = "MALTRATO FISICO                 ";
      break;
    case "CD":
      msj = "ABUSO SEXUAL                    ";
      break;
    case "CE":
      msj = "SOSPECHA DE ABUSO SEXUAL        ";
      break;
    case "CF":
      msj = "NEGLIGENCIA O ABANDONO          ";
      break;
    case "CG":
      msj = "NO HAY SOSPECHA MALTRATO        ";
      break;
    case "CH":
      msj = "PROBABLE RETRASO DEL DESARROLLO ";
      break;
    case "CI":
      msj = "RIESGO DE PROBLEMA EN DESARROLLO";
      break;
    case "CJ":
      msj = "DESARROLLO NORMAL CON RIESGO    ";
      break;
    case "CK":
      msj = "DESARROLLO NORMAL               ";
      break;
    case "CL":
      msj = "ESTADO EPILEPTICO               ";
      break;
    case "CM":
      msj = "PROBLEMA NEUROLOGICO GRAVE      ";
      break;
    case "CN":
      msj = "EPILEPSIA CON CRISIS GENERALIZAD";
      break;
    case "CO":
      msj = "EPILEPSIA CON CRISIS FOCAL      ";
      break;
    case "CP":
      msj = "EPILEPSIA CON CRISIS DE AUSENCIA";
      break;
    case "CQ":
      msj = "NO TIENE EPILEPSIA              ";
      break;
    case "CR":
      msj = "SOSPECHA TUBERCULOSIS GRAVE     ";
      break;
    case "CS":
      msj = "TUBERCULOSIS CONFIRMADA         ";
      break;
    case "CT":
      msj = "TUBERCULOSIS CLINICA            ";
      break;
    case "CU":
      msj = "TUBERCULOSIS LATENTE            ";
      break;
    case "CV":
      msj = "CONTACTO CON TUBERCULOSIS       ";
      break;
    case "CW":
      msj = "INFECCION VIH SINTOMATICA CONFIR";
      break;
    case "CX":
      msj = "INFECCION VIH CONFIRMADA        ";
      break;
    case "CY":
      msj = "SOSPECHA INFECCION VIH SINTOMATI";
      break;
    case "CZ":
      msj = "EXPUESTO VIH                    ";
      break;
    case "D0":
      msj = "SURCOS EN MAS DE LA MITAD ANTERI";
      break;
    case "D1":
      msj = "TEXTURA PIEL -FINA GELATINOSA   ";
      break;
    case "D2":
      msj = "TEXTURA PIEL -FINA LISA         ";
      break;
    case "D3":
      msj = "TEXTURA PIEL -MAS GRUESA ESCAMAS";
      break;
    case "D4":
      msj = "TEXTURA PIEL -MAS GRUESA GRIETAS";
      break;
    case "D5":
      msj = "TEXTURA PIEL -GRIETAS PROFUNDAS ";
      break;
    case "D6":
      msj = "TEXTURA PIEL -SIN PLIEGUES      ";
      break;
    case "E0":
      msj = "VIH SINTOMATICA IMPROBABLE      ";
      break;
    case "E1":
      msj = "VIH DESCARTADO                  ";
      break;
    case "E2":
      msj = "CETOSIS O CETOACIDOSIS DIABETICA";
      break;
    case "E3":
      msj = "DIABETES MELLITUS               ";
      break;
    case "E4":
      msj = "POSIBLE DIABLETES MELLITUS      ";
      break;
    case "E5":
      msj = "INTOLERANCIA A LA GLUCOSA       ";
      break;
    case "E6":
      msj = "NO TIENE DIABETES MELLITUS      ";
      break;
    case "E7":
      msj = "CELULITIS FACIAL                ";
      break;
    case "E8":
      msj = "ENFERMEDAD BUCAL GRAVE          ";
      break;
    case "E9":
      msj = "TRAUMA BUCO DENTAL              ";
      break;
    case "EA":
      msj = "ESTOMATITIS                     ";
      break;
    case "EB":
      msj = "ENFERMEDAD DENTAL Y GINGIVAL    ";
      break;
    case "EC":
      msj = "ALTO RIESGO DE ENFERMEDAD BUCAL ";
      break;
    case "ED":
      msj = "BAJO RIESGO DE ENFERMEDAD BUCAL ";
      break;
    case "EE":
      msj = "PERIMETRO ABDOMINAL ALTO RIESGO ";
      break;
    case "EF":
      msj = "APENDIC.DEBE REALIZARSE EN 6 HOR";
      break;
    case "EG":
      msj = "NO HAY ULTRASONOGRAFIA          ";
      break;
    case "EH":
      msj = "EMBARAZO DE ALTO RIESGO         ";
      break;
    case "EI":
      msj = "CANTIDAD DE MEDICANETO EN CERO  ";
      break;
    case "EJ":
      msj = "FALTAN DATOS DE CLASIFICACION   ";
      break;
    case "EK":
      msj = "FALTAN DATOS DE MADRE           ";
      break;
    case "EL":
      msj = "PACIENTE MUERTO SOLO ADMI O GEBC";
      break;
    case "EM":
      msj = "INFECCION LOCAL                 ";
      break;
    case "EN":
      msj = "DIARREA CON SANGRE              ";
      break;
    case "EO":
      msj = "PROBLEMA SEVERO ALIMENTACION    ";
      break;
    case "EP":
      msj = "PROBLEMA LEVE ALIMENTACION      ";
      break;
    case "EQ":
      msj = "ERROR EN SOLICITUD DE PATOLOGIA ";
      break;
    case "G0":
      msj = "DIAGN. P Y P COMIENZAN POR Z    ";
      break;
    case "G1":
      msj = "DIAGN.MORBIL. NO PUEDE EMPEZAR Z";
      break;
    case "G2":
      msj = "LA INCAPACIDAD NO SE PUEDE COMBI";
      break;
    case "G3":
      msj = "ENFERMEDAD HUERFANA             ";
      break;
    case "G4":
      msj = "AISLAR POR BACTERIA RESISTENTE  ";
      break;
    case "H1":
      msj = "PESO NORMAL                     ";
      break;
    case "H2":
      msj = "DELGADEZ                        ";
      break;
    case "H3":
      msj = "TALLA MENOR RESPECTO A LA ULTIMA";
      break;
    case "H4":
      msj = "DILIGENCIAR CONSENTIMIENTO INFOR";
      break;
    case "RA":
      msj = "COD NO ESTA EN MAESTRO ARTICULOS";
      break;
    case "U7":
      msj = "TANNER MASCULINO                ";
      break;
    case "U8":
      msj = "TANNER FEMENINO                 ";
      break;
    case "U9":
      msj = "TAMA�O SENOS                    ";
      break;
    case "UA":
      msj = "TAMA�O TESTICULOS               ";
      break;
    case "UM":
      msj = "Sesion no valida!";
      break;
    case "  ":
      msj = "Codigo de error no identificado ";
      break;
    case "DESHAB":
      msj = "Opcion Deshabilitada Temporalmente";
      break;
    case "BLOQUEADO":
      msj = "PROGRAMA BLOQUEADO";
      break;
    default:
      msj = error;
      break;
  }

  return msj;
}
