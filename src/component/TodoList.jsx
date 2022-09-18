import { React, useState, useEffect } from "react";
import Header from "./Header";
import MainArea from "./MainArea";
import Bottom from "./Bottom";
import FolderModal from "./FolderModal";
import FolderForm from "./FolderForm";
import { useCallback } from "react";

function TodoList() {
  const [todoList, setTodoList] = useState([]);
  const [folder, setFolder] = useState([]); // 폴더명 리스트
  const [FolderBtnBool, setFolderBtnBool] = useState(false);
  const FolderNameStorage = JSON.parse(localStorage.getItem("Folder"));

  return (
    <div className="FlexBox">
      <div className="FlexBox-child">
        <Header />
        <div className="TodoTextBox">
          <MainArea
            todo={todoList}
            setTodo={setTodoList}
            folder={folder}
            setFolder={setFolder}
          />
        </div>
        <Bottom
          todo={todoList}
          setTodo={setTodoList}
          setFolderBtnBool={setFolderBtnBool} // 폴더추가하기를 눌렀을 때 true로 값을 바꿔 모달창을 키기 위해
        />
      </div>

      {FolderBtnBool === true ? (
        <FolderModal
          setFolder={setFolder}
          folder={folder}
          setFolderBtnBool={setFolderBtnBool}
          FolderBtnBool={FolderBtnBool}
        />
      ) : null}

      <div className="FolderForm-OuterBox">
        <h3>폴더 리스트</h3>

        {FolderNameStorage !== null ? (
          <FolderForm FolderNameStorage={FolderNameStorage} />
        ) : (
          <p>생성된 폴더가 없습니다.</p>
        )}
      </div>
    </div>
  );
}

export default TodoList;
