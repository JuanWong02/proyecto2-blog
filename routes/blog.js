
var express = require('express');
var router = express.Router();

const { Usuario } = require('./../models/usuario');
const {Titulo} = require('./../models/titulo');
const {Publicacion} = require('./../models/publicacion');
const {Comentario} = require('./../models/comentario');
const blogController = require('./../controllers/blog.controller');

/* GET games listing. */
router.get('/', blogController.read);

router.get('/create', blogController.create);

router.post('/create', blogController.createPost);


 //games/delete

//GET games/create


module.exports = router;