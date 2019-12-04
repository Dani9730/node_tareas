//logica 
const fs = require('fs'); //modulo file system, nos permite acceder al sistema de ficheros 

let tareasPorHacer = []; //creo un vector vacio

//cargarBD() que lee un archivo json
const cargarDB = () => {
    try {
        tareasPorHacer = require('../db/data.json'); //requerir la informacion que esta en el json
    } catch (error) {
        tareasPorHacer = []; //y guardamos como un vector
    }
}

//guardarDB que guarda en un archivo JSON los datos que estan dentro del vector 
const guardarDB = () => {
        //data va guardar lo que tiene el vector en formato json
        //JSON.stringify nos ayuda a guardar el vector en formato json
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
        guardarDB();

        //exporto la tarea
        return tarea;
    }
    // esta funcion es para obtener la lista
const getLista = () => {
        //llamamos a la funcion cargar DB
        cargarDB();
        return tareasPorHacer;
    }
    //funcion actualizar la descripcion es obligatoria 
const actualizar = (descripcion, completado = true) => {
    cargarDB();
    //findIndex nos devuelve el indice que coincida con el criterio de busqueda
    //si la tarea.descripcion es igual a descripcion nos va devolver el index de la tarea
    let index = tareasPorHacer.findIndex(tarea => tarea.descripcion === descripcion);
    //verificamos si encontro o no la tarea
    if (index >= 0) {
        //posicion index 
        tareasPorHacer[index].completado = completado;
        guardarDB();
        return true;
    }
    return false;
}

const borrar = (descripcion) => {
    cargarDB();

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