require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sql = require('mssql');

// Configuración de la base de datos desde .env
const dbConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_DATABASE,
    options: {
        encrypt: process.env.DB_ENCRYPT === 'true',
        trustServerCertificate: process.env.DB_TRUST_CERTIFICATE === 'true',
    },
};

// Crear la aplicación Express
const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Middleware para inyectar la conexión a la base de datos
app.use(async (req, res, next) => {
    try {
        req.db = await sql.connect(dbConfig);
        next();
    } catch (err) {
        console.error('Error al conectar a la base de datos:', err.message);
        res.status(500).send('Error al conectar a la base de datos');
    }
});

// Rutas para API
const ColorPS = require('./routes/colorPS');
const Familia = require('./routes/Familia');


app.use('/api', ColorPS);
app.use('/api', Familia);

// Sirve los archivos estáticos de la carpeta "uploads"
app.use('/uploads', express.static('uploads'));

// Iniciar el servidor
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});

// Exportar dbConfig después de su definición
module.exports = dbConfig;
