import { useEffect } from "react";
import { useCallback } from "react";
import { React, useState } from "react";
import FolderModal from "./FolderModal";
import "../css/Bottom.scss";

function Bottom({ todo, setTodo, setFolderBtnBool }) {
  // checkList는 todo리스트를 저장하는 공간, writeText는 input값을 저장하는 변수
  const [writeText, setWriteText] = useState(); // input값을 저장
  const [checkText, setCheckText] = useState([]); //

  // 새로운 TODO
  const newTodo = [
    ...todo,
    {
      id: todo.length + 1,
      addList: writeText,
      checked: false,
      folderName: "집안일",
    },
  ];

  // 중복투두 체크하는 함수
  const nameCheck = (text) => {
    const DoubleCheck = [];
    todo.map((todos) => {
      DoubleCheck.push(todos.addList);
      setCheckText(DoubleCheck);
    });
  };

  let DataStorage = JSON.parse(localStorage.getItem("todolist"));

  const SetDataStorage = useCallback(() => {
    if (DataStorage !== null) {
      setTodo(DataStorage);
    }
  }, [todo]);

  useEffect(() => {
    nameCheck(writeText);
    setWriteText(writeText);
    SetDataStorage();
  }, [writeText]);

  // some 함수를 통해 checkText에 저장되어 있는 요소중 writeText와 같은게 1개라도 있다면 false
  // 이를 활용해서 중복처리르 하였습니다.
  let result = checkText.some((check) => {
    return check === writeText;
  });

  return (
    <>
      <div className="BottomArea">
        <input
          type="text"
          placeholder="추가할 할일은 적어주세요!!"
          value={writeText || ""}
          onChange={(e) => {
            setWriteText(e.target.value);
          }}
          onKeyDown={(event) => {
            // enter를 눌렀을 때  생기는 이벤트
            if (event.keyCode == 13) {
              if (result !== true) {
                if (writeText.length !== 0) {
                  setTodo(newTodo);
                  setWriteText("");
                  localStorage.setItem("todolist", JSON.stringify(newTodo));
                }
              }
            }
          }}
        />
        {/* button div */}
        <div className="ButtonBox">
          {/* 추가하기 버튼을 눌러서 항목추가하기 */}
          <button
            className="AddBtn"
            onClick={() => {
              if (result !== true) {
                if (writeText.length !== 0) {
                  setTodo(newTodo);
                  setWriteText("");
                  localStorage.setItem("todolist", JSON.stringify(newTodo));
                }
              }
            }}
          >
            추가하기
          </button>

          <button
            className="AddFolder"
            onClick={() => {
              setFolderBtnBool(true);
            }}
          >
            폴더추가
          </button>

          <button
            className="DeleteStorage"
            onClick={() => {
              // 삭제하기를 눌렀는데 Todo가 한개도 없다면 조건문 안에 이벤트 실행
              if (todo.length === 0) {
                alert("지울 항목이 없어요");
              }
              setCheckText([]);
              setTodo([]);
              localStorage.clear();
            }}
          >
            전체삭제
          </button>
        </div>
      </div>
      {result === true ? (
        <p style={{ color: "red" }}>같은 이름의 TODO가 있어요!</p>
      ) : null}
    </>
  );
}

export default Bottom;
