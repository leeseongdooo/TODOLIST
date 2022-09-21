import { React, useState, useEffect, useref } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";

function InfoModal({
  setInfoButtonBoolean,
  ChooseTodoText,
  setTodo,
  ChooseInfo,
  todo,
}) {
  // modal창을 닫을 때 사용합니다.
  const ClickExitButton = () => {
    setInfoButtonBoolean(false);
  };

  // Storage에 저장된 폴더명을 가져오는 변수
  const FolderStorage = JSON.parse(localStorage.getItem("Folder"));

  // Storage에 저장된 todolist를 가져오는 변수
  const Storage = JSON.parse(localStorage.getItem("todolist"));

  // 업데이트할 input에 값을 저장할 변수
  const [UpdateTodoText, setUpdateTodoText] = useState(ChooseTodoText);

  // 중복 체크할 변수
  const [checkText, setCheckText] = useState([]);

  // select
  const [SelectInfo, setSelectInfo] = useState("선택된 값이 없습니다.");

  // Todo명 수정하기 버튼을 누르면 true로 바꾸기 위해 생성
  const [EditTodoBtnBool, setEditTodoBtnBool] = useState(false);

  // 그룹수정하기 버튼을 누르면 true로 바꾸기 위해 설정
  const [EditGroupBtnBool, setEditGroupBtnBool] = useState(false);

  // 중복 체크하는 함수
  const newCheck = [];

  Storage.map((todo) => {
    newCheck.push(todo.addList);
  });

  const nameCheck = () => {
    console.log(newCheck);
  };

  const result = newCheck.some((check) => {
    // checkText를 some하여 중복 되는 값이 있다면 true를 리턴
    return check === UpdateTodoText;
  });

  // useEffect를 통해 updateTodoText의 딜레이를 없앤다.
  useEffect(() => {
    nameCheck(UpdateTodoText);
    console.log(UpdateTodoText);
    console.log(result);
  }, [UpdateTodoText]);

  // update할때 사용할 변수를 만들어줍니다.
  const [newTodo, setNewTodo] = useState(todo);

  // updateButtonAction은 수정 버튼 클릭 시 실행되는 이벤트
  const UpdateButtonAction = () => {
    // 수정할 TODO의 INFO
    const updateTodoInfo = {
      id: ChooseInfo,
      addList: UpdateTodoText,
      checked: Storage[ChooseInfo - 1].checked,
      folderName: SelectInfo,
    };

    // result(겹치는 항목)이 없고 || EditToodBtnBool(투두명 수정하기를 안눌렀다면)
    if (result !== true || EditTodoBtnBool === false) {
      newTodo[ChooseInfo - 1] = updateTodoInfo; // 값 업데이트 후
      localStorage.setItem("todolist", JSON.stringify(newTodo)); // 로컬에 저장
      ClickExitButton();
    } else if (result === true && EditTodoBtnBool === true) {
      alert("중복되는 값이 있습니다.");
    }
  };

  // 모달창 내부에 삭제버튼을 클릭시 발생하는 함수입니다.
  const DeleteTodolist = (id) => {
    const newTodo = [];

    for (let i = 0; i < todo.length; i++) {
      setTodo(todo.filter((todos) => todos.id !== id));
      if (id > todo[i].id) {
        console.log(todo[i].id);
        newTodo.push({
          id: todo[i].id,
          addList: todo[i].addList,
          checked: todo[i].addList,
        });
      } else if (id < todo[i].id) {
        console.log(todo[i].id);
        const MinusId = todo[i].id - 1;
        newTodo.push({
          id: MinusId,
          addList: todo[i].addList,
          checked: todo[i].addList,
        });
      }
    }
    ClickExitButton();
    setTodo(newTodo);
    localStorage.setItem("todolist", JSON.stringify(newTodo));
  };

  return (
    <div className="Modal">
      <div className="InfoBox">
        <div className="InfoBoxTop">
          <h3>선택한 TODO 정보</h3>
          <AiOutlineCloseCircle
            className="IconButton"
            onClick={ClickExitButton}
          />
        </div>

        <div className="ContentsInfoArea">
          <div className="TodoNameArea">
            <p>TODO명 : {ChooseTodoText}</p>
            <button
              onClick={() => {
                setEditTodoBtnBool(true);
                setEditGroupBtnBool(false);
              }}
            >
              TODO명 바꾸기
            </button>
          </div>

          <div className="TodoGroupNameArea">
            <p>카테고리: </p>
            <button
              onClick={() => {
                setEditTodoBtnBool(false);
                setEditGroupBtnBool(true);
              }}
            >
              수정하기
            </button>
          </div>

          <div className="TodoCheckedArea">
            <p>완료여부:</p>
          </div>
        </div>

        {/* 선택한 Todo 수정하기 */}
        <div className="UpdateBox">
          <input
            type="text"
            onChange={(e) => {
              setUpdateTodoText(e.target.value);
              console.log(UpdateTodoText);
            }}
            onKeyDown={(e) => {
              if (e.keyCode == 13) {
                UpdateButtonAction();
              }
            }}
            style={EditTodoBtnBool ? { display: "block" } : { display: "none" }}
          />

          <select
            style={
              EditGroupBtnBool ? { display: "block" } : { display: "none" }
            }
            onChange={(e) => {
              setSelectInfo(e.target.value);
            }}
            className="SelectFolderName"
          >
            <option style={FolderStorage !== null ? {} : { display: "none" }}>
              폴더를 선택해주세요
            </option>
            {FolderStorage !== null ? (
              FolderStorage.map((folderInfo) => (
                <option>{folderInfo.folderName}</option>
              ))
            ) : (
              <option>생성된 폴더가 없습니다</option>
            )}
          </select>
        </div>

        {/* 수정 or 삭제 버튼 */}
        <div className="InfoButtonBox">
          <button
            onClick={() => {
              DeleteTodolist(ChooseInfo);
            }}
          >
            삭제하기
          </button>
          <button onClick={UpdateButtonAction}>수정하기</button>
        </div>
      </div>
    </div>
  );
}

export default InfoModal;
