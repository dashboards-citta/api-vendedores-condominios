const  connection  = require("./connection.js");
const  querys = require('../controllers/querys/query.js');

const allDadosCondominio = async () => {  
  const [rows] = await connection.execute(querys.queryCondominio);
  return rows;
};

const allDadosCondominioPorId = async(id)=>{  
    const [rows] = await connection.execute(querys.queryCondominioId,[id]);
    return rows;
};

module.exports ={
    allDadosCondominio,
    allDadosCondominioPorId
}