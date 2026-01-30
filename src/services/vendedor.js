const request = require('request');
const  express = require('express');
require('dotenv').config();

const DOMAIN = process.env.DOMAIN;
const TOKEN = process.env.TOKEN;

const listarVendedoresAtivosResumido = (req, res) => {
  const options = {
    method: 'GET',
    url: `${DOMAIN}/webservice/v1/vendedor`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Basic ' + TOKEN,
      ixcsoft: 'listar'
    },
    body: {
      qtype: 'vendedor.status',
      query: 'A',
      oper: '=',
      page: 1,
      rp: 9999,
      sortname: 'vendedor.status',
      sortorder: 'asc'
    },
    json: true
  };

  request(options, (error, response, body) => {
    try {
      if (error) {
        console.error('Erro na requisição:', error);
        return res.status(500).json({ message: 'Erro ao acessar API externa' });
      }

      let vendedores = body?.registros ?? [];

      // garante array
      if (!Array.isArray(vendedores)) {
        vendedores = Object.values(vendedores);
      }

      const listaVendedores = [];

      for (const vendedor of vendedores) {
        if (vendedor?.id && vendedor?.nome) {
          listaVendedores.push({
            id: vendedor.id,
            nome: vendedor.nome
          });
        }
      }

      return res.status(200).json(listaVendedores);

    } catch (err) {
      console.error('Erro ao processar vendedores:', err.message);
      return res.status(500).json({ message: 'Erro interno ao listar vendedores' });
    }
  });
};

const listarVendedoresAtivosResumidoId = (req, res) => {
  const { id } = req.params;
  const options = {
    method: 'GET',
    url: `${DOMAIN}/webservice/v1/vendedor`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Basic ' + TOKEN,
      ixcsoft: 'listar'
    },
    body: {
      qtype: 'vendedor.id',
      query: id,
      oper: '=',
      page: 1,
      rp: 1
    },
    json: true
  };

  request(options, (error, response, body) => {
    try {
      if (error) {
        console.error('Erro na requisição:', error);
        return res.status(500).json({ message: 'Erro ao acessar API externa' });
      }

      let vendedores = body?.registros ?? [];

      // normaliza retorno
      if (!Array.isArray(vendedores)) {
        vendedores = Object.values(vendedores);
      }

      if (!vendedores.length) {
        return res.status(404).json({ message: 'Vendedor não encontrado' });
      }

      const vendedor = vendedores[0];

      return res.status(200).json({
        id: vendedor.id,
        nome: vendedor.nome
      });

    } catch (err) {
      console.error('Erro ao processar vendedor:', err.message);
      return res.status(500).json({ message: 'Erro interno ao buscar vendedor' });
    }
  });
};

module.exports = { 
  listarVendedoresAtivosResumido, 
  listarVendedoresAtivosResumidoId
};