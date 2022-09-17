import {
  // 아이콘 삽입
  AiOutlineInfoCircle,
  AiOutlineDelete,
  AiOutlineCloseCircle,
  AiOutlineFolderOpen,
} from "react-icons/ai";
import "../css/MainArea.scss";
import { React, useState, useEffect } from "react";
import TodoForm from "./TodoForm.jsx";
import InfoModal from "./InfoModal.jsx";
// 수정아이콘을 눌렀을 때 나오는 Modal창입니다.

// TodoList에서 받은 props ▼▼▼
function MainArea({ todo, setTodo }) {
  const [InfoButtonClick, setInfoButtonClick] = useState(false); // 해당 TODO에 정보 아이콘을 눌렀는지 확인차 만든 변수.

  // chooseTodo = 선택된 Todo
  const [ChooseTodo, setChooseTodo] = useState("");

  // 선택한 값에 대한 info
  const [ChooseInfo, setChooseInfo] = useState();

  return (
    <div className="todolistParent">
      {todo.length !== 0 ? (
        // todo 크기만큼 map(반복)하여 TodoList를 그려준다.
        todo.map((todos) => (
          <TodoForm
            key={todos.id} // 각 요소에 대한 key 중첩이 안되게 각 요소의 id값으로 설정했습니다.
            todoId={todos.id} // 선택된 todo의 id
            todolist={todos.addList} //선택된 todo의 todo명
            setInfoButtonClick={setInfoButtonClick}
            setChooseTodoText={setChooseTodo} // 새로운 Todo로 수정하기 위한 setChooseTodoText
            setChooseInfo={setChooseInfo} // 선택된 todo의 정보를 설정하기 위한 setChooseInfo
            setTodo={setTodo}
            todoInfo={todo}
            todoChecked={todos.checked}
            ChooseInfo={ChooseInfo} // 선택된 todo의 정보
          />
        ))
      ) : (
        <p className="NoTodoList">TodoList가 없습니다.</p>
      )}
      {InfoButtonClick ? (
        <InfoModal
          setInfoButtonBoolean={setInfoButtonClick}
          ChooseTodoText={ChooseTodo}
          setTodo={setTodo}
          todo={todo} // 스토리지
          ChooseInfo={ChooseInfo}
        />
      ) : null}
    </div>
  );
}

export default MainArea;
