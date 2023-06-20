import { useEffect, useState } from "react";
import styled, { css } from "styled-components";

const flexCenter = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ClockCon = styled.div`
  ${flexCenter}
  background-color: skyblue;
  width: 50%;
`;

const ClockStyle = styled.div`
  font-size: 24px;
  font-weight: bold;
`;

const GreetingCon = styled.div`
  display: flex;
  height: 30px;
  width: 50%;
`;

const GreetingStyle = styled.div`
  display: flex;
`;

const UserInput = styled.input`
  
`;

const InputButton = styled.div`
  ${flexCenter}
  background-color: grey;
  height: 30px;
`;

const UserName = styled.div`
  display: userName !== '' ? flex : none;
  width: 100%;
`;

function Dashboard() {
  const [time, setTime] = useState(new Date());

  const [userName, setUserName] = useState('');
  const [user, setUser] = useState('');
  const [toDo, setToDo] = useState('');
  const [toDoList, setToDoList] = useState([]);

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

  const getTodo = (e) => {
    setToDo(e.target.value);
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

  const submitToDo = (e) => {
    e.preventDefault();

    const addToDo = toDoList.concat({
      content: toDo,
      id: toDo + 1,
    });
    
    setToDoList(addToDo);
    setToDo('');

  };


  const toDoListCon = toDoList.map((thisResult) => (
    <div>{thisResult.content}</div>
  ))
  

  return (
    <>
      <ClockCon>
        <ClockStyle>{ time.toLocaleString() }</ClockStyle>
      </ClockCon>

      <GreetingCon>
        {
          user !== '' ? 
          <GreetingStyle>
            <UserName>{ user }님 안녕하세요!</UserName>
          </GreetingStyle> : 
          <GreetingStyle>
            <UserInput 
            onChange={ getUserName } 
            placeholder="닉네임을 입력해주세요😁" 
            value={ userName } 
          />
            <InputButton onClick={ submitUserName }>저장</InputButton>
          </GreetingStyle>
        }
      </GreetingCon>

      <div>
        <GreetingStyle>
          <UserInput 
          onChange={ getTodo } 
          placeholder="오늘 할 일을 입력해주세요😁" 
          value={ toDo } 
        />
          <InputButton onClick={ submitToDo }>저장</InputButton>
        </GreetingStyle>
        <div>{toDoListCon}</div>
      </div>
    </>
   
  );
}

export default Dashboard;
