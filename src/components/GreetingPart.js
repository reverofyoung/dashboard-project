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

const InnerContentBox = styled.div`
  height: 33.3%;
  width: 100%;
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
  padding: 10px;
`;


function GreetingPart() {
    // const [time, setTime] = useState(new Date());
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
  
    // useEffect(() => {
    //   const id = setInterval(() => {
    //     setTime(new Date());
    //   }, 1000);
  
    //   return (() => 
    //     clearInterval(id) // 불필요한 작업 방지
    //   ); 
    // }, []);
  
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

    return (
      <MainContent>
        <InnerContentBox>
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
        </InnerContentBox>
        {/* <InnerContentBox>
          오늘은 { time.toLocaleDateString() }
          <br />
          현재시간은 { time.toLocaleTimeString() } 입니다.
        </InnerContentBox> */}
        <InnerContentBox>
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