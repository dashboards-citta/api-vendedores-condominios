const express = require('express');
const services = require('../services/vendedor');
const queryController = require('../controllers/queryController.js');
const router  = express.Router();
//const validationMiddleware = require('../middlewares/validationMiddleware.js');

router.get('/', (request, response ) =>{
    response.status(200).send(`O router tá funcionado !`);
});

router.get('/vendedores', services.listarVendedoresAtivosResumido);

router.get('/vendedor/:id', services.listarVendedoresAtivosResumidoId);

router.get('/condominios', queryController.BuscarCondominio);

router.get('/condominio/:id', queryController.BuscarCondominioPorId);

module.exports = router; 