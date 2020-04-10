const {Usuario} = require('./../models/usuario');
const {Titulo} = require('./../models/titulo');
const {Comentario} = require('./../models/comentario');

let controller = {};

controller.read = function(req, res, next) {
    res.render('blog/index');

}

Titulo.findAll()
.then((titulos) => {
    res.render('blog/index', {
        titulos: titulos
    });
})
.catch((err) => {
    console.error('Error trying to query titulos: ',err);
    res.render('blog/index', {
        titulos: []
    });
});

Usuario.findAll()
.then((usuarios) => {
    res.render('blog/index', {
        usuarios: usuarios
    });
})
.catch((err) => {
    console.error('Error trying to query usuarios: ',err);
    res.render('blog/index', {
        usuarios: []
    });
});








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
    let title = req.body.title;
    let publicacion = req.body.publicacion;

    if (!name || name === ''){
       return  res.render('blog/create',{errorMessage: 'Please type a valid name.'});
    }
    if (!title || title === ''){
        return  res.render('blog/create',{errorMessage: 'Please type a valid title.'});
     }
     if (!publicacion || publicacion === ''){
        return  res.render('blog/create',{errorMessage: 'Please type a valid message.'});
     } 

    let usuario = {
        name,
    };
    let titulo = {
        title,
    };
    let publi = {
        publicacion,
    };
    //CREAR Y GUARDAR USUARIO
    Usuario.create(usuario)
    //caso exito
    .then(() => {
       Titulo.create(titulo)
       Titulo.create(publi)

    .then(() => {
        res.redirect('/blog');
    })
    .catch((err) => {
        console.error('Error trying to create post',err);
        //volver a enviar formulario como HTML
        res.render('blog/publicar');
    });
        
    })
    //caso error
    .catch((err) => {
        console.error('Error trying to create post',err);
        //volver a enviar formulario como HTML
        res.render('blog/publicar');
    });

    
    };
    

    

module.exports = controller;