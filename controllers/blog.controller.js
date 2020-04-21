const {Usuario} = require('./../models/usuario');
const {Publicacion} = require('./../models/publicacion');
const {Comentario} = require('./../models/comentario');
const {Foto} = require('./../models/foto');

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
    let url = req.body.url;

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
     if (!url || url === ''){
        errors.url = "Please type a valid url"

     } 
     if (errors.name || errors.title || errors.publicacion || errors.url){
       return res.render('blog/publicar', {
        errors,
        name: name,
        title: title,
        publicacion: publicacion,
        url: url,
        
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
       .then((publi) => {
           let foto = {
               url,
               publicacionId: publi.id
           };
           Foto.create(foto)
       })
       

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
//VER PUBLICACION Y COMENTARIOS
controller.ver = (req,res,next) => {
    let id = req.params.id;
    Publicacion.findByPk(id,{
      include: [{
          model: Usuario,
          attributes: ['name'],
      }, {
          model: Foto,
          attributes: ['url'],
      }
        ]
    }).then((contenido) => {
        
        Comentario.findAll({
            attributes: ['comment','updatedAt'],
            include: {
                model: Usuario,
                attributes: ['name'],    
                
            },
            where: {
                publicacionId: id,
            }
            
        }).then((comentarios) => {
            comentarios.forEach((comentario) => {
                console.log(JSON.stringify(comentario));
            })
            res.render('blog/vercontenido',{
                contenido: contenido,
                comentarios: comentarios,
                

            });
        })
        .catch((err) => {
            console.error('Error al mostrar el contenido',err);
            res.render('blog/vercontenido',{
                contenido: [],
                comentarios: [],
            })
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
    let id = req.params.id

    res.render('blog/comentarios',{ 
        id: id,
    });
};
controller.comentarPost = (req, res, next) => {
    console.log(req.body);

    let name = req.body.name;
    let comentario = req.body.comentario;
    let id = req.body.id

    let errors = {
       
        
        
    }

    if (!name || name === ''){

        errors.name = "Please type a valid name"
       
    }
     if (!comentario || comentario === ''){
        errors.comentario = "Please type a valid Comment"

     } 
     if (errors.name || errors.comentario){
       return res.render('blog/comentarios', {
        errors,
        name: name,
        comentario: comentario,
        id: id,
        
    })
}

    let publicacion = req.body.id

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
            publicacionId: publicacion.id,
            
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
    (async () => {
        try {
        
            let id = req.params.id;

            let publicacion = await Publicacion.findByPk(id)

            res.render('blog/editar', {
                id: id,
                title: publicacion.title,
                cpublicacion: publicacion.cpublicacion,
            });
        } catch (err) {
            console.error('Error trying to edit post',err);
            res.render('/blog')
        }
    })();
    
};
controller.updatePost = (req, res, next) => {
    (async () => {
        try {
            console.log('req.body',req.body)
            let id = req.body.id;
            let title = req.body.title;
            let publicacion = req.body.publicacion;

            let errors = {};

            if(!title || title === '') {
                errors.title = 'Please type a valid title'
            }
            if(!publicacion || publicacion === ''){
                errors.publicacion = 'Please type a valid message'
            }
            if(errors.title || errors.publicacion) {
                return res.render('blog/editar',{
                    errors: errors,
                    id: id,
                    title: title,
                    publicacion: publicacion,
                })
            }
    

            let actualizacion = await Publicacion.findByPk(id);

            actualizacion.title = title;
            actualizacion.cpublicacion = publicacion;


            await actualizacion.save();

            res.redirect('/blog');
        } catch (err) {
            console.error('Error trying to edit post',err);
            res.render('blog/editar')
        }
    })();
};
        



   
    

module.exports = controller;