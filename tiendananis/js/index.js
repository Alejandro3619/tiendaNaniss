const express=require("express")
const router=express.Router();
const bodyParser=require("body-parser")
const urlcodeParser=bodyParser.urlencoded({extended:false})

var app=express()

router.get("/",function(req,res){
    res.send("--Api Activo--")
})


//Insentar Usuario
router.post("/insertarUsuario",urlcodeParser,function(req,res){
    const idProducto=req.body.idProducto
    const idProveedor=req.body.idProveedor
    const NombreCliente=req.body.NombreCliente
    const Documento=req.body.Documento
    const Telefono=req.body.Telefono

    req.getConnection((err,conn)=>{
        if(err) return res.send(err)
        const x=""
        const consulta=x.concat('INSERT INTO usuario (idProducto,idProveedor,NombreCliente,Documento,Telefono) VALUES ("',idProducto,'","',idProveedor,'","',NombreCliente,'","',Documento,'","',Telefono,'")')
        conn.query(consulta,[req.body],(err,result,rows)=>{
            if(err){
                res.send(err)
            }else{
                res.status(200).send({save:1})
                if(res.status(200)){
                    console.log("Inserto Usuario")
                    console.log(result)
                }
            }
        })    
    })
})


//Mostar Usuario
router.post("/mostarUsuario",urlcodeParser,function(req,res){
    req.getConnection((err,conn)=>{
        if(err) return res.send(err)
        const x=""
        const consulta=x.concat('SELECT * FROM usuario')
        conn.query(consulta,[req.body],(err,result,rows)=>{
            if(err){
                res.send(err)
            }else{
                res.status(200).send({result})
                console.log(result)
            }
        })    
    })
})


//Login
router.post("/Login",urlcodeParser,function(req,res){
    const UserName=req.body.UserName
    const Password=req.body.Password

    req.getConnection((err,conn)=>{
        if(err) return res.send(err)
        const x=""
        const consulta=x.concat('SELECT * FROM usuario WHERE UserName="',UserName,'" AND Password="',Password,'",')
        conn.query(consulta,[req.body],(err,result,rows)=>{
            if(err){
                res.send(err)
            }else{
                if(result.length>0){
                    res.status(200).send({existe:1,userid:result[0].Id})
                    res.status(200).send({result})
                    console.log(result[0].Id)
                    console.log(result)
                }else{
                    res.status(200).send({existe:0})
                }
            }
        })    
    })
})

//Mostrar Usuario
router.post("/showuser",urlcodeParser,function(req,res){
    const UserName=req.body.UserName
    const Password=req.body.Password

    req.getConnection((err,conn)=>{
        if(err) return res.send(err)
        const x=""
        const consulta=x.concat('SELECT * FROM usuario WHERE UserName="',UserName,'" AND Password="',Password,'",')
        conn.query(consulta,[req.body],(err,result,rows)=>{
            if(err){
                res.send(err)
            }else{
                res.status(200).send({result})
                 console.log(result)  
            }
        })    
    })
})


//Actualizar
router.post("/update",urlcodeParser,function(req,res){
    var Nombre=req.body.Nombre
    var Correo=req.body.Correo
    const idReg=req.body.Id

    req.getConnection((err,conn)=>{
        if(err) return res.send(err)
        const x=""
        const consulta=x.concat('UPDATE usuario SET  Nombre="',Nombre,'", Correo="',Correo,'" WHERE Id="',idReg,'"')
        conn.query(consulta,[req.body],(err,result,rows)=>{
            if(err){
                res.send(err)
            }else{
                res.status(200).send({save:1})
                if(res.status(200)){
                    console.log("Actualizado")
                    console.log(result)
                }
            }
        })    
    })
})


//Eliminar
router.post("/delete",urlcodeParser,function(req,res){
    const idReg=req.body.Id

    req.getConnection((err,conn)=>{
        if(err) return res.send(err)
        const x=""
        const consulta=x.concat('DELETE usuario SET  Nombre="',Nombre,'", Correo="',Correo,'" WHERE Id="',idReg,'"')
        conn.query(consulta,[req.body],(err,result,rows)=>{
            if(err){
                res.send(err)
            }else{
                res.status(200).send({save:1})
                if(res.status(200)){
                    console.log("Actualizado")
                    console.log(result)
                }
            }
        })    
    })
})

module.exports=router