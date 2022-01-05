var arrayFechas_lab001 = { 'ANO_CONTAB': '', 'FECHA_INICIAL': '', 'MES_INICIAL': '', 'DIA_INICIAL': '', 'FECHA_FINAL': '', 'MES_FINAL': '', 'DIA_FINAL': '' }


$(document).ready(() => {
    _inputControl('reset');
    _inputControl('disabled');

    nombreOpcion('7 - Recargar resultados desde facturacion')
    sacarAno_lab001()
})

function sacarAno_lab001() {
    var ano1 = $_USUA_GLOBAL[0].FECHALNK.split('')
    arrayFechas_lab001.ANO_CONTAB = parseInt(ano1[0] + ano1[1]) + 2000
    arrayFechas_lab001.ANO_CONTAB = arrayFechas_lab001.ANO_CONTAB.toString()

    $('#anoInicial_lab001').val(arrayFechas_lab001.ANO_CONTAB)
    $('#anoFinal_lab001').val(arrayFechas_lab001.ANO_CONTAB)

    arrayFechas_lab001.MES_INICIAL = localStorage.Mes
    arrayFechas_lab001.MES_FINAL = localStorage.Mes

    $('#mesInicial_lab001').val(arrayFechas_lab001.MES_INICIAL)
    $('#mesFinal_lab001').val(arrayFechas_lab001.MES_FINAL)

    arrayFechas_lab001.DIA_INICIAL = '01'
    arrayFechas_lab001.DIA_FINAL = '01'

    $('#diaInicial_lab001').val(arrayFechas_lab001.DIA_INICIAL)
    $('#diaFinal_lab001').val(arrayFechas_lab001.DIA_FINAL)

    validarMesInicial_lab001()
}

function salir_lab001() {
    arrayFechas_lab001 = {}
    _inputControl('reset');
    _inputControl('disabled');
    _toggleNav()
}

function validarMesInicial_lab001() {
    validarInputs(
        {
            form: "#validarMesInicial_lab001",
            orden: '1',
        },
        () => salir_lab001(),
        function () {
            arrayFechas_lab001.MES_INICIAL = cerosIzq($('#mesInicial_lab001').val(), 2)

            $('#mesInicial_lab001').val(arrayFechas_lab001.MES_INICIAL)

            if (parseInt(arrayFechas_lab001.MES_INICIAL) < 1 || parseInt(arrayFechas_lab001.MES_INICIAL) > 12) {
                CON851('03', 'Mes invalido!', null, 'error', 'error')
                validarMesInicial_lab001()
            } else {
                validarDiaInicial_lab001()
            }
        }
    )
}

function validarDiaInicial_lab001() {
    validarInputs(
        {
            form: "#validarDiaInicial_lab001",
            orden: '1',
        },
        () => validarMesInicial_lab001(),
        function () {
            arrayFechas_lab001.DIA_INICIAL = cerosIzq($('#diaInicial_lab001').val(), 2)

            $('#diaInicial_lab001').val(arrayFechas_lab001.DIA_INICIAL)

            verificarFechaInicio_lab001()
        }
    )
}

function verificarFechaInicio_lab001() {
    loader('show')

    arrayFechas_lab001.FECHA_INICIAL = arrayFechas_lab001.ANO_CONTAB + arrayFechas_lab001.MES_INICIAL + arrayFechas_lab001.DIA_INICIAL

    let URL = get_url("APP/LAB/LAB001.DLL");

    postData({ datosh: datosEnvio() + arrayFechas_lab001.FECHA_INICIAL + '|' + '1' + '|' }, URL)
        .then((data) => {
            loader('hide')
            validarMesFinal_lab001()
        })
        .catch(error => {
            console.log(error)
            loader('hide')
            validarDiaInicial_lab001()
        });
}

function validarMesFinal_lab001() {
    validarInputs(
        {
            form: "#validarMesfinal_lab001",
            orden: '1',
        },
        () => validarDiaInicial_lab001(),
        function () {
            arrayFechas_lab001.MES_FINAL = cerosIzq($('#mesFinal_lab001').val(), 2)

            $('#mesFinal_lab001').val(arrayFechas_lab001.MES_FINAL)

            if (parseInt(arrayFechas_lab001.MES_FINAL) < 1 || parseInt(arrayFechas_lab001.MES_FINAL) > 12) {
                CON851('03', 'Mes invalido!', null, 'error', 'error')
                validarMesFinal_lab001()
            } else {
                validarDiaFinal_lab001()
            }
        }
    )
}

function validarDiaFinal_lab001() {
    validarInputs(
        {
            form: "#validarDiaFinal_lab001",
            orden: '1',
        },
        () => validarMesFinal_lab001(),
        function () {
            arrayFechas_lab001.DIA_FINAL = cerosIzq($('#diaFinal_lab001').val(), 2)

            $('#diaFinal_lab001').val(arrayFechas_lab001.DIA_FINAL)

            arrayFechas_lab001.FECHA_FINAL = arrayFechas_lab001.ANO_CONTAB + arrayFechas_lab001.MES_FINAL + arrayFechas_lab001.DIA_FINAL

            if (arrayFechas_lab001.FECHA_FINAL < arrayFechas_lab001.FECHA_INICIAL) {
                CON851('03', 'Fecha final menor a inicial!', null, 'error', 'error')
                validarDiaFinal_lab001()
            } else {
                escribirLab_lab001()
            }
        }
    )
}

function escribirLab_lab001() {
    loader('show')
    let URL = get_url("APP/LAB/LAB001.DLL");

    postData({ datosh: datosEnvio() + arrayFechas_lab001.FECHA_INICIAL + '|' + '2' + '|' + arrayFechas_lab001.FECHA_FINAL + '|' }, URL)
        .then((data) => {
            loader('hide')
            CON851('', 'Proceso terminado!', null, 'success', 'Exitoso')
            validarMesInicial_lab001()
        })
        .catch(error => {
            console.log(error)
            loader('hide')
            validarDiaInicial_lab001()
        });
}