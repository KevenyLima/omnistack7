const Router = require("express")
const router = Router()
const multer = require('multer')
const PostController = require("./controllers/PostController")
const LikeController = require('./controllers/LikeController')
const uploadConfigs = require('./config/upload')
const upload =  multer(uploadConfigs)
//usando a biblioteca multer para lidar com arquivos multipart
//usando o formato de requisicao multipart para lidar com arquivos e imagens
router.post('/post',upload.single('image'),PostController.store)
router.get('/post',PostController.index)
router.post('/post/:id/like',LikeController.store)
module.exports = router