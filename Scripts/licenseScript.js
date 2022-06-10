


/* VARIABLES GLOBALES */
var laTabla, totalFilas, totalColumnas, horPasos, verPasos, elContenido = [];
var inicioFilas = 0;
var inicioColumnas = 0;

var misColumnas = 5; // COLUMNAS QUE DEJAMOS VISIBLES
var misFilas = 4; // FILAS QUE DEJAMOS VISIBLES

/* REESCRIBE LA TABLA */
function inicia() {
    /* REFIERE A LA TABLA */
    laTabla = document.querySelector("table");
    /* COLECCIÓN DE FILAS */
    lasFilas = laTabla.querySelectorAll("tr");
    /* CANTIDAD DE FILAS */
    totalFilas = lasFilas.length;
    /* REFIERE A LA PRIMERA CELDA */
    lasColumnas = lasFilas[0].querySelectorAll("td");
    /* CANTIDAD DE COLUMNAS */
    totalColumnas = lasColumnas.length;


    /* RECORRE LAS FILAS */
    for (r = 0; r < totalFilas; r++) {
        /* LLENA EL ARRAY elContenido CON UN ELEMENTO POR FILA, Y UN ARRAY VACÍO EN CADA ELEMENTO */
        elContenido[r] = [];
        /* LLENA CADA ARRAY DE LAS FILAS CON EL CONTENIDO DE SUS CELDAS */
        for (d = 0; d < totalColumnas; d++) {
            elContenido[r][d] = lasFilas[r].querySelectorAll("td")[d].innerHTML;
        }
    }


    /* BORRA EL CONTENIDO DE LA TABLA */
    var nuevaTabla = "";
    /* REESCRIBE CADA FILA SÓLO HASTA LAS QUE QUEREMOS PRESENTAR */
    for (r = 0; r < misFilas; r++) {
        nuevaTabla += "<tr>";

        /* LES REESCRIBE CADA COLUMNA SÓLO HASTA LAS QUE QUEREMOS PRESENTAR */
        for (d = 0; d < misColumnas; d++) {
            nuevaTabla += "<td></td>";
        }

        nuevaTabla += "</tr>";
    }

    /* PONE LA NUEVA ESTRUCTURA DENTRO DE LA TABLA */
    laTabla.innerHTML = nuevaTabla;

    /* REFIERE AL ELEMENTO CON LA SCROLLBAR HORIZONTAL */
    horBar = document.querySelector("#hor");
    /* MIDE EL ANCHO DE LA NUEVA TABLA ... */
    anchoTabla = laTabla.offsetWidth;
    /* ... Y LO PASA PARA LA BARRA HORIZONTAL */
    horBar.style.width = anchoTabla + "px";
    /* REINICIA POSICIÓN DE LA BARRA */
    horBar.scrollLeft = 0;
    /* CALCULA EL TOTAL DE PASOS PARA RECORRER TODAS LAS CELDAS */
    horPasos = anchoTabla / (+totalColumnas - misColumnas);
    /* AGREGA EL EVENTO PARA LA FUNCIÓN DE DESPLAZAMIENTO */
    horBar.setAttribute("onscroll", "llenaTablaH(this.scrollLeft)");

    /* EJECUTA LAS FUNCIÓN DE LLENADO PARA LAS FILAS ENVIANDO COMO PARÁMETRO SUS PRIMERAS CELDAS VISIBLES */
    llenaTablaH(inicioFilas);

    /* REFIERE AL ELEMENTO CON LA SCROLLBAR VERTICAL */
    verBar = document.querySelector("#ver");
    /* MIDE EL ALTO DE LA NUEVA TABLA ... */
    altoTabla = laTabla.offsetHeight;
    /* ... Y LO PASA PARA LA BARRA VERTICAL */
    verBar.style.height = altoTabla + "px";
    /* REINICIA POSICIÓN DE LA BARRA */
    verBar.scrollTop = 0;
    /* POSICIONA EL ELEMENTO PARA LA BARRA VERTICAL */
    verBar.style.top = document.querySelector("table").offsetTop + "px";
    verBar.style.left = (laTabla.offsetLeft + anchoTabla) + "px";

    /* CALCULA EL TOTAL DE PASOS PARA RECORRER TODAS LAS CELDAS */
    verPasos = altoTabla / (+totalFilas - misFilas);
    /* AGREGA EL EVENTO PARA LA FUNCIÓN DE DESPLAZAMIENTO */
    verBar.setAttribute("onscroll", "llenaTablaV(this.scrollTop)");

    /* EJECUTA LAS FUNCIONES DE LLENADO PARA EL CONTENIDO ENVIANDO COMO PARÁMETRO SUS PRIMERAS CELDAS VISIBLES */
    llenaTablaV(inicioColumnas);
}


