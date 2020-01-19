//logica 
const fs = require('fs'); //modulo file system, nos permite acceder al sistema de ficheros 

let tareasPorHacer = []; //creo un vector vacio
//cargarBD() que lee un archivo json
const cargarDB = () => {
        //poner excepciones 
        try {
            tareasPorHacer = require('../db/data.json');
        } catch (error) {
            //si hay error se envia un arreglo vacio
            tareasPorHacer = [];
        }
    }
    //guardarDB que guarda en un archivo JSON los datos que estan dentro del vector 
const guardarDB = () => {
        //data va guardar lo que tiene el vector en formato json
        //JSON.stringify nos ayuda a guardar el vector en formato json
        //cambia de objeto a un formato json
        let data = JSON.stringify(tareasPorHacer);
        //crearemos una carpeta db con un archivo json
        //fs.writeFile(el archivo donde voy a guardar, que voy a mandar a guardar)
        //haremos un callback si es es que se poduce un error con una función flecha
        fs.writeFile('db/data.json', data, (err) => {
            if (err) throw new Error('No se pudo guardar', err);
        });
    }
    //esta funcion crea una tarea por hacer, recibe como parametro la descripcion
const crear = (descripcion) => {
    cargarDB();
    //crea un objeto tarea, guarda el objeto en la lista 
    let tarea = {
        descripcion,
        completado: false
    };
    tareasPorHacer.push(tarea);
    //guarda en el archivo
    //va guardar despues de hacer el push
    guardarDB();

    //exporto la tarea
    return tarea;
}

// esta funcion es para obtener la lista

const getLista = () => {
    cargarDB();
    return tareasPorHacer;
}

const oblist = (estado) => {
    let listado = estado.getLista(completado);
    for (estado in listado) {
        if (listado === false || listado === 0) {
            return estado = false
        } else {
            return estado = true
        }
    }
}

//funcion actualizar
//recibe 2 argumentos 
const actualizar = (descripcion, completado = true) => {
        cargarDB();
        //findindex=> recibe un callback, y hace un ciclo interno por cada uno de los elementos 
        let index = tareasPorHacer.findIndex(tarea => tarea.descripcion === descripcion);
        //posicion si sale -1 no hay el 0 si es una posicion valida

        if (index >= 0) {
            tareasPorHacer[index].completado = completado;
            //grabar en la base de datos
            guardarDB();
            return true;
        }
        return false;

    }
    //recibe la descripcion 

const borrar = (descripcion) => {
    //primero cargar la base de datos
    cargarDB();
    //usaremos la funcion filter que nos ayuda a quitar o filtrar y regresa un nuevo arreglo
    let nuevoListado = tareasPorHacer.filter(tarea => tarea.descripcion !== descripcion);
    if (tareasPorHacer.length === nuevoListado.length) {
        return false;
    } else {
        tareasPorHacer = nuevoListado;
        guardarDB();
        return true;
    }
}

module.exports = {
    crear,
    getLista,
    actualizar,
    borrar
}