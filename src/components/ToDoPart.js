import { useState } from "react";
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
  /* padding: 30px; */
  width: 33.3%;
  border-right: 1px solid black;
`;

const HorizontalAlign = css`
  align-items: center;
  display: flex;
  justify-content: space-between;
`;

const ContentTitleArea = styled.div`
  ${ AlignCenter }
  border-bottom: 1px solid black;
  box-sizing: border-box;
  font-size: 18px;
  font-weight: 700;
  height: 50px;
`;

const ToDoInputArea = styled.div`
  ${ HorizontalAlign }
  border-bottom: 1px solid black;
  box-sizing: border-box;
  height: 50px;
`;

const InputArea = styled.input`
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

const ScrollArea = styled.div`
  box-sizing: border-box;
  height: 80%;
  overflow-y: scroll;
  padding: 10px;
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

const TodoListBox = styled.div`
  /* ${ HorizontalAlign } */
  align-items: center;
  box-sizing: border-box;
  display: flex;
  padding: 8px 0px;
  position: relative;
`;

const CheckBoxStyle = styled.input`
  height: 15px;
`;

const ContentStyle = styled.div`
  align-items: center;
  box-sizing: border-box;
  display: flex;
  font-size: 18px;
  padding: 0px 10px;
  width: 90%;

  &:hover {
    color: grey;
  };
`;

const CheckedStyle = styled(ContentStyle)`
  color: grey;
  text-decoration: line-through;
`;

const OptionButton = styled.div`
  ${ AlignCenter }
  cursor: pointer;
  width: 30px;
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
  const [isChecked, setIsChecked] = useState(false);
  const [editData, setEditData] = useState('');
  const [toDoList, setToDoList] = useState([]);
  const [currKey, setCurrKey] = useState(0);
  const [checkedStates, setCheckedStates] = useState({});
  const [optionStates, setOptionStates] = useState({});
  const [editStates, setEditStates] = useState({});
   
  // 추가 시 인풋
  const handleAddToDo = (e) => {
    e.preventDefault();
    setData(e.target.value);
  };

  // 수정 시 인풋
  const handleEditToDo = (e) => {
    e.preventDefault();
    setEditData(e.target.value);
  };

  // 체크박스 상태 확인
  const handleChecked = (id) => {
    setCheckedStates((preState) => ({
      ...preState,
      [id]: !preState[id],
    }));
  };

  console.log(checkedStates);

  // 추가 버튼 클릭 이벤트
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
    setOptionStates((preState) => ({
      ...preState,
      [id]: !preState[id],
    }));
  };

  // 수정폼 열기
  const toggleEditForm = (id) => {
    console.log('수정폼 열기 - ', id);
    // setEditStates((preState) => ({
    //   ...preState,
    //   [id]: !preState[id],
    // }));    
  };

  // 수정
  const editToDo = (id) => {
    // const preList = [...toDoList];
    // const findIndex = toDoList.findIndex(toDo => toDo.id === id);
    // preList[findIndex].content = editData;
    // setToDoList(preList);
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
        editStates[dataId] ?
          <HorizontalAlign>
            <InputArea 
              onChange={ handleEditToDo } 
              placeholder="수정값" 
              value={ editData } 
            />
            <InputButton onClick={ editToDo(dataId) }>수정</InputButton>
          </HorizontalAlign> : 
          
          <TodoListBox key={ dataId } >
            <CheckBoxStyle 
              key={ dataId }
              onChange={ () => handleChecked(dataId) }
              type="checkbox"
            />
            {
              checkedStates[dataId] ?
                <CheckedStyle>{ thisResult.content }</CheckedStyle> :
                <ContentStyle>{ thisResult.content }</ContentStyle>
            }
            <OptionButton onClick={ () => toggleOption(dataId) }>
              <SlOptionsVertical size="12" />
            </OptionButton>
            {
              optionStates[dataId] &&
                <OptionArea>
                  <ButtonStyle onClick={ () => toggleEditForm(dataId) }>수정</ButtonStyle>
                  <ButtonStyle onClick={ () => deleteTodo(dataId) }>삭제</ButtonStyle>
                </OptionArea> 
            }
          </TodoListBox>
      )
  });

  return (
    <MainContent>
      <ContentTitleArea>오늘 할 일은 {toDoList.length}개에요</ContentTitleArea>
      <ToDoInputArea>
        <InputArea 
          onChange={ handleAddToDo } 
          placeholder="할 일" 
          value={ data } 
        />
        <InputButton onClick={ addToDo }>저장</InputButton>
      </ToDoInputArea>
      <ScrollArea>
        { toDoListCon }
      </ScrollArea>
    </MainContent> 
  );
};

export default ToDoPart;