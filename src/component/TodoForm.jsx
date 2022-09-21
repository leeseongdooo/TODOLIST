import {
  // 아이콘 삽입
  AiOutlineInfoCircle,
  AiOutlineDelete,
  AiOutlineCloseCircle,
  AiOutlineFolderOpen,
} from "react-icons/ai";
import { React, useRef, useState } from "react";
import { useEffect } from "react";

function TodoForm({
  // MainArea로부터 받은 props
  todoId, // 선택된 Todo의 ID
  todolist, // 선택된 todo의 todo명 {todo.addList}
  setChooseTodoText, // 새로운 Todo로 수정하기 위해 만듬
  setChooseInfo, // 선택된 todo의 ID를 설정하기 위해 만듬
  setTodo, // 새롭게 todo를 변경하기 위해 만듬
  todoInfo, // todo전체
  setInfoButtonClick,
  todoCheck,
}) {
  const ClickInfoButton = () => {
    setInfoButtonClick(true);
    setChooseInfo(todoId); // chooseInfo의 값을 todoId로 설정해준다.
    setChooseTodoText(todolist); // chooseTodoText를 todolist로 설정해준다.
  };

  // Storage의 저장된 값들을 가져옵니다.
  let [Storage, setStorage] = useState(
    JSON.parse(localStorage.getItem("todolist"))
  );

  // TODOFORM에 checkbox가 check되었는지 확인.
  const [checkBool, setCheckBool] = useState("");

  const clearCheck = useRef(); // input checkbox의 현재 check 상태를 확인하고자 useRef를 사용하여 변수를 만들었습니다.

  useEffect(() => {
    console.log(Storage);
  }, [todoInfo]);

  // 삭제 아이콘을 눌렀을 때 실행되는 함수입니다.
  const DeleteTodolist = () => {
    const newStorage = JSON.parse(localStorage.getItem("todolist"));
    const Sample = newStorage.filter((Data) => Data.addList !== todolist);

    for (let i = 0; i < Sample.length; i++) {
      // 선택된 id가 삭제하는 id보다 작다면
      if (todoId < Sample[i].id) {
        Sample[i].id = Sample[i].id - 1;
      }
    }
    console.log(Sample);

    setTodo(Sample);
    localStorage.setItem("todolist", JSON.stringify(Sample));
  };

  const CheckBoxFunction = () => {
    console.log(todoInfo);
    for (let i = 0; i < todoInfo.length; i++) {
      if (todoInfo[i].id === todoId) {
        todoInfo[i].checked = clearCheck.current.checked;
      }
    }
    console.log(todoInfo);
    localStorage.setItem("todolist", JSON.stringify(todoInfo));
  };

  return (
    <div className="todolistForm">
      <input
        type="checkbox" // type은 체크박스이다.
        ref={clearCheck} // useRef로 input의 정보를 받아온다. 변수명은 clearChecked
        onClick={CheckBoxFunction}
      />

      <p style={false ? { color: "red" } : { color: "black" }}>{todolist}</p>
      <div className="IconBox">
        <AiOutlineInfoCircle className="IconButton" onClick={ClickInfoButton} />{" "}
        {/* INFO 아이콘 */}
        <AiOutlineDelete className="IconButton" onClick={DeleteTodolist} />{" "}
        {/*휴지통 아이콘 */}
      </div>
    </div>
  );
}

export default TodoForm;
