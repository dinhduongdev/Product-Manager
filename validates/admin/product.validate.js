module.exports.createProductPost = (req,res,next)=>{
    if(!req.body.title){
        req.flash('error', 'Vui lòng nhập tên sản phẩm');
        res.redirect("back");
        return;
    }
    next();
}