function login() {
    let email = $("#email").val();
    let pass = $("#pass").val();
   
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

function join() {
    let nme = $("#name").val();
    let hnum = $("#hno").val();
    let id = $("#cid").val();
   
    $.ajax({
        url: "/api/join",
        type:"POST",
        data: JSON.stringify({cid: id, name: nme, hno: hnum}),
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

function create() {
    let nme = $("#name").val();
    let hnum = $("#hno").val();
    let cnme = $("#cname").val();
    let caddr = $("#cadd").val();
   
    $.ajax({
        url: "/api/new",
        type:"POST",
        data: JSON.stringify({cname: cnme, name: nme, hno: hnum, cadd: caddr}),
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

function req() {
    let cate = $("#cate option:selected").val();
    let phon = $("#phone").val();
    let de = $("#des").val();
   
    $.ajax({
        url: "/api/req",
        type:"POST",
        data: JSON.stringify({cat: cate, pho: phon, des: de}),
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

function buy(id) {
    $.ajax({
        url: "/api/buy",
        type:"POST",
        data: JSON.stringify({uuid: id}),
        contentType:"application/json; charset=utf-8",
        dataType:"json",
        success: function(data){
            if(data.msg) {
                alert(data.msg);
                $("#"+id).prop('disabled', true);
                $("#"+id).innerHTML('Thanks!');
            } else {
                window.location.assign(data.target);
            }
        }
    });

}