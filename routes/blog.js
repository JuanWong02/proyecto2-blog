
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





 //blog/delete
 router.post('/delete/:id',blogController.delete);


 router.get('/ver',blogController.ver);

 





module.exports = router;