const express=require("express")
const mysql=require("mysql")
const myconn=require("express-myconnection")
const app=express()
const indexroute=require("./JS/index.js")

Let cors=require("cors")
app.use(cors());

//iniciar la conexion a la BaseDatos
const conexion=mysql.createConnection({
    host: 'localhost',
    port: 3309,
    user: 'root',
    password: '1234a',
    database: 'bdapi'
});

conexion.connect(function(error){
    if(error){
        console.log("****Error de Conexion****")
    }else{
        console.log("****Conectado****")
    }
})



const conexion2={
    host: 'localhost',
    port: 3309,
    user: 'root',
    password: '1234a',
    database: 'bdapi'
};


app.use(myconn(mysql,conexion2,'single'))
app.use(express.json())
app.use("/",indexroute)

app.listen(3003,function(){
    console.log("Api en el puerto 3003")
});

app.use((req, res, next)=>{
    res.setHeader('Acces-Control-Allow-Origin', '*');
})