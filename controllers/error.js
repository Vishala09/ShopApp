exports.errorPage= (req,res,next) => {
    //res.status(404).send('<h1>PAGE NOT FOUND</h1>');
    //res.status(404).sendFile(path.join(__dirname,'views','error.html'));
    res.status(404).render('error',{docTitle:'Error page',msg:'Page Nott Found'});
}