const express = require('express');
const sql = require('mssql');
const router = express.Router();

// GET: Obtener todos los registros
router.get('/densidades', async (req, res) => {
    try {
        const result = await req.db.request().query('SELECT * FROM dbo.densidades');
        res.json(result.recordset);
    } catch (err) {
        res.status(500).send('Error al obtener datos: ' + err.message);
    }
});

// POST: Agregar un nuevo registro
router.post('/', async (req, res) => {
    const { campo1, campo2 } = req.body;
    try {
        await req.db.request()
            .input('campo1', sql.VarChar, campo1)
            .input('campo2', sql.Int, campo2)
            .query('INSERT INTO dbo.densidades (campo1, campo2) VALUES (@campo1, @campo2)');
        res.status(201).send('Registro creado exitosamente');
    } catch (err) {
        res.status(500).send('Error al insertar datos: ' + err.message);
    }
});

// PUT: Actualizar un registro
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { campo1, campo2 } = req.body;
    try {
        await req.db.request()
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
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await req.db.request()
            .input('id', sql.Int, id)
            .query('DELETE FROM dbo.densidades WHERE id = @id');
        res.send('Registro eliminado exitosamente');
    } catch (err) {
        res.status(500).send('Error al eliminar datos: ' + err.message);
    }
});

module.exports = router;
