import { useEffect, useState } from "react";
import styled, { css } from "styled-components";
// import { SlOptionsVertical } from "react-icons/sl";
import { TfiClose } from "react-icons/tfi";

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
  height: calc(100vh - 100px);
  overflow-y: scroll;
  padding: 10px 0px;
  width: 100%;

  ::-webkit-scrollbar {
    width: 5px;
  };
  ::-webkit-scrollbar-thumb {
    /* background-clip: padding-box; */
    /* background-color: rgb(0,0,0,0.7); */
    /* border: 1px solid transparent; */
    /* border-radius: 3px; */
  };
  ::-webkit-scrollbar-track {
    /* background-color: rgb(0,0,0,0.1); */
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
    /* background-color: black; */
    /* color: white; */
    font-weight: 900;
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
  padding: 0px 5px;
  width: 90%;
`;

const CheckedStyle = styled(ContentStyle)`
  color: grey;
  cursor: pointer;
  text-decoration: line-through;
`;

const DeleteButton = styled.div`
  ${ AlignCenter }
  box-sizing: border-box;
  cursor: pointer;
  padding: 0px 3px;
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
  const [isChecked, setIsChecked] = useState(false);
  const [remainToDoList, setRemainToDoList] = useState(toDoList);

  useEffect(() => {
    // 'toDoList'의 값이 변할 때마다 로컬스토리지에 저장
    localStorage.setItem("toDoData", JSON.stringify(toDoList));
    const findChecked = toDoList.filter(toDo => toDo.checked === false);
    setRemainToDoList(findChecked);
  }, [toDoList]);

  // useEffect(() => {
  //   if(remainToDoList.length === 0 )
  //     alert('할 일을 모두 끝냈어요!');
  // }, [remainToDoList]);

  // 추가 시 인풋 데이터 담기
  const handleAddToDo = (e) => {
    e.preventDefault();
    setNewData(e.target.value);
  };

  // 추가 버튼 클릭 이벤트
  const addToDo = (e) => {
    e.preventDefault();
    if(newData !== '') {
      setToDoList([ ...toDoList,{ id: currKey+'/'+newData, content: newData, checked: isChecked }]);  
    } else {
      alert('할 일을 입력해주세요 :^)');
    }
    setCurrKey(currKey + 1);
    setNewData('');
  };

  // 체크박스 상태 변경
  const handleChecked = (id) => {
    const findIndex = toDoList.findIndex(toDo => toDo.id === id); 
    const preList = [...toDoList];
    preList[findIndex].checked = !preList[findIndex].checked;
    setToDoList(preList);
  };

  // 수정 프롬프트창 띄우기
  const editToDo = (id) => {
    const findIndex = toDoList.findIndex(toDo => toDo.id === id);
    const preList = [ ...toDoList ];
    const editData = String(window.prompt('수정할 내용을 작성해주세요', preList[findIndex].content));
    
    // 확인 버튼을 눌렀을 때
    if(editData !== 'null') {
      // prompt 입력창이 빈값이 아닐 때
      if(editData.trim().length !== 0 ){
        preList[findIndex].content = editData;
        setToDoList(preList);
      } else { // prompt 입력창이 빈값일 때
        alert('비어있어요!');
      }
    // 취소 버튼을 눌렀을 때
    } else {
      preList[findIndex].content = preList[findIndex].content;
    }; 
  };

  // 삭제 
  const deleteToDo = (id) => {
    if(window.confirm('삭제하시겠어요??')){
      setToDoList(toDoList.filter((toDo) => toDo.id !== id));
    };
  };

  const toDoListCon = toDoList?.map((thisResult) => {
    const dataId = thisResult.id;
      return(
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
                <ContentStyle onClick={ () => editToDo(dataId) }>{ thisResult.content }</ContentStyle>
            }
            <DeleteButton onClick={ () => deleteToDo(dataId) }>
              <TfiClose size="10" />
            </DeleteButton>
          </TodoListBox>
      )
  });

  return (
    <MainContent>
      {/* ---------- 타이틀 영역 ---------- */}
      {
        remainToDoList.length !== 0 &&
        <ContentTitleArea> 남은 할 일은 { remainToDoList.length }개에요!</ContentTitleArea> 
        // : <ContentTitleArea visible={ visible }>할 일을 모두 끝냈어요</ContentTitleArea> 
      }  

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