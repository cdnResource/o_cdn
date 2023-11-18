/** GetPath  **/
function getWebNamePath() {
    var pathName = window.location.pathname.substring(1);
    var webName = pathName == '' ? '' : pathName.substring(0, pathName.indexOf('/'));
    return '/' + webName;
}

$(function () {
    //声明并获取element
    var objs=$(".menua");
    $.each(objs,function (index,obj) {
        obj.onclick =  function(e){
            stopDefault(e);
        }
    });
    //阻止默认事件函数
    function stopDefault(e) {
        if (e && e.preventDefault)
            e.preventDefault();
        else
            window.event.returnValue = false; //兼容IE
    }

    let path = getWebNamePath();
    //getNotice(path);
    clipe();
    clc(path);
});

/** clipboards **/
function clipe(){
    var clipboard = new ClipboardJS('#btn_clipe', {
        text: function () {
            var url = $("#code").text();
            return url;
        }
    });

    clipboard.on('success', function (e) {
        layer.open({
            content: '复制成功！'
            ,skin: 'msg'
            ,time: 2 //2秒后自动关闭
        });
    });

    clipboard.on('error', function (e) {
        layer.open({
            content: '复制失败，请手动复制！'
            ,skin: 'msg'
            ,time: 2 //2秒后自动关闭
        });
    });
}

function getNotice(path) {
        $.ajax({
            url: "/notice",
            type: 'get',
            async: false,
            dataType: 'json',
            success: function (d) {
                if (d.code == 200) {
                    htmlAlter(d.data.content,d.data.title);
                }
            }
        });

}
//
function htmlAlter(content,title){
    layer.open({
        title: [
            title,
            'border-radius:4px;background-color: #008ed6; color:#fff;'
        ],
        style: 'padding:0;border:none; color:black;',
        content: content,
        btn: '我知道了'
        ,
        yes: function () {
            layer.closeAll();
        }
    });
}
//
function preHtml(data){
    layer.open({
        title: [
            data.title,
            'border-radius:4px;background-color: #008ed6; color:#fff;'
        ],
        style: 'padding:0;border:none; color:black;',
        content: data.content,
        btn: ['我知道了','离开']
        ,
        yes: function () {
            window.location.href=data.url;
            layer.closeAll();
        }
    });
}

function clc(path){
    $("body").on("click",".menua",function(){
        let id=$(this).attr("id");
        $.ajax({
            url:"/getdetail",
            type:'post',
            async:false,
            data:{id:id},
            dataType:'json',
            success:function (d) {
                if(d.hasno==1){
                    preHtml(d)
                }else{
                    window.location.href=d.url;
                    return ;
                }
            }
        });
    });
}


