const express = require('express');
const router = express.Router(); // Initialize the router
const sql = require('mssql');
const dbConfig = require('../index');  // Ajusta la ruta si es necesario

// Ruta para obtener todas las variedades
router.get('/variedades', async (req, res) => {
    try {
        const result = await req.db.request().query('SELECT * FROM Variedad');
        res.json(result.recordset);
    } catch (err) {
        res.status(500).send('Error al obtener variedades: ' + err.message);
    }
});

// Ruta para obtener una variedad por su ID
router.get('/variedades/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await req.db.request()
            .input('id', sql.Int, id)  // Usamos el parámetro 'id' para la consulta
            .query('SELECT * FROM Variedad WHERE VariedadID = @id');
        
        if (result.recordset.length === 0) {
            return res.status(404).send('Variedad no encontrada');
        }

        res.json(result.recordset[0]);  // Devolvemos solo la variedad encontrada
    } catch (err) {
        res.status(500).send('Error al obtener variedad: ' + err.message);
    }
});


// Ruta para agregar una nueva variedad
router.post('/variedades', async (req, res) => {
    const { Nombre } = req.body;
    try {
        await req.db.request()
            .input('Nombre', sql.NVarChar, Nombre)
            .query('INSERT INTO Variedad (Nombre) VALUES (@Nombre)');
        res.status(201).send('Variedad creada exitosamente');
    } catch (err) {
        res.status(500).send('Error al insertar variedad: ' + err.message);
    }
});

// Ruta para actualizar una variedad
router.put('/variedades/:id', async (req, res) => {
    const { id } = req.params;
    const { Nombre } = req.body;
    try {
        await req.db.request()
            .input('id', sql.Int, id)
            .input('Nombre', sql.NVarChar, Nombre)
            .query('UPDATE Variedad SET Nombre = @Nombre WHERE VariedadID = @id');
        res.send('Variedad actualizada exitosamente');
    } catch (err) {
        res.status(500).send('Error al actualizar variedad: ' + err.message);
    }
});

// Ruta para eliminar una variedad
router.delete('/variedades/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await req.db.request()
            .input('id', sql.Int, id)
            .query('DELETE FROM Variedad WHERE VariedadID = @id');
        res.send('Variedad eliminada exitosamente');
    } catch (err) {
        res.status(500).send('Error al eliminar variedad: ' + err.message);
    }
});

module.exports = router; // Export the router