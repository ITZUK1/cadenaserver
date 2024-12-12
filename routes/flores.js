const express = require('express');
const router = express.Router(); // Initialize the router
const sql = require('mssql');
const dbConfig = require('../index');  // Ajusta la ruta si es necesario


// Ruta para obtener todas las flores
router.get('/flores', async (req, res) => {
    try {
        const result = await req.db.request().query('SELECT * FROM Flor');
        res.json(result.recordset);
    } catch (err) {
        res.status(500).send('Error al obtener flores: ' + err.message);
    }
});

// Ruta para obtener una flor por su ID
router.get('/flores/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await req.db.request()
            .input('id', sql.Int, id)  // Usamos el parámetro 'id' para la consulta
            .query('SELECT * FROM Flor WHERE FlorID = @id');
        
        if (result.recordset.length === 0) {
            return res.status(404).send('Flor no encontrada');
        }

        res.json(result.recordset[0]);  // Devolvemos solo la flor encontrada
    } catch (err) {
        res.status(500).send('Error al obtener flor: ' + err.message);
    }
});


// Ruta para agregar una nueva flor
router.post('/flores', async (req, res) => {
    const { Nombre, Estado, Largo, ColorID, FamiliaID, VariedadID } = req.body;
    try {
        await req.db.request()
            .input('Nombre', sql.NVarChar, Nombre)
            .input('Estado', sql.NVarChar, Estado)
            .input('Largo', sql.Decimal, Largo)
            .input('ColorID', sql.Int, ColorID)
            .input('FamiliaID', sql.Int, FamiliaID)
            .input('VariedadID', sql.Int, VariedadID)
            .query('INSERT INTO Flor (Nombre, Estado, Largo, ColorID, FamiliaID, VariedadID) VALUES (@Nombre, @Estado, @Largo, @ColorID, @FamiliaID, @VariedadID)');
        res.status(201).send('Flor creada exitosamente');
    } catch (err) {
        res.status(500).send('Error al insertar flor: ' + err.message);
    }
});

// Ruta para actualizar una flor
router.put('/flores/:id', async (req, res) => {
    const { id } = req.params;
    const { Nombre, Estado, Largo, ColorID, FamiliaID, VariedadID } = req.body;
    try {
        await req.db.request()
            .input('id', sql.Int, id)
            .input('Nombre', sql.NVarChar, Nombre)
            .input('Estado', sql.NVarChar, Estado)
            .input('Largo', sql.Decimal, Largo)
            .input('ColorID', sql.Int, ColorID)
            .input('FamiliaID', sql.Int, FamiliaID)
            .input('VariedadID', sql.Int, VariedadID)
            .query('UPDATE Flor SET Nombre = @Nombre, Estado = @Estado, Largo = @Largo, ColorID = @ColorID, FamiliaID = @FamiliaID, VariedadID = @VariedadID WHERE FlorID = @id');
        res.send('Flor actualizada exitosamente');
    } catch (err) {
        res.status(500).send('Error al actualizar flor: ' + err.message);
    }
});

// Ruta para eliminar una flor
router.delete('/flores/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await req.db.request()
            .input('id', sql.Int, id)
            .query('DELETE FROM Flor WHERE FlorID = @id');
        res.send('Flor eliminada exitosamente');
    } catch (err) {
        res.status(500).send('Error al eliminar flor: ' + err.message);
    }
});


module.exports = router; // Export the router