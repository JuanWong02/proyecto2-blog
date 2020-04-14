const {Usuario} = require('./../models/usuario');
const {Publicacion} = require('./../models/publicacion');
const {Comentario} = require('./../models/comentario');

let controller = {};

controller.read = function(req, res, next) {
    
    //mostar en index
    Publicacion.findAll({
    attributes: ['title','updatedAt','id'],
	include: {
	model: Usuario,
	attributes: ['name'],
    },
    
})

.then((publicaciones) => {
    publicaciones.forEach((publicacion) => {
        console.log(JSON.stringify(publicacion));
    })
    res.render('blog/index', {
        publicaciones: publicaciones
        
    });
    
})
.catch((err) => {
    console.error('Error al mostrar datos: ',err);
    res.render('blog/index',{
        publicaciones: []
    });
});

    
};
//borrar publicacion
controller.delete = (req ,res ,next) => {
    let id = req.params.id;
    //delete from publicacion
    Publicacion.destroy({
        where: {
        id: id,
    }

    })
    .then(() => {
        res.redirect('/blog/');
    }) .catch((err) => {
        console.error('Error al intentar borrar la publicacion',err);
        res.redirect('/blog/');
    })
};








//enviar publicacion
controller.create = (req, res, next) => {
    console.log(req.query);

    res.render('blog/publicar', {
      
    });
};
controller.createPost = (req, res, next) => {
    console.log(req.body);

    let name = req.body.name;
    let title = req.body.title;
    let publicacion = req.body.publicacion;

    let errors = {
       
        
        
    }



    if (!name || name === ''){

        errors.name = "Please type a valid name"

       
    }
    if (!title || title === ''){

        errors.title = "Please type a valid title"

     }
     if (!publicacion || publicacion === ''){
        errors.publicacion = "Please type a valid Message"

     } 
     if (!name || name === '' || !title || title === '' || !publicacion || publicacion === ''){
       return res.render('blog/publicar', {
        errors,
        name: name,
        title: title,
        publicacion: publicacion
        
    })
}

    

    let usuario = {
        name,
    };
   
    //CREAR Y GUARDAR USUARIO
    Usuario.create(usuario)
    //caso exito
    .then((usuario) => {
        let publi = {
            title,
            cpublicacion: publicacion,
            usuarioId: usuario.id,
            
        };
       Publicacion.create(publi)

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
        res.render('blog/create');
    });

    



};
controller.ver = (req,res,next) => {
    let id = req.params.id;
    Publicacion.findByPk(id,{
      include: {
          model: Usuario,
          attributes: ['name']
      }
    }).then((contenido) => {
        res.render('blog/vercontenido',{
            contenido: contenido
        })
        
    }).catch((err) => {
        console.error('Error al mostrar el contenido',err);
        res.render('/blog/vercontenido', {
            contenido: []
        })
    })

}
//COMENTAR
controller.comentar = (req, res, next) => {
    console.log(req.query);

    res.render('blog/comentarios', {
      
    });
};
controller.comentarPost = (req, res, next) => {
    console.log(req.body);

    let name = req.body.name;
    let comentario = req.body.comentario;

    let errors = {
       
        
        
    }



    if (!name || name === ''){

        errors.name = "Please type a valid name"

       
    }
     if (!comentario || comentario === ''){
        errors.comentario = "Please type a valid Comment"

     } 
     if (!name || name === '' || !comentario || comentario === ''){
       return res.render('blog/comentarios', {
        errors,
        name: name,
        comentario: comentario,
        
    })
}

    let publicacion = req.params.id

    let usuario = {
        name,
    };

    Publicacion.findByPk(publicacion)
    .then((publicacion) => {
    //CREAR Y GUARDAR USUARIO
    Usuario.create(usuario)
     //caso exito
     .then((usuario) => {
        let comment = {
            comment: comentario,
            usuarioId: usuario.id,
            publicacionId: publicacion,
            
        };
       Comentario.create(comment)

    .then(() => {
        res.redirect('/blog');
    })
    .catch((err) => {
        console.error('Error trying to create comment',err);
        //volver a enviar formulario como HTML
        res.render('blog/comentarios');
    });
        
    })
    //caso error
    .catch((err) => {
        console.error('Error trying to create comment',err);
        //volver a enviar formulario como HTML
        res.render('blog/comentarios');
    });


}) .catch((err) => {
    console.error('Error trying to create comment',err);
    res.render('blog/comentarios')
})
}
   



//update
controller.update = (req, res, next) => {
    let id = req.params.id;
    
    Publicacion.findAll({
        where: {
            id: id
        }
    }).then((publicaciones) => {
        let publicacion = publicaciones[0];

        res.render('blog/editar',{
            publicacion: publicacion
        });
    }).catch((err) => {
        console.error('Error trying to render update form',err);
        res.redirect('/blog');
    });

    
};
controller.updatePost = (req, res, next) => {
    let publicacion = req.body;

    //game.name
    //game.id

    //UPDATE games SET name = 'Uncharted 4 WHERE id = 1'
    Publicacion.update(publicacion, {
        where: {
            id: publicacion.id
        }
    }).then(() => {
        res.redirect('/blog');
    }).catch((err) => {
        console.error('Error trying to update publicacion',err);
        res.redirect('/blog')

    })
};
    

module.exports = controller;