const express=require("express")
const mysql=require("mysql")
const myconn=require("express-myconnection")
const app=express()
const indexroute=require("./routes/index")



//sirve para probar la conexion a la DB

const conexion=mysql.createConnection(
{
	host:'localhost',
	port:3309,
	user:'root',
	password:'unab2022',
	database:'db_g40_api'
});


conexion.connect(function(error)
{ 	if(error)
	{
		console.log("Error De Conexion")
		return

	}
	else
	{
		console.log("Conexion Exitosa")
	}


})
//-------------------
const conexion_2={
	host:'localhost',
	port:3309,
	user:'root',
	password:'unab2022',
	database:'db_g40_api'
};

app.use(myconn(mysql,conexion_2,'single'))
app.use(express.json())
app.use("/",indexroute)

app.listen(3003,function(){

console.log("Api en el puerto 3003")

})


