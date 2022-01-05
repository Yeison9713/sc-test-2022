function buscarFestivo(date) {
    var _holidays = {
        'M': {//Mes, Dia
            '01/01': "Año nuevo",
            '05/01': "Dia del trabajo",
            '07/20': "Independencia nacional",
            '08/07': "Batalla de boyaca",
            '12/08': "Inmaculada concepcion",
            '12/25': "Navidad"
        },
        //lunes / mes / dia
        'D': {
            '1/01/06': "Epifania",
            '1/01/07': "Epifania",
            '1/01/08': "Epifania",
            '1/01/09': "Epifania",
            '1/01/10': "Epifania",
            '1/01/11': "Epifania",
            '1/01/12': "Epifania",

            '1/03/19': "San jose",
            '1/03/20': "San jose",
            '1/03/21': "San jose",
            '1/03/22': "San jose",
            '1/03/23': "San jose",
            '1/03/24': "San jose",
            '1/03/25': "San jose",

            '1/08/15': "Asuncion de la virgen",
            '1/08/16': "Asuncion de la virgen",
            '1/08/17': "Asuncion de la virgen",
            '1/08/18': "Asuncion de la virgen",
            '1/08/19': "Asuncion de la virgen",
            '1/08/20': "Asuncion de la virgen",
            '1/08/21': "Asuncion de la virgen",

            '1/10/12': "Dia de la raza",
            '1/10/13': "Dia de la raza",
            '1/10/14': "Dia de la raza",
            '1/10/15': "Dia de la raza",
            '1/10/16': "Dia de la raza",
            '1/10/17': "Dia de la raza",
            '1/10/18': "Dia de la raza",

            '1/11/01': "Dia de todos los santos",
            '1/11/02': "Dia de todos los santos",
            '1/11/03': "Dia de todos los santos",
            '1/11/04': "Dia de todos los santos",
            '1/11/05': "Dia de todos los santos",
            '1/11/06': "Dia de todos los santos",
            '1/11/07': "Dia de todos los santos",

            '1/11/11': "Independencia de Cartagena",
            '1/11/12': "Independencia de Cartagena",
            '1/11/13': "Independencia de Cartagena",
            '1/11/14': "Independencia de Cartagena",
            '1/11/15': "Independencia de Cartagena",
            '1/11/16': "Independencia de Cartagena",
            '1/11/17': "Independencia de Cartagena",

            '1/06/29': "San Pedro y San pablo",
            '1/06/30': "San Pedro y San pablo",
            '1/07/05': "San Pedro y San pablo",
            '1/07/05': "San Pedro y San pablo",
            '1/07/04': "San Pedro y San pablo",
            '1/07/03': "San Pedro y San pablo",
            '1/07/02': "San Pedro y San pablo",
            '1/07/01': "San Pedro y San pablo",
        },
        //año / mes / dia
        'A': {
            
            '19/04/18': "Semana Santa",
            '19/04/19': "Semana Santa",
            '20/04/09': "Semana Santa",
            '20/04/10': "Semana Santa",
            '21/04/01': "Semana Santa",
            '21/04/02': "Semana Santa",

            '19/06/03': "Asension del señor",
            '20/05/25': "Asension del señor",

            '19/06/24': "Corpues Christi",
            '20/06/15': "Corpues Christi",

            '19/07/01': "Sagrado Corazon",
            '20/06/22': "Sagrado Corazon",
        }
    };
    // var diff = 1 + (0 | (new Date(date).getDate() - 1) / 7);
    // var memorial = (new Date(date).getDay() === 1 && (new Date(date).getDate() + 7) > 30) ? "5" : null;
    console.log(date)
    console.log(moment(date).format('d/MM/DD'))
    
    return (_holidays['M'][moment(date).format('MM/DD')] || _holidays['D'][moment(date).format('d/MM/DD')] || _holidays['A'][moment(date).format('YY/MM/DD')]);
}