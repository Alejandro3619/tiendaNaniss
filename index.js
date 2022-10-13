const express=require("express")
const router=express.Router();
const bodyParser=require("body-parser")
const urlcodeParser= bodyParser.urlencoded({extended:false})

var app=express()

router.get("/",function(req,res){
	res.send("mensaje: Soy el Api - Arriba")


})


//ruta para insertar a tabla usuarios
router.post("/insertar_User",urlcodeParser,function(req,res){
	const Nombre=req.body.Nombre
	const Correo=req.body.Correo
	const UserName=req.body.UserName
	const Password=req.body.Password

	req.getConnection((err,conn)=>{
		if (err) return res.send(err)
		const x=""
		const consulta=x.concat('insert into usuarios(Nombre,Correo,UserName,Password) value("',Nombre,'","',Correo,'","',UserName,'","',Password,'")')	
		conn.query(consulta,[req.body],(err,result,rows)=>{
			if(err)
				{res.send(err)}
			else
			{
				res.status(200).send({save:1})
				if(res.status(200))
				{
					console.log('Usuario Almacenado')
					console.log(result)


				}

			}



		})

	})
})


//Mostrar registros tabla usuarios
router.post("/MostrarUsuarios",urlcodeParser,function(req,res){
	req.getConnection((err,conn)=>{
		if(err) return red.send(err)
		
		const consulta="select * from usuarios"	
		conn.query(consulta,[req.body],(err,result,rows)=>{
			if(err)
				{res.send(err)}
			else
			{
				res.status(200).send({result})
				console.log(result)				

			}
		})
	})
})



//ruta para mostrar usuario 
router.post("/login",urlcodeParser,function(req,res){
	const UserName=req.body.UserName
	const Password=req.body.Password

	req.getConnection((err,conn)=>{
		if (err) return res.send(err)
		const x=""
		const consulta=x.concat('select * from usuarios where UserName="',UserName,'" and Password="',Password,'"')	
		console.log(consulta)
		conn.query(consulta,[req.body],(err,result,rows)=>{
			if(err)
				{res.send(err)}
			else
			{
				if(result.length>0)
				{
					res.status(200).send({existe:1,userid:result[0].Id})
					console.log(result[0].Id)
					console.log(result)	
				}
				else
				{
					res.status(200).send({existe:0})

				}
			}

		})

	})
})


//ruta para mostrar  1 usuario 
router.post("/showuser",urlcodeParser,function(req,res){
	const UserName=req.body.UserName
	const Password=req.body.Password

	req.getConnection((err,conn)=>{
		if (err) return res.send(err)
		const x=""
		const consulta=x.concat('select * from usuarios where UserName="',UserName,'" and Password="',Password,'"')	
		console.log(consulta)
		conn.query(consulta,[req.body],(err,result,rows)=>{
		if(err)
				{res.send(err)}
			else
			{
				res.status(200).send({result})
				console.log(result)				

			}

		})

	})
})


//Actualizar registros 
router.post("/update",urlcodeParser, function (req, res) {
  var Correo_ = req.body.Correo;
   var Nombre_ = req.body.Nombre;
  var Password_ = req.body.Password;
   const Id_reg = req.body.Id;

    // console.log(Correo_)
    // console.log(Password_)
    // console.log(Id_reg)


   req.getConnection((err, conn) => {
        if (err) return res.send(err)    

           const x="";
           const consulta=x.concat('update usuarios set Nombre="',Nombre_,'", Correo="',Correo_,'", Password="',Password_,'" where Id="',Id_reg,'"')
      console.log(consulta) 
        conn.query(consulta, [req.body],(err, result,fields) => {
                 if (err)
                { res.send(err)}
                else{   
                        res.status(200).send({ save:1 });                 
                           if(res.status(200))
                           {
                                console.log('Registro Actualizado')
                                console.log(result)

                  
                          }  
                     }  
            })
     }) 


});

//Eliminar registro
router.post("/delete", function (req, res) {
   const Id_reg = req.body.Id;
    

   req.getConnection((err, conn) => {
        if (err) return res.send(err)    

           const x="";
           const consulta=x.concat('delete from usuarios where Id="',Id_reg,'"')
    //  console.log(consulta) 
        conn.query(consulta, [req.body],(err, result,fields) => {
                if (err) return res.send(err)  
               // console.log(result) 
                   res.status(200).send('registro eliminado')
            })
     }) 


});



module.exports=router