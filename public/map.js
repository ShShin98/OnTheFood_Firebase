var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
    mapOption = {
        center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
        level: 3 // 지도의 확대 레벨
    };
// 지도를 표시할 div와  지도 옵션으로  지도를 생성합니다
var map = new kakao.maps.Map(mapContainer, mapOption);

let _lat, _lng;

// if (navigator.geolocation) {
//     // GeoLocation을 이용해서 접속 위치를 얻어옵니다
//     navigator.geolocation.getCurrentPosition(function (position) {

//         var lat = position.coords.latitude, // 위도
//             lon = position.coords.longitude; // 경도
//         _lat = lat;
//         _lon = lon;
//         var locPosition = new kakao.maps.LatLng(lat, lon) // geolocation으로 얻어온 좌표
//         presentPosition = locPosition;

//         map.setCenter(locPosition);

//     });
// } else { // HTML5의 GeoLocation을 사용할 수 없을때
//     var locPosition = new kakao.maps.LatLng(37.566826, 126.9786567)
//     alert('현재 위치를 찾을 수 없습니다!');
// }
function onGeoOk(position) {
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;
    _lat = lat;
    _lng = lng;
    console.log("You live in", lat, lng);
    var locPosition = new kakao.maps.LatLng(lat, lng);
    map.setCenter(locPosition);
}

function onGeoError() {
    alert("Can't find you. No weather for you.");
}

navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);

function panTo() {
    // 이동할 위도 경도 위치를 생성합니다
    var moveLatLon = new kakao.maps.LatLng(_lat, _lng);
    // 지도 중심을 부드럽게 이동시킵니다
    // 만약 이동할 거리가 지도 화면보다 크면 부드러운 효과 없이 이동합니다
    map.panTo(moveLatLon);
}

var openWin;

function AddResBtn() {
    window.name = "parentForm";
    openWin = window.open("AddPopup.html","childForm","width=500px, height=400px");
}


var geocoder = new kakao.maps.services.Geocoder();

// 주소로 좌표를 검색합니다
function AddMarker() {
    var rAddress = document.getElementById('addressIn').value;
    var rName = document.getElementById('resNameIn').value;
    console.log(rAddress);
    console.log(rName);
    geocoder.addressSearch(rAddress, function (result, status) {

        // 정상적으로 검색이 완료됐으면 
        if (status === kakao.maps.services.Status.OK) {
            document.getElementById('addressIn').value = '';
            document.getElementById('resNameIn').value = '';
            var coords = new kakao.maps.LatLng(result[0].y, result[0].x);

            // 결과값으로 받은 위치를 마커로 표시합니다
            var marker = new kakao.maps.Marker({
                map: map,
                position: coords
            });

            // 인포윈도우로 장소에 대한 설명을 표시합니다
            var infowindow = new kakao.maps.InfoWindow({
                content: `<div style="width:150px;text-align:center;padding:6px 0;">${rName}</div>`
            });
            infowindow.open(map, marker);

            // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
            map.setCenter(coords);
        }
    });
}