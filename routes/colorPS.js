const express = require('express');
const router = express.Router(); // Initialize the router
const sql = require('mssql');
const dbConfig = require('../index');  // Ajusta la ruta si es necesario


// Ruta para obtener todos los colores
router.get('/colores', async (req, res) => {
    try {
        const result = await req.db.request().query('SELECT * FROM dbo.ColorPS');
        res.json(result.recordset);
    } catch (err) {
        res.status(500).send('Error al obtener colores: ' + err.message);
    }
});

//ruta traer con id 

router.get('/colores/:id', async (req, res) => {
    const { id } = req.params;  // Obtiene el ID del parámetro de la URL
    try {
        const result = await req.db.request().query(`SELECT * FROM dbo.ColorPS WHERE ColorID = ${id}`);
        if (result.recordset.length > 0) {
            res.json(result.recordset[0]);  // Retorna el color con el ColorID solicitado
        } else {
            res.status(404).send('Color no encontrado');
        }
    } catch (err) {
        res.status(500).send('Error al obtener el color: ' + err.message);
    }
});



// Ruta para agregar un nuevo color
router.post('/colores', async (req, res) => {
    const { Nombre } = req.body;

    try {
        // Establecer conexión a la base de datos
        const pool = await sql.connect(dbConfig);  // Usar dbConfig
        
        // Ejecutar la consulta de inserción
        await pool.request()
            .input('Nombre', sql.NVarChar, Nombre)
            .query('INSERT INTO dbo.ColorPS (Nombre) VALUES (@Nombre)');

        res.status(201).send('Color creado exitosamente');
    } catch (err) {
        console.error('Error al insertar color:', err);
        res.status(500).send('Error al insertar color: ' + err.message);
    } finally {
        // Cerrar la conexión
        sql.close();
    }
});


// Ruta para actualizar un color
router.put('/colores/:id', async (req, res) => {
    const { id } = req.params;
    const { Nombre } = req.body;
    try {
        await req.db.request()
            .input('id', sql.Int, id)
            .input('Nombre', sql.NVarChar, Nombre)
            .query('UPDATE dbo.ColorPS SET Nombre = @Nombre WHERE ColorID = @id');
        res.send('Color actualizado exitosamente');
    } catch (err) {
        res.status(500).send('Error al actualizar color: ' + err.message);
    }
});

// Ruta para eliminar un color
router.delete('/colores/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await req.db.request()
            .input('id', sql.Int, id)
            .query('DELETE FROM dbo.ColorPS WHERE ColorID = @id');
        res.send('Color eliminado exitosamente');
    } catch (err) {
        res.status(500).send('Error al eliminar color: ' + err.message);
    }
});

module.exports = router; // Export the router
