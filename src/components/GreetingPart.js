import { useEffect, useState } from "react";
import styled, { css } from "styled-components";

const AlignCenter = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MainContent = styled.div`
  box-sizing: border-box; 
  height: 100%;
  padding: 40px;
  width: 33.3%;
  border-right: 1px solid black;
`;

const InnerContentBox = styled.div`
  font-size: 28px;
  height: 33.3%;
  width: 100%;
`;

const HorizontalAlign = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
`;

const InputArea = styled.input`
  border-width: 0px 0px 1px 0px;
  font-size: 26px;
  height: 60px;
  width: 70%;
`;

const InputButton = styled.div`
  ${ AlignCenter }
  border: 1px solid black;
  border-radius: 10px;
  font-size: 22px;
  height: 30px;
  width: 20%;
  min-width: 60px;

  &:hover {
    background-color: black;
    color: white;
  };
`;

const UserNameArea = styled.div`
  display: userName !== '' ? flex : none;
  font-size: 30px;
`;

function GreetingPart() {
    const [time, setTime] = useState(new Date());
    const [currWeather, setCurrWeather] = useState(null);
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
      const id = setInterval(() => {
        setTime(new Date());
      }, 1000);
  
      return (() => 
        clearInterval(id) // 불필요한 작업 방지
      ); 
    }, []);
  
    const getUserName = (e) => {
      setUserName(e.target.value);
    };
  
    const submitUserName = (e) => {
      e.preventDefault();
      if(userName === '') {
          alert('입력창이 비었네요!');
      } else {
        setUser(userName);
        setUserName('');
      }
    };

    return (
      <MainContent>
        <InnerContentBox>
        {
          user !== '' ? 
          <HorizontalAlign>
            <UserNameArea>{ user }님 <br />안녕하세요!</UserNameArea>
          </HorizontalAlign> : 
          <HorizontalAlign>
            <InputArea 
              onChange={ getUserName } 
              placeholder="이름" 
              value={ userName } 
            />
            <InputButton onClick={ submitUserName }>저장</InputButton>
          </HorizontalAlign>
        }
        </InnerContentBox>
        {/* <InnerContentBox>
          오늘은 { time.toLocaleDateString() }
          <br />
          현재시간은 { time.toLocaleTimeString() } 입니다.
        </InnerContentBox> */}
        <InnerContentBox>
          {/* 현재 날씨는 { currWeather?.temp }℃로 { currWeather?.weather[0].description } 이에요 */}
          { 
            currWeather === null || currWeather === undefined ? 
            <div>현재 날씨를 가져오고 있어요!</div> : 
            <div>현재 기온은 { currWeather?.temp }℃로 { currWeather?.weather[0].description } 이에요</div>
          }
        </InnerContentBox>
      </MainContent>
     
    );

}

export default GreetingPart;