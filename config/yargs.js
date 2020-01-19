//configuracion de comandos

const descripcion = {
    demand: true,
    alias: 'd',
    desc: "Descripción de la tarea por hacer"
};

const completado = {
    demand: true,
    alias: 'c',
    desc: "Marca como completada o pendiente la tarea"
};

const listar = {
    demand: true,
    alias: 'l',
    desc: "Lista las tareas si estan hechas o no"
};

//.comand('nombre','mensaje de ayuda')
const argv = require('yargs')
    .command('crear', 'Crear una tarea', {
        descripcion
    })
    .command('actualizar', 'Actualiza una tarea', {
        descripcion,
        completado
    })
    .command('borrar', 'Elimina una tarea', {
        descripcion
    })
    .command('listar', 'Listar Tareas', {
        listar
    })
    .help()
    .argv;

//hay que exportar
module.exports = {
    argv
}