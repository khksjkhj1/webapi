/**
 * Created by Choi on 2016-04-03.
 */

var arcFill = function(canvas, x, y, r, g, b, radius){
    canvas.beginPath();
    canvas.fillStyle = 'rgba(' + r + ',' + g + ',' + b + ', 0.7)';
    canvas.arc(x, y, radius, 0, Math.PI*2, false);
    canvas.fill();
}
var element = document.getElementById("myCanvas");
var canvas = element.getContext("2d");
arcFill(canvas,50,40,255,130,130,20);
arcFill(canvas,50,70,43,255,40,20);
arcFill(canvas,80,40,64,161,255,20);
arcFill(canvas,80,70,158,64,255,20);
arcFill(canvas,65,55,255,255,223,16);

canvas.font= "bold 30pt black"
canvas.fillStyle="black"
canvas.fillText("HW2 시각적 프로토타입",120,75);

function show_topmenu(tabnum){
    var i;
    var d = new Array(2);  //메뉴 수
    var tm = document.getElementById("navbar").getElementsByTagName("li");
    for(i=0; i<=1; i++){  //메뉴 수 반복
        d[i] = document.getElementById("houkoku"+i);
        d[i].style.display = "none";
        tm[i].className = "";
    };

    switch(tabnum){
        case tabnum:
            d[tabnum].style.display = "";
            tm[tabnum].className = "active";
            break;
        case 1:
            d[1].style.display = "";
            tm[1].className = "active";
            break;
        case 2:
            d[2].style.display = "";
            tm[2].className = "active";
            break;
    };
};

function show_leemocon(tabnum){
        var i;
        var d = new Array(5);  //메뉴 수
        var tm = document.getElementById("tabmenu").getElementsByTagName("li");
        for(i=0; i<=4; i++){  //메뉴 수 반복
            d[i] = document.getElementById("tabcontent"+i);
            d[i].style.display = "none";
            tm[i].className = "";
        };

        switch(tabnum){
            case tabnum:
                d[tabnum].style.display = "";
                tm[tabnum].className = "on";
                break;
            case 2:
                d[2].style.display = "";
                tm[2].className = "on";
                break;
            case 3:
                d[3].style.display = "";
                tm[3].className = "on";
                break;
            case 4:
                d[4].style.display = "";
                tm[4].className = "on";
                break;
            case 5:
                d[5].style.display = "";
                tm[5].className = "on";
                break;
        };
    };



$('#execute').click(function(){

    $.ajax({
        url: 'http://food2fork.com/api/get?key=306a17a40dd3bd63ab1bff65578f9fe5&rId=35171',
        dataType:'json',
        success:function(data){
            var str = '';
            for(var name in data){
                str += '<li>'+data[name]+'</li>';
            }
            $('#timezones').html('<ul>'+str+'</ul>');
        }
    })
})


/*
var end_point_url = "http://api.visitkorea.or.kr/openapi/service/rest/JpnService/detailCommon";
var authentication_key = "LsxjGcP4BMk6YjkZeEzMOZfl7mTfOhLojbXW8STMds0klsOhLJA9r06aJ%2Br1dHvnFvji%2BTABdBNA%2FvYNwwtJrQ%3D%3D";

$(function () {
    var queryParams = '?' + ('ServiceKey=' + authentication_key);
    queryParams += '&' + ('contentId') + '=' + ('636266');
    queryParams += '&' + ('contentTypeId') + '=' + ('12');
    queryParams += '&' + ('defaultYN') + '=' + ('Y');
    queryParams += '&' + ('mapImageYN') + '=' + ('Y');
    queryParams += '&' + ('firstImageYN') + '=' + ('Y');
    queryParams += '&' + ('areacodeYN') + '=' + ('N');
    queryParams += '&' + ('catcodeYN') + '=' + ('N');
    queryParams += '&' + ('addrinfoYN') + '=' + ('N');
    queryParams += '&' + ('mapinfoYN') + '=' + ('N');
    queryParams += '&' + ('overviewYN') + '=' + ('N');
    queryParams += '&' + ('transGuideYN') + '=' + ('N');
    queryParams += '&' + ('MobileOS') + '=' + ('ETC');
    queryParams += '&' + ('MobileApp') + '=' + ('공유자원포털');
    queryParams += '&' + ('numOfRows') + '=' + ('999');
    queryParams += '&' + ('pageNo') + '=' + ('1');



    $.ajax({
        type: "GET",
        url: end_point_url + queryParams,
        dataType: "xml",
        async: true,
        success: response_parse,
        error: error
    });

    function response_parse(data) {
        var $xml;

        $("#box1").text(data.responseText);
        // IE가 아니면 그냥 하면 된다.
        $xml = $(data.responseText);

    }

    function error(xml) {
        $("#box1").val("오류");
    }
});
*/