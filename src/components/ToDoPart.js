import { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { SlOptionsVertical } from "react-icons/sl";

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
  position: relative;
`;

const ListStyle = styled.div`
  font-size: 24px;
  margin-bottom: 10px;

  &:hover {
    color: grey;
  };
`;

const OptionButton = styled.div`
  cursor: pointer;
`;

const OptionArea = styled.div`
  bottom: 0;
  display: flex;
  position: absolute;
  right: 0;
`;

const ButtonStyle = styled.div`
  box-sizing: border-box;
  cursor: pointer;
  // padding: 5px 10px;
`;

function ToDoPart() {
  const [data, setData] = useState('');
  const [editData, setEditData] = useState('');
  const [toDoList, setToDoList] = useState([]);
  const [currKey, setCurrKey] = useState(0);
  const [optionStates, setOptionStates] = useState({});
  const [isEditing, setIsEditing] = useState(false);
   
  const handleAddToDo = (e) => {
    e.preventDefault();
    setData(e.target.value);
  };

  const handleEditToDo = (e) => {
    e.preventDefault();
    setEditData(e.target.value);
  };

  // 추가
  const addToDo = (e) => {
    e.preventDefault();

    if(data !== '') {
      setToDoList([ ...toDoList,{ content: data, id: currKey }]);  
    } else {
      alert('할 일을 입력해주세요 :^)');
    }
    setCurrKey(currKey + 1);
    setData('');
  };

  // 수정&삭제 옵션 열기
  const toggleOption = (id) => {
    console.log('현재 클릭한 리스트', id);

    setOptionStates((preOption) => ({
      ...preOption,
      [id]: !preOption[id],
    }));
  };

  // 수정폼 열기
  const editFormOpen = (id) => {
    setIsEditing(true);
    console.log('수정폼아 열려라...');
  };

  // 수정
  const editToDo = (id) => {
    // setToDoList(toDoList.map(todo => todo.id === id ? {...todo, content: '홧인' } : todo ));
    // setOptionStates(!optionStates);
  };


  // 삭제 
  const deleteTodo = (id) => {
    if(window.confirm('삭제하시겠어요??')){
      setToDoList(toDoList.filter((todo) => todo.id !== id));
    };
    setOptionStates(!optionStates);
  };

  const toDoListCon = toDoList.map((thisResult) => {
    const dataId = thisResult.id;

      return(
        isEditing ? 
          <HorizontalAlign>
            <InputArea 
              onChange={ handleEditToDo } 
              placeholder="수정값" 
              value={ editData } 
            />
            <InputButton onClick={ editToDo(dataId) }>수정</InputButton>
          </HorizontalAlign> : 
          <TodoListBox key={ dataId } >
            <ListStyle>{ thisResult.content }</ListStyle>
            <OptionButton onClick={ () => toggleOption(dataId) }>
              <SlOptionsVertical size="12" />
            </OptionButton>
            {
              optionStates[dataId] &&
                <OptionArea>
                  <ButtonStyle onClick={ () => editFormOpen(dataId) }>수정</ButtonStyle>
                  <ButtonStyle onClick={ () => deleteTodo(dataId) }>삭제</ButtonStyle>
                </OptionArea> 
            }
          </TodoListBox>
      )
  });

  return (
    <MainContent>
      <div>오늘 할 일은 {toDoList.length}개에요!</div>
      <HorizontalAlign>
        <InputArea 
          onChange={ handleAddToDo } 
          placeholder="할 일" 
          value={ data } 
        />
        <InputButton onClick={ addToDo }>저장</InputButton>
      </HorizontalAlign>
      <ScrollArea>
        { toDoListCon }
      </ScrollArea>
    </MainContent> 
  );
};

export default ToDoPart;