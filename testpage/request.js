/**
 * Created by Choi on 2016-06-05.
 */
// OpenAPI authorization key
var authKey = 'C1Sl2WSWCwVQMx%2BLngIVV84ZtLYx1OA5rGCGovldfhPwOs6wO4Uoy0wMG9c4XH2tf90OO0IG%2FZOq0O4iwh2ZoQ%3D%3D';
var mapKey  = '011f00f7b58211a3d9d86dbe89c82781';
var seoulCode = '110000';
var basicPrefix    = 'http://openapi.hira.or.kr/openapi/service/hospInfoService';
var detailPrefix   = 'http://openapi.hira.or.kr/openapi/service/medicInsttDetailInfoService';
var basicService   = 'getHospBasisList';
var detailServices = [ 'getFacilityInfo', 'getDetailInfo', 'getMdlrtSbjectInfoList', 'getTransportInfoList'
    , 'getMedicalEquipmentInfoList', 'getCgffdAddiInfoList', 'getNursigGradeInfoList', 'getSpclMdlrtInfoList'
    , 'getSpcHospAppnFieldList'];

var map;
var markers = [];
var itemArray;
var infowindow = null;
;

function initMap()
{
    // Create a map object and specify the DOM element for display.
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 37.5663, lng: 126.9779},
        scrollwheel: false,
        zoom: 11
    });
}

$(document).ready(function()
{
    $('#submitButton').click(function () {
        var districtValue = $('#hospSgguSelect').val();
        var deptValue = $('#hospClcdSelect').val();

        var basicUrl = basicPrefix + '/' + basicService + '?ServiceKey=' + authKey;
        var params = '&pageNo=1&numOfRows=3000&sidoCd=110000'
            + '&sgguCd=' + districtValue;

        if (deptValue != 'all') {
            params += '&dgsbjtCd=' + deptValue;
        }

        deleteMarkers();

        $.ajax({
            url: basicUrl + params,
            type: 'get',
            dataType: 'xml',
            async: false,
            cache: false,
            success: basicResponse,
            error: basicError
        });
    });
    $('#locationButton').click(function () {
        
        deleteMarkers();
        getLocation();
        //xml2jsonCurrentWth('127.0851566','37.48813256');

    });
});

function basicResponse(object)
{
    var $xml = $(object.responseText);
    var totalCount = $xml.find('totalCount').text();

    if(totalCount != 0)
    {
        var $items = $xml.find('items');
        var itemArray = new Array();

        $items.find('item').each(function (index, element)
        {
            var item = new Array();
            item.ykiho = $(element).find('ykiho').text();
            item.yadmNm = $(element).find('yadmNm').text();
            item.clCdNm = $(element).find('clCdNm').text();
            item.addr = $(element).find('addr').text();
            item.telno = $(element).find('telno').text();
            item.hospUrl = $(element).find('hospUrl').text();
            item.estbDd = $(element).find('estbDd').text();
            item.drTotCnt = $(element).find('drTotCnt').text();
            item.gdrCnt = $(element).find('gdrCnt').text();
            item.intnCnt = $(element).find('intnCnt').text();
            item.resdntCnt = $(element).find('resdntCnt').text();
            item.sdrCnt = $(element).find('sdrCnt').text();
            item.xPos = $(element).find('xPos').text();
            item.yPos = $(element).find('yPos').text();
            // item.distance  = $(element).find('distance').text();

            itemArray.push(item);
        });

        for (var i = 0; i < itemArray.length; i++)
        {
            addMarker(itemArray[i]);
        }

    }
}

function addMarker(item)
{
    var contentString = '<div id="content">'+
        '<div id="siteNotice">'+
        '</div>'+
        '<h3 id="firstHeading" class="firstHeading"><a href="'+ item.hospUrl +' ">' + item.yadmNm +'</a></h3>'+
        '<div id="bodyContent">'+
        '<p>구분   : '+ item.clCdNm + '</p>'+
        '<p>주소   : '+ item.addr + '</p>'+
        '<p>연락처 : '+ item.telno +'</p>'+
        //'<p align="left"><a href="#" data-toggle="modal" data-target="#myModal">자세한 정보 보기</a></p>'+
        '</div>'+
        '</div>';

    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(item.yPos, item.xPos),
        map: map,
        title: item.yadmNm
    });

    marker.addListener('click', function()
    {
        if(infowindow)
            infowindow.close();

        infowindow = new google.maps.InfoWindow({
            content: contentString
        });
        infowindow.open(map, marker);
    });

    markers.push(marker);
}

