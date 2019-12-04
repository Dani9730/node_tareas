const descripcion = {
    demand: true,
    alias: 'd',
    desc: "Descripción de la tarea por hacer"
};

const completado = {
    default: true,
    alias: 'c',
    desc: "Marca como completada o pendiente la tarea"
};

const hechas = {
    default: true,
    alias: 't',
    desc: "Lista tareas hechas"
};

const noHechas = {
    default: true,
    alias: 'f',
    desc: "Lista tareas no hechas"
};

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
    .command('listarTrue', 'Lista tarea hecha', {
        descripcion,
        hechas
    })
    .command('listarFalse', 'Lista tarea no hecha', {
        descripcion,
        noHechas
    })
    .help()
    .argv;

module.exports = {
    argv
}