import React from "react";
import "../css/FolderForm.scss";

function FolderForm({ FolderNameStorage }) {
  let ArrayTodo = [];

  const todoStorage = JSON.parse(localStorage.getItem("todolist"));
  todoStorage.map((list) => {
    ArrayTodo.push(list.folderName);
  });
  console.log(ArrayTodo);

  const DoubleCheck = (folderName) => {
    return ArrayTodo.some((list) => folderName === list);
  };

  return (
    <>
      {FolderNameStorage.map((list, index) => (
        <div
          key={index}
          className="FolderForm-InBox"
          onClick={() => {
            const a = DoubleCheck(list.folderName);
          }}
        >
          <h4>{list.folderName}</h4>
        </div>
      ))}
    </>
  );
}

export default FolderForm;
