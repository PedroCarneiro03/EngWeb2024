var Modalidade=require("../models/modalidade")

module.exports.list= () => {
    return Modalidade.find().sort({_id:1}).exec()
}


module.exports.findById=id =>{
    return Modalidade.findOne({_id:id}).exec()
}

