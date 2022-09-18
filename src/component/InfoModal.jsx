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

  // 업데이트할 input에 값을 저장할 변수
  const [UpdateTodoText, setUpdateTodoText] = useState(ChooseTodoText);
  // 중복 체크할 변수
  const [checkText, setCheckText] = useState([]);

  // Todo명 수정하기 버튼을 누르면 true로 바꾸기 위해 생성
  const [EditTodoBtnBool, setEditTodoBtnBool] = useState(false);

  // 그룹수정하기 버튼을 누르면 true로 바꾸기 위해 설정
  const [EditGroupBtnBool, setEditGroupBtnBool] = useState(false);

  const [SelectInfo, setSelectInfo] = useState("");

  // Storage에 저장된 폴더명을 가져오는 변수
  const FolderStorage = JSON.parse(localStorage.getItem("Folder"));

  // Storage에 저장된 todolist를 가져오는 변수
  const Storage = JSON.parse(localStorage.getItem("todolist"));

  // 중복 체크하는 함수
  const nameCheck = (text) => {
    const DoubleCheck = []; // DoubleCheck Array형식으로 만들어주고
    todo.map((todos) => {
      // todo맵을 돌아
      DoubleCheck.push(todos.addList); // DoubleCheck에 값을 넣어준 후
      setCheckText(DoubleCheck); // CheckText에 DoubleCheck값을 넣어줍니다.
    });
  };

  const result = checkText.some((check) => {
    // checkText를 some하여 중복 되는 값이 있다면 true를 리턴
    return check === UpdateTodoText;
  });


  console.log(ChooseInfo)

  // useEffect를 통해 updateTodoText의 딜레이를 없앤다.
  useEffect(() => {
    console.log(UpdateTodoText);
    nameCheck(UpdateTodoText);
    console.log(result);
  }, [UpdateTodoText]);

  // update할때 사용할 변수를 만들어줍니다.
  const [newTodo, setNewTodo] = useState(todo);
  // updateButtonAction은 수정버튼 클릭 시 실행되는 이벤트
  const UpdateButtonAction = () => {
    // todolist를 돌아서
    todo.map((todos) => {
      // map을 돌아서 이름이 같다면
      if (todos.addList === ChooseTodoText && result != true) {
        // 선택한 값에 대한 수정본 = updateTodoInfo
        const updateTodoInfo = {
          id: todos.id,
          addList: UpdateTodoText,
          checked: todo.checked,
          folderName: SelectInfo
        };
        newTodo[todos.id - 1] = updateTodoInfo;
      }
    });

    if (result !== true) {
      setTodo(newTodo);
      localStorage.setItem("todolist", JSON.stringify(newTodo));
      ClickExitButton();
    } else {
      alert("중복되는 값이 TODO에 있습니다!");
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
            <p>카테고리: {Storage[ChooseInfo - 1].folderName}</p>
            <button
              onClick={() => {
                setEditTodoBtnBool(false);
                setEditGroupBtnBool(true);
              }}
            >
              {Storage[ChooseInfo - 1].folderName === "" ? "폴더명 지정" : "수정하기"}
            </button>
          </div>

          <div className="TodoCheckedArea">
            <p>완료여부: {Storage[ChooseInfo - 1].checked ? "끝!" : "아직.."}</p>
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
            onChange={(e)=>{setSelectInfo(e.target.value)}}
          >
            {FolderStorage !== null ? FolderStorage.map((folderInfo) => (
              <option>{folderInfo.folderName}</option>
            )) : <option>생성된 폴더가 없어요 ㅜ</option>}
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
