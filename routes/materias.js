const { Router } = require('express');
const { v1 } = require('uuid');
const router = new Router();
const DataAdapter = require('../data-adapter');

/**
 * HTTP Method: GET
 * Devuelve un listado de materias. Acepta como parametros opcionales
 * /materias?limit=1&offset=1 para paginar
 */
router.get('/materias', (req, res) => {
  const { limit, offset } = req.query;

  const materias = DataAdapter.get('materias');

  return res.send(materias.slice(offset || 0, limit || 20));
});

/**
 * HTTP Method: GET
 * Devuelve un materia por ID
 * /materias/as12312-12312asdas-123123123
 */
router.get('/materias/:id', (req, res) => {
  const { id } = req.params;

  const materia = DataAdapter.get('materias').find(a => a.id === id);

  if (!materia) {
    return res.status(404).send({ error: 'Not found' });
  }

  return res.send(materia);
});

/**
 * HTTP Method: POST
 * Agrega un neuvo registro de materia. No valida asi que guarda cualquier
 * mugre que se le mande
 */
router.post('/materias', (req, res) => {
  const { body } = req;

  // TODO: validar que tenga todos los campos
  const materia = {
    ...body,
    id: v1(),
  };

  const materias = DataAdapter.get('materias');

  DataAdapter.set('materias', materias.concat([materia]));

  return res.send(materia);
});

/**
 * HTTP Method: PUT
 * Actualiza un registro de materia No valida asi que guarda cualquier
 * mugre que se le mande
 */
router.put('/materias/:id', (req, res) => {
  const { id } = req.params;
  const { body } = req;

  const materias = DataAdapter.get('materias');
  const index = materias.findIndex(a => a.id === id);

  if (index === -1) {
    return res.status(404).send({ error: 'Not found' });
  }

  const updated = {
    ...materias[index],
    ...body,
  };
  materias[index] = updated;

  DataAdapter.set('materias', materias);

  return res.send(updated);
});

/**
 * HTTP Method: DELETE
 * Elimina un registro de materia
 */
router.delete('/materias/:id', (req, res) => {
  const { id } = req.params;

  const materias = DataAdapter.get('materias');
  const updated = materias.filter(a => a.id !== id);

  DataAdapter.set('materias', updated);

  return res.send({ message: 'success' });
});

module.exports = router;
