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
  todoInfo, // 선택된 todo의 정보
  setInfoButtonClick,
}) {
  
  const ClickInfoButton = () => {
    setInfoButtonClick(true);
    setChooseInfo(todoId); // chooseInfo의 값을 todoId로 설정해준다.
    setChooseTodoText(todolist); // chooseTodoText를 todolist로 설정해준다.
  };

  // Storage의 저장된 값들을 가져옵니다.
  const Storage = JSON.parse(localStorage.getItem("todolist"));

  const [checkBool, setCheckBool] = useState(Storage[todoId - 1].checked);
  const DeleteTodolist = () => {
    const newTodo = [];
    // todolist를 삭제하면 id가 감소하지 않아 id가 중첩이 되는 경우가 발생하였습니다
    // 이를 해결하고자 새로운 todolist에 선택한 값보다 작은 값들은 기존 todoInfo의 id값을 가져가고
    // 선택한 값보다 큰 값들은 기존 todoInfo의 id에서 -1을 하는 작업을 한 코드입니다.
    // todoInfo는 todo이다.

    for (let i = 0; i < todoInfo.length; i++) {
      setTodo(todoInfo.filter((todos) => todos.id !== todoId)); // todos.id와 todoID가 같은 값은 삭제하기
      // 만약에 todoId가 todoInfo ID보다 크다면
      if (todoId > todoInfo[i].id) {
        // newTodo에 값이 그대로 들어갑니다.
        newTodo.push({
          id: todoInfo[i].id,
          addList: todoInfo[i].addList,
          checked: todoInfo[i].addList,
        });
      }
      // todoId가 todoInfo[i].id 보다 작다면
      else if (todoId < todoInfo[i].id) {
        // 마이너스 되서 들어감
        const MinusId = todoInfo[i].id - 1; // 아이디 값을 -1 해줍니다.
        newTodo.push({
          id: MinusId,
          addList: todoInfo[i].addList,
          checked: todoInfo[i].addList,
        });
      }
    }
    setTodo(newTodo); // setTodo에 값을 넣습니다.
    localStorage.setItem("todolist", JSON.stringify(newTodo));
  };

  const clearCheck = useRef();

  useEffect(() => {
    console.log(Storage);
  }, [Storage]);

  return (
    <div className="todolistForm">
      <input
        type="checkbox"
        ref={clearCheck}
        checked={checkBool}
        onClick={() => {
          const isChecked = clearCheck.current.checked;
          const updateTodoInfo = {
            id: todoId,
            addList: todolist,
            checked: isChecked,
            folderName: "", // 나중에 선택한 폴더값으로 이름변경
          };

          todoInfo[todoId - 1] = updateTodoInfo;
          localStorage.setItem("todolist", JSON.stringify(todoInfo));
          setCheckBool(
            JSON.parse(localStorage.getItem("todolist"))[todoId - 1].checked
          );
        }}
        onChange={() => {
          console.log(Storage);
        }}
      />
      <p style={checkBool ? { color: "red" } : { color: "black" }}>
        {todolist}
      </p>
      <div className="IconBox">
        <AiOutlineInfoCircle
          className="IconButton"
          onClick={ClickInfoButton}
        />{" "}
        {/* INFO 아이콘 */}
        <AiOutlineDelete className="IconButton" onClick={DeleteTodolist} />{" "}
        {/*휴지통 아이콘 */}
      </div>
    </div>
  );
}

export default TodoForm;
