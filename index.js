const express = require('express');
require('dotenv').config();
const { dbConnection } = require('./database/config');
const cors = require('cors');

// Crear el servidor de express
const app = express();

// Base de Datos
dbConnection();

// Configuración de los CORS
app.use(cors());


// Directorio Público
app.use( express.static('public'));

// Lectura y parseo del body
app.use(express.json()); 

// Rutas
app.use('/api/auth', require('./routes/auth'))
app.use('/api/users', require('./routes/users'))
app.use('/api/channels', require('./routes/channels'))
app.use('/api/speaker', require('./routes/speaker'))
app.use('/api/picture', require('./routes/uploads'))
app.use('/api/poster', require('./routes/poster'))
app.use('/*', express.static('public'))
// app.use('/evento', express.static('public'))
// app.use('/login', express.static('public'))



// Escuchar peticiones 
app.listen( process.env.PORT, () => {
    console.log(`App listening on port ${ process.env.PORT }!`);
});


















