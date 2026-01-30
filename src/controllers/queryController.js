const { configDotenv } = require("dotenv");
const queryModel = require("../models/queryModel.js");

const BuscarCondominioPorId = async(request, response)=>{
    try {
        const { id } = request.params;
        const dados = await queryModel.allDadosCondominioPorId(id);

        // quando o model já retorna rows
        if (!dados || dados.length === 0) {
            return response.status(404).json({
            message: 'Condomínio não encontrado'
            });
        }

        // se a query for por ID, normalmente vem só 1 registro
        return response.status(200).json(dados[0]);

    } catch (error) {
        console.error('Erro ao buscar condomínio:', error);
        return response.status(500).json({
            error: 'Erro interno no servidor',
            message: error.message
        });
    }
}

const BuscarCondominio =  async(request, response)=>{
    try {
        const dados = await queryModel.allDadosCondominio();

        if (!dados || dados.length === 0) {
            return response.status(404).json({
            message: 'Condomínios não encontrados'
            });
        }

        return response.status(200).json(dados);

    } catch (error) {
        console.error('Erro ao buscar condomínios:', error);
        return response.status(500).json({
            error: 'Erro interno no servidor',
            message: error.message
        });
    }
}

module.exports = {
    BuscarCondominio,
    BuscarCondominioPorId
}
