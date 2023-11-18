/** GetPath  **/
function getWebNamePath() {
    var pathName = window.location.pathname.substring(1);
    var webName = pathName == '' ? '' : pathName.substring(0, pathName.indexOf('/'));
    return '/' + webName;
}
let path=getWebNamePath();
fn_open(path);
$("body").on("click","#contentID",function () {
    fn_open(path);
});
function fn_open(path){
    layer.open({
        title: [
            '此文章为锁定文档，请输入密码',
            'border-radius:4px;background-color: #008ed6; color:#fff;'
        ],
        style: 'padding:0;border:none; color:black;',
        content: '<p id="msg"></p><input type="text" id="password"> <button id="sub">提交</button>'
    });
    $("body").on("click","#sub",function () {
        let id=$("#id").val();
        let password=$("#password").val();
        $.ajax({
            url:"/new/detail.html",
            data:{"id":id,"password":password},
            type: 'get',
            async: false,
            dataType: 'json',
            success: function (d) {
                if (d.code == 200) {
                    $("#contentID").html(d.data.help.content);
                    $("#dicts").html(d.data.dict);
                    $("body").off("click", "#contentID");
                    layer.closeAll();
                } else {
                    $("#msg").empty();
                    $("#msg").append("密码错误！");
                }
            }
        });
    });
}