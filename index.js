const express = require('express');
const bodyParser = require('body-parser');
const sql = require('mssql');

// Configuración de la base de datos
const config = {
    user: 'desarrollo',
    password: 'fHAHA8845o',
    server: '190.144.156.113',
    database: 'picasso_developing',
    options: {
        encrypt: true,
        trustServerCertificate: true
    }
};

// Crear la aplicación Express
const app = express();
app.use(bodyParser.json());

// Conexión a la base de datos
async function getConnection() {
    try {
        return await sql.connect(config);
    } catch (err) {
        console.error('Error de conexión:', err);
        throw err;
    }
}

// GET: Obtener todos los registros
app.get('/densidades', async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query('SELECT * FROM dbo.densidades');
        res.json(result.recordset);
    } catch (err) {
        res.status(500).send('Error al obtener datos: ' + err.message);
    }
});

// POST: Agregar un nuevo registro
app.post('/densidades', async (req, res) => {
    const { campo1, campo2 } = req.body; // Reemplaza 'campo1' y 'campo2' con los nombres de tus columnas
    try {
        const pool = await getConnection();
        await pool.request()
            .input('campo1', sql.VarChar, campo1) // Ajusta el tipo de dato según tu base
            .input('campo2', sql.Int, campo2)
            .query('INSERT INTO dbo.densidades (campo1, campo2) VALUES (@campo1, @campo2)');
        res.status(201).send('Registro creado exitosamente');
    } catch (err) {
        res.status(500).send('Error al insertar datos: ' + err.message);
    }
});

// PUT: Actualizar un registro
app.put('/densidades/:id', async (req, res) => {
    const { id } = req.params;
    const { campo1, campo2 } = req.body;
    try {
        const pool = await getConnection();
        await pool.request()
            .input('id', sql.Int, id)
            .input('campo1', sql.VarChar, campo1)
            .input('campo2', sql.Int, campo2)
            .query('UPDATE dbo.densidades SET campo1 = @campo1, campo2 = @campo2 WHERE id = @id');
        res.send('Registro actualizado exitosamente');
    } catch (err) {
        res.status(500).send('Error al actualizar datos: ' + err.message);
    }
});

// DELETE: Eliminar un registro
app.delete('/densidades/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const pool = await getConnection();
        await pool.request()
            .input('id', sql.Int, id)
            .query('DELETE FROM dbo.densidades WHERE id = @id');
        res.send('Registro eliminado exitosamente');
    } catch (err) {
        res.status(500).send('Error al eliminar datos: ' + err.message);
    }
});

// Iniciar el servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
