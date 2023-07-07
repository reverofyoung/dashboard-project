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
  width: 100%;

  ::-webkit-scrollbar {
    /* width: 5px; */
  };
  ::-webkit-scrollbar-thumb {
    /* background-clip: padding-box; */
    /* background-color: rgb(0,0,0,0.7); */
    /* border: 1px solid transparent; */
    /* border-radius: 3px; */
  };
  ::-webkit-scrollbar-track {
    // background-color: rgb(0,0,0,0.1);
    /* border-radius: 3px; */
  };
`;

const TodoListBox = styled.div`
  align-items: center;
  box-sizing: border-box;
  display: flex;
  padding: 10px 5px;
  position: relative;

  &:hover {
    background-color: black;
    color: white;
  };
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
  const [newData, setNewData] = useState('');
  const [editData, setEditData] = useState('');
  const [toDoList, setToDoList] = useState(() => {
    if (typeof window !== "undefined") {
      const getSavedData = window.localStorage.getItem("toDoData");
      if (getSavedData !== null) {
        return JSON.parse(getSavedData);
      } else {
        return [];
      }
    }
  });
  const [currKey, setCurrKey] = useState(0);
  const [checkedState, setCheckedState] = useState(false);
  const [checkedStates, setCheckedStates] = useState({});
  const [optionStates, setOptionStates] = useState({});
  const [editStates, setEditStates] = useState({});

  useEffect(() => {
    const test = JSON.parse((localStorage.getItem("toDoData")));
    console.log(test);
  }, []);

  useEffect(() => {
    localStorage.setItem("toDoData", JSON.stringify(toDoList));
  }, [toDoList]);

  // 추가 시 인풋 데이터 담기
  const handleAddToDo = (e) => {
    e.preventDefault();
    setNewData(e.target.value);
  };

  // 수정 시 인풋 데이터 담기
  const handleEditToDo = (e) => {
    e.preventDefault();
    setEditData(e.target.value);
  };

  // 추가 버튼 클릭 이벤트
  const addToDo = (e) => {
    e.preventDefault();
    if(newData !== '') {
      setToDoList([ ...toDoList,{ id: currKey, content: newData, checked: checkedState }]);  
    } else {
      alert('할 일을 입력해주세요 :^)');
    }

    setCurrKey(currKey + 1);
    setNewData('');
  };

  // 체크박스 상태 확인
  const handleChecked = (id) => {
    // setCheckedStates((preState) => ({
    //   ...preState,
    //   [id]: !preState[id],
    // }));

    let findIndex = toDoList.findIndex(thisData => thisData.id === id); 
    console.log('findIndex', findIndex);
    let preList = [...toDoList];
    preList[findIndex].checked = !preList[findIndex].checked;
    setToDoList(preList);
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
  console.log(toDoList);

  const toDoListCon = toDoList && toDoList.map((thisResult) => {
    const dataId = thisResult.id;
      return(
        editStates[dataId] ?
          // >>>>>>>>>> 수정 상태 일 때 <<<<<<<<<<
          <HorizontalAlign>
            <InputArea 
              onChange={ handleEditToDo } 
              placeholder="수정값" 
              value={ editData } 
            />
            <InputButton onClick={ editToDo(dataId) }>수정</InputButton>
          </HorizontalAlign> : 

          // >>>>>>>>>> 수정 상태가 아닐 때 <<<<<<<<<<
          <TodoListBox 
            key={ dataId }
          >
            <CheckBoxStyle 
              key={ dataId }
              onChange={ () => handleChecked(dataId) }
              type="checkbox"
              checked={ thisResult.checked }
            />
            {
              thisResult.checked ?
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
      {/* ---------- 타이틀 영역 ---------- */}
      {/* <ContentTitleArea>오늘 할 일은 {toDoList.length}개에요</ContentTitleArea> */}

      {/* ---------- 추가 영역 ---------- */}
      <ToDoInputArea>
        <InputArea 
          onChange={ handleAddToDo } 
          placeholder="할 일" 
          value={ newData } 
        />
        <InputButton onClick={ addToDo }>저장</InputButton>
      </ToDoInputArea>

      {/* ---------- 컨텐츠 영역 ---------- */}
      <ScrollArea>
        { toDoListCon }
      </ScrollArea>
    </MainContent> 
  );
};

export default ToDoPart;