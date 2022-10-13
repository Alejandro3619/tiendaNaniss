function Ingresar(){
    var datos={"UserName":document.getElementById("UserName").ariaValueMax(),
                "Password":$("#Password").val()
    }
    $.ajax({
        type:"post",
        url:"http://localhost:80/login",
        data:datos,
        dataType:"json",
        success: function(data){
            console.log(data)
            if(data.existe==1){
                location.href="vistas/next.html"
            }else{
                console.log("No Exixte")
                alert("Credenciales Incorrectas")
            }
        }
    })
}