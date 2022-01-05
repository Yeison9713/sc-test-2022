$(document).ready(function () {
    console.log('entro a teclas')
    validar_teclas()
})

function validar_teclas() {
    validarInputs(
        {
            form: "#teclas",
            orden: '1'
        },
        function () { validar_teclas() },
        function () {
            var tecla = $('#caja_teclas').val()
			console.log(tecla);
            console.log(encodeURIComponent(tecla))
            console.log(tecla.charCodeAt(0).toString(16));
            //console.log(test(tecla))
            // console.log(decodeURIComponent('%' + tecla.charCodeAt(0).toString(16)))
            LLAMADO_DLLMIGRA(tecla)
        }
    )
}

function urlDll(nomDll, modulo) {
    return 'http://' + '192.168.0.100' + '/MAIN-ELECT/' + 'app/' + modulo + '/' + nomDll + '.dll';
}

function LLAMADO_DLLMIGRA(param) {
    // $.ajax({
    //     url: urlDll('TECLAS', 'MIGRA'),
    //     type: 'POST',
    //     data: { datosh: param + '|' },
    //     contentType: "application/x-www-form-urlencoded;charset=ISO-8859-15",
    //     beforeSend: function (request) {
    //         request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=ISO-8859-15");
    //         request.setRequestHeader("test", "test1");
    //     },
    // }).done(data => {
    //     console.log(data)
    // })


    var data = new FormData();
    data.append("datosh", param);

    var xhr = new XMLHttpRequest();
    xhr.open("POST", urlDll('TECLAS', 'MIGRA'), false)
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=ISO-8859-1");
    xhr.send(data);
    if (xhr.status == 200) {
        console.log('-->')
        console.log(xhr.response);
    } else {
        console.log('Error: ' + xhr);
    }
    validar_teclas();
}

function test(s) {
    var u,
        i,
        n,
        s;

    u = StringUTF8AsBytesArrayFromString(s);
    n = u.length;
    s = '';

    for (i = 0; i < n; i++) {
        s += (u[i] < 16 ? '0' : '') + u[i].toString(16);
    }

    return s;
}

function StringUTF8AsBytesArrayFromString(s) {
    var i,
        n,
        u;

    u = [];
    s = encodeURIComponent(s);

    n = s.length;
    for (i = 0; i < n; i++) {
        if (s.charAt(i) == '%') {
            u.push(parseInt(s.substring(i + 1, i + 3), 16));
            i += 2;
        }
        else {
            u.push(s.charCodeAt(i));
        }
    }

    return u;
}