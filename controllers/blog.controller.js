const {Usuario} = require('./../models/usuario');
const {Titulo} = require('./../models/titulo');
const {Publicacion} = require('./../models/publicacion');
const {Comentario} = require('./../models/comentario');

let controller = {};

controller.read = function(req, res, next) {
    res.render('blog/index');

}



controller.create = (req, res, next) => {
    console.log(req.query);

    res.render('blog/publicar', {
        title: 'Crear Publicacion',
        action: 'create'
    });
};
controller.createPost = (req, res, next) => {
    console.log(req.body);

    let name = req.body.name;

    if (!name || name === ''){
       return  res.render('blog/publicar',{errorMessage: 'Please type a valid name.'});
    }

    let usuario = {
        name,
    };
    //CREAR Y GUARDAR USUARIO
    Usuario.create(usuario)
    //caso exito
    .then(() => {
        res.redirect('/blog');
    })
    //caso error
    .catch((err) => {
        console.error('Error trying to create post',err);
        //volver a enviar formulario como HTML
        res.render('blog/publicar');
    });

    let titulo = {
        name,
    }

    Titulo.create(titulo)
    .then(() => {
        res.redirect('/blog');
    })
    .catch((err) => {
        console.error('Error trying to create post',err);
        //volver a enviar formulario como HTML
        res.render('blog/publicar');
    });
};

module.exports = controller;