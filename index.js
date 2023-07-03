const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('¡Hola, mundo!');
});


const port = 3000; // El puerto en el que deseas que se ejecute tu API
app.use('/api', require('./router/router'))
app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});
