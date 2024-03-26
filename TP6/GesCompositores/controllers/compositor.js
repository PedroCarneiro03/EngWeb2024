var Compositor=require("../models/compositor")

module.exports.list= () => {
    return Compositor.find().sort({nome:1}).exec()

}

module.exports.findById=id =>{
    return Compositor.findOne({_id:id}).exec()
}

module.exports.insert= compositor => {
    return Compositor.create(compositor)
}

module.exports.updateCompositor = (id,compositor) => {
    return Compositor.updateOne({_id:id},compositor)
        .then(result => {
            if (result.modifiedCount > 0) {
                // Se pelo menos um documento foi modificado, recuperamos o compositor atualizado
                return Compositor.findOne({ _id: id });
            } else {
                // Se nenhum documento foi modificado, lançamos um erro indicando que o compositor não foi encontrado ou não foi modificado
                throw new Error('Compositor não encontrado ou não foi modificado.');
            }
        });
}

module.exports.deleteCompositor= id => {
    return Compositor.findOne({ _id: id }) // Encontrar o documento pelo ID
        .then(compositor => {
            if (!compositor) {
                // Se o compositor não foi encontrado, retornar null ou lançar um erro, dependendo do comportamento desejado
                return null;
            }
            // Se o compositor foi encontrado, excluí-lo
            return Compositor.deleteOne({ _id: id }) // Excluir o documento pelo ID
                .then(() => compositor); // Retornar o compositor excluído
        })
        .catch(error => {
            console.error('Erro ao excluir compositor:', error);
            throw error; // Propagar o erro para ser tratado posteriormente, se necessário
        });
}