function login() {
    let email = $("#email").val();
    let pass = $("#pass").val();
    alert(pass);
    $.ajax({
        url: "/api/login",
        type:"POST",
        data: JSON.stringify({user: email, password: pass}),
        contentType:"application/json; charset=utf-8",
        dataType:"json",
        success: function(data){
            if(data.msg) {
                alert(data.msg);
            } else {
                window.location.assign(data.target);
            }
        }
    });

}