const { Router } = require('express');
const { v1 } = require('uuid');
const router = new Router();
const DataAdapter = require('../data-adapter');

/**
 * HTTP Method: GET
 * Devuelve un listado de aulas. Acepta como parametros opcionales
 * /aulas?limit=1&offset=1 para paginar
 */
router.get('/aulas', (req, res) => {
  const { limit, offset } = req.query;

  const aulas = DataAdapter.get('aulas');

  return res.send(aulas.slice(offset || 0, limit || 20));
});

/**
 * HTTP Method: GET
 * Devuelve un aula por ID
 * /aulas/as12312-12312asdas-123123123
 */
router.get('/aulas/:id', (req, res) => {
  const { id } = req.params;

  const aula = DataAdapter.get('aulas').find(a => a.id === id);

  if (!aula) {
    return res.status(404).send({ error: 'Not found' });
  }

  return res.send(aula);
});

/**
 * HTTP Method: POST
 * Agrega un neuvo registro de aula. No valida asi que guarda cualquier
 * mugre que se le mande
 */
router.post('/aulas', (req, res) => {
  const { body } = req;

  // TODO: validar que tenga todos los campos
  const aula = {
    ...body,
    id: v1(),
  };

  const aulas = DataAdapter.get('aulas');

  DataAdapter.set('aulas', aulas.concat([aula]));

  return res.send(aula);
});

/**
 * HTTP Method: PUT
 * Actualiza un registro de aula No valida asi que guarda cualquier
 * mugre que se le mande
 */
router.put('/aulas/:id', (req, res) => {
  const { id } = req.params;
  const { body } = req;

  const aulas = DataAdapter.get('aulas');
  const index = aulas.findIndex(a => a.id === id);

  if (index === -1) {
    return res.status(404).send({ error: 'Not found' });
  }

  const updated = {
    ...aulas[index],
    ...body,
  };
  aulas[index] = updated;

  DataAdapter.set('aulas', aulas);

  return res.send(updated);
});

/**
 * HTTP Method: DELETE
 * Elimina un registro de aula
 */
router.delete('/aulas/:id', (req, res) => {
  const { id } = req.params;

  const aulas = DataAdapter.get('aulas');
  const updated = aulas.filter(a => a.id !== id);

  DataAdapter.set('aulas', updated);

  return res.send({ message: 'success' });
});

module.exports = router;