/* FUNCIÓN PARA EL DESPLAZAMIENTO HORIZONTAL */
function llenaTablaH(despl) {

    /* CALCULA CUÁNTOS PASOS (COLUMNAS DESPLAZADAS) TIENE HECHOS LA SCROLLBAR */
    muestra = parseInt(+despl / horPasos);
    /* PRIMERA COLUMNA A MOSTRAR */
    inicioColumnas = +muestra;

    /* RECORRE LAS FILAS ... */
    for (f = 1; f < misFilas; f++) {
        /* ... Y LAS COLUMNAS */
        for (c = 1; c < misColumnas; c++) {
            /* ESCRIBE LOS TÍTULOS SUPERIORES */
            laTabla.querySelectorAll("tr")[0].querySelectorAll("td")[c].innerHTML = elContenido[0][inicioColumnas + c];
            /* ESCRIBE CONTENIDO DE CADA FILA, CELDA POR CELDA */
            laTabla.querySelectorAll("tr")[f].querySelectorAll("td")[c].innerHTML = elContenido[inicioFilas + f][inicioColumnas + c];
        }
    }

}


/* FUNCIÓN PARA EL DESPLAZAMIENTO VERTICAL */
function llenaTablaV(despl) {

    /* CALCULA CUÁNTOS PASOS (FILAS DESPLAZADAS) TIENE HECHOS LA SCROLLBAR */
    muestra = parseInt(+despl / verPasos);
    /* PRIMERA FILA A MOSTRAR */
    inicioFilas = +muestra;

    /* RECORRE LAS FILAS */
    for (f = 1; f < misFilas; f++) {
        /* ESCRIBE LOS TÍTULOS IZQUIERDOS */
        laTabla.querySelectorAll("tr")[f].querySelectorAll("td")[0].innerHTML = elContenido[inicioFilas + f][0];

        /* RECORRE LAS COLUMNAS */
        for (c = 1; c < misColumnas; c++) {
            /* ESCRIBE CONTENIDO DE CADA FILA, CELDA POR CELDA */
            laTabla.querySelectorAll("tr")[f].querySelectorAll("td")[c].innerHTML = elContenido[inicioFilas + f][inicioColumnas + c];
        }
    }

}

/* FUNCIÓN PARA REORDENAR LAS COLUMNAS POR ORDEN ALFABÉTICO */
var myApp = angular.module('myApp', []);

myApp.controller('namesCtrl', function ($scope, $filter) {
    $scope.triggerForm = false;
    $scope.order = 'name';

    $scope.users = [
        { id: 1, name: 'Jani', lastname: 'Mendez', email: 'example@gustr.com', bussiness: 'Google', department: 'Gerencia', office: 'California', role: 'Gerente', group: 'Ejecutivo' },
        { id: 2, name: 'Daniela', lastname: 'Ortega', email: 'example@gustr.com', bussiness: 'Facebook', department: 'Gerencia', office: 'California', role: 'Gerente', group: 'Ejecutivo' },
        { id: 1, name: 'Luis', lastname: 'Contreras', email: 'example@gustr.com', bussiness: 'Twitter', department: 'Gerencia', office: 'California', role: 'Gerente', group: 'Ejecutivo' },
    ];



    $scope.orderBy = function (filter) {
        $scope.order = filter;
    };

});



