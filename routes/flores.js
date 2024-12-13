const express = require('express');
const router = express.Router();
const sql = require('mssql');
const dbConfig = require('../index'); // Ajusta la ruta si es necesario

// Middleware para establecer la conexión con la base de datos
router.use(async (req, res, next) => {
    try {
        if (!req.db) {
            req.db = await sql.connect(dbConfig);
        }
        next();
    } catch (err) {
        res.status(500).send('Error al conectar con la base de datos: ' + err.message);
    }
});

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
            .input('id', sql.Int, id)
            .query('SELECT * FROM Flor WHERE FlorID = @id');

        if (result.recordset.length === 0) {
            return res.status(404).send('Flor no encontrada');
        }

        res.json(result.recordset[0]);
    } catch (err) {
        res.status(500).send('Error al obtener flor: ' + err.message);
    }
});

// Ruta para agregar una nueva flor
router.post('/flores', async (req, res) => {
    const { nombre, estado, largo, colorID, familiaID, variedadID } = req.body;

    if (!nombre || !estado) {
        return res.status(400).json({ error: 'El nombre y el estado son obligatorios' });
    }

    try {
        const result = await req.db.request()
            .input('Nombre', sql.NVarChar, nombre)
            .input('Estado', sql.NVarChar, estado)
            .input('Largo', sql.Decimal, largo || 0)
            .input('ColorID', sql.Int, colorID || null)
            .input('FamiliaID', sql.Int, familiaID || null)
            .input('VariedadID', sql.Int, variedadID || null)
            .query(`INSERT INTO Flor (Nombre, Estado, Largo, ColorID, FamiliaID, VariedadID)
                    VALUES (@Nombre, @Estado, @Largo, @ColorID, @FamiliaID, @VariedadID)`);

        res.status(201).json({ message: 'Flor agregada con éxito', florID: result.recordset });
    } catch (err) {
        res.status(500).send('Error al insertar flor: ' + err.message);
    }
});

// Ruta para actualizar una flor
router.put('/flores/:id', async (req, res) => {
    const { id } = req.params;
    const { nombre, estado, largo, colorID, familiaID, variedadID } = req.body;

    try {
        const result = await req.db.request()
            .input('id', sql.Int, id)
            .input('Nombre', sql.NVarChar, nombre)
            .input('Estado', sql.NVarChar, estado)
            .input('Largo', sql.Decimal, largo)
            .input('ColorID', sql.Int, colorID)
            .input('FamiliaID', sql.Int, familiaID)
            .input('VariedadID', sql.Int, variedadID)
            .query(`UPDATE Flor
                    SET Nombre = @Nombre, Estado = @Estado, Largo = @Largo, 
                        ColorID = @ColorID, FamiliaID = @FamiliaID, VariedadID = @VariedadID
                    WHERE FlorID = @id`);

        if (result.rowsAffected[0] === 0) {
            return res.status(404).send('Flor no encontrada');
        }

        res.send('Flor actualizada exitosamente');
    } catch (err) {
        res.status(500).send('Error al actualizar flor: ' + err.message);
    }
});

// Ruta para eliminar una flor
router.delete('/flores/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await req.db.request()
            .input('id', sql.Int, id)
            .query('DELETE FROM Flor WHERE FlorID = @id');

        if (result.rowsAffected[0] === 0) {
            return res.status(404).send('Flor no encontrada');
        }

        res.send('Flor eliminada exitosamente');
    } catch (err) {
        res.status(500).send('Error al eliminar flor: ' + err.message);
    }
});

module.exports = router;
