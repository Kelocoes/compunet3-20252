const http = require('http');

const server = http.createServer((req, res) => {
    console.log("🟢 Petición recibida:", req.url);

    // Responder rápido
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hola Mundo\n');

    // Después de responder, agendamos tarea micro asincrónica
    Promise.resolve().then(() => {
        console.log("📈 Registrando métrica de acceso...");
        // Aquí podrías hacer algo como enviar a un sistema de métricas
    });

    console.log("✅ Respuesta enviada");
});

server.listen(3000, () => {
    console.log("🚀 Servidor en http://localhost:3000");
});
