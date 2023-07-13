import React, { useEffect } from 'react';

const { kakao } = window;
// 스크립트로 kakao maps api를 심어서 가져오면 window전역 객체에 들어가게 됨.
// 그런데 함수형 컴포넌트에서는 이를 바로 인식하지 못함. 때문에 코드 상단에 작성하여 함수형 컴포넌트에 인지 시키고 window에서 kakao객체를 뽑아서 사용

function Location() {
  const setLocationMap = (latitude, longitude) => {
    var infowindow = new kakao.maps.InfoWindow({zIndex:1}); // 장소명을 표출할 인포윈도우를 생성합니다
    var container = document.getElementById('map'); // 지도를 표시할 div 
    var options = {
      center: new kakao.maps.LatLng(latitude, longitude), // 지도 중심 좌표
      level: 3 // 지도 확대 레벨
    };
      // 지도 생성 및 객체 리턴
    var map = new kakao.maps.Map(container, options);
    // 장소 검색 객체  생성
    var searchPlace = new kakao.maps.services.Places(map); 

    searchPlace.categorySearch('CE7', placesSearchCB, {useMapBounds:true}); 

    function placesSearchCB (data, status, pagination) {
      if (status === kakao.maps.services.Status.OK) {
          for (var i=0; i<data.length; i++) {
              displayMarker(data[i]);    
          }       
      }
    };

    function displayMarker(place) {
      // 마커를 생성하고 지도에 표시
      var marker = new kakao.maps.Marker({
          map: map,
          position: new kakao.maps.LatLng(place.y, place.x) 
      });
  
      // 마커에 클릭이벤트 등록
      kakao.maps.event.addListener(marker, 'click', function() {
          // 마커를 클릭하면 장소명이 인포윈도우에 표출됩
          infowindow.setContent('<div style="padding:5px;font-size:12px;">' + place.place_name + '</div>');
          infowindow.open(map, marker);
      });
    }
  };

  useEffect(()=>{
    setLocationMap();
  }, [])

  return (
    <>
      <div id="map"></div> 
    </>
  )
}

export default Location;