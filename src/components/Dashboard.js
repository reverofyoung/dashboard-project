import { useEffect, useState } from "react";
import styled from "styled-components";

const ClockCon = styled.div`
  align-items: center;
  background-color: skyblue;
  display: flex;
  justify-content: center;
`;

const ClockStyle = styled.div`
  font-size: 24px;
  font-weight: bold;
`;

const UserCon = styled.div`
  display: flex;
  height: 30px;
  width: 100%;
`;

const UserInput = styled.input`
  
`;

const SaveButton = styled.div`
  background-color: green;
  width: 200px;
`;


function Dashboard() {
  const [time, setTime] = useState(new Date());

  const [userName, setUserName] = useState('');

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

  const onClickSaveButton = () => {
    // console.log(userName);
    if(userName === ' ') {
      console.log(userName);
        // alert('입력창이 비었네요!');
    }
      setUserName('');
  };

  return (
    <div>
      <ClockCon>
        <ClockStyle>{ time.toLocaleString() }</ClockStyle>
      </ClockCon>

      <UserCon>
        <UserInput 
          onChange={ getUserName } 
          placeholder="닉네임을 입력해주세요😁" 
          value={ userName } 
        />
        <SaveButton onClick={ onClickSaveButton }>저장</SaveButton>
      </UserCon>
    </div>
   
  );
}

export default Dashboard;
