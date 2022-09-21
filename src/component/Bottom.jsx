import { useEffect } from "react";
import { useCallback } from "react";
import { React, useState } from "react";
import FolderModal from "./FolderModal";
import "../css/Bottom.scss";

function Bottom({ todo, setTodo, setFolderBtnBool }) {
  // Storage가 null이 아니라면 localStorage에서 key가 todolist인 Data를 가져옵니다.
  const Storage =
    JSON.parse(localStorage.getItem("todolist")) !== null
      ? JSON.parse(localStorage.getItem("todolist"))
      : [];

  // writeText는 input태그에서 적는 텍스트
  const [writeText, setWriteText] = useState(); // input값을 저장

  // 새로운 TODO
  const newTodo = [
    ...todo,
    {
      id: Storage.length + 1,
      addList: writeText,
      checked: false,
      folderName: "선택된 폴더가 없어요",
    },
  ];

  const newCheck = [];

  Storage.map((todo) => {
    newCheck.push(todo.addList);
  });

  // 중복투두 체크하는 함수
  const nameCheck = () => {
    console.log(newCheck);
  };

  let result = newCheck.some((check) => {
    return check === writeText;
  });

  useEffect(() => {
    nameCheck();
    setWriteText(writeText);
  }, [writeText]);

  // some 함수를 통해 checkText에 저장되어 있는 요소중 writeText와 같은게 1개라도 있다면 false
  // 이를 활용해서 중복처리르 하였습니다.

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
                  nameCheck();
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
