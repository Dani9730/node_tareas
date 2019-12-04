//logica 
const fs = require('fs'); //modulo file system, nos permite acceder al sistema de ficheros 

let tareasPorHacer = []; //creo un vector vacio
//cargarBD() que lee un archivo json
const cargarDB = () => {
        try {
            tareasPorHacer = require('../db/data.json');
        } catch (error) {
            tareasPorHacer = [];
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
const getLista = (status) => {
        //llamamos a la funcion cargar DB
        cargarDB();
        var lista;
        try {

            lista = tareasPorHacer.filter(tarea => tarea.completado === eval(status));

        } catch (err) {
            return false;
        }
        if (lista.length === 0) {
            return false;
        } else {
            return lista;
        }
    }
    //funcion actualizar
const actualizar = (descripcion, completado = true) => {
    cargarDB();

    let index = tareasPorHacer.findIndex(tarea => tarea.descripcion === descripcion);

    if (index >= 0) {
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