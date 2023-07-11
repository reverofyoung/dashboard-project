import { useEffect, useState } from "react";
import styled, { css } from "styled-components";

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

const MainContent = styled.div`
  box-sizing: border-box; 
  height: 100%;
  /* padding: 30px; */
  width: 33.3%;
  border-right: 1px solid black;
`;

const VerticalDivide = styled.div`
  height: 33.3%;
  width: 100%;
`;

const WeatherArea = styled.div`
  box-sizing: border-box;
  padding: 0px 10px;
`;

const UserInputArea = styled.div`
  ${HorizontalAlign}
  border-bottom: 1px solid black;
  box-sizing: border-box;
  height: 50px;

  /* padding: 10px; */
`;

const InputArea = styled.input`
  ${ AlignCenter }
  border-width: 0px;
  font-size: 18px;
  height: 100%;
  width: 70%;
  padding: 0px 10px;
  margin: 0px;

  ::placeholder {
    font-size: 18px;
  }
`;

const InputButton = styled.div`
  ${ AlignCenter }
  border-left: 1px solid black;
  /* border-radius: 10px; */
  font-size: 18px;
  height: 100%;
  min-width: 60px;
  width: 30%;

  &:hover {
    background-color: black;
    color: white;
  };
`;

const UserNameArea = styled.div`
  border-bottom: 1px solid black;
  box-sizing: border-box;
  font-size: 22px;
  height: 100px;
  padding: 20px 10px;
`;


function GreetingPart() {
    const [currWeather, setCurrWeather] = useState(null);
    const [currTemp, setCurrTemp] = useState('');
    const [userName, setUserName] = useState('');
    const [user, setUser] = useState('');
  
    const getCurrentLocation = () => {
      // 현재 위치 가져오기
      navigator.geolocation.getCurrentPosition((position) => {
        let latitude = position.coords.latitude;
        let longitude = position.coords.longitude;
  
        getWeatherByCurrentLocation(latitude, longitude);
      });
    };
  
     // 현재 위치 날씨 API 가져오기
     const getWeatherByCurrentLocation = async (latitude, longitude) => {
      let WEATHER_API_KEY = '739cddaed6d840ce7ff865f1c8296393';
      let WEATHER_API_URL = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude={part}&appid=${WEATHER_API_KEY}&units=metric&lang=kr`;
      let response = await fetch(WEATHER_API_URL);
      let data = await response.json();
      setCurrWeather(data.current);
    };
  
    useEffect(() => {
      getCurrentLocation();
      getWeatherByCurrentLocation();
    }, []);

    useEffect(() => {
      getWeatherId();
    }, [currWeather])
  
    const getUserName = (e) => {
      setUserName(e.target.value);
    };
  
    const addUserName = (e) => {
      e.preventDefault();

      if(userName === '') {
          alert('입력창이 비었네요!');
      } else {
        setUser(userName);
        setUserName('');
      }
    };

    const getWeatherId = () => {
      const getTemp = currWeather?.temp;
      setCurrTemp(getTemp?.toFixed(1));
    };

    return (
      <MainContent>
        <VerticalDivide>
        {
          user !== '' ? 
            <UserNameArea>{ user }님 <br />안녕하세요</UserNameArea> : 
            <UserInputArea>
              <InputArea 
                onChange={ getUserName } 
                placeholder="이름을 입력해주세요" 
                value={ userName } 
              />
              <InputButton onClick={ addUserName }>저장</InputButton>
            </UserInputArea>
        }
        </VerticalDivide>

        <VerticalDivide>
          <WeatherArea>
            {
              currWeather === null || currWeather === undefined ? 
              <div>현재 날씨를 가져오고 있어요!</div> : 
              <div>
                현재 기온은 { currTemp }℃로 <br />
                {
                  currWeather?.weather[0].main === 'Rain' ? '비가 내리니 우산 잊지마세요!' :
                  currWeather?.weather[0].main === 'Snow' ? '눈이 오네요. 미끄러지지 않게 조심하세요' :
                  currWeather?.weather[0].main === 'Clear' ? '맑은 하늘을 볼 수 있겠어요' :
                  currWeather?.weather[0].main === 'Drizzle' ? '이슬비가 오고 있어요' :
                  currWeather?.weather[0].main === 'Thunderstorm' ? '뇌우가 오고 있어요' :
                  currWeather?.weather[0].main === 'Mist' || currWeather?.weather[0].main === 'Haze' || currWeather?.weather[0].main === 'Fog' || currWeather?.weather[0].main === 'Smoke' ? '안개 때문에 흐릴 수도 있겠어요' : 
                  currWeather?.weather[0].main === 'Clouds' ? '구름이 껴서 흐린 날이에요.' : 
                  currWeather?.weather[0].main === 'Sand' || currWeather?.weather[0].main === 'Dust' ? '미세먼지가 있어요 모래..' : 
                  currWeather?.weather[0].main === 'Squall' ? '돌풍이 불어요. 외출을 자제해주세요 ' : 
                  currWeather?.weather[0].main === 'Tornado' ? '회오리 바람이 불어요. 외출을 자제해주세요' : 
                  currWeather?.weather[0].main === 'Ash' ? '화산재가 분출되었어요. 외출을 자제해주세요' : `${currWeather?.weather[0].description}`
                }
              </div>
            }
          </WeatherArea>
        </VerticalDivide>
      </MainContent>
     
    );

}

export default GreetingPart;