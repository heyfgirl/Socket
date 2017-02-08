var serverHttp="http://127.0.0.1:3000/";

/*function requestServer2(){

    $.post(serverHttp,{"a":2,"b":3},function(rs){
        $(".haha").html(rs.aa);
    });
}*/
function requestServer(){

    $.post(serverHttp,{"a":1,"b":2},function(rs){
        $(".haha").html(rs.aa);
    });
}
