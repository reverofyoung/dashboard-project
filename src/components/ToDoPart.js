import { useEffect, useState } from "react";
import styled, { css } from "styled-components";

const AlignCenter = css`
  align-items: center;
  display: flex;
  justify-content: center;
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

const ScrollArea = styled.div`
  margin-top: 20px;
  height: 80%;
  overflow-y: scroll;
  width: 100%;

  ::-webkit-scrollbar {
    width: 5px;
  };
  ::-webkit-scrollbar-thumb {
    background-clip: padding-box;
    background-color: rgb(0,0,0,0.7);
    border: 1px solid transparent;
    border-radius: 3px;
  };
  ::-webkit-scrollbar-track {
    // background-color: rgb(0,0,0,0.1);
    border-radius: 3px;
  };
`;

const TodoListBox = styled(HorizontalAlign)`
  box-sizing: border-box;
  padding: 0px 5px;
`;

const ListStyle = styled.div`
  font-size: 24px;
  margin-bottom: 10px;

  &:hover {
    color: grey;
  };
`;

const DeleteButton = styled.div`
  cursor: pointer;
`;

function ToDoPart() {
  const [inputData, setInputData] = useState('');
  const [toDoList, setToDoList] = useState([]);
  const [currKey, setCurrKey] = useState(0);

  const getToDo = (e) => {
    setInputData(e.target.value);
  };

  // 추가
  const submitToDo = (e) => {
    e.preventDefault();

    const addToDo = toDoList.concat({
      content: inputData,
      id: currKey,
    });

    setCurrKey(currKey + 1);
    setToDoList(addToDo);
    setInputData('');
  };

  // 수정
  const editToDo = (e) => {
    const editPrompt = window.prompt('할 일을 수정해주세요', e.target.innerText);

    // if(editPrompt !== ''){
    //   window.alert('수정되었어요!');
    // } else {
    //   window.alert('수정할 값을 입력해주세요!');
    // };
  };

  // 삭제 
  const deleteTodo = (id) => {
    if(window.confirm('삭제하시겠어요??')){
      setToDoList(toDoList.filter((toDo) => toDo.id !== id));
    };
  };

  const toDoListCon = toDoList.map((thisResult) => {
    const dataId = thisResult.id;
      return(
        <TodoListBox key={ dataId } >
          <ListStyle onClick={ editToDo }>{ thisResult.content }</ListStyle>
          <DeleteButton onClick={ () => deleteTodo(dataId) }>X</DeleteButton>
        </TodoListBox>
      )
  });

  return (
    <MainContent>
      <div>오늘 할 일은 {toDoList.length}개에요!</div>
      <HorizontalAlign>
        <InputArea 
          onChange={ getToDo } 
          placeholder="할 일" 
          value={ inputData } 
        />
        <InputButton onClick={ submitToDo }>저장</InputButton>
      </HorizontalAlign>
      <ScrollArea>
        { toDoListCon }
      </ScrollArea>
    </MainContent> 
  );
};

export default ToDoPart;