const multer = require('multer')
const path = require('path')
//exportando as configuracoes para o multer
module.exports = {
    storage : new multer.diskStorage({
        //destino que sera salvo a imagem,
        //aqui esta sendo usado a biblioteca path para pegar o caminho de uma pasta
        destination:path.resolve(__dirname,'../../uploads'),
        //define o nome da imagem , aqui esta usando um function para resolver o nome 
        filename:function(req,file,callback){
            callback(null,file.originalname)
        }
        
    })
}