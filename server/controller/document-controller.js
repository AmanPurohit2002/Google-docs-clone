const Document=require('../models/documentModel')

const getDocument = async (id) => {
    if (id === null) return;

    const document = await Document.findById(id);

    if(document) return document;

    return await Document.create({ _id:id,data: "" })
}

const updateDocument = async (id,data) => {
    return await Document.findByIdAndUpdate(id,{data:data });
}

module.exports={
    getDocument,
    updateDocument
}