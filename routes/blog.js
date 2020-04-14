
var express = require('express');
var router = express.Router();

const { Usuario } = require('./../models/usuario');
const {Publicacion} = require('./../models/publicacion');
const {Comentario} = require('./../models/comentario');
const blogController = require('./../controllers/blog.controller');

/* GET games listing. */
router.get('/', blogController.read);

router.get('/create', blogController.create);

router.post('/create', blogController.createPost);


router.get('/comentar',blogController.comentar);

router.post('/comentar',blogController.comentarPost);

router.get('/update/:id',blogController.update);

router.post('/update', blogController.updatePost);


 //blog/delete
 router.post('/delete/:id',blogController.delete);


 router.get('/ver/:id',blogController.ver);

 



 

 





module.exports = router;