const express = require('express');
const router = express.Router(); // Initialize the router
const sql = require('mssql');
const dbConfig = require('../index');  // Ajusta la ruta si es necesario


// Ruta para obtener todas las familias
router.get('/familias', async (req, res) => {
    try {
        const result = await req.db.request().query('SELECT * FROM Familia');
        res.json(result.recordset);
    } catch (err) {
        res.status(500).send('Error al obtener familias: ' + err.message);
    }
});

// Ruta para obtener una familia por su ID
router.get('/familias/:id', async (req, res) => {
    const familiaId = req.params.id; // Obtener el ID de la URL
    try {
        const result = await req.db.request()
            .input('FamiliaID', sql.Int, familiaId)  // Asignar el valor del parámetro
            .query('SELECT * FROM Familia WHERE FamiliaID = @FamiliaID'); // Consultar por FamiliaID
        if (result.recordset.length === 0) {
            return res.status(404).send('Familia no encontrada');
        }
        res.json(result.recordset[0]); // Enviar la familia encontrada
    } catch (err) {
        res.status(500).send('Error al obtener la familia: ' + err.message);
    }
});


//post
router.post('/familias', async (req, res) => {
    const { Nombre } = req.body;
    try {
        if (!Nombre) {
            return res.status(400).send('El campo Nombre es obligatorio');
        }
        await req.db.request()
            .input('Nombre', sql.NVarChar, Nombre)
            .query('INSERT INTO Familia (Nombre) VALUES (@Nombre)');
        res.status(201).send('Familia creada exitosamente');
    } catch (err) {
        res.status(500).send('Error al insertar familia: ' + err.message);
    }
});



// Ruta para actualizar una familia
router.put('/familias/:id', async (req, res) => {
    const { id } = req.params;
    const { Nombre } = req.body;
    try {
        await req.db.request()
            .input('id', sql.Int, id)
            .input('Nombre', sql.NVarChar, Nombre)
            .query('UPDATE Familia SET Nombre = @Nombre WHERE FamiliaID = @id');
        res.send('Familia actualizada exitosamente');
    } catch (err) {
        res.status(500).send('Error al actualizar familia: ' + err.message);
    }
});

// Ruta para eliminar una familia
router.delete('/familias/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await req.db.request()
            .input('id', sql.Int, id)
            .query('DELETE FROM Familia WHERE FamiliaID = @id');
        res.send('Familia eliminada exitosamente');
    } catch (err) {
        res.status(500).send('Error al eliminar familia: ' + err.message);
    }
});

module.exports = router; // Export the router