function addMarker2(item)
{
    var contentString = '<div id="content">'+
        '<div id="siteNotice">'+
        '</div>'+
        '<h3 id="firstHeading" class="firstHeading">' + item.dutyName +'</a></h3>'+
        '<div id="bodyContent">'+
        '<p>구분   : '+ item.dutyDivName + '</p>'+
        '<p>주소   : '+ item.dutyAddr + '</p>'+
        '<p>연락처 : '+ item.dutyTel1 +'</p>'+
        '<p>거리 : '+ item.distance + "km" + '</p>' +
        //'<p align="left"><a href="#" data-toggle="modal" data-target="#myModal">자세한 정보 보기</a></p>'+
        '</div>'+
        '</div>';

    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(item.latitude, item.longitude),
        map: map,
        title: item.dutyName,

    });

    marker.addListener('click', function()
    {
        if(infowindow)
            infowindow.close();

        infowindow = new google.maps.InfoWindow({
            content: contentString
        });
        infowindow.open(map, marker);
    });

    markers.push(marker);
}

function deleteMarkers()
{
    for (var i = 0; i < markers.length; i++)
    {
        markers[i].setMap(null);
    }

}



function basicError()
{
    //$('#result1').val("Failed to retrieve data.");
}


<!-- 내 위치값 가져오기 -->
var x = document.getElementById("demo");

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(findHosp, showError);


    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            x.innerHTML = "User denied the request for Geolocation."
            break;
        case error.POSITION_UNAVAILABLE:
            x.innerHTML = "Location information is unavailable."
            break;
        case error.TIMEOUT:
            x.innerHTML = "The request to get user location timed out."
            break;
        case error.UNKNOWN_ERROR:
            x.innerHTML = "An unknown error occurred."
            break;
    }
}


// geo_options
function findHosp(position){


    x.innerHTML = "Latitude: " + position.coords.latitude +
        "<br>Longitude: " + position.coords.longitude;
    var _nx = position.coords.longitude;
    var _ny = position.coords.latitude;
    var _numValue = $('#hospNumSelect').val();

    var fileName ="http://openapi.e-gen.or.kr/openapi/service/rest/HsptlAsembySearchService/getHsptlMdcncLcinfoInqire?WGS84_LON=" + _nx + "&WGS84_LAT=" + _ny + "&pageNo=1&numOfRows="+ _numValue + "&ServiceKey=LsxjGcP4BMk6YjkZeEzMOZfl7mTfOhLojbXW8STMds0klsOhLJA9r06aJ%2Br1dHvnFvji%2BTABdBNA%2FvYNwwtJrQ%3D%3D"

    $.ajax({
        url: fileName,
        type: 'get',
        dataType: 'xml',
        async: false,
        cache: false,
        success: distanceResponse,
        error: basicError
    });

}
function distanceResponse(object)
{
    var $xml = $(object.responseText);
    var totalCount = $xml.find('totalCount').text();

    if(totalCount != 0)
    {
        var $items = $xml.find('items');
        var itemArray = new Array();

        $items.find('item').each(function (index, element)
        {
            var item = new Array();
            item.distance = $(element).find('distance').text();
            item.dutyAddr = $(element).find('dutyAddr').text();
            item.dutyDivName = $(element).find('dutyDivName').text();
            item.dutyTel1 = $(element).find('dutyTel1').text();
            item.dutyName = $(element).find('dutyName').text();
            item.longitude = $(element).find('longitude').text();
            item.latitude = $(element).find('latitude').text();
            // item.distance  = $(element).find('distance').text();

            itemArray.push(item);
        });

        for (var i = 0; i < itemArray.length; i++)
        {
            addMarker2(itemArray[i]);
        }

    }
}
// xml2jsonCurrentWth

function rplLine(value){
    if (value != null && value != "") {
        return value.replace(/\n/g, "\\n");
    }else{
        return value;
    }
}

