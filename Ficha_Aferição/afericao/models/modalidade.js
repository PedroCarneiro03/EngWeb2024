var mongoose =require("mongoose")



const modalidadeSchema = new mongoose.Schema({
    _id: String
}, { versionKey: false });


module.exports=mongoose.model("modalidade",modalidadeSchema)//Acrescenta um s o mongo no fim...