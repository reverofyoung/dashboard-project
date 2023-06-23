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

const InnerContentBox = styled.div`
    margin-top: 30px;
`;

const ListStyle = styled.div`
    font-size: 24px;
    margin-bottom: 10px;

    &:hover {
        color: grey;
    };
`;

const DeleteButton = styled.div`

`;


function ToDoPart() {
    const [toDo, setToDo] = useState('');
    const [toDoList, setToDoList] = useState([]);
    const [currKey, setCurrKey] = useState(0);
  
    const getTodo = (e) => {
      setToDo(e.target.value);
    };
  
    const submitToDo = (e) => {
      e.preventDefault();
  
      const addToDo = toDoList.concat({
        content: toDo,
        key: currKey,
      });
  
      setCurrKey(currKey + 1);
      setToDoList(addToDo);
      setToDo('');
      console.log(currKey);
    };

    const onEdit = (e) => {
        window.prompt('할 일을 수정해주세요', e.target.innerText);
    };

    const onDelete = (id) => {
        console.log(id);
        // window.confirm('삭제하시겠오요');
    };
  
  
    const toDoListCon = toDoList.map((thisResult) => (
        <div>
            <ListStyle ListStyle key={ thisResult.key }>{ thisResult.content }</ListStyle>
            <DeleteButton  key={ thisResult.key } onClick={ onDelete }>삭제</DeleteButton>
        </div>
    ));
  
    return (
        <MainContent>
          <HorizontalAlign>
            <InputArea 
              onChange={ getTodo } 
              placeholder="할 일" 
              value={ toDo } 
            />
            <InputButton onClick={ submitToDo }>저장</InputButton>
          </HorizontalAlign>
          <InnerContentBox onClick={ onEdit }>{ toDoListCon }</InnerContentBox>
        </MainContent> 
    );
};

export default ToDoPart;