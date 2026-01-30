const queryCondominio = `
    SELECT 
        cliente_condominio.id,
        cliente_condominio.condominio,
        cliente_condominio.id_cidade,
        cidade.nome,
        cidade.uf,
        cliente_condominio.endereco,
        cliente_condominio.numero,
        cliente_condominio.cep,
        cliente_condominio.bairro
    FROM cliente_condominio
    INNER JOIN cidade 
        ON cliente_condominio.id_cidade = cidade.id
`

const queryCondominioId = `
    SELECT 
        cliente_condominio.id,
        cliente_condominio.condominio,
        cliente_condominio.id_cidade,
        cidade.nome,
        cidade.uf,
        cliente_condominio.endereco,
        cliente_condominio.numero,
        cliente_condominio.cep,
        cliente_condominio.bairro
    FROM cliente_condominio
    INNER JOIN cidade 
        ON cliente_condominio.id_cidade = cidade.id
    WHERE cliente_condominio.id = ? 
`

module.exports = {
    queryCondominio,
    queryCondominioId
}

