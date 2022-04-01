const Post = require('../models/PostModel')
const sharp = require('sharp')
const path = require('path')
const fs = require('fs')

module.exports= {
    async index(req,res){
        //
        const posts = await Post.find().sort('-createdAt')
        return res.json(posts)
    },
    async store(req,res){
        //vai ter todos os objetos que nao sao arquivos multipart
        console.log(req.body)
        //acessa o arquivo que foi enviado formatado pelo multer, arquivo multipart
        console.log(req.file)
        const {author,place,description,hashtags} = req.body
        // {filename:image} e igual a {filename as image}
        // guardando apenas o nome no banco de dados
        // as imagens estao sendo guardas na verdade em uma pasta chamada resized
        const {filename:image} = req.file
        const [name,ext] = image.split('.')
        const filename = `${name}.jpg`
        //formatando imagem antes de guardar na pasta resized
        //.resize() formata o tamanho
        //.jpeg({quality:70})  vai torna a imagem jpeg e salvar em 70% de qualidade
        /*
        toFile(
            //usando a biblioteca path para concatenar todo o caminho
            path.resolve(
            //pegando o caminho que a imagem esta salva vindo da requisicao
            req.file.destination,
            //pasta onde sera guardada a nova imagem
            'resized',
            //pegando o nome da imagem
            image
            ))*/
        await sharp(req.file.path)
        .resize(500)
        .jpeg({quality:70})
        .toFile(path.resolve(req.file.destination,'resized',filename))
        //apagando a imagem em upload,pois ela ja foi tratada e salva em resized
        fs.unlinkSync(req.file.path)
        const newPost =  {
            author,
            place,
            description,
            hashtags,
            image:filename
        }
        const post = await Post.create(newPost)
        req.io.emit('post',post)
        return res.json(post);

    }
}