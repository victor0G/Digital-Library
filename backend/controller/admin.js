exports.isAdmin=(req,res,next)=>{
    if(req.body.username=='admin'){
        next()
    }else{
        res.status(401).json({message:"you are not authorized to admin"})
    }
}