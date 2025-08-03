function basicEventLoopExample() {
    console.log("Inicio del ejemplo básico");
    setTimeout(() => {
        console.log("Este mensaje se ejecuta después de 1 segundo (callback en la cola de tareas)");
    }, 1000);
    console.log("Fin del ejemplo básico");
}

function intermediateEventLoopExample() {
    console.log("Inicio del ejemplo intermedio");
    setTimeout(() => {
        console.log("Mensaje del primer setTimeout (500ms)");
    }, 500);

    setTimeout(() => {
        console.log("Mensaje del segundo setTimeout (0ms)");
    }, 0);

    console.log("Fin del ejemplo intermedio");
}


function advancedEventLoopExample() {
    console.log("Inicio del ejemplo avanzado");

    setTimeout(() => {
        console.log("Mensaje del setTimeout (0ms)");
    }, 0);

    Promise.resolve().then(() => {
        console.log("Mensaje de la promesa resuelta (microtarea)");
    });

    console.log("Fin del ejemplo avanzado");
}

// Llamar a las funciones para probarlas
basicEventLoopExample();
setTimeout(() => intermediateEventLoopExample(), 2000); // Llamar después de 2 segundos
setTimeout(() => advancedEventLoopExample(), 4000); // Llamar después de 4 segundos