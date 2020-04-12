function deletePublicacion(id) {
    $.post('/blog/delete/' + id, function(err){

        window.location.reload();
    })
}