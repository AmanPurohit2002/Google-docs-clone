const { models, model, Schema } = require("mongoose");



const documentSchema=Schema({
    _id:{
        type:String,
        required:[true,"id is required"]
    }
    ,
    data:{
        type:Object,
        required:[true,"data is required"]
    }
})

const Document=models.document || model("document",documentSchema);

module.exports=Document;