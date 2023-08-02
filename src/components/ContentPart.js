import { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import theme from "../common/colors";
const { kakao } = window;

const AlignCenter = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const HorizontalAlign = css`
  align-items: center;
  display: flex;
  justify-content: space-between;
`;

const MainWrap = styled.main`
  color: ${ theme.textColor };
  height: 100%;
  width: 65%;

  @media (max-width: 768px) { width: 100%; }
`;

const LayoutSection = styled.article`
  background-color: ${ theme.sectionColor };
  border-radius: 50px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  padding: 30px;
`;

const WeatherArea = styled.div`
  ${ AlignCenter }
  background-color: #3C486B;
  border-radius: 30px;
  box-sizing: border-box;
  font-weight: 900;
  line-height: 1.5;
  /* padding:20px 0px; */
  /* margin-bottom: 30px; */
`;

const BottomArea = styled.div`
  box-sizing: border-box;
  display: flex;
  flex: 1;
  justify-content: space-between;
  position: relative;
`;

const CafeArea = styled.div`
  background-color: ${ theme.articleColor };
  border-radius: 30px;
  box-sizing: border-box;
  height: 100%;
  padding: 30px;
  width: 50%;
`;

const CafeListCon = styled.div`
  h3 {
    font-size: 18px;
    font-weight: 900;
    margin-bottom: 20px;
  }

  div {
    box-sizing: border-box;
    height: 100%;
    overflow-y: scroll;
    width: 100%;

    p { margin-bottom: 10px; }
  }
`;


const MapArea = styled.div`
  border-radius: 30px;
  position: absolute;
  height: 100%;
  right: 0;
  width: 40%;
`;

function ContentPart() {
  const [currWeather, setCurrWeather] = useState(null);
  const [currTemp, setCurrTemp] = useState('');
  const [cafeList, setCafeList] = useState();

  // 현재 위치 가져오기
  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      let latitude = position.coords.latitude;
      let longitude = position.coords.longitude;
      getWeatherByCurrentLocation(latitude, longitude);
      getLocationMap(latitude, longitude);
    });
  };

  // 현재 위치 날씨 API 가져오기
  const getWeatherByCurrentLocation = async (latitude, longitude) => {
    if(latitude !== undefined && longitude !== undefined) {
      let WEATHER_API_KEY = '739cddaed6d840ce7ff865f1c8296393';
      let WEATHER_API_URL = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude={part}&appid=${WEATHER_API_KEY}&units=metric&lang=kr`;
      let response = await fetch(WEATHER_API_URL);
      let data = await response.json();
      setCurrWeather(data.current);
    } 
  };

  useEffect(() => {
    getCurrentLocation();
    getWeatherByCurrentLocation();
  }, []);

  useEffect(() => {
    getTemperature();
  }, [currWeather]);

  // 현재 기온 반올림
  const getTemperature = () => {
    const temp = currWeather?.temp;
    setCurrTemp(temp?.toFixed(1));
  };

  // 지도 생성
  const getLocationMap = (latitude, longitude) => {
    var infowindow = new kakao.maps.InfoWindow({ zIndex:1 }); // 장소명을 표출할 인포윈도우를 생성합니다
    var container = document.getElementById('map'); // 지도를 표시할 div 
    var options = { center: new kakao.maps.LatLng(latitude, longitude), level: 3 };
    // 지도 생성 및 객체 리턴
    var map = new kakao.maps.Map(container, options);

    // 현재 위치 마커 이미지 설정
    var imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png'; // 마커이미지 주소
    var imageSize = new kakao.maps.Size(44, 49); // 마커이미지  크기
    var imageOption = { offset: new kakao.maps.Point(27, 69) }; // 마커이미지 옵션. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정
        
    // 현재 위치 마커 생성
    var currMarkerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);
    var currMarkerPosition  = new kakao.maps.LatLng(latitude, longitude); 
    var currMarker = new kakao.maps.Marker({ map: map, position: currMarkerPosition, image: currMarkerImage }); 

    // 장소 검색 객체  생성
    var searchPlace = new kakao.maps.services.Places(map); 
    searchPlace.categorySearch('CE7', placesSearchCB, { useMapBounds:true }); 

    function placesSearchCB(data, status, pagination) {
      if (status === kakao.maps.services.Status.OK) {
        data.map((thisResult) => {
          displayMarker(thisResult);
          setCafeList(data);
        })       
      }
    };

    const displayMarker = (cafe) => {
      // 카페 마커 생성
      var cafeMarkerPosition = new kakao.maps.LatLng(cafe.y, cafe.x);
      var marker = new kakao.maps.Marker({ map: map, position: cafeMarkerPosition });
  
      // 카페 마커에 클릭 이벤트 등록
      kakao.maps.event.addListener(marker, 'click', function() {
        infowindow.setContent('<div style="padding:5px;font-size:12px;">' + cafe.place_name + '</div>');
        infowindow.open(map, marker);
      });
    }
  
  };


  return (
    <MainWrap>
      <LayoutSection>
        {/* ---------- 날씨 ---------- */}
        <WeatherArea>
          {
            currWeather === null || currWeather === undefined ? 
            <div>날씨를 가져오고 있어요</div> : 
            <div>
              현재 기온은 { currTemp }℃에요. <br />
              {
                currWeather?.weather[0].main === 'Rain' ? '비가 내리니 우산 잊지마세요!' :
                currWeather?.weather[0].main === 'Snow' ? '눈이 오네요. 미끄러지지 않게 조심하세요' :
                currWeather?.weather[0].main === 'Clear' ? '맑은 하늘을 볼 수 있겠어요 :-)' :
                currWeather?.weather[0].main === 'Drizzle' ? '이슬비가 오고 있어요.' :
                currWeather?.weather[0].main === 'Thunderstorm' ? '뇌우가 오고 있어요.' :
                currWeather?.weather[0].main === 'Mist' || currWeather?.weather[0].main === 'Haze' || currWeather?.weather[0].main === 'Fog' || currWeather?.weather[0].main === 'Smoke' ? '안개 때문에 흐릴 수도 있겠어요.' : 
                currWeather?.weather[0].main === 'Clouds' ? '구름이 껴서 흐린 날이에요.' : 
                currWeather?.weather[0].main === 'Sand' || currWeather?.weather[0].main === 'Dust' ? '미세먼지가 있네요. 마스크를 착용하는게 좋겠어요.' : 
                currWeather?.weather[0].main === 'Squall' ? '돌풍이 불어요. 외출을 자제해주세요.' : 
                currWeather?.weather[0].main === 'Tornado' ? '회오리 바람이 불어요. 외출을 자제해주세요.' : 
                currWeather?.weather[0].main === 'Ash' ? '화산재가 분출되었어요. 외출을 자제해주세요' : `${currWeather?.weather[0].description}`
              }
            </div>
          }
        </WeatherArea>

        {/* ---------- 카페 목록 ---------- */}
        <BottomArea>
            <CafeArea>
              {
                cafeList === undefined ?
                <div>근처 카페를 찾고 있어요</div> :
                <CafeListCon>
                  <h3>오늘은 이곳에서 작업하는 거 어떨까요?</h3>
                  <div>
                    { cafeList?.map((data) => (<p key={ data.place_name }>{data.place_name}</p>)) }
                  </div>
                </CafeListCon>
              }
            </CafeArea>

            {/* ---------- 지도 ---------- */}
            <MapArea id="map"></MapArea>
        </BottomArea>
      </LayoutSection>
    </MainWrap>
  );
}

export default ContentPart;